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
import { VehicleDataEventStatus } from '../enums/VehicleDataEventStatus.js';

class BeltStatus extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {VehicleDataEventStatus} deployed - References signal "VedsDrvBelt_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setDriverBeltDeployed (deployed) {
        this.validateType(VehicleDataEventStatus, deployed);
        this.setParameter(BeltStatus.KEY_DRIVER_BELT_DEPLOYED, deployed);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getDriverBeltDeployed () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_DRIVER_BELT_DEPLOYED);
    }

    /**
     * @param {VehicleDataEventStatus} deployed - References signal "VedsPasBelt_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setPassengerBeltDeployed (deployed) {
        this.validateType(VehicleDataEventStatus, deployed);
        this.setParameter(BeltStatus.KEY_PASSENGER_BELT_DEPLOYED, deployed);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getPassengerBeltDeployed () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_PASSENGER_BELT_DEPLOYED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw1PasBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setPassengerBuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_PASSENGER_BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getPassengerBuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_PASSENGER_BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw1DrvBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setDriverBuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_DRIVER_BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getDriverBuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_DRIVER_BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2lBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setLeftRow2BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_LEFT_ROW2BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getLeftRow2BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_LEFT_ROW2BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} detected - References signal "VedsRw1PasChld_D_Ltchd". See
     *                                            VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setPassengerChildDetected (detected) {
        this.validateType(VehicleDataEventStatus, detected);
        this.setParameter(BeltStatus.KEY_PASSENGER_CHILD_DETECTED, detected);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getPassengerChildDetected () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_PASSENGER_CHILD_DETECTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2rBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setRightRow2BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_RIGHT_ROW2BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getRightRow2BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_RIGHT_ROW2BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2mBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setMiddleRow2BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW2BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getMiddleRow2BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW2BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw3mBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setMiddleRow3BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW3BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getMiddleRow3BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW3BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw3lBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setLeftRow3BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_LEFT_ROW3BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getLeftRow3BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_LEFT_ROW3BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw3rBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setRightRow3BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_RIGHT_ROW3BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getRightRow3BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_RIGHT_ROW3BUCKLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2lRib_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setLeftRearInflatableBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_LEFT_REAR_INFLATABLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getLeftRearInflatableBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_LEFT_REAR_INFLATABLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2rRib_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setRightRearInflatableBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_RIGHT_REAR_INFLATABLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getRightRearInflatableBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_RIGHT_REAR_INFLATABLE_BELTED);
    }

    /**
     * @param {VehicleDataEventStatus} deployed - References signal "VedsRw1mBelt_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setMiddleRow1BeltDeployed (deployed) {
        this.validateType(VehicleDataEventStatus, deployed);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW1BELT_DEPLOYED, deployed);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getMiddleRow1BeltDeployed () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW1BELT_DEPLOYED);
    }

    /**
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw1mBckl_D_Ltchd". See VehicleDataEventStatus.
     * @return {BeltStatus}
     */
    setMiddleRow1BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW1BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getMiddleRow1BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW1BUCKLE_BELTED);
    }
}

BeltStatus.KEY_DRIVER_BELT_DEPLOYED = 'driverBeltDeployed';
BeltStatus.KEY_PASSENGER_BELT_DEPLOYED = 'passengerBeltDeployed';
BeltStatus.KEY_PASSENGER_BUCKLE_BELTED = 'passengerBuckleBelted';
BeltStatus.KEY_DRIVER_BUCKLE_BELTED = 'driverBuckleBelted';
BeltStatus.KEY_LEFT_ROW2BUCKLE_BELTED = 'leftRow2BuckleBelted';
BeltStatus.KEY_PASSENGER_CHILD_DETECTED = 'passengerChildDetected';
BeltStatus.KEY_RIGHT_ROW2BUCKLE_BELTED = 'rightRow2BuckleBelted';
BeltStatus.KEY_MIDDLE_ROW2BUCKLE_BELTED = 'middleRow2BuckleBelted';
BeltStatus.KEY_MIDDLE_ROW3BUCKLE_BELTED = 'middleRow3BuckleBelted';
BeltStatus.KEY_LEFT_ROW3BUCKLE_BELTED = 'leftRow3BuckleBelted';
BeltStatus.KEY_RIGHT_ROW3BUCKLE_BELTED = 'rightRow3BuckleBelted';
BeltStatus.KEY_LEFT_REAR_INFLATABLE_BELTED = 'leftRearInflatableBelted';
BeltStatus.KEY_RIGHT_REAR_INFLATABLE_BELTED = 'rightRearInflatableBelted';
BeltStatus.KEY_MIDDLE_ROW1BELT_DEPLOYED = 'middleRow1BeltDeployed';
BeltStatus.KEY_MIDDLE_ROW1BUCKLE_BELTED = 'middleRow1BuckleBelted';

export { BeltStatus };