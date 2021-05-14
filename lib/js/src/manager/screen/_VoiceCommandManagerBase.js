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
     * @returns {Promise} - A promise which resolves after old commands are deleted and new ones are added
     */
    async setVoiceCommands (voiceCommands) {
        // we actually need voice commands to set. checks if the array of voice commands passed in contains the same content as the current voice commands
        if (!Array.isArray(voiceCommands) || !voiceCommands.map((vc, index) => vc.equals(this._voiceCommands[index])).includes(false)) {
            console.log('Voice commands list non-existent or matches the current voice commands');
            return;
        }

        if (!this._arePendingVoiceCommandsUnique(voiceCommands)) {
            console.log('Not all voice command strings are unique across all voice commands. Voice commands will not be set.');
            return;
        }

        this._updateIdsOnVoiceCommands(voiceCommands);
        this._voiceCommands = voiceCommands;

        // add the commands to a queue to be processed later
        // clear all tasks
        this._cancelAllTasks();

        this._updateOperation = new _VoiceCommandUpdateOperation(this._lifecycleManager, this._currentVoiceCommands, voiceCommands, (newVoiceCommands, errorArray) => {
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
     * Gets all the voice commands currently set
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
        let voiceCommandCount = 0;
        const voiceCommandsSet = new Set();
        voiceCommands.forEach((voiceCommand) => {
            console.log(voiceCommand);
            voiceCommand.getVoiceCommands().forEach(item => voiceCommandsSet.add(item));
            voiceCommandCount += voiceCommand.getVoiceCommands().length;
        });

        return (voiceCommandsSet.size === voiceCommandCount);
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
            task._oldVoiceCommands = voiceCommands;
        });
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
            for (const command of this._voiceCommands) {
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
