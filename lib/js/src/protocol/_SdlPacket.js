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

import { _FrameType } from './enums/_FrameType.js';
import  { Bson } from './../util/Bson.js';

/**
 * @typedef {Object} _SdlPacket
 * @property {number} _EXTRA_PARCEL_DATA_LENGTH
 * @property @private {number} _HEADER_SIZE
 * @property {number} SERVICE_TYPE_CONTROL
 * @property {number} SERVICE_TYPE_RPC
 * @property {number} SERVICE_TYPE_PCM
 * @property {number} SERVICE_TYPE_VIDEO
 * @property {number} SERVICE_TYPE_BULK_DATA
 * @property {number} FRAME_INFO_HEART_BEAT
 * @property {number} FRAME_INFO_START_SERVICE
 * @property {number} FRAME_INFO_START_SERVICE_ACK
 * @property {number} FRAME_INFO_START_SERVICE_NAK
 * @property {number} FRAME_INFO_END_SERVICE
 * @property {number} FRAME_INFO_END_SERVICE_ACK
 * @property {number} FRAME_INFO_END_SERVICE_NAK
 * @property {number} FRAME_INFO_REGISTER_SECONDARY_TRANSPORT
 * @property {number} FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_ACK
 * @property {number} FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_NAK
 * @property {number} FRAME_INFO_TRANSPORT_EVENT_UPDATE
 * @property {number} FRAME_INFO_SERVICE_DATA_ACK
 * @property {number} FRAME_INFO_HEART_BEAT_ACK
 * @property {number} FRAME_INFO_FINAL_CONNESCUTIVE_FRAME
 * @property {number} FRAME_INFO_RESERVED
 * @property {function} getVersion
 * @property {function} getEncryption
 * @property {function} getServiceType
 * @property {function} getFrameInfo
 * @property {function} getSessionID
 * @property {function} getMessageID
 * @property {function} getDataSize
 * @property {function} setPayload
 * @property {function} getPayload
 * @property {function} getEncryptionBit
 * @property {function} getFrameType
 * @property {function} toUint8Array
 * @property {function} toString
 * @property {function} putTag
 * @property {function} getTag
 */

class _SdlPacket {
    /**
     * Initializes an instance of _SdlPacket.
     * @class
     * @private
     * @param {Number} version - Protocol version to use
     * @param {Boolean} encryption - Whether or not the payload in this packet is encrypted
     * @param {_FrameType} frameType - A number representing the packet frame type
     * @param {ServiceType} serviceType - The service that this packet is associated with
     * @param {Number} frameInfo - Specific frame info related to this packet
     * @param {Number} sessionID - ID this packet is associated with
     * @param {Number} dataSize - Size of the payload that will be added
     * @param {Number} messageID - ID of this specific packet
     * @param {Uint8Array} payload - Raw data that will be attached to the packet (RPC message, raw bytes, etc)
     * @param {Number} offset - Number of bytes to offset
     * @param {Number} bytesToWrite - Number of bytes to write
     */
    constructor (version = 1, encryption = false, frameType = -1, serviceType = -1, frameInfo = -1, sessionID = 0, dataSize = 0, messageID = 0, payload = null, offset = 0, bytesToWrite = 0) {
        this._version = version;
        this._encryption = encryption;
        this._frameType = frameType;
        this._serviceType = serviceType;
        this._frameInfo = frameInfo;
        this._sessionID = sessionID;
        this._dataSize = dataSize;
        this._messageID = messageID;
        this._payload = payload;
        this._offset = offset;
        this._bytesToWrite = bytesToWrite;

        this._bsonPayload = undefined;

        if (payload !== null) {
            this._payload = new Uint8Array(payload.slice(offset, bytesToWrite + offset));
        }
    }

    /**
     * Get the protocol version used by the packet.
     * @returns {Number} - Protocol version used by this packet.
     */
    getVersion () {
        return this._version;
    }

    /**
     * Get whether or not the payload in the packet is encrypted.
     * @returns {Boolean} - Whether or not the payload in this packet is encrypted.
     */
    getEncryption () {
        return this._encryption;
    }

    /**
     * Get the ServiceType enum value that the packet is associated with.
     * @returns {ServiceType} - The service that this packet is associated with.
     */
    getServiceType () {
        return this._serviceType;
    }

    /**
     * Get the frame info for this packet.
     * @returns {Number} - Specific frame info related to this packet.
     */
    getFrameInfo () {
        return this._frameInfo;
    }

    /**
     * Get the numeric session ID for this packet.
     * @returns {Number} - ID this packet is associated with.
     */
    getSessionID () {
        return this._sessionID;
    }

    /**
     * Get the numeric message ID for this packet.
     * @returns {Number} - ID of this specific packet.
     */
    getMessageID () {
        return this._messageID;
    }

    /**
     * Get the size of the payload for this packet.
     * @returns {Number} - Size of the payload that will be added
     */
    getDataSize () {
        return this._dataSize;
    }

    /**
     * Set the byte array payload for this packet.
     * @param {Uint8Array} payload - The payload as a byte array.
     * @returns {_SdlPacket} - A reference to this instance to support method chaining.
     */
    setPayload (payload) {
        this._payload = payload;
        return this;
    }

    /**
     * Get the payload associated with the packet as a byte array.
     * @returns {Uint8Array} - Raw data that will be attached to the packet (RPC message, raw bytes, etc).
     */
    getPayload () {
        return this._payload;
    }


    /**
     * Get the byte mask depending on whether or not encryption is enabled.
     * @param {Boolean} encryption - Whether or not encryption is enabled.
     * @returns {Number} - A number representing a byte mask.
     */
    static getEncryptionBit (encryption) {
        return encryption ? _SdlPacket._ENCRYPTION_MASK : 0;
    }

    /**
     * Get the Frame Type of the packet.
     * @returns {_FrameType} - A _FrameType enum value.
     */
    getFrameType () {
        if (_FrameType.keyForValue(this._frameType) !== null) {
            return this._frameType;
        } else {
            return _FrameType.SINGLE;
        }
    }

    /**
     * Generates a stringified summary of the packet.
     * @returns {String} - String representation of the packet.
     */
    toString () {
        let output = '***** Sdl Packet *****';
        output += `\nVersion: ${this._version}`;
        output += `\nEncryption: ${this._encryption}`;
        output += `\n_FrameType: ${this._frameType}`;
        output += `\nServiceType: ${this._serviceType}`;
        output += `\nFrameInfo: ${this._frameInfo}`;
        output += `\nSessionID: ${this._sessionID}`;
        output += `\nDataSize: ${this._dataSize}`;

        if (this._version > 1) {
            output += `\nMessageID: ${this._messageID}`;
        }

        output += '\n***** Sdl Packet End *****';

        return output;
    }

    /**
     * This method takes in the various components to the SDL packet structure and creates a new byte array that can be sent via the transport.
     * @private
     * @param {Number} version - Protocol version to use.
     * @param {Boolean} encryption - Whether or not the payload in this packet is encrypted.
     * @param {_FrameType} frameType - A number representing the packet frame type.
     * @param {ServiceType} serviceType - The service that this packet is associated with.
     * @param {Number} controlFrameInfo - Specific frame info related to this packet.
     * @param {Number} sessionID - ID this packet is associated with.
     * @param {Number} dataSize - Size of the payload that will be added.
     * @param {Number} messageID - ID of this specific packet.
     * @param {Uint8Array} payload - Raw data that will be attached to the packet (RPC message, raw bytes, etc).
     * @returns {Uint8Array} - A byte[] representation of an _SdlPacket built using the supplied params.
     */
    static _constructPacket (version, encryption, frameType, serviceType, controlFrameInfo, sessionID, dataSize, messageID, payload) {
        let dataView = null;
        let dataViewIndex = 0;

        if (version > 1) {
            dataView = new Uint8Array(_SdlPacket._HEADER_SIZE + dataSize);
        } else {
            dataView = new Uint8Array(_SdlPacket._HEADER_SIZE_V1 + dataSize);
        }

        dataView[dataViewIndex++] = (version << 4) + _SdlPacket.getEncryptionBit(encryption) + frameType;
        dataView[dataViewIndex++] = serviceType;
        dataView[dataViewIndex++] = controlFrameInfo;
        dataView[dataViewIndex++] = sessionID;
        dataView[dataViewIndex++] = (dataSize & 0xFF000000) >> 24;
        dataView[dataViewIndex++] = (dataSize & 0x00FF0000) >> 16;
        dataView[dataViewIndex++] = (dataSize & 0x0000FF00) >> 8;
        dataView[dataViewIndex++] = dataSize & 0x000000FF;

        if (version > 1) {
            dataView[dataViewIndex++] = (messageID & 0xFF000000) >> 24;
            dataView[dataViewIndex++] = (messageID & 0x00FF0000) >> 16;
            dataView[dataViewIndex++] = (messageID & 0x0000FF00) >> 8;
            dataView[dataViewIndex++] = messageID & 0x000000FF;
        }

        if (payload !== null && payload.length > 0) {
            dataView.set(payload, dataViewIndex);
        }

        return dataView;
    }

    /**
     * This method converts an _SdlPacket instance to a new byte array that can be sent via the transport.
     * @returns {Uint8Array} - A byte[] representation of an _SdlPacket built using the supplied params.
     */
    toPacket () {
        if (this._bsonPayload) {
            this._payload = Bson.serialize(this._bsonPayload);
            this._dataSize = this._payload.length;
        }

        return _SdlPacket._constructPacket(this._version, this._encryption, this._frameType, this._serviceType, this._frameInfo, this._sessionID, this._dataSize, this._messageID, this._payload);
    }

    /**
     * Add a tag key/val to the bson payload.
     * @param {String} tag - String key to add as a property to the BSON map.
     * @param {Object} data - Object to add as a value to the BSON map.
     */
    putTag (tag, data) {
        if (!this._bsonPayload) {
            this._bsonPayload = {};
        }
        this._bsonPayload[tag] = data;
    }

    /**
     * Get the value associated with a tag.
     * @param {String} tag - String key to add as a property to the BSON map
     * @returns {*} - The value associated with the tag. May return null or undefined.
     */

    getTag (tag) {
        if (!this._bsonPayload) {
            if (!this._payload || this._payload.length === 0) {
                return null;
            }
            this._bsonPayload = Bson.deserialize(this._payload);
            return this._bsonPayload[tag];
        } else {
            return this._bsonPayload[tag];
        }
    }
}

_SdlPacket._EXTRA_PARCEL_DATA_LENGTH                      = 24;
_SdlPacket._HEADER_SIZE                                   = 12;
_SdlPacket._HEADER_SIZE_V1                                = 8;

_SdlPacket._ENCRYPTION_MASK                               = 0x08;

/**
 * Service Type
 */
_SdlPacket.SERVICE_TYPE_CONTROL                          = 0x00;
// RESERVED 0x01 - 0x06
_SdlPacket.SERVICE_TYPE_RPC                              = 0x07;
// RESERVED 0x08 - 0x09
_SdlPacket.SERVICE_TYPE_PCM                              = 0x0A;
_SdlPacket.SERVICE_TYPE_VIDEO                            = 0x0B;
// RESERVED 0x0C - 0x0E
_SdlPacket.SERVICE_TYPE_BULK_DATA                        = 0x0F;
// RESERVED 0x10 - 0xFF

/**
 * Frame Info
 */
_SdlPacket.FRAME_INFO_HEART_BEAT                         = 0x00;
_SdlPacket.FRAME_INFO_START_SERVICE                      = 0x01;
_SdlPacket.FRAME_INFO_START_SERVICE_ACK                  = 0x02;
_SdlPacket.FRAME_INFO_START_SERVICE_NAK                  = 0x03;
_SdlPacket.FRAME_INFO_END_SERVICE                        = 0x04;
_SdlPacket.FRAME_INFO_END_SERVICE_ACK                    = 0x05;
_SdlPacket.FRAME_INFO_END_SERVICE_NAK                    = 0x06;
_SdlPacket.FRAME_INFO_REGISTER_SECONDARY_TRANSPORT       = 0x07;
_SdlPacket.FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_ACK   = 0x08;
_SdlPacket.FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_NAK   = 0x09;
// 0x0A-0xFC are reserved
_SdlPacket.FRAME_INFO_TRANSPORT_EVENT_UPDATE             = 0xFD;
_SdlPacket.FRAME_INFO_SERVICE_DATA_ACK                   = 0xFE;
_SdlPacket.FRAME_INFO_HEART_BEAT_ACK                     = 0xFF;
_SdlPacket.FRAME_INFO_FINAL_CONNESCUTIVE_FRAME           = 0x00;
_SdlPacket.FRAME_INFO_RESERVED                           = 0x00;

export { _SdlPacket };
