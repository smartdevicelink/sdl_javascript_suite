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
 * Contains information about the TTS capabilities.
 * @typedef {Enum} SpeechCapabilities
 * @property {Object} _MAP
 */
class SpeechCapabilities extends Enum {
    /**
     * Constructor for SpeechCapabilities.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for SC_TEXT.
     * @returns {String} - The enum value.
     */
    static get SC_TEXT () {
        return SpeechCapabilities._MAP.SC_TEXT;
    }

    /**
     * Get the enum value for SAPI_PHONEMES.
     * @returns {String} - The enum value.
     */
    static get SAPI_PHONEMES () {
        return SpeechCapabilities._MAP.SAPI_PHONEMES;
    }

    /**
     * Get the enum value for LHPLUS_PHONEMES.
     * @returns {String} - The enum value.
     */
    static get LHPLUS_PHONEMES () {
        return SpeechCapabilities._MAP.LHPLUS_PHONEMES;
    }

    /**
     * Get the enum value for PRE_RECORDED.
     * @returns {String} - The enum value.
     */
    static get PRE_RECORDED () {
        return SpeechCapabilities._MAP.PRE_RECORDED;
    }

    /**
     * Get the enum value for SILENCE.
     * @returns {String} - The enum value.
     */
    static get SILENCE () {
        return SpeechCapabilities._MAP.SILENCE;
    }

    /**
     * Get the enum value for FILE.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get FILE () {
        return SpeechCapabilities._MAP.FILE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return SpeechCapabilities._valueForKey(key, SpeechCapabilities._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return SpeechCapabilities._keyForValue(value, SpeechCapabilities._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(SpeechCapabilities._MAP);
    }
}

SpeechCapabilities._MAP = Object.freeze({
    'SC_TEXT': 'TEXT',
    'SAPI_PHONEMES': 'SAPI_PHONEMES',
    'LHPLUS_PHONEMES': 'LHPLUS_PHONEMES',
    'PRE_RECORDED': 'PRE_RECORDED',
    'SILENCE': 'SILENCE',
    'FILE': 'FILE',
});

export { SpeechCapabilities };