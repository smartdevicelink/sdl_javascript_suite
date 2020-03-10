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

// NOTE: not using the import/export style syntax causes the net module to not be loaded
import { TransportBase } from './TransportBase.js';
import { SdlPsm } from './SdlPsm.js';
const net = require('net');

class TcpClient extends TransportBase {
    /**
     * Initializes an instance of TcpClient.
     * @constructor
     * @param {TransportConfig} config
     * @param {TransportListener} transportCallback
     */
    constructor (config, transportCallback) {
        super(config, transportCallback);
        this._queue = [];
        this._isRunning = false;
        this._host = config.getHost();
        this._port = config.getPort();
        this._tcp = null;
    }

    /**
     * @param {TransportCallback} callback
     */
    setTransportCallback (callback) {
        this._transportCallback = callback;
    }

    /**
     * Opens the transport connection
     */
    start () {
        this._init();
    }

    /**
     * Initiates a websocket connection to the url passed in and listens for messages
     * @private
     */
    _init () {
        this._tcp = new net.Socket();
        
        this._tcp.connect(this._port, this._host, () => {
            this._transportCallback.onConnectionEstablished();
        });
        
        this._tcp.on('error', () => {
            console.error('Failed to connect');
            this._transportCallback.onError();
        });
        
        this._tcp.on('data', (msg) => {
            this._handleIncoming(msg);
        });
        
        this._tcp.on('close', () => {
            this._transportCallback.onConnectionTerminated();
        });
    }

    /**
     * Closes the transport connection
     */
    stop () {
        this._tcp.destroy();
    }

    /**
     * The contents in the packet should be sent out through the transport
     * @param {SdlPacket} packet
     */
    sendPacket (packet) {
        const bytes = packet.toPacket();
        this._tcp.write(bytes);
    }

    /**
     * This is called whenever a new message comes in
     * @param {Buffer} msg
     * @private
     */
    _handleIncoming (msg) {
        this._queue.push(msg);
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
            const msgData = this._queue.shift();
            const uint8 = new Uint8Array(msgData);
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
        const success = this._sdlPsm.handleByte(byte);
        if (!success) {
            console.error('failed', this._sdlPsm);
            this._sdlPsm.reset();
        }
        const isFinished = this._sdlPsm.getState() === SdlPsm.FINISHED_STATE;

        if (isFinished) {
            const packet = this._sdlPsm.getFormedPacket();
            this._sdlPsm.reset();
            this._transportCallback.onPacketReceived(packet);
        }
    }
}

export { TcpClient };
