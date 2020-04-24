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
import { RpcRequest } from '../RpcRequest.js';

/**
 * This function is used to unsubscribe the notifications from the subscribeVehicleData function.
 */
class UnsubscribeVehicleData extends RpcRequest {
    /**
     * Initalizes an instance of UnsubscribeVehicleData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.UnsubscribeVehicleData);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * Sets a boolean value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @param {Boolean} vehicleDataState - Whether or not to unsubscribe from the data.
     * @returns {UnsubscribeVehicleData} - The class instance to support method chaining.
     */
    setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
        this.setParameter(vehicleDataName, vehicleDataState);
        return this;
    }

    /**
     * Gets a boolean value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @returns {Boolean|null} - Whether or not to unsubscribe from the data.
     */
    getOemCustomVehicleData (vehicleDataName) {
        return this.getParameter(vehicleDataName);
    }

    // ----------------- END -----------------------

    /**
     * Set the Gps
     * @param {Boolean} gps - See GPSData - The desired Gps.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setGps (gps) {
        this.setParameter(UnsubscribeVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * Get the Gps
     * @returns {Boolean} - the KEY_GPS value
     */
    getGps () {
        return this.getParameter(UnsubscribeVehicleData.KEY_GPS);
    }

    /**
     * Set the Speed
     * @param {Boolean} speed - The vehicle speed in kilometers per hour - The desired Speed.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this.setParameter(UnsubscribeVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {Boolean} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getParameter(UnsubscribeVehicleData.KEY_SPEED);
    }

    /**
     * Set the Rpm
     * @param {Boolean} rpm - The number of revolutions per minute of the engine - The desired Rpm.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setRpm (rpm) {
        this.setParameter(UnsubscribeVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * Get the Rpm
     * @returns {Boolean} - the KEY_RPM value
     */
    getRpm () {
        return this.getParameter(UnsubscribeVehicleData.KEY_RPM);
    }

    /**
     * Set the FuelLevel
     * @param {Boolean} level - The fuel level in the tank (percentage) - The desired FuelLevel.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setFuelLevel (level) {
        this.setParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * Get the FuelLevel
     * @returns {Boolean} - the KEY_FUEL_LEVEL value
     */
    getFuelLevel () {
        return this.getParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * Set the FuelLevel_State
     * @param {Boolean} level_state - The fuel level state - The desired FuelLevel_State.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setFuelLevel_State (level_state) {
        this.setParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * Get the FuelLevel_State
     * @returns {Boolean} - the KEY_FUEL_LEVEL_STATE value
     */
    getFuelLevel_State () {
        return this.getParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * Set the InstantFuelConsumption
     * @param {Boolean} consumption - The instantaneous fuel consumption in microlitres - The desired InstantFuelConsumption.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(UnsubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * Get the InstantFuelConsumption
     * @returns {Boolean} - the KEY_INSTANT_FUEL_CONSUMPTION value
     */
    getInstantFuelConsumption () {
        return this.getParameter(UnsubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * Set the FuelRange
     * @param {Boolean} range - The estimate range in KM the vehicle can travel based on fuel level and consumption - The desired FuelRange.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setFuelRange (range) {
        this.setParameter(UnsubscribeVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * Get the FuelRange
     * @returns {Boolean} - the KEY_FUEL_RANGE value
     */
    getFuelRange () {
        return this.getParameter(UnsubscribeVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * Set the ExternalTemperature
     * @param {Boolean} temperature - The external temperature in degrees celsius. - The desired ExternalTemperature.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this.setParameter(UnsubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @returns {Boolean} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getParameter(UnsubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the TurnSignal
     * @param {Boolean} signal - See TurnSignal - The desired TurnSignal.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setTurnSignal (signal) {
        this.setParameter(UnsubscribeVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * Get the TurnSignal
     * @returns {Boolean} - the KEY_TURN_SIGNAL value
     */
    getTurnSignal () {
        return this.getParameter(UnsubscribeVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * Set the Prndl
     * @param {Boolean} prndl - See PRNDL - The desired Prndl.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setPrndl (prndl) {
        this.setParameter(UnsubscribeVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * Get the Prndl
     * @returns {Boolean} - the KEY_PRNDL value
     */
    getPrndl () {
        return this.getParameter(UnsubscribeVehicleData.KEY_PRNDL);
    }

    /**
     * Set the TirePressure
     * @param {Boolean} pressure - See TireStatus - The desired TirePressure.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setTirePressure (pressure) {
        this.setParameter(UnsubscribeVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the TirePressure
     * @returns {Boolean} - the KEY_TIRE_PRESSURE value
     */
    getTirePressure () {
        return this.getParameter(UnsubscribeVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * Set the Odometer
     * @param {Boolean} odometer - Odometer in km - The desired Odometer.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setOdometer (odometer) {
        this.setParameter(UnsubscribeVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * Get the Odometer
     * @returns {Boolean} - the KEY_ODOMETER value
     */
    getOdometer () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ODOMETER);
    }

    /**
     * Set the BeltStatus
     * @param {Boolean} status - The status of the seat belts - The desired BeltStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setBeltStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * Get the BeltStatus
     * @returns {Boolean} - the KEY_BELT_STATUS value
     */
    getBeltStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_BELT_STATUS);
    }

    /**
     * Set the BodyInformation
     * @param {Boolean} information - The body information including power modes - The desired BodyInformation.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setBodyInformation (information) {
        this.setParameter(UnsubscribeVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * Get the BodyInformation
     * @returns {Boolean} - the KEY_BODY_INFORMATION value
     */
    getBodyInformation () {
        return this.getParameter(UnsubscribeVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * Set the DeviceStatus
     * @param {Boolean} status - The device status including signal and battery strength - The desired DeviceStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setDeviceStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * Get the DeviceStatus
     * @returns {Boolean} - the KEY_DEVICE_STATUS value
     */
    getDeviceStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * Set the DriverBraking
     * @param {Boolean} braking - The status of the brake pedal - The desired DriverBraking.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setDriverBraking (braking) {
        this.setParameter(UnsubscribeVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * Get the DriverBraking
     * @returns {Boolean} - the KEY_DRIVER_BRAKING value
     */
    getDriverBraking () {
        return this.getParameter(UnsubscribeVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * Set the WiperStatus
     * @param {Boolean} status - The status of the wipers - The desired WiperStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setWiperStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * Get the WiperStatus
     * @returns {Boolean} - the KEY_WIPER_STATUS value
     */
    getWiperStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * Set the HeadLampStatus
     * @param {Boolean} status - Status of the head lamps - The desired HeadLampStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setHeadLampStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * Get the HeadLampStatus
     * @returns {Boolean} - the KEY_HEAD_LAMP_STATUS value
     */
    getHeadLampStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * Set the EngineTorque
     * @param {Boolean} torque - Torque value for engine (in Nm) on non-diesel variants - The desired EngineTorque.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setEngineTorque (torque) {
        this.setParameter(UnsubscribeVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * Get the EngineTorque
     * @returns {Boolean} - the KEY_ENGINE_TORQUE value
     */
    getEngineTorque () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * Set the AccPedalPosition
     * @param {Boolean} position - Accelerator pedal position (percentage depressed) - The desired AccPedalPosition.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setAccPedalPosition (position) {
        this.setParameter(UnsubscribeVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * Get the AccPedalPosition
     * @returns {Boolean} - the KEY_ACC_PEDAL_POSITION value
     */
    getAccPedalPosition () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * Set the SteeringWheelAngle
     * @param {Boolean} angle - Current angle of the steering wheel (in deg) - The desired SteeringWheelAngle.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(UnsubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * Get the SteeringWheelAngle
     * @returns {Boolean} - the KEY_STEERING_WHEEL_ANGLE value
     */
    getSteeringWheelAngle () {
        return this.getParameter(UnsubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * Set the EngineOilLife
     * @param {Boolean} life - The estimated percentage of remaining oil life of the engine. - The desired EngineOilLife.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setEngineOilLife (life) {
        this.setParameter(UnsubscribeVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * Get the EngineOilLife
     * @returns {Boolean} - the KEY_ENGINE_OIL_LIFE value
     */
    getEngineOilLife () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * Set the ElectronicParkBrakeStatus
     * @param {Boolean} status - The status of the park brake as provided by Electric Park Brake (EPB) system. - The desired ElectronicParkBrakeStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setElectronicParkBrakeStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * Get the ElectronicParkBrakeStatus
     * @returns {Boolean} - the KEY_ELECTRONIC_PARK_BRAKE_STATUS value
     */
    getElectronicParkBrakeStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * Set the CloudAppVehicleID
     * @param {Boolean} id - Parameter used by cloud apps to identify a head unit - The desired CloudAppVehicleID.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setCloudAppVehicleID (id) {
        this.setParameter(UnsubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * Get the CloudAppVehicleID
     * @returns {Boolean} - the KEY_CLOUD_APP_VEHICLE_ID value
     */
    getCloudAppVehicleID () {
        return this.getParameter(UnsubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * Set the ECallInfo
     * @param {Boolean} info - Emergency Call notification and confirmation data - The desired ECallInfo.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setECallInfo (info) {
        this.setParameter(UnsubscribeVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * Get the ECallInfo
     * @returns {Boolean} - the KEY_E_CALL_INFO value
     */
    getECallInfo () {
        return this.getParameter(UnsubscribeVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * Set the AirbagStatus
     * @param {Boolean} status - The status of the air bags - The desired AirbagStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setAirbagStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * Get the AirbagStatus
     * @returns {Boolean} - the KEY_AIRBAG_STATUS value
     */
    getAirbagStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * Set the EmergencyEvent
     * @param {Boolean} event - Information related to an emergency event (and if it occurred) - The desired EmergencyEvent.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setEmergencyEvent (event) {
        this.setParameter(UnsubscribeVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * Get the EmergencyEvent
     * @returns {Boolean} - the KEY_EMERGENCY_EVENT value
     */
    getEmergencyEvent () {
        return this.getParameter(UnsubscribeVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * Set the ClusterModeStatus
     * @param {Boolean} status - The status modes of the cluster - The desired ClusterModeStatus.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setClusterModeStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * Get the ClusterModeStatus
     * @returns {Boolean} - the KEY_CLUSTER_MODE_STATUS value
     */
    getClusterModeStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * Set the MyKey
     * @param {Boolean} key - Information related to the MyKey feature - The desired MyKey.
     * @returns {UnsubscribeVehicleData} - The class instance for method chaining.
     */
    setMyKey (key) {
        this.setParameter(UnsubscribeVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * Get the MyKey
     * @returns {Boolean} - the KEY_MY_KEY value
     */
    getMyKey () {
        return this.getParameter(UnsubscribeVehicleData.KEY_MY_KEY);
    }
}

UnsubscribeVehicleData.KEY_GPS = 'gps';
UnsubscribeVehicleData.KEY_SPEED = 'speed';
UnsubscribeVehicleData.KEY_RPM = 'rpm';
UnsubscribeVehicleData.KEY_FUEL_LEVEL = 'fuelLevel';
UnsubscribeVehicleData.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
UnsubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
UnsubscribeVehicleData.KEY_FUEL_RANGE = 'fuelRange';
UnsubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
UnsubscribeVehicleData.KEY_TURN_SIGNAL = 'turnSignal';
UnsubscribeVehicleData.KEY_PRNDL = 'prndl';
UnsubscribeVehicleData.KEY_TIRE_PRESSURE = 'tirePressure';
UnsubscribeVehicleData.KEY_ODOMETER = 'odometer';
UnsubscribeVehicleData.KEY_BELT_STATUS = 'beltStatus';
UnsubscribeVehicleData.KEY_BODY_INFORMATION = 'bodyInformation';
UnsubscribeVehicleData.KEY_DEVICE_STATUS = 'deviceStatus';
UnsubscribeVehicleData.KEY_DRIVER_BRAKING = 'driverBraking';
UnsubscribeVehicleData.KEY_WIPER_STATUS = 'wiperStatus';
UnsubscribeVehicleData.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
UnsubscribeVehicleData.KEY_ENGINE_TORQUE = 'engineTorque';
UnsubscribeVehicleData.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
UnsubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
UnsubscribeVehicleData.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
UnsubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
UnsubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
UnsubscribeVehicleData.KEY_E_CALL_INFO = 'eCallInfo';
UnsubscribeVehicleData.KEY_AIRBAG_STATUS = 'airbagStatus';
UnsubscribeVehicleData.KEY_EMERGENCY_EVENT = 'emergencyEvent';
UnsubscribeVehicleData.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
UnsubscribeVehicleData.KEY_MY_KEY = 'myKey';

export { UnsubscribeVehicleData };