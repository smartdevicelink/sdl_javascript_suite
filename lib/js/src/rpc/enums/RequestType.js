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
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get HTTP () {
        return RequestType._MAP.HTTP;
    }

    /**
     * @return {String}
     */
    static get FILE_RESUME () {
        return RequestType._MAP.FILE_RESUME;
    }

    /**
     * @return {String}
     */
    static get AUTH_REQUEST () {
        return RequestType._MAP.AUTH_REQUEST;
    }

    /**
     * @return {String}
     */
    static get AUTH_CHALLENGE () {
        return RequestType._MAP.AUTH_CHALLENGE;
    }

    /**
     * @return {String}
     */
    static get AUTH_ACK () {
        return RequestType._MAP.AUTH_ACK;
    }

    /**
     * @return {String}
     */
    static get PROPRIETARY () {
        return RequestType._MAP.PROPRIETARY;
    }

    /**
     * @return {String}
     */
    static get QUERY_APPS () {
        return RequestType._MAP.QUERY_APPS;
    }

    /**
     * @return {String}
     */
    static get LAUNCH_APP () {
        return RequestType._MAP.LAUNCH_APP;
    }

    /**
     * @return {String}
     */
    static get LOCK_SCREEN_ICON_URL () {
        return RequestType._MAP.LOCK_SCREEN_ICON_URL;
    }

    /**
     * @return {String}
     */
    static get TRAFFIC_MESSAGE_CHANNEL () {
        return RequestType._MAP.TRAFFIC_MESSAGE_CHANNEL;
    }

    /**
     * @return {String}
     */
    static get DRIVER_PROFILE () {
        return RequestType._MAP.DRIVER_PROFILE;
    }

    /**
     * @return {String}
     */
    static get VOICE_SEARCH () {
        return RequestType._MAP.VOICE_SEARCH;
    }

    /**
     * @return {String}
     */
    static get NAVIGATION () {
        return RequestType._MAP.NAVIGATION;
    }

    /**
     * @return {String}
     */
    static get PHONE () {
        return RequestType._MAP.PHONE;
    }

    /**
     * @return {String}
     */
    static get CLIMATE () {
        return RequestType._MAP.CLIMATE;
    }

    /**
     * @return {String}
     */
    static get SETTINGS () {
        return RequestType._MAP.SETTINGS;
    }

    /**
     * @return {String}
     */
    static get VEHICLE_DIAGNOSTICS () {
        return RequestType._MAP.VEHICLE_DIAGNOSTICS;
    }

    /**
     * @return {String}
     */
    static get EMERGENCY () {
        return RequestType._MAP.EMERGENCY;
    }

    /**
     * @return {String}
     */
    static get MEDIA () {
        return RequestType._MAP.MEDIA;
    }

    /**
     * @return {String}
     */
    static get FOTA () {
        return RequestType._MAP.FOTA;
    }

    /**
     * @return {String}
     */
    static get OEM_SPECIFIC () {
        return RequestType._MAP.OEM_SPECIFIC;
    }

    /**
     * @return {String}
     */
    static get ICON_URL () {
        return RequestType._MAP.ICON_URL;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return RequestType._valueForKey(key, RequestType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return RequestType._keyForValue(value, RequestType._MAP);
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