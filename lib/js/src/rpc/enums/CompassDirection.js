/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
 * The list of potential compass directions
 * @typedef {Enum} CompassDirection
 * @property {Object} _MAP
 */
class CompassDirection extends Enum {
    /**
     * Constructor for CompassDirection.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for NORTH.
     * @returns {String} - The enum value.
     */
    static get NORTH () {
        return CompassDirection._MAP.NORTH;
    }

    /**
     * Get the enum value for NORTHWEST.
     * @returns {String} - The enum value.
     */
    static get NORTHWEST () {
        return CompassDirection._MAP.NORTHWEST;
    }

    /**
     * Get the enum value for WEST.
     * @returns {String} - The enum value.
     */
    static get WEST () {
        return CompassDirection._MAP.WEST;
    }

    /**
     * Get the enum value for SOUTHWEST.
     * @returns {String} - The enum value.
     */
    static get SOUTHWEST () {
        return CompassDirection._MAP.SOUTHWEST;
    }

    /**
     * Get the enum value for SOUTH.
     * @returns {String} - The enum value.
     */
    static get SOUTH () {
        return CompassDirection._MAP.SOUTH;
    }

    /**
     * Get the enum value for SOUTHEAST.
     * @returns {String} - The enum value.
     */
    static get SOUTHEAST () {
        return CompassDirection._MAP.SOUTHEAST;
    }

    /**
     * Get the enum value for EAST.
     * @returns {String} - The enum value.
     */
    static get EAST () {
        return CompassDirection._MAP.EAST;
    }

    /**
     * Get the enum value for NORTHEAST.
     * @returns {String} - The enum value.
     */
    static get NORTHEAST () {
        return CompassDirection._MAP.NORTHEAST;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return CompassDirection._valueForKey(key, CompassDirection._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return CompassDirection._keyForValue(value, CompassDirection._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(CompassDirection._MAP);
    }
}

CompassDirection._MAP = Object.freeze({
    'NORTH': 'NORTH',
    'NORTHWEST': 'NORTHWEST',
    'WEST': 'WEST',
    'SOUTHWEST': 'SOUTHWEST',
    'SOUTH': 'SOUTH',
    'SOUTHEAST': 'SOUTHEAST',
    'EAST': 'EAST',
    'NORTHEAST': 'NORTHEAST',
});

export { CompassDirection };