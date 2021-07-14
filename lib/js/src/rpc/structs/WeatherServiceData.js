/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
     * Initializes an instance of WeatherServiceData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Location
     * @param {LocationDetails} location - The desired Location.
     * @returns {WeatherServiceData} - The class instance for method chaining.
     */
    setLocation (location) {
        this._validateType(LocationDetails, location);
        this.setParameter(WeatherServiceData.KEY_LOCATION, location);
        return this;
    }

    /**
     * Get the Location
     * @returns {LocationDetails} - the KEY_LOCATION value
     */
    getLocation () {
        return this.getObject(LocationDetails, WeatherServiceData.KEY_LOCATION);
    }

    /**
     * Set the CurrentForecast
     * @param {WeatherData} forecast - The desired CurrentForecast.
     * @returns {WeatherServiceData} - The class instance for method chaining.
     */
    setCurrentForecast (forecast) {
        this._validateType(WeatherData, forecast);
        this.setParameter(WeatherServiceData.KEY_CURRENT_FORECAST, forecast);
        return this;
    }

    /**
     * Get the CurrentForecast
     * @returns {WeatherData} - the KEY_CURRENT_FORECAST value
     */
    getCurrentForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_CURRENT_FORECAST);
    }

    /**
     * Set the MinuteForecast
     * @param {WeatherData[]} forecast - The desired MinuteForecast.
     * {'array_min_size': 15, 'array_max_size': 60}
     * @returns {WeatherServiceData} - The class instance for method chaining.
     */
    setMinuteForecast (forecast) {
        this._validateType(WeatherData, forecast, true);
        this.setParameter(WeatherServiceData.KEY_MINUTE_FORECAST, forecast);
        return this;
    }

    /**
     * Get the MinuteForecast
     * @returns {WeatherData[]} - the KEY_MINUTE_FORECAST value
     */
    getMinuteForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_MINUTE_FORECAST);
    }

    /**
     * Set the HourlyForecast
     * @param {WeatherData[]} forecast - The desired HourlyForecast.
     * {'array_min_size': 1, 'array_max_size': 96}
     * @returns {WeatherServiceData} - The class instance for method chaining.
     */
    setHourlyForecast (forecast) {
        this._validateType(WeatherData, forecast, true);
        this.setParameter(WeatherServiceData.KEY_HOURLY_FORECAST, forecast);
        return this;
    }

    /**
     * Get the HourlyForecast
     * @returns {WeatherData[]} - the KEY_HOURLY_FORECAST value
     */
    getHourlyForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_HOURLY_FORECAST);
    }

    /**
     * Set the MultidayForecast
     * @param {WeatherData[]} forecast - The desired MultidayForecast.
     * {'array_min_size': 1, 'array_max_size': 30}
     * @returns {WeatherServiceData} - The class instance for method chaining.
     */
    setMultidayForecast (forecast) {
        this._validateType(WeatherData, forecast, true);
        this.setParameter(WeatherServiceData.KEY_MULTIDAY_FORECAST, forecast);
        return this;
    }

    /**
     * Get the MultidayForecast
     * @returns {WeatherData[]} - the KEY_MULTIDAY_FORECAST value
     */
    getMultidayForecast () {
        return this.getObject(WeatherData, WeatherServiceData.KEY_MULTIDAY_FORECAST);
    }

    /**
     * Set the Alerts
     * @param {WeatherAlert[]} alerts - This array should be ordered with the first object being the current day - The desired Alerts.
     * {'array_min_size': 1, 'array_max_size': 10}
     * @returns {WeatherServiceData} - The class instance for method chaining.
     */
    setAlerts (alerts) {
        this._validateType(WeatherAlert, alerts, true);
        this.setParameter(WeatherServiceData.KEY_ALERTS, alerts);
        return this;
    }

    /**
     * Get the Alerts
     * @returns {WeatherAlert[]} - the KEY_ALERTS value
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