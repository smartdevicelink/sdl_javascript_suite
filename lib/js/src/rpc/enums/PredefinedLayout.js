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
 * Predefined screen layout.
 * @typedef {Enum} PredefinedLayout
 * @property {Object} _MAP
 */
class PredefinedLayout extends Enum {
    /**
     * Constructor for PredefinedLayout.
     * @class
     * @since SmartDeviceLink 3.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for DEFAULT.
     * Default media / non-media screen. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get DEFAULT () {
        return PredefinedLayout._MAP.DEFAULT;
    }

    /**
     * Get the enum value for MEDIA.
     * Default Media screen. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get MEDIA () {
        return PredefinedLayout._MAP.MEDIA;
    }

    /**
     * Get the enum value for NON_MEDIA.
     * Default Non-media screen. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get NON_MEDIA () {
        return PredefinedLayout._MAP.NON_MEDIA;
    }

    /**
     * Get the enum value for ONSCREEN_PRESETS.
     * Custom root media screen containing app-defined onscreen presets. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get ONSCREEN_PRESETS () {
        return PredefinedLayout._MAP.ONSCREEN_PRESETS;
    }

    /**
     * Get the enum value for NAV_FULLSCREEN_MAP.
     * Custom root template screen containing full screen map with navigation controls. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get NAV_FULLSCREEN_MAP () {
        return PredefinedLayout._MAP.NAV_FULLSCREEN_MAP;
    }

    /**
     * Get the enum value for NAV_LIST.
     * Custom root template screen containing video represented list. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get NAV_LIST () {
        return PredefinedLayout._MAP.NAV_LIST;
    }

    /**
     * Get the enum value for NAV_KEYBOARD.
     * Custom root template screen containing video represented keyboard. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get NAV_KEYBOARD () {
        return PredefinedLayout._MAP.NAV_KEYBOARD;
    }

    /**
     * Get the enum value for GRAPHIC_WITH_TEXT.
     * Custom root template screen containing half-screen graphic with lines of text. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get GRAPHIC_WITH_TEXT () {
        return PredefinedLayout._MAP.GRAPHIC_WITH_TEXT;
    }

    /**
     * Get the enum value for TEXT_WITH_GRAPHIC.
     * Custom root template screen containing lines of text with half-screen graphic. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get TEXT_WITH_GRAPHIC () {
        return PredefinedLayout._MAP.TEXT_WITH_GRAPHIC;
    }

    /**
     * Get the enum value for TILES_ONLY.
     * Custom root template screen containing only tiled SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get TILES_ONLY () {
        return PredefinedLayout._MAP.TILES_ONLY;
    }

    /**
     * Get the enum value for TEXTBUTTONS_ONLY.
     * Custom root template screen containing only text SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get TEXTBUTTONS_ONLY () {
        return PredefinedLayout._MAP.TEXTBUTTONS_ONLY;
    }

    /**
     * Get the enum value for GRAPHIC_WITH_TILES.
     * Custom root template screen containing half-screen graphic with tiled SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get GRAPHIC_WITH_TILES () {
        return PredefinedLayout._MAP.GRAPHIC_WITH_TILES;
    }

    /**
     * Get the enum value for TILES_WITH_GRAPHIC.
     * Custom root template screen containing tiled SoftButtons with half-screen graphic. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get TILES_WITH_GRAPHIC () {
        return PredefinedLayout._MAP.TILES_WITH_GRAPHIC;
    }

    /**
     * Get the enum value for GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS.
     * Custom root template screen containing half-screen graphic with text and SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS () {
        return PredefinedLayout._MAP.GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS;
    }

    /**
     * Get the enum value for TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC.
     * Custom root template screen containing text and SoftButtons with half-screen graphic. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC () {
        return PredefinedLayout._MAP.TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC;
    }

    /**
     * Get the enum value for GRAPHIC_WITH_TEXTBUTTONS.
     * Custom root template screen containing half-screen graphic with text only SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get GRAPHIC_WITH_TEXTBUTTONS () {
        return PredefinedLayout._MAP.GRAPHIC_WITH_TEXTBUTTONS;
    }

    /**
     * Get the enum value for TEXTBUTTONS_WITH_GRAPHIC.
     * Custom root template screen containing text only SoftButtons with half-screen graphic. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get TEXTBUTTONS_WITH_GRAPHIC () {
        return PredefinedLayout._MAP.TEXTBUTTONS_WITH_GRAPHIC;
    }

    /**
     * Get the enum value for LARGE_GRAPHIC_WITH_SOFTBUTTONS.
     * Custom root template screen containing a large graphic and SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get LARGE_GRAPHIC_WITH_SOFTBUTTONS () {
        return PredefinedLayout._MAP.LARGE_GRAPHIC_WITH_SOFTBUTTONS;
    }

    /**
     * Get the enum value for DOUBLE_GRAPHIC_WITH_SOFTBUTTONS.
     * Custom root template screen containing two graphics and SoftButtons. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get DOUBLE_GRAPHIC_WITH_SOFTBUTTONS () {
        return PredefinedLayout._MAP.DOUBLE_GRAPHIC_WITH_SOFTBUTTONS;
    }

    /**
     * Get the enum value for LARGE_GRAPHIC_ONLY.
     * Custom root template screen containing only a large graphic. Can be set as a root screen.
     * @returns {String} - The enum value.
     */
    static get LARGE_GRAPHIC_ONLY () {
        return PredefinedLayout._MAP.LARGE_GRAPHIC_ONLY;
    }

    /**
     * Get the enum value for WEB_VIEW.
     * @since SmartDeviceLink 7.0.0
     * Custom root template allowing in-vehicle WebEngine applications with appropriate permissions to show the application's own web view.
     * @returns {String} - The enum value.
     */
    static get WEB_VIEW () {
        return PredefinedLayout._MAP.WEB_VIEW;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PredefinedLayout._valueForKey(key, PredefinedLayout._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PredefinedLayout._keyForValue(value, PredefinedLayout._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(PredefinedLayout._MAP);
    }
}

PredefinedLayout._MAP = Object.freeze({
    'DEFAULT': 'DEFAULT',
    'MEDIA': 'MEDIA',
    'NON_MEDIA': 'NON-MEDIA',
    'ONSCREEN_PRESETS': 'ONSCREEN_PRESETS',
    'NAV_FULLSCREEN_MAP': 'NAV_FULLSCREEN_MAP',
    'NAV_LIST': 'NAV_LIST',
    'NAV_KEYBOARD': 'NAV_KEYBOARD',
    'GRAPHIC_WITH_TEXT': 'GRAPHIC_WITH_TEXT',
    'TEXT_WITH_GRAPHIC': 'TEXT_WITH_GRAPHIC',
    'TILES_ONLY': 'TILES_ONLY',
    'TEXTBUTTONS_ONLY': 'TEXTBUTTONS_ONLY',
    'GRAPHIC_WITH_TILES': 'GRAPHIC_WITH_TILES',
    'TILES_WITH_GRAPHIC': 'TILES_WITH_GRAPHIC',
    'GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS': 'GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS',
    'TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC': 'TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC',
    'GRAPHIC_WITH_TEXTBUTTONS': 'GRAPHIC_WITH_TEXTBUTTONS',
    'TEXTBUTTONS_WITH_GRAPHIC': 'TEXTBUTTONS_WITH_GRAPHIC',
    'LARGE_GRAPHIC_WITH_SOFTBUTTONS': 'LARGE_GRAPHIC_WITH_SOFTBUTTONS',
    'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS': 'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS',
    'LARGE_GRAPHIC_ONLY': 'LARGE_GRAPHIC_ONLY',
    'WEB_VIEW': 'WEB_VIEW',
});

export { PredefinedLayout };