/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { RpcStruct } from '../RpcStruct.js';

/**
 * Various information about connecting device.
 */
class DeviceInfo extends RpcStruct {
    /**
     * Initializes an instance of DeviceInfo.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Hardware
     * @param {String} hardware - Device model - The desired Hardware.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {DeviceInfo} - The class instance for method chaining.
     */
    setHardware (hardware) {
        this.setParameter(DeviceInfo.KEY_HARDWARE, hardware);
        return this;
    }

    /**
     * Get the Hardware
     * @returns {String} - the KEY_HARDWARE value
     */
    getHardware () {
        return this.getParameter(DeviceInfo.KEY_HARDWARE);
    }

    /**
     * Set the FirmwareRev
     * @param {String} rev - Device firmware revision - The desired FirmwareRev.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {DeviceInfo} - The class instance for method chaining.
     */
    setFirmwareRev (rev) {
        this.setParameter(DeviceInfo.KEY_FIRMWARE_REV, rev);
        return this;
    }

    /**
     * Get the FirmwareRev
     * @returns {String} - the KEY_FIRMWARE_REV value
     */
    getFirmwareRev () {
        return this.getParameter(DeviceInfo.KEY_FIRMWARE_REV);
    }

    /**
     * Set the Os
     * @param {String} os - Device OS - The desired Os.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {DeviceInfo} - The class instance for method chaining.
     */
    setOs (os) {
        this.setParameter(DeviceInfo.KEY_OS, os);
        return this;
    }

    /**
     * Get the Os
     * @returns {String} - the KEY_OS value
     */
    getOs () {
        return this.getParameter(DeviceInfo.KEY_OS);
    }

    /**
     * Set the OsVersion
     * @param {String} version - Device OS version - The desired OsVersion.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {DeviceInfo} - The class instance for method chaining.
     */
    setOsVersion (version) {
        this.setParameter(DeviceInfo.KEY_OS_VERSION, version);
        return this;
    }

    /**
     * Get the OsVersion
     * @returns {String} - the KEY_OS_VERSION value
     */
    getOsVersion () {
        return this.getParameter(DeviceInfo.KEY_OS_VERSION);
    }

    /**
     * Set the Carrier
     * @param {String} carrier - Device mobile carrier (if applicable) - The desired Carrier.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {DeviceInfo} - The class instance for method chaining.
     */
    setCarrier (carrier) {
        this.setParameter(DeviceInfo.KEY_CARRIER, carrier);
        return this;
    }

    /**
     * Get the Carrier
     * @returns {String} - the KEY_CARRIER value
     */
    getCarrier () {
        return this.getParameter(DeviceInfo.KEY_CARRIER);
    }

    /**
     * Set the MaxNumberRFCOMMPorts
     * @param {Number} ports - Omitted if connected not via BT. - The desired MaxNumberRFCOMMPorts.
     * {'num_min_value': 0, 'num_max_value': 100}
     * @returns {DeviceInfo} - The class instance for method chaining.
     */
    setMaxNumberRFCOMMPorts (ports) {
        this.setParameter(DeviceInfo.KEY_MAX_NUMBER_RFCOMM_PORTS, ports);
        return this;
    }

    /**
     * Get the MaxNumberRFCOMMPorts
     * @returns {Number} - the KEY_MAX_NUMBER_RFCOMM_PORTS value
     */
    getMaxNumberRFCOMMPorts () {
        return this.getParameter(DeviceInfo.KEY_MAX_NUMBER_RFCOMM_PORTS);
    }
}

DeviceInfo.KEY_HARDWARE = 'hardware';
DeviceInfo.KEY_FIRMWARE_REV = 'firmwareRev';
DeviceInfo.KEY_OS = 'os';
DeviceInfo.KEY_OS_VERSION = 'osVersion';
DeviceInfo.KEY_CARRIER = 'carrier';
DeviceInfo.KEY_MAX_NUMBER_RFCOMM_PORTS = 'maxNumberRFCOMMPorts';

export { DeviceInfo };