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
import { HMILevel } from '../../rpc/enums/HMILevel.js';
import { PredefinedWindows } from '../../rpc/enums/PredefinedWindows.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { DeleteCommand } from '../../rpc/messages/DeleteCommand.js';
import { AddCommand } from '../../rpc/messages/AddCommand.js';

class VoiceCommandManagerBase extends SubManagerBase {
    /**
     * Initializes an instance of VoiceCommandManagerBase.
     * @constructor
     * @param {LifecycleManager} lifecycleManager
    */
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._taskQueue = [];
        this._voiceCommands = [];
        this._voiceCommandIdMin = 1900000000;
        this._lastVoiceCommandId = this._voiceCommandIdMin;
        this._isReady = false; // whether the HMI level is appropriate for sending requests
        this._hmiListener = null;
        this._commandListener = null;
        this._isUpdateRunning = false; // prevent _update from being invoked more than once at a time
        this._addListeners();
    }

    /**
     * After this method finishes, the manager is ready
     * @return {Promise}
    */
    async start () {
        this._transitionToState(SubManagerBase.READY);
        super.start();
    }

    dispose () {
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._taskQueue.splice(0, this._taskQueue.length);
        this._voiceCommands.splice(0, this._voiceCommands.length);
        this._lastVoiceCommandId = this._voiceCommandIdMin;
        this._isReady = false;
        // remove listeners
        this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.removeRpcListener(FunctionID.OnCommand, this._commandListener);
        this._hmiListener = null;
        this._commandListener = null;
        this._isUpdateRunning = false;

        super.dispose();
    }

    /**
     * Stores the voice commands to send later. Will get overwritten by additional invocations of this method
     * @param {VoiceCommand[]} voiceCommands
     * @return {Promise} - returns after old commands are deleted and new ones are added
    */
    async setVoiceCommands (voiceCommands) {
        // we actually need voice commands to set.
        if (!Array.isArray(voiceCommands)) {
            return;
        }
        // add the commands to a queue to be processed later
        this._taskQueue.push(voiceCommands);

        if (!this._isUpdateRunning) {
            this._isUpdateRunning = true;
            await this._update();
            this._isUpdateRunning = false;
        }
    }

    /**
     * Looks through the task queue to process incoming voice commands. Recursive
     * @return {Promise} - returns after old commands are deleted and new ones are added
    */
    async _update () {
        // we actually need voice commands to set.
        if (this._taskQueue.length === 0) {
            return;
        }

        if (!this._isReady) { // not in the right HMI level yet
            return;
        }

        // remove all but the last element in the task queue for processing
        // there is only going to be one voice command set in the end
        // any other than the last element will end up being deleted anyway
        this._taskQueue.splice(0, this._taskQueue.length - 1);
        const voiceCommands = this._taskQueue.shift();

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
        // run this method again for potential future tasks
        return this._update();
    }

    /**
     * Gets all the voice commands currently set
     * @return {VoiceCommand[]}
    */
    getVoiceCommands () {
        return this._voiceCommands;
    }

    /**
     * Sends requests to delete all voice commands passed in
     * @param {VoiceCommand[]} voiceCommands
     * @return {Promise}
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
     * @param {VoiceCommand[]} voiceCommands
     * @return {Promise}
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
    */
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
                this._isReady = true;
                this._update();
            }
        };

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

        this._lifecycleManager.addRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.addRpcListener(FunctionID.OnCommand, this._commandListener);
    }
}

export { VoiceCommandManagerBase };
