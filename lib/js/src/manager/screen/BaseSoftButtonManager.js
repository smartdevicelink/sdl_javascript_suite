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

import { BaseSubManager } from '../BaseSubManager.js';
import { HMILevel } from '../../rpc/enums/HMILevel.js';
import { SystemCapabilityType } from '../../rpc/enums/SystemCapabilityType.js';
import { PredefinedWindows } from '../../rpc/enums/PredefinedWindows.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { ButtonName } from '../../rpc/enums/ButtonName.js';
import { SoftButton } from '../../rpc/structs/SoftButton.js';
import { SoftButtonObject } from './utils/SoftButtonObject.js';
import { SoftButtonType } from '../../rpc/enums/SoftButtonType.js';
import { Show } from '../../rpc/messages/Show.js';

class BaseSoftButtonManager extends BaseSubManager {
    /**
     * constructor
     * @param {LifecycleManager} lifecycleManager
     * @param {FileManager} fileManager
    */
    constructor (lifecycleManager, fileManager) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._softButtonObjects = [];
        this._onDisplayCapabilityListener = null;
        this._onHMIStatusListener = null;
        this._onButtonPressListener = null;
        this._onButtonEventListener = null;
        this._defaultMainWindowCapability = null;
        this._currentMainField1 = null;
        this._batchingUpdates = false; // whether to wait on sending the updates
        this._taskQueue = [];
        this._canRunTasks = false; // changes to true when in a non-NONE HMI level. changes to false when in a NONE HMI level
        this._updateListener = () => {
            this.update(true);
        };
        this._addListeners();
    }

    _addListeners () {
        // HMI UPDATES
        this._hmiListener = (onHmiStatus) => {
            if (onHmiStatus.getWindowID() !== null && onHmiStatus.getWindowID() !== PredefinedWindows.DEFAULT_WINDOW) {
                return;
            }
            const oldHmiLevel = this._currentHmiLevel;
            this._currentHmiLevel = onHmiStatus.getHmiLevel();
            // Auto-send an update if we were in NONE and now we are not
            if (oldHmiLevel === HMILevel.HMI_NONE && this._currentHmiLevel !== HMILevel.HMI_NONE) {
                this._canRunTasks = true;
                this.update();
            }
            // pause the task queue if we got sent back to NONE
            if (oldHmiLevel !== HMILevel.HMI_NONE && this._currentHmiLevel === HMILevel.HMI_NONE) {
                this._canRunTasks = false;
            }
        };

        // DISPLAYS
        this._onDisplayCapabilityListener = (capabilities) => {
            if (!Array.isArray(capabilities) || capabilities.length === 0) {
                return;
            }
            const displayCapability = capabilities[0];
            for (const windowCapability of displayCapability.getWindowCapabilities()) {
                let currentWindowID;
                if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                    currentWindowID = windowCapability.getWindowID();
                } else {
                    currentWindowID = PredefinedWindows.DEFAULT_WINDOW;
                }
                if (currentWindowID === PredefinedWindows.DEFAULT_WINDOW) {
                    this._defaultMainWindowCapability = windowCapability;
                }
            }
        };

        // Add OnButtonPressListener to notify SoftButtonObjects when there is a button press
        this._onButtonPressListener = (onButtonPress) => {
            if (onButtonPress !== null && onButtonPress !== undefined && onButtonPress.getButtonName() === ButtonName.CUSTOM_BUTTON) {
                const buttonId = onButtonPress.getCustomButtonID();
                for (const softButtonObject of this.getSoftButtonObjects()) {
                    if (softButtonObject.getButtonId() === buttonId && softButtonObject.getOnEventListener() !== null) {
                        softButtonObject.getOnEventListener()(this.getSoftButtonObjectById(buttonId), onButtonPress);
                        break;
                    }
                }
            }
        };

        // Add OnButtonEventListener to notify SoftButtonObjects when there is a button event
        this._onButtonEventListener = (onButtonEvent) => {
            if (onButtonEvent !== null && onButtonEvent !== undefined && onButtonEvent.getButtonName() === ButtonName.CUSTOM_BUTTON) {
                const buttonId = onButtonEvent.getCustomButtonID();
                for (const softButtonObject of this.getSoftButtonObjects()) {
                    if (softButtonObject.getButtonId() === buttonId && softButtonObject.getOnEventListener() !== null) {
                        softButtonObject.getOnEventListener()(this.getSoftButtonObjectById(buttonId), onButtonEvent);
                        break;
                    }
                }
            }
        };

        this._lifecycleManager.addRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.addOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener);
    }

    /**
     * @return {Promise}
    */
    async start () {
        this._transitionToState(BaseSubManager.READY);
        await super.start();
    }

    /**
     * teardown method
    */
    dispose () {
        // remove listeners
        this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.removeOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener);
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._softButtonObjects = [];
        this._defaultMainWindowCapability = null;
        this._currentMainField1 = null;
        this._batchingUpdates = false;
        this._canRunTasks = false;
        this._updateListener = null;
    }

    /**
     * Get the SoftButtonObject that has the provided name
     * @param {String} name - a String value that represents the name
     * @return {SoftButtonObject|null} - a SoftButtonObject, or null if none is found
    */
    getSoftButtonObjectByName (name) {
        for (const softButtonObject of this._softButtonObjects) {
            if (softButtonObject.getName() === name) {
                return softButtonObject;
            }
        }
        return null;
    }

    /**
     * Get the SoftButtonObject that has the provided buttonId
     * @param {Number} buttonId - a int value that represents the id of the button
     * @return {SoftButtonObject|null} - a SoftButtonObject, or null if none is found
    */
    getSoftButtonObjectById (buttonId) {
        for (const softButtonObject of this._softButtonObjects) {
            if (softButtonObject.getButtonId() === buttonId) {
                return softButtonObject;
            }
        }
        return null;
    }

    /**
     * Get the soft button objects list
     * @return {SoftButtonObject[]} - a List<SoftButtonObject>
    */
    getSoftButtonObjects () {
        return this._softButtonObjects;
    }

    /**
     * Set softButtonObjects list and upload the images to the head unit
     * @param {SoftButtonObject[]} list - the list of the SoftButtonObject values that should be displayed on the head unit
    */
    async setSoftButtonObjects (list) {
        const softButtonObjects = list;

        // Check if two soft button objects have the same name
        if (this._hasTwoSoftButtonObjectsOfSameName(softButtonObjects)) {
            this._softButtonObjects = [];
            console.error('Attempted to set soft button objects, but two buttons had the same name');
            return;
        }

        if (!this._checkAndAssignButtonIds(softButtonObjects)) {
            console.error('Attempted to set soft button objects, but multiple buttons had the same id');
            return;
        }

        // Set updateListeners for soft button objects
        for (const softButtonObject of softButtonObjects) {
            softButtonObject.setUpdateListener(this._updateListener);
        }

        this._softButtonObjects = softButtonObjects;

        // Prepare soft button images to be uploaded to the head unit.
        // we will prepare a list for initial state images and another list for other state images
        // so we can upload the initial state images first, then the other states images.
        const initialStatesToBeUploaded = [];
        const otherStatesToBeUploaded = [];

        if (this._softButtonImagesSupported() && this._fileManager !== null) {
            for (const softButtonObject of softButtonObjects) {
                let initialState = null;
                if (softButtonObject !== null) {
                    initialState = softButtonObject.getCurrentState();
                }
                if (initialState !== null && Array.isArray(softButtonObject.getStates())) {
                    for (const softButtonState of softButtonObject.getStates()) {
                        if (softButtonState !== null && softButtonState.getName() !== null && this._sdlArtworkNeedsUpload(softButtonState.getArtwork())) {
                            if (softButtonState.getName() === initialState.getName()) {
                                initialStatesToBeUploaded.push(softButtonObject.getCurrentState().getArtwork());
                            } else {
                                otherStatesToBeUploaded.push(softButtonState.getArtwork());
                            }
                        }
                    }
                }
            }
        }

        // Upload initial state images
        if (initialStatesToBeUploaded.length > 0 && this._fileManager !== null) {
            const results = await this._fileManager.uploadArtworks(initialStatesToBeUploaded);
            if (results.includes(false)) {
                console.error('Error uploading soft button artworks');
            }
        }

        // Upload other state images
        if (otherStatesToBeUploaded.length > 0 && this._fileManager !== null) {
            const results = await this._fileManager.uploadArtworks(otherStatesToBeUploaded);
            if (results.includes(false)) {
                console.error('Error uploading soft button artworks');
            }
        }

        this._taskQueue.push(true); // add a task for the update method
        // This is necessary because there may be no images needed to be uploaded
        this.update();
    }

    /**
     * Check if there is a collision in the ids provided by the developer and assign ids to the SoftButtonObjects that do not have ids
     * @param {SoftButtonObject[]} softButtonObjects - the list of the SoftButtonObject values that should be displayed on the head unit
     * @return {Boolean} - boolean representing whether the ids are unique or not
    */
    _checkAndAssignButtonIds (softButtonObjects) {
        // If there are any ids that are the same that aren't the default id (ex. -1) then fail out
        // Remember the largest id manually set, so that no collisions occur when setting the unset ids later
        // If the user didn't set an id, then this method should set one for them
        const buttonIds = softButtonObjects.map(softButtonObject => softButtonObject.getButtonId());
        // button ids that don't have the default unset id
        const setButtonIds = buttonIds.filter(buttonId => buttonId !== SoftButtonObject.SOFT_BUTTON_ID_NOT_SET_VALUE);

        // button id uniqueness test
        const buttonIdSet = new Set();
        setButtonIds.forEach(buttonId => {
            buttonIdSet.add(buttonId);
        });

        if (buttonIdSet.size !== setButtonIds.length) {
            // a duplicate id was found, as the set ended up a different size compared to the array
            return false;
        }

        // set the button ids
        let currentButtonId = Math.max.apply(null, buttonIds); // the largest id found

        for (const softButtonObject of softButtonObjects) {
            if (softButtonObject.getButtonId() === SoftButtonObject.SOFT_BUTTON_ID_NOT_SET_VALUE) {
                // keep incrementing currentButtonId until an unused id is found
                while (buttonIds.includes(currentButtonId)) {
                    currentButtonId++;
                    if (currentButtonId > SoftButtonObject.SOFT_BUTTON_ID_MAX_VALUE) {
                        currentButtonId = SoftButtonObject.SOFT_BUTTON_ID_MIN_VALUE;
                    }
                }
                softButtonObject.setButtonId(currentButtonId);
                buttonIds.push(currentButtonId);
            }
        }
        return true;
    }

    /**
     * Update the SoftButtonManger by sending a new Show RPC to reflect the changes
     * @return {Promise}
    */
    async update (knownUpdate) {
        if (knownUpdate) {
            this._taskQueue.push(true);
        }
        
        // don't continue if there's nothing to do or if the manager didn't get the right HMI level yet
        if (!this._canRunTasks || this._taskQueue.length === 0) {
            return;
        }
        // empty the queue out the safe way
        while (this._taskQueue.length > 0) {
            this._taskQueue.shift();
        }

        // Send Show RPC with soft buttons representing the current state for the soft button objects
        const show = new Show()
            .setMainField1(this.getCurrentMainField1());

        if (this._softButtonObjects === null) {
            show.setSoftButtons([]);
        } else if ((this._currentStateHasImages() && !this._allCurrentStateImagesAreUploaded()) || !this._softButtonImagesSupported()) {
            // The images don't yet exist on the head unit, or we cannot use images, send a text update if possible, otherwise, don't send anything yet
            const textOnlySoftButtons = this._createTextSoftButtonsForCurrentState();
            if (textOnlySoftButtons === null) {
                return;
            }
            show.setSoftButtons(textOnlySoftButtons);
        } else { // soft buttons available
            show.setSoftButtons(this._createSoftButtonsForCurrentState());
        }

        const response = await this._lifecycleManager.sendRpcMessage(show)
            .catch(err => err);

        if (!response.getSuccess()) {
            console.error(response);
        }

        // run this method again for potential future tasks
        return this.update();
    }

    /**
     * Returns whether soft button images are supported
     * @return {Boolean}
    */
    _softButtonImagesSupported () {
        if (this._defaultMainWindowCapability === null) {
            return true;
        }
        const softButtonCapabilities = this._defaultMainWindowCapability.getSoftButtonCapabilities();
        return softButtonCapabilities === null || (softButtonCapabilities.length !== 0 && softButtonCapabilities[0].getImageSupported());
    }

    /**
     * Check if two SoftButtonObject have the same name
     * @param {SoftButtonObject} softButtonObjects - a list of SoftButton objects that will be iterated through
     * @return {Boolean}
    */
    _hasTwoSoftButtonObjectsOfSameName (softButtonObjects) {
        const set = new Set();
        softButtonObjects.forEach(softButtonObject => {
            set.add(softButtonObject.getName());
        });
        return set.size !== softButtonObjects.length;
    }

    /**
     * Get the current String associated with MainField1
     * @return {String} - the string that is currently used for MainField1
    */
    getCurrentMainField1 () {
        // This is necessary due to a Ford Sync 3 bug that doesn't like Show requests without a main field being set
        // (it will accept them, but with a GENERIC_ERROR, and 10-15 seconds late...)
        if (this._currentMainField1 === null) {
            return '';
        }
        return this._currentMainField1;
    }

    /**
     * Sets the String to be associated with MainField1
     * @param {String} currentMainField1 - the String that will be set to TextField1 on the current template
    */
    setCurrentMainField1 (currentMainField1) {
        this._currentMainField1 = currentMainField1;
    }

    /**
     * Sets the batchUpdates flag that represents whether the manager should wait until commit() is called to send the updated show RPC
     * @param {Boolean} - batchUpdates Set true if the manager should batch updates together, or false if it should send them as soon
     *                     as they happen
    */
    setBatchUpdates (batchUpdates) {
        this._batchingUpdates = batchUpdates;
        this.update(true);
    }

    /**
     * Check if the current state for any SoftButtonObject has images
     * @return {Boolean} - a boolean value
    */
    _currentStateHasImages () {
        for (const softButtonObject of this._softButtonObjects) {
            const currentState = softButtonObject.getCurrentState();
            if (currentState !== null && currentState.getArtwork() !== null) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if the current state for any SoftButtonObject has images that are not uploaded yet
     * @return {Boolean} - a boolean value
    */
    _allCurrentStateImagesAreUploaded () {
        if (this._fileManager !== null) {
            for (const softButtonObject of this._softButtonObjects) {
                const currentState = softButtonObject.getCurrentState();
                if (currentState !== null && this._sdlArtworkNeedsUpload(currentState.getArtwork())) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Check if the current state for any SoftButtonObject has images that are not uploaded yet
     * @param {SdlArtwork} artwork
     * @return {Boolean} - a boolean value
    */
    _sdlArtworkNeedsUpload (artwork) {
        if (this._fileManager !== null) {
            return artwork !== null && !this._fileManager.hasUploadedFile(artwork) && !artwork.isStaticIcon();
        }
        return false;
    }

    /**
     * Returns text soft buttons representing the initial states of the button objects
     * @return {SoftButton[]|null} - The text soft buttons, or null if any of the buttons' current states are image only buttons.
    */
    _createTextSoftButtonsForCurrentState () {
        const textButtons = [];
        for (const softButtonObject of this._softButtonObjects) {
            const softButton = softButtonObject.getCurrentStateSoftButton();
            if (softButton.getText() === null) {
                return null;
            }
            // We should create a new softButtonObject rather than modifying the original one
            const textOnlySoftButton = new SoftButton()
                .setType(SoftButtonType.SBT_TEXT)
                .setSoftButtonID(softButton.getSoftButtonID())
                .setText(softButton.getText());
            textButtons.push(textOnlySoftButton);
        }
        return textButtons;
    }

    /**
     * Returns a list of the SoftButton for the SoftButtonObjects' current state
     * @return {SoftButton[]}
    */
    _createSoftButtonsForCurrentState () {
        return this._softButtonObjects.map(softButtonObject => {
            return softButtonObject.getCurrentStateSoftButton();
        });
    }
}

export { BaseSoftButtonManager };
