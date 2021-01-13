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
 * @typedef {Object} _SdlSessionListener
 * @private
 */
class _SdlSessionListener {
    /**
     * Initializes an instance of _SdlSessionListener.
     * @class
     * @private
     */
    constructor () {
        this._onProtocolSessionStarted = null;
        this._onProtocolSessionEnded = null;
        this._onProtocolSessionEndedNACKed = null;
        this._onRpcMessageReceived = null;
        this._onTransportConnected = null;
        this._onAuthTokenReceived = null;
        this._onVehicleTypeReceived = null;
    }

    /**
     * Set the onProtocolSessionStarted function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnProtocolSessionStarted (listener) {
        this._onProtocolSessionStarted = listener;
        return this;
    }

    /**
     * Set the onProtocolSessionEnded function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnProtocolSessionEnded (listener) {
        this._onProtocolSessionEnded = listener;
        return this;
    }

    /**
     * Set the onProtocolSessionEndedNACKed function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnProtocolSessionEndedNACKed (listener) {
        this._onProtocolSessionEndedNACKed = listener;
        return this;
    }

    /**
     * Set the onRpcMessageReceived function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnRpcMessageReceived (listener) {
        this._onRpcMessageReceived = listener;
        return this;
    }

    /**
     * Set the onTransportConnected function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnTransportConnected (listener) {
        this._onTransportConnected = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onProtocolSessionStarted event.
     * @param {ServiceType} serviceType - The ServiceType.
     * @param {Number} sessionID - represents a byte
     * @param {Number} version - represents a byte
     * @param {String} correlationID - The correlationID.
     * @param {Number} hashID - The hash ID.
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    onProtocolSessionStarted (serviceType, sessionID, version, correlationID, hashID, isEncrypted) {
        if (typeof this._onProtocolSessionStarted === 'function') {
            this._onProtocolSessionStarted(serviceType, sessionID, version, correlationID, hashID, isEncrypted);
        }
    }

    /**
     * Safely attempts to invoke the onProtocolSessionEnded event.
     * @param {ServiceType} serviceType - The ServiceType.
     * @param {Number} sessionID - represents a byte
     * @param {String} correlationID - The correlationID.
     */
    onProtocolSessionEnded (serviceType, sessionID, correlationID) {
        if (typeof this._onProtocolSessionEnded === 'function') {
            this._onProtocolSessionEnded(serviceType, sessionID, correlationID);
        }
    }

    /**
     * Safely attempts to invoke the onProtocolSessionEndedNACKed event.
     * @param {ServiceType} serviceType - The ServiceType.
     * @param {Number} sessionID - represents a byte
     * @param {String} correlationID - The correlationID.
     */
    onProtocolSessionEndedNACKed (serviceType, sessionID, correlationID) {
        if (typeof this._onProtocolSessionEndedNACKed === 'function') {
            this._onProtocolSessionEndedNACKed(serviceType, sessionID, correlationID);
        }
    }

    /**
     * Set the onAuthTokenReceived function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnAuthTokenReceived (listener) {
        this._onAuthTokenReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onAuthTokenReceived event.
     * @param {String} authToken - The auth token.
     * @param {Number} sessionId - represents a byte
     */
    onAuthTokenReceived (authToken, sessionId) {
        if (authToken !== null && typeof this._onAuthTokenReceived === 'function') {
            this._onAuthTokenReceived(authToken, sessionId);
        }
    }

    /**
     * Set the onVehicleTypeReceived function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_SdlSessionListener} - A reference to this instance to allow method chaining.
     */
    setOnVehicleTypeReceived (listener) {
        this._onVehicleTypeReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onVehicleTypeReceived event.
     * @param {VehicleType} vehicleType - the type of vehicle that this session is currently active on.
     * @param {String} systemSoftwareVersion - software version of the system.
     * @param {String} systemHardwareVersion - hardware version of the system.
     * @returns {Boolean} Return true if this session should continue, false if the session should end
     */
    onVehicleTypeReceived (vehicleType, systemSoftwareVersion, systemHardwareVersion) {
        if (typeof this._onVehicleTypeReceived === 'function') {
            return !!this._onVehicleTypeReceived(vehicleType, systemSoftwareVersion, systemHardwareVersion);
        }
        return true;
    }

    /**
     * Safely attempts to invoke the onRpcMessageReceived event.
     * @param {RpcMessage} rpcMessage - An RpcMessage.
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

export { _SdlSessionListener };
