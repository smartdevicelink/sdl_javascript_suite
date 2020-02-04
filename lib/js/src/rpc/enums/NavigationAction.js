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
 * @typedef {Enum} NavigationAction
 * @property {Object} _MAP
 */
class NavigationAction extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * Using this action plus a supplied direction can give the type of turn.
     * @return {String}
     */
    static get TURN () {
        return NavigationAction._MAP.TURN;
    }

    /**
     * @return {String}
     */
    static get EXIT () {
        return NavigationAction._MAP.EXIT;
    }

    /**
     * @return {String}
     */
    static get STAY () {
        return NavigationAction._MAP.STAY;
    }

    /**
     * @return {String}
     */
    static get MERGE () {
        return NavigationAction._MAP.MERGE;
    }

    /**
     * @return {String}
     */
    static get FERRY () {
        return NavigationAction._MAP.FERRY;
    }

    /**
     * @return {String}
     */
    static get CAR_SHUTTLE_TRAIN () {
        return NavigationAction._MAP.CAR_SHUTTLE_TRAIN;
    }

    /**
     * @return {String}
     */
    static get WAYPOINT () {
        return NavigationAction._MAP.WAYPOINT;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return NavigationAction._valueForKey(key, NavigationAction._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return NavigationAction._keyForValue(value, NavigationAction._MAP);
    }
}

NavigationAction._MAP = Object.freeze({
    'TURN': 'TURN',
    'EXIT': 'EXIT',
    'STAY': 'STAY',
    'MERGE': 'MERGE',
    'FERRY': 'FERRY',
    'CAR_SHUTTLE_TRAIN': 'CAR_SHUTTLE_TRAIN',
    'WAYPOINT': 'WAYPOINT',
});

export { NavigationAction };