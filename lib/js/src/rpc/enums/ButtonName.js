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
 * Defines the hard (physical) and soft (touchscreen) buttons available from the module
 * @typedef {Enum} ButtonName
 * @property {Object} _MAP
 */
class ButtonName extends Enum {
    /**
     * Constructor for ButtonName.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for OK.
     * @returns {String} - The enum value.
     */
    static get OK () {
        return ButtonName._MAP.OK;
    }

    /**
     * Get the enum value for PLAY_PAUSE.
     * @since SmartDeviceLink 5.0.0
     * The button name for the physical Play/Pause toggle that can be used by media apps.
     * @returns {String} - The enum value.
     */
    static get PLAY_PAUSE () {
        return ButtonName._MAP.PLAY_PAUSE;
    }

    /**
     * Get the enum value for SEEKLEFT.
     * @returns {String} - The enum value.
     */
    static get SEEKLEFT () {
        return ButtonName._MAP.SEEKLEFT;
    }

    /**
     * Get the enum value for SEEKRIGHT.
     * @returns {String} - The enum value.
     */
    static get SEEKRIGHT () {
        return ButtonName._MAP.SEEKRIGHT;
    }

    /**
     * Get the enum value for TUNEUP.
     * @returns {String} - The enum value.
     */
    static get TUNEUP () {
        return ButtonName._MAP.TUNEUP;
    }

    /**
     * Get the enum value for TUNEDOWN.
     * @returns {String} - The enum value.
     */
    static get TUNEDOWN () {
        return ButtonName._MAP.TUNEDOWN;
    }

    /**
     * Get the enum value for PRESET_0.
     * @returns {String} - The enum value.
     */
    static get PRESET_0 () {
        return ButtonName._MAP.PRESET_0;
    }

    /**
     * Get the enum value for PRESET_1.
     * @returns {String} - The enum value.
     */
    static get PRESET_1 () {
        return ButtonName._MAP.PRESET_1;
    }

    /**
     * Get the enum value for PRESET_2.
     * @returns {String} - The enum value.
     */
    static get PRESET_2 () {
        return ButtonName._MAP.PRESET_2;
    }

    /**
     * Get the enum value for PRESET_3.
     * @returns {String} - The enum value.
     */
    static get PRESET_3 () {
        return ButtonName._MAP.PRESET_3;
    }

    /**
     * Get the enum value for PRESET_4.
     * @returns {String} - The enum value.
     */
    static get PRESET_4 () {
        return ButtonName._MAP.PRESET_4;
    }

    /**
     * Get the enum value for PRESET_5.
     * @returns {String} - The enum value.
     */
    static get PRESET_5 () {
        return ButtonName._MAP.PRESET_5;
    }

    /**
     * Get the enum value for PRESET_6.
     * @returns {String} - The enum value.
     */
    static get PRESET_6 () {
        return ButtonName._MAP.PRESET_6;
    }

    /**
     * Get the enum value for PRESET_7.
     * @returns {String} - The enum value.
     */
    static get PRESET_7 () {
        return ButtonName._MAP.PRESET_7;
    }

    /**
     * Get the enum value for PRESET_8.
     * @returns {String} - The enum value.
     */
    static get PRESET_8 () {
        return ButtonName._MAP.PRESET_8;
    }

    /**
     * Get the enum value for PRESET_9.
     * @returns {String} - The enum value.
     */
    static get PRESET_9 () {
        return ButtonName._MAP.PRESET_9;
    }

    /**
     * Get the enum value for CUSTOM_BUTTON.
     * @returns {String} - The enum value.
     */
    static get CUSTOM_BUTTON () {
        return ButtonName._MAP.CUSTOM_BUTTON;
    }

    /**
     * Get the enum value for SEARCH.
     * @returns {String} - The enum value.
     */
    static get SEARCH () {
        return ButtonName._MAP.SEARCH;
    }

    /**
     * Get the enum value for AC_MAX.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get AC_MAX () {
        return ButtonName._MAP.AC_MAX;
    }

    /**
     * Get the enum value for AC.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get AC () {
        return ButtonName._MAP.AC;
    }

    /**
     * Get the enum value for RECIRCULATE.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get RECIRCULATE () {
        return ButtonName._MAP.RECIRCULATE;
    }

    /**
     * Get the enum value for FAN_UP.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get FAN_UP () {
        return ButtonName._MAP.FAN_UP;
    }

    /**
     * Get the enum value for FAN_DOWN.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get FAN_DOWN () {
        return ButtonName._MAP.FAN_DOWN;
    }

    /**
     * Get the enum value for TEMP_UP.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get TEMP_UP () {
        return ButtonName._MAP.TEMP_UP;
    }

    /**
     * Get the enum value for TEMP_DOWN.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get TEMP_DOWN () {
        return ButtonName._MAP.TEMP_DOWN;
    }

    /**
     * Get the enum value for DEFROST_MAX.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get DEFROST_MAX () {
        return ButtonName._MAP.DEFROST_MAX;
    }

    /**
     * Get the enum value for DEFROST.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get DEFROST () {
        return ButtonName._MAP.DEFROST;
    }

    /**
     * Get the enum value for DEFROST_REAR.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get DEFROST_REAR () {
        return ButtonName._MAP.DEFROST_REAR;
    }

    /**
     * Get the enum value for UPPER_VENT.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get UPPER_VENT () {
        return ButtonName._MAP.UPPER_VENT;
    }

    /**
     * Get the enum value for LOWER_VENT.
     * @since SmartDeviceLink 4.5.0
     * Tied to CLIMATE RC modules.
     * @returns {String} - The enum value.
     */
    static get LOWER_VENT () {
        return ButtonName._MAP.LOWER_VENT;
    }

    /**
     * Get the enum value for VOLUME_UP.
     * @since SmartDeviceLink 4.5.0
     * Tied to RADIO RC modules.
     * @returns {String} - The enum value.
     */
    static get VOLUME_UP () {
        return ButtonName._MAP.VOLUME_UP;
    }

    /**
     * Get the enum value for VOLUME_DOWN.
     * @since SmartDeviceLink 4.5.0
     * Tied to RADIO RC modules.
     * @returns {String} - The enum value.
     */
    static get VOLUME_DOWN () {
        return ButtonName._MAP.VOLUME_DOWN;
    }

    /**
     * Get the enum value for EJECT.
     * @since SmartDeviceLink 4.5.0
     * Tied to RADIO RC modules.
     * @returns {String} - The enum value.
     */
    static get EJECT () {
        return ButtonName._MAP.EJECT;
    }

    /**
     * Get the enum value for SOURCE.
     * @since SmartDeviceLink 4.5.0
     * Tied to RADIO RC modules.
     * @returns {String} - The enum value.
     */
    static get SOURCE () {
        return ButtonName._MAP.SOURCE;
    }

    /**
     * Get the enum value for SHUFFLE.
     * @since SmartDeviceLink 4.5.0
     * Tied to RADIO RC modules.
     * @returns {String} - The enum value.
     */
    static get SHUFFLE () {
        return ButtonName._MAP.SHUFFLE;
    }

    /**
     * Get the enum value for REPEAT.
     * @since SmartDeviceLink 4.5.0
     * Tied to RADIO RC modules.
     * @returns {String} - The enum value.
     */
    static get REPEAT () {
        return ButtonName._MAP.REPEAT;
    }

    /**
     * Get the enum value for NAV_CENTER_LOCATION.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_CENTER_LOCATION () {
        return ButtonName._MAP.NAV_CENTER_LOCATION;
    }

    /**
     * Get the enum value for NAV_ZOOM_IN.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_ZOOM_IN () {
        return ButtonName._MAP.NAV_ZOOM_IN;
    }

    /**
     * Get the enum value for NAV_ZOOM_OUT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_ZOOM_OUT () {
        return ButtonName._MAP.NAV_ZOOM_OUT;
    }

    /**
     * Get the enum value for NAV_PAN_UP.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_UP () {
        return ButtonName._MAP.NAV_PAN_UP;
    }

    /**
     * Get the enum value for NAV_PAN_UP_RIGHT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_UP_RIGHT () {
        return ButtonName._MAP.NAV_PAN_UP_RIGHT;
    }

    /**
     * Get the enum value for NAV_PAN_RIGHT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_RIGHT () {
        return ButtonName._MAP.NAV_PAN_RIGHT;
    }

    /**
     * Get the enum value for NAV_PAN_DOWN_RIGHT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_DOWN_RIGHT () {
        return ButtonName._MAP.NAV_PAN_DOWN_RIGHT;
    }

    /**
     * Get the enum value for NAV_PAN_DOWN.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_DOWN () {
        return ButtonName._MAP.NAV_PAN_DOWN;
    }

    /**
     * Get the enum value for NAV_PAN_DOWN_LEFT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_DOWN_LEFT () {
        return ButtonName._MAP.NAV_PAN_DOWN_LEFT;
    }

    /**
     * Get the enum value for NAV_PAN_LEFT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_LEFT () {
        return ButtonName._MAP.NAV_PAN_LEFT;
    }

    /**
     * Get the enum value for NAV_PAN_UP_LEFT.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_PAN_UP_LEFT () {
        return ButtonName._MAP.NAV_PAN_UP_LEFT;
    }

    /**
     * Get the enum value for NAV_TILT_TOGGLE.
     * @since SmartDeviceLink 6.0.0
     * If supported, this toggles between a top-down view and an angled/3D view. If your app supports different, but substantially similar options, then you may implement those. If you don't implement these or similar options, do not subscribe to this button.
     * @returns {String} - The enum value.
     */
    static get NAV_TILT_TOGGLE () {
        return ButtonName._MAP.NAV_TILT_TOGGLE;
    }

    /**
     * Get the enum value for NAV_ROTATE_CLOCKWISE.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_ROTATE_CLOCKWISE () {
        return ButtonName._MAP.NAV_ROTATE_CLOCKWISE;
    }

    /**
     * Get the enum value for NAV_ROTATE_COUNTERCLOCKWISE.
     * @since SmartDeviceLink 6.0.0
     * @returns {String} - The enum value.
     */
    static get NAV_ROTATE_COUNTERCLOCKWISE () {
        return ButtonName._MAP.NAV_ROTATE_COUNTERCLOCKWISE;
    }

    /**
     * Get the enum value for NAV_HEADING_TOGGLE.
     * @since SmartDeviceLink 6.0.0
     * If supported, this toggles between locking the orientation to north or to the vehicle's heading. If your app supports different, but substantially similar options, then you may implement those. If you don't implement these or similar options, do not subscribe to this button.
     * @returns {String} - The enum value.
     */
    static get NAV_HEADING_TOGGLE () {
        return ButtonName._MAP.NAV_HEADING_TOGGLE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ButtonName._valueForKey(key, ButtonName._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ButtonName._keyForValue(value, ButtonName._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(ButtonName._MAP);
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