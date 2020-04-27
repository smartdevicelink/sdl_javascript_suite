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
import { _SdlPacket } from './_SdlPacket.js';

/**
 * Assembles sdl packets which may come in seperate chunks if the data exceeds the max transport unit allowed by sdl core.
 */
class _MessageFrameAssembler {
    /**
     * Initializes an instance of _MessageFrameAssembler.
     * @class
     * @private
     * @param {function} callback - A function to be invoked in the context of function(error, _SdlPacket)
     */
    constructor (callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback not of expected type (function) for _MessageFrameAssembler');
        }

        this._callback = callback;

        this._accumulator = [];
        this._totalConsecutiveFrames = 0;
        this._consecutiveFramesHandledCount = 0;
        this._consecutiveFramesDataLength = 0;
    }

    /**
     * Accepts a single frame or multiframe packet. The callback is used when the packet is completely read.
     * @param {_SdlPacket} sdlPacket - Incoming sdl packet to be read.
     */
    handleFrame (sdlPacket) {
        const frameType = sdlPacket.getFrameType();
        // If the sdl packet is a single frame nothing needs to be assembled and this can be returned immediately.
        if (frameType !== _FrameType.FIRST && frameType !== _FrameType.CONSECUTIVE) {
            this._callback(null, sdlPacket);
        } else {
            this._handleMultiFrameMessage(sdlPacket);
        }
    }

    /**
     * Handles the first data frame. Sets the expected frame count and data length.
     * @private
     * @param {_SdlPacket} sdlPacket - Incoming sdl packet to be read.
     */
    _handleFirstDataFrame (sdlPacket) {
        /** @type {array} Array of uint8 */
        const payload = sdlPacket.getPayload();

        if (payload instanceof Uint8Array !== true || payload.length !== 8) {
            throw new Error('Error handling first frame. Payload is an invalid length should be length 8.');
        }
        for (const byte in payload) {
            if (byte < 0x00 || byte > 0xFF) {
                throw new Error('Invalid payload. Must be an array of uint8 bytes.');
            }
        }

        // first 4 8-bit integers contain the data length.
        let dataLength = (payload[0] & 0x0F) << 24; // 8-bit x 3
        dataLength += (payload[1] & 0xFF) << 16; // 8 x 2
        dataLength += (payload[2] & 0xFF) << 8; // 8 x 1
        dataLength += payload[3] & 0xFF; // 8 x 0

        let frameCount = (payload[4] & 0xFF) << 24;
        frameCount += (payload[5] & 0xFF) << 16;
        frameCount += (payload[6] & 0xFF) << 8;
        frameCount += payload[7] & 0xFF;

        this._totalConsecutiveFrames = frameCount;
        this._consecutiveFramesDataLength = dataLength;
    }

    /**
     * First frame should be read in before this is called. Once the last frame is read, callback is invoked.
     * @param {_SdlPacket} sdlPacket - Incoming sdl packet to be read.
     */
    _handleConsecutiveFrame (sdlPacket) {
        this._consecutiveFramesHandledCount++;

        const frameType = sdlPacket.getFrameType();
        /**
         * frameSequence nth frame, or 0 for last frame,
         * 8 bits are used to store this info so the count reverts to 1 after 255
         * This doesn't affect reading the packet but it is notable if frame sequence is relied on.
         */
        const frameSequence = sdlPacket.getFrameInfo();

        const payload = sdlPacket.getPayload();

        for (const byte of payload) {
            this._accumulator.push(byte);
        }

        // This is the last frame, finish things up and use callback.
        if (frameSequence === 0) {
            if (this._consecutiveFramesHandledCount !== this._totalConsecutiveFrames) {
                console.warn(`Total frames expected ${this._totalConsecutiveFrames} does not match total frames received ${this._consecutiveFramesHandledCount}`);
            }

            if (this._consecutiveFramesDataLength !== this._accumulator.length) {
                console.warn(`Total data expected ${this._consecutiveFramesDataLength} does not match total data received ${this._accumulator.length}`);
            }

            const finishedSdlPacket = new _SdlPacket(
                sdlPacket.getVersion(),
                sdlPacket.getEncryption(),
                frameType,
                sdlPacket.getServiceType(),
                frameSequence,
                sdlPacket.getSessionID(),
                this._accumulator.length,
                sdlPacket.getMessageID(),
                this._accumulator,
                0, // no offset
                this._accumulator.length // read the entire buffer
            );

            this._callback(null, finishedSdlPacket);
        }
    }

    /**
     * Handle the sdl packet based on its frame type, FIRST or CONSECUTIVE.
     * @param {_SdlPacket} sdlPacket - Sdl packet to be read.
     */
    _handleMultiFrameMessage (sdlPacket) {
        const frameType = sdlPacket.getFrameType();
        if (frameType === _FrameType.FIRST) {
            this._handleFirstDataFrame(sdlPacket);
        } else { // _FrameType.Consecutive
            this._handleConsecutiveFrame(sdlPacket);
        }
    }
}



export { _MessageFrameAssembler };