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

import { Enum } from '../../util/Enum.js';

/**
 * Enumeration listing possible keyboard layouts.
 * @typedef {Enum} KeyboardLayout
 * @property {Object} _MAP
 */
class KeyboardLayout extends Enum {
    /**
     * Constructor for KeyboardLayout.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for QWERTY.
     * @returns {String} - The enum value.
     */
    static get QWERTY () {
        return KeyboardLayout._MAP.QWERTY;
    }

    /**
     * Get the enum value for QWERTZ.
     * @returns {String} - The enum value.
     */
    static get QWERTZ () {
        return KeyboardLayout._MAP.QWERTZ;
    }

    /**
     * Get the enum value for AZERTY.
     * @returns {String} - The enum value.
     */
    static get AZERTY () {
        return KeyboardLayout._MAP.AZERTY;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return KeyboardLayout._valueForKey(key, KeyboardLayout._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return KeyboardLayout._keyForValue(value, KeyboardLayout._MAP);
    }
}

KeyboardLayout._MAP = Object.freeze({
    'QWERTY': 'QWERTY',
    'QWERTZ': 'QWERTZ',
    'AZERTY': 'AZERTY',
});

export { KeyboardLayout };