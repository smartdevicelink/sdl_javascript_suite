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

import { FunctionID } from '../enums/FunctionID.js';
import { Language } from '../enums/Language.js';
import { RpcRequest } from '../RpcRequest.js';
import { TTSChunk } from '../structs/TTSChunk.js';

class ChangeRegistration extends RpcRequest {
    /**
     * Initalizes an instance of ChangeRegistration.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.ChangeRegistration);
    }

    /**
     * @param {Language} language - Requested voice engine (VR+TTS) language registration
     * @return {ChangeRegistration}
     */
    setLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(ChangeRegistration.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getLanguage () {
        return this.getObject(Language, ChangeRegistration.KEY_LANGUAGE);
    }

    /**
     * @param {Language} language - Request display language registration
     * @return {ChangeRegistration}
     */
    setHmiDisplayLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(ChangeRegistration.KEY_HMI_DISPLAY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getHmiDisplayLanguage () {
        return this.getObject(Language, ChangeRegistration.KEY_HMI_DISPLAY_LANGUAGE);
    }

    /**
     * @param {String} name - Request new app name registration
     * @return {ChangeRegistration}
     */
    setAppName (name) {
        this.setParameter(ChangeRegistration.KEY_APP_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getAppName () {
        return this.getParameter(ChangeRegistration.KEY_APP_NAME);
    }

    /**
     * @param {TTSChunk[]} name - Request new ttsName registration
     * @return {ChangeRegistration}
     */
    setTtsName (name) {
        this.validateType(TTSChunk, name, true);
        this.setParameter(ChangeRegistration.KEY_TTS_NAME, name);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getTtsName () {
        return this.getObject(TTSChunk, ChangeRegistration.KEY_TTS_NAME);
    }

    /**
     * @param {String} name - Request new app short name registration
     * @return {ChangeRegistration}
     */
    setNgnMediaScreenAppName (name) {
        this.setParameter(ChangeRegistration.KEY_NGN_MEDIA_SCREEN_APP_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getNgnMediaScreenAppName () {
        return this.getParameter(ChangeRegistration.KEY_NGN_MEDIA_SCREEN_APP_NAME);
    }

    /**
     * @param {String[]} synonyms - Request new VR synonyms registration
     * @return {ChangeRegistration}
     */
    setVrSynonyms (synonyms) {
        this.setParameter(ChangeRegistration.KEY_VR_SYNONYMS, synonyms);
        return this;
    }

    /**
     * @return {String[]}
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