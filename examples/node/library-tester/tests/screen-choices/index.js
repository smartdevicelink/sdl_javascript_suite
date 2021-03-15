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
    const appId = 'screen-choices';

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

    const fileName = `${appId}_icon`;
    const fileName2 = `${appId}_icon2`;
    const fileName3 = `${appId}_icon3`;
    const artwork1 = new SDL.manager.file.filetypes.SdlArtwork(fileName, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-choices/test_icon_1.png');
    const artwork2 = new SDL.manager.file.filetypes.SdlArtwork(fileName2, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-choices/weather-icon.png')

    screenManager.setTitle('Starting choice set tests in 5 seconds.');
    await sleep(5000);

    const choiceCell1 = new SDL.manager.screen.choiceset.ChoiceCell('hello 1')
        .setSecondaryText('hi 1')
        .setTertiaryText('how are you 1')
        .setVoiceCommands(['choice cell 1'])
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell2 = new SDL.manager.screen.choiceset.ChoiceCell('hello 2')
        .setSecondaryText('hi 2')
        .setTertiaryText('how are you 2')
        .setVoiceCommands(['choice cell 2'])
        .setArtwork(artwork2)
        .setSecondaryArtwork(artwork1);

    const choiceCell3 = choiceCell1.clone();

    const choiceCell4 = new SDL.manager.screen.choiceset.ChoiceCell('hello 1')
        .setSecondaryText('hi 4')
        .setTertiaryText('how are you 4')
        .setVoiceCommands(['choice cell 4'])
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell5 = new SDL.manager.screen.choiceset.ChoiceCell('hello 1')
        .setSecondaryText('hi 1')
        .setTertiaryText('how are you 1')
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell6 = new SDL.manager.screen.choiceset.ChoiceCell('hello 2')
        .setSecondaryText('hi 2')
        .setTertiaryText('how are you 2')
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell7 = new SDL.manager.screen.choiceset.ChoiceCell('hello 1')
        .setSecondaryText('hi 7')
        .setTertiaryText('how are you 7')
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell8 = choiceCell5.clone();

    const choiceCell9 = new SDL.manager.screen.choiceset.ChoiceCell('hello 9')
        .setSecondaryText('hi 9')
        .setTertiaryText('how are you 9')
        .setVoiceCommands(['choice cell 1'])
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell10 = new SDL.manager.screen.choiceset.ChoiceCell('hello 10')
        .setSecondaryText('hi 10')
        .setTertiaryText('how are you 10')
        .setVoiceCommands(['choice cell 10'])
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    const choiceCell11 = new SDL.manager.screen.choiceset.ChoiceCell('hello 11')
        .setSecondaryText('hi 11')
        .setTertiaryText('how are you 11')
        .setVoiceCommands(['choice cell 10'])
        .setArtwork(artwork1)
        .setSecondaryArtwork(artwork2);

    let choiceSet;

    await screenManager.preloadChoices([choiceCell1, choiceCell2]);
    screenManager.setTitle('No choices should be showing yet.');
    await sleep(3000);
    
    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 1', [choiceCell1, choiceCell2]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('They should be cancelled in 5 seconds');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 2', [choiceCell1, choiceCell2, choiceCell3]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices with duplicate. No choices should be showing');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 3', [choiceCell1, choiceCell2, choiceCell4]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices with a cell with a matching text. The text should be unchanged');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 4', [choiceCell5, choiceCell6]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices with no voice commands.');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 5', [choiceCell5, choiceCell6, choiceCell7]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices (no voice comms) with matching text. Text should be unchanged');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 6', [choiceCell5, choiceCell6, choiceCell8]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices with no voice commands with duplicate. No choices should be showing');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 7', [choiceCell1, choiceCell2, choiceCell9]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices with duplicate voice commands. No choices should be showing');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    await screenManager.preloadChoices([choiceCell1, choiceCell2, choiceCell10]);
    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 8', [choiceCell1, choiceCell2, choiceCell10, choiceCell11]);
    screenManager.presentChoiceSet(choiceSet);
    screenManager.setTitle('Choices with same voice commands as preloaded. No choices should be showing');
    await sleep(5000);
    choiceSet.cancel();
    await sleep(1000);

    await screenManager.preloadChoices([choiceCell1, choiceCell2, choiceCell10]);
    await screenManager.preloadChoices([choiceCell11]);
    screenManager.setTitle('Preload a choice cell with duplicate voice commands (Check logs)');
    if (screenManager.getPreloadedChoices().findIndex(choice => choice.getText() === 'hello 11') !== -1) {
        console.error("ERROR: Found the choice cell with the duplicate voice command (hello 11)")
    } else {
        console.log("SUCCESS! No choice cell found with the duplicate voice command (hello 11)")
    }
    await sleep(4000);
    choiceSet.cancel();
    await sleep(1000);

    const keyboardProperties = new SDL.rpc.structs.KeyboardProperties()
        .setLanguage(SDL.rpc.enums.Language.EN_US)
        .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.QWERTY);

    const keyboard = new SDL.manager.screen.choiceset.KeyboardListener()
        .setOnUserDidSubmitInput(() => {
            console.log("Keyboard Event - OnUserDidSubmitInput")
        })
        .setOnKeyboardDidAbortWithReason(() => {
            console.log("Keyboard Event - OnKeyboardDidAbortWithReason")
        })
        .setUpdateAutocompleteWithInput(() => {
            console.log("Keyboard Event - UpdateAutocompleteWithInput")
        })
        .setUpdateCharacterSetWithInput(() => {
            console.log("Keyboard Event - UpdateCharacterSetWithInput")
        })
        .setOnKeyboardDidSendEvent(() => {
            console.log("Keyboard Event - OnKeyboardDidSendEvent")
        })
        .setOnKeyboardInputMaskHasChanged(() => {
            console.log("Keyboard Event - OnKeyboardInputMaskHasChanged")
        })

    await screenManager.preloadChoices([choiceCell1, choiceCell2]);
    choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('hello 9', [choiceCell1, choiceCell2]);
    screenManager.presentSearchableChoiceSet(choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, keyboard);
    screenManager.setTitle('Sending searchable choice set. Check keyboard - 10 seconds');
    await sleep(10000);

    const cancelId = screenManager.presentKeyboard('hello', keyboardProperties, keyboard);
    screenManager.setTitle('Presenting a keyboard. Check keyboard - cancelled in 10 seconds');
    await sleep(10000);
    screenManager.dismissKeyboard(cancelId);

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};


function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}