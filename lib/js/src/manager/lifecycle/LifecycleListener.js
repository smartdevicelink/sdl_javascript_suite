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

/**
 * @typedef {Object} LifecycleListener
 */
class LifecycleListener {
    /**
     * Initializes an instance of LifecycleListener
     * @class
     */
    constructor () {
        this._onProxyConnected = null;
        this._onProxyClosed = null;
        this._onServiceStarted = null;
        this._onServiceEnded = null;
        this._onError = null;
    }

    /**
     * Set the OnProxyConnected event function.
     * @param {function} listener - A function to be called when the event occurs.
     * @returns {LifecycleListener} - A reference to this instance to support method chaining.
     */
    setOnProxyConnected (listener) {
        this._onProxyConnected = listener;
        return this;
    }

    /**
     * Set the OnProxyClosed event function.
     * @param {function} listener - A function to be called when the event occurs.
     * @returns {LifecycleListener} - A reference to this instance to support method chaining.
     */
    setOnProxyClosed (listener) {
        this._onProxyClosed = listener;
        return this;
    }

    /**
     * Set the OnServiceStarted event function.
     * @param {function} listener - A function to be called when the event occurs.
     * @returns {LifecycleListener} - A reference to this instance to support method chaining.
     */
    setOnServiceStarted (listener) {
        this._onServiceStarted = listener;
        return this;
    }

    /**
     * Set the OnServiceEnded event function.
     * @param {function} listener - A function to be called when the event occurs.
     * @returns {LifecycleListener} - A reference to this instance to support method chaining.
     */
    setOnServiceEnded (listener) {
        this._onServiceEnded = listener;
        return this;
    }

    /**
     * Set the OnError event function.
     * @param {function} listener - A function to be called when the event occurs.
     * @returns {LifecycleListener} - A reference to this instance to support method chaining.
     */
    setOnError (listener) {
        this._onError = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the OnProxyConnected event function.
     * @param {LifecycleManager} lifecycleManager - An instance of LifecycleManager.
     */
    onProxyConnected (lifecycleManager) {
        if (typeof this._onProxyConnected === 'function') {
            this._onProxyConnected(lifecycleManager);
        }
    }

    /**
     * Safely attempts to invoke the OnProxyClosed event function.
     * @param {LifecycleManager} lifecycleManager - An instance of LifecycleManager.
     * @param {String} info - A string containing more information about the closure.
     * @param {SdlDisconnectedReason} reason - A reason for the closure.
     */
    onProxyClosed (lifecycleManager, info, reason) {
        if (typeof this._onProxyClosed === 'function') {
            this._onProxyClosed(lifecycleManager, info, reason);
        }
    }

    /**
     * Safely attempts to invoke the OnServiceStarted event function.
     * @param {ServiceType} serviceType - A ServiceType enum value.
     * @param {Number} sessionID - The session ID.
     * @param {Number} correlationID - The correlation ID.
     */
    onServiceStarted (serviceType, sessionID, correlationID) {
        if (typeof this._onProtocolSessionEndedNACKed === 'function') {
            this._onServiceStarted(serviceType, sessionID, correlationID);
        }
    }

    /**
     * Safely attempts to invoke the OnServiceEnded event function.
     * @param {ServiceType} serviceType - A ServiceType enum value.
     */
    onServiceEnded (serviceType) {
        if (typeof this._onServiceEnded === 'function') {
            this._onServiceEnded(serviceType);
        }
    }

    /**
     * Safely attempts to invoke the OnError event function.
     * @param {LifecycleManager} lifecycleManager - An instance of LifecycleManager.
     * @param {String} info - A string of information regarding the error.
     */
    onError (lifecycleManager, info) {
        if (typeof this._onError === 'function') {
            this._onError(lifecycleManager, info);
        }
    }
}

export { LifecycleListener };