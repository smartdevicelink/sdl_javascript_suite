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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.GetVehicleData);
    }

    /**
     * @param {Boolean} gps - See GPSData
     * @return {GetVehicleData}
     */
    setGps (gps) {
        this.setParameter(GetVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getGps () {
        return this.getParameter(GetVehicleData.KEY_GPS);
    }

    /**
     * @param {Boolean} speed - The vehicle speed in kilometers per hour
     * @return {GetVehicleData}
     */
    setSpeed (speed) {
        this.setParameter(GetVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSpeed () {
        return this.getParameter(GetVehicleData.KEY_SPEED);
    }

    /**
     * @param {Boolean} rpm - The number of revolutions per minute of the engine
     * @return {GetVehicleData}
     */
    setRpm (rpm) {
        this.setParameter(GetVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRpm () {
        return this.getParameter(GetVehicleData.KEY_RPM);
    }

    /**
     * @param {Boolean} level - The fuel level in the tank (percentage)
     * @return {GetVehicleData}
     */
    setFuelLevel (level) {
        this.setParameter(GetVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelLevel () {
        return this.getParameter(GetVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * @param {Boolean} level_state - The fuel level state
     * @return {GetVehicleData}
     */
    setFuelLevel_State (level_state) {
        this.setParameter(GetVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelLevel_State () {
        return this.getParameter(GetVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * @param {Boolean} consumption - The instantaneous fuel consumption in microlitres
     * @return {GetVehicleData}
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(GetVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getInstantFuelConsumption () {
        return this.getParameter(GetVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * @param {Boolean} range - The estimate range in KM the vehicle can travel based on fuel level and consumption
     * @return {GetVehicleData}
     */
    setFuelRange (range) {
        this.setParameter(GetVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelRange () {
        return this.getParameter(GetVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * @param {Boolean} temperature - The external temperature in degrees celsius
     * @return {GetVehicleData}
     */
    setExternalTemperature (temperature) {
        this.setParameter(GetVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getExternalTemperature () {
        return this.getParameter(GetVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * @param {Boolean} signal - See TurnSignal
     * @return {GetVehicleData}
     */
    setTurnSignal (signal) {
        this.setParameter(GetVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTurnSignal () {
        return this.getParameter(GetVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * @param {Boolean} vin - Vehicle identification number
     * @return {GetVehicleData}
     */
    setVin (vin) {
        this.setParameter(GetVehicleData.KEY_VIN, vin);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getVin () {
        return this.getParameter(GetVehicleData.KEY_VIN);
    }

    /**
     * @param {Boolean} prndl - See PRNDL
     * @return {GetVehicleData}
     */
    setPrndl (prndl) {
        this.setParameter(GetVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPrndl () {
        return this.getParameter(GetVehicleData.KEY_PRNDL);
    }

    /**
     * @param {Boolean} pressure - See TireStatus
     * @return {GetVehicleData}
     */
    setTirePressure (pressure) {
        this.setParameter(GetVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTirePressure () {
        return this.getParameter(GetVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * @param {Boolean} odometer - Odometer in km
     * @return {GetVehicleData}
     */
    setOdometer (odometer) {
        this.setParameter(GetVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getOdometer () {
        return this.getParameter(GetVehicleData.KEY_ODOMETER);
    }

    /**
     * @param {Boolean} status - The status of the seat belts
     * @return {GetVehicleData}
     */
    setBeltStatus (status) {
        this.setParameter(GetVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBeltStatus () {
        return this.getParameter(GetVehicleData.KEY_BELT_STATUS);
    }

    /**
     * @param {Boolean} information - The body information including ignition status and internal temp
     * @return {GetVehicleData}
     */
    setBodyInformation (information) {
        this.setParameter(GetVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBodyInformation () {
        return this.getParameter(GetVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * @param {Boolean} status - The device status including signal and battery strength
     * @return {GetVehicleData}
     */
    setDeviceStatus (status) {
        this.setParameter(GetVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDeviceStatus () {
        return this.getParameter(GetVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * @param {Boolean} braking - The status of the brake pedal
     * @return {GetVehicleData}
     */
    setDriverBraking (braking) {
        this.setParameter(GetVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDriverBraking () {
        return this.getParameter(GetVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * @param {Boolean} status - The status of the wipers
     * @return {GetVehicleData}
     */
    setWiperStatus (status) {
        this.setParameter(GetVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getWiperStatus () {
        return this.getParameter(GetVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * @param {Boolean} status - Status of the head lamps
     * @return {GetVehicleData}
     */
    setHeadLampStatus (status) {
        this.setParameter(GetVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeadLampStatus () {
        return this.getParameter(GetVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * @param {Boolean} torque - Torque value for engine (in Nm) on non-diesel variants
     * @return {GetVehicleData}
     */
    setEngineTorque (torque) {
        this.setParameter(GetVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEngineTorque () {
        return this.getParameter(GetVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * @param {Boolean} position - Accelerator pedal position (percentage depressed)
     * @return {GetVehicleData}
     */
    setAccPedalPosition (position) {
        this.setParameter(GetVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAccPedalPosition () {
        return this.getParameter(GetVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * @param {Boolean} angle - Current angle of the steering wheel (in deg)
     * @return {GetVehicleData}
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(GetVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSteeringWheelAngle () {
        return this.getParameter(GetVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * @param {Boolean} life - The estimated percentage of remaining oil life of the engine.
     * @return {GetVehicleData}
     */
    setEngineOilLife (life) {
        this.setParameter(GetVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEngineOilLife () {
        return this.getParameter(GetVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * @param {Boolean} status - The status of the park brake as provided by Electric Park Brake (EPB) system.
     * @return {GetVehicleData}
     */
    setElectronicParkBrakeStatus (status) {
        this.setParameter(GetVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getElectronicParkBrakeStatus () {
        return this.getParameter(GetVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * @param {Boolean} id - Parameter used by cloud apps to identify a head unit
     * @return {GetVehicleData}
     */
    setCloudAppVehicleID (id) {
        this.setParameter(GetVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCloudAppVehicleID () {
        return this.getParameter(GetVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * @param {Boolean} info - Emergency Call notification and confirmation data
     * @return {GetVehicleData}
     */
    setECallInfo (info) {
        this.setParameter(GetVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getECallInfo () {
        return this.getParameter(GetVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * @param {Boolean} status - The status of the air bags
     * @return {GetVehicleData}
     */
    setAirbagStatus (status) {
        this.setParameter(GetVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAirbagStatus () {
        return this.getParameter(GetVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * @param {Boolean} event - Information related to an emergency event (and if it occurred)
     * @return {GetVehicleData}
     */
    setEmergencyEvent (event) {
        this.setParameter(GetVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEmergencyEvent () {
        return this.getParameter(GetVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * @param {Boolean} status - The status modes of the cluster
     * @return {GetVehicleData}
     */
    setClusterModeStatus (status) {
        this.setParameter(GetVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getClusterModeStatus () {
        return this.getParameter(GetVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * @param {Boolean} key - Information related to the MyKey feature
     * @return {GetVehicleData}
     */
    setMyKey (key) {
        this.setParameter(GetVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMyKey () {
        return this.getParameter(GetVehicleData.KEY_MY_KEY);
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
GetVehicleData.KEY_E_CALL_INFO = 'eCallInfo';
GetVehicleData.KEY_AIRBAG_STATUS = 'airbagStatus';
GetVehicleData.KEY_EMERGENCY_EVENT = 'emergencyEvent';
GetVehicleData.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
GetVehicleData.KEY_MY_KEY = 'myKey';

export { GetVehicleData };