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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.SubscribeVehicleData);
    }

    /**
     * @param {VehicleDataResult} gps - See GPSData
     * @return {SubscribeVehicleDataResponse}
     */
    setGps (gps) {
        this.validateType(VehicleDataResult, gps);
        this.setParameter(SubscribeVehicleDataResponse.KEY_GPS, gps);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getGps () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_GPS);
    }

    /**
     * @param {VehicleDataResult} speed - The vehicle speed in kilometers per hour
     * @return {SubscribeVehicleDataResponse}
     */
    setSpeed (speed) {
        this.validateType(VehicleDataResult, speed);
        this.setParameter(SubscribeVehicleDataResponse.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getSpeed () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_SPEED);
    }

    /**
     * @param {VehicleDataResult} rpm - The number of revolutions per minute of the engine
     * @return {SubscribeVehicleDataResponse}
     */
    setRpm (rpm) {
        this.validateType(VehicleDataResult, rpm);
        this.setParameter(SubscribeVehicleDataResponse.KEY_RPM, rpm);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getRpm () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_RPM);
    }

    /**
     * @param {VehicleDataResult} level - The fuel level in the tank (percentage)
     * @return {SubscribeVehicleDataResponse}
     */
    setFuelLevel (level) {
        this.validateType(VehicleDataResult, level);
        this.setParameter(SubscribeVehicleDataResponse.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getFuelLevel () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_FUEL_LEVEL);
    }

    /**
     * @param {VehicleDataResult} level_state - The fuel level state
     * @return {SubscribeVehicleDataResponse}
     */
    setFuelLevel_State (level_state) {
        this.validateType(VehicleDataResult, level_state);
        this.setParameter(SubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getFuelLevel_State () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * @param {VehicleDataResult} consumption - The instantaneous fuel consumption in microlitres
     * @return {SubscribeVehicleDataResponse}
     */
    setInstantFuelConsumption (consumption) {
        this.validateType(VehicleDataResult, consumption);
        this.setParameter(SubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getInstantFuelConsumption () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * @param {VehicleDataResult} range - The estimate range in KM the vehicle can travel based on fuel level and
     *                                    consumption
     * @return {SubscribeVehicleDataResponse}
     */
    setFuelRange (range) {
        this.validateType(VehicleDataResult, range);
        this.setParameter(SubscribeVehicleDataResponse.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getFuelRange () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_FUEL_RANGE);
    }

    /**
     * @param {VehicleDataResult} temperature - The external temperature in degrees celsius.
     * @return {SubscribeVehicleDataResponse}
     */
    setExternalTemperature (temperature) {
        this.validateType(VehicleDataResult, temperature);
        this.setParameter(SubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getExternalTemperature () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * @param {VehicleDataResult} signal - See TurnSignal
     * @return {SubscribeVehicleDataResponse}
     */
    setTurnSignal (signal) {
        this.validateType(VehicleDataResult, signal);
        this.setParameter(SubscribeVehicleDataResponse.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getTurnSignal () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_TURN_SIGNAL);
    }

    /**
     * @param {VehicleDataResult} prndl - See PRNDL
     * @return {SubscribeVehicleDataResponse}
     */
    setPrndl (prndl) {
        this.validateType(VehicleDataResult, prndl);
        this.setParameter(SubscribeVehicleDataResponse.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getPrndl () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_PRNDL);
    }

    /**
     * @param {VehicleDataResult} pressure - See TireStatus
     * @return {SubscribeVehicleDataResponse}
     */
    setTirePressure (pressure) {
        this.validateType(VehicleDataResult, pressure);
        this.setParameter(SubscribeVehicleDataResponse.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getTirePressure () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_TIRE_PRESSURE);
    }

    /**
     * @param {VehicleDataResult} odometer - Odometer in km
     * @return {SubscribeVehicleDataResponse}
     */
    setOdometer (odometer) {
        this.validateType(VehicleDataResult, odometer);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getOdometer () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ODOMETER);
    }

    /**
     * @param {VehicleDataResult} status - The status of the seat belts
     * @return {SubscribeVehicleDataResponse}
     */
    setBeltStatus (status) {
        this.validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getBeltStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_BELT_STATUS);
    }

    /**
     * @param {VehicleDataResult} information - The body information including power modes
     * @return {SubscribeVehicleDataResponse}
     */
    setBodyInformation (information) {
        this.validateType(VehicleDataResult, information);
        this.setParameter(SubscribeVehicleDataResponse.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getBodyInformation () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_BODY_INFORMATION);
    }

    /**
     * @param {VehicleDataResult} status - The device status including signal and battery strength
     * @return {SubscribeVehicleDataResponse}
     */
    setDeviceStatus (status) {
        this.validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getDeviceStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_DEVICE_STATUS);
    }

    /**
     * @param {VehicleDataResult} braking - The status of the brake pedal
     * @return {SubscribeVehicleDataResponse}
     */
    setDriverBraking (braking) {
        this.validateType(VehicleDataResult, braking);
        this.setParameter(SubscribeVehicleDataResponse.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getDriverBraking () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_DRIVER_BRAKING);
    }

    /**
     * @param {VehicleDataResult} status - The status of the wipers
     * @return {SubscribeVehicleDataResponse}
     */
    setWiperStatus (status) {
        this.validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getWiperStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_WIPER_STATUS);
    }

    /**
     * @param {VehicleDataResult} status - Status of the head lamps
     * @return {SubscribeVehicleDataResponse}
     */
    setHeadLampStatus (status) {
        this.validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getHeadLampStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * @param {VehicleDataResult} torque - Torque value for engine (in Nm) on non-diesel variants
     * @return {SubscribeVehicleDataResponse}
     */
    setEngineTorque (torque) {
        this.validateType(VehicleDataResult, torque);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getEngineTorque () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ENGINE_TORQUE);
    }

    /**
     * @param {VehicleDataResult} position - Accelerator pedal position (percentage depressed)
     * @return {SubscribeVehicleDataResponse}
     */
    setAccPedalPosition (position) {
        this.validateType(VehicleDataResult, position);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getAccPedalPosition () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * @param {VehicleDataResult} angle - Current angle of the steering wheel (in deg)
     * @return {SubscribeVehicleDataResponse}
     */
    setSteeringWheelAngle (angle) {
        this.validateType(VehicleDataResult, angle);
        this.setParameter(SubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getSteeringWheelAngle () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * @param {VehicleDataResult} life - The estimated percentage of remaining oil life of the engine.
     * @return {SubscribeVehicleDataResponse}
     */
    setEngineOilLife (life) {
        this.validateType(VehicleDataResult, life);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getEngineOilLife () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * @param {VehicleDataResult} status - The status of the park brake as provided by Electric Park Brake (EPB) system.
     * @return {SubscribeVehicleDataResponse}
     */
    setElectronicParkBrakeStatus (status) {
        this.validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * @param {VehicleDataResult} id - Parameter used by cloud apps to identify a head unit
     * @return {SubscribeVehicleDataResponse}
     */
    setCloudAppVehicleID (id) {
        this.validateType(VehicleDataResult, id);
        this.setParameter(SubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getCloudAppVehicleID () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * @param {VehicleDataResult} info - Emergency Call notification and confirmation data
     * @return {SubscribeVehicleDataResponse}
     */
    setECallInfo (info) {
        this.validateType(VehicleDataResult, info);
        this.setParameter(SubscribeVehicleDataResponse.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getECallInfo () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_E_CALL_INFO);
    }

    /**
     * @param {VehicleDataResult} status - The status of the air bags
     * @return {SubscribeVehicleDataResponse}
     */
    setAirbagStatus (status) {
        this.validateType(VehicleDataResult, status);
        this.setParameter(SubscribeVehicleDataResponse.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getAirbagStatus () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_AIRBAG_STATUS);
    }

    /**
     * @param {VehicleDataResult} event - Information related to an emergency event (and if it occurred)
     * @return {SubscribeVehicleDataResponse}
     */
    setEmergencyEvent (event) {
        this.validateType(VehicleDataResult, event);
        this.setParameter(SubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getEmergencyEvent () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT);
    }

    /**
     * @param {VehicleDataResult} modes - The status modes of the cluster
     * @return {SubscribeVehicleDataResponse}
     */
    setClusterModes (modes) {
        this.validateType(VehicleDataResult, modes);
        this.setParameter(SubscribeVehicleDataResponse.KEY_CLUSTER_MODES, modes);
        return this;
    }

    /**
     * @return {VehicleDataResult}
     */
    getClusterModes () {
        return this.getObject(VehicleDataResult, SubscribeVehicleDataResponse.KEY_CLUSTER_MODES);
    }

    /**
     * @param {VehicleDataResult} key - Information related to the MyKey feature
     * @return {SubscribeVehicleDataResponse}
     */
    setMyKey (key) {
        this.validateType(VehicleDataResult, key);
        this.setParameter(SubscribeVehicleDataResponse.KEY_MY_KEY, key);
        return this;
    }

    /**
     * @return {VehicleDataResult}
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
SubscribeVehicleDataResponse.KEY_E_CALL_INFO = 'eCallInfo';
SubscribeVehicleDataResponse.KEY_AIRBAG_STATUS = 'airbagStatus';
SubscribeVehicleDataResponse.KEY_EMERGENCY_EVENT = 'emergencyEvent';
SubscribeVehicleDataResponse.KEY_CLUSTER_MODES = 'clusterModes';
SubscribeVehicleDataResponse.KEY_MY_KEY = 'myKey';

export { SubscribeVehicleDataResponse };