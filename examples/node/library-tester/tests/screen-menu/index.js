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
    const artwork1 = new SDL.manager.file.filetypes.SdlArtwork(fileName, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-choices/test_icon_1.png');
    const artwork2 = new SDL.manager.file.filetypes.SdlArtwork(fileName2, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-choices/weather-icon.png')
    const artwork2Changed = new SDL.manager.file.filetypes.SdlArtwork(fileName2, SDL.rpc.enums.FileType.GRAPHIC_PNG)
        .setFilePath('./tests/screen-choices/test_icon_1.png')
        .setOverwrite(true);

    // start tests 
    screenManager.setTitle('Find and select the appropriate menu buttons to continue');

    await new Promise(resolve => {
        const subCell1 = new SDL.manager.screen.menu.MenuCell('Click here to continue the test')
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                .setOnTriggered(source => {
                    if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                        resolve();
                    }
                })
            )
            .setIcon(artwork2)
            .setVoiceCommands(['I am a voice command'])

        const subCell2 = new SDL.manager.screen.menu.MenuCell('Do not click me!')
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener())
            .setIcon(artwork1)
            .setVoiceCommands(['I am also... a voice command'])

        const mainCell1 = new SDL.manager.screen.menu.MenuCell('Check for set voice commands and images on all menu items')
            .setIcon(artwork1)
            .setSubCells([subCell1, subCell2]);

        screenManager.setMenu([mainCell1]);
    });

    screenManager.setTitle('The menu should no longer exist. No voice commands either');
    screenManager.setMenu([]);
    await sleep(7000);

    screenManager.setTitle('The menu should automatically show up. Click the appropriate menu button');

    await new Promise(resolve => {
        let cells = ['We show up without you clicking anything!', 'Click on me once you are done!', '3', '4', '5', '6', '7', '8'].map((text, index) => {
            const subCell1 = new SDL.manager.screen.menu.MenuCell('Hi ' + (index + 1));
            const subCell2 = new SDL.manager.screen.menu.MenuCell('Hello ' + (index + 1));

            const cell = new SDL.manager.screen.menu.MenuCell(text)
                .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                    .setOnTriggered(source => {
                        if (source === SDL.rpc.enums.TriggerSource.TS_MENU && text === 'Click on me once you are done!') {
                            resolve(cells);
                        }
                    })
                );
            if (text !== 'Click on me once you are done!') {
                cell.setSubCells([subCell1, subCell2])
            }
            return cell;
        });

        screenManager.setMenu(cells);
        screenManager.openMenu();
    }).then(cells => {
        return new Promise(resolve => {
            // reverse the cells
            cells.forEach(cell => {
                if (cell.getMenuSelectionListener()) {
                    cell.setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                        .setOnTriggered(source => {
                            if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                                resolve();
                            }
                        })
                    );
                }
            });

            screenManager.setTitle('The menu should now be reversed and the menu should open to show BANANAS in a subcell');
            cells[cells.length - 1].getSubCells()[0].setTitle('BANANAS. This cell should have opened automatically')

            screenManager.setMenu(cells.reverse());
            // time is needed to replace the old menu cells
            setTimeout(() => {
                screenManager.openSubMenu(cells[0]);
            }, 1000)
        });
    });

    await new Promise(resolve => {
        const subCell1 = new SDL.manager.screen.menu.MenuCell('still same title')
            .setSecondaryText('secondary 1')
        const subCell2 = new SDL.manager.screen.menu.MenuCell('still same title')
            .setSecondaryText('secondary 2')
        const subCell3 = new SDL.manager.screen.menu.MenuCell('still same title')
            .setSecondaryText('click on me to continue!')
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                .setOnTriggered(source => {
                    if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                        resolve();
                    }
                })
            );

        const mainCell1 = new SDL.manager.screen.menu.MenuCell('same title')
            .setSecondaryText('secondary 1')
        const mainCell2 = new SDL.manager.screen.menu.MenuCell('same title')
            .setSecondaryText('secondary 2')
        const mainCell3 = new SDL.manager.screen.menu.MenuCell('same title')
            .setSubCells([subCell1, subCell2, subCell3]);

        screenManager.setTitle('Find the menu cell to click to continue');
        screenManager.setMenu([mainCell1, mainCell2, mainCell3]);
    });

    screenManager.setMenu([new SDL.manager.screen.menu.MenuCell('identical'), new SDL.manager.screen.menu.MenuCell('identical')]);
    screenManager.setTitle('The menus should not have changed and no text says "identical"');
    await sleep(7000);

    screenManager.setMenu([new SDL.manager.screen.menu.MenuCell('testing')
        .setSubCells([
            new SDL.manager.screen.menu.MenuCell('testing')
                .setVoiceCommands(['identical', 'identical', 'identical'])
        ])
    ]);
    screenManager.setTitle('Check again for no change. Attempted duplicate voice commands.');
    await sleep(7000);

    await new Promise(resolve => {
        screenManager.setMenu([new SDL.manager.screen.menu.MenuCell('Look at my image! Click on me!')
            .setIcon(artwork2)
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                .setOnTriggered(source => {
                    if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                        resolve();
                    }
                })
            )
        ]);
        screenManager.setTitle('Check the menu for a command with an image.');
    });

    await new Promise(resolve => {
        screenManager.setMenu([new SDL.manager.screen.menu.MenuCell('Did my image change? Click on me!')
            .setIcon(artwork2Changed)
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                .setOnTriggered(source => {
                    if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                        resolve();
                    }
                })
            )
        ]);
        screenManager.setTitle('Check the menu for a command with a new image.');
    });

    await new Promise(resolve => {
        const subCell1 = new SDL.manager.screen.menu.MenuCell('click! I should be a LIST')
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                .setOnTriggered(source => {
                    if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                        resolve();
                    }
                })
            );

        const mainCell1 = new SDL.manager.screen.menu.MenuCell('one')
            .setSecondaryText('second')
        const mainCell2 = new SDL.manager.screen.menu.MenuCell('two')
            .setTertiaryText('third')
        const mainCell3 = new SDL.manager.screen.menu.MenuCell('three')
            .setSubCells([subCell1]);

        screenManager.setMenuConfiguration(new SDL.manager.screen.menu.MenuConfiguration()
            .setMenuLayout(SDL.rpc.enums.MenuLayout.TILES)
            .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST))

        screenManager.setTitle('The main menu should be in TILES. Click the submenu item');
        screenManager.setMenu([mainCell1, mainCell2, mainCell3]);
    });

    await new Promise(resolve => {
        const subCell1 = new SDL.manager.screen.menu.MenuCell('click! I should be a tile!')
            .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener()
                .setOnTriggered(source => {
                    if (source === SDL.rpc.enums.TriggerSource.TS_MENU) {
                        resolve();
                    }
                })
            );

        screenManager.setMenuConfiguration(new SDL.manager.screen.menu.MenuConfiguration()
            .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
            .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST))

        const mainCell1 = new SDL.manager.screen.menu.MenuCell('LIST item')
            .setSecondaryText('second')
        const mainCell2 = new SDL.manager.screen.menu.MenuCell('other LIST item')
            .setTertiaryText('third')
        const mainCell3 = new SDL.manager.screen.menu.MenuCell('three')
            .setSubMenuLayout(SDL.rpc.enums.MenuLayout.TILES)
            .setSubCells([subCell1]);

        screenManager.setTitle('Find the submenu in TILES format. Click to continue');
        screenManager.setMenu([mainCell1, mainCell2, mainCell3]);
    });
    
    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};


function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}