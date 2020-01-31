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
 * Describes how the media clock timer should behave on the platform
 * @typedef {Enum} UpdateMode
 * @property {Object} _MAP
 */
class UpdateMode extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * Starts the media clock timer counting upwards, as in time elapsed.
     * @return {String}
     */
    static get COUNTUP () {
        return UpdateMode._MAP.COUNTUP;
    }

    /**
     * Starts the media clock timer counting downwards, as in time remaining.
     * @return {String}
     */
    static get COUNTDOWN () {
        return UpdateMode._MAP.COUNTDOWN;
    }

    /**
     * Pauses the media clock timer
     * @return {String}
     */
    static get PAUSE () {
        return UpdateMode._MAP.PAUSE;
    }

    /**
     * Resume the media clock timer
     * @return {String}
     */
    static get RESUME () {
        return UpdateMode._MAP.RESUME;
    }

    /**
     * Clears the media clock timer (previously done through Show->mediaClock)
     * @return {String}
     */
    static get CLEAR () {
        return UpdateMode._MAP.CLEAR;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return UpdateMode._valueForKey(key, UpdateMode._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return UpdateMode._keyForValue(value, UpdateMode._MAP);
    }
}

UpdateMode._MAP = Object.freeze({
    'COUNTUP': 'COUNTUP',
    'COUNTDOWN': 'COUNTDOWN',
    'PAUSE': 'PAUSE',
    'RESUME': 'RESUME',
    'CLEAR': 'CLEAR',
});

export { UpdateMode };