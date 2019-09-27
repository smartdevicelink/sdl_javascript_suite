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

import { SdlProtocolListener } from './SdlProtocolListener.js';
import { TransportListener } from '../transport/TransportListener.js'
import { TransportConfigBase } from '../transport/TransportConfigBase.js'
import { Version } from '../util/Version.js'
import { ServiceType } from './enums/ServiceType.js'
import { FrameType } from './enums/FrameType.js'
import { MessageFrameAssembler } from './MessageFrameAssembler.js'
import { SdlPacket } from './SdlPacket.js';

class SdlProtocolBase {

    /**
     * @constructor
     * @param {TransportConfigBase} baseTransportConfig
     * @param {SdlProtocolListener} sdlProtocolListener
     */
    constructor(baseTransportConfig, sdlProtocolListener) {
        this._transportConfig = baseTransportConfig;
        this._sdlProtocollistener = sdlProtocolListener;
        reset();

        _createTransportListener();
        this._transportManager = null; //The transport manager should be created
    }


    _createTransportListener() {
        this._transportListener = new TransportListener();
        this._transportListener.setOnTransportConnected(function () {
            //Transport connected
            //Start RPC session

        });
        this._transportListener.setOnTransportDisconnected(function () {
            //Transport disconnected
            //Shut everything down

        });
        this._transportListener.setOnPacketReceived(function (sdlPacket) {
            //SdlPacket received
            this._handlePacketReceived(sdlPacket); //Could just pass in this funciton instead of creating an anonymouse funciton to call it

        });
        this._transportListener.setOnError(function () {
            //Handle error?

        });

    }

    /**
     * Starts up the SDL protocol class. It will kick off the transport manager and underlying transport.
     */
    start() {
        if (this._transportManager == null) {
            throw "transport manager was null, unable to start SDL Protocol";
        }

        this._transportManager.start();

        return this;
    }

    /**
     * 
     * @param { ServiceType } serviceType 
     * @return {number} max transport unit for the give service type
     */
    getMtu(serviceType) {
        let retVal = this._mtus.get(serviceType);
        if (retVal != null) {
            return retVal;
        }
        return SdlProtocolBase.V1_V2_MTU_SIZE;
    }

    /**
     * @return {Boolean} isConnected
     */
    isConnected() {
        return this._transportManager != null && this._transportManager.isConnected(null, null);
    }

    reset() {
        this._protocol_version = new Version(1, 0, 0);
        this._transportConfig = baseTransportConfig;
        this._headerSize = SdlProtocolBase.V1_HEADER_SIZE;
        this.serviceStatus = new Map();
        this.serviceStatus[ServiceType.CONTROL] = true;
        this._mtus = new Map();
        this._mtus[ServiceType.RPC] = SdlProtocolBase.V1_V2_MTU_SIZE - this._headerSize;
        this._hashID = 0;
        this._messageID = 0;
        this._messageFrameAssemblers = new Map();
    }

    /**
     * @returns {Version} protocol_version
     */
    getProtocolVersion() {
        return this._protocol_version;
    }


    /**
 * This method will set the major protocol version that we should use. It will also set the default MTU based on version.
 * @param { number } version major version to use
 */
    _setVersion(version) {
        if (version > 5) {
            this.protocolVersion = new Version("5.1.0"); //protect for future, proxy only supports v5 or lower
            headerSize = V2_HEADER_SIZE;
            mtus[ServiceType.RPC] = V3_V4_MTU_SIZE;
        } else if (version == 5) {
            this.protocolVersion = new Version("5.0.0");
            headerSize = V2_HEADER_SIZE;
            mtus[ServiceType.RPC] = V3_V4_MTU_SIZE;
        } else if (version == 4) {
            this.protocolVersion = new Version("4.0.0");
            headerSize = V2_HEADER_SIZE;
            mtus[ServiceType.RPC] = V3_V4_MTU_SIZE; //versions 4 supports 128k MTU
        } else if (version == 3) {
            this.protocolVersion = new Version("3.0.0");
            headerSize = V2_HEADER_SIZE;
            mtus[ServiceType.RPC] = V3_V4_MTU_SIZE; //versions 3 supports 128k MTU
        } else if (version == 2) {
            this.protocolVersion = new Version("2.0.0");
            headerSize = V2_HEADER_SIZE;
            mtus[ServiceType.RPC] = V1_V2_MTU_SIZE - headerSize;
        } else if (version == 1) {
            this.protocolVersion = new Version("1.0.0");
            headerSize = V1_HEADER_SIZE;
            mtus[ServiceType.RPC] = V1_V2_MTU_SIZE - headerSize;
        }
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket
     */
    sendPacket(sdlPacket) {
        if (this._transportManager != null) {
            this._transportManager.sendPacket(sdlPacket);
        }
    }

    /**
     * 
     * @param {RpcMessage} rpcMessage 
     */
    sendRpc(rpcMessage) {
        if (rpcMessage != null) {
            //(version = 1, encryption = false, frameType = -1, serviceType = -1, frameInfo = -1, sessionID = 0, dataSize = 0, messageID = 0, payload = null, offset = 0, bytesToWrite = 0) {

            let paramBytes = new Uint8Array(rpcMessage.getParameters());
            let sdlPacket = new SdlPacket(this._protocol_version.getMajor(), false);
            //TODO: sdlPacket.set


        }

    }

    sendMessage(protocolMessage) {
        //TODO 
        // This is the method that handles all the building of sdl packets that get sent 
        // in the java suite lib. We want to avoid using protocol message here as an extra 
        // class that doesn't make much sense. I believe we should probably alter SdlPacket
        // to handle the situation protocol message used to
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _handlePacketReceived(sdlPacket) {
        if (this._protocol_version == null || this._protocol_version.getMajor() == 1) {
            this._setVersion(packet.version);
        }
        if (sdlPacket.getFrameType() == FrameType.FIRST || sdlPacket.getFrameType() == FrameType.CONSECUTIVE) {
            messageFrameAssembler = _getMessageFrameAssembler(sdlPacket);
            messageFrameAssembler.handleFrame(sdlPacket);
        } else {
            //Packet can be handled as is
            switch (sdlPacket.getFrameType()) {
                case FrameType.CONTROL:
                    this._handleControlPacket(sdlPacket);
                    break;
                case FrameType.SINGLE:
                    switch (sdlPacket.getServiceType()) {
                        case ServiceType.RPC:
                            this._handleRPCPacket(sdlPacket)
                            break;

                    }
            }
        }


    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _getMessageFrameAssembler(sdlPacket) {
        let messageFrameAssembler = this._messageFrameAssemblers[sdlPacket.getMessageID()];
        if (messageFrameAssembler == null) {
            messageFrameAssembler = MessageFrameAssembler(this._headerSize, new function (sdlPacket) {
                //TODO
                // Make sure we want to pass back an SDL Packet. 

                this._messageFrameAssemblers[sdlPacket.getMessageID()] = null; //Remove the mapping
            });
            this._messageFrameAssemblers[sdlPacket.getMessageID()] = messageFrameAssembler;
        }

        return messageFrameAssembler;
    }

    /**
     * This method will handle control packets for all service types
     * @param { SdlPacket } sdlPacket 
     */
    _handleControlPacket(sdlPacket) {
        let serviceType = sdlPacket.getServiceType();
        let frameInfo = sdlPacket.getFrameInfo();
        let payload = sdlPacket.getPayload();

        switch (frameInfo) {
            case sdlPacket.FRAME_INFO_START_SERVICE_ACK:
                this._handleStartServiceACK(sdlPacket);
                break;
            case sdlPacket.FRAME_INFO_START_SERVICE_NAK:
                this._handleStartServiceNAK(sdlPacket);
                break;
            case sdlPacket.FRAME_INFO_END_SERVICE_ACK:
                this._handleEndServiceACK(sdlPacket);
                break;
            case sdlPacket.FRAME_INFO_END_SERVICE_NAK:
                this._handleEndServiceACK(sdlPacket);
                break;
        }

    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _handleStartServiceACK(sdlPacket) {
        //TODO
        //Handle things internally first
        switch (serviceType) {
            case ServiceType.RPC:
            case ServiceType.CONTROL:
            case ServiceType.HYBRID:
            case ServiceType.AUDIO:
            case ServiceType.VIDEO:
        }

        //Then call the listener (should be SdlSession)
        if (this._sdlProtocollistener != null) {
            this._sdlProtocollistener.onStartServiceACKReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _handleStartServiceNAK(sdlPacket) {
        //TODO
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _handleEndServiceACK(sdlPacket) {
        //TODO
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _handleEndServiceNAK(sdlPacket) {
        //TODO
    }


    _handleControlServicePacket(sdlPacket) {
        if (this._sdlProtocollistener != null) {
            this._sdlProtocollistener.onControlServiceMessageReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    _handleRPCPacket(sdlPacket) {
        let payload = sdlPacket.getPayload();
        // TODO possibly add error checking that ensures this is an RPC packet
        let rpcMessage = null;
        if (this._protocol_version.getMajor() == 1) {
            //There is no binary frame header

        }
        //TODO actually create the RPC message

        if (this._sdlProtocollistener != null) {
            this._sdlProtocollistener.onRpcMessageReceived(rpcMessage);
        }

    }


    //Not sure if we need

    /**
     * 
     * @param {*} sessionID 
     * @param {*} _hashID 
     */
    endSession(sessionID, _hashID) { };



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
