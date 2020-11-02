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
 * List possible cushions of a multi-contour massage seat.
 * @typedef {Enum} MassageCushion
 * @property {Object} _MAP
 */
class MassageCushion extends Enum {
    /**
     * Constructor for MassageCushion.
     * @class
     * @since SmartDeviceLink 5.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for TOP_LUMBAR.
     * @returns {String} - The enum value.
     */
    static get TOP_LUMBAR () {
        return MassageCushion._MAP.TOP_LUMBAR;
    }

    /**
     * Get the enum value for MIDDLE_LUMBAR.
     * @returns {String} - The enum value.
     */
    static get MIDDLE_LUMBAR () {
        return MassageCushion._MAP.MIDDLE_LUMBAR;
    }

    /**
     * Get the enum value for BOTTOM_LUMBAR.
     * @returns {String} - The enum value.
     */
    static get BOTTOM_LUMBAR () {
        return MassageCushion._MAP.BOTTOM_LUMBAR;
    }

    /**
     * Get the enum value for BACK_BOLSTERS.
     * @returns {String} - The enum value.
     */
    static get BACK_BOLSTERS () {
        return MassageCushion._MAP.BACK_BOLSTERS;
    }

    /**
     * Get the enum value for SEAT_BOLSTERS.
     * @returns {String} - The enum value.
     */
    static get SEAT_BOLSTERS () {
        return MassageCushion._MAP.SEAT_BOLSTERS;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return MassageCushion._valueForKey(key, MassageCushion._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return MassageCushion._keyForValue(value, MassageCushion._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(MassageCushion._MAP);
    }
}

MassageCushion._MAP = Object.freeze({
    'TOP_LUMBAR': 'TOP_LUMBAR',
    'MIDDLE_LUMBAR': 'MIDDLE_LUMBAR',
    'BOTTOM_LUMBAR': 'BOTTOM_LUMBAR',
    'BACK_BOLSTERS': 'BACK_BOLSTERS',
    'SEAT_BOLSTERS': 'SEAT_BOLSTERS',
});

export { MassageCushion };