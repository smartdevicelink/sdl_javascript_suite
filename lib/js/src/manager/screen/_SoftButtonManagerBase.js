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

import { _SubManagerBase } from '../_SubManagerBase.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { ButtonName } from '../../rpc/enums/ButtonName.js';
import { HMILevel } from '../../rpc/enums/HMILevel.js';
import { SystemCapabilityType } from '../../rpc/enums/SystemCapabilityType.js';
import { PredefinedWindows } from '../../rpc/enums/PredefinedWindows.js';
import { _ScreenManagerBase } from './_ScreenManagerBase.js';
import { _SoftButtonReplaceOperation } from './_SoftButtonReplaceOperation.js';
import { _SoftButtonTransitionOperation } from './_SoftButtonTransitionOperation.js';

class _SoftButtonManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _SoftButtonManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance.
     * @param {FileManager} fileManager - A FileManager instance.
     */
    constructor (lifecycleManager, fileManager) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._softButtonObjects = [];
        this._batchQueue = [];
        this._onButtonPressListener = null;
        this._onButtonEventListener = null;
        this._hmiListener = null;
        this._softButtonCapabilities = null;
        this._currentMainField1 = null;
        this._currentHmiLevel = null;
        this._batchUpdates = false; // whether to wait on sending the updates
        this._displayCapabilities = null;
        if (lifecycleManager.getSystemCapabilityManager() !== null) {
            this._displayCapabilities = lifecycleManager.getSystemCapabilityManager().getDisplayCapabilities();
        }
        this._isDynamicGraphicSupported = (this._displayCapabilities !== null && this._displayCapabilities.getGraphicSupported() !== null) ? this._displayCapabilities.getGraphicSupported() : true;

        this._updateListener = () => {
            this._transitionSoftButton();
        };
        this._isHandlingTasks = true;
        this._addListeners();
    }

    /**
     * Listens for OnHMIStatus and display capability updates, as well as button-related events
     * @private
     */
    _addListeners () {
        // Add OnButtonPressListener to notify SoftButtonObjects when there is a button press
        this._onButtonPressListener = (onButtonPress) => {
            if (onButtonPress !== null && onButtonPress !== undefined && onButtonPress.getButtonName() === ButtonName.CUSTOM_BUTTON) {
                const buttonId = onButtonPress.getCustomButtonID();
                for (const softButtonObject of this.getSoftButtonObjects()) {
                    if (softButtonObject.getButtonId() === buttonId && typeof softButtonObject.getOnEventListener() === 'function') {
                        softButtonObject.getOnEventListener()(this._getSoftButtonObjectById(buttonId), onButtonPress);
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
                    if (softButtonObject.getButtonId() === buttonId && typeof softButtonObject.getOnEventListener() === 'function') {
                        softButtonObject.getOnEventListener()(this._getSoftButtonObjectById(buttonId), onButtonEvent);
                        break;
                    }
                }
            }
        };

        this._hmiListener = (onHmiStatus) => {
            if (onHmiStatus.getWindowID() !== null && onHmiStatus.getWindowID() !== PredefinedWindows.DEFAULT_WINDOW) {
                return;
            }
            this._currentHmiLevel = onHmiStatus.getHmiLevel();
            this._updateTransactionQueueSuspended();
        };

        this._onDisplayCapabilityListener = (capabilities) => {
            const oldSoftButtonCapabilities = this._softButtonCapabilities;
            // Extract and update the capabilities
            if (!Array.isArray(capabilities) || capabilities.length === 0) {
                this._softButtonCapabilities = null;
            } else {
                const displayCapability = capabilities[0];
                for (const windowCapability of displayCapability.getWindowCapabilities()) {
                    let currentWindowId;
                    if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                        currentWindowId = windowCapability.getWindowID();
                    } else {
                        currentWindowId = PredefinedWindows.DEFAULT_WINDOW;
                    }
                    if (currentWindowId === PredefinedWindows.DEFAULT_WINDOW) {
                        if (windowCapability.getSoftButtonCapabilities() !== null && windowCapability.getSoftButtonCapabilities() !== undefined && windowCapability.getSoftButtonCapabilities().length > 0) {
                            this._softButtonCapabilities = windowCapability.getSoftButtonCapabilities()[0];
                        } else {
                            this._softButtonCapabilities = null;
                        }

                        break;
                    }
                }
            }

            // Update the queue's suspend state
            this._updateTransactionQueueSuspended();

            // Auto-send an updated Show if we have new capabilities
            if (this._softButtonObjects.length !== 0 && this._softButtonCapabilities !== null && this._softButtonCapabilities !== undefined && !this._softButtonCapabilitiesEquals(oldSoftButtonCapabilities, this._softButtonCapabilities)) {
                const operation = new _SoftButtonReplaceOperation(this._lifecycleManager, this._fileManager, this._softButtonCapabilities, this._softButtonObjects, this.getCurrentMainField1(), this._isDynamicGraphicSupported);
                this._addTask(operation);
            }
        };

        this._lifecycleManager.addOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        this._lifecycleManager.addRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener);
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Teardown method
     */
    dispose () {
        // remove listeners
        this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.removeOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener);
        this._softButtonObjects = [];
        this._currentHmiLevel = null;
        this._updateListener = null;
        this._currentMainField1 = null;
        this._softButtonCapabilities = null;

        this._cancelAllTasks();
    }

    /**
     * Suspend the queue if the soft button capabilities are null (we assume that soft buttons are not supported)
     * OR if the HMI level is NONE since we want to delay sending RPCs until we're in non-NONE
     * @private
     */
    _updateTransactionQueueSuspended () {
        if (this._softButtonCapabilities === null || HMILevel.HMI_NONE === this._currentHmiLevel) {
            console.log(`SoftButtonManagerBase - Suspending the transaction queue. Current HMI level is NONE: ${HMILevel.HMI_NONE === this._currentHmiLevel}, soft button capabilities are null: ${this._softButtonCapabilities === null}`);
            this._canRunTasks = false;
        } else if (!this._canRunTasks) { // helps reduces console log spam
            console.log('SoftButtonManagerBase - Starting the transaction queue');
            this._canRunTasks = true;
            this._invokeTaskQueue();
        }
    }

    /**
     * Get the soft button objects list
     * @returns {SoftButtonObject[]} - a List<SoftButtonObject>
     */
    getSoftButtonObjects () {
        return this._softButtonObjects;
    }

    /**
     * Set softButtonObjects list and upload the images to the head unit
     * @param {SoftButtonObject[]} list - the list of the SoftButtonObject values that should be displayed on the head unit
     * @returns {Promise} - Resolves to _SoftButtonManagerBase
     */
    async setSoftButtonObjects (list) {
        const softButtonObjects = list;

        // Only update if something changed. This prevents, for example, an empty array being reset
        let isEqual = true;
        if (softButtonObjects.length !== this._softButtonObjects.length) {
            isEqual = false;
        }
        for (let index = 0; index < softButtonObjects.length; index++) {
            if (!softButtonObjects[index].equals(this._softButtonObjects[index])) {
                isEqual = false;
            }
        }
        if (isEqual) {
            console.log('SoftButtonManagerBase - New soft button objects are equivalent to existing soft button objects, skipping...');
            return this;
        }

        // Check if two soft button objects have the same name
        if (this._hasTwoSoftButtonObjectsOfSameName(softButtonObjects)) {
            this._softButtonObjects.splice(0, this._softButtonObjects.length); // clear out the array

            console.error('SoftButtonManagerBase - Attempted to set soft button objects, but two buttons had the same name');
            return this;
        }

        if (!_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.SOFTBUTTON_MANAGER)) {
            console.error('SoftButtonManagerBase - Attempted to set soft button objects, but multiple buttons had the same id');
            return this;
        }

        // Set updateListeners for soft button objects
        for (const softButtonObject of softButtonObjects) {
            softButtonObject._setUpdateListener(this._updateListener);
        }

        this._softButtonObjects = softButtonObjects;

        // We only need to pass the first softButtonCapabilities in the array due to the fact that all soft button capabilities are the same (i.e. there is no way to assign a softButtonCapabilities to a specific soft button).
        const operation = new _SoftButtonReplaceOperation(this._lifecycleManager, this._fileManager, this._softButtonCapabilities, this._softButtonObjects, this.getCurrentMainField1(), this._isDynamicGraphicSupported);

        if (this._batchUpdates) {
            this._batchQueue.splice(0, this._batchQueue.length); // clear out the array
            this._batchQueue.push(operation);
        } else {
            this._cancelAllTasks();
            this._addTask(operation);
        }

        return this;
    }

    /**
     * Check if two SoftButtonObject have the same name
     * @private
     * @param {SoftButtonObject[]} softButtonObjects - a list of SoftButton objects that will be iterated through
     * @returns {Boolean} - Whether or not two of the SoftButtonObject items have the same name.
     */
    _hasTwoSoftButtonObjectsOfSameName (softButtonObjects) {
        const set = new Set();
        softButtonObjects.forEach(softButtonObject => {
            set.add(softButtonObject.getName());
        });
        return set.size !== softButtonObjects.length;
    }

    /**
     * Add the soft button transition operation task
     * @private
     */
    _transitionSoftButton () {
        const operation = new _SoftButtonTransitionOperation(this._lifecycleManager, this._softButtonObjects, this.getCurrentMainField1());

        if (this._batchUpdates) {
            for (let index = 0; index < this._batchQueue.length; index++) {
                if (this._batchQueue[index] instanceof _SoftButtonTransitionOperation) {
                    this._batchQueue.splice(index, 1);
                    index--; // account for the change in array size
                }
            }
            this._batchQueue.push(operation);
        } else {
            this._addTask(operation);
        }
    }

    /**
     * Get the SoftButtonObject that has the provided name
     * @param {String} name - a String value that represents the name
     * @returns {SoftButtonObject|null} - a SoftButtonObject, or null if none is found
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
     * @private
     * @param {Number} buttonId - a int value that represents the id of the button
     * @returns {SoftButtonObject|null} - a SoftButtonObject, or null if none is found
     */
    _getSoftButtonObjectById (buttonId) {
        for (const softButtonObject of this._softButtonObjects) {
            if (softButtonObject.getButtonId() === buttonId) {
                return softButtonObject;
            }
        }
        return null;
    }

    /**
     * Sets the batchUpdates flag that represents whether the manager should wait until commit() is called to send the updated show RPC
     * @param {Boolean} batchUpdates - Set true if the manager should batch updates together, or false if it should send them as soon as they happen
     * @returns {_SoftButtonManagerBase} - A reference to this instance to support method chaining.
     */
    setBatchUpdates (batchUpdates) {
        this._batchUpdates = batchUpdates;

        if (!this._batchUpdates) {
            for (let index = 0; index < this._batchQueue.length; index++) {
                this._addTask(this._batchQueue[index]);
            }
            this._batchQueue.splice(0, this._batchQueue.length); // clear out the array
        }

        return this;
    }

    /**
     * Get the current String associated with MainField1
     * @returns {String} - the string that is currently used for MainField1
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
     * @returns {_SoftButtonManagerBase} - A reference to this instance to support method chaining.
     */
    setCurrentMainField1 (currentMainField1) {
        this._currentMainField1 = currentMainField1;

        for (let index = 0; index < this._taskQueue.length; index++) {
            if (this._taskQueue[index] instanceof _SoftButtonReplaceOperation) {
                this._taskQueue[index].setCurrentMainField1(this.getCurrentMainField1());
            } else if (this._taskQueue[index] instanceof _SoftButtonTransitionOperation) {
                this._taskQueue[index].setCurrentMainField1(this.getCurrentMainField1());
            }
        }

        return this;
    }

    /**
     * Checks whether the two capabilities are equal
     * @private
     * @param {SoftButtonCapabilities} capabilities1 - The soft button capabilities to compare
     * @param {SoftButtonCapabilities} capabilities2 - The soft button capabilities to compare
     * @returns {Boolean} - Whether the two objects are equal
     */
    _softButtonCapabilitiesEquals (capabilities1 = null, capabilities2 = null) {
        if (capabilities1 === capabilities2) {
            return true;
        } else if (capabilities1 === null || capabilities2 === null) {
            return false;
        } else if (capabilities1.getImageSupported() !== capabilities2.getImageSupported()) {
            return false;
        } else if (capabilities1.getTextSupported() !== capabilities2.getTextSupported()) {
            return false;
        }

        return true;
    }
}

export { _SoftButtonManagerBase };
