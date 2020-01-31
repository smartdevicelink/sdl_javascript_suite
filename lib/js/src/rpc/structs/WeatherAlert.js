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

import { DateTime } from './DateTime.js';
import { RpcStruct } from '../RpcStruct.js';

class WeatherAlert extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} title
     * @return {WeatherAlert}
     */
    setTitle (title) {
        this.setParameter(WeatherAlert.KEY_TITLE, title);
        return this;
    }

    /**
     * @return {String}
     */
    getTitle () {
        return this.getParameter(WeatherAlert.KEY_TITLE);
    }

    /**
     * @param {String} summary
     * @return {WeatherAlert}
     */
    setSummary (summary) {
        this.setParameter(WeatherAlert.KEY_SUMMARY, summary);
        return this;
    }

    /**
     * @return {String}
     */
    getSummary () {
        return this.getParameter(WeatherAlert.KEY_SUMMARY);
    }

    /**
     * @param {DateTime} expires
     * @return {WeatherAlert}
     */
    setExpires (expires) {
        this.validateType(DateTime, expires);
        this.setParameter(WeatherAlert.KEY_EXPIRES, expires);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getExpires () {
        return this.getObject(DateTime, WeatherAlert.KEY_EXPIRES);
    }

    /**
     * @param {String[]} regions
     * @return {WeatherAlert}
     */
    setRegions (regions) {
        this.setParameter(WeatherAlert.KEY_REGIONS, regions);
        return this;
    }

    /**
     * @return {String[]}
     */
    getRegions () {
        return this.getParameter(WeatherAlert.KEY_REGIONS);
    }

    /**
     * @param {String} severity
     * @return {WeatherAlert}
     */
    setSeverity (severity) {
        this.setParameter(WeatherAlert.KEY_SEVERITY, severity);
        return this;
    }

    /**
     * @return {String}
     */
    getSeverity () {
        return this.getParameter(WeatherAlert.KEY_SEVERITY);
    }

    /**
     * @param {DateTime} issued
     * @return {WeatherAlert}
     */
    setTimeIssued (issued) {
        this.validateType(DateTime, issued);
        this.setParameter(WeatherAlert.KEY_TIME_ISSUED, issued);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getTimeIssued () {
        return this.getObject(DateTime, WeatherAlert.KEY_TIME_ISSUED);
    }
}

WeatherAlert.KEY_TITLE = 'title';
WeatherAlert.KEY_SUMMARY = 'summary';
WeatherAlert.KEY_EXPIRES = 'expires';
WeatherAlert.KEY_REGIONS = 'regions';
WeatherAlert.KEY_SEVERITY = 'severity';
WeatherAlert.KEY_TIME_ISSUED = 'timeIssued';

export { WeatherAlert };