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

import { _SubManagerBase } from './_SubManagerBase.js';

class _SdlManagerBase {
    /**
     * Initializes an instance of _SdlManagerBase.
     * @class
     * @private
     * @param {AppConfig} appConfig - An instance of AppConfig describing the application's metadata and desired transport
     * @param {ManagerListener} managerListener - An instance of ManagerListener to be used to listen for manager events
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
     * @returns {AppConfig|null} - The AppConfig instance.
     */
    getAppConfig () {
        return this._appConfig;
    }

    /**
     * Retrieves the stored ManagerListener
     * @returns {SdlManagerListener|null} - The SdlManagerListener.
     */
    getManagerListener () {
        return this._managerListener;
    }

    /**
     * Retrieves the state of the manager
     * @protected
     * @returns {Number} - The state as a numeric value.
     */
    _getState () {
        return this._state;
    }

    /**
     * Sets the state of the manager
     * @private
     * @param {Number} state - The state as a numeric value.
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    _transitionToState (state) {
        this._state = state;

        return this;
    }

    /**
     * Checks the manager's state and provides a silent log if it's not ready for use
     * @protected
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    _checkSdlManagerState () {
        if (this._getState() !== _SubManagerBase.READY && this._getState() !== _SubManagerBase.LIMITED) {
            console.log('SdlManager is not ready for use, be sure to initialize with start() method, implement callback, and use SubManagers in the SdlManager callback');
        }
        return this;
    }

    /**
     * Process the notification queue and replace the listeners with the developer's
     * @private
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    _handleQueuedNotifications () {
        return this;
    }

    /**
     * Add an RPC Listener.
     * @abstract
     * @param {FunctionID} functionId - A FunctionID enum value.
     * @param {function} listener - A function to invoke.
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    addRpcListener (functionId, listener) {
        throw new Error('method must be overridden');
    }

    /**
     * Remove an RPC Listener.
     * @abstract
     * @param {FunctionID} functionId - A FunctionID enum value.
     * @param {function} listener - The function to remove as a listener.
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    removeRpcListener (functionId, listener) {
        throw new Error('method must be overridden');
    }

    /**
     * Check the state.
     * @abstract
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    _checkState () {
        throw new Error('method must be overridden');
    }

    /**
     * Initializes the manager.
     * @abstract
     * @returns {Promise} - A promise to resolve when the state is ready.
     */
    _initialize () {
        throw new Error('method must be overridden');
    }

    /**
     * Checks the lifecycle configuration.
     * @abstract
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    _checkLifecycleConfiguration () {
        throw new Error('method must be overridden');
    }

    /**
     * Starts the manager.
     * @abstract
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    start () {
        throw new Error('method must be overridden');
    }

    /**
     * Disposes of the manager.
     * @abstract
     * @returns {_SdlManagerBase} - A reference to this instance to support method chaining.
     */
    dispose () {
        throw new Error('method must be overridden');
    }

    /**
     * Sends a single RPC
     * @abstract
     * @param {RpcMessage} message - The RPC to send.
     * @returns {Promise} - A promise which will resolve when the RPC is successful or reject when it's not.
     */
    sendRpc (message) {
        throw new Error('method must be overridden');
    }

    /**
     * Sends multiple RPCs asynchronously
     * @abstract
     * @param {RpcMessage[]} messages - An array of RPCs to send.
     * @returns {Promise} - A promise which will resolve when the RPCs are successful or reject when they're not.
     */
    sendRpcs (messages) {
        throw new Error('method must be overridden');
    }

    /**
     * Sends multiple RPCs synchronously
     * @abstract
     * @param {RpcMessage[]} messages - An array of RPCs to send, in order.
     * @returns {Promise} - A promise which will resolve when the RPCs are successful or reject when they're not.
     */
    sendSequentialRpcs (messages) {
        throw new Error('method must be overridden');
    }

    /**
     * Retreives the RAI response from the _LifecycleManager
     * @abstract
     * @returns {RegisterAppInterfaceResponse|null} - A RegisterAppInterfaceResponse.
     */
    getRegisterAppInterfaceResponse () {
        throw new Error('method must be overridden');
    }

    /**
     * Retrieves the current HMI level from the _LifecycleManager
     * @abstract
     * @returns {HMILevel|null} - The current HMI Level.
     */
    getCurrentHmiStatus () {
        throw new Error('method must be overridden');
    }

    /**
     * Retrieves the Auth Token from the _LifecycleManager
     * @abstract
     * @returns {string|null} - The current auth token.
     */
    getAuthToken () {
        throw new Error('method must be overridden');
    }
}

_SdlManagerBase.MAX_RETRY = 3;

export { _SdlManagerBase };