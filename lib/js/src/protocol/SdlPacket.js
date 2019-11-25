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

import { FrameType } from './enums/FrameType.js';
import  { Bson } from './../util/Bson.js';

/**
 * @typedef {Object} SdlPacket
 * @property {number} EXTRA_PARCEL_DATA_LENGTH
 * @property {number} HEADER_SIZE
 * @property {number} HEADER_SIZE_V1
 * @property {number} ENCRYPTION_MASK
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
 * @property {function} constructPacket
 * @property {function} putTag
 * @property {function} getTag
 */

class SdlPacket {
    /**
    * @constructor
    * @param {Number} version - Protocol version to use
    * @param {Boolean} encryption - Whether or not the payload in this packet is encrypted
    * @param {FrameType} frameType - A number representing the packet frame type
    * @param {ServiceType} serviceType - The service that this packet is associated with
    * @param {Number} frameInfo - Specific frame info related to this packet
    * @param {Number} sessionID - ID this packet is associated with
    * @param {Number} dataSize - Size of the payload that will be added
    * @param {Number} messageID - ID of this specific packet
    * @param {Uint8Array} payload - Raw data that will be attached to the packet (RPC message, raw bytes, etc)
    * @param {Number} offset
    * @param {Number} bytesToWrite
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

        return this;

    }

    /**
    * @return {Number} - Protocol version used by this packet
    */
    getVersion () {
        return this._version;
    }

    /**
    * @return {Boolean} - Whether or not the payload in this packet is encrypted
    */
    getEncryption () {
        return this._encryption;
    }

    /**
    * @return {ServiceType} - The service that this packet is associated with
    */
    getServiceType () {
        return this._serviceType;
    }

    /**
    * @return {Number} - Specific frame info related to this packet
    */
    getFrameInfo () {
        return this._frameInfo;
    }

    /**
    * @return {Number} - ID this packet is associated with
    */
    getSessionID () {
        return this._sessionID;
    }

    /**
    * @return {Number} - ID of this specific packet
    */
    getMessageID () {
        return this._messageID;
    }

    /**
    * @return {Number} - Size of the payload that will be added
    */
    getDataSize () {
        return this._dataSize;
    }

    /**
    * @param {Uint8Array} payload
    * @return {SdlPacket}
    */
    setPayload (payload) {
        this._payload = payload;
        return this;
    }

    /**
    * @return {Uint8Array} - Raw data that will be attached to the packet (RPC message, raw bytes, etc)
    */
    getPayload () {
        return this._payload;
    }


    /**
     *
     * @param {Boolean} encryption
     * @return {Number} - Returns a number representing a byte mask depending on the boolean value
     */
    static getEncryptionBit (encryption) {
        return encryption ? SdlPacket.ENCRYPTION_MASK : 0;

    }

    /**
    * @return {FrameType} - A number representing the packet frame type
    */
    getFrameType () {
        if (FrameType.valueForString(this._frameType) !== null) {
            return this._frameType;
        } else {
            return FrameType.SINGLE;
        }
    }

    /**
    * @return {String} - String representation of the packet
    */
    toString () {
        let output = '***** Sdl Packet *****';
        output += `\nVersion: ${this._version}`;
        output += `\nEncryption: ${this._encryption}`;
        output += `\nFrameType: ${this._frameType}`;
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
	 * This method takes in the various components to the SDL packet structure and creates a new byte array that can be sent via the transport
     * @param {Number} version - Protocol version to use
     * @param {Boolean} encryption - Whether or not the payload in this packet is encrypted
     * @param {FrameType} frameType - A number representing the packet frame type
     * @param {ServiceType} serviceType - The service that this packet is associated with
     * @param {Number} controlFrameInfo - Specific frame info related to this packet
     * @param {Number} sessionID - ID this packet is associated with
     * @param {Number} dataSize - Size of the payload that will be added
     * @param {Number} messageID - ID of this specific packet
     * @param {Uint8Array} payload - Raw data that will be attached to the packet (RPC message, raw bytes, etc)
	 * @return {Uint8Array} - A byte[] representation of an SdlPacket built using the supplied params
	 */
    static constructPacket (version, encryption, frameType, serviceType, controlFrameInfo, sessionID, dataSize, messageID, payload) {
        let dataView = null;
        let dataViewIndex = 0;

        if (version > 1) {
            dataView = new Uint8Array(SdlPacket.HEADER_SIZE + dataSize);
        } else {
            dataView = new Uint8Array(SdlPacket.HEADER_SIZE_V1 + dataSize);
        }

        dataView[dataViewIndex++] = (version << 4) + SdlPacket.getEncryptionBit(encryption) + frameType;
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
	 * This method converts an SdlPacket instance to a new byte array that can be sent via the transport
	 * @return {Uint8Array} - A byte[] representation of an SdlPacket built using the supplied params
	 */
    toPacket () {
        if (this._bsonPayload) {
            this._payload = Bson.serialize(this._bsonPayload);
            this._dataSize = this._payload.length;
        }

        return SdlPacket.constructPacket(this._version, this._encryption, this._frameType, this._serviceType, this._frameInfo, this._sessionID, this._dataSize, this._messageID, this._payload);
    }

    /**
     * @param {String} tag - String key to add as a property to the BSON map
     * @param {Object} data - Object to add as a value to the BSON map
     */
    putTag (tag, data) {
        if (!this._bsonPayload) {
            this._bsonPayload = {};
        }
        this._bsonPayload[tag] = data;
    }

    /**
     * @param {String} tag - String key to add as a property to the BSON map
     * @return {Object} data - Object as a value found from the the BSON map
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

SdlPacket.EXTRA_PARCEL_DATA_LENGTH                      = 24;
SdlPacket.HEADER_SIZE                                   = 12;
SdlPacket.HEADER_SIZE_V1                                = 8;

SdlPacket.ENCRYPTION_MASK                               = 0x08;

/**
 * Service Type
 */
SdlPacket.SERVICE_TYPE_CONTROL                          = 0x00;
// RESERVED 0x01 - 0x06
SdlPacket.SERVICE_TYPE_RPC                              = 0x07;
// RESERVED 0x08 - 0x09
SdlPacket.SERVICE_TYPE_PCM                              = 0x0A;
SdlPacket.SERVICE_TYPE_VIDEO                            = 0x0B;
// RESERVED 0x0C - 0x0E
SdlPacket.SERVICE_TYPE_BULK_DATA                        = 0x0F;
// RESERVED 0x10 - 0xFF

/**
 * Frame Info
 */
SdlPacket.FRAME_INFO_HEART_BEAT                         = 0x00;
SdlPacket.FRAME_INFO_START_SERVICE                      = 0x01;
SdlPacket.FRAME_INFO_START_SERVICE_ACK                  = 0x02;
SdlPacket.FRAME_INFO_START_SERVICE_NAK                  = 0x03;
SdlPacket.FRAME_INFO_END_SERVICE                        = 0x04;
SdlPacket.FRAME_INFO_END_SERVICE_ACK                    = 0x05;
SdlPacket.FRAME_INFO_END_SERVICE_NAK                    = 0x06;
SdlPacket.FRAME_INFO_REGISTER_SECONDARY_TRANSPORT       = 0x07;
SdlPacket.FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_ACK   = 0x08;
SdlPacket.FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_NAK   = 0x09;
// 0x0A-0xFC are reserved
SdlPacket.FRAME_INFO_TRANSPORT_EVENT_UPDATE             = 0xFD;
SdlPacket.FRAME_INFO_SERVICE_DATA_ACK                   = 0xFE;
SdlPacket.FRAME_INFO_HEART_BEAT_ACK                     = 0xFF;
SdlPacket.FRAME_INFO_FINAL_CONNESCUTIVE_FRAME           = 0x00;
SdlPacket.FRAME_INFO_RESERVED                           = 0x00;

export { SdlPacket };
