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

import { SdlSessionListener } from './SdlSessionListener.js';
import { SdlProtocolListener } from '../protocol/SdlProtocolListener.js';
import { SdlProtocol } from '../protocol/SdlProtocol.js';
import { ServiceType } from '../protocol/enums/ServiceType.js';
import { ServiceListenerMap } from './ServiceListenerMap.js';
import { VideoStreamingParameters } from '../streaming/video/VideoStreamingParameters.js';


/**
 * @typedef {Object} SdlSession
 * @property {Function} start
 * @property {Function} getSessionId
 * @property {Function} onProtocolSessionStarted
 * @property {Function} onProtocolSessionEnded
 * @property {Function} onProtocolSessionEndedNACKed
 * @property {Function} onRpcMessageReceived
 * @property {Function} endSession
 * @property {Function} sendRpc
 * @property {Function} getMtu
 * @property {Function} close
 * @property {Function} startService
 * @property {Function} endService
 * @property {Function} getCurrentTransportType
 * @property {Function} getIsConnected
 * @property {Function} getProtocolVersion
 * @property {Function} getTransportConfig
 * @property {Function} getSessionHashId
 * @property {Function} addServiceListener
 * @property {Function} removeServiceListener
 * @property {Function} getServiceListeners
 */
class SdlSession {
    /**
     * @param {TransportConfigBase} baseTransportConfig 
     * @param {SdlSessionListener} sdlSessionListener 
     */
    constructor (baseTransportConfig, sdlSessionListener) {
        this._baseTransportConfig = baseTransportConfig;
        this._sessionId = null;
        this._sessionHashId = null;
        this._sdlSessionListener = sdlSessionListener;
        this._baseTransportConfig = baseTransportConfig;

        // a hash where each key is a service type, and has an array of listeners attached
        this._serviceListeners = new ServiceListenerMap();

        this._sdlProtocolListener = this._setupSdlProtocolListener();

        this._sdlProtocol = new SdlProtocol(baseTransportConfig, this._sdlProtocolListener);
    }

    /**
     * @return {SdlProtocolListener} 
     * @private
     */
    _setupSdlProtocolListener () {
        const sdlProtocolListener = new SdlProtocolListener();
        sdlProtocolListener.setGetSessionId(this.getSessionId.bind(this));
        sdlProtocolListener.setOnProtocolSessionStarted(this.onProtocolSessionStarted.bind(this));
        sdlProtocolListener.setOnProtocolSessionEnded(this.onProtocolSessionEnded.bind(this));
        sdlProtocolListener.setOnProtocolSessionEndedNACKed(this.onProtocolSessionEndedNACKed.bind(this));
        sdlProtocolListener.setOnRpcMessageReceived(this.onRpcMessageReceived.bind(this));
        sdlProtocolListener.setOnTransportConnected(this.onTransportConnected.bind(this));

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
     *                                                       BEGIN:    SdlProtocolListener implemented methods
     ************************************************************************************************************************************************************************/
    
    /**
     * @return {Number}  - represents a byte 
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
     * @param {ServiceType} serviceType 
     * @param {Number} sessionId - represents a byte 
     * @param {Number} version - represents a byte 
     * @param {String} correlationId
     * @param {Number} hashId
     * @param {Boolean} isEncrypted
     */
    onProtocolSessionStarted (serviceType, sessionId, version, correlationId, hashId, isEncrypted) {
        this._sessionId = sessionId;

        if (serviceType === ServiceType.RPC) {
            this._sessionHashId = hashId;
        }

        this._sdlSessionListener.onProtocolSessionStarted(serviceType, sessionId, version, correlationId, hashId, isEncrypted);
        this._serviceListeners.sendEventServiceStarted(this, serviceType, isEncrypted);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionId - represents a byte 
     * @param {String} correlationId
     */
    onProtocolSessionEnded (serviceType, sessionId, correlationId) {
        this._sdlSessionListener.onProtocolSessionEnded(serviceType, sessionId, correlationId);
        this._serviceListeners.sendEventServiceEnded(this, serviceType);
    }
    
    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionId - represents a byte 
     * @param {String} correlationId
     */
    onProtocolSessionEndedNACKed (serviceType, sessionId, correlationId) {
        this._sdlSessionListener.onProtocolSessionEndedNACKed(serviceType, sessionId, correlationId);
        this._serviceListeners.sendEventServiceError(this, serviceType, `End ${serviceType.toString()} Service NACK'ed`);
    }

    /**
     * @param {RpcMessage} rpcMessage 
     */
    onRpcMessageReceived (rpcMessage) {
        this._sdlSessionListener.onRpcMessageReceived(rpcMessage);
    }


    /** **********************************************************************************************************************************************************************
     *                                                       END:    SdlProtocolListener implemented methods
     ************************************************************************************************************************************************************************/

    endSession () {
        this._sdlProtocol.endSession();
    }

    /**
     * @param {RpcMessage} rpcMessage 
     */
    sendRpc (rpcMessage) {
        this._sdlProtocol.sendRpc(rpcMessage);
    }

    /**
     * Sends an sdlPacket.
     * @param {SdlPacket} sdlPacket
     */
    sendPacket (sdlPacket) {
        this._sdlProtocol.sendPacket(sdlPacket);
    }

    /**
     * @param {ServiceType} serviceType 
     * @return {Number} max transport unit for the given service type
     */
    getMtu (serviceType) {
        this._sdlProtocol.getMtu(serviceType);
    }

    /**
     * Ends the current session
     */
    close () {
        this._sdlProtocol.endSession(this._sessionId, this._sessionHashId);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionId - represents a byte 
     * @param {Boolean} isEncrypted
     */
    startService (serviceType, sessionId, isEncrypted) {
        this._sdlProtocol.startService(serviceType, sessionId, isEncrypted);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionId - represents a byte 
     */
    endService (serviceType, sessionId) {
        this._sdlProtocol.endService(serviceType, sessionId);
    }

    /**
     * @return {TransportType}  
     */
    getCurrentTransportType () {
        return this._baseTransportConfig.getTransportType();
    }

    /**
     * @return {Boolean} isConnected
     */
    getIsConnected () {
        return this._sdlProtocol.isConnected();
    }

    /**
     * @return {Version}  
     */
    getProtocolVersion () {
        return this._sdlProtocol.getProtocolVersion();
    }

    /**
     * @return {TransportConfigBase}  
     */
    getTransportConfig () {
        return this._baseTransportConfig;
    }

    /**
     * @return {Number}  
     */
    getSessionHashId () {
        return this._sessionHashId;
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {SdlServiceListener} sdlServiceListener 
     */
    addServiceListener (serviceType, sdlServiceListener) {
        this._serviceListeners.addListener(serviceType, sdlServiceListener);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {SdlServiceListener} sdlServiceListener 
     * @return {Boolean} - whether the removal was successful
     */
    removeServiceListener (serviceType, sdlServiceListener) {
        return this._serviceListeners.removeListener(serviceType, sdlServiceListener);
    } 

    /**
     * @return {ServiceListenerMap}
     */
    getServiceListeners () {
        return this._serviceListeners;
    }

    /**
     * 
     * @param {VideoStreamingParameters} params 
     */
    setDesiredVideoParams (params) {
        this._desiredVideoParams = params;
        return this;
    }

    /**
     * Returns the currently set desired video streaming parameters. If there haven't been any set,
     * the default options will be returned and set for this instance.
     * @return {VideoStreamingParameters} the desired video streaming parameters
     */
    getDesiredVideoParams () {
        if (this._desiredVideoParams === null || this._desiredVideoParams === undefined) {
            this._desiredVideoParams = new VideoStreamingParameters();
        }
        return this._desiredVideoParams;
    }

    /**
     * @param {VideoStreamingParameters} params 
     */
    setAcceptedVideoParams (params) {
        this._desiredVideoParams = params;
        return this;
    }
}

export { SdlSession };