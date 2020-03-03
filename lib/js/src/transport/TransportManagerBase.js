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

import { TransportType } from './enums/TransportType.js';
import { WebSocketClient } from './WebSocketClient.js';
import { TransportCallback } from './TransportCallback.js';

class TransportManagerBase {
    /**
     * Initializes an instance of TransportManagerBase.
     * @constructor
     * @param {BaseTransportConfig} baseTransportConfig
     * @param {TransportListener} transportListener
     */
    constructor (baseTransportConfig, transportListener) {
        this._transportConfig = baseTransportConfig;
        this._transportListener = transportListener;
        this._transport = null;
        this._isConnected = false;
        this._transportCallback = new TransportCallback();

        this._transportCallback.setOnConnectionEstablished(() => {
            this._isConnected = true;
            transportListener.onTransportConnected();
        });
        this._transportCallback.setOnConnectionTerminated(() => {
            this._isConnected = false;
        });
        this._transportCallback.setOnPacketReceived(this.onPacketReceived.bind(this));

        if (this._transportConfig.getTransportType() === TransportType.WEBSOCKET_CLIENT) {
            this._transport = new WebSocketClient(this._transportConfig, this._transportCallback);
        } else if (this._transportConfig.getTransportType() === TransportType.CUSTOM) {
            this._transport = this._transportConfig.getTransport();
            this._transport.setTransportCallback(this._transportCallback);
        }
    }

    onTransportConnected () {
        this._transportListener.onTransportConnected();
    }

    /**
     * @param {Function} func
     */
    onTransportDisconnected (func) {
        this._transportListener.onTransportDisconnected();
    }

    /**
     * @param {Function} func
     */
    onError (func) {
        this._transportListener.onError();
    }

    /**
     * @param {SdlPacket} sdlPacket
     */
    onPacketReceived (sdlPacket) {
        this._transportListener.onPacketReceived(sdlPacket);
    }

    /**
     * Opens the transport connection
     */
    start () {
        if (this._transport !== null && typeof this._transport.start === 'function') {
            this._transport.start();
        }
    }

    /**
     * Closes the transport connection
     */
    stop () {
        if (this._transport !== null && typeof this._transport.stop === 'function') {
            this._transport.stop();
        }
    }

    /**
     * The contents in the packet should be sent out through the transport
     * @param {SdlPacket} packet
     */
    sendPacket (packet) {
        if (this._transport !== null && typeof this._transport.sendPacket === 'function') {
            this._transport.sendPacket(packet);
        }
    }

    /**
     * @param {TransportType} transportType
     * @param {String} address
     */
    isConnected (transportType, address) {
        return this._isConnected;
    }
}

export { TransportManagerBase };