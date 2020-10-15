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
 * Enumeration listing possible asynchronous requests.
 * @typedef {Enum} RequestType
 * @property {Object} _MAP
 */
class RequestType extends Enum {
    /**
     * Constructor for RequestType.
     * @class
     * @since SmartDeviceLink 3.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for HTTP.
     * @returns {String} - The enum value.
     */
    static get HTTP () {
        return RequestType._MAP.HTTP;
    }

    /**
     * Get the enum value for FILE_RESUME.
     * @returns {String} - The enum value.
     */
    static get FILE_RESUME () {
        return RequestType._MAP.FILE_RESUME;
    }

    /**
     * Get the enum value for AUTH_REQUEST.
     * @returns {String} - The enum value.
     */
    static get AUTH_REQUEST () {
        return RequestType._MAP.AUTH_REQUEST;
    }

    /**
     * Get the enum value for AUTH_CHALLENGE.
     * @returns {String} - The enum value.
     */
    static get AUTH_CHALLENGE () {
        return RequestType._MAP.AUTH_CHALLENGE;
    }

    /**
     * Get the enum value for AUTH_ACK.
     * @returns {String} - The enum value.
     */
    static get AUTH_ACK () {
        return RequestType._MAP.AUTH_ACK;
    }

    /**
     * Get the enum value for PROPRIETARY.
     * @returns {String} - The enum value.
     */
    static get PROPRIETARY () {
        return RequestType._MAP.PROPRIETARY;
    }

    /**
     * Get the enum value for QUERY_APPS.
     * @returns {String} - The enum value.
     */
    static get QUERY_APPS () {
        return RequestType._MAP.QUERY_APPS;
    }

    /**
     * Get the enum value for LAUNCH_APP.
     * @returns {String} - The enum value.
     */
    static get LAUNCH_APP () {
        return RequestType._MAP.LAUNCH_APP;
    }

    /**
     * Get the enum value for LOCK_SCREEN_ICON_URL.
     * @returns {String} - The enum value.
     */
    static get LOCK_SCREEN_ICON_URL () {
        return RequestType._MAP.LOCK_SCREEN_ICON_URL;
    }

    /**
     * Get the enum value for TRAFFIC_MESSAGE_CHANNEL.
     * @returns {String} - The enum value.
     */
    static get TRAFFIC_MESSAGE_CHANNEL () {
        return RequestType._MAP.TRAFFIC_MESSAGE_CHANNEL;
    }

    /**
     * Get the enum value for DRIVER_PROFILE.
     * @returns {String} - The enum value.
     */
    static get DRIVER_PROFILE () {
        return RequestType._MAP.DRIVER_PROFILE;
    }

    /**
     * Get the enum value for VOICE_SEARCH.
     * @returns {String} - The enum value.
     */
    static get VOICE_SEARCH () {
        return RequestType._MAP.VOICE_SEARCH;
    }

    /**
     * Get the enum value for NAVIGATION.
     * @returns {String} - The enum value.
     */
    static get NAVIGATION () {
        return RequestType._MAP.NAVIGATION;
    }

    /**
     * Get the enum value for PHONE.
     * @returns {String} - The enum value.
     */
    static get PHONE () {
        return RequestType._MAP.PHONE;
    }

    /**
     * Get the enum value for CLIMATE.
     * @returns {String} - The enum value.
     */
    static get CLIMATE () {
        return RequestType._MAP.CLIMATE;
    }

    /**
     * Get the enum value for SETTINGS.
     * @returns {String} - The enum value.
     */
    static get SETTINGS () {
        return RequestType._MAP.SETTINGS;
    }

    /**
     * Get the enum value for VEHICLE_DIAGNOSTICS.
     * @returns {String} - The enum value.
     */
    static get VEHICLE_DIAGNOSTICS () {
        return RequestType._MAP.VEHICLE_DIAGNOSTICS;
    }

    /**
     * Get the enum value for EMERGENCY.
     * @returns {String} - The enum value.
     */
    static get EMERGENCY () {
        return RequestType._MAP.EMERGENCY;
    }

    /**
     * Get the enum value for MEDIA.
     * @returns {String} - The enum value.
     */
    static get MEDIA () {
        return RequestType._MAP.MEDIA;
    }

    /**
     * Get the enum value for FOTA.
     * @returns {String} - The enum value.
     */
    static get FOTA () {
        return RequestType._MAP.FOTA;
    }

    /**
     * Get the enum value for OEM_SPECIFIC.
     * @since SmartDeviceLink 5.0.0
     * @returns {String} - The enum value.
     */
    static get OEM_SPECIFIC () {
        return RequestType._MAP.OEM_SPECIFIC;
    }

    /**
     * Get the enum value for ICON_URL.
     * @since SmartDeviceLink 5.1.0
     * @returns {String} - The enum value.
     */
    static get ICON_URL () {
        return RequestType._MAP.ICON_URL;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return RequestType._valueForKey(key, RequestType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return RequestType._keyForValue(value, RequestType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(RequestType._MAP);
    }
}

RequestType._MAP = Object.freeze({
    'HTTP': 'HTTP',
    'FILE_RESUME': 'FILE_RESUME',
    'AUTH_REQUEST': 'AUTH_REQUEST',
    'AUTH_CHALLENGE': 'AUTH_CHALLENGE',
    'AUTH_ACK': 'AUTH_ACK',
    'PROPRIETARY': 'PROPRIETARY',
    'QUERY_APPS': 'QUERY_APPS',
    'LAUNCH_APP': 'LAUNCH_APP',
    'LOCK_SCREEN_ICON_URL': 'LOCK_SCREEN_ICON_URL',
    'TRAFFIC_MESSAGE_CHANNEL': 'TRAFFIC_MESSAGE_CHANNEL',
    'DRIVER_PROFILE': 'DRIVER_PROFILE',
    'VOICE_SEARCH': 'VOICE_SEARCH',
    'NAVIGATION': 'NAVIGATION',
    'PHONE': 'PHONE',
    'CLIMATE': 'CLIMATE',
    'SETTINGS': 'SETTINGS',
    'VEHICLE_DIAGNOSTICS': 'VEHICLE_DIAGNOSTICS',
    'EMERGENCY': 'EMERGENCY',
    'MEDIA': 'MEDIA',
    'FOTA': 'FOTA',
    'OEM_SPECIFIC': 'OEM_SPECIFIC',
    'ICON_URL': 'ICON_URL',
});

export { RequestType };