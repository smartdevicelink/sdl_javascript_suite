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

import { MediaServiceData } from './MediaServiceData.js';
import { NavigationServiceData } from './NavigationServiceData.js';
import { RpcStruct } from '../RpcStruct.js';
import { WeatherServiceData } from './WeatherServiceData.js';

/**
 * Contains all the current data of the app service. The serviceType will link to which of the service data objects are included in this object (e.g. if the service type is MEDIA, the mediaServiceData param should be included).
 */
class AppServiceData extends RpcStruct {
    /**
     * Initalizes an instance of AppServiceData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ServiceType
     * @param {String} type - The type of service that is to be offered by this app. See AppServiceType for known enum equivalent types. Parameter is a string to allow for new service types to be used by apps on older versions of SDL Core. - The desired ServiceType.
     * {'string_min_length': 1}
     * @returns {AppServiceData} - The class instance for method chaining.
     */
    setServiceType (type) {
        this.setParameter(AppServiceData.KEY_SERVICE_TYPE, type);
        return this;
    }

    /**
     * Get the ServiceType
     * @returns {String} - the KEY_SERVICE_TYPE value
     */
    getServiceType () {
        return this.getParameter(AppServiceData.KEY_SERVICE_TYPE);
    }

    /**
     * Set the ServiceID
     * @param {String} id - The desired ServiceID.
     * {'string_min_length': 1}
     * @returns {AppServiceData} - The class instance for method chaining.
     */
    setServiceID (id) {
        this.setParameter(AppServiceData.KEY_SERVICE_ID, id);
        return this;
    }

    /**
     * Get the ServiceID
     * @returns {String} - the KEY_SERVICE_ID value
     */
    getServiceID () {
        return this.getParameter(AppServiceData.KEY_SERVICE_ID);
    }

    /**
     * Set the MediaServiceData
     * @param {MediaServiceData} data - This data is related to what a media service should provide - The desired MediaServiceData.
     * @returns {AppServiceData} - The class instance for method chaining.
     */
    setMediaServiceData (data) {
        this._validateType(MediaServiceData, data);
        this.setParameter(AppServiceData.KEY_MEDIA_SERVICE_DATA, data);
        return this;
    }

    /**
     * Get the MediaServiceData
     * @returns {MediaServiceData} - the KEY_MEDIA_SERVICE_DATA value
     */
    getMediaServiceData () {
        return this.getObject(MediaServiceData, AppServiceData.KEY_MEDIA_SERVICE_DATA);
    }

    /**
     * Set the WeatherServiceData
     * @param {WeatherServiceData} data - This data is related to what a weather service would provide - The desired WeatherServiceData.
     * @returns {AppServiceData} - The class instance for method chaining.
     */
    setWeatherServiceData (data) {
        this._validateType(WeatherServiceData, data);
        this.setParameter(AppServiceData.KEY_WEATHER_SERVICE_DATA, data);
        return this;
    }

    /**
     * Get the WeatherServiceData
     * @returns {WeatherServiceData} - the KEY_WEATHER_SERVICE_DATA value
     */
    getWeatherServiceData () {
        return this.getObject(WeatherServiceData, AppServiceData.KEY_WEATHER_SERVICE_DATA);
    }

    /**
     * Set the NavigationServiceData
     * @param {NavigationServiceData} data - This data is related to what a navigation service would provide. - The desired NavigationServiceData.
     * @returns {AppServiceData} - The class instance for method chaining.
     */
    setNavigationServiceData (data) {
        this._validateType(NavigationServiceData, data);
        this.setParameter(AppServiceData.KEY_NAVIGATION_SERVICE_DATA, data);
        return this;
    }

    /**
     * Get the NavigationServiceData
     * @returns {NavigationServiceData} - the KEY_NAVIGATION_SERVICE_DATA value
     */
    getNavigationServiceData () {
        return this.getObject(NavigationServiceData, AppServiceData.KEY_NAVIGATION_SERVICE_DATA);
    }
}

AppServiceData.KEY_SERVICE_TYPE = 'serviceType';
AppServiceData.KEY_SERVICE_ID = 'serviceID';
AppServiceData.KEY_MEDIA_SERVICE_DATA = 'mediaServiceData';
AppServiceData.KEY_WEATHER_SERVICE_DATA = 'weatherServiceData';
AppServiceData.KEY_NAVIGATION_SERVICE_DATA = 'navigationServiceData';

export { AppServiceData };