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
 * @typedef {Enum} DoorStatusType
 * @property {Object} _MAP
 */
class DoorStatusType extends Enum {
    /**
     * Constructor for DoorStatusType.
     * @class
     * @since SmartDeviceLink 7.1.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for CLOSED.
     * @returns {String} - The enum value.
     */
    static get CLOSED () {
        return DoorStatusType._MAP.CLOSED;
    }

    /**
     * Get the enum value for LOCKED.
     * @returns {String} - The enum value.
     */
    static get LOCKED () {
        return DoorStatusType._MAP.LOCKED;
    }

    /**
     * Get the enum value for AJAR.
     * @returns {String} - The enum value.
     */
    static get AJAR () {
        return DoorStatusType._MAP.AJAR;
    }

    /**
     * Get the enum value for REMOVED.
     * @returns {String} - The enum value.
     */
    static get REMOVED () {
        return DoorStatusType._MAP.REMOVED;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return DoorStatusType._valueForKey(key, DoorStatusType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return DoorStatusType._keyForValue(value, DoorStatusType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(DoorStatusType._MAP);
    }
}

DoorStatusType._MAP = Object.freeze({
    'CLOSED': 'CLOSED',
    'LOCKED': 'LOCKED',
    'AJAR': 'AJAR',
    'REMOVED': 'REMOVED',
});

export { DoorStatusType };