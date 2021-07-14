/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
import { ClimateData } from '../structs/ClimateData.js';
import { ClusterModeStatus } from '../structs/ClusterModeStatus.js';
import { ComponentVolumeStatus } from '../enums/ComponentVolumeStatus.js';
import { DeviceStatus } from '../structs/DeviceStatus.js';
import { ECallInfo } from '../structs/ECallInfo.js';
import { ElectronicParkBrakeStatus } from '../enums/ElectronicParkBrakeStatus.js';
import { EmergencyEvent } from '../structs/EmergencyEvent.js';
import { FuelRange } from '../structs/FuelRange.js';
import { FunctionID } from '../enums/FunctionID.js';
import { GPSData } from '../structs/GPSData.js';
import { GearStatus } from '../structs/GearStatus.js';
import { HeadLampStatus } from '../structs/HeadLampStatus.js';
import { MyKey } from '../structs/MyKey.js';
import { PRNDL } from '../enums/PRNDL.js';
import { RpcNotification } from '../RpcNotification.js';
import { SeatOccupancy } from '../structs/SeatOccupancy.js';
import { StabilityControlsStatus } from '../structs/StabilityControlsStatus.js';
import { TireStatus } from '../structs/TireStatus.js';
import { TurnSignal } from '../enums/TurnSignal.js';
import { VehicleDataEventStatus } from '../enums/VehicleDataEventStatus.js';
import { WindowStatus } from '../structs/WindowStatus.js';
import { WiperStatus } from '../enums/WiperStatus.js';

/**
 * Callback for the periodic and non periodic vehicle data read function.
 */
class OnVehicleData extends RpcNotification {
    /**
     * Initializes an instance of OnVehicleData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.OnVehicleData);
    }

    /**
     * Set the Gps
     * @param {GPSData} gps - See GPSData - The desired Gps.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setGps (gps) {
        this._validateType(GPSData, gps);
        this.setParameter(OnVehicleData.KEY_GPS, gps);
        return this;
    }

    /**
     * Get the Gps
     * @returns {GPSData} - the KEY_GPS value
     */
    getGps () {
        return this.getObject(GPSData, OnVehicleData.KEY_GPS);
    }

    /**
     * Set the Speed
     * @param {Number} speed - The vehicle speed in kilometers per hour - The desired Speed.
     * {'num_min_value': 0.0, 'num_max_value': 700.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this.setParameter(OnVehicleData.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {Number} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getParameter(OnVehicleData.KEY_SPEED);
    }

    /**
     * Set the Rpm
     * @param {Number} rpm - The number of revolutions per minute of the engine - The desired Rpm.
     * {'num_min_value': 0, 'num_max_value': 20000}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setRpm (rpm) {
        this.setParameter(OnVehicleData.KEY_RPM, rpm);
        return this;
    }

    /**
     * Get the Rpm
     * @returns {Number} - the KEY_RPM value
     */
    getRpm () {
        return this.getParameter(OnVehicleData.KEY_RPM);
    }

    /**
     * Set the FuelLevel
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {Number} level - The fuel level in the tank (percentage). This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel.
     * {'num_min_value': -6.0, 'num_max_value': 106.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setFuelLevel (level) {
        this.setParameter(OnVehicleData.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * Get the FuelLevel
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {Number} - the KEY_FUEL_LEVEL value
     */
    getFuelLevel () {
        return this.getParameter(OnVehicleData.KEY_FUEL_LEVEL);
    }

    /**
     * Set the FuelLevel_State
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {ComponentVolumeStatus} level_state - The fuel level state. This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel_State.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setFuelLevel_State (level_state) {
        this._validateType(ComponentVolumeStatus, level_state);
        this.setParameter(OnVehicleData.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * Get the FuelLevel_State
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {ComponentVolumeStatus} - the KEY_FUEL_LEVEL_STATE value
     */
    getFuelLevel_State () {
        return this.getObject(ComponentVolumeStatus, OnVehicleData.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * Set the InstantFuelConsumption
     * @param {Number} consumption - The instantaneous fuel consumption in microlitres - The desired InstantFuelConsumption.
     * {'num_min_value': 0.0, 'num_max_value': 25575.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(OnVehicleData.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * Get the InstantFuelConsumption
     * @returns {Number} - the KEY_INSTANT_FUEL_CONSUMPTION value
     */
    getInstantFuelConsumption () {
        return this.getParameter(OnVehicleData.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * Set the FuelRange
     * @since SmartDeviceLink 5.0.0
     * @param {FuelRange[]} range - The fuel type, estimated range in KM, fuel level/capacity and fuel level state for the vehicle. See struct FuelRange for details. - The desired FuelRange.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setFuelRange (range) {
        this._validateType(FuelRange, range, true);
        this.setParameter(OnVehicleData.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * Get the FuelRange
     * @returns {FuelRange[]} - the KEY_FUEL_RANGE value
     */
    getFuelRange () {
        return this.getObject(FuelRange, OnVehicleData.KEY_FUEL_RANGE);
    }

    /**
     * Set the ClimateData
     * @since SmartDeviceLink 7.1.0
     * @param {ClimateData} data - See ClimateData - The desired ClimateData.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setClimateData (data) {
        this._validateType(ClimateData, data);
        this.setParameter(OnVehicleData.KEY_CLIMATE_DATA, data);
        return this;
    }

    /**
     * Get the ClimateData
     * @returns {ClimateData} - the KEY_CLIMATE_DATA value
     */
    getClimateData () {
        return this.getObject(ClimateData, OnVehicleData.KEY_CLIMATE_DATA);
    }

    /**
     * Set the ExternalTemperature
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {Number} temperature - The external temperature in degrees celsius. This parameter is deprecated starting RPC Spec 7.1, please see climateData. - The desired ExternalTemperature.
     * {'num_min_value': -40.0, 'num_max_value': 100.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this.setParameter(OnVehicleData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @returns {Number} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getParameter(OnVehicleData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the TurnSignal
     * @since SmartDeviceLink 5.0.0
     * @param {TurnSignal} signal - See TurnSignal - The desired TurnSignal.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setTurnSignal (signal) {
        this._validateType(TurnSignal, signal);
        this.setParameter(OnVehicleData.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * Get the TurnSignal
     * @returns {TurnSignal} - the KEY_TURN_SIGNAL value
     */
    getTurnSignal () {
        return this.getObject(TurnSignal, OnVehicleData.KEY_TURN_SIGNAL);
    }

    /**
     * Set the Vin
     * @param {String} vin - Vehicle identification number. - The desired Vin.
     * {'string_min_length': 1, 'string_max_length': 17}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setVin (vin) {
        this.setParameter(OnVehicleData.KEY_VIN, vin);
        return this;
    }

    /**
     * Get the Vin
     * @returns {String} - the KEY_VIN value
     */
    getVin () {
        return this.getParameter(OnVehicleData.KEY_VIN);
    }

    /**
     * Set the GearStatus
     * @since SmartDeviceLink 7.0.0
     * @param {GearStatus} status - See GearStatus - The desired GearStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setGearStatus (status) {
        this._validateType(GearStatus, status);
        this.setParameter(OnVehicleData.KEY_GEAR_STATUS, status);
        return this;
    }

    /**
     * Get the GearStatus
     * @returns {GearStatus} - the KEY_GEAR_STATUS value
     */
    getGearStatus () {
        return this.getObject(GearStatus, OnVehicleData.KEY_GEAR_STATUS);
    }

    /**
     * Set the Prndl
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @param {PRNDL} prndl - See PRNDL. This parameter is deprecated and it is now covered in `gearStatus` - The desired Prndl.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setPrndl (prndl) {
        this._validateType(PRNDL, prndl);
        this.setParameter(OnVehicleData.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * Get the Prndl
     * @since SmartDeviceLink 2.0.0
     * @deprecated in SmartDeviceLink 7.0.0
     * @returns {PRNDL} - the KEY_PRNDL value
     */
    getPrndl () {
        return this.getObject(PRNDL, OnVehicleData.KEY_PRNDL);
    }

    /**
     * Set the TirePressure
     * @param {TireStatus} pressure - See TireStatus - The desired TirePressure.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setTirePressure (pressure) {
        this._validateType(TireStatus, pressure);
        this.setParameter(OnVehicleData.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the TirePressure
     * @returns {TireStatus} - the KEY_TIRE_PRESSURE value
     */
    getTirePressure () {
        return this.getObject(TireStatus, OnVehicleData.KEY_TIRE_PRESSURE);
    }

    /**
     * Set the Odometer
     * @param {Number} odometer - Odometer in km - The desired Odometer.
     * {'num_min_value': 0, 'num_max_value': 17000000}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setOdometer (odometer) {
        this.setParameter(OnVehicleData.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * Get the Odometer
     * @returns {Number} - the KEY_ODOMETER value
     */
    getOdometer () {
        return this.getParameter(OnVehicleData.KEY_ODOMETER);
    }

    /**
     * Set the BeltStatus
     * @param {BeltStatus} status - The status of the seat belts - The desired BeltStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setBeltStatus (status) {
        this._validateType(BeltStatus, status);
        this.setParameter(OnVehicleData.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * Get the BeltStatus
     * @returns {BeltStatus} - the KEY_BELT_STATUS value
     */
    getBeltStatus () {
        return this.getObject(BeltStatus, OnVehicleData.KEY_BELT_STATUS);
    }

    /**
     * Set the BodyInformation
     * @param {BodyInformation} information - The body information including power modes - The desired BodyInformation.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setBodyInformation (information) {
        this._validateType(BodyInformation, information);
        this.setParameter(OnVehicleData.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * Get the BodyInformation
     * @returns {BodyInformation} - the KEY_BODY_INFORMATION value
     */
    getBodyInformation () {
        return this.getObject(BodyInformation, OnVehicleData.KEY_BODY_INFORMATION);
    }

    /**
     * Set the DeviceStatus
     * @param {DeviceStatus} status - The device status including signal and battery strength - The desired DeviceStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setDeviceStatus (status) {
        this._validateType(DeviceStatus, status);
        this.setParameter(OnVehicleData.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * Get the DeviceStatus
     * @returns {DeviceStatus} - the KEY_DEVICE_STATUS value
     */
    getDeviceStatus () {
        return this.getObject(DeviceStatus, OnVehicleData.KEY_DEVICE_STATUS);
    }

    /**
     * Set the DriverBraking
     * @param {VehicleDataEventStatus} braking - The status of the brake pedal - The desired DriverBraking.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setDriverBraking (braking) {
        this._validateType(VehicleDataEventStatus, braking);
        this.setParameter(OnVehicleData.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * Get the DriverBraking
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_BRAKING value
     */
    getDriverBraking () {
        return this.getObject(VehicleDataEventStatus, OnVehicleData.KEY_DRIVER_BRAKING);
    }

    /**
     * Set the WiperStatus
     * @param {WiperStatus} status - The status of the wipers - The desired WiperStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setWiperStatus (status) {
        this._validateType(WiperStatus, status);
        this.setParameter(OnVehicleData.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * Get the WiperStatus
     * @returns {WiperStatus} - the KEY_WIPER_STATUS value
     */
    getWiperStatus () {
        return this.getObject(WiperStatus, OnVehicleData.KEY_WIPER_STATUS);
    }

    /**
     * Set the HeadLampStatus
     * @param {HeadLampStatus} status - Status of the head lamps - The desired HeadLampStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setHeadLampStatus (status) {
        this._validateType(HeadLampStatus, status);
        this.setParameter(OnVehicleData.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * Get the HeadLampStatus
     * @returns {HeadLampStatus} - the KEY_HEAD_LAMP_STATUS value
     */
    getHeadLampStatus () {
        return this.getObject(HeadLampStatus, OnVehicleData.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * Set the EngineTorque
     * @param {Number} torque - Torque value for engine (in Nm) on non-diesel variants - The desired EngineTorque.
     * {'num_min_value': -1000.0, 'num_max_value': 2000.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setEngineTorque (torque) {
        this.setParameter(OnVehicleData.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * Get the EngineTorque
     * @returns {Number} - the KEY_ENGINE_TORQUE value
     */
    getEngineTorque () {
        return this.getParameter(OnVehicleData.KEY_ENGINE_TORQUE);
    }

    /**
     * Set the AccPedalPosition
     * @param {Number} position - Accelerator pedal position (percentage depressed) - The desired AccPedalPosition.
     * {'num_min_value': 0.0, 'num_max_value': 100.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setAccPedalPosition (position) {
        this.setParameter(OnVehicleData.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * Get the AccPedalPosition
     * @returns {Number} - the KEY_ACC_PEDAL_POSITION value
     */
    getAccPedalPosition () {
        return this.getParameter(OnVehicleData.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * Set the SteeringWheelAngle
     * @param {Number} angle - Current angle of the steering wheel (in deg) - The desired SteeringWheelAngle.
     * {'num_min_value': -2000.0, 'num_max_value': 2000.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(OnVehicleData.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * Get the SteeringWheelAngle
     * @returns {Number} - the KEY_STEERING_WHEEL_ANGLE value
     */
    getSteeringWheelAngle () {
        return this.getParameter(OnVehicleData.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * Set the EngineOilLife
     * @since SmartDeviceLink 5.0.0
     * @param {Number} life - The estimated percentage of remaining oil life of the engine. - The desired EngineOilLife.
     * {'num_min_value': 0.0, 'num_max_value': 100.0}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setEngineOilLife (life) {
        this.setParameter(OnVehicleData.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * Get the EngineOilLife
     * @returns {Number} - the KEY_ENGINE_OIL_LIFE value
     */
    getEngineOilLife () {
        return this.getParameter(OnVehicleData.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * Set the ElectronicParkBrakeStatus
     * @since SmartDeviceLink 5.0.0
     * @param {ElectronicParkBrakeStatus} status - The status of the park brake as provided by Electric Park Brake (EPB) system. - The desired ElectronicParkBrakeStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setElectronicParkBrakeStatus (status) {
        this._validateType(ElectronicParkBrakeStatus, status);
        this.setParameter(OnVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * Get the ElectronicParkBrakeStatus
     * @returns {ElectronicParkBrakeStatus} - the KEY_ELECTRONIC_PARK_BRAKE_STATUS value
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(ElectronicParkBrakeStatus, OnVehicleData.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * Set the CloudAppVehicleID
     * @since SmartDeviceLink 5.1.0
     * @param {String} id - Parameter used by cloud apps to identify a head unit - The desired CloudAppVehicleID.
     * {'string_min_length': 1}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setCloudAppVehicleID (id) {
        this.setParameter(OnVehicleData.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * Get the CloudAppVehicleID
     * @returns {String} - the KEY_CLOUD_APP_VEHICLE_ID value
     */
    getCloudAppVehicleID () {
        return this.getParameter(OnVehicleData.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * Set the StabilityControlsStatus
     * @since SmartDeviceLink 7.0.0
     * @param {StabilityControlsStatus} status - See StabilityControlsStatus - The desired StabilityControlsStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setStabilityControlsStatus (status) {
        this._validateType(StabilityControlsStatus, status);
        this.setParameter(OnVehicleData.KEY_STABILITY_CONTROLS_STATUS, status);
        return this;
    }

    /**
     * Get the StabilityControlsStatus
     * @returns {StabilityControlsStatus} - the KEY_STABILITY_CONTROLS_STATUS value
     */
    getStabilityControlsStatus () {
        return this.getObject(StabilityControlsStatus, OnVehicleData.KEY_STABILITY_CONTROLS_STATUS);
    }

    /**
     * Set the ECallInfo
     * @param {ECallInfo} info - Emergency Call notification and confirmation data - The desired ECallInfo.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setECallInfo (info) {
        this._validateType(ECallInfo, info);
        this.setParameter(OnVehicleData.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * Get the ECallInfo
     * @returns {ECallInfo} - the KEY_E_CALL_INFO value
     */
    getECallInfo () {
        return this.getObject(ECallInfo, OnVehicleData.KEY_E_CALL_INFO);
    }

    /**
     * Set the AirbagStatus
     * @param {AirbagStatus} status - The status of the air bags - The desired AirbagStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setAirbagStatus (status) {
        this._validateType(AirbagStatus, status);
        this.setParameter(OnVehicleData.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * Get the AirbagStatus
     * @returns {AirbagStatus} - the KEY_AIRBAG_STATUS value
     */
    getAirbagStatus () {
        return this.getObject(AirbagStatus, OnVehicleData.KEY_AIRBAG_STATUS);
    }

    /**
     * Set the EmergencyEvent
     * @param {EmergencyEvent} event - Information related to an emergency event (and if it occurred) - The desired EmergencyEvent.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setEmergencyEvent (event) {
        this._validateType(EmergencyEvent, event);
        this.setParameter(OnVehicleData.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * Get the EmergencyEvent
     * @returns {EmergencyEvent} - the KEY_EMERGENCY_EVENT value
     */
    getEmergencyEvent () {
        return this.getObject(EmergencyEvent, OnVehicleData.KEY_EMERGENCY_EVENT);
    }

    /**
     * Set the ClusterModeStatus
     * @param {ClusterModeStatus} status - The status modes of the cluster - The desired ClusterModeStatus.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setClusterModeStatus (status) {
        this._validateType(ClusterModeStatus, status);
        this.setParameter(OnVehicleData.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * Get the ClusterModeStatus
     * @returns {ClusterModeStatus} - the KEY_CLUSTER_MODE_STATUS value
     */
    getClusterModeStatus () {
        return this.getObject(ClusterModeStatus, OnVehicleData.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * Set the MyKey
     * @param {MyKey} key - Information related to the MyKey feature - The desired MyKey.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setMyKey (key) {
        this._validateType(MyKey, key);
        this.setParameter(OnVehicleData.KEY_MY_KEY, key);
        return this;
    }

    /**
     * Get the MyKey
     * @returns {MyKey} - the KEY_MY_KEY value
     */
    getMyKey () {
        return this.getObject(MyKey, OnVehicleData.KEY_MY_KEY);
    }

    /**
     * Set the WindowStatus
     * @since SmartDeviceLink 7.0.0
     * @param {WindowStatus[]} status - See WindowStatus - The desired WindowStatus.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setWindowStatus (status) {
        this._validateType(WindowStatus, status, true);
        this.setParameter(OnVehicleData.KEY_WINDOW_STATUS, status);
        return this;
    }

    /**
     * Get the WindowStatus
     * @returns {WindowStatus[]} - the KEY_WINDOW_STATUS value
     */
    getWindowStatus () {
        return this.getObject(WindowStatus, OnVehicleData.KEY_WINDOW_STATUS);
    }

    /**
     * Set the HandsOffSteering
     * @since SmartDeviceLink 7.0.0
     * @param {Boolean} steering - To indicate whether driver hands are off the steering wheel - The desired HandsOffSteering.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setHandsOffSteering (steering) {
        this.setParameter(OnVehicleData.KEY_HANDS_OFF_STEERING, steering);
        return this;
    }

    /**
     * Get the HandsOffSteering
     * @returns {Boolean} - the KEY_HANDS_OFF_STEERING value
     */
    getHandsOffSteering () {
        return this.getParameter(OnVehicleData.KEY_HANDS_OFF_STEERING);
    }

    /**
     * Set the SeatOccupancy
     * @since SmartDeviceLink 7.1.0
     * @param {SeatOccupancy} occupancy - See SeatOccupancy - The desired SeatOccupancy.
     * @returns {OnVehicleData} - The class instance for method chaining.
     */
    setSeatOccupancy (occupancy) {
        this._validateType(SeatOccupancy, occupancy);
        this.setParameter(OnVehicleData.KEY_SEAT_OCCUPANCY, occupancy);
        return this;
    }

    /**
     * Get the SeatOccupancy
     * @returns {SeatOccupancy} - the KEY_SEAT_OCCUPANCY value
     */
    getSeatOccupancy () {
        return this.getObject(SeatOccupancy, OnVehicleData.KEY_SEAT_OCCUPANCY);
    }
}

OnVehicleData.KEY_GPS = 'gps';
OnVehicleData.KEY_SPEED = 'speed';
OnVehicleData.KEY_RPM = 'rpm';
OnVehicleData.KEY_FUEL_LEVEL = 'fuelLevel';
OnVehicleData.KEY_FUEL_LEVEL_STATE = 'fuelLevel_State';
OnVehicleData.KEY_INSTANT_FUEL_CONSUMPTION = 'instantFuelConsumption';
OnVehicleData.KEY_FUEL_RANGE = 'fuelRange';
OnVehicleData.KEY_CLIMATE_DATA = 'climateData';
OnVehicleData.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
OnVehicleData.KEY_TURN_SIGNAL = 'turnSignal';
OnVehicleData.KEY_VIN = 'vin';
OnVehicleData.KEY_GEAR_STATUS = 'gearStatus';
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
OnVehicleData.KEY_STABILITY_CONTROLS_STATUS = 'stabilityControlsStatus';
OnVehicleData.KEY_E_CALL_INFO = 'eCallInfo';
OnVehicleData.KEY_AIRBAG_STATUS = 'airbagStatus';
OnVehicleData.KEY_EMERGENCY_EVENT = 'emergencyEvent';
OnVehicleData.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
OnVehicleData.KEY_MY_KEY = 'myKey';
OnVehicleData.KEY_WINDOW_STATUS = 'windowStatus';
OnVehicleData.KEY_HANDS_OFF_STEERING = 'handsOffSteering';
OnVehicleData.KEY_SEAT_OCCUPANCY = 'seatOccupancy';

export { OnVehicleData };