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
 * Establishes an interface with a mobile application. Before registerAppInterface no other commands will be
 * accepted/executed.
 */
class RegisterAppInterface extends RpcRequest {
    /**
     * Initalizes an instance of RegisterAppInterface.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.RegisterAppInterface);
    }

    /**
     * @param {String} fullAppId
     * @return {RegisterAppInterface}
     */
    setFullAppId (fullAppId) {
        this.validateType(String, fullAppId);

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
     * @return {String} the app id
     */
    getFullAppId () {
        return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
    }

    /**
     * @param {String} appId - This method should not be accessed directly by developers. Only set the full ID and this
     *                         param will be set.
     * @return {RegisterAppInterface}
     */
    _setAppId (appId) {
        this.validateType(String, appId);

        this.setParameter(RegisterAppInterface.KEY_APP_ID, appId);
        return this;
    }

    /**
     * @return {String} the app id
     */
    getAppId () {
        return this.getParameter(RegisterAppInterface.KEY_APP_ID);
    }

    /**
     * @param {SdlMsgVersion} version - See SyncMsgVersion
     * @return {RegisterAppInterface}
     */
    setSdlMsgVersion (version) {
        this.validateType(SdlMsgVersion, version);
        this.setParameter(RegisterAppInterface.KEY_SDL_MSG_VERSION, version);
        return this;
    }

    /**
     * @return {SdlMsgVersion}
     */
    getSdlMsgVersion () {
        return this.getObject(SdlMsgVersion, RegisterAppInterface.KEY_SDL_MSG_VERSION);
    }

    /**
     * @param {String} name - The mobile application name, e.g. "My SDL App". Needs to be unique over all applications
     *                        from the same device. May not be empty. May not start with a new line character. May not
     *                        interfere with any name or synonym of previously registered applications from the same
     *                        device and any predefined blacklist of words (global commands) Additional applications
     *                        with the same name from the same device will be rejected. Only characters from char set
     * @return {RegisterAppInterface}
     */
    setAppName (name) {
        this.setParameter(RegisterAppInterface.KEY_APP_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getAppName () {
        return this.getParameter(RegisterAppInterface.KEY_APP_NAME);
    }

    /**
     * @param {TTSChunk[]} name - TTS string for VR recognition of the mobile application name, e.g. "My S D L App".
     *                            Meant to overcome any failing on speech engine in properly pronouncing / understanding
     *                            app name. Needs to be unique over all applications from the same device. May not be
     *                            empty. May not start with a new line character. Only characters from char set
     * @return {RegisterAppInterface}
     */
    setTtsName (name) {
        this.validateType(TTSChunk, name, true);
        this.setParameter(RegisterAppInterface.KEY_TTS_NAME, name);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getTtsName () {
        return this.getObject(TTSChunk, RegisterAppInterface.KEY_TTS_NAME);
    }

    /**
     * @param {String} name - Provides an abbreviated version of the app name (if needed), that will be displayed on the
     *                        NGN media screen. If not provided, the appName is used instead (and will be truncated if
     *                        too long) Only characters from char set
     * @return {RegisterAppInterface}
     */
    setNgnMediaScreenAppName (name) {
        this.setParameter(RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getNgnMediaScreenAppName () {
        return this.getParameter(RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME);
    }

    /**
     * @param {String[]} synonyms - Defines an additional voice recognition command. May not interfere with any app name
     *                              of previously registered applications from the same device and any predefined
     *                              blacklist of words (global commands) Only characters from char set
     * @return {RegisterAppInterface}
     */
    setVrSynonyms (synonyms) {
        this.setParameter(RegisterAppInterface.KEY_VR_SYNONYMS, synonyms);
        return this;
    }

    /**
     * @return {String[]}
     */
    getVrSynonyms () {
        return this.getParameter(RegisterAppInterface.KEY_VR_SYNONYMS);
    }

    /**
     * @param {Boolean} application - Indicates if the application is a media or a non-media application. Only media
     *                                applications will be able to stream audio to the module that is audible outside of
     *                                the BT media source.
     * @return {RegisterAppInterface}
     */
    setIsMediaApplication (application) {
        this.setParameter(RegisterAppInterface.KEY_IS_MEDIA_APPLICATION, application);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getIsMediaApplication () {
        return this.getParameter(RegisterAppInterface.KEY_IS_MEDIA_APPLICATION);
    }

    /**
     * @param {Language} desired - See Language Current app's expected VR+TTS language If there is a mismatch with the
     *                             module, the app will be able to change this registration with changeRegistration
     *                             prior to app being brought into focus.
     * @return {RegisterAppInterface}
     */
    setLanguageDesired (desired) {
        this.validateType(Language, desired);
        this.setParameter(RegisterAppInterface.KEY_LANGUAGE_DESIRED, desired);
        return this;
    }

    /**
     * @return {Language}
     */
    getLanguageDesired () {
        return this.getObject(Language, RegisterAppInterface.KEY_LANGUAGE_DESIRED);
    }

    /**
     * @param {Language} desired - See Language Current app's expected display language If there is a mismatch with the
     *                             module, the app will be able to change this registration with changeRegistration
     *                             prior to app being brought into focus.
     * @return {RegisterAppInterface}
     */
    setHmiDisplayLanguageDesired (desired) {
        this.validateType(Language, desired);
        this.setParameter(RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED, desired);
        return this;
    }

    /**
     * @return {Language}
     */
    getHmiDisplayLanguageDesired () {
        return this.getObject(Language, RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED);
    }

    /**
     * @param {AppHMIType[]} type - See AppHMIType List of all applicable app HMI types stating which HMI
     *                              classifications to be given to the app.
     * @return {RegisterAppInterface}
     */
    setAppHMIType (type) {
        this.validateType(AppHMIType, type, true);
        this.setParameter(RegisterAppInterface.KEY_APP_HMI_TYPE, type);
        return this;
    }

    /**
     * @return {AppHMIType[]}
     */
    getAppHMIType () {
        return this.getObject(AppHMIType, RegisterAppInterface.KEY_APP_HMI_TYPE);
    }

    /**
     * @param {String} id - ID used to uniquely identify current state of all app data that can persist through
     *                      connection cycles (e.g. ignition cycles). This registered data (commands, submenus, choice
     *                      sets, etc.) can be reestablished without needing to explicitly reregister each piece. If
     *                      omitted, then the previous state of an app's commands, etc. will not be restored. When
     *                      sending hashID, all RegisterAppInterface parameters should still be provided (e.g. ttsName,
     *                      etc.).
     * @return {RegisterAppInterface}
     */
    setHashID (id) {
        this.setParameter(RegisterAppInterface.KEY_HASH_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getHashID () {
        return this.getParameter(RegisterAppInterface.KEY_HASH_ID);
    }

    /**
     * @param {DeviceInfo} info - See DeviceInfo.
     * @return {RegisterAppInterface}
     */
    setDeviceInfo (info) {
        this.validateType(DeviceInfo, info);
        this.setParameter(RegisterAppInterface.KEY_DEVICE_INFO, info);
        return this;
    }

    /**
     * @return {DeviceInfo}
     */
    getDeviceInfo () {
        return this.getObject(DeviceInfo, RegisterAppInterface.KEY_DEVICE_INFO);
    }

    /**
     * @param {String} id - ID used to validate app with policy table entries
     * @return {RegisterAppInterface}
     */
    setFullAppID (id) {
        this.setParameter(RegisterAppInterface.KEY_FULL_APP_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getFullAppID () {
        return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
    }

    /**
     * @param {AppInfo} info - See AppInfo.
     * @return {RegisterAppInterface}
     */
    setAppInfo (info) {
        this.validateType(AppInfo, info);
        this.setParameter(RegisterAppInterface.KEY_APP_INFO, info);
        return this;
    }

    /**
     * @return {AppInfo}
     */
    getAppInfo () {
        return this.getObject(AppInfo, RegisterAppInterface.KEY_APP_INFO);
    }

    /**
     * @param {TemplateColorScheme} scheme - A color scheme for all display layout templates.
     * @return {RegisterAppInterface}
     */
    setDayColorScheme (scheme) {
        this.validateType(TemplateColorScheme, scheme);
        this.setParameter(RegisterAppInterface.KEY_DAY_COLOR_SCHEME, scheme);
        return this;
    }

    /**
     * @return {TemplateColorScheme}
     */
    getDayColorScheme () {
        return this.getObject(TemplateColorScheme, RegisterAppInterface.KEY_DAY_COLOR_SCHEME);
    }

    /**
     * @param {TemplateColorScheme} scheme - A color scheme for all display layout templates.
     * @return {RegisterAppInterface}
     */
    setNightColorScheme (scheme) {
        this.validateType(TemplateColorScheme, scheme);
        this.setParameter(RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME, scheme);
        return this;
    }

    /**
     * @return {TemplateColorScheme}
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