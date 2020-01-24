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

import { RegisterAppInterfaceResponse } from '../rpc/messages/RegisterAppInterfaceResponse.js';


class SdlManagerBase {
    constructor () {
        this._state = -1;
        this._changeRegistrationRetry = 0;
        this._appId = null;
        this._appName = null;
        this._shortAppName = null;
        this._isMediaApp = null;
        this._hmiLanguage = null;
        this._hmiTypes = null;
        this._transport = null;
        this._vrSynonyms = null;
        this._ttsChunks = null;
        this._dayColorScheme = null;
        this._nightColorScheme = null;
        this._minimumProtocolVersion = null;
        this._minimumRpcVersion = null;
        this._queuedNotifications = null;
        this._queuedNotificationListener = null;
        this._onRpcNotificationListeners = {};
    }

    /**
    * @return {string}
    */
    getAppName () {
        return this._appName;
    }

    /**
    * @return {string}
    */
    getAppId () {
        return this._appId;
    }

    /**
    * @return {string}
    */
    getShortAppName () {
        return this._shortAppName;
    }

    /**
    * @return {Version}
    */
    getMinimumProtocolVersion () {
        return this._minimumProtocolVersion;
    }

    /**
    * @return {Version}
    */
    getMinimumRpcVersion () {
        return this._minimumRpcVersion;
    }

    /**
    * @return {Language}
    */
    getHmiLanguage () {
        return this._hmiLanguage;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getDayColorScheme () {
        return this._dayColorScheme;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getNightColorScheme () {
        return this._nightColorScheme;
    }

    /**
    * @return {AppHmiType[]}
    */
    getAppTypes () {
        return this._hmiTypes;
    }

    /**
    * @return {string[]}
    */
    getVrSynonyms () {
        return this._vrSynonyms;
    }

    /**
    * @return {TTSChunk[]}
    */
    getTtsChunks () {
        return this._ttsChunks;
    }

    /**
    * @return {TransportConfigBase}
    */
    getTransport () {
        return this._transport;
    }

    /**
    * @return {Number}
    */
    getState () {
        return this._state;
    }

    /**
    * @return {SdlManagerBase}
    */
    transitionToState (state) {
        this._state = state;

        return this;
    }

    /**
    * @return {SdlManagerBase}
    */
    checkSdlManagerState () {
        if (this.getState() !== BaseSubManager.READY && this.getState() !== BaseSubManager.LIMITED) {
            console.log('SdlManager is not ready for use, be sure to initialize with start() method, implement callback, and use SubManagers in the SdlManager callback');
        }

        return this._transport;
    }

    /**
    * @return {SdlManagerBase}
    */
    initNotificationQueue () {
        // TODO
    }

    /**
    * @return {SdlManagerBase}
    */
    handleQueuedNotifications () {
        // TODO
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
    * @return {SdlManagerBase}
    */
    sendRpc (message) {
        throw new Error('method must be overridden');
    }

    /**
    * Sends multiple RPCs asynchronously
    * @abstract
    * @param {RpcMessage[]} messages
    * @return {SdlManagerBase}
    */
    sendRpcs (messages) {
        throw new Error('method must be overridden');
    }

    /**
    * Sends multiple RPCs synchronously
    * @abstract
    * @param {RpcMessage[]} messages
    * @return {SdlManagerBase}
    */
    sendSequentialRpcs (messages) {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    */
    getRegisterAppInterfaceResponse () {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {OnHmiStatus}
    */
    getCurrentHmiStatus () {
        throw new Error('method must be overridden');
    }

    /**
    * @abstract
    * @return {string}
    */
    getAuthToken () {
        throw new Error('method must be overridden');
    }
}

SdlManagerBase.MAX_RETRY = 3;

export { SdlManagerBase };