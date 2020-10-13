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

import { AudioControlCapabilities } from './AudioControlCapabilities.js';
import { ButtonCapabilities } from './ButtonCapabilities.js';
import { ClimateControlCapabilities } from './ClimateControlCapabilities.js';
import { HMISettingsControlCapabilities } from './HMISettingsControlCapabilities.js';
import { LightControlCapabilities } from './LightControlCapabilities.js';
import { RadioControlCapabilities } from './RadioControlCapabilities.js';
import { RpcStruct } from '../RpcStruct.js';
import { SeatControlCapabilities } from './SeatControlCapabilities.js';

class RemoteControlCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of RemoteControlCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ClimateControlCapabilities
     * @param {ClimateControlCapabilities[]} capabilities - If included, the platform supports RC climate controls. For this baseline version, maxsize=1. i.e. only one climate control module is supported. - The desired ClimateControlCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setClimateControlCapabilities (capabilities) {
        this._validateType(ClimateControlCapabilities, capabilities, true);
        this.setParameter(RemoteControlCapabilities.KEY_CLIMATE_CONTROL_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the ClimateControlCapabilities
     * @returns {ClimateControlCapabilities[]} - the KEY_CLIMATE_CONTROL_CAPABILITIES value
     */
    getClimateControlCapabilities () {
        return this.getObject(ClimateControlCapabilities, RemoteControlCapabilities.KEY_CLIMATE_CONTROL_CAPABILITIES);
    }

    /**
     * Set the RadioControlCapabilities
     * @param {RadioControlCapabilities[]} capabilities - If included, the platform supports RC radio controls.For this baseline version, maxsize=1. i.e. only one radio control module is supported. - The desired RadioControlCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setRadioControlCapabilities (capabilities) {
        this._validateType(RadioControlCapabilities, capabilities, true);
        this.setParameter(RemoteControlCapabilities.KEY_RADIO_CONTROL_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the RadioControlCapabilities
     * @returns {RadioControlCapabilities[]} - the KEY_RADIO_CONTROL_CAPABILITIES value
     */
    getRadioControlCapabilities () {
        return this.getObject(RadioControlCapabilities, RemoteControlCapabilities.KEY_RADIO_CONTROL_CAPABILITIES);
    }

    /**
     * Set the ButtonCapabilities
     * @param {ButtonCapabilities[]} capabilities - If included, the platform supports RC button controls with the included button names. - The desired ButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setButtonCapabilities (capabilities) {
        this._validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(RemoteControlCapabilities.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the ButtonCapabilities
     * @returns {ButtonCapabilities[]} - the KEY_BUTTON_CAPABILITIES value
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, RemoteControlCapabilities.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * Set the AudioControlCapabilities
     * @param {AudioControlCapabilities[]} capabilities - If included, the platform supports audio controls. - The desired AudioControlCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setAudioControlCapabilities (capabilities) {
        this._validateType(AudioControlCapabilities, capabilities, true);
        this.setParameter(RemoteControlCapabilities.KEY_AUDIO_CONTROL_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the AudioControlCapabilities
     * @returns {AudioControlCapabilities[]} - the KEY_AUDIO_CONTROL_CAPABILITIES value
     */
    getAudioControlCapabilities () {
        return this.getObject(AudioControlCapabilities, RemoteControlCapabilities.KEY_AUDIO_CONTROL_CAPABILITIES);
    }

    /**
     * Set the HmiSettingsControlCapabilities
     * @param {HMISettingsControlCapabilities} capabilities - If included, the platform supports hmi setting controls. - The desired HmiSettingsControlCapabilities.
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setHmiSettingsControlCapabilities (capabilities) {
        this._validateType(HMISettingsControlCapabilities, capabilities);
        this.setParameter(RemoteControlCapabilities.KEY_HMI_SETTINGS_CONTROL_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the HmiSettingsControlCapabilities
     * @returns {HMISettingsControlCapabilities} - the KEY_HMI_SETTINGS_CONTROL_CAPABILITIES value
     */
    getHmiSettingsControlCapabilities () {
        return this.getObject(HMISettingsControlCapabilities, RemoteControlCapabilities.KEY_HMI_SETTINGS_CONTROL_CAPABILITIES);
    }

    /**
     * Set the LightControlCapabilities
     * @param {LightControlCapabilities} capabilities - If included, the platform supports light controls. - The desired LightControlCapabilities.
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setLightControlCapabilities (capabilities) {
        this._validateType(LightControlCapabilities, capabilities);
        this.setParameter(RemoteControlCapabilities.KEY_LIGHT_CONTROL_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the LightControlCapabilities
     * @returns {LightControlCapabilities} - the KEY_LIGHT_CONTROL_CAPABILITIES value
     */
    getLightControlCapabilities () {
        return this.getObject(LightControlCapabilities, RemoteControlCapabilities.KEY_LIGHT_CONTROL_CAPABILITIES);
    }

    /**
     * Set the SeatControlCapabilities
     * @param {SeatControlCapabilities[]} capabilities - If included, the platform supports seat controls. - The desired SeatControlCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RemoteControlCapabilities} - The class instance for method chaining.
     */
    setSeatControlCapabilities (capabilities) {
        this._validateType(SeatControlCapabilities, capabilities, true);
        this.setParameter(RemoteControlCapabilities.KEY_SEAT_CONTROL_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the SeatControlCapabilities
     * @returns {SeatControlCapabilities[]} - the KEY_SEAT_CONTROL_CAPABILITIES value
     */
    getSeatControlCapabilities () {
        return this.getObject(SeatControlCapabilities, RemoteControlCapabilities.KEY_SEAT_CONTROL_CAPABILITIES);
    }
}

RemoteControlCapabilities.KEY_CLIMATE_CONTROL_CAPABILITIES = 'climateControlCapabilities';
RemoteControlCapabilities.KEY_RADIO_CONTROL_CAPABILITIES = 'radioControlCapabilities';
RemoteControlCapabilities.KEY_BUTTON_CAPABILITIES = 'buttonCapabilities';
RemoteControlCapabilities.KEY_AUDIO_CONTROL_CAPABILITIES = 'audioControlCapabilities';
RemoteControlCapabilities.KEY_HMI_SETTINGS_CONTROL_CAPABILITIES = 'hmiSettingsControlCapabilities';
RemoteControlCapabilities.KEY_LIGHT_CONTROL_CAPABILITIES = 'lightControlCapabilities';
RemoteControlCapabilities.KEY_SEAT_CONTROL_CAPABILITIES = 'seatControlCapabilities';

export { RemoteControlCapabilities };