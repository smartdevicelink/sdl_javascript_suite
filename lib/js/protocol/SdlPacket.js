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

//TODO add more properties

/**
 * @typedef {Object} SdlPacket
 * @property {number} FRAME_INFO_START_SERVICE_ACK
 * @property {number} FRAME_INFO_START_SERVICE_NAK
 * @property {number} FRAME_INFO_END_SERVICE_ACK
 * @property {number} FRAME_INFO_END_SERVICE_NAK

 * @property {function} getFrameType
 * @property {function} getServiceType
 */

class SdlPacket {

    /**
    * Frame Info
    */
    constructor(version = 1, encryption = false, frameType = -1, serviceType = -1, frameInfo = -1, sessionID = 0, dataSize = 0, messageID = 0, payload = null, offset = 0, bytesToWrite = 0) {
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
            this._payload = new Uint8Array(bytesToWrite);
            this._payload = this._payload.slice(offset, bytesToWrite);
        }

        return this;

    }

    getVersion() {
        return this._version;
    }

    getEncryption() {
        return this._encryption;
    }

    getServiceType() {
        return this._serviceType;
    }

    getFrameInfo() {
        return this._frameInfo;
    }

    getSessionID() {
        return this._sessionID;
    }

    getMessageID() {
        return this._messageID;
    }

    getDataSize() {
        return this._dataSize;
    }

    setPayload(payload) {
        this._payload = payload;
    }
    getPayload() {
        return this._payload;
    }

    getEncryptionBit() {
        return this._encryption ? ENCRYPTION_MASK : 0;
    }

    getFrameType() {
        if (FrameType.valueForString(this._frameType) !== null) {
            return this._frameType;
        } else {
            return FrameType.SINGLE;
        }
    }

    toUint8Array() {
        return constructPacket(this._version, this._encryption, this._frameType, this._serviceType, this._frameInfo, this._sessionID, this._dataSize, this._messageID, this._payload);
    }

    toString() {
        let output = "***** Sdl Packet *****";
        output += `\nVersion: ${this._version}`;
        output += `\nEncryption: ${this._encryption}`;
        output += `\nFrameType: ${this._frameType}`;
        output += `\nServiceType: ${this._serviceType}`;
        output += `\nFrameInfo: ${this._frameInfo}`;
        output += `\nSessionID: ${this._sessionID}`;
        output += `\nDataSize: ${this._dataSize}`;

        if(this._version > 1){
            output += `\nMessageID: ${this._messageID}`;
        }

        output += "\n***** Sdl Packet End *****";

        return output;
    }

    /**
	 * This method takes in the various components to the SDL packet structure and creates a new byte array that can be sent via the transport
	 * @param version protocol version to use
	 * @param encryption whether or not this packet is encrypted
	 * @param frameType the packet frame type
	 * @param serviceType the service that this packet is associated with
	 * @param controlFrameInfo specific frame info related to this packet
	 * @param sessionID ID this packet is associated with
	 * @param dataSize size of the payload that will be added
	 * @param messageID ID of this specific packet
	 * @param payload raw data that will be attached to the packet (RPC message, raw bytes, etc)
	 * @return a byte[] representation of an SdlPacket built using the supplied params
	 */
    static constructPacket(version, encryption, frameType, serviceType, controlFrameInfo, sessionID, dataSize, messageID, payload) {
        let dataView = null;
        let dataViewIndex = 0;

        switch (version) {
            case 1:
                dataView = new Uint8Array(HEADER_SIZE_V1 + dataSize);
                break;
            default:
                dataView = new Uint8Array(HEADER_SIZE + dataSize);
        }

        dataView[dataViewIndex++] = version<<4 + getEncryptionBit(encryption) + frameType;
        dataView[dataViewIndex++] = serviceType;
        dataView[dataViewIndex++] = controlFrameInfo;
        dataView[dataViewIndex++] = sessionID;
        dataView[dataViewIndex++] = dataSize&0xFF000000 >> 24;
        dataView[dataViewIndex++] = dataSize&0x00FF0000 >> 16;
        dataView[dataViewIndex++] = dataSize&0x0000FF00 >> 8;
        dataView[dataViewIndex++] = dataSize&0x000000FF;

        if (version > 1) {
            dataView[dataViewIndex++] = messageID&0xFF000000 >> 24;
            dataView[dataViewIndex++] = messageID&0x00FF0000 >> 16;
            dataView[dataViewIndex++] = messageID&0x0000FF00 >> 8;
            dataView[dataViewIndex++] = messageID&0x000000FF;
        }

        if (payload !== null && payload.length > 0) {
            dataView.set(payload, dataViewIndex++);
        }

        return dataView;
    }

    putTag(tag, data) {
        // TODO bson
    }

    getTag(tag) {
        // TODO bson
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
//RESERVED 0x01 - 0x06
SdlPacket.SERVICE_TYPE_RPC                              = 0x07;
//RESERVED 0x08 - 0x09
SdlPacket.SERVICE_TYPE_PCM                              = 0x0A;
SdlPacket.SERVICE_TYPE_VIDEO                            = 0x0B;
//RESERVED 0x0C - 0x0E
SdlPacket.SERVICE_TYPE_BULK_DATA                        = 0x0F;
//RESERVED 0x10 - 0xFF

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
//0x0A-0xFC are reserved
SdlPacket.FRAME_INFO_TRANSPORT_EVENT_UPDATE             = 0xFD;
SdlPacket.FRAME_INFO_SERVICE_DATA_ACK                   = 0xFE;
SdlPacket.FRAME_INFO_HEART_BEAT_ACK                     = 0xFF;
SdlPacket.FRAME_INFO_FINAL_CONNESCUTIVE_FRAME           = 0x00;
SdlPacket.FRAME_INFO_RESERVED                           = 0x00;

export { SdlPacket };
