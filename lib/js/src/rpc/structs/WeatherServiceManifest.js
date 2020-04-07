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

class WeatherServiceManifest extends RpcStruct {
    /**
     * Initalizes an instance of WeatherServiceManifest.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the CurrentForecastSupported
     * @param {Boolean} supported - The desired CurrentForecastSupported.
     * @returns {WeatherServiceManifest} - The class instance for method chaining.
     */
    setCurrentForecastSupported (supported) {
        this.setParameter(WeatherServiceManifest.KEY_CURRENT_FORECAST_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the CurrentForecastSupported
     * @returns {Boolean} - the KEY_CURRENT_FORECAST_SUPPORTED value
     */
    getCurrentForecastSupported () {
        return this.getParameter(WeatherServiceManifest.KEY_CURRENT_FORECAST_SUPPORTED);
    }

    /**
     * Set the MaxMultidayForecastAmount
     * @param {Number} amount - The desired MaxMultidayForecastAmount.
     * @returns {WeatherServiceManifest} - The class instance for method chaining.
     */
    setMaxMultidayForecastAmount (amount) {
        this.setParameter(WeatherServiceManifest.KEY_MAX_MULTIDAY_FORECAST_AMOUNT, amount);
        return this;
    }

    /**
     * Get the MaxMultidayForecastAmount
     * @returns {Number} - the KEY_MAX_MULTIDAY_FORECAST_AMOUNT value
     */
    getMaxMultidayForecastAmount () {
        return this.getParameter(WeatherServiceManifest.KEY_MAX_MULTIDAY_FORECAST_AMOUNT);
    }

    /**
     * Set the MaxHourlyForecastAmount
     * @param {Number} amount - The desired MaxHourlyForecastAmount.
     * @returns {WeatherServiceManifest} - The class instance for method chaining.
     */
    setMaxHourlyForecastAmount (amount) {
        this.setParameter(WeatherServiceManifest.KEY_MAX_HOURLY_FORECAST_AMOUNT, amount);
        return this;
    }

    /**
     * Get the MaxHourlyForecastAmount
     * @returns {Number} - the KEY_MAX_HOURLY_FORECAST_AMOUNT value
     */
    getMaxHourlyForecastAmount () {
        return this.getParameter(WeatherServiceManifest.KEY_MAX_HOURLY_FORECAST_AMOUNT);
    }

    /**
     * Set the MaxMinutelyForecastAmount
     * @param {Number} amount - The desired MaxMinutelyForecastAmount.
     * @returns {WeatherServiceManifest} - The class instance for method chaining.
     */
    setMaxMinutelyForecastAmount (amount) {
        this.setParameter(WeatherServiceManifest.KEY_MAX_MINUTELY_FORECAST_AMOUNT, amount);
        return this;
    }

    /**
     * Get the MaxMinutelyForecastAmount
     * @returns {Number} - the KEY_MAX_MINUTELY_FORECAST_AMOUNT value
     */
    getMaxMinutelyForecastAmount () {
        return this.getParameter(WeatherServiceManifest.KEY_MAX_MINUTELY_FORECAST_AMOUNT);
    }

    /**
     * Set the WeatherForLocationSupported
     * @param {Boolean} supported - The desired WeatherForLocationSupported.
     * @returns {WeatherServiceManifest} - The class instance for method chaining.
     */
    setWeatherForLocationSupported (supported) {
        this.setParameter(WeatherServiceManifest.KEY_WEATHER_FOR_LOCATION_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the WeatherForLocationSupported
     * @returns {Boolean} - the KEY_WEATHER_FOR_LOCATION_SUPPORTED value
     */
    getWeatherForLocationSupported () {
        return this.getParameter(WeatherServiceManifest.KEY_WEATHER_FOR_LOCATION_SUPPORTED);
    }
}

WeatherServiceManifest.KEY_CURRENT_FORECAST_SUPPORTED = 'currentForecastSupported';
WeatherServiceManifest.KEY_MAX_MULTIDAY_FORECAST_AMOUNT = 'maxMultidayForecastAmount';
WeatherServiceManifest.KEY_MAX_HOURLY_FORECAST_AMOUNT = 'maxHourlyForecastAmount';
WeatherServiceManifest.KEY_MAX_MINUTELY_FORECAST_AMOUNT = 'maxMinutelyForecastAmount';
WeatherServiceManifest.KEY_WEATHER_FOR_LOCATION_SUPPORTED = 'weatherForLocationSupported';

export { WeatherServiceManifest };