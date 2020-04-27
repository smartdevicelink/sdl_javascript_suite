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
    const appId = 'others';

    const appConfig = new SDL.manager.AppConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setIsMediaApp(false)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setHmiDisplayLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT));

    const app = new AppHelper(catalogRpc)
        .setAppConfig(appConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();

    // set template color test
    const color1 = { red: 214, green: 165, blue: 30 };
    const color2 = { red: 159, green: 224, blue: 185 };
    const color3 = { red: 135, green: 132, blue: 122 };

    const show = new SDL.rpc.messages.Show()
        .setTemplateConfiguration(new SDL.rpc.structs.TemplateConfiguration({
            template: 'DEFAULT',
            nightColorScheme: {
                primaryColor: color1,
                secondaryColor: color2,
                backgroundColor: color3,
            },
            dayColorScheme: {
                primaryColor: color2,
                secondaryColor: color3,
                backgroundColor: color1,
            },
        }));

    await sdlManager.sendRpc(show);

    // speak file test
    // upload an audio file ahead of time
    const fileManager = sdlManager.getFileManager();

    const audioFile = new SDL.manager.file.filetypes.SdlFile()
        .setName('sound-file')
        .setFilePath('./tests/others/sound-file.mp3')
        .setType(SDL.rpc.enums.FileType.AUDIO_MP3);

    const putFile = await fileManager.createPutFile(audioFile);
    await sdlManager.sendRpc(putFile);

    const speak = new SDL.rpc.messages.Speak()
        .setTtsChunks([
            new SDL.rpc.structs.TTSChunk({
                text: 'sound-file',
                type: SDL.rpc.enums.SpeechCapabilities.FILE,
            }),
        ]);
    await sdlManager.sendRpc(speak);

    // alert icon test
    // upload a weather icon ahead of time for attaching to weather service data
    const logo = new SDL.manager.file.filetypes.SdlFile()
        .setName('test-icon')
        .setFilePath('./tests/others/test_icon_1.png')
        .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);

    const putFile2 = await fileManager.createPutFile(logo);
    await sdlManager.sendRpc(putFile2);

    const alert = new SDL.rpc.messages.Alert()
        .setAlertText1('You should see an image with this alert')
        .setAlertText2('You should also be hearing music')
        .setAlertIcon(new SDL.rpc.structs.Image({
            value: 'test-icon',
            imageType: SDL.rpc.enums.ImageType.DYNAMIC,
            isTemplate: false,
        }));
    await sdlManager.sendRpc(alert);

    // voice command test
    // wait for the user to click on a voice command to continue
    sdlManager.getScreenManager()
        .setTextField1('Change themes to day and night mode to see the template colors')
        .setTextField2('Find and click on the voice command to continue!');

    await new Promise((resolve, reject) => {
        sdlManager.getScreenManager().setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Click on me!'], () => {
                resolve();
            }),
        ]);
    });

    // send a alert that gets cancelled
    const alert2 = new SDL.rpc.messages.Alert()
        .setAlertText1('This alert should be cancelled in 2 seconds');
    const alert2Promise = sdlManager.sendRpc(alert2)
        .catch(err => err);

    await sleep(2000);

    // cancel the alert that was sent
    sdlManager.sendRpc(new SDL.rpc.messages.CancelInteraction()
        .setFunctionID(SDL.rpc.enums.FunctionID.Alert));

    const alert2Response = await alert2Promise;
    if (alert2Response.getResultCode() !== SDL.rpc.enums.Result.ABORTED) {
        console.error(`Expected result code ${SDL.rpc.enums.Result.ABORTED} from cancelled Alert! Got ${alert2Response.getResultCode()}`);
    }

    // tear down the app
    await sdlManager.sendRpc(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}