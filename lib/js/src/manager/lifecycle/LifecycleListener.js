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

/**
 * @typedef {Object} LifecycleListener
 */
class LifecycleListener {
    /**
     * Initializes an instance of LifecycleListener
	 * @constructor
	 */
    constructor () {
        this._onProxyConnected = null;
        this._onProxyClosed = null;
        this._onServiceStarted = null;
        this._onServiceEnded = null;
        this._onError = null;
    }

    /**
     * @param {function} listener
     */
    setOnProxyConnected (listener) {
        this._onProxyConnected = listener;
    }

    /**
     * @param {function} listener
     */
    setOnProxyClosed (listener) {
        this._onProxyClosed = listener;
    }

    /**
     * @param {function} listener
     */
    setOnServiceStarted (listener) {
        this._onServiceStarted = listener;
    }

    /**
     * @param {function} listener
     */
    setOnServiceEnded (listener) {
        this._onServiceEnded = listener;
    }

    /**
     * @param {function} listener
     */
    setOnError (listener) {
        this._onError = listener;
    }

    /**
     * @param {LifecycleManager} lifecycleManager

     */
    onProxyConnected (lifecycleManager) {
        if (typeof this._onProxyConnected === 'function') {
            this._onProxyConnected(lifecycleManager);
        }
    }

    /**
     * @param {LifecycleManager} lifecycleManager
     * @param {String} info
     * @param {SdlDisconnectedReason} reason
     */
    onProxyClosed (lifecycleManager, info, reason) {
        if (typeof this._onProxyClosed === 'function') {
            this._onProxyClosed(lifecycleManager, info, reason);
        }
    }

    /**
     * @param {ServiceType} serviceType
     */
    onServiceStarted (serviceType, sessionID, correlationID) {
        if (typeof this._onProtocolSessionEndedNACKed === 'function') {
            this._onServiceStarted(serviceType, sessionID, correlationID);
        }
    }

    /**
     * @param {ServiceType} serviceType
     */
    onServiceEnded (serviceType) {
        if (typeof this._onServiceEnded === 'function') {
            this._onServiceEnded(serviceType);
        }
    }

    /**
     * @param {LifecycleManager} lifecycleManager
     * @param {String} info
     */
    onError (lifecycleManager, info) {
        if (typeof this._onError === 'function') {
            this._onError(lifecycleManager, info);
        }
    }
}

export { LifecycleListener };