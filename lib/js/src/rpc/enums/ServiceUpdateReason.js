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
 * @typedef {Enum} ServiceUpdateReason
 * @property {Object} _MAP
 */
class ServiceUpdateReason extends Enum {
    /**
     * Constructor for ServiceUpdateReason.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for PUBLISHED.
     * The service has just been published with the module and once activated to the primary service of its type, it
     * will be ready for possible consumption.
     * @returns {String} - The enum value.
     */
    static get PUBLISHED () {
        return ServiceUpdateReason._MAP.PUBLISHED;
    }

    /**
     * Get the enum value for REMOVED.
     * The service has just been unpublished with the module and is no longer accessible
     * @returns {String} - The enum value.
     */
    static get REMOVED () {
        return ServiceUpdateReason._MAP.REMOVED;
    }

    /**
     * Get the enum value for ACTIVATED.
     * The service is activated as the primary service of this type. All requests dealing with this service type will
     * be handled by this service.
     * @returns {String} - The enum value.
     */
    static get ACTIVATED () {
        return ServiceUpdateReason._MAP.ACTIVATED;
    }

    /**
     * Get the enum value for DEACTIVATED.
     * The service has been deactivated as the primary service of its type
     * @returns {String} - The enum value.
     */
    static get DEACTIVATED () {
        return ServiceUpdateReason._MAP.DEACTIVATED;
    }

    /**
     * Get the enum value for MANIFEST_UPDATE.
     * The service has updated its manifest. This could imply updated capabilities
     * @returns {String} - The enum value.
     */
    static get MANIFEST_UPDATE () {
        return ServiceUpdateReason._MAP.MANIFEST_UPDATE;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ServiceUpdateReason._valueForKey(key, ServiceUpdateReason._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ServiceUpdateReason._keyForValue(value, ServiceUpdateReason._MAP);
    }
}

ServiceUpdateReason._MAP = Object.freeze({
    'PUBLISHED': 'PUBLISHED',
    'REMOVED': 'REMOVED',
    'ACTIVATED': 'ACTIVATED',
    'DEACTIVATED': 'DEACTIVATED',
    'MANIFEST_UPDATE': 'MANIFEST_UPDATE',
});

export { ServiceUpdateReason };