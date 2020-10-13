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
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleName
     * @param {String} name - The short friendly name of the climate control module. It should not be used to identify a module by mobile application. - The desired ModuleName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setModuleName (name) {
        this.setParameter(ClimateControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * Get the ModuleName
     * @returns {String} - the KEY_MODULE_NAME value
     */
    getModuleName () {
        return this.getParameter(ClimateControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * Set the ModuleInfo
     * @param {ModuleInfo} info - Information about a RC module, including its id. - The desired ModuleInfo.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setModuleInfo (info) {
        this._validateType(ModuleInfo, info);
        this.setParameter(ClimateControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * Get the ModuleInfo
     * @returns {ModuleInfo} - the KEY_MODULE_INFO value
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, ClimateControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * Set the CurrentTemperatureAvailable
     * @param {Boolean} available - Availability of the reading of current temperature. True: Available, False: Not Available, Not present: Not Available. - The desired CurrentTemperatureAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setCurrentTemperatureAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_CURRENT_TEMPERATURE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the CurrentTemperatureAvailable
     * @returns {Boolean} - the KEY_CURRENT_TEMPERATURE_AVAILABLE value
     */
    getCurrentTemperatureAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_CURRENT_TEMPERATURE_AVAILABLE);
    }

    /**
     * Set the FanSpeedAvailable
     * @param {Boolean} available - Availability of the control of fan speed. True: Available, False: Not Available, Not present: Not Available. - The desired FanSpeedAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setFanSpeedAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_FAN_SPEED_AVAILABLE, available);
        return this;
    }

    /**
     * Get the FanSpeedAvailable
     * @returns {Boolean} - the KEY_FAN_SPEED_AVAILABLE value
     */
    getFanSpeedAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_FAN_SPEED_AVAILABLE);
    }

    /**
     * Set the DesiredTemperatureAvailable
     * @param {Boolean} available - Availability of the control of desired temperature. True: Available, False: Not Available, Not present: Not Available. - The desired DesiredTemperatureAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setDesiredTemperatureAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_DESIRED_TEMPERATURE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DesiredTemperatureAvailable
     * @returns {Boolean} - the KEY_DESIRED_TEMPERATURE_AVAILABLE value
     */
    getDesiredTemperatureAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_DESIRED_TEMPERATURE_AVAILABLE);
    }

    /**
     * Set the AcEnableAvailable
     * @param {Boolean} available - Availability of the control of turn on/off AC. True: Available, False: Not Available, Not present: Not Available. - The desired AcEnableAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setAcEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_AC_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the AcEnableAvailable
     * @returns {Boolean} - the KEY_AC_ENABLE_AVAILABLE value
     */
    getAcEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_AC_ENABLE_AVAILABLE);
    }

    /**
     * Set the AcMaxEnableAvailable
     * @param {Boolean} available - Availability of the control of enable/disable air conditioning is ON on the maximum level. True: Available, False: Not Available, Not present: Not Available. - The desired AcMaxEnableAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setAcMaxEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_AC_MAX_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the AcMaxEnableAvailable
     * @returns {Boolean} - the KEY_AC_MAX_ENABLE_AVAILABLE value
     */
    getAcMaxEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_AC_MAX_ENABLE_AVAILABLE);
    }

    /**
     * Set the CirculateAirEnableAvailable
     * @param {Boolean} available - Availability of the control of enable/disable circulate Air mode. True: Available, False: Not Available, Not present: Not Available. - The desired CirculateAirEnableAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setCirculateAirEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_CIRCULATE_AIR_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the CirculateAirEnableAvailable
     * @returns {Boolean} - the KEY_CIRCULATE_AIR_ENABLE_AVAILABLE value
     */
    getCirculateAirEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_CIRCULATE_AIR_ENABLE_AVAILABLE);
    }

    /**
     * Set the AutoModeEnableAvailable
     * @param {Boolean} available - Availability of the control of enable/disable auto mode. True: Available, False: Not Available, Not present: Not Available. - The desired AutoModeEnableAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setAutoModeEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_AUTO_MODE_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the AutoModeEnableAvailable
     * @returns {Boolean} - the KEY_AUTO_MODE_ENABLE_AVAILABLE value
     */
    getAutoModeEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_AUTO_MODE_ENABLE_AVAILABLE);
    }

    /**
     * Set the DualModeEnableAvailable
     * @param {Boolean} available - Availability of the control of enable/disable dual mode. True: Available, False: Not Available, Not present: Not Available. - The desired DualModeEnableAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setDualModeEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_DUAL_MODE_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DualModeEnableAvailable
     * @returns {Boolean} - the KEY_DUAL_MODE_ENABLE_AVAILABLE value
     */
    getDualModeEnableAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_DUAL_MODE_ENABLE_AVAILABLE);
    }

    /**
     * Set the DefrostZoneAvailable
     * @param {Boolean} available - Availability of the control of defrost zones. True: Available, False: Not Available, Not present: Not Available. - The desired DefrostZoneAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setDefrostZoneAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_DEFROST_ZONE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DefrostZoneAvailable
     * @returns {Boolean} - the KEY_DEFROST_ZONE_AVAILABLE value
     */
    getDefrostZoneAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_DEFROST_ZONE_AVAILABLE);
    }

    /**
     * Set the DefrostZone
     * @param {DefrostZone[]} zone - A set of all defrost zones that are controllable. - The desired DefrostZone.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setDefrostZone (zone) {
        this._validateType(DefrostZone, zone, true);
        this.setParameter(ClimateControlCapabilities.KEY_DEFROST_ZONE, zone);
        return this;
    }

    /**
     * Get the DefrostZone
     * @returns {DefrostZone[]} - the KEY_DEFROST_ZONE value
     */
    getDefrostZone () {
        return this.getObject(DefrostZone, ClimateControlCapabilities.KEY_DEFROST_ZONE);
    }

    /**
     * Set the VentilationModeAvailable
     * @param {Boolean} available - Availability of the control of air ventilation mode. True: Available, False: Not Available, Not present: Not Available. - The desired VentilationModeAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setVentilationModeAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_VENTILATION_MODE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the VentilationModeAvailable
     * @returns {Boolean} - the KEY_VENTILATION_MODE_AVAILABLE value
     */
    getVentilationModeAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_VENTILATION_MODE_AVAILABLE);
    }

    /**
     * Set the VentilationMode
     * @param {VentilationMode[]} mode - A set of all ventilation modes that are controllable. - The desired VentilationMode.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setVentilationMode (mode) {
        this._validateType(VentilationMode, mode, true);
        this.setParameter(ClimateControlCapabilities.KEY_VENTILATION_MODE, mode);
        return this;
    }

    /**
     * Get the VentilationMode
     * @returns {VentilationMode[]} - the KEY_VENTILATION_MODE value
     */
    getVentilationMode () {
        return this.getObject(VentilationMode, ClimateControlCapabilities.KEY_VENTILATION_MODE);
    }

    /**
     * Set the HeatedSteeringWheelAvailable
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Steering Wheel. True: Available, False: Not Available, Not present: Not Available. - The desired HeatedSteeringWheelAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setHeatedSteeringWheelAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_STEERING_WHEEL_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeatedSteeringWheelAvailable
     * @returns {Boolean} - the KEY_HEATED_STEERING_WHEEL_AVAILABLE value
     */
    getHeatedSteeringWheelAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_STEERING_WHEEL_AVAILABLE);
    }

    /**
     * Set the HeatedWindshieldAvailable
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Windshield. True: Available, False: Not Available, Not present: Not Available. - The desired HeatedWindshieldAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setHeatedWindshieldAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_WINDSHIELD_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeatedWindshieldAvailable
     * @returns {Boolean} - the KEY_HEATED_WINDSHIELD_AVAILABLE value
     */
    getHeatedWindshieldAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_WINDSHIELD_AVAILABLE);
    }

    /**
     * Set the HeatedRearWindowAvailable
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Rear Window. True: Available, False: Not Available, Not present: Not Available. - The desired HeatedRearWindowAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setHeatedRearWindowAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_REAR_WINDOW_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeatedRearWindowAvailable
     * @returns {Boolean} - the KEY_HEATED_REAR_WINDOW_AVAILABLE value
     */
    getHeatedRearWindowAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_REAR_WINDOW_AVAILABLE);
    }

    /**
     * Set the HeatedMirrorsAvailable
     * @param {Boolean} available - Availability of the control (enable/disable) of heated Mirrors. True: Available, False: Not Available, Not present: Not Available. - The desired HeatedMirrorsAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setHeatedMirrorsAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_HEATED_MIRRORS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeatedMirrorsAvailable
     * @returns {Boolean} - the KEY_HEATED_MIRRORS_AVAILABLE value
     */
    getHeatedMirrorsAvailable () {
        return this.getParameter(ClimateControlCapabilities.KEY_HEATED_MIRRORS_AVAILABLE);
    }

    /**
     * Set the ClimateEnableAvailable
     * @param {Boolean} available - Availability of the control of enable/disable climate control. True: Available, False: Not Available, Not present: Not Available. - The desired ClimateEnableAvailable.
     * @returns {ClimateControlCapabilities} - The class instance for method chaining.
     */
    setClimateEnableAvailable (available) {
        this.setParameter(ClimateControlCapabilities.KEY_CLIMATE_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the ClimateEnableAvailable
     * @returns {Boolean} - the KEY_CLIMATE_ENABLE_AVAILABLE value
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