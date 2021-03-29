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
 * @typedef {Object} KeyboardListener
 * @private
 */
class KeyboardListener {
    /**
     * Initializes an instance of KeyboardListener.
     * @class
     * @private
     */
    constructor () {
        this._onUserDidSubmitInput = null;
        this._onKeyboardDidAbortWithReason = null;
        this._updateAutocompleteWithInput = null;
        this._updateCharacterSetWithInput = null;
        this._onKeyboardDidSendEvent = null;
        this._onKeyboardInputMaskHasChanged = null;
    }

    /**
     * Set the onUserDidSubmitInput function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {KeyboardListener} - A reference to this instance to allow method chaining.
     */
    setOnUserDidSubmitInput (listener) {
        this._onUserDidSubmitInput = listener;
        return this;
    }

    /**
     * Set the onKeyboardDidAbortWithReason function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {KeyboardListener} - A reference to this instance to allow method chaining.
     */
    setOnKeyboardDidAbortWithReason (listener) {
        this._onKeyboardDidAbortWithReason = listener;
        return this;
    }

    /**
     * Set the updateAutocompleteWithInput function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {KeyboardListener} - A reference to this instance to allow method chaining.
     */
    setUpdateAutocompleteWithInput (listener) {
        this._updateAutocompleteWithInput = listener;
        return this;
    }

    /**
     * Set the updateCharacterSetWithInput function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {KeyboardListener} - A reference to this instance to allow method chaining.
     */
    setUpdateCharacterSetWithInput (listener) {
        this._updateCharacterSetWithInput = listener;
        return this;
    }

    /**
     * Set the onKeyboardDidSendEvent function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {KeyboardListener} - A reference to this instance to allow method chaining.
     */
    setOnKeyboardDidSendEvent (listener) {
        this._onKeyboardDidSendEvent = listener;
        return this;
    }

    /**
     * Set the onKeyboardInputMaskHasChanged function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {KeyboardListener} - A reference to this instance to allow method chaining.
     */
    setOnKeyboardDidUpdateInputMask (listener) {
        this._onKeyboardDidUpdateInputMask = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onUserDidSubmitInput event.
     * The keyboard session completed with some input.
     * This will be sent upon ENTRY_SUBMITTED or ENTRY_VOICE. If the event is ENTRY_VOICE, the user
     * requested to start a voice session in order to submit input to this keyboard. This MUST be
     * handled by you. Start an Audio Pass Thru session if supported.
     * @param {String} inputText - The submitted input text on the keyboard
     * @param {KeyboardEvent} event - ENTRY_SUBMITTED if the user pressed the submit button on the keyboard, ENTRY_VOICE if the user requested that a voice session begin
     */
    onUserDidSubmitInput (inputText, event) {
        if (typeof this._onUserDidSubmitInput === 'function') {
            this._onUserDidSubmitInput(inputText, event);
        }
    }

    /**
     * Safely attempts to invoke the onKeyboardDidAbortWithReason event.
     * The keyboard session aborted.
     * This will be sent if the keyboard event ENTRY_CANCELLED or ENTRY_ABORTED is sent
     * @param {KeyboardEvent} event - ENTRY_CANCELLED if the user cancelled the keyboard input, or ENTRY_ABORTED if the system aborted the input due to a higher priority event
     */
    onKeyboardDidAbortWithReason (event) {
        if (typeof this._onKeyboardDidAbortWithReason === 'function') {
            this._onKeyboardDidAbortWithReason(event);
        }
    }

    /**
     * Safely attempts to invoke the updateAutocompleteWithInput event.
     * Implement this in order to provide a custom keyboard configuration to just this keyboard. To
     * apply default settings to all keyboards, see SDLScreenManager.keyboardConfiguration
     * @param {String} currentInputText - The user's full current input text
     * @param {function} keyboardAutocompleteCompletionListener - A listener to update the autoCompleteText
     */
    updateAutocompleteWithInput (currentInputText, keyboardAutocompleteCompletionListener) {
        if (typeof this._updateAutocompleteWithInput === 'function') {
            this._updateAutocompleteWithInput(currentInputText, keyboardAutocompleteCompletionListener);
        }
    }

    /**
     * Safely attempts to invoke the updateCharacterSetWithInput event.
     * Implement this if you wish to update the limitedCharacterSet as the user updates their input.
     * This is called upon a KEYPRESS event.
     * @param {String} currentInputText - The user's full current input text
     * @param {function} keyboardCharacterSetCompletionListener - A listener to update the limitedCharacterSet
     */
    updateCharacterSetWithInput (currentInputText, keyboardCharacterSetCompletionListener) {
        if (typeof this._updateCharacterSetWithInput === 'function') {
            this._updateCharacterSetWithInput(currentInputText, keyboardCharacterSetCompletionListener);
        }
    }

    /**
     * Safely attempts to invoke the onKeyboardDidSendEvent event.
     * Implement this to be notified of all events occurring on the keyboard
     * @param {KeyboardEvent} event - The event that occurred
     * @param {String} currentInputText - The event that occurred
     */
    onKeyboardDidSendEvent (event, currentInputText) {
        if (typeof this._onKeyboardDidSendEvent === 'function') {
            this._onKeyboardDidSendEvent(event, currentInputText);
        }
    }

    /**
     * Safely attempts to invoke the onKeyboardInputMaskHasChanged event.
     * Implement this to be notified of all events occurring on the keyboard
     * @param {KeyboardEvent} event - The event that occurred
     */
    onKeyboardDidUpdateInputMask (event) {
        if (typeof this._onKeyboardDidUpdateInputMask === 'function') {
            this._onKeyboardDidUpdateInputMask(event);
        }
    }
}

export { KeyboardListener };