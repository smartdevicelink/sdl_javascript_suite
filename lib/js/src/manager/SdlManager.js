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

import { SdlManagerBase } from './SdlManagerBase.js';
import { BaseSubManager } from './BaseSubManager.js';
import { LifecycleManager } from './lifecycle/LifecycleManager.js';
import { LifecycleListener } from './lifecycle/LifecycleListener.js';
import { SetAppIcon } from '../rpc/messages/SetAppIcon.js';
import { PermissionManager } from './permission/PermissionManager.js';
import { FileManager } from './file/FileManager.js';
import { ScreenManager } from './screen/ScreenManager.js';


class SdlManager extends SdlManagerBase {
    constructor (appConfig = null, managerListener = null) {
        super(appConfig, managerListener);
        this._initStarted = false;
        this._sdlSecList = [];
        this._serviceEncryptionListener = null;
        this._lifecycleManager = null;
        this._permissionManager = null;
        this._fileManager = null;
        this._screenManager = null;

        this._lifecycleListener = new LifecycleListener();
        this._lifecycleListener.setOnProxyConnected((manager) => {
            if (!this._initStarted) {
                this._changeRegistrationRetry = 0;
                this._checkLifecycleConfiguration();
                this.initialize();
                this._initStarted = true;
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
    */
    addRpcListener (functionId, listener) {
        this._lifecycleManager.addRpcListener(functionId, listener);
        return this;
    }

    /**
    * Remove a listener for a given FunctionID
    */
    removeRpcListener (functionId, listener) {
        this._lifecycleManager.removeRpcListener(functionId, listener);
        return this;
    }

    /**
    * @return {SdlManagerBase}
    */
    checkState () {
        if (
            this._permissionManager !== null
            && this._fileManager !== null
            && this._screenManager !== null
        ) {
            if (
                this._permissionManager.getState() === BaseSubManager.READY
                && this._fileManager.getState() === BaseSubManager.READY
                && this._screenManager.getState() === BaseSubManager.READY
            ) {
                this._transitionToState(BaseSubManager.READY);
                this._handleQueuedNotifications();
                this._notifyDevListener(null);
                this._onReady();
            } else if (
                this._permissionManager.getState() === BaseSubManager.ERROR
                && this._fileManager.getState() === BaseSubManager.ERROR
                && this._screenManager.getState() === BaseSubManager.ERROR
            ) {
                this._transitionToState(BaseSubManager.ERROR);
                this._notifyDevListener('ERROR: all SDL Sub Managers are in error state');
            } else if (
                this._permissionManager.getState() === BaseSubManager.SETTING_UP
                || this._fileManager.getState() === BaseSubManager.SETTING_UP
                || this._screenManager.getState() === BaseSubManager.SETTING_UP
            ) {
                this._transitionToState(BaseSubManager.SETTING_UP);
            } else {
                this._transitionToState(BaseSubManager.LIMITED);
                this._handleQueuedNotifications();
                this._notifyDevListener(null);
                this._onReady();
            }
        } else {
            // We should never be here, but somehow one of the sub-sub managers is null
            this._transitionToState(BaseSubManager.ERROR);
            this._notifyDevListener('ERROR: one of the SDL Sub Managers is null');
        }
    }

    _notifyDevListener (info) {
        if (this._managerListener !== null) {
            if (this.getState() === BaseSubManager.ERROR) {
                this._managerListener.onError(this, info);
            } else {
                this._managerListener.onStart(this);
            }
        }
    }

    async _onReady () {
        // Set the app icon
        if (this._appConfig !== null && this._appConfig.getAppIcon() !== null) {
            if (
                this._fileManager !== null
                && this._fileManager.getState() === BaseSubManager.READY
                && !this._fileManager.hasUploadedFile(this._appConfig.getAppIcon())
            ) {
                // Icon not uploaded yet
                const uploadResult = await this._fileManager.uploadArtwork(this._appConfig.getAppIcon());
                if (uploadResult) {
                    await this._lifecycleManager.sendRpc(
                        new SetAppIcon(this._appConfig.getAppIcon().getName())
                    );
                }
            } else {
                // Icon already uploaded
                await this._lifecycleManager.sendRpc(
                    new SetAppIcon(this._appConfig.getAppIcon().getName())
                );
            }
        }
    }

    /**
    * @return {Promise}
    */
    initialize () {
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

    _checkLifecycleConfiguration () {
        const actualLanguage = this._lifecycleManager.getRegisterAppInterfaceResponse().getLanguage();

        if (actualLanguage !== null && actualLanguage !== this._hmiLanguage) {
            // TODO: missing LifecycleConfigurationUpdate class and ChangeRegistration RPC
            const lifecycleConfigUpdate = null;

            if (lifecycleConfigUpdate !== null) {
                // TODO: ChangeRegistration
            }
        }
    }

    /**
    * @return {PermissionManager}
    */
    getPermissionManager () {
        if (
            this._permissionManager.getState() !== BaseSubManager.READY
            && this._permissionManager.getState() !== BaseSubManager.LIMITED
        ) {
            console.log('PermissionManager should not be accessed because it is not in READY/LIMITED state');
        }
        this.checkSdlManagerState();
        return this._permissionManager;
    }

    /**
    * @return {FileManager}
    */
    getFileManager () {
        if (
            this._fileManager.getState() !== BaseSubManager.READY
            && this._fileManager.getState() !== BaseSubManager.LIMITED
        ) {
            console.log('FileManager should not be accessed because it is not in READY/LIMITED state');
        }
        this.checkSdlManagerState();
        return this._fileManager;
    }

    /**
    * @return {ScreenManager}
    */
    getScreenManager () {
        if (
            this._screenManager.getState() !== BaseSubManager.READY
            && this._screenManager.getState() !== BaseSubManager.LIMITED
        ) {
            console.log('ScreenManager should not be accessed because it is not in READY/LIMITED state');
        }
        this.checkSdlManagerState();
        return this._screenManager;
    }

    /**
    * @return {SystemCapabilityManager}
    */
    getSystemCapabilityManager () {
        return this._lifecycleManager.getSystemCapabilityManager(this);
    }

    /**
    * @return {SdlManager}
    */
    start () {
        if (this._lifecycleManager === null) {
            if (this.getAppConfig() !== null) {
                if (this.getAppConfig().getTransportConfig() === null) {
                    throw new Error('AppConfig must have a transport config defined');
                }

                if (this.getAppConfig().getAppName() === null) {
                    throw new Error('AppConfig must have an app name defined');
                }

                if (this.getAppConfig().getAppId() === null) {
                    throw new Error('AppConfig must have an app ID defined');
                }

                if (this.getManagerListener() === null) {
                    throw new Error('An SdlManagerListener must be defined');
                }

                this._lifecycleManager = new LifecycleManager(this.getAppConfig(), this._lifecycleListener);

                /* FIXME: setSdlSecurity and related methods/classes do not exist
                if (this._sdlSecList.length > 0) {
                    this._lifecycleManager.setSdlSecurity(this._sdlSecList, this._serviceEncryptionListener);
                }
                */

                this.initNotificationQueue();
                this._lifecycleManager.start();
            } else {
                throw new Error('An AppConfig must be provided');
            }
        }
        return this;
    }

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
    * @abstract
    * @param {RpcMessage} message
    * @return {Promise} - Resolves if the RPC response is SUCCESS, otherwise rejects
    */
    sendRpc (message) {
        return this._lifecycleManager.sendRpcMessage(message);
    }

    /**
    * Sends multiple RPCs asynchronously
    * @abstract
    * @param {RpcMessage[]} messages - An array of RpcMessages
    * @return {Promise} - Resolves if all RPCs respond with SUCCESS, otherwise rejects with the first failure
    */
    sendRpcs (messages) {
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
    * @abstract
    * @param {RpcMessage[]} messages
    * @return {Promise} - Resolves if all RPCs respond with SUCCESS, otherwise rejects with the first failure
    */
    sendSequentialRpcs (messages) {
        return messages.reduce((chain, message) => {
            return chain.then(val => this.sendRpc(message));
        }, Promise.resolve());
    }

    /**
    * @return {RegisterAppInterfaceResponse}
    */
    getRegisterAppInterfaceResponse () {
        if (this._lifecycleManager !== null) {
            return this._lifecycleManager.getRegisterAppInterfaceResponse();
        }
        return null;
    }

    /**
    * @return {OnHmiStatus}
    */
    getCurrentHmiStatus () {
        if (this._lifecycleManager !== null) {
            return this._lifecycleManager.getCurrentHmiStatus();
        }
        return null;
    }

    /**
    * @return {string}
    */
    getAuthToken () {
        return this._lifecycleManager.getAuthToken();
    }
}

export { SdlManager };