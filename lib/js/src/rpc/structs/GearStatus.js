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

import { PRNDL } from '../enums/PRNDL.js';
import { RpcStruct } from '../RpcStruct.js';
import { TransmissionType } from '../enums/TransmissionType.js';

class GearStatus extends RpcStruct {
    /**
     * Initializes an instance of GearStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the UserSelectedGear
     * @param {PRNDL} gear - Gear position selected by the user i.e. Park, Drive, Reverse - The desired UserSelectedGear.
     * @returns {GearStatus} - The class instance for method chaining.
     */
    setUserSelectedGear (gear) {
        this._validateType(PRNDL, gear);
        this.setParameter(GearStatus.KEY_USER_SELECTED_GEAR, gear);
        return this;
    }

    /**
     * Get the UserSelectedGear
     * @returns {PRNDL} - the KEY_USER_SELECTED_GEAR value
     */
    getUserSelectedGear () {
        return this.getObject(PRNDL, GearStatus.KEY_USER_SELECTED_GEAR);
    }

    /**
     * Set the ActualGear
     * @param {PRNDL} gear - Actual Gear in use by the transmission - The desired ActualGear.
     * @returns {GearStatus} - The class instance for method chaining.
     */
    setActualGear (gear) {
        this._validateType(PRNDL, gear);
        this.setParameter(GearStatus.KEY_ACTUAL_GEAR, gear);
        return this;
    }

    /**
     * Get the ActualGear
     * @returns {PRNDL} - the KEY_ACTUAL_GEAR value
     */
    getActualGear () {
        return this.getObject(PRNDL, GearStatus.KEY_ACTUAL_GEAR);
    }

    /**
     * Set the TransmissionType
     * @param {TransmissionType} type - Tells the transmission type - The desired TransmissionType.
     * @returns {GearStatus} - The class instance for method chaining.
     */
    setTransmissionType (type) {
        this._validateType(TransmissionType, type);
        this.setParameter(GearStatus.KEY_TRANSMISSION_TYPE, type);
        return this;
    }

    /**
     * Get the TransmissionType
     * @returns {TransmissionType} - the KEY_TRANSMISSION_TYPE value
     */
    getTransmissionType () {
        return this.getObject(TransmissionType, GearStatus.KEY_TRANSMISSION_TYPE);
    }
}

GearStatus.KEY_USER_SELECTED_GEAR = 'userSelectedGear';
GearStatus.KEY_ACTUAL_GEAR = 'actualGear';
GearStatus.KEY_TRANSMISSION_TYPE = 'transmissionType';

export { GearStatus };