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

class AirbagStatus extends RpcStruct {
    /**
     * Initalizes an instance of AirbagStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the DriverAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsDrvBag_D_Ltchd". See VehicleDataEventStatus. - The desired DriverAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setDriverAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_DRIVER_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the DriverAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_AIRBAG_DEPLOYED value
     */
    getDriverAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_DRIVER_AIRBAG_DEPLOYED);
    }

    /**
     * Set the DriverSideAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsDrvSideBag_D_Ltchd". See VehicleDataEventStatus. - The desired DriverSideAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setDriverSideAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_DRIVER_SIDE_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the DriverSideAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_SIDE_AIRBAG_DEPLOYED value
     */
    getDriverSideAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_DRIVER_SIDE_AIRBAG_DEPLOYED);
    }

    /**
     * Set the DriverCurtainAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsDrvCrtnBag_D_Ltchd". See VehicleDataEventStatus. - The desired DriverCurtainAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setDriverCurtainAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_DRIVER_CURTAIN_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the DriverCurtainAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_CURTAIN_AIRBAG_DEPLOYED value
     */
    getDriverCurtainAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_DRIVER_CURTAIN_AIRBAG_DEPLOYED);
    }

    /**
     * Set the PassengerAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsPasBag_D_Ltchd". See VehicleDataEventStatus. - The desired PassengerAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setPassengerAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_PASSENGER_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the PassengerAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_AIRBAG_DEPLOYED value
     */
    getPassengerAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_PASSENGER_AIRBAG_DEPLOYED);
    }

    /**
     * Set the PassengerCurtainAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsPasCrtnBag_D_Ltchd". See VehicleDataEventStatus. - The desired PassengerCurtainAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setPassengerCurtainAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_PASSENGER_CURTAIN_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the PassengerCurtainAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_CURTAIN_AIRBAG_DEPLOYED value
     */
    getPassengerCurtainAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_PASSENGER_CURTAIN_AIRBAG_DEPLOYED);
    }

    /**
     * Set the DriverKneeAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsKneeDrvBag_D_Ltchd". See VehicleDataEventStatus. - The desired DriverKneeAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setDriverKneeAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_DRIVER_KNEE_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the DriverKneeAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_KNEE_AIRBAG_DEPLOYED value
     */
    getDriverKneeAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_DRIVER_KNEE_AIRBAG_DEPLOYED);
    }

    /**
     * Set the PassengerSideAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsPasSideBag_D_Ltchd". See VehicleDataEventStatus. - The desired PassengerSideAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setPassengerSideAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_PASSENGER_SIDE_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the PassengerSideAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_SIDE_AIRBAG_DEPLOYED value
     */
    getPassengerSideAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_PASSENGER_SIDE_AIRBAG_DEPLOYED);
    }

    /**
     * Set the PassengerKneeAirbagDeployed
     * @param {VehicleDataEventStatus} deployed - References signal "VedsKneePasBag_D_Ltchd". See VehicleDataEventStatus. - The desired PassengerKneeAirbagDeployed.
     * @returns {AirbagStatus} - The class instance for method chaining.
     */
    setPassengerKneeAirbagDeployed (deployed) {
        this._validateType(VehicleDataEventStatus, deployed);
        this.setParameter(AirbagStatus.KEY_PASSENGER_KNEE_AIRBAG_DEPLOYED, deployed);
        return this;
    }

    /**
     * Get the PassengerKneeAirbagDeployed
     * @returns {VehicleDataEventStatus} - the KEY_PASSENGER_KNEE_AIRBAG_DEPLOYED value
     */
    getPassengerKneeAirbagDeployed () {
        return this.getObject(VehicleDataEventStatus, AirbagStatus.KEY_PASSENGER_KNEE_AIRBAG_DEPLOYED);
    }
}

AirbagStatus.KEY_DRIVER_AIRBAG_DEPLOYED = 'driverAirbagDeployed';
AirbagStatus.KEY_DRIVER_SIDE_AIRBAG_DEPLOYED = 'driverSideAirbagDeployed';
AirbagStatus.KEY_DRIVER_CURTAIN_AIRBAG_DEPLOYED = 'driverCurtainAirbagDeployed';
AirbagStatus.KEY_PASSENGER_AIRBAG_DEPLOYED = 'passengerAirbagDeployed';
AirbagStatus.KEY_PASSENGER_CURTAIN_AIRBAG_DEPLOYED = 'passengerCurtainAirbagDeployed';
AirbagStatus.KEY_DRIVER_KNEE_AIRBAG_DEPLOYED = 'driverKneeAirbagDeployed';
AirbagStatus.KEY_PASSENGER_SIDE_AIRBAG_DEPLOYED = 'passengerSideAirbagDeployed';
AirbagStatus.KEY_PASSENGER_KNEE_AIRBAG_DEPLOYED = 'passengerKneeAirbagDeployed';

export { AirbagStatus };