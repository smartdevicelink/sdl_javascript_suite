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

import { LocationDetails } from './LocationDetails.js';
import { RpcStruct } from '../RpcStruct.js';
import { WeatherAlert } from './WeatherAlert.js';
import { WeatherData } from './WeatherData.js';

/**
 * This data is related to what a weather service would provide
 */
class WeatherServiceData extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {LocationDetails} location
     * @return {WeatherServiceData}
     */
    setLocation (location) {
        this.validateType(LocationDetails, location);
        this.setParameter(WeatherServiceData.KEY_LOCATION, location);
        return this;
    }

    /**
     * @return {LocationDetails}
     */
    getLocation () {
        return this.getObject(LocationDetails, WeatherServiceData.KEY_LOCATION);
    }

    /**
     * @param {WeatherData} forecast
     * @return {WeatherServiceData}
     */
    setCurrentForecast (forecast) {
        this.validateType(WeatherData, forecast);
        this.setParameter(WeatherServiceData.KEY_CURRENT_FORECAST, forecast);
        return this;
    }

    /**
     * @return {WeatherData}
     */
    getCurrentForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_CURRENT_FORECAST);
    }

    /**
     * @param {WeatherData[]} forecast
     * @return {WeatherServiceData}
     */
    setMinuteForecast (forecast) {
        this.validateType(WeatherData, forecast, true);
        this.setParameter(WeatherServiceData.KEY_MINUTE_FORECAST, forecast);
        return this;
    }

    /**
     * @return {WeatherData[]}
     */
    getMinuteForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_MINUTE_FORECAST);
    }

    /**
     * @param {WeatherData[]} forecast
     * @return {WeatherServiceData}
     */
    setHourlyForecast (forecast) {
        this.validateType(WeatherData, forecast, true);
        this.setParameter(WeatherServiceData.KEY_HOURLY_FORECAST, forecast);
        return this;
    }

    /**
     * @return {WeatherData[]}
     */
    getHourlyForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_HOURLY_FORECAST);
    }

    /**
     * @param {WeatherData[]} forecast
     * @return {WeatherServiceData}
     */
    setMultidayForecast (forecast) {
        this.validateType(WeatherData, forecast, true);
        this.setParameter(WeatherServiceData.KEY_MULTIDAY_FORECAST, forecast);
        return this;
    }

    /**
     * @return {WeatherData[]}
     */
    getMultidayForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_MULTIDAY_FORECAST);
    }

    /**
     * @param {WeatherAlert[]} alerts - This array should be ordered with the first object being the current day
     * @return {WeatherServiceData}
     */
    setAlerts (alerts) {
        this.validateType(WeatherAlert, alerts, true);
        this.setParameter(WeatherServiceData.KEY_ALERTS, alerts);
        return this;
    }

    /**
     * @return {WeatherAlert[]}
     */
    getAlerts () {
        return this.getObject(WeatherAlert, WeatherServiceData.KEY_ALERTS);
    }
}

WeatherServiceData.KEY_LOCATION = 'location';
WeatherServiceData.KEY_CURRENT_FORECAST = 'currentForecast';
WeatherServiceData.KEY_MINUTE_FORECAST = 'minuteForecast';
WeatherServiceData.KEY_HOURLY_FORECAST = 'hourlyForecast';
WeatherServiceData.KEY_MULTIDAY_FORECAST = 'multidayForecast';
WeatherServiceData.KEY_ALERTS = 'alerts';

export { WeatherServiceData };