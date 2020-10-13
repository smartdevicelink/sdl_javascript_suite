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
 * For application-requested interactions, this mode indicates the method in which the user is notified and uses the interaction.
 * @typedef {Enum} InteractionMode
 * @property {Object} _MAP
 */
class InteractionMode extends Enum {
    /**
     * Constructor for InteractionMode.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for MANUAL_ONLY.
     * This mode causes the interaction to only occur on the display, meaning the choices are provided only via the display. No Voice Interaction.
     * @returns {String} - The enum value.
     */
    static get MANUAL_ONLY () {
        return InteractionMode._MAP.MANUAL_ONLY;
    }

    /**
     * Get the enum value for VR_ONLY.
     * This mode causes the interaction to only occur using the headunits VR system. Selections are made by saying the command.
     * @returns {String} - The enum value.
     */
    static get VR_ONLY () {
        return InteractionMode._MAP.VR_ONLY;
    }

    /**
     * Get the enum value for BOTH.
     * This mode causes both a VR and display selection option for an interaction. The user will first be asked via Voice Interaction (if available). If this is unsuccessful, the system will switch to manual input.
     * @returns {String} - The enum value.
     */
    static get BOTH () {
        return InteractionMode._MAP.BOTH;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return InteractionMode._valueForKey(key, InteractionMode._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return InteractionMode._keyForValue(value, InteractionMode._MAP);
    }
}

InteractionMode._MAP = Object.freeze({
    'MANUAL_ONLY': 'MANUAL_ONLY',
    'VR_ONLY': 'VR_ONLY',
    'BOTH': 'BOTH',
});

export { InteractionMode };