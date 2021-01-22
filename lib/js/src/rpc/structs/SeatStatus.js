/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
 * Describes the status of a parameter of seat.
 */
class SeatStatus extends RpcStruct {
    /**
     * Initalizes an instance of SeatStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the SeatLocation
     * @param {SeatLocation} location - Describes the location of a seat. - The desired SeatLocation.
     * @returns {SeatStatus} - The class instance for method chaining.
     */
    setSeatLocation (location) {
        this._validateType(SeatLocation, location);
        this.setParameter(SeatStatus.KEY_SEAT_LOCATION, location);
        return this;
    }

    /**
     * Get the SeatLocation
     * @returns {SeatLocation} - the KEY_SEAT_LOCATION value
     */
    getSeatLocation () {
        return this.getObject(SeatLocation, SeatStatus.KEY_SEAT_LOCATION);
    }

    /**
     * Set the ConditionActive
     * @param {Boolean} active - The desired ConditionActive.
     * @returns {SeatStatus} - The class instance for method chaining.
     */
    setConditionActive (active) {
        this.setParameter(SeatStatus.KEY_CONDITION_ACTIVE, active);
        return this;
    }

    /**
     * Get the ConditionActive
     * @returns {Boolean} - the KEY_CONDITION_ACTIVE value
     */
    getConditionActive () {
        return this.getParameter(SeatStatus.KEY_CONDITION_ACTIVE);
    }
}

SeatStatus.KEY_SEAT_LOCATION = 'seatLocation';
SeatStatus.KEY_CONDITION_ACTIVE = 'conditionActive';

export { SeatStatus };