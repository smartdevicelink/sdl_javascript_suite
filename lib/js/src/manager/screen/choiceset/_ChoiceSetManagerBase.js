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

import { _SubManagerBase } from '../../_SubManagerBase.js';
import { _Task } from '../../_Task.js';
import { KeyboardProperties } from '../../../rpc/structs/KeyboardProperties.js';
import { Language } from '../../../rpc/enums/Language.js';
import { KeyboardLayout } from '../../../rpc/enums/KeyboardLayout.js';
import { KeypressMode } from '../../../rpc/enums/KeypressMode.js';
import { InteractionMode } from '../../../rpc/enums/InteractionMode.js';
import { PredefinedWindows } from '../../../rpc/enums/PredefinedWindows.js';
import { SystemCapabilityType } from '../../../rpc/enums/SystemCapabilityType.js';
import { _ManagerUtility } from '../../_ManagerUtility.js';
import { TextFieldName } from '../../../rpc/enums/TextFieldName.js';
import { ImageFieldName } from '../../../rpc/enums/ImageFieldName.js';

// operations and listeners
import { _CheckChoiceVrOptionalInterface } from './_CheckChoiceVrOptionalInterface.js';
import { ChoiceSetSelectionListener } from './ChoiceSetSelectionListener.js';
import { _CheckChoiceVrOptionalOperation } from './_CheckChoiceVrOptionalOperation.js';
import { _DeleteChoicesOperation } from './_DeleteChoicesOperation.js';
import { _PreloadChoicesOperation } from './_PreloadChoicesOperation.js';
import { _PresentChoiceSetOperation } from './_PresentChoiceSetOperation.js';
import { _PresentKeyboardOperation } from './_PresentKeyboardOperation.js';
import { _PreloadAndPresentChoicesOperation } from './_PreloadAndPresentChoicesOperation.js';

class _ChoiceSetManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _ChoiceSetManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance.
     * @param {FileManager} fileManager - A FileManager instance.
     */
    constructor (lifecycleManager, fileManager = null) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._onDisplayCapabilityListener = null;
        this._defaultMainWindowCapability = null;
        this._addListeners(); // handle the system capability listener specifically
        this._handleTaskQueue(true); // use system context of OnHMIStatus
        // internal usage
        this._keyboardConfiguration = this._defaultKeyboardConfiguration();
        this._displayName = null;
        this._preloadedChoices = [];
        this._pendingPreloadChoices = [];
        this._pendingPresentOperation = null;
        this._currentlyPresentedKeyboardOperation = null;
        this._nextChoiceId = _ChoiceSetManagerBase.CHOICE_CELL_ID_MIN;
        this._nextCancelId = _ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MIN;
        this._isVrOptional = false;
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(_ChoiceSetManagerBase.CHECKING_VOICE);
        this._checkVoiceOptional();
        await super.start();
    }

    /**
     * Teardown method
     */
    dispose () {
        this._cancelAllTasks(); // cancel all operations
        this._defaultMainWindowCapability = null;
        if (typeof this._onDisplayCapabilityListener === 'function') {
            this._lifecycleManager.removeOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        }
        this._pendingPresentOperation = null;
        this._isVrOptional = false;
        this._nextChoiceId = _ChoiceSetManagerBase.CHOICE_CELL_ID_MIN;
        this._nextCancelId = _ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MIN;
        super.dispose();
    }

    /**
     * Initial check if voice commands are optional or mandatory
     */
    _checkVoiceOptional () {
        const checkChoiceVr = new _CheckChoiceVrOptionalOperation(this._lifecycleManager, new _CheckChoiceVrOptionalInterface()
            .setOnCheckChoiceVROperationComplete(vrOptional => {
                this._isVrOptional = vrOptional;
                this._transitionToState(_SubManagerBase.READY);
            })
            .setOnError(error => {
                // At this point, there were errors trying to send a test PICS
                // If we reach this state, we cannot use the manager
                this._transitionToState(_SubManagerBase.ERROR);
                // checking VR will always be first in the queue.
                // If pre-load operations were added while this was in progress
                // clear it from the queue onError.
                this._cancelAllTasks(); // cancel all operations
            }));
        this._addTask(checkChoiceVr);
    }

    /**
     * Preload choices to improve performance while presenting a choice set at a later time
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects that will be part of a choice set later
     * @returns {Promise} - A promise that resolves to a Boolean of whether the operation is a success
     */
    preloadChoices (choices = null) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return Promise.resolve(false);
        }
        const choicesToUpload = this._getChoicesToBeUploadedWithArray(choices);
        this._removeChoicesFromChoices(this._preloadedChoices, choicesToUpload);
        this._removeChoicesFromChoices(this._pendingPreloadChoices, choicesToUpload);
        if (choicesToUpload.length === 0) {
            return Promise.resolve(true);
        }
        this._updateIdsOnChoices(choicesToUpload);
        // Add the preload cells to the pending preload choices
        this._pendingPreloadChoices = this._pendingPreloadChoices.concat(choicesToUpload);
        if (this._fileManager === null) {
            console.error('ChoiceSetManager: File Manager was null in preload choice operation');
            return Promise.resolve(false);
        }

        const preloadChoicesOperation = new _PreloadAndPresentChoicesOperation(this._lifecycleManager, this._fileManager, this._displayName,
            this._defaultMainWindowCapability, this._isVrOptional, choicesToUpload,
            this._preloadedChoices, false, (loadedCells, success) => {
                if (!success) {
                    console.error('ChoiceSetManager: There was an error preloading choice cells');
                    return;
                }
                this._preloadedChoices = this._preloadedChoices.concat(choicesToUpload);
                this._removeChoicesFromChoices(choicesToUpload, this._pendingPreloadChoices);
            });
        this._addTask(preloadChoicesOperation);

        /*
        return new Promise(resolve => {
            const preloadChoicesOperation = new _PreloadChoicesOperation(this._lifecycleManager, this._fileManager,
                this._displayName, this._defaultMainWindowCapability, this._isVrOptional, this._preloadedChoices, choicesToUpload, (updatedLoadedCells, success) => {
                    if (!success) {
                        console.error('ChoiceSetManager: There was an error preloading choice cells');
                        return resolve(false);
                    }
                    this._preloadedChoices = this._preloadedChoices.concat(choicesToUpload);
                    this._removeChoicesFromChoices(choicesToUpload, this._pendingPreloadChoices);
                    resolve(true);
                });
            this._addTask(preloadChoicesOperation);
        });*/
    }

    /**
     * Checks if 2 or more cells have the same text/title. In case this condition is true, this function will handle the presented issue by adding "(count)".
     * E.g. Choices param contains 2 cells with text/title "Address" will be handled by updating the uniqueText/uniqueTitle of the second cell to "Address (2)".
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects to be uploaded
     */
    _addUniqueNamesToCells (choices) {
        const dictCounter = {}; // create a string to number hash for counting similar primary texts

        choices.forEach(choice => {
            const choiceName = choice.getText();
            if (dictCounter[choiceName] === undefined) {
                dictCounter[choiceName] = 1; // unique text
            } else { // found a duplicate
                dictCounter[choiceName] += 1;
                choice._setUniqueText(`${choiceName} (${dictCounter[choiceName]})`);
            }
        });
    }

    /**
     * Deletes choices that were sent previously
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects
     * @returns {Promise} - A promise that resolves to a Boolean of whether the operation is a success
     */
    async deleteChoices (choices) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return false;
        }
        /*
        // Find cells to be deleted that are already uploaded or are pending upload
        const choicesToBeDeleted = this._keepChoicesInBoth(choices, this._preloadedChoices);
        const choicesToBeRemovedFromPending = this._keepChoicesInBoth(choices, this._pendingPreloadChoices);
        // If choices are deleted that are already uploaded or pending and are used by a pending presentation, cancel it and send an error
        let pendingPresentationChoices = [];
        if (this._pendingPresentationSet !== null && this._pendingPresentationSet.getChoices() !== null) { // type is ChoiceSet
            pendingPresentationChoices = pendingPresentationChoices.concat(this._pendingPresentationSet.getChoices());
        }

        const deleteSetChanged = choicesToBeDeleted.length !== this._keepChoicesInBoth(choicesToBeDeleted, pendingPresentationChoices).length;
        const pendingSetChanged = choicesToBeRemovedFromPending.length !== this._keepChoicesInBoth(choicesToBeRemovedFromPending, pendingPresentationChoices).length;
        if (this._pendingPresentOperation !== null && this._pendingPresentOperation.getState() !== _Task.CANCELED
            && this._pendingPresentOperation.getState() !== _Task.FINISHED && (deleteSetChanged || pendingSetChanged)) {
            this._pendingPresentOperation.switchStates(_Task.CANCELED);
            console.warn('ChoiceSetManager: Attempting to delete choice cells while there is a pending presentation operation. Pending presentation cancelled.');
            this._pendingPresentOperation = null;
        }

        this._getTasks().forEach(task => {
            if (task instanceof _PreloadChoicesOperation) {
                task._removeChoicesFromUpload(choicesToBeRemovedFromPending);
            }
        });

        // find choices to delete
        if (choicesToBeDeleted.length === 0) {
            return true;
        }
        this._findIdsOnChoices(choicesToBeDeleted);
        */

        return new Promise(resolve => {
            const deleteChoicesOperation = new _DeleteChoicesOperation(this._lifecycleManager, choices, this._preloadedChoices, (updatedLoadedCells, success) => {
                if (!success) {
                    console.error('ChoiceSetManager: Failed to delete choices');
                    return resolve(false);
                }
                this._preloadedChoices = updatedLoadedCells;
                this._updatePendingTasksWithCurrentPreloads();
                // this._removeChoicesFromChoices(choicesToBeDeleted, this._preloadedChoices);
                resolve(true);
            });
            this._addTask(deleteChoicesOperation);
        });
    }

    /**
     * Presents a choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @param {InteractionMode} mode - The intended interaction mode
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     */
    presentChoiceSet (choiceSet, mode, keyboardListener) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return;
        }

        // Perform additional checks against the ChoiceSet
        if (!this._setUpChoiceSet(choiceSet)) {
            return;
        }

        // checks have passed
        /* if (this._pendingPresentationSet !== null && this._pendingPresentOperation !== null) {
            this._pendingPresentOperation.switchStates(_Task.CANCELED);
            console.warn('ChoiceSetManager: Presenting a choice set while one is currently presented. Cancelling previous and continuing');
        }

        this._pendingPresentationSet = choiceSet;*/

        this._sendPresentOperation(choiceSet, keyboardListener, mode);

        /* this.preloadChoices(choiceSet.getChoices())
            .then(success => {
                if (!success) {
                    choiceSet.getChoiceSetSelectionListener().onError('There was an error pre-loading choice set choices');
                } else {
                    this._sendPresentOperation(choiceSet, keyboardListener, mode);
                }
            });*/
    }

    /**
     * Checks the validity of the choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @returns {Boolean} - Whether the choice set is valid
     */
    _setUpChoiceSet (choiceSet) {
        const choices = choiceSet.getChoices();
        // Choices are not optional here
        if (!Array.isArray(choices) || choices.length === 0) {
            console.error('ChoiceSetManager: Cannot initiate a choice set with no choices');
            return false;
        }

        if (choiceSet.getTimeout() !== null) {
            if (choiceSet.getTimeout() < 5 || choiceSet.getTimeout() > 100) {
                console.warn(`ChoiceSetManager: Attempted to create a choice set with a ${choiceSet.getTimeout()} second timeout; Only 5 - 100 seconds is valid`);
                return false;
            }
        }

        const uniqueChoiceCells = [];
        const uniqueVoiceCommands = {};
        let choiceCellWithVoiceCommandCount = 0;
        let allVoiceCommandsCount = 0;

        for (let index = 0; index < choices.length; index++) {
            const choiceVoiceCommands = choices[index].getVoiceCommands();
            if (uniqueChoiceCells.findIndex(choice => choice.equals(choices[index])) === -1) {
                uniqueChoiceCells.push(choices[index]);
            }
            if (choiceVoiceCommands !== null) {
                choiceCellWithVoiceCommandCount++;
                allVoiceCommandsCount += choiceVoiceCommands.length;

                for (let voiceIndex = 0; voiceIndex < choiceVoiceCommands.length; voiceIndex++) {
                    const vcText = choiceVoiceCommands[voiceIndex];
                    uniqueVoiceCommands[vcText] = true;
                }
            }
        }

        if (uniqueChoiceCells.length !== choices.length) {
            console.error('Attempted to create a choice set with a duplicate cell. Cell must have a unique value other than its primary text. The choice set will not be set.');
            return false;
        }

        // All or none of the choices MUST have VR Commands
        if (choiceCellWithVoiceCommandCount > 0 && choiceCellWithVoiceCommandCount < choices.length) {
            console.error(`ChoiceSetManager: If using voice recognition commands, all of the choice set cells must have unique VR commands. There are ${Object.keys(uniqueVoiceCommands).length} cells with unique voice commands and ${choices.length} total cells. The choice set will not be set.`);
            return false;
        }

        // All VR Commands MUST be unique
        if (Object.keys(uniqueVoiceCommands).length < allVoiceCommandsCount) {
            console.error(`ChoiceSetManager: If using voice recognition commands, all VR commands must be unique. There are ${Object.keys(uniqueVoiceCommands).length} unique VR commands and ${allVoiceCommandsCount} VR commands. The choice set will not be set.`);
            return false;
        }
        return true;
    }

    /**
     * Invokes the _PresentChoiceSetOperation
     * @param {ChoiceSet} choiceSet - The ChoiceSet to be presented
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     * @param {InteractionMode} mode - The intended interaction mode
     */
    _sendPresentOperation (choiceSet, keyboardListener, mode = null) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return;
        }
        const choicesToUpload = this._getChoicesToBeUploadedWithArray(choiceSet.getChoices());
        this._removeChoicesFromChoices(this._preloadedChoices, choicesToUpload);
        this._removeChoicesFromChoices(this._pendingPreloadChoices, choicesToUpload);
        if (choicesToUpload.length === 0) {
            return;
        }
        this._updateIdsOnChoices(choicesToUpload);
        // Add the preload cells to the pending preload choices
        this._pendingPreloadChoices = this._pendingPreloadChoices.concat(choicesToUpload);
        if (this._fileManager === null) {
            console.error('ChoiceSetManager: File Manager was null in preload choice operation');
            return;
        }

        if (mode === null) {
            mode = InteractionMode.MANUAL_ONLY;
        }

        // this._findIdsOnChoices(choiceSet.getChoices());
        // Pass back the information to the developer

        const listener = new ChoiceSetSelectionListener()
            .setOnChoiceSelected((choiceCell, triggerSource, rowIndex) => {
                if (choiceSet !== null && choiceSet.getChoiceSetSelectionListener() !== null) {
                    choiceSet.getChoiceSetSelectionListener().onChoiceSelected(choiceCell, triggerSource, rowIndex);
                }
            })
            .setOnError(error => {
                if (choiceSet !== null && choiceSet.getChoiceSetSelectionListener() !== null) {
                    choiceSet.getChoiceSetSelectionListener().onError(error);
                }
            });

        let presentOperation = null;

        if (keyboardListener === null) {
            // Non-searchable choice set
            presentOperation = new _PreloadAndPresentChoicesOperation(this._lifecycleManager, this._fileManager, this._displayName,
                this._defaultMainWindowCapability, this._isVrOptional, choicesToUpload,
                this._preloadedChoices, true, (loadedCells, allSucceeded) => {
                    if (!allSucceeded) {
                        console.error('ChoiceSetManager: There was an error preloading choice cells');
                        return;
                    }
                    this._preloadedChoices = this._preloadedChoices.concat(choicesToUpload);
                    this._removeChoicesFromChoices(choicesToUpload, this._pendingPreloadChoices);
                }, choiceSet, mode,
                null, null,
                listener, this._getNextCancelId());
            // presentOperation = new _PresentChoiceSetOperation(this._lifecycleManager, choiceSet, mode, null, null, listener, this._getNextCancelId());
        } else {
            // Searchable choice set
            // presentOperation = new _PresentChoiceSetOperation(this._lifecycleManager, choiceSet, mode, this._keyboardConfiguration, keyboardListener, this._preloadedChoices, listener, this._getNextCancelId());
        }

        this._addTask(presentOperation);

        this._pendingPresentOperation = presentOperation;
    }

    /**
     * Invokes the _PresentKeyboardOperation. Presents a keyboard on the Head unit to capture user input
     * @param {String} initialText - The initial text that is used as a placeholder text. It might not work on some head units.
     * @param {KeyboardProperties} customKeyboardConfig - the custom keyboard configuration to be used when the keyboard is displayed
     * @param {KeyboardListener} listener - A keyboard listener to capture user input
     * @returns {Number|null} - A unique id that can be used to cancel this keyboard. If `null`, no keyboard was created.
     */
    presentKeyboard (initialText = null, customKeyboardConfig = null, listener = null) {
        if (initialText === null || initialText.length === 0) {
            console.error('ChoiceSetManager: initialText cannot be an empty string.');
            return null;
        }

        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return null;
        }

        /* if (this._pendingPresentationSet !== null && this._pendingPresentOperation !== null) {
            this._pendingPresentOperation.switchStates(_Task.CANCELED);
            this._pendingPresentationSet = null;
            console.warn('ChoiceSetManager: There is a current or pending choice set, cancelling and continuing.');
        }*/

        customKeyboardConfig = this._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(customKeyboardConfig);

        if (customKeyboardConfig === null) {
            customKeyboardConfig = this._keyboardConfiguration !== null ? this._keyboardConfiguration : this._defaultKeyboardConfiguration();
        }

        // Present a keyboard with the choice set that we used to test VR's optional state
        const keyboardCancelId = this._getNextCancelId();
        const keyboardOperation = new _PresentKeyboardOperation(this._lifecycleManager, this._keyboardConfiguration, initialText, customKeyboardConfig, listener, keyboardCancelId);
        this._currentlyPresentedKeyboardOperation = keyboardOperation;
        this._addTask(keyboardOperation);
        this._pendingPresentOperation = keyboardOperation;
        return keyboardCancelId;
    }

    /**
     * Cancels the keyboard-only interface if it is currently showing. If the keyboard has not yet been sent to Core, it will not be sent.
     * This will only dismiss an already presented keyboard if connected to head units running SDL 6.0+.
     * @param {Number} cancelId - The unique ID assigned to the keyboard, passed as the return value from presentKeyboard
     */
    dismissKeyboard (cancelId) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return;
        }

        // First, attempt to cancel the currently executing keyboard operation (Once an operation has started it is removed from the operationQueue)
        if (this._currentlyPresentedKeyboardOperation !== null && this._currentlyPresentedKeyboardOperation.getCancelId() === cancelId) {
            this._currentlyPresentedKeyboardOperation._dismissKeyboard();
            return;
        }

        // Next, attempt to cancel keyboard operations that have not yet started
        this._getTasks().forEach(task => {
            if (task instanceof _PresentKeyboardOperation && task.getCancelId() === cancelId) {
                task._dismissKeyboard();
            }
        });
    }

    /**
     * Set a custom keyboard configuration for this session. If set to null, it will reset to default keyboard configuration.
     * @param {KeyboardProperties} keyboardConfiguration - The custom keyboard configuration to be used when the keyboard is displayed
     */
    setKeyboardConfiguration (keyboardConfiguration = null) {
        const properties = this._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(keyboardConfiguration);
        if (properties === null) {
            this._keyboardConfiguration = this._defaultKeyboardConfiguration();
        } else {
            this._keyboardConfiguration = properties;
        }
    }

    /**
     * Takes a keyboard configuration and creates a valid version of it, if possible, based on keyboardCapabilities
     * @param {KeyboardProperties} keyboardConfiguration - The custom keyboard configuration to be used when the keyboard is displayed
     * @returns {KeyboardProperties|null} Returns KeyboardProperties or null if the keyboard layout is not supported
     */
    _createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration (keyboardConfiguration = null) {
        /**
         * @type {KeyboardCapabilities}
         */
        const keyboardCapabilities = (this._defaultMainWindowCapability && this._defaultMainWindowCapability.getKeyboardCapabilities()) || null;

        // If there are no keyboard capabilities, if there is no passed keyboard configuration, or if there is no layout to the passed keyboard configuration, just pass back the passed in configuration
        if (keyboardCapabilities === null || keyboardConfiguration === null || keyboardConfiguration.getKeyboardLayout() === null) {
            return keyboardConfiguration;
        }

        /**
         * @type {KeyboardLayoutCapability}
         */
        let selectedLayoutCapability = null;

        for (const layoutCapability of keyboardCapabilities.getSupportedKeyboards()) {
            if (layoutCapability.getKeyboardLayout() === keyboardConfiguration.getKeyboardLayout()) {
                selectedLayoutCapability = layoutCapability;
                break;
            }
        }

        if (selectedLayoutCapability === null) {
            console.error(`Configured keyboard layout is not supported: ${keyboardConfiguration.getKeyboardLayout()}`);
            return null;
        }

        const modifiedKeyboardConfiguration = new KeyboardProperties(keyboardConfiguration.getParameters());

        const customKeys = keyboardConfiguration.getCustomKeys();
        if (!customKeys || !Array.isArray(customKeys) || customKeys.length === 0) {
            modifiedKeyboardConfiguration.setCustomKeys(null);
        } else {
            // If there are more custom keys than are allowed for the selected keyboard layout, we need to trim the number of keys to only use the first n number of custom keys, where n is the number of allowed custom keys for that layout.
            const numConfigurableKeys = selectedLayoutCapability.getNumConfigurableKeys();
            if (customKeys.length > numConfigurableKeys) {
                modifiedKeyboardConfiguration.setCustomKeys(customKeys.slice(0, numConfigurableKeys));
                console.warn(`${customKeys.length} custom keys set, but the selected layout: ${keyboardConfiguration.getKeyboardLayout()} only supports ${numConfigurableKeys}. Dropping the rest.`);
            }
        }

        // If the keyboard does not support masking input characters, we will remove it from the keyboard configuration
        if (!keyboardCapabilities.getMaskInputCharactersSupported()) {
            modifiedKeyboardConfiguration.setMaskInputCharacters(null);
            console.warn('Mask input characters is not supported');
        }

        return modifiedKeyboardConfiguration;
    }

    /**
     * Finds non-unique choice cells and updates their unique text accordingly
     * @param {ChoiceCell[]} strippedCells - Choice cells with their unsupported properties removed
     * @param {ChoiceCell[]} unstrippedCells - The original choice cells
     */
    _addUniqueNamesBasedOnStrippedCells (strippedCells, unstrippedCells) {
        if (!Array.isArray(strippedCells) || !Array.isArray(unstrippedCells) || strippedCells.length !== unstrippedCells.length) {
            return;
        }
        // array of unique choice cells
        const cells = [];
        // array of the count of how many times each cell has been found
        const cellsCounter = [];
        strippedCells.forEach((strippedCell, index) => {
            // find if a previous cell was a duplicate and update unique text of the current cell if so
            const duplicateIndex = cells.map(cell => cell.equals(strippedCell)).indexOf(true);
            if (duplicateIndex >= 0) {
                cellsCounter[duplicateIndex]++;
                unstrippedCells[index]._setUniqueText(`${unstrippedCells[index].getText()} (${cellsCounter[duplicateIndex]})`);
            } else {
                cells.push(strippedCell);
                cellsCounter.push(1);
            }
        });
    }


    /**
     * Return an array of choice cells that have been preloaded to the head unit
     * @returns {ChoiceCell[]} - The choices
     */
    getPreloadedChoices () {
        return this._preloadedChoices;
    }

    // HELPER METHODS

    /**
     * Finds the passed in choice cell ids by looking at pending and preloaded choice cells
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects
     */
    _findIdsOnChoices (choices = []) {
        choices.forEach(choice => {
            let uploadChoice = null;
            // search in _pendingPreloadChoices and _preloadedChoices
            const allChoicesToCheck = this._pendingPreloadChoices.concat(this._preloadedChoices);
            for (let index = 0; index < allChoicesToCheck.length; index++) {
                const setChoice = allChoicesToCheck[index];
                if (setChoice.equals(choice)) {
                    uploadChoice = setChoice;
                    break;
                }
            }
            if (uploadChoice !== null) {
                choice._setChoiceId(uploadChoice._getChoiceId());
            }
        });
    }

    /**
     * Assigns unique ids to the choices
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects
     */
    _updateIdsOnChoices (choices = []) {
        choices.forEach(choice => {
            choice._setChoiceId(this._nextChoiceId);
            this._nextChoiceId++;
        });
    }

    /**
     * Returns choices in both lists
     * @param {ChoiceCell[]} choicesA - The first list of choices
     * @param {ChoiceCell[]} choicesB - The second list of choices
     * @returns {ChoiceCell[]} - The choice found in both choicesA and choicesB
     */
    _keepChoicesInBoth (choicesA, choicesB) {
        const bothChoices = [];
        choicesA.forEach(choice => {
            for (let index = 0; index < choicesB.length; index++) {
                if (choice.equals(choicesB[index])) {
                    bothChoices.push(choice);
                }
            }
        });
        return bothChoices;
    }


    /**
     * Remove the choices that match the ones in currentChoices
     * @param {ChoiceCell[]} choicesToRemove - The choices to remove
     * @param {ChoiceCell[]} currentChoices - The choices to reference
     */
    _removeChoicesFromChoices (choicesToRemove, currentChoices) {
        choicesToRemove.forEach(choice => {
            for (let index = 0; index < currentChoices.length; index++) {
                if (choice.equals(currentChoices[index])) {
                    currentChoices.splice(index, 1);
                }
            }
        });
    }

    /**
     * Default keyboard properties object
     * @returns {KeyboardProperties} - A KeyboardProperties RPC
     */
    _defaultKeyboardConfiguration () {
        return new KeyboardProperties()
            .setLanguage(Language.EN_US)
            .setKeyboardLayout(KeyboardLayout.QWERTY)
            .setKeypressMode(KeypressMode.RESEND_CURRENT_ENTRY);
    }

    /**
     * Clones a list of choice cells
     * @param {ChoiceCell[]} originalList - A list of choice cells to be cloned
     * @returns {ChoiceCell[]|null} - The cloned cell list
     */
    _cloneChoiceCellList (originalList) {
        if (!Array.isArray(originalList)) {
            return null;
        }
        return originalList.map((choiceCell) => choiceCell.clone());
    }

    /**
     * Modifies the choices names depending on SDL version
     * @param {ChoiceCell[]} choices - The first list of choices
     * @returns {ChoiceCell[]} - A deep copy of the name modified choices
     */
    _getChoicesToBeUploadedWithArray (choices) {
        const choicesClone = this._cloneChoiceCellList(choices);
        // If we're running on a connection < RPC 7.1, we need to de-duplicate cells because presenting them will fail if we have the same cell primary text.
        if (choices !== null && this._lifecycleManager.getSdlMsgVersion() !== null
                && (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() < 7
                || (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() === 7 && this._lifecycleManager.getSdlMsgVersion().getMinorVersion() === 0))) {
            // version if 7.0.0 or lower
            this._addUniqueNamesToCells(choicesClone);
        } else {
            const strippedCellsClone = this._removeUnusedProperties(choicesClone);
            this._addUniqueNamesBasedOnStrippedCells(strippedCellsClone, choicesClone);
        }

        return choicesClone.filter((clonedChoice) => {
            // returns false if the cloned choice appears in the list of preloaded choices
            return !this._preloadedChoices.map((preloadedChoice) => {
                // the unique text is important for this comparison but it isn't checked by .equals()
                return clonedChoice.equals(preloadedChoice) && (clonedChoice._getUniqueText() === preloadedChoice._getUniqueText());
            }).includes(true);
        });
    }

    /**
     * Remove properties from ChoiceCells if they are not supported on the head unit
     * @param {ChoiceCell[]} choiceCells - The array of ChoiceCells to have its unused properties removed
     * @returns {ChoiceCell[]} - An array of ChoiceCells that has had its unsupported properties removed
     */
    _removeUnusedProperties (choiceCells) {
        const strippedCellsClone = this._cloneChoiceCellList(choiceCells);
        for (const cell of strippedCellsClone) {
            // Strip cell parameters that are not supported on head unit to support uniqueness.
            cell.setVoiceCommands(null);

            if (!this._hasTextFieldOfName(TextFieldName.secondaryText)) {
                cell.setSecondaryText(null);
            }
            if (!this._hasTextFieldOfName(TextFieldName.tertiaryText)) {
                cell.setTertiaryText(null);
            }
            if (!this._hasImageFieldOfName(ImageFieldName.choiceImage)) {
                cell.setArtwork(null);
            }
            if (!this._hasImageFieldOfName(ImageFieldName.choiceSecondaryImage)) {
                cell.setSecondaryArtwork(null);
            }
        }
        return strippedCellsClone;
    }

    /**
     * Check to see if WindowCapability has an ImageFieldName of a given name.
     * @private
     * @param {ImageFieldName} imageFieldName - Representing a name of a given Image field that would be stored in WindowCapability
     * @returns {Boolean} - True if the name exists in WindowCapability, otherwise false
     */
    _hasImageFieldOfName (imageFieldName) {
        return this._defaultMainWindowCapability === null || _ManagerUtility.hasImageFieldOfName(this._defaultMainWindowCapability, imageFieldName);
    }

    /**
     * Check to see if WindowCapability has a textField of a given name.
     * @private
     * @param {TextFieldName} textFieldName - Representing a name of a given text field that would be stored in WindowCapability
     * @returns {Boolean} - True if the name exists in WindowCapability, otherwise false
     */
    _hasTextFieldOfName (textFieldName) {
        return this._defaultMainWindowCapability === null || _ManagerUtility.hasTextFieldOfName(this._defaultMainWindowCapability, textFieldName);
    }

    /**
     * Listen for DISPLAYS capability updates
     * @private
     */
    _addListeners () {
        this._onDisplayCapabilityListener = (capabilities) => {
            if (!Array.isArray(capabilities) || capabilities.length === 0) {
                return;
            }
            const displayCapability = capabilities[0];
            this._displayName = displayCapability.getDisplayName();

            for (const windowCapability of displayCapability.getWindowCapabilities()) {
                let currentWindowId;
                if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                    currentWindowId = windowCapability.getWindowID();
                } else {
                    currentWindowId = PredefinedWindows.DEFAULT_WINDOW;
                }
                if (currentWindowId === PredefinedWindows.DEFAULT_WINDOW) {
                    // Check if the window capability is equal to the one we already have. If it is, abort.
                    if (this._defaultMainWindowCapability !== null && this._defaultMainWindowCapability !== undefined && this._defaultMainWindowCapability.getParameters() === windowCapability.getParameters()) {
                        return;
                    }
                    this._defaultMainWindowCapability = windowCapability;
                }
            }
        };

        this._lifecycleManager.addOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
    }

    /**
     * Gets the next available Choice Cell cancel ID
     * @private
     * @returns {Number} - the cancel ID
     */
    _getNextCancelId () {
        if (this._nextCancelId >= _ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MAX) {
            this._nextCancelId = _ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MIN;
        } else {
            this._nextCancelId++;
        }
        return this._nextCancelId;
    }

    /**
     * Updates pending tasks with the list of the currently preloaded Choices
     * @private
     */
    _updatePendingTasksWithCurrentPreloads () {
        for (const task of this._getTasks()) {
            if (task.getState() === _Task.IN_PROGRESS || task.getState() === _Task.CANCELED) {
                continue;
            }
            task._loadedCells = this._preloadedChoices;
        }
    }
}

_ChoiceSetManagerBase.CHECKING_VOICE = 0xA0;
_ChoiceSetManagerBase.CHOICE_CELL_ID_MIN = 1;
_ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MIN = 101;
_ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MAX = 200;

export { _ChoiceSetManagerBase };
