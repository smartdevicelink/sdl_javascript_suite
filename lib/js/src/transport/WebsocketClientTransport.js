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

class WebsocketClientTransport extends TransportBase {
    constructor (config, transportListener) {
        super(config, transportListener);
        this._queue = [];
        this._isRunning = false;
        this._wsUrl = `${config.getHost()}:${config.getPort()}`;
        this._ws = null;
        this._callback = null;
    }

    /**
     * @param {TransportCallback} callback
     */
    setCallback (callback) {
        this._callback = callback;
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
        const self = this;
        this._ws  = new WebSocket(this._wsUrl);

        this._ws.onopen = function () {
            self._callback.onConnectionEstablished();
        };

        this._ws.onerror = function (error) {
            console.error('Failed to connect', error);
            self._callback.onError();
        };

        this._ws.onmessage = function (msg) {
            self._handleIncoming(msg);
        };

        this._ws.onclose = function (msg) {
            self._handleIncoming(msg);
            self._callback.onConnectionTerminated();
        };
    }

    /**
     * Closes the transport connection
     */
    stop () {
        this._ws.close();
    }

    /**
     * The contents in the packet should be sent out through the transport
     * @param {SdlPacket} packet 
     */
    sendPacket (packet) {
        const bytes = packet.toPacket();
        this._ws.send(bytes);
    }

    /**
     * This is called whenever a new message comes in
     * @param {MessageEvent} msg 
     * @private
     */
    _handleIncoming (msg) {
        const self = this;

        self._queue.push(msg.data);

        new Response(msg.data).arrayBuffer().then((arrayBuffer) => {
            const uint8 = new Uint8Array(arrayBuffer);
        }); 

        self._multiByteHandler();
    }

    /**
     * Processes received data from the internal queue
     * @private
     */
    _multiByteHandler () {
        const self = this;
        if (this._isRunning) 
            return;
        this._isRunning = true;

        while (this._queue.length > 0) {
            const msgData = this._queue.shift();
            new Response(msgData).arrayBuffer().then((arrayBuffer) => {
                const uint8 = new Uint8Array(arrayBuffer);
                for (const byte of uint8) {
                    self._handleByte(byte);
                }
            });  
        }

        this._isRunning = false;
    }

    /**
     * Feeds a byte through the internal PSM
     * @param {Number} byte - unsigned 8-bit integer
     * @private
     */
    _handleByte (byte) {
        const self = this;
        const sdlPsm = self._sdlPsm;

        const success = sdlPsm.handleByte(byte);
        if (!success) {
            console.error('failed', sdlPsm);
            sdlPsm.reset();
        }
        const isFinished = sdlPsm.getState() === SdlPsm.FINISHED_STATE;

        if (isFinished) {
            const packet = sdlPsm.getFormedPacket();
            sdlPsm.reset();
            self._callback.onPacketReceived(packet);
        }
    }
}


export { WebsocketClientTransport };