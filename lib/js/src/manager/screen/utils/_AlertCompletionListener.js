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
 * @typedef {Object} _AlertCompletionListener
 * @private
 */
class _AlertCompletionListener {
    /**
     * Initializes an instance of _AlertCompletionListener
     */
    constructor () {
        this._onComplete = null;
    }

    /**
     * Set the OnComplete event function.
     * @param {function} listener - A function to be called when the event occurs.
     * @returns {_AlertCompletionListener} - A reference to this instance to support method chaining.
     */
    setOnComplete (listener) {
        this._onComplete = listener;
        return this;
    }

    /**
     * Returns whether an Alert operation was successful or not along with tryAgainTime
     * @param {Boolean} success - Boolean that is True if Operation was a success, False otherwise.
     * @param {Number} tryAgainTime - Amount of time (in seconds) that an app must wait before resending an alert.
     */
    onComplete (success, tryAgainTime) {
        if (typeof this._onComplete === 'function') {
            this._onComplete(success, tryAgainTime);
        }
    }
}

export { _AlertCompletionListener };