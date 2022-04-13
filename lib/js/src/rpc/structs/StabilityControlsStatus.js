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
import { VehicleDataStatus } from '../enums/VehicleDataStatus.js';

class StabilityControlsStatus extends RpcStruct {
    /**
     * Initializes an instance of StabilityControlsStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the EscSystem
     * @param {VehicleDataStatus} system - true if vehicle stability control is ON, else false - The desired EscSystem.
     * @returns {StabilityControlsStatus} - The class instance for method chaining.
     */
    setEscSystem (system) {
        this._validateType(VehicleDataStatus, system);
        this.setParameter(StabilityControlsStatus.KEY_ESC_SYSTEM, system);
        return this;
    }

    /**
     * Get the EscSystem
     * @returns {VehicleDataStatus} - the KEY_ESC_SYSTEM value
     */
    getEscSystem () {
        return this.getObject(VehicleDataStatus, StabilityControlsStatus.KEY_ESC_SYSTEM);
    }

    /**
     * Set the TrailerSwayControl
     * @param {VehicleDataStatus} control - true if vehicle trailer sway control is ON, else false - The desired TrailerSwayControl.
     * @returns {StabilityControlsStatus} - The class instance for method chaining.
     */
    setTrailerSwayControl (control) {
        this._validateType(VehicleDataStatus, control);
        this.setParameter(StabilityControlsStatus.KEY_TRAILER_SWAY_CONTROL, control);
        return this;
    }

    /**
     * Get the TrailerSwayControl
     * @returns {VehicleDataStatus} - the KEY_TRAILER_SWAY_CONTROL value
     */
    getTrailerSwayControl () {
        return this.getObject(VehicleDataStatus, StabilityControlsStatus.KEY_TRAILER_SWAY_CONTROL);
    }
}

StabilityControlsStatus.KEY_ESC_SYSTEM = 'escSystem';
StabilityControlsStatus.KEY_TRAILER_SWAY_CONTROL = 'trailerSwayControl';

export { StabilityControlsStatus };