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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.UnsubscribeVehicleData);
    }

    /**
     * @param {Boolean} gps - See GPSData
     * @return {UnsubscribeVehicleData}
     */
    setGps (gps) {
        this.setParameter(UnsubscribeVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getGps () {
        return this.getParameter(UnsubscribeVehicleData.KEY_GPS);
    }

    /**
     * @param {Boolean} speed - The vehicle speed in kilometers per hour
     * @return {UnsubscribeVehicleData}
     */
    setSpeed (speed) {
        this.setParameter(UnsubscribeVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSpeed () {
        return this.getParameter(UnsubscribeVehicleData.KEY_SPEED);
    }

    /**
     * @param {Boolean} rpm - The number of revolutions per minute of the engine
     * @return {UnsubscribeVehicleData}
     */
    setRpm (rpm) {
        this.setParameter(UnsubscribeVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRpm () {
        return this.getParameter(UnsubscribeVehicleData.KEY_RPM);
    }

    /**
     * @param {Boolean} level - The fuel level in the tank (percentage)
     * @return {UnsubscribeVehicleData}
     */
    setFuelLevel (level) {
        this.setParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelLevel () {
        return this.getParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * @param {Boolean} level_state - The fuel level state
     * @return {UnsubscribeVehicleData}
     */
    setFuelLevel_State (level_state) {
        this.setParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelLevel_State () {
        return this.getParameter(UnsubscribeVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * @param {Boolean} consumption - The instantaneous fuel consumption in microlitres
     * @return {UnsubscribeVehicleData}
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(UnsubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getInstantFuelConsumption () {
        return this.getParameter(UnsubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * @param {Boolean} range - The estimate range in KM the vehicle can travel based on fuel level and consumption
     * @return {UnsubscribeVehicleData}
     */
    setFuelRange (range) {
        this.setParameter(UnsubscribeVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelRange () {
        return this.getParameter(UnsubscribeVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * @param {Boolean} temperature - The external temperature in degrees celsius.
     * @return {UnsubscribeVehicleData}
     */
    setExternalTemperature (temperature) {
        this.setParameter(UnsubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getExternalTemperature () {
        return this.getParameter(UnsubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * @param {Boolean} signal - See TurnSignal
     * @return {UnsubscribeVehicleData}
     */
    setTurnSignal (signal) {
        this.setParameter(UnsubscribeVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTurnSignal () {
        return this.getParameter(UnsubscribeVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * @param {Boolean} prndl - See PRNDL
     * @return {UnsubscribeVehicleData}
     */
    setPrndl (prndl) {
        this.setParameter(UnsubscribeVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPrndl () {
        return this.getParameter(UnsubscribeVehicleData.KEY_PRNDL);
    }

    /**
     * @param {Boolean} pressure - See TireStatus
     * @return {UnsubscribeVehicleData}
     */
    setTirePressure (pressure) {
        this.setParameter(UnsubscribeVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTirePressure () {
        return this.getParameter(UnsubscribeVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * @param {Boolean} odometer - Odometer in km
     * @return {UnsubscribeVehicleData}
     */
    setOdometer (odometer) {
        this.setParameter(UnsubscribeVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getOdometer () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ODOMETER);
    }

    /**
     * @param {Boolean} status - The status of the seat belts
     * @return {UnsubscribeVehicleData}
     */
    setBeltStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBeltStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_BELT_STATUS);
    }

    /**
     * @param {Boolean} information - The body information including power modes
     * @return {UnsubscribeVehicleData}
     */
    setBodyInformation (information) {
        this.setParameter(UnsubscribeVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBodyInformation () {
        return this.getParameter(UnsubscribeVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * @param {Boolean} status - The device status including signal and battery strength
     * @return {UnsubscribeVehicleData}
     */
    setDeviceStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDeviceStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * @param {Boolean} braking - The status of the brake pedal
     * @return {UnsubscribeVehicleData}
     */
    setDriverBraking (braking) {
        this.setParameter(UnsubscribeVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDriverBraking () {
        return this.getParameter(UnsubscribeVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * @param {Boolean} status - The status of the wipers
     * @return {UnsubscribeVehicleData}
     */
    setWiperStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getWiperStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * @param {Boolean} status - Status of the head lamps
     * @return {UnsubscribeVehicleData}
     */
    setHeadLampStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeadLampStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * @param {Boolean} torque - Torque value for engine (in Nm) on non-diesel variants
     * @return {UnsubscribeVehicleData}
     */
    setEngineTorque (torque) {
        this.setParameter(UnsubscribeVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEngineTorque () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * @param {Boolean} position - Accelerator pedal position (percentage depressed)
     * @return {UnsubscribeVehicleData}
     */
    setAccPedalPosition (position) {
        this.setParameter(UnsubscribeVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAccPedalPosition () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * @param {Boolean} angle - Current angle of the steering wheel (in deg)
     * @return {UnsubscribeVehicleData}
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(UnsubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSteeringWheelAngle () {
        return this.getParameter(UnsubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * @param {Boolean} life - The estimated percentage of remaining oil life of the engine.
     * @return {UnsubscribeVehicleData}
     */
    setEngineOilLife (life) {
        this.setParameter(UnsubscribeVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEngineOilLife () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * @param {Boolean} status - The status of the park brake as provided by Electric Park Brake (EPB) system.
     * @return {UnsubscribeVehicleData}
     */
    setElectronicParkBrakeStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getElectronicParkBrakeStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * @param {Boolean} id - Parameter used by cloud apps to identify a head unit
     * @return {UnsubscribeVehicleData}
     */
    setCloudAppVehicleID (id) {
        this.setParameter(UnsubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCloudAppVehicleID () {
        return this.getParameter(UnsubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * @param {Boolean} info - Emergency Call notification and confirmation data
     * @return {UnsubscribeVehicleData}
     */
    setECallInfo (info) {
        this.setParameter(UnsubscribeVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getECallInfo () {
        return this.getParameter(UnsubscribeVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * @param {Boolean} status - The status of the air bags
     * @return {UnsubscribeVehicleData}
     */
    setAirbagStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAirbagStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * @param {Boolean} event - Information related to an emergency event (and if it occurred)
     * @return {UnsubscribeVehicleData}
     */
    setEmergencyEvent (event) {
        this.setParameter(UnsubscribeVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEmergencyEvent () {
        return this.getParameter(UnsubscribeVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * @param {Boolean} status - The status modes of the cluster
     * @return {UnsubscribeVehicleData}
     */
    setClusterModeStatus (status) {
        this.setParameter(UnsubscribeVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getClusterModeStatus () {
        return this.getParameter(UnsubscribeVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * @param {Boolean} key - Information related to the MyKey feature
     * @return {UnsubscribeVehicleData}
     */
    setMyKey (key) {
        this.setParameter(UnsubscribeVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * @return {Boolean}
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