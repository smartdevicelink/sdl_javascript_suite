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
import { ModuleInfo } from './ModuleInfo.js';
import { RpcStruct } from '../RpcStruct.js';
import { VentilationMode } from '../enums/VentilationMode.js';

/**
 * Contains information about a climate control module's capabilities.
 */
class ClimateControlCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of ClimateControlCapabilities.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - The short friendly name of the climate control module. It should not be used to identify a
     *                        module by mobile application.
     * @return {ClimateControlCapabilities}
     */
    setModuleName (name) {
        this.setParameter(ClimateControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleName () {
        return this.getParameter(ClimateControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * @param {ModuleInfo} info - Information about a RC module, including its id.
     * @return {ClimateControlCapabilities}
     */
    setModuleInfo (info) {
        this.validateType(ModuleInfo, info);
        this.setParameter(ClimateControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * @return {ModuleInfo}
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, ClimateControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * @param {Boolean} available - Availability of the reading of current temperature. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setCurrentTemperatureAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_CURRENT_TEMPERATURE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCurrentTemperatureAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_CURRENT_TEMPERATURE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of fan speed. True: Available, False: Not Available, Not
     *                              present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setFanSpeedAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_FAN_SPEED_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFanSpeedAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_FAN_SPEED_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of desired temperature. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setDesiredTemperatureAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_DESIRED_TEMPERATURE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDesiredTemperatureAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_DESIRED_TEMPERATURE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of turn on/off AC. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setAcEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_AC_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAcEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_AC_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable air conditioning is ON on the maximum
     *                              level. True: Available, False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setAcMaxEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_AC_MAX_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAcMaxEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_AC_MAX_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable circulate Air mode. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setCirculateAirEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_CIRCULATE_AIR_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCirculateAirEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_CIRCULATE_AIR_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable auto mode. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setAutoModeEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_AUTO_MODE_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAutoModeEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_AUTO_MODE_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable dual mode. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setDualModeEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_DUAL_MODE_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDualModeEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_DUAL_MODE_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of defrost zones. True: Available, False: Not Available,
     *                              Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setDefrostZoneAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_DEFROST_ZONE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDefrostZoneAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_DEFROST_ZONE_AVAILABLE);
    }

    /**
     * @param {DefrostZone[]} zone - A set of all defrost zones that are controllable.
     * @return {ClimateControlCapabilities}
     */
    setDefrostZone (zone) {
        this.validateType(DefrostZone, zone, true);
        this.setParameter(ClimateControlCapabilities.KEY_DEFROST_ZONE, zone);
        return this;
    }

    /**
     * @return {DefrostZone[]}
     */
    getDefrostZone () {
        return this.getObject(DefrostZone, ClimateControlCapabilities.KEY_DEFROST_ZONE);
    }

    /**
     * @param {Boolean} available - Availability of the control of air ventilation mode. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setVentilationModeAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_VENTILATION_MODE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getVentilationModeAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_VENTILATION_MODE_AVAILABLE);
    }

    /**
     * @param {VentilationMode[]} mode - A set of all ventilation modes that are controllable.
     * @return {ClimateControlCapabilities}
     */
    setVentilationMode (mode) {
        this.validateType(VentilationMode, mode, true);
        this.setParameter(ClimateControlCapabilities.KEY_VENTILATION_MODE, mode);
        return this;
    }

    /**
     * @return {VentilationMode[]}
     */
    getVentilationMode () {
        return this.getObject(VentilationMode, ClimateControlCapabilities.KEY_VENTILATION_MODE);
    }

    /**
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Steering Wheel. True:
     *                              Available, False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setHeatedSteeringWheelAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_STEERING_WHEEL_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedSteeringWheelAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_STEERING_WHEEL_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Windshield. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setHeatedWindshieldAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_WINDSHIELD_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedWindshieldAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_WINDSHIELD_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Rear Window. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setHeatedRearWindowAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_REAR_WINDOW_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedRearWindowAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_REAR_WINDOW_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Mirrors. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setHeatedMirrorsAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_MIRRORS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatedMirrorsAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_MIRRORS_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable climate control. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {ClimateControlCapabilities}
     */
    setClimateEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_CLIMATE_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getClimateEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_CLIMATE_ENABLE_AVAILABLE);
    }
}

ClimateControlCapabilities.KEY_MODULE_NAME = 'moduleName';
ClimateControlCapabilities.KEY_MODULE_INFO = 'moduleInfo';
ClimateControlCapabilities.KEY_CURRENT_TEMPERATURE_AVAILABLE = 'currentTemperatureAvailable';
ClimateControlCapabilities.KEY_FAN_SPEED_AVAILABLE = 'fanSpeedAvailable';
ClimateControlCapabilities.KEY_DESIRED_TEMPERATURE_AVAILABLE = 'desiredTemperatureAvailable';
ClimateControlCapabilities.KEY_AC_ENABLE_AVAILABLE = 'acEnableAvailable';
ClimateControlCapabilities.KEY_AC_MAX_ENABLE_AVAILABLE = 'acMaxEnableAvailable';
ClimateControlCapabilities.KEY_CIRCULATE_AIR_ENABLE_AVAILABLE = 'circulateAirEnableAvailable';
ClimateControlCapabilities.KEY_AUTO_MODE_ENABLE_AVAILABLE = 'autoModeEnableAvailable';
ClimateControlCapabilities.KEY_DUAL_MODE_ENABLE_AVAILABLE = 'dualModeEnableAvailable';
ClimateControlCapabilities.KEY_DEFROST_ZONE_AVAILABLE = 'defrostZoneAvailable';
ClimateControlCapabilities.KEY_DEFROST_ZONE = 'defrostZone';
ClimateControlCapabilities.KEY_VENTILATION_MODE_AVAILABLE = 'ventilationModeAvailable';
ClimateControlCapabilities.KEY_VENTILATION_MODE = 'ventilationMode';
ClimateControlCapabilities.KEY_HEATED_STEERING_WHEEL_AVAILABLE = 'heatedSteeringWheelAvailable';
ClimateControlCapabilities.KEY_HEATED_WINDSHIELD_AVAILABLE = 'heatedWindshieldAvailable';
ClimateControlCapabilities.KEY_HEATED_REAR_WINDOW_AVAILABLE = 'heatedRearWindowAvailable';
ClimateControlCapabilities.KEY_HEATED_MIRRORS_AVAILABLE = 'heatedMirrorsAvailable';
ClimateControlCapabilities.KEY_CLIMATE_ENABLE_AVAILABLE = 'climateEnableAvailable';

export { ClimateControlCapabilities };