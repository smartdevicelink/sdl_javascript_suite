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

import { RpcRequest } from '../RpcRequest.js';
import { FunctionID } from '../enums/FunctionID.js';

/**
 * Subscribes for specific published data items. The data will be only sent if it has changed. The application will be
 * notified by the onVehicleData notification whenever new data is available. To unsubscribe the notifications, use
 * unsubscribe with the same subscriptionType.
 */
class SubscribeVehicleData extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.SubscribeVehicleData);
    }

    /**
     * @param {Boolean} gps - See GPSData
     * @return {SubscribeVehicleData}
     */
    setGps (gps) {
        this.setParameter(SubscribeVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getGps () {
        return this.getParameter(SubscribeVehicleData.KEY_GPS);
    }

    /**
     * @param {Boolean} speed - The vehicle speed in kilometers per hour
     * @return {SubscribeVehicleData}
     */
    setSpeed (speed) {
        this.setParameter(SubscribeVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSpeed () {
        return this.getParameter(SubscribeVehicleData.KEY_SPEED);
    }

    /**
     * @param {Boolean} rpm - The number of revolutions per minute of the engine
     * @return {SubscribeVehicleData}
     */
    setRpm (rpm) {
        this.setParameter(SubscribeVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRpm () {
        return this.getParameter(SubscribeVehicleData.KEY_RPM);
    }

    /**
     * @param {Boolean} level - The fuel level in the tank (percentage)
     * @return {SubscribeVehicleData}
     */
    setFuelLevel (level) {
        this.setParameter(SubscribeVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelLevel () {
        return this.getParameter(SubscribeVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * @param {Boolean} level_state - The fuel level state
     * @return {SubscribeVehicleData}
     */
    setFuelLevel_State (level_state) {
        this.setParameter(SubscribeVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelLevel_State () {
        return this.getParameter(SubscribeVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * @param {Boolean} consumption - The instantaneous fuel consumption in microlitres
     * @return {SubscribeVehicleData}
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(SubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getInstantFuelConsumption () {
        return this.getParameter(SubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * @param {Boolean} range - The estimate range in KM the vehicle can travel based on fuel level and consumption
     * @return {SubscribeVehicleData}
     */
    setFuelRange (range) {
        this.setParameter(SubscribeVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getFuelRange () {
        return this.getParameter(SubscribeVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * @param {Boolean} temperature - The external temperature in degrees celsius
     * @return {SubscribeVehicleData}
     */
    setExternalTemperature (temperature) {
        this.setParameter(SubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getExternalTemperature () {
        return this.getParameter(SubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * @param {Boolean} signal - See TurnSignal
     * @return {SubscribeVehicleData}
     */
    setTurnSignal (signal) {
        this.setParameter(SubscribeVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTurnSignal () {
        return this.getParameter(SubscribeVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * @param {Boolean} prndl - See PRNDL
     * @return {SubscribeVehicleData}
     */
    setPrndl (prndl) {
        this.setParameter(SubscribeVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPrndl () {
        return this.getParameter(SubscribeVehicleData.KEY_PRNDL);
    }

    /**
     * @param {Boolean} pressure - See TireStatus
     * @return {SubscribeVehicleData}
     */
    setTirePressure (pressure) {
        this.setParameter(SubscribeVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTirePressure () {
        return this.getParameter(SubscribeVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * @param {Boolean} odometer - Odometer in km
     * @return {SubscribeVehicleData}
     */
    setOdometer (odometer) {
        this.setParameter(SubscribeVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getOdometer () {
        return this.getParameter(SubscribeVehicleData.KEY_ODOMETER);
    }

    /**
     * @param {Boolean} status - The status of the seat belts
     * @return {SubscribeVehicleData}
     */
    setBeltStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBeltStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_BELT_STATUS);
    }

    /**
     * @param {Boolean} information - The body information including power modes
     * @return {SubscribeVehicleData}
     */
    setBodyInformation (information) {
        this.setParameter(SubscribeVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBodyInformation () {
        return this.getParameter(SubscribeVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * @param {Boolean} status - The device status including signal and battery strength
     * @return {SubscribeVehicleData}
     */
    setDeviceStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDeviceStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * @param {Boolean} braking - The status of the brake pedal
     * @return {SubscribeVehicleData}
     */
    setDriverBraking (braking) {
        this.setParameter(SubscribeVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDriverBraking () {
        return this.getParameter(SubscribeVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * @param {Boolean} status - The status of the wipers
     * @return {SubscribeVehicleData}
     */
    setWiperStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getWiperStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * @param {Boolean} status - Status of the head lamps
     * @return {SubscribeVehicleData}
     */
    setHeadLampStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeadLampStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * @param {Boolean} torque - Torque value for engine (in Nm) on non-diesel variants
     * @return {SubscribeVehicleData}
     */
    setEngineTorque (torque) {
        this.setParameter(SubscribeVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEngineTorque () {
        return this.getParameter(SubscribeVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * @param {Boolean} position - Accelerator pedal position (percentage depressed)
     * @return {SubscribeVehicleData}
     */
    setAccPedalPosition (position) {
        this.setParameter(SubscribeVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAccPedalPosition () {
        return this.getParameter(SubscribeVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * @param {Boolean} angle - Current angle of the steering wheel (in deg)
     * @return {SubscribeVehicleData}
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(SubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSteeringWheelAngle () {
        return this.getParameter(SubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * @param {Boolean} life - The estimated percentage of remaining oil life of the engine.
     * @return {SubscribeVehicleData}
     */
    setEngineOilLife (life) {
        this.setParameter(SubscribeVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEngineOilLife () {
        return this.getParameter(SubscribeVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * @param {Boolean} status - The status of the park brake as provided by Electric Park Brake (EPB) system.
     * @return {SubscribeVehicleData}
     */
    setElectronicParkBrakeStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getElectronicParkBrakeStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * @param {Boolean} id - Parameter used by cloud apps to identify a head unit
     * @return {SubscribeVehicleData}
     */
    setCloudAppVehicleID (id) {
        this.setParameter(SubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCloudAppVehicleID () {
        return this.getParameter(SubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * @param {Boolean} info - Emergency Call notification and confirmation data
     * @return {SubscribeVehicleData}
     */
    setECallInfo (info) {
        this.setParameter(SubscribeVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getECallInfo () {
        return this.getParameter(SubscribeVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * @param {Boolean} status - The status of the air bags
     * @return {SubscribeVehicleData}
     */
    setAirbagStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAirbagStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * @param {Boolean} event - Information related to an emergency event (and if it occurred)
     * @return {SubscribeVehicleData}
     */
    setEmergencyEvent (event) {
        this.setParameter(SubscribeVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEmergencyEvent () {
        return this.getParameter(SubscribeVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * @param {Boolean} status - The status modes of the cluster
     * @return {SubscribeVehicleData}
     */
    setClusterModeStatus (status) {
        this.setParameter(SubscribeVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getClusterModeStatus () {
        return this.getParameter(SubscribeVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * @param {Boolean} key - Information related to the MyKey feature
     * @return {SubscribeVehicleData}
     */
    setMyKey (key) {
        this.setParameter(SubscribeVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMyKey () {
        return this.getParameter(SubscribeVehicleData.KEY_MY_KEY);
    }
}

SubscribeVehicleData.KEY_GPS = 'gps';
SubscribeVehicleData.KEY_SPEED = 'speed';
SubscribeVehicleData.KEY_RPM = 'rpm';
SubscribeVehicleData.KEY_FUEL_LEVEL = 'fuelLevel';
SubscribeVehicleData.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
SubscribeVehicleData.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
SubscribeVehicleData.KEY_FUEL_RANGE = 'fuelRange';
SubscribeVehicleData.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
SubscribeVehicleData.KEY_TURN_SIGNAL = 'turnSignal';
SubscribeVehicleData.KEY_PRNDL = 'prndl';
SubscribeVehicleData.KEY_TIRE_PRESSURE = 'tirePressure';
SubscribeVehicleData.KEY_ODOMETER = 'odometer';
SubscribeVehicleData.KEY_BELT_STATUS = 'beltStatus';
SubscribeVehicleData.KEY_BODY_INFORMATION = 'bodyInformation';
SubscribeVehicleData.KEY_DEVICE_STATUS = 'deviceStatus';
SubscribeVehicleData.KEY_DRIVER_BRAKING = 'driverBraking';
SubscribeVehicleData.KEY_WIPER_STATUS = 'wiperStatus';
SubscribeVehicleData.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
SubscribeVehicleData.KEY_ENGINE_TORQUE = 'engineTorque';
SubscribeVehicleData.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
SubscribeVehicleData.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
SubscribeVehicleData.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
SubscribeVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
SubscribeVehicleData.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
SubscribeVehicleData.KEY_E_CALL_INFO = 'eCallInfo';
SubscribeVehicleData.KEY_AIRBAG_STATUS = 'airbagStatus';
SubscribeVehicleData.KEY_EMERGENCY_EVENT = 'emergencyEvent';
SubscribeVehicleData.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
SubscribeVehicleData.KEY_MY_KEY = 'myKey';

export { SubscribeVehicleData };