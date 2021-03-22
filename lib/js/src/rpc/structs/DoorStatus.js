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

import { DoorStatusType } from '../enums/DoorStatusType.js';
import { Grid } from './Grid.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Describes the status of a parameter of door.
 */
class DoorStatus extends RpcStruct {
    /**
     * Initializes an instance of DoorStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Location
     * @param {Grid} location - Describes a location (origin coordinates and span) of a vehicle component. - The desired Location.
     * @returns {DoorStatus} - The class instance for method chaining.
     */
    setLocation (location) {
        this._validateType(Grid, location);
        this.setParameter(DoorStatus.KEY_LOCATION, location);
        return this;
    }

    /**
     * Get the Location
     * @returns {Grid} - the KEY_LOCATION value
     */
    getLocation () {
        return this.getObject(Grid, DoorStatus.KEY_LOCATION);
    }

    /**
     * Set the Status
     * @param {DoorStatusType} status - The desired Status.
     * @returns {DoorStatus} - The class instance for method chaining.
     */
    setStatus (status) {
        this._validateType(DoorStatusType, status);
        this.setParameter(DoorStatus.KEY_STATUS, status);
        return this;
    }

    /**
     * Get the Status
     * @returns {DoorStatusType} - the KEY_STATUS value
     */
    getStatus () {
        return this.getObject(DoorStatusType, DoorStatus.KEY_STATUS);
    }
}

DoorStatus.KEY_LOCATION = 'location';
DoorStatus.KEY_STATUS = 'status';

export { DoorStatus };