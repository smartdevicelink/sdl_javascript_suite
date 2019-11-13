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

/**
 * @typedef {Object} SdlSession
 * @property {Function} _setupSdlProtocolListener
 * @property {Function} start
 * @property {Function} endSession
 * @property {Function} addServiceListener
 * @property {Function} removeServiceListener
 * @property {Function} sendRpc
 */
class SdlSession extends SdlSessionListener {
    /**
     * @param {TransportConfigBase} baseTransportConfig 
     * @param {SdlSessionListener} sdlSessionListener 
     */
    constructor (baseTransportConfig, sdlSessionListener) {
        super();

        this._serviceListeners = [];

        this._sdlSessionListener = sdlSessionListener;
        const sdlProtocolListener = this._setupSdlProtocolListener();

        this._sdlProtocol = new SdlProtocolBase(baseTransportConfig, sdlProtocolListener);
    }

    /**
     * @return {SdlProtocolListener} 
     * @private
     */
    _setupSdlProtocolListener () {
        const sdlProtocolListener = new SdlProtocolListener();

        // TODO create all the functions that will be set for this listener

        return sdlProtocolListener;
    }

    start () {
        if (this._sdlProtocol != null) {
            this._sdlProtocol.start();
        }
    }

    endSession () {
        // TODO handle internal items
        if (this._sdlProtocol != null) {
            this._sdlProtocol.endSession();
        }
    }

    /**
     * @param {SdlSessionListener} serviceListener 
     */
    addServiceListener (serviceListener) {
        this._serviceListeners.push(serviceListener);
    }

    /**
     * @param {SdlSessionListener} serviceListener 
     */
    removeServiceListener (serviceListener) {
        const index = this._serviceListeners.indexOf(serviceListener);
        if (index >= 0) {
            this._serviceListeners.splice(index, 1);
        }
    }

    /**
     * @param {RpcMessage} rpcMessage 
     */
    sendRpc (rpcMessage) {

    }

    /**
     * @param {ServiceType} serviceType 
     * @return {Number} max transport unit for the given service type
     */
    getMtu (serviceType) {

    }

    /**
     * Ends the current session
     */
    close () {

    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @return {Boolean} isEncrypted
     */
    startService (serviceType, sessionID, isEncrypted) {

    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     */
    endService (serviceType, sessionID) {

    }

    /**
     * Starts up the SDL protocol class. It will kick off the transport manager and underlying transport.
     */
    startSession () {

    }

    /**
     * To be determined if needed to send to the SdlProtocolBase's sendMessage method 
     * @param {ProtocolMessage} msg 
     */
    sendMessage (msg) {

    }

    /**
     * @return {TransportType}  
     */
    getCurrentTransportType () {

    }

    /**
     * @return {Boolean} isConnected
     */
    getIsConnected () {

    }

    /**
     * TODO: remove in favor of onTransportDisconnected?
     * Informs the session listener that a disconnection happened
     * @param {String} info 
     */
    shutdown (info) {
        
    }

    /**
     * Informs the session listener that a disconnection happened
     * @param {String} info 
     * @param {Boolean} altTransportAvailable 
     * @param {TransportConfigBase} transportConfig 
     */
    onTransportDisconnected (info, altTransportAvailable, transportConfig) {
        
    }

    /**
     * @return {Version}  
     */
    getProtocolVersion () {

    }

    /**
     * @return {TransportConfigBase}  
     */
    getTransportConfig () {

    }

    /**
     * @return {Number}  
     */
    getSessionHashId () {

    }

    /**
     * @return {Number}  - represents a byte 
     */
    getSessionId () {

    }

    /**
     * TODO: remove if no security stuff will be added
     * @param {SdlSecurityBase} info 
     */
    setSdlSecurity (security) {

    }

    /**
     * @return {SdlSecurityBase}
     */
    getSdlSecurity () {

    }

    /**
     * @param {ProtocolMessage} msg 
     */
    processControlService (msg) {

    }

    /**
     * @param {SessionType} sType 
     * @return {Boolean}
     */
    isServiceProtected (sType) {

    }

    /**
     * TODO: SdlServiceListener doesnt exist
     * @param {SessionType} serviceType 
     * @param {SdlServiceListener} sdlServiceListener 
     */
    addServiceListener (serviceType, sdlServiceListener) {

    } 

    /**
     * TODO: SdlServiceListener doesnt exist
     * @param {SessionType} serviceType 
     * @param {SdlServiceListener} sdlServiceListener 
     * @return {Boolean}
     */
    removeServiceListener (serviceType, sdlServiceListener) {

    } 

    /**
     * TODO: what type is _serviceListeners?
     * @return {}
     */
    getServiceListeners () {

    }

    /**
     * TODO: VideoStreamingParameters doesn't exist
     * @param {VideoStreamingParameters} params 
     */
    setDesiredVideoParams (VideoStreamingParameters params) {

    }

    /**
     * TODO: VideoStreamingParameters doesn't exist
     * @return {VideoStreamingParameters} 
     */
    getDesiredVideoParams () {

    }

    /**
     * TODO: VideoStreamingParameters doesn't exist
     * @param {VideoStreamingParameters} params 
     */
    setAcceptedVideoParams (VideoStreamingParameters params) {

    }

    /**
     * TODO: VideoStreamingParameters doesn't exist
     * @return {VideoStreamingParameters} 
     */
    getAcceptedVideoParams () {

    }

    // required methods to implement from ISdlProtocol. doesn't exist
    // TODO: can these be removed?
    // public void onProtocolMessageBytesToSend
    // public void onProtocolSessionNACKed
    // public void onProtocolHeartbeat
    // public void onProtocolHeartbeatACK
    // public void onResetOutgoingHeartbeat
    // public void onResetIncomingHeartbeat

    // required methods to implement from ISecurityInitializedListener. doesn't exist
    // TODO: can these be removed?
    // public void onSecurityInitialized
    // public void stopStream
    // public boolean isTransportForServiceAvailable
    // public void clearConnection

    // required methods to implement from SdlSessionListener

    /**
     * @param {String} info 
     * @param {Boolean} availablePrimary 
     * @param {TransportConfigBase} transportConfig 
     */
    onTransportDisconnected (info, availablePrimary, transportConfig) {

    }

    /**
     * @param {String} info 
     * @param {Error} e 
     */
    onTransportError (info, e) {

    }
    
    /**
     * @param {ProtocolMessage} msg 
     */
    onProtocolMessageReceived (msg) {

    }
    
    /**
     * @param {SessionType} sessionType 
     * @param {Number} sessionID - represents a byte 
     * @param {Number} version - represents a byte 
     * @param {String} correlationID
     * @param {Array<String>} rejectedParams
     */
    onProtocolSessionStartedNACKed (sessionType, sessionID, version, correlationID, rejectedParams) {

    }
    
    /**
     * @param {SessionType} sessionType 
     * @param {Number} sessionID - represents a byte 
     * @param {Number} version - represents a byte 
     * @param {String} correlationID
     * @param {Number} hashID
     * @param {Boolean} isEncrypted
     */
    onProtocolSessionStarted (sessionType, sessionID, version, correlationID, hashID, isEncrypted) {

    }
    
    /**
     * @param {SessionType} sessionType 
     * @param {Number} sessionID - represents a byte 
     * @param {String} correlationID
     */
    onProtocolSessionEnded (sessionType, sessionID, correlationID) {

    }
    
    /**
     * @param {SessionType} sessionType 
     * @param {Number} sessionID - represents a byte 
     * @param {String} correlationID
     */
    onProtocolSessionEndedNACKed (sessionType, sessionID, correlationID) {

    }
    
    /**
     * @param {String} info 
     * @param {Error} e 
     */
    onProtocolError (info, e) {

    }

    /**
     * @param {SessionType} sessionType 
     * @param {Number} dataSize
     * @param {Number} sessionID - represents a byte 
     */
    onProtocolServiceDataACK (sessionType, dataSize, sessionID) {

    }

    /**
     * @param {String} authToken
     * @param {Number} sessionID - represents a byte 
     */
    onAuthTokenReceived (authToken, sessionID) {
        this._sdlSessionListener.onAuthTokenReceived(authToken, sessionId);
    }

}

export { SdlSession };