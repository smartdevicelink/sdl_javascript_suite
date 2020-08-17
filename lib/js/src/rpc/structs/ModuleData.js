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
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleType
     * @param {ModuleType} type - The desired ModuleType.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setModuleType (type) {
        this._validateType(ModuleType, type);
        this.setParameter(ModuleData.KEY_MODULE_TYPE, type);
        return this;
    }

    /**
     * Get the ModuleType
     * @returns {ModuleType} - the KEY_MODULE_TYPE value
     */
    getModuleType () {
        return this.getObject(ModuleType, ModuleData.KEY_MODULE_TYPE);
    }

    /**
     * Set the ModuleId
     * @param {String} id - Id of a module, published by System Capability. - The desired ModuleId.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setModuleId (id) {
        this.setParameter(ModuleData.KEY_MODULE_ID, id);
        return this;
    }

    /**
     * Get the ModuleId
     * @returns {String} - the KEY_MODULE_ID value
     */
    getModuleId () {
        return this.getParameter(ModuleData.KEY_MODULE_ID);
    }

    /**
     * Set the RadioControlData
     * @param {RadioControlData} data - The desired RadioControlData.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setRadioControlData (data) {
        this._validateType(RadioControlData, data);
        this.setParameter(ModuleData.KEY_RADIO_CONTROL_DATA, data);
        return this;
    }

    /**
     * Get the RadioControlData
     * @returns {RadioControlData} - the KEY_RADIO_CONTROL_DATA value
     */
    getRadioControlData () {
        return this.getObject(RadioControlData, ModuleData.KEY_RADIO_CONTROL_DATA);
    }

    /**
     * Set the ClimateControlData
     * @param {ClimateControlData} data - The desired ClimateControlData.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setClimateControlData (data) {
        this._validateType(ClimateControlData, data);
        this.setParameter(ModuleData.KEY_CLIMATE_CONTROL_DATA, data);
        return this;
    }

    /**
     * Get the ClimateControlData
     * @returns {ClimateControlData} - the KEY_CLIMATE_CONTROL_DATA value
     */
    getClimateControlData () {
        return this.getObject(ClimateControlData, ModuleData.KEY_CLIMATE_CONTROL_DATA);
    }

    /**
     * Set the SeatControlData
     * @param {SeatControlData} data - Seat control data corresponds to "SEAT" ModuleType. - The desired SeatControlData.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setSeatControlData (data) {
        this._validateType(SeatControlData, data);
        this.setParameter(ModuleData.KEY_SEAT_CONTROL_DATA, data);
        return this;
    }

    /**
     * Get the SeatControlData
     * @returns {SeatControlData} - the KEY_SEAT_CONTROL_DATA value
     */
    getSeatControlData () {
        return this.getObject(SeatControlData, ModuleData.KEY_SEAT_CONTROL_DATA);
    }

    /**
     * Set the AudioControlData
     * @param {AudioControlData} data - The desired AudioControlData.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setAudioControlData (data) {
        this._validateType(AudioControlData, data);
        this.setParameter(ModuleData.KEY_AUDIO_CONTROL_DATA, data);
        return this;
    }

    /**
     * Get the AudioControlData
     * @returns {AudioControlData} - the KEY_AUDIO_CONTROL_DATA value
     */
    getAudioControlData () {
        return this.getObject(AudioControlData, ModuleData.KEY_AUDIO_CONTROL_DATA);
    }

    /**
     * Set the LightControlData
     * @param {LightControlData} data - The desired LightControlData.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setLightControlData (data) {
        this._validateType(LightControlData, data);
        this.setParameter(ModuleData.KEY_LIGHT_CONTROL_DATA, data);
        return this;
    }

    /**
     * Get the LightControlData
     * @returns {LightControlData} - the KEY_LIGHT_CONTROL_DATA value
     */
    getLightControlData () {
        return this.getObject(LightControlData, ModuleData.KEY_LIGHT_CONTROL_DATA);
    }

    /**
     * Set the HmiSettingsControlData
     * @param {HMISettingsControlData} data - Corresponds to "HMI_SETTINGS" ModuleType - The desired HmiSettingsControlData.
     * @returns {ModuleData} - The class instance for method chaining.
     */
    setHmiSettingsControlData (data) {
        this._validateType(HMISettingsControlData, data);
        this.setParameter(ModuleData.KEY_HMI_SETTINGS_CONTROL_DATA, data);
        return this;
    }

    /**
     * Get the HmiSettingsControlData
     * @returns {HMISettingsControlData} - the KEY_HMI_SETTINGS_CONTROL_DATA value
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