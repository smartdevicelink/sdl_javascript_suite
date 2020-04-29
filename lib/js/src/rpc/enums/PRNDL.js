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
 * The selected gear.
 * @typedef {Enum} PRNDL
 * @property {Object} _MAP
 */
class PRNDL extends Enum {
    /**
     * Constructor for PRNDL.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for PARK.
     * Parking
     * @returns {String} - The enum value.
     */
    static get PARK () {
        return PRNDL._MAP.PARK;
    }

    /**
     * Get the enum value for REVERSE.
     * Reverse gear
     * @returns {String} - The enum value.
     */
    static get REVERSE () {
        return PRNDL._MAP.REVERSE;
    }

    /**
     * Get the enum value for NEUTRAL.
     * No gear
     * @returns {String} - The enum value.
     */
    static get NEUTRAL () {
        return PRNDL._MAP.NEUTRAL;
    }

    /**
     * Get the enum value for DRIVE.
     * @returns {String} - The enum value.
     */
    static get DRIVE () {
        return PRNDL._MAP.DRIVE;
    }

    /**
     * Get the enum value for SPORT.
     * Drive Sport mode
     * @returns {String} - The enum value.
     */
    static get SPORT () {
        return PRNDL._MAP.SPORT;
    }

    /**
     * Get the enum value for LOWGEAR.
     * 1st gear hold
     * @returns {String} - The enum value.
     */
    static get LOWGEAR () {
        return PRNDL._MAP.LOWGEAR;
    }

    /**
     * Get the enum value for FIRST.
     * @returns {String} - The enum value.
     */
    static get FIRST () {
        return PRNDL._MAP.FIRST;
    }

    /**
     * Get the enum value for SECOND.
     * @returns {String} - The enum value.
     */
    static get SECOND () {
        return PRNDL._MAP.SECOND;
    }

    /**
     * Get the enum value for THIRD.
     * @returns {String} - The enum value.
     */
    static get THIRD () {
        return PRNDL._MAP.THIRD;
    }

    /**
     * Get the enum value for FOURTH.
     * @returns {String} - The enum value.
     */
    static get FOURTH () {
        return PRNDL._MAP.FOURTH;
    }

    /**
     * Get the enum value for FIFTH.
     * @returns {String} - The enum value.
     */
    static get FIFTH () {
        return PRNDL._MAP.FIFTH;
    }

    /**
     * Get the enum value for SIXTH.
     * @returns {String} - The enum value.
     */
    static get SIXTH () {
        return PRNDL._MAP.SIXTH;
    }

    /**
     * Get the enum value for SEVENTH.
     * @returns {String} - The enum value.
     */
    static get SEVENTH () {
        return PRNDL._MAP.SEVENTH;
    }

    /**
     * Get the enum value for EIGHTH.
     * @returns {String} - The enum value.
     */
    static get EIGHTH () {
        return PRNDL._MAP.EIGHTH;
    }

    /**
     * Get the enum value for UNKNOWN.
     * @returns {String} - The enum value.
     */
    static get UNKNOWN () {
        return PRNDL._MAP.UNKNOWN;
    }

    /**
     * Get the enum value for FAULT.
     * @returns {String} - The enum value.
     */
    static get FAULT () {
        return PRNDL._MAP.FAULT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PRNDL._valueForKey(key, PRNDL._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PRNDL._keyForValue(value, PRNDL._MAP);
    }
}

PRNDL._MAP = Object.freeze({
    'PARK': 'PARK',
    'REVERSE': 'REVERSE',
    'NEUTRAL': 'NEUTRAL',
    'DRIVE': 'DRIVE',
    'SPORT': 'SPORT',
    'LOWGEAR': 'LOWGEAR',
    'FIRST': 'FIRST',
    'SECOND': 'SECOND',
    'THIRD': 'THIRD',
    'FOURTH': 'FOURTH',
    'FIFTH': 'FIFTH',
    'SIXTH': 'SIXTH',
    'SEVENTH': 'SEVENTH',
    'EIGHTH': 'EIGHTH',
    'UNKNOWN': 'UNKNOWN',
    'FAULT': 'FAULT',
});

export { PRNDL };