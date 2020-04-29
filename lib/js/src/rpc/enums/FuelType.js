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
 * @typedef {Enum} FuelType
 * @property {Object} _MAP
 */
class FuelType extends Enum {
    /**
     * Constructor for FuelType.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for GASOLINE.
     * @returns {String} - The enum value.
     */
    static get GASOLINE () {
        return FuelType._MAP.GASOLINE;
    }

    /**
     * Get the enum value for DIESEL.
     * @returns {String} - The enum value.
     */
    static get DIESEL () {
        return FuelType._MAP.DIESEL;
    }

    /**
     * Get the enum value for CNG.
     * For vehicles using compressed natural gas.
     * @returns {String} - The enum value.
     */
    static get CNG () {
        return FuelType._MAP.CNG;
    }

    /**
     * Get the enum value for LPG.
     * For vehicles using liquefied petroleum gas.
     * @returns {String} - The enum value.
     */
    static get LPG () {
        return FuelType._MAP.LPG;
    }

    /**
     * Get the enum value for HYDROGEN.
     * For FCEV (fuel cell electric vehicle).
     * @returns {String} - The enum value.
     */
    static get HYDROGEN () {
        return FuelType._MAP.HYDROGEN;
    }

    /**
     * Get the enum value for BATTERY.
     * For BEV (Battery Electric Vehicle), PHEV (Plug-in Hybrid Electric Vehicle), solar vehicles and other vehicles
     * which run on a battery.
     * @returns {String} - The enum value.
     */
    static get BATTERY () {
        return FuelType._MAP.BATTERY;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return FuelType._valueForKey(key, FuelType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return FuelType._keyForValue(value, FuelType._MAP);
    }
}

FuelType._MAP = Object.freeze({
    'GASOLINE': 'GASOLINE',
    'DIESEL': 'DIESEL',
    'CNG': 'CNG',
    'LPG': 'LPG',
    'HYDROGEN': 'HYDROGEN',
    'BATTERY': 'BATTERY',
});

export { FuelType };