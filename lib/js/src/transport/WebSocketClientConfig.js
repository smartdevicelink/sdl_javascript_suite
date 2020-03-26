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
import { TransportConfigBase } from './TransportConfigBase.js';


/**
 * @typedef {Object} WebSocketClientConfig
 * @property {String} _host
 * @property {Number} _port
 */
class WebSocketClientConfig extends TransportConfigBase {
    /**
     * Initializes an instance of WebSocketClientConfig.
     * @constructor
     * @param {String} host
     * @param {String} port
     */
    constructor (host, port) {
        super(TransportType.WEBSOCKET_CLIENT);

        // try to get host and port from querystring params
        const webengineParams = this._getWebengineQueryParams();

        this._host = webengineParams.host || host;
        this._port = webengineParams.port || port;
    }

    /**
     * @return {String}
     */
    getHost () {
        return this._host;
    }

    /**
     * @return {Number}
     */
    getPort () {
        return this._port;
    }

    /**
     * Gets host and port value from window.location.search
     * @private
     * @return {{host: String|null, port: Number|null}}
     */
    _getWebengineQueryParams () {
        const response = {
            'host': null,
            'port': null,
        };

        if (URLSearchParams && window && window.location && window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            const role = urlParams.get('sdl-transport-role');
            const host = urlParams.get('sdl-host');
            const port = urlParams.get('sdl-port');

            if (
                ['ws-server', 'wss-server'].includes(role)
                && host !== null
                && isNaN(parseInt(port)) === false
            ) {
                // we have everthing needed to use webengine query attributes
                response.host = `${(role === 'wss-server' ? 'wss' : 'ws')}://${host}`;
                response.port = parseInt(port);
            }
        }

        return response;
    }
}

export { WebSocketClientConfig };
