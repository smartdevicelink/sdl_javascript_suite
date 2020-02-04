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
 * @typedef {Object} SdlSessionListener
 */
class SdlSessionListener {
    /**
	 * @constructor
	 */
    constructor () {
        this._onProtocolSessionStarted = null;
        this._onProtocolSessionEnded = null;
        this._onProtocolSessionEndedNACKed = null;
        this._onRpcMessageReceived = null;
        this._onTransportConnected = null;
        this._onAuthTokenReceived = null;
    }

    /**
     * @param {function} listener
     */
    setOnProtocolSessionStarted (listener) {
        this._onProtocolSessionStarted = listener;
    }

    /**
     * @param {function} listener
     */
    setOnProtocolSessionEnded (listener) {
        this._onProtocolSessionEnded = listener;
    }

    /**
     * @param {function} listener
     */
    setOnProtocolSessionEndedNACKed (listener) {
        this._onProtocolSessionEndedNACKed = listener;
    }

    /**
     * @param {function} listener
     */
    setOnRpcMessageReceived (listener) {
        this._onRpcMessageReceived = listener;
    }

    /**
     * @param {function} listener
     */
    setOnTransportConnected (listener) {
        this._onTransportConnected = listener;
    }

    /**
     * @param {ServiceType} serviceType
     * @param {Number} sessionID - represents a byte
     * @param {Number} version - represents a byte
     * @param {String} correlationID
     * @param {Number} hashID
     * @param {Boolean} isEncrypted
     */
    onProtocolSessionStarted (serviceType, sessionID, version, correlationID, hashID, isEncrypted) {
        if (typeof this._onProtocolSessionStarted === 'function') {
            this._onProtocolSessionStarted(serviceType, sessionID, version, correlationID, hashID, isEncrypted);
        }
    }

    /**
     * @param {ServiceType} serviceType
     * @param {Number} sessionID - represents a byte
     * @param {String} correlationID
     */
    onProtocolSessionEnded (serviceType, sessionID, correlationID) {
        if (typeof this._onProtocolSessionEnded === 'function') {
            this._onProtocolSessionEnded(serviceType, sessionID, correlationID);
        }
    }

    /**
     * @param {ServiceType} serviceType
     * @param {Number} sessionID - represents a byte
     * @param {String} correlationID
     */
    onProtocolSessionEndedNACKed (serviceType, sessionID, correlationI) {
        if (typeof this._onProtocolSessionEndedNACKed === 'function') {
            this._onProtocolSessionEndedNACKed(serviceType, sessionID, correlationI);
        }
    }

    setOnAuthTokenReceived (listener) {
        this._onAuthTokenReceived = listener;
        return this;
    }

    onAuthTokenReceived (authToken, sessionId) {
        if (authToken !== null && typeof this._onAuthTokenReceived === 'function') {
            this._onAuthTokenReceived(authToken, sessionId);
        }
    }

    /**
     * @param {RpcMessage} rpcMessage
     */
    onRpcMessageReceived (rpcMessage) {
        if (typeof this._onRpcMessageReceived === 'function') {
            this._onRpcMessageReceived(rpcMessage);
        }
    }

    /**
     * Invoked when the app and core connect
     */
    onTransportConnected () {
        if (typeof this._onTransportConnected === 'function') {
            this._onTransportConnected();
        }
    }
}

export { SdlSessionListener };