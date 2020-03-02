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
import { SeatLocation } from './SeatLocation.js';

/**
 * Contains information about the locations of each seat
 */
class SeatLocationCapability extends RpcStruct {
    /**
     * Initalizes an instance of SeatLocationCapability.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} rows
     * @return {SeatLocationCapability}
     */
    setRows (rows) {
        this.setParameter(SeatLocationCapability.KEY_ROWS, rows);
        return this;
    }

    /**
     * @return {Number}
     */
    getRows () {
        return this.getParameter(SeatLocationCapability.KEY_ROWS);
    }

    /**
     * @param {Number} columns
     * @return {SeatLocationCapability}
     */
    setColumns (columns) {
        this.setParameter(SeatLocationCapability.KEY_COLUMNS, columns);
        return this;
    }

    /**
     * @return {Number}
     */
    getColumns () {
        return this.getParameter(SeatLocationCapability.KEY_COLUMNS);
    }

    /**
     * @param {Number} levels
     * @return {SeatLocationCapability}
     */
    setLevels (levels) {
        this.setParameter(SeatLocationCapability.KEY_LEVELS, levels);
        return this;
    }

    /**
     * @return {Number}
     */
    getLevels () {
        return this.getParameter(SeatLocationCapability.KEY_LEVELS);
    }

    /**
     * @param {SeatLocation[]} seats - Contains a list of SeatLocation in the vehicle
     * @return {SeatLocationCapability}
     */
    setSeats (seats) {
        this.validateType(SeatLocation, seats, true);
        this.setParameter(SeatLocationCapability.KEY_SEATS, seats);
        return this;
    }

    /**
     * @return {SeatLocation[]}
     */
    getSeats () {
        return this.getObject(SeatLocation, SeatLocationCapability.KEY_SEATS);
    }
}

SeatLocationCapability.KEY_ROWS = 'rows';
SeatLocationCapability.KEY_COLUMNS = 'columns';
SeatLocationCapability.KEY_LEVELS = 'levels';
SeatLocationCapability.KEY_SEATS = 'seats';

export { SeatLocationCapability };