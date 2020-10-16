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
    const appId = 'sub-button-manager';

    const lifecycleConfig = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT));

    const app = new AppHelper(catalogRpc)
        .setLifecycleConfig(lifecycleConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();
    const screenManager = sdlManager.getScreenManager();

    // add button listeners for both regular and RC buttons
    const ButtonName = SDL.rpc.enums.ButtonName;
    const buttonNames = [ButtonName.OK, ButtonName.PLAY_PAUSE, ButtonName.SEEKLEFT, ButtonName.SEEKRIGHT, ButtonName.TEMP_UP, ButtonName.TEMP_DOWN,
        ButtonName.VOLUME_UP, ButtonName.VOLUME_DOWN];

    screenManager.setTextField1(`Click the voice command to end the test. Try the buttons below:`)
        .setTextField2(`OK, SEEKLEFT, SEEKRIGHT, TEMP_UP, TEMP_DOWN, VOLUME_UP, VOLUME_DOWN`);
    const succeededButtons = [];

    const listener1 = function (buttonName, onButton) { //screen update
        if (onButton instanceof SDL.rpc.messages.OnButtonPress) {
            screenManager.setTextField3(`${buttonName} pressed`);
        } else if (onButton instanceof SDL.rpc.messages.OnButtonEvent) {
            screenManager.setTextField4(`${buttonName} ${onButton.getButtonEventMode()}`);
        }
    }
    const listener2 = function (buttonName, onButton) { //console print
        if (onButton instanceof SDL.rpc.messages.OnButtonPress) {
            console.log(`${buttonName} pressed`);
        } else if (onButton instanceof SDL.rpc.messages.OnButtonEvent) {
            console.log(`${buttonName} ${onButton.getButtonEventMode()}`);
        }
    }

    for (const buttonName of buttonNames) {
        await screenManager.addButtonListener(buttonName, listener1)
        .then(() => {
            succeededButtons.push(buttonName);
        })
        .catch(function (err) {
            console.log(`Couldn't subscribe to button ${buttonName}`);
        });

        await screenManager.addButtonListener(buttonName, listener2)
        .catch(function (err) {
        });
    }

    await new Promise((resolve, reject) => {
        screenManager.setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Click on me to finish the test!'], () => {
                resolve();
            }),
        ]);
    });

    // remove listeners for the buttons
    for (const buttonName of succeededButtons) {
        await screenManager.removeButtonListener(buttonName, listener1)
        await screenManager.removeButtonListener(buttonName, listener2)
    }

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};