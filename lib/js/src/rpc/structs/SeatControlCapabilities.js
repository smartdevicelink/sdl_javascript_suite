/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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

class SeatControlCapabilities extends RpcStruct {
    /**
     * Initializes an instance of SeatControlCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleName
     * @param {String} name - The short friendly name of the light control module. It should not be used to identify a module by mobile application. - The desired ModuleName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setModuleName (name) {
        this.setParameter(SeatControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * Get the ModuleName
     * @returns {String} - the KEY_MODULE_NAME value
     */
    getModuleName () {
        return this.getParameter(SeatControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * Set the ModuleInfo
     * @since SmartDeviceLink 6.0.0
     * @param {ModuleInfo} info - Information about an RC module, including its id. - The desired ModuleInfo.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setModuleInfo (info) {
        this._validateType(ModuleInfo, info);
        this.setParameter(SeatControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * Get the ModuleInfo
     * @returns {ModuleInfo} - the KEY_MODULE_INFO value
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, SeatControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * Set the HeatingEnabledAvailable
     * @param {Boolean} available - The desired HeatingEnabledAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setHeatingEnabledAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEATING_ENABLED_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeatingEnabledAvailable
     * @returns {Boolean} - the KEY_HEATING_ENABLED_AVAILABLE value
     */
    getHeatingEnabledAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEATING_ENABLED_AVAILABLE);
    }

    /**
     * Set the CoolingEnabledAvailable
     * @param {Boolean} available - The desired CoolingEnabledAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setCoolingEnabledAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_COOLING_ENABLED_AVAILABLE, available);
        return this;
    }

    /**
     * Get the CoolingEnabledAvailable
     * @returns {Boolean} - the KEY_COOLING_ENABLED_AVAILABLE value
     */
    getCoolingEnabledAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_COOLING_ENABLED_AVAILABLE);
    }

    /**
     * Set the HeatingLevelAvailable
     * @param {Boolean} available - The desired HeatingLevelAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setHeatingLevelAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEATING_LEVEL_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeatingLevelAvailable
     * @returns {Boolean} - the KEY_HEATING_LEVEL_AVAILABLE value
     */
    getHeatingLevelAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEATING_LEVEL_AVAILABLE);
    }

    /**
     * Set the CoolingLevelAvailable
     * @param {Boolean} available - The desired CoolingLevelAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setCoolingLevelAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_COOLING_LEVEL_AVAILABLE, available);
        return this;
    }

    /**
     * Get the CoolingLevelAvailable
     * @returns {Boolean} - the KEY_COOLING_LEVEL_AVAILABLE value
     */
    getCoolingLevelAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_COOLING_LEVEL_AVAILABLE);
    }

    /**
     * Set the HorizontalPositionAvailable
     * @param {Boolean} available - The desired HorizontalPositionAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setHorizontalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HORIZONTAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HorizontalPositionAvailable
     * @returns {Boolean} - the KEY_HORIZONTAL_POSITION_AVAILABLE value
     */
    getHorizontalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HORIZONTAL_POSITION_AVAILABLE);
    }

    /**
     * Set the VerticalPositionAvailable
     * @param {Boolean} available - The desired VerticalPositionAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * Get the VerticalPositionAvailable
     * @returns {Boolean} - the KEY_VERTICAL_POSITION_AVAILABLE value
     */
    getVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * Set the FrontVerticalPositionAvailable
     * @param {Boolean} available - The desired FrontVerticalPositionAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setFrontVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_FRONT_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * Get the FrontVerticalPositionAvailable
     * @returns {Boolean} - the KEY_FRONT_VERTICAL_POSITION_AVAILABLE value
     */
    getFrontVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_FRONT_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * Set the BackVerticalPositionAvailable
     * @param {Boolean} available - The desired BackVerticalPositionAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setBackVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_BACK_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * Get the BackVerticalPositionAvailable
     * @returns {Boolean} - the KEY_BACK_VERTICAL_POSITION_AVAILABLE value
     */
    getBackVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_BACK_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * Set the BackTiltAngleAvailable
     * @param {Boolean} available - The desired BackTiltAngleAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setBackTiltAngleAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_BACK_TILT_ANGLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the BackTiltAngleAvailable
     * @returns {Boolean} - the KEY_BACK_TILT_ANGLE_AVAILABLE value
     */
    getBackTiltAngleAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_BACK_TILT_ANGLE_AVAILABLE);
    }

    /**
     * Set the HeadSupportHorizontalPositionAvailable
     * @param {Boolean} available - The desired HeadSupportHorizontalPositionAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setHeadSupportHorizontalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeadSupportHorizontalPositionAvailable
     * @returns {Boolean} - the KEY_HEAD_SUPPORT_HORIZONTAL_POSITION_AVAILABLE value
     */
    getHeadSupportHorizontalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION_AVAILABLE);
    }

    /**
     * Set the HeadSupportVerticalPositionAvailable
     * @param {Boolean} available - The desired HeadSupportVerticalPositionAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setHeadSupportVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HeadSupportVerticalPositionAvailable
     * @returns {Boolean} - the KEY_HEAD_SUPPORT_VERTICAL_POSITION_AVAILABLE value
     */
    getHeadSupportVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * Set the MassageEnabledAvailable
     * @param {Boolean} available - The desired MassageEnabledAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setMassageEnabledAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MASSAGE_ENABLED_AVAILABLE, available);
        return this;
    }

    /**
     * Get the MassageEnabledAvailable
     * @returns {Boolean} - the KEY_MASSAGE_ENABLED_AVAILABLE value
     */
    getMassageEnabledAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MASSAGE_ENABLED_AVAILABLE);
    }

    /**
     * Set the MassageModeAvailable
     * @param {Boolean} available - The desired MassageModeAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setMassageModeAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MASSAGE_MODE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the MassageModeAvailable
     * @returns {Boolean} - the KEY_MASSAGE_MODE_AVAILABLE value
     */
    getMassageModeAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MASSAGE_MODE_AVAILABLE);
    }

    /**
     * Set the MassageCushionFirmnessAvailable
     * @param {Boolean} available - The desired MassageCushionFirmnessAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setMassageCushionFirmnessAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MASSAGE_CUSHION_FIRMNESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the MassageCushionFirmnessAvailable
     * @returns {Boolean} - the KEY_MASSAGE_CUSHION_FIRMNESS_AVAILABLE value
     */
    getMassageCushionFirmnessAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MASSAGE_CUSHION_FIRMNESS_AVAILABLE);
    }

    /**
     * Set the MemoryAvailable
     * @param {Boolean} available - The desired MemoryAvailable.
     * @returns {SeatControlCapabilities} - The class instance for method chaining.
     */
    setMemoryAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MEMORY_AVAILABLE, available);
        return this;
    }

    /**
     * Get the MemoryAvailable
     * @returns {Boolean} - the KEY_MEMORY_AVAILABLE value
     */
    getMemoryAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MEMORY_AVAILABLE);
    }
}

SeatControlCapabilities.KEY_MODULE_NAME = 'moduleName';
SeatControlCapabilities.KEY_MODULE_INFO = 'moduleInfo';
SeatControlCapabilities.KEY_HEATING_ENABLED_AVAILABLE = 'heatingEnabledAvailable';
SeatControlCapabilities.KEY_COOLING_ENABLED_AVAILABLE = 'coolingEnabledAvailable';
SeatControlCapabilities.KEY_HEATING_LEVEL_AVAILABLE = 'heatingLevelAvailable';
SeatControlCapabilities.KEY_COOLING_LEVEL_AVAILABLE = 'coolingLevelAvailable';
SeatControlCapabilities.KEY_HORIZONTAL_POSITION_AVAILABLE = 'horizontalPositionAvailable';
SeatControlCapabilities.KEY_VERTICAL_POSITION_AVAILABLE = 'verticalPositionAvailable';
SeatControlCapabilities.KEY_FRONT_VERTICAL_POSITION_AVAILABLE = 'frontVerticalPositionAvailable';
SeatControlCapabilities.KEY_BACK_VERTICAL_POSITION_AVAILABLE = 'backVerticalPositionAvailable';
SeatControlCapabilities.KEY_BACK_TILT_ANGLE_AVAILABLE = 'backTiltAngleAvailable';
SeatControlCapabilities.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION_AVAILABLE = 'headSupportHorizontalPositionAvailable';
SeatControlCapabilities.KEY_HEAD_SUPPORT_VERTICAL_POSITION_AVAILABLE = 'headSupportVerticalPositionAvailable';
SeatControlCapabilities.KEY_MASSAGE_ENABLED_AVAILABLE = 'massageEnabledAvailable';
SeatControlCapabilities.KEY_MASSAGE_MODE_AVAILABLE = 'massageModeAvailable';
SeatControlCapabilities.KEY_MASSAGE_CUSHION_FIRMNESS_AVAILABLE = 'massageCushionFirmnessAvailable';
SeatControlCapabilities.KEY_MEMORY_AVAILABLE = 'memoryAvailable';

export { SeatControlCapabilities };