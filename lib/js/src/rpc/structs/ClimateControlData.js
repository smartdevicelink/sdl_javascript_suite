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

import { DefrostZone } from '../enums/DefrostZone.js';
import { RpcStruct } from '../RpcStruct.js';
import { Temperature } from './Temperature.js';
import { VentilationMode } from '../enums/VentilationMode.js';

class ClimateControlData extends RpcStruct {
    /**
     * Initalizes an instance of ClimateControlData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the FanSpeed
     * @param {Number} speed - The desired FanSpeed.
     * {'num_min_value': 0, 'num_max_value': 100}
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setFanSpeed (speed) {
        this.setParameter(ClimateControlData.KEY_FAN_SPEED, speed);
        return this;
    }

    /**
     * Get the FanSpeed
     * @returns {Number} - the KEY_FAN_SPEED value
     */
    getFanSpeed () {
        return this.getParameter(ClimateControlData.KEY_FAN_SPEED);
    }

    /**
     * Set the CurrentTemperature
     * @param {Temperature} temperature - The desired CurrentTemperature.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setCurrentTemperature (temperature) {
        this._validateType(Temperature, temperature);
        this.setParameter(ClimateControlData.KEY_CURRENT_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the CurrentTemperature
     * @returns {Temperature} - the KEY_CURRENT_TEMPERATURE value
     */
    getCurrentTemperature () {
        return this.getObject(Temperature, ClimateControlData.KEY_CURRENT_TEMPERATURE);
    }

    /**
     * Set the DesiredTemperature
     * @param {Temperature} temperature - The desired DesiredTemperature.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setDesiredTemperature (temperature) {
        this._validateType(Temperature, temperature);
        this.setParameter(ClimateControlData.KEY_DESIRED_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the DesiredTemperature
     * @returns {Temperature} - the KEY_DESIRED_TEMPERATURE value
     */
    getDesiredTemperature () {
        return this.getObject(Temperature, ClimateControlData.KEY_DESIRED_TEMPERATURE);
    }

    /**
     * Set the AcEnable
     * @param {Boolean} enable - The desired AcEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setAcEnable (enable) {
        this.setParameter(ClimateControlData.KEY_AC_ENABLE, enable);
        return this;
    }

    /**
     * Get the AcEnable
     * @returns {Boolean} - the KEY_AC_ENABLE value
     */
    getAcEnable () {
        return this.getParameter(ClimateControlData.KEY_AC_ENABLE);
    }

    /**
     * Set the CirculateAirEnable
     * @param {Boolean} enable - The desired CirculateAirEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setCirculateAirEnable (enable) {
        this.setParameter(ClimateControlData.KEY_CIRCULATE_AIR_ENABLE, enable);
        return this;
    }

    /**
     * Get the CirculateAirEnable
     * @returns {Boolean} - the KEY_CIRCULATE_AIR_ENABLE value
     */
    getCirculateAirEnable () {
        return this.getParameter(ClimateControlData.KEY_CIRCULATE_AIR_ENABLE);
    }

    /**
     * Set the AutoModeEnable
     * @param {Boolean} enable - The desired AutoModeEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setAutoModeEnable (enable) {
        this.setParameter(ClimateControlData.KEY_AUTO_MODE_ENABLE, enable);
        return this;
    }

    /**
     * Get the AutoModeEnable
     * @returns {Boolean} - the KEY_AUTO_MODE_ENABLE value
     */
    getAutoModeEnable () {
        return this.getParameter(ClimateControlData.KEY_AUTO_MODE_ENABLE);
    }

    /**
     * Set the DefrostZone
     * @param {DefrostZone} zone - The desired DefrostZone.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setDefrostZone (zone) {
        this._validateType(DefrostZone, zone);
        this.setParameter(ClimateControlData.KEY_DEFROST_ZONE, zone);
        return this;
    }

    /**
     * Get the DefrostZone
     * @returns {DefrostZone} - the KEY_DEFROST_ZONE value
     */
    getDefrostZone () {
        return this.getObject(DefrostZone, ClimateControlData.KEY_DEFROST_ZONE);
    }

    /**
     * Set the DualModeEnable
     * @param {Boolean} enable - The desired DualModeEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setDualModeEnable (enable) {
        this.setParameter(ClimateControlData.KEY_DUAL_MODE_ENABLE, enable);
        return this;
    }

    /**
     * Get the DualModeEnable
     * @returns {Boolean} - the KEY_DUAL_MODE_ENABLE value
     */
    getDualModeEnable () {
        return this.getParameter(ClimateControlData.KEY_DUAL_MODE_ENABLE);
    }

    /**
     * Set the AcMaxEnable
     * @param {Boolean} enable - The desired AcMaxEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setAcMaxEnable (enable) {
        this.setParameter(ClimateControlData.KEY_AC_MAX_ENABLE, enable);
        return this;
    }

    /**
     * Get the AcMaxEnable
     * @returns {Boolean} - the KEY_AC_MAX_ENABLE value
     */
    getAcMaxEnable () {
        return this.getParameter(ClimateControlData.KEY_AC_MAX_ENABLE);
    }

    /**
     * Set the VentilationMode
     * @param {VentilationMode} mode - The desired VentilationMode.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setVentilationMode (mode) {
        this._validateType(VentilationMode, mode);
        this.setParameter(ClimateControlData.KEY_VENTILATION_MODE, mode);
        return this;
    }

    /**
     * Get the VentilationMode
     * @returns {VentilationMode} - the KEY_VENTILATION_MODE value
     */
    getVentilationMode () {
        return this.getObject(VentilationMode, ClimateControlData.KEY_VENTILATION_MODE);
    }

    /**
     * Set the HeatedSteeringWheelEnable
     * @param {Boolean} enable - value false means disabled/turn off, value true means enabled/turn on. - The desired HeatedSteeringWheelEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setHeatedSteeringWheelEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_STEERING_WHEEL_ENABLE, enable);
        return this;
    }

    /**
     * Get the HeatedSteeringWheelEnable
     * @returns {Boolean} - the KEY_HEATED_STEERING_WHEEL_ENABLE value
     */
    getHeatedSteeringWheelEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_STEERING_WHEEL_ENABLE);
    }

    /**
     * Set the HeatedWindshieldEnable
     * @param {Boolean} enable - value false means disabled, value true means enabled. - The desired HeatedWindshieldEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setHeatedWindshieldEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_WINDSHIELD_ENABLE, enable);
        return this;
    }

    /**
     * Get the HeatedWindshieldEnable
     * @returns {Boolean} - the KEY_HEATED_WINDSHIELD_ENABLE value
     */
    getHeatedWindshieldEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_WINDSHIELD_ENABLE);
    }

    /**
     * Set the HeatedRearWindowEnable
     * @param {Boolean} enable - value false means disabled, value true means enabled. - The desired HeatedRearWindowEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setHeatedRearWindowEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_REAR_WINDOW_ENABLE, enable);
        return this;
    }

    /**
     * Get the HeatedRearWindowEnable
     * @returns {Boolean} - the KEY_HEATED_REAR_WINDOW_ENABLE value
     */
    getHeatedRearWindowEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_REAR_WINDOW_ENABLE);
    }

    /**
     * Set the HeatedMirrorsEnable
     * @param {Boolean} enable - value false means disabled, value true means enabled. - The desired HeatedMirrorsEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setHeatedMirrorsEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_MIRRORS_ENABLE, enable);
        return this;
    }

    /**
     * Get the HeatedMirrorsEnable
     * @returns {Boolean} - the KEY_HEATED_MIRRORS_ENABLE value
     */
    getHeatedMirrorsEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_MIRRORS_ENABLE);
    }

    /**
     * Set the ClimateEnable
     * @param {Boolean} enable - True if the climate module is on, false if the climate module is off - The desired ClimateEnable.
     * @returns {ClimateControlData} - The class instance for method chaining.
     */
    setClimateEnable (enable) {
        this.setParameter(ClimateControlData.KEY_CLIMATE_ENABLE, enable);
        return this;
    }

    /**
     * Get the ClimateEnable
     * @returns {Boolean} - the KEY_CLIMATE_ENABLE value
     */
    getClimateEnable () {
        return this.getParameter(ClimateControlData.KEY_CLIMATE_ENABLE);
    }
}

ClimateControlData.KEY_FAN_SPEED = 'fanSpeed';
ClimateControlData.KEY_CURRENT_TEMPERATURE = 'currentTemperature';
ClimateControlData.KEY_DESIRED_TEMPERATURE = 'desiredTemperature';
ClimateControlData.KEY_AC_ENABLE = 'acEnable';
ClimateControlData.KEY_CIRCULATE_AIR_ENABLE = 'circulateAirEnable';
ClimateControlData.KEY_AUTO_MODE_ENABLE = 'autoModeEnable';
ClimateControlData.KEY_DEFROST_ZONE = 'defrostZone';
ClimateControlData.KEY_DUAL_MODE_ENABLE = 'dualModeEnable';
ClimateControlData.KEY_AC_MAX_ENABLE = 'acMaxEnable';
ClimateControlData.KEY_VENTILATION_MODE = 'ventilationMode';
ClimateControlData.KEY_HEATED_STEERING_WHEEL_ENABLE = 'heatedSteeringWheelEnable';
ClimateControlData.KEY_HEATED_WINDSHIELD_ENABLE = 'heatedWindshieldEnable';
ClimateControlData.KEY_HEATED_REAR_WINDOW_ENABLE = 'heatedRearWindowEnable';
ClimateControlData.KEY_HEATED_MIRRORS_ENABLE = 'heatedMirrorsEnable';
ClimateControlData.KEY_CLIMATE_ENABLE = 'climateEnable';

export { ClimateControlData };