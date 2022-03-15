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
 * Type of transmission used in the vehicle.
 * @typedef {Enum} TransmissionType
 * @property {Object} _MAP
 */
class TransmissionType extends Enum {
    /**
     * Constructor for TransmissionType.
     * @class
     * @since SmartDeviceLink 7.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for MANUAL.
     * Manual transmission.
     * @returns {String} - The enum value.
     */
    static get MANUAL () {
        return TransmissionType._MAP.MANUAL;
    }

    /**
     * Get the enum value for AUTOMATIC.
     * Automatic transmission.
     * @returns {String} - The enum value.
     */
    static get AUTOMATIC () {
        return TransmissionType._MAP.AUTOMATIC;
    }

    /**
     * Get the enum value for SEMI_AUTOMATIC.
     * Semi automatic transmission.
     * @returns {String} - The enum value.
     */
    static get SEMI_AUTOMATIC () {
        return TransmissionType._MAP.SEMI_AUTOMATIC;
    }

    /**
     * Get the enum value for DUAL_CLUTCH.
     * Dual clutch transmission.
     * @returns {String} - The enum value.
     */
    static get DUAL_CLUTCH () {
        return TransmissionType._MAP.DUAL_CLUTCH;
    }

    /**
     * Get the enum value for CONTINUOUSLY_VARIABLE.
     * Continuously variable transmission(CVT).
     * @returns {String} - The enum value.
     */
    static get CONTINUOUSLY_VARIABLE () {
        return TransmissionType._MAP.CONTINUOUSLY_VARIABLE;
    }

    /**
     * Get the enum value for INFINITELY_VARIABLE.
     * Infinitely variable transmission.
     * @returns {String} - The enum value.
     */
    static get INFINITELY_VARIABLE () {
        return TransmissionType._MAP.INFINITELY_VARIABLE;
    }

    /**
     * Get the enum value for ELECTRIC_VARIABLE.
     * Electric variable transmission.
     * @returns {String} - The enum value.
     */
    static get ELECTRIC_VARIABLE () {
        return TransmissionType._MAP.ELECTRIC_VARIABLE;
    }

    /**
     * Get the enum value for DIRECT_DRIVE.
     * Direct drive between engine and wheels.
     * @returns {String} - The enum value.
     */
    static get DIRECT_DRIVE () {
        return TransmissionType._MAP.DIRECT_DRIVE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return TransmissionType._valueForKey(key, TransmissionType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return TransmissionType._keyForValue(value, TransmissionType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(TransmissionType._MAP);
    }
}

TransmissionType._MAP = Object.freeze({
    'MANUAL': 'MANUAL',
    'AUTOMATIC': 'AUTOMATIC',
    'SEMI_AUTOMATIC': 'SEMI_AUTOMATIC',
    'DUAL_CLUTCH': 'DUAL_CLUTCH',
    'CONTINUOUSLY_VARIABLE': 'CONTINUOUSLY_VARIABLE',
    'INFINITELY_VARIABLE': 'INFINITELY_VARIABLE',
    'ELECTRIC_VARIABLE': 'ELECTRIC_VARIABLE',
    'DIRECT_DRIVE': 'DIRECT_DRIVE',
});

export { TransmissionType };