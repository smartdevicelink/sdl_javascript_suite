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

import { _Task } from '../../_Task';
import { DeleteCommand } from '../../../rpc/messages/DeleteCommand.js';
import { AddCommand } from '../../../rpc/messages/AddCommand.js';

class _VoiceCommandUpdateOperation extends _Task {
    /**
     * Initializes an instance of _VoiceCommandUpdateOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {VoiceCommand[]} oldVoiceCommands - A list of voice command objects
     * @param {VoiceCommand[]} pendingVoiceCommands - A list of voice command objects
     * @param {function} voiceCommandListener - A callback function for operation updates. Receives updated voice commands and errors
     */
    constructor (lifecycleManager, oldVoiceCommands = null, pendingVoiceCommands = null, voiceCommandListener = null) {
        super('VoiceCommandReplaceOperation');
        this._lifecycleManager = lifecycleManager;
        this._oldVoiceCommands = oldVoiceCommands;
        this._pendingVoiceCommands = pendingVoiceCommands;
        this._currentVoiceCommands = [];
        if (this._oldVoiceCommands !== null) {
            this._currentVoiceCommands = Array.from(this._oldVoiceCommands); // shallow copy
        }
        this._voiceCommandListener = voiceCommandListener;
        this._errorArray = []; // an array of objects containing RPC Requests and their response String errors. JS doesn't support objects as keys
        // the format is { request: <RPCRequest>, error: <String> }
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - This promise does not resolve to any value
     */
    async onExecute (task) {
        if (this.getState() === _Task.CANCELED) {
            this.onFinished();
            return;
        }

        if (Array.isArray(this._pendingVoiceCommands) && this._pendingVoiceCommands.length > 0) {
            for (const voiceCommand of this._pendingVoiceCommands) {
                this._currentVoiceCommands.forEach((vc) => {
                    if (vc.equals(voiceCommand)) {
                        voiceCommand.setVoiceCommandSelectionListener(vc.getVoiceCommandSelectionListener());
                    }
                });
            }
        }

        await this._sendDeleteCurrentVoiceCommands();
        if (this.getState() === _Task.CANCELED) {
            this.onFinished();
            return;
        }
        // ignore the result from deletions. send new add commands
        await this._sendCurrentVoiceCommands();
        // all errors from both operations will be stored in this._errorArray
        if (typeof this._voiceCommandListener === 'function') {
            this._voiceCommandListener(this._currentVoiceCommands, this._errorArray);
        }
        this.onFinished();
    }

    /**
     * Sends requests to delete all old/current voice commands passed in
     * @private
     * @returns {Promise} - A promise which returns a Boolean of whether the operation is a success
     */
    async _sendDeleteCurrentVoiceCommands () {
        if (!Array.isArray(this._oldVoiceCommands) || this._oldVoiceCommands.length === 0) {
            return true;
        }

        const voiceCommandsToDelete = this._voiceCommandsNotInSecondArray(this._oldVoiceCommands, this._pendingVoiceCommands);
        if (voiceCommandsToDelete.length === 0) {
            return true; // nothing to delete
        }

        // make a DeleteCommand request for every voice command
        const deleteCommands = voiceCommandsToDelete.map(voiceCommand => {
            return new DeleteCommand().setCmdID(voiceCommand._getCommandId());
        });

        const deleteCommandPromises = deleteCommands.map(deleteCommand => {
            return this._lifecycleManager.sendRpcResolve(deleteCommand);
        });

        const responses = await Promise.all(deleteCommandPromises);
        // go through all responses and inspect their statuses
        responses.forEach((response, index) => {
            const deleteRequest = deleteCommands[index]; // order is preserved between arrays of requests and their responses

            if (!response.getSuccess()) {
                this._errorArray.push({
                    request: deleteRequest,
                    error: response.getInfo(),
                });
            } else { // deletion is a success. remove from _currentVoiceCommands
                this._removeCurrentVoiceCommandForCorrelatingDeleteCommand(deleteRequest);
            }
        });
        // finished with reading responses. check for errors and return whether there are any
        return this._errorArray.length === 0;
    }

    /**
     * Returns an array of VoiceCommands that are in the first array but not the second array
     * @param {VoiceCommmand[]} firstArray - an array of VoiceCommands
     * @param {VoiceCommand[]} secondArray - an array of VoiceCommands
     * @returns {VoiceCommand[]} - An array of VoiceCommands that are in the first array but not the second array
     */
    _voiceCommandsNotInSecondArray (firstArray, secondArray) {
        if (secondArray.length === 0) {
            return firstArray;
        }

        const differenceArray = [];

        firstArray.forEach((checkVC) => {
            if (!secondArray.map((secondVC) => checkVC.equals(secondVC)).includes(true)) {
                differenceArray.push(checkVC);
            }
        });

        return Array.from(differenceArray);
    }

    /**
     * Removes this delete command from the current voice commands array
     * @private
     * @param {DeleteCommand} deleteCommand - The command to remove
     */
    _removeCurrentVoiceCommandForCorrelatingDeleteCommand (deleteCommand) {
        for (let index = 0; index < this._currentVoiceCommands.length; index++) {
            const voiceCommand = this._currentVoiceCommands[index];
            if (deleteCommand.getCmdID() === voiceCommand._getCommandId()) {
                this._currentVoiceCommands.splice(index, 1); // remove this element and modify the index to account for the array manipulation
                index--;
            }
        }
    }

    /**
     * Sends requests to add all pending voice commands passed in
     * @private
     * @returns {Promise} - A promise which returns a Boolean of whether the operation is a success
     */
    async _sendCurrentVoiceCommands () {
        const voiceCommandsToAdd = this._voiceCommandsNotInSecondArray(this._pendingVoiceCommands, this._oldVoiceCommands);
        if (voiceCommandsToAdd.length === 0) {
            return true; // nothing to send
        }

        // filter the voice command list of any voice commands with duplicate items
        const addCommands = voiceCommandsToAdd.map(voiceCommand => {
            // make an AddCommand request for every voice command
            return new AddCommand()
                .setCmdID(voiceCommand._getCommandId())
                .setVrCommands(voiceCommand.getVoiceCommands());
        });

        const addCommandPromises = addCommands.map(addCommand => {
            return this._lifecycleManager.sendRpcResolve(addCommand);
        });


        const responses = await Promise.all(addCommandPromises);
        // go through all responses and inspect their statuses
        responses.forEach((response, index) => {
            const addRequest = addCommands[index]; // order is preserved between arrays of requests and their responses

            if (!response.getSuccess()) {
                this._errorArray.push({
                    request: addRequest,
                    error: response.getResultCode(), // getInfo() returns null for some of these errors
                });
            } else { // addition is a success. add to _currentVoiceCommands
                this._pendingVoiceCommandForCorrelatingAddCommand(addRequest);
            }
        });
        // finished with reading responses. check for errors and return whether there are any
        return this._errorArray.length === 0;
    }

    /**
     * Adds the AddCommand to the current voice commands array
     * @private
     * @param {AddCommand} addCommand - The command to add
     */
    _pendingVoiceCommandForCorrelatingAddCommand (addCommand) {
        for (let index = 0; index < this._pendingVoiceCommands.length; index++) {
            const voiceCommand = this._pendingVoiceCommands[index];
            if (addCommand.getCmdID() === voiceCommand._getCommandId()) {
                this._currentVoiceCommands.push(voiceCommand);
                return;
            }
        }
    }

    /**
     * Updates the voice commands in the task in case another operation has made updates
     * @param {VoiceCommand[]} oldVoiceCommands - An Array of VoiceCommands
     */
    _setOldVoiceCommands (oldVoiceCommands) {
        this._oldVoiceCommands = oldVoiceCommands;
        this._currentVoiceCommands = Array.from(oldVoiceCommands);
    }
}

export { _VoiceCommandUpdateOperation };