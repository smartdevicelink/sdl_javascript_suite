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

import { GPSData } from './GPSData.js';
import { RpcStruct } from '../RpcStruct.js';
import { StationIDNumber } from './StationIDNumber.js';

class SisData extends RpcStruct {
    /**
     * Initalizes an instance of SisData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the StationShortName
     * @param {String} name - Identifies the 4-alpha-character station call sign plus an optional (-FM) extension - The desired StationShortName.
     * @returns {SisData} - The class instance for method chaining.
     */
    setStationShortName (name) {
        this.setParameter(SisData.KEY_STATION_SHORT_NAME, name);
        return this;
    }

    /**
     * Get the StationShortName
     * @returns {String} - the KEY_STATION_SHORT_NAME value
     */
    getStationShortName () {
        return this.getParameter(SisData.KEY_STATION_SHORT_NAME);
    }

    /**
     * Set the StationIDNumber
     * @param {StationIDNumber} number - Used for network Application. Consists of Country Code and FCC Facility ID. - The desired StationIDNumber.
     * @returns {SisData} - The class instance for method chaining.
     */
    setStationIDNumber (number) {
        this.validateType(StationIDNumber, number);
        this.setParameter(SisData.KEY_STATION_IDNUMBER, number);
        return this;
    }

    /**
     * Get the StationIDNumber
     * @returns {StationIDNumber} - the KEY_STATION_IDNUMBER value
     */
    getStationIDNumber () {
        return this.getObject(StationIDNumber, SisData.KEY_STATION_IDNUMBER);
    }

    /**
     * Set the StationLongName
     * @param {String} name - Identifies the station call sign or other identifying information in the long format. - The desired StationLongName.
     * @returns {SisData} - The class instance for method chaining.
     */
    setStationLongName (name) {
        this.setParameter(SisData.KEY_STATION_LONG_NAME, name);
        return this;
    }

    /**
     * Get the StationLongName
     * @returns {String} - the KEY_STATION_LONG_NAME value
     */
    getStationLongName () {
        return this.getParameter(SisData.KEY_STATION_LONG_NAME);
    }

    /**
     * Set the StationLocation
     * @param {GPSData} location - Provides the 3-dimensional geographic station location. - The desired StationLocation.
     * @returns {SisData} - The class instance for method chaining.
     */
    setStationLocation (location) {
        this.validateType(GPSData, location);
        this.setParameter(SisData.KEY_STATION_LOCATION, location);
        return this;
    }

    /**
     * Get the StationLocation
     * @returns {GPSData} - the KEY_STATION_LOCATION value
     */
    getStationLocation () {
        return this.getObject(GPSData, SisData.KEY_STATION_LOCATION);
    }

    /**
     * Set the StationMessage
     * @param {String} message - May be used to convey textual information of general interest to the consumer such as - The desired StationMessage.
     * weather forecasts or public service announcements. Includes a high priority delivery
     * feature to convey emergencies that may be in the listening area.
     * @returns {SisData} - The class instance for method chaining.
     */
    setStationMessage (message) {
        this.setParameter(SisData.KEY_STATION_MESSAGE, message);
        return this;
    }

    /**
     * Get the StationMessage
     * @returns {String} - the KEY_STATION_MESSAGE value
     */
    getStationMessage () {
        return this.getParameter(SisData.KEY_STATION_MESSAGE);
    }
}

SisData.KEY_STATION_SHORT_NAME = 'stationShortName';
SisData.KEY_STATION_IDNUMBER = 'stationIDNumber';
SisData.KEY_STATION_LONG_NAME = 'stationLongName';
SisData.KEY_STATION_LOCATION = 'stationLocation';
SisData.KEY_STATION_MESSAGE = 'stationMessage';

export { SisData };