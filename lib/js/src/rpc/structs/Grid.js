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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} col
     * @return {Grid}
     */
    setColumn (col) {
        this.setParameter(Grid.KEY_COLUMN, col);
        return this;
    }

    /**
     * @return {Number}
     */
    getColumn () {
        return this.getParameter(Grid.KEY_COLUMN);
    }

    /**
     * @param {Number} row
     * @return {Grid}
     */
    setRow (row) {
        this.setParameter(Grid.KEY_ROW, row);
        return this;
    }

    /**
     * @return {Number}
     */
    getRow () {
        return this.getParameter(Grid.KEY_ROW);
    }

    /**
     * @param {Number} level
     * @return {Grid}
     */
    setLevel (level) {
        this.setParameter(Grid.KEY_LEVEL, level);
        return this;
    }

    /**
     * @return {Number}
     */
    getLevel () {
        return this.getParameter(Grid.KEY_LEVEL);
    }

    /**
     * @param {Number} colspan
     * @return {Grid}
     */
    setColumnSpan (colspan) {
        this.setParameter(Grid.KEY_COLUMN_SPAN, colspan);
        return this;
    }

    /**
     * @return {Number}
     */
    getColumnSpan () {
        return this.getParameter(Grid.KEY_COLUMN_SPAN);
    }

    /**
     * @param {Number} rowspan
     * @return {Grid}
     */
    setRowSpan (rowspan) {
        this.setParameter(Grid.KEY_ROW_SPAN, rowspan);
        return this;
    }

    /**
     * @return {Number}
     */
    getRowSpan () {
        return this.getParameter(Grid.KEY_ROW_SPAN);
    }

    /**
     * @param {Number} levelspan
     * @return {Grid}
     */
    setLevelSpan (levelspan) {
        this.setParameter(Grid.KEY_LEVEL_SPAN, levelspan);
        return this;
    }

    /**
     * @return {Number}
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