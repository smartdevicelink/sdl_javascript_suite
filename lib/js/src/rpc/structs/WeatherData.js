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
import { Image } from './Image.js';
import { RpcStruct } from '../RpcStruct.js';
import { Temperature } from './Temperature.js';

class WeatherData extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Temperature} temperature
     * @return {WeatherData}
     */
    setCurrentTemperature (temperature) {
        this.validateType(Temperature, temperature);
        this.setParameter(WeatherData.KEY_CURRENT_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getCurrentTemperature () {
        return this.getObject(Temperature, WeatherData.KEY_CURRENT_TEMPERATURE);
    }

    /**
     * @param {Temperature} high
     * @return {WeatherData}
     */
    setTemperatureHigh (high) {
        this.validateType(Temperature, high);
        this.setParameter(WeatherData.KEY_TEMPERATURE_HIGH, high);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getTemperatureHigh () {
        return this.getObject(Temperature, WeatherData.KEY_TEMPERATURE_HIGH);
    }

    /**
     * @param {Temperature} low
     * @return {WeatherData}
     */
    setTemperatureLow (low) {
        this.validateType(Temperature, low);
        this.setParameter(WeatherData.KEY_TEMPERATURE_LOW, low);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getTemperatureLow () {
        return this.getObject(Temperature, WeatherData.KEY_TEMPERATURE_LOW);
    }

    /**
     * @param {Temperature} temperature
     * @return {WeatherData}
     */
    setApparentTemperature (temperature) {
        this.validateType(Temperature, temperature);
        this.setParameter(WeatherData.KEY_APPARENT_TEMPERATURE, temperature);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getApparentTemperature () {
        return this.getObject(Temperature, WeatherData.KEY_APPARENT_TEMPERATURE);
    }

    /**
     * @param {Temperature} high
     * @return {WeatherData}
     */
    setApparentTemperatureHigh (high) {
        this.validateType(Temperature, high);
        this.setParameter(WeatherData.KEY_APPARENT_TEMPERATURE_HIGH, high);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getApparentTemperatureHigh () {
        return this.getObject(Temperature, WeatherData.KEY_APPARENT_TEMPERATURE_HIGH);
    }

    /**
     * @param {Temperature} low
     * @return {WeatherData}
     */
    setApparentTemperatureLow (low) {
        this.validateType(Temperature, low);
        this.setParameter(WeatherData.KEY_APPARENT_TEMPERATURE_LOW, low);
        return this;
    }

    /**
     * @return {Temperature}
     */
    getApparentTemperatureLow () {
        return this.getObject(Temperature, WeatherData.KEY_APPARENT_TEMPERATURE_LOW);
    }

    /**
     * @param {String} summary
     * @return {WeatherData}
     */
    setWeatherSummary (summary) {
        this.setParameter(WeatherData.KEY_WEATHER_SUMMARY, summary);
        return this;
    }

    /**
     * @return {String}
     */
    getWeatherSummary () {
        return this.getParameter(WeatherData.KEY_WEATHER_SUMMARY);
    }

    /**
     * @param {DateTime} time
     * @return {WeatherData}
     */
    setTime (time) {
        this.validateType(DateTime, time);
        this.setParameter(WeatherData.KEY_TIME, time);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getTime () {
        return this.getObject(DateTime, WeatherData.KEY_TIME);
    }

    /**
     * @param {Number} humidity - 0 to 1, percentage humidity
     * @return {WeatherData}
     */
    setHumidity (humidity) {
        this.setParameter(WeatherData.KEY_HUMIDITY, humidity);
        return this;
    }

    /**
     * @return {Number}
     */
    getHumidity () {
        return this.getParameter(WeatherData.KEY_HUMIDITY);
    }

    /**
     * @param {Number} cover - 0 to 1, percentage cloud cover
     * @return {WeatherData}
     */
    setCloudCover (cover) {
        this.setParameter(WeatherData.KEY_CLOUD_COVER, cover);
        return this;
    }

    /**
     * @return {Number}
     */
    getCloudCover () {
        return this.getParameter(WeatherData.KEY_CLOUD_COVER);
    }

    /**
     * @param {Number} phase - 0 to 1, percentage of the moon seen, e.g. 0 = no moon, 0.25 = quarter moon
     * @return {WeatherData}
     */
    setMoonPhase (phase) {
        this.setParameter(WeatherData.KEY_MOON_PHASE, phase);
        return this;
    }

    /**
     * @return {Number}
     */
    getMoonPhase () {
        return this.getParameter(WeatherData.KEY_MOON_PHASE);
    }

    /**
     * @param {Number} bearing - In degrees, true north at 0 degrees
     * @return {WeatherData}
     */
    setWindBearing (bearing) {
        this.setParameter(WeatherData.KEY_WIND_BEARING, bearing);
        return this;
    }

    /**
     * @return {Number}
     */
    getWindBearing () {
        return this.getParameter(WeatherData.KEY_WIND_BEARING);
    }

    /**
     * @param {Number} gust - km/hr
     * @return {WeatherData}
     */
    setWindGust (gust) {
        this.setParameter(WeatherData.KEY_WIND_GUST, gust);
        return this;
    }

    /**
     * @return {Number}
     */
    getWindGust () {
        return this.getParameter(WeatherData.KEY_WIND_GUST);
    }

    /**
     * @param {Number} speed - km/hr
     * @return {WeatherData}
     */
    setWindSpeed (speed) {
        this.setParameter(WeatherData.KEY_WIND_SPEED, speed);
        return this;
    }

    /**
     * @return {Number}
     */
    getWindSpeed () {
        return this.getParameter(WeatherData.KEY_WIND_SPEED);
    }

    /**
     * @param {Number} bearing - In degrees, true north at 0 degrees
     * @return {WeatherData}
     */
    setNearestStormBearing (bearing) {
        this.setParameter(WeatherData.KEY_NEAREST_STORM_BEARING, bearing);
        return this;
    }

    /**
     * @return {Number}
     */
    getNearestStormBearing () {
        return this.getParameter(WeatherData.KEY_NEAREST_STORM_BEARING);
    }

    /**
     * @param {Number} distance - In km
     * @return {WeatherData}
     */
    setNearestStormDistance (distance) {
        this.setParameter(WeatherData.KEY_NEAREST_STORM_DISTANCE, distance);
        return this;
    }

    /**
     * @return {Number}
     */
    getNearestStormDistance () {
        return this.getParameter(WeatherData.KEY_NEAREST_STORM_DISTANCE);
    }

    /**
     * @param {Number} accumulation - cm
     * @return {WeatherData}
     */
    setPrecipAccumulation (accumulation) {
        this.setParameter(WeatherData.KEY_PRECIP_ACCUMULATION, accumulation);
        return this;
    }

    /**
     * @return {Number}
     */
    getPrecipAccumulation () {
        return this.getParameter(WeatherData.KEY_PRECIP_ACCUMULATION);
    }

    /**
     * @param {Number} intensity - cm of water per hour
     * @return {WeatherData}
     */
    setPrecipIntensity (intensity) {
        this.setParameter(WeatherData.KEY_PRECIP_INTENSITY, intensity);
        return this;
    }

    /**
     * @return {Number}
     */
    getPrecipIntensity () {
        return this.getParameter(WeatherData.KEY_PRECIP_INTENSITY);
    }

    /**
     * @param {Number} probability - 0 to 1, percentage chance
     * @return {WeatherData}
     */
    setPrecipProbability (probability) {
        this.setParameter(WeatherData.KEY_PRECIP_PROBABILITY, probability);
        return this;
    }

    /**
     * @return {Number}
     */
    getPrecipProbability () {
        return this.getParameter(WeatherData.KEY_PRECIP_PROBABILITY);
    }

    /**
     * @param {String} type - e.g. "rain", "snow", "sleet", "hail"
     * @return {WeatherData}
     */
    setPrecipType (type) {
        this.setParameter(WeatherData.KEY_PRECIP_TYPE, type);
        return this;
    }

    /**
     * @return {String}
     */
    getPrecipType () {
        return this.getParameter(WeatherData.KEY_PRECIP_TYPE);
    }

    /**
     * @param {Number} visibility - In km
     * @return {WeatherData}
     */
    setVisibility (visibility) {
        this.setParameter(WeatherData.KEY_VISIBILITY, visibility);
        return this;
    }

    /**
     * @return {Number}
     */
    getVisibility () {
        return this.getParameter(WeatherData.KEY_VISIBILITY);
    }

    /**
     * @param {Image} icon
     * @return {WeatherData}
     */
    setWeatherIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(WeatherData.KEY_WEATHER_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
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