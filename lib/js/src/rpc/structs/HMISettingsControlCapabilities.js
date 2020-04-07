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

import { ModuleInfo } from './ModuleInfo.js';
import { RpcStruct } from '../RpcStruct.js';

class HMISettingsControlCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of HMISettingsControlCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleName
     * @param {String} name - The short friendly name of the hmi setting module. It should not be used to identify a - The desired ModuleName.
     * module by mobile application.
     * @returns {HMISettingsControlCapabilities} - The class instance for method chaining.
     */
    setModuleName (name) {
        this.setParameter(HMISettingsControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * Get the ModuleName
     * @returns {String} - the KEY_MODULE_NAME value
     */
    getModuleName () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * Set the ModuleInfo
     * @param {ModuleInfo} info - Information about a RC module, including its id. - The desired ModuleInfo.
     * @returns {HMISettingsControlCapabilities} - The class instance for method chaining.
     */
    setModuleInfo (info) {
        this.validateType(ModuleInfo, info);
        this.setParameter(HMISettingsControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * Get the ModuleInfo
     * @returns {ModuleInfo} - the KEY_MODULE_INFO value
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, HMISettingsControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * Set the DistanceUnitAvailable
     * @param {Boolean} available - Availability of the control of distance unit. - The desired DistanceUnitAvailable.
     * @returns {HMISettingsControlCapabilities} - The class instance for method chaining.
     */
    setDistanceUnitAvailable (available) {
        this.setParameter(HMISettingsControlCapabilities.KEY_DISTANCE_UNIT_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DistanceUnitAvailable
     * @returns {Boolean} - the KEY_DISTANCE_UNIT_AVAILABLE value
     */
    getDistanceUnitAvailable () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_DISTANCE_UNIT_AVAILABLE);
    }

    /**
     * Set the TemperatureUnitAvailable
     * @param {Boolean} available - Availability of the control of temperature unit. - The desired TemperatureUnitAvailable.
     * @returns {HMISettingsControlCapabilities} - The class instance for method chaining.
     */
    setTemperatureUnitAvailable (available) {
        this.setParameter(HMISettingsControlCapabilities.KEY_TEMPERATURE_UNIT_AVAILABLE, available);
        return this;
    }

    /**
     * Get the TemperatureUnitAvailable
     * @returns {Boolean} - the KEY_TEMPERATURE_UNIT_AVAILABLE value
     */
    getTemperatureUnitAvailable () {
        return this.getParameter(HMISettingsControlCapabilities.KEY_TEMPERATURE_UNIT_AVAILABLE);
    }

    /**
     * Set the DisplayModeUnitAvailable
     * @param {Boolean} available - Availability of the control of HMI display mode. - The desired DisplayModeUnitAvailable.
     * @returns {HMISettingsControlCapabilities} - The class instance for method chaining.
     */
    setDisplayModeUnitAvailable (available) {
        this.setParameter(HMISettingsControlCapabilities.KEY_DISPLAY_MODE_UNIT_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DisplayModeUnitAvailable
     * @returns {Boolean} - the KEY_DISPLAY_MODE_UNIT_AVAILABLE value
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