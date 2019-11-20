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
    
    }

    /**
     * @param {String} info 
     * @param {Boolean} availablePrimary 
     * @param {TransportConfigBase} transportConfig 
     */
    onTransportDisconnected (info, availablePrimary, transportConfig) {
        throw 'onTransportDisconnected method must be overridden';
    }

    /**
     * @param {String} info 
     * @param {Error} e 
     */
    onTransportError (info, e) {
        throw 'onTransportError method must be overridden';
    }
	
    /**
     * @param {ProtocolMessage} msg 
     */
    onProtocolMessageReceived (msg) {
        throw 'onProtocolMessageReceived method must be overridden';
    }
	
    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {Number} version - represents a byte 
     * @param {String} correlationID
     * @param {Array<String>} rejectedParams
     */
    onProtocolSessionStartedNACKed (serviceType, sessionID, version, correlationID, rejectedParams) {
        throw 'onProtocolSessionStartedNACKed method must be overridden';
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
        throw 'onProtocolSessionStarted method must be overridden';
    }
	
    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {String} correlationID
     */
    onProtocolSessionEnded (serviceType, sessionID, correlationID) {
        throw 'onProtocolSessionEnded method must be overridden';
    }
	
    /**
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID - represents a byte 
     * @param {String} correlationID
     */
    onProtocolSessionEndedNACKed (serviceType, sessionID, correlationID) {
        throw 'onProtocolSessionEndedNACKed method must be overridden';
    }
	
    /**
     * @param {String} info 
     * @param {Error} e 
     */
    onProtocolError (info, e) {
        throw 'onProtocolError method must be overridden';
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {Number} dataSize
     * @param {Number} sessionID - represents a byte 
     */
    onProtocolServiceDataACK (serviceType, dataSize, sessionID) {
        throw 'onProtocolServiceDataACK method must be overridden';
    }

    /**
     * @param {String} authToken
     * @param {Number} sessionID - represents a byte 
     */
    onAuthTokenReceived (authToken, sessionID) {
        throw 'onAuthTokenReceived method must be overridden';
    }
}

export { SdlSessionListener };