/*
* Copyright (c) 2020, Livio, Inc.
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
 * @typedef {Enum} ServiceType
 * @property {Object} _MAP
 */
class ServiceType extends Enum {
    /**
     * Initializes an instance of ServiceType
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for CONTROL.
     * @returns {Number} - The enum value.
     */
    static get CONTROL () {
        return ServiceType._MAP.CONTROL;
    }

    /**
     * Get the enum value for RPC.
     * @returns {Number} - The enum value.
     */
    static get RPC () {
        return ServiceType._MAP.RPC;
    }

    /**
     * Get the enum value for AUDIO.
     * @returns {Number} - The enum value.
     */
    static get AUDIO () {
        return ServiceType._MAP.AUDIO;
    }

    /**
     * Get the enum value for VIDEO.
     * @returns {Number} - The enum value.
     */
    static get VIDEO () {
        return ServiceType._MAP.VIDEO;
    }

    /**
     * Get the enum value for HYBRID.
     * @returns {Number} - The enum value.
     */
    static get HYBRID () {
        return ServiceType._MAP.HYBRID;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ServiceType._valueForKey(key, ServiceType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ServiceType._keyForValue(value, ServiceType._MAP);
    }
}

ServiceType._MAP = Object.freeze({
    'CONTROL': 0x00,
    'RPC': 0x07,
    'AUDIO': 0x0A,
    'VIDEO': 0x0B,
    'HYBRID':0x0F,
});

export { ServiceType };
