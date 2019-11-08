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
 * @typedef {Enum} AppHMIType
 * @property {Object} MAP
 */
class AppHMIType extends Enum {

    static MAP = Object.freeze({
        'DEFAULT': 'DEFAULT',
        'COMMUNICATION': 'COMMUNICATION',
        'MEDIA': 'MEDIA',
        'MESSAGING': 'MESSAGING',
        'NAVIGATION': 'NAVIGATION',
        'INFORMATION': 'INFORMATION',
        'SOCIAL': 'SOCIAL',
        'BACKGROUND_PROCESS': 'BACKGROUND_PROCESS',
        'TESTING': 'TESTING',
        'SYSTEM': 'SYSTEM',
        'PROJECTION': 'PROJECTION',
        'REMOTE_CONTROL': 'REMOTE_CONTROL',
    });

    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get DEFAULT() {
        return AppHMIType.MAP.DEFAULT;
    }

    /**
     * @return {String} 
     */
    static get COMMUNICATION() {
        return AppHMIType.MAP.COMMUNICATION;
    }

    /**
     * @return {String} 
     */
    static get MEDIA() {
        return AppHMIType.MAP.MEDIA;
    }

    /**
     * @return {String} 
     */
    static get MESSAGING() {
        return AppHMIType.MAP.MESSAGING;
    }

    /**
     * @return {String} 
     */
    static get NAVIGATION() {
        return AppHMIType.MAP.NAVIGATION;
    }

    /**
     * @return {String} 
     */
    static get INFORMATION() {
        return AppHMIType.MAP.INFORMATION;
    }

    /**
     * @return {String} 
     */
    static get SOCIAL() {
        return AppHMIType.MAP.SOCIAL;
    }

    /**
     * @return {String} 
     */
    static get BACKGROUND_PROCESS() {
        return AppHMIType.MAP.BACKGROUND_PROCESS;
    }

    /**
     * @return {String} 
     */
    static get TESTING() {
        return AppHMIType.MAP.TESTING;
    }

    /**
     * @return {String} 
     */
    static get SYSTEM() {
        return AppHMIType.MAP.SYSTEM;
    }

    /**
     * @return {String} 
     */
    static get PROJECTION() {
        return AppHMIType.MAP.PROJECTION;
    }

    /**
     * @return {String} 
     */
    static get REMOTE_CONTROL() {
        return AppHMIType.MAP.REMOTE_CONTROL;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return AppHMIType.valueForStringInternal(value, AppHMIType.MAP);
    }
}

export { AppHMIType };