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

class TransportListener {
    /**
     * Initializes an instance of TransportListener.
     * @class
     */
    constructor () {
        this._onTransportConnected = null;
        this._onTransportDisconnected = null;
        this._onError = null;
        this._onPacketReceived = null;
    }

    /**
     * Sets the onTransportConnected callback.
     * @param {Function} func - A Function to be invoked when the event is triggered.
     * @returns {TransportListener} - A class reference to allow method chaining.
     */
    setOnTransportConnected (func) {
        this._onTransportConnected = func;

        return this;
    }

    /**
     * Sets the onTransportDisconnected callback.
     * @param {Function} func - A Function to be invoked when the event is triggered.
     * @returns {TransportListener} - A class reference to allow method chaining.
     */
    setOnTransportDisconnected (func) {
        this._onTransportDisconnected = func;

        return this;
    }

    /**
     * Sets the onError callback.
     * @param {Function} func - A Function to be invoked when the event is triggered.
     * @returns {TransportListener} - A class reference to allow method chaining.
     */
    setOnError (func) {
        this._onError = func;

        return this;
    }

    /**
     * Sets the onPacketReceived callback.
     * @param {Function} func - A Function to be invoked when the event is triggered.
     * @returns {TransportListener} - A class reference to allow method chaining.
     */
    setOnPacketReceived (func) {
        this._onPacketReceived = func;

        return this;
    }


    /**
     * Safely attempts to invoke the onTransportConnected method.
     */
    onTransportConnected () {
        if (typeof this._onTransportConnected === 'function') {
            this._onTransportConnected();
        }
    }

    /**
     * Safely attempts to invoke the onTransportDisconnected method.
     */
    onTransportDisconnected () {
        if (typeof this._onTransportDisconnected === 'function') {
            this._onTransportDisconnected();
        }
    }

    /**
     * Safely attempts to invoke the onError method.
     * @param {*} error - An error.
     */
    onError (error = null) {
        if (typeof this._onError === 'function') {
            this._onError(error);
        }
    }

    /**
     * Safely attempts to invoke the onPacketReceived method.
     * @param {SdlPacket} sdlPacket - An SdlPacket.
     */
    onPacketReceived (sdlPacket) {
        if (typeof this._onPacketReceived === 'function') {
            this._onPacketReceived(sdlPacket);
        }
    }
}

export { TransportListener };
