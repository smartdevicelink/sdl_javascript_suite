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
 * Enumeration that describes current levels of HMI.
 * @typedef {Enum} HMILevel
 * @property {Object} _MAP
 */
class HMILevel extends Enum {
    /**
     * Constructor for HMILevel.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for HMI_FULL.
     * @returns {String} - The enum value.
     */
    static get HMI_FULL () {
        return HMILevel._MAP.HMI_FULL;
    }

    /**
     * Get the enum value for HMI_LIMITED.
     * @returns {String} - The enum value.
     */
    static get HMI_LIMITED () {
        return HMILevel._MAP.HMI_LIMITED;
    }

    /**
     * Get the enum value for HMI_BACKGROUND.
     * @returns {String} - The enum value.
     */
    static get HMI_BACKGROUND () {
        return HMILevel._MAP.HMI_BACKGROUND;
    }

    /**
     * Get the enum value for HMI_NONE.
     * @returns {String} - The enum value.
     */
    static get HMI_NONE () {
        return HMILevel._MAP.HMI_NONE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return HMILevel._valueForKey(key, HMILevel._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return HMILevel._keyForValue(value, HMILevel._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(HMILevel._MAP);
    }
}

HMILevel._MAP = Object.freeze({
    'HMI_FULL': 'FULL',
    'HMI_LIMITED': 'LIMITED',
    'HMI_BACKGROUND': 'BACKGROUND',
    'HMI_NONE': 'NONE',
});

export { HMILevel };