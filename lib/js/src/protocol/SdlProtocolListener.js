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
 * @typedef {Object} SdlProtocolListener
 * @property {function} setOnRpcMessageReceived
 * @property {function} onRpcMessageReceived
 * @property {function} setOnProtocolSessionStarted
 * @property {function} onProtocolSessionStarted
 * @property {function} setOnProtocolSessionEnded
 * @property {function} onProtocolSessionEnded
 * @property {function} setOnProtocolSessionEndedNACKed
 * @property {function} onProtocolSessionEndedNACKed
 * @property {function} setOnAuthTokenReceived
 * @property {function} onAuthTokenReceived
 * @property {function} setGetSessionId
 * @property {function} getSessionId
 */
class SdlProtocolListener {
    /**
     * Initializes an instance of SdlProtocolListener.
     * @class
     */
    constructor () {
        this._onRpcMessageReceived = null;
        this._onProtocolSessionStarted = null;
        this._onProtocolSessionEnded = null;
        this._onProtocolSessionEndedNACKed = null;
        this._onAuthTokenReceived = null;
        this._getSessionId = null;
        this._onTransportConnected = null;
    }

    /**
     * Set the OnTransportConnected function callback.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setOnTransportConnected (listener) {
        this._onTransportConnected = listener;
        return this;
    }

    /**
     * Set the OnRpcMessageReceived function callback.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setOnRpcMessageReceived (listener) {
        this._onRpcMessageReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the event listener.
     * @param {RpcMessage} rpcMessage - An RpcMessage.
     */
    onRpcMessageReceived (rpcMessage) {
        if (typeof this._onRpcMessageReceived === 'function') {
            this._onRpcMessageReceived(rpcMessage);
        }
    }

    /**
     * Set the OnProtocolSessionStarted function callback.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setOnProtocolSessionStarted (listener) {
        this._onProtocolSessionStarted = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the event listener.
     */
    onTransportConnected () {
        if (typeof this._onTransportConnected === 'function') {
            this._onTransportConnected();
        }
    }

    /**
     * Safely attempts to invoke the event listener.
     * @param {ServiceType} serviceType - A ServiceType enum value.
     * @param {Number} sessionId - A session ID.
     * @param {Number} version - A numeric version.
     * @param {String} correlationId - A correlation ID.
     * @param {Number} hashId - A hash ID.
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    onProtocolSessionStarted (serviceType, sessionId, version, correlationId, hashId, isEncrypted) {
        if (typeof this._onProtocolSessionStarted === 'function') {
            this._onProtocolSessionStarted(serviceType, sessionId, version, correlationId, hashId, isEncrypted);
        }
    }

    /**
     * Set the OnProtocolSessionEnded function callback.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setOnProtocolSessionEnded (listener) {
        this._onProtocolSessionEnded = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the event listener.
     * @param {ServiceType} serviceType - A ServiceType enum value.
     * @param {Number} sessionId - A Session ID.
     * @param {String} correlationId - A correlation ID.
     */
    onProtocolSessionEnded (serviceType, sessionId, correlationId) {
        if (typeof this._onProtocolSessionEnded === 'function') {
            this._onProtocolSessionEnded(serviceType, sessionId, correlationId);
        }
    }

    /**
     * Set the OnProtocolSessionEndedNACKed function callback.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setOnProtocolSessionEndedNACKed (listener) {
        this._onProtocolSessionEndedNACKed = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the event listener.
     * @param {ServiceType} serviceType - A ServiceType enum value.
     * @param {Number} sessionId - A Session ID.
     * @param {String} correlationId - A correlation ID.
     */
    onProtocolSessionEndedNACKed (serviceType, sessionId, correlationId) {
        if (typeof this._onProtocolSessionEndedNACKed === 'function') {
            this._onProtocolSessionEndedNACKed(serviceType, sessionId, correlationId);
        }
    }

    /**
     * Set the OnAuthTokenReceived function callback.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setOnAuthTokenReceived (listener) {
        this._onAuthTokenReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the event listener.
     * @param {String} authToken - An authToken string.
     */
    onAuthTokenReceived (authToken) {
        if (authToken !== null) {
            this._onAuthTokenReceived(authToken);
        }
    }

    /**
     * Set the GetSessionId function.
     * @param {function} getter - A function to be invoked to retrieve the session ID.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setGetSessionId (getter) {
        this._getSessionId = getter;
        return this;
    }

    /**
     * Invoke the getSessionId getter
     * @returns {Number} sessionId
     */
    getSessionId () {
        if (typeof this._getSessionId === 'function') {
            return this._getSessionId();
        }
    }


    /**
     * Sets the getDesiredVideoParams function.
     * @param {function} getter - A function to be invoked to retrieve the desired video params.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setGetDesiredVideoParams (getter) {
        this._getDesiredVideoParams = getter;
        return this;
    }

    /**
     * Invoke the getDesiredVideoParams getter
     * @returns {VideoStreamingParameters} - A VideoStreamingParameters struct.
     */
    getDesiredVideoParams () {
        if (typeof this._getDesiredVideoParams === 'function') {
            return this._getDesiredVideoParams();
        }
    }

    /**
     * Sets the setSetAcceptedVideoParams setter
     * @param {function} setter - A function to be invoked to retrieve the accepted video params.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setSetAcceptedVideoParams (setter) {
        this._setAcceptedVideoParams = setter;
        return this;
    }


    /**
     * Safely attempts to invoke the setAcceptedVideoParams setter
     * @param {VideoStreamingParameters} params - A VideoStreamingParameters struct.
     * @returns {SdlProtocolListener} - A reference to this instance to support method chaining.
     */
    setAcceptedVideoParams (params) {
        if (typeof this._setAcceptedVideoParams === 'function') {
            this._setAcceptedVideoParams(params);
        }
        return this;
    }
}

export { SdlProtocolListener };