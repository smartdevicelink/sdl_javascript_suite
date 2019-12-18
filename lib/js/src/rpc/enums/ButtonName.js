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
 * @typedef {Enum} ButtonName
 * @property {Object} _MAP
 */
class ButtonName extends Enum {
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get OK () {
        return ButtonName._MAP.OK;
    }

    /**
     * @return {String}
     */
    static get PLAY_PAUSE () {
        return ButtonName._MAP.PLAY_PAUSE;
    }

    /**
     * @return {String}
     */
    static get SEEKLEFT () {
        return ButtonName._MAP.SEEKLEFT;
    }

    /**
     * @return {String}
     */
    static get SEEKRIGHT () {
        return ButtonName._MAP.SEEKRIGHT;
    }

    /**
     * @return {String}
     */
    static get TUNEUP () {
        return ButtonName._MAP.TUNEUP;
    }

    /**
     * @return {String}
     */
    static get TUNEDOWN () {
        return ButtonName._MAP.TUNEDOWN;
    }

    /**
     * @return {String}
     */
    static get PRESET_0 () {
        return ButtonName._MAP.PRESET_0;
    }

    /**
     * @return {String}
     */
    static get PRESET_1 () {
        return ButtonName._MAP.PRESET_1;
    }

    /**
     * @return {String}
     */
    static get PRESET_2 () {
        return ButtonName._MAP.PRESET_2;
    }

    /**
     * @return {String}
     */
    static get PRESET_3 () {
        return ButtonName._MAP.PRESET_3;
    }

    /**
     * @return {String}
     */
    static get PRESET_4 () {
        return ButtonName._MAP.PRESET_4;
    }

    /**
     * @return {String}
     */
    static get PRESET_5 () {
        return ButtonName._MAP.PRESET_5;
    }

    /**
     * @return {String}
     */
    static get PRESET_6 () {
        return ButtonName._MAP.PRESET_6;
    }

    /**
     * @return {String}
     */
    static get PRESET_7 () {
        return ButtonName._MAP.PRESET_7;
    }

    /**
     * @return {String}
     */
    static get PRESET_8 () {
        return ButtonName._MAP.PRESET_8;
    }

    /**
     * @return {String}
     */
    static get PRESET_9 () {
        return ButtonName._MAP.PRESET_9;
    }

    /**
     * @return {String}
     */
    static get CUSTOM_BUTTON () {
        return ButtonName._MAP.CUSTOM_BUTTON;
    }

    /**
     * @return {String}
     */
    static get SEARCH () {
        return ButtonName._MAP.SEARCH;
    }

    /**
     * @return {String}
     */
    static get AC_MAX () {
        return ButtonName._MAP.AC_MAX;
    }

    /**
     * @return {String}
     */
    static get AC () {
        return ButtonName._MAP.AC;
    }

    /**
     * @return {String}
     */
    static get RECIRCULATE () {
        return ButtonName._MAP.RECIRCULATE;
    }

    /**
     * @return {String}
     */
    static get FAN_UP () {
        return ButtonName._MAP.FAN_UP;
    }

    /**
     * @return {String}
     */
    static get FAN_DOWN () {
        return ButtonName._MAP.FAN_DOWN;
    }

    /**
     * @return {String}
     */
    static get TEMP_UP () {
        return ButtonName._MAP.TEMP_UP;
    }

    /**
     * @return {String}
     */
    static get TEMP_DOWN () {
        return ButtonName._MAP.TEMP_DOWN;
    }

    /**
     * @return {String}
     */
    static get DEFROST_MAX () {
        return ButtonName._MAP.DEFROST_MAX;
    }

    /**
     * @return {String}
     */
    static get DEFROST () {
        return ButtonName._MAP.DEFROST;
    }

    /**
     * @return {String}
     */
    static get DEFROST_REAR () {
        return ButtonName._MAP.DEFROST_REAR;
    }

    /**
     * @return {String}
     */
    static get UPPER_VENT () {
        return ButtonName._MAP.UPPER_VENT;
    }

    /**
     * @return {String}
     */
    static get LOWER_VENT () {
        return ButtonName._MAP.LOWER_VENT;
    }

    /**
     * @return {String}
     */
    static get VOLUME_UP () {
        return ButtonName._MAP.VOLUME_UP;
    }

    /**
     * @return {String}
     */
    static get VOLUME_DOWN () {
        return ButtonName._MAP.VOLUME_DOWN;
    }

    /**
     * @return {String}
     */
    static get EJECT () {
        return ButtonName._MAP.EJECT;
    }

    /**
     * @return {String}
     */
    static get SOURCE () {
        return ButtonName._MAP.SOURCE;
    }

    /**
     * @return {String}
     */
    static get SHUFFLE () {
        return ButtonName._MAP.SHUFFLE;
    }

    /**
     * @return {String}
     */
    static get REPEAT () {
        return ButtonName._MAP.REPEAT;
    }

    /**
     * @return {String}
     */
    static get NAV_CENTER_LOCATION () {
        return ButtonName._MAP.NAV_CENTER_LOCATION;
    }

    /**
     * @return {String}
     */
    static get NAV_ZOOM_IN () {
        return ButtonName._MAP.NAV_ZOOM_IN;
    }

    /**
     * @return {String}
     */
    static get NAV_ZOOM_OUT () {
        return ButtonName._MAP.NAV_ZOOM_OUT;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_UP () {
        return ButtonName._MAP.NAV_PAN_UP;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_UP_RIGHT () {
        return ButtonName._MAP.NAV_PAN_UP_RIGHT;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_RIGHT () {
        return ButtonName._MAP.NAV_PAN_RIGHT;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_DOWN_RIGHT () {
        return ButtonName._MAP.NAV_PAN_DOWN_RIGHT;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_DOWN () {
        return ButtonName._MAP.NAV_PAN_DOWN;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_DOWN_LEFT () {
        return ButtonName._MAP.NAV_PAN_DOWN_LEFT;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_LEFT () {
        return ButtonName._MAP.NAV_PAN_LEFT;
    }

    /**
     * @return {String}
     */
    static get NAV_PAN_UP_LEFT () {
        return ButtonName._MAP.NAV_PAN_UP_LEFT;
    }

    /**
     * @return {String}
     */
    static get NAV_TILT_TOGGLE () {
        return ButtonName._MAP.NAV_TILT_TOGGLE;
    }

    /**
     * @return {String}
     */
    static get NAV_ROTATE_CLOCKWISE () {
        return ButtonName._MAP.NAV_ROTATE_CLOCKWISE;
    }

    /**
     * @return {String}
     */
    static get NAV_ROTATE_COUNTERCLOCKWISE () {
        return ButtonName._MAP.NAV_ROTATE_COUNTERCLOCKWISE;
    }

    /**
     * @return {String}
     */
    static get NAV_HEADING_TOGGLE () {
        return ButtonName._MAP.NAV_HEADING_TOGGLE;
    }

    /**
    * Get the value for the given enum key
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return ButtonName._valueForKey(key, ButtonName._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return ButtonName._keyForValue(value, ButtonName._MAP);
    }
}

ButtonName._MAP = Object.freeze({
    'OK': 'OK',
    'PLAY_PAUSE': 'PLAY_PAUSE',
    'SEEKLEFT': 'SEEKLEFT',
    'SEEKRIGHT': 'SEEKRIGHT',
    'TUNEUP': 'TUNEUP',
    'TUNEDOWN': 'TUNEDOWN',
    'PRESET_0': 'PRESET_0',
    'PRESET_1': 'PRESET_1',
    'PRESET_2': 'PRESET_2',
    'PRESET_3': 'PRESET_3',
    'PRESET_4': 'PRESET_4',
    'PRESET_5': 'PRESET_5',
    'PRESET_6': 'PRESET_6',
    'PRESET_7': 'PRESET_7',
    'PRESET_8': 'PRESET_8',
    'PRESET_9': 'PRESET_9',
    'CUSTOM_BUTTON': 'CUSTOM_BUTTON',
    'SEARCH': 'SEARCH',
    'AC_MAX': 'AC_MAX',
    'AC': 'AC',
    'RECIRCULATE': 'RECIRCULATE',
    'FAN_UP': 'FAN_UP',
    'FAN_DOWN': 'FAN_DOWN',
    'TEMP_UP': 'TEMP_UP',
    'TEMP_DOWN': 'TEMP_DOWN',
    'DEFROST_MAX': 'DEFROST_MAX',
    'DEFROST': 'DEFROST',
    'DEFROST_REAR': 'DEFROST_REAR',
    'UPPER_VENT': 'UPPER_VENT',
    'LOWER_VENT': 'LOWER_VENT',
    'VOLUME_UP': 'VOLUME_UP',
    'VOLUME_DOWN': 'VOLUME_DOWN',
    'EJECT': 'EJECT',
    'SOURCE': 'SOURCE',
    'SHUFFLE': 'SHUFFLE',
    'REPEAT': 'REPEAT',
    'NAV_CENTER_LOCATION': 'NAV_CENTER_LOCATION',
    'NAV_ZOOM_IN': 'NAV_ZOOM_IN',
    'NAV_ZOOM_OUT': 'NAV_ZOOM_OUT',
    'NAV_PAN_UP': 'NAV_PAN_UP',
    'NAV_PAN_UP_RIGHT': 'NAV_PAN_UP_RIGHT',
    'NAV_PAN_RIGHT': 'NAV_PAN_RIGHT',
    'NAV_PAN_DOWN_RIGHT': 'NAV_PAN_DOWN_RIGHT',
    'NAV_PAN_DOWN': 'NAV_PAN_DOWN',
    'NAV_PAN_DOWN_LEFT': 'NAV_PAN_DOWN_LEFT',
    'NAV_PAN_LEFT': 'NAV_PAN_LEFT',
    'NAV_PAN_UP_LEFT': 'NAV_PAN_UP_LEFT',
    'NAV_TILT_TOGGLE': 'NAV_TILT_TOGGLE',
    'NAV_ROTATE_CLOCKWISE': 'NAV_ROTATE_CLOCKWISE',
    'NAV_ROTATE_COUNTERCLOCKWISE': 'NAV_ROTATE_COUNTERCLOCKWISE',
    'NAV_HEADING_TOGGLE': 'NAV_HEADING_TOGGLE',

});

export { ButtonName };