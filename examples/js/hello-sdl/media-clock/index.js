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

async function mediaClockTests (catalogRpc) {
    const appId = 'media-clock';

    const lifecycleConfig = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.WebSocketClientConfig('ws://localhost', 5050));

    const app = new AppHelper(catalogRpc)
        .setLifecycleConfig(lifecycleConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();

    // subscribe to buttons and set seek settings
    sdlManager.getScreenManager().changeLayout(new SDL.rpc.structs.TemplateConfiguration()
        .setTemplate(SDL.rpc.enums.PredefinedLayout.MEDIA));

    await sdlManager.getScreenManager().addButtonListener(SDL.rpc.enums.ButtonName.PLAY_PAUSE, () => {});
    await sdlManager.getScreenManager().addButtonListener(SDL.rpc.enums.ButtonName.SEEKLEFT, (buttonName, rpc) => {
        console.log(rpc);
    });
    await sdlManager.getScreenManager().addButtonListener(SDL.rpc.enums.ButtonName.SEEKRIGHT, () => {});

    // voice command test
    // wait for the user to click on a voice command to continue
    sdlManager.getScreenManager()
        .setTextField1('Media should play at ten times speed!')
        .setTextField2('Seek button icons should update every second (they do not work!)')
        .setTextField3('Find and click on the voice command to finish!');

    let count = 0;

    const timer = setInterval(() => {
        const timeIndicator = new SDL.rpc.structs.SeekStreamingIndicator()
            .setType(SDL.rpc.enums.SeekIndicatorType.TIME)
            .setSeekTime((count % 5) + 1);

        const mediaClock = new SDL.rpc.messages.SetMediaClockTimer()
            .setUpdateMode(SDL.rpc.enums.UpdateMode.COUNTUP)
            .setStartTime(
                new SDL.rpc.structs.StartTime()
                    .setHours(0)
                    .setMinutes(0)
                    .setSeconds(30)
            ).setEndTime(
                new SDL.rpc.structs.StartTime()
                    .setHours(0)
                    .setMinutes(4)
                    .setSeconds(0)
            ).setAudioStreamingIndicator(SDL.rpc.enums.AudioStreamingIndicator.PLAY)
            .setForwardSeekIndicator(timeIndicator)
            .setBackSeekIndicator(timeIndicator)
            .setCountRate(10); // gotta go fast

        sdlManager.sendRpcResolve(mediaClock);
        count++;
    }, 1000);

    await new Promise((resolve, reject) => {
        sdlManager.getScreenManager().setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Click on me!'], () => {
                resolve();
            }),
        ]);
    });

    clearInterval(timer);

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

/**
 * @param timeout
 */
function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}