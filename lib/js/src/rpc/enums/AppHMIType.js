/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
 * Enumeration listing possible app types.
 * @typedef {Enum} AppHMIType
 * @property {Object} _MAP
 */
class AppHMIType extends Enum {
    /**
     * Constructor for AppHMIType.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for DEFAULT.
     * @returns {String} - The enum value.
     */
    static get DEFAULT () {
        return AppHMIType._MAP.DEFAULT;
    }

    /**
     * Get the enum value for COMMUNICATION.
     * @returns {String} - The enum value.
     */
    static get COMMUNICATION () {
        return AppHMIType._MAP.COMMUNICATION;
    }

    /**
     * Get the enum value for MEDIA.
     * @returns {String} - The enum value.
     */
    static get MEDIA () {
        return AppHMIType._MAP.MEDIA;
    }

    /**
     * Get the enum value for MESSAGING.
     * @returns {String} - The enum value.
     */
    static get MESSAGING () {
        return AppHMIType._MAP.MESSAGING;
    }

    /**
     * Get the enum value for NAVIGATION.
     * @returns {String} - The enum value.
     */
    static get NAVIGATION () {
        return AppHMIType._MAP.NAVIGATION;
    }

    /**
     * Get the enum value for INFORMATION.
     * @returns {String} - The enum value.
     */
    static get INFORMATION () {
        return AppHMIType._MAP.INFORMATION;
    }

    /**
     * Get the enum value for SOCIAL.
     * @returns {String} - The enum value.
     */
    static get SOCIAL () {
        return AppHMIType._MAP.SOCIAL;
    }

    /**
     * Get the enum value for BACKGROUND_PROCESS.
     * @returns {String} - The enum value.
     */
    static get BACKGROUND_PROCESS () {
        return AppHMIType._MAP.BACKGROUND_PROCESS;
    }

    /**
     * Get the enum value for TESTING.
     * @returns {String} - The enum value.
     */
    static get TESTING () {
        return AppHMIType._MAP.TESTING;
    }

    /**
     * Get the enum value for SYSTEM.
     * @returns {String} - The enum value.
     */
    static get SYSTEM () {
        return AppHMIType._MAP.SYSTEM;
    }

    /**
     * Get the enum value for PROJECTION.
     * @since SmartDeviceLink 4.5.0
     * @returns {String} - The enum value.
     */
    static get PROJECTION () {
        return AppHMIType._MAP.PROJECTION;
    }

    /**
     * Get the enum value for REMOTE_CONTROL.
     * @since SmartDeviceLink 4.5.0
     * @returns {String} - The enum value.
     */
    static get REMOTE_CONTROL () {
        return AppHMIType._MAP.REMOTE_CONTROL;
    }

    /**
     * Get the enum value for WEB_VIEW.
     * @since SmartDeviceLink 7.0.0
     * @returns {String} - The enum value.
     */
    static get WEB_VIEW () {
        return AppHMIType._MAP.WEB_VIEW;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return AppHMIType._valueForKey(key, AppHMIType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return AppHMIType._keyForValue(value, AppHMIType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(AppHMIType._MAP);
    }
}

AppHMIType._MAP = Object.freeze({
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
    'WEB_VIEW': 'WEB_VIEW',
});

export { AppHMIType };