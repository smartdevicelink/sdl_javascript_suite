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
const ServerHelper = require('../../ServerHelper.js');
const Producer = require('./Producer.js');
const Consumer = require('./Consumer.js');

module.exports = async function (catalogRpc) {
    const producer = new Producer(catalogRpc);
    await producer.start();
    await producer.setupAppService();

    const consumer = new Consumer(catalogRpc);
    await consumer.start();

    // have the consumer send a SendLocation
    const sendLocationPromise = consumer.sendLocationPromise();
    // have the producer listen for SendLocation
    const sendLocationRequest = await rpcListenPromise(producer.sdlManager, SDL.rpc.enums.FunctionID.SendLocation, SDL.rpc.enums.RpcType.REQUEST);
    producer.sendLocationResponse(sendLocationRequest);

    // wait for the SendLocation
    await sendLocationPromise;

    await producer.stop();
    await consumer.stop();
};

function rpcListenPromise (sdlManager, functionId, type) {
    return new Promise((resolve, reject) => {
        const listener = (message) => {
            if (message.getRPCType() === type) {
                sdlManager.removeRpcListener(functionId, listener);
                resolve(message);
            }
        }
        sdlManager.addRpcListener(functionId, listener);
    });
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}