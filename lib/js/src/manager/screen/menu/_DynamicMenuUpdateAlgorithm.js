/*
* Copyright (c) 2021, Livio, Inc.
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
import { _MenuCellState } from './enums/_MenuCellState.js';
import { _DynamicMenuUpdateRunScore } from './_DynamicMenuUpdateRunScore.js';

class _DynamicMenuUpdateAlgorithm {
    /**
     * Assumes all differences between the two pased in menu cell lists and returns instructions for full delete and add
     * @param {MenuCell[]} oldMenuCells - The old menu cell list
     * @param {MenuCell[]} updatedMenuCells - The new menu cell list
     * @returns {DynamicMenuUpdateRunScore} - A description of what is needed to go from old menu cells to updated menu cells
     */
    static compatibilityRunScoreWithOldMenuCells (oldMenuCells, updatedMenuCells) {
        return new _DynamicMenuUpdateRunScore(_DynamicMenuUpdateAlgorithm.buildAllDeleteStatusesForMenu(oldMenuCells), _DynamicMenuUpdateAlgorithm.buildAllAddStatusesForMenu(updatedMenuCells), updatedMenuCells.length);
    }

    /**
     * More precisely finds the differences between the two pased in menu cell lists
     * @param {MenuCell[]} oldMenuCells - The old menu cell list
     * @param {MenuCell[]} updatedMenuCells - The new menu cell list
     * @returns {DynamicMenuUpdateRunScore} - A description of what is needed to go from old menu cells to updated menu cells
     */
    static dynamicRunScoreOldMenuCells (oldMenuCells, updatedMenuCells) {
        if (oldMenuCells.length !== 0 && updatedMenuCells.length === 0) { // nothing in updatedMenuCells. delete all
            return new _DynamicMenuUpdateRunScore(_DynamicMenuUpdateAlgorithm.buildAllDeleteStatusesForMenu(oldMenuCells), [], 0);
        } else if (oldMenuCells.length === 0 && updatedMenuCells.length !== 0) { // nothing in oldMenuCells. add all
            return new _DynamicMenuUpdateRunScore([], _DynamicMenuUpdateAlgorithm.buildAllAddStatusesForMenu(updatedMenuCells), updatedMenuCells.length);
        } else if (oldMenuCells.length === 0 && updatedMenuCells.length === 0) { // both are empty
            return new _DynamicMenuUpdateRunScore([], [], 0);
        }
        return _DynamicMenuUpdateAlgorithm.startCompareAtRun(0, oldMenuCells, updatedMenuCells);
    }

    /**
     * Performs comparisons between new and old state of menu cells, starting at index startRun
     * @param {Number} startRun - The index to start comparing at
     * @param {MenuCell[]} oldMenuCells - The old menu cell list
     * @param {MenuCell[]} updatedMenuCells - The new menu cell list
     * @returns {DynamicMenuUpdateRunScore} - A description of what is needed to go from old menu cells to updated menu cells
     */
    static startCompareAtRun (startRun, oldMenuCells, updatedMenuCells) {
        let bestScore = new _DynamicMenuUpdateRunScore([], [], 0);

        for (let run = startRun; run < oldMenuCells.length; run++) {
            // Set the menu status as a 1-1 array, start off with oldMenus = all Deletes, newMenu = all Adds
            const oldMenuStatus = _DynamicMenuUpdateAlgorithm.buildAllDeleteStatusesForMenu(oldMenuCells);
            const newMenuStatus = _DynamicMenuUpdateAlgorithm.buildAllAddStatusesForMenu(updatedMenuCells);

            let startIndex = 0;

            for (let oldCellIndex = run; oldCellIndex < oldMenuCells.length; oldCellIndex++) {
                // For each old item, create inner loop to compare old cells to new cells to find a match
                // if a match is found we mark the index at match for both the old and the new status to
                // keep since we do not want to send RPCs for those cases
                for (let newCellIndex = startIndex; newCellIndex < updatedMenuCells.length; newCellIndex++) {
                    if (oldMenuCells[oldCellIndex].equalsWithUniqueTitle(updatedMenuCells[newCellIndex])) {
                        oldMenuStatus[oldCellIndex] = _MenuCellState.KEEP;
                        newMenuStatus[newCellIndex] = _MenuCellState.KEEP;
                        startIndex = newCellIndex + 1;
                        break;
                    }
                }
            }

            // Add RPC are the biggest operation so we need to find the run with the least amount of Adds.
            // We will reset the run we use each time a runScore is less than the current score.
            let numberOfAdds = 0;
            for (let status = 0; status < newMenuStatus.length; status++) {
                if (newMenuStatus[status] === _MenuCellState.ADD) {
                    numberOfAdds++;
                }
            }

            // As soon as we have a run that requires 0 Adds, we will use it since we can't do better than 0
            if (numberOfAdds === 0) {
                bestScore = new _DynamicMenuUpdateRunScore(oldMenuStatus, newMenuStatus, numberOfAdds);
                return bestScore;
            }

            // if we haven't created the bestScore object or if the current score beats the old score then we will create a new bestScore
            if (bestScore.isEmpty() || numberOfAdds < bestScore.getScore()) {
                bestScore = new _DynamicMenuUpdateRunScore(oldMenuStatus, newMenuStatus, numberOfAdds);
            }
        }

        return bestScore;
    }

    /**
     * Builds a 1-1 array of Deletes for every element in the array
     * @param {MenuCell[]} oldMenu - The old menu array
     * @returns {MenuCellState[]} - An array of delete states
     */
    static buildAllDeleteStatusesForMenu (oldMenu) {
        return oldMenu.map(() => _MenuCellState.DELETE);
    }

    /**
     * Builds a 1-1 array of Adds for every element in the array
     * @param {MenuCell[]} newMenu - The new menu array
     * @returns {MenuCellState[]} - An array of add states
     */
    static buildAllAddStatusesForMenu (newMenu) {
        return newMenu.map(() => _MenuCellState.ADD);
    }
}

export { _DynamicMenuUpdateAlgorithm };
