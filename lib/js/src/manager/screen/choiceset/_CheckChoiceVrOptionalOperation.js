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
import { DeleteInteractionChoiceSet } from '../../../rpc/messages/DeleteInteractionChoiceSet.js';
import { CreateInteractionChoiceSet } from '../../../rpc/messages/CreateInteractionChoiceSet.js';
import { Choice } from '../../../rpc/structs/Choice.js';

class _CheckChoiceVrOptionalOperation extends _Task {
    /**
     * Initializes an instance of _CheckChoiceVrOptionalOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {_CheckChoiceVrOptionalInterface} checkChoiceVrOptionalInterface - A callback function for operation updates
     */
    constructor (lifecycleManager, checkChoiceVrOptionalInterface = null) {
        super('CheckChoiceVrOptionalOperation');
        this._lifecycleManager = lifecycleManager;
        this._checkChoiceVrOptionalInterface = checkChoiceVrOptionalInterface;
        this._isVrOptional = null;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - No value is resolved from the promise
     */
    async onExecute (task) {
        let deleteResponse;

        const noVrResponse = await this._lifecycleManager.sendRpcResolve(this._createTestChoiceSet(false));
        if (noVrResponse.getSuccess()) {
            this._isVrOptional = true;
            deleteResponse = await this._lifecycleManager.sendRpcResolve(this._deleteTestChoiceSet());
        } else {
            // head unit doesn't support choices with no VR
            this._isVrOptional = false;
            const vrResponse = await this._lifecycleManager.sendRpcResolve(this._createTestChoiceSet(true));
            if (vrResponse.getSuccess()) {
                console.warn('CheckChoiceVROptionalOperation: Connected head unit does not support choice cells without voice commands. Cells without voice will be sent with placeholder voices from now on.');
                deleteResponse = await this._lifecycleManager.sendRpcResolve(this._deleteTestChoiceSet());
            } else {
                console.error('CheckChoiceVROptionalOperation: Connected head unit has rejected all choice cells. Choice manager disabled');
                if (this._checkChoiceVrOptionalInterface !== null) {
                    this._checkChoiceVrOptionalInterface.onError(vrResponse.getInfo());
                    this.onFinished();
                    return;
                }
            }
        }

        if (deleteResponse.getSuccess()) {
            if (this._checkChoiceVrOptionalInterface !== null) {
                this._checkChoiceVrOptionalInterface.onCheckChoiceVROperationComplete(this._isVrOptional);
            }
        } else {
            console.error('CheckChoiceVROptionalOperation: There was an error presenting the keyboard. Finishing operation');
            if (this._checkChoiceVrOptionalInterface !== null) {
                this._checkChoiceVrOptionalInterface.onError(deleteResponse.getInfo());
            }
        }

        this.onFinished();
    }

    /**
     * Creates a sample CICS for testing with and without VR.
     * @private
     * @param {Boolean} hasVr - Whether to send a VR Command with the Choice
     * @returns {CreateInteractionChoiceSet} - The CICS rpc created
     */
    _createTestChoiceSet (hasVr) {
        const choice = new Choice()
            .setChoiceID(0)
            .setMenuName('Test Cell');
        // Java has a setIgnoreAddingVRItems method for Choice which ignores custom logic in Choice.format(). JS doesn't have that logic
        if (hasVr) {
            choice.setVrCommands(['Test VR']);
        }
        return new CreateInteractionChoiceSet()
            .setInteractionChoiceSetID(0)
            .setChoiceSet([choice]);
    }

    /**
     * Creates a DICS to remove the created one sent for testing
     * @private
     * @returns {DeleteInteractionChoiceSet} - The DICS rpc created
     */
    _deleteTestChoiceSet () {
        return new DeleteInteractionChoiceSet()
            .setInteractionChoiceSetID(0);
    }
}

export { _CheckChoiceVrOptionalOperation };