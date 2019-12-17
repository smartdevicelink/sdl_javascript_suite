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
 * @typedef {Object} SdlProtocolListener
 * @property {function} setOnRpcMessageReceived
 * @property {function} onRpcMessageReceived
 * @property {function} setOnProtocolSessionStarted
 * @property {function} onProtocolSessionStarted
 * @property {function} setOnProtocolSessionEnded
 * @property {function} onProtocolSessionEnded
 * @property {function} setOnProtocolSessionEndedNACKed
 * @property {function} onProtocolSessionEndedNACKed
 * @property {function} setGetSessionId
 * @property {function} getSessionId
 */
class SdlProtocolListener {
    /**
     * @constructor
     */
    constructor () {
        this._onRpcMessageReceived = null;
        this._onProtocolSessionStarted = null;
        this._onProtocolSessionEnded = null;
        this._onProtocolSessionEndedNACKed = null;
        this._getSessionId = null;
        this._onTransportConnected = null;
    }

    /**
     * @param {function} listener
     */
    setOnTransportConnected (listener) {
        this._onTransportConnected = listener;
    }

    /**
     * @param {function} listener
     */
    setOnRpcMessageReceived (listener) {
        this._onRpcMessageReceived = listener;
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
     * @param {function} listener
     */
    setOnProtocolSessionStarted (listener) {
        this._onProtocolSessionStarted = listener;
    }


    onTransportConnected () {
        if (typeof this._onTransportConnected === 'function') {
            this._onTransportConnected();
        }
    }

    /**
     * Invoke the onProtocolSessionStarted listener with the event data
     * @param {ServiceType} serviceType
     * @param {Number} sessionId
     * @param {Number} version
     * @param {String} correlationId
     * @param {Number} hashId
     * @param {Boolean} isEncrypted
     */
    onProtocolSessionStarted (serviceType, sessionId, version, correlationId, hashId, isEncrypted) {
        if (typeof this._onProtocolSessionStarted === 'function') {
            this._onProtocolSessionStarted(serviceType, sessionId, version, correlationId, hashId, isEncrypted);
        }
    }

    /**
     * @param {function} listener
     */
    setOnProtocolSessionEnded (listener) {
        this._onProtocolSessionEnded = listener;
    }

    /**
     * Invoke the onProtocolSessionEnded listener with the event data
     * @param {ServiceType} serviceType
     * @param {Number} sessionId
     * @param {String} correlationId
     */
    onProtocolSessionEnded (serviceType, sessionId, correlationId) {
        if (typeof this._onProtocolSessionEnded === 'function') {
            this._onProtocolSessionEnded(serviceType, sessionId, correlationId);
        }
    }

    /**
     * @param {function} listener
     */
    setOnProtocolSessionEndedNACKed (listener) {
        this._onProtocolSessionEndedNACKed = listener;
    }

    /**
     * Invoke the onProtocolSessionEndedNACKed listener with the event data
     * @param {ServiceType} serviceType
     * @param {Number} sessionId
     * @param {String} correlationId
     */
    onProtocolSessionEndedNACKed (serviceType, sessionId, correlationId) {
        if (typeof this._onProtocolSessionEndedNACKed === 'function') {
            this._onProtocolSessionEndedNACKed(serviceType, sessionId, correlationId);
        }
    }

    /**
     * @param {function} getter
     */
    setGetSessionId (getter) {
        this._getSessionId = getter;
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
     * Sets the getDesiredVideoParams getter
     * @param {function} getter
     */
    setGetDesiredVideoParams (getter) {
        this._getDesiredVideoParams = getter;
    }

    /**
     * Invoke the getDesiredVideoParams getter
     * @returns {VideoStreamingParameters} 
     */
    getDesiredVideoParams () {
        if (typeof this._getDesiredVideoParams === 'function') {
            return this._getDesiredVideoParams();
        }
    }

    /**
     * Sets the setSetAcceptedVideoParams setter
     * @param {function} setter 
     */
    setSetAcceptedVideoParams (setter) {
        this._setAcceptedVideoParams = setter;
    }


    /**
     * Invoke the setAcceptedVideoParams setter
     * @param {VideoStreamingParameters} params 
     */
    setAcceptedVideoParams (params) {
        if (typeof this._setAcceptedVideoParams === 'function') {
            this._setAcceptedVideoParams(params);
            return this;
        }
    }
}

export { SdlProtocolListener };