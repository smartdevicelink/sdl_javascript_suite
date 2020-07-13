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
    const appId = 'templates';

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

    // upload some files needed
    const fileManager = sdlManager.getFileManager();

    const sdlLogo = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/templates/test_icon_1.png');

    const weatherIcon = new SDL.manager.file.filetypes.SdlArtwork('weather-icon', SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/templates/weather-icon.png');

    await sdlManager.sendRpcResolve(await fileManager._createPutFile(sdlLogo));
    await sdlManager.sendRpcResolve(await fileManager._createPutFile(weatherIcon));

    const templatesSupported = sdlManager
        .getSystemCapabilityManager()
        .getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS)[0]
        .getWindowCapabilities()[0]
        .getTemplatesAvailable();

    // stop if templatesSupported is null
    if (templatesSupported === null) {
        console.log('No template support information returned. Skipping test');
        // tear down the app
        await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
        return sdlManager.dispose();
    }

    // subscribe to preset buttons if supported
    if (templatesSupported.includes('ONSCREEN_PRESETS')) {
        await Promise.all([
            sdlManager.sendRpcResolve(new SDL.rpc.messages.SubscribeButton().setButtonName(SDL.rpc.enums.ButtonName.PRESET_0)),
            sdlManager.sendRpcResolve(new SDL.rpc.messages.SubscribeButton().setButtonName(SDL.rpc.enums.ButtonName.PRESET_1)),
            sdlManager.sendRpcResolve(new SDL.rpc.messages.SubscribeButton().setButtonName(SDL.rpc.enums.ButtonName.PRESET_2)),
            sdlManager.sendRpcResolve(new SDL.rpc.messages.SubscribeButton().setButtonName(SDL.rpc.enums.ButtonName.PRESET_3)),
        ]);
    }

    console.log('Going through only reported supported templates:')

    // send a show with many things in it
    for (let template of templatesSupported) {
        console.log(template);

        const show = new SDL.rpc.messages.Show()
            .setMainField1('Text 1')
            .setMainField2('Text 2')
            .setMainField3('Text 3')
            .setMainField4('Text 4')
            .setGraphic(new SDL.rpc.structs.Image().setValueParam('sdl-logo').setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
            .setSecondaryGraphic(new SDL.rpc.structs.Image().setValueParam('weather-icon').setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
            .setSoftButtons([ // 2 hybrid buttons, 2 text buttons, 2 image buttons
                makeSoftButton('Button 1', 2, SDL.rpc.enums.SoftButtonType.SBT_BOTH),
                makeSoftButton('Button 2', 3, SDL.rpc.enums.SoftButtonType.SBT_BOTH),
                makeSoftButton('Button 3', 4, SDL.rpc.enums.SoftButtonType.SBT_TEXT),
                makeSoftButton('Button 4', 5, SDL.rpc.enums.SoftButtonType.SBT_TEXT),
                makeSoftButton('Button 5', 6, SDL.rpc.enums.SoftButtonType.SBT_IMAGE),
                makeSoftButton('Button 6', 7, SDL.rpc.enums.SoftButtonType.SBT_IMAGE),
            ])
            .setCustomPresets([
                's',
                'h',
                'o',
                'w',
            ])
            .setTemplateConfiguration(new SDL.rpc.structs.TemplateConfiguration()
                .setTemplate(template));  

        const showResponse = await sdlManager.sendRpcResolve(show)

        await sleep(2500);
    }

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function makeSoftButton (text, id, softButtonType) {
    const softButton = new SDL.rpc.structs.SoftButton()
        .setType(softButtonType)
        .setSoftButtonID(id);

    if (softButtonType === SDL.rpc.enums.SoftButtonType.SBT_BOTH || softButtonType === SDL.rpc.enums.SoftButtonType.SBT_IMAGE) {
        // use the below line for static images
        // softButton.setImage(new SDL.rpc.structs.Image().setImageType(SDL.rpc.enums.ImageType.STATIC).setValueParam(`0x0${id}`));
        softButton.setImage(new SDL.rpc.structs.Image().setImageType(SDL.rpc.enums.ImageType.DYNAMIC).setValueParam('sdl-logo'));
    }
    if (softButtonType === SDL.rpc.enums.SoftButtonType.SBT_BOTH || softButtonType === SDL.rpc.enums.SoftButtonType.SBT_TEXT) {
        softButton.setText(text);
    }

    return softButton;
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}