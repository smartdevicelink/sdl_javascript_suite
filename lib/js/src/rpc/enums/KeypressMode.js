/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
 * @typedef {Enum} KeypressMode
 * @property {Object} _MAP
 */
class KeypressMode extends Enum {
    /**
     * Constructor for KeypressMode.
     * @class
     * @since SmartDeviceLink 3.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for SINGLE_KEYPRESS.
     * Each keypress is individually sent as the user presses the keyboard keys.
     * @returns {String} - The enum value.
     */
    static get SINGLE_KEYPRESS () {
        return KeypressMode._MAP.SINGLE_KEYPRESS;
    }

    /**
     * Get the enum value for QUEUE_KEYPRESSES.
     * The keypresses are queued and a string is eventually sent once the user chooses to submit their entry.
     * @returns {String} - The enum value.
     */
    static get QUEUE_KEYPRESSES () {
        return KeypressMode._MAP.QUEUE_KEYPRESSES;
    }

    /**
     * Get the enum value for RESEND_CURRENT_ENTRY.
     * The keypresses are queue and a string is sent each time the user presses a keyboard key; the string contains the entire current entry.
     * @returns {String} - The enum value.
     */
    static get RESEND_CURRENT_ENTRY () {
        return KeypressMode._MAP.RESEND_CURRENT_ENTRY;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return KeypressMode._valueForKey(key, KeypressMode._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return KeypressMode._keyForValue(value, KeypressMode._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(KeypressMode._MAP);
    }
}

KeypressMode._MAP = Object.freeze({
    'SINGLE_KEYPRESS': 'SINGLE_KEYPRESS',
    'QUEUE_KEYPRESSES': 'QUEUE_KEYPRESSES',
    'RESEND_CURRENT_ENTRY': 'RESEND_CURRENT_ENTRY',
});

export { KeypressMode };