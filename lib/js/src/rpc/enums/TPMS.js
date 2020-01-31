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
 * @typedef {Enum} TPMS
 * @property {Object} _MAP
 */
class TPMS extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * If set the status of the tire is not known.
     * @return {String}
     */
    static get UNKNOWN () {
        return TPMS._MAP.UNKNOWN;
    }

    /**
     * TPMS does not function.
     * @return {String}
     */
    static get SYSTEM_FAULT () {
        return TPMS._MAP.SYSTEM_FAULT;
    }

    /**
     * The sensor of the tire does not function.
     * @return {String}
     */
    static get SENSOR_FAULT () {
        return TPMS._MAP.SENSOR_FAULT;
    }

    /**
     * TPMS is reporting a low tire pressure for the tire.
     * @return {String}
     */
    static get LOW () {
        return TPMS._MAP.LOW;
    }

    /**
     * TPMS is active and the tire pressure is monitored.
     * @return {String}
     */
    static get SYSTEM_ACTIVE () {
        return TPMS._MAP.SYSTEM_ACTIVE;
    }

    /**
     * TPMS is reporting that the tire must be trained.
     * @return {String}
     */
    static get TRAIN () {
        return TPMS._MAP.TRAIN;
    }

    /**
     * TPMS reports the training for the tire is completed.
     * @return {String}
     */
    static get TRAINING_COMPLETE () {
        return TPMS._MAP.TRAINING_COMPLETE;
    }

    /**
     * TPMS reports the tire is not trained.
     * @return {String}
     */
    static get NOT_TRAINED () {
        return TPMS._MAP.NOT_TRAINED;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return TPMS._valueForKey(key, TPMS._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return TPMS._keyForValue(value, TPMS._MAP);
    }
}

TPMS._MAP = Object.freeze({
    'UNKNOWN': 'UNKNOWN',
    'SYSTEM_FAULT': 'SYSTEM_FAULT',
    'SENSOR_FAULT': 'SENSOR_FAULT',
    'LOW': 'LOW',
    'SYSTEM_ACTIVE': 'SYSTEM_ACTIVE',
    'TRAIN': 'TRAIN',
    'TRAINING_COMPLETE': 'TRAINING_COMPLETE',
    'NOT_TRAINED': 'NOT_TRAINED',
});

export { TPMS };