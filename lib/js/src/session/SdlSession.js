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
import { SdlProtocolBase } from '../protocol/SdlProtocolBase.js';
import { ServiceType } from '../protocol/enums/ServiceType.js';
import { ServiceListenerMap } from './ServiceListenerMap.js';


/**
 * @typedef {Object} SdlSession
 * @property {Function} _setupSdlProtocolListener
 * @property {Function} start
 * @property {Function} endSession
 * @property {Function} addServiceListener
 * @property {Function} removeServiceListener
 * @property {Function} sendRpc
 */
class SdlSession {
    /**
     * @param {TransportConfigBase} baseTransportConfig 
     * @param {SdlSessionListener} sdlSessionListener 
     */
    constructor (baseTransportConfig, sdlSessionListener) {
        this._sessionId;
        this._sessionHashId;
        this._sdlSessionListener = sdlSessionListener;
        this._baseTransportConfig = baseTransportConfig;

        // a hash where each key is a service type, and has an array of listeners attached
        this._serviceListeners = new ServiceListenerMap();

        const sdlProtocolListener = this._setupSdlProtocolNew();
        this._sdlProtocol = new SdlProtocolBase(baseTransportConfig, sdlProtocolListener);

        // const sdlProtocolListener = this._setupSdlProtocolListener();
        // this._sdlProtocol = new SdlProtocolBase(baseTransportConfig, sdlProtocolListener);
    }

    _setupSdlProtocolNew () {
        const testing = {};

        // ISdlProtocol methods implemented
        testing.getSessionId = this.getSessionId.bind(this);
        testing.shutdown = this.shutdown.bind(this);
        testing.onTransportDisconnected = this.onTransportDisconnected.bind(this);
        testing.getSdlSecurity = this.getSdlSecurity.bind(this);
        testing.getDesiredVideoParams = this.getDesiredVideoParams.bind(this);
        testing.setAcceptedVideoParams = this.setAcceptedVideoParams.bind(this);
        testing.stopStream = this.stopStream.bind(this);
        testing.onAuthTokenReceived = this.onAuthTokenReceived.bind(this);

        // IProtocolListener methods implemented
        testing.onProtocolMessageBytesToSend = this.onProtocolMessageBytesToSend.bind(this);
        testing.onProtocolMessageReceived = this.onProtocolMessageReceived.bind(this);
        testing.onProtocolSessionStarted = this.onProtocolSessionStarted.bind(this);
        testing.onProtocolSessionNACKed = this.onProtocolSessionNACKed.bind(this);
        testing.onProtocolSessionEnded = this.onProtocolSessionEnded.bind(this);
        testing.onProtocolSessionEndedNACKed = this.onProtocolSessionEndedNACKed.bind(this);
        testing.onProtocolHeartbeat = this.onProtocolHeartbeat.bind(this);
        testing.onProtocolHeartbeatACK = this.onProtocolHeartbeatACK.bind(this);
        testing.onProtocolServiceDataACK = this.onProtocolServiceDataACK.bind(this);
        testing.onResetOutgoingHeartbeat = this.onResetOutgoingHeartbeat.bind(this);
        testing.onResetIncomingHeartbeat = this.onResetIncomingHeartbeat.bind(this);
        testing.onProtocolError = this.onProtocolError.bind(this);

        // SdlSessionListener methods implemented
        /*
        ALREADY DEFINED:
        onTransportDisconnected
        onProtocolMessageReceived
        onProtocolSessionStarted
        onProtocolSessionEnded
        onProtocolSessionEndedNACKed
        onProtocolError
        onProtocolServiceDataACK
        onAuthTokenReceived
        */
        testing.onTransportError = this.onTransportError.bind(this);
        testing.onProtocolSessionStartedNACKed = this.onProtocolSessionStartedNACKed.bind(this);

        // SdlProtocolListener methods implemented
        testing.onControlServiceMessageReceived = this.onControlServiceMessageReceived.bind(this);
        testing.onRpcMessageReceived = this.onRpcMessageReceived.bind(this);
        testing.onStartServiceACKReceived = this.onStartServiceACKReceived.bind(this);
        testing.onStartServiceNAKReceived = this.onStartServiceNAKReceived.bind(this);
        testing.onEndServiceACKReceived = this.onEndServiceACKReceived.bind(this);
        testing.onEndServiceNAKReceived = this.onEndServiceNAKReceived.bind(this);
        testing.onServiceEncryptionStarted = this.onServiceEncryptionStarted.bind(this);

        return testing;
    }

    /**
     * @return {SdlProtocolListener} 
     * @private
     */
     /*
    _setupSdlProtocolListener () {
        const sdlProtocolListener = new SdlProtocolListener();

        // TODO create all the functions that will be set for this listener

        return sdlProtocolListener;
    }
    */

    start () {
        this._sdlProtocol.start();
    }

    /** **********************************************************************************************************************************************************************
     *                                                       BEGIN:    ISdlProtocol implemented methods
     ************************************************************************************************************************************************************************/
    
    /**
     * @return {Number}  - represents a byte 
     */
    getSessionId () {
        return this._sessionId;
    }

    /**
     * Informs the session listener that a disconnection happened
     * @param {String} info 
     */
    shutdown (info) {
        this._sdlSessionListener.onTransportDisconnected(info);
    }

    /**
     * Informs the session listener that a disconnection happened
     * @param {String} info 
     * @param {Boolean} altTransportAvailable 
     * @param {TransportConfigBase} transportConfig 
     */
    onTransportDisconnected (info, altTransportAvailable, transportConfig) {
        this._sdlSessionListener.onTransportDisconnected(info, altTransportAvailable, transportConfig);
    }

    /**
     * @return {SdlSecurityBase}
     */
    getSdlSecurity () {
        // not supported
    }

    /**
     * @return {VideoStreamingParameters} 
     */
    getDesiredVideoParams () {
        // not supported
    }

    /**
     * @param {VideoStreamingParameters} params 
     */
    setAcceptedVideoParams (params) {
        // not supported
    }

    /**
     * @param {ServiceType} serviceType 
     */
    stopStream (serviceType) {
        // not supported
    }

    /**
     * @param {String} authToken
     * @param {Number} sessionID - represents a byte 
     */
    onAuthTokenReceived (authToken, sessionID) {
        this._sdlSessionListener.onAuthTokenReceived(authToken, sessionID);
    }

    /** **********************************************************************************************************************************************************************
     *                                                       END:    ISdlProtocol implemented methods
     ************************************************************************************************************************************************************************/
    


    /** **********************************************************************************************************************************************************************
     *                                                       BEGIN:    IProtocolListener implemented methods
     ************************************************************************************************************************************************************************/
    

    /**
     * Called to indicate that these bytes are to be sent as part of a message.
     * This call includes the part of the message.
     * @param {SdlPacket} packet
     */
    onProtocolMessageBytesToSend (packet) {
        this._sdlProtocol.sendPacket(packet);
    }

    /**
     * @param {ProtocolMessage} msg 
     */
    onProtocolMessageReceived (msg) {
        this._sdlSessionListener.onProtocolMessageReceived(msg);
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
        this._sessionId = sessionID;

        if (serviceType === ServiceType.RPC) {
            this._sessionHashId = hashID;
        }

        this._sdlSessionListener.onProtocolSessionStarted(serviceType, sessionID, version, correlationID, hashID, isEncrypted);
        this._serviceListeners.sendEventServiceStarted(this, serviceType, isEncrypted);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {Number} version - represents a byte 
     * @param {String} correlationID
     * @param {Array<String>} rejectedParams
     */
    onProtocolSessionNACKed (serviceType, sessionID, version, correlationID, rejectedParams) {
        this._sdlSessionListener.onProtocolSessionStartedNACKed(serviceType, sessionID, version, correlationID, rejectedParams);
        this._serviceListeners.sendEventServiceError(this, serviceType, `Start ${serviceType.toString()} Service NACK'ed`);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {String} correlationID
     */
    onProtocolSessionEnded (serviceType, sessionID, correlationID) {
        this._sdlSessionListener.onProtocolSessionEnded(serviceType, sessionID, correlationID);
        this._serviceListeners.sendEventServiceEnded(this, serviceType);
    }
    
    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {String} correlationID
     */
    onProtocolSessionEndedNACKed (serviceType, sessionID, correlationID) {
        this._sdlSessionListener.onProtocolSessionEndedNACKed(serviceType, sessionID, correlationID);
        this._serviceListeners.sendEventServiceError(this, serviceType, `End ${serviceType.toString()} Service NACK'ed`);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     */
    onProtocolHeartbeat (serviceType, sessionID) {
        // not supported
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     */
    onProtocolHeartbeatACK (serviceType, sessionID) {
        // not supported
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} dataSize
     * @param {Number} sessionID - represents a byte 
     */
    onProtocolServiceDataACK (serviceType, dataSize, sessionID) {
        this._sdlSessionListener.onProtocolServiceDataACK(serviceType, dataSize, sessionID);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     */
    onResetOutgoingHeartbeat (serviceType, sessionID) {
        // not supported
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     */
    onResetIncomingHeartbeat (serviceType, sessionID) {
        // not supported
    }

    /**
     * @param {String} info 
     * @param {Error} e 
     */
    onProtocolError (info, e) {
        this._sdlSessionListener.onProtocolError(info, e);
    }

    /** **********************************************************************************************************************************************************************
     *                                                       END:    IProtocolListener implemented methods
     ************************************************************************************************************************************************************************/
    

    /** **********************************************************************************************************************************************************************
     *                                                       BEGIN:    SdlSessionListener implemented methods
     ************************************************************************************************************************************************************************/
    

    /*
     ALREADY DEFINED:
    onTransportDisconnected
    onProtocolMessageReceived
    onProtocolSessionStarted
    onProtocolSessionEnded
    onProtocolSessionEndedNACKed
    onProtocolError
    onProtocolServiceDataACK
    onAuthTokenReceived
    */

    /**
     * @param {String} info 
     * @param {Error} e 
     */
    onTransportError (info, e) {
        this._sdlSessionListener.onTransportError(info, e);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {Number} version - represents a byte 
     * @param {String} correlationID
     * @param {Array<String>} rejectedParams
     */
    onProtocolSessionStartedNACKed (serviceType, sessionID, version, correlationID, rejectedParams) {
        this.onProtocolSessionNACKed(serviceType, sessionID, version, correlationID, rejectedParams);
    }

    /** **********************************************************************************************************************************************************************
     *                                                       END:    SdlSessionListener implemented methods
     ************************************************************************************************************************************************************************/
   

    /** **********************************************************************************************************************************************************************
     *                                                       BEGIN:    SdlProtocolListener implemented methods
     ************************************************************************************************************************************************************************/
    
    // TODO: figure out how to fill these methods

    /**
     * @param {SdlPacket} sdlPacket 
     */
    onControlServiceMessageReceived (sdlPacket) {

    }

    /**
     * @param {RpcMessage} rpcMessage 
     */
    onRpcMessageReceived (rpcMessage) {

    }

    /**
     * @param {SdlPacket} sdlPacket 
     */
    onStartServiceACKReceived (sdlPacket) {
        this._sessionId = sdlPacket.getSessionID();
        const version = sdlPacket.getVersion();
        const serviceType = sdlPacket.getServiceType();
        const isEncrypted = sdlPacket.getEncryption();

        if (version < 5) {
            const hashPayload = sdlPacket.getPayload();
            if (hashPayload) {
                this._hashId = BitConverter.arrayBufferToInt32(hashPayload.buffer);
            }
        }
        else {
            this._hashId = sdlPacket.getTag('hashId');
        }

        this._sdlSessionListener.onProtocolSessionStarted(serviceType, this._sessionId, version, "", this._hashId, isEncrypted);
        this._serviceListeners.sendEventServiceStarted(this, serviceType, isEncrypted);
    }

    /**
     * @param {SdlPacket} sdlPacket 
     */
    onStartServiceNAKReceived (sdlPacket) {

    }

    /**
     * @param {SdlPacket} sdlPacket 
     */
    onEndServiceACKReceived (sdlPacket) {

    }

    /**
     * @param {SdlPacket} sdlPacket 
     */
    onEndServiceNAKReceived (sdlPacket) {

    }

    /**
     * @param {ServiceType} serviceType 
     */
    onServiceEncryptionStarted (serviceType) {

    }

    /** **********************************************************************************************************************************************************************
     *                                                       END:    SdlProtocolListener implemented methods
     ************************************************************************************************************************************************************************/
   
    endSession () {
        // TODO handle internal items
        this._sdlProtocol.endSession();
    }

    /**
     * @param {RpcMessage} rpcMessage 
     */
    sendRpc (rpcMessage) {
        this._sdlProtocol.sendRpc(rpcMessage);
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
     * @param {Number} sessionID - represents a byte 
     * @param {Boolean} isEncrypted
     */
    startService (serviceType, sessionID, isEncrypted) {
        // TODO: not implemented yet
        this._sdlProtocol.startService(serviceType, sessionID, isEncrypted);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     */
    endService (serviceType, sessionID) {
        // TODO: not implemented yet
        this._sdlProtocol.endService(serviceType, sessionID);
    }

    /**
     * Starts up the SDL protocol class. It will kick off the transport manager and underlying transport.
     */
    startSession () {
        this._sdlProtocol.start();
    }

    /**
     * To be determined if needed to send to the SdlProtocolBase's sendMessage method 
     * @param {ProtocolMessage} msg 
     */
    sendMessage (msg) {
        // TODO: see comment above
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
     * @param {SdlSecurityBase} info 
     */
    setSdlSecurity (security) {
        // not supported
    }

    /**
     * @param {ProtocolMessage} msg 
     */
    processControlService (msg) {
        // not supported
    }

    /**
     * @param {ServiceType} sType 
     * @return {Boolean}
     */
    isServiceProtected (sType) {
        // not supported
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
     * @param {VideoStreamingParameters} params 
     */
    setDesiredVideoParams (params) {
        // not supported
    }    

    /**
     * @return {VideoStreamingParameters} 
     */
    getAcceptedVideoParams () {
        // not supported
    }
}

export { SdlSession };