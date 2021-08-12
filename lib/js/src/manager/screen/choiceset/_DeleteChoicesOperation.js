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
     * @param {ChoiceCell[]} cellsToDelete - The cells to delete
     * @param {ChoiceCell[]} loadedCells - The cells loaded to core
     * @param {function} completionListener - A callback function for operation updates. Passes back true or false for successful operation.
     */
    constructor (lifecycleManager, cellsToDelete, loadedCells, completionListener = null) {
        super('DeleteChoicesOperation');
        this._lifecycleManager = lifecycleManager;
        this._cellsToDelete = cellsToDelete;
        this._loadedCells = loadedCells;
        this._completionListener = completionListener;
        this._completionSuccess = false;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - No value is resolved from this promise
     */
    async onExecute (task) {
        await this._updateCellsToDelete();
        if (this._cellsToDelete.length === 0) {
            this.onFinished();
            return;
        }

        const deleteChoiceRpcs = this._cellsToDelete.map(cell => {
            return new DeleteInteractionChoiceSet()
                .setInteractionChoiceSetID(cell._getChoiceId());
        });

        const deleteChoicesPromises = deleteChoiceRpcs.map(dics => {
            return this._lifecycleManager.sendRpcResolve(dics);
        });

        const responses = await Promise.all(deleteChoicesPromises);
        this._completionSuccess = true;
        // go through all responses and inspect their statuses
        for (let index = 0; index < responses.length; index++) {
            const response = responses[index];
            if (!response.getSuccess()) {
                this._completionSuccess = false;
                console.error(`DeleteChoicesOperation: Failed to delete choice: ${response.getInfo()} | Corr ID: ${response.getCorrelationId()}`);
            } else {
                this._loadedCells = this._loadedCells.filter(cell => {
                    return cell._getChoiceId() !== deleteChoiceRpcs[index].getInteractionChoiceSetID();
                });
            }
        }
        this.onFinished();
    }

    setLoadedCells (loadedCells) {
        this._loadedCells = loadedCells;
    }

    async _updateCellsToDelete () {
        const updatedCellsToDelete = this._keepChoicesInBoth(this._cellsToDelete, this._loadedCells);
        for (const cell of updatedCellsToDelete) {
            const uploadCells = this._loadedCells.filter(loadedCell => loadedCell.equals(cell));
            if (uploadCells.length === 0) {
                continue;
            }
            // There should only be one cell here since uniqueness is required
            cell._setChoiceId(uploadCells[0]._getChoiceId());
        }

        this._cellsToDelete = updatedCellsToDelete;
    }

    _loadedCellFromChoiceId (choiceId) {
        for (const cell of this._loadedCells) {
            if (cell._getChoiceId() === choiceId) {
                return cell;
            }
        }
        return null;
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

    onFinished () {
        // report whether all deleted
        if (typeof this._completionListener === 'function') {
            this._completionListener(this._loadedCells, this._completionSuccess);
        }
        super.onFinished();
    }
}

export { _DeleteChoicesOperation };