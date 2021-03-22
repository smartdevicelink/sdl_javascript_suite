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

import { FunctionID } from '../enums/FunctionID.js';
import { Language } from '../enums/Language.js';
import { RpcRequest } from '../RpcRequest.js';
import { TTSChunk } from '../structs/TTSChunk.js';

class ChangeRegistration extends RpcRequest {
    /**
     * Initializes an instance of ChangeRegistration.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.ChangeRegistration);
    }

    /**
     * Set the Language
     * @param {Language} language - Requested voice engine (VR+TTS) language registration - The desired Language.
     * @returns {ChangeRegistration} - The class instance for method chaining.
     */
    setLanguage (language) {
        this._validateType(Language, language);
        this.setParameter(ChangeRegistration.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * Get the Language
     * @returns {Language} - the KEY_LANGUAGE value
     */
    getLanguage () {
        return this.getObject(Language, ChangeRegistration.KEY_LANGUAGE);
    }

    /**
     * Set the HmiDisplayLanguage
     * @param {Language} language - Request display language registration - The desired HmiDisplayLanguage.
     * @returns {ChangeRegistration} - The class instance for method chaining.
     */
    setHmiDisplayLanguage (language) {
        this._validateType(Language, language);
        this.setParameter(ChangeRegistration.KEY_HMI_DISPLAY_LANGUAGE, language);
        return this;
    }

    /**
     * Get the HmiDisplayLanguage
     * @returns {Language} - the KEY_HMI_DISPLAY_LANGUAGE value
     */
    getHmiDisplayLanguage () {
        return this.getObject(Language, ChangeRegistration.KEY_HMI_DISPLAY_LANGUAGE);
    }

    /**
     * Set the AppName
     * @since SmartDeviceLink 3.0.0
     * @param {String} name - Request new app name registration - The desired AppName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {ChangeRegistration} - The class instance for method chaining.
     */
    setAppName (name) {
        this.setParameter(ChangeRegistration.KEY_APP_NAME, name);
        return this;
    }

    /**
     * Get the AppName
     * @returns {String} - the KEY_APP_NAME value
     */
    getAppName () {
        return this.getParameter(ChangeRegistration.KEY_APP_NAME);
    }

    /**
     * Set the TtsName
     * @since SmartDeviceLink 3.0.0
     * @param {TTSChunk[]} name - Request new ttsName registration - The desired TtsName.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {ChangeRegistration} - The class instance for method chaining.
     */
    setTtsName (name) {
        this._validateType(TTSChunk, name, true);
        this.setParameter(ChangeRegistration.KEY_TTS_NAME, name);
        return this;
    }

    /**
     * Get the TtsName
     * @returns {TTSChunk[]} - the KEY_TTS_NAME value
     */
    getTtsName () {
        return this.getObject(TTSChunk, ChangeRegistration.KEY_TTS_NAME);
    }

    /**
     * Set the NgnMediaScreenAppName
     * @since SmartDeviceLink 3.0.0
     * @param {String} name - Request new app short name registration - The desired NgnMediaScreenAppName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {ChangeRegistration} - The class instance for method chaining.
     */
    setNgnMediaScreenAppName (name) {
        this.setParameter(ChangeRegistration.KEY_NGN_MEDIA_SCREEN_APP_NAME, name);
        return this;
    }

    /**
     * Get the NgnMediaScreenAppName
     * @returns {String} - the KEY_NGN_MEDIA_SCREEN_APP_NAME value
     */
    getNgnMediaScreenAppName () {
        return this.getParameter(ChangeRegistration.KEY_NGN_MEDIA_SCREEN_APP_NAME);
    }

    /**
     * Set the VrSynonyms
     * @since SmartDeviceLink 3.0.0
     * @param {String[]} synonyms - Request new VR synonyms registration - The desired VrSynonyms.
     * {'array_min_size': 1, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 40}
     * @returns {ChangeRegistration} - The class instance for method chaining.
     */
    setVrSynonyms (synonyms) {
        this.setParameter(ChangeRegistration.KEY_VR_SYNONYMS, synonyms);
        return this;
    }

    /**
     * Get the VrSynonyms
     * @returns {String[]} - the KEY_VR_SYNONYMS value
     */
    getVrSynonyms () {
        return this.getParameter(ChangeRegistration.KEY_VR_SYNONYMS);
    }
}

ChangeRegistration.KEY_LANGUAGE = 'language';
ChangeRegistration.KEY_HMI_DISPLAY_LANGUAGE = 'hmiDisplayLanguage';
ChangeRegistration.KEY_APP_NAME = 'appName';
ChangeRegistration.KEY_TTS_NAME = 'ttsName';
ChangeRegistration.KEY_NGN_MEDIA_SCREEN_APP_NAME = 'ngnMediaScreenAppName';
ChangeRegistration.KEY_VR_SYNONYMS = 'vrSynonyms';

export { ChangeRegistration };