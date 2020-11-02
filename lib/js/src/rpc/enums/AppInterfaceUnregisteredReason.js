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
 * Error code, which comes from the module side.
 * @typedef {Enum} AppInterfaceUnregisteredReason
 * @property {Object} _MAP
 */
class AppInterfaceUnregisteredReason extends Enum {
    /**
     * Constructor for AppInterfaceUnregisteredReason.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for IGNITION_OFF.
     * @returns {String} - The enum value.
     */
    static get IGNITION_OFF () {
        return AppInterfaceUnregisteredReason._MAP.IGNITION_OFF;
    }

    /**
     * Get the enum value for BLUETOOTH_OFF.
     * @returns {String} - The enum value.
     */
    static get BLUETOOTH_OFF () {
        return AppInterfaceUnregisteredReason._MAP.BLUETOOTH_OFF;
    }

    /**
     * Get the enum value for USB_DISCONNECTED.
     * @returns {String} - The enum value.
     */
    static get USB_DISCONNECTED () {
        return AppInterfaceUnregisteredReason._MAP.USB_DISCONNECTED;
    }

    /**
     * Get the enum value for REQUEST_WHILE_IN_NONE_HMI_LEVEL.
     * @returns {String} - The enum value.
     */
    static get REQUEST_WHILE_IN_NONE_HMI_LEVEL () {
        return AppInterfaceUnregisteredReason._MAP.REQUEST_WHILE_IN_NONE_HMI_LEVEL;
    }

    /**
     * Get the enum value for TOO_MANY_REQUESTS.
     * @returns {String} - The enum value.
     */
    static get TOO_MANY_REQUESTS () {
        return AppInterfaceUnregisteredReason._MAP.TOO_MANY_REQUESTS;
    }

    /**
     * Get the enum value for DRIVER_DISTRACTION_VIOLATION.
     * @returns {String} - The enum value.
     */
    static get DRIVER_DISTRACTION_VIOLATION () {
        return AppInterfaceUnregisteredReason._MAP.DRIVER_DISTRACTION_VIOLATION;
    }

    /**
     * Get the enum value for LANGUAGE_CHANGE.
     * @returns {String} - The enum value.
     */
    static get LANGUAGE_CHANGE () {
        return AppInterfaceUnregisteredReason._MAP.LANGUAGE_CHANGE;
    }

    /**
     * Get the enum value for MASTER_RESET.
     * @returns {String} - The enum value.
     */
    static get MASTER_RESET () {
        return AppInterfaceUnregisteredReason._MAP.MASTER_RESET;
    }

    /**
     * Get the enum value for FACTORY_DEFAULTS.
     * @returns {String} - The enum value.
     */
    static get FACTORY_DEFAULTS () {
        return AppInterfaceUnregisteredReason._MAP.FACTORY_DEFAULTS;
    }

    /**
     * Get the enum value for APP_UNAUTHORIZED.
     * @since SmartDeviceLink 2.0.0
     * @returns {String} - The enum value.
     */
    static get APP_UNAUTHORIZED () {
        return AppInterfaceUnregisteredReason._MAP.APP_UNAUTHORIZED;
    }

    /**
     * Get the enum value for PROTOCOL_VIOLATION.
     * @since SmartDeviceLink 4.0.0
     * @returns {String} - The enum value.
     */
    static get PROTOCOL_VIOLATION () {
        return AppInterfaceUnregisteredReason._MAP.PROTOCOL_VIOLATION;
    }

    /**
     * Get the enum value for UNSUPPORTED_HMI_RESOURCE.
     * @since SmartDeviceLink 4.1.0
     * @returns {String} - The enum value.
     */
    static get UNSUPPORTED_HMI_RESOURCE () {
        return AppInterfaceUnregisteredReason._MAP.UNSUPPORTED_HMI_RESOURCE;
    }

    /**
     * Get the enum value for RESOURCE_CONSTRAINT.
     * @since SmartDeviceLink 7.0.0
     * By sending this value, SDL unregisters the application to allow the HMI to close the application.
     * @returns {String} - The enum value.
     */
    static get RESOURCE_CONSTRAINT () {
        return AppInterfaceUnregisteredReason._MAP.RESOURCE_CONSTRAINT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return AppInterfaceUnregisteredReason._valueForKey(key, AppInterfaceUnregisteredReason._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return AppInterfaceUnregisteredReason._keyForValue(value, AppInterfaceUnregisteredReason._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(AppInterfaceUnregisteredReason._MAP);
    }
}

AppInterfaceUnregisteredReason._MAP = Object.freeze({
    'IGNITION_OFF': 'IGNITION_OFF',
    'BLUETOOTH_OFF': 'BLUETOOTH_OFF',
    'USB_DISCONNECTED': 'USB_DISCONNECTED',
    'REQUEST_WHILE_IN_NONE_HMI_LEVEL': 'REQUEST_WHILE_IN_NONE_HMI_LEVEL',
    'TOO_MANY_REQUESTS': 'TOO_MANY_REQUESTS',
    'DRIVER_DISTRACTION_VIOLATION': 'DRIVER_DISTRACTION_VIOLATION',
    'LANGUAGE_CHANGE': 'LANGUAGE_CHANGE',
    'MASTER_RESET': 'MASTER_RESET',
    'FACTORY_DEFAULTS': 'FACTORY_DEFAULTS',
    'APP_UNAUTHORIZED': 'APP_UNAUTHORIZED',
    'PROTOCOL_VIOLATION': 'PROTOCOL_VIOLATION',
    'UNSUPPORTED_HMI_RESOURCE': 'UNSUPPORTED_HMI_RESOURCE',
    'RESOURCE_CONSTRAINT': 'RESOURCE_CONSTRAINT',
});

export { AppInterfaceUnregisteredReason };