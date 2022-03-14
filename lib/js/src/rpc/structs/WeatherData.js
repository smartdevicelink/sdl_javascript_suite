/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
import { Image } from './Image.js';
import { RpcStruct } from '../RpcStruct.js';
import { Temperature } from './Temperature.js';

class WeatherData extends RpcStruct {
    /**
     * Initializes an instance of WeatherData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the CurrentTemperature
     * @param {Temperature} temperature - The central temperature depending on the context of the weather data. It could be the present temperature, the temperature of a future minute, the temperature of a future hour, or an average temperature of a future day, for example. - The desired CurrentTemperature.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setCurrentTemperature (temperature) {
        this._validateType(Temperature, temperature);
        this.setParameter(WeatherData.KEY_CURRENT_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the CurrentTemperature
     * @returns {Temperature} - the KEY_CURRENT_TEMPERATURE value
     */
    getCurrentTemperature () {
        return this.getObject(Temperature, WeatherData.KEY_CURRENT_TEMPERATURE);
    }

    /**
     * Set the TemperatureHigh
     * @param {Temperature} high - The desired TemperatureHigh.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setTemperatureHigh (high) {
        this._validateType(Temperature, high);
        this.setParameter(WeatherData.KEY_TEMPERATURE_HIGH, high);
        return this;
    }

    /**
     * Get the TemperatureHigh
     * @returns {Temperature} - the KEY_TEMPERATURE_HIGH value
     */
    getTemperatureHigh () {
        return this.getObject(Temperature, WeatherData.KEY_TEMPERATURE_HIGH);
    }

    /**
     * Set the TemperatureLow
     * @param {Temperature} low - The desired TemperatureLow.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setTemperatureLow (low) {
        this._validateType(Temperature, low);
        this.setParameter(WeatherData.KEY_TEMPERATURE_LOW, low);
        return this;
    }

    /**
     * Get the TemperatureLow
     * @returns {Temperature} - the KEY_TEMPERATURE_LOW value
     */
    getTemperatureLow () {
        return this.getObject(Temperature, WeatherData.KEY_TEMPERATURE_LOW);
    }

    /**
     * Set the ApparentTemperature
     * @param {Temperature} temperature - The desired ApparentTemperature.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setApparentTemperature (temperature) {
        this._validateType(Temperature, temperature);
        this.setParameter(WeatherData.KEY_APPARENT_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ApparentTemperature
     * @returns {Temperature} - the KEY_APPARENT_TEMPERATURE value
     */
    getApparentTemperature () {
        return this.getObject(Temperature, WeatherData.KEY_APPARENT_TEMPERATURE);
    }

    /**
     * Set the ApparentTemperatureHigh
     * @param {Temperature} high - The desired ApparentTemperatureHigh.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setApparentTemperatureHigh (high) {
        this._validateType(Temperature, high);
        this.setParameter(WeatherData.KEY_APPARENT_TEMPERATURE_HIGH, high);
        return this;
    }

    /**
     * Get the ApparentTemperatureHigh
     * @returns {Temperature} - the KEY_APPARENT_TEMPERATURE_HIGH value
     */
    getApparentTemperatureHigh () {
        return this.getObject(Temperature, WeatherData.KEY_APPARENT_TEMPERATURE_HIGH);
    }

    /**
     * Set the ApparentTemperatureLow
     * @param {Temperature} low - The desired ApparentTemperatureLow.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setApparentTemperatureLow (low) {
        this._validateType(Temperature, low);
        this.setParameter(WeatherData.KEY_APPARENT_TEMPERATURE_LOW, low);
        return this;
    }

    /**
     * Get the ApparentTemperatureLow
     * @returns {Temperature} - the KEY_APPARENT_TEMPERATURE_LOW value
     */
    getApparentTemperatureLow () {
        return this.getObject(Temperature, WeatherData.KEY_APPARENT_TEMPERATURE_LOW);
    }

    /**
     * Set the WeatherSummary
     * @param {String} summary - The desired WeatherSummary.
     * {'string_min_length': 1}
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setWeatherSummary (summary) {
        this.setParameter(WeatherData.KEY_WEATHER_SUMMARY, summary);
        return this;
    }

    /**
     * Get the WeatherSummary
     * @returns {String} - the KEY_WEATHER_SUMMARY value
     */
    getWeatherSummary () {
        return this.getParameter(WeatherData.KEY_WEATHER_SUMMARY);
    }

    /**
     * Set the Time
     * @param {DateTime} time - The desired Time.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setTime (time) {
        this._validateType(DateTime, time);
        this.setParameter(WeatherData.KEY_TIME, time);
        return this;
    }

    /**
     * Get the Time
     * @returns {DateTime} - the KEY_TIME value
     */
    getTime () {
        return this.getObject(DateTime, WeatherData.KEY_TIME);
    }

    /**
     * Set the Humidity
     * @param {Number} humidity - 0 to 1, percentage humidity - The desired Humidity.
     * {'num_min_value': 0.0, 'num_max_value': 1.0}
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setHumidity (humidity) {
        this.setParameter(WeatherData.KEY_HUMIDITY, humidity);
        return this;
    }

    /**
     * Get the Humidity
     * @returns {Number} - the KEY_HUMIDITY value
     */
    getHumidity () {
        return this.getParameter(WeatherData.KEY_HUMIDITY);
    }

    /**
     * Set the CloudCover
     * @param {Number} cover - 0 to 1, percentage cloud cover - The desired CloudCover.
     * {'num_min_value': 0.0, 'num_max_value': 1.0}
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setCloudCover (cover) {
        this.setParameter(WeatherData.KEY_CLOUD_COVER, cover);
        return this;
    }

    /**
     * Get the CloudCover
     * @returns {Number} - the KEY_CLOUD_COVER value
     */
    getCloudCover () {
        return this.getParameter(WeatherData.KEY_CLOUD_COVER);
    }

    /**
     * Set the MoonPhase
     * @param {Number} phase - 0 to 1, percentage of the moon seen, e.g. 0 = no moon, 0.25 = quarter moon - The desired MoonPhase.
     * {'num_min_value': 0.0, 'num_max_value': 1.0}
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setMoonPhase (phase) {
        this.setParameter(WeatherData.KEY_MOON_PHASE, phase);
        return this;
    }

    /**
     * Get the MoonPhase
     * @returns {Number} - the KEY_MOON_PHASE value
     */
    getMoonPhase () {
        return this.getParameter(WeatherData.KEY_MOON_PHASE);
    }

    /**
     * Set the WindBearing
     * @param {Number} bearing - In degrees, true north at 0 degrees - The desired WindBearing.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setWindBearing (bearing) {
        this.setParameter(WeatherData.KEY_WIND_BEARING, bearing);
        return this;
    }

    /**
     * Get the WindBearing
     * @returns {Number} - the KEY_WIND_BEARING value
     */
    getWindBearing () {
        return this.getParameter(WeatherData.KEY_WIND_BEARING);
    }

    /**
     * Set the WindGust
     * @param {Number} gust - km/hr - The desired WindGust.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setWindGust (gust) {
        this.setParameter(WeatherData.KEY_WIND_GUST, gust);
        return this;
    }

    /**
     * Get the WindGust
     * @returns {Number} - the KEY_WIND_GUST value
     */
    getWindGust () {
        return this.getParameter(WeatherData.KEY_WIND_GUST);
    }

    /**
     * Set the WindSpeed
     * @param {Number} speed - km/hr - The desired WindSpeed.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setWindSpeed (speed) {
        this.setParameter(WeatherData.KEY_WIND_SPEED, speed);
        return this;
    }

    /**
     * Get the WindSpeed
     * @returns {Number} - the KEY_WIND_SPEED value
     */
    getWindSpeed () {
        return this.getParameter(WeatherData.KEY_WIND_SPEED);
    }

    /**
     * Set the NearestStormBearing
     * @param {Number} bearing - In degrees, true north at 0 degrees - The desired NearestStormBearing.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setNearestStormBearing (bearing) {
        this.setParameter(WeatherData.KEY_NEAREST_STORM_BEARING, bearing);
        return this;
    }

    /**
     * Get the NearestStormBearing
     * @returns {Number} - the KEY_NEAREST_STORM_BEARING value
     */
    getNearestStormBearing () {
        return this.getParameter(WeatherData.KEY_NEAREST_STORM_BEARING);
    }

    /**
     * Set the NearestStormDistance
     * @param {Number} distance - In km - The desired NearestStormDistance.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setNearestStormDistance (distance) {
        this.setParameter(WeatherData.KEY_NEAREST_STORM_DISTANCE, distance);
        return this;
    }

    /**
     * Get the NearestStormDistance
     * @returns {Number} - the KEY_NEAREST_STORM_DISTANCE value
     */
    getNearestStormDistance () {
        return this.getParameter(WeatherData.KEY_NEAREST_STORM_DISTANCE);
    }

    /**
     * Set the PrecipAccumulation
     * @param {Number} accumulation - cm - The desired PrecipAccumulation.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setPrecipAccumulation (accumulation) {
        this.setParameter(WeatherData.KEY_PRECIP_ACCUMULATION, accumulation);
        return this;
    }

    /**
     * Get the PrecipAccumulation
     * @returns {Number} - the KEY_PRECIP_ACCUMULATION value
     */
    getPrecipAccumulation () {
        return this.getParameter(WeatherData.KEY_PRECIP_ACCUMULATION);
    }

    /**
     * Set the PrecipIntensity
     * @param {Number} intensity - cm of water per hour - The desired PrecipIntensity.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setPrecipIntensity (intensity) {
        this.setParameter(WeatherData.KEY_PRECIP_INTENSITY, intensity);
        return this;
    }

    /**
     * Get the PrecipIntensity
     * @returns {Number} - the KEY_PRECIP_INTENSITY value
     */
    getPrecipIntensity () {
        return this.getParameter(WeatherData.KEY_PRECIP_INTENSITY);
    }

    /**
     * Set the PrecipProbability
     * @param {Number} probability - 0 to 1, percentage chance - The desired PrecipProbability.
     * {'num_min_value': 0.0, 'num_max_value': 1.0}
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setPrecipProbability (probability) {
        this.setParameter(WeatherData.KEY_PRECIP_PROBABILITY, probability);
        return this;
    }

    /**
     * Get the PrecipProbability
     * @returns {Number} - the KEY_PRECIP_PROBABILITY value
     */
    getPrecipProbability () {
        return this.getParameter(WeatherData.KEY_PRECIP_PROBABILITY);
    }

    /**
     * Set the PrecipType
     * @param {String} type - e.g. "rain", "snow", "sleet", "hail" - The desired PrecipType.
     * {'string_min_length': 1}
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setPrecipType (type) {
        this.setParameter(WeatherData.KEY_PRECIP_TYPE, type);
        return this;
    }

    /**
     * Get the PrecipType
     * @returns {String} - the KEY_PRECIP_TYPE value
     */
    getPrecipType () {
        return this.getParameter(WeatherData.KEY_PRECIP_TYPE);
    }

    /**
     * Set the Visibility
     * @param {Number} visibility - In km - The desired Visibility.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setVisibility (visibility) {
        this.setParameter(WeatherData.KEY_VISIBILITY, visibility);
        return this;
    }

    /**
     * Get the Visibility
     * @returns {Number} - the KEY_VISIBILITY value
     */
    getVisibility () {
        return this.getParameter(WeatherData.KEY_VISIBILITY);
    }

    /**
     * Set the WeatherIcon
     * @param {Image} icon - The desired WeatherIcon.
     * @returns {WeatherData} - The class instance for method chaining.
     */
    setWeatherIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(WeatherData.KEY_WEATHER_ICON, icon);
        return this;
    }

    /**
     * Get the WeatherIcon
     * @returns {Image} - the KEY_WEATHER_ICON value
     */
    getWeatherIcon () {
        return this.getObject(Image, WeatherData.KEY_WEATHER_ICON);
    }
}

WeatherData.KEY_CURRENT_TEMPERATURE = 'currentTemperature';
WeatherData.KEY_TEMPERATURE_HIGH = 'temperatureHigh';
WeatherData.KEY_TEMPERATURE_LOW = 'temperatureLow';
WeatherData.KEY_APPARENT_TEMPERATURE = 'apparentTemperature';
WeatherData.KEY_APPARENT_TEMPERATURE_HIGH = 'apparentTemperatureHigh';
WeatherData.KEY_APPARENT_TEMPERATURE_LOW = 'apparentTemperatureLow';
WeatherData.KEY_WEATHER_SUMMARY = 'weatherSummary';
WeatherData.KEY_TIME = 'time';
WeatherData.KEY_HUMIDITY = 'humidity';
WeatherData.KEY_CLOUD_COVER = 'cloudCover';
WeatherData.KEY_MOON_PHASE = 'moonPhase';
WeatherData.KEY_WIND_BEARING = 'windBearing';
WeatherData.KEY_WIND_GUST = 'windGust';
WeatherData.KEY_WIND_SPEED = 'windSpeed';
WeatherData.KEY_NEAREST_STORM_BEARING = 'nearestStormBearing';
WeatherData.KEY_NEAREST_STORM_DISTANCE = 'nearestStormDistance';
WeatherData.KEY_PRECIP_ACCUMULATION = 'precipAccumulation';
WeatherData.KEY_PRECIP_INTENSITY = 'precipIntensity';
WeatherData.KEY_PRECIP_PROBABILITY = 'precipProbability';
WeatherData.KEY_PRECIP_TYPE = 'precipType';
WeatherData.KEY_VISIBILITY = 'visibility';
WeatherData.KEY_WEATHER_ICON = 'weatherIcon';

export { WeatherData };