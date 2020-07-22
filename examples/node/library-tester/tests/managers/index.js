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
// use a custom version of the App Helper! We need to use the permission manager for part of this test
const AppHelper = require('./AppHelper.js');

module.exports = async function (catalogRpc) {
    const appId = 'managers';

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

    let permissionChanges = 0;
    const permissionPromise = new Promise((resolve, reject) => {
        permissionListener = (allowedPermissions, permissionGroupStatus) => {
            // should be unknown first, then allowed later
            if (permissionChanges === 0) {
                const unknownEnum = SDL.manager.permission.enums.PermissionGroupStatus.UNKNOWN;
                if (permissionGroupStatus === unknownEnum) {
                    permissionChanges = 1;
                } else {
                    reject(new Error(`Expected permission change for Show to ${unknownEnum}. Got ${permissionGroupStatus}`));
                }
            }
            else if (permissionChanges === 1) {
                const allowedEnum = SDL.manager.permission.enums.PermissionGroupStatus.ALLOWED;
                if (permissionGroupStatus === allowedEnum) {
                    resolve(); // done
                } else {
                    reject(new Error(`Expected permission change for Show to ${allowedEnum}. Got ${permissionGroupStatus}`));
                }
            }
        }
    });
    let lifecycleUpdateHappened = false;
    let hashResumeId = null;

    // check for life cycle updates due to the HMI not expecting the ES_MX language
    await app.start(permissionListener, language => {
        lifecycleUpdateHappened = true;

        return new SDL.manager.lifecycle.LifecycleConfigurationUpdate()
            .setAppName(appId)
            .setShortAppName('Hello');
    });
    // after this point, we are in HMI FULL and managers are ready
    if (!app._gotRair) {
        throw new Error("No RAIR received using the attached listener in AppHelper!");
    }


    if (!lifecycleUpdateHappened) {
        throw new Error("Lifecycle update did not happen! Check that the language passed in is different than what the HMI expects")
    }

    const sdlManager = app.getManager();

    // app logic start
    // listen for OnHashChange updates
    sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnHashChange, onHashChange => {
        hashResumeId = onHashChange.getHashID();
    });

    // use file manager to upload this image
    const fileName = `${appId}_icon.gif`;
    const file = new SDL.manager.file.filetypes.SdlFile()
        .setName(fileName)
        .setFilePath('./tests/managers/test_icon_1.png')
        .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setPersistent(true);

    await sdlManager.getFileManager().uploadFile(file);

    // send a show and show off the large graphic
    const show = new SDL.rpc.messages.Show()
        .setMainField1('You should see a large graphic!')
        .setGraphic(new SDL.rpc.structs.Image().setValueParam(fileName).setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
        .setTemplateConfiguration(new SDL.rpc.structs.TemplateConfiguration()
            .setTemplate('TEXT_WITH_GRAPHIC'));  
    await sdlManager.sendRpcResolve(show);

    await sleep(3000);

    // test the sendRpcResolve, sendRpcsResolve, and sendSequentialRpcsResolve methods 
    // none should throw an error if the RPC is not successful
    const testCommand = new SDL.rpc.messages.AddCommand();
    await sdlManager.sendRpcResolve(testCommand);
    await sdlManager.sendRpcsResolve([testCommand]);
    await sdlManager.sendSequentialRpcsResolve([testCommand]);

    // test the onUpdate cb function for sendRpcsResolve
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.Show()
        .setMainField1('Testing sending batch RPCs. Check the voice commands list'));
    await sleep(3000);

    const voiceCommands = ['This', 'tests', 'the', 'batch', 'rpc', 'sending', 'capabilities.'];
    const addCommands = voiceCommands.map((voiceCommand, index) => {
        return new SDL.rpc.messages.AddCommand()
            .setCmdID(index)
            .setVrCommands([voiceCommand]);
    });
    let remainingRpcs = addCommands.length;
    await sdlManager.sendRpcsResolve(addCommands, (result, remaining) => {
        remainingRpcs--;
        if (!result.getSuccess()) {
            throw new Error(result);
        }
        if (remainingRpcs !== remaining) {
            throw new Error(`Batch RPC counting is misaligned! Expected ${remainingRpcs} but got ${remaining}`)
        }
    });
    await sleep(1500);

    // test the onUpdate cb function for sendSequentialRpcsResolve
    const deleteCommands = voiceCommands.map((voiceCommand, index) => {
        return new SDL.rpc.messages.DeleteCommand()
            .setCmdID(index);
    });
    remainingRpcs = deleteCommands.length;
    await sdlManager.sendSequentialRpcsResolve(deleteCommands, (result, remaining) => {
        remainingRpcs--;
        if (!result.getSuccess()) {
            throw new Error(result);
        }
        if (remainingRpcs !== remaining) {
            throw new Error(`Batch RPC counting is misaligned! Expected ${remainingRpcs} but got ${remaining}`)
        }
    });
    await sleep(1000);

    // switch to non media mode now
    const show2 = new SDL.rpc.messages.Show()
        .setTemplateConfiguration(new SDL.rpc.structs.TemplateConfiguration()
            .setTemplate('NON-MEDIA'));
    await sdlManager.sendRpcResolve(show2);

    // set up the presentation for the manager
    const screenManager = sdlManager.getScreenManager();
    // put all the screen manager updates below into one transaction
    screenManager.beginTransaction();

    screenManager.setTextField1('You should see a softbutton changing states');
    screenManager.setTextField2('A softbutton with a static icon, a primary graphic, and a template title');
    screenManager.setTitle('JavaScript Library');
    screenManager.setTextAlignment(SDL.rpc.enums.TextAlignment.RIGHT_ALIGNED);
    screenManager.setPrimaryGraphic(new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/managers/test_icon_1.png'));

    const staticFile = new SDL.manager.file.filetypes.SdlArtwork()
        .setName('0x0A')
        .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setStaticIcon(true)

    const state1 = new SDL.manager.screen.utils.SoftButtonState('ROCK', 'Find and click');
    const state2 = new SDL.manager.screen.utils.SoftButtonState('PAPER', 'the voice command');
    const state3 = new SDL.manager.screen.utils.SoftButtonState('SCISSORS', 'to continue the test');
    const state4 = new SDL.manager.screen.utils.SoftButtonState('BUTTON', 'button', staticFile);

    const softButtonObjects = [
        new SDL.manager.screen.utils.SoftButtonObject('game', [state1, state2, state3], 'ROCK', (id, rpc) => {
            if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                console.log('First button pressed!');
            }
        }),
        new SDL.manager.screen.utils.SoftButtonObject('button', [state4], 'BUTTON', (id, rpc) => {
            if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                console.log('Second button pressed!');
            }
        }),
    ];

    // set the softbuttons now and rotate through the states of the first softbutton
    await screenManager.setSoftButtonObjects(softButtonObjects);
    // commit the transaction!
    const success = await screenManager.commit();
    if (!success) {
        console.error('The commit for text and button updates failed!');
    }

    // let it run forever
    const timer = setInterval(() => {
        softButtonObjects[0].transitionToNextState();
    }, 2000);

    // add a voice command to finish the test when clicked on, and one to remove after app hash resumption
    const removeMeIndex = 485;
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.AddCommand()
        .setCmdID(removeMeIndex)
        .setVrCommands(['Activate the app after clicking the voice command below']));

    await new Promise((resolve, reject) => {
        sdlManager.getScreenManager().setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Click on me to continue the test!'], () => {
                resolve();
            }),
        ]);
    });
    
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.CloseApplication());
    // wait for the permission change of Show to complete the test
    await permissionPromise;

    // tear down the app
    clearInterval(timer);

    // do not send a URAI, otherwise the hash resumption will not work
    sdlManager.dispose();




    // start another app, where we try and reclaim the previous app's state using the hash resumption ID
    const lifecycleConfig2 = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT))
        .setResumeHash(hashResumeId);
        
    const app2 = new AppHelper(catalogRpc)
        .setLifecycleConfig(lifecycleConfig2);

    await app2.start(() => {});
    
    const sdlManager2 = app2.getManager();

    // second app is ready. if app resumption worked, then the voice command(s) should re-appear
    const removeCommandResult = await sdlManager2.sendRpcResolve(new SDL.rpc.messages.DeleteCommand()
        .setCmdID(removeMeIndex));

    if (!removeCommandResult.getSuccess()) {
        throw new Error("App resumption did not bring back the state of the previous voice command!");
    }
    await sleep(1000);

    await sdlManager2.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
};

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}