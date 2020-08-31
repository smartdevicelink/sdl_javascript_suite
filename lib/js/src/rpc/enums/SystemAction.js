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
 * Enumeration that describes system actions that can be triggered.
 * @typedef {Enum} SystemAction
 * @property {Object} _MAP
 */
class SystemAction extends Enum {
    /**
     * Constructor for SystemAction.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for DEFAULT_ACTION.
     * Default action occurs. Standard behavior (e.g. SoftButton clears overlay).
     * @returns {String} - The enum value.
     */
    static get DEFAULT_ACTION () {
        return SystemAction._MAP.DEFAULT_ACTION;
    }

    /**
     * Get the enum value for STEAL_FOCUS.
     * App is brought into HMI_FULL.
     * @returns {String} - The enum value.
     */
    static get STEAL_FOCUS () {
        return SystemAction._MAP.STEAL_FOCUS;
    }

    /**
     * Get the enum value for KEEP_CONTEXT.
     * Current system context is maintained. An overlay is persisted even though a SoftButton has been pressed and the notification sent.
     * @returns {String} - The enum value.
     */
    static get KEEP_CONTEXT () {
        return SystemAction._MAP.KEEP_CONTEXT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return SystemAction._valueForKey(key, SystemAction._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return SystemAction._keyForValue(value, SystemAction._MAP);
    }
}

SystemAction._MAP = Object.freeze({
    'DEFAULT_ACTION': 'DEFAULT_ACTION',
    'STEAL_FOCUS': 'STEAL_FOCUS',
    'KEEP_CONTEXT': 'KEEP_CONTEXT',
});

export { SystemAction };