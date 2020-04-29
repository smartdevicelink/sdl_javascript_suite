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
 * Reflects the status of a binary vehicle data item.
 * @typedef {Enum} VehicleDataStatus
 * @property {Object} _MAP
 */
class VehicleDataStatus extends Enum {
    /**
     * Constructor for VehicleDataStatus.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for VDS_NO_DATA_EXISTS.
     * @returns {String} - The enum value.
     */
    static get VDS_NO_DATA_EXISTS () {
        return VehicleDataStatus._MAP.VDS_NO_DATA_EXISTS;
    }

    /**
     * Get the enum value for VDS_OFF.
     * @returns {String} - The enum value.
     */
    static get VDS_OFF () {
        return VehicleDataStatus._MAP.VDS_OFF;
    }

    /**
     * Get the enum value for VDS_ON.
     * @returns {String} - The enum value.
     */
    static get VDS_ON () {
        return VehicleDataStatus._MAP.VDS_ON;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return VehicleDataStatus._valueForKey(key, VehicleDataStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return VehicleDataStatus._keyForValue(value, VehicleDataStatus._MAP);
    }
}

VehicleDataStatus._MAP = Object.freeze({
    'VDS_NO_DATA_EXISTS': 'NO_DATA_EXISTS',
    'VDS_OFF': 'OFF',
    'VDS_ON': 'ON',
});

export { VehicleDataStatus };