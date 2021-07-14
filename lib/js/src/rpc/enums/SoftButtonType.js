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
 * Contains information about the SoftButton capabilities.
 * @typedef {Enum} SoftButtonType
 * @property {Object} _MAP
 */
class SoftButtonType extends Enum {
    /**
     * Constructor for SoftButtonType.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for SBT_TEXT.
     * @returns {String} - The enum value.
     */
    static get SBT_TEXT () {
        return SoftButtonType._MAP.SBT_TEXT;
    }

    /**
     * Get the enum value for SBT_IMAGE.
     * @returns {String} - The enum value.
     */
    static get SBT_IMAGE () {
        return SoftButtonType._MAP.SBT_IMAGE;
    }

    /**
     * Get the enum value for SBT_BOTH.
     * @returns {String} - The enum value.
     */
    static get SBT_BOTH () {
        return SoftButtonType._MAP.SBT_BOTH;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return SoftButtonType._valueForKey(key, SoftButtonType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return SoftButtonType._keyForValue(value, SoftButtonType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(SoftButtonType._MAP);
    }
}

SoftButtonType._MAP = Object.freeze({
    'SBT_TEXT': 'TEXT',
    'SBT_IMAGE': 'IMAGE',
    'SBT_BOTH': 'BOTH',
});

export { SoftButtonType };