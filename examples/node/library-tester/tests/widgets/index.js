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
    const appId = 'widgets';

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

    // app logic start

    // send a CreateWindow as a way to see if the HMI supports widgets
    const createWindowResponse = await sdlManager.sendRpc(new SDL.rpc.messages.CreateWindow()
        .setWindowID(1)
        .setWindowName('Widget 1')
        .setType(SDL.rpc.enums.WindowType.WIDGET))
        .catch(err => err); // catch disallowed errors

    if (!createWindowResponse.getSuccess()) {
        console.warn('The HMI does not support adding widgets. Skipping this test.');
        // tear down the app
        await sdlManager.sendRpc(new SDL.rpc.messages.UnregisterAppInterface());
        return sdlManager.dispose();
    }

    // success! send a show to the main and widget window

    sdlManager.sendRpc(new SDL.rpc.messages.Show()
        .setMainField1('Make Widget 1 visible!'));

    await listenForHmiStatus(sdlManager, SDL.rpc.enums.HMILevel.HMI_FULL, 1);

    await sdlManager.sendRpc(new SDL.rpc.messages.Show()
        .setMainField1('This text should be copied')
        .setMainField2('to the second widget!')
        .setWindowID(1));

    // make another widget duplicating the first widget
    await sdlManager.sendRpc(new SDL.rpc.messages.CreateWindow()
        .setWindowID(2)
        .setWindowName('Widget 2')
        .setType(SDL.rpc.enums.WindowType.WIDGET)
        .setDuplicateUpdatesFromWindowID(1));

    sdlManager.sendRpc(new SDL.rpc.messages.Show()
        .setMainField1('Now make Widget 2 visible!'));

    await listenForHmiStatus(sdlManager, SDL.rpc.enums.HMILevel.HMI_FULL, 2);

    await sleep(2000);

    // delete the duplicated window
    await sdlManager.sendRpc(new SDL.rpc.messages.DeleteWindow()
        .setWindowID(2));

    await sdlManager.sendRpc(new SDL.rpc.messages.Show()
        .setMainField1('Now only one widget')
        .setMainField2('should be visible!'));

    await sdlManager.sendRpc(new SDL.rpc.messages.Show()
        .setMainField1('Remove me to complete')
        .setMainField2('the test!')
        .setWindowID(1));

    // listen for a change in the widget to HMI_NONE, which is done by removing the widget from view
    const widgetStatusPromise = await listenForHmiStatus(sdlManager, SDL.rpc.enums.HMILevel.HMI_NONE, 1);

    // tear down the app
    await sdlManager.sendRpc(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function listenForHmiStatus (sdlManager, status, windowId) {
    return new Promise((resolve, reject) => {
        const listener = (message) => {
            if (message.getHmiLevel() === status && message.getWindowID() === windowId) {
                sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.OnHMIStatus, listener);
                resolve(message);
            }
        };
        sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnHMIStatus, listener);
    });
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}