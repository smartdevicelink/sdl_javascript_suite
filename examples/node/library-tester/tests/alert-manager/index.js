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
    const appId = 'alert-manager';

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

    /**
     * Creates a promise that will resolve when the alert has finished presenting
     * @param {AlertView} alertView - the AlertView to be presented
     * @returns {Promise} - A promise that resolves when the operation is complete
     */
    async function promisifyPresentAlert (alertView) {
        return new Promise((resolve) => {
            const alertCompletionListener = new SDL.manager.screen.utils.AlertCompletionListener()
                .setOnComplete((success, tryAgainTime) => {
                    resolve();
                });
            screenManager.presentAlert(alertView, alertCompletionListener);
        });
    }

    const text1Alert = new SDL.manager.screen.utils.AlertView()
        .setText('text1');

    await promisifyPresentAlert(text1Alert);

    const text2Alert = new SDL.manager.screen.utils.AlertView()
        .setSecondaryText('text2');

    await promisifyPresentAlert(text2Alert);

    const audioFileOnlyAlert = new SDL.manager.screen.utils.AlertView()
        .setAudio(new SDL.manager.screen.utils.AlertAudioData(null, null,
            new SDL.manager.file.filetypes.SdlFile()
                .setName('sound-file')
                .setFilePath('./tests/alert-manager/sound-file.mp3')
                .setType(SDL.rpc.enums.FileType.AUDIO_MP3)
        ));

    await promisifyPresentAlert(audioFileOnlyAlert);

    const audioSynthOnly = new SDL.manager.screen.utils.AlertView()
        .setAudio(new SDL.manager.screen.utils.AlertAudioData('speech synth'));

    await promisifyPresentAlert(audioSynthOnly);

    // call cancel on AlertView to cancel
    const cancelUIAlert = new SDL.manager.screen.utils.AlertView()
        .setText('text1');
    cancelUIAlert.cancel();

    await promisifyPresentAlert(cancelUIAlert);

    const cancelSynthOnly = new SDL.manager.screen.utils.AlertView()
        .setAudio(new SDL.manager.screen.utils.AlertAudioData('speech synth'));
    cancelSynthOnly.cancel();

    await promisifyPresentAlert(cancelSynthOnly);

    const cancelUISynth = new SDL.manager.screen.utils.AlertView()
        .setAudio(new SDL.manager.screen.utils.AlertAudioData('speech synth'));
    cancelUISynth.cancel();

    await promisifyPresentAlert(cancelUISynth);

    const tenSecondAlert = new SDL.manager.screen.utils.AlertView()
        .setText('10 second alert')
        .setTimeout(10000);

    // don't await here so the next alert is queued early
    promisifyPresentAlert(tenSecondAlert);

    const queuedAlert = new SDL.manager.screen.utils.AlertView()
        .setText('queued');

    await promisifyPresentAlert(queuedAlert);

    const alertview = new SDL.manager.screen.utils.AlertView()
        .setText('text1');
    // send the alert then update it and send again

    await promisifyPresentAlert(alertview);

    alertview.setText('updated text1');
    await promisifyPresentAlert(alertview);

    const state1 = new SDL.manager.screen.utils.SoftButtonState('ROCK', 'rock');
    const state2 = new SDL.manager.screen.utils.SoftButtonState('BUTTON', 'button');

    // send twice to make sure listeners are called correctly
    const softButtOnAlert = new SDL.manager.screen.utils.AlertView()
        .setText('text1')
        .setSoftButtons([
            new SDL.manager.screen.utils.SoftButtonObject('game', [state1], 'ROCK', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('First button pressed!');
                }
            }),
            new SDL.manager.screen.utils.SoftButtonObject('button', [state2], 'BUTTON', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('Second button pressed!');
                }
            }),
        ]);

    await promisifyPresentAlert(softButtOnAlert);
    await promisifyPresentAlert(softButtOnAlert);

    // this should fail since the soft button has more than one state
    new Promise ((resolve, reject) => {
        new SDL.manager.screen.utils.AlertView()
            .setText('text1')
            .setSoftButtons([
                new SDL.manager.screen.utils.SoftButtonObject('game', [state1, state2], 'ROCK', (id, rpc) => {
                    if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                        console.log('First button pressed!');
                    }
                }),
                new SDL.manager.screen.utils.SoftButtonObject('button', [state2], 'BUTTON', (id, rpc) => {
                    if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                        console.log('Second button pressed!');
                    }
                }),
            ]);
    }).catch(() => {});

    const emptyAlert = new SDL.manager.screen.utils.AlertView();
    await promisifyPresentAlert(emptyAlert);

    // force the RPC version to change temporarily
    const oldVersion = sdlManager._lifecycleManager._rpcSpecVersion.getMajor();
    sdlManager._lifecycleManager._rpcSpecVersion.setMajor(4);

    const audioFileOnlyVersionLessThanFiveAlert = new SDL.manager.screen.utils.AlertView()
        .setAudio(new SDL.manager.screen.utils.AlertAudioData(null, null,
            new SDL.manager.file.filetypes.SdlFile()
                .setName('sound-file')
                .setFilePath('./tests/alert-manager/sound-file.mp3')
                .setType(SDL.rpc.enums.FileType.AUDIO_MP3)
        ));

    await promisifyPresentAlert(audioFileOnlyVersionLessThanFiveAlert);

    sdlManager._lifecycleManager._rpcSpecVersion.setMajor(oldVersion);


    const manySoftButtonsAlert = new SDL.manager.screen.utils.AlertView()
        .setText('text1')
        .setSoftButtons([
            new SDL.manager.screen.utils.SoftButtonObject('only', [new SDL.manager.screen.utils.SoftButtonState('ONLY', 'only')], 'ONLY', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('First button pressed!');
                }
            }),
            new SDL.manager.screen.utils.SoftButtonObject('four', [new SDL.manager.screen.utils.SoftButtonState('FOUR', 'four')], 'FOUR', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('Second button pressed!');
                }
            }),
            new SDL.manager.screen.utils.SoftButtonObject('buttons', [new SDL.manager.screen.utils.SoftButtonState('BUTTONS', 'buttons')], 'BUTTONS', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('Third button pressed!');
                }
            }),
            new SDL.manager.screen.utils.SoftButtonObject('shown', [new SDL.manager.screen.utils.SoftButtonState('SHOWN', 'shown')], 'SHOWN', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('Fourth button pressed!');
                }
            }),
            new SDL.manager.screen.utils.SoftButtonObject('unviewable', [new SDL.manager.screen.utils.SoftButtonState('UNVIEWABLE', 'unviewable')], 'UNVIEWABLE', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('Fifth button pressed!');
                }
            }),
            new SDL.manager.screen.utils.SoftButtonObject('invisible', [new SDL.manager.screen.utils.SoftButtonState('INVISIBLE', 'invisible')], 'INVISIBLE', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('Sixth button pressed!');
                }
            }),
        ]);
    await promisifyPresentAlert(manySoftButtonsAlert);


    const allPropsAlert = new SDL.manager.screen.utils.AlertView()
        .setText('everything!')
        .setSecondaryText('text2')
        .setTertiaryText('text3')
        .setTimeout(8000)
        .setShowWaitIndicator(true)
        .setAudio(new SDL.manager.screen.utils.AlertAudioData('speech synth'))
        .setIcon(new SDL.manager.file.filetypes.SdlArtwork('hello', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath('./tests/alert-manager/test_icon_1.png'))
        .setDefaultTimeout(8000)
        .setSoftButtons([
            new SDL.manager.screen.utils.SoftButtonObject('game', [state1], 'ROCK', (id, rpc) => {
                if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                    console.log('First button pressed!');
                }
            }),
        ]);
    await promisifyPresentAlert(allPropsAlert);

    // Cancel a VR only Alert
    screenManager._alertManager._canRunTasks = false;
    const alertView = new SDL.manager.screen.utils.AlertView()
        .setAudio(new SDL.manager.screen.utils.AlertAudioData('You should not be hearing this message.'));
    const alertCompletionListener = new SDL.manager.screen.utils.AlertCompletionListener()
        .setOnComplete((success, tryAgainTime) => {});
    screenManager.presentAlert(alertView, alertCompletionListener);
    alertView.cancel();
    screenManager._alertManager._canRunTasks = true;

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};