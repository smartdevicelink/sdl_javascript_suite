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
 * Enumeration that describes possible contexts an app's HMI might be in. Communicated to whichever app is in HMI FULL,
 * except Alert.
 * @typedef {Enum} SystemContext
 * @property {Object} _MAP
 */
class SystemContext extends Enum {
    /**
     * Constructor for SystemContext.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for SYSCTXT_MAIN.
     * The app's persistent display (whether media/non-media/navigation) is fully visible onscreen.
     * @returns {String} - The enum value.
     */
    static get SYSCTXT_MAIN () {
        return SystemContext._MAP.SYSCTXT_MAIN;
    }

    /**
     * Get the enum value for SYSCTXT_VRSESSION.
     * The system is currently in a VR session (with whatever dedicated VR screen being overlaid onscreen).
     * @returns {String} - The enum value.
     */
    static get SYSCTXT_VRSESSION () {
        return SystemContext._MAP.SYSCTXT_VRSESSION;
    }

    /**
     * Get the enum value for SYSCTXT_MENU.
     * The system is currently displaying an in-App menu onscreen.
     * @returns {String} - The enum value.
     */
    static get SYSCTXT_MENU () {
        return SystemContext._MAP.SYSCTXT_MENU;
    }

    /**
     * Get the enum value for SYSCTXT_HMI_OBSCURED.
     * The app's display HMI is currently being obscured by either a system or other app's overlay.
     * @returns {String} - The enum value.
     */
    static get SYSCTXT_HMI_OBSCURED () {
        return SystemContext._MAP.SYSCTXT_HMI_OBSCURED;
    }

    /**
     * Get the enum value for SYSCTXT_ALERT.
     * Broadcast only to whichever app has an alert currently being displayed.
     * @returns {String} - The enum value.
     */
    static get SYSCTXT_ALERT () {
        return SystemContext._MAP.SYSCTXT_ALERT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return SystemContext._valueForKey(key, SystemContext._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return SystemContext._keyForValue(value, SystemContext._MAP);
    }
}

SystemContext._MAP = Object.freeze({
    'SYSCTXT_MAIN': 'MAIN',
    'SYSCTXT_VRSESSION': 'VRSESSION',
    'SYSCTXT_MENU': 'MENU',
    'SYSCTXT_HMI_OBSCURED': 'HMI_OBSCURED',
    'SYSCTXT_ALERT': 'ALERT',
});

export { SystemContext };