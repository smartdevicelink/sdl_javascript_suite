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

import { EmergencyEventType } from '../enums/EmergencyEventType.js';
import { FuelCutoffStatus } from '../enums/FuelCutoffStatus.js';
import { RpcStruct } from '../RpcStruct.js';
import { VehicleDataEventStatus } from '../enums/VehicleDataEventStatus.js';

class EmergencyEvent extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {EmergencyEventType} type - References signal "VedsEvntType_D_Ltchd". See EmergencyEventType.
     * @return {EmergencyEvent}
     */
    setEmergencyEventType (type) {
        this.validateType(EmergencyEventType, type);
        this.setParameter(EmergencyEvent.KEY_EMERGENCY_EVENT_TYPE, type);
        return this;
    }

    /**
     * @return {EmergencyEventType}
     */
    getEmergencyEventType () {
        return this.getObject(EmergencyEventType, EmergencyEvent.KEY_EMERGENCY_EVENT_TYPE);
    }

    /**
     * @param {FuelCutoffStatus} status - References signal "RCM_FuelCutoff". See FuelCutoffStatus.
     * @return {EmergencyEvent}
     */
    setFuelCutoffStatus (status) {
        this.validateType(FuelCutoffStatus, status);
        this.setParameter(EmergencyEvent.KEY_FUEL_CUTOFF_STATUS, status);
        return this;
    }

    /**
     * @return {FuelCutoffStatus}
     */
    getFuelCutoffStatus () {
        return this.getObject(FuelCutoffStatus, EmergencyEvent.KEY_FUEL_CUTOFF_STATUS);
    }

    /**
     * @param {VehicleDataEventStatus} event - References signal "VedsEvntRoll_D_Ltchd". See VehicleDataEventStatus.
     * @return {EmergencyEvent}
     */
    setRolloverEvent (event) {
        this.validateType(VehicleDataEventStatus, event);
        this.setParameter(EmergencyEvent.KEY_ROLLOVER_EVENT, event);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getRolloverEvent () {
        return this.getObject(VehicleDataEventStatus, EmergencyEvent.KEY_ROLLOVER_EVENT);
    }

    /**
     * @param {Number} velocity - References signal "VedsMaxDeltaV_D_Ltchd". Change in velocity in KPH. Additional
     *                            reserved values: 0x00 No event 0xFE Not supported 0xFF Fault
     * @return {EmergencyEvent}
     */
    setMaximumChangeVelocity (velocity) {
        this.setParameter(EmergencyEvent.KEY_MAXIMUM_CHANGE_VELOCITY, velocity);
        return this;
    }

    /**
     * @return {Number}
     */
    getMaximumChangeVelocity () {
        return this.getParameter(EmergencyEvent.KEY_MAXIMUM_CHANGE_VELOCITY);
    }

    /**
     * @param {VehicleDataEventStatus} events - References signal "VedsMultiEvnt_D_Ltchd". See VehicleDataEventStatus.
     * @return {EmergencyEvent}
     */
    setMultipleEvents (events) {
        this.validateType(VehicleDataEventStatus, events);
        this.setParameter(EmergencyEvent.KEY_MULTIPLE_EVENTS, events);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getMultipleEvents () {
        return this.getObject(VehicleDataEventStatus, EmergencyEvent.KEY_MULTIPLE_EVENTS);
    }
}

EmergencyEvent.KEY_EMERGENCY_EVENT_TYPE = 'emergencyEventType';
EmergencyEvent.KEY_FUEL_CUTOFF_STATUS = 'fuelCutoffStatus';
EmergencyEvent.KEY_ROLLOVER_EVENT = 'rolloverEvent';
EmergencyEvent.KEY_MAXIMUM_CHANGE_VELOCITY = 'maximumChangeVelocity';
EmergencyEvent.KEY_MULTIPLE_EVENTS = 'multipleEvents';

export { EmergencyEvent };