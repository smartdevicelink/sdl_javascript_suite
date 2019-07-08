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

class SdlPacket {

    EXTRA_PARCEL_DATA_LENGTH                      = 24;
    HEADER_SIZE                                   = 12;
    HEADER_SIZE_V1                                = 8;
    ENCRYPTION_MASK                               = 0x08;

    /**
    * Frame Type
    */
    FRAME_TYPE_CONTROL                            = 0x00;
    FRAME_TYPE_SINGLE                             = 0x01;
    FRAME_TYPE_FIRST                              = 0x02;
    FRAME_TYPE_CONSECUTIVE                        = 0x03;

    /**
    * Service Type
    */
    SERVICE_TYPE_CONTROL                          = 0x00;
    //RESERVED 0x01 - 0x06
    SERVICE_TYPE_RPC                              = 0x07;
    //RESERVED 0x08 - 0x09
    SERVICE_TYPE_PCM                              = 0x0A;
    SERVICE_TYPE_VIDEO                            = 0x0B;
    //RESERVED 0x0C - 0x0E
    SERVICE_TYPE_BULK_DATA                        = 0x0F;
    //RESERVED 0x10 - 0xFF

    /**
    * Frame Info
    */
    FRAME_INFO_HEART_BEAT                         = 0x00;
    FRAME_INFO_START_SERVICE                      = 0x01;
    FRAME_INFO_START_SERVICE_ACK                  = 0x02;
    FRAME_INFO_START_SERVICE_NAK                  = 0x03;
    FRAME_INFO_END_SERVICE                        = 0x04;
    FRAME_INFO_END_SERVICE_ACK                    = 0x05;
    FRAME_INFO_END_SERVICE_NAK                    = 0x06;
    FRAME_INFO_REGISTER_SECONDARY_TRANSPORT       = 0x07;
    FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_ACK   = 0x08;
    FRAME_INFO_REGISTER_SECONDARY_TRANSPORT_NAK   = 0x09;
    //0x0A-0xFC are reserved
    FRAME_INFO_TRANSPORT_EVENT_UPDATE             = 0xFD;
    FRAME_INFO_SERVICE_DATA_ACK                   = 0xFE;
    FRAME_INFO_HEART_BEAT_ACK                     = 0xFF;
    FRAME_INFO_FINAL_CONNESCUTIVE_FRAME           = 0x00;
    FRAME_INFO_RESERVED                           = 0x00;

    constructor(version = 1, encryption = false, frameType = -1, serviceType = -1, frameInfo = -1, sessionId = 0, dataSize = 0, messageId = 0, payload = null, offset = 0, bytesToWrite = 0) {
        this._version = version;
        this._encryption = encryption;
        this._frameType = frameType;
        this._serviceType = serviceType;
        this._frameInfo = frameInfo;
        this._sessionId = sessionId;
        this._dataSize = dataSize;
        this._messageId = messageId;
        this._payload = payload;
        this._offset = offset;
        this._bytesToWrite = bytesToWrite;

        this._bsonPayload = undefined;

        // TODO

        if(payload){

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

    getSessionId() {
        return this._sessionId;
    }

    getMessageId() {
        return this._messageId;
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
        // TODO
        switch(this._frameType){

        }
    }

    toPacket() {
        // TODO
        return constructPacket(this._version, this._encryption, this._frameType, this._serviceType, this._frameInfo, this._sessionId, this._dataSize, this._messageId, this._payload);
    }

    toString() {
        let output = "***** Sdl Packet *****";
        output += `\nVersion: ${this._version}`;
        output += `\nEncryption: ${this._encryption}`;
        output += `\nFrameType: ${this._frameType}`;
        output += `\nServiceType: ${this._serviceType}`;
        output += `\nFrameInfo: ${this._frameInfo}`;
        output += `\nSessionId: ${this._sessionId}`;
        output += `\nDataSize: ${this._dataSize}`;

        if(this._version > 1){
            output += `\nMessageId: ${this._messageId}`;
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
	 * @param sessionId ID this packet is associated with
	 * @param dataSize size of the payload that will be added
	 * @param messageId ID of this specific packet
	 * @param payload raw data that will be attached to the packet (RPC message, raw bytes, etc)
	 * @return a byte[] representation of an SdlPacket built using the supplied params
	 */
    constructPacket(version, encryption, frameType, serviceType, controlFrameInfo, sessionId, dataSize, messageId, payload) {
        // TODO
    }

    putTag(tag, data) {
        // TODO
    }

    getTag(tag) {
        // TODO
    }

}

export { SdlPacket };