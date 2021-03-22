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
    const appId = 'present-keyboard';

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

    let keyboardProperties = new SDL.rpc.structs.KeyboardProperties()
        .setLanguage(SDL.rpc.enums.Language.EN_US)
        .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.QWERTY);
    const keyboardListener = new SDL.manager.screen.choiceset.KeyboardListener()
        .setOnUserDidSubmitInput(() => {})
        .setOnKeyboardDidAbortWithReason(() => {})
        .setUpdateAutocompleteWithInput(() => {})
        .setUpdateCharacterSetWithInput(() => {})
        .setOnKeyboardDidSendEvent(() => {})
        .setOnKeyboardInputMaskHasChanged(() => {});
    const cancelId = screenManager.presentKeyboard('should dismiss', keyboardProperties, keyboardListener);
    await new Promise(r => setTimeout(r, 1000))
    screenManager.dismissKeyboard(cancelId);

    sdlManager.getSystemCapabilityManager().getDefaultMainWindowCapability().getKeyboardCapabilities();

    keyboardProperties.setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC);
    screenManager.setKeyboardConfiguration(keyboardProperties);
    screenManager.presentKeyboard('numeric keyboard', null, keyboardListener);

    keyboardProperties.setMaskInputCharacters(SDL.rpc.enums.KeyboardInputMask.ENABLE_INPUT_KEY_MASK);
    screenManager.setKeyboardConfiguration(keyboardProperties);
    screenManager.presentKeyboard('masked input', null, keyboardListener);

    keyboardProperties.setMaskInputCharacters(SDL.rpc.enums.KeyboardInputMask.USER_CHOICE_INPUT_KEY_MASK);
    screenManager.setKeyboardConfiguration(keyboardProperties);
    await new Promise((resolve) => {
        keyboardListener.setOnKeyboardInputMaskHasChanged((keyboardEvent) => {
            resolve();
        });
        screenManager.presentKeyboard('change the input mask', null, keyboardListener);
    });

    await new Promise((resolve) => {
        keyboardProperties = new SDL.rpc.structs.KeyboardProperties()
            .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.QWERTY)
            .setLanguage(SDL.rpc.enums.Language.EN_US)
            .setCustomKeys(['!', '?']);
        screenManager.setKeyboardConfiguration(keyboardProperties);
        keyboardListener.setOnUserDidSubmitInput((inputText, event) => {
            resolve();
        });
        screenManager.presentKeyboard('press a custom button', null, keyboardListener);
    });
};