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
 * Reflects the status of the ambient light sensor.
 * @typedef {Enum} AmbientLightStatus
 * @property {Object} _MAP
 */
class AmbientLightStatus extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get NIGHT () {
        return AmbientLightStatus._MAP.NIGHT;
    }

    /**
     * @return {String}
     */
    static get TWILIGHT_1 () {
        return AmbientLightStatus._MAP.TWILIGHT_1;
    }

    /**
     * @return {String}
     */
    static get TWILIGHT_2 () {
        return AmbientLightStatus._MAP.TWILIGHT_2;
    }

    /**
     * @return {String}
     */
    static get TWILIGHT_3 () {
        return AmbientLightStatus._MAP.TWILIGHT_3;
    }

    /**
     * @return {String}
     */
    static get TWILIGHT_4 () {
        return AmbientLightStatus._MAP.TWILIGHT_4;
    }

    /**
     * @return {String}
     */
    static get DAY () {
        return AmbientLightStatus._MAP.DAY;
    }

    /**
     * @return {String}
     */
    static get ALS_UNKNOWN () {
        return AmbientLightStatus._MAP.ALS_UNKNOWN;
    }

    /**
     * @return {String}
     */
    static get INVALID () {
        return AmbientLightStatus._MAP.INVALID;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return AmbientLightStatus._valueForKey(key, AmbientLightStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return AmbientLightStatus._keyForValue(value, AmbientLightStatus._MAP);
    }
}

AmbientLightStatus._MAP = Object.freeze({
    'NIGHT': 'NIGHT',
    'TWILIGHT_1': 'TWILIGHT_1',
    'TWILIGHT_2': 'TWILIGHT_2',
    'TWILIGHT_3': 'TWILIGHT_3',
    'TWILIGHT_4': 'TWILIGHT_4',
    'DAY': 'DAY',
    'ALS_UNKNOWN': 'UNKNOWN',
    'INVALID': 'INVALID',
});

export { AmbientLightStatus };