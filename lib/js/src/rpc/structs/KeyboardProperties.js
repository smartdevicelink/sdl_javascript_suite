/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { KeyboardLayout } from '../enums/KeyboardLayout.js';
import { KeypressMode } from '../enums/KeypressMode.js';
import { Language } from '../enums/Language.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Configuration of on-screen keyboard (if available).
 */
class KeyboardProperties extends RpcStruct {
    /**
     * Initalizes an instance of KeyboardProperties.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Language
     * @param {Language} language - The keyboard language. - The desired Language.
     * @returns {KeyboardProperties} - The class instance for method chaining.
     */
    setLanguage (language) {
        this._validateType(Language, language);
        this.setParameter(KeyboardProperties.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * Get the Language
     * @returns {Language} - the KEY_LANGUAGE value
     */
    getLanguage () {
        return this.getObject(Language, KeyboardProperties.KEY_LANGUAGE);
    }

    /**
     * Set the KeyboardLayout
     * @param {KeyboardLayout} layout - Desired keyboard layout. - The desired KeyboardLayout.
     * @returns {KeyboardProperties} - The class instance for method chaining.
     */
    setKeyboardLayout (layout) {
        this._validateType(KeyboardLayout, layout);
        this.setParameter(KeyboardProperties.KEY_KEYBOARD_LAYOUT, layout);
        return this;
    }

    /**
     * Get the KeyboardLayout
     * @returns {KeyboardLayout} - the KEY_KEYBOARD_LAYOUT value
     */
    getKeyboardLayout () {
        return this.getObject(KeyboardLayout, KeyboardProperties.KEY_KEYBOARD_LAYOUT);
    }

    /**
     * Set the KeypressMode
     * @param {KeypressMode} mode - Desired keypress mode. If omitted, this value will be set to RESEND_CURRENT_ENTRY. - The desired KeypressMode.
     * @returns {KeyboardProperties} - The class instance for method chaining.
     */
    setKeypressMode (mode) {
        this._validateType(KeypressMode, mode);
        this.setParameter(KeyboardProperties.KEY_KEYPRESS_MODE, mode);
        return this;
    }

    /**
     * Get the KeypressMode
     * @returns {KeypressMode} - the KEY_KEYPRESS_MODE value
     */
    getKeypressMode () {
        return this.getObject(KeypressMode, KeyboardProperties.KEY_KEYPRESS_MODE);
    }

    /**
     * Set the LimitedCharacterList
     * @param {String[]} list - Array of keyboard characters to enable. All omitted characters will be greyed out - The desired LimitedCharacterList.
     * (disabled) on the keyboard. If omitted, the entire keyboard will be enabled.
     * {'array_min_size': 1, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 1}
     * @returns {KeyboardProperties} - The class instance for method chaining.
     */
    setLimitedCharacterList (list) {
        this.setParameter(KeyboardProperties.KEY_LIMITED_CHARACTER_LIST, list);
        return this;
    }

    /**
     * Get the LimitedCharacterList
     * @returns {String[]} - the KEY_LIMITED_CHARACTER_LIST value
     */
    getLimitedCharacterList () {
        return this.getParameter(KeyboardProperties.KEY_LIMITED_CHARACTER_LIST);
    }

    /**
     * Set the AutoCompleteText
     * @param {String} text - Deprecated, use autoCompleteList instead. - The desired AutoCompleteText.
     * {'string_min_length': 1, 'string_max_length': 1000}
     * @returns {KeyboardProperties} - The class instance for method chaining.
     */
    setAutoCompleteText (text) {
        this.setParameter(KeyboardProperties.KEY_AUTO_COMPLETE_TEXT, text);
        return this;
    }

    /**
     * Get the AutoCompleteText
     * @returns {String} - the KEY_AUTO_COMPLETE_TEXT value
     */
    getAutoCompleteText () {
        return this.getParameter(KeyboardProperties.KEY_AUTO_COMPLETE_TEXT);
    }

    /**
     * Set the AutoCompleteList
     * @param {String[]} list - Allows an app to prepopulate the text field with a list of suggested or completed - The desired AutoCompleteList.
     * entries as the user types. If empty, the auto-complete list will be removed from the
     * screen.
     * {'array_min_size': 0, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 1000}
     * @returns {KeyboardProperties} - The class instance for method chaining.
     */
    setAutoCompleteList (list) {
        this.setParameter(KeyboardProperties.KEY_AUTO_COMPLETE_LIST, list);
        return this;
    }

    /**
     * Get the AutoCompleteList
     * @returns {String[]} - the KEY_AUTO_COMPLETE_LIST value
     */
    getAutoCompleteList () {
        return this.getParameter(KeyboardProperties.KEY_AUTO_COMPLETE_LIST);
    }
}

KeyboardProperties.KEY_LANGUAGE = 'language';
KeyboardProperties.KEY_KEYBOARD_LAYOUT = 'keyboardLayout';
KeyboardProperties.KEY_KEYPRESS_MODE = 'keypressMode';
KeyboardProperties.KEY_LIMITED_CHARACTER_LIST = 'limitedCharacterList';
KeyboardProperties.KEY_AUTO_COMPLETE_TEXT = 'autoCompleteText';
KeyboardProperties.KEY_AUTO_COMPLETE_LIST = 'autoCompleteList';

export { KeyboardProperties };