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
        this._transportConfig = null;
        this._appId = null;
        this._appName = null;
        this._iconName = null;
        this._iconFile = null;
        this._shortAppName = null;
        this._ttsName = null;
        this._vrSynonyms = null;
        this._isMediaApp = null;
        this._languageDesired = null;
        this._hmiDisplayLanguageDesired = null;
        this._appTypes = null;
        this._dayColorScheme = null;
        this._nightColorScheme = null;
        this._minimumRPCVersion = null;
        this._minimumProtocolVersion = null;
    }

    /**
    * @param {TransportConfigBase} transportConfig
    * @return {AppConfig}
    */
    setTransportConfig(transportConfig) {
        this._transportConfig = transportConfig;
        return this;
    }

    /**
    * @return {TransportConfigBase}
    */
    getTransportConfig() {
        return this._transportConfig;
    }

    /**
    * @param {String} appId
    * @return {AppConfig}
    */
    setAppId(appId) {
        this._appId = appId;
        return this;
    }

    /**
    * @return {String}
    */
    getAppId() {
        return this._appId;
    }

    /**
    * @param {String} appName
    * @return {AppConfig}
    */
    setAppName(appName) {
        this._appName = appName;
        return this;
    }

    /**
    * @return {String}
    */
    getAppName() {
        return this._appName;
    }

    /**
    * @param {String} iconName
    * @param {Uint8Array} fileData
    * @return {AppConfig}
    */
    setAppIcon(iconName = "icon.png", fileData) {
        //TODO create SdlArtwork
        this._iconName = iconName;
        this._iconFile = fileData

        return this;
    }

    /**
    * @return {String}
    */
    getAppIconName() {
        return this._iconName;
    }

    /**
    * @return {Uint8Array}
    */
    getAppIconFileData() {
        return this._iconFile;
    }

    /**
    * @param {String} shortAppName
    * @return {AppConfig}
    */
    setShortAppName(shortAppName) {
        this._shortAppName = shortAppName;
        return this;
    }

    /**
    * @return {String}
    */
    getShortAppName() {
        return this._shortAppName;
    }

    /**
    * @param {Array<TTSChunk>} ttsName
    * @return {AppConfig}
    */
    setTtsName(ttsName) {
        this._ttsName = ttsName;
        return this;
    }

    /**
    * @return {Array<TTSChunk>}
    */
    getTtsName() {
        return this._ttsName;
    }

    /**
    * @param {Array<String>} vrSynonyms
    * @return {AppConfig}
    */
    setVrSynonyms(vrSynonyms) {
        this._vrSynonyms = vrSynonyms;
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getVrSynonyms() {
        return this._vrSynonyms;
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
        this._languageDesired = languageDesired;
        return this;
    }

    /**
    * @return {Language}
    */
    getLanguageDesired() {
        return this._languageDesired;
    }

    /**
    * @param {Language} hmiDisplayLanguageDesired
    * @return {AppConfig}
    */
    setHmiDisplayLanguageDesired(hmiDisplayLanguageDesired) {
        this._hmiDisplayLanguageDesired = hmiDisplayLanguageDesired;
        return this;
    }

    /**
    * @return {Language}
    */
    getHmiDisplayLanguageDesired() {
        return this._hmiDisplayLanguageDesired;
    }

    /**
    * @param {Array<AppHMIType>} appTypes an array of ordered app types
    * @return {AppConfig}
    */
    setAppTypes(appTypes) {
        this._appTypes = appTypes;
        return this;
    }

    /**
    * @return {Array<AppHMIType>}
    */
    getAppTypes() {
        return this._appTypes;
    }


    /**
    * @param {TemplateColorScheme} dayColorScheme
    * @return {AppConfig}
    */
    setDayColorScheme(dayColorScheme) {
        this._dayColorScheme = dayColorScheme;
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getDayColorScheme() {
        return this._dayColorScheme;
    }

    /**
    * @param {TemplateColorScheme} nightColorScheme
    * @return {AppConfig}
    */
    setNightColorScheme(nightColorScheme) {
        this._nightColorScheme = nightColorScheme;
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getNightColorScheme() {
        return this._nightColorScheme;
    }

    /**
    * The minimum RPC version that will be permitted to connect.
    * If the RPC version of the head unit connected is below this version, an UnregisterAppInterface will be sent.
    *
    * @param {Version} minimumRPCVersion
    * @return {AppConfig}
    */
    setMinimumRPCVersion(minimumRPCVersion) {
        this._minimumRPCVersion = minimumRPCVersion;
        return this;
    }

    /**
     * 
    * @return {Version}
    */
    getMinimumRPCVersion() {
        return this._minimumRPCVersion;
    }


    /**
    * Sets the minimum protocol version that will be permitted to connect.
    * If the protocol version of the head unit connected is below this version,
    * the app will disconnect with an EndService protocol message and will not register.
    * @param {Version} minimumProtocolVersion
    * @return {AppConfig}
    */
    setMinimumProtocolVersion(minimumProtocolVersion) {
        this._minimumProtocolVersion = minimumProtocolVersion;
        return this;
    }

    /**
    * @return {Version}
    */
    getMinimumProtocolVersion() {
        return this._minimumProtocolVersion;
    }
}

export { AppConfig };