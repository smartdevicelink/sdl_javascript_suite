/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
 * The different global properties.
 * @typedef {Enum} GlobalProperty
 * @property {Object} _MAP
 */
class GlobalProperty extends Enum {
    /**
     * Constructor for GlobalProperty.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for USER_LOCATION.
     * @since SmartDeviceLink 6.0.0
     * Location of the user's seat of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get USER_LOCATION () {
        return GlobalProperty._MAP.USER_LOCATION;
    }

    /**
     * Get the enum value for HELPPROMPT.
     * @since SmartDeviceLink 1.0.0
     * The property helpPrompt of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get HELPPROMPT () {
        return GlobalProperty._MAP.HELPPROMPT;
    }

    /**
     * Get the enum value for TIMEOUTPROMPT.
     * @since SmartDeviceLink 1.0.0
     * The property timeoutPrompt of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get TIMEOUTPROMPT () {
        return GlobalProperty._MAP.TIMEOUTPROMPT;
    }

    /**
     * Get the enum value for VRHELPTITLE.
     * @since SmartDeviceLink 2.0.0
     * The property vrHelpTitle of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get VRHELPTITLE () {
        return GlobalProperty._MAP.VRHELPTITLE;
    }

    /**
     * Get the enum value for VRHELPITEMS.
     * @since SmartDeviceLink 2.0.0
     * The property array of vrHelp of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get VRHELPITEMS () {
        return GlobalProperty._MAP.VRHELPITEMS;
    }

    /**
     * Get the enum value for MENUNAME.
     * @since SmartDeviceLink 3.0.0
     * The property in-app menu name of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get MENUNAME () {
        return GlobalProperty._MAP.MENUNAME;
    }

    /**
     * Get the enum value for MENUICON.
     * @since SmartDeviceLink 3.0.0
     * The property in-app menu icon of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get MENUICON () {
        return GlobalProperty._MAP.MENUICON;
    }

    /**
     * Get the enum value for KEYBOARDPROPERTIES.
     * @since SmartDeviceLink 3.0.0
     * The on-screen keyboard configuration of setGlobalProperties
     * @returns {String} - The enum value.
     */
    static get KEYBOARDPROPERTIES () {
        return GlobalProperty._MAP.KEYBOARDPROPERTIES;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return GlobalProperty._valueForKey(key, GlobalProperty._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return GlobalProperty._keyForValue(value, GlobalProperty._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(GlobalProperty._MAP);
    }
}

GlobalProperty._MAP = Object.freeze({
    'USER_LOCATION': 'USER_LOCATION',
    'HELPPROMPT': 'HELPPROMPT',
    'TIMEOUTPROMPT': 'TIMEOUTPROMPT',
    'VRHELPTITLE': 'VRHELPTITLE',
    'VRHELPITEMS': 'VRHELPITEMS',
    'MENUNAME': 'MENUNAME',
    'MENUICON': 'MENUICON',
    'KEYBOARDPROPERTIES': 'KEYBOARDPROPERTIES',
});

export { GlobalProperty };