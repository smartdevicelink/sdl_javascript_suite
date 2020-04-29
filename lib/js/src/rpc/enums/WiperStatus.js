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
 * Reflects the status of the wipers.
 * @typedef {Enum} WiperStatus
 * @property {Object} _MAP
 */
class WiperStatus extends Enum {
    /**
     * Constructor for WiperStatus.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for OFF.
     * @returns {String} - The enum value.
     */
    static get OFF () {
        return WiperStatus._MAP.OFF;
    }

    /**
     * Get the enum value for AUTO_OFF.
     * @returns {String} - The enum value.
     */
    static get AUTO_OFF () {
        return WiperStatus._MAP.AUTO_OFF;
    }

    /**
     * Get the enum value for OFF_MOVING.
     * @returns {String} - The enum value.
     */
    static get OFF_MOVING () {
        return WiperStatus._MAP.OFF_MOVING;
    }

    /**
     * Get the enum value for MAN_INT_OFF.
     * @returns {String} - The enum value.
     */
    static get MAN_INT_OFF () {
        return WiperStatus._MAP.MAN_INT_OFF;
    }

    /**
     * Get the enum value for MAN_INT_ON.
     * @returns {String} - The enum value.
     */
    static get MAN_INT_ON () {
        return WiperStatus._MAP.MAN_INT_ON;
    }

    /**
     * Get the enum value for MAN_LOW.
     * @returns {String} - The enum value.
     */
    static get MAN_LOW () {
        return WiperStatus._MAP.MAN_LOW;
    }

    /**
     * Get the enum value for MAN_HIGH.
     * @returns {String} - The enum value.
     */
    static get MAN_HIGH () {
        return WiperStatus._MAP.MAN_HIGH;
    }

    /**
     * Get the enum value for MAN_FLICK.
     * @returns {String} - The enum value.
     */
    static get MAN_FLICK () {
        return WiperStatus._MAP.MAN_FLICK;
    }

    /**
     * Get the enum value for WASH.
     * @returns {String} - The enum value.
     */
    static get WASH () {
        return WiperStatus._MAP.WASH;
    }

    /**
     * Get the enum value for AUTO_LOW.
     * @returns {String} - The enum value.
     */
    static get AUTO_LOW () {
        return WiperStatus._MAP.AUTO_LOW;
    }

    /**
     * Get the enum value for AUTO_HIGH.
     * @returns {String} - The enum value.
     */
    static get AUTO_HIGH () {
        return WiperStatus._MAP.AUTO_HIGH;
    }

    /**
     * Get the enum value for COURTESYWIPE.
     * @returns {String} - The enum value.
     */
    static get COURTESYWIPE () {
        return WiperStatus._MAP.COURTESYWIPE;
    }

    /**
     * Get the enum value for AUTO_ADJUST.
     * @returns {String} - The enum value.
     */
    static get AUTO_ADJUST () {
        return WiperStatus._MAP.AUTO_ADJUST;
    }

    /**
     * Get the enum value for STALLED.
     * @returns {String} - The enum value.
     */
    static get STALLED () {
        return WiperStatus._MAP.STALLED;
    }

    /**
     * Get the enum value for NO_DATA_EXISTS.
     * @returns {String} - The enum value.
     */
    static get NO_DATA_EXISTS () {
        return WiperStatus._MAP.NO_DATA_EXISTS;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return WiperStatus._valueForKey(key, WiperStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return WiperStatus._keyForValue(value, WiperStatus._MAP);
    }
}

WiperStatus._MAP = Object.freeze({
    'OFF': 'OFF',
    'AUTO_OFF': 'AUTO_OFF',
    'OFF_MOVING': 'OFF_MOVING',
    'MAN_INT_OFF': 'MAN_INT_OFF',
    'MAN_INT_ON': 'MAN_INT_ON',
    'MAN_LOW': 'MAN_LOW',
    'MAN_HIGH': 'MAN_HIGH',
    'MAN_FLICK': 'MAN_FLICK',
    'WASH': 'WASH',
    'AUTO_LOW': 'AUTO_LOW',
    'AUTO_HIGH': 'AUTO_HIGH',
    'COURTESYWIPE': 'COURTESYWIPE',
    'AUTO_ADJUST': 'AUTO_ADJUST',
    'STALLED': 'STALLED',
    'NO_DATA_EXISTS': 'NO_DATA_EXISTS',
});

export { WiperStatus };