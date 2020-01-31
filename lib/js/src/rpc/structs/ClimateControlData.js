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

import { Temperature } from './Temperature.js';
import { RpcStruct } from '../RpcStruct.js';
import { VentilationMode } from '../enums/VentilationMode.js';
import { DefrostZone } from '../enums/DefrostZone.js';

class ClimateControlData extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} speed
     * @return {ClimateControlData}
     */
    setFanSpeed (speed) {
        this.setParameter(ClimateControlData.KEY_FAN_SPEED, speed);
        return this;
    }

    /**
     * @return {Number}
     */
    getFanSpeed () {
        return this.getParameter(ClimateControlData.KEY_FAN_SPEED);
    }

    /**
     * @param {Temperature} temperature
     * @return {ClimateControlData}
     */
    setCurrentTemperature (temperature) {
        this.validateType(Temperature, temperature);
        this.setParameter(ClimateControlData.KEY_CURRENT_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getCurrentTemperature () {
        return this.getObject(Temperature, ClimateControlData.KEY_CURRENT_TEMPERATURE);
    }

    /**
     * @param {Temperature} temperature
     * @return {ClimateControlData}
     */
    setDesiredTemperature (temperature) {
        this.validateType(Temperature, temperature);
        this.setParameter(ClimateControlData.KEY_DESIRED_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getDesiredTemperature () {
        return this.getObject(Temperature, ClimateControlData.KEY_DESIRED_TEMPERATURE);
    }

    /**
     * @param {Boolean} enable
     * @return {ClimateControlData}
     */
    setAcEnable (enable) {
        this.setParameter(ClimateControlData.KEY_AC_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAcEnable () {
        return this.getParameter(ClimateControlData.KEY_AC_ENABLE);
    }

    /**
     * @param {Boolean} enable
     * @return {ClimateControlData}
     */
    setCirculateAirEnable (enable) {
        this.setParameter(ClimateControlData.KEY_CIRCULATE_AIR_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCirculateAirEnable () {
        return this.getParameter(ClimateControlData.KEY_CIRCULATE_AIR_ENABLE);
    }

    /**
     * @param {Boolean} enable
     * @return {ClimateControlData}
     */
    setAutoModeEnable (enable) {
        this.setParameter(ClimateControlData.KEY_AUTO_MODE_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAutoModeEnable () {
        return this.getParameter(ClimateControlData.KEY_AUTO_MODE_ENABLE);
    }

    /**
     * @param {DefrostZone} zone
     * @return {ClimateControlData}
     */
    setDefrostZone (zone) {
        this.validateType(DefrostZone, zone);
        this.setParameter(ClimateControlData.KEY_DEFROST_ZONE, zone);
        return this;
    }

    /**
     * @return {DefrostZone}
     */
    getDefrostZone () {
        return this.getObject(DefrostZone, ClimateControlData.KEY_DEFROST_ZONE);
    }

    /**
     * @param {Boolean} enable
     * @return {ClimateControlData}
     */
    setDualModeEnable (enable) {
        this.setParameter(ClimateControlData.KEY_DUAL_MODE_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDualModeEnable () {
        return this.getParameter(ClimateControlData.KEY_DUAL_MODE_ENABLE);
    }

    /**
     * @param {Boolean} enable
     * @return {ClimateControlData}
     */
    setAcMaxEnable (enable) {
        this.setParameter(ClimateControlData.KEY_AC_MAX_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAcMaxEnable () {
        return this.getParameter(ClimateControlData.KEY_AC_MAX_ENABLE);
    }

    /**
     * @param {VentilationMode} mode
     * @return {ClimateControlData}
     */
    setVentilationMode (mode) {
        this.validateType(VentilationMode, mode);
        this.setParameter(ClimateControlData.KEY_VENTILATION_MODE, mode);
        return this;
    }

    /**
     * @return {VentilationMode}
     */
    getVentilationMode () {
        return this.getObject(VentilationMode, ClimateControlData.KEY_VENTILATION_MODE);
    }

    /**
     * @param {Boolean} enable - value false means disabled/turn off, value true means enabled/turn on.
     * @return {ClimateControlData}
     */
    setHeatedSteeringWheelEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_STEERING_WHEEL_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedSteeringWheelEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_STEERING_WHEEL_ENABLE);
    }

    /**
     * @param {Boolean} enable - value false means disabled, value true means enabled.
     * @return {ClimateControlData}
     */
    setHeatedWindshieldEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_WINDSHIELD_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedWindshieldEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_WINDSHIELD_ENABLE);
    }

    /**
     * @param {Boolean} enable - value false means disabled, value true means enabled.
     * @return {ClimateControlData}
     */
    setHeatedRearWindowEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_REAR_WINDOW_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedRearWindowEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_REAR_WINDOW_ENABLE);
    }

    /**
     * @param {Boolean} enable - value false means disabled, value true means enabled.
     * @return {ClimateControlData}
     */
    setHeatedMirrorsEnable (enable) {
        this.setParameter(ClimateControlData.KEY_HEATED_MIRRORS_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedMirrorsEnable () {
        return this.getParameter(ClimateControlData.KEY_HEATED_MIRRORS_ENABLE);
    }

    /**
     * @param {Boolean} enable - True if the climate module is on, false if the climate module is off
     * @return {ClimateControlData}
     */
    setClimateEnable (enable) {
        this.setParameter(ClimateControlData.KEY_CLIMATE_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
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