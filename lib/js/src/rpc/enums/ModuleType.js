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
 * @typedef {Enum} ModuleType
 * @property {Object} _MAP
 */
class ModuleType extends Enum {
    /**
     * Constructor for ModuleType.
     * @class
     * @since SmartDeviceLink 4.5.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for CLIMATE.
     * @returns {String} - The enum value.
     */
    static get CLIMATE () {
        return ModuleType._MAP.CLIMATE;
    }

    /**
     * Get the enum value for RADIO.
     * @returns {String} - The enum value.
     */
    static get RADIO () {
        return ModuleType._MAP.RADIO;
    }

    /**
     * Get the enum value for SEAT.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get SEAT () {
        return ModuleType._MAP.SEAT;
    }

    /**
     * Get the enum value for AUDIO.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get AUDIO () {
        return ModuleType._MAP.AUDIO;
    }

    /**
     * Get the enum value for LIGHT.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get LIGHT () {
        return ModuleType._MAP.LIGHT;
    }

    /**
     * Get the enum value for HMI_SETTINGS.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get HMI_SETTINGS () {
        return ModuleType._MAP.HMI_SETTINGS;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ModuleType._valueForKey(key, ModuleType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ModuleType._keyForValue(value, ModuleType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(ModuleType._MAP);
    }
}

ModuleType._MAP = Object.freeze({
    'CLIMATE': 'CLIMATE',
    'RADIO': 'RADIO',
    'SEAT': 'SEAT',
    'AUDIO': 'AUDIO',
    'LIGHT': 'LIGHT',
    'HMI_SETTINGS': 'HMI_SETTINGS',
});

export { ModuleType };