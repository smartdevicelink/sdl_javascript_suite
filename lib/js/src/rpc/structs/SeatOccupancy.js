/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
import { SeatStatus } from './SeatStatus.js';

class SeatOccupancy extends RpcStruct {
    /**
     * Initializes an instance of SeatOccupancy.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the SeatsOccupied
     * @param {SeatStatus[]} occupied - Seat status array containing location and whether the seats are occupied. - The desired SeatsOccupied.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {SeatOccupancy} - The class instance for method chaining.
     */
    setSeatsOccupied (occupied) {
        this._validateType(SeatStatus, occupied, true);
        this.setParameter(SeatOccupancy.KEY_SEATS_OCCUPIED, occupied);
        return this;
    }

    /**
     * Get the SeatsOccupied
     * @returns {SeatStatus[]} - the KEY_SEATS_OCCUPIED value
     */
    getSeatsOccupied () {
        return this.getObject(SeatStatus, SeatOccupancy.KEY_SEATS_OCCUPIED);
    }

    /**
     * Set the SeatsBelted
     * @param {SeatStatus[]} belted - Seat status array containing location and whether the seats are belted. - The desired SeatsBelted.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {SeatOccupancy} - The class instance for method chaining.
     */
    setSeatsBelted (belted) {
        this._validateType(SeatStatus, belted, true);
        this.setParameter(SeatOccupancy.KEY_SEATS_BELTED, belted);
        return this;
    }

    /**
     * Get the SeatsBelted
     * @returns {SeatStatus[]} - the KEY_SEATS_BELTED value
     */
    getSeatsBelted () {
        return this.getObject(SeatStatus, SeatOccupancy.KEY_SEATS_BELTED);
    }
}

SeatOccupancy.KEY_SEATS_OCCUPIED = 'seatsOccupied';
SeatOccupancy.KEY_SEATS_BELTED = 'seatsBelted';

export { SeatOccupancy };