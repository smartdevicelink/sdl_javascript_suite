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

import { NavigationServiceManifest } from './NavigationServiceManifest.js';
import { Image } from './Image.js';
import { SdlMsgVersion } from './SdlMsgVersion.js';
import { WeatherServiceManifest } from './WeatherServiceManifest.js';
import { RpcStruct } from '../RpcStruct.js';
import { MediaServiceManifest } from './MediaServiceManifest.js';

/**
 * This manifest contains all the information necessary for the service to be published, activated, and consumers able
 * to interact with it
 */
class AppServiceManifest extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - Unique name of this service
     * @return {AppServiceManifest}
     */
    setServiceName (name) {
        this.setParameter(AppServiceManifest.KEY_SERVICE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getServiceName () {
        return this.getParameter(AppServiceManifest.KEY_SERVICE_NAME);
    }

    /**
     * @param {String} type - The type of service that is to be offered by this app. See AppServiceType for known enum
     *                        equivalent types. Parameter is a string to allow for new service types to be used by apps
     *                        on older versions of SDL Core.
     * @return {AppServiceManifest}
     */
    setServiceType (type) {
        this.setParameter(AppServiceManifest.KEY_SERVICE_TYPE, type);
        return this;
    }

    /**
     * @return {String}
     */
    getServiceType () {
        return this.getParameter(AppServiceManifest.KEY_SERVICE_TYPE);
    }

    /**
     * @param {Image} icon - The icon to be associated with this service. Most likely the same as the appIcon.
     * @return {AppServiceManifest}
     */
    setServiceIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(AppServiceManifest.KEY_SERVICE_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getServiceIcon () {
        return this.getObject(Image, AppServiceManifest.KEY_SERVICE_ICON);
    }

    /**
     * @param {Boolean} consumers - If true, app service consumers beyond the IVI system will be able to access this
     *                              service. If false, only the IVI system will be able consume the service. If not
     *                              provided, it is assumed to be false.
     * @return {AppServiceManifest}
     */
    setAllowAppConsumers (consumers) {
        this.setParameter(AppServiceManifest.KEY_ALLOW_APP_CONSUMERS, consumers);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAllowAppConsumers () {
        return this.getParameter(AppServiceManifest.KEY_ALLOW_APP_CONSUMERS);
    }

    /**
     * @param {SdlMsgVersion} version - This is the max RPC Spec version the app service understands. This is important
     *                                  during the RPC passthrough functionality. If not included, it is assumed the max
     *                                  version of the module is acceptable.
     * @return {AppServiceManifest}
     */
    setRpcSpecVersion (version) {
        this.validateType(SdlMsgVersion, version);
        this.setParameter(AppServiceManifest.KEY_RPC_SPEC_VERSION, version);
        return this;
    }

    /**
     * @return {SdlMsgVersion}
     */
    getRpcSpecVersion () {
        return this.getObject(SdlMsgVersion, AppServiceManifest.KEY_RPC_SPEC_VERSION);
    }

    /**
     * @param {Number[]} cs - This field contains the Function IDs for the RPCs that this service intends to handle
     *                        correctly. This means the service will provide meaningful responses.
     * @return {AppServiceManifest}
     */
    setHandledRPCs (cs) {
        this.setParameter(AppServiceManifest.KEY_HANDLED_RPCS, cs);
        return this;
    }

    /**
     * @return {Number[]}
     */
    getHandledRPCs () {
        return this.getParameter(AppServiceManifest.KEY_HANDLED_RPCS);
    }

    /**
     * @param {MediaServiceManifest} manifest
     * @return {AppServiceManifest}
     */
    setMediaServiceManifest (manifest) {
        this.validateType(MediaServiceManifest, manifest);
        this.setParameter(AppServiceManifest.KEY_MEDIA_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * @return {MediaServiceManifest}
     */
    getMediaServiceManifest () {
        return this.getObject(MediaServiceManifest, AppServiceManifest.KEY_MEDIA_SERVICE_MANIFEST);
    }

    /**
     * @param {WeatherServiceManifest} manifest
     * @return {AppServiceManifest}
     */
    setWeatherServiceManifest (manifest) {
        this.validateType(WeatherServiceManifest, manifest);
        this.setParameter(AppServiceManifest.KEY_WEATHER_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * @return {WeatherServiceManifest}
     */
    getWeatherServiceManifest () {
        return this.getObject(WeatherServiceManifest, AppServiceManifest.KEY_WEATHER_SERVICE_MANIFEST);
    }

    /**
     * @param {NavigationServiceManifest} manifest
     * @return {AppServiceManifest}
     */
    setNavigationServiceManifest (manifest) {
        this.validateType(NavigationServiceManifest, manifest);
        this.setParameter(AppServiceManifest.KEY_NAVIGATION_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * @return {NavigationServiceManifest}
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