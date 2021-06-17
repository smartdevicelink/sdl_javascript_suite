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
    const appId = 'submenu-nested-paging';

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
    let supportsDynamicSubmenus = false;
    let gotUpdateFileNotif = false;
    let gotUpdateSubmenuNotif = false;

    // use file manager to upload this image
    const fileName = `${appId}_icon.png`;
    const file = new SDL.manager.file.filetypes.SdlFile()
        .setName(fileName)
        .setFilePath('./tests/submenu-nested-paging/test_icon_1.png')
        .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setPersistent(true);
    await sdlManager.getFileManager().uploadFile(file);

    // check for dynamic submenu support
    const windowCapability = sdlManager.getSystemCapabilityManager().getDefaultMainWindowCapability();
    if (windowCapability.getDynamicUpdateCapabilities() && windowCapability.getDynamicUpdateCapabilities().getSupportsDynamicSubMenus()) {
        console.log("The HMI supports dynamic submenus!");
        supportsDynamicSubmenus = true;

        sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnUpdateFile, onUpdateFile => {
            gotUpdateFileNotif = true;
        });
        sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnUpdateSubMenu, onUpdateSubMenu => {
            gotUpdateSubmenuNotif = true;
        });

    } else {
        console.log("The HMI does not support dynamic submenus!");
        // tear down the app
        await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
        sdlManager.dispose();
        return;
    }

    screenManager.setTextField1(`Go into the menu to find the item to end the test!`);

    sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnUpdateFile, rpc => {
        // upload a file when requested
        const fileName = rpc.getFileName();
        if (!fileName.startsWith('filetest')) return;
        const file = new SDL.manager.file.filetypes.SdlFile()
            .setName(fileName)
            .setFilePath('./tests/submenu-nested-paging/test_icon_1.png')
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setPersistent(true);
        sdlManager.getFileManager().uploadFile(file);
    });

    sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnUpdateSubMenu, rpc => {
        const id = rpc.getMenuID();
        if (id <= 1000) return;

        const childMenu = new SDL.rpc.messages.AddSubMenu()
        .setMenuID(id + 1)
        .setParentID(id)
        .setMenuName('You are ' + (id - 1000) + ' levels deep!')
        sdlManager.sendRpcResolve(childMenu);
    });

    const menuBranch1 = new SDL.rpc.messages.AddSubMenu()
        .setMenuID(1001)
        .setMenuIcon(new SDL.rpc.structs.Image().setValueParam('does_not_exist').setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
        .setMenuName('Click on me first to test dynamically added menus')
    await sdlManager.sendRpcResolve(menuBranch1);
    
    const addMenu1 = new SDL.rpc.messages.AddSubMenu()
        .setMenuID(1)
        .setMenuIcon(new SDL.rpc.structs.Image().setValueParam('does_not_exist').setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
        .setMenuName('Not deep enough. Click again.')
        .setSecondaryText('Disallowed to continue if driver distraction is ON');
    await sdlManager.sendRpcResolve(addMenu1);

    const addMenu2 = new SDL.rpc.messages.AddSubMenu()
        .setMenuID(2)
        .setMenuName('Getting closer. Are there two images here?')
        .setParentID(1)
        .setMenuIcon(new SDL.rpc.structs.Image().setValueParam(fileName).setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
        .setSecondaryImage(new SDL.rpc.structs.Image().setValueParam(fileName).setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
    await sdlManager.sendRpcResolve(addMenu2);

    const addCommandSwarm = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
        .map(number => {
            const rpc = new SDL.rpc.messages.AddCommand()
                .setCmdID(100 + number)
                .setMenuParams(new SDL.rpc.structs.MenuParams().setParentID(1).setMenuName('<- image dynamically loaded? ' + (100 + number)))
                .setCmdIcon(new SDL.rpc.structs.Image().setValueParam('filetest' + number).setImageType(SDL.rpc.enums.ImageType.DYNAMIC));
            return sdlManager.sendRpcResolve(rpc);
        });
    await Promise.all(addCommandSwarm);

    const addMenu3 = new SDL.rpc.messages.AddSubMenu()
        .setMenuID(3)
        .setMenuName('Almost there. Do you see two smaller texts?')
        .setSecondaryText('I am what you are looking for!')
        .setTertiaryText('Me too!')
        .setParentID(2)
    await sdlManager.sendRpcResolve(addMenu3);

    const addMenu4 = new SDL.rpc.messages.AddCommand()
        .setCmdID(4)
        .setMenuParams(new SDL.rpc.structs.MenuParams().setParentID(3).setMenuName('Done! Click to end the test.'));
    await sdlManager.sendRpcResolve(addMenu4);

    const addMenu5 = new SDL.rpc.messages.AddSubMenu()
        .setMenuID(5)
        .setMenuName('Pretend I am not here, please!')
        .setParentID(3)
    await sdlManager.sendRpcResolve(addMenu5);

    await new Promise((resolve, reject) => {
        sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.OnCommand, onCommand => {
            if (onCommand.getCmdID() === 4) {
                return resolve();
            }
            return reject(`Wrong command received! Got command id ${onCommand.getCmdID()}`)
        });
    });

    // check if certain notifications were received
    if (supportsDynamicSubmenus && !gotUpdateFileNotif) {
        throw new Error("No OnUpdateFile notification was received in this test!");
    }
    if (supportsDynamicSubmenus && !gotUpdateSubmenuNotif) {
        throw new Error("No OnUpdateSubMenu notification was received in this test!");
    }

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};