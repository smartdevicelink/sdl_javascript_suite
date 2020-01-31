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

import { RpcStruct } from '../RpcStruct.js';
import { ModuleInfo } from './ModuleInfo.js';

class HMISettingsControlCapabilities extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - The short friendly name of the hmi setting module. It should not be used to identify a
     *                        module by mobile application.
     * @return {HMISettingsControlCapabilities}
     */
    setModuleName (name) {
        this.setParameter(HMISettingsControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleName () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * @param {ModuleInfo} info - Information about a RC module, including its id.
     * @return {HMISettingsControlCapabilities}
     */
    setModuleInfo (info) {
        this.validateType(ModuleInfo, info);
        this.setParameter(HMISettingsControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * @return {ModuleInfo}
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, HMISettingsControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * @param {Boolean} available - Availability of the control of distance unit.
     * @return {HMISettingsControlCapabilities}
     */
    setDistanceUnitAvailable (available) {
        this.setParameter(HMISettingsControlCapabilities.KEY_DISTANCE_UNIT_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDistanceUnitAvailable () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_DISTANCE_UNIT_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of temperature unit.
     * @return {HMISettingsControlCapabilities}
     */
    setTemperatureUnitAvailable (available) {
        this.setParameter(HMISettingsControlCapabilities.KEY_TEMPERATURE_UNIT_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTemperatureUnitAvailable () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_TEMPERATURE_UNIT_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of HMI display mode.
     * @return {HMISettingsControlCapabilities}
     */
    setDisplayModeUnitAvailable (available) {
        this.setParameter(HMISettingsControlCapabilities.KEY_DISPLAY_MODE_UNIT_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDisplayModeUnitAvailable () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_DISPLAY_MODE_UNIT_AVAILABLE);
    }
}

HMISettingsControlCapabilities.KEY_MODULE_NAME = 'moduleName';
HMISettingsControlCapabilities.KEY_MODULE_INFO = 'moduleInfo';
HMISettingsControlCapabilities.KEY_DISTANCE_UNIT_AVAILABLE = 'distanceUnitAvailable';
HMISettingsControlCapabilities.KEY_TEMPERATURE_UNIT_AVAILABLE = 'temperatureUnitAvailable';
HMISettingsControlCapabilities.KEY_DISPLAY_MODE_UNIT_AVAILABLE = 'displayModeUnitAvailable';

export { HMISettingsControlCapabilities };