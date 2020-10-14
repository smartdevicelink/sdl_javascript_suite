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
     * Constructor for PrimaryAudioSource.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for NO_SOURCE_SELECTED.
     * @returns {String} - The enum value.
     */
    static get NO_SOURCE_SELECTED () {
        return PrimaryAudioSource._MAP.NO_SOURCE_SELECTED;
    }

    /**
     * Get the enum value for CD.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get CD () {
        return PrimaryAudioSource._MAP.CD;
    }

    /**
     * Get the enum value for USB.
     * @returns {String} - The enum value.
     */
    static get USB () {
        return PrimaryAudioSource._MAP.USB;
    }

    /**
     * Get the enum value for USB2.
     * @returns {String} - The enum value.
     */
    static get USB2 () {
        return PrimaryAudioSource._MAP.USB2;
    }

    /**
     * Get the enum value for BLUETOOTH_STEREO_BTST.
     * @returns {String} - The enum value.
     */
    static get BLUETOOTH_STEREO_BTST () {
        return PrimaryAudioSource._MAP.BLUETOOTH_STEREO_BTST;
    }

    /**
     * Get the enum value for LINE_IN.
     * @returns {String} - The enum value.
     */
    static get LINE_IN () {
        return PrimaryAudioSource._MAP.LINE_IN;
    }

    /**
     * Get the enum value for IPOD.
     * @returns {String} - The enum value.
     */
    static get IPOD () {
        return PrimaryAudioSource._MAP.IPOD;
    }

    /**
     * Get the enum value for MOBILE_APP.
     * @returns {String} - The enum value.
     */
    static get MOBILE_APP () {
        return PrimaryAudioSource._MAP.MOBILE_APP;
    }

    /**
     * Get the enum value for AM.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get AM () {
        return PrimaryAudioSource._MAP.AM;
    }

    /**
     * Get the enum value for FM.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get FM () {
        return PrimaryAudioSource._MAP.FM;
    }

    /**
     * Get the enum value for XM.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get XM () {
        return PrimaryAudioSource._MAP.XM;
    }

    /**
     * Get the enum value for DAB.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get DAB () {
        return PrimaryAudioSource._MAP.DAB;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PrimaryAudioSource._valueForKey(key, PrimaryAudioSource._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PrimaryAudioSource._keyForValue(value, PrimaryAudioSource._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(PrimaryAudioSource._MAP);
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