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
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * Parking
     * @return {String}
     */
    static get PARK () {
        return PRNDL._MAP.PARK;
    }

    /**
     * Reverse gear
     * @return {String}
     */
    static get REVERSE () {
        return PRNDL._MAP.REVERSE;
    }

    /**
     * No gear
     * @return {String}
     */
    static get NEUTRAL () {
        return PRNDL._MAP.NEUTRAL;
    }

    /**
     * @return {String}
     */
    static get DRIVE () {
        return PRNDL._MAP.DRIVE;
    }

    /**
     * Drive Sport mode
     * @return {String}
     */
    static get SPORT () {
        return PRNDL._MAP.SPORT;
    }

    /**
     * 1st gear hold
     * @return {String}
     */
    static get LOWGEAR () {
        return PRNDL._MAP.LOWGEAR;
    }

    /**
     * @return {String}
     */
    static get FIRST () {
        return PRNDL._MAP.FIRST;
    }

    /**
     * @return {String}
     */
    static get SECOND () {
        return PRNDL._MAP.SECOND;
    }

    /**
     * @return {String}
     */
    static get THIRD () {
        return PRNDL._MAP.THIRD;
    }

    /**
     * @return {String}
     */
    static get FOURTH () {
        return PRNDL._MAP.FOURTH;
    }

    /**
     * @return {String}
     */
    static get FIFTH () {
        return PRNDL._MAP.FIFTH;
    }

    /**
     * @return {String}
     */
    static get SIXTH () {
        return PRNDL._MAP.SIXTH;
    }

    /**
     * @return {String}
     */
    static get SEVENTH () {
        return PRNDL._MAP.SEVENTH;
    }

    /**
     * @return {String}
     */
    static get EIGHTH () {
        return PRNDL._MAP.EIGHTH;
    }

    /**
     * @return {String}
     */
    static get UNKNOWN () {
        return PRNDL._MAP.UNKNOWN;
    }

    /**
     * @return {String}
     */
    static get FAULT () {
        return PRNDL._MAP.FAULT;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PRNDL._valueForKey(key, PRNDL._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
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