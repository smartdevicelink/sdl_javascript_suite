/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { RpcStruct } from '../RpcStruct.js';

/**
 * Describes a location (origin coordinates and span) of a vehicle component.
 */
class Grid extends RpcStruct {
    /**
     * Initalizes an instance of Grid.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Column
     * @param {Number} col - The desired Column.
     * {'num_min_value': -1, 'num_max_value': 100}
     * @returns {Grid} - The class instance for method chaining.
     */
    setColumn (col) {
        this.setParameter(Grid.KEY_COLUMN, col);
        return this;
    }

    /**
     * Get the Column
     * @returns {Number} - the KEY_COLUMN value
     */
    getColumn () {
        return this.getParameter(Grid.KEY_COLUMN);
    }

    /**
     * Set the Row
     * @param {Number} row - The desired Row.
     * {'num_min_value': -1, 'num_max_value': 100}
     * @returns {Grid} - The class instance for method chaining.
     */
    setRow (row) {
        this.setParameter(Grid.KEY_ROW, row);
        return this;
    }

    /**
     * Get the Row
     * @returns {Number} - the KEY_ROW value
     */
    getRow () {
        return this.getParameter(Grid.KEY_ROW);
    }

    /**
     * Set the Level
     * @param {Number} level - The desired Level.
     * {'default_value': 0, 'num_min_value': -1, 'num_max_value': 100}
     * @returns {Grid} - The class instance for method chaining.
     */
    setLevel (level) {
        this.setParameter(Grid.KEY_LEVEL, level);
        return this;
    }

    /**
     * Get the Level
     * @returns {Number} - the KEY_LEVEL value
     */
    getLevel () {
        return this.getParameter(Grid.KEY_LEVEL);
    }

    /**
     * Set the ColumnSpan
     * @param {Number} colspan - The desired ColumnSpan.
     * {'default_value': 1, 'num_min_value': 1, 'num_max_value': 100}
     * @returns {Grid} - The class instance for method chaining.
     */
    setColumnSpan (colspan) {
        this.setParameter(Grid.KEY_COLUMN_SPAN, colspan);
        return this;
    }

    /**
     * Get the ColumnSpan
     * @returns {Number} - the KEY_COLUMN_SPAN value
     */
    getColumnSpan () {
        return this.getParameter(Grid.KEY_COLUMN_SPAN);
    }

    /**
     * Set the RowSpan
     * @param {Number} rowspan - The desired RowSpan.
     * {'default_value': 1, 'num_min_value': 1, 'num_max_value': 100}
     * @returns {Grid} - The class instance for method chaining.
     */
    setRowSpan (rowspan) {
        this.setParameter(Grid.KEY_ROW_SPAN, rowspan);
        return this;
    }

    /**
     * Get the RowSpan
     * @returns {Number} - the KEY_ROW_SPAN value
     */
    getRowSpan () {
        return this.getParameter(Grid.KEY_ROW_SPAN);
    }

    /**
     * Set the LevelSpan
     * @param {Number} levelspan - The desired LevelSpan.
     * {'default_value': 1, 'num_min_value': 1, 'num_max_value': 100}
     * @returns {Grid} - The class instance for method chaining.
     */
    setLevelSpan (levelspan) {
        this.setParameter(Grid.KEY_LEVEL_SPAN, levelspan);
        return this;
    }

    /**
     * Get the LevelSpan
     * @returns {Number} - the KEY_LEVEL_SPAN value
     */
    getLevelSpan () {
        return this.getParameter(Grid.KEY_LEVEL_SPAN);
    }
}

Grid.KEY_COLUMN = 'col';
Grid.KEY_ROW = 'row';
Grid.KEY_LEVEL = 'level';
Grid.KEY_COLUMN_SPAN = 'colspan';
Grid.KEY_ROW_SPAN = 'rowspan';
Grid.KEY_LEVEL_SPAN = 'levelspan';

export { Grid };