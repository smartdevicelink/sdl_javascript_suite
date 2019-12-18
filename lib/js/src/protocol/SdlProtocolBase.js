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

import { MessageFrameDisassembler } from './MessageFrameDisassembler.js';
import { TransportListener } from '../transport/TransportListener.js';
import { Version } from '../util/Version.js';
import { ServiceType } from './enums/ServiceType.js';
import { FrameType } from './enums/FrameType.js';
import { MessageFrameAssembler } from './MessageFrameAssembler.js';
import { SdlPacket } from './SdlPacket.js';
import { ControlFrameTags } from './enums/ControlFrameTags.js';
import { BitConverter } from './../util/BitConverter.js';
import { JsonRpcMarshaller } from './../util/JsonRpcMarshaller.js';

import { SdlPacketFactory } from './SdlPacketFactory.js';
import { BinaryFrameHeader } from './BinaryFrameHeader.js';
import { FunctionID } from './../rpc/enums/FunctionID.js';
import { RpcMessage } from './../rpc/RpcMessage.js';
import { RpcCreator } from './../rpc/RpcCreator.js';

/**
 * Base implementation of sdl protocol.
 * Should be able to handle basic control frames and be able to
 * send and receive packets from the transport manager.
 * Also sends key events to the sdlProtocolListener.
 */
class SdlProtocolBase {
    /**
     * 
     * @param { TransportConfigBase } baseTransportConfig
     * @param { SdlProtocolListener } sdlProtocolListener
     * @constructor
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        this._baseTransportConfig = baseTransportConfig;
        this._transportConfig = baseTransportConfig;
        this._sdlProtocolListener = sdlProtocolListener;
        this._transportManager = null;

        this.reset();
        this._createTransportListener();
    }


    /**
     * Resets the sdl protocol to its default state.
     */
    reset () {
        this._protocolVersion = new Version(1, 0, 0);
        this._transportConfig = this._baseTransportConfig;
        this._headerSize = SdlProtocolBase.V1_HEADER_SIZE;
        this._serviceStatus = {};
        this._serviceStatus[ServiceType.CONTROL] = true;
        this._mtus = {};
        this._mtus[ServiceType.RPC] = SdlProtocolBase.V1_V2_MTU_SIZE - this._headerSize;
        this._hashID = 0;
        this._messageFrameAssemblers = {};
        this._messageID = 1;
        this._sessionID = 0;
    }


    /**
     * Sets a transport manager.
     * @param { TransportManagerBase } manager
     */
    setTransportManager (manager) {
        if( !this._serviceStatus[ServiceType.RPC]){
            //RPC service hasn't been started, lets start it
            this.startService(ServiceType.RPC, 0, false);
        }
        this._transportManager = manager;
    }


    /**
     * Creates the transport listener. This will recieve incoming requests
     * from the transport manager.
     */
    _createTransportListener () {
        const self = this;
        this._transportListener = new TransportListener();
        this._transportListener.setOnTransportConnected(function () {
            self._handleTransportConnected();
        });
        this._transportListener.setOnTransportDisconnected(function () {
        });
        this._transportListener.setOnPacketReceived(function (sdlPacket) {
            self._handlePacketReceived(sdlPacket);
        });
        this._transportListener.setOnError(function () {
        });
    }

    _handleTransportConnected () {
        this._sdlProtocolListener.onTransportConnected();
    }

    /**
     * Starts up the SDL protocol class. It will kick off the transport manager and underlying transport.
     */
    start () {
        if (!this._transportManager) {
            throw 'A transport manager must be defined, unable to start SDL Protocol';
        }
        this._transportManager.start();
    }


    /**
     * Start the service. This is the first step in communicating with sdl core.
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID
     * @param {Boolean} isEncrypted
     */
    startService (serviceType, sessionID, isEncrypted) {
        const protocolVersion = this.constructor.MAX_PROTOCOL_VERSION;
        const messageID = 0;
        const header = new SdlPacket(protocolVersion.getMajor(), isEncrypted, FrameType.CONTROL,
            serviceType, SdlPacket.FRAME_INFO_START_SERVICE, sessionID,
            0, messageID, null);
        if (serviceType === ServiceType.AUDIO) {
            return this.sendPacket(header);
        }
        if (serviceType === ServiceType.RPC) {
            header.putTag(ControlFrameTags.RPC.StartService.PROTOCOL_VERSION, protocolVersion.toString());
        } else {
            // NAV and other services
            throw 'Service type not implemented';
        }
        this.sendPacket(header);
    }

    /**
     *  Get the max transport unit of a specific service type.
     * @param { ServiceType } serviceType
     * @return {number} max transport unit for the given service type
     */
    getMtu (serviceType) {
        const retVal = this._mtus[serviceType];
        if (retVal) {
            return retVal;
        }
        return SdlProtocolBase.V1_V2_MTU_SIZE;
    }

    /**
     * Returns true if transport manager is connected.
     * @return {Boolean} isConnected
     */
    isConnected () {
        return this._transportManager && this._transportManager.isConnected(null, null);
    }

    /**
     * Get the current protocol version in use.
     * @returns {Version} protocol version
     */
    getProtocolVersion () {
        return this._protocolVersion;
    }


    /**
     * This method will set the major protocol version that we should use. 
     * It will also set the default MTU based on version.
     * @param { number } version major version to use
     */
    _setVersion (version) {
        if (version > 5) {
            this._protocolVersion = new Version('5.1.0'); // protect for future, proxy only supports v5 or lower
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE;
        } else if (version === 5) {
            this._protocolVersion = new Version('5.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE;
        } else if (version === 4) {
            this._protocolVersion = new Version('4.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE; // versions 4 supports 128k MTU
        } else if (version === 3) {
            this._protocolVersion = new Version('3.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE; // versions 3 supports 128k MTU
        } else if (version === 2) {
            this._protocolVersion = new Version('2.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[ServiceType.RPC] = this.constructor.V1_V2_MTU_SIZE - this.headerSize;
        } else if (version === 1) {
            this._protocolVersion = new Version('1.0.0');
            this.headerSize = this.constructor.V1_HEADER_SIZE;
            this._mtus[ServiceType.RPC] = this.constructor.V1_V2_MTU_SIZE - this.headerSize;
        }
    }

    /**
     * Sends an sdlPacket.
     * @param {SdlPacket} sdlPacket
     */
    sendPacket (sdlPacket) {
        if (this._transportManager) {
            this._transportManager.sendPacket(sdlPacket);
        }
    }

    /**
     * Returns the sessionId in use.
     * @returns {Number}
     */
    _getSessionId () {
        return this._sdlProtocolListener.getSessionId();
    }

    /**
     * Gets the next available messageID for sending requests.
     * @returns {Number}
     */
    _getNextMessageID () {
        return this._messageID++;
    }

    /**
     * Takes an rpc message and sends a single or multi frame packets.
     * @param {RpcRequest} rpcMessage 
     */
    sendRpc (rpcRequest) {
        const self = this;
        const sessionId = this._getSessionId();
        const messageID = this._getNextMessageID();
        const mtu = self._mtus[ServiceType.RPC];
        const version = self._protocolVersion.getMajor();
        const isEncrypted = rpcRequest.getIsEncrypted();

        MessageFrameDisassembler.buildRPC(rpcRequest, sessionId, messageID, mtu, version, isEncrypted, function (sdlPacket) {
            self.sendPacket(sdlPacket);
        });
    }

    /**
     * Handles incoming packets.
     * @param {SdlPacket} sdlPacket
     */
    _handlePacketReceived (sdlPacket) {
        if (this._protocolVersion === null || this._protocolVersion.getMajor() === 1) {
            this._setVersion(sdlPacket.getVersion());
        }
        const frameType = sdlPacket.getFrameType();
        if (frameType === FrameType.CONTROL) {
            return this._handleControlPacket(sdlPacket);
        } else {
            const messageFrameAssembler = this._getMessageFrameAssembler(sdlPacket);
            return messageFrameAssembler.handleFrame(sdlPacket);
        }
    }

    /**
     * Handles non-control packets after they have been assembled.
     * @param {SdlPacket} sdlPacket 
     */
    _handleOnMessageAssembled (sdlPacket) {
        const serviceType = sdlPacket.getServiceType();

        if (serviceType === ServiceType.RPC || serviceType === ServiceType.HYBRID) {
            return this._handleRPCPacket(sdlPacket);
        } else if (serviceType === ServiceType.HYBRID) {
            return this._handleRPCPacket(sdlPacket);
        } else {
            console.warn('Unhandled service type ', sdlPacket);
        }
    }

    /**
     * Get the message frame assembler for the packet.
     * @param {SdlPacket} sdlPacket
     */
    _getMessageFrameAssembler (sdlPacket) {
        const self = this;
        let messageFrameAssembler = self._messageFrameAssemblers[sdlPacket.getMessageID()];
        if (!messageFrameAssembler) {
            messageFrameAssembler = new MessageFrameAssembler(function (err, sdlPacket) {
                if (err) {
                    throw err;
                }
                self._messageFrameAssemblers[sdlPacket.getMessageID()] = null; // Remove the mapping
                self._handleOnMessageAssembled(sdlPacket);
            });
            self._messageFrameAssemblers[sdlPacket.getMessageID()] = messageFrameAssembler;
        }

        return messageFrameAssembler;
    }

    /**
     * Handles incoming control packets.
     * @param { SdlPacket } sdlPacket
     */
    _handleControlPacket (sdlPacket) {
        const frameInfo = sdlPacket.getFrameInfo();
       
        if (frameInfo === SdlPacket.FRAME_INFO_HEART_BEAT) {
            return this._handleProtocolHeartbeat(sdlPacket);
        } else if (frameInfo === SdlPacket.FRAME_INFO_HEART_BEAT_ACK) {
            return this._handleProtocolHeartbeatACK(sdlPacket);
        } else if (frameInfo === SdlPacket.FRAME_INFO_START_SERVICE_ACK) {
            return this._handleStartServiceACK(sdlPacket);
        } else if (frameInfo === SdlPacket.FRAME_INFO_START_SERVICE_NAK) {
            return this._handleStartServiceNAK(sdlPacket);
        } else if (frameInfo === SdlPacket.FRAME_INFO_END_SERVICE_ACK) {
            return this._handleEndServiceACK(sdlPacket);
        } else if (frameInfo === SdlPacket.FRAME_INFO_END_SERVICE) {
            return this._handleEndService(sdlPacket);
        } else if (frameInfo === SdlPacket.FRAME_INFO_END_SERVICE_NAK) {
            return this._handleEndServiceNAK(sdlPacket);
        } else {
            console.warn('Unhandled control packet', { frameInfo, });
        }
    }


    /**
     * Handle heartbeat (Only available in protocol version 3)
     * @param {SdlPacket} sdlPacket 
     */
    _handleProtocolHeartbeat (sdlPacket) {
        const heartbeat = SdlPacketFactory.createHeartbeatACK(
            ServiceType.CONTROL, 
            this._getSessionId(), 
            this._protocolVersion.getMajor());
        this.sendPacket(heartbeat);
    }

    /**
     * Handles heartbeat ACK.
     * @param {SdlPacket} sdlPacket 
     */
    _handleProtocolHeartbeatACK (sdlPacket) {
        console.log(`Received HeartbeatACK - ${sdlPacket.toString()}`);
    }

    /**
     * Handles start service ACK. Sets the appropriate version, MTU, and other
     * service related info.
     * @param {SdlPacket} sdlPacket
     */
    _handleStartServiceACK (sdlPacket) {  
        const version = sdlPacket.getVersion();
        const serviceType = sdlPacket.getServiceType();
        if (version >= 5) {
            let mtuTag = null;
            if (serviceType === ServiceType.RPC) {
                mtuTag = ControlFrameTags.RPC.StartServiceACK.MTU;
            } else if (serviceType === (ServiceType.PCM)) {
                mtuTag = ControlFrameTags.Audio.StartServiceACK.MTU;
            } else if (serviceType === (ServiceType.NAV)) {
                mtuTag = ControlFrameTags.Video.StartServiceACK.MTU;
            }
            const mtu = sdlPacket.getTag(mtuTag);

            if (mtu !== null) {
                this._mtus[serviceType] = mtu;
            }
            if (serviceType === ServiceType.RPC) {
                this._sessionID = sdlPacket.getSessionID();
                //TODO handle older versions of the protocol where this was just their payload, no BSON
                this._hashID = sdlPacket.getTag(ControlFrameTags.RPC.StartServiceACK.HASH_ID);
                const version = sdlPacket.getTag(ControlFrameTags.RPC.StartServiceACK.PROTOCOL_VERSION);
                if (version) {
                    // At this point we have confirmed the negotiated version between the module and the proxy
                    this._protocolVersion = (new Version()).fromString(version);
                } else {
                    this._protocolVersion = new Version(5, 0, 0);
                }
            }
        } else {
            if (this._protocolVersion.getMajor() > 1) {
                const payload = sdlPacket.getPayload();
                if (payload !== null && payload.length === 4) { // hashid will be 4 bytes in length
                    this._hashID = BitConverter.arrayBufferToInt32(payload.buffer);
                }
            }
        }

        this._sdlProtocolListener.onProtocolSessionStarted(serviceType,
            sdlPacket.getSessionID(), this._protocolVersion.getMajor(), '', this._hashID, sdlPacket.getEncryption());
    }

    /**
     * Handles start service rejection.
     * @param {SdlPacket} sdlPacket
     */
    _handleStartServiceNAK (sdlPacket) {
        const error = `Got StartSessionNACK for protocol sessionID ${sdlPacket.getSessionID()}`;
        throw error;
    }


    /**
     * Handles service ended by app process.
     * @param {SdlPacket} sdlPacket
     */
    _handleEndServiceACK (sdlPacket) {
        return this._handleServiceEnded(sdlPacket);
    }

    /**
     * Service ended by non app process or for some unexpected reason.
     * @param {SdlPacket} sdlPacket
     */
    _handleEndService (sdlPacket) {
        return this._handleServiceEnded(sdlPacket);
    }


    /**
     * Handles serivce ending.
     * @param {*} sdlPacket 
     */
    _handleServiceEnded (sdlPacket) {
        this._sdlProtocolListener.onProtocolSessionEnded(sdlPacket.getServiceType(), sdlPacket.getSessionID(), '');
    }

    /**
     * Handles service end rejection.
     * @param {SdlPacket} sdlPacket
     */
    _handleEndServiceNAK (sdlPacket) {
        const serviceType = sdlPacket.getServiceType();
        const protocolVersion = sdlPacket.getVersion();
        if (protocolVersion >= 5) {
            let rejectedTag = null;
            if (serviceType === ServiceType.AUDIO) {
                rejectedTag = ControlFrameTags.Audio.EndServiceNAK.REJECTED_PARAMS;
            }
            const rejectedParams = sdlPacket.getTag(rejectedTag);
            if (Array.isArray(rejectedParams) && rejectedParams.length > 0) {
                console.error('Got EndSessionNAK with rejected params', rejectedParams);
            }
        }
        this._sdlProtocolListener.onProtocolSessionEndedNACKed(serviceType, sdlPacket.getSessionID(), '');
    }

    /**
     * Handles incoming assembled rpc packet.
     * Notifies sdlProtocolListener of the event after assembleing an RpcMessage
     * @param {SdlPacket} sdlPacket
     */
    _handleRPCPacket (sdlPacket) {
        const rpcMessage = RpcCreator.construct(sdlPacket);
        if (rpcMessage !== null) {
            this._sdlProtocolListener.onRpcMessageReceived(rpcMessage);
        }
    }

    /**
     * Ends the default session.
     */
    endSession () {
        const sessionId = this._getSessionId();
        const hashID = this._hashID;
        const serviceType = ServiceType.RPC;
        const messageID = this._getNextMessageID();
        const version = this._protocolVersion.getMajor();
        const sdlPacket = SdlPacketFactory.createEndSession(serviceType, sessionId, messageID, version, hashID);
        this.sendPacket(sdlPacket);
    }

    /**
     * Ends a specific service
     * @param {ServiceType} serviceType - Service type being ended. When the RPC service is ended the entire session ends.
     * @param {Number} sessionId - represents a byte 
     */
    endService (serviceType, sessionId) {
        if (serviceType === ServiceType.RPC) {
            return this.endSession();
        } else {
            const hashID = this._hashID;
            const messageID = this._getNextMessageID();
            const version = this._protocolVersion.getMajor();
            const sdlPacket = SdlPacketFactory.createEndSession(serviceType, sessionId, messageID, version, hashID);
            this.sendPacket(sdlPacket);
        }
    }
}

/**
 * Original header size based on version 1.0.0 only
 */
SdlProtocolBase.V1_HEADER_SIZE = 8;
/**
 * Larger header size that is used by versions 2.0.0 and up
 */
SdlProtocolBase.V2_HEADER_SIZE = 12;

SdlProtocolBase.V1_V2_MTU_SIZE = 1500;
SdlProtocolBase.V3_V4_MTU_SIZE = 131072;

/**
 * Max supported protocol version in this release of the library
*/
SdlProtocolBase.MAX_PROTOCOL_VERSION = new Version(5, 2, 0);

export { SdlProtocolBase };
