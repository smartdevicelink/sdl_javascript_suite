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

import { Language } from '../rpc/enums/Language.js';
import { AppHMIType } from '../rpc/enums/AppHMIType.js';
import { Version } from '../util/Version.js';

class AppConfig {
    /**
    * @constructor
    */
    constructor () {
        this._transportConfig = null;
        this._appId = null; // required
        this._appName = null; // required
        this._appIcon = null;
        this._shortAppName = null;
        this._ttsName = null;
        this._vrSynonyms = null;
        this._isMediaApp = false;
        this._languageDesired = Language.EN_US;
        this._hmiDisplayLanguageDesired = Language.EN_US;
        this._appTypes = [AppHMIType.DEFAULT]; // hmiTypes
        this._dayColorScheme = null;
        this._nightColorScheme = null;
        this._minimumRpcVersion = new Version(1, 0, 0);
        this._minimumProtocolVersion = new Version(1, 0, 0);
    }

    /**
    * @param {TransportConfigBase} transportConfig
    * @return {AppConfig}
    */
    setTransportConfig (transportConfig) {
        this._transportConfig = transportConfig;
        return this;
    }

    /**
    * @return {TransportConfigBase}
    */
    getTransportConfig () {
        return this._transportConfig;
    }

    /**
    * @param {String} appId
    * @return {AppConfig}
    */
    setAppId (appId) {
        this._appId = appId;
        return this;
    }

    /**
    * @return {String}
    */
    getAppId () {
        return this._appId;
    }

    /**
    * @param {String} appName
    * @return {AppConfig}
    */
    setAppName (appName) {
        this._appName = appName;
        return this;
    }

    /**
    * @return {String}
    */
    getAppName () {
        return this._appName;
    }

    /**
    * @param {SdlArtwork} sdlArtwork
    * @return {AppConfig}
    */
    setAppIcon (sdlArtwork) {
        this._appIcon = sdlArtwork;
        return this;
    }

    /**
    * @return {SdlArtwork}
    */
    getAppIcon () {
        return this._appIcon;
    }

    /**
    * @param {String} shortAppName
    * @return {AppConfig}
    */
    setShortAppName (shortAppName) {
        this._shortAppName = shortAppName;
        return this;
    }

    /**
    * @return {String}
    */
    getShortAppName () {
        return this._shortAppName;
    }

    /**
    * @param {Array<TTSChunk>} ttsName
    * @return {AppConfig}
    */
    setTtsName (ttsName) {
        this._ttsName = ttsName;
        return this;
    }

    /**
    * @return {Array<TTSChunk>}
    */
    getTtsName () {
        return this._ttsName;
    }

    /**
    * @param {Array<String>} vrSynonyms
    * @return {AppConfig}
    */
    setVrSynonyms (vrSynonyms) {
        this._vrSynonyms = vrSynonyms;
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getVrSynonyms () {
        return this._vrSynonyms;
    }

    /**
    * @param {Boolean} isMediaApp
    * @return {AppConfig}
    */
    setIsMediaApp (isMediaApp) {
        this._isMediaApp = isMediaApp;
        return this;
    }

    /**
    * @return {Boolean}
    */
    isMediaApp () {
        return this._isMediaApp;
    }

    /**
    * @param {Language} languageDesired
    * @return {AppConfig}
    */
    setLanguageDesired (languageDesired) {
        this._languageDesired = languageDesired;
        return this;
    }

    /**
    * @return {Language}
    */
    getLanguageDesired () {
        return this._languageDesired;
    }

    /**
    * @param {Language} hmiDisplayLanguageDesired
    * @return {AppConfig}
    */
    setHmiDisplayLanguageDesired (hmiDisplayLanguageDesired) {
        this._hmiDisplayLanguageDesired = hmiDisplayLanguageDesired;
        return this;
    }

    /**
    * @return {Language}
    */
    getHmiDisplayLanguageDesired () {
        return this._hmiDisplayLanguageDesired;
    }

    /**
    * @param {Array<AppHMIType>} appTypes an array of ordered app types
    * @return {AppConfig}
    */
    setAppTypes (appTypes) {
        this._appTypes = appTypes;
        return this;
    }

    /**
    * @return {Array<AppHMIType>}
    */
    getAppTypes () {
        return this._appTypes;
    }


    /**
    * @param {TemplateColorScheme} dayColorScheme
    * @return {AppConfig}
    */
    setDayColorScheme (dayColorScheme) {
        this._dayColorScheme = dayColorScheme;
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getDayColorScheme () {
        return this._dayColorScheme;
    }

    /**
    * @param {TemplateColorScheme} nightColorScheme
    * @return {AppConfig}
    */
    setNightColorScheme (nightColorScheme) {
        this._nightColorScheme = nightColorScheme;
        return this;
    }

    /**
    * @return {TemplateColorScheme}
    */
    getNightColorScheme () {
        return this._nightColorScheme;
    }

    /**
    * The minimum RPC version that will be permitted to connect.
    * If the RPC version of the head unit connected is below this version, an UnregisterAppInterface will be sent.
    *
    * @param {Version} minimumRpcVersion
    * @return {AppConfig}
    */
    setMinimumRpcVersion (minimumRpcVersion) {
        this._minimumRpcVersion = minimumRpcVersion;
        return this;
    }

    /**
     *
    * @return {Version}
    */
    getMinimumRpcVersion () {
        return this._minimumRpcVersion;
    }


    /**
    * Sets the minimum protocol version that will be permitted to connect.
    * If the protocol version of the head unit connected is below this version,
    * the app will disconnect with an EndService protocol message and will not register.
    * @param {Version} minimumProtocolVersion
    * @return {AppConfig}
    */
    setMinimumProtocolVersion (minimumProtocolVersion) {
        this._minimumProtocolVersion = minimumProtocolVersion;
        return this;
    }

    /**
    * @return {Version}
    */
    getMinimumProtocolVersion () {
        return this._minimumProtocolVersion;
    }

    /**
     * Load manifest file of embedded Web Application
     * @param {Object} manifest
     * @return {AppConfig}
     */
    loadManifest (manifest) {
        if (typeof manifest !== 'object') {
            throw new Error('Wrong parameter, manifest must be object');
        }
        const manifestKeys = Object.keys(manifest);
        const missingKeys = [
            'appID',
            'appName',
            'category',
            'minProtocolVersion',
            'minRPCVersion',
        ].filter(key => !manifestKeys.includes(key));
        if (missingKeys.length > 0) {
            throw new Error(`Required parameters are missing in the manifest: ${missingKeys.join(', ')}`);
        }
        manifestKeys.forEach((key) => {
            switch (key) {
                case 'appID':
                    this.setAppId(manifest[key]);
                    break;
                case 'appName':
                    this.setAppName(manifest[key]);
                    break;
                case 'category':
                case 'additionalCategories': {
                    // merge the category and additionalCategories into one de-duplicated array
                    const categories = (Array.isArray(manifest[key]) ? manifest[key] : [manifest[key]])
                        .map((elem) => {
                            const key = AppHMIType.keyForValue(elem);
                            return key ? AppHMIType[key] : '';
                        })
                        .concat(this.getAppTypes() || [])
                        .filter((elem, pos, arr) => elem && (arr.indexOf(elem) === pos));
                    this.setAppTypes(categories);
                    break;
                }
                case 'minProtocolVersion':
                    this.setMinimumProtocolVersion(manifest[key]);
                    break;
                case 'minRPCVersion':
                    this.setMinimumRPCVersion(manifest[key]);
                    break;
            }
        });
        return this;
    }
}

export { AppConfig };