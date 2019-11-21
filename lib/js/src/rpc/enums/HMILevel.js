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
 * @typedef {Enum} HMILevel
 * @property {Object} _MAP
 */
class HMILevel extends Enum {

    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get HMI_FULL() {
        return HMILevel._MAP.HMI_FULL;
    }

    /**
     * @return {String} 
     */
    static get HMI_LIMITED() {
        return HMILevel._MAP.HMI_LIMITED;
    }

    /**
     * @return {String} 
     */
    static get HMI_BACKGROUND() {
        return HMILevel._MAP.HMI_BACKGROUND;
    }

    /**
     * @return {String} 
     */
    static get HMI_NONE() {
        return HMILevel._MAP.HMI_NONE;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return HMILevel.valueForStringInternal(value, HMILevel._MAP);
    }
}

HMILevel._MAP = Object.freeze({
    'HMI_FULL': 'FULL',
    'HMI_LIMITED': 'LIMITED',
    'HMI_BACKGROUND': 'BACKGROUND',
    'HMI_NONE': 'NONE',

});

export { HMILevel };