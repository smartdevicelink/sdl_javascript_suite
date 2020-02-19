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
import { TransportConfigBase } from './TransportConfigBase.js';


/**
 * @typedef {Object} TransportConfigBase
 * @property {TransportType} _transportType
 * @property {Function} getTransportType
 */
class WebSocketClientConfig extends TransportConfigBase {
    /**
     * @constructor
     * @param {String} host
     * @param {String} port
     */
    constructor (host, port) {
        super(TransportType.WEBSOCKET_CLIENT);

        let { _host, _port } = { host, port };

        // try to get host and port from window.location.search
        if (!_host || !_port) {
            const locationSearchParams = this.getLocationSearchParams();
            _host = locationSearchParams.host;
            _port = locationSearchParams.port;
        }

        if (!_host || !_port) {
            throw new Error('Both host and port parameters are required');
        }

        this._host = _host;
        this._port = parseInt(_port);
    }

    /**
     * @return String
     */
    getHost () {
        return this._host;
    }

    /**
     * @return Number
     */
    getPort () {
        return this._port;
    }

    /**
     * Gets host and port value from window.location.search
     *
     * @return {{host: String|null, port: Number|null}}
     */
    getLocationSearchParams () {
        let protocol = 'ws';
        let host = null;
        let port = null;
        if (URLSearchParams && window && window.location && window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            const role = (urlParams.get('sdl-transport-role') || `${protocol}-server`);
            if (role.length < 9 || role.substring(role.length - 7) !== '-server') {
                throw new Error(`Wrong value ${urlParams.get('sdl-transport-role')} of sdl-transport-role parameter, it should be one of [ws-server, wss-server]`);
            }
            protocol = role.substring(0, role.length - 7);
            host = urlParams.get('sdl-host') || host;
            if (host) {
                host = `${protocol}://${host}`;
            }
            port = urlParams.get('sdl-port') || port;
            if (port) {
                port = parseInt(port);
            }
        }
        return {
            host,
            port,
        };
    }
}

export { WebSocketClientConfig };