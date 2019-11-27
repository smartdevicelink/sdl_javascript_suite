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

async function sleep (timeout = 1000) {
    return new Promise((resolve) => { 
        setTimeout(resolve, timeout);
    });
}

async function startApp () {
    console.log('start app');
    let app = await MyApp.startApp();

    console.log('app started and registered', app);
    console.log('start listeners');
    app.on('INCOMING_RPC', async (rpcMessage) => {
        const functionName = rpcMessage.getFunctionName();
        const parameters = rpcMessage.getParameters();

        console.log('INCOMING_RPC', functionName, parameters);

        if (functionName === 'OnHMIStatus') {
            const parameters = rpcMessage.getParameters();
            const { hmiLevel, } = parameters;
            if (hmiLevel === SDL.rpc.enums.HMILevel.HMI_FULL) {
                await app.sendRPC(
                    new SDL.rpc.messages.Show()
                        .setMainField1('Hello')
                        .setMainField2('こんにちは')
                        .setMainField3('你好 ( ni hao / nĭ hăo )')
                        .setMainField4('')
                );

                await sleep(10 * 1000);

                const count = 3;
                for (let idx = 0; idx < count; idx++) {
                    await app.sendRPC(
                        new SDL.rpc.messages.Show()
                            .setMainField1(`Exiting in ${(count - idx)}`)
                            .setMainField2('')
                            .setMainField3('')
                            .setMainField4('')
                    );
                    await sleep();
                }
                app.exit();
            }
        }
    });
}


startApp();