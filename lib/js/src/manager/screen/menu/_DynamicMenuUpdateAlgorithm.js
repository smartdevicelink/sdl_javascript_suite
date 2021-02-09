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
     * Determines the differences between the two pased in menu cell lists
     * @param {MenuCell[]} oldMenuCells - The old menu cell list
     * @param {MenuCell[]} updatedMenuCells - The new menu cell list
     * @returns {DynamicMenuUpdateRunScore} - A description of what is needed to go from old menu cells to updated menu cells
     */
    static compareOldMenuCells (oldMenuCells, updatedMenuCells) {
        if (oldMenuCells.length !== 0 && updatedMenuCells.length === 0) { // nothing in updatedMenuCells. delete all
            return new _DynamicMenuUpdateRunScore(oldMenuCells.map(() => _MenuCellState.DELETE), [], 0);
        } else if (oldMenuCells.length === 0 && updatedMenuCells.length !== 0) { // nothing in oldMenuCells. add all
            return new _DynamicMenuUpdateRunScore([], updatedMenuCells.map(() => _MenuCellState.ADD), updatedMenuCells.length);
        } else if (oldMenuCells.length === 0) { // both are empty
            return null;
        }
    }

    /**
     * 
     * @returns {DynamicMenuUpdateRunScore} - 
     */
    static startCompareAtRun () {

    }

    /**
     * 
     * @returns {MenuCellState[]} - 
     */
    static buildAllDeleteStatusesForMenu () {

    }

    /**
     * 
     * @returns {MenuCellState[]} - 
     */
    static buildAllAddStatusesForMenu () {

    }
}

export { _DynamicMenuUpdateAlgorithm };
