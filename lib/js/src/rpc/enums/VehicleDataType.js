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

import { Enum } from '../../util/Enum.js';

/**
 * Defines the data types that can be published and subscribed to.
 * @typedef {Enum} VehicleDataType
 * @property {Object} _MAP
 */
class VehicleDataType extends Enum {
    /**
     * Constructor for VehicleDataType.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for VEHICLEDATA_GPS.
     * Notifies GPSData may be subscribed
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_GPS () {
        return VehicleDataType._MAP.VEHICLEDATA_GPS;
    }

    /**
     * Get the enum value for VEHICLEDATA_SPEED.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_SPEED () {
        return VehicleDataType._MAP.VEHICLEDATA_SPEED;
    }

    /**
     * Get the enum value for VEHICLEDATA_RPM.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_RPM () {
        return VehicleDataType._MAP.VEHICLEDATA_RPM;
    }

    /**
     * Get the enum value for VEHICLEDATA_FUELLEVEL.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_FUELLEVEL () {
        return VehicleDataType._MAP.VEHICLEDATA_FUELLEVEL;
    }

    /**
     * Get the enum value for VEHICLEDATA_FUELLEVEL_STATE.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_FUELLEVEL_STATE () {
        return VehicleDataType._MAP.VEHICLEDATA_FUELLEVEL_STATE;
    }

    /**
     * Get the enum value for VEHICLEDATA_FUELCONSUMPTION.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_FUELCONSUMPTION () {
        return VehicleDataType._MAP.VEHICLEDATA_FUELCONSUMPTION;
    }

    /**
     * Get the enum value for VEHICLEDATA_EXTERNTEMP.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_EXTERNTEMP () {
        return VehicleDataType._MAP.VEHICLEDATA_EXTERNTEMP;
    }

    /**
     * Get the enum value for VEHICLEDATA_VIN.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_VIN () {
        return VehicleDataType._MAP.VEHICLEDATA_VIN;
    }

    /**
     * Get the enum value for VEHICLEDATA_PRNDL.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_PRNDL () {
        return VehicleDataType._MAP.VEHICLEDATA_PRNDL;
    }

    /**
     * Get the enum value for VEHICLEDATA_TIREPRESSURE.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_TIREPRESSURE () {
        return VehicleDataType._MAP.VEHICLEDATA_TIREPRESSURE;
    }

    /**
     * Get the enum value for VEHICLEDATA_ODOMETER.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_ODOMETER () {
        return VehicleDataType._MAP.VEHICLEDATA_ODOMETER;
    }

    /**
     * Get the enum value for VEHICLEDATA_BELTSTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_BELTSTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_BELTSTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_BODYINFO.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_BODYINFO () {
        return VehicleDataType._MAP.VEHICLEDATA_BODYINFO;
    }

    /**
     * Get the enum value for VEHICLEDATA_DEVICESTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_DEVICESTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_DEVICESTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_ECALLINFO.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_ECALLINFO () {
        return VehicleDataType._MAP.VEHICLEDATA_ECALLINFO;
    }

    /**
     * Get the enum value for VEHICLEDATA_AIRBAGSTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_AIRBAGSTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_AIRBAGSTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_EMERGENCYEVENT.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_EMERGENCYEVENT () {
        return VehicleDataType._MAP.VEHICLEDATA_EMERGENCYEVENT;
    }

    /**
     * Get the enum value for VEHICLEDATA_CLUSTERMODESTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_CLUSTERMODESTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_CLUSTERMODESTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_MYKEY.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_MYKEY () {
        return VehicleDataType._MAP.VEHICLEDATA_MYKEY;
    }

    /**
     * Get the enum value for VEHICLEDATA_BRAKING.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_BRAKING () {
        return VehicleDataType._MAP.VEHICLEDATA_BRAKING;
    }

    /**
     * Get the enum value for VEHICLEDATA_WIPERSTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_WIPERSTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_WIPERSTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_HEADLAMPSTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_HEADLAMPSTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_HEADLAMPSTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_BATTVOLTAGE.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_BATTVOLTAGE () {
        return VehicleDataType._MAP.VEHICLEDATA_BATTVOLTAGE;
    }

    /**
     * Get the enum value for VEHICLEDATA_ENGINETORQUE.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_ENGINETORQUE () {
        return VehicleDataType._MAP.VEHICLEDATA_ENGINETORQUE;
    }

    /**
     * Get the enum value for VEHICLEDATA_ACCPEDAL.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_ACCPEDAL () {
        return VehicleDataType._MAP.VEHICLEDATA_ACCPEDAL;
    }

    /**
     * Get the enum value for VEHICLEDATA_STEERINGWHEEL.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_STEERINGWHEEL () {
        return VehicleDataType._MAP.VEHICLEDATA_STEERINGWHEEL;
    }

    /**
     * Get the enum value for VEHICLEDATA_TURNSIGNAL.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_TURNSIGNAL () {
        return VehicleDataType._MAP.VEHICLEDATA_TURNSIGNAL;
    }

    /**
     * Get the enum value for VEHICLEDATA_FUELRANGE.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_FUELRANGE () {
        return VehicleDataType._MAP.VEHICLEDATA_FUELRANGE;
    }

    /**
     * Get the enum value for VEHICLEDATA_ENGINEOILLIFE.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_ENGINEOILLIFE () {
        return VehicleDataType._MAP.VEHICLEDATA_ENGINEOILLIFE;
    }

    /**
     * Get the enum value for VEHICLEDATA_ELECTRONICPARKBRAKESTATUS.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_ELECTRONICPARKBRAKESTATUS () {
        return VehicleDataType._MAP.VEHICLEDATA_ELECTRONICPARKBRAKESTATUS;
    }

    /**
     * Get the enum value for VEHICLEDATA_CLOUDAPPVEHICLEID.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_CLOUDAPPVEHICLEID () {
        return VehicleDataType._MAP.VEHICLEDATA_CLOUDAPPVEHICLEID;
    }

    /**
     * Get the enum value for VEHICLEDATA_OEM_CUSTOM_DATA.
     * @returns {String} - The enum value.
     */
    static get VEHICLEDATA_OEM_CUSTOM_DATA () {
        return VehicleDataType._MAP.VEHICLEDATA_OEM_CUSTOM_DATA;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return VehicleDataType._valueForKey(key, VehicleDataType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return VehicleDataType._keyForValue(value, VehicleDataType._MAP);
    }
}

VehicleDataType._MAP = Object.freeze({
    'VEHICLEDATA_GPS': 'VEHICLEDATA_GPS',
    'VEHICLEDATA_SPEED': 'VEHICLEDATA_SPEED',
    'VEHICLEDATA_RPM': 'VEHICLEDATA_RPM',
    'VEHICLEDATA_FUELLEVEL': 'VEHICLEDATA_FUELLEVEL',
    'VEHICLEDATA_FUELLEVEL_STATE': 'VEHICLEDATA_FUELLEVEL_STATE',
    'VEHICLEDATA_FUELCONSUMPTION': 'VEHICLEDATA_FUELCONSUMPTION',
    'VEHICLEDATA_EXTERNTEMP': 'VEHICLEDATA_EXTERNTEMP',
    'VEHICLEDATA_VIN': 'VEHICLEDATA_VIN',
    'VEHICLEDATA_PRNDL': 'VEHICLEDATA_PRNDL',
    'VEHICLEDATA_TIREPRESSURE': 'VEHICLEDATA_TIREPRESSURE',
    'VEHICLEDATA_ODOMETER': 'VEHICLEDATA_ODOMETER',
    'VEHICLEDATA_BELTSTATUS': 'VEHICLEDATA_BELTSTATUS',
    'VEHICLEDATA_BODYINFO': 'VEHICLEDATA_BODYINFO',
    'VEHICLEDATA_DEVICESTATUS': 'VEHICLEDATA_DEVICESTATUS',
    'VEHICLEDATA_ECALLINFO': 'VEHICLEDATA_ECALLINFO',
    'VEHICLEDATA_AIRBAGSTATUS': 'VEHICLEDATA_AIRBAGSTATUS',
    'VEHICLEDATA_EMERGENCYEVENT': 'VEHICLEDATA_EMERGENCYEVENT',
    'VEHICLEDATA_CLUSTERMODESTATUS': 'VEHICLEDATA_CLUSTERMODESTATUS',
    'VEHICLEDATA_MYKEY': 'VEHICLEDATA_MYKEY',
    'VEHICLEDATA_BRAKING': 'VEHICLEDATA_BRAKING',
    'VEHICLEDATA_WIPERSTATUS': 'VEHICLEDATA_WIPERSTATUS',
    'VEHICLEDATA_HEADLAMPSTATUS': 'VEHICLEDATA_HEADLAMPSTATUS',
    'VEHICLEDATA_BATTVOLTAGE': 'VEHICLEDATA_BATTVOLTAGE',
    'VEHICLEDATA_ENGINETORQUE': 'VEHICLEDATA_ENGINETORQUE',
    'VEHICLEDATA_ACCPEDAL': 'VEHICLEDATA_ACCPEDAL',
    'VEHICLEDATA_STEERINGWHEEL': 'VEHICLEDATA_STEERINGWHEEL',
    'VEHICLEDATA_TURNSIGNAL': 'VEHICLEDATA_TURNSIGNAL',
    'VEHICLEDATA_FUELRANGE': 'VEHICLEDATA_FUELRANGE',
    'VEHICLEDATA_ENGINEOILLIFE': 'VEHICLEDATA_ENGINEOILLIFE',
    'VEHICLEDATA_ELECTRONICPARKBRAKESTATUS': 'VEHICLEDATA_ELECTRONICPARKBRAKESTATUS',
    'VEHICLEDATA_CLOUDAPPVEHICLEID': 'VEHICLEDATA_CLOUDAPPVEHICLEID',
    'VEHICLEDATA_OEM_CUSTOM_DATA': 'VEHICLEDATA_OEM_CUSTOM_DATA',
});

export { VehicleDataType };