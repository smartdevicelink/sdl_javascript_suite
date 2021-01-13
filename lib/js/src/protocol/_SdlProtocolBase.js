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

import { _MessageFrameDisassembler } from './_MessageFrameDisassembler.js';
import { _TransportListener } from '../transport/_TransportListener.js';
import { Version } from '../util/Version.js';
import { _ServiceType } from './enums/_ServiceType.js';
import { _FrameType } from './enums/_FrameType.js';
import { _MessageFrameAssembler } from './_MessageFrameAssembler.js';
import { _SdlPacket } from './_SdlPacket.js';
import { _ControlFrameTags } from './enums/_ControlFrameTags.js';
import { _BitConverter } from './../util/_BitConverter.js';

import { _SdlPacketFactory } from './_SdlPacketFactory.js';
import { RpcCreator } from './../rpc/RpcCreator.js';
import { ImageResolution } from '../rpc/structs/ImageResolution.js';
import { VideoStreamingFormat } from '../rpc/structs/VideoStreamingFormat.js';

import { VehicleType } from './../rpc/structs/VehicleType.js';

/**
 * Base implementation of sdl protocol.
 * Should be able to handle basic control frames and be able to
 * send and receive packets from the transport manager.
 * Also sends key events to the sdlProtocolListener.
 */
class _SdlProtocolBase {
    /**
     * Initializes an instance of _SdlProtocolBase.
     * @class
     * @private
     * @param { _TransportConfigBase } baseTransportConfig - A TransportConfig instance.
     * @param { _SdlProtocolListener } sdlProtocolListener - An _SdlProtocolListener instance.
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        this._baseTransportConfig = baseTransportConfig;
        this._transportConfig = baseTransportConfig;
        this._sdlProtocolListener = sdlProtocolListener;
        this._transportManager = null;

        this._reset();
        this._createTransportListener();
    }


    /**
     * Resets the sdl protocol to its default state.
     * @private
     */
    _reset () {
        this._protocolVersion = new Version(1, 0, 0);
        this._transportConfig = this._baseTransportConfig;
        this._headerSize = _SdlProtocolBase.V1_HEADER_SIZE;
        this._serviceStatus = {};
        this._serviceStatus[_ServiceType.CONTROL] = true;
        this._mtus = {};
        this._mtus[_ServiceType.RPC] = _SdlProtocolBase.V1_V2_MTU_SIZE - this._headerSize;
        this._hashID = 0;
        this._messageFrameAssemblers = {};
        this._messageID = 1;
        this._sessionID = 0;
    }


    /**
     * Sets a transport manager.
     * @param { _TransportManagerBase } manager - A TransportManager instance.
     */
    setTransportManager (manager) {
        if (!this._serviceStatus[_ServiceType.RPC]) {
            // RPC service hasn't been started, lets start it
            this.startService(_ServiceType.RPC, 0, false);
        }
        this._transportManager = manager;
    }


    /**
     * Creates the transport listener. This will recieve incoming requests from the transport manager.
     * @private
     */
    _createTransportListener () {
        const self = this;
        this._transportListener = new _TransportListener();
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

    /**
     * Triggers the onTransportConnected event.
     * @private
     */
    _handleTransportConnected () {
        this._sdlProtocolListener.onTransportConnected();
    }

    /**
     * Starts up the SDL protocol class. It will kick off the transport manager and underlying transport.
     */
    start () {
        if (!this._transportManager) {
            throw new Error('A transport manager must be defined, unable to start SDL Protocol');
        }
        this._transportManager.start();
    }


    /**
     * Start the service. This is the first step in communicating with sdl core.
     * @param {_ServiceType} serviceType - A ServiceType enum value.
     * @param {Number} sessionID - The session ID.
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    startService (serviceType, sessionID, isEncrypted) {
        const protocolVersion = this.constructor.MAX_PROTOCOL_VERSION;
        const messageID = 0;
        const header = new _SdlPacket(protocolVersion.getMajor(), isEncrypted, _FrameType.CONTROL,
            serviceType, _SdlPacket.FRAME_INFO_START_SERVICE, sessionID,
            0, messageID, null);
        if (serviceType === _ServiceType.AUDIO) {
            // perform sendPacket later
        } else if (serviceType === _ServiceType.RPC) {
            header.putTag(_ControlFrameTags.RPC.StartService.PROTOCOL_VERSION, protocolVersion.toString());
        } else if (serviceType === _ServiceType.VIDEO) {
            if (this._sdlProtocolListener !== null) {
                const videoStreamingParameters = this._sdlProtocolListener.getDesiredVideoParams();
                if (videoStreamingParameters !== null) {
                    const desiredResolution = videoStreamingParameters.getResolution();
                    const desiredFormat = videoStreamingParameters.getFormat();
                    if (desiredResolution) {
                        header.putTag(_ControlFrameTags.Video.StartService.WIDTH, desiredResolution.getResolutionWidth());
                        header.putTag(_ControlFrameTags.Video.StartService.HEIGHT, desiredResolution.getResolutionHeight());
                    }
                    if (desiredFormat) {
                        header.putTag(_ControlFrameTags.Video.StartService.VIDEO_CODEC, desiredFormat.getCodec());
                        header.putTag(_ControlFrameTags.Video.StartService.VIDEO_PROTOCOL, desiredFormat.getProtocolParam());
                    }
                }
            }
            // perform sendPacket later
        } else {
            throw new Error('Service type not implemented');
        }
        this.sendPacket(header);
    }

    /**
     * Get the max transport unit of a specific service type.
     * @param { _ServiceType } serviceType - A ServiceType enum value.
     * @returns {Number} - Max transport unit for the given service type.
     */
    getMtu (serviceType) {
        const retVal = this._mtus[serviceType];
        if (retVal) {
            return retVal;
        }
        return _SdlProtocolBase.V1_V2_MTU_SIZE;
    }

    /**
     * Returns true if transport manager is connected.
     * @returns {Boolean} - Whether or not the transport is connected.
     */
    isConnected () {
        return this._transportManager && this._transportManager.isConnected(null, null);
    }

    /**
     * Get the current protocol version in use.
     * @returns {Version} - The protocol version
     */
    getProtocolVersion () {
        return this._protocolVersion;
    }


    /**
     * This method will set the major protocol version that we should use. It will also set the default MTU based on version.
     * @private
     * @param {Number} version - The major version to use
     */
    _setVersion (version) {
        if (version > 5) {
            this._protocolVersion = new Version('5.1.0'); // protect for future, proxy only supports v5 or lower
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[_ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE;
        } else if (version === 5) {
            this._protocolVersion = new Version('5.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[_ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE;
        } else if (version === 4) {
            this._protocolVersion = new Version('4.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[_ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE; // versions 4 supports 128k MTU
        } else if (version === 3) {
            this._protocolVersion = new Version('3.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[_ServiceType.RPC] = this.constructor.V3_V4_MTU_SIZE; // versions 3 supports 128k MTU
        } else if (version === 2) {
            this._protocolVersion = new Version('2.0.0');
            this.headerSize = this.constructor.V2_HEADER_SIZE;
            this._mtus[_ServiceType.RPC] = this.constructor.V1_V2_MTU_SIZE - this.headerSize;
        } else if (version === 1) {
            this._protocolVersion = new Version('1.0.0');
            this.headerSize = this.constructor.V1_HEADER_SIZE;
            this._mtus[_ServiceType.RPC] = this.constructor.V1_V2_MTU_SIZE - this.headerSize;
        }
    }

    /**
     * Sends an sdlPacket.
     * @param {_SdlPacket} sdlPacket - The _SdlPacket to send.
     */
    sendPacket (sdlPacket) {
        if (this._transportManager) {
            this._transportManager.sendPacket(sdlPacket);
        }
    }

    /**
     * Returns the sessionId in use.
     * @returns {Number} - The session ID.
     */
    _getSessionId () {
        return this._sdlProtocolListener.getSessionId();
    }

    /**
     * Gets the next available messageID for sending requests.
     * @returns {Number} - A new numeric message ID.
     */
    _getNextMessageID () {
        return this._messageID++;
    }

    /**
     * Gets the Vehicle details received in StartService ACK protocol message
     * @returns {Number} - A new numeric message ID.
     */
    _getVehicleType(sdlPacket) {
        const make = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.VEHICLE_MAKE);
        if (!make) {
            return null;
        }
        const model = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.VEHICLE_MODEL);
        const modelYear = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.VEHICLE_MODEL_YEAR);
        const trim = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.VEHICLE_TRIM);

        const vehicleType = new VehicleType({
            make,
            model,
            modelYear,
            trim,
        });

        const systemHardwareVersion = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.VEHICLE_SYSTEM_HARDWARE_VERSION);
        const systemSoftwareVersion = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.VEHICLE_SYSTEM_SOFTWARE_VERSION);

        return {
            vehicleType,
            systemHardwareVersion,
            systemSoftwareVersion,
        }
    }

    /**
     * Takes an rpc message and sends a single or multi frame packets.
     * @param {RpcMessage} rpcMessage - Converts an RpcMessage into an _SdlPacket and sends it.
     */
    sendRpc (rpcMessage) {
        const self = this;
        const sessionId = this._getSessionId();
        const messageID = this._getNextMessageID();
        const mtu = self._mtus[_ServiceType.RPC];
        const version = self._protocolVersion.getMajor();
        const isEncrypted = rpcMessage.isPayloadProtected();

        _MessageFrameDisassembler.buildRPC(rpcMessage, sessionId, messageID, mtu, version, isEncrypted, function (sdlPacket) {
            self.sendPacket(sdlPacket);
        });
    }

    /**
     * Handles incoming packets.
     * @private
     * @param {_SdlPacket} sdlPacket - An incoming _SdlPacket.
     */
    _handlePacketReceived (sdlPacket) {
        if (this._protocolVersion === null || this._protocolVersion.getMajor() === 1) {
            this._setVersion(sdlPacket.getVersion());
        }
        const frameType = sdlPacket.getFrameType();
        if (frameType === _FrameType.CONTROL) {
            this._handleControlPacket(sdlPacket);
        } else {
            const messageFrameAssembler = this._getMessageFrameAssembler(sdlPacket);
            messageFrameAssembler.handleFrame(sdlPacket);
        }
    }

    /**
     * Handles non-control packets after they have been assembled.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleOnMessageAssembled (sdlPacket) {
        const serviceType = sdlPacket.getServiceType();

        if (serviceType === _ServiceType.RPC || serviceType === _ServiceType.HYBRID) {
            this._handleRPCPacket(sdlPacket);
        } else if (serviceType === _ServiceType.HYBRID) {
            this._handleRPCPacket(sdlPacket);
        } else {
            console.warn('Unhandled service type ', sdlPacket);
        }
    }

    /**
     * Get the message frame assembler for the packet.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     * @returns {_MessageFrameAssembler} - A _MessageFrameAssembler.
     */
    _getMessageFrameAssembler (sdlPacket) {
        const self = this;
        let messageFrameAssembler = self._messageFrameAssemblers[sdlPacket.getMessageID()];
        if (!messageFrameAssembler) {
            messageFrameAssembler = new _MessageFrameAssembler(function (err, sdlPacket) {
                if (err) {
                    throw new Error(err);
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
     * @private
     * @param { _SdlPacket } sdlPacket - An _SdlPacket.
     */
    _handleControlPacket (sdlPacket) {
        const frameInfo = sdlPacket.getFrameInfo();

        if (frameInfo === _SdlPacket.FRAME_INFO_HEART_BEAT) {
            this._handleProtocolHeartbeat(sdlPacket);
        } else if (frameInfo === _SdlPacket.FRAME_INFO_HEART_BEAT_ACK) {
            this._handleProtocolHeartbeatACK(sdlPacket);
        } else if (frameInfo === _SdlPacket.FRAME_INFO_START_SERVICE_ACK) {
            this._handleStartServiceACK(sdlPacket);
        } else if (frameInfo === _SdlPacket.FRAME_INFO_START_SERVICE_NAK) {
            const reason = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceNAK.REASON);
            console.warn(reason);
            this._handleStartServiceNAK(sdlPacket);
        } else if (frameInfo === _SdlPacket.FRAME_INFO_END_SERVICE_ACK) {
            this._handleEndServiceACK(sdlPacket);
        } else if (frameInfo === _SdlPacket.FRAME_INFO_END_SERVICE) {
            this._handleEndService(sdlPacket);
        } else if (frameInfo === _SdlPacket.FRAME_INFO_END_SERVICE_NAK) {
            const reason = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceNAK.REASON);
            console.warn(reason);
            this._handleEndServiceNAK(sdlPacket);
        } else {
            console.warn('Unhandled control packet', { frameInfo });
        }
    }


    /**
     * Handle heartbeat (Only available in protocol version 3)
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleProtocolHeartbeat (sdlPacket) {
        const heartbeat = _SdlPacketFactory.createHeartbeatACK(
            _ServiceType.CONTROL,
            this._getSessionId(),
            this._protocolVersion.getMajor());
        this.sendPacket(heartbeat);
    }

    /**
     * Handles heartbeat ACK.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleProtocolHeartbeatACK (sdlPacket) {
        console.log(`Received HeartbeatACK - ${sdlPacket.toString()}`);
    }

    /**
     * Handles start service ACK. Sets the appropriate version, MTU, and other service related info.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleStartServiceACK (sdlPacket) {
        const version = sdlPacket.getVersion();
        const serviceType = sdlPacket.getServiceType();
        if (version >= 5) {
            const vehicleTypeFromPacket = this._getVehicleType(sdlPacket);
            if (
              vehicleTypeFromPacket
              && this._sdlProtocolListener !== null
              && typeof this._sdlProtocolListener.onVehicleTypeReceived === 'function'
            ) {
                const {vehicleType, systemSoftwareVersion, systemHardwareVersion } = vehicleTypeFromPacket;
                if (!this._sdlProtocolListener.onVehicleTypeReceived(vehicleType, systemSoftwareVersion, systemHardwareVersion)) {
                    console.warn('Disconnecting from head unit, the vehicle is not supported (ACK)');
                    this.endService(serviceType, sdlPacket.getSessionID());
                    if (serviceType === _ServiceType.RPC && this._transportManager !== null) {
                        this._transportManager.stop();
                    }
                    return;
                }
            }

            let mtuTag = null;
            if (serviceType === _ServiceType.RPC) {
                mtuTag = _ControlFrameTags.RPC.StartServiceACK.MTU;
            } else if (serviceType === (_ServiceType.PCM)) {
                mtuTag = _ControlFrameTags.Audio.StartServiceACK.MTU;
            } else if (serviceType === (_ServiceType.NAV)) {
                mtuTag = _ControlFrameTags.Video.StartServiceACK.MTU;
            }
            const mtu = sdlPacket.getTag(mtuTag);

            if (mtu !== null) {
                this._mtus[serviceType] = mtu;
            }
            if (serviceType === _ServiceType.RPC) {
                this._sessionID = sdlPacket.getSessionID();
                // TODO handle older versions of the protocol where this was just their payload, no BSON
                this._hashID = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.HASH_ID);
                const version = sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.PROTOCOL_VERSION);
                if (version) {
                    // At this point we have confirmed the negotiated version between the module and the proxy
                    this._protocolVersion = (new Version()).fromString(version);
                } else {
                    this._protocolVersion = new Version(5, 0, 0);
                }

                if ((this._protocolVersion.isNewerThan(new Version(5, 2, 0)) >= 0) && this._sdlProtocolListener !== null) {
                    this._sdlProtocolListener.onAuthTokenReceived(
                        sdlPacket.getTag(_ControlFrameTags.RPC.StartServiceACK.AUTH_TOKEN)
                    );
                }
            } else if (serviceType === _ServiceType.VIDEO) {
                if (this._sdlProtocolListener !== null) {
                    const acceptedResolution = new ImageResolution();
                    const acceptedFormat = new VideoStreamingFormat();
                    acceptedResolution.setResolutionHeight(Math.floor(sdlPacket.getTag(_ControlFrameTags.Video.StartServiceACK.HEIGHT)));
                    acceptedResolution.setResolutionWidth(Math.floor(sdlPacket.getTag(_ControlFrameTags.Video.StartServiceACK.WIDTH)));

                    acceptedFormat.setCodec(sdlPacket.getTag(_ControlFrameTags.Video.StartServiceACK.VIDEO_CODEC));
                    acceptedFormat.setProtocolParam(sdlPacket.getTag(_ControlFrameTags.Video.StartServiceACK.VIDEO_PROTOCOL));
                    const agreedVideoParams = this._sdlProtocolListener.getDesiredVideoParams();
                    agreedVideoParams.setResolution(acceptedResolution);
                    agreedVideoParams.setFormat(acceptedFormat);

                    this._sdlProtocolListener.setAcceptedVideoParams(agreedVideoParams);
                }
            }
        } else {
            if (this._protocolVersion.getMajor() > 1) {
                const payload = sdlPacket.getPayload();
                if (payload !== null && payload.length === 4) { // hashid will be 4 bytes in length
                    this._hashID = _BitConverter.arrayBufferToInt32(payload.buffer);
                }
            }
        }

        this._sdlProtocolListener.onProtocolSessionStarted(serviceType,
            sdlPacket.getSessionID(), this._protocolVersion.getMajor(), '', this._hashID, sdlPacket.getEncryption());
    }

    /**
     * Handles start service rejection.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleStartServiceNAK (sdlPacket) {
        const error = `Got StartSessionNACK for protocol sessionID ${sdlPacket.getSessionID()}`;
        throw new Error(error);
    }


    /**
     * Handles service ended by app process.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleEndServiceACK (sdlPacket) {
        this._handleServiceEnded(sdlPacket);
    }

    /**
     * Service ended by non app process or for some unexpected reason.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleEndService (sdlPacket) {
        this._handleServiceEnded(sdlPacket);
    }


    /**
     * Handles serivce ending.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleServiceEnded (sdlPacket) {
        this._sdlProtocolListener.onProtocolSessionEnded(sdlPacket.getServiceType(), sdlPacket.getSessionID(), '');
    }

    /**
     * Handles service end rejection.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    _handleEndServiceNAK (sdlPacket) {
        const serviceType = sdlPacket.getServiceType();
        const protocolVersion = sdlPacket.getVersion();
        if (protocolVersion >= 5) {
            let rejectedTag = null;
            if (serviceType === _ServiceType.AUDIO) {
                rejectedTag = _ControlFrameTags.Audio.EndServiceNAK.REJECTED_PARAMS;
            } else if (serviceType === _ServiceType.VIDEO) {
                rejectedTag = _ControlFrameTags.Video.EndServiceNAK.REJECTED_PARAMS;
            }
            const rejectedParams = sdlPacket.getTag(rejectedTag);
            if (Array.isArray(rejectedParams) && rejectedParams.length > 0) {
                console.error('Got EndSessionNAK with rejected params', rejectedParams);
            }
        }
        this._sdlProtocolListener.onProtocolSessionEndedNACKed(serviceType, sdlPacket.getSessionID(), '');
    }

    /**
     * Handles incoming assembled rpc packet. Notifies sdlProtocolListener of the event after assembleing an RpcMessage.
     * @private
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
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
        const serviceType = _ServiceType.RPC;
        const messageID = this._getNextMessageID();
        const version = this._protocolVersion.getMajor();
        const sdlPacket = _SdlPacketFactory.createEndSession(serviceType, sessionId, messageID, version, hashID);
        this.sendPacket(sdlPacket);
        if (this._transportManager !== null) {
            this._transportManager.stop();
        }
    }

    /**
     * Ends a specific service
     * @param {_ServiceType} serviceType - Service type being ended. When the RPC service is ended the entire session ends.
     * @param {Number} sessionId - represents a byte
     */
    endService (serviceType, sessionId) {
        if (serviceType === _ServiceType.RPC) {
            this.endSession();
        } else {
            const hashID = this._hashID;
            const messageID = this._getNextMessageID();
            const version = this._protocolVersion.getMajor();
            const sdlPacket = _SdlPacketFactory.createEndSession(serviceType, sessionId, messageID, version, hashID);
            this.sendPacket(sdlPacket);
        }
    }
}

/**
 * Original header size based on version 1.0.0 only
 */
_SdlProtocolBase.V1_HEADER_SIZE = 8;
/**
 * Larger header size that is used by versions 2.0.0 and up
 */
_SdlProtocolBase.V2_HEADER_SIZE = 12;

_SdlProtocolBase.V1_V2_MTU_SIZE = 1500;
_SdlProtocolBase.V3_V4_MTU_SIZE = 131072;

/**
 * Max supported protocol version in this release of the library
 */
_SdlProtocolBase.MAX_PROTOCOL_VERSION = new Version(5, 3, 0);

export { _SdlProtocolBase };
