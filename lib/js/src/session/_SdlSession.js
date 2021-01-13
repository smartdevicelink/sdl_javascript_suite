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

import { _SdlProtocolListener } from '../protocol/_SdlProtocolListener.js';
import { _SdlProtocol } from '../protocol/_SdlProtocol.js';
import { _ServiceType } from '../protocol/enums/_ServiceType.js';
import { _ServiceListenerMap } from './_ServiceListenerMap.js';
import { _VideoStreamingParameters } from '../streaming/video/_VideoStreamingParameters.js';


/**
 * @typedef {Object} _SdlSession
 * @private
 */
class _SdlSession {
    /**
     * Initializes an instance of _SdlSession.
     * @class
     * @param {_TransportConfigBase} baseTransportConfig - A TransportConfig instance.
     * @param {_SdlSessionListener} sdlSessionListener - A _SdlSessionListener instance.
     */
    constructor (baseTransportConfig, sdlSessionListener) {
        this._baseTransportConfig = baseTransportConfig;
        this._sessionId = null;
        this._sessionHashId = null;
        this._sdlSessionListener = sdlSessionListener;
        this._baseTransportConfig = baseTransportConfig;

        // a hash where each key is a service type, and has an array of listeners attached
        this._serviceListeners = new _ServiceListenerMap();

        this._sdlProtocolListener = this._setupSdlProtocolListener();

        this._sdlProtocol = new _SdlProtocol(baseTransportConfig, this._sdlProtocolListener);
    }

    /**
     * Set up the _SdlProtocolListener.
     * @private
     * @returns {_SdlProtocolListener} - The constructed _SdlProtocolListener.
     */
    _setupSdlProtocolListener () {
        const sdlProtocolListener = new _SdlProtocolListener();
        sdlProtocolListener.setGetSessionId(this.getSessionId.bind(this));
        sdlProtocolListener.setOnProtocolSessionStarted(this.onProtocolSessionStarted.bind(this));
        sdlProtocolListener.setOnProtocolSessionEnded(this.onProtocolSessionEnded.bind(this));
        sdlProtocolListener.setOnProtocolSessionEndedNACKed(this.onProtocolSessionEndedNACKed.bind(this));
        sdlProtocolListener.setOnRpcMessageReceived(this.onRpcMessageReceived.bind(this));
        sdlProtocolListener.setOnTransportConnected(this.onTransportConnected.bind(this));
        sdlProtocolListener.setOnAuthTokenReceived(this.onAuthTokenReceived.bind(this));
        sdlProtocolListener.setOnVehicleTypeReceived(this.onVehicleTypeReceived.bind(this));

        sdlProtocolListener.setGetDesiredVideoParams(this.getDesiredVideoParams.bind(this));
        sdlProtocolListener.setSetAcceptedVideoParams(this.setAcceptedVideoParams.bind(this));

        return sdlProtocolListener;
    }

    /**
     * Starts up the SDL protocol class. It will kick off the transport manager and underlying transport.
     */
    start () {
        this._sdlProtocol.start();
    }

    /** **********************************************************************************************************************************************************************
     * BEGIN:    _SdlProtocolListener implemented methods
     ************************************************************************************************************************************************************************/

    /**
     * Get the session ID.
     * @returns {Number}  - represents a byte
     */
    getSessionId () {
        return this._sessionId;
    }

    /**
     * Event fired when transport (eg tcp, ws, bluetooth) has connected.
     */
    onTransportConnected () {
        this._sdlSessionListener.onTransportConnected();
    }

    /**
     * Trigger that the protocol session has started.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {Number} sessionId - represents a byte
     * @param {Number} version - represents a byte
     * @param {String} correlationId - A correlationID.
     * @param {Number} hashId - A hash ID.
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    onProtocolSessionStarted (serviceType, sessionId, version, correlationId, hashId, isEncrypted) {
        this._sessionId = sessionId;

        if (serviceType === _ServiceType.RPC) {
            this._sessionHashId = hashId;
        }

        this._sdlSessionListener.onProtocolSessionStarted(serviceType, sessionId, version, correlationId, hashId, isEncrypted);
        this._serviceListeners.sendEventServiceStarted(this, serviceType, isEncrypted);
    }

    /**
     * Trigger that the protocol session has ended.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {Number} sessionId - represents a byte
     * @param {String} correlationId - A correlationID.
     */
    onProtocolSessionEnded (serviceType, sessionId, correlationId) {
        this._sdlSessionListener.onProtocolSessionEnded(serviceType, sessionId, correlationId);
        this._serviceListeners.sendEventServiceEnded(this, serviceType);
    }

    /**
     * Trigger that protocol session ended has been NACKed.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {Number} sessionId - represents a byte
     * @param {String} correlationId - A correlationID.
     */
    onProtocolSessionEndedNACKed (serviceType, sessionId, correlationId) {
        this._sdlSessionListener.onProtocolSessionEndedNACKed(serviceType, sessionId, correlationId);
        this._serviceListeners.sendEventServiceError(this, serviceType, `End ${serviceType.toString()} Service NACK'ed`);
    }

    /**
     * Trigger that an RPC message has been received.
     * @param {RpcMessage} rpcMessage - An RpcMessage.
     */
    onRpcMessageReceived (rpcMessage) {
        this._sdlSessionListener.onRpcMessageReceived(rpcMessage);
    }

    /**
     * Trigger that an authToken has been received.
     * @param {string} authToken - The authToken.
     */
    onAuthTokenReceived (authToken) {
        this._sdlSessionListener.onAuthTokenReceived(authToken, this._sessionId);
    }

    /**
     * A way to determine if this SDL session should continue to be active while
     * connected to the determined vehicle type.
     * @param {VehicleType} vehicleType - the type of vehicle that this session is currently active on.
     * @param {String} systemSoftwareVersion - software version of the system.
     * @param {String} systemHardwareVersion - hardware version of the system.
     * @returns {Boolean} Return true if this session should continue, false if the session should end
     */
    onVehicleTypeReceived (vehicleType, systemSoftwareVersion, systemHardwareVersion) {
        return this._sdlSessionListener.onVehicleTypeReceived(vehicleType, systemSoftwareVersion, systemHardwareVersion);
    }

    /** **********************************************************************************************************************************************************************
     * END:    _SdlProtocolListener implemented methods
     ************************************************************************************************************************************************************************/

    /**
     * Send an RpcMessage to the protocol.
     * @param {RpcMessage} rpcMessage - The RpcMessage to send.
     */
    sendRpc (rpcMessage) {
        this._sdlProtocol.sendRpc(rpcMessage);
    }

    /**
     * Sends an sdlPacket to the protocol.
     * @param {_SdlPacket} sdlPacket - The _SdlPacket to send.
     */
    sendPacket (sdlPacket) {
        this._sdlProtocol.sendPacket(sdlPacket);
    }

    /**
     * Get the MTU of a given ServiceType.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @returns {Number} - Max transport unit for the given service type
     */
    getMtu (serviceType) {
        return this._sdlProtocol.getMtu(serviceType);
    }

    /**
     * Ends the current session
     */
    close () {
        this._sdlProtocol.endSession(this._sessionId, this._sessionHashId);
    }

    /**
     * Start a service.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {Number} sessionId - represents a byte
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    startService (serviceType, sessionId, isEncrypted) {
        this._sdlProtocol.startService(serviceType, sessionId, isEncrypted);
    }

    /**
     * End a service.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {Number} sessionId - represents a byte
     */
    endService (serviceType, sessionId) {
        this._sdlProtocol.endService(serviceType, sessionId);
    }

    /**
     * Get the current transport type.
     * @returns {TransportType} - The TransportType enum value.
     */
    getCurrentTransportType () {
        return this._baseTransportConfig.getTransportType();
    }

    /**
     * Get whether or not the protocol is connected.
     * @returns {Boolean} isConnected
     */
    getIsConnected () {
        return this._sdlProtocol.isConnected();
    }

    /**
     * Get the protocol version.
     * @returns {Version} - An instance of Version.
     */
    getProtocolVersion () {
        return this._sdlProtocol.getProtocolVersion();
    }

    /**
     * Get the transport configuration instance.
     * @returns {_TransportConfigBase} - A reference to the TransportConfig.
     */
    getTransportConfig () {
        return this._baseTransportConfig;
    }

    /**
     * Get the session's hash ID.
     * @returns {Number} - The session hash ID.
     */
    getSessionHashId () {
        return this._sessionHashId;
    }

    /**
     * Add a service listener.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {_SdlServiceListener} sdlServiceListener - An _SdlServiceListener instance.
     */
    addServiceListener (serviceType, sdlServiceListener) {
        this._serviceListeners.addListener(serviceType, sdlServiceListener);
    }

    /**
     * Remove a service listener.
     * @param {_ServiceType} serviceType - A ServiceType.
     * @param {_SdlServiceListener} sdlServiceListener - An _SdlServiceListener instance.
     * @returns {Boolean} - Whether the removal was successful
     */
    removeServiceListener (serviceType, sdlServiceListener) {
        return this._serviceListeners.removeListener(serviceType, sdlServiceListener);
    }

    /**
     * Get the Service Listeners.
     * @returns {_ServiceListenerMap} - The service listeners in the form of a _ServiceListenerMap instance.
     */
    getServiceListeners () {
        return this._serviceListeners;
    }

    /**
     * Set the desired video parameters.
     * @param {_VideoStreamingParameters} params - An instance of _VideoStreamingParameters.
     * @returns {_SdlSession} - A reference to this instance to allow method chaining.
     */
    setDesiredVideoParams (params) {
        this._desiredVideoParams = params;
        return this;
    }

    /**
     * Returns the currently set desired video streaming parameters. If there haven't been any set,
     * the default options will be returned and set for this instance.
     * @returns {_VideoStreamingParameters} - The desired video streaming parameters
     */
    getDesiredVideoParams () {
        if (!(this._desiredVideoParams instanceof _VideoStreamingParameters)) {
            this._desiredVideoParams = new _VideoStreamingParameters();
        }
        return this._desiredVideoParams;
    }

    /**
     * Set the accepted video parameters.
     * @param {_VideoStreamingParameters} params - An instance of _VideoStreamingParameters.
     * @returns {_SdlSession} - A reference to this instance to allow method chaining.
     */
    setAcceptedVideoParams (params) {
        this._desiredVideoParams = params;
        return this;
    }
}

export { _SdlSession };
