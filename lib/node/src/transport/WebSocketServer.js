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

const { _TransportBase } = require('./_TransportBase.js');
const { SdlPsm } = require('./SdlPsm.js');
const WebSocket = require('ws');

class WebSocketServer extends _TransportBase {
    constructor (transportConfig, transportCallback = null) {
        super(transportConfig, transportCallback);
        this._connectionLostInterval = null;
    }

    /**
     * Sets the transport callback function, which is triggered at a later time.
     * @param {TransportCallback} callback - A TransportCallback.
     * @returns {WebSocketServer} - Returns the class instance to allow method chaining.
     */
    setTransportCallback (callback) {
        this._transportCallback = callback;
        return this;
    }

    /**
     * Start listening for events from the client
     * @returns {WebSocketServer} - Returns the class instance to allow method chaining.
     */
    start () {
        const client = this._transportConfig.getClient();
        const connectionLostTimeout = this._transportConfig.getConnectionLostTimeout();

        // Event listener for an incoming message
        client.on('message', (message) => {
            this._handleMessage(message);
        });

        // Event listener for a closed connection
        client.on('close', () => {
            console.log('server received close event');
            this._stopConnectionLostInterval();
            if (this._transportCallback !== null) {
                this._transportCallback.onConnectionTerminated();
            }
        });

        // Event listener for errors
        client.on('error', (errorEvent) => {
            console.log('server received error event');
            if (this._transportCallback !== null) {
                this._transportCallback.onError();
            }
        });

        // Pong heartbeat listener
        client.on('pong', () => {
            console.log('server received pong event');
            client.isAlive = true;
        });

        // Trigger event for connection established
        if (this._transportCallback !== null) {
            this._transportCallback.onConnectionEstablished();
        }

        // Detect broken connections
        if (connectionLostTimeout > 0) {
            this._connectionLostInterval = setInterval(() => {
                if (client.isAlive === false) {
                    console.log('server deemed client dead');
                    return client.terminate();
                }

                // Assume the client is dead and ask it if it's alive
                client.isAlive = false;
                console.log('server sending ping to client');
                client.ping(function () {});
            }, connectionLostTimeout);
        }

        client.isAlive = true;

        return this;
    }

    /**
     * Stops the WebSocket Server from listening and closes existing connections
     * @returns {WebSocketServer} - Returns the class instance to allow method chaining.
     */
    stop () {
        const client = this._transportConfig.getClient();

        client.terminate();

        return this;
    }

    /**
     * Sends a packet to the connected WebSocket Server client
     * @param {_SdlPacket} sdlPacket - An _SdlPacket to send.
     * @returns {WebSocketServer} - Returns the class instance to allow method chaining.
     */
    sendPacket (sdlPacket) {
        const client = this._transportConfig.getClient();
        if (client.readyState === WebSocket.OPEN) {
            client.send(sdlPacket.toPacket());
        }

        return this;
    }

    /**
     * Stop the connection lost interval if one is defined
     * @returns {WebSocketServer} - Returns the class instance to allow method chaining.
     * @private
     */
    _stopConnectionLostInterval () {
        if (this._connectionLostInterval !== null) {
            clearInterval(this._connectionLostInterval);
        }

        return this;
    }

    /**
     * This is called whenever a new message comes in
     * @param {MessageEvent} message - A message to process.
     * @private
     */
    _handleMessage (message) {
        // Require messages to be binary objects
        if (typeof message !== 'object' || message.constructor.name !== 'Buffer') {
            return;
        }

        // Parse the message
        let stateProgress = false;
        for (let messageIndex = 0; messageIndex < message.length; messageIndex++) {
            stateProgress = this._sdlPsm.handleByte(message[messageIndex]);

            if (!stateProgress) { // We are trying to weed through the bad packet info until we get something
                this._sdlPsm.reset();
            } else if (this._sdlPsm.getState() === SdlPsm.FINISHED_STATE) {
                const packet = this._sdlPsm.getFormedPacket();
                if (this._transportCallback !== null && packet !== null) {
                    this._transportCallback.onPacketReceived(packet);
                }

                this._sdlPsm.reset();
            }
        }
    }
}

module.exports = {
    WebSocketServer,
};