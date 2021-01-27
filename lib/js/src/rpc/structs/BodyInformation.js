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

import { DoorStatus } from './DoorStatus.js';
import { GateStatus } from './GateStatus.js';
import { IgnitionStableStatus } from '../enums/IgnitionStableStatus.js';
import { IgnitionStatus } from '../enums/IgnitionStatus.js';
import { RoofStatus } from './RoofStatus.js';
import { RpcStruct } from '../RpcStruct.js';

class BodyInformation extends RpcStruct {
    /**
     * Initalizes an instance of BodyInformation.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ParkBrakeActive
     * @param {Boolean} active - References signal "PrkBrkActv_B_Actl". - The desired ParkBrakeActive.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setParkBrakeActive (active) {
        this.setParameter(BodyInformation.KEY_PARK_BRAKE_ACTIVE, active);
        return this;
    }

    /**
     * Get the ParkBrakeActive
     * @returns {Boolean} - the KEY_PARK_BRAKE_ACTIVE value
     */
    getParkBrakeActive () {
        return this.getParameter(BodyInformation.KEY_PARK_BRAKE_ACTIVE);
    }

    /**
     * Set the IgnitionStableStatus
     * @param {IgnitionStableStatus} status - References signal "Ignition_Switch_Stable". See IgnitionStableStatus. - The desired IgnitionStableStatus.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setIgnitionStableStatus (status) {
        this._validateType(IgnitionStableStatus, status);
        this.setParameter(BodyInformation.KEY_IGNITION_STABLE_STATUS, status);
        return this;
    }

    /**
     * Get the IgnitionStableStatus
     * @returns {IgnitionStableStatus} - the KEY_IGNITION_STABLE_STATUS value
     */
    getIgnitionStableStatus () {
        return this.getObject(IgnitionStableStatus, BodyInformation.KEY_IGNITION_STABLE_STATUS);
    }

    /**
     * Set the IgnitionStatus
     * @param {IgnitionStatus} status - References signal "Ignition_status". See IgnitionStatus. - The desired IgnitionStatus.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setIgnitionStatus (status) {
        this._validateType(IgnitionStatus, status);
        this.setParameter(BodyInformation.KEY_IGNITION_STATUS, status);
        return this;
    }

    /**
     * Get the IgnitionStatus
     * @returns {IgnitionStatus} - the KEY_IGNITION_STATUS value
     */
    getIgnitionStatus () {
        return this.getObject(IgnitionStatus, BodyInformation.KEY_IGNITION_STATUS);
    }

    /**
     * Set the DriverDoorAjar
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {Boolean} ajar - References signal "DrStatDrv_B_Actl". Deprecated starting with RPC Spec 7.1.0. - The desired DriverDoorAjar.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setDriverDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_DRIVER_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * Get the DriverDoorAjar
     * @returns {Boolean} - the KEY_DRIVER_DOOR_AJAR value
     */
    getDriverDoorAjar () {
        return this.getParameter(BodyInformation.KEY_DRIVER_DOOR_AJAR);
    }

    /**
     * Set the PassengerDoorAjar
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {Boolean} ajar - References signal "DrStatPsngr_B_Actl". Deprecated starting with RPC Spec 7.1.0. - The desired PassengerDoorAjar.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setPassengerDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_PASSENGER_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * Get the PassengerDoorAjar
     * @returns {Boolean} - the KEY_PASSENGER_DOOR_AJAR value
     */
    getPassengerDoorAjar () {
        return this.getParameter(BodyInformation.KEY_PASSENGER_DOOR_AJAR);
    }

    /**
     * Set the RearLeftDoorAjar
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {Boolean} ajar - References signal "DrStatRl_B_Actl". Deprecated starting with RPC Spec 7.1.0. - The desired RearLeftDoorAjar.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setRearLeftDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_REAR_LEFT_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * Get the RearLeftDoorAjar
     * @returns {Boolean} - the KEY_REAR_LEFT_DOOR_AJAR value
     */
    getRearLeftDoorAjar () {
        return this.getParameter(BodyInformation.KEY_REAR_LEFT_DOOR_AJAR);
    }

    /**
     * Set the RearRightDoorAjar
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {Boolean} ajar - References signal "DrStatRr_B_Actl". Deprecated starting with RPC Spec 7.1.0. - The desired RearRightDoorAjar.
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setRearRightDoorAjar (ajar) {
        this.setParameter(BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR, ajar);
        return this;
    }

    /**
     * Get the RearRightDoorAjar
     * @returns {Boolean} - the KEY_REAR_RIGHT_DOOR_AJAR value
     */
    getRearRightDoorAjar () {
        return this.getParameter(BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR);
    }

    /**
     * Set the DoorStatuses
     * @since SmartDeviceLink 7.1.0
     * @param {DoorStatus[]} statuses - Provides status for doors if Ajar/Closed/Locked - The desired DoorStatuses.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setDoorStatuses (statuses) {
        this._validateType(DoorStatus, statuses, true);
        this.setParameter(BodyInformation.KEY_DOOR_STATUSES, statuses);
        return this;
    }

    /**
     * Get the DoorStatuses
     * @returns {DoorStatus[]} - the KEY_DOOR_STATUSES value
     */
    getDoorStatuses () {
        return this.getObject(DoorStatus, BodyInformation.KEY_DOOR_STATUSES);
    }

    /**
     * Set the GateStatuses
     * @since SmartDeviceLink 7.1.0
     * @param {GateStatus[]} statuses - Provides status for trunk/hood/etc. if Ajar/Closed/Locked - The desired GateStatuses.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setGateStatuses (statuses) {
        this._validateType(GateStatus, statuses, true);
        this.setParameter(BodyInformation.KEY_GATE_STATUSES, statuses);
        return this;
    }

    /**
     * Get the GateStatuses
     * @returns {GateStatus[]} - the KEY_GATE_STATUSES value
     */
    getGateStatuses () {
        return this.getObject(GateStatus, BodyInformation.KEY_GATE_STATUSES);
    }

    /**
     * Set the RoofStatuses
     * @since SmartDeviceLink 7.1.0
     * @param {RoofStatus[]} statuses - Provides status for roof/convertible roof/sunroof/moonroof etc., if Closed/Ajar/Removed etc. - The desired RoofStatuses.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {BodyInformation} - The class instance for method chaining.
     */
    setRoofStatuses (statuses) {
        this._validateType(RoofStatus, statuses, true);
        this.setParameter(BodyInformation.KEY_ROOF_STATUSES, statuses);
        return this;
    }

    /**
     * Get the RoofStatuses
     * @returns {RoofStatus[]} - the KEY_ROOF_STATUSES value
     */
    getRoofStatuses () {
        return this.getObject(RoofStatus, BodyInformation.KEY_ROOF_STATUSES);
    }
}

BodyInformation.KEY_PARK_BRAKE_ACTIVE = 'parkBrakeActive';
BodyInformation.KEY_IGNITION_STABLE_STATUS = 'ignitionStableStatus';
BodyInformation.KEY_IGNITION_STATUS = 'ignitionStatus';
BodyInformation.KEY_DRIVER_DOOR_AJAR = 'driverDoorAjar';
BodyInformation.KEY_PASSENGER_DOOR_AJAR = 'passengerDoorAjar';
BodyInformation.KEY_REAR_LEFT_DOOR_AJAR = 'rearLeftDoorAjar';
BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR = 'rearRightDoorAjar';
BodyInformation.KEY_DOOR_STATUSES = 'doorStatuses';
BodyInformation.KEY_GATE_STATUSES = 'gateStatuses';
BodyInformation.KEY_ROOF_STATUSES = 'roofStatuses';

export { BodyInformation };