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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.RegisterAppInterface);
    }

    /**
     * @param {SdlMsgVersion} version - See SyncMsgVersion
     * @return {RegisterAppInterfaceResponse}
     */
    setSdlMsgVersion (version) {
        this.validateType(SdlMsgVersion, version);
        this.setParameter(RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION, version);
        return this;
    }

    /**
     * @return {SdlMsgVersion}
     */
    getSdlMsgVersion () {
        return this.getObject(SdlMsgVersion, RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION);
    }

    /**
     * @param {Language} language - The currently active VR+TTS language on the module. See "Language" for options.
     * @return {RegisterAppInterfaceResponse}
     */
    setLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(RegisterAppInterfaceResponse.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getLanguage () {
        return this.getObject(Language, RegisterAppInterfaceResponse.KEY_LANGUAGE);
    }

    /**
     * @param {Language} language - The currently active display language on the module. See "Language" for options.
     * @return {RegisterAppInterfaceResponse}
     */
    setHmiDisplayLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getHmiDisplayLanguage () {
        return this.getObject(Language, RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE);
    }

    /**
     * @param {DisplayCapabilities} capabilities - See DisplayCapabilities. This parameter is deprecated and replaced by
     *                                             SystemCapability using DISPLAYS.
     * @return {RegisterAppInterfaceResponse}
     */
    setDisplayCapabilities (capabilities) {
        this.validateType(DisplayCapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {DisplayCapabilities}
     */
    getDisplayCapabilities () {
        return this.getObject(DisplayCapabilities, RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES);
    }

    /**
     * @param {ButtonCapabilities[]} capabilities - See ButtonCapabilities. This parameter is deprecated and replaced by
     *                                              SystemCapability using DISPLAYS.
     * @return {RegisterAppInterfaceResponse}
     */
    setButtonCapabilities (capabilities) {
        this.validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {ButtonCapabilities[]}
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * @param {SoftButtonCapabilities[]} capabilities - If returned, the platform supports on-screen SoftButtons; see
     *                                                  SoftButtonCapabilities. This parameter is deprecated and
     *                                                  replaced by SystemCapability using DISPLAYS.
     * @return {RegisterAppInterfaceResponse}
     */
    setSoftButtonCapabilities (capabilities) {
        this.validateType(SoftButtonCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {SoftButtonCapabilities[]}
     */
    getSoftButtonCapabilities () {
        return this.getObject(SoftButtonCapabilities, RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
     * @param {PresetBankCapabilities} capabilities - If returned, the platform supports custom on-screen Presets; see
     *                                                PresetBankCapabilities. This parameter is deprecated and replaced
     *                                                by SystemCapability using DISPLAYS.
     * @return {RegisterAppInterfaceResponse}
     */
    setPresetBankCapabilities (capabilities) {
        this.validateType(PresetBankCapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {PresetBankCapabilities}
     */
    getPresetBankCapabilities () {
        return this.getObject(PresetBankCapabilities, RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES);
    }

    /**
     * @param {HmiZoneCapabilities[]} capabilities - See HmiZoneCapabilities
     * @return {RegisterAppInterfaceResponse}
     */
    setHmiZoneCapabilities (capabilities) {
        this.validateType(HmiZoneCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {HmiZoneCapabilities[]}
     */
    getHmiZoneCapabilities () {
        return this.getObject(HmiZoneCapabilities, RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES);
    }

    /**
     * @param {SpeechCapabilities[]} capabilities - See SpeechCapabilities
     * @return {RegisterAppInterfaceResponse}
     */
    setSpeechCapabilities (capabilities) {
        this.validateType(SpeechCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {SpeechCapabilities[]}
     */
    getSpeechCapabilities () {
        return this.getObject(SpeechCapabilities, RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES);
    }

    /**
     * @param {PrerecordedSpeech[]} speech - See PrerecordedSpeech
     * @return {RegisterAppInterfaceResponse}
     */
    setPrerecordedSpeech (speech) {
        this.validateType(PrerecordedSpeech, speech, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH, speech);
        return this;
    }

    /**
     * @return {PrerecordedSpeech[]}
     */
    getPrerecordedSpeech () {
        return this.getObject(PrerecordedSpeech, RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH);
    }

    /**
     * @param {VrCapabilities[]} capabilities - See VrCapabilities
     * @return {RegisterAppInterfaceResponse}
     */
    setVrCapabilities (capabilities) {
        this.validateType(VrCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {VrCapabilities[]}
     */
    getVrCapabilities () {
        return this.getObject(VrCapabilities, RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES);
    }

    /**
     * @param {AudioPassThruCapabilities[]} capabilities - See AudioPassThruCapability
     * @return {RegisterAppInterfaceResponse}
     */
    setAudioPassThruCapabilities (capabilities) {
        this.validateType(AudioPassThruCapabilities, capabilities, true);
        this.setParameter(RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {AudioPassThruCapabilities[]}
     */
    getAudioPassThruCapabilities () {
        return this.getObject(AudioPassThruCapabilities, RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES);
    }

    /**
     * @param {AudioPassThruCapabilities} capabilities - See AudioPassThruCapability
     * @return {RegisterAppInterfaceResponse}
     */
    setPcmStreamCapabilities (capabilities) {
        this.validateType(AudioPassThruCapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {AudioPassThruCapabilities}
     */
    getPcmStreamCapabilities () {
        return this.getObject(AudioPassThruCapabilities, RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES);
    }

    /**
     * @param {VehicleType} type - Specifies the vehicle's type. See VehicleType.
     * @return {RegisterAppInterfaceResponse}
     */
    setVehicleType (type) {
        this.validateType(VehicleType, type);
        this.setParameter(RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE, type);
        return this;
    }

    /**
     * @return {VehicleType}
     */
    getVehicleType () {
        return this.getObject(VehicleType, RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE);
    }

    /**
     * @param {Number[]} modes - Specifies the white-list of supported diagnostic modes (0x00-0xFF) capable for
     *                           DiagnosticMessage requests. If a mode outside this list is requested, it will be
     *                           rejected.
     * @return {RegisterAppInterfaceResponse}
     */
    setSupportedDiagModes (modes) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODES, modes);
        return this;
    }

    /**
     * @return {Number[]}
     */
    getSupportedDiagModes () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODES);
    }

    /**
     * @param {HMICapabilities} capabilities - Specifies the HMI's capabilities. See HMICapabilities.
     * @return {RegisterAppInterfaceResponse}
     */
    setHmiCapabilities (capabilities) {
        this.validateType(HMICapabilities, capabilities);
        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {HMICapabilities}
     */
    getHmiCapabilities () {
        return this.getObject(HMICapabilities, RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES);
    }

    /**
     * @param {String} version - The SmartDeviceLink version.
     * @return {RegisterAppInterfaceResponse}
     */
    setSdlVersion (version) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SDL_VERSION, version);
        return this;
    }

    /**
     * @return {String}
     */
    getSdlVersion () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SDL_VERSION);
    }

    /**
     * @param {String} version - The software version of the system that implements the SmartDeviceLink core.
     * @return {RegisterAppInterfaceResponse}
     */
    setSystemSoftwareVersion (version) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION, version);
        return this;
    }

    /**
     * @return {String}
     */
    getSystemSoftwareVersion () {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION);
    }

    /**
     * @param {Boolean} resumed - Existence of apps icon at system. If true, apps icon was resumed at system. If false,
     *                            apps icon is not resumed at system
     * @return {RegisterAppInterfaceResponse}
     */
    setIconResumed (resumed) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_ICON_RESUMED, resumed);
        return this;
    }

    /**
     * @return {Boolean}
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