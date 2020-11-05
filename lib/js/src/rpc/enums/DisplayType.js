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
 * See DAES for further infos regarding the displays
 * @typedef {Enum} DisplayType
 * @property {Object} _MAP
 */
class DisplayType extends Enum {
    /**
     * Constructor for DisplayType.
     * @class
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 5.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for CID.
     * @returns {String} - The enum value.
     */
    static get CID () {
        return DisplayType._MAP.CID;
    }

    /**
     * Get the enum value for TYPE2.
     * @returns {String} - The enum value.
     */
    static get TYPE2 () {
        return DisplayType._MAP.TYPE2;
    }

    /**
     * Get the enum value for TYPE5.
     * @returns {String} - The enum value.
     */
    static get TYPE5 () {
        return DisplayType._MAP.TYPE5;
    }

    /**
     * Get the enum value for NGN.
     * @returns {String} - The enum value.
     */
    static get NGN () {
        return DisplayType._MAP.NGN;
    }

    /**
     * Get the enum value for GEN2_8_DMA.
     * @since SmartDeviceLink 3.0.0
     * @returns {String} - The enum value.
     */
    static get GEN2_8_DMA () {
        return DisplayType._MAP.GEN2_8_DMA;
    }

    /**
     * Get the enum value for GEN2_6_DMA.
     * @since SmartDeviceLink 3.0.0
     * @returns {String} - The enum value.
     */
    static get GEN2_6_DMA () {
        return DisplayType._MAP.GEN2_6_DMA;
    }

    /**
     * Get the enum value for MFD3.
     * @since SmartDeviceLink 2.0.0
     * @returns {String} - The enum value.
     */
    static get MFD3 () {
        return DisplayType._MAP.MFD3;
    }

    /**
     * Get the enum value for MFD4.
     * @since SmartDeviceLink 2.0.0
     * @returns {String} - The enum value.
     */
    static get MFD4 () {
        return DisplayType._MAP.MFD4;
    }

    /**
     * Get the enum value for MFD5.
     * @since SmartDeviceLink 2.0.0
     * @returns {String} - The enum value.
     */
    static get MFD5 () {
        return DisplayType._MAP.MFD5;
    }

    /**
     * Get the enum value for GEN3_8_INCH.
     * @since SmartDeviceLink 3.0.0
     * @returns {String} - The enum value.
     */
    static get GEN3_8_INCH () {
        return DisplayType._MAP.GEN3_8_INCH;
    }

    /**
     * Get the enum value for SDL_GENERIC.
     * @since SmartDeviceLink 4.0.0
     * @returns {String} - The enum value.
     */
    static get SDL_GENERIC () {
        return DisplayType._MAP.SDL_GENERIC;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return DisplayType._valueForKey(key, DisplayType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return DisplayType._keyForValue(value, DisplayType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(DisplayType._MAP);
    }
}

DisplayType._MAP = Object.freeze({
    'CID': 'CID',
    'TYPE2': 'TYPE2',
    'TYPE5': 'TYPE5',
    'NGN': 'NGN',
    'GEN2_8_DMA': 'GEN2_8_DMA',
    'GEN2_6_DMA': 'GEN2_6_DMA',
    'MFD3': 'MFD3',
    'MFD4': 'MFD4',
    'MFD5': 'MFD5',
    'GEN3_8_INCH': 'GEN3_8-INCH',
    'SDL_GENERIC': 'SDL_GENERIC',
});

export { DisplayType };