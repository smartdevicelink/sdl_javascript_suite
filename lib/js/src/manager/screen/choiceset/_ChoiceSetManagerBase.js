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

// operations and listeners
import { _CheckChoiceVrOptionalInterface } from './_CheckChoiceVrOptionalInterface.js';
import { ChoiceSetSelectionListener } from './ChoiceSetSelectionListener.js';
import { _CheckChoiceVrOptionalOperation } from './_CheckChoiceVrOptionalOperation.js';
import { _DeleteChoicesOperation } from './_DeleteChoicesOperation.js';
import { _PresentKeyboardOperation } from './_PresentKeyboardOperation.js';
import { _PreloadPresentChoicesOperation } from './_PreloadPresentChoicesOperation.js';

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
     * @returns {Promise} - A promise that resolves to a Boolean of whether the operation is added successfully
     */
    preloadChoices (choices = []) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.warn('ChoiceSetManager: Choice Manager In Error State');
            return Promise.resolve(false);
        }
        if (choices.length === 0) {
            return Promise.resolve(true);
        }
        // Add the preload cells to the pending preload choices
        if (this._fileManager === null) {
            console.error('ChoiceSetManager: File Manager was null in preload choice operation');
            return Promise.resolve(false);
        }

        return new Promise(resolve => {
            const preloadChoicesOperation = new _PreloadPresentChoicesOperation(this._lifecycleManager, this._fileManager, this._displayName,
                this._defaultMainWindowCapability, this._isVrOptional, choices,
                this._preloadedChoices, null, null, null, null, null, null, (loadedCells, success) => {
                    if (!success) {
                        console.error('ChoiceSetManager: There was an error preloading choice cells');
                        return resolve(false);
                    }
                    this._preloadedChoices = loadedCells;
                    this._updatePendingTasksWithCurrentPreloads();
                    resolve(true);
                });
            this._addTask(preloadChoicesOperation);
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

        return new Promise(resolve => {
            const deleteChoicesOperation = new _DeleteChoicesOperation(this._lifecycleManager, choices, this._preloadedChoices, (updatedLoadedCells, success) => {
                if (!success) {
                    console.error('ChoiceSetManager: Failed to delete choices');
                    return resolve(false);
                }
                this._preloadedChoices = updatedLoadedCells;
                this._updatePendingTasksWithCurrentPreloads();
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

        this._sendPresentOperation(choiceSet, keyboardListener, mode);
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
            const foundIndex = uniqueChoiceCells.findIndex(choice => choice.equals(choices[index]));
            if (foundIndex === -1 || uniqueChoiceCells[foundIndex]._getUniqueText() !== choices[index]._getUniqueText()) {
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
        // Add the preload cells to the pending preload choices
        if (this._fileManager === null) {
            console.error('ChoiceSetManager: File Manager was null in preload choice operation');
            return;
        }

        if (mode === null) {
            mode = InteractionMode.MANUAL_ONLY;
        }

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
            presentOperation = new _PreloadPresentChoicesOperation(this._lifecycleManager, this._fileManager, this._displayName,
                this._defaultMainWindowCapability, this._isVrOptional, choiceSet.getChoices(),
                this._preloadedChoices, choiceSet, mode,
                null, null,
                listener, this._getNextCancelId(), (loadedCells, allSucceeded) => {
                    if (!allSucceeded) {
                        console.error('ChoiceSetManager: There was an error preloading choice cells');
                        return;
                    }
                    this._preloadedChoices = loadedCells;
                    this._updatePendingTasksWithCurrentPreloads();
                });
        } else {
            // Searchable choice set
            presentOperation = new _PreloadPresentChoicesOperation(this._lifecycleManager, this._fileManager, this._displayName,
                this._defaultMainWindowCapability, this._isVrOptional, choiceSet.getChoices(),
                this._preloadedChoices, choiceSet, mode,
                this._keyboardConfiguration, keyboardListener,
                listener, this._getNextCancelId(), (loadedCells, allSucceeded) => {
                    if (!allSucceeded) {
                        console.error('ChoiceSetManager: There was an error preloading choice cells');
                        return;
                    }
                    this._preloadedChoices = loadedCells;
                    this._updatePendingTasksWithCurrentPreloads();
                });
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
     * Return an array of choice cells that have been preloaded to the head unit
     * @returns {ChoiceCell[]} - The choices
     */
    getPreloadedChoices () {
        return this._preloadedChoices;
    }

    // HELPER METHODS

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
            if (task instanceof _PreloadPresentChoicesOperation || task instanceof _DeleteChoicesOperation) {
                task.setLoadedCells(this._preloadedChoices);
            }
        }
    }
}

_ChoiceSetManagerBase.CHECKING_VOICE = 0xA0;
_ChoiceSetManagerBase.CHOICE_CELL_ID_MIN = 1;
_ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MIN = 101;
_ChoiceSetManagerBase.CHOICE_CELL_CANCEL_ID_MAX = 200;

export { _ChoiceSetManagerBase };
