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
 * Reflects the emergency event status of the vehicle.
 * @typedef {Enum} EmergencyEventType
 * @property {Object} _MAP
 */
class EmergencyEventType extends Enum {
    /**
     * Constructor for EmergencyEventType.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for EET_NO_EVENT.
     * @returns {String} - The enum value.
     */
    static get EET_NO_EVENT () {
        return EmergencyEventType._MAP.EET_NO_EVENT;
    }

    /**
     * Get the enum value for EET_FRONTAL.
     * @returns {String} - The enum value.
     */
    static get EET_FRONTAL () {
        return EmergencyEventType._MAP.EET_FRONTAL;
    }

    /**
     * Get the enum value for EET_SIDE.
     * @returns {String} - The enum value.
     */
    static get EET_SIDE () {
        return EmergencyEventType._MAP.EET_SIDE;
    }

    /**
     * Get the enum value for EET_REAR.
     * @returns {String} - The enum value.
     */
    static get EET_REAR () {
        return EmergencyEventType._MAP.EET_REAR;
    }

    /**
     * Get the enum value for EET_ROLLOVER.
     * @returns {String} - The enum value.
     */
    static get EET_ROLLOVER () {
        return EmergencyEventType._MAP.EET_ROLLOVER;
    }

    /**
     * Get the enum value for EET_NOT_SUPPORTED.
     * @returns {String} - The enum value.
     */
    static get EET_NOT_SUPPORTED () {
        return EmergencyEventType._MAP.EET_NOT_SUPPORTED;
    }

    /**
     * Get the enum value for EET_FAULT.
     * @returns {String} - The enum value.
     */
    static get EET_FAULT () {
        return EmergencyEventType._MAP.EET_FAULT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return EmergencyEventType._valueForKey(key, EmergencyEventType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return EmergencyEventType._keyForValue(value, EmergencyEventType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(EmergencyEventType._MAP);
    }
}

EmergencyEventType._MAP = Object.freeze({
    'EET_NO_EVENT': 'NO_EVENT',
    'EET_FRONTAL': 'FRONTAL',
    'EET_SIDE': 'SIDE',
    'EET_REAR': 'REAR',
    'EET_ROLLOVER': 'ROLLOVER',
    'EET_NOT_SUPPORTED': 'NOT_SUPPORTED',
    'EET_FAULT': 'FAULT',
});

export { EmergencyEventType };