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
 * Reflects the current primary audio source (if selected).
 * @typedef {Enum} PrimaryAudioSource
 * @property {Object} _MAP
 */
class PrimaryAudioSource extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get NO_SOURCE_SELECTED () {
        return PrimaryAudioSource._MAP.NO_SOURCE_SELECTED;
    }

    /**
     * @return {String}
     */
    static get CD () {
        return PrimaryAudioSource._MAP.CD;
    }

    /**
     * @return {String}
     */
    static get USB () {
        return PrimaryAudioSource._MAP.USB;
    }

    /**
     * @return {String}
     */
    static get USB2 () {
        return PrimaryAudioSource._MAP.USB2;
    }

    /**
     * @return {String}
     */
    static get BLUETOOTH_STEREO_BTST () {
        return PrimaryAudioSource._MAP.BLUETOOTH_STEREO_BTST;
    }

    /**
     * @return {String}
     */
    static get LINE_IN () {
        return PrimaryAudioSource._MAP.LINE_IN;
    }

    /**
     * @return {String}
     */
    static get IPOD () {
        return PrimaryAudioSource._MAP.IPOD;
    }

    /**
     * @return {String}
     */
    static get MOBILE_APP () {
        return PrimaryAudioSource._MAP.MOBILE_APP;
    }

    /**
     * @return {String}
     */
    static get AM () {
        return PrimaryAudioSource._MAP.AM;
    }

    /**
     * @return {String}
     */
    static get FM () {
        return PrimaryAudioSource._MAP.FM;
    }

    /**
     * @return {String}
     */
    static get XM () {
        return PrimaryAudioSource._MAP.XM;
    }

    /**
     * @return {String}
     */
    static get DAB () {
        return PrimaryAudioSource._MAP.DAB;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PrimaryAudioSource._valueForKey(key, PrimaryAudioSource._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PrimaryAudioSource._keyForValue(value, PrimaryAudioSource._MAP);
    }
}

PrimaryAudioSource._MAP = Object.freeze({
    'NO_SOURCE_SELECTED': 'NO_SOURCE_SELECTED',
    'CD': 'CD',
    'USB': 'USB',
    'USB2': 'USB2',
    'BLUETOOTH_STEREO_BTST': 'BLUETOOTH_STEREO_BTST',
    'LINE_IN': 'LINE_IN',
    'IPOD': 'IPOD',
    'MOBILE_APP': 'MOBILE_APP',
    'AM': 'AM',
    'FM': 'FM',
    'XM': 'XM',
    'DAB': 'DAB',
});

export { PrimaryAudioSource };