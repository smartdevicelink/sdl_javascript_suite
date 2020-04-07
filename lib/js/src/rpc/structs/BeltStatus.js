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
     * Initalizes an instance of BeltStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the DriverBeltDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsDrvBelt_D_Ltchd". See VehicleDataEventStatus. - The desired DriverBeltDeployed.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setDriverBeltDeployed (deployed) {
        this.validateType(VehicleDataEventStatus, deployed);
        this.setParameter(BeltStatus.KEY_DRIVER_BELT_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the DriverBeltDeployed
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_BELT_DEPLOYED value
     */
    getDriverBeltDeployed () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_DRIVER_BELT_DEPLOYED);
    }

    /**
     * Set the PassengerBeltDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsPasBelt_D_Ltchd". See VehicleDataEventStatus. - The desired PassengerBeltDeployed.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setPassengerBeltDeployed (deployed) {
        this.validateType(VehicleDataEventStatus, deployed);
        this.setParameter(BeltStatus.KEY_PASSENGER_BELT_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the PassengerBeltDeployed
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_BELT_DEPLOYED value
     */
    getPassengerBeltDeployed () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_PASSENGER_BELT_DEPLOYED);
    }

    /**
     * Set the PassengerBuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw1PasBckl_D_Ltchd". See VehicleDataEventStatus. - The desired PassengerBuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setPassengerBuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_PASSENGER_BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the PassengerBuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_BUCKLE_BELTED value
     */
    getPassengerBuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_PASSENGER_BUCKLE_BELTED);
    }

    /**
     * Set the DriverBuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw1DrvBckl_D_Ltchd". See VehicleDataEventStatus. - The desired DriverBuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setDriverBuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_DRIVER_BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the DriverBuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_BUCKLE_BELTED value
     */
    getDriverBuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_DRIVER_BUCKLE_BELTED);
    }

    /**
     * Set the LeftRow2BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2lBckl_D_Ltchd". See VehicleDataEventStatus. - The desired LeftRow2BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setLeftRow2BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_LEFT_ROW2BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the LeftRow2BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_LEFT_ROW2BUCKLE_BELTED value
     */
    getLeftRow2BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_LEFT_ROW2BUCKLE_BELTED);
    }

    /**
     * Set the PassengerChildDetected
     * @param {VehicleDataEventStatus} detected - References signal "VedsRw1PasChld_D_Ltchd". See - The desired PassengerChildDetected.
     * VehicleDataEventStatus.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setPassengerChildDetected (detected) {
        this.validateType(VehicleDataEventStatus, detected);
        this.setParameter(BeltStatus.KEY_PASSENGER_CHILD_DETECTED, detected);
        return this;
    }

    /**
     * Get the PassengerChildDetected
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_CHILD_DETECTED value
     */
    getPassengerChildDetected () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_PASSENGER_CHILD_DETECTED);
    }

    /**
     * Set the RightRow2BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2rBckl_D_Ltchd". See VehicleDataEventStatus. - The desired RightRow2BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setRightRow2BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_RIGHT_ROW2BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the RightRow2BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_RIGHT_ROW2BUCKLE_BELTED value
     */
    getRightRow2BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_RIGHT_ROW2BUCKLE_BELTED);
    }

    /**
     * Set the MiddleRow2BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2mBckl_D_Ltchd". See VehicleDataEventStatus. - The desired MiddleRow2BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setMiddleRow2BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW2BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the MiddleRow2BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_MIDDLE_ROW2BUCKLE_BELTED value
     */
    getMiddleRow2BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW2BUCKLE_BELTED);
    }

    /**
     * Set the MiddleRow3BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw3mBckl_D_Ltchd". See VehicleDataEventStatus. - The desired MiddleRow3BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setMiddleRow3BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW3BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the MiddleRow3BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_MIDDLE_ROW3BUCKLE_BELTED value
     */
    getMiddleRow3BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW3BUCKLE_BELTED);
    }

    /**
     * Set the LeftRow3BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw3lBckl_D_Ltchd". See VehicleDataEventStatus. - The desired LeftRow3BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setLeftRow3BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_LEFT_ROW3BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the LeftRow3BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_LEFT_ROW3BUCKLE_BELTED value
     */
    getLeftRow3BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_LEFT_ROW3BUCKLE_BELTED);
    }

    /**
     * Set the RightRow3BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw3rBckl_D_Ltchd". See VehicleDataEventStatus. - The desired RightRow3BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setRightRow3BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_RIGHT_ROW3BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the RightRow3BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_RIGHT_ROW3BUCKLE_BELTED value
     */
    getRightRow3BuckleBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_RIGHT_ROW3BUCKLE_BELTED);
    }

    /**
     * Set the LeftRearInflatableBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2lRib_D_Ltchd". See VehicleDataEventStatus. - The desired LeftRearInflatableBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setLeftRearInflatableBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_LEFT_REAR_INFLATABLE_BELTED, belted);
        return this;
    }

    /**
     * Get the LeftRearInflatableBelted
     * @returns {VehicleDataEventStatus} - the KEY_LEFT_REAR_INFLATABLE_BELTED value
     */
    getLeftRearInflatableBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_LEFT_REAR_INFLATABLE_BELTED);
    }

    /**
     * Set the RightRearInflatableBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw2rRib_D_Ltchd". See VehicleDataEventStatus. - The desired RightRearInflatableBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setRightRearInflatableBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_RIGHT_REAR_INFLATABLE_BELTED, belted);
        return this;
    }

    /**
     * Get the RightRearInflatableBelted
     * @returns {VehicleDataEventStatus} - the KEY_RIGHT_REAR_INFLATABLE_BELTED value
     */
    getRightRearInflatableBelted () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_RIGHT_REAR_INFLATABLE_BELTED);
    }

    /**
     * Set the MiddleRow1BeltDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsRw1mBelt_D_Ltchd". See VehicleDataEventStatus. - The desired MiddleRow1BeltDeployed.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setMiddleRow1BeltDeployed (deployed) {
        this.validateType(VehicleDataEventStatus, deployed);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW1BELT_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the MiddleRow1BeltDeployed
     * @returns {VehicleDataEventStatus} - the KEY_MIDDLE_ROW1BELT_DEPLOYED value
     */
    getMiddleRow1BeltDeployed () {
        return this.getObject(VehicleDataEventStatus, BeltStatus.KEY_MIDDLE_ROW1BELT_DEPLOYED);
    }

    /**
     * Set the MiddleRow1BuckleBelted
     * @param {VehicleDataEventStatus} belted - References signal "VedsRw1mBckl_D_Ltchd". See VehicleDataEventStatus. - The desired MiddleRow1BuckleBelted.
     * @returns {BeltStatus} - The class instance for method chaining.
     */
    setMiddleRow1BuckleBelted (belted) {
        this.validateType(VehicleDataEventStatus, belted);
        this.setParameter(BeltStatus.KEY_MIDDLE_ROW1BUCKLE_BELTED, belted);
        return this;
    }

    /**
     * Get the MiddleRow1BuckleBelted
     * @returns {VehicleDataEventStatus} - the KEY_MIDDLE_ROW1BUCKLE_BELTED value
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