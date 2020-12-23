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

class _DeleteChoicesOperation extends _Task {
    /**
     * Initializes an instance of _DeleteChoicesOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {ChoiceCell[]} cellsToDelete - Delete these
     * @param {function} completionListener - A callback function for operation updates. Passes back true or false for successful operation.
     */
    constructor (lifecycleManager, cellsToDelete, completionListener = null) {
        super('DeleteChoicesOperation');
        this._lifecycleManager = lifecycleManager;
        this._cellsToDelete = cellsToDelete;
        this._completionListener = completionListener;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise}
     */
    async onExecute (task) {
        const deleteChoicesPromises = this._cellsToDelete.map(cell => {
            const dics = new DeleteInteractionChoiceSet()
                .setInteractionChoiceSetID(cell._getChoiceId());
            return this._lifecycleManager.sendRpcResolve(dics);
        });

        const responses = await Promise.all(deleteChoicesPromises);
        let allSucceeded = true;
        // go through all responses and inspect their statuses
        for (let index = 0; index < responses.length; index++) {
            const response = responses[index];
            if (!response.getSuccess()) {
                allSucceeded = false;
                console.error(`DeleteChoicesOperation: Failed to delete choice: ${response.getInfo()} | Corr ID: ${response.getCorrelationId()}`);
            }
        }
        // report whether all deleted
        if (this._completionListener !== null) {
            this._completionListener(allSucceeded);
        }
        this.onFinished();
    }
}

export { _DeleteChoicesOperation };