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
 * Enumerations of all available system capability types
 * @typedef {Enum} SystemCapabilityType
 * @property {Object} _MAP
 */
class SystemCapabilityType extends Enum {
    /**
     * Constructor for SystemCapabilityType.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for NAVIGATION.
     * @returns {String} - The enum value.
     */
    static get NAVIGATION () {
        return SystemCapabilityType._MAP.NAVIGATION;
    }

    /**
     * Get the enum value for PHONE_CALL.
     * @returns {String} - The enum value.
     */
    static get PHONE_CALL () {
        return SystemCapabilityType._MAP.PHONE_CALL;
    }

    /**
     * Get the enum value for VIDEO_STREAMING.
     * @returns {String} - The enum value.
     */
    static get VIDEO_STREAMING () {
        return SystemCapabilityType._MAP.VIDEO_STREAMING;
    }

    /**
     * Get the enum value for REMOTE_CONTROL.
     * @returns {String} - The enum value.
     */
    static get REMOTE_CONTROL () {
        return SystemCapabilityType._MAP.REMOTE_CONTROL;
    }

    /**
     * Get the enum value for APP_SERVICES.
     * @returns {String} - The enum value.
     */
    static get APP_SERVICES () {
        return SystemCapabilityType._MAP.APP_SERVICES;
    }

    /**
     * Get the enum value for SEAT_LOCATION.
     * @returns {String} - The enum value.
     */
    static get SEAT_LOCATION () {
        return SystemCapabilityType._MAP.SEAT_LOCATION;
    }

    /**
     * Get the enum value for DISPLAYS.
     * @returns {String} - The enum value.
     */
    static get DISPLAYS () {
        return SystemCapabilityType._MAP.DISPLAYS;
    }

    /**
     * Get the enum value for DRIVER_DISTRACTION.
     * @returns {String} - The enum value.
     */
    static get DRIVER_DISTRACTION () {
        return SystemCapabilityType._MAP.DRIVER_DISTRACTION;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return SystemCapabilityType._valueForKey(key, SystemCapabilityType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return SystemCapabilityType._keyForValue(value, SystemCapabilityType._MAP);
    }
}

SystemCapabilityType._MAP = Object.freeze({
    'NAVIGATION': 'NAVIGATION',
    'PHONE_CALL': 'PHONE_CALL',
    'VIDEO_STREAMING': 'VIDEO_STREAMING',
    'REMOTE_CONTROL': 'REMOTE_CONTROL',
    'APP_SERVICES': 'APP_SERVICES',
    'SEAT_LOCATION': 'SEAT_LOCATION',
    'DISPLAYS': 'DISPLAYS',
    'DRIVER_DISTRACTION': 'DRIVER_DISTRACTION',
});

export { SystemCapabilityType };