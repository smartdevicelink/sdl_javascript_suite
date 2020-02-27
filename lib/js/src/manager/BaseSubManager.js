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

import { FunctionID } from '../rpc/enums/FunctionID.js';
import { PredefinedWindows } from '../rpc/enums/PredefinedWindows.js';
import { SystemCapabilityType } from '../rpc/enums/SystemCapabilityType.js';

/**
 * BaseSubManager handles the basic state transitions from
 * SETTING_UP to READY or ERROR. It is extended by other managers
 * like FileManager.
 */
class BaseSubManager {
    /**
     * @param {LifecycleManager} lifecycleManager - An instance of a LifecycleManager
     */
    constructor (lifecycleManager) {
        this._lifecycleManager = lifecycleManager;
        this._onDisplayCapabilityListener = null;
        this._defaultMainWindowCapability = null;
        this._isHandlingDisplay = false; // whether the subclass wants this class to handle display capability updates
        this._transitionToState(SETTING_UP);
    }

    /**
     * Starts up a BaseSubManager, and resolves the returned Promise when BaseSubManager is done setting up or failed setup.
     * @return {Promise} Resolves true when in READY or LIMITED state, or false when in ERROR state.
     */
    async start () {
        return new Promise((resolve, reject) => {
            // set up our own internal listener so that other methods can invoke this function to resolve the promise
            this._onComplete = (state) => {
                resolve(state);
            };

            const state = this.getState();
            if ((state === READY || state === LIMITED || state === ERROR) && typeof this._onComplete === 'function') {
                this._onComplete(state === READY || state === LIMITED);
                this._onComplete = null;
            }
        });
    }

    /**
     * Called when manager is being torn down.
     */
    dispose () {
        if (this._isHandlingDisplay) {
            this._defaultMainWindowCapability = null;
            if (typeof this._onDisplayCapabilityListener === 'function') {
                this._lifecycleManager.removeOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
            }
            this._isHandlingDisplay = false;
        }

        this._transitionToState(SHUTDOWN);
    }


    /**
     * Transition and inform onComplete callback if defined.
     * @param {Number} state
     */
    _transitionToState (state) {
        this._state = state;
        if ((state === READY || state === LIMITED || state === ERROR) && typeof this._onComplete === 'function') {
            this._onComplete(state === READY || state === LIMITED);
            this._onComplete = null;
        }
    }

    /**
     * Returns the current state.
     * @return {Number}
     */
    getState () {
        return this._state;
    }


    /**
     * This allows the method to not be exposed to developers.
     * @param {TransportRecord[]} connectedTransports - currently connected transports
     * @param {Boolean} audioStreamTransportAvail - if there is a transport that could be used to carry the audio service
     * @param {Boolean} videoStreamTransportAvail - if there is a transport that could be used to carry the video service
     */
    _handleTransportUpdated (connectedTransports, audioStreamTransportAvail, videoStreamTransportAvail) {
        this._onTransportUpdate(connectedTransports, audioStreamTransportAvail, videoStreamTransportAvail);
    }

    /**
     * Transport status has been updated.
     * @param {TransportRecord[]} connectedTransports - currently connected transports
     * @param {Boolean} audioStreamTransportAvail - if there is a transport that could be used to carry the audio service
     * @param {Boolean} videoStreamTransportAvail - if there is a transport that could be used to carry the video service
     */
    _onTransportUpdate (connectedTransports, audioStreamTransportAvail, videoStreamTransportAvail) {

    }

    /**
     * Sets up a listener to the system capabilities and updates the default main window capability
     */
    _handleDisplayCapabilityUpdates () {
        this._isHandlingDisplay = true;
        this._onDisplayCapabilityListener = (capabilities) => {
            if (!Array.isArray(capabilities) || capabilities.length === 0) {
                return;
            }
            const displayCapability = capabilities[0];
            for (const windowCapability of displayCapability.getWindowCapabilities()) {
                let currentWindowId;
                if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                    currentWindowId = windowCapability.getWindowID();
                } else {
                    currentWindowId = PredefinedWindows.DEFAULT_WINDOW;
                }
                if (currentWindowId === PredefinedWindows.DEFAULT_WINDOW) {
                    this._defaultMainWindowCapability = windowCapability;
                }
            }
        };

        this._lifecycleManager.addOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
    }
}

const SETTING_UP = BaseSubManager.SETTING_UP = 0x00;
const READY = BaseSubManager.READY = 0x30;
const LIMITED = BaseSubManager.LIMITED = 0x50;
const SHUTDOWN = BaseSubManager.SHUTDOWN = 0x80;
const ERROR = BaseSubManager.ERROR = 0xC0;

export { BaseSubManager };
