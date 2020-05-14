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

/**
 * Configuration update options for SDLManager. This class can be used
 * to update the lifecycle configuration in cases the language of the head unit
 * changes or does not match the app language.
 */
class LifecycleConfigurationUpdate {
    /**
     * Stores information about an SDL application's configuration
     * @class
     */
    constructor () {
        this._appName = null; // required
        this._shortAppName = null;
        this._ttsName = null;
        this._vrSynonyms = null;
    }

    /**
     * Set the app name.
     * @param {String} appName - The app name.
     * @returns {LifecycleConfigurationUpdate} - A reference to this instance to support method chaining.
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
     * Set the short app name.
     * @param {String} shortAppName - The short app name.
     * @returns {LifecycleConfigurationUpdate} - A reference to this instance to support method chaining.
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
     * @returns {LifecycleConfigurationUpdate} - A reference to this instance to support method chaining.
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
     * @returns {LifecycleConfigurationUpdate} - A reference to this instance to support method chaining.
     */
    setVoiceRecognitionCommandNames (vrSynonyms) {
        this._vrSynonyms = vrSynonyms;
        return this;
    }

    /**
     * Get the VR Synonyms.
     * @returns {Array<String>} - An array of strings representing VR Synonyms.
     */
    getVoiceRecognitionCommandNames () {
        return this._vrSynonyms;
    }
}

export { LifecycleConfigurationUpdate };
