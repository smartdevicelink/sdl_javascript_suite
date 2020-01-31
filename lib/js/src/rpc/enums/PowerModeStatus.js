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
 * Reflects the status of the current power mode.
 * @typedef {Enum} PowerModeStatus
 * @property {Object} _MAP
 */
class PowerModeStatus extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get KEY_OUT () {
        return PowerModeStatus._MAP.KEY_OUT;
    }

    /**
     * @return {String}
     */
    static get KEY_RECENTLY_OUT () {
        return PowerModeStatus._MAP.KEY_RECENTLY_OUT;
    }

    /**
     * @return {String}
     */
    static get KEY_APPROVED_0 () {
        return PowerModeStatus._MAP.KEY_APPROVED_0;
    }

    /**
     * @return {String}
     */
    static get POST_ACCESORY_0 () {
        return PowerModeStatus._MAP.POST_ACCESORY_0;
    }

    /**
     * @return {String}
     */
    static get ACCESORY_1 () {
        return PowerModeStatus._MAP.ACCESORY_1;
    }

    /**
     * @return {String}
     */
    static get POST_IGNITION_1 () {
        return PowerModeStatus._MAP.POST_IGNITION_1;
    }

    /**
     * @return {String}
     */
    static get IGNITION_ON_2 () {
        return PowerModeStatus._MAP.IGNITION_ON_2;
    }

    /**
     * @return {String}
     */
    static get RUNNING_2 () {
        return PowerModeStatus._MAP.RUNNING_2;
    }

    /**
     * @return {String}
     */
    static get CRANK_3 () {
        return PowerModeStatus._MAP.CRANK_3;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PowerModeStatus._valueForKey(key, PowerModeStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PowerModeStatus._keyForValue(value, PowerModeStatus._MAP);
    }
}

PowerModeStatus._MAP = Object.freeze({
    'KEY_OUT': 'KEY_OUT',
    'KEY_RECENTLY_OUT': 'KEY_RECENTLY_OUT',
    'KEY_APPROVED_0': 'KEY_APPROVED_0',
    'POST_ACCESORY_0': 'POST_ACCESORY_0',
    'ACCESORY_1': 'ACCESORY_1',
    'POST_IGNITION_1': 'POST_IGNITION_1',
    'IGNITION_ON_2': 'IGNITION_ON_2',
    'RUNNING_2': 'RUNNING_2',
    'CRANK_3': 'CRANK_3',
});

export { PowerModeStatus };