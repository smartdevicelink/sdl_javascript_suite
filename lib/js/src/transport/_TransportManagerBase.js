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

import { TransportType } from './enums/TransportType.js';
import { _WebSocketClient } from './_WebSocketClient.js';
import { _TransportCallback } from './_TransportCallback.js';

class _TransportManagerBase {
    /**
     * Initializes an instance of _TransportManagerBase.
     * @class
     * @private
     * @param {_TransportConfigBase} baseTransportConfig - A TransportConfig instance.
     * @param {_TransportListener} transportListener - A _TransportListener instance.
     */
    constructor (baseTransportConfig, transportListener) {
        this._transportConfig = baseTransportConfig;
        this._transportListener = transportListener;
        this._transport = null;
        this._isConnected = false;
        this._transportCallback = new _TransportCallback();

        this._transportCallback.setOnConnectionEstablished(() => {
            this._isConnected = true;
            transportListener.onTransportConnected();
        });
        this._transportCallback.setOnConnectionTerminated(() => {
            this._isConnected = false;
        });
        this._transportCallback.setOnPacketReceived(this.onPacketReceived.bind(this));

        if (this._transportConfig.getTransportType() === TransportType.WEBSOCKET_CLIENT) {
            this._transport = new _WebSocketClient(this._transportConfig, this._transportCallback);
        } else if (this._transportConfig.getTransportType() === TransportType.CUSTOM) {
            this._transport = this._transportConfig.getTransport();
            this._transport.setTransportCallback(this._transportCallback);
        }
    }

    /**
     * Invokes the listener's onTransportConnected callback.
     * @protected
     */
    onTransportConnected () {
        this._transportListener.onTransportConnected();
    }

    /**
     * Invokes the listener's onTransportDisconnected callback.
     * @protected
     */
    onTransportDisconnected () {
        this._transportListener.onTransportDisconnected();
    }

    /**
     * Invokes the listener's onError callback.
     * @protected
     */
    onError () {
        this._transportListener.onError();
    }

    /**
     * Invokes the listener's onPacketReceived callback.
     * @protected
     * @param {_SdlPacket} sdlPacket - An _SdlPacket.
     */
    onPacketReceived (sdlPacket) {
        this._transportListener.onPacketReceived(sdlPacket);
    }

    /**
     * Opens the transport connection
     * @protected
     */
    start () {
        if (this._transport !== null && typeof this._transport.start === 'function') {
            this._transport.start();
        }
    }

    /**
     * Closes the transport connection
     * @protected
     */
    stop () {
        if (this._transport !== null && typeof this._transport.stop === 'function') {
            this._transport.stop();
        }
    }

    /**
     * The contents in the packet should be sent out through the transport
     * @protected
     * @param {_SdlPacket} packet - An _SdlPacket to send.
     */
    sendPacket (packet) {
        if (this._transport !== null && typeof this._transport.sendPacket === 'function') {
            this._transport.sendPacket(packet);
        }
    }

    /**
     * Determine whether or not the transport is connected.
     * @protected
     * @returns {Boolean} - Whether or not the transport is connected.
     */
    isConnected () {
        return this._isConnected;
    }
}

export { _TransportManagerBase };
