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

import { AudioControlData } from './AudioControlData.js';
import { ClimateControlData } from './ClimateControlData.js';
import { HMISettingsControlData } from './HMISettingsControlData.js';
import { LightControlData } from './LightControlData.js';
import { ModuleType } from '../enums/ModuleType.js';
import { RadioControlData } from './RadioControlData.js';
import { RpcStruct } from '../RpcStruct.js';
import { SeatControlData } from './SeatControlData.js';

/**
 * The moduleType indicates which type of data should be changed and identifies which data object exists in this
 * struct. For example, if the moduleType is CLIMATE then a "climateControlData" should exist
 */
class ModuleData extends RpcStruct {
    /**
     * Initalizes an instance of ModuleData.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {ModuleType} type
     * @return {ModuleData}
     */
    setModuleType (type) {
        this.validateType(ModuleType, type);
        this.setParameter(ModuleData.KEY_MODULE_TYPE, type);
        return this;
    }

    /**
     * @return {ModuleType}
     */
    getModuleType () {
        return this.getObject(ModuleType, ModuleData.KEY_MODULE_TYPE);
    }

    /**
     * @param {String} id - Id of a module, published by System Capability.
     * @return {ModuleData}
     */
    setModuleId (id) {
        this.setParameter(ModuleData.KEY_MODULE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleId () {
        return this.getParameter(ModuleData.KEY_MODULE_ID);
    }

    /**
     * @param {RadioControlData} data
     * @return {ModuleData}
     */
    setRadioControlData (data) {
        this.validateType(RadioControlData, data);
        this.setParameter(ModuleData.KEY_RADIO_CONTROL_DATA, data);
        return this;
    }

    /**
     * @return {RadioControlData}
     */
    getRadioControlData () {
        return this.getObject(RadioControlData, ModuleData.KEY_RADIO_CONTROL_DATA);
    }

    /**
     * @param {ClimateControlData} data
     * @return {ModuleData}
     */
    setClimateControlData (data) {
        this.validateType(ClimateControlData, data);
        this.setParameter(ModuleData.KEY_CLIMATE_CONTROL_DATA, data);
        return this;
    }

    /**
     * @return {ClimateControlData}
     */
    getClimateControlData () {
        return this.getObject(ClimateControlData, ModuleData.KEY_CLIMATE_CONTROL_DATA);
    }

    /**
     * @param {SeatControlData} data - Seat control data corresponds to "SEAT" ModuleType.
     * @return {ModuleData}
     */
    setSeatControlData (data) {
        this.validateType(SeatControlData, data);
        this.setParameter(ModuleData.KEY_SEAT_CONTROL_DATA, data);
        return this;
    }

    /**
     * @return {SeatControlData}
     */
    getSeatControlData () {
        return this.getObject(SeatControlData, ModuleData.KEY_SEAT_CONTROL_DATA);
    }

    /**
     * @param {AudioControlData} data
     * @return {ModuleData}
     */
    setAudioControlData (data) {
        this.validateType(AudioControlData, data);
        this.setParameter(ModuleData.KEY_AUDIO_CONTROL_DATA, data);
        return this;
    }

    /**
     * @return {AudioControlData}
     */
    getAudioControlData () {
        return this.getObject(AudioControlData, ModuleData.KEY_AUDIO_CONTROL_DATA);
    }

    /**
     * @param {LightControlData} data
     * @return {ModuleData}
     */
    setLightControlData (data) {
        this.validateType(LightControlData, data);
        this.setParameter(ModuleData.KEY_LIGHT_CONTROL_DATA, data);
        return this;
    }

    /**
     * @return {LightControlData}
     */
    getLightControlData () {
        return this.getObject(LightControlData, ModuleData.KEY_LIGHT_CONTROL_DATA);
    }

    /**
     * @param {HMISettingsControlData} data - Corresponds to "HMI_SETTINGS" ModuleType
     * @return {ModuleData}
     */
    setHmiSettingsControlData (data) {
        this.validateType(HMISettingsControlData, data);
        this.setParameter(ModuleData.KEY_HMI_SETTINGS_CONTROL_DATA, data);
        return this;
    }

    /**
     * @return {HMISettingsControlData}
     */
    getHmiSettingsControlData () {
        return this.getObject(HMISettingsControlData, ModuleData.KEY_HMI_SETTINGS_CONTROL_DATA);
    }
}

ModuleData.KEY_MODULE_TYPE = 'moduleType';
ModuleData.KEY_MODULE_ID = 'moduleId';
ModuleData.KEY_RADIO_CONTROL_DATA = 'radioControlData';
ModuleData.KEY_CLIMATE_CONTROL_DATA = 'climateControlData';
ModuleData.KEY_SEAT_CONTROL_DATA = 'seatControlData';
ModuleData.KEY_AUDIO_CONTROL_DATA = 'audioControlData';
ModuleData.KEY_LIGHT_CONTROL_DATA = 'lightControlData';
ModuleData.KEY_HMI_SETTINGS_CONTROL_DATA = 'hmiSettingsControlData';

export { ModuleData };