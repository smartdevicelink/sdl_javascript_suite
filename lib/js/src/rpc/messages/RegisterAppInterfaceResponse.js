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

import { AudioPassThruCapabilities } from '../structs/AudioPassThruCapabilities.js';
import { ButtonCapabilities } from '../structs/ButtonCapabilities.js';
import { DisplayCapabilities } from '../structs/DisplayCapabilities.js';
import { FunctionID } from '../enums/FunctionID.js';
import { HMICapabilities } from '../structs/HMICapabilities.js';
import { HmiZoneCapabilities } from '../enums/HmiZoneCapabilities.js';
import { Language } from '../enums/Language.js';
import { PrerecordedSpeech } from '../enums/PrerecordedSpeech.js';
import { PresetBankCapabilities } from '../structs/PresetBankCapabilities.js';
import { RpcResponse } from '../RpcResponse.js';
import { SdlMsgVersion } from '../structs/SdlMsgVersion.js';
import { SoftButtonCapabilities } from '../structs/SoftButtonCapabilities.js';
import { SpeechCapabilities } from '../enums/SpeechCapabilities.js';
import { VehicleType } from '../structs/VehicleType.js';
import { VrCapabilities } from '../enums/VrCapabilities.js';

/**
 * The response to registerAppInterface
 */
class RegisterAppInterfaceResponse extends RpcResponse {
    /**
     * Initalizes an instance of RegisterAppInterfaceResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.RegisterAppInterface);
    }

    /**
     * Set the SdlMsgVersion
     * @param {SdlMsgVersion} version - See SyncMsgVersion - The desired SdlMsgVersion.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setSdlMsgVersion (version) {
        this._validateType(SdlMsgVersion, version);
        this.setParameter(RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION, version);
        return this;
    }

    /**
     * Get the SdlMsgVersion
     * @returns {SdlMsgVersion} - the KEY_SDL_MSG_VERSION value
     */
    getSdlMsgVersion () {
        return this.getObject(SdlMsgVersion, RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION);
    }

    /**
     * Set the Language
     * @param {Language} language - The currently active VR+TTS language on the module. See "Language" for options. - The desired Language.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setLanguage (language) {
        this._validateType(Language, language);
        this.setParameter(RegisterAppInterfaceResponse.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * Get the Language
     * @returns {Language} - the KEY_LANGUAGE value
     */
    getLanguage () {
        return this.getObject(Language, RegisterAppInterfaceResponse.KEY_LANGUAGE);
    }

    /**
     * Set the HmiDisplayLanguage
     * @since SmartDeviceLink 2.0.0
     * @param {Language} language - The currently active display language on the module. See "Language" for options. - The desired HmiDisplayLanguage.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setHmiDisplayLanguage (language) {
        this._validateType(Language, language);
        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE, language);
        return this;
    }

    /**
     * Get the HmiDisplayLanguage
     * @returns {Language} - the KEY_HMI_DISPLAY_LANGUAGE value
     */
    getHmiDisplayLanguage () {
        return this.getObject(Language, RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE);
    }

    /**
     * Set the DisplayCapabilities
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @param {DisplayCapabilities} capabilities - See DisplayCapabilities. This parameter is deprecated and replaced by SystemCapability using DISPLAYS. - The desired DisplayCapabilities.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setDisplayCapabilities (capabilities) {
        this._validateType(DisplayCapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the DisplayCapabilities
     * @returns {DisplayCapabilities} - the KEY_DISPLAY_CAPABILITIES value
     */
    getDisplayCapabilities () {
        return this.getObject(DisplayCapabilities, RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES);
    }

    /**
     * Set the ButtonCapabilities
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @param {ButtonCapabilities[]} capabilities - See ButtonCapabilities. This parameter is deprecated and replaced by SystemCapability using DISPLAYS. - The desired ButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setButtonCapabilities (capabilities) {
        this._validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the ButtonCapabilities
     * @returns {ButtonCapabilities[]} - the KEY_BUTTON_CAPABILITIES value
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * Set the SoftButtonCapabilities
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @param {SoftButtonCapabilities[]} capabilities - If returned, the platform supports on-screen SoftButtons; see SoftButtonCapabilities. This parameter is deprecated and replaced by SystemCapability using DISPLAYS. - The desired SoftButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setSoftButtonCapabilities (capabilities) {
        this._validateType(SoftButtonCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the SoftButtonCapabilities
     * @returns {SoftButtonCapabilities[]} - the KEY_SOFT_BUTTON_CAPABILITIES value
     */
    getSoftButtonCapabilities () {
        return this.getObject(SoftButtonCapabilities, RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
     * Set the PresetBankCapabilities
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @param {PresetBankCapabilities} capabilities - If returned, the platform supports custom on-screen Presets; see PresetBankCapabilities. This parameter is deprecated and replaced by SystemCapability using DISPLAYS. - The desired PresetBankCapabilities.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setPresetBankCapabilities (capabilities) {
        this._validateType(PresetBankCapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the PresetBankCapabilities
     * @returns {PresetBankCapabilities} - the KEY_PRESET_BANK_CAPABILITIES value
     */
    getPresetBankCapabilities () {
        return this.getObject(PresetBankCapabilities, RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES);
    }

    /**
     * Set the HmiZoneCapabilities
     * @since SmartDeviceLink 1.0.0
     * @param {HmiZoneCapabilities[]} capabilities - See HmiZoneCapabilities - The desired HmiZoneCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setHmiZoneCapabilities (capabilities) {
        this._validateType(HmiZoneCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the HmiZoneCapabilities
     * @returns {HmiZoneCapabilities[]} - the KEY_HMI_ZONE_CAPABILITIES value
     */
    getHmiZoneCapabilities () {
        return this.getObject(HmiZoneCapabilities, RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES);
    }

    /**
     * Set the SpeechCapabilities
     * @since SmartDeviceLink 1.0.0
     * @param {SpeechCapabilities[]} capabilities - See SpeechCapabilities - The desired SpeechCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setSpeechCapabilities (capabilities) {
        this._validateType(SpeechCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the SpeechCapabilities
     * @returns {SpeechCapabilities[]} - the KEY_SPEECH_CAPABILITIES value
     */
    getSpeechCapabilities () {
        return this.getObject(SpeechCapabilities, RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES);
    }

    /**
     * Set the PrerecordedSpeech
     * @since SmartDeviceLink 3.0.0
     * @param {PrerecordedSpeech[]} speech - See PrerecordedSpeech - The desired PrerecordedSpeech.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setPrerecordedSpeech (speech) {
        this._validateType(PrerecordedSpeech, speech, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH, speech);
        return this;
    }

    /**
     * Get the PrerecordedSpeech
     * @returns {PrerecordedSpeech[]} - the KEY_PRERECORDED_SPEECH value
     */
    getPrerecordedSpeech () {
        return this.getObject(PrerecordedSpeech, RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH);
    }

    /**
     * Set the VrCapabilities
     * @since SmartDeviceLink 1.0.0
     * @param {VrCapabilities[]} capabilities - See VrCapabilities - The desired VrCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setVrCapabilities (capabilities) {
        this._validateType(VrCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the VrCapabilities
     * @returns {VrCapabilities[]} - the KEY_VR_CAPABILITIES value
     */
    getVrCapabilities () {
        return this.getObject(VrCapabilities, RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES);
    }

    /**
     * Set the AudioPassThruCapabilities
     * @since SmartDeviceLink 2.0.0
     * @param {AudioPassThruCapabilities[]} capabilities - See AudioPassThruCapability - The desired AudioPassThruCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setAudioPassThruCapabilities (capabilities) {
        this._validateType(AudioPassThruCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the AudioPassThruCapabilities
     * @returns {AudioPassThruCapabilities[]} - the KEY_AUDIO_PASS_THRU_CAPABILITIES value
     */
    getAudioPassThruCapabilities () {
        return this.getObject(AudioPassThruCapabilities, RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES);
    }

    /**
     * Set the PcmStreamCapabilities
     * @since SmartDeviceLink 4.1.0
     * @param {AudioPassThruCapabilities} capabilities - See AudioPassThruCapability - The desired PcmStreamCapabilities.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setPcmStreamCapabilities (capabilities) {
        this._validateType(AudioPassThruCapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the PcmStreamCapabilities
     * @returns {AudioPassThruCapabilities} - the KEY_PCM_STREAM_CAPABILITIES value
     */
    getPcmStreamCapabilities () {
        return this.getObject(AudioPassThruCapabilities, RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES);
    }

    /**
     * Set the VehicleType
     * @since SmartDeviceLink 2.0.0
     * @param {VehicleType} type - Specifies the vehicle's type. See VehicleType. - The desired VehicleType.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setVehicleType (type) {
        this._validateType(VehicleType, type);
        this.setParameter(RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE, type);
        return this;
    }

    /**
     * Get the VehicleType
     * @returns {VehicleType} - the KEY_VEHICLE_TYPE value
     */
    getVehicleType () {
        return this.getObject(VehicleType, RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE);
    }

    /**
     * Set the SupportedDiagModes
     * @since SmartDeviceLink 3.0.0
     * @param {Number[]} modes - Specifies the white-list of supported diagnostic modes (0x00-0xFF) capable for DiagnosticMessage requests. If a mode outside this list is requested, it will be rejected. - The desired SupportedDiagModes.
     * {'array_min_size': 1, 'array_max_size': 100, 'num_min_value': 0, 'num_max_value': 255}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setSupportedDiagModes (modes) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODES, modes);
        return this;
    }

    /**
     * Get the SupportedDiagModes
     * @returns {Number[]} - the KEY_SUPPORTED_DIAG_MODES value
     */
    getSupportedDiagModes () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODES);
    }

    /**
     * Set the HmiCapabilities
     * @since SmartDeviceLink 3.0.0
     * @param {HMICapabilities} capabilities - Specifies the HMI's capabilities. See HMICapabilities. - The desired HmiCapabilities.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setHmiCapabilities (capabilities) {
        this._validateType(HMICapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the HmiCapabilities
     * @returns {HMICapabilities} - the KEY_HMI_CAPABILITIES value
     */
    getHmiCapabilities () {
        return this.getObject(HMICapabilities, RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES);
    }

    /**
     * Set the SdlVersion
     * @since SmartDeviceLink 3.0.0
     * @param {String} version - The SmartDeviceLink version. - The desired SdlVersion.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setSdlVersion (version) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SDL_VERSION, version);
        return this;
    }

    /**
     * Get the SdlVersion
     * @returns {String} - the KEY_SDL_VERSION value
     */
    getSdlVersion () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SDL_VERSION);
    }

    /**
     * Set the SystemSoftwareVersion
     * @since SmartDeviceLink 3.0.0
     * @param {String} version - The software version of the system that implements the SmartDeviceLink core. - The desired SystemSoftwareVersion.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setSystemSoftwareVersion (version) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION, version);
        return this;
    }

    /**
     * Get the SystemSoftwareVersion
     * @returns {String} - the KEY_SYSTEM_SOFTWARE_VERSION value
     */
    getSystemSoftwareVersion () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION);
    }

    /**
     * Set the IconResumed
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} resumed - Existence of apps icon at system. If true, apps icon was resumed at system. If false, apps icon is not resumed at system - The desired IconResumed.
     * @returns {RegisterAppInterfaceResponse} - The class instance for method chaining.
     */
    setIconResumed (resumed) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_ICON_RESUMED, resumed);
        return this;
    }

    /**
     * Get the IconResumed
     * @returns {Boolean} - the KEY_ICON_RESUMED value
     */
    getIconResumed () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_ICON_RESUMED);
    }
}

RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION = 'syncMsgVersion';
RegisterAppInterfaceResponse.KEY_LANGUAGE = 'language';
RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE = 'hmiDisplayLanguage';
RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES = 'displayCapabilities';
RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES = 'buttonCapabilities';
RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES = 'softButtonCapabilities';
RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES = 'presetBankCapabilities';
RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES = 'hmiZoneCapabilities';
RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES = 'speechCapabilities';
RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH = 'prerecordedSpeech';
RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES = 'vrCapabilities';
RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES = 'audioPassThruCapabilities';
RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES = 'pcmStreamCapabilities';
RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE = 'vehicleType';
RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODES = 'supportedDiagModes';
RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES = 'hmiCapabilities';
RegisterAppInterfaceResponse.KEY_SDL_VERSION = 'sdlVersion';
RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION = 'systemSoftwareVersion';
RegisterAppInterfaceResponse.KEY_ICON_RESUMED = 'iconResumed';

export { RegisterAppInterfaceResponse };