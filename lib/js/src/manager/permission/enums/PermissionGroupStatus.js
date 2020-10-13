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

import { Enum } from '../../../util/Enum.js';
/**
 * Enumeration of Permission Group Types for use with the Permission Manager
 * @typedef {Enum} PermissionGroupType
 * @property {Object} _MAP
 */
class PermissionGroupStatus extends Enum {
    /**
     * Initalizes an instance of PermissionGroupStatus
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Gets the enum value for ALLOWED.
     * @returns {Number} - The enum value.
     */
    static get ALLOWED () {
        return PermissionGroupStatus._MAP.ALLOWED;
    }

    /**
     * Gets the enum value for DISALLOWED.
     * @returns {Number} - The enum value.
     */
    static get DISALLOWED () {
        return PermissionGroupStatus._MAP.DISALLOWED;
    }

    /**
     * Gets the enum value for MIXED.
     * @returns {Number} - The enum value.
     */
    static get MIXED () {
        return PermissionGroupStatus._MAP.MIXED;
    }

    /**
     * Gets the enum value for UNKNOWN.
     * @returns {Number} - The enum value.
     */
    static get UNKNOWN () {
        return PermissionGroupStatus._MAP.UNKNOWN;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PermissionGroupStatus._valueForKey(key, PermissionGroupStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PermissionGroupStatus._keyForValue(value, PermissionGroupStatus._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(PermissionGroupStatus._MAP);
    }
}

PermissionGroupStatus._MAP = Object.freeze({
    'ALLOWED': 0,
    'DISALLOWED': 1,
    'MIXED': 2,
    'UNKNOWN': 3,
});

export { PermissionGroupStatus };