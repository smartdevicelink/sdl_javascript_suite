/*
* Copyright (c) 2019, Livio, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

const SDL = require('../../SDL.min.js');
const AppHelper = require('../../AppHelper.js');

module.exports = async function (catalogRpc) {
    const appId = 'all-rpcs';

    const appConfig = new SDL.manager.AppConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setIsMediaApp(false)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setHmiDisplayLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT));

    const app = new AppHelper() // since these are going to be invalid rpcs, do not count any of the messages sent towards coverage
        .setAppConfig(appConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();

    console.log('Sending a bunch of requests just to see if a response is returned. Ignore any errors related to invalid RPCs that follow.');

    // RECEIVE RESPONSE TESTS

    for (const rpc in SDL.rpc.messages) {
        const rpcInstance = new SDL.rpc.messages[rpc]();
        // skip notification and response RPCs
        if (rpcInstance.getRPCType() === SDL.rpc.enums.RpcType.RESPONSE
            || rpcInstance.getRPCType() === SDL.rpc.enums.RpcType.NOTIFICATION) {
            continue;
        }

        const FunctionID = SDL.rpc.enums.FunctionID;

        if (rpcInstance.getFunctionName() === FunctionID.keyForValue(FunctionID.RegisterAppInterface) ||
            rpcInstance.getFunctionName() === FunctionID.keyForValue(FunctionID.UnregisterAppInterface) ||
            rpcInstance.getFunctionName() === FunctionID.keyForValue(FunctionID.CloseApplication)) {
            continue;
        }

        const response = await sdlManager.sendRpc(rpcInstance)
            .catch(err => err);

        if (!(response instanceof SDL.rpc.RpcResponse)) {
            console.error(response);
            throw new Error(`${rpc} response not correct!`);
        }
    }

    // invoke the onPacketReceived method in the transport layer to simulate receiving notifications and request packets
    // RECEIVE NOTIFICATION AND REQUEST TESTS
    for (const rpc in SDL.rpc.messages) {
        const rpcInstance = new SDL.rpc.messages[rpc]();
        // skip response RPCs
        if (rpcInstance.getRPCType() === SDL.rpc.enums.RpcType.RESPONSE) {
            continue;
        }

        // build out an SdlPacket from the RPC
        const protocolLayer = sdlManager._lifecycleManager._sdlSession._sdlProtocol;
        const sessionId = protocolLayer._getSessionId();
        const messageId = protocolLayer._getNextMessageID();
        const mtu = protocolLayer._mtus[SDL.protocol.enums.ServiceType.RPC];
        const version = protocolLayer._protocolVersion.getMajor();
        const isEncrypted = rpcInstance.getIsEncrypted();

        const sdlPacket = await new Promise((resolve, reject) => {
            SDL.protocol.MessageFrameDisassembler.buildRPC(rpcInstance, sessionId, messageId, mtu, version, isEncrypted, resolve);
        });

        // listen for the notification or request
        const listenPromise = rpcListenPromise(sdlManager, SDL.rpc.enums.FunctionID[rpc]);
        // "send" the packet
        sdlManager._lifecycleManager._sdlSession._sdlProtocol._transportManager.onPacketReceived(sdlPacket);
        const rpcReceived = await listenPromise;

        if (!(rpcReceived instanceof SDL.rpc.RpcNotification) && !(rpcReceived instanceof SDL.rpc.RpcRequest)) {
            console.error(rpcReceived);
            throw new Error(`${rpc} rpc received not correct!`);
        }
    }

    console.log('Finished sending the rpcs');

    // send CloseApplication last
    await sdlManager.sendRpc(new SDL.rpc.messages.CloseApplication());

    // tear down the app
    await sdlManager.sendRpc(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function rpcListenPromise (sdlManager, functionId) {
    return new Promise((resolve, reject) => {
        const listener = (message) => {
            sdlManager.removeRpcListener(functionId, listener);
            resolve(message);
        };
        sdlManager.addRpcListener(functionId, listener);
    });
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}