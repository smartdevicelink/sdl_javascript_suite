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

class SdlManagerListener {
    /**
     * Initializes an instance of SdlManagerListener
     * @class
     */
    constructor () {
        this._onStart = (sdlManager) => {};
        this._onDestroy = (sdlManager) => {};
        this._onError = (sdlManager, info) => {};
        this._managerShouldUpdateLifecycle = (language) => {
            return null;
        };
        this._managerShouldUpdateLifecycleToLanguage = (language, hmiLanguage) => {
            return null;
        };
        this._onSystemInfoReceived = null;
    }

    /**
     * Set the OnStart event callback function.
     * @param {function} callback - A function to invoke when the event is triggered.
     * @returns {SdlManagerListener} - A reference to this instance to support method chaining.
     */
    setOnStart (callback) {
        this._onStart = callback;
        return this;
    }

    /**
     * Set the OnDestroy event callback function.
     * @param {function} callback - A function to invoke when the event is triggered.
     * @returns {SdlManagerListener} - A reference to this instance to support method chaining.
     */
    setOnDestroy (callback) {
        this._onDestroy = callback;
        return this;
    }

    /**
     * Set the OnError event callback function.
     * @param {function} callback - A function to invoke when the event is triggered.
     * @returns {SdlManagerListener} - A reference to this instance to support method chaining.
     */
    setOnError (callback) {
        this._onError = callback;
        return this;
    }

    /**
     * Set the ManagerShouldUpdateLifecycle event callback function.
     * @deprecated Use setManagerShouldUpdateLifecycleToLanguage instead
     * @param {function} callback - A function to invoke when the event is triggered.
     * @returns {SdlManagerListener} - A reference to this instance to support method chaining.
     */
    setManagerShouldUpdateLifecycle (callback) {
        this._managerShouldUpdateLifecycle = callback;
        return this;
    }

    /**
     * Set the ManagerShouldUpdateLifecycleToLanguage event callback function.
     * @param {function} callback - A function to invoke when the event is triggered.
     * @returns {SdlManagerListener} - A reference to this instance to support method chaining.
     */
    setManagerShouldUpdateLifecycleToLanguage (callback) {
        this._managerShouldUpdateLifecycleToLanguage = callback;
        return this;
    }

    /**
     * Safely attempts to invoke the OnStart event callback function.
     * @param {SdlManager} sdlManager - A reference to an SdlManager instance.
     */
    onStart (sdlManager) {
        if (typeof this._onStart === 'function') {
            this._onStart(sdlManager);
        }
    }

    /**
     * Safely attempts to invoke the OnDestroy event callback function.
     * @param {SdlManager} sdlManager - A reference to an SdlManager instance.
     */
    onDestroy (sdlManager) {
        if (typeof this._onDestroy === 'function') {
            this._onDestroy(sdlManager);
        }
    }

    /**
     * Safely attempts to invoke the OnError event callback function.
     * @param {SdlManager} sdlManager - A reference to an SdlManager instance.
     * @param {String} info - Information about the error
     */
    onError (sdlManager, info) {
        if (typeof this._onError === 'function') {
            this._onError(sdlManager, info);
        }
    }

    /**
     * Safely attempts to invoke the ManagerShouldUpdateLifecycle event callback function.
     * @deprecated Use managerShouldUpdateLifecycleToLanguage instead
     * @param {Language} language - A Language enum value.
     * @returns {LifecycleConfigurationUpdate|null} - A reference to LifecycleConfigurationUpdate instance or null
     */
    managerShouldUpdateLifecycle (language) {
        if (typeof this._managerShouldUpdateLifecycle === 'function') {
            return this._managerShouldUpdateLifecycle(language);
        }
        return null;
    }

    /**
     * Called when the SDL manager detected a language mismatch. In case of a language mismatch the
     * manager should change the apps registration by updating the lifecycle configuration to the
     * specified language. If the app can support the specified language it should return an Object
     * of LifecycleConfigurationUpdate, otherwise it should return null to indicate that the language
     * is not supported.
     * @param {Language} language - The VR+TTS language of the connected head unit the manager is trying to update the configuration.
     * @param {Language} hmiLanguage - The HMI display language of the connected head unit the manager is trying to update the configuration.
     * @returns {LifecycleConfigurationUpdate|null} - A reference to LifecycleConfigurationUpdate instance or null
     */
    managerShouldUpdateLifecycleToLanguage (language, hmiLanguage) {
        if (typeof this._managerShouldUpdateLifecycleToLanguage === 'function') {
            return this._managerShouldUpdateLifecycleToLanguage(language, hmiLanguage);
        }
        return null;
    }

    /**
     * Set the onSystemInfoReceived function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {SdlManagerListener} - A reference to this instance to allow method chaining.
     */
    setOnSystemInfoReceived (listener) {
        this._onSystemInfoReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onSystemInfoReceived event.
     * @param {SystemInfo} systemInfo - the system info of vehicle that this session is currently active on.
     * @returns {Boolean} Return true if this session should continue, false if the session should end
     */
    onSystemInfoReceived (systemInfo) {
        if (typeof this._onSystemInfoReceived === 'function') {
            return !!this._onSystemInfoReceived(systemInfo);
        }
        return true;
    }
}

export { SdlManagerListener };
