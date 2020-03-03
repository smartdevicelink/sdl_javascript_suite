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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} degrees
     * @return {GPSData}
     */
    setLongitudeDegrees (degrees) {
        this.setParameter(GPSData.KEY_LONGITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * @return {Number}
     */
    getLongitudeDegrees () {
        return this.getParameter(GPSData.KEY_LONGITUDE_DEGREES);
    }

    /**
     * @param {Number} degrees
     * @return {GPSData}
     */
    setLatitudeDegrees (degrees) {
        this.setParameter(GPSData.KEY_LATITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * @return {Number}
     */
    getLatitudeDegrees () {
        return this.getParameter(GPSData.KEY_LATITUDE_DEGREES);
    }

    /**
     * @param {Number} year - The current UTC year.
     * @return {GPSData}
     */
    setUtcYear (year) {
        this.setParameter(GPSData.KEY_UTC_YEAR, year);
        return this;
    }

    /**
     * @return {Number}
     */
    getUtcYear () {
        return this.getParameter(GPSData.KEY_UTC_YEAR);
    }

    /**
     * @param {Number} month - The current UTC month.
     * @return {GPSData}
     */
    setUtcMonth (month) {
        this.setParameter(GPSData.KEY_UTC_MONTH, month);
        return this;
    }

    /**
     * @return {Number}
     */
    getUtcMonth () {
        return this.getParameter(GPSData.KEY_UTC_MONTH);
    }

    /**
     * @param {Number} day - The current UTC day.
     * @return {GPSData}
     */
    setUtcDay (day) {
        this.setParameter(GPSData.KEY_UTC_DAY, day);
        return this;
    }

    /**
     * @return {Number}
     */
    getUtcDay () {
        return this.getParameter(GPSData.KEY_UTC_DAY);
    }

    /**
     * @param {Number} hours - The current UTC hour.
     * @return {GPSData}
     */
    setUtcHours (hours) {
        this.setParameter(GPSData.KEY_UTC_HOURS, hours);
        return this;
    }

    /**
     * @return {Number}
     */
    getUtcHours () {
        return this.getParameter(GPSData.KEY_UTC_HOURS);
    }

    /**
     * @param {Number} minutes - The current UTC minute.
     * @return {GPSData}
     */
    setUtcMinutes (minutes) {
        this.setParameter(GPSData.KEY_UTC_MINUTES, minutes);
        return this;
    }

    /**
     * @return {Number}
     */
    getUtcMinutes () {
        return this.getParameter(GPSData.KEY_UTC_MINUTES);
    }

    /**
     * @param {Number} seconds - The current UTC second.
     * @return {GPSData}
     */
    setUtcSeconds (seconds) {
        this.setParameter(GPSData.KEY_UTC_SECONDS, seconds);
        return this;
    }

    /**
     * @return {Number}
     */
    getUtcSeconds () {
        return this.getParameter(GPSData.KEY_UTC_SECONDS);
    }

    /**
     * @param {CompassDirection} direction - See CompassDirection.
     * @return {GPSData}
     */
    setCompassDirection (direction) {
        this.validateType(CompassDirection, direction);
        this.setParameter(GPSData.KEY_COMPASS_DIRECTION, direction);
        return this;
    }

    /**
     * @return {CompassDirection}
     */
    getCompassDirection () {
        return this.getObject(CompassDirection, GPSData.KEY_COMPASS_DIRECTION);
    }

    /**
     * @param {Number} pdop - PDOP. If undefined or unavailable, then value shall be set to 0.
     * @return {GPSData}
     */
    setPdop (pdop) {
        this.setParameter(GPSData.KEY_PDOP, pdop);
        return this;
    }

    /**
     * @return {Number}
     */
    getPdop () {
        return this.getParameter(GPSData.KEY_PDOP);
    }

    /**
     * @param {Number} hdop - HDOP. If value is unknown, value shall be set to 0.
     * @return {GPSData}
     */
    setHdop (hdop) {
        this.setParameter(GPSData.KEY_HDOP, hdop);
        return this;
    }

    /**
     * @return {Number}
     */
    getHdop () {
        return this.getParameter(GPSData.KEY_HDOP);
    }

    /**
     * @param {Number} vdop - VDOP. If value is unknown, value shall be set to 0.
     * @return {GPSData}
     */
    setVdop (vdop) {
        this.setParameter(GPSData.KEY_VDOP, vdop);
        return this;
    }

    /**
     * @return {Number}
     */
    getVdop () {
        return this.getParameter(GPSData.KEY_VDOP);
    }

    /**
     * @param {Boolean} actual - True, if actual. False, if inferred.
     * @return {GPSData}
     */
    setActual (actual) {
        this.setParameter(GPSData.KEY_ACTUAL, actual);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getActual () {
        return this.getParameter(GPSData.KEY_ACTUAL);
    }

    /**
     * @param {Number} satellites - Number of satellites in view
     * @return {GPSData}
     */
    setSatellites (satellites) {
        this.setParameter(GPSData.KEY_SATELLITES, satellites);
        return this;
    }

    /**
     * @return {Number}
     */
    getSatellites () {
        return this.getParameter(GPSData.KEY_SATELLITES);
    }

    /**
     * @param {Dimension} dimension - See Dimension
     * @return {GPSData}
     */
    setDimension (dimension) {
        this.validateType(Dimension, dimension);
        this.setParameter(GPSData.KEY_DIMENSION, dimension);
        return this;
    }

    /**
     * @return {Dimension}
     */
    getDimension () {
        return this.getObject(Dimension, GPSData.KEY_DIMENSION);
    }

    /**
     * @param {Number} altitude - Altitude in meters
     * @return {GPSData}
     */
    setAltitude (altitude) {
        this.setParameter(GPSData.KEY_ALTITUDE, altitude);
        return this;
    }

    /**
     * @return {Number}
     */
    getAltitude () {
        return this.getParameter(GPSData.KEY_ALTITUDE);
    }

    /**
     * @param {Number} heading - The heading. North is 0. Resolution is 0.01
     * @return {GPSData}
     */
    setHeading (heading) {
        this.setParameter(GPSData.KEY_HEADING, heading);
        return this;
    }

    /**
     * @return {Number}
     */
    getHeading () {
        return this.getParameter(GPSData.KEY_HEADING);
    }

    /**
     * @param {Number} speed - The speed in KPH
     * @return {GPSData}
     */
    setSpeed (speed) {
        this.setParameter(GPSData.KEY_SPEED, speed);
        return this;
    }

    /**
     * @return {Number}
     */
    getSpeed () {
        return this.getParameter(GPSData.KEY_SPEED);
    }

    /**
     * @param {Boolean} shifted - True, if GPS lat/long, time, and altitude have been purposefully shifted (requires a
     *                            proprietary algorithm to unshift). False, if the GPS data is raw and un-shifted. If
     *                            not provided, then value is assumed False.
     * @return {GPSData}
     */
    setShifted (shifted) {
        this.setParameter(GPSData.KEY_SHIFTED, shifted);
        return this;
    }

    /**
     * @return {Boolean}
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