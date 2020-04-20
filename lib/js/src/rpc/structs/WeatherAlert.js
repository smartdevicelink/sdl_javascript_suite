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
     * Initalizes an instance of WeatherAlert.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Title
     * @param {String} title - The desired Title.
     * @returns {WeatherAlert} - The class instance for method chaining.
     */
    setTitle (title) {
        this.setParameter(WeatherAlert.KEY_TITLE, title);
        return this;
    }

    /**
     * Get the Title
     * @returns {String} - the KEY_TITLE value
     */
    getTitle () {
        return this.getParameter(WeatherAlert.KEY_TITLE);
    }

    /**
     * Set the Summary
     * @param {String} summary - The desired Summary.
     * @returns {WeatherAlert} - The class instance for method chaining.
     */
    setSummary (summary) {
        this.setParameter(WeatherAlert.KEY_SUMMARY, summary);
        return this;
    }

    /**
     * Get the Summary
     * @returns {String} - the KEY_SUMMARY value
     */
    getSummary () {
        return this.getParameter(WeatherAlert.KEY_SUMMARY);
    }

    /**
     * Set the Expires
     * @param {DateTime} expires - The desired Expires.
     * @returns {WeatherAlert} - The class instance for method chaining.
     */
    setExpires (expires) {
        this.validateType(DateTime, expires);
        this.setParameter(WeatherAlert.KEY_EXPIRES, expires);
        return this;
    }

    /**
     * Get the Expires
     * @returns {DateTime} - the KEY_EXPIRES value
     */
    getExpires () {
        return this.getObject(DateTime, WeatherAlert.KEY_EXPIRES);
    }

    /**
     * Set the Regions
     * @param {String[]} regions - The desired Regions.
     * @returns {WeatherAlert} - The class instance for method chaining.
     */
    setRegions (regions) {
        this.setParameter(WeatherAlert.KEY_REGIONS, regions);
        return this;
    }

    /**
     * Get the Regions
     * @returns {String[]} - the KEY_REGIONS value
     */
    getRegions () {
        return this.getParameter(WeatherAlert.KEY_REGIONS);
    }

    /**
     * Set the Severity
     * @param {String} severity - The desired Severity.
     * @returns {WeatherAlert} - The class instance for method chaining.
     */
    setSeverity (severity) {
        this.setParameter(WeatherAlert.KEY_SEVERITY, severity);
        return this;
    }

    /**
     * Get the Severity
     * @returns {String} - the KEY_SEVERITY value
     */
    getSeverity () {
        return this.getParameter(WeatherAlert.KEY_SEVERITY);
    }

    /**
     * Set the TimeIssued
     * @param {DateTime} issued - The desired TimeIssued.
     * @returns {WeatherAlert} - The class instance for method chaining.
     */
    setTimeIssued (issued) {
        this.validateType(DateTime, issued);
        this.setParameter(WeatherAlert.KEY_TIME_ISSUED, issued);
        return this;
    }

    /**
     * Get the TimeIssued
     * @returns {DateTime} - the KEY_TIME_ISSUED value
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