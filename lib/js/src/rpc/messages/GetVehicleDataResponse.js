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
import { GearStatus } from '../structs/GearStatus.js';
import { HeadLampStatus } from '../structs/HeadLampStatus.js';
import { MyKey } from '../structs/MyKey.js';
import { PRNDL } from '../enums/PRNDL.js';
import { RpcResponse } from '../RpcResponse.js';
import { StabilityControlsStatus } from '../structs/StabilityControlsStatus.js';
import { TireStatus } from '../structs/TireStatus.js';
import { TurnSignal } from '../enums/TurnSignal.js';
import { VehicleDataEventStatus } from '../enums/VehicleDataEventStatus.js';
import { WindowStatus } from '../structs/WindowStatus.js';
import { WiperStatus } from '../enums/WiperStatus.js';

class GetVehicleDataResponse extends RpcResponse {
    /**
     * Initalizes an instance of GetVehicleDataResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetVehicleData);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * Sets a value for OEM Custom VehicleData.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @param {Object} vehicleDataState - The value associated with the custom vehicle data.
     * @returns {GetVehicleDataResponse} - The class instance to support method chaining.
     */
    setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
        this.setParameter(vehicleDataName, vehicleDataState);
        return this;
    }

    /**
     * Gets a VehicleData value for the vehicle data item.
     * @param {String} vehicleDataName - The key associated with the custom vehicle data.
     * @returns {Object} - The value associated with the custom vehicle data.
     */
    getOEMCustomVehicleData (vehicleDataName) {
        return this.getParameter(vehicleDataName);
    }

    // ----------------- END -----------------------

    /**
     * Set the Gps
     * @param {GPSData} gps - See GPSData - The desired Gps.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setGps (gps) {
        this._validateType(GPSData, gps);
        this.setParameter(GetVehicleDataResponse.KEY_GPS, gps);
        return this;
    }

    /**
     * Get the Gps
     * @returns {GPSData} - the KEY_GPS value
     */
    getGps () {
        return this.getObject(GPSData, GetVehicleDataResponse.KEY_GPS);
    }

    /**
     * Set the Speed
     * @param {Number} speed - The vehicle speed in kilometers per hour - The desired Speed.
     * {'num_min_value': 0.0, 'num_max_value': 700.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this.setParameter(GetVehicleDataResponse.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {Number} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getParameter(GetVehicleDataResponse.KEY_SPEED);
    }

    /**
     * Set the Rpm
     * @param {Number} rpm - The number of revolutions per minute of the engine - The desired Rpm.
     * {'num_min_value': 0, 'num_max_value': 20000}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setRpm (rpm) {
        this.setParameter(GetVehicleDataResponse.KEY_RPM, rpm);
        return this;
    }

    /**
     * Get the Rpm
     * @returns {Number} - the KEY_RPM value
     */
    getRpm () {
        return this.getParameter(GetVehicleDataResponse.KEY_RPM);
    }

    /**
     * Set the FuelLevel
     * @param {Number} level - The fuel level in the tank (percentage). This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel.
     * {'num_min_value': -6.0, 'num_max_value': 106.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelLevel (level) {
        this.setParameter(GetVehicleDataResponse.KEY_FUEL_LEVEL, level);
        return this;
    }

    /**
     * Get the FuelLevel
     * @returns {Number} - the KEY_FUEL_LEVEL value
     */
    getFuelLevel () {
        return this.getParameter(GetVehicleDataResponse.KEY_FUEL_LEVEL);
    }

    /**
     * Set the FuelLevel_State
     * @param {ComponentVolumeStatus} level_state - The fuel level state. This parameter is deprecated starting RPC Spec 7.0, please see fuelRange. - The desired FuelLevel_State.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelLevel_State (level_state) {
        this._validateType(ComponentVolumeStatus, level_state);
        this.setParameter(GetVehicleDataResponse.KEY_FUEL_LEVEL_STATE, level_state);
        return this;
    }

    /**
     * Get the FuelLevel_State
     * @returns {ComponentVolumeStatus} - the KEY_FUEL_LEVEL_STATE value
     */
    getFuelLevel_State () {
        return this.getObject(ComponentVolumeStatus, GetVehicleDataResponse.KEY_FUEL_LEVEL_STATE);
    }

    /**
     * Set the InstantFuelConsumption
     * @param {Number} consumption - The instantaneous fuel consumption in microlitres - The desired InstantFuelConsumption.
     * {'num_min_value': 0.0, 'num_max_value': 25575.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setInstantFuelConsumption (consumption) {
        this.setParameter(GetVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION, consumption);
        return this;
    }

    /**
     * Get the InstantFuelConsumption
     * @returns {Number} - the KEY_INSTANT_FUEL_CONSUMPTION value
     */
    getInstantFuelConsumption () {
        return this.getParameter(GetVehicleDataResponse.KEY_INSTANT_FUEL_CONSUMPTION);
    }

    /**
     * Set the FuelRange
     * @param {FuelRange[]} range - The fuel type, estimated range in KM, fuel level/capacity and fuel level state for the vehicle. See struct FuelRange for details. - The desired FuelRange.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setFuelRange (range) {
        this._validateType(FuelRange, range, true);
        this.setParameter(GetVehicleDataResponse.KEY_FUEL_RANGE, range);
        return this;
    }

    /**
     * Get the FuelRange
     * @returns {FuelRange[]} - the KEY_FUEL_RANGE value
     */
    getFuelRange () {
        return this.getObject(FuelRange, GetVehicleDataResponse.KEY_FUEL_RANGE);
    }

    /**
     * Set the ExternalTemperature
     * @param {Number} temperature - The external temperature in degrees celsius - The desired ExternalTemperature.
     * {'num_min_value': -40.0, 'num_max_value': 100.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this.setParameter(GetVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @returns {Number} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getParameter(GetVehicleDataResponse.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the TurnSignal
     * @param {TurnSignal} signal - See TurnSignal - The desired TurnSignal.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setTurnSignal (signal) {
        this._validateType(TurnSignal, signal);
        this.setParameter(GetVehicleDataResponse.KEY_TURN_SIGNAL, signal);
        return this;
    }

    /**
     * Get the TurnSignal
     * @returns {TurnSignal} - the KEY_TURN_SIGNAL value
     */
    getTurnSignal () {
        return this.getObject(TurnSignal, GetVehicleDataResponse.KEY_TURN_SIGNAL);
    }

    /**
     * Set the Vin
     * @param {String} vin - Vehicle identification number - The desired Vin.
     * {'string_min_length': 1, 'string_max_length': 17}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setVin (vin) {
        this.setParameter(GetVehicleDataResponse.KEY_VIN, vin);
        return this;
    }

    /**
     * Get the Vin
     * @returns {String} - the KEY_VIN value
     */
    getVin () {
        return this.getParameter(GetVehicleDataResponse.KEY_VIN);
    }

    /**
     * Set the GearStatus
     * @param {GearStatus} status - See GearStatus - The desired GearStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setGearStatus (status) {
        this._validateType(GearStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_GEAR_STATUS, status);
        return this;
    }

    /**
     * Get the GearStatus
     * @returns {GearStatus} - the KEY_GEAR_STATUS value
     */
    getGearStatus () {
        return this.getObject(GearStatus, GetVehicleDataResponse.KEY_GEAR_STATUS);
    }

    /**
     * Set the Prndl
     * @param {PRNDL} prndl - See PRNDL. This parameter is deprecated and it is now covered in `gearStatus` - The desired Prndl.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setPrndl (prndl) {
        this._validateType(PRNDL, prndl);
        this.setParameter(GetVehicleDataResponse.KEY_PRNDL, prndl);
        return this;
    }

    /**
     * Get the Prndl
     * @returns {PRNDL} - the KEY_PRNDL value
     */
    getPrndl () {
        return this.getObject(PRNDL, GetVehicleDataResponse.KEY_PRNDL);
    }

    /**
     * Set the TirePressure
     * @param {TireStatus} pressure - See TireStatus - The desired TirePressure.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setTirePressure (pressure) {
        this._validateType(TireStatus, pressure);
        this.setParameter(GetVehicleDataResponse.KEY_TIRE_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the TirePressure
     * @returns {TireStatus} - the KEY_TIRE_PRESSURE value
     */
    getTirePressure () {
        return this.getObject(TireStatus, GetVehicleDataResponse.KEY_TIRE_PRESSURE);
    }

    /**
     * Set the Odometer
     * @param {Number} odometer - Odometer in km - The desired Odometer.
     * {'num_min_value': 0, 'num_max_value': 17000000}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setOdometer (odometer) {
        this.setParameter(GetVehicleDataResponse.KEY_ODOMETER, odometer);
        return this;
    }

    /**
     * Get the Odometer
     * @returns {Number} - the KEY_ODOMETER value
     */
    getOdometer () {
        return this.getParameter(GetVehicleDataResponse.KEY_ODOMETER);
    }

    /**
     * Set the BeltStatus
     * @param {BeltStatus} status - The status of the seat belts - The desired BeltStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setBeltStatus (status) {
        this._validateType(BeltStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_BELT_STATUS, status);
        return this;
    }

    /**
     * Get the BeltStatus
     * @returns {BeltStatus} - the KEY_BELT_STATUS value
     */
    getBeltStatus () {
        return this.getObject(BeltStatus, GetVehicleDataResponse.KEY_BELT_STATUS);
    }

    /**
     * Set the BodyInformation
     * @param {BodyInformation} information - The body information including power modes - The desired BodyInformation.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setBodyInformation (information) {
        this._validateType(BodyInformation, information);
        this.setParameter(GetVehicleDataResponse.KEY_BODY_INFORMATION, information);
        return this;
    }

    /**
     * Get the BodyInformation
     * @returns {BodyInformation} - the KEY_BODY_INFORMATION value
     */
    getBodyInformation () {
        return this.getObject(BodyInformation, GetVehicleDataResponse.KEY_BODY_INFORMATION);
    }

    /**
     * Set the DeviceStatus
     * @param {DeviceStatus} status - The device status including signal and battery strength - The desired DeviceStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setDeviceStatus (status) {
        this._validateType(DeviceStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_DEVICE_STATUS, status);
        return this;
    }

    /**
     * Get the DeviceStatus
     * @returns {DeviceStatus} - the KEY_DEVICE_STATUS value
     */
    getDeviceStatus () {
        return this.getObject(DeviceStatus, GetVehicleDataResponse.KEY_DEVICE_STATUS);
    }

    /**
     * Set the DriverBraking
     * @param {VehicleDataEventStatus} braking - The status of the brake pedal - The desired DriverBraking.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setDriverBraking (braking) {
        this._validateType(VehicleDataEventStatus, braking);
        this.setParameter(GetVehicleDataResponse.KEY_DRIVER_BRAKING, braking);
        return this;
    }

    /**
     * Get the DriverBraking
     * @returns {VehicleDataEventStatus} - the KEY_DRIVER_BRAKING value
     */
    getDriverBraking () {
        return this.getObject(VehicleDataEventStatus, GetVehicleDataResponse.KEY_DRIVER_BRAKING);
    }

    /**
     * Set the WiperStatus
     * @param {WiperStatus} status - The status of the wipers - The desired WiperStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setWiperStatus (status) {
        this._validateType(WiperStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_WIPER_STATUS, status);
        return this;
    }

    /**
     * Get the WiperStatus
     * @returns {WiperStatus} - the KEY_WIPER_STATUS value
     */
    getWiperStatus () {
        return this.getObject(WiperStatus, GetVehicleDataResponse.KEY_WIPER_STATUS);
    }

    /**
     * Set the HeadLampStatus
     * @param {HeadLampStatus} status - Status of the head lamps - The desired HeadLampStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setHeadLampStatus (status) {
        this._validateType(HeadLampStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_HEAD_LAMP_STATUS, status);
        return this;
    }

    /**
     * Get the HeadLampStatus
     * @returns {HeadLampStatus} - the KEY_HEAD_LAMP_STATUS value
     */
    getHeadLampStatus () {
        return this.getObject(HeadLampStatus, GetVehicleDataResponse.KEY_HEAD_LAMP_STATUS);
    }

    /**
     * Set the EngineTorque
     * @param {Number} torque - Torque value for engine (in Nm) on non-diesel variants - The desired EngineTorque.
     * {'num_min_value': -1000.0, 'num_max_value': 2000.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setEngineTorque (torque) {
        this.setParameter(GetVehicleDataResponse.KEY_ENGINE_TORQUE, torque);
        return this;
    }

    /**
     * Get the EngineTorque
     * @returns {Number} - the KEY_ENGINE_TORQUE value
     */
    getEngineTorque () {
        return this.getParameter(GetVehicleDataResponse.KEY_ENGINE_TORQUE);
    }

    /**
     * Set the AccPedalPosition
     * @param {Number} position - Accelerator pedal position (percentage depressed) - The desired AccPedalPosition.
     * {'num_min_value': 0.0, 'num_max_value': 100.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setAccPedalPosition (position) {
        this.setParameter(GetVehicleDataResponse.KEY_ACC_PEDAL_POSITION, position);
        return this;
    }

    /**
     * Get the AccPedalPosition
     * @returns {Number} - the KEY_ACC_PEDAL_POSITION value
     */
    getAccPedalPosition () {
        return this.getParameter(GetVehicleDataResponse.KEY_ACC_PEDAL_POSITION);
    }

    /**
     * Set the SteeringWheelAngle
     * @param {Number} angle - Current angle of the steering wheel (in deg) - The desired SteeringWheelAngle.
     * {'num_min_value': -2000.0, 'num_max_value': 2000.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setSteeringWheelAngle (angle) {
        this.setParameter(GetVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE, angle);
        return this;
    }

    /**
     * Get the SteeringWheelAngle
     * @returns {Number} - the KEY_STEERING_WHEEL_ANGLE value
     */
    getSteeringWheelAngle () {
        return this.getParameter(GetVehicleDataResponse.KEY_STEERING_WHEEL_ANGLE);
    }

    /**
     * Set the EngineOilLife
     * @param {Number} life - The estimated percentage of remaining oil life of the engine. - The desired EngineOilLife.
     * {'num_min_value': 0.0, 'num_max_value': 100.0}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setEngineOilLife (life) {
        this.setParameter(GetVehicleDataResponse.KEY_ENGINE_OIL_LIFE, life);
        return this;
    }

    /**
     * Get the EngineOilLife
     * @returns {Number} - the KEY_ENGINE_OIL_LIFE value
     */
    getEngineOilLife () {
        return this.getParameter(GetVehicleDataResponse.KEY_ENGINE_OIL_LIFE);
    }

    /**
     * Set the ElectronicParkBrakeStatus
     * @param {ElectronicParkBrakeStatus} status - The status of the park brake as provided by Electric Park Brake (EPB) system. - The desired ElectronicParkBrakeStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setElectronicParkBrakeStatus (status) {
        this._validateType(ElectronicParkBrakeStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS, status);
        return this;
    }

    /**
     * Get the ElectronicParkBrakeStatus
     * @returns {ElectronicParkBrakeStatus} - the KEY_ELECTRONIC_PARK_BRAKE_STATUS value
     */
    getElectronicParkBrakeStatus () {
        return this.getObject(ElectronicParkBrakeStatus, GetVehicleDataResponse.KEY_ELECTRONIC_PARK_BRAKE_STATUS);
    }

    /**
     * Set the CloudAppVehicleID
     * @param {String} id - Parameter used by cloud apps to identify a head unit - The desired CloudAppVehicleID.
     * {'string_min_length': 1}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setCloudAppVehicleID (id) {
        this.setParameter(GetVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID, id);
        return this;
    }

    /**
     * Get the CloudAppVehicleID
     * @returns {String} - the KEY_CLOUD_APP_VEHICLE_ID value
     */
    getCloudAppVehicleID () {
        return this.getParameter(GetVehicleDataResponse.KEY_CLOUD_APP_VEHICLE_ID);
    }

    /**
     * Set the StabilityControlsStatus
     * @param {StabilityControlsStatus} status - See StabilityControlsStatus - The desired StabilityControlsStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setStabilityControlsStatus (status) {
        this._validateType(StabilityControlsStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS, status);
        return this;
    }

    /**
     * Get the StabilityControlsStatus
     * @returns {StabilityControlsStatus} - the KEY_STABILITY_CONTROLS_STATUS value
     */
    getStabilityControlsStatus () {
        return this.getObject(StabilityControlsStatus, GetVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS);
    }

    /**
     * Set the ECallInfo
     * @param {ECallInfo} info - Emergency Call notification and confirmation data - The desired ECallInfo.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setECallInfo (info) {
        this._validateType(ECallInfo, info);
        this.setParameter(GetVehicleDataResponse.KEY_E_CALL_INFO, info);
        return this;
    }

    /**
     * Get the ECallInfo
     * @returns {ECallInfo} - the KEY_E_CALL_INFO value
     */
    getECallInfo () {
        return this.getObject(ECallInfo, GetVehicleDataResponse.KEY_E_CALL_INFO);
    }

    /**
     * Set the AirbagStatus
     * @param {AirbagStatus} status - The status of the air bags - The desired AirbagStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setAirbagStatus (status) {
        this._validateType(AirbagStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_AIRBAG_STATUS, status);
        return this;
    }

    /**
     * Get the AirbagStatus
     * @returns {AirbagStatus} - the KEY_AIRBAG_STATUS value
     */
    getAirbagStatus () {
        return this.getObject(AirbagStatus, GetVehicleDataResponse.KEY_AIRBAG_STATUS);
    }

    /**
     * Set the EmergencyEvent
     * @param {EmergencyEvent} event - Information related to an emergency event (and if it occurred) - The desired EmergencyEvent.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setEmergencyEvent (event) {
        this._validateType(EmergencyEvent, event);
        this.setParameter(GetVehicleDataResponse.KEY_EMERGENCY_EVENT, event);
        return this;
    }

    /**
     * Get the EmergencyEvent
     * @returns {EmergencyEvent} - the KEY_EMERGENCY_EVENT value
     */
    getEmergencyEvent () {
        return this.getObject(EmergencyEvent, GetVehicleDataResponse.KEY_EMERGENCY_EVENT);
    }

    /**
     * Set the ClusterModeStatus
     * @param {ClusterModeStatus} status - The status modes of the cluster - The desired ClusterModeStatus.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setClusterModeStatus (status) {
        this._validateType(ClusterModeStatus, status);
        this.setParameter(GetVehicleDataResponse.KEY_CLUSTER_MODE_STATUS, status);
        return this;
    }

    /**
     * Get the ClusterModeStatus
     * @returns {ClusterModeStatus} - the KEY_CLUSTER_MODE_STATUS value
     */
    getClusterModeStatus () {
        return this.getObject(ClusterModeStatus, GetVehicleDataResponse.KEY_CLUSTER_MODE_STATUS);
    }

    /**
     * Set the MyKey
     * @param {MyKey} key - Information related to the MyKey feature - The desired MyKey.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setMyKey (key) {
        this._validateType(MyKey, key);
        this.setParameter(GetVehicleDataResponse.KEY_MY_KEY, key);
        return this;
    }

    /**
     * Get the MyKey
     * @returns {MyKey} - the KEY_MY_KEY value
     */
    getMyKey () {
        return this.getObject(MyKey, GetVehicleDataResponse.KEY_MY_KEY);
    }

    /**
     * Set the WindowStatus
     * @param {WindowStatus[]} status - See WindowStatus - The desired WindowStatus.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setWindowStatus (status) {
        this._validateType(WindowStatus, status, true);
        this.setParameter(GetVehicleDataResponse.KEY_WINDOW_STATUS, status);
        return this;
    }

    /**
     * Get the WindowStatus
     * @returns {WindowStatus[]} - the KEY_WINDOW_STATUS value
     */
    getWindowStatus () {
        return this.getObject(WindowStatus, GetVehicleDataResponse.KEY_WINDOW_STATUS);
    }

    /**
     * Set the HandsOffSteering
     * @param {Boolean} steering - To indicate whether driver hands are off the steering wheel - The desired HandsOffSteering.
     * @returns {GetVehicleDataResponse} - The class instance for method chaining.
     */
    setHandsOffSteering (steering) {
        this.setParameter(GetVehicleDataResponse.KEY_HANDS_OFF_STEERING, steering);
        return this;
    }

    /**
     * Get the HandsOffSteering
     * @returns {Boolean} - the KEY_HANDS_OFF_STEERING value
     */
    getHandsOffSteering () {
        return this.getParameter(GetVehicleDataResponse.KEY_HANDS_OFF_STEERING);
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
GetVehicleDataResponse.KEY_GEAR_STATUS = 'gearStatus';
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
GetVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS = 'stabilityControlsStatus';
GetVehicleDataResponse.KEY_E_CALL_INFO = 'eCallInfo';
GetVehicleDataResponse.KEY_AIRBAG_STATUS = 'airbagStatus';
GetVehicleDataResponse.KEY_EMERGENCY_EVENT = 'emergencyEvent';
GetVehicleDataResponse.KEY_CLUSTER_MODE_STATUS = 'clusterModeStatus';
GetVehicleDataResponse.KEY_MY_KEY = 'myKey';
GetVehicleDataResponse.KEY_WINDOW_STATUS = 'windowStatus';
GetVehicleDataResponse.KEY_HANDS_OFF_STEERING = 'handsOffSteering';

export { GetVehicleDataResponse };