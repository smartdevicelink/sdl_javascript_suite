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
 * For touchscreen interactions, the mode of how the choices are presented.
 * @typedef {Enum} LayoutMode
 * @property {Object} _MAP
 */
class LayoutMode extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * This mode causes the interaction to display the previous set of choices as icons.
     * @return {String}
     */
    static get ICON_ONLY () {
        return LayoutMode._MAP.ICON_ONLY;
    }

    /**
     * This mode causes the interaction to display the previous set of choices as icons along with a search field in
     * the HMI.
     * @return {String}
     */
    static get ICON_WITH_SEARCH () {
        return LayoutMode._MAP.ICON_WITH_SEARCH;
    }

    /**
     * This mode causes the interaction to display the previous set of choices as a list.
     * @return {String}
     */
    static get LIST_ONLY () {
        return LayoutMode._MAP.LIST_ONLY;
    }

    /**
     * This mode causes the interaction to display the previous set of choices as a list along with a search field in
     * the HMI.
     * @return {String}
     */
    static get LIST_WITH_SEARCH () {
        return LayoutMode._MAP.LIST_WITH_SEARCH;
    }

    /**
     * This mode causes the interaction to immediately display a keyboard entry through the HMI.
     * @return {String}
     */
    static get KEYBOARD () {
        return LayoutMode._MAP.KEYBOARD;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return LayoutMode._valueForKey(key, LayoutMode._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return LayoutMode._keyForValue(value, LayoutMode._MAP);
    }
}

LayoutMode._MAP = Object.freeze({
    'ICON_ONLY': 'ICON_ONLY',
    'ICON_WITH_SEARCH': 'ICON_WITH_SEARCH',
    'LIST_ONLY': 'LIST_ONLY',
    'LIST_WITH_SEARCH': 'LIST_WITH_SEARCH',
    'KEYBOARD': 'KEYBOARD',
});

export { LayoutMode };