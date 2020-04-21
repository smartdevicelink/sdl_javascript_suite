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

import { SubManagerBase } from '../SubManagerBase.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { DeleteCommand } from '../../rpc/messages/DeleteCommand.js';
import { AddCommand } from '../../rpc/messages/AddCommand.js';

class VoiceCommandManagerBase extends SubManagerBase {
    /**
     * Initializes an instance of VoiceCommandManagerBase.
     * @class
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance.
     */
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this._voiceCommands = [];
        this._voiceCommandIdMin = 1900000000;
        this._lastVoiceCommandId = this._voiceCommandIdMin;
        this._commandListener = null;
        this._handleTaskQueue();
        this._addListeners();
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(SubManagerBase.READY);
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
        // we actually need voice commands to set.
        if (!Array.isArray(voiceCommands)) {
            return;
        }
        // add the commands to a queue to be processed later
        this._addTask(this._update(voiceCommands));
    }

    /**
     * Processes incoming voice commands
     * @private
     * @returns {function} - An async function that returns after old commands are deleted and new ones are added
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommand instances.
     */
    _update (voiceCommands) {
        return async (taskQueue) => {
            // only run the LAST task in the queue. remove all other tasks except the last one and return
            if (taskQueue.length > 0) {
                taskQueue.splice(0, taskQueue.length - 1);
                return;
            }

            this._lastVoiceCommandId = this._voiceCommandIdMin;
            for (const voiceCommand of voiceCommands) {
                this._lastVoiceCommandId++;
                voiceCommand.setCommandId(this._lastVoiceCommandId);
            }

            await this._sendDeleteVoiceCommands(this._voiceCommands);
            // old voice commands are now deleted
            // now add the new ones
            await this._sendAddVoiceCommands(voiceCommands);
            this._voiceCommands = voiceCommands;
        };
    }

    /**
     * Gets all the voice commands currently set
     * @returns {VoiceCommand[]} - An array of VoiceCommand instances.
     */
    getVoiceCommands () {
        return this._voiceCommands;
    }

    /**
     * Sends requests to delete all voice commands passed in
     * @private
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommand instances.
     * @returns {Promise} - A promise.
     */
    async _sendDeleteVoiceCommands (voiceCommands) {
        if (!Array.isArray(voiceCommands) || voiceCommands.length === 0) {
            return;
        }

        // make a DeleteCommand request for every voice command
        const deleteCommandPromises = voiceCommands.map(voiceCommand => {
            const deleteCommand = new DeleteCommand()
                .setCmdID(voiceCommand.getCommandId());
            return this._lifecycleManager.sendRpcMessage(deleteCommand);
        });

        return Promise.all(deleteCommandPromises);
    }

    /**
     * Sends requests to add all voice commands passed in
     * @private
     * @param {VoiceCommand[]} voiceCommands - An array of VoiceCommand instances.
     * @returns {Promise} - A promise.
     */
    async _sendAddVoiceCommands (voiceCommands) {
        if (!Array.isArray(voiceCommands) || voiceCommands.length === 0) {
            return;
        }

        // make an AddCommand request for every voice command
        const addCommandPromises = voiceCommands.map(voiceCommand => {
            const addCommand = new AddCommand()
                .setCmdID(voiceCommand.getCommandId())
                .setVrCommands(voiceCommand.getVoiceCommands());
            return this._lifecycleManager.sendRpcMessage(addCommand);
        });

        return Promise.all(addCommandPromises);
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
                if (targetCommandId === command.getCommandId()) {
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

export { VoiceCommandManagerBase };
