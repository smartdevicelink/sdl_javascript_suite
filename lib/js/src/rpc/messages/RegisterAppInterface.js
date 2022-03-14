/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { AppHMIType } from '../enums/AppHMIType.js';
import { AppInfo } from '../structs/AppInfo.js';
import { DeviceInfo } from '../structs/DeviceInfo.js';
import { FunctionID } from '../enums/FunctionID.js';
import { Language } from '../enums/Language.js';
import { RpcRequest } from '../RpcRequest.js';
import { SdlMsgVersion } from '../structs/SdlMsgVersion.js';
import { TTSChunk } from '../structs/TTSChunk.js';
import { TemplateColorScheme } from '../structs/TemplateColorScheme.js';

/**
 * Establishes an interface with a mobile application. Before registerAppInterface no other commands will be accepted/executed.
 */
class RegisterAppInterface extends RpcRequest {
    /**
     * Initializes an instance of RegisterAppInterface.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.RegisterAppInterface);
    }

    /**
     * Set the full app ID. Also sets the shortened app ID automatically.
     * @param {String} fullAppId - A full App ID.
     * @returns {RegisterAppInterface} - The class instance to support method chaining.
     */
    setFullAppId (fullAppId) {
        this._validateType(String, fullAppId);

        if (fullAppId !== null) {
            fullAppId = fullAppId.toLowerCase();
            this.setParameter(RegisterAppInterface.KEY_FULL_APP_ID, fullAppId);
            let appID;
            if (fullAppId.length <= RegisterAppInterface.APP_ID_MAX_LENGTH) {
                appID = fullAppId;
            } else {
                appID = fullAppId.replace('-', '').substring(0, RegisterAppInterface.APP_ID_MAX_LENGTH);
            }
            this._setAppId(appID);
        } else {
            this.setParameter(RegisterAppInterface.KEY_FULL_APP_ID, null);
        }

        return this;
    }

    /**
     * Get the full App ID.
     * @returns {String} - The full app ID.
     */
    getFullAppId () {
        return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
    }

    /**
     * Sets the shortened app ID.
     * @param {String} appId - A shortened app ID.
     * @returns {RegisterAppInterface} - The class instance to support method chaining.
     */
    _setAppId (appId) {
        this._validateType(String, appId);

        this.setParameter(RegisterAppInterface.KEY_APP_ID, appId);
        return this;
    }

    /**
     * Get the shortened app ID.
     * @returns {String} - The shortened app ID.
     */
    getAppId () {
        return this.getParameter(RegisterAppInterface.KEY_APP_ID);
    }

    /**
     * Set the SdlMsgVersion
     * @since SmartDeviceLink 1.0.0
     * @param {SdlMsgVersion} version - See SyncMsgVersion - The desired SdlMsgVersion.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setSdlMsgVersion (version) {
        this._validateType(SdlMsgVersion, version);
        this.setParameter(RegisterAppInterface.KEY_SDL_MSG_VERSION, version);
        return this;
    }

    /**
     * Get the SdlMsgVersion
     * @returns {SdlMsgVersion} - the KEY_SDL_MSG_VERSION value
     */
    getSdlMsgVersion () {
        return this.getObject(SdlMsgVersion, RegisterAppInterface.KEY_SDL_MSG_VERSION);
    }

    /**
     * Set the AppName
     * @since SmartDeviceLink 1.0.0
     * @param {String} name - The mobile application name, e.g. "My SDL App". Needs to be unique over all applications from the same device. May not be empty. May not start with a new line character. May not interfere with any name or synonym of previously registered applications from the same device and any predefined blacklist of words (global commands) Additional applications with the same name from the same device will be rejected. Only characters from char set [@TODO: Create char set (character/hex value) for each ACM and refer to] are supported. - The desired AppName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setAppName (name) {
        this.setParameter(RegisterAppInterface.KEY_APP_NAME, name);
        return this;
    }

    /**
     * Get the AppName
     * @returns {String} - the KEY_APP_NAME value
     */
    getAppName () {
        return this.getParameter(RegisterAppInterface.KEY_APP_NAME);
    }

    /**
     * Set the TtsName
     * @since SmartDeviceLink 2.0.0
     * @param {TTSChunk[]} name - TTS string for VR recognition of the mobile application name, e.g. "My S D L App". Meant to overcome any failing on speech engine in properly pronouncing / understanding app name. Needs to be unique over all applications from the same device. May not be empty. May not start with a new line character. Only characters from char set [@TODO: Create char set (character/hex value) for each ACM and refer to] are supported. - The desired TtsName.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setTtsName (name) {
        this._validateType(TTSChunk, name, true);
        this.setParameter(RegisterAppInterface.KEY_TTS_NAME, name);
        return this;
    }

    /**
     * Get the TtsName
     * @returns {TTSChunk[]} - the KEY_TTS_NAME value
     */
    getTtsName () {
        return this.getObject(TTSChunk, RegisterAppInterface.KEY_TTS_NAME);
    }

    /**
     * Set the NgnMediaScreenAppName
     * @since SmartDeviceLink 1.0.0
     * @param {String} name - Provides an abbreviated version of the app name (if needed), that will be displayed on the NGN media screen. If not provided, the appName is used instead (and will be truncated if too long) Only characters from char set [@TODO: Create char set (character/hex value) for each ACM and refer to] are supported. - The desired NgnMediaScreenAppName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setNgnMediaScreenAppName (name) {
        this.setParameter(RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME, name);
        return this;
    }

    /**
     * Get the NgnMediaScreenAppName
     * @returns {String} - the KEY_NGN_MEDIA_SCREEN_APP_NAME value
     */
    getNgnMediaScreenAppName () {
        return this.getParameter(RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME);
    }

    /**
     * Set the VrSynonyms
     * @since SmartDeviceLink 1.0.0
     * @param {String[]} synonyms - Defines an additional voice recognition command. May not interfere with any app name of previously registered applications from the same device and any predefined blacklist of words (global commands) Only characters from char set [@TODO: Create char set (character/hex value) for each ACM and refer to] are supported. - The desired VrSynonyms.
     * {'array_min_size': 1, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 40}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setVrSynonyms (synonyms) {
        this.setParameter(RegisterAppInterface.KEY_VR_SYNONYMS, synonyms);
        return this;
    }

    /**
     * Get the VrSynonyms
     * @returns {String[]} - the KEY_VR_SYNONYMS value
     */
    getVrSynonyms () {
        return this.getParameter(RegisterAppInterface.KEY_VR_SYNONYMS);
    }

    /**
     * Set the IsMediaApplication
     * @since SmartDeviceLink 1.0.0
     * @param {Boolean} application - Indicates if the application is a media or a non-media application. Only media applications will be able to stream audio to the module that is audible outside of the BT media source. - The desired IsMediaApplication.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setIsMediaApplication (application) {
        this.setParameter(RegisterAppInterface.KEY_IS_MEDIA_APPLICATION, application);
        return this;
    }

    /**
     * Get the IsMediaApplication
     * @returns {Boolean} - the KEY_IS_MEDIA_APPLICATION value
     */
    getIsMediaApplication () {
        return this.getParameter(RegisterAppInterface.KEY_IS_MEDIA_APPLICATION);
    }

    /**
     * Set the LanguageDesired
     * @since SmartDeviceLink 1.0.0
     * @param {Language} desired - See Language Current app's expected VR+TTS language If there is a mismatch with the module, the app will be able to change this registration with changeRegistration prior to app being brought into focus. - The desired LanguageDesired.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setLanguageDesired (desired) {
        this._validateType(Language, desired);
        this.setParameter(RegisterAppInterface.KEY_LANGUAGE_DESIRED, desired);
        return this;
    }

    /**
     * Get the LanguageDesired
     * @returns {Language} - the KEY_LANGUAGE_DESIRED value
     */
    getLanguageDesired () {
        return this.getObject(Language, RegisterAppInterface.KEY_LANGUAGE_DESIRED);
    }

    /**
     * Set the HmiDisplayLanguageDesired
     * @since SmartDeviceLink 2.0.0
     * @param {Language} desired - See Language Current app's expected display language If there is a mismatch with the module, the app will be able to change this registration with changeRegistration prior to app being brought into focus. - The desired HmiDisplayLanguageDesired.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setHmiDisplayLanguageDesired (desired) {
        this._validateType(Language, desired);
        this.setParameter(RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED, desired);
        return this;
    }

    /**
     * Get the HmiDisplayLanguageDesired
     * @returns {Language} - the KEY_HMI_DISPLAY_LANGUAGE_DESIRED value
     */
    getHmiDisplayLanguageDesired () {
        return this.getObject(Language, RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED);
    }

    /**
     * Set the AppHMIType
     * @since SmartDeviceLink 2.0.0
     * @param {AppHMIType[]} type - See AppHMIType List of all applicable app HMI types stating which HMI classifications to be given to the app. - The desired AppHMIType.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setAppHMIType (type) {
        this._validateType(AppHMIType, type, true);
        this.setParameter(RegisterAppInterface.KEY_APP_HMI_TYPE, type);
        return this;
    }

    /**
     * Get the AppHMIType
     * @returns {AppHMIType[]} - the KEY_APP_HMI_TYPE value
     */
    getAppHMIType () {
        return this.getObject(AppHMIType, RegisterAppInterface.KEY_APP_HMI_TYPE);
    }

    /**
     * Set the HashID
     * @since SmartDeviceLink 3.0.0
     * @param {String} id - ID used to uniquely identify current state of all app data that can persist through connection cycles (e.g. ignition cycles). This registered data (commands, submenus, choice sets, etc.) can be reestablished without needing to explicitly reregister each piece. If omitted, then the previous state of an app's commands, etc. will not be restored. When sending hashID, all RegisterAppInterface parameters should still be provided (e.g. ttsName, etc.). - The desired HashID.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setHashID (id) {
        this.setParameter(RegisterAppInterface.KEY_HASH_ID, id);
        return this;
    }

    /**
     * Get the HashID
     * @returns {String} - the KEY_HASH_ID value
     */
    getHashID () {
        return this.getParameter(RegisterAppInterface.KEY_HASH_ID);
    }

    /**
     * Set the DeviceInfo
     * @since SmartDeviceLink 3.0.0
     * @param {DeviceInfo} info - See DeviceInfo. - The desired DeviceInfo.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setDeviceInfo (info) {
        this._validateType(DeviceInfo, info);
        this.setParameter(RegisterAppInterface.KEY_DEVICE_INFO, info);
        return this;
    }

    /**
     * Get the DeviceInfo
     * @returns {DeviceInfo} - the KEY_DEVICE_INFO value
     */
    getDeviceInfo () {
        return this.getObject(DeviceInfo, RegisterAppInterface.KEY_DEVICE_INFO);
    }

    /**
     * Set the FullAppID
     * @since SmartDeviceLink 5.0.0
     * @param {String} id - ID used to validate app with policy table entries - The desired FullAppID.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setFullAppID (id) {
        this.setParameter(RegisterAppInterface.KEY_FULL_APP_ID, id);
        return this;
    }

    /**
     * Get the FullAppID
     * @returns {String} - the KEY_FULL_APP_ID value
     */
    getFullAppID () {
        return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
    }

    /**
     * Set the AppInfo
     * @since SmartDeviceLink 4.2.0
     * @param {AppInfo} info - See AppInfo. - The desired AppInfo.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setAppInfo (info) {
        this._validateType(AppInfo, info);
        this.setParameter(RegisterAppInterface.KEY_APP_INFO, info);
        return this;
    }

    /**
     * Get the AppInfo
     * @returns {AppInfo} - the KEY_APP_INFO value
     */
    getAppInfo () {
        return this.getObject(AppInfo, RegisterAppInterface.KEY_APP_INFO);
    }

    /**
     * Set the DayColorScheme
     * @since SmartDeviceLink 5.0.0
     * @param {TemplateColorScheme} scheme - A color scheme for all display layout templates. - The desired DayColorScheme.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setDayColorScheme (scheme) {
        this._validateType(TemplateColorScheme, scheme);
        this.setParameter(RegisterAppInterface.KEY_DAY_COLOR_SCHEME, scheme);
        return this;
    }

    /**
     * Get the DayColorScheme
     * @returns {TemplateColorScheme} - the KEY_DAY_COLOR_SCHEME value
     */
    getDayColorScheme () {
        return this.getObject(TemplateColorScheme, RegisterAppInterface.KEY_DAY_COLOR_SCHEME);
    }

    /**
     * Set the NightColorScheme
     * @since SmartDeviceLink 5.0.0
     * @param {TemplateColorScheme} scheme - A color scheme for all display layout templates. - The desired NightColorScheme.
     * @returns {RegisterAppInterface} - The class instance for method chaining.
     */
    setNightColorScheme (scheme) {
        this._validateType(TemplateColorScheme, scheme);
        this.setParameter(RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME, scheme);
        return this;
    }

    /**
     * Get the NightColorScheme
     * @returns {TemplateColorScheme} - the KEY_NIGHT_COLOR_SCHEME value
     */
    getNightColorScheme () {
        return this.getObject(TemplateColorScheme, RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME);
    }
}

RegisterAppInterface.KEY_SDL_MSG_VERSION = 'syncMsgVersion';
RegisterAppInterface.KEY_APP_NAME = 'appName';
RegisterAppInterface.KEY_TTS_NAME = 'ttsName';
RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME = 'ngnMediaScreenAppName';
RegisterAppInterface.KEY_VR_SYNONYMS = 'vrSynonyms';
RegisterAppInterface.KEY_IS_MEDIA_APPLICATION = 'isMediaApplication';
RegisterAppInterface.KEY_LANGUAGE_DESIRED = 'languageDesired';
RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED = 'hmiDisplayLanguageDesired';
RegisterAppInterface.KEY_APP_HMI_TYPE = 'appHMIType';
RegisterAppInterface.KEY_HASH_ID = 'hashID';
RegisterAppInterface.KEY_DEVICE_INFO = 'deviceInfo';
RegisterAppInterface.KEY_APP_ID = 'appID';
RegisterAppInterface.KEY_FULL_APP_ID = 'fullAppID';
RegisterAppInterface.KEY_APP_INFO = 'appInfo';
RegisterAppInterface.KEY_DAY_COLOR_SCHEME = 'dayColorScheme';
RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME = 'nightColorScheme';
RegisterAppInterface.APP_ID_MAX_LENGTH = 10;

export { RegisterAppInterface };