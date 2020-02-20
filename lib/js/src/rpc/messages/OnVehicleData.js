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

import { AirbagStatus } from '../structs/AirbagStatus.js';
import { BeltStatus } from '../structs/BeltStatus.js';
import { BodyInformation } from '../structs/BodyInformation.js';
import { ClusterModeStatus } from '../structs/ClusterModeStatus.js';
import { ComponentVolumeStatus } from '../enums/ComponentVolumeStatus.js';
import { DeviceStatus } from '../structs/DeviceStatus.js';
import { ECallInfo } from '../structs/ECallInfo.js';
import { ElectronicParkBrakeStatus } from '../enums/ElectronicParkBrakeStatus.js';
import { EmergencyEvent } from '../structs/EmergencyEvent.js';
import { FuelRange } from '../structs/FuelRange.js';
import { FunctionID } from '../enums/FunctionID.js';
import { GPSData } from '../structs/GPSData.js';
import { HeadLampStatus } from '../structs/HeadLampStatus.js';
import { MyKey } from '../structs/MyKey.js';
import { PRNDL } from '../enums/PRNDL.js';
import { RpcNotification } from '../RpcNotification.js';
import { TireStatus } from '../structs/TireStatus.js';
import { TurnSignal } from '../enums/TurnSignal.js';
import { VehicleDataEventStatus } from '../enums/VehicleDataEventStatus.js';
import { WiperStatus } from '../enums/WiperStatus.js';

/**
 * Callback for the periodic and non periodic vehicle data read function.
 */
class OnVehicleData extends RpcNotification {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.OnVehicleData);
    }

    /**
     * @param {GPSData} gps - See GPSData
     * @return {OnVehicleData}
     */
    setGps (gps) {
        this.validateType(GPSData, gps);
        this.setParameter(OnVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * @return {GPSData}
     */
    getGps () {
        return this.getObject(GPSData, OnVehicleData.KEY_GPS);
    }

    /**
     * @param {Number} speed - The vehicle speed in kilometers per hour
     * @return {OnVehicleData}
     */
    setSpeed (speed) {
        this.setParameter(OnVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {Number}
     */
    getSpeed () {
        return this.getParameter(OnVehicleData.KEY_SPEED);
    }

    /**
     * @param {Number} rpm - The number of revolutions per minute of the engine
     * @return {OnVehicleData}
     */
    setRpm (rpm) {
        this.setParameter(OnVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * @return {Number}
     */
    getRpm () {
        return this.getParameter(OnVehicleData.KEY_RPM);
    }

    /**
     * @param {Number} level - The fuel level in the tank (percentage)
     * @return {OnVehicleData}
     */
    setFuelLevel (level) {
        this.setParameter(OnVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * @return {Number}
     */
    getFuelLevel () {
        return this.getParameter(OnVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * @param {ComponentVolumeStatus} level_state - The fuel level state
     * @return {OnVehicleData}
     */
    setFuelLevel_State (level_state) {
        this.validateType(ComponentVolumeStatus, level_state);
        this.setParameter(OnVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * @return {ComponentVolumeStatus}
     */
    getFuelLevel_State () {
        return this.getObject(ComponentVolumeStatus, OnVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * @param {Number} consumption - The instantaneous fuel consumption in microlitres
     * @return {OnVehicleData}
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(OnVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * @return {Number}
     */
    getInstantFuelConsumption () {
        return this.getParameter(OnVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * @param {FuelRange[]} range - The estimate range in KM the vehicle can travel based on fuel level and consumption
     * @return {OnVehicleData}
     */
    setFuelRange (range) {
        this.validateType(FuelRange, range, true);
        this.setParameter(OnVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * @return {FuelRange[]}
     */
    getFuelRange () {
        return this.getObject(FuelRange, OnVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * @param {Number} temperature - The external temperature in degrees celsius
     * @return {OnVehicleData}
     */
    setExternalTemperature (temperature) {
        this.setParameter(OnVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Number}
     */
    getExternalTemperature () {
        return this.getParameter(OnVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * @param {TurnSignal} signal - See TurnSignal
     * @return {OnVehicleData}
     */
    setTurnSignal (signal) {
        this.validateType(TurnSignal, signal);
        this.setParameter(OnVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * @return {TurnSignal}
     */
    getTurnSignal () {
        return this.getObject(TurnSignal, OnVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * @param {String} vin - Vehicle identification number.
     * @return {OnVehicleData}
     */
    setVin (vin) {
        this.setParameter(OnVehicleData.KEY_VIN, vin);
        return this;
    }

    /**
     * @return {String}
     */
    getVin () {
        return this.getParameter(OnVehicleData.KEY_VIN);
    }

    /**
     * @param {PRNDL} prndl - See PRNDL
     * @return {OnVehicleData}
     */
    setPrndl (prndl) {
        this.validateType(PRNDL, prndl);
        this.setParameter(OnVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * @return {PRNDL}
     */
    getPrndl () {
        return this.getObject(PRNDL, OnVehicleData.KEY_PRNDL);
    }

    /**
     * @param {TireStatus} pressure - See TireStatus
     * @return {OnVehicleData}
     */
    setTirePressure (pressure) {
        this.validateType(TireStatus, pressure);
        this.setParameter(OnVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * @return {TireStatus}
     */
    getTirePressure () {
        return this.getObject(TireStatus, OnVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * @param {Number} odometer - Odometer in km
     * @return {OnVehicleData}
     */
    setOdometer (odometer) {
        this.setParameter(OnVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * @return {Number}
     */
    getOdometer () {
        return this.getParameter(OnVehicleData.KEY_ODOMETER);
    }

    /**
     * @param {BeltStatus} status - The status of the seat belts
     * @return {OnVehicleData}
     */
    setBeltStatus (status) {
        this.validateType(BeltStatus, status);
        this.setParameter(OnVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * @return {BeltStatus}
     */
    getBeltStatus () {
        return this.getObject(BeltStatus, OnVehicleData.KEY_BELT_STATUS);
    }

    /**
     * @param {BodyInformation} information - The body information including power modes
     * @return {OnVehicleData}
     */
    setBodyInformation (information) {
        this.validateType(BodyInformation, information);
        this.setParameter(OnVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * @return {BodyInformation}
     */
    getBodyInformation () {
        return this.getObject(BodyInformation, OnVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * @param {DeviceStatus} status - The device status including signal and battery strength
     * @return {OnVehicleData}
     */
    setDeviceStatus (status) {
        this.validateType(DeviceStatus, status);
        this.setParameter(OnVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * @return {DeviceStatus}
     */
    getDeviceStatus () {
        return this.getObject(DeviceStatus, OnVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * @param {VehicleDataEventStatus} braking - The status of the brake pedal
     * @return {OnVehicleData}
     */
    setDriverBraking (braking) {
        this.validateType(VehicleDataEventStatus, braking);
        this.setParameter(OnVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getDriverBraking () {
        return this.getObject(VehicleDataEventStatus, OnVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * @param {WiperStatus} status - The status of the wipers
     * @return {OnVehicleData}
     */
    setWiperStatus (status) {
        this.validateType(WiperStatus, status);
        this.setParameter(OnVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * @return {WiperStatus}
     */
    getWiperStatus () {
        return this.getObject(WiperStatus, OnVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * @param {HeadLampStatus} status - Status of the head lamps
     * @return {OnVehicleData}
     */
    setHeadLampStatus (status) {
        this.validateType(HeadLampStatus, status);
        this.setParameter(OnVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * @return {HeadLampStatus}
     */
    getHeadLampStatus () {
        return this.getObject(HeadLampStatus, OnVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * @param {Number} torque - Torque value for engine (in Nm) on non-diesel variants
     * @return {OnVehicleData}
     */
    setEngineTorque (torque) {
        this.setParameter(OnVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * @return {Number}
     */
    getEngineTorque () {
        return this.getParameter(OnVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * @param {Number} position - Accelerator pedal position (percentage depressed)
     * @return {OnVehicleData}
     */
    setAccPedalPosition (position) {
        this.setParameter(OnVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getAccPedalPosition () {
        return this.getParameter(OnVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * @param {Number} angle - Current angle of the steering wheel (in deg)
     * @return {OnVehicleData}
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(OnVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * @return {Number}
     */
    getSteeringWheelAngle () {
        return this.getParameter(OnVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * @param {Number} life - The estimated percentage of remaining oil life of the engine.
     * @return {OnVehicleData}
     */
    setEngineOilLife (life) {
        this.setParameter(OnVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * @return {Number}
     */
    getEngineOilLife () {
        return this.getParameter(OnVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * @param {ElectronicParkBrakeStatus} status - The status of the park brake as provided by Electric Park Brake (EPB)
     *                                             system.
     * @return {OnVehicleData}
     */
    setElectronicParkBrakeStatus (status) {
        this.validateType(ElectronicParkBrakeStatus, status);
        this.setParameter(OnVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * @return {ElectronicParkBrakeStatus}
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(ElectronicParkBrakeStatus, OnVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * @param {String} id - Parameter used by cloud apps to identify a head unit
     * @return {OnVehicleData}
     */
    setCloudAppVehicleID (id) {
        this.setParameter(OnVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getCloudAppVehicleID () {
        return this.getParameter(OnVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * @param {ECallInfo} info - Emergency Call notification and confirmation data
     * @return {OnVehicleData}
     */
    setECallInfo (info) {
        this.validateType(ECallInfo, info);
        this.setParameter(OnVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * @return {ECallInfo}
     */
    getECallInfo () {
        return this.getObject(ECallInfo, OnVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * @param {AirbagStatus} status - The status of the air bags
     * @return {OnVehicleData}
     */
    setAirbagStatus (status) {
        this.validateType(AirbagStatus, status);
        this.setParameter(OnVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * @return {AirbagStatus}
     */
    getAirbagStatus () {
        return this.getObject(AirbagStatus, OnVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * @param {EmergencyEvent} event - Information related to an emergency event (and if it occurred)
     * @return {OnVehicleData}
     */
    setEmergencyEvent (event) {
        this.validateType(EmergencyEvent, event);
        this.setParameter(OnVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * @return {EmergencyEvent}
     */
    getEmergencyEvent () {
        return this.getObject(EmergencyEvent, OnVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * @param {ClusterModeStatus} status - The status modes of the cluster
     * @return {OnVehicleData}
     */
    setClusterModeStatus (status) {
        this.validateType(ClusterModeStatus, status);
        this.setParameter(OnVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {ClusterModeStatus}
     */
    getClusterModeStatus () {
        return this.getObject(ClusterModeStatus, OnVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * @param {MyKey} key - Information related to the MyKey feature
     * @return {OnVehicleData}
     */
    setMyKey (key) {
        this.validateType(MyKey, key);
        this.setParameter(OnVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * @return {MyKey}
     */
    getMyKey () {
        return this.getObject(MyKey, OnVehicleData.KEY_MY_KEY);
    }
}

OnVehicleData.KEY_GPS = 'gps';
OnVehicleData.KEY_SPEED = 'speed';
OnVehicleData.KEY_RPM = 'rpm';
OnVehicleData.KEY_FUEL_LEVEL = 'fuelLevel';
OnVehicleData.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
OnVehicleData.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
OnVehicleData.KEY_FUEL_RANGE = 'fuelRange';
OnVehicleData.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
OnVehicleData.KEY_TURN_SIGNAL = 'turnSignal';
OnVehicleData.KEY_VIN = 'vin';
OnVehicleData.KEY_PRNDL = 'prndl';
OnVehicleData.KEY_TIRE_PRESSURE = 'tirePressure';
OnVehicleData.KEY_ODOMETER = 'odometer';
OnVehicleData.KEY_BELT_STATUS = 'beltStatus';
OnVehicleData.KEY_BODY_INFORMATION = 'bodyInformation';
OnVehicleData.KEY_DEVICE_STATUS = 'deviceStatus';
OnVehicleData.KEY_DRIVER_BRAKING = 'driverBraking';
OnVehicleData.KEY_WIPER_STATUS = 'wiperStatus';
OnVehicleData.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
OnVehicleData.KEY_ENGINE_TORQUE = 'engineTorque';
OnVehicleData.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
OnVehicleData.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
OnVehicleData.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
OnVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
OnVehicleData.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
OnVehicleData.KEY_E_CALL_INFO = 'eCallInfo';
OnVehicleData.KEY_AIRBAG_STATUS = 'airbagStatus';
OnVehicleData.KEY_EMERGENCY_EVENT = 'emergencyEvent';
OnVehicleData.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
OnVehicleData.KEY_MY_KEY = 'myKey';

export { OnVehicleData };