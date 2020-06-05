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

import { _SdlManagerBase } from './_SdlManagerBase.js';
import { _SubManagerBase } from './_SubManagerBase.js';
import { _LifecycleManager } from './lifecycle/_LifecycleManager.js';
import { _LifecycleListener } from './lifecycle/_LifecycleListener.js';
import { SetAppIcon } from '../rpc/messages/SetAppIcon.js';
import { PermissionManager } from './permission/PermissionManager.js';
import { FileManager } from './file/FileManager.js';
import { ScreenManager } from './screen/ScreenManager.js';
import { ChangeRegistration } from '../rpc/messages/ChangeRegistration.js';

class SdlManager extends _SdlManagerBase {
    /**
     * Initializes an instance of SdlManager.
     * @class
     * @param {AppConfig} appConfig - An instance of AppConfig describing the application's metadata and desired transport
     * @param {ManagerListener} managerListener - An instance of ManagerListener to be used to listen for manager events
     */
    constructor (appConfig = null, managerListener = null) {
        super(appConfig, managerListener);
        this._initStarted = false;
        this._sdlSecList = [];
        this._serviceEncryptionListener = null;
        this._lifecycleManager = null;
        this._permissionManager = null;
        this._fileManager = null;
        this._screenManager = null;
        this._lifecycleConfig = null;

        // NOTE: use "self" for calling "this" inside async methods until resolved:
        // https://github.com/rpetrich/babel-plugin-transform-async-to-promises/issues/54
        const self = this;

        this._lifecycleListener = new _LifecycleListener();
        this._lifecycleListener.setOnProxyConnected(async (manager) => {
            if (!self._initStarted) {
                self._changeRegistrationRetry = 0;
                self._checkLifecycleConfiguration();
                self._initStarted = true;
                await self._initialize();
                self._checkState(); // check submanagers' states after initialization
            }
        });
        this._lifecycleListener.setOnProxyClosed((lifecycleManager, info, reason) => {
            if (this._managerListener !== null) {
                this._managerListener.onDestroy(this);
            }
        });
        this._lifecycleListener.setOnServiceStarted((serviceType, sessionId, correlationId) => {});
        this._lifecycleListener.setOnServiceEnded((serviceType) => {});
        this._lifecycleListener.setOnError((lifecycleManager, info) => {});
    }

    /**
     * Add a listener for a given FunctionID
     * @param {Number} functionId - A Function ID from the RPC Spec
     * @param {function} listener - A callback function(RpcMessage)
     * @returns {SdlManager} - A reference to this instance to support method chaining.
     */
    addRpcListener (functionId, listener) {
        this._lifecycleManager.addRpcListener(functionId, listener);
        return this;
    }

    /**
     * Remove a listener for a given FunctionID
     * @param {Number} functionId - A Function ID from the RPC Spec
     * @param {function} listener - A callback function(RpcMessage)
     * @returns {SdlManager} - A reference to this instance to support method chaining.
     */
    removeRpcListener (functionId, listener) {
        this._lifecycleManager.removeRpcListener(functionId, listener);
        return this;
    }

    /**
     * Checks the state of sub-managers
     * @protected
     * @returns {SdlManager} - A reference to this instance to support method chaining.
     */
    _checkState () {
        if (
            this._permissionManager !== null
            && this._fileManager !== null
            && this._screenManager !== null
        ) {
            if (
                this._permissionManager._getState() === _SubManagerBase.READY
                && this._fileManager._getState() === _SubManagerBase.READY
                && this._screenManager._getState() === _SubManagerBase.READY
            ) {
                this._transitionToState(_SubManagerBase.READY);
                this._handleQueuedNotifications();
                this._notifyDevListener(null);
                this._onReady();
            } else if (
                this._permissionManager._getState() === _SubManagerBase.ERROR
                && this._fileManager._getState() === _SubManagerBase.ERROR
                && this._screenManager._getState() === _SubManagerBase.ERROR
            ) {
                this._transitionToState(_SubManagerBase.ERROR);
                this._notifyDevListener('ERROR: all SDL Sub Managers are in error state');
            } else if (
                this._permissionManager._getState() === _SubManagerBase.SETTING_UP
                || this._fileManager._getState() === _SubManagerBase.SETTING_UP
                || this._screenManager._getState() === _SubManagerBase.SETTING_UP
            ) {
                this._transitionToState(_SubManagerBase.SETTING_UP);
            } else {
                this._transitionToState(_SubManagerBase.LIMITED);
                this._handleQueuedNotifications();
                this._notifyDevListener(null);
                this._onReady();
            }
        } else {
            // We should never be here, but somehow one of the sub-sub managers is null
            this._transitionToState(_SubManagerBase.ERROR);
            this._notifyDevListener('ERROR: one of the SDL Sub Managers is null');
        }
        return this;
    }

    /**
     * Alerts the ManagerListener of the Manager state
     * @private
     * @param {string|null} info - Error information
     * @returns {SdlManager} - A reference to this instance to support method chaining.
     */
    _notifyDevListener (info) {
        if (this._managerListener !== null) {
            if (this._getState() === _SubManagerBase.ERROR) {
                this._managerListener.onError(this, info);
            } else {
                this._managerListener.onStart(this);
            }
        }
        return this;
    }

    /**
     * Uploads (if necessary) and sets the App's icon if the managers are in an appropriate state
     * @private
     * @returns {Promise} - A promise.
     */
    async _onReady () {
        // Set the app icon
        if (this._lifecycleConfig !== null && this._lifecycleConfig.getAppIcon() !== null) {
            if (
                this._fileManager !== null
                && this._fileManager._getState() === _SubManagerBase.READY
                && !this._fileManager.hasUploadedFile(this._lifecycleConfig.getAppIcon())
            ) {
                // Icon not uploaded yet
                const uploadResult = await this._fileManager.uploadArtwork(this._lifecycleConfig.getAppIcon());
                if (uploadResult) {
                    await this.sendRpc(
                        new SetAppIcon().setFileName(this._lifecycleConfig.getAppIcon().getName())
                    );
                }
            } else {
                // Icon already uploaded
                await this.sendRpc(
                    new SetAppIcon().setFileName(this._lifecycleConfig.getAppIcon().getName())
                );
            }
        }
    }

    /**
     * Initializes sub-managers
     * @private
     * @returns {Promise} - A promise.
     */
    _initialize () {
        // Instantiate sub managers
        this._permissionManager = new PermissionManager(this._lifecycleManager);
        this._fileManager = new FileManager(this._lifecycleManager);
        this._screenManager = new ScreenManager(this._lifecycleManager, this._fileManager);

        // Start sub managers
        return Promise.all([
            this._permissionManager.start(),
            this._fileManager.start(),
            this._screenManager.start(),
        ]);
    }

    /**
     * Check if the HMI's language matches the app's language and performs a ChangeRegistration if necessary
     * @private
     */
    _checkLifecycleConfiguration () {
        const actualLanguage = this._lifecycleManager.getRegisterAppInterfaceResponse().getLanguage();

        if (actualLanguage !== null && actualLanguage !== this._lifecycleConfig.getLanguageDesired()) {
            // HMI language doesn't match the app's desired display language
            const lifecycleConfigUpdate = this._managerListener.managerShouldUpdateLifecycle(actualLanguage);

            if (lifecycleConfigUpdate !== null) {
                // send a ChangeRegistration RPC
                const changeRegistration = new ChangeRegistration();
                changeRegistration
                    .setLanguage(actualLanguage)
                    .setHmiDisplayLanguage(actualLanguage)
                    .setAppName(lifecycleConfigUpdate.getAppName())
                    .setNgnMediaScreenAppName(lifecycleConfigUpdate.getShortAppName())
                    .setTtsName(lifecycleConfigUpdate.getTtsName())
                    .setVrSynonyms(lifecycleConfigUpdate.getVoiceRecognitionCommandNames());

                this.sendRpc(changeRegistration)
                    .then((response) => {
                        this._lifecycleConfig.setLanguageDesired(actualLanguage);
                        this._lifecycleConfig.setHmiDisplayLanguageDesired(actualLanguage);
                        if (lifecycleConfigUpdate.getAppName() !== null) {
                            this._lifecycleConfig.setAppName(lifecycleConfigUpdate.getAppName());
                        }
                        if (lifecycleConfigUpdate.getShortAppName() !== null) {
                            this._lifecycleConfig.setShortAppName(lifecycleConfigUpdate.getShortAppName());
                        }
                        if (lifecycleConfigUpdate.getTtsName() !== null) {
                            this._lifecycleConfig.setTtsName(lifecycleConfigUpdate.getTtsName());
                        }
                        if (lifecycleConfigUpdate.getVoiceRecognitionCommandNames() !== null) {
                            this._lifecycleConfig.setVrSynonyms(lifecycleConfigUpdate.getVoiceRecognitionCommandNames());
                        }
                    });
            }
        }
    }

    /**
     * Retrieves a reference to the PermissionManager, if ready
     * @returns {PermissionManager|null} - The PermissionManager.
     */
    getPermissionManager () {
        if (
            this._permissionManager._getState() !== _SubManagerBase.READY
            && this._permissionManager._getState() !== _SubManagerBase.LIMITED
        ) {
            console.log('PermissionManager should not be accessed because it is not in READY/LIMITED state');
        }
        this._checkSdlManagerState();
        return this._permissionManager;
    }

    /**
     * Retrieves a reference to the FileManager, if ready
     * @returns {FileManager|null} - The FileManager.
     */
    getFileManager () {
        if (
            this._fileManager._getState() !== _SubManagerBase.READY
            && this._fileManager._getState() !== _SubManagerBase.LIMITED
        ) {
            console.log('FileManager should not be accessed because it is not in READY/LIMITED state');
        }
        this._checkSdlManagerState();
        return this._fileManager;
    }

    /**
     * Retrieves a reference to the ScreenManager, if ready
     * @returns {ScreenManager|null} - The ScreenManager.
     */
    getScreenManager () {
        if (
            this._screenManager._getState() !== _SubManagerBase.READY
            && this._screenManager._getState() !== _SubManagerBase.LIMITED
        ) {
            console.log('ScreenManager should not be accessed because it is not in READY/LIMITED state');
        }
        this._checkSdlManagerState();
        return this._screenManager;
    }

    /**
     * Retrieves a reference to the SystemCapabilityManager
     * @returns {SystemCapabilityManager} - The SystemCapabilityManager.
     */
    getSystemCapabilityManager () {
        return this._lifecycleManager.getSystemCapabilityManager(this);
    }

    /**
     * Initializes the LifecycleManager using the AppConfig and starts the transport
     * @returns {SdlManager} - A reference to this instance to support method chaining.
     */
    start () {
        if (this._lifecycleManager === null) {
            if (this.getAppConfig() !== null) {
                this._lifecycleConfig = this.getAppConfig().getLifecycleConfig();

                if (this._lifecycleConfig === null) {
                    throw new Error('AppConfig must have a LifecycleConfig defined');
                }

                if (this._lifecycleConfig.getTransportConfig() === null) {
                    throw new Error('LifecycleConfig must have a transport config defined');
                }

                if (this._lifecycleConfig.getAppName() === null) {
                    throw new Error('LifecycleConfig must have an app name defined');
                }

                if (this._lifecycleConfig.getAppId() === null) {
                    throw new Error('LifecycleConfig must have an app ID defined');
                }

                if (this.getManagerListener() === null) {
                    throw new Error('An SdlManagerListener must be defined');
                }

                this._lifecycleManager = new _LifecycleManager(this._lifecycleConfig, this._lifecycleListener);

                /* FIXME: setSdlSecurity and related methods/classes do not exist
                if (this._sdlSecList.length > 0) {
                    this._lifecycleManager.setSdlSecurity(this._sdlSecList, this._serviceEncryptionListener);
                }
                */

                this._lifecycleManager.start();
            } else {
                throw new Error('An AppConfig must be provided');
            }
        }
        return this;
    }

    /**
     * Gracefully disposes the managers and alerts and destroys the ManagerListener
     * @returns {SdlManager} - A reference to this instance to support method chaining.
     */
    dispose () {
        if (this._permissionManager !== null) {
            this._permissionManager.dispose();
        }

        if (this._fileManager !== null) {
            this._fileManager.dispose();
        }

        if (this._screenManager !== null) {
            this._screenManager.dispose();
        }

        if (this._lifecycleManager !== null) {
            this._lifecycleManager.stop();
        }

        if (this._managerListener !== null) {
            this._managerListener.onDestroy();
            this._managerListener = null;
        }

        return this;
    }

    /**
     * Sends a single RPC
     * @param {RpcMessage} message - An RPC message to send.
     * @returns {Promise} - A Promise which resolves if the RPC response is SUCCESS, otherwise rejects
     */
    async sendRpc (message) {
        return this._lifecycleManager.sendRpcMessage(message);
    }

    /**
     * Sends multiple RPCs asynchronously
     * @param {RpcMessage[]} messages - An array of RpcMessages
     * @returns {Promise} - A Promise which resolves if all RPCs respond with SUCCESS, otherwise rejects with the first failure
     */
    async sendRpcs (messages) {
        if (!Array.isArray(messages)) {
            return Promise.reject('messages is not an array');
        }
        // Build an array of RPC Promises from the messages
        const rpcPromiseArray = messages.map((message) => {
            return this.sendRpc(message);
        });
        return Promise.all(rpcPromiseArray);
    }

    /**
     * Sends multiple RPCs synchronously (in order)
     * @param {RpcMessage[]} messages - An array of RpcMessages
     * @returns {Promise} - A Promise which resolves with the last RPC response if all RPCs respond with SUCCESS, otherwise rejects with the first failure
     */
    async sendSequentialRpcs (messages) {
        return messages.reduce((chain, message) => {
            return chain.then(val => this.sendRpc(message));
        }, Promise.resolve());
    }

    /**
     * Retreives the RAI response from the _LifecycleManager
     * @returns {RegisterAppInterfaceResponse|null} - A RegisterAppInterfaceResponse.
     */
    getRegisterAppInterfaceResponse () {
        if (this._lifecycleManager !== null) {
            return this._lifecycleManager.getRegisterAppInterfaceResponse();
        }
        return null;
    }

    /**
     * Retrieves the current HMI status from the _LifecycleManager
     * @returns {HMILevel|null} - The HMI Level.
     */
    getCurrentHmiStatus () {
        if (this._lifecycleManager !== null) {
            return this._lifecycleManager.getCurrentHmiStatus();
        }
        return null;
    }

    /**
     * Retrieves the Auth Token from the _LifecycleManager
     * @returns {string|null} - The auth token.
     */
    getAuthToken () {
        return this._lifecycleManager.getAuthToken();
    }
}

export { SdlManager };
