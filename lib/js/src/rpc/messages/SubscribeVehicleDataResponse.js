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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcResponse } from '../RpcResponse.js';
import { VehicleDataResult } from '../structs/VehicleDataResult.js';

class SubscribeVehicleDataResponse extends RpcResponse {
    /**
     * Initalizes an instance of SubscribeVehicleDataResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.SubscribeVehicleData);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * Sets a value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @param {VehicleDataResult} vehicleDataState - The value associated with the custom vehicle data.
     * @returns {SubscribeVehicleDataResponse} - The class instance to support method chaining.
     */
    setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
        this.setParameter(vehicleDataName, vehicleDataState);
        return this;
    }

    /**
     * Gets a VehicleData value for the vehicle data item.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @returns {VehicleDataResult} - The value associated with the custom vehicle data.
     */
    getOEMCustomVehicleData (vehicleDataName) {
        return this.getObject(VehicleDataResult, vehicleDataName);
    }

    // ----------------- END -----------------------

    /**
     * Set the Gps
     * @param {VehicleDataResult} gps - See GPSData - The desired Gps.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setGps (gps) {
        this._validateType(VehicleDataResult, gps);
        this.setParameter(SubscribeVehicleDataResponse.KEY_GPS, gps);
        return this;
    }

    /**
     * Get the Gps
     * @returns {VehicleDataResult} - the KEY_GPS value
     */
    getGps () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_GPS);
    }

    /**
     * Set the Speed
     * @param {VehicleDataResult} speed - The vehicle speed in kilometers per hour - The desired Speed.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this._validateType(VehicleDataResult, speed);
        this.setParameter(SubscribeVehicleDataResponse.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {VehicleDataResult} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_SPEED);
    }

    /**
     * Set the Rpm
     * @param {VehicleDataResult} rpm - The number of revolutions per minute of the engine - The desired Rpm.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setRpm (rpm) {
        this._validateType(VehicleDataResult, rpm);
        this.setParameter(SubscribeVehicleDataResponse.KEY_RPM, rpm);
        return this;
    }

    /**
     * Get the Rpm
     * @returns {VehicleDataResult} - the KEY_RPM value
     */
    getRpm () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_RPM);
    }

    /**
     * Set the FuelLevel
     * @param {VehicleDataResult} level - The fuel level in the tank (percentage) - The desired FuelLevel.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelLevel (level) {
        this._validateType(VehicleDataResult, level);
        this.setParameter(SubscribeVehicleDataResponse.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * Get the FuelLevel
     * @returns {VehicleDataResult} - the KEY_FUEL_LEVEL value
     */
    getFuelLevel () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_FUEL_LEVEL);
    }

    /**
     * Set the FuelLevel_State
     * @param {VehicleDataResult} level_state - The fuel level state - The desired FuelLevel_State.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelLevel_State (level_state) {
        this._validateType(VehicleDataResult, level_state);
        this.setParameter(SubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * Get the FuelLevel_State
     * @returns {VehicleDataResult} - the KEY_FUEL_LEVEL_STATE value
     */
    getFuelLevel_State () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * Set the InstantFuelConsumption
     * @param {VehicleDataResult} consumption - The instantaneous fuel consumption in microlitres - The desired InstantFuelConsumption.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setInstantFuelConsumption (consumption) {
        this._validateType(VehicleDataResult, consumption);
        this.setParameter(SubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * Get the InstantFuelConsumption
     * @returns {VehicleDataResult} - the KEY_INSTANT_FUEL_CONSUMPTION value
     */
    getInstantFuelConsumption () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * Set the FuelRange
     * @param {VehicleDataResult} range - The estimate range in KM the vehicle can travel based on fuel level and - The desired FuelRange.
     * consumption
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelRange (range) {
        this._validateType(VehicleDataResult, range);
        this.setParameter(SubscribeVehicleDataResponse.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * Get the FuelRange
     * @returns {VehicleDataResult} - the KEY_FUEL_RANGE value
     */
    getFuelRange () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_FUEL_RANGE);
    }

    /**
     * Set the ExternalTemperature
     * @param {VehicleDataResult} temperature - The external temperature in degrees celsius. - The desired ExternalTemperature.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this._validateType(VehicleDataResult, temperature);
        this.setParameter(SubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @returns {VehicleDataResult} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the TurnSignal
     * @param {VehicleDataResult} signal - See TurnSignal - The desired TurnSignal.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setTurnSignal (signal) {
        this._validateType(VehicleDataResult, signal);
        this.setParameter(SubscribeVehicleDataResponse.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * Get the TurnSignal
     * @returns {VehicleDataResult} - the KEY_TURN_SIGNAL value
     */
    getTurnSignal () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_TURN_SIGNAL);
    }

    /**
     * Set the Prndl
     * @param {VehicleDataResult} prndl - See PRNDL - The desired Prndl.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setPrndl (prndl) {
        this._validateType(VehicleDataResult, prndl);
        this.setParameter(SubscribeVehicleDataResponse.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * Get the Prndl
     * @returns {VehicleDataResult} - the KEY_PRNDL value
     */
    getPrndl () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_PRNDL);
    }

    /**
     * Set the TirePressure
     * @param {VehicleDataResult} pressure - See TireStatus - The desired TirePressure.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setTirePressure (pressure) {
        this._validateType(VehicleDataResult, pressure);
        this.setParameter(SubscribeVehicleDataResponse.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the TirePressure
     * @returns {VehicleDataResult} - the KEY_TIRE_PRESSURE value
     */
    getTirePressure () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_TIRE_PRESSURE);
    }

    /**
     * Set the Odometer
     * @param {VehicleDataResult} odometer - Odometer in km - The desired Odometer.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setOdometer (odometer) {
        this._validateType(VehicleDataResult, odometer);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * Get the Odometer
     * @returns {VehicleDataResult} - the KEY_ODOMETER value
     */
    getOdometer () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ODOMETER);
    }

    /**
     * Set the BeltStatus
     * @param {VehicleDataResult} status - The status of the seat belts - The desired BeltStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setBeltStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * Get the BeltStatus
     * @returns {VehicleDataResult} - the KEY_BELT_STATUS value
     */
    getBeltStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_BELT_STATUS);
    }

    /**
     * Set the BodyInformation
     * @param {VehicleDataResult} information - The body information including power modes - The desired BodyInformation.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setBodyInformation (information) {
        this._validateType(VehicleDataResult, information);
        this.setParameter(SubscribeVehicleDataResponse.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * Get the BodyInformation
     * @returns {VehicleDataResult} - the KEY_BODY_INFORMATION value
     */
    getBodyInformation () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_BODY_INFORMATION);
    }

    /**
     * Set the DeviceStatus
     * @param {VehicleDataResult} status - The device status including signal and battery strength - The desired DeviceStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setDeviceStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * Get the DeviceStatus
     * @returns {VehicleDataResult} - the KEY_DEVICE_STATUS value
     */
    getDeviceStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_DEVICE_STATUS);
    }

    /**
     * Set the DriverBraking
     * @param {VehicleDataResult} braking - The status of the brake pedal - The desired DriverBraking.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setDriverBraking (braking) {
        this._validateType(VehicleDataResult, braking);
        this.setParameter(SubscribeVehicleDataResponse.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * Get the DriverBraking
     * @returns {VehicleDataResult} - the KEY_DRIVER_BRAKING value
     */
    getDriverBraking () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_DRIVER_BRAKING);
    }

    /**
     * Set the WiperStatus
     * @param {VehicleDataResult} status - The status of the wipers - The desired WiperStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setWiperStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * Get the WiperStatus
     * @returns {VehicleDataResult} - the KEY_WIPER_STATUS value
     */
    getWiperStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_WIPER_STATUS);
    }

    /**
     * Set the HeadLampStatus
     * @param {VehicleDataResult} status - Status of the head lamps - The desired HeadLampStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setHeadLampStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * Get the HeadLampStatus
     * @returns {VehicleDataResult} - the KEY_HEAD_LAMP_STATUS value
     */
    getHeadLampStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * Set the EngineTorque
     * @param {VehicleDataResult} torque - Torque value for engine (in Nm) on non-diesel variants - The desired EngineTorque.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setEngineTorque (torque) {
        this._validateType(VehicleDataResult, torque);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * Get the EngineTorque
     * @returns {VehicleDataResult} - the KEY_ENGINE_TORQUE value
     */
    getEngineTorque () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ENGINE_TORQUE);
    }

    /**
     * Set the AccPedalPosition
     * @param {VehicleDataResult} position - Accelerator pedal position (percentage depressed) - The desired AccPedalPosition.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setAccPedalPosition (position) {
        this._validateType(VehicleDataResult, position);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * Get the AccPedalPosition
     * @returns {VehicleDataResult} - the KEY_ACC_PEDAL_POSITION value
     */
    getAccPedalPosition () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * Set the SteeringWheelAngle
     * @param {VehicleDataResult} angle - Current angle of the steering wheel (in deg) - The desired SteeringWheelAngle.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setSteeringWheelAngle (angle) {
        this._validateType(VehicleDataResult, angle);
        this.setParameter(SubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * Get the SteeringWheelAngle
     * @returns {VehicleDataResult} - the KEY_STEERING_WHEEL_ANGLE value
     */
    getSteeringWheelAngle () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * Set the EngineOilLife
     * @param {VehicleDataResult} life - The estimated percentage of remaining oil life of the engine. - The desired EngineOilLife.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setEngineOilLife (life) {
        this._validateType(VehicleDataResult, life);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * Get the EngineOilLife
     * @returns {VehicleDataResult} - the KEY_ENGINE_OIL_LIFE value
     */
    getEngineOilLife () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * Set the ElectronicParkBrakeStatus
     * @param {VehicleDataResult} status - The status of the park brake as provided by Electric Park Brake (EPB) system. - The desired ElectronicParkBrakeStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setElectronicParkBrakeStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * Get the ElectronicParkBrakeStatus
     * @returns {VehicleDataResult} - the KEY_ELECTRONIC_PARK_BRAKE_STATUS value
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * Set the CloudAppVehicleID
     * @param {VehicleDataResult} id - Parameter used by cloud apps to identify a head unit - The desired CloudAppVehicleID.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setCloudAppVehicleID (id) {
        this._validateType(VehicleDataResult, id);
        this.setParameter(SubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * Get the CloudAppVehicleID
     * @returns {VehicleDataResult} - the KEY_CLOUD_APP_VEHICLE_ID value
     */
    getCloudAppVehicleID () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * Set the StabilityControlsStatus
     * @param {VehicleDataResult} status - See StabilityControlsStatus - The desired StabilityControlsStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setStabilityControlsStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS, status);
        return this;
    }

    /**
     * Get the StabilityControlsStatus
     * @returns {VehicleDataResult} - the KEY_STABILITY_CONTROLS_STATUS value
     */
    getStabilityControlsStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS);
    }

    /**
     * Set the ECallInfo
     * @param {VehicleDataResult} info - Emergency Call notification and confirmation data - The desired ECallInfo.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setECallInfo (info) {
        this._validateType(VehicleDataResult, info);
        this.setParameter(SubscribeVehicleDataResponse.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * Get the ECallInfo
     * @returns {VehicleDataResult} - the KEY_E_CALL_INFO value
     */
    getECallInfo () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_E_CALL_INFO);
    }

    /**
     * Set the AirbagStatus
     * @param {VehicleDataResult} status - The status of the air bags - The desired AirbagStatus.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setAirbagStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * Get the AirbagStatus
     * @returns {VehicleDataResult} - the KEY_AIRBAG_STATUS value
     */
    getAirbagStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_AIRBAG_STATUS);
    }

    /**
     * Set the EmergencyEvent
     * @param {VehicleDataResult} event - Information related to an emergency event (and if it occurred) - The desired EmergencyEvent.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setEmergencyEvent (event) {
        this._validateType(VehicleDataResult, event);
        this.setParameter(SubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * Get the EmergencyEvent
     * @returns {VehicleDataResult} - the KEY_EMERGENCY_EVENT value
     */
    getEmergencyEvent () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT);
    }

    /**
     * Set the ClusterModes
     * @param {VehicleDataResult} modes - The status modes of the cluster - The desired ClusterModes.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setClusterModes (modes) {
        this._validateType(VehicleDataResult, modes);
        this.setParameter(SubscribeVehicleDataResponse.KEY_CLUSTER_MODES, modes);
        return this;
    }

    /**
     * Get the ClusterModes
     * @returns {VehicleDataResult} - the KEY_CLUSTER_MODES value
     */
    getClusterModes () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_CLUSTER_MODES);
    }

    /**
     * Set the MyKey
     * @param {VehicleDataResult} key - Information related to the MyKey feature - The desired MyKey.
     * @returns {SubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setMyKey (key) {
        this._validateType(VehicleDataResult, key);
        this.setParameter(SubscribeVehicleDataResponse.KEY_MY_KEY, key);
        return this;
    }

    /**
     * Get the MyKey
     * @returns {VehicleDataResult} - the KEY_MY_KEY value
     */
    getMyKey () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_MY_KEY);
    }
}

SubscribeVehicleDataResponse.KEY_GPS = 'gps';
SubscribeVehicleDataResponse.KEY_SPEED = 'speed';
SubscribeVehicleDataResponse.KEY_RPM = 'rpm';
SubscribeVehicleDataResponse.KEY_FUEL_LEVEL = 'fuelLevel';
SubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
SubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
SubscribeVehicleDataResponse.KEY_FUEL_RANGE = 'fuelRange';
SubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
SubscribeVehicleDataResponse.KEY_TURN_SIGNAL = 'turnSignal';
SubscribeVehicleDataResponse.KEY_PRNDL = 'prndl';
SubscribeVehicleDataResponse.KEY_TIRE_PRESSURE = 'tirePressure';
SubscribeVehicleDataResponse.KEY_ODOMETER = 'odometer';
SubscribeVehicleDataResponse.KEY_BELT_STATUS = 'beltStatus';
SubscribeVehicleDataResponse.KEY_BODY_INFORMATION = 'bodyInformation';
SubscribeVehicleDataResponse.KEY_DEVICE_STATUS = 'deviceStatus';
SubscribeVehicleDataResponse.KEY_DRIVER_BRAKING = 'driverBraking';
SubscribeVehicleDataResponse.KEY_WIPER_STATUS = 'wiperStatus';
SubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
SubscribeVehicleDataResponse.KEY_ENGINE_TORQUE = 'engineTorque';
SubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
SubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
SubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
SubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
SubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
SubscribeVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS = 'stabilityControlsStatus';
SubscribeVehicleDataResponse.KEY_E_CALL_INFO = 'eCallInfo';
SubscribeVehicleDataResponse.KEY_AIRBAG_STATUS = 'airbagStatus';
SubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT = 'emergencyEvent';
SubscribeVehicleDataResponse.KEY_CLUSTER_MODES = 'clusterModes';
SubscribeVehicleDataResponse.KEY_MY_KEY = 'myKey';

export { SubscribeVehicleDataResponse };