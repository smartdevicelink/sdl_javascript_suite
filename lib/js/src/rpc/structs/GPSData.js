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

import { CompassDirection } from '../enums/CompassDirection.js';
import { Dimension } from '../enums/Dimension.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Struct with the GPS data.
 */
class GPSData extends RpcStruct {
    /**
     * Initalizes an instance of GPSData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the LongitudeDegrees
     * @param {Number} degrees - The desired LongitudeDegrees.
     * {'num_min_value': -180.0, 'num_max_value': 180.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setLongitudeDegrees (degrees) {
        this.setParameter(GPSData.KEY_LONGITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * Get the LongitudeDegrees
     * @returns {Number} - the KEY_LONGITUDE_DEGREES value
     */
    getLongitudeDegrees () {
        return this.getParameter(GPSData.KEY_LONGITUDE_DEGREES);
    }

    /**
     * Set the LatitudeDegrees
     * @param {Number} degrees - The desired LatitudeDegrees.
     * {'num_min_value': -90.0, 'num_max_value': 90.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setLatitudeDegrees (degrees) {
        this.setParameter(GPSData.KEY_LATITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * Get the LatitudeDegrees
     * @returns {Number} - the KEY_LATITUDE_DEGREES value
     */
    getLatitudeDegrees () {
        return this.getParameter(GPSData.KEY_LATITUDE_DEGREES);
    }

    /**
     * Set the UtcYear
     * @since SmartDeviceLink 2.0.0
     * @param {Number} year - The current UTC year. - The desired UtcYear.
     * {'num_min_value': 2010, 'num_max_value': 2100}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setUtcYear (year) {
        this.setParameter(GPSData.KEY_UTC_YEAR, year);
        return this;
    }

    /**
     * Get the UtcYear
     * @returns {Number} - the KEY_UTC_YEAR value
     */
    getUtcYear () {
        return this.getParameter(GPSData.KEY_UTC_YEAR);
    }

    /**
     * Set the UtcMonth
     * @since SmartDeviceLink 2.0.0
     * @param {Number} month - The current UTC month. - The desired UtcMonth.
     * {'num_min_value': 1, 'num_max_value': 12}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setUtcMonth (month) {
        this.setParameter(GPSData.KEY_UTC_MONTH, month);
        return this;
    }

    /**
     * Get the UtcMonth
     * @returns {Number} - the KEY_UTC_MONTH value
     */
    getUtcMonth () {
        return this.getParameter(GPSData.KEY_UTC_MONTH);
    }

    /**
     * Set the UtcDay
     * @since SmartDeviceLink 2.0.0
     * @param {Number} day - The current UTC day. - The desired UtcDay.
     * {'num_min_value': 1, 'num_max_value': 31}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setUtcDay (day) {
        this.setParameter(GPSData.KEY_UTC_DAY, day);
        return this;
    }

    /**
     * Get the UtcDay
     * @returns {Number} - the KEY_UTC_DAY value
     */
    getUtcDay () {
        return this.getParameter(GPSData.KEY_UTC_DAY);
    }

    /**
     * Set the UtcHours
     * @since SmartDeviceLink 2.0.0
     * @param {Number} hours - The current UTC hour. - The desired UtcHours.
     * {'num_min_value': 0, 'num_max_value': 23}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setUtcHours (hours) {
        this.setParameter(GPSData.KEY_UTC_HOURS, hours);
        return this;
    }

    /**
     * Get the UtcHours
     * @returns {Number} - the KEY_UTC_HOURS value
     */
    getUtcHours () {
        return this.getParameter(GPSData.KEY_UTC_HOURS);
    }

    /**
     * Set the UtcMinutes
     * @since SmartDeviceLink 2.0.0
     * @param {Number} minutes - The current UTC minute. - The desired UtcMinutes.
     * {'num_min_value': 0, 'num_max_value': 59}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setUtcMinutes (minutes) {
        this.setParameter(GPSData.KEY_UTC_MINUTES, minutes);
        return this;
    }

    /**
     * Get the UtcMinutes
     * @returns {Number} - the KEY_UTC_MINUTES value
     */
    getUtcMinutes () {
        return this.getParameter(GPSData.KEY_UTC_MINUTES);
    }

    /**
     * Set the UtcSeconds
     * @since SmartDeviceLink 2.0.0
     * @param {Number} seconds - The current UTC second. - The desired UtcSeconds.
     * {'num_min_value': 0, 'num_max_value': 59}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setUtcSeconds (seconds) {
        this.setParameter(GPSData.KEY_UTC_SECONDS, seconds);
        return this;
    }

    /**
     * Get the UtcSeconds
     * @returns {Number} - the KEY_UTC_SECONDS value
     */
    getUtcSeconds () {
        return this.getParameter(GPSData.KEY_UTC_SECONDS);
    }

    /**
     * Set the CompassDirection
     * @since SmartDeviceLink 2.0.0
     * @param {CompassDirection} direction - See CompassDirection. - The desired CompassDirection.
     * @returns {GPSData} - The class instance for method chaining.
     */
    setCompassDirection (direction) {
        this._validateType(CompassDirection, direction);
        this.setParameter(GPSData.KEY_COMPASS_DIRECTION, direction);
        return this;
    }

    /**
     * Get the CompassDirection
     * @returns {CompassDirection} - the KEY_COMPASS_DIRECTION value
     */
    getCompassDirection () {
        return this.getObject(CompassDirection, GPSData.KEY_COMPASS_DIRECTION);
    }

    /**
     * Set the Pdop
     * @since SmartDeviceLink 2.0.0
     * @param {Number} pdop - PDOP. If undefined or unavailable, then value shall be set to 0. - The desired Pdop.
     * {'default_value': 0.0, 'num_min_value': 0.0, 'num_max_value': 1000.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setPdop (pdop) {
        this.setParameter(GPSData.KEY_PDOP, pdop);
        return this;
    }

    /**
     * Get the Pdop
     * @returns {Number} - the KEY_PDOP value
     */
    getPdop () {
        return this.getParameter(GPSData.KEY_PDOP);
    }

    /**
     * Set the Hdop
     * @since SmartDeviceLink 2.0.0
     * @param {Number} hdop - HDOP. If value is unknown, value shall be set to 0. - The desired Hdop.
     * {'default_value': 0.0, 'num_min_value': 0.0, 'num_max_value': 1000.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setHdop (hdop) {
        this.setParameter(GPSData.KEY_HDOP, hdop);
        return this;
    }

    /**
     * Get the Hdop
     * @returns {Number} - the KEY_HDOP value
     */
    getHdop () {
        return this.getParameter(GPSData.KEY_HDOP);
    }

    /**
     * Set the Vdop
     * @since SmartDeviceLink 2.0.0
     * @param {Number} vdop - VDOP. If value is unknown, value shall be set to 0. - The desired Vdop.
     * {'default_value': 0.0, 'num_min_value': 0.0, 'num_max_value': 1000.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setVdop (vdop) {
        this.setParameter(GPSData.KEY_VDOP, vdop);
        return this;
    }

    /**
     * Get the Vdop
     * @returns {Number} - the KEY_VDOP value
     */
    getVdop () {
        return this.getParameter(GPSData.KEY_VDOP);
    }

    /**
     * Set the Actual
     * @since SmartDeviceLink 2.0.0
     * @param {Boolean} actual - True, if actual. False, if inferred. - The desired Actual.
     * @returns {GPSData} - The class instance for method chaining.
     */
    setActual (actual) {
        this.setParameter(GPSData.KEY_ACTUAL, actual);
        return this;
    }

    /**
     * Get the Actual
     * @returns {Boolean} - the KEY_ACTUAL value
     */
    getActual () {
        return this.getParameter(GPSData.KEY_ACTUAL);
    }

    /**
     * Set the Satellites
     * @since SmartDeviceLink 2.0.0
     * @param {Number} satellites - Number of satellites in view - The desired Satellites.
     * {'num_min_value': 0, 'num_max_value': 31}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setSatellites (satellites) {
        this.setParameter(GPSData.KEY_SATELLITES, satellites);
        return this;
    }

    /**
     * Get the Satellites
     * @returns {Number} - the KEY_SATELLITES value
     */
    getSatellites () {
        return this.getParameter(GPSData.KEY_SATELLITES);
    }

    /**
     * Set the Dimension
     * @since SmartDeviceLink 2.0.0
     * @param {Dimension} dimension - See Dimension - The desired Dimension.
     * @returns {GPSData} - The class instance for method chaining.
     */
    setDimension (dimension) {
        this._validateType(Dimension, dimension);
        this.setParameter(GPSData.KEY_DIMENSION, dimension);
        return this;
    }

    /**
     * Get the Dimension
     * @returns {Dimension} - the KEY_DIMENSION value
     */
    getDimension () {
        return this.getObject(Dimension, GPSData.KEY_DIMENSION);
    }

    /**
     * Set the Altitude
     * @since SmartDeviceLink 2.0.0
     * @param {Number} altitude - Altitude in meters - The desired Altitude.
     * {'num_min_value': -10000.0, 'num_max_value': 10000.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setAltitude (altitude) {
        this.setParameter(GPSData.KEY_ALTITUDE, altitude);
        return this;
    }

    /**
     * Get the Altitude
     * @returns {Number} - the KEY_ALTITUDE value
     */
    getAltitude () {
        return this.getParameter(GPSData.KEY_ALTITUDE);
    }

    /**
     * Set the Heading
     * @since SmartDeviceLink 2.0.0
     * @param {Number} heading - The heading. North is 0. Resolution is 0.01 - The desired Heading.
     * {'num_min_value': 0.0, 'num_max_value': 359.99}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setHeading (heading) {
        this.setParameter(GPSData.KEY_HEADING, heading);
        return this;
    }

    /**
     * Get the Heading
     * @returns {Number} - the KEY_HEADING value
     */
    getHeading () {
        return this.getParameter(GPSData.KEY_HEADING);
    }

    /**
     * Set the Speed
     * @since SmartDeviceLink 2.0.0
     * @param {Number} speed - The speed in KPH - The desired Speed.
     * {'num_min_value': 0.0, 'num_max_value': 500.0}
     * @returns {GPSData} - The class instance for method chaining.
     */
    setSpeed (speed) {
        this.setParameter(GPSData.KEY_SPEED, speed);
        return this;
    }

    /**
     * Get the Speed
     * @returns {Number} - the KEY_SPEED value
     */
    getSpeed () {
        return this.getParameter(GPSData.KEY_SPEED);
    }

    /**
     * Set the Shifted
     * @since SmartDeviceLink 6.0.0
     * @param {Boolean} shifted - True, if GPS lat/long, time, and altitude have been purposefully shifted (requires a proprietary algorithm to unshift). False, if the GPS data is raw and un-shifted. If not provided, then value is assumed False. - The desired Shifted.
     * @returns {GPSData} - The class instance for method chaining.
     */
    setShifted (shifted) {
        this.setParameter(GPSData.KEY_SHIFTED, shifted);
        return this;
    }

    /**
     * Get the Shifted
     * @returns {Boolean} - the KEY_SHIFTED value
     */
    getShifted () {
        return this.getParameter(GPSData.KEY_SHIFTED);
    }
}

GPSData.KEY_LONGITUDE_DEGREES = 'longitudeDegrees';
GPSData.KEY_LATITUDE_DEGREES = 'latitudeDegrees';
GPSData.KEY_UTC_YEAR = 'utcYear';
GPSData.KEY_UTC_MONTH = 'utcMonth';
GPSData.KEY_UTC_DAY = 'utcDay';
GPSData.KEY_UTC_HOURS = 'utcHours';
GPSData.KEY_UTC_MINUTES = 'utcMinutes';
GPSData.KEY_UTC_SECONDS = 'utcSeconds';
GPSData.KEY_COMPASS_DIRECTION = 'compassDirection';
GPSData.KEY_PDOP = 'pdop';
GPSData.KEY_HDOP = 'hdop';
GPSData.KEY_VDOP = 'vdop';
GPSData.KEY_ACTUAL = 'actual';
GPSData.KEY_SATELLITES = 'satellites';
GPSData.KEY_DIMENSION = 'dimension';
GPSData.KEY_ALTITUDE = 'altitude';
GPSData.KEY_HEADING = 'heading';
GPSData.KEY_SPEED = 'speed';
GPSData.KEY_SHIFTED = 'shifted';

export { GPSData };