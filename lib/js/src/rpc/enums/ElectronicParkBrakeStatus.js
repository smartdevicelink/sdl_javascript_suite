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
 * @typedef {Enum} ElectronicParkBrakeStatus
 * @property {Object} _MAP
 */
class ElectronicParkBrakeStatus extends Enum {
    /**
     * Constructor for ElectronicParkBrakeStatus.
     * @class
     * @since SmartDeviceLink 5.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for CLOSED.
     * Park brake actuators have been fully applied.
     * @returns {String} - The enum value.
     */
    static get CLOSED () {
        return ElectronicParkBrakeStatus._MAP.CLOSED;
    }

    /**
     * Get the enum value for TRANSITION.
     * Park brake actuators are transitioning to either Apply/Closed or Release/Open state.
     * @returns {String} - The enum value.
     */
    static get TRANSITION () {
        return ElectronicParkBrakeStatus._MAP.TRANSITION;
    }

    /**
     * Get the enum value for OPEN.
     * Park brake actuators are released.
     * @returns {String} - The enum value.
     */
    static get OPEN () {
        return ElectronicParkBrakeStatus._MAP.OPEN;
    }

    /**
     * Get the enum value for DRIVE_ACTIVE.
     * When driver pulls the Electronic Park Brake switch while driving "at speed".
     * @returns {String} - The enum value.
     */
    static get DRIVE_ACTIVE () {
        return ElectronicParkBrakeStatus._MAP.DRIVE_ACTIVE;
    }

    /**
     * Get the enum value for FAULT.
     * When system has a fault or is under maintenance.
     * @returns {String} - The enum value.
     */
    static get FAULT () {
        return ElectronicParkBrakeStatus._MAP.FAULT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ElectronicParkBrakeStatus._valueForKey(key, ElectronicParkBrakeStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ElectronicParkBrakeStatus._keyForValue(value, ElectronicParkBrakeStatus._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(ElectronicParkBrakeStatus._MAP);
    }
}

ElectronicParkBrakeStatus._MAP = Object.freeze({
    'CLOSED': 'CLOSED',
    'TRANSITION': 'TRANSITION',
    'OPEN': 'OPEN',
    'DRIVE_ACTIVE': 'DRIVE_ACTIVE',
    'FAULT': 'FAULT',
});

export { ElectronicParkBrakeStatus };