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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcResponse } from '../RpcResponse.js';
import { VehicleDataResult } from '../structs/VehicleDataResult.js';

class UnsubscribeVehicleDataResponse extends RpcResponse {
    /**
     * Initializes an instance of UnsubscribeVehicleDataResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.UnsubscribeVehicleData);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * Sets a value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @param {VehicleDataResult} vehicleDataState - The value associated with the custom vehicle data.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance to support method chaining.
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
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setGps (gps) {
        this._validateType(VehicleDataResult, gps);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_GPS, gps);
        return this;
    }

    /**
     * Get the Gps
     * @returns {VehicleDataResult} - the KEY_GPS value
     */
    getGps () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_GPS);
    }

    /**
     * Set the Speed
     * @param {VehicleDataResult} speed - The vehicle speed in kilometers per hour - The desired Speed.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this._validateType(VehicleDataResult, speed);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {VehicleDataResult} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_SPEED);
    }

    /**
     * Set the Rpm
     * @param {VehicleDataResult} rpm - The number of revolutions per minute of the engine - The desired Rpm.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setRpm (rpm) {
        this._validateType(VehicleDataResult, rpm);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_RPM, rpm);
        return this;
    }

    /**
     * Get the Rpm
     * @returns {VehicleDataResult} - the KEY_RPM value
     */
    getRpm () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_RPM);
    }

    /**
     * Set the FuelLevel
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} level - The fuel level in the tank (percentage). This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelLevel (level) {
        this._validateType(VehicleDataResult, level);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * Get the FuelLevel
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {VehicleDataResult} - the KEY_FUEL_LEVEL value
     */
    getFuelLevel () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_FUEL_LEVEL);
    }

    /**
     * Set the FuelLevel_State
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} level_state - The fuel level state. This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel_State.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelLevel_State (level_state) {
        this._validateType(VehicleDataResult, level_state);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * Get the FuelLevel_State
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {VehicleDataResult} - the KEY_FUEL_LEVEL_STATE value
     */
    getFuelLevel_State () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * Set the InstantFuelConsumption
     * @param {VehicleDataResult} consumption - The instantaneous fuel consumption in microlitres - The desired InstantFuelConsumption.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setInstantFuelConsumption (consumption) {
        this._validateType(VehicleDataResult, consumption);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * Get the InstantFuelConsumption
     * @returns {VehicleDataResult} - the KEY_INSTANT_FUEL_CONSUMPTION value
     */
    getInstantFuelConsumption () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * Set the FuelRange
     * @since SmartDeviceLink 5.0.0
     * @param {VehicleDataResult} range - The fuel type, estimated range in KM, fuel level/capacity and fuel level state for the vehicle. See struct FuelRange for details. - The desired FuelRange.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelRange (range) {
        this._validateType(VehicleDataResult, range);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * Get the FuelRange
     * @returns {VehicleDataResult} - the KEY_FUEL_RANGE value
     */
    getFuelRange () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_FUEL_RANGE);
    }

    /**
     * Set the ClimateData
     * @since SmartDeviceLink 7.1.0
     * @param {VehicleDataResult} data - See ClimateData - The desired ClimateData.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setClimateData (data) {
        this._validateType(VehicleDataResult, data);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_CLIMATE_DATA, data);
        return this;
    }

    /**
     * Get the ClimateData
     * @returns {VehicleDataResult} - the KEY_CLIMATE_DATA value
     */
    getClimateData () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_CLIMATE_DATA);
    }

    /**
     * Set the ExternalTemperature
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {VehicleDataResult} temperature - The external temperature in degrees celsius. This parameter is deprecated starting RPC Spec 7.1, please see climateData. - The desired ExternalTemperature.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this._validateType(VehicleDataResult, temperature);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @returns {VehicleDataResult} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the TurnSignal
     * @since SmartDeviceLink 5.0.0
     * @param {VehicleDataResult} signal - See TurnSignal - The desired TurnSignal.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setTurnSignal (signal) {
        this._validateType(VehicleDataResult, signal);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * Get the TurnSignal
     * @returns {VehicleDataResult} - the KEY_TURN_SIGNAL value
     */
    getTurnSignal () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_TURN_SIGNAL);
    }

    /**
     * Set the GearStatus
     * @since SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} status - See GearStatus - The desired GearStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setGearStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_GEAR_STATUS, status);
        return this;
    }

    /**
     * Get the GearStatus
     * @returns {VehicleDataResult} - the KEY_GEAR_STATUS value
     */
    getGearStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_GEAR_STATUS);
    }

    /**
     * Set the Prndl
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} prndl - See PRNDL. This parameter is deprecated and it is now covered in `gearStatus` - The desired Prndl.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setPrndl (prndl) {
        this._validateType(VehicleDataResult, prndl);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * Get the Prndl
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {VehicleDataResult} - the KEY_PRNDL value
     */
    getPrndl () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_PRNDL);
    }

    /**
     * Set the TirePressure
     * @param {VehicleDataResult} pressure - See TireStatus - The desired TirePressure.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setTirePressure (pressure) {
        this._validateType(VehicleDataResult, pressure);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the TirePressure
     * @returns {VehicleDataResult} - the KEY_TIRE_PRESSURE value
     */
    getTirePressure () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_TIRE_PRESSURE);
    }

    /**
     * Set the Odometer
     * @param {VehicleDataResult} odometer - Odometer in km - The desired Odometer.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setOdometer (odometer) {
        this._validateType(VehicleDataResult, odometer);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * Get the Odometer
     * @returns {VehicleDataResult} - the KEY_ODOMETER value
     */
    getOdometer () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_ODOMETER);
    }

    /**
     * Set the BeltStatus
     * @param {VehicleDataResult} status - The status of the seat belts - The desired BeltStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setBeltStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * Get the BeltStatus
     * @returns {VehicleDataResult} - the KEY_BELT_STATUS value
     */
    getBeltStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_BELT_STATUS);
    }

    /**
     * Set the BodyInformation
     * @param {VehicleDataResult} information - The body information including power modes - The desired BodyInformation.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setBodyInformation (information) {
        this._validateType(VehicleDataResult, information);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * Get the BodyInformation
     * @returns {VehicleDataResult} - the KEY_BODY_INFORMATION value
     */
    getBodyInformation () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_BODY_INFORMATION);
    }

    /**
     * Set the DeviceStatus
     * @param {VehicleDataResult} status - The device status including signal and battery strength - The desired DeviceStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setDeviceStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * Get the DeviceStatus
     * @returns {VehicleDataResult} - the KEY_DEVICE_STATUS value
     */
    getDeviceStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_DEVICE_STATUS);
    }

    /**
     * Set the DriverBraking
     * @param {VehicleDataResult} braking - The status of the brake pedal - The desired DriverBraking.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setDriverBraking (braking) {
        this._validateType(VehicleDataResult, braking);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * Get the DriverBraking
     * @returns {VehicleDataResult} - the KEY_DRIVER_BRAKING value
     */
    getDriverBraking () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_DRIVER_BRAKING);
    }

    /**
     * Set the WiperStatus
     * @param {VehicleDataResult} status - The status of the wipers - The desired WiperStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setWiperStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * Get the WiperStatus
     * @returns {VehicleDataResult} - the KEY_WIPER_STATUS value
     */
    getWiperStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_WIPER_STATUS);
    }

    /**
     * Set the HeadLampStatus
     * @param {VehicleDataResult} status - Status of the head lamps - The desired HeadLampStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setHeadLampStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * Get the HeadLampStatus
     * @returns {VehicleDataResult} - the KEY_HEAD_LAMP_STATUS value
     */
    getHeadLampStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * Set the EngineTorque
     * @param {VehicleDataResult} torque - Torque value for engine (in Nm) on non-diesel variants - The desired EngineTorque.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setEngineTorque (torque) {
        this._validateType(VehicleDataResult, torque);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * Get the EngineTorque
     * @returns {VehicleDataResult} - the KEY_ENGINE_TORQUE value
     */
    getEngineTorque () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_ENGINE_TORQUE);
    }

    /**
     * Set the AccPedalPosition
     * @param {VehicleDataResult} position - Accelerator pedal position (percentage depressed) - The desired AccPedalPosition.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setAccPedalPosition (position) {
        this._validateType(VehicleDataResult, position);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * Get the AccPedalPosition
     * @returns {VehicleDataResult} - the KEY_ACC_PEDAL_POSITION value
     */
    getAccPedalPosition () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * Set the SteeringWheelAngle
     * @param {VehicleDataResult} angle - Current angle of the steering wheel (in deg) - The desired SteeringWheelAngle.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setSteeringWheelAngle (angle) {
        this._validateType(VehicleDataResult, angle);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * Get the SteeringWheelAngle
     * @returns {VehicleDataResult} - the KEY_STEERING_WHEEL_ANGLE value
     */
    getSteeringWheelAngle () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * Set the EngineOilLife
     * @since SmartDeviceLink 5.0.0
     * @param {VehicleDataResult} life - The estimated percentage of remaining oil life of the engine. - The desired EngineOilLife.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setEngineOilLife (life) {
        this._validateType(VehicleDataResult, life);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * Get the EngineOilLife
     * @returns {VehicleDataResult} - the KEY_ENGINE_OIL_LIFE value
     */
    getEngineOilLife () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * Set the ElectronicParkBrakeStatus
     * @since SmartDeviceLink 5.0.0
     * @param {VehicleDataResult} status - The status of the park brake as provided by Electric Park Brake (EPB) system. - The desired ElectronicParkBrakeStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setElectronicParkBrakeStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * Get the ElectronicParkBrakeStatus
     * @returns {VehicleDataResult} - the KEY_ELECTRONIC_PARK_BRAKE_STATUS value
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * Set the CloudAppVehicleID
     * @since SmartDeviceLink 5.1.0
     * @param {VehicleDataResult} id - Parameter used by cloud apps to identify a head unit - The desired CloudAppVehicleID.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setCloudAppVehicleID (id) {
        this._validateType(VehicleDataResult, id);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * Get the CloudAppVehicleID
     * @returns {VehicleDataResult} - the KEY_CLOUD_APP_VEHICLE_ID value
     */
    getCloudAppVehicleID () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * Set the StabilityControlsStatus
     * @since SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} status - See StabilityControlsStatus - The desired StabilityControlsStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setStabilityControlsStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS, status);
        return this;
    }

    /**
     * Get the StabilityControlsStatus
     * @returns {VehicleDataResult} - the KEY_STABILITY_CONTROLS_STATUS value
     */
    getStabilityControlsStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS);
    }

    /**
     * Set the ECallInfo
     * @param {VehicleDataResult} info - Emergency Call notification and confirmation data - The desired ECallInfo.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setECallInfo (info) {
        this._validateType(VehicleDataResult, info);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * Get the ECallInfo
     * @returns {VehicleDataResult} - the KEY_E_CALL_INFO value
     */
    getECallInfo () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_E_CALL_INFO);
    }

    /**
     * Set the AirbagStatus
     * @param {VehicleDataResult} status - The status of the air bags - The desired AirbagStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setAirbagStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * Get the AirbagStatus
     * @returns {VehicleDataResult} - the KEY_AIRBAG_STATUS value
     */
    getAirbagStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_AIRBAG_STATUS);
    }

    /**
     * Set the EmergencyEvent
     * @param {VehicleDataResult} event - Information related to an emergency event (and if it occurred) - The desired EmergencyEvent.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setEmergencyEvent (event) {
        this._validateType(VehicleDataResult, event);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * Get the EmergencyEvent
     * @returns {VehicleDataResult} - the KEY_EMERGENCY_EVENT value
     */
    getEmergencyEvent () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT);
    }

    /**
     * Set the ClusterModes
     * @param {VehicleDataResult} modes - The status modes of the cluster - The desired ClusterModes.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setClusterModes (modes) {
        this._validateType(VehicleDataResult, modes);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_CLUSTER_MODES, modes);
        return this;
    }

    /**
     * Get the ClusterModes
     * @returns {VehicleDataResult} - the KEY_CLUSTER_MODES value
     */
    getClusterModes () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_CLUSTER_MODES);
    }

    /**
     * Set the MyKey
     * @param {VehicleDataResult} key - Information related to the MyKey feature - The desired MyKey.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setMyKey (key) {
        this._validateType(VehicleDataResult, key);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_MY_KEY, key);
        return this;
    }

    /**
     * Get the MyKey
     * @returns {VehicleDataResult} - the KEY_MY_KEY value
     */
    getMyKey () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_MY_KEY);
    }

    /**
     * Set the WindowStatus
     * @since SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} status - See WindowStatus - The desired WindowStatus.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setWindowStatus (status) {
        this._validateType(VehicleDataResult, status);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_WINDOW_STATUS, status);
        return this;
    }

    /**
     * Get the WindowStatus
     * @returns {VehicleDataResult} - the KEY_WINDOW_STATUS value
     */
    getWindowStatus () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_WINDOW_STATUS);
    }

    /**
     * Set the HandsOffSteering
     * @since SmartDeviceLink 7.0.0
     * @param {VehicleDataResult} steering - To indicate whether driver hands are off the steering wheel - The desired HandsOffSteering.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setHandsOffSteering (steering) {
        this._validateType(VehicleDataResult, steering);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_HANDS_OFF_STEERING, steering);
        return this;
    }

    /**
     * Get the HandsOffSteering
     * @returns {VehicleDataResult} - the KEY_HANDS_OFF_STEERING value
     */
    getHandsOffSteering () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_HANDS_OFF_STEERING);
    }

    /**
     * Set the SeatOccupancy
     * @since SmartDeviceLink 7.1.0
     * @param {VehicleDataResult} occupancy - See SeatOccupancy - The desired SeatOccupancy.
     * @returns {UnsubscribeVehicleDataResponse} - The class instance for method chaining.
     */
    setSeatOccupancy (occupancy) {
        this._validateType(VehicleDataResult, occupancy);
        this.setParameter(UnsubscribeVehicleDataResponse.KEY_SEAT_OCCUPANCY, occupancy);
        return this;
    }

    /**
     * Get the SeatOccupancy
     * @returns {VehicleDataResult} - the KEY_SEAT_OCCUPANCY value
     */
    getSeatOccupancy () {
        return this.getObject(VehicleDataResult, UnsubscribeVehicleDataResponse.KEY_SEAT_OCCUPANCY);
    }
}

UnsubscribeVehicleDataResponse.KEY_GPS = 'gps';
UnsubscribeVehicleDataResponse.KEY_SPEED = 'speed';
UnsubscribeVehicleDataResponse.KEY_RPM = 'rpm';
UnsubscribeVehicleDataResponse.KEY_FUEL_LEVEL = 'fuelLevel';
UnsubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
UnsubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
UnsubscribeVehicleDataResponse.KEY_FUEL_RANGE = 'fuelRange';
UnsubscribeVehicleDataResponse.KEY_CLIMATE_DATA = 'climateData';
UnsubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
UnsubscribeVehicleDataResponse.KEY_TURN_SIGNAL = 'turnSignal';
UnsubscribeVehicleDataResponse.KEY_GEAR_STATUS = 'gearStatus';
UnsubscribeVehicleDataResponse.KEY_PRNDL = 'prndl';
UnsubscribeVehicleDataResponse.KEY_TIRE_PRESSURE = 'tirePressure';
UnsubscribeVehicleDataResponse.KEY_ODOMETER = 'odometer';
UnsubscribeVehicleDataResponse.KEY_BELT_STATUS = 'beltStatus';
UnsubscribeVehicleDataResponse.KEY_BODY_INFORMATION = 'bodyInformation';
UnsubscribeVehicleDataResponse.KEY_DEVICE_STATUS = 'deviceStatus';
UnsubscribeVehicleDataResponse.KEY_DRIVER_BRAKING = 'driverBraking';
UnsubscribeVehicleDataResponse.KEY_WIPER_STATUS = 'wiperStatus';
UnsubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
UnsubscribeVehicleDataResponse.KEY_ENGINE_TORQUE = 'engineTorque';
UnsubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
UnsubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
UnsubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
UnsubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
UnsubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
UnsubscribeVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS = 'stabilityControlsStatus';
UnsubscribeVehicleDataResponse.KEY_E_CALL_INFO = 'eCallInfo';
UnsubscribeVehicleDataResponse.KEY_AIRBAG_STATUS = 'airbagStatus';
UnsubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT = 'emergencyEvent';
UnsubscribeVehicleDataResponse.KEY_CLUSTER_MODES = 'clusterModes';
UnsubscribeVehicleDataResponse.KEY_MY_KEY = 'myKey';
UnsubscribeVehicleDataResponse.KEY_WINDOW_STATUS = 'windowStatus';
UnsubscribeVehicleDataResponse.KEY_HANDS_OFF_STEERING = 'handsOffSteering';
UnsubscribeVehicleDataResponse.KEY_SEAT_OCCUPANCY = 'seatOccupancy';

export { UnsubscribeVehicleDataResponse };