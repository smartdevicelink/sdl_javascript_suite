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
import { _Task } from '../_Task.js';
import { _VoiceCommandUpdateOperation } from './utils/_VoiceCommandUpdateOperation.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';

class _VoiceCommandManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _VoiceCommandManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance.
     */
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this._voiceCommands = [];
        this._currentVoiceCommands = [];
        this._originalVoiceCommands = [];
        this._voiceCommandIdMin = 1900000000;
        this._lastVoiceCommandId = this._voiceCommandIdMin;
        this._commandListener = null;
        this._updateOperation = null;
        this._handleTaskQueue();
        this._addListeners();
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
     * Disposes of the manager.
     */
    dispose () {
        this._voiceCommands.splice(0, this._voiceCommands.length);
        this._lastVoiceCommandId = this._voiceCommandIdMin;
        // remove listeners
        this._lifecycleManager.removeRpcListener(FunctionID.OnCommand, this._commandListener);
        this._commandListener = null;

        super.dispose();
    }

    /**
     * Stores the voice commands to send later. Will get overwritten by additional invocations of this method
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommand instances.
     * @returns {Promise} - A promise which resolves after the task to remove old commands and add new ones is added to the task queue.
     */
    async setVoiceCommands (voiceCommands) {
        // we actually need voice commands to set. checks if the array of voice commands passed in contains the same content as the current voice commands
        if (!Array.isArray(voiceCommands)) {
            console.log('Voice commands list non-existent');
            return;
        }

        this._voiceCommands = voiceCommands.map((vc) => vc.clone());

        const validatedVoiceCommands = this._removeEmptyVoiceCommands(this._voiceCommands);
        if (voiceCommands.length > 0 && validatedVoiceCommands.length === 0) {
            console.log('New voice commands are invalid, skipping...');
            this._voiceCommands = null;
            return;
        }

        // check uniqueness before updating the IDs since changing the IDs would make them all unique
        if (!this._arePendingVoiceCommandsUnique(validatedVoiceCommands)) {
            console.log('Not all voice command strings are unique across all voice commands. Voice commands will not be set.');
            this._voiceCommands = null;
            return;
        }

        this._voiceCommands = validatedVoiceCommands;

        this._updateIdsOnVoiceCommands(this._voiceCommands);

        // add the commands to a queue to be processed later
        // clear all tasks
        this._cancelAllTasks();

        this._updateOperation = new _VoiceCommandUpdateOperation(this._lifecycleManager, this._currentVoiceCommands, this._voiceCommands, (newVoiceCommands, errorArray) => {
            if (errorArray.length !== 0) {
                console.log('Failed updated voice commands for the following:');
                console.log(JSON.stringify(errorArray, null, 4)); // print like this so that the inner _parameters object shows
            }
            this._currentVoiceCommands = newVoiceCommands;
            // any additional operations that may have come in after the completion of this one need the updated voice commands now
            this._updatePendingOperations(newVoiceCommands);
            this._updateOperation = null;
        });
        this._addTask(this._updateOperation);
    }

    /**
     * Processes incoming voice commands to set command IDs
     * @private
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommand instances.
     */
    _updateIdsOnVoiceCommands (voiceCommands) {
        for (const voiceCommand of voiceCommands) {
            this._lastVoiceCommandId++;
            voiceCommand._setCommandId(this._lastVoiceCommandId);
        }
    }

    /**
     * Gets all the voice commands set as part of the last initiated update operation
     * @returns {VoiceCommand[]} - An array of VoiceCommand instances.
     */
    getVoiceCommands () {
        return this._voiceCommands;
    }

    /**
     * Determines if all provided voice commands are unique
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommand instances.
     * @returns {Boolean} - indicate whether all voice commands are unique
     */
    _arePendingVoiceCommandsUnique (voiceCommands) {
        const allVoiceCommands = voiceCommands.reduce((array, voiceCommand) => array.concat(voiceCommand.getVoiceCommands()), []);
        return new Set(allVoiceCommands).size === allVoiceCommands.length;
    }

    /**
     * Updates all non-running operations with this operation's updated voice commands
     * @private
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommands.
     */
    _updatePendingOperations (voiceCommands) {
        this._taskQueue.forEach(task => {
            if (task.getState() === _Task.IN_PROGRESS) {
                return;
            }
            task._setOldVoiceCommands(voiceCommands);
        });
    }

    /**
     * Remove all voice command strings consisting of just whitespace characters as the module will reject any "empty" strings.
     * @param {VoiceCommands[]} voiceCommands - An array of VoiceCommands.
     * @returns {VoiceCommands[]} - An array of VoiceCommands with empty VoiceCommands removed.
     */
    _removeEmptyVoiceCommands (voiceCommands) {
        const validatedVoiceCommands = voiceCommands.map((voiceCommand) => {
            const voiceCommandStrings = voiceCommand.getVoiceCommands().filter((voiceCommandString) => {
                // filter out any whitespace characters
                const validString = voiceCommandString !== null && voiceCommandString !== undefined && voiceCommandString.replace(/\s/g, '').length > 0;
                if (!validString) {
                    console.warn('Empty or whitespace only voice command string: ', voiceCommandString, ', removed from voice command: ', voiceCommand);
                }
                return validString;
            });
            // Updates voice command strings array by only adding ones that are not empty(e.g. ', ' ', ...)
            if (voiceCommandStrings.length > 0) {
                return voiceCommand.setVoiceCommands(voiceCommandStrings);
            }
        }).filter((voiceCommand) => {
            if (voiceCommand === undefined) {
                console.warn('A voice command with no valid strings was removed.');
            }
            return voiceCommand !== undefined;
        });
        return validatedVoiceCommands;
    }

    /**
     * Listen for OnHMIStatus updates and OnCommands which indicate the user selected a voice command
     * @private
     */
    _addListeners () {
        // COMMANDS
        this._commandListener = (onCommand) => {
            // find and invoke the listener of the matching command
            const targetCommandId = onCommand.getCmdID();
            for (const command of this._currentVoiceCommands) {
                if (targetCommandId === command._getCommandId()) {
                    const listener = command.getVoiceCommandSelectionListener();
                    if (typeof listener === 'function') {
                        listener();
                        break;
                    }
                }
            }
        };

        this._lifecycleManager.addRpcListener(FunctionID.OnCommand, this._commandListener);
    }
}

export { _VoiceCommandManagerBase };
