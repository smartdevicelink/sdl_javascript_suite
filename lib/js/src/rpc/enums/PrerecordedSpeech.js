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
 * Contains a list of prerecorded speech items present on the platform.
 * @typedef {Enum} PrerecordedSpeech
 * @property {Object} _MAP
 */
class PrerecordedSpeech extends Enum {
    /**
     * Constructor for PrerecordedSpeech.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for HELP_JINGLE.
     * @returns {String} - The enum value.
     */
    static get HELP_JINGLE () {
        return PrerecordedSpeech._MAP.HELP_JINGLE;
    }

    /**
     * Get the enum value for INITIAL_JINGLE.
     * @returns {String} - The enum value.
     */
    static get INITIAL_JINGLE () {
        return PrerecordedSpeech._MAP.INITIAL_JINGLE;
    }

    /**
     * Get the enum value for LISTEN_JINGLE.
     * @returns {String} - The enum value.
     */
    static get LISTEN_JINGLE () {
        return PrerecordedSpeech._MAP.LISTEN_JINGLE;
    }

    /**
     * Get the enum value for POSITIVE_JINGLE.
     * @returns {String} - The enum value.
     */
    static get POSITIVE_JINGLE () {
        return PrerecordedSpeech._MAP.POSITIVE_JINGLE;
    }

    /**
     * Get the enum value for NEGATIVE_JINGLE.
     * @returns {String} - The enum value.
     */
    static get NEGATIVE_JINGLE () {
        return PrerecordedSpeech._MAP.NEGATIVE_JINGLE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PrerecordedSpeech._valueForKey(key, PrerecordedSpeech._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PrerecordedSpeech._keyForValue(value, PrerecordedSpeech._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(PrerecordedSpeech._MAP);
    }
}

PrerecordedSpeech._MAP = Object.freeze({
    'HELP_JINGLE': 'HELP_JINGLE',
    'INITIAL_JINGLE': 'INITIAL_JINGLE',
    'LISTEN_JINGLE': 'LISTEN_JINGLE',
    'POSITIVE_JINGLE': 'POSITIVE_JINGLE',
    'NEGATIVE_JINGLE': 'NEGATIVE_JINGLE',
});

export { PrerecordedSpeech };