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

class _DynamicMenuUpdateRunScore {
    /**
     * Creates a new instance of _DynamicMenuUpdateRunScore
     * @param {MenuCellState[]} oldStatus - Will contain all the deletes and keeps
     * @param {MenuCellState[]} updatedStatus - Will contain all the adds and keeps
     * @param {Number} score - Will contain the score, number of total adds that will need to be created
     * @class
     */
    constructor (oldStatus = [], updatedStatus = [], score = null) {
        this._oldStatus = oldStatus;
        this._updatedStatus = updatedStatus;
        this._score = score;
    }

    /**
     * Gets the updated status
     * @returns {MenuCellState[]} - Will contain all the deletes and keeps
     */
    getOldStatus () {
        return this._oldStatus;
    }

    /**
     * Sets the updated status
     * @param {MenuCellState[]} oldStatus - Will contain all the deletes and keeps
     * @returns {_DynamicMenuUpdateRunScore} - A reference to this instance to support method chaining
     */
    setOldStatus (oldStatus) {
        this._oldStatus = oldStatus;
        return this;
    }

    /**
     * Gets the updated status
     * @returns {MenuCellState[]} - Will contain all the adds and keeps
     */
    getUpdatedStatus () {
        return this._updatedStatus;
    }

    /**
     * Sets the updated status
     * @param {MenuCellState[]} updatedStatus - Will contain all the adds and keeps
     * @returns {_DynamicMenuUpdateRunScore} - A reference to this instance to support method chaining
     */
    setUpdatedStatus (updatedStatus) {
        this._updatedStatus = updatedStatus;
        return this;
    }

    /**
     * Gets the sub menu layout
     * @returns {Number} - Will contain the score, number of total adds that will need to be created
     */
    getScore () {
        return this._score;
    }

    /**
     * Sets the sub menu layout
     * @param {Number} score - Will contain the score, number of total adds that will need to be created
     * @returns {_DynamicMenuUpdateRunScore} - A reference to this instance to support method chaining
     */
    setScore (score) {
        this._score = score;
        return this;
    }

    /**
     * Returns whether there's no values here
     * @returns {Boolean} - Whether the status are empty and the score is 0
     */
    isEmpty () {
        return this._oldStatus.length === 0 && this._updatedStatus.length === 0 && this._score === 0;
    }
}

export { _DynamicMenuUpdateRunScore };
