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

import { HybridAppPreference } from '../enums/HybridAppPreference.js';
import { RpcStruct } from '../RpcStruct.js';

class CloudAppProperties extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String[]} nicknames - An array of app names a cloud app is allowed to register with. If included in a
     *                               SetCloudAppProperties request, this value will overwrite the existing "nicknames"
     *                               field in the app policies section of the policy table.
     * @return {CloudAppProperties}
     */
    setNicknames (nicknames) {
        this.setParameter(CloudAppProperties.KEY_NICKNAMES, nicknames);
        return this;
    }

    /**
     * @return {String[]}
     */
    getNicknames () {
        return this.getParameter(CloudAppProperties.KEY_NICKNAMES);
    }

    /**
     * @param {String} id
     * @return {CloudAppProperties}
     */
    setAppID (id) {
        this.setParameter(CloudAppProperties.KEY_APP_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getAppID () {
        return this.getParameter(CloudAppProperties.KEY_APP_ID);
    }

    /**
     * @param {Boolean} enabled - If true, cloud app will be included in HMI RPC UpdateAppList
     * @return {CloudAppProperties}
     */
    setEnabled (enabled) {
        this.setParameter(CloudAppProperties.KEY_ENABLED, enabled);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEnabled () {
        return this.getParameter(CloudAppProperties.KEY_ENABLED);
    }

    /**
     * @param {String} token - Used to authenticate websocket connection on app activation
     * @return {CloudAppProperties}
     */
    setAuthToken (token) {
        this.setParameter(CloudAppProperties.KEY_AUTH_TOKEN, token);
        return this;
    }

    /**
     * @return {String}
     */
    getAuthToken () {
        return this.getParameter(CloudAppProperties.KEY_AUTH_TOKEN);
    }

    /**
     * @param {String} type - Specifies the connection type Core should use
     * @return {CloudAppProperties}
     */
    setCloudTransportType (type) {
        this.setParameter(CloudAppProperties.KEY_CLOUD_TRANSPORT_TYPE, type);
        return this;
    }

    /**
     * @return {String}
     */
    getCloudTransportType () {
        return this.getParameter(CloudAppProperties.KEY_CLOUD_TRANSPORT_TYPE);
    }

    /**
     * @param {HybridAppPreference} preference - Specifies the user preference to use the cloud app version or mobile
     *                                           app version when both are available
     * @return {CloudAppProperties}
     */
    setHybridAppPreference (preference) {
        this.validateType(HybridAppPreference, preference);
        this.setParameter(CloudAppProperties.KEY_HYBRID_APP_PREFERENCE, preference);
        return this;
    }

    /**
     * @return {HybridAppPreference}
     */
    getHybridAppPreference () {
        return this.getObject(HybridAppPreference, CloudAppProperties.KEY_HYBRID_APP_PREFERENCE);
    }

    /**
     * @param {String} endpoint - Specifies the endpoint which Core will attempt to connect to when this app is selected
     * @return {CloudAppProperties}
     */
    setEndpoint (endpoint) {
        this.setParameter(CloudAppProperties.KEY_ENDPOINT, endpoint);
        return this;
    }

    /**
     * @return {String}
     */
    getEndpoint () {
        return this.getParameter(CloudAppProperties.KEY_ENDPOINT);
    }
}

CloudAppProperties.KEY_NICKNAMES = 'nicknames';
CloudAppProperties.KEY_APP_ID = 'appID';
CloudAppProperties.KEY_ENABLED = 'enabled';
CloudAppProperties.KEY_AUTH_TOKEN = 'authToken';
CloudAppProperties.KEY_CLOUD_TRANSPORT_TYPE = 'cloudTransportType';
CloudAppProperties.KEY_HYBRID_APP_PREFERENCE = 'hybridAppPreference';
CloudAppProperties.KEY_ENDPOINT = 'endpoint';

export { CloudAppProperties };