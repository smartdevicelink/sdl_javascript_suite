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
    const appId = 'voice-command-manager';

    const lifecycleConfig = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.ES_MX)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT));

    const app = new AppHelper(catalogRpc)
        .setLifecycleConfig(lifecycleConfig);

    // this will get invoked once the app loses Show permissions at the end!
    let permissionListener;

    // check for life cycle updates due to the HMI not expecting the ES_MX language
    await app.start(permissionListener, language => {
        return new SDL.manager.lifecycle.LifecycleConfigurationUpdate()
            .setAppName(appId)
            .setShortAppName('Hello');
    });

    const sdlManager = app.getManager();
    const screenManager = sdlManager.getScreenManager();

    sdlManager.getScreenManager()
        .setTextField1('Click on any voice command to continue!');

    await new Promise ((resolve) => {
        screenManager.setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Option 1'], () => {
                resolve();
            }),
            new SDL.manager.screen.utils.VoiceCommand(['Option 2'], () => {
                resolve();
            }),
            new SDL.manager.screen.utils.VoiceCommand(['Option 3'], () => {
                resolve();
            }),
        ]);
    });
    // should succeed
    if (getCommandCount(screenManager) !== 3) {
        console.error(`Expected 3 voice commands set! Got ${getCommandCount(screenManager)}`);
    }

    screenManager.setVoiceCommands([
        new SDL.manager.screen.utils.VoiceCommand(['Option 1'], () => {
            resolve();
        }),
        new SDL.manager.screen.utils.VoiceCommand(['Option 1'], () => {
            resolve();
        }),
        new SDL.manager.screen.utils.VoiceCommand(['Option 3'], () => {
            resolve();
        }),
    ]);
    // should fail
    if (screenManager._voiceCommandManager._voiceCommands !== null) {
        console.error(`Expected no voice commands set! Got ${screenManager._voiceCommandManager._voiceCommands}`);
    }
    

    screenManager.setVoiceCommands([
        new SDL.manager.screen.utils.VoiceCommand(['Option 1', 'Option 2'], () => {
            resolve();
        }),
        new SDL.manager.screen.utils.VoiceCommand(['Option 2', 'Option 3'], () => {
            resolve();
        }),
        new SDL.manager.screen.utils.VoiceCommand(['Option 4', 'Option 5'], () => {
            resolve();
        }),
    ]);
    // should fail
    if (screenManager._voiceCommandManager._voiceCommands !== null) {
        console.error(`Expected no voice commands set! Got ${screenManager._voiceCommandManager._voiceCommands}`);
    }

    sdlManager.getScreenManager()
        .setTextField1('Click on any voice command to continue except Option 1');

    await new Promise ((resolve) => {
        screenManager.setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Option 1', 'Option 1'], () => {
                resolve();
            }),
            new SDL.manager.screen.utils.VoiceCommand(['Option 2', 'Option 3'], () => {
                resolve();
            }),
            new SDL.manager.screen.utils.VoiceCommand(['Option 4', 'Option 5'], () => {
                resolve();
            }),
        ]);
    }).catch(() => {});
    // should succeed
    if (getCommandCount(screenManager) !== 5) {
        console.error(`Expected 5 voice commands set! Got ${getCommandCount(screenManager)}`);
    }

    await screenManager.setVoiceCommands([]);
    // should succeed
    if (getCommandCount(screenManager) !== 0) {
        console.error(`Expected 0 voice commands set! Got ${getCommandCount(screenManager)}`);
    }

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function getCommandCount (screenManager) {
    return screenManager._voiceCommandManager._voiceCommands.map(voiceCommand => voiceCommand.getVoiceCommands()).flat().length;
}