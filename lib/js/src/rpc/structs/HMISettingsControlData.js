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

import { DisplayMode } from '../enums/DisplayMode.js';
import { DistanceUnit } from '../enums/DistanceUnit.js';
import { RpcStruct } from '../RpcStruct.js';
import { TemperatureUnit } from '../enums/TemperatureUnit.js';

/**
 * Corresponds to "HMI_SETTINGS" ModuleType
 */
class HMISettingsControlData extends RpcStruct {
    /**
     * Initalizes an instance of HMISettingsControlData.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {DisplayMode} mode
     * @return {HMISettingsControlData}
     */
    setDisplayMode (mode) {
        this.validateType(DisplayMode, mode);
        this.setParameter(HMISettingsControlData.KEY_DISPLAY_MODE, mode);
        return this;
    }

    /**
     * @return {DisplayMode}
     */
    getDisplayMode () {
        return this.getObject(DisplayMode, HMISettingsControlData.KEY_DISPLAY_MODE);
    }

    /**
     * @param {TemperatureUnit} unit
     * @return {HMISettingsControlData}
     */
    setTemperatureUnit (unit) {
        this.validateType(TemperatureUnit, unit);
        this.setParameter(HMISettingsControlData.KEY_TEMPERATURE_UNIT, unit);
        return this;
    }

    /**
     * @return {TemperatureUnit}
     */
    getTemperatureUnit () {
        return this.getObject(TemperatureUnit, HMISettingsControlData.KEY_TEMPERATURE_UNIT);
    }

    /**
     * @param {DistanceUnit} unit
     * @return {HMISettingsControlData}
     */
    setDistanceUnit (unit) {
        this.validateType(DistanceUnit, unit);
        this.setParameter(HMISettingsControlData.KEY_DISTANCE_UNIT, unit);
        return this;
    }

    /**
     * @return {DistanceUnit}
     */
    getDistanceUnit () {
        return this.getObject(DistanceUnit, HMISettingsControlData.KEY_DISTANCE_UNIT);
    }
}

HMISettingsControlData.KEY_DISPLAY_MODE = 'displayMode';
HMISettingsControlData.KEY_TEMPERATURE_UNIT = 'temperatureUnit';
HMISettingsControlData.KEY_DISTANCE_UNIT = 'distanceUnit';

export { HMISettingsControlData };