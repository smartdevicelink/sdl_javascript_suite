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

import { TransportBase } from '../../js/transport/TransportBase.js';
import { TransportListener } from '../../js/transport/TransportListener.js';
const WebsocketServerConfig = require('./WebsocketServerConfig.js');
import { SdlPsm } from '../../js/transport/SdlPsm.js';
import { SdlPacket } from '../../js/protocol/SdlPacket.js';

// https://www.npmjs.com/package/ws
const WebSocket = require('ws');

class WebsocketServer extends TransportBase {
    constructor(websocketServerConfig = null, transportListener = null) {
        super(websocketServerConfig, transportListener);
        this._port = websocketServerConfig.getPort();

    }

    start() {
        const wss = new WebSocket.Server({ port: this._port });

        wss.on('connection', function onConnection(connection) {
            console.log('connection established');

            // TODO: limit allowed connections to one.
            connection.on('message', function onMessage(message) {
                console.log('received message of type: %s', typeof message);
                console.log('received: %s', message);
                console.log('is a')
                let stateProgress = false;
                for (let i = 0; i < message.length; i++) {
                    stateProgress = this._sdlPsm.handleByte(message[i]); //TODO make sure it can be accessed like this

                    if (!stateProgress) { // We are trying to weed through the bad packet info until we get something
                        this._sdlPsm.reset();
                    } else if (this._sdlPsm.getState() === SdlPsm.FINISHED_STATE) {
                        packet = this._sdlPsm.getFormedPacket();
                        if (this._transportListener != null && packet != null) {
                            this._transportListener.onPacketReceived(packet);
                        }

                        this._sdlPsm.reset();
                    }
                }
            });

            //Back to 'connection'
            if (this._transportListener != null ) {
                this._transportListener.onTransportConnected();
            }

            //TODO fill in disconnect, and error cases
        });
    }

    stop() {
        throw "stop method must be overridden";
    }

    sendPacket(sdlPacket) {
        throw "sendPacket method must be overridden";
    }
}

module.exports = WebsocketServer;
