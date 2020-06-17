/*
* Copyright (c) 2020, Livio, Inc.
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

const SDL = require('../../lib/node/dist/SDL.min.js');
const CONFIG = require('./config.js');

class AppClient {
    constructor (wsClient, ready) {
        this._lifecycleConfig = new SDL.manager.LifecycleConfig()
            .setAppId(CONFIG.appId)
            .setAppName(CONFIG.appName)
            .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setAppTypes([
                SDL.rpc.enums.AppHMIType.DEFAULT,
            ])
            .setTransportConfig(
                new SDL.transport.WebSocketServerConfig(
                    wsClient,
                    CONFIG.connectionLostTimeout
                )
            );

        this._appConfig = new SDL.manager.AppConfig()
            .setLifecycleConfig(this._lifecycleConfig);

        const managerListener = new SDL.manager.SdlManagerListener();
        managerListener
            .setOnStart((sdlManager) => {
                this._onConnected();
            })
            .setOnError((sdlManager, info) => {
                console.error('Error from SdlManagerListener: ', info);
            });

        this._sdlManager = new SDL.manager.SdlManager(this._appConfig, managerListener);
        this._sdlManager
            .start()
            .addRpcListener(SDL.rpc.enums.FunctionID.OnHMIStatus, this._onHmiStatusListener.bind(this));

        this._ready = ready;
        // for a cloud server app the hmi full will be received before the managers report that they're ready!
        this._managersReady = false;
        this._hmiFull = false;
    }

    async _onConnected () {
        this._managersReady = true;
        this._checkReadyState();
    }

    async _onHmiStatusListener (onHmiStatus) {
        const hmiLevel = onHmiStatus.getHmiLevel();

        // wait for the FULL state for more functionality
        if (hmiLevel === SDL.rpc.enums.HMILevel.HMI_FULL) {
            this._hmiFull = true;
            this._checkReadyState();
        }
    }

    async _checkReadyState () {
        if (this._managersReady && this._hmiFull) {
            if (typeof this._ready === 'function') {
                await this._ready(async () => {
                    // tests complete. tear down the app
                    await this._sdlManager.sendRpc(new SDL.rpc.messages.UnregisterAppInterface());
                    this._sdlManager.dispose();
                });
            }
        }
    }

    async _sleep (timeout = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
}

module.exports = AppClient;