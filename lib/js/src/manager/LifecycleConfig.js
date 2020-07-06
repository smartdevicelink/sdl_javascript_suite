/*
* Copyright (c) 2020, Livio, Inc.
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
import { FileType } from '../rpc/enums/FileType.js';
import { Version } from '../util/Version.js';
import { SdlFile } from './file/filetypes/SdlFile.js';

class LifecycleConfig {
    /**
     * Stores information about an SDL application's configuration
     * @class
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
        this._resumeHash = null;
    }

    /**
     * Set the TransportConfig instance.
     * @param {_TransportConfigBase} transportConfig - An instance of TransportConfig.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setTransportConfig (transportConfig) {
        this._transportConfig = transportConfig;
        return this;
    }

    /**
     * Get the TransportConfig instance.
     * @returns {_TransportConfigBase} - The TransportConfig.
     */
    getTransportConfig () {
        return this._transportConfig;
    }

    /**
     * Set the App ID. Use a full App Id.
     * @param {String} appId - The full App ID.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setAppId (appId) {
        this._appId = appId;
        return this;
    }

    /**
     * Get the App ID.
     * @returns {String} - The full app ID.
     */
    getAppId () {
        return this._appId;
    }

    /**
     * Set the app name.
     * @param {String} appName - The app name.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setAppName (appName) {
        this._appName = appName;
        return this;
    }

    /**
     * Get the app name.
     * @returns {String} - The app name.
     */
    getAppName () {
        return this._appName;
    }

    /**
     * Set the app icon.
     * @param {SdlArtwork} sdlArtwork - An instance of SdlArtwork.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setAppIcon (sdlArtwork) {
        this._appIcon = sdlArtwork;
        return this;
    }

    /**
     * Get the app icon.
     * @returns {SdlArtwork} - An instance of SdlArtwork.
     */
    getAppIcon () {
        return this._appIcon;
    }

    /**
     * Set the short app name.
     * @param {String} shortAppName - The short app name.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setShortAppName (shortAppName) {
        this._shortAppName = shortAppName;
        return this;
    }

    /**
     * Get the short app name.
     * @returns {String} - The short app name.
     */
    getShortAppName () {
        return this._shortAppName;
    }

    /**
     * Set the TTS Names.
     * @param {Array<TTSChunk>} ttsName - An array of TTSChunk structs.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setTtsName (ttsName) {
        this._ttsName = ttsName;
        return this;
    }

    /**
     * Get the TTS names.
     * @returns {Array<TTSChunk>} - An array of TTSChunk structs.
     */
    getTtsName () {
        return this._ttsName;
    }

    /**
     * Set the VR Synonyms.
     * @param {Array<String>} vrSynonyms - An array of strings representing VR Synonyms.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setVrSynonyms (vrSynonyms) {
        this._vrSynonyms = vrSynonyms;
        return this;
    }

    /**
     * Get the VR Synonyms.
     * @returns {Array<String>} - An array of strings representing VR Synonyms.
     */
    getVrSynonyms () {
        return this._vrSynonyms;
    }

    /**
     * Set the desired language of the application.
     * @param {Language} languageDesired - A Language enum value.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setLanguageDesired (languageDesired) {
        this._languageDesired = languageDesired;
        return this;
    }

    /**
     * Get the desired langauge of the application.
     * @returns {Language} - A Language enum value.
     */
    getLanguageDesired () {
        return this._languageDesired;
    }

    /**
     * Set the desired HMI Display Language.
     * @param {Language} hmiDisplayLanguageDesired - A Language enum value.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setHmiDisplayLanguageDesired (hmiDisplayLanguageDesired) {
        this._hmiDisplayLanguageDesired = hmiDisplayLanguageDesired;
        return this;
    }

    /**
     * Get the desired HMI Display Language.
     * @returns {Language} - A Langauge enum value.
     */
    getHmiDisplayLanguageDesired () {
        return this._hmiDisplayLanguageDesired;
    }

    /**
     * Set the application's types.
     * @param {Array<AppHMIType>} appTypes - An array of ordered AppHMIType enum values.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setAppTypes (appTypes) {
        this._appTypes = appTypes;
        if (appTypes !== null && appTypes !== undefined) {
            this._isMediaApp = appTypes.includes(AppHMIType.MEDIA);
        }
        return this;
    }

    /**
     * Get the application's types.
     * @returns {Array<AppHMIType>} - An array of ordered AppHMIType enum values.
     */
    getAppTypes () {
        return this._appTypes;
    }


    /**
     * Set the application's day color scheme.
     * @param {TemplateColorScheme} dayColorScheme - A TemplateColorScheme instance.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setDayColorScheme (dayColorScheme) {
        this._dayColorScheme = dayColorScheme;
        return this;
    }

    /**
     * Get the application's day color scheme.
     * @returns {TemplateColorScheme} - A TemplateColorScheme instance.
     */
    getDayColorScheme () {
        return this._dayColorScheme;
    }

    /**
     * Set the application's night color scheme.
     * @param {TemplateColorScheme} nightColorScheme - A TemplateColorScheme instance.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setNightColorScheme (nightColorScheme) {
        this._nightColorScheme = nightColorScheme;
        return this;
    }

    /**
     * Get the application's night color scheme.
     * @returns {TemplateColorScheme} - A TemplateColorScheme instance.
     */
    getNightColorScheme () {
        return this._nightColorScheme;
    }

    /**
     * Set the minimum RPC version that will be permitted to connect. If the RPC version of the head unit connected is below this version, an UnregisterAppInterface will be sent.
     * @param {Version} minimumRpcVersion - A Version instance.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setMinimumRpcVersion (minimumRpcVersion) {
        this._minimumRpcVersion = minimumRpcVersion;
        return this;
    }

    /**
     * Get the minimum RPC version.
     * @returns {Version} - A Version instance.
     */
    getMinimumRpcVersion () {
        return this._minimumRpcVersion;
    }


    /**
     * Sets the minimum protocol version that will be permitted to connect. If the protocol version of the head unit connected is below this version, the app will disconnect with an EndService protocol message and will not register.
     * @param {Version} minimumProtocolVersion - A Version instance.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setMinimumProtocolVersion (minimumProtocolVersion) {
        this._minimumProtocolVersion = minimumProtocolVersion;
        return this;
    }

    /**
     * Get the minimum protocol version supported by the app.
     * @returns {Version} - A Version instance.
     */
    getMinimumProtocolVersion () {
        return this._minimumProtocolVersion;
    }

    /**
     * Set the hash resumption id.
     * @param {String} resumeHash - The hash id.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    setResumeHash (resumeHash) {
        this._resumeHash = resumeHash;
        return this;
    }

    /**
     * Get the hash resumption id.
     * @returns {String} - The hash id.
     */
    getResumeHash () {
        return this._resumeHash;
    }

    /**
     * Load manifest file of embedded Web Application
     * @param {Object} manifest - A manifest JSON object.
     * @returns {LifecycleConfig} - A reference to this instance to support method chaining.
     */
    loadManifest (manifest) {
        if (typeof manifest !== 'object') {
            throw new Error('Wrong parameter, manifest must be object');
        }
        const manifestKeys = Object.keys(manifest);
        const missingKeys = [
            'appId',
            'appName',
            'category',
            'minProtocolVersion',
            'minRpcVersion',
        ].filter(key => !manifestKeys.includes(key));
        if (missingKeys.length > 0) {
            throw new Error(`Required parameters are missing in the manifest: ${missingKeys.join(', ')}`);
        }
        let isCategoriesChanged = false;
        manifestKeys.forEach((key) => {
            switch (key) {
                case 'appId':
                    this.setAppId(manifest[key]);
                    break;
                case 'appName':
                    this.setAppName(manifest[key]);
                    break;
                case 'category':
                case 'additionalCategories': {
                    const appTypes = isCategoriesChanged ? this.getAppTypes() : [];
                    // merge the category and additionalCategories into one de-duplicated array
                    const categories = appTypes.concat(
                        (Array.isArray(manifest[key]) ? manifest[key] : [manifest[key]])
                            .map((elem) => {
                                const key = AppHMIType.keyForValue(elem);
                                return key ? AppHMIType[key] : '';
                            })
                    ).filter((elem, pos, arr) => elem && (arr.indexOf(elem) === pos));

                    this.setAppTypes(categories);
                    isCategoriesChanged = true;
                    break;
                }
                case 'minProtocolVersion': {
                    const version = new Version().fromString(manifest[key]);
                    this.setMinimumProtocolVersion(version);
                    break;
                }
                case 'minRpcVersion': {
                    const version = new Version().fromString(manifest[key]);
                    this.setMinimumRpcVersion(version);
                    break;
                }
                case 'appIcon': {
                    // split the file path by slashes
                    const fileNameSplit = manifest[key].split(/[/\\]/g);

                    // the last token should be the file name + extension, which is a valid filename
                    const fileName = fileNameSplit[fileNameSplit.length - 1];
                    const fileExtension = fileName.split('.')[1];
                    let fileType = null;

                    // only GRAPHIC_BMP, GRAPHIC_JPEG, GRAPHIC_PNG are supported
                    if (fileExtension.toLowerCase() === 'bmp') {
                        fileType = FileType.GRAPHIC_BMP;
                    } else if (fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg') {
                        fileType = FileType.GRAPHIC_JPEG;
                    } else if (fileExtension.toLowerCase() === 'png') {
                        fileType = FileType.GRAPHIC_PNG;
                    } else {
                        throw new Error('Only BMP, JPG, and PNG app icons are supported');
                    }

                    const file = new SdlFile()
                        .setName(fileName)
                        .setFilePath(manifest[key])
                        .setType(fileType)
                        .setPersistent(true);

                    this.setAppIcon(file);
                    break;
                }
            }
        });
        return this;
    }
}

export { LifecycleConfig };
