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

import { RpcRequest } from '../RpcRequest.js';
import { SdlMsgVersion } from '../structs/SdlMsgVersion.js';
import { TTSChunk } from '../structs/TtsChunk.js';
import { DeviceInfo } from '../structs/DeviceInfo.js';
import { AppInfo } from '../structs/AppInfo.js';
import { TemplateColorScheme } from '../structs/TemplateColorScheme.js';

import { Language } from '../enums/Language.js';
import { AppHMIType } from '../enums/AppHMIType.js';
import { FunctionID } from '../enums/FunctionID.js';

class RegisterAppInterface extends RpcRequest {

    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.REGISTER_APP_INTERFACE);
    }

    /**
    * @param {SdlMsgVersion} The max RPC Spec version supported by this library
    * @return {RegisterAppInterface}
    */
    setSdlMsgVersion(sdlMsgVersion) {
        this.validateType(SdlMsgVersion, sdlMsgVersion);

        this.setParameter(RegisterAppInterface.KEY_SDL_MSG_VERSION, sdlMsgVersion);
        return this;
    }

    /**
    * @return {SdlMsgVersion}
    */
    getSdlMsgVersion() {
        return this.getParameter(RegisterAppInterface.KEY_SDL_MSG_VERSION);
    }


    /**
    * @param {String} appName the name of the app that is registering
    * @return {RegisterAppInterface}
    */
    setAppName(appName) {
        this.validateType(String, appName);

        this.setParameter(RegisterAppInterface.KEY_APP_NAME, appName);
        return this;
    }

    /**
    * @return {String} the app name
    */
    getAppName() {
        return this.getParameter(RegisterAppInterface.KEY_APP_NAME);
    }

    /**
   * @param {Array<TTSChunk>} ttsNames TTS string for VR recognition of the mobile application name, e.g. "My S D L App". 
   *                                   Meant to overcome any failing on speech engine in properly pronouncing / understanding 
   *                                   app name. Needs to be unique over all applications from the same device. May not be 
   *                                   empty. May not start with a new line character. Only characters from char set 
   * @return {RegisterAppInterface}
   */
    setTtsName(ttsNames) {
        this.setParameter(RegisterAppInterface.KEY_TTS_NAME, ttsNames);
        return this;
    }

    /**
    * @return {Array<TTSChunk>}
    */
    getTtsName() {
        return this.getObject(TtsChunk, RegisterAppInterface.KEY_VR_COMMANDS);
    }

    /**
    * @param {String}  ngnppName Provides an abbreviated version of the app name (if needed), that will be displayed 
    *                            on the NGN media screen. If not provided, the appName is used instead (and 
    *                            will be truncated if too long)Only characters from char set.
    * @return {RegisterAppInterface}
    */
    setNgnMediaScreenAppName(ngnppName) {
        this.validateType(String, ngnppName);

        this.setParameter(RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME, appName);
        return this;
    }

    /**
    * @return {String} an abbreviated version of the app name
    */
    getNgnMediaScreenAppName() {
        return this.getParameter(RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME);
    }

    /**
    * @param {Array<String>} vrSynonyms Defines an additional voice recognition command. May not 
    *                                   interfere with any app name of previously registered applications 
    *                                   from the same device and any predefined blacklist of words (global 
    *                                   commands)Only characters from char set
    * @return {RegisterAppInterface}
    */
    setVrSynonyms(vrSynonyms) {
        this.setParameter(RegisterAppInterface.KEY_VR_SYNONYMS, vrSynonyms);
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getVrSynonyms() {
        return this.getParameter(RegisterAppInterface.KEY_VR_SYNONYMS);
    }

    /**
    * @param {Boolean} isMediaApplication Indicates if the application is a media or a non-media application. 
    *                                     Only media applications will be able to stream audio to the module 
    *                                     that is audible outside of the BT media source.
    * @return {RegisterAppInterface}
    */
    setIsMediaApplication(isMediaApplication) {
        this.setParameter(RegisterAppInterface.KEY_IS_MEDIA_APPLICATION, isMediaApplication);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getIsMediaApplication() {
        return this.getParameter(RegisterAppInterface.KEY_IS_MEDIA_APPLICATION);
    }

    /**
    * @param {Language} languageDesired
    * @return {RegisterAppInterface}
    */
    setLanguageDesired(languageDesired) {
        this.validateType(Language, languageDesired);

        this.setParameter(RegisterAppInterface.KEY_LANGUAGE_DESIRED, languageDesired);
        return this;
    }

    /**
    * @return {Language}
    */
    getLanguageDesired() {
        return this.getObject(Language, RegisterAppInterface.KEY_LANGUAGE_DESIRED);
    }


    /**
    * @param {Language} hmiDisplayLanguageDesired
    * @return {RegisterAppInterface}
    */
    setHmiDisplayLanguageDesired(hmiDisplayLanguageDesired) {
        this.validateType(Language, hmiDisplayLanguageDesired);

        this.setParameter(RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED, hmiDisplayLanguageDesired);
        return this;
    }

    /**
    * @return {Language}
    */
    getHmiDisplayLanguageDesired() {
        return this.getObject(Language, RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED);
    }


    /**
    * @param {Array<AppHMIType>} appHMIType
    * @return {RegisterAppInterface}
    */
    setAppHmiType(appHMIType) {
        //TODO make validate type accept arrays 
        //this.validateType(AppHMIType, appHMIType);

        this.setParameter(RegisterAppInterface.KEY_APP_HMI_TYPE, appHMIType);
        return this;
    }

    /**
    * @return {Array<AppHMIType>}
    */
    getAppHmiType() {
        return this.getObject(AppHMIType, RegisterAppInterface.KEY_APP_HMI_TYPE);
    }

    /**
    * @param {String} hashID the hash ID
    * @return {RegisterAppInterface}
    */
    setHashID(hashID) {
        this.validateType(String, hashID);

        this.setParameter(RegisterAppInterface.KEY_HASH_ID, hashID);
        return this;
    }

    /**
    * @return {String} the hash ID
    */
    getHashID() {
        return this.getParameter(RegisterAppInterface.KEY_HASH_ID);
    }

    /**
     * @param {DeviceInfo} deviceInfo
     * @return {RegisterAppInterface}
     */
    setDeviceInfo(deviceInfo) {
        this.validateType(DeviceInfo, deviceInfo);

        this.setParameter(RegisterAppInterface.KEY_DEVICE_INFO, deviceInfo);
        return this;
    }

    /**
    * @return {DeviceInfo}
    */
    getDeviceInfo() {
        return this.getObject(DeviceInfo, RegisterAppInterface.KEY_DEVICE_INFO);
    }


    /**
    * @param {String} appName This method should not be accessed directly by developers. Only set the full ID and this param will be set.
    * @return {RegisterAppInterface}
    */
    _setAppId(appId) {
        this.validateType(String, appId);

        this.setParameter(RegisterAppInterface.KEY_APP_ID, appId);
        return this;
    }

    /**
    * @return {String} the app id
    */
    getAppId() {
        return this.getParameter(RegisterAppInterface.KEY_APP_ID);
    }

    /**
    * @param {String} fullAppId 
    * @return {RegisterAppInterface}
    */
    setFullAppId(fullAppId) {
        this.validateType(String, fullAppId);

        if (fullAppID != null) {
            fullAppID = fullAppID.toLowerCase();
            setParameters(RegisterAppInterface.KEY_FULL_APP_ID, fullAppID);
            let appID;
            if (fullAppID.length() <= RegisterAppInterface.APP_ID_MAX_LENGTH) {
                appID = fullAppID;
            } else {
                appID = fullAppID.replace("-", "").substring(0, RegisterAppInterface.APP_ID_MAX_LENGTH);
            }
            this._setAppId(appID);
        } else {
            setParameters(RegisterAppInterface.KEY_FULL_APP_ID, null);
        }

        return this;
    }

    /**
    * @return {String} the app id
    */
    getFullAppId() {
        return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
    }


    /**
     * @param {AppInfo} appInfo
     * @return {RegisterAppInterface}
     */
    setAppInfo(appInfo) {
        this.validateType(AppInfo, appInfo);

        this.setParameter(RegisterAppInterface.KEY_APP_INFO, appInfo);
        return this;
    }

    /**
    * @return {AppInfo}
    */
    getAppInfo() {
        return this.getParameter(RegisterAppInterface.KEY_APP_INFO);
    }

    /**
     * @param {TemplateColorScheme} dayColorScheme
     * @return {RegisterAppInterface}
     */
    setDayColorScheme(dayColorScheme) {
        this.validateType(TemplateColorScheme, dayColorScheme);

        this.setParameter(RegisterAppInterface.KEY_DAY_COLOR_SCHEME, dayColorScheme);
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getDayColorScheme() {
        return this.getObject(TemplateColorScheme, RegisterAppInterface.KEY_DAY_COLOR_SCHEME);
    }

    /**
     * @param {TemplateColorScheme} nightColorScheme
     * @return {RegisterAppInterface}
     */
    setNightColorScheme(nightColorScheme) {
        this.validateType(TemplateColorScheme, nightColorScheme);

        this.setParameter(RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME, nightColorScheme);
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getNightColorScheme() {
        return this.getObject(TemplateColorScheme, RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME);
    }
}

RegisterAppInterface.KEY_SDL_MSG_VERSION = 'syncMsgVersion';
RegisterAppInterface.KEY_APP_NAME = 'appName';
RegisterAppInterface.KEY_TTS_NAME = 'ttsName';
RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME = 'ngnMediaScreenAppName';
RegisterAppInterface.KEY_VR_SYNONYMS = 'vrSynonyms';
RegisterAppInterface.KEY_IS_MEDIA_APPLICATION = 'isMediaApplication';
RegisterAppInterface.KEY_LANGUAGE_DESIRED = "languageDesired";
RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED = "hmiDisplayLanguageDesired";
RegisterAppInterface.KEY_APP_HMI_TYPE = "appHMIType";
RegisterAppInterface.KEY_HASH_ID = "hashID";
RegisterAppInterface.KEY_DEVICE_INFO = "deviceInfo";
RegisterAppInterface.KEY_APP_ID = "appID";
RegisterAppInterface.KEY_FULL_APP_ID = "fullAppID";
RegisterAppInterface.KEY_APP_INFO = "appInfo";
RegisterAppInterface.KEY_DAY_COLOR_SCHEME = "dayColorScheme";
RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME = "nightColorScheme";
RegisterAppInterface.APP_ID_MAX_LENGTH = 10;

export { RegisterAppInterface };
