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

const SDL = require('../../../lib/node/src/index.js');
const CONFIG = require('./config.js');
const MyApp = require('./MyApp.js');

/*
async function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

(async function () {
    console.log('start app');
    const app = await new MyApp()._init();

    console.log('app started and registered', app);
    console.log('start listeners');
    app.on('INCOMING_RPC', async (rpcMessage) => {
        let functionName = rpcMessage.getFunctionName();

        console.log(`INCOMING_RPC`, functionName, rpcMessage);

        if (functionName === 'OnHMIStatus') {
            let parameters = rpcMessage.getParameters();
            let { hmiLevel } = parameters;
            if (hmiLevel === 'FULL') {

                const show = new SDL.rpc.messages.Show();
                show.setMainField1("こんにちは")
                    .setMainField2("你好 ( ni hao / nĭ hăo )")
                    .setMainField3("@#$#%$^^%&**&(_     !@#$@#$~~~```");

                let rpcResponse = await app.sendRPC(show);

                console.log('show message response', rpcResponse);

                await sleep();

                let count = 3;
                for (let i = 0; i < count; i++) {

                    const showCountdown = new SDL.rpc.messages.Show();
                    showCountdown.setMainField1("Exiting in " + (count - i).toString())
                        .setMainField2("")
                        .setMainField3("");

                    let rpcResponse = await app.sendRPC(showCountdown);

                    await sleep();

                }
                app.exit();
            }
        }
    });
})();
*/



const myApp = new SDL.transport.WebSocketServer(
    new SDL.transport.WebSocketServerConfig(
        CONFIG.port,
        CONFIG.timeout,
        CONFIG.ssl
    ),
    new SDL.transport.TransportListener()
        .setOnTransportConnected(onTransportConnected)
        .setOnPacketReceived(onPacketReceived)
);

function onTransportConnected () {
    console.log('Client connected to server');
}

function onPacketReceived (packet) {
    console.log("packet received");
    console.log(packet);
}

myApp.start();
