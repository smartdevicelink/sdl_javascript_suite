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
 * Non periodic vehicle data read request.
 */
class GetVehicleData extends RpcRequest {
    /**
     * Initalizes an instance of GetVehicleData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetVehicleData);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * Sets a boolean value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @param {Boolean} vehicleDataState - Whether or not to retrieve the custom vehicle data.
     * @returns {GetVehicleData} - The class instance to support method chaining.
     */
    setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
        this.setParameter(vehicleDataName, vehicleDataState);
        return this;
    }

    /**
     * Gets a boolean value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @returns {Boolean|null} - Whether or not to retrieve the custom vehicle data.
     */
    getOemCustomVehicleData (vehicleDataName) {
        return this.getParameter(vehicleDataName);
    }

    // ----------------- END -----------------------

    /**
     * Set the Gps
     * @param {Boolean} gps - See GPSData - The desired Gps.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setGps (gps) {
        this.setParameter(GetVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * Get the Gps
     * @returns {Boolean} - the KEY_GPS value
     */
    getGps () {
        return this.getParameter(GetVehicleData.KEY_GPS);
    }

    /**
     * Set the Speed
     * @param {Boolean} speed - The vehicle speed in kilometers per hour - The desired Speed.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this.setParameter(GetVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {Boolean} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getParameter(GetVehicleData.KEY_SPEED);
    }

    /**
     * Set the Rpm
     * @param {Boolean} rpm - The number of revolutions per minute of the engine - The desired Rpm.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setRpm (rpm) {
        this.setParameter(GetVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * Get the Rpm
     * @returns {Boolean} - the KEY_RPM value
     */
    getRpm () {
        return this.getParameter(GetVehicleData.KEY_RPM);
    }

    /**
     * Set the FuelLevel
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {Boolean} level - The fuel level in the tank (percentage). This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setFuelLevel (level) {
        this.setParameter(GetVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * Get the FuelLevel
     * @returns {Boolean} - the KEY_FUEL_LEVEL value
     */
    getFuelLevel () {
        return this.getParameter(GetVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * Set the FuelLevel_State
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {Boolean} level_state - The fuel level state. This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel_State.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setFuelLevel_State (level_state) {
        this.setParameter(GetVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * Get the FuelLevel_State
     * @returns {Boolean} - the KEY_FUEL_LEVEL_STATE value
     */
    getFuelLevel_State () {
        return this.getParameter(GetVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * Set the InstantFuelConsumption
     * @param {Boolean} consumption - The instantaneous fuel consumption in microlitres - The desired InstantFuelConsumption.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(GetVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * Get the InstantFuelConsumption
     * @returns {Boolean} - the KEY_INSTANT_FUEL_CONSUMPTION value
     */
    getInstantFuelConsumption () {
        return this.getParameter(GetVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * Set the FuelRange
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} range - The fuel type, estimated range in KM, fuel level/capacity and fuel level state for the vehicle. See struct FuelRange for details. - The desired FuelRange.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setFuelRange (range) {
        this.setParameter(GetVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * Get the FuelRange
     * @returns {Boolean} - the KEY_FUEL_RANGE value
     */
    getFuelRange () {
        return this.getParameter(GetVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * Set the ExternalTemperature
     * @param {Boolean} temperature - The external temperature in degrees celsius - The desired ExternalTemperature.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this.setParameter(GetVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @returns {Boolean} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getParameter(GetVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the TurnSignal
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} signal - See TurnSignal - The desired TurnSignal.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setTurnSignal (signal) {
        this.setParameter(GetVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * Get the TurnSignal
     * @returns {Boolean} - the KEY_TURN_SIGNAL value
     */
    getTurnSignal () {
        return this.getParameter(GetVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * Set the Vin
     * @param {Boolean} vin - Vehicle identification number - The desired Vin.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setVin (vin) {
        this.setParameter(GetVehicleData.KEY_VIN, vin);
        return this;
    }

    /**
     * Get the Vin
     * @returns {Boolean} - the KEY_VIN value
     */
    getVin () {
        return this.getParameter(GetVehicleData.KEY_VIN);
    }

    /**
     * Set the GearStatus
     * @since SmartDeviceLink 7.0.0
     * @param {Boolean} status - See GearStatus - The desired GearStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setGearStatus (status) {
        this.setParameter(GetVehicleData.KEY_GEAR_STATUS, status);
        return this;
    }

    /**
     * Get the GearStatus
     * @returns {Boolean} - the KEY_GEAR_STATUS value
     */
    getGearStatus () {
        return this.getParameter(GetVehicleData.KEY_GEAR_STATUS);
    }

    /**
     * Set the Prndl
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {Boolean} prndl - See PRNDL. This parameter is deprecated and it is now covered in `gearStatus` - The desired Prndl.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setPrndl (prndl) {
        this.setParameter(GetVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * Get the Prndl
     * @returns {Boolean} - the KEY_PRNDL value
     */
    getPrndl () {
        return this.getParameter(GetVehicleData.KEY_PRNDL);
    }

    /**
     * Set the TirePressure
     * @param {Boolean} pressure - See TireStatus - The desired TirePressure.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setTirePressure (pressure) {
        this.setParameter(GetVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the TirePressure
     * @returns {Boolean} - the KEY_TIRE_PRESSURE value
     */
    getTirePressure () {
        return this.getParameter(GetVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * Set the Odometer
     * @param {Boolean} odometer - Odometer in km - The desired Odometer.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setOdometer (odometer) {
        this.setParameter(GetVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * Get the Odometer
     * @returns {Boolean} - the KEY_ODOMETER value
     */
    getOdometer () {
        return this.getParameter(GetVehicleData.KEY_ODOMETER);
    }

    /**
     * Set the BeltStatus
     * @param {Boolean} status - The status of the seat belts - The desired BeltStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setBeltStatus (status) {
        this.setParameter(GetVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * Get the BeltStatus
     * @returns {Boolean} - the KEY_BELT_STATUS value
     */
    getBeltStatus () {
        return this.getParameter(GetVehicleData.KEY_BELT_STATUS);
    }

    /**
     * Set the BodyInformation
     * @param {Boolean} information - The body information including ignition status and internal temp - The desired BodyInformation.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setBodyInformation (information) {
        this.setParameter(GetVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * Get the BodyInformation
     * @returns {Boolean} - the KEY_BODY_INFORMATION value
     */
    getBodyInformation () {
        return this.getParameter(GetVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * Set the DeviceStatus
     * @param {Boolean} status - The device status including signal and battery strength - The desired DeviceStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setDeviceStatus (status) {
        this.setParameter(GetVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * Get the DeviceStatus
     * @returns {Boolean} - the KEY_DEVICE_STATUS value
     */
    getDeviceStatus () {
        return this.getParameter(GetVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * Set the DriverBraking
     * @param {Boolean} braking - The status of the brake pedal - The desired DriverBraking.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setDriverBraking (braking) {
        this.setParameter(GetVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * Get the DriverBraking
     * @returns {Boolean} - the KEY_DRIVER_BRAKING value
     */
    getDriverBraking () {
        return this.getParameter(GetVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * Set the WiperStatus
     * @param {Boolean} status - The status of the wipers - The desired WiperStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setWiperStatus (status) {
        this.setParameter(GetVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * Get the WiperStatus
     * @returns {Boolean} - the KEY_WIPER_STATUS value
     */
    getWiperStatus () {
        return this.getParameter(GetVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * Set the HeadLampStatus
     * @param {Boolean} status - Status of the head lamps - The desired HeadLampStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setHeadLampStatus (status) {
        this.setParameter(GetVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * Get the HeadLampStatus
     * @returns {Boolean} - the KEY_HEAD_LAMP_STATUS value
     */
    getHeadLampStatus () {
        return this.getParameter(GetVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * Set the EngineTorque
     * @param {Boolean} torque - Torque value for engine (in Nm) on non-diesel variants - The desired EngineTorque.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setEngineTorque (torque) {
        this.setParameter(GetVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * Get the EngineTorque
     * @returns {Boolean} - the KEY_ENGINE_TORQUE value
     */
    getEngineTorque () {
        return this.getParameter(GetVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * Set the AccPedalPosition
     * @param {Boolean} position - Accelerator pedal position (percentage depressed) - The desired AccPedalPosition.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setAccPedalPosition (position) {
        this.setParameter(GetVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * Get the AccPedalPosition
     * @returns {Boolean} - the KEY_ACC_PEDAL_POSITION value
     */
    getAccPedalPosition () {
        return this.getParameter(GetVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * Set the SteeringWheelAngle
     * @param {Boolean} angle - Current angle of the steering wheel (in deg) - The desired SteeringWheelAngle.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(GetVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * Get the SteeringWheelAngle
     * @returns {Boolean} - the KEY_STEERING_WHEEL_ANGLE value
     */
    getSteeringWheelAngle () {
        return this.getParameter(GetVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * Set the EngineOilLife
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} life - The estimated percentage of remaining oil life of the engine. - The desired EngineOilLife.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setEngineOilLife (life) {
        this.setParameter(GetVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * Get the EngineOilLife
     * @returns {Boolean} - the KEY_ENGINE_OIL_LIFE value
     */
    getEngineOilLife () {
        return this.getParameter(GetVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * Set the ElectronicParkBrakeStatus
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} status - The status of the park brake as provided by Electric Park Brake (EPB) system. - The desired ElectronicParkBrakeStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setElectronicParkBrakeStatus (status) {
        this.setParameter(GetVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * Get the ElectronicParkBrakeStatus
     * @returns {Boolean} - the KEY_ELECTRONIC_PARK_BRAKE_STATUS value
     */
    getElectronicParkBrakeStatus () {
        return this.getParameter(GetVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * Set the CloudAppVehicleID
     * @since SmartDeviceLink 5.1.0
     * @param {Boolean} id - Parameter used by cloud apps to identify a head unit - The desired CloudAppVehicleID.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setCloudAppVehicleID (id) {
        this.setParameter(GetVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * Get the CloudAppVehicleID
     * @returns {Boolean} - the KEY_CLOUD_APP_VEHICLE_ID value
     */
    getCloudAppVehicleID () {
        return this.getParameter(GetVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * Set the StabilityControlsStatus
     * @since SmartDeviceLink 7.0.0
     * @param {Boolean} status - See StabilityControlsStatus - The desired StabilityControlsStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setStabilityControlsStatus (status) {
        this.setParameter(GetVehicleData.KEY_STABILITY_CONTROLS_STATUS, status);
        return this;
    }

    /**
     * Get the StabilityControlsStatus
     * @returns {Boolean} - the KEY_STABILITY_CONTROLS_STATUS value
     */
    getStabilityControlsStatus () {
        return this.getParameter(GetVehicleData.KEY_STABILITY_CONTROLS_STATUS);
    }

    /**
     * Set the ECallInfo
     * @param {Boolean} info - Emergency Call notification and confirmation data - The desired ECallInfo.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setECallInfo (info) {
        this.setParameter(GetVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * Get the ECallInfo
     * @returns {Boolean} - the KEY_E_CALL_INFO value
     */
    getECallInfo () {
        return this.getParameter(GetVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * Set the AirbagStatus
     * @param {Boolean} status - The status of the air bags - The desired AirbagStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setAirbagStatus (status) {
        this.setParameter(GetVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * Get the AirbagStatus
     * @returns {Boolean} - the KEY_AIRBAG_STATUS value
     */
    getAirbagStatus () {
        return this.getParameter(GetVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * Set the EmergencyEvent
     * @param {Boolean} event - Information related to an emergency event (and if it occurred) - The desired EmergencyEvent.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setEmergencyEvent (event) {
        this.setParameter(GetVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * Get the EmergencyEvent
     * @returns {Boolean} - the KEY_EMERGENCY_EVENT value
     */
    getEmergencyEvent () {
        return this.getParameter(GetVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * Set the ClusterModeStatus
     * @param {Boolean} status - The status modes of the cluster - The desired ClusterModeStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setClusterModeStatus (status) {
        this.setParameter(GetVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * Get the ClusterModeStatus
     * @returns {Boolean} - the KEY_CLUSTER_MODE_STATUS value
     */
    getClusterModeStatus () {
        return this.getParameter(GetVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * Set the MyKey
     * @param {Boolean} key - Information related to the MyKey feature - The desired MyKey.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setMyKey (key) {
        this.setParameter(GetVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * Get the MyKey
     * @returns {Boolean} - the KEY_MY_KEY value
     */
    getMyKey () {
        return this.getParameter(GetVehicleData.KEY_MY_KEY);
    }

    /**
     * Set the WindowStatus
     * @since SmartDeviceLink 7.0.0
     * @param {Boolean} status - See WindowStatus - The desired WindowStatus.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setWindowStatus (status) {
        this.setParameter(GetVehicleData.KEY_WINDOW_STATUS, status);
        return this;
    }

    /**
     * Get the WindowStatus
     * @returns {Boolean} - the KEY_WINDOW_STATUS value
     */
    getWindowStatus () {
        return this.getParameter(GetVehicleData.KEY_WINDOW_STATUS);
    }

    /**
     * Set the HandsOffSteering
     * @since SmartDeviceLink 7.0.0
     * @param {Boolean} steering - To indicate whether driver hands are off the steering wheel - The desired HandsOffSteering.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setHandsOffSteering (steering) {
        this.setParameter(GetVehicleData.KEY_HANDS_OFF_STEERING, steering);
        return this;
    }

    /**
     * Get the HandsOffSteering
     * @returns {Boolean} - the KEY_HANDS_OFF_STEERING value
     */
    getHandsOffSteering () {
        return this.getParameter(GetVehicleData.KEY_HANDS_OFF_STEERING);
    }

    /**
     * Set the SeatOccupancy
     * @since SmartDeviceLink 7.1.0
     * @param {Boolean} occupancy - See SeatOccupancy - The desired SeatOccupancy.
     * @returns {GetVehicleData} - The class instance for method chaining.
     */
    setSeatOccupancy (occupancy) {
        this.setParameter(GetVehicleData.KEY_SEAT_OCCUPANCY, occupancy);
        return this;
    }

    /**
     * Get the SeatOccupancy
     * @returns {Boolean} - the KEY_SEAT_OCCUPANCY value
     */
    getSeatOccupancy () {
        return this.getParameter(GetVehicleData.KEY_SEAT_OCCUPANCY);
    }
}

GetVehicleData.KEY_GPS = 'gps';
GetVehicleData.KEY_SPEED = 'speed';
GetVehicleData.KEY_RPM = 'rpm';
GetVehicleData.KEY_FUEL_LEVEL = 'fuelLevel';
GetVehicleData.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
GetVehicleData.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
GetVehicleData.KEY_FUEL_RANGE = 'fuelRange';
GetVehicleData.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
GetVehicleData.KEY_TURN_SIGNAL = 'turnSignal';
GetVehicleData.KEY_VIN = 'vin';
GetVehicleData.KEY_GEAR_STATUS = 'gearStatus';
GetVehicleData.KEY_PRNDL = 'prndl';
GetVehicleData.KEY_TIRE_PRESSURE = 'tirePressure';
GetVehicleData.KEY_ODOMETER = 'odometer';
GetVehicleData.KEY_BELT_STATUS = 'beltStatus';
GetVehicleData.KEY_BODY_INFORMATION = 'bodyInformation';
GetVehicleData.KEY_DEVICE_STATUS = 'deviceStatus';
GetVehicleData.KEY_DRIVER_BRAKING = 'driverBraking';
GetVehicleData.KEY_WIPER_STATUS = 'wiperStatus';
GetVehicleData.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
GetVehicleData.KEY_ENGINE_TORQUE = 'engineTorque';
GetVehicleData.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
GetVehicleData.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
GetVehicleData.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
GetVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
GetVehicleData.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
GetVehicleData.KEY_STABILITY_CONTROLS_STATUS = 'stabilityControlsStatus';
GetVehicleData.KEY_E_CALL_INFO = 'eCallInfo';
GetVehicleData.KEY_AIRBAG_STATUS = 'airbagStatus';
GetVehicleData.KEY_EMERGENCY_EVENT = 'emergencyEvent';
GetVehicleData.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
GetVehicleData.KEY_MY_KEY = 'myKey';
GetVehicleData.KEY_WINDOW_STATUS = 'windowStatus';
GetVehicleData.KEY_HANDS_OFF_STEERING = 'handsOffSteering';
GetVehicleData.KEY_SEAT_OCCUPANCY = 'seatOccupancy';

export { GetVehicleData };