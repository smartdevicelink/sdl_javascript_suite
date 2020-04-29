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

import { Image } from './Image.js';
import { MediaServiceManifest } from './MediaServiceManifest.js';
import { NavigationServiceManifest } from './NavigationServiceManifest.js';
import { RpcStruct } from '../RpcStruct.js';
import { SdlMsgVersion } from './SdlMsgVersion.js';
import { WeatherServiceManifest } from './WeatherServiceManifest.js';

/**
 * This manifest contains all the information necessary for the service to be published, activated, and consumers able
 * to interact with it
 */
class AppServiceManifest extends RpcStruct {
    /**
     * Initalizes an instance of AppServiceManifest.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ServiceName
     * @param {String} name - Unique name of this service - The desired ServiceName.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setServiceName (name) {
        this.setParameter(AppServiceManifest.KEY_SERVICE_NAME, name);
        return this;
    }

    /**
     * Get the ServiceName
     * @returns {String} - the KEY_SERVICE_NAME value
     */
    getServiceName () {
        return this.getParameter(AppServiceManifest.KEY_SERVICE_NAME);
    }

    /**
     * Set the ServiceType
     * @param {String} type - The type of service that is to be offered by this app. See AppServiceType for known enum - The desired ServiceType.
     * equivalent types. Parameter is a string to allow for new service types to be used by apps
     * on older versions of SDL Core.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setServiceType (type) {
        this.setParameter(AppServiceManifest.KEY_SERVICE_TYPE, type);
        return this;
    }

    /**
     * Get the ServiceType
     * @returns {String} - the KEY_SERVICE_TYPE value
     */
    getServiceType () {
        return this.getParameter(AppServiceManifest.KEY_SERVICE_TYPE);
    }

    /**
     * Set the ServiceIcon
     * @param {Image} icon - The icon to be associated with this service. Most likely the same as the appIcon. - The desired ServiceIcon.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setServiceIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(AppServiceManifest.KEY_SERVICE_ICON, icon);
        return this;
    }

    /**
     * Get the ServiceIcon
     * @returns {Image} - the KEY_SERVICE_ICON value
     */
    getServiceIcon () {
        return this.getObject(Image, AppServiceManifest.KEY_SERVICE_ICON);
    }

    /**
     * Set the AllowAppConsumers
     * @param {Boolean} consumers - If true, app service consumers beyond the IVI system will be able to access this - The desired AllowAppConsumers.
     * service. If false, only the IVI system will be able consume the service. If not
     * provided, it is assumed to be false.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setAllowAppConsumers (consumers) {
        this.setParameter(AppServiceManifest.KEY_ALLOW_APP_CONSUMERS, consumers);
        return this;
    }

    /**
     * Get the AllowAppConsumers
     * @returns {Boolean} - the KEY_ALLOW_APP_CONSUMERS value
     */
    getAllowAppConsumers () {
        return this.getParameter(AppServiceManifest.KEY_ALLOW_APP_CONSUMERS);
    }

    /**
     * Set the RpcSpecVersion
     * @param {SdlMsgVersion} version - This is the max RPC Spec version the app service understands. This is important - The desired RpcSpecVersion.
     * during the RPC passthrough functionality. If not included, it is assumed the max
     * version of the module is acceptable.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setRpcSpecVersion (version) {
        this._validateType(SdlMsgVersion, version);
        this.setParameter(AppServiceManifest.KEY_RPC_SPEC_VERSION, version);
        return this;
    }

    /**
     * Get the RpcSpecVersion
     * @returns {SdlMsgVersion} - the KEY_RPC_SPEC_VERSION value
     */
    getRpcSpecVersion () {
        return this.getObject(SdlMsgVersion, AppServiceManifest.KEY_RPC_SPEC_VERSION);
    }

    /**
     * Set the HandledRPCs
     * @param {Number[]} cs - This field contains the Function IDs for the RPCs that this service intends to handle - The desired HandledRPCs.
     * correctly. This means the service will provide meaningful responses.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setHandledRPCs (cs) {
        this.setParameter(AppServiceManifest.KEY_HANDLED_RPCS, cs);
        return this;
    }

    /**
     * Get the HandledRPCs
     * @returns {Number[]} - the KEY_HANDLED_RPCS value
     */
    getHandledRPCs () {
        return this.getParameter(AppServiceManifest.KEY_HANDLED_RPCS);
    }

    /**
     * Set the MediaServiceManifest
     * @param {MediaServiceManifest} manifest - The desired MediaServiceManifest.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setMediaServiceManifest (manifest) {
        this._validateType(MediaServiceManifest, manifest);
        this.setParameter(AppServiceManifest.KEY_MEDIA_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * Get the MediaServiceManifest
     * @returns {MediaServiceManifest} - the KEY_MEDIA_SERVICE_MANIFEST value
     */
    getMediaServiceManifest () {
        return this.getObject(MediaServiceManifest, AppServiceManifest.KEY_MEDIA_SERVICE_MANIFEST);
    }

    /**
     * Set the WeatherServiceManifest
     * @param {WeatherServiceManifest} manifest - The desired WeatherServiceManifest.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setWeatherServiceManifest (manifest) {
        this._validateType(WeatherServiceManifest, manifest);
        this.setParameter(AppServiceManifest.KEY_WEATHER_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * Get the WeatherServiceManifest
     * @returns {WeatherServiceManifest} - the KEY_WEATHER_SERVICE_MANIFEST value
     */
    getWeatherServiceManifest () {
        return this.getObject(WeatherServiceManifest, AppServiceManifest.KEY_WEATHER_SERVICE_MANIFEST);
    }

    /**
     * Set the NavigationServiceManifest
     * @param {NavigationServiceManifest} manifest - The desired NavigationServiceManifest.
     * @returns {AppServiceManifest} - The class instance for method chaining.
     */
    setNavigationServiceManifest (manifest) {
        this._validateType(NavigationServiceManifest, manifest);
        this.setParameter(AppServiceManifest.KEY_NAVIGATION_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * Get the NavigationServiceManifest
     * @returns {NavigationServiceManifest} - the KEY_NAVIGATION_SERVICE_MANIFEST value
     */
    getNavigationServiceManifest () {
        return this.getObject(NavigationServiceManifest, AppServiceManifest.KEY_NAVIGATION_SERVICE_MANIFEST);
    }
}

AppServiceManifest.KEY_SERVICE_NAME = 'serviceName';
AppServiceManifest.KEY_SERVICE_TYPE = 'serviceType';
AppServiceManifest.KEY_SERVICE_ICON = 'serviceIcon';
AppServiceManifest.KEY_ALLOW_APP_CONSUMERS = 'allowAppConsumers';
AppServiceManifest.KEY_RPC_SPEC_VERSION = 'rpcSpecVersion';
AppServiceManifest.KEY_HANDLED_RPCS = 'handledRPCs';
AppServiceManifest.KEY_MEDIA_SERVICE_MANIFEST = 'mediaServiceManifest';
AppServiceManifest.KEY_WEATHER_SERVICE_MANIFEST = 'weatherServiceManifest';
AppServiceManifest.KEY_NAVIGATION_SERVICE_MANIFEST = 'navigationServiceManifest';

export { AppServiceManifest };