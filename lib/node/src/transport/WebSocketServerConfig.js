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

const { TransportConfigBase } = require('../../../js/src/transport/TransportConfigBase.js');
const { TransportType } = require('../../../js/src/transport/enums/TransportType.js');

class WebSocketServerConfig extends TransportConfigBase {
    /**
    * @constructor
    * @param {Number} port - The port to listen for WebSocket connections on.
    * @param {Number} connectionLostTimeout - The timeout for a connection lost, represented in milliseconds. Default 60000. If a value less than 0 is used, then the websocket will wait indefinitely.
    */
    constructor (port = 3000, connectionLostTimeout = 60000, sslConfig = null) {
        super(TransportType.WEBSOCKET_SERVER);
        this._port = port;
        this._connectionLostTimeout = connectionLostTimeout;
        this._sslConfig = sslConfig;
    }

    /**
    * Returns the websocket listener port
    * @return {Number}
    */
    getPort () {
        return this._port;
    }

    /**
    * Returns the websocket connection lost timeout value in milliseconds
    * @return {Number}
    */
    getConnectionLostTimeout () {
        return this._connectionLostTimeout;
    }

    /**
    * Returns the SSL configuration
    * @return {SslConfig}
    */
    getSslConfig () {
        return this._sslConfig;
    }
}

module.exports = {
    WebSocketServerConfig,
};