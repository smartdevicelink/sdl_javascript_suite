/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
 * The list of potential character sets
 * @typedef {Enum} CharacterSet
 * @property {Object} _MAP
 */
class CharacterSet extends Enum {
    /**
     * Constructor for CharacterSet.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for TYPE2SET.
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {String} - The enum value.
     */
    static get TYPE2SET () {
        return CharacterSet._MAP.TYPE2SET;
    }

    /**
     * Get the enum value for TYPE5SET.
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {String} - The enum value.
     */
    static get TYPE5SET () {
        return CharacterSet._MAP.TYPE5SET;
    }

    /**
     * Get the enum value for CID1SET.
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {String} - The enum value.
     */
    static get CID1SET () {
        return CharacterSet._MAP.CID1SET;
    }

    /**
     * Get the enum value for CID2SET.
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {String} - The enum value.
     */
    static get CID2SET () {
        return CharacterSet._MAP.CID2SET;
    }

    /**
     * Get the enum value for ASCII.
     * @since SmartDeviceLink 7.0.0
     * ASCII as defined in https://en.wikipedia.org/wiki/ASCII as defined in codes 0-127. Non-printable characters such as tabs and back spaces are ignored.
     * @returns {String} - The enum value.
     */
    static get ASCII () {
        return CharacterSet._MAP.ASCII;
    }

    /**
     * Get the enum value for ISO_8859_1.
     * @since SmartDeviceLink 7.0.0
     * Latin-1, as defined in https://en.wikipedia.org/wiki/ISO/IEC_8859-1
     * @returns {String} - The enum value.
     */
    static get ISO_8859_1 () {
        return CharacterSet._MAP.ISO_8859_1;
    }

    /**
     * Get the enum value for UTF_8.
     * @since SmartDeviceLink 7.0.0
     * The UTF-8 character set that uses variable bytes per code point. See https://en.wikipedia.org/wiki/UTF-8 for more details. This is the preferred character set.
     * @returns {String} - The enum value.
     */
    static get UTF_8 () {
        return CharacterSet._MAP.UTF_8;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return CharacterSet._valueForKey(key, CharacterSet._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return CharacterSet._keyForValue(value, CharacterSet._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(CharacterSet._MAP);
    }
}

CharacterSet._MAP = Object.freeze({
    'TYPE2SET': 'TYPE2SET',
    'TYPE5SET': 'TYPE5SET',
    'CID1SET': 'CID1SET',
    'CID2SET': 'CID2SET',
    'ASCII': 'ASCII',
    'ISO_8859_1': 'ISO_8859_1',
    'UTF_8': 'UTF_8',
});

export { CharacterSet };