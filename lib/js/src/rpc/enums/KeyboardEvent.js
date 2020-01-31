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
 * Enumeration listing possible keyboard events.
 * @typedef {Enum} KeyboardEvent
 * @property {Object} _MAP
 */
class KeyboardEvent extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get KEYPRESS () {
        return KeyboardEvent._MAP.KEYPRESS;
    }

    /**
     * @return {String}
     */
    static get ENTRY_SUBMITTED () {
        return KeyboardEvent._MAP.ENTRY_SUBMITTED;
    }

    /**
     * @return {String}
     */
    static get ENTRY_VOICE () {
        return KeyboardEvent._MAP.ENTRY_VOICE;
    }

    /**
     * @return {String}
     */
    static get ENTRY_CANCELLED () {
        return KeyboardEvent._MAP.ENTRY_CANCELLED;
    }

    /**
     * @return {String}
     */
    static get ENTRY_ABORTED () {
        return KeyboardEvent._MAP.ENTRY_ABORTED;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return KeyboardEvent._valueForKey(key, KeyboardEvent._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return KeyboardEvent._keyForValue(value, KeyboardEvent._MAP);
    }
}

KeyboardEvent._MAP = Object.freeze({
    'KEYPRESS': 'KEYPRESS',
    'ENTRY_SUBMITTED': 'ENTRY_SUBMITTED',
    'ENTRY_VOICE': 'ENTRY_VOICE',
    'ENTRY_CANCELLED': 'ENTRY_CANCELLED',
    'ENTRY_ABORTED': 'ENTRY_ABORTED',
});

export { KeyboardEvent };