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
 * @property {Object} MAP
 */
class ButtonName extends Enum {

    static MAP = Object.freeze({
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

    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get OK() {
        return ButtonName.MAP.OK;
    }

    /**
     * @return {String} 
     */
    static get PLAY_PAUSE() {
        return ButtonName.MAP.PLAY_PAUSE;
    }

    /**
     * @return {String} 
     */
    static get SEEKLEFT() {
        return ButtonName.MAP.SEEKLEFT;
    }

    /**
     * @return {String} 
     */
    static get SEEKRIGHT() {
        return ButtonName.MAP.SEEKRIGHT;
    }

    /**
     * @return {String} 
     */
    static get TUNEUP() {
        return ButtonName.MAP.TUNEUP;
    }

    /**
     * @return {String} 
     */
    static get TUNEDOWN() {
        return ButtonName.MAP.TUNEDOWN;
    }

    /**
     * @return {String} 
     */
    static get PRESET_0() {
        return ButtonName.MAP.PRESET_0;
    }

    /**
     * @return {String} 
     */
    static get PRESET_1() {
        return ButtonName.MAP.PRESET_1;
    }

    /**
     * @return {String} 
     */
    static get PRESET_2() {
        return ButtonName.MAP.PRESET_2;
    }

    /**
     * @return {String} 
     */
    static get PRESET_3() {
        return ButtonName.MAP.PRESET_3;
    }

    /**
     * @return {String} 
     */
    static get PRESET_4() {
        return ButtonName.MAP.PRESET_4;
    }

    /**
     * @return {String} 
     */
    static get PRESET_5() {
        return ButtonName.MAP.PRESET_5;
    }

    /**
     * @return {String} 
     */
    static get PRESET_6() {
        return ButtonName.MAP.PRESET_6;
    }

    /**
     * @return {String} 
     */
    static get PRESET_7() {
        return ButtonName.MAP.PRESET_7;
    }

    /**
     * @return {String} 
     */
    static get PRESET_8() {
        return ButtonName.MAP.PRESET_8;
    }

    /**
     * @return {String} 
     */
    static get PRESET_9() {
        return ButtonName.MAP.PRESET_9;
    }

    /**
     * @return {String} 
     */
    static get CUSTOM_BUTTON() {
        return ButtonName.MAP.CUSTOM_BUTTON;
    }

    /**
     * @return {String} 
     */
    static get SEARCH() {
        return ButtonName.MAP.SEARCH;
    }

    /**
     * @return {String} 
     */
    static get AC_MAX() {
        return ButtonName.MAP.AC_MAX;
    }

    /**
     * @return {String} 
     */
    static get AC() {
        return ButtonName.MAP.AC;
    }

    /**
     * @return {String} 
     */
    static get RECIRCULATE() {
        return ButtonName.MAP.RECIRCULATE;
    }

    /**
     * @return {String} 
     */
    static get FAN_UP() {
        return ButtonName.MAP.FAN_UP;
    }

    /**
     * @return {String} 
     */
    static get FAN_DOWN() {
        return ButtonName.MAP.FAN_DOWN;
    }

    /**
     * @return {String} 
     */
    static get TEMP_UP() {
        return ButtonName.MAP.TEMP_UP;
    }

    /**
     * @return {String} 
     */
    static get TEMP_DOWN() {
        return ButtonName.MAP.TEMP_DOWN;
    }

    /**
     * @return {String} 
     */
    static get DEFROST_MAX() {
        return ButtonName.MAP.DEFROST_MAX;
    }

    /**
     * @return {String} 
     */
    static get DEFROST() {
        return ButtonName.MAP.DEFROST;
    }

    /**
     * @return {String} 
     */
    static get DEFROST_REAR() {
        return ButtonName.MAP.DEFROST_REAR;
    }

    /**
     * @return {String} 
     */
    static get UPPER_VENT() {
        return ButtonName.MAP.UPPER_VENT;
    }

    /**
     * @return {String} 
     */
    static get LOWER_VENT() {
        return ButtonName.MAP.LOWER_VENT;
    }

    /**
     * @return {String} 
     */
    static get VOLUME_UP() {
        return ButtonName.MAP.VOLUME_UP;
    }

    /**
     * @return {String} 
     */
    static get VOLUME_DOWN() {
        return ButtonName.MAP.VOLUME_DOWN;
    }

    /**
     * @return {String} 
     */
    static get EJECT() {
        return ButtonName.MAP.EJECT;
    }

    /**
     * @return {String} 
     */
    static get SOURCE() {
        return ButtonName.MAP.SOURCE;
    }

    /**
     * @return {String} 
     */
    static get SHUFFLE() {
        return ButtonName.MAP.SHUFFLE;
    }

    /**
     * @return {String} 
     */
    static get REPEAT() {
        return ButtonName.MAP.REPEAT;
    }

    /**
     * @return {String} 
     */
    static get NAV_CENTER_LOCATION() {
        return ButtonName.MAP.NAV_CENTER_LOCATION;
    }

    /**
     * @return {String} 
     */
    static get NAV_ZOOM_IN() {
        return ButtonName.MAP.NAV_ZOOM_IN;
    }

    /**
     * @return {String} 
     */
    static get NAV_ZOOM_OUT() {
        return ButtonName.MAP.NAV_ZOOM_OUT;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_UP() {
        return ButtonName.MAP.NAV_PAN_UP;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_UP_RIGHT() {
        return ButtonName.MAP.NAV_PAN_UP_RIGHT;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_RIGHT() {
        return ButtonName.MAP.NAV_PAN_RIGHT;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_DOWN_RIGHT() {
        return ButtonName.MAP.NAV_PAN_DOWN_RIGHT;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_DOWN() {
        return ButtonName.MAP.NAV_PAN_DOWN;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_DOWN_LEFT() {
        return ButtonName.MAP.NAV_PAN_DOWN_LEFT;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_LEFT() {
        return ButtonName.MAP.NAV_PAN_LEFT;
    }

    /**
     * @return {String} 
     */
    static get NAV_PAN_UP_LEFT() {
        return ButtonName.MAP.NAV_PAN_UP_LEFT;
    }

    /**
     * @return {String} 
     */
    static get NAV_TILT_TOGGLE() {
        return ButtonName.MAP.NAV_TILT_TOGGLE;
    }

    /**
     * @return {String} 
     */
    static get NAV_ROTATE_CLOCKWISE() {
        return ButtonName.MAP.NAV_ROTATE_CLOCKWISE;
    }

    /**
     * @return {String} 
     */
    static get NAV_ROTATE_COUNTERCLOCKWISE() {
        return ButtonName.MAP.NAV_ROTATE_COUNTERCLOCKWISE;
    }

    /**
     * @return {String} 
     */
    static get NAV_HEADING_TOGGLE() {
        return ButtonName.MAP.NAV_HEADING_TOGGLE;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return ButtonName.valueForStringInternal(value, ButtonName.MAP);
    }
}

export { ButtonName };