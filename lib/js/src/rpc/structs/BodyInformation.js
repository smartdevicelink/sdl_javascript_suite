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

import { IgnitionStableStatus } from '../enums/IgnitionStableStatus.js';
import { IgnitionStatus } from '../enums/IgnitionStatus.js';
import { RpcStruct } from '../RpcStruct.js';

class BodyInformation extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Boolean} active - References signal "PrkBrkActv_B_Actl".
     * @return {BodyInformation}
     */
    setParkBrakeActive (active) {
        this.setParameter(BodyInformation.KEY_PARK_BRAKE_ACTIVE, active);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getParkBrakeActive () {
        return this.getParameter(BodyInformation.KEY_PARK_BRAKE_ACTIVE);
    }

    /**
     * @param {IgnitionStableStatus} status - References signal "Ignition_Switch_Stable". See IgnitionStableStatus.
     * @return {BodyInformation}
     */
    setIgnitionStableStatus (status) {
        this.validateType(IgnitionStableStatus, status);
        this.setParameter(BodyInformation.KEY_IGNITION_STABLE_STATUS, status);
        return this;
    }

    /**
     * @return {IgnitionStableStatus}
     */
    getIgnitionStableStatus () {
        return this.getObject(IgnitionStableStatus, BodyInformation.KEY_IGNITION_STABLE_STATUS);
    }

    /**
     * @param {IgnitionStatus} status - References signal "Ignition_status". See IgnitionStatus.
     * @return {BodyInformation}
     */
    setIgnitionStatus (status) {
        this.validateType(IgnitionStatus, status);
        this.setParameter(BodyInformation.KEY_IGNITION_STATUS, status);
        return this;
    }

    /**
     * @return {IgnitionStatus}
     */
    getIgnitionStatus () {
        return this.getObject(IgnitionStatus, BodyInformation.KEY_IGNITION_STATUS);
    }

    /**
     * @param {Boolean} ajar - References signal "DrStatDrv_B_Actl".
     * @return {BodyInformation}
     */
    setDriverDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_DRIVER_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDriverDoorAjar () {
        return this.getParameter(BodyInformation.KEY_DRIVER_DOOR_AJAR);
    }

    /**
     * @param {Boolean} ajar - References signal "DrStatPsngr_B_Actl".
     * @return {BodyInformation}
     */
    setPassengerDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_PASSENGER_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPassengerDoorAjar () {
        return this.getParameter(BodyInformation.KEY_PASSENGER_DOOR_AJAR);
    }

    /**
     * @param {Boolean} ajar - References signal "DrStatRl_B_Actl".
     * @return {BodyInformation}
     */
    setRearLeftDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_REAR_LEFT_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRearLeftDoorAjar () {
        return this.getParameter(BodyInformation.KEY_REAR_LEFT_DOOR_AJAR);
    }

    /**
     * @param {Boolean} ajar - References signal "DrStatRr_B_Actl".
     * @return {BodyInformation}
     */
    setRearRightDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRearRightDoorAjar () {
        return this.getParameter(BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR);
    }
}

BodyInformation.KEY_PARK_BRAKE_ACTIVE = 'parkBrakeActive';
BodyInformation.KEY_IGNITION_STABLE_STATUS = 'ignitionStableStatus';
BodyInformation.KEY_IGNITION_STATUS = 'ignitionStatus';
BodyInformation.KEY_DRIVER_DOOR_AJAR = 'driverDoorAjar';
BodyInformation.KEY_PASSENGER_DOOR_AJAR = 'passengerDoorAjar';
BodyInformation.KEY_REAR_LEFT_DOOR_AJAR = 'rearLeftDoorAjar';
BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR = 'rearRightDoorAjar';

export { BodyInformation };