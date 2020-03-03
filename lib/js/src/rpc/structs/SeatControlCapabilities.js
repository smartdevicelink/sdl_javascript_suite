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

class SeatControlCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of SeatControlCapabilities.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - The short friendly name of the light control module. It should not be used to identify a
     *                        module by mobile application.
     * @return {SeatControlCapabilities}
     */
    setModuleName (name) {
        this.setParameter(SeatControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleName () {
        return this.getParameter(SeatControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * @param {ModuleInfo} info - Information about a RC module, including its id.
     * @return {SeatControlCapabilities}
     */
    setModuleInfo (info) {
        this.validateType(ModuleInfo, info);
        this.setParameter(SeatControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * @return {ModuleInfo}
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, SeatControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setHeatingEnabledAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEATING_ENABLED_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatingEnabledAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEATING_ENABLED_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setCoolingEnabledAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_COOLING_ENABLED_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCoolingEnabledAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_COOLING_ENABLED_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setHeatingLevelAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEATING_LEVEL_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatingLevelAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEATING_LEVEL_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setCoolingLevelAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_COOLING_LEVEL_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCoolingLevelAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_COOLING_LEVEL_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setHorizontalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HORIZONTAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHorizontalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HORIZONTAL_POSITION_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setFrontVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_FRONT_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFrontVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_FRONT_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setBackVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_BACK_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBackVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_BACK_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setBackTiltAngleAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_BACK_TILT_ANGLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBackTiltAngleAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_BACK_TILT_ANGLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setHeadSupportHorizontalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeadSupportHorizontalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setHeadSupportVerticalPositionAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_VERTICAL_POSITION_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeadSupportVerticalPositionAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_HEAD_SUPPORT_VERTICAL_POSITION_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setMassageEnabledAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MASSAGE_ENABLED_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMassageEnabledAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MASSAGE_ENABLED_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setMassageModeAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MASSAGE_MODE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMassageModeAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MASSAGE_MODE_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setMassageCushionFirmnessAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MASSAGE_CUSHION_FIRMNESS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMassageCushionFirmnessAvailable () {
        return this.getParameter(SeatControlCapabilities.KEY_MASSAGE_CUSHION_FIRMNESS_AVAILABLE);
    }

    /**
     * @param {Boolean} available
     * @return {SeatControlCapabilities}
     */
    setMemoryAvailable (available) {
        this.setParameter(SeatControlCapabilities.KEY_MEMORY_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
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