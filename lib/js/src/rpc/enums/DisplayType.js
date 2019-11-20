/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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
 * @typedef {Enum} DisplayType
 * @property {Object} MAP
 */
class DisplayType extends Enum {

    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get CID() {
        return DisplayType.MAP.CID;
    }

    /**
     * @return {String} 
     */
    static get TYPE2() {
        return DisplayType.MAP.TYPE2;
    }

    /**
     * @return {String} 
     */
    static get TYPE5() {
        return DisplayType.MAP.TYPE5;
    }

    /**
     * @return {String} 
     */
    static get NGN() {
        return DisplayType.MAP.NGN;
    }

    /**
     * @return {String} 
     */
    static get GEN2_8_DMA() {
        return DisplayType.MAP.GEN2_8_DMA;
    }

    /**
     * @return {String} 
     */
    static get GEN2_6_DMA() {
        return DisplayType.MAP.GEN2_6_DMA;
    }

    /**
     * @return {String} 
     */
    static get MFD3() {
        return DisplayType.MAP.MFD3;
    }

    /**
     * @return {String} 
     */
    static get MFD4() {
        return DisplayType.MAP.MFD4;
    }

    /**
     * @return {String} 
     */
    static get MFD5() {
        return DisplayType.MAP.MFD5;
    }

    /**
     * @return {String} 
     */
    static get GEN3_8_INCH() {
        return DisplayType.MAP.GEN3_8_INCH;
    }

    /**
     * @return {String} 
     */
    static get SDL_GENERIC() {
        return DisplayType.MAP.SDL_GENERIC;
    }


    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return DisplayType.valueForStringInternal(value, DisplayType.MAP);
    }
}

DisplayType.MAP = Object.freeze({
    'CID': 'CID',
    'TYPE2': 'TYPE2',
    'TYPE5': 'TYPE5',
    'NGN': 'NGN',
    'GEN2_8_DMA': 'GEN2_8_DMA',
    'GEN2_6_DMA': 'GEN2_6_DMA',
    'MFD3': 'MFD3',
    'MFD4': 'MFD4',
    'TESTING': 'TESTING',
    'MFD5': 'MFD5',
    'GEN3_8_INCH': 'GEN3_8-INCH',
    'SDL_GENERIC': 'SDL_GENERIC',
});

export { DisplayType };