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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} millisecond - Milliseconds
     * @return {DateTime}
     */
    setMillisecond (millisecond) {
        this.setParameter(DateTime.KEY_MILLISECOND, millisecond);
        return this;
    }

    /**
     * @return {Number}
     */
    getMillisecond () {
        return this.getParameter(DateTime.KEY_MILLISECOND);
    }

    /**
     * @param {Number} second - Seconds part of time
     * @return {DateTime}
     */
    setSecond (second) {
        this.setParameter(DateTime.KEY_SECOND, second);
        return this;
    }

    /**
     * @return {Number}
     */
    getSecond () {
        return this.getParameter(DateTime.KEY_SECOND);
    }

    /**
     * @param {Number} minute - Minutes part of time
     * @return {DateTime}
     */
    setMinute (minute) {
        this.setParameter(DateTime.KEY_MINUTE, minute);
        return this;
    }

    /**
     * @return {Number}
     */
    getMinute () {
        return this.getParameter(DateTime.KEY_MINUTE);
    }

    /**
     * @param {Number} hour - Hours part of time. Note that this structure accepts time only in 24 Hr format
     * @return {DateTime}
     */
    setHour (hour) {
        this.setParameter(DateTime.KEY_HOUR, hour);
        return this;
    }

    /**
     * @return {Number}
     */
    getHour () {
        return this.getParameter(DateTime.KEY_HOUR);
    }

    /**
     * @param {Number} day - Day of the month
     * @return {DateTime}
     */
    setDay (day) {
        this.setParameter(DateTime.KEY_DAY, day);
        return this;
    }

    /**
     * @return {Number}
     */
    getDay () {
        return this.getParameter(DateTime.KEY_DAY);
    }

    /**
     * @param {Number} month - Month of the year
     * @return {DateTime}
     */
    setMonth (month) {
        this.setParameter(DateTime.KEY_MONTH, month);
        return this;
    }

    /**
     * @return {Number}
     */
    getMonth () {
        return this.getParameter(DateTime.KEY_MONTH);
    }

    /**
     * @param {Number} year - The year in YYYY format
     * @return {DateTime}
     */
    setYear (year) {
        this.setParameter(DateTime.KEY_YEAR, year);
        return this;
    }

    /**
     * @return {Number}
     */
    getYear () {
        return this.getParameter(DateTime.KEY_YEAR);
    }

    /**
     * @param {Number} tz_hour - Time zone offset in Hours wrt UTC.
     * @return {DateTime}
     */
    setTz_hour (tz_hour) {
        this.setParameter(DateTime.KEY_TZ_HOUR, tz_hour);
        return this;
    }

    /**
     * @return {Number}
     */
    getTz_hour () {
        return this.getParameter(DateTime.KEY_TZ_HOUR);
    }

    /**
     * @param {Number} tz_minute - Time zone offset in Min wrt UTC.
     * @return {DateTime}
     */
    setTz_minute (tz_minute) {
        this.setParameter(DateTime.KEY_TZ_MINUTE, tz_minute);
        return this;
    }

    /**
     * @return {Number}
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