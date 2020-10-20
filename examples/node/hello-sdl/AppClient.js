/*
* Copyright (c) 2020, Livio, Inc.
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

const SDL = require('./SDL.min.js');
const CONFIG = require('./config.js');

class AppClient {
    constructor (wsClient) {
        const fileName = `${CONFIG.appId}_icon`;
        this._filePath = './test_icon_1.png';
        const file = new SDL.manager.file.filetypes.SdlFile()
            .setName(fileName)
            .setFilePath(this._filePath)
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setPersistent(true);

        this._lifecycleConfig = new SDL.manager.LifecycleConfig()
            .setAppId(CONFIG.appId)
            .setAppName(CONFIG.appName)
            .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setAppTypes([
                SDL.rpc.enums.AppHMIType.MEDIA,
            ])
            .setTransportConfig(
                new SDL.transport.WebSocketServerConfig(
                    wsClient,
                    CONFIG.connectionLostTimeout
                )
            )
            .setAppIcon(file)
            .setRpcNotificationListeners({
                [SDL.rpc.enums.FunctionID.OnHMIStatus]: this._onHmiStatusListener.bind(this),
            });

        this._appConfig = new SDL.manager.AppConfig()
            .setLifecycleConfig(this._lifecycleConfig);

        const managerListener = new SDL.manager.SdlManagerListener();
        managerListener
            .setOnStart((sdlManager) => {
                this._permissionManager = this._sdlManager.getPermissionManager();
                this._logPermissions();
                this._permissionManager.addListener(
                    [
                        new SDL.manager.permission.PermissionElement(
                            SDL.rpc.enums.FunctionID.SubscribeVehicleData,
                            [
                                'accPedalPosition',
                                'gps',
                                'fuelLevel',
                                'odometer',
                                'prndl',
                            ]
                        ),
                    ],
                    SDL.manager.permission.enums.PermissionGroupType.ANY,
                    (allowedPermissions, permissionGroupStatus) => {
                        console.log('SubscribeVehicleData permissions changed!');
                        console.log('Allowed Permissions: ', allowedPermissions);
                        console.log('Permission Group Status: ', permissionGroupStatus);
                        this._logPermissions();
                    }
                );
                this._onConnected();
            })
            .setOnError((sdlManager, info) => {
                console.error('Error from SdlManagerListener: ', info);
            });

        this._sdlManager = new SDL.manager.SdlManager(this._appConfig, managerListener);
        this._sdlManager.start();

        // for a cloud server app the hmi full will be received before the managers report that they're ready!
        this._managersReady = false;
        this._hmiFull = false;
        this._isButtonSubscriptionRequested = false;
    }

    _onConnected () {
        this._managersReady = true;
        this._checkReadyState();
    }

    _onHmiStatusListener (onHmiStatus) {
        const hmiLevel = onHmiStatus.getHmiLevel();
        this._logPermissions();

        // wait for the FULL state for more functionality
        if (hmiLevel === SDL.rpc.enums.HMILevel.HMI_FULL) {
            this._hmiFull = true;
            this._checkReadyState();
        }
    }

    async _checkReadyState () {
        if (this._managersReady && this._hmiFull) {
            const screenManager = this._sdlManager.getScreenManager();
            const isRpcAllowed = (rpc) => {
                return this._permissionManager &&
                    this._permissionManager.isRpcAllowed(rpc);
            };

            if (!this._isButtonSubscriptionRequested && isRpcAllowed(SDL.rpc.enums.FunctionID.SubscribeButton)) {
                // Get supported buttons
                const availableButtons = this._sdlManager.getRegisterAppInterfaceResponse().getButtonCapabilities().map(function (capability) {
                    return capability.getNameParam();
                });

                // add button listeners
                const ButtonName = SDL.rpc.enums.ButtonName;
                const buttonNames = [ButtonName.PRESET_0, ButtonName.PRESET_1, ButtonName.PRESET_2, ButtonName.PRESET_3,
                    ButtonName.PRESET_4, ButtonName.PRESET_5, ButtonName.PRESET_6, ButtonName.PRESET_7, ButtonName.PRESET_8,
                    ButtonName.PRESET_9, ButtonName.PLAY_PAUSE, ButtonName.OK, ButtonName.SEEKLEFT, ButtonName.SEEKRIGHT,
                    ButtonName.TUNEUP, ButtonName.TUNEDOWN];

                for (const buttonName of buttonNames) {
                    if (availableButtons.indexOf(buttonName) > 0) {
                        console.log('Subscribing to', buttonName);
                        await screenManager.addButtonListener(buttonName, this._onButtonListener.bind(this)).catch(function (err) {
                            console.error(err);
                        });
                    } else {
                        console.log('No capability found for button', buttonName);
                    }
                }

                this._isButtonSubscriptionRequested = true;
            }

            // add voice commands
            screenManager.setVoiceCommands([
                new SDL.manager.screen.utils.VoiceCommand(['Option 1'], () => {
                    console.log('Option one selected!');
                }),
                new SDL.manager.screen.utils.VoiceCommand(['Option 2'], () => {
                    console.log('Option two selected!');
                }),
                new SDL.manager.screen.utils.VoiceCommand(['Option 3'], () => {
                    console.log('Option three selected!');
                }),
            ]);

            // set up the presentation for the manager when its ready
            screenManager.setTextField1('Hello SDL!');
            screenManager.setTextField2('こんにちは');
            screenManager.setTextField3('你好');
            screenManager.setTitle('JavaScript Library');
            screenManager.setTextAlignment(SDL.rpc.enums.TextAlignment.RIGHT_ALIGNED);
            screenManager.setPrimaryGraphic(new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFilePath(this._filePath));
            screenManager.changeLayout(new SDL.rpc.structs.TemplateConfiguration()
                .setTemplate(SDL.rpc.enums.PredefinedLayout.NON_MEDIA));

            const art1 = new SDL.manager.file.filetypes.SdlArtwork('logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFilePath(this._filePath);

            const state1 = new SDL.manager.screen.utils.SoftButtonState('ROCK', 'rock', art1);
            const state2 = new SDL.manager.screen.utils.SoftButtonState('PAPER', 'paper', art1);
            const state3 = new SDL.manager.screen.utils.SoftButtonState('SCISSORS', 'scissors', art1);
            const state4 = new SDL.manager.screen.utils.SoftButtonState('BUTTON', 'button');

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

            await this._sleep(2000);
            softButtonObjects[0].transitionToNextState();
            await this._sleep(2000);
            softButtonObjects[0].transitionToNextState();
            await this._sleep(2000);
        }
    }

    async _sleep (timeout = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    _onButtonListener (buttonName, onButton) {
        if (onButton instanceof SDL.rpc.messages.OnButtonPress) {
            this._sdlManager.getScreenManager().setTextField1(`${buttonName} pressed`);
        } else if (onButton instanceof SDL.rpc.messages.OnButtonEvent) {
            this._sdlManager.getScreenManager().setTextField2(`${buttonName} ${onButton.getButtonEventMode()}`);
        }
    }

    _logPermissions () {
        if (this._permissionManager) {
            console.log(`Show RPC allowed: ${this._permissionManager.isRpcAllowed(SDL.rpc.enums.FunctionID.Show)}`);
            console.log(`PutFile RPC allowed: ${this._permissionManager.isRpcAllowed(SDL.rpc.enums.FunctionID.PutFile)}`);
            console.log(`GetVehicleData RPC allowed: ${this._permissionManager.isRpcAllowed(SDL.rpc.enums.FunctionID.GetVehicleData)}`);
            console.log(`SubscribeVehicleData RPC allowed: ${this._permissionManager.isRpcAllowed(SDL.rpc.enums.FunctionID.SubscribeVehicleData)}`);
        }
    }
}

module.exports = AppClient;
