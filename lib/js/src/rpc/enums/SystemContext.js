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
 * @typedef {Enum} SystemContext
 * @property {Object} _MAP
 */
class SystemContext extends Enum {

    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get SYSCTXT_MAIN() {
        return SystemContext._MAP.SYSCTXT_MAIN;
    }

    /**
     * @return {String} 
     */
    static get SYSCTXT_VRSESSION() {
        return SystemContext._MAP.SYSCTXT_VRSESSION;
    }

    /**
     * @return {String} 
     */
    static get SYSCTXT_MENU() {
        return SystemContext._MAP.SYSCTXT_MENU;
    }

    /**
     * @return {String} 
     */
    static get SYSCTXT_HMI_OBSCURED() {
        return SystemContext._MAP.SYSCTXT_HMI_OBSCURED;
    }

    /**
     * @return {String} 
     */
    static get SYSCTXT_ALERT() {
        return SystemContext._MAP.SYSCTXT_ALERT;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return SystemContext.valueForStringInternal(value, SystemContext._MAP);
    }
}

SystemContext._MAP = Object.freeze({
    'SYSCTXT_MAIN': 'MAIN',
    'SYSCTXT_VRSESSION': 'VRSESSION',
    'SYSCTXT_MENU': 'MENU',
    'SYSCTXT_HMI_OBSCURED': 'HMI_OBSCURED',
    'SYSCTXT_ALERT': 'ALERT',

});

export { SystemContext };