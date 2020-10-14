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
 * Enumeration that describes possible states of turn-by-turn client or SmartDeviceLink app.
 * @typedef {Enum} TBTState
 * @property {Object} _MAP
 */
class TBTState extends Enum {
    /**
     * Constructor for TBTState.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for ROUTE_UPDATE_REQUEST.
     * @returns {String} - The enum value.
     */
    static get ROUTE_UPDATE_REQUEST () {
        return TBTState._MAP.ROUTE_UPDATE_REQUEST;
    }

    /**
     * Get the enum value for ROUTE_ACCEPTED.
     * @returns {String} - The enum value.
     */
    static get ROUTE_ACCEPTED () {
        return TBTState._MAP.ROUTE_ACCEPTED;
    }

    /**
     * Get the enum value for ROUTE_REFUSED.
     * @returns {String} - The enum value.
     */
    static get ROUTE_REFUSED () {
        return TBTState._MAP.ROUTE_REFUSED;
    }

    /**
     * Get the enum value for ROUTE_CANCELLED.
     * @returns {String} - The enum value.
     */
    static get ROUTE_CANCELLED () {
        return TBTState._MAP.ROUTE_CANCELLED;
    }

    /**
     * Get the enum value for ETA_REQUEST.
     * @returns {String} - The enum value.
     */
    static get ETA_REQUEST () {
        return TBTState._MAP.ETA_REQUEST;
    }

    /**
     * Get the enum value for NEXT_TURN_REQUEST.
     * @returns {String} - The enum value.
     */
    static get NEXT_TURN_REQUEST () {
        return TBTState._MAP.NEXT_TURN_REQUEST;
    }

    /**
     * Get the enum value for ROUTE_STATUS_REQUEST.
     * @returns {String} - The enum value.
     */
    static get ROUTE_STATUS_REQUEST () {
        return TBTState._MAP.ROUTE_STATUS_REQUEST;
    }

    /**
     * Get the enum value for ROUTE_SUMMARY_REQUEST.
     * @returns {String} - The enum value.
     */
    static get ROUTE_SUMMARY_REQUEST () {
        return TBTState._MAP.ROUTE_SUMMARY_REQUEST;
    }

    /**
     * Get the enum value for TRIP_STATUS_REQUEST.
     * @returns {String} - The enum value.
     */
    static get TRIP_STATUS_REQUEST () {
        return TBTState._MAP.TRIP_STATUS_REQUEST;
    }

    /**
     * Get the enum value for ROUTE_UPDATE_REQUEST_TIMEOUT.
     * @returns {String} - The enum value.
     */
    static get ROUTE_UPDATE_REQUEST_TIMEOUT () {
        return TBTState._MAP.ROUTE_UPDATE_REQUEST_TIMEOUT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return TBTState._valueForKey(key, TBTState._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return TBTState._keyForValue(value, TBTState._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(TBTState._MAP);
    }
}

TBTState._MAP = Object.freeze({
    'ROUTE_UPDATE_REQUEST': 'ROUTE_UPDATE_REQUEST',
    'ROUTE_ACCEPTED': 'ROUTE_ACCEPTED',
    'ROUTE_REFUSED': 'ROUTE_REFUSED',
    'ROUTE_CANCELLED': 'ROUTE_CANCELLED',
    'ETA_REQUEST': 'ETA_REQUEST',
    'NEXT_TURN_REQUEST': 'NEXT_TURN_REQUEST',
    'ROUTE_STATUS_REQUEST': 'ROUTE_STATUS_REQUEST',
    'ROUTE_SUMMARY_REQUEST': 'ROUTE_SUMMARY_REQUEST',
    'TRIP_STATUS_REQUEST': 'TRIP_STATUS_REQUEST',
    'ROUTE_UPDATE_REQUEST_TIMEOUT': 'ROUTE_UPDATE_REQUEST_TIMEOUT',
});

export { TBTState };