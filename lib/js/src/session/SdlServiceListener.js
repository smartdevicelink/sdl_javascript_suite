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

/**
 * @typedef {Object} SdlServiceListener
 */
class SdlServiceListener {
    /**
     * Initializes an instance of SdlServiceListener
     * @class
     */
    constructor () {
        this._onServiceStarted = null;
        this._onServiceEnded = null;
        this._onServiceError = null;
    }

    /**
     * Set the onServiceStarted function.
     * @param {function} listener - The function to be invoked when the event occurs.
     */
    setOnServiceStarted (listener) {
        this._onServiceStarted = listener;
    }

    /**
     * Set the onServiceEnded function.
     * @param {function} listener - The function to be invoked when the event occurs.
     */
    setOnServiceEnded (listener) {
        this._onServiceEnded = listener;
    }

    /**
     * Set the onServiceError function.
     * @param {function} listener - The function to be invoked when the event occurs.
     */
    setOnServiceError (listener) {
        this._onServiceError = listener;
    }

    /**
     * Attempts to safely invoke the onServiceStarted event.
     * @param {SdlSession} session - An SdlSession.
     * @param {ServiceType} serviceType - A ServiceType.
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    onServiceStarted (session, serviceType, isEncrypted) {
        if (typeof this._onServiceStarted === 'function') {
            this._onServiceStarted(session, serviceType, isEncrypted);
        }
    }

    /**
     * Attempts to safely invoke the onServiceEnded event.
     * @param {SdlSession} session - An SdlSession.
     * @param {ServiceType} serviceType - A ServiceType.
     */
    onServiceEnded (session, serviceType) {
        if (typeof this._onServiceEnded === 'function') {
            this._onServiceEnded(session, serviceType);
        }
    }

    /**
     * Attempts to safely invoke the onServiceError event.
     * @param {SdlSession} session - An SdlSession.
     * @param {ServiceType} serviceType - A ServiceType.
     * @param {String} reason - An error reason in the form of a string.
     */
    onServiceError (session, serviceType, reason) {
        if (typeof this._onServiceError === 'function') {
            this._onServiceError(session, serviceType, reason);
        }
    }
}

export { SdlServiceListener };