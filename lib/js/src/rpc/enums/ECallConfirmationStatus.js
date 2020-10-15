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
 * Reflects the status of the eCall Notification.
 * @typedef {Enum} ECallConfirmationStatus
 * @property {Object} _MAP
 */
class ECallConfirmationStatus extends Enum {
    /**
     * Constructor for ECallConfirmationStatus.
     * @class
     * @since SmartDeviceLink 2.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for ECCS_NORMAL.
     * @returns {String} - The enum value.
     */
    static get ECCS_NORMAL () {
        return ECallConfirmationStatus._MAP.ECCS_NORMAL;
    }

    /**
     * Get the enum value for ECCS_CALL_IN_PROGRESS.
     * @returns {String} - The enum value.
     */
    static get ECCS_CALL_IN_PROGRESS () {
        return ECallConfirmationStatus._MAP.ECCS_CALL_IN_PROGRESS;
    }

    /**
     * Get the enum value for ECCS_CALL_CANCELLED.
     * @returns {String} - The enum value.
     */
    static get ECCS_CALL_CANCELLED () {
        return ECallConfirmationStatus._MAP.ECCS_CALL_CANCELLED;
    }

    /**
     * Get the enum value for CALL_COMPLETED.
     * @returns {String} - The enum value.
     */
    static get CALL_COMPLETED () {
        return ECallConfirmationStatus._MAP.CALL_COMPLETED;
    }

    /**
     * Get the enum value for ECCS_CALL_UNSUCCESSFUL.
     * @returns {String} - The enum value.
     */
    static get ECCS_CALL_UNSUCCESSFUL () {
        return ECallConfirmationStatus._MAP.ECCS_CALL_UNSUCCESSFUL;
    }

    /**
     * Get the enum value for ECCS_ECALL_CONFIGURED_OFF.
     * @returns {String} - The enum value.
     */
    static get ECCS_ECALL_CONFIGURED_OFF () {
        return ECallConfirmationStatus._MAP.ECCS_ECALL_CONFIGURED_OFF;
    }

    /**
     * Get the enum value for ECCS_CALL_COMPLETE_DTMF_TIMEOUT.
     * @returns {String} - The enum value.
     */
    static get ECCS_CALL_COMPLETE_DTMF_TIMEOUT () {
        return ECallConfirmationStatus._MAP.ECCS_CALL_COMPLETE_DTMF_TIMEOUT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ECallConfirmationStatus._valueForKey(key, ECallConfirmationStatus._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ECallConfirmationStatus._keyForValue(value, ECallConfirmationStatus._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(ECallConfirmationStatus._MAP);
    }
}

ECallConfirmationStatus._MAP = Object.freeze({
    'ECCS_NORMAL': 'NORMAL',
    'ECCS_CALL_IN_PROGRESS': 'CALL_IN_PROGRESS',
    'ECCS_CALL_CANCELLED': 'CALL_CANCELLED',
    'CALL_COMPLETED': 'CALL_COMPLETED',
    'ECCS_CALL_UNSUCCESSFUL': 'CALL_UNSUCCESSFUL',
    'ECCS_ECALL_CONFIGURED_OFF': 'ECALL_CONFIGURED_OFF',
    'ECCS_CALL_COMPLETE_DTMF_TIMEOUT': 'CALL_COMPLETE_DTMF_TIMEOUT',
});

export { ECallConfirmationStatus };