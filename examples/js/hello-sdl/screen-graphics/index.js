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

async function screenGraphicsTests (catalogRpc) {
    const appId = 'screen-graphics';

    const lifecycleConfig = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.WebSocketClientConfig('ws://localhost', 5050));

    const app = new HelloSdl(catalogRpc)
        .setLifecycleConfig(lifecycleConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();
    const screenManager = sdlManager.getScreenManager();
    // preset data
    const fileName = `${appId}_icon`;
    const fileName2 = `${appId}_icon2`;
    const fileName3 = `${appId}_icon3`;
    const fileNameUseOnce = `${appId}_useonce`;
    const artwork1 = new SDL.manager.file.filetypes.SdlArtwork(fileName, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-graphics/test_icon_1.png');
    const artwork2 = new SDL.manager.file.filetypes.SdlArtwork(fileName2, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-graphics/weather-icon.png')
    const artwork3 = new SDL.manager.file.filetypes.SdlArtwork(fileName3, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-graphics/weather-icon.png')
        .setTemplateImage(true);
    const artworkUseOnce = new SDL.manager.file.filetypes.SdlArtwork(fileNameUseOnce, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-graphics/weather-icon.png');
    const artworkReplace = new SDL.manager.file.filetypes.SdlArtwork(fileName, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-graphics/weather-icon.png')
        .setOverwrite(true);

    const state1 = new SDL.manager.screen.utils.SoftButtonState('ONE', 'one');
    const state2 = new SDL.manager.screen.utils.SoftButtonState('TWO', 'two');
    const state3 = new SDL.manager.screen.utils.SoftButtonState('THREE', 'three');
    const state4 = new SDL.manager.screen.utils.SoftButtonState('FOUR', 'four');
    const state5 = new SDL.manager.screen.utils.SoftButtonState('FIVE', null, artwork1);
    const state6 = new SDL.manager.screen.utils.SoftButtonState('SIX', 'six', artwork1);
    const state6Replace = new SDL.manager.screen.utils.SoftButtonState('SIX', 'six', artworkReplace);
    // end preset data

    screenManager.setTextField1('Screen tests start in 5 seconds. Check voice command list for what should be visible');
    changeLayout(screenManager, 'GRAPHIC_WITH_TEXT');

    await sleep(5000);

    setupScreenState(screenManager, 'Nothing');
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Only text fields');
    screenManager.setTextField1('one');
    screenManager.setTextField2('two');
    screenManager.setTextField3('three');
    screenManager.setTextField4('four');
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Only template title');
    screenManager.setTitle('Hello');
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Only primary graphic.. then change it!');
    changeLayout(screenManager, 'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS');
    screenManager.setPrimaryGraphic(artworkUseOnce);
    await screenManager.commit();
    await sleep(2000);
    screenManager.setPrimaryGraphic(artwork1);
    await sleep(2000);

    setupScreenState(screenManager, 'Only secondary graphic');
    screenManager.setPrimaryGraphic(null);
    screenManager.setSecondaryGraphic(artwork2);
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Template image');
    screenManager.setSecondaryGraphic(null);
    screenManager.setPrimaryGraphic(artwork3);
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'One softbutton');
    await screenManager.setSoftButtonObjects([
        new SDL.manager.screen.utils.SoftButtonObject('numbers', [state1], 'ONE', (id, rpc) => {}),
    ]);
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Four softbuttons');
    changeLayout(screenManager, 'TEXTBUTTONS_ONLY');
    await screenManager.setSoftButtonObjects([
        new SDL.manager.screen.utils.SoftButtonObject('number1', [state1], 'ONE', (id, rpc) => {}),
        new SDL.manager.screen.utils.SoftButtonObject('number2', [state2], 'TWO', (id, rpc) => {}),
        new SDL.manager.screen.utils.SoftButtonObject('number3', [state3], 'THREE', (id, rpc) => {}),
        new SDL.manager.screen.utils.SoftButtonObject('number4', [state4], 'FOUR', (id, rpc) => {}),
    ]);
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Image, text, softbutton');
    changeLayout(screenManager, 'NON_MEDIA');
    screenManager.setPrimaryGraphic(artwork1);
    screenManager.setTextField1('one');
    await screenManager.setSoftButtonObjects([
        new SDL.manager.screen.utils.SoftButtonObject('numbers', [state1], 'ONE', (id, rpc) => {}),
    ]);
    await screenManager.commit();
    await sleep(4000);

    setupScreenState(screenManager, 'Softbutton with only image');
    await screenManager.setSoftButtonObjects([
        new SDL.manager.screen.utils.SoftButtonObject('numbers', [state5], 'FIVE', (id, rpc) => {}),
    ]);
    await screenManager.commit();
    await sleep(4000);

    setupScreenState(screenManager, 'Softbutton with image and text.. then overwrite!');
    await screenManager.setSoftButtonObjects([
        new SDL.manager.screen.utils.SoftButtonObject('numbers', [state6], 'SIX', (id, rpc) => {}),
    ]);
    await screenManager.commit();
    await sleep(2500);
    await screenManager.setSoftButtonObjects([
        new SDL.manager.screen.utils.SoftButtonObject('numbers', [state6Replace], 'SIX', (id, rpc) => {}),
    ]);
    await sleep(2500);

    setupScreenState(screenManager, 'Image and text button states');
    const softButtonObjects = [
        new SDL.manager.screen.utils.SoftButtonObject('number4', [state4, state5, state6], 'FOUR', (id, rpc) => {}),
    ];
    await screenManager.setSoftButtonObjects(softButtonObjects);
    await screenManager.commit();
    await sleep(1500);
    softButtonObjects[0].transitionToNextState();
    await sleep(1500);
    softButtonObjects[0].transitionToNextState();
    await sleep(1500);

    setupScreenState(screenManager, 'Instant change layout and texts');
    changeLayout(screenManager, 'GRAPHIC_WITH_TEXT');
    screenManager.setTextField1('instant');
    screenManager.setTextField2('change');
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'Change to double graphic layout');
    changeLayout(screenManager, 'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS');
    screenManager.setTextField1('text1');
    screenManager.setTextField2('text2');
    screenManager.setPrimaryGraphic(artwork1);
    await screenManager.commit();
    await sleep(2500);

    setupScreenState(screenManager, 'From non-media to double graphic');
    changeLayout(screenManager, 'NON_MEDIA');
    screenManager.setTextField1('text1');
    screenManager.setTextField2('text2');
    screenManager.setPrimaryGraphic(artwork1);
    screenManager.setSecondaryGraphic(artwork2);
    await screenManager.commit();
    await sleep(2000);
    changeLayout(screenManager, 'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS');
    await sleep(2000);

    changeLayout(screenManager, 'MEDIA');
    screenManager.setTextField1('Click on the SEEK_LEFT subscribed button to finish the test!');
    await new Promise(resolve => {
        sdlManager.getScreenManager().addButtonListener(SDL.rpc.enums.ButtonName.SEEKLEFT, resolve);
    })

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function changeLayout (screenManager, layoutString) {
    screenManager.changeLayout(new SDL.rpc.structs.TemplateConfiguration()
        .setTemplate(SDL.rpc.enums.PredefinedLayout[layoutString]));
}

function setupScreenState (screenManager, message) {
    console.log("======" + message);
    screenManager.beginTransaction();
    screenManager.setTextField1(null);
    screenManager.setTextField2(null);
    screenManager.setTextField3(null);
    screenManager.setTextField4(null);
    screenManager.setMediaTrackTextField(null);
    //screenManager.setPrimaryGraphic(null);
    //screenManager.setSecondaryGraphic(null);
    screenManager.setTextAlignment(null);
    screenManager.setTextField1Type(null);
    screenManager.setTextField2Type(null);
    screenManager.setTextField3Type(null);
    screenManager.setTextField4Type(null);
    screenManager.setTitle(null);
    screenManager.setKeyboardConfiguration(null);
    screenManager.setVoiceCommands([
        new SDL.manager.screen.utils.VoiceCommand([message], () => {}),
    ]);
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}