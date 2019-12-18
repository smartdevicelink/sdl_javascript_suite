/*
* Copyright (c) 2019, Livio, Inc.
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

import { RpcStruct } from '../RpcStruct.js';

class DeviceInfo extends RpcStruct {

    constructor (parameters) {
        super(parameters);
    }

    /**
    * @param {String} hardware
    * @return {DeviceInfo}
    */
    setHardware (hardware) {
        this.validateType(String, hardware);

        this.setParameter(DeviceInfo.KEY_HARDWARE, hardware);
        return this;
    }

    /**
    * @return {String}
    */
    getHardware () {
        return this.getParameter(DeviceInfo.KEY_HARDWARE);
    }


    /**
    * @param {String} firmwareRev
    * @return {DeviceInfo}
    */
    setFirmwareRev (firmwareRev) {
        this.validateType(String, firmwareRev);

        this.setParameter(DeviceInfo.KEY_FIRMWARE_REV, firmwareRev);
        return this;
    }

    /**
    * @return {String}
    */
    getFirmwareRev () {
        return this.getParameter(DeviceInfo.KEY_FIRMWARE_REV);
    }


    /**
    * @param {String} os
    * @return {DeviceInfo}
    */
    setOs (os) {
        this.validateType(String, os);

        this.setParameter(DeviceInfo.KEY_OS, os);
        return this;
    }

    /**
    * @return {String}
    */
    getOs () {
        return this.getParameter(DeviceInfo.KEY_OS);
    }

    /**
    * @param {String} osVersion
    * @return {DeviceInfo}
    */
    setOsVersion (osVersion) {
        this.validateType(String, osVersion);

        this.setParameter(DeviceInfo.KEY_OS_VERSION, osVersion);
        return this;
    }

    /**
    * @return {String}
    */
    getOsVersion () {
        return this.getParameter(DeviceInfo.KEY_OS_VERSION);
    }


    /**
    * @param {String} carrier
    * @return {DeviceInfo}
    */
    setCarrier (carrier) {
        this.validateType(String, carrier);

        this.setParameter(DeviceInfo.KEY_CARRIER, carrier);
        return this;
    }

    /**
    * @return {String}
    */
    getCarrier () {
        return this.getParameter(DeviceInfo.KEY_CARRIER);
    }


    /**
    * @param {Number} maxNumberRFCOMMPorts
    * @return {DeviceInfo}
    */
    setMaxNumberRFCOMMPorts (maxNumberRFCOMMPorts) {
        this.validateType(Number, maxNumberRFCOMMPorts);

        this.setParameter(DeviceInfo.KEY_MAX_NUMBER_RFCOMM_PORTS, maxNumberRFCOMMPorts);
        return this;
    }

    /**
    * @return {Number}
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
