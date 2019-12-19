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

import { TransportBase } from './TransportBase.js';
import { SdlPsm } from './SdlPsm.js';

class CustomTransport extends TransportBase {
    constructor (transportConfig, transportCallback = null) {
        super(transportConfig, transportCallback);
        this._queue = [];
        this._isRunning = false;
    }

    /**
     * @param {TransportCallback} callback
     */
    setTransportCallback (callback) {
        this._transportCallback = callback;
        return this;
    }

    /**
     * Triggers the transport callback for connection established
     */
    start () {
        if (this._transportCallback !== null) {
            this._transportCallback.onConnectionEstablished();
        }
    }

    /**
     * Triggers the transport callback for connection terminated
     */
    stop () {
        if (this._transportCallback !== null) {
            this._transportCallback.onConnectionTerminated('Transport told to stop');
        }
    }

    /**
     * Triggers the transport callback for an error
     */
    onError () {
        if (this._transportCallback !== null) {
            this._transportCallback.onError();
        }
    }

    /**
     * The contents in the packet should be sent out through the transport
     * @param {SdlPacket} packet
     */
    sendPacket (packet) {
        const bytes = packet.toPacket();
        this.onSendPacket(bytes, 0, bytes.length);
    }

    /**
     * The app instantiating this class needs to implement this method! sendPacket calls this method
     * @param {UInt8Array} bytes
     */
    onSendPacket (bytes) {
        throw new Error('onSendPacket method must be overridden');
    }

    /**
     * A byte buffer was passed here for processing
     * @param {Uint8Array} message
     */
    onByteBufferReceived (message) {
        this._queue.push(message);
        this._multiByteHandler();
    }

    /**
     * Processes received data from the internal queue
     * @private
     */
    _multiByteHandler () {
        if (this._isRunning) {
            return;
        }
        this._isRunning = true;

        while (this._queue.length > 0) {
            const uint8 = this._queue.shift();
            for (const byte of uint8) {
                this._handleByte(byte);
            }
        }

        this._isRunning = false;
    }

    /**
     * Feeds a byte through the internal PSM
     * @param {Number} byte - unsigned 8-bit integer
     * @private
     */
    _handleByte (byte) {
        const sdlPsm = this._sdlPsm;

        const success = sdlPsm.handleByte(byte);
        if (!success) {
            console.error('failed', sdlPsm);
            sdlPsm.reset();
        }
        const isFinished = sdlPsm.getState() === SdlPsm.FINISHED_STATE;

        if (isFinished) {
            const packet = sdlPsm.getFormedPacket();
            sdlPsm.reset();
            if (this._transportCallback !== null) {
                this._transportCallback.onPacketReceived(packet);
            }
        }
    }
}


export { CustomTransport };