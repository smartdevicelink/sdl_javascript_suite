/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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

import { RpcResponse } from '../RpcResponse.js';
import { SdlMsgVersion } from '../structs/SdlMsgVersion.js';
import { DisplayCapabilities } from '../structs/DisplayCapabilities.js';
import { ButtonCapabilities } from '../structs/ButtonCapabilities.js';
import { SoftButtonCapabilities } from '../structs/SoftButtonCapabilities.js';
import { PresetBankCapabilities } from '../structs/PresetBankCapabilities.js';
import { VehicleType } from '../structs/VehicleType.js';
import { Language } from '../enums/Language.js';
import { HmiZoneCapabilities } from '../enums/HmiZoneCapabilities.js';
import { SpeechCapabilities } from '../enums/SpeechCapabilities.js';
import { PrerecordedSpeech } from '../enums/PrerecordedSpeech.js';
import { FunctionID } from '../enums/FunctionID.js';
import { AudioPassThruCapabilities } from '../structs/AudioPassThruCapabilities.js';
import { VrCapabilities } from '../enums/VrCapabilities.js';

class RegisterAppInterfaceResponse extends RpcResponse {
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.RegisterAppInterface);
    }

    /**
    * @param {SdlMsgVersion} The max RPC Spec version supported by this library
    * @return {RegisterAppInterfaceResponse}
    */
    setSdlMsgVersion(sdlMsgVersion) {
        this.validateType(SdlMsgVersion, sdlMsgVersion);

        this.setParameter(RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION, sdlMsgVersion);
        return this;
    }

    /**
    * @return {SdlMsgVersion}
    */
    getSdlMsgVersion() {
        return this.getObject(SdlMsgVersion, RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION);
    }

    /**
    * @param {Language} language
    * @return {RegisterAppInterfaceResponse}
    */
    setLanguage(language) {
        this.validateType(Language, language);

        this.setParameter(RegisterAppInterfaceResponse.KEY_LANGUAGE, language);
        return this;
    }

    /**
    * @return {Language}
    */
    getLanguage() {
        return this.getObject(Language, RegisterAppInterfaceResponse.KEY_LANGUAGE);
    }


    /**
    * @param {Language} hmiDisplayLanguage
    * @return {RegisterAppInterfaceResponse}
    */
    setHmiDisplayLanguage(hmiDisplayLanguage) {
        this.validateType(Language, hmiDisplayLanguage);

        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE, hmiDisplayLanguage);
        return this;
    }

    /**
    * @return {Language}
    */
    getHmiDisplayLanguage() {
        return this.getObject(Language, RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE);
    }

    /**
    * @param {DisplayCapabilities} displayCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setDisplayCapabilities(displayCapabilities) {
        this.validateType(DisplayCapabilities, displayCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES, displayCapabilities);
        return this;
    }

    /**
    * @return {DisplayCapabilities}
    */
    getDisplayCapabilities() {
        return this.getObject(DisplayCapabilities, RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES);
    }


    /**
    * @param {Array<ButtonCapabilities>} buttonCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setButtonCapabilities(buttonCapabilities) {
        //TODO make this work with arrays
        //this.validateType(Language, buttonCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES, buttonCapabilities);
        return this;
    }

    /**
    * @return {Array<ButtonCapabilities>}
    */
    getButtonCapabilities() {
        return this.getObject(ButtonCapabilities, RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES);
    }

    /**
    * @param {Array<SoftButtonCapabilities>} softButtonCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setSoftButtonCapabilities(softButtonCapabilities) {
        //TODO make this work with arrays
        //this.validateType(SoftButtonCapabilities, softButtonCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES, softButtonCapabilities);
        return this;
    }

    /**
    * @return {Array<SoftButtonCapabilities>}
    */
    getSoftButtonCapabilities() {
        return this.getObject(SoftButtonCapabilities, RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
    * @param {PresetBankCapabilities} presetBankCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setPresetBankCapabilities(presetBankCapabilities) {
        this.validateType(PresetBankCapabilities, presetBankCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES, presetBankCapabilities);
        return this;
    }

    /**
    * @return {PresetBankCapabilities}
    */
    getPresetBankCapabilities() {
        return this.getObject(PresetBankCapabilities, RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES);
    }

    /**
    * @param {Array<HmiZoneCapabilities>} hmiZoneCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setHmiZoneCapabilities(hmiZoneCapabilities) {
        //TODO make this work for arrays
        //this.validateType(HmiZoneCapabilities, hmiZoneCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES, hmiZoneCapabilities);
        return this;
    }

    /**
    * @return {Array<HmiZoneCapabilities>}
    */
    getHmiZoneCapabilities() {
        return this.getObject(HmiZoneCapabilities, RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES);
    }

    /**
    * @param {Array<SpeechCapabilities>} speechCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setSpeechCapabilities(speechCapabilities) {
        //TODO make this work for arrays
        //this.validateType(SpeechCapabilities, speechCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES, speechCapabilities);
        return this;
    }

    /**
    * @return {Array<SpeechCapabilities>}
    */
    getSpeechCapabilities() {
        return this.getObject(SpeechCapabilities, RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES);
    }

    /**
    * @param {Array<PrerecordedSpeech>} speechCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setPrerecordedSpeech(speechCapabilities) {
        //TODO make this work for arrays
        //this.validateType(PrerecordedSpeech, speechCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH, speechCapabilities);
        return this;
    }

    /**
    * @return {Array<PrerecordedSpeech>}
    */
    getPrerecordedSpeech() {
        return this.getObject(PrerecordedSpeech, RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH);
    }

    /**
    * @param {Array<VrCapabilities>} vrCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setVrCapabilities(vrCapabilities) {
        //TODO make this work for arrays
        //this.validateType(VrCapabilities, vrCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES, vrCapabilities);
        return this;
    }

    /**
    * @return {Array<VrCapabilities>}
    */
    getVrCapabilities() {
        return this.getObject(VrCapabilities, RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES);
    }

    /**
    * @param {Array<AudioPassThruCapabilities>} audioPassThruCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setAudioPassThruCapabilities(audioPassThruCapabilities) {
        //TODO make this work for arrays
        //this.validateType(AudioPassThruCapabilities, audioPassThruCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES, audioPassThruCapabilities);
        return this;
    }

    /**
    * @return {Array<AudioPassThruCapabilities>}
    */
    getAudioPassThruCapabilities() {
        return this.getObject(AudioPassThruCapabilities, RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES);
    }

    /**
    * @param {AudioPassThruCapabilities} pcmStreamCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setPcmStreamCapabilities(pcmStreamCapabilities) {
        this.validateType(AudioPassThruCapabilities, pcmStreamCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES, pcmStreamCapabilities);
        return this;
    }

    /**
    * @return {AudioPassThruCapabilities}
    */
    getPcmStreamCapabilities() {
        return this.getObject(AudioPassThruCapabilities, RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES);
    }

    /**
    * @param {VehicleType} vehicleType
    * @return {RegisterAppInterfaceResponse}
    */
    setVehicleType(vehicleType) {
        this.validateType(VehicleType, vehicleType);

        this.setParameter(RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE, vehicleType);
        return this;
    }

    /**
    * @return {VehicleType}
    */
    getVehicleType() {
        return this.getObject(VehicleType, RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE);
    }

    /**
    * @param {Number} supportedDiagModes
    * @return {RegisterAppInterfaceResponse}
    */
    setSupportedDiagModes(supportedDiagModes) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODE, supportedDiagModes);
        return this;
    }

    /**
    * @return {Number}
    */
    getSupportedDiagModes() {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODE);
    }

    /**
    * @param {HMICapabilities} hmiCapabilities
    * @return {RegisterAppInterfaceResponse}
    */
    setHMICapabilities(hmiCapabilities) {
        this.validateType(HMICapabilities, hmiCapabilities);

        this.setParameter(RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES, hmiCapabilities);
        return this;
    }

    /**
    * @return {HMICapabilities}
    */
    getHMICapabilities() {
        return this.getObject(HMICapabilities, RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES);
    }

    /**
    * @param {String} sdlVersion
    * @return {RegisterAppInterfaceResponse}
    */
    setSdlVersion(sdlVersion) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SDL_VERSION, sdlVersion);
        return this;
    }

    /**
    * @return {String}
    */
    getSdlVersion() {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SDL_VERSION);
    }

    /**
    * @param {String} systemSoftwareVersion
    * @return {RegisterAppInterfaceResponse}
    */
    setSystemSoftwareVersion(systemSoftwareVersion) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION, systemSoftwareVersion);
        return this;
    }

    /**
    * @return {String}
    */
    getSystemSoftwareVersion() {
        return this.getParameter(RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION);
    }

    /**
    * @param {Boolean} iconResumed
    * @return {RegisterAppInterfaceResponse}
    */
    setIconResumed(iconResumed) {
        this.setParameter(RegisterAppInterfaceResponse.KEY_ICON_RESUMED, iconResumed);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getIconResumed() {
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
RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODE = 'supportedDiagModes';
RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES = 'hmiCapabilities';
RegisterAppInterfaceResponse.KEY_SDL_VERSION = 'sdlVersion';
RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION = 'systemSoftwareVersion';
RegisterAppInterfaceResponse.KEY_ICON_RESUMED = 'iconResumed';

export { RegisterAppInterfaceResponse };
