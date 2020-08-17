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

import { RpcStruct } from '../RpcStruct.js';

class DateTime extends RpcStruct {
    /**
     * Initalizes an instance of DateTime.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Millisecond
     * @param {Number} millisecond - Milliseconds - The desired Millisecond.
     * {'num_min_value': 0, 'num_max_value': 999}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setMillisecond (millisecond) {
        this.setParameter(DateTime.KEY_MILLISECOND, millisecond);
        return this;
    }

    /**
     * Get the Millisecond
     * @returns {Number} - the KEY_MILLISECOND value
     */
    getMillisecond () {
        return this.getParameter(DateTime.KEY_MILLISECOND);
    }

    /**
     * Set the Second
     * @param {Number} second - Seconds part of time - The desired Second.
     * {'num_min_value': 0, 'num_max_value': 60}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setSecond (second) {
        this.setParameter(DateTime.KEY_SECOND, second);
        return this;
    }

    /**
     * Get the Second
     * @returns {Number} - the KEY_SECOND value
     */
    getSecond () {
        return this.getParameter(DateTime.KEY_SECOND);
    }

    /**
     * Set the Minute
     * @param {Number} minute - Minutes part of time - The desired Minute.
     * {'num_min_value': 0, 'num_max_value': 59}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setMinute (minute) {
        this.setParameter(DateTime.KEY_MINUTE, minute);
        return this;
    }

    /**
     * Get the Minute
     * @returns {Number} - the KEY_MINUTE value
     */
    getMinute () {
        return this.getParameter(DateTime.KEY_MINUTE);
    }

    /**
     * Set the Hour
     * @param {Number} hour - Hours part of time. Note that this structure accepts time only in 24 Hr format - The desired Hour.
     * {'num_min_value': 0, 'num_max_value': 23}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setHour (hour) {
        this.setParameter(DateTime.KEY_HOUR, hour);
        return this;
    }

    /**
     * Get the Hour
     * @returns {Number} - the KEY_HOUR value
     */
    getHour () {
        return this.getParameter(DateTime.KEY_HOUR);
    }

    /**
     * Set the Day
     * @param {Number} day - Day of the month - The desired Day.
     * {'num_min_value': 1, 'num_max_value': 31}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setDay (day) {
        this.setParameter(DateTime.KEY_DAY, day);
        return this;
    }

    /**
     * Get the Day
     * @returns {Number} - the KEY_DAY value
     */
    getDay () {
        return this.getParameter(DateTime.KEY_DAY);
    }

    /**
     * Set the Month
     * @param {Number} month - Month of the year - The desired Month.
     * {'num_min_value': 1, 'num_max_value': 12}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setMonth (month) {
        this.setParameter(DateTime.KEY_MONTH, month);
        return this;
    }

    /**
     * Get the Month
     * @returns {Number} - the KEY_MONTH value
     */
    getMonth () {
        return this.getParameter(DateTime.KEY_MONTH);
    }

    /**
     * Set the Year
     * @param {Number} year - The year in YYYY format - The desired Year.
     * {'num_max_value': 4095}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setYear (year) {
        this.setParameter(DateTime.KEY_YEAR, year);
        return this;
    }

    /**
     * Get the Year
     * @returns {Number} - the KEY_YEAR value
     */
    getYear () {
        return this.getParameter(DateTime.KEY_YEAR);
    }

    /**
     * Set the Tz_hour
     * @param {Number} tz_hour - Time zone offset in Hours wrt UTC. - The desired Tz_hour.
     * {'default_value': 0, 'num_min_value': -12, 'num_max_value': 14}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setTz_hour (tz_hour) {
        this.setParameter(DateTime.KEY_TZ_HOUR, tz_hour);
        return this;
    }

    /**
     * Get the Tz_hour
     * @returns {Number} - the KEY_TZ_HOUR value
     */
    getTz_hour () {
        return this.getParameter(DateTime.KEY_TZ_HOUR);
    }

    /**
     * Set the Tz_minute
     * @param {Number} tz_minute - Time zone offset in Min wrt UTC. - The desired Tz_minute.
     * {'default_value': 0, 'num_min_value': 0, 'num_max_value': 59}
     * @returns {DateTime} - The class instance for method chaining.
     */
    setTz_minute (tz_minute) {
        this.setParameter(DateTime.KEY_TZ_MINUTE, tz_minute);
        return this;
    }

    /**
     * Get the Tz_minute
     * @returns {Number} - the KEY_TZ_MINUTE value
     */
    getTz_minute () {
        return this.getParameter(DateTime.KEY_TZ_MINUTE);
    }
}

DateTime.KEY_MILLISECOND = 'millisecond';
DateTime.KEY_SECOND = 'second';
DateTime.KEY_MINUTE = 'minute';
DateTime.KEY_HOUR = 'hour';
DateTime.KEY_DAY = 'day';
DateTime.KEY_MONTH = 'month';
DateTime.KEY_YEAR = 'year';
DateTime.KEY_TZ_HOUR = 'tz_hour';
DateTime.KEY_TZ_MINUTE = 'tz_minute';

export { DateTime };