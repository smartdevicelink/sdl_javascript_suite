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

import { RpcStruct } from '../RpcStruct.js';
import { KeyboardLayout } from '../enums/KeyboardLayout.js';
import { Language } from '../enums/Language.js';
import { KeypressMode } from '../enums/KeypressMode.js';

/**
 * Configuration of on-screen keyboard (if available).
 */
class KeyboardProperties extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Language} language - The keyboard language.
     * @return {KeyboardProperties}
     */
    setLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(KeyboardProperties.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getLanguage () {
        return this.getObject(Language, KeyboardProperties.KEY_LANGUAGE);
    }

    /**
     * @param {KeyboardLayout} layout - Desired keyboard layout.
     * @return {KeyboardProperties}
     */
    setKeyboardLayout (layout) {
        this.validateType(KeyboardLayout, layout);
        this.setParameter(KeyboardProperties.KEY_KEYBOARD_LAYOUT, layout);
        return this;
    }

    /**
     * @return {KeyboardLayout}
     */
    getKeyboardLayout () {
        return this.getObject(KeyboardLayout, KeyboardProperties.KEY_KEYBOARD_LAYOUT);
    }

    /**
     * @param {KeypressMode} mode - Desired keypress mode. If omitted, this value will be set to RESEND_CURRENT_ENTRY.
     * @return {KeyboardProperties}
     */
    setKeypressMode (mode) {
        this.validateType(KeypressMode, mode);
        this.setParameter(KeyboardProperties.KEY_KEYPRESS_MODE, mode);
        return this;
    }

    /**
     * @return {KeypressMode}
     */
    getKeypressMode () {
        return this.getObject(KeypressMode, KeyboardProperties.KEY_KEYPRESS_MODE);
    }

    /**
     * @param {String[]} list - Array of keyboard characters to enable. All omitted characters will be greyed out
     *                          (disabled) on the keyboard. If omitted, the entire keyboard will be enabled.
     * @return {KeyboardProperties}
     */
    setLimitedCharacterList (list) {
        this.setParameter(KeyboardProperties.KEY_LIMITED_CHARACTER_LIST, list);
        return this;
    }

    /**
     * @return {String[]}
     */
    getLimitedCharacterList () {
        return this.getParameter(KeyboardProperties.KEY_LIMITED_CHARACTER_LIST);
    }

    /**
     * @param {String} text - Deprecated, use autoCompleteList instead.
     * @return {KeyboardProperties}
     */
    setAutoCompleteText (text) {
        this.setParameter(KeyboardProperties.KEY_AUTO_COMPLETE_TEXT, text);
        return this;
    }

    /**
     * @return {String}
     */
    getAutoCompleteText () {
        return this.getParameter(KeyboardProperties.KEY_AUTO_COMPLETE_TEXT);
    }

    /**
     * @param {String[]} list - Allows an app to prepopulate the text field with a list of suggested or completed
     *                          entries as the user types. If empty, the auto-complete list will be removed from the
     *                          screen.
     * @return {KeyboardProperties}
     */
    setAutoCompleteList (list) {
        this.setParameter(KeyboardProperties.KEY_AUTO_COMPLETE_LIST, list);
        return this;
    }

    /**
     * @return {String[]}
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