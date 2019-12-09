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

//TODO This class may or may not be included in the release. We should determine if 
// there is a better coding pattern for this for javascript.

class AppConfig {

    /**
    * @constructor
    */
    constructor() {
        //TODO: should be private properties with a leading underscore
        this.transportConfig = null;
        this.appId = null;
        this.appName = null;
        this.iconName = null;
        this.iconFile = null;
        this.shortAppName = null;
        this.ttsName = null;
        this.vrSynonyms = null;
        this._isMediaApp = null;
        this.languageDesired = null;
        this.hmiDisplayLanguageDesired = null;
        this.appTypes = null;
        this.dayColorScheme = null;
        this.nightColorScheme = null;
        this.minimumRPCVersion = null;
        this.minimumProtocolVersion = null;
    }

    /**
    * @param {TransportConfigBase} transportConfig
    * @return {AppConfig}
    */
    setTransportConfig(transportConfig) {
        this.transportConfig = transportConfig;
        return this;
    }

    /**
    * @return {TransportConfigBase}
    */
    getTransportConfig() {
        return this.transportConfig;
    }

    /**
    * @param {String} appId
    * @return {AppConfig}
    */
    setAppId(appId) {
        this.appId = appId;
        return this;
    }

    /**
    * @return {String}
    */
    getAppId() {
        return this.appId;
    }

    /**
    * @param {String} appName
    * @return {AppConfig}
    */
    setAppName(appName) {
        this.appName = appName;
        return this;
    }

    /**
    * @return {String}
    */
    getAppName() {
        return this.appName;
    }

    /**
    * @param {String} iconName
    * @param {Uint8Array} fileData
    * @return {AppConfig}
    */
    setAppIcon(iconName = "icon.png", fileData) {
        //TODO create SdlArtwork
        this.iconName = iconName;
        this.iconFile = fileData

        return this;
    }

    /**
    * @return {String}
    */
    getAppIconName() {
        return this.iconName;
    }

    /**
    * @return {Uint8Array}
    */
    getAppIconFileData() {
        return this.iconFile;
    }

    /**
    * @param {String} shortAppName
    * @return {AppConfig}
    */
    setShortAppName(shortAppName) {
        this.shortAppName = shortAppName;
        return this;
    }

    /**
    * @return {String}
    */
    getShortAppName() {
        return this.shortAppName;
    }

    /**
    * @param {Array<TTSChunk>} ttsName
    * @return {AppConfig}
    */
    setTtsName(ttsName) {
        this.ttsName = ttsName;
        return this;
    }

    /**
    * @return {Array<TTSChunk>}
    */
    getTtsName() {
        return this.ttsName;
    }

    /**
    * @param {Array<String>} vrSynonyms
    * @return {AppConfig}
    */
    setVrSynonyms(vrSynonyms) {
        this.vrSynonyms = vrSynonyms;
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getVrSynonyms() {
        return this.vrSynonyms;
    }

    /**
    * @param {Boolean} isMediaApp
    * @return {AppConfig}
    */
    setIsMediaApp(isMediaApp) {
        this._isMediaApp = isMediaApp;
        return this;
    }

    /**
    * @return {Boolean}
    */
    isMediaApp() {
        return this._isMediaApp;
    }

    /**
    * @param {Language} languageDesired
    * @return {AppConfig}
    */
    setLanguageDesired(languageDesired) {
        this.languageDesired = languageDesired;
        return this;
    }

    /**
    * @return {Language}
    */
    getLanguageDesired() {
        return this.languageDesired;
    }

    /**
    * @param {Language} hmiDisplayLanguageDesired
    * @return {AppConfig}
    */
    setHmiDisplayLanguageDesired(hmiDisplayLanguageDesired) {
        this.hmiDisplayLanguageDesired = hmiDisplayLanguageDesired;
        return this;
    }

    /**
    * @return {Language}
    */
    getHmiDisplayLanguageDesired() {
        return this.hmiDisplayLanguageDesired;
    }

    /**
    * @param {Array<AppHMIType>} appTypes an array of ordered app types
    * @return {AppConfig}
    */
    setAppTypes(appTypes) {
        this.appTypes = appTypes;
        return this;
    }

    /**
    * @return {Array<AppHMIType>}
    */
    getAppTypes() {
        return this.appTypes;
    }


    /**
    * @param {TemplateColorScheme} dayColorScheme
    * @return {AppConfig}
    */
    setDayColorScheme(dayColorScheme) {
        this.dayColorScheme = dayColorScheme;
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getDayColorScheme() {
        return this.dayColorScheme;
    }

    /**
    * @param {TemplateColorScheme} nightColorScheme
    * @return {AppConfig}
    */
    setNightColorScheme(nightColorScheme) {
        this.nightColorScheme = nightColorScheme;
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getNightColorScheme() {
        return this.nightColorScheme;
    }

    /**
    * The minimum RPC version that will be permitted to connect.
    * If the RPC version of the head unit connected is below this version, an UnregisterAppInterface will be sent.
    *
    * @param {Version} minimumRPCVersion
    * @return {AppConfig}
    */
    setMinimumRPCVersion(minimumRPCVersion) {
        this.minimumRPCVersion = minimumRPCVersion;
        return this;
    }

    /**
     * 
    * @return {Version}
    */
    getMinimumRPCVersion() {
        return this.minimumRPCVersion;
    }


    /**
    * Sets the minimum protocol version that will be permitted to connect.
    * If the protocol version of the head unit connected is below this version,
    * the app will disconnect with an EndService protocol message and will not register.
    * @param {Version} minimumProtocolVersion
    * @return {AppConfig}
    */
    setMinimumProtocolVersion(minimumProtocolVersion) {
        this.minimumProtocolVersion = minimumProtocolVersion;
        return this;
    }

    /**
    * @return {Version}
    */
    getMinimumProtocolVersion() {
        return this.minimumProtocolVersion;
    }


}

export { AppConfig };