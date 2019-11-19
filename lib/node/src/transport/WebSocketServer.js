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

const SDL = require('../../../js/dist/SDL.js');
const WebSocket = require('ws');
const https = require('https');

class WebSocketServer extends SDL.transport.TransportBase {
    constructor (websocketServerConfig = null, transportListener = null) {
        super(websocketServerConfig, transportListener);
        this._ws = null;
    }

    /**
     * Starts the WebSocket server
     * @return {WebSocketServer}
     */
    start () {
        if (
            this._transportConfig.getSslConfig() instanceof SDL.transport.SslConfig
            && this._transportConfig.getSslConfig().getPemCertificate() !== null
            && this._transportConfig.getSslConfig().getPrivateKey() !== null
        ) {
            // create a WebSocket Secure Server
            const server = https.createServer({
                cert: this._transportConfig.getSslConfig().getPemCertificate(),
                key: this._transportConfig.getSslConfig().getPrivateKey(),
                passphrase: this._transportConfig.getSslConfig().getPassword()
            });
            this._ws = new WebSocket.Server({
                server
            });
            server.listen(this._transportConfig.getPort());
            console.log(`WSS started on port ${this._transportConfig.getPort()}`);
        } else {
            // create a WebSocket Server
            this._ws = new WebSocket.Server({
                port: this._transportConfig.getPort(),
            });
            console.log(`WS started on port ${this._transportConfig.getPort()}`);
        }

        // Event listener for incoming WebSocket connections
        this._ws.on('connection', (connection) => {
            console.log('connection established');
            connection.isAlive = true;
            if (this._transportListener !== null) {
                this._transportListener.onTransportConnected();
            }

            connection.on('message', (message) => {
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
                    } else if (this._sdlPsm.getState() === SDL.transport.SdlPsm.FINISHED_STATE) {
                        const packet = this._sdlPsm.getFormedPacket();
                        if (this._transportListener !== null && packet !== null) {
                            this._transportListener.onPacketReceived(packet);
                        }

                        this._sdlPsm.reset();
                    }
                }
            });

            // Event listener for a closed connection
            connection.on('close', () => {
                console.log('server received close event');
                if (this._transportListener !== null) {
                    this._transportListener.onTransportDisconnected();
                }
            });

            // Event listener for errors
            connection.on('error', (errorEvent) => {
                console.log('server received error event');
                if (this._transportListener !== null) {
                    this._transportListener.onError(errorEvent);
                }
            });

            // Pong heartbeat listener
            connection.on('pong', () => {
                console.log('server received pong event');
                connection.isAlive = true;
            });
        });

        // Detect broken connections
        if (this._transportConfig._connectionLostTimeout > 0) {
            setInterval(() => {
                this._ws.clients.forEach(function each (client) {
                    if (client.isAlive === false) {
                        console.log('server deemed client dead');
                        return client.terminate();
                    }

                    // Assume the client is dead and ask it if it's alive
                    client.isAlive = false;
                    console.log('server sending ping to client');
                    client.ping(function () {});
                });
            }, this._transportConfig._connectionLostTimeout);
        }

        return this;
    }

    /**
     * Stops the WebSocket server
     * @return {WebSocketServer}
     */
    stop () {
        if (this._ws !== null) {
            this._ws.close();
        }

        return this;
    }

    /**
     * Sends a packet to all connected WebSocket clients
     * FIXME: Sending packets should be isolated to a client rather than targeting all clients
     * @return {WebSocketServer}
     */
    sendPacket (sdlPacket) {
        if (this._ws !== null) {
            this._ws.clients.forEach(function each (client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(sdlPacket.toUint8Array());
                }
            });
        }

        return this;
    }
}

module.exports = WebSocketServer;
