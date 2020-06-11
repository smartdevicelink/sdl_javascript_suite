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
        const fileName = `${CONFIG.appId}_icon.gif`;
        const file = new SDL.manager.file.filetypes.SdlFile()
            .setName(fileName)
            .setFilePath('./test_icon_1.png')
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setPersistent(true);

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
            .setOnError((sdlManager, info) => {
                console.error('Error from SdlManagerListener: ', info);
            });

        this._sdlManager = new SDL.manager.SdlManager(this._appConfig, managerListener);
        this._sdlManager
            .start();
        this._sdlManager.initialize();
    }

    async _sleep (timeout = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
}

module.exports = AppClient;