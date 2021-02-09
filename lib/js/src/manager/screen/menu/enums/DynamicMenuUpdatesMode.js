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

import { Enum } from '../../../../util/Enum.js';

/**
 * @typedef {Enum} DynamicMenuUpdatesMode
 * @property {Object} _MAP
 */
class DynamicMenuUpdatesMode extends Enum {
    /**
     * Constructor for DynamicMenuUpdatesMode.
     * Cell state that tells the menu manager what it should do with a given MenuCell
     * @class
     * @since SmartDeviceLink 5.1.0
     */
    constructor () {
        super();
    }

    /**
     * FORCE_ON: This mode forces the menu manager to always dynamically update menu items for each menu
     * update. This will provide the best performance but may cause ordering issues on some SYNC Gen 3 head units.
     * @returns {String} - The enum value.
     */
    static get FORCE_ON () {
        return DynamicMenuUpdatesMode._MAP.FORCE_ON;
    }

    /**
     * FORCE_OFF: Forces off compatibility mode. This will force the menu manager to delete and re-add
     * each menu item for every menu update. This mode is generally not advised due to performance issues.
     * @returns {String} - The enum value.
     */
    static get FORCE_OFF () {
        return DynamicMenuUpdatesMode._MAP.FORCE_OFF;
    }

    /**
     * ON_WITH_COMPAT_MODE: This mode checks whether the phone is connected to a SYNC Gen 3 head unit, which has known
     * menu ordering issues. If it is, it will always delete and re-add every menu item, if not, it will dynamically update
     * the menus.
     * @returns {String} - The enum value.
     */
    static get ON_WITH_COMPAT_MODE () {
        return DynamicMenuUpdatesMode._MAP.ON_WITH_COMPAT_MODE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return DynamicMenuUpdatesMode._valueForKey(key, DynamicMenuUpdatesMode._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return DynamicMenuUpdatesMode._keyForValue(value, DynamicMenuUpdatesMode._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(DynamicMenuUpdatesMode._MAP);
    }
}

DynamicMenuUpdatesMode._MAP = Object.freeze({
    'FORCE_ON': 'FORCE_ON',
    'FORCE_OFF': 'FORCE_OFF',
    'ON_WITH_COMPAT_MODE': 'ON_WITH_COMPAT_MODE',
});

export { DynamicMenuUpdatesMode };