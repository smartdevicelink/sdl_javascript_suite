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
import { ClusterModeStatus } from '../structs/ClusterModeStatus.js';
import { VehicleDataEventStatus } from '../enums/VehicleDataEventStatus.js';
import { EmergencyEvent } from '../structs/EmergencyEvent.js';
import { TurnSignal } from '../enums/TurnSignal.js';
import { RpcResponse } from '../RpcResponse.js';
import { HeadLampStatus } from '../structs/HeadLampStatus.js';
import { FunctionID } from '../enums/FunctionID.js';
import { DeviceStatus } from '../structs/DeviceStatus.js';
import { WiperStatus } from '../enums/WiperStatus.js';
import { ElectronicParkBrakeStatus } from '../enums/ElectronicParkBrakeStatus.js';
import { MyKey } from '../structs/MyKey.js';
import { GPSData } from '../structs/GPSData.js';
import { PRNDL } from '../enums/PRNDL.js';
import { FuelRange } from '../structs/FuelRange.js';
import { ECallInfo } from '../structs/ECallInfo.js';
import { BeltStatus } from '../structs/BeltStatus.js';
import { ComponentVolumeStatus } from '../enums/ComponentVolumeStatus.js';
import { BodyInformation } from '../structs/BodyInformation.js';
import { TireStatus } from '../structs/TireStatus.js';

class GetVehicleDataResponse extends RpcResponse {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.GetVehicleData);
    }

    /**
     * @param {GPSData} gps - See GPSData
     * @return {GetVehicleDataResponse}
     */
    setGps (gps) {
        this.validateType(GPSData, gps);
        this.setParameter(GetVehicleDataResponse.KEY_GPS, gps);
        return this;
    }

    /**
     * @return {GPSData}
     */
    getGps () {
        return this.getObject(GPSData, GetVehicleDataResponse.KEY_GPS);
    }

    /**
     * @param {Number} speed - The vehicle speed in kilometers per hour
     * @return {GetVehicleDataResponse}
     */
    setSpeed (speed) {
        this.setParameter(GetVehicleDataResponse.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {Number}
     */
    getSpeed () {
        return this.getParameter(GetVehicleDataResponse.KEY_SPEED);
    }

    /**
     * @param {Number} rpm - The number of revolutions per minute of the engine
     * @return {GetVehicleDataResponse}
     */
    setRpm (rpm) {
        this.setParameter(GetVehicleDataResponse.KEY_RPM, rpm);
        return this;
    }

    /**
     * @return {Number}
     */
    getRpm () {
        return this.getParameter(GetVehicleDataResponse.KEY_RPM);
    }

    /**
     * @param {Number} level - The fuel level in the tank (percentage)
     * @return {GetVehicleDataResponse}
     */
    setFuelLevel (level) {
        this.setParameter(GetVehicleDataResponse.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * @return {Number}
     */
    getFuelLevel () {
        return this.getParameter(GetVehicleDataResponse.KEY_FUEL_LEVEL);
    }

    /**
     * @param {ComponentVolumeStatus} level_state - The fuel level state
     * @return {GetVehicleDataResponse}
     */
    setFuelLevel_State (level_state) {
        this.validateType(ComponentVolumeStatus, level_state);
        this.setParameter(GetVehicleDataResponse.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * @return {ComponentVolumeStatus}
     */
    getFuelLevel_State () {
        return this.getObject(ComponentVolumeStatus, GetVehicleDataResponse.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * @param {Number} consumption - The instantaneous fuel consumption in microlitres
     * @return {GetVehicleDataResponse}
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(GetVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * @return {Number}
     */
    getInstantFuelConsumption () {
        return this.getParameter(GetVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * @param {FuelRange[]} range - The estimate range in KM the vehicle can travel based on fuel level and consumption
     * @return {GetVehicleDataResponse}
     */
    setFuelRange (range) {
        this.validateType(FuelRange, range, true);
        this.setParameter(GetVehicleDataResponse.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * @return {FuelRange[]}
     */
    getFuelRange () {
        return this.getObject(FuelRange, GetVehicleDataResponse.KEY_FUEL_RANGE);
    }

    /**
     * @param {Number} temperature - The external temperature in degrees celsius
     * @return {GetVehicleDataResponse}
     */
    setExternalTemperature (temperature) {
        this.setParameter(GetVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Number}
     */
    getExternalTemperature () {
        return this.getParameter(GetVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * @param {TurnSignal} signal - See TurnSignal
     * @return {GetVehicleDataResponse}
     */
    setTurnSignal (signal) {
        this.validateType(TurnSignal, signal);
        this.setParameter(GetVehicleDataResponse.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * @return {TurnSignal}
     */
    getTurnSignal () {
        return this.getObject(TurnSignal, GetVehicleDataResponse.KEY_TURN_SIGNAL);
    }

    /**
     * @param {String} vin - Vehicle identification number
     * @return {GetVehicleDataResponse}
     */
    setVin (vin) {
        this.setParameter(GetVehicleDataResponse.KEY_VIN, vin);
        return this;
    }

    /**
     * @return {String}
     */
    getVin () {
        return this.getParameter(GetVehicleDataResponse.KEY_VIN);
    }

    /**
     * @param {PRNDL} prndl - See PRNDL
     * @return {GetVehicleDataResponse}
     */
    setPrndl (prndl) {
        this.validateType(PRNDL, prndl);
        this.setParameter(GetVehicleDataResponse.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * @return {PRNDL}
     */
    getPrndl () {
        return this.getObject(PRNDL, GetVehicleDataResponse.KEY_PRNDL);
    }

    /**
     * @param {TireStatus} pressure - See TireStatus
     * @return {GetVehicleDataResponse}
     */
    setTirePressure (pressure) {
        this.validateType(TireStatus, pressure);
        this.setParameter(GetVehicleDataResponse.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * @return {TireStatus}
     */
    getTirePressure () {
        return this.getObject(TireStatus, GetVehicleDataResponse.KEY_TIRE_PRESSURE);
    }

    /**
     * @param {Number} odometer - Odometer in km
     * @return {GetVehicleDataResponse}
     */
    setOdometer (odometer) {
        this.setParameter(GetVehicleDataResponse.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * @return {Number}
     */
    getOdometer () {
        return this.getParameter(GetVehicleDataResponse.KEY_ODOMETER);
    }

    /**
     * @param {BeltStatus} status - The status of the seat belts
     * @return {GetVehicleDataResponse}
     */
    setBeltStatus (status) {
        this.validateType(BeltStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * @return {BeltStatus}
     */
    getBeltStatus () {
        return this.getObject(BeltStatus, GetVehicleDataResponse.KEY_BELT_STATUS);
    }

    /**
     * @param {BodyInformation} information - The body information including power modes
     * @return {GetVehicleDataResponse}
     */
    setBodyInformation (information) {
        this.validateType(BodyInformation, information);
        this.setParameter(GetVehicleDataResponse.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * @return {BodyInformation}
     */
    getBodyInformation () {
        return this.getObject(BodyInformation, GetVehicleDataResponse.KEY_BODY_INFORMATION);
    }

    /**
     * @param {DeviceStatus} status - The device status including signal and battery strength
     * @return {GetVehicleDataResponse}
     */
    setDeviceStatus (status) {
        this.validateType(DeviceStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * @return {DeviceStatus}
     */
    getDeviceStatus () {
        return this.getObject(DeviceStatus, GetVehicleDataResponse.KEY_DEVICE_STATUS);
    }

    /**
     * @param {VehicleDataEventStatus} braking - The status of the brake pedal
     * @return {GetVehicleDataResponse}
     */
    setDriverBraking (braking) {
        this.validateType(VehicleDataEventStatus, braking);
        this.setParameter(GetVehicleDataResponse.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * @return {VehicleDataEventStatus}
     */
    getDriverBraking () {
        return this.getObject(VehicleDataEventStatus, GetVehicleDataResponse.KEY_DRIVER_BRAKING);
    }

    /**
     * @param {WiperStatus} status - The status of the wipers
     * @return {GetVehicleDataResponse}
     */
    setWiperStatus (status) {
        this.validateType(WiperStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * @return {WiperStatus}
     */
    getWiperStatus () {
        return this.getObject(WiperStatus, GetVehicleDataResponse.KEY_WIPER_STATUS);
    }

    /**
     * @param {HeadLampStatus} status - Status of the head lamps
     * @return {GetVehicleDataResponse}
     */
    setHeadLampStatus (status) {
        this.validateType(HeadLampStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * @return {HeadLampStatus}
     */
    getHeadLampStatus () {
        return this.getObject(HeadLampStatus, GetVehicleDataResponse.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * @param {Number} torque - Torque value for engine (in Nm) on non-diesel variants
     * @return {GetVehicleDataResponse}
     */
    setEngineTorque (torque) {
        this.setParameter(GetVehicleDataResponse.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * @return {Number}
     */
    getEngineTorque () {
        return this.getParameter(GetVehicleDataResponse.KEY_ENGINE_TORQUE);
    }

    /**
     * @param {Number} position - Accelerator pedal position (percentage depressed)
     * @return {GetVehicleDataResponse}
     */
    setAccPedalPosition (position) {
        this.setParameter(GetVehicleDataResponse.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getAccPedalPosition () {
        return this.getParameter(GetVehicleDataResponse.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * @param {Number} angle - Current angle of the steering wheel (in deg)
     * @return {GetVehicleDataResponse}
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(GetVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * @return {Number}
     */
    getSteeringWheelAngle () {
        return this.getParameter(GetVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * @param {Number} life - The estimated percentage of remaining oil life of the engine.
     * @return {GetVehicleDataResponse}
     */
    setEngineOilLife (life) {
        this.setParameter(GetVehicleDataResponse.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * @return {Number}
     */
    getEngineOilLife () {
        return this.getParameter(GetVehicleDataResponse.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * @param {ElectronicParkBrakeStatus} status - The status of the park brake as provided by Electric Park Brake (EPB)
     *                                             system.
     * @return {GetVehicleDataResponse}
     */
    setElectronicParkBrakeStatus (status) {
        this.validateType(ElectronicParkBrakeStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * @return {ElectronicParkBrakeStatus}
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(ElectronicParkBrakeStatus, GetVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * @param {String} id - Parameter used by cloud apps to identify a head unit
     * @return {GetVehicleDataResponse}
     */
    setCloudAppVehicleID (id) {
        this.setParameter(GetVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getCloudAppVehicleID () {
        return this.getParameter(GetVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * @param {ECallInfo} info - Emergency Call notification and confirmation data
     * @return {GetVehicleDataResponse}
     */
    setECallInfo (info) {
        this.validateType(ECallInfo, info);
        this.setParameter(GetVehicleDataResponse.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * @return {ECallInfo}
     */
    getECallInfo () {
        return this.getObject(ECallInfo, GetVehicleDataResponse.KEY_E_CALL_INFO);
    }

    /**
     * @param {AirbagStatus} status - The status of the air bags
     * @return {GetVehicleDataResponse}
     */
    setAirbagStatus (status) {
        this.validateType(AirbagStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * @return {AirbagStatus}
     */
    getAirbagStatus () {
        return this.getObject(AirbagStatus, GetVehicleDataResponse.KEY_AIRBAG_STATUS);
    }

    /**
     * @param {EmergencyEvent} event - Information related to an emergency event (and if it occurred)
     * @return {GetVehicleDataResponse}
     */
    setEmergencyEvent (event) {
        this.validateType(EmergencyEvent, event);
        this.setParameter(GetVehicleDataResponse.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * @return {EmergencyEvent}
     */
    getEmergencyEvent () {
        return this.getObject(EmergencyEvent, GetVehicleDataResponse.KEY_EMERGENCY_EVENT);
    }

    /**
     * @param {ClusterModeStatus} status - The status modes of the cluster
     * @return {GetVehicleDataResponse}
     */
    setClusterModeStatus (status) {
        this.validateType(ClusterModeStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {ClusterModeStatus}
     */
    getClusterModeStatus () {
        return this.getObject(ClusterModeStatus, GetVehicleDataResponse.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * @param {MyKey} key - Information related to the MyKey feature
     * @return {GetVehicleDataResponse}
     */
    setMyKey (key) {
        this.validateType(MyKey, key);
        this.setParameter(GetVehicleDataResponse.KEY_MY_KEY, key);
        return this;
    }

    /**
     * @return {MyKey}
     */
    getMyKey () {
        return this.getObject(MyKey, GetVehicleDataResponse.KEY_MY_KEY);
    }
}

GetVehicleDataResponse.KEY_GPS = 'gps';
GetVehicleDataResponse.KEY_SPEED = 'speed';
GetVehicleDataResponse.KEY_RPM = 'rpm';
GetVehicleDataResponse.KEY_FUEL_LEVEL = 'fuelLevel';
GetVehicleDataResponse.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
GetVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
GetVehicleDataResponse.KEY_FUEL_RANGE = 'fuelRange';
GetVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
GetVehicleDataResponse.KEY_TURN_SIGNAL = 'turnSignal';
GetVehicleDataResponse.KEY_VIN = 'vin';
GetVehicleDataResponse.KEY_PRNDL = 'prndl';
GetVehicleDataResponse.KEY_TIRE_PRESSURE = 'tirePressure';
GetVehicleDataResponse.KEY_ODOMETER = 'odometer';
GetVehicleDataResponse.KEY_BELT_STATUS = 'beltStatus';
GetVehicleDataResponse.KEY_BODY_INFORMATION = 'bodyInformation';
GetVehicleDataResponse.KEY_DEVICE_STATUS = 'deviceStatus';
GetVehicleDataResponse.KEY_DRIVER_BRAKING = 'driverBraking';
GetVehicleDataResponse.KEY_WIPER_STATUS = 'wiperStatus';
GetVehicleDataResponse.KEY_HEAD_LAMP_STATUS = 'headLampStatus';
GetVehicleDataResponse.KEY_ENGINE_TORQUE = 'engineTorque';
GetVehicleDataResponse.KEY_ACC_PEDAL_POSITION = 'accPedalPosition';
GetVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE = 'steeringWheelAngle';
GetVehicleDataResponse.KEY_ENGINE_OIL_LIFE = 'engineOilLife';
GetVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS = 'electronicParkBrakeStatus';
GetVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID = 'cloudAppVehicleID';
GetVehicleDataResponse.KEY_E_CALL_INFO = 'eCallInfo';
GetVehicleDataResponse.KEY_AIRBAG_STATUS = 'airbagStatus';
GetVehicleDataResponse.KEY_EMERGENCY_EVENT = 'emergencyEvent';
GetVehicleDataResponse.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
GetVehicleDataResponse.KEY_MY_KEY = 'myKey';

export { GetVehicleDataResponse };