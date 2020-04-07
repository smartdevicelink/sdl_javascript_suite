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

class TransportCallback {
    /**
     * Initializes an instance of TransportCallback.
     * @class
     */
    constructor () {
        this._onConnectionEstablished = null;
        this._onError = null;
        this._onConnectionTerminated = null;
        this._onPacketReceived = null;
    }

    /**
     * Sets the onConnectionEstablished callback.
     * @param {Function} listener - A Function to be invoked when the event is triggered.
     * @returns {TransportCallback} - A class reference to allow method chaining.
     */
    setOnConnectionEstablished (listener) {
        this._onConnectionEstablished = listener;
        return this;
    }

    /**
     * Sets the onError callback.
     * @param {Function} listener - A Function to be invoked when the event is triggered.
     * @returns {TransportCallback} - A class reference to allow method chaining.
     */
    setOnError (listener) {
        this._onError = listener;
        return this;
    }

    /**
     * Sets the onConnectionTerminated callback.
     * @param {Function} listener - A Function to be invoked when the event is triggered.
     * @returns {TransportCallback} - A class reference to allow method chaining.
     */
    setOnConnectionTerminated (listener) {
        this._onConnectionTerminated = listener;
        return this;
    }

    /**
     * Sets the onPacketReceived callback.
     * @param {Function} listener - A Function to be invoked when the event is triggered.
     * @returns {TransportCallback} - A class reference to allow method chaining.
     */
    setOnPacketReceived (listener) {
        this._onPacketReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onConnectionEstablished method.
     */
    onConnectionEstablished () {
        if (typeof this._onConnectionEstablished === 'function') {
            this._onConnectionEstablished();
        }
    }

    /**
     * Safely attempts to invoke the onError method.
     */
    onError () {
        if (typeof this._onError === 'function') {
            this._onError();
        }
    }

    /**
     * Safely attempts to invoke the onConnectionTerminated method.
     * @param {String} reason - A reason for the termination.
     */
    onConnectionTerminated (reason) {
        if (typeof this._onConnectionTerminated === 'function') {
            this._onConnectionTerminated(reason);
        }
    }

    /**
     * Safely attempts to invoke the onPacketReceived method.
     * @param {SdlPacket} packet - An SdlPacket.
     */
    onPacketReceived (packet) {
        if (typeof this._onPacketReceived === 'function') {
            this._onPacketReceived(packet);
        }
    }
}


export { TransportCallback };