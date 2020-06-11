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
 * Enumeration that describes possible result codes of a vehicle data entry request.
 * @typedef {Enum} VehicleDataResultCode
 * @property {Object} _MAP
 */
class VehicleDataResultCode extends Enum {
    /**
     * Constructor for VehicleDataResultCode.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for VDRC_SUCCESS.
     * Individual vehicle data item / DTC / DID request or subscription successful
     * @returns {String} - The enum value.
     */
    static get VDRC_SUCCESS () {
        return VehicleDataResultCode._MAP.VDRC_SUCCESS;
    }

    /**
     * Get the enum value for VDRC_TRUNCATED_DATA.
     * DTC / DID request successful, however, not all active DTCs or full contents of DID location available
     * @returns {String} - The enum value.
     */
    static get VDRC_TRUNCATED_DATA () {
        return VehicleDataResultCode._MAP.VDRC_TRUNCATED_DATA;
    }

    /**
     * Get the enum value for VDRC_DISALLOWED.
     * This vehicle data item is not allowed for this app by the OEM/Manufactorer of the connected module.
     * @returns {String} - The enum value.
     */
    static get VDRC_DISALLOWED () {
        return VehicleDataResultCode._MAP.VDRC_DISALLOWED;
    }

    /**
     * Get the enum value for VDRC_USER_DISALLOWED.
     * The user has not granted access to this type of vehicle data item at this time.
     * @returns {String} - The enum value.
     */
    static get VDRC_USER_DISALLOWED () {
        return VehicleDataResultCode._MAP.VDRC_USER_DISALLOWED;
    }

    /**
     * Get the enum value for VDRC_INVALID_ID.
     * The ECU ID referenced is not a valid ID on the bus / system.
     * @returns {String} - The enum value.
     */
    static get VDRC_INVALID_ID () {
        return VehicleDataResultCode._MAP.VDRC_INVALID_ID;
    }

    /**
     * Get the enum value for VDRC_DATA_NOT_AVAILABLE.
     * The requested vehicle data item / DTC / DID is not currently available or responding on the bus / system.
     * @returns {String} - The enum value.
     */
    static get VDRC_DATA_NOT_AVAILABLE () {
        return VehicleDataResultCode._MAP.VDRC_DATA_NOT_AVAILABLE;
    }

    /**
     * Get the enum value for VDRC_DATA_ALREADY_SUBSCRIBED.
     * The vehicle data item is already subscribed.
     * @returns {String} - The enum value.
     */
    static get VDRC_DATA_ALREADY_SUBSCRIBED () {
        return VehicleDataResultCode._MAP.VDRC_DATA_ALREADY_SUBSCRIBED;
    }

    /**
     * Get the enum value for VDRC_DATA_NOT_SUBSCRIBED.
     * The vehicle data item cannot be unsubscribed because it is not currently subscribed.
     * @returns {String} - The enum value.
     */
    static get VDRC_DATA_NOT_SUBSCRIBED () {
        return VehicleDataResultCode._MAP.VDRC_DATA_NOT_SUBSCRIBED;
    }

    /**
     * Get the enum value for VDRC_IGNORED.
     * The request for this item is ignored because it is already in progress.
     * @returns {String} - The enum value.
     */
    static get VDRC_IGNORED () {
        return VehicleDataResultCode._MAP.VDRC_IGNORED;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return VehicleDataResultCode._valueForKey(key, VehicleDataResultCode._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return VehicleDataResultCode._keyForValue(value, VehicleDataResultCode._MAP);
    }
}

VehicleDataResultCode._MAP = Object.freeze({
    'VDRC_SUCCESS': 'SUCCESS',
    'VDRC_TRUNCATED_DATA': 'TRUNCATED_DATA',
    'VDRC_DISALLOWED': 'DISALLOWED',
    'VDRC_USER_DISALLOWED': 'USER_DISALLOWED',
    'VDRC_INVALID_ID': 'INVALID_ID',
    'VDRC_DATA_NOT_AVAILABLE': 'VEHICLE_DATA_NOT_AVAILABLE',
    'VDRC_DATA_ALREADY_SUBSCRIBED': 'DATA_ALREADY_SUBSCRIBED',
    'VDRC_DATA_NOT_SUBSCRIBED': 'DATA_NOT_SUBSCRIBED',
    'VDRC_IGNORED': 'IGNORED',
});

export { VehicleDataResultCode };