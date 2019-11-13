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

import { FrameType } from '../protocol/enums/FrameType.js';
import { SdlPacket } from '../protocol/SdlPacket.js';
import { SdlProtocolBase } from '../protocol/SdlProtocolBase.js';


class SdlPsm {							//TODO check to see if it's better to use '==' or '==='
	
	/**
     * @constructor
     */
    constructor() {
        this.reset();
    }

    /**
     * Changes all internal members to default
     */
    reset() {
        this._state = SdlPsm.START_STATE;
        this._version = 0;
        this._encryption = false;
        this._frameType = FrameType.SINGLE;
        this._serviceType = 0;
        this._controlFrameInfo = null;
        this._sessionID = null;
        this._dumpSize = null;
        this._dataLength = 0;
        this._messageID = 0;
        this._payload = null;
	}

	/**
     * @return {Number} - State represented by a Number
     */
    getState() {
        return this._state;
    }

    /**
     * @return {SdlPacket} - Returns null if not complete
     */
    getFormedPacket() {
        if (this._state == SdlPsm.FINISHED_STATE) {
            return new SdlPacket(this._version, this._encryption, this._frameType, this._serviceType, this._controlFrameInfo, this._sessionID, this._dataLength, this._messageID, this._payload);
        } else {
            return null;
        }
    }

    /**
     * @param {Number} data - Represents a byte
     * @return {Boolean}
     */
    handleByte(data) {
        this._state = this._transitionOnInput(data, this._state);

        if (this._state == SdlPsm.ERROR_STATE) {
            return false;
        }

        return true;
	}

	/**
     * @param {Number} rawByte - Represents a byte
     * @param {Number} state
     * @return {Boolean}
     * @private
     */
    _transitionOnInput(rawByte, state) {
        switch (state) {
            case SdlPsm.START_STATE:

                this._version = (rawByte & SdlPsm.VERSION_MASK)>>4;

                if (this._version == 0) {
                    return SdlPsm.ERROR_STATE;
                }
                this._encryption = (1 == (rawByte & SdlPsm.ENCRYPTION_MASK)>>3);

                this._frameType = rawByte & SdlPsm.FRAME_TYPE_MASK;

                if ((this._version < 1 || this._version > 5)
                    && this._frameType != SdlPacket.FRAME_TYPE_CONTROL) {
                    return SdlPsm.ERROR_STATE;
                }

                if (this._frameType < SdlPacket.FRAME_TYPE_CONTROL || this._frameType > SdlPacket.FRAME_TYPE_CONSECUTIVE) {
                    return SdlPsm.ERROR_STATE;
                }

                return SdlPsm.SERVICE_TYPE_STATE;

            case SdlPsm.SERVICE_TYPE_STATE:

		this._serviceType = rawByte & 0xFF;
		return SdlPsm.CONTROL_FRAME_INFO_STATE;

            case SdlPsm.CONTROL_FRAME_INFO_STATE:
				
		this._controlFrameInfo = rawByte & 0xFF;
				switch(this._frameType){
					case SdlPacket.FRAME_TYPE_CONTROL:
						break;
					case SdlPacket.FRAME_TYPE_SINGLE:
					case SdlPacket.FRAME_TYPE_FIRST:
						if(this._controlFrameInfo != 0x00){
							return SdlPsm.ERROR_STATE;
						}
						break;
					case SdlPacket.FRAME_TYPE_CONSECUTIVE:
						//It might be a good idea to check packet sequence numbers here
						break;
					default:
						return SdlPsm.ERROR_STATE;		
				}

				return SdlPsm.SESSION_ID_STATE;

            case SdlPsm.SESSION_ID_STATE:
				
		this._sessionID = rawByte & 0xFF;
				return SdlPsm.DATA_SIZE_1_STATE;

            case SdlPsm.DATA_SIZE_1_STATE:
				
		this._dataLength += (rawByte & 0xFF) << 24; //Shift 3 bytes x 8 bits
				return SdlPsm.DATA_SIZE_2_STATE;

            case SdlPsm.DATA_SIZE_2_STATE:
				
		this._dataLength += (rawByte & 0xFF) << 16; //Sift 2 bytes x 8 bits
				return DATA_SIZE_3_STATE;

            case SdlPsm.DATA_SIZE_3_STATE:
				
		this._dataLength += (rawByte & 0xFF) << 8; //Sift 1 byte x 8 bits
				return DATA_SIZE_4_STATE;

            case SdlPsm.DATA_SIZE_4_STATE:
				
		this._dataLength += (rawByte & 0xFF)
				
				//We should have data length now for the pump state
		switch (this._frameType) { //If all is correct we should break out of this switch statement
					case SdlPacket.FRAME_TYPE_SINGLE:
					case SdlPacket.FRAME_TYPE_CONSECUTIVE:
						break;
					case SdlPacket.FRAME_TYPE_CONTROL:
						//Ok, well here's some interesting bit of knowledge. Because the start session request is from the phone with no knowledge of version it sends out
						//a v1 packet. THEREFORE there is no message id field. **** Now you know and knowing is half the battle ****
				if (this._version == 1 && this._controlFrameInfo == SdlPacket.FRAME_INFO_START_SERVICE) {
							
							if (this._dataLength == 0) {
								return SdlPsm.FINISHED_STATE; //We are done if we don't have any payload
							}
							
							if (this._dataLength <= SdlProtocolBase.V1_V2_MTU_SIZE - SdlProtocolBase.V1_HEADER_SIZE) { // sizes from protocol/SdlProtocol.js
								this._payload = new byte[this._dataLength];
							} else {
								return SdlPsm.ERROR_STATE;
							}

							this._dumpSize = this._dataLength;
							return SdlPsm.DATA_PUMP_STATE;
						}
						break; 
				
					case SdlPacket.FRAME_TYPE_FIRST:
						if (dataLength == SdlPsm.FIRST_FRAME_DATA_SIZE) {
							break;
					}
					default:
						return SdlPsm.ERROR_STATE;
				}

				if (this._version == 1) { //Version 1 packets will not have message id's
					if (this._dataLength == 0) {
						return SdlPsm.FINISHED_STATE; //We are done if we don't have any payload
					}
					if (this._dataLength <= SdlProtocolBase.V1_V2_MTU_SIZE - SdlProtocolBase.V1_HEADER_SIZE) { // sizes from protocol/SdlProtocol.java
						this._payload = new Uint8Array(this._dataLength);
					} else {
						return SdlPsm.ERROR_STATE;
					}
					this._dumpSize = this._dataLength;
					return SdlPsm.DATA_PUMP_STATE;
				} else {
					return SdlPsm.MESSAGE_1_STATE;
				}

            case SdlPsm.MESSAGE_1_STATE:
				
				this._messageID += (rawByte & 0xFF) << 24; // Shift 3 bytes x 8 bits
				return SdlPsm.MESSAGE_2_STATE;
				
            case SdlPsm.MESSAGE_2_STATE:
				
				this._messageID += (rawByte & 0xFF) << 16; // Shift 2 bytes x 8 bits
				return SdlPsm.MESSAGE_3_STATE;

            case SdlPsm.MESSAGE_3_STATE:
				
				this._messageID += (rawByte & 0xFF) << 8; // Shift 1 byte x 8 bits
				return SdlPsm.MESSAGE_4_STATE;

            case SdlPsm.MESSAGE_4_STATE:
				
				this._messageID += (rawByte & 0xFF);
				if (this._dataLength == 0) {
					return SdlPsm.FINISHED_STATE; //We are done if we don't have any payload
				}
				try {
					this._payload = new Uint8Array(this._dataLength);
				} catch (error) { //Possible Out of Memory error if data length is invalid
					return SdlPsm.ERROR_STATE;
				}
				dumpSize = dataLength;
				return SdlPsm.DATA_PUMP_STATE;

            case SdlPsm.DATA_PUMP_STATE:
				
				this._payload[this._dataLength - this._dumpSize] = rawByte;
				this._dumpSize--;
				//Do we have any more bytes to read in?
				if(this._dumpSize > 0){
					return SdlPsm.DATA_PUMP_STATE;
				} else if (this._dumpSize == 0) {
					return SdlPsm.FINISHED_STATE;
				} else {
					return SdlPsm.ERROR_STATE;
				}

            case SdlPsm.FINISHED_STATE:
            default:
				//Should not be handling any other bytes while in the finished state
                return SdlPsm.ERROR_STATE;
        }
    }    
}

SdlPsm.START_STATE                              = 0x0;
SdlPsm.SERVICE_TYPE_STATE                       = 0x02;
SdlPsm.CONTROL_FRAME_INFO_STATE                 = 0x03;
SdlPsm.SESSION_ID_STATE                         = 0x04;
SdlPsm.DATA_SIZE_1_STATE                        = 0x05;
SdlPsm.DATA_SIZE_2_STATE                        = 0x06;
SdlPsm.DATA_SIZE_3_STATE                        = 0x07;
SdlPsm.DATA_SIZE_4_STATE                        = 0x08;
SdlPsm.MESSAGE_1_STATE                          = 0x09;
SdlPsm.MESSAGE_2_STATE                          = 0x0A;
SdlPsm.MESSAGE_3_STATE                          = 0x0B;
SdlPsm.MESSAGE_4_STATE                          = 0x0C;
SdlPsm.DATA_PUMP_STATE                          = 0x0D;
SdlPsm.FINISHED_STATE                           = 0xFF;
SdlPsm.ERROR_STATE                              = -1;

SdlPsm.FIRST_FRAME_DATA_SIZE                    = 0x08;
SdlPsm.VERSION_MASK                             = 0xF0; //4 highest bits
SdlPsm.ENCRYPTION_MASK                          = 0x08; //4th lowest bit
SdlPsm.FRAME_TYPE_MASK                          = 0x07; //3 lowest bits

export { SdlPsm };
