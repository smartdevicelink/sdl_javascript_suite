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
 * Reflects the reported battery status of the connected device, if reported.
 * @typedef {Enum} DeviceLevelStatus
 * @property {Object} _MAP
 */
class DeviceLevelStatus extends Enum {
    /**
     * Constructor for DeviceLevelStatus.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for ZERO_LEVEL_BARS.
     * @returns {String} - The enum value.
     */
    static get ZERO_LEVEL_BARS () {
        return DeviceLevelStatus._MAP.ZERO_LEVEL_BARS;
    }

    /**
     * Get the enum value for ONE_LEVEL_BARS.
     * @returns {String} - The enum value.
     */
    static get ONE_LEVEL_BARS () {
        return DeviceLevelStatus._MAP.ONE_LEVEL_BARS;
    }

    /**
     * Get the enum value for TWO_LEVEL_BARS.
     * @returns {String} - The enum value.
     */
    static get TWO_LEVEL_BARS () {
        return DeviceLevelStatus._MAP.TWO_LEVEL_BARS;
    }

    /**
     * Get the enum value for THREE_LEVEL_BARS.
     * @returns {String} - The enum value.
     */
    static get THREE_LEVEL_BARS () {
        return DeviceLevelStatus._MAP.THREE_LEVEL_BARS;
    }

    /**
     * Get the enum value for FOUR_LEVEL_BARS.
     * @returns {String} - The enum value.
     */
    static get FOUR_LEVEL_BARS () {
        return DeviceLevelStatus._MAP.FOUR_LEVEL_BARS;
    }

    /**
     * Get the enum value for NOT_PROVIDED.
     * @returns {String} - The enum value.
     */
    static get NOT_PROVIDED () {
        return DeviceLevelStatus._MAP.NOT_PROVIDED;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return DeviceLevelStatus._valueForKey(key, DeviceLevelStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return DeviceLevelStatus._keyForValue(value, DeviceLevelStatus._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(DeviceLevelStatus._MAP);
    }
}

DeviceLevelStatus._MAP = Object.freeze({
    'ZERO_LEVEL_BARS': 'ZERO_LEVEL_BARS',
    'ONE_LEVEL_BARS': 'ONE_LEVEL_BARS',
    'TWO_LEVEL_BARS': 'TWO_LEVEL_BARS',
    'THREE_LEVEL_BARS': 'THREE_LEVEL_BARS',
    'FOUR_LEVEL_BARS': 'FOUR_LEVEL_BARS',
    'NOT_PROVIDED': 'NOT_PROVIDED',
});

export { DeviceLevelStatus };