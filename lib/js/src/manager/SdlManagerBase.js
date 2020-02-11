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

import { BaseSubManager } from './BaseSubManager.js';

class SdlManagerBase {
    /**
    * @param {AppConfig} appConfig - An instance of AppConfig describing the application's metadata and desired transport
    * @param {ManagerListener} managerListener - An instance of ManagerListener to be used to listen for manager events
    * @constructor
    */
    constructor (appConfig = null, managerListener = null) {
        this._state = -1;
        this._appConfig = appConfig;
        this._managerListener = managerListener;
        this._changeRegistrationRetry = 0;
        this._queuedNotifications = null;
        this._queuedNotificationListener = null;
    }

    /**
    * Retrieves the stored AppConfig instance
    * @return {AppConfig|null}
    */
    getAppConfig () {
        return this._appConfig;
    }

    /**
    * Sets the AppConfig instance
    * @param {AppConfig} appConfig
    * @return {SdlManagerBase}
    */
    setAppConfig (appConfig) {
        this._appConfig = appConfig;
        return this;
    }

    /**
    * Retrieves the stored ManagerListener
    * @return {SdlManagerListener|null}
    */
    getManagerListener () {
        return this._managerListener;
    }

    /**
    * Sets the ManagerListener instance
    * @param {ManagerListener} managerListener
    * @return {SdlManagerBase}
    */
    setManagerListener (managerListener) {
        this._managerListener = managerListener;
        return this;
    }

    /**
    * Retrieves the state of the manager
    * @return {Number}
    */
    getState () {
        return this._state;
    }

    /**
    * Sets the state of the manager
    * @private
    * @param {Number} state
    * @return {SdlManagerBase}
    */
    _transitionToState (state) {
        this._state = state;

        return this;
    }

    /**
    * Checks the manager's state and provides a silent log if it's not ready for use
    * @return {SdlManagerBase}
    */
    checkSdlManagerState () {
        if (this.getState() !== BaseSubManager.READY && this.getState() !== BaseSubManager.LIMITED) {
            console.log('SdlManager is not ready for use, be sure to initialize with start() method, implement callback, and use SubManagers in the SdlManager callback');
        }
        return this;
    }

    /**
    * Set up the notification queue
    * @return {SdlManagerBase}
    */
    initNotificationQueue () {
        // TODO: is this needed?
        return this;
    }

    /**
    * Process the notification queue and replace the listeners with the developer's
    * @private
    * @return {SdlManagerBase}
    */
    _handleQueuedNotifications () {
        // TODO: is this needed?
        return this;
    }

    /**
    * @abstract
    * @return {SdlManagerBase}
    */
    addRpcListener (functionId, listener) {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {SdlManagerBase}
    */
    removeRpcListener (functionId, listener) {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {SdlManagerBase}
    */
    checkState () {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {Promise}
    */
    initialize () {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {SdlManagerBase}
    */
    _checkLifecycleConfiguration () {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {SdlManagerBase}
    */
    start () {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {SdlManagerBase}
    */
    dispose () {
        throw new Error('method must be overridden');
    }

    /**
    * Sends a single RPC
    * @abstract
    * @param {RpcMessage} message
    * @return {Promise}
    */
    sendRpc (message) {
        throw new Error('method must be overridden');
    }

    /**
    * Sends multiple RPCs asynchronously
    * @abstract
    * @param {RpcMessage[]} messages
    * @return {Promise}
    */
    sendRpcs (messages) {
        throw new Error('method must be overridden');
    }

    /**
    * Sends multiple RPCs synchronously
    * @abstract
    * @param {RpcMessage[]} messages
    * @return {Promise}
    */
    sendSequentialRpcs (messages) {
        throw new Error('method must be overridden');
    }

    /**
    * Retreives the RAI response from the LifecycleManager
    * @return {RegisterAppInterfaceResponse|null}
    * @abstract
    */
    getRegisterAppInterfaceResponse () {
        throw new Error('method must be overridden');
    }

    /**
    * Retrieves the current HMI status from the LifecycleManager
    * @return {OnHmiStatus|null}
    * @abstract
    */
    getCurrentHmiStatus () {
        throw new Error('method must be overridden');
    }

    /**
    * Retrieves the Auth Token from the LifecycleManager
    * @return {string|null}
    * @abstract
    */
    getAuthToken () {
        throw new Error('method must be overridden');
    }
}

SdlManagerBase.MAX_RETRY = 3;

export { SdlManagerBase };