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

import { _FrameType } from '../protocol/enums/_FrameType.js';
import { _SdlPacket } from '../protocol/_SdlPacket.js';
import { _SdlProtocolBase } from '../protocol/_SdlProtocolBase.js';

/**
 * Parses incoming bytes according to the protocol spec.
 */
class _SdlPsm {
    /**
     * Initializes an instance of _SdlPsm.
     * @class
     * @private
     */
    constructor () {
        this.reset();
    }

    /**
     * Changes all internal members to default
     * @protected
     */
    reset () {
        this._state = _SdlPsm.START_STATE;
        this._version = 0;
        this._encryption = false;
        this._frameType = _FrameType.SINGLE;
        this._serviceType = 0;
        this._controlFrameInfo = null;
        this._sessionID = null;
        this._dumpSize = null;
        this._dataLength = 0;
        this._messageID = 0;
        this._payload = null;
    }



    /**
     * Get the state of the _SdlPsm.
     * @protected 
     * @returns {Number} - State represented by a Number
     */
    getState () {
        return this._state;
    }

    /**
     * Get the formed _SdlPacket.
     * @protected
     * @returns {null|_SdlPacket} - Returns an _SdlPacket, or null if not complete.
     */
    getFormedPacket () {
        if (this._state === _SdlPsm.FINISHED_STATE) {
            return new _SdlPacket(this._version, this._encryption, this._frameType, this._serviceType, this._controlFrameInfo, this._sessionID, this._dataLength, this._messageID, this._payload, 0, this._dataLength);
        } else {
            return null;
        }
    }

    /**
     * Handles the next byte in the stream of data.
     * @protected
     * @param {Number} data - Represents a byte
     * @returns {Boolean} - True if successful, false otherwise
     */
    handleByte (data) {
        this._state = this._transitionOnInput(data, this._state);
        if (this._state === _SdlPsm.ERROR_STATE) {
            return false;
        }
        return true;
    }

    /**
     * Transition to a different state based on the byte and the current state.
     * @param {Number} rawByte - A byte.
     * @param {Number} state - The state as a numeric value.
     * @returns {Number} - The new state.
     * @private
     */
    _transitionOnInput (rawByte, state) {
        if (state === _SdlPsm.START_STATE) { // byte 1
            this._version = (rawByte & _SdlPsm.VERSION_MASK) >> 4;
            if (this._version === 0) {
                return _SdlPsm.ERROR_STATE;
            }

            this._encryption = (1 === ((rawByte & _SdlPsm.ENCRYPTION_MASK) >> 3));
            this._frameType = rawByte & _SdlPsm.FRAME_TYPE_MASK;

            if ((this._version < 1 || this._version > 5) && this._frameType !== _FrameType.CONTROL) {
                return _SdlPsm.ERROR_STATE;
            }

            if (this._frameType < _FrameType.CONTROL || this._frameType > _FrameType.CONSECUTIVE) {
                return _SdlPsm.ERROR_STATE;
            }
            return _SdlPsm.SERVICE_TYPE_STATE;
        } else if (state === _SdlPsm.SERVICE_TYPE_STATE) { // byte 2
            this._serviceType = (rawByte & 0xFF);

            return _SdlPsm.CONTROL_FRAME_INFO_STATE;
        } else if (state === _SdlPsm.CONTROL_FRAME_INFO_STATE) { // byte 3
            this._controlFrameInfo = rawByte & 0xFF;

            switch (this._frameType) {
                case _FrameType.CONTROL:
                    break;
                case _FrameType.SINGLE: // Fall through since they are both the same
                case _FrameType.FIRST:
                    if (this._controlFrameInfo !== 0x00) {
                        return _SdlPsm.ERROR_STATE;
                    }
                    break;
                case _FrameType.CONSECUTIVE:
                    break;

                default:
                    return _SdlPsm.ERROR_STATE;
            }
            return _SdlPsm.SESSION_ID_STATE;
        } else if (state === _SdlPsm.SESSION_ID_STATE) { // byte 4
            this._sessionID = (rawByte & 0xFF);
            return _SdlPsm.DATA_SIZE_1_STATE;
        } else if (state === _SdlPsm.DATA_SIZE_1_STATE) { // byte 5
            this._dataLength += (rawByte & 0xFF) << 24;
            return _SdlPsm.DATA_SIZE_2_STATE;
        } else if (state === _SdlPsm.DATA_SIZE_2_STATE) { // byte 6
            this._dataLength += (rawByte & 0xFF) << 16; // # 2 bytes x 8 bits
            return _SdlPsm.DATA_SIZE_3_STATE;
        } else if (state === _SdlPsm.DATA_SIZE_3_STATE) { // byte 7
            this._dataLength += (rawByte & 0xFF) << 8; // #  1 byte x 8 bits
            return _SdlPsm.DATA_SIZE_4_STATE;
        } else if (state === _SdlPsm.DATA_SIZE_4_STATE) { // byte 8
            this._dataLength += (rawByte & 0xFF); // # 2 bytes x 8 bits

            switch (this._frameType) { // If all is correct we should break out of this switch statement
                case _FrameType.SINGLE:
                case _FrameType.CONSECUTIVE:
                    break;
                case _FrameType.CONTROL:
                // Ok, well here's some interesting bit of knowledge. Because the start session request is from the phone with no knowledge of version it sends out
                // a v1 packet. THEREFORE there is no message id field. **** Now you know and knowing is half the battle ****
                    if (this._version === 1 && this._controlFrameInfo === _SdlPacket.FRAME_INFO_START_SERVICE) {
                        if (this._dataLength === 0) {
                            return _SdlPsm.FINISHED_STATE; // We are done if we don't have any payload
                        }
                        if (this._dataLength <= _SdlProtocolBase.V1_V2_MTU_SIZE - _SdlProtocolBase.V1_HEADER_SIZE) {
                            this._payload = new Uint8Array(this._dataLength);
                        } else {
                            return _SdlPsm.ERROR_STATE;
                        }
                        this._dumpSize = this._dataLength;
                        return _SdlPsm.DATA_PUMP_STATE;
                    }
                    break;

                case _FrameType.FIRST:
                    if (this._dataLength !== _SdlPsm.FIRST_FRAME_DATA_SIZE) {
                        return _SdlPsm.ERROR_STATE;
                    }
                    break;
                default:
                    return _SdlPsm.ERROR_STATE;
            }

            if (this._version === 1) { // Version 1 packets will not have message id's
                if (this._dataLength === 0) {
                    return _SdlPsm.FINISHED_STATE; // We are done if we don't have any payload
                }
                if (this._dataLength <= _SdlProtocolBase.V1_V2_MTU_SIZE - _SdlProtocolBase.V1_HEADER_SIZE) {
                    this._payload = new Uint8Array(this._dataLength);
                } else {
                    return _SdlPsm.ERROR_STATE;
                }
                this._dumpSize = this._dataLength;
                return _SdlPsm.DATA_PUMP_STATE;
            } else {
                return _SdlPsm.MESSAGE_1_STATE;
            }
        } else if (state === _SdlPsm.MESSAGE_1_STATE) { // byte 9, bytes 9-12 available in version 2+.
            this._messageID += (rawByte & 0xFF) << 24;
            return _SdlPsm.MESSAGE_2_STATE;
        } else if (state === _SdlPsm.MESSAGE_2_STATE) { // byte 10
            this._messageID += (rawByte & 0xFF) << 16;
            return _SdlPsm.MESSAGE_3_STATE;
        } else if (state === _SdlPsm.MESSAGE_3_STATE) { // byte 11
            this._messageID += (rawByte & 0xFF) << 8;
            return _SdlPsm.MESSAGE_4_STATE;
        } else if (state === _SdlPsm.MESSAGE_4_STATE) { // byte 12
            this._messageID += (rawByte & 0xFF);
            if (this._dataLength === 0) {
                return _SdlPsm.FINISHED_STATE;
            }
            this._dumpSize = this._dataLength;
            this._payload = new Uint8Array(this._dataLength);
            return _SdlPsm.DATA_PUMP_STATE;
        } else if (state === _SdlPsm.DATA_PUMP_STATE) { // byte 13
            this._payload[this._dataLength - this._dumpSize] = rawByte;
            this._dumpSize -= 1;
            // Do we have any more bytes to read in?
            if (this._dumpSize > 0) {
                return _SdlPsm.DATA_PUMP_STATE;
            } else if (this._dumpSize === 0) {
                return _SdlPsm.FINISHED_STATE;
            } else {
                return _SdlPsm.ERROR_STATE;
            }
        }
    }
}

_SdlPsm.START_STATE                              = 0x0;
_SdlPsm.SERVICE_TYPE_STATE                       = 0x02;
_SdlPsm.CONTROL_FRAME_INFO_STATE                 = 0x03;
_SdlPsm.SESSION_ID_STATE                         = 0x04;
_SdlPsm.DATA_SIZE_1_STATE                        = 0x05;
_SdlPsm.DATA_SIZE_2_STATE                        = 0x06;
_SdlPsm.DATA_SIZE_3_STATE                        = 0x07;
_SdlPsm.DATA_SIZE_4_STATE                        = 0x08;
_SdlPsm.MESSAGE_1_STATE                          = 0x09;
_SdlPsm.MESSAGE_2_STATE                          = 0x0A;
_SdlPsm.MESSAGE_3_STATE                          = 0x0B;
_SdlPsm.MESSAGE_4_STATE                          = 0x0C;
_SdlPsm.DATA_PUMP_STATE                          = 0x0D;
_SdlPsm.FINISHED_STATE                           = 0xFF;
_SdlPsm.ERROR_STATE                              = -1;

_SdlPsm.FIRST_FRAME_DATA_SIZE                    = 0x08;
_SdlPsm.VERSION_MASK                             = 0xF0; // 4 highest bits
_SdlPsm.ENCRYPTION_MASK                          = 0x08; // 4th lowest bit
_SdlPsm.FRAME_TYPE_MASK                          = 0x07; // 3 lowest bits

export { _SdlPsm };
