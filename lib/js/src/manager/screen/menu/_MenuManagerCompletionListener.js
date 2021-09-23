/*
* Copyright (c) 2021, Livio, Inc.
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
 * @typedef {Object} _MenuManagerCompletionListener
 * @private
 */
class _MenuManagerCompletionListener {
    /**
     * Initializes an instance of _MenuManagerCompletionListener.
     * @class
     * @private
     */
    constructor () {
        this._onComplete = null;
    }

    /**
     * Set the onComplete function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_MenuManagerCompletionListener} - A reference to this instance to allow method chaining.
     */
    setOnComplete (listener) {
        this._onComplete = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onComplete event.
     * @param {Boolean} success - Whether the operation succeeded
     * @param {MenuCell[]} currentMenuCells - The new menu cell list state
     */
    onComplete (success, currentMenuCells) {
        if (typeof this._onComplete === 'function') {
            this._onComplete(success, currentMenuCells);
        }
    }
}

export { _MenuManagerCompletionListener };