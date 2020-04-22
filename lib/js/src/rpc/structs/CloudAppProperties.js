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
     * Initalizes an instance of CloudAppProperties.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Nicknames
     * @param {String[]} nicknames - An array of app names a cloud app is allowed to register with. If included in a - The desired Nicknames.
     * SetCloudAppProperties request, this value will overwrite the existing "nicknames"
     * field in the app policies section of the policy table.
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setNicknames (nicknames) {
        this.setParameter(CloudAppProperties.KEY_NICKNAMES, nicknames);
        return this;
    }

    /**
     * Get the Nicknames
     * @returns {String[]} - the KEY_NICKNAMES value
     */
    getNicknames () {
        return this.getParameter(CloudAppProperties.KEY_NICKNAMES);
    }

    /**
     * Set the AppID
     * @param {String} id - The desired AppID.
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setAppID (id) {
        this.setParameter(CloudAppProperties.KEY_APP_ID, id);
        return this;
    }

    /**
     * Get the AppID
     * @returns {String} - the KEY_APP_ID value
     */
    getAppID () {
        return this.getParameter(CloudAppProperties.KEY_APP_ID);
    }

    /**
     * Set the Enabled
     * @param {Boolean} enabled - If true, cloud app will be included in HMI RPC UpdateAppList - The desired Enabled.
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setEnabled (enabled) {
        this.setParameter(CloudAppProperties.KEY_ENABLED, enabled);
        return this;
    }

    /**
     * Get the Enabled
     * @returns {Boolean} - the KEY_ENABLED value
     */
    getEnabled () {
        return this.getParameter(CloudAppProperties.KEY_ENABLED);
    }

    /**
     * Set the AuthToken
     * @param {String} token - Used to authenticate websocket connection on app activation - The desired AuthToken.
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setAuthToken (token) {
        this.setParameter(CloudAppProperties.KEY_AUTH_TOKEN, token);
        return this;
    }

    /**
     * Get the AuthToken
     * @returns {String} - the KEY_AUTH_TOKEN value
     */
    getAuthToken () {
        return this.getParameter(CloudAppProperties.KEY_AUTH_TOKEN);
    }

    /**
     * Set the CloudTransportType
     * @param {String} type - Specifies the connection type Core should use - The desired CloudTransportType.
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setCloudTransportType (type) {
        this.setParameter(CloudAppProperties.KEY_CLOUD_TRANSPORT_TYPE, type);
        return this;
    }

    /**
     * Get the CloudTransportType
     * @returns {String} - the KEY_CLOUD_TRANSPORT_TYPE value
     */
    getCloudTransportType () {
        return this.getParameter(CloudAppProperties.KEY_CLOUD_TRANSPORT_TYPE);
    }

    /**
     * Set the HybridAppPreference
     * @param {HybridAppPreference} preference - Specifies the user preference to use the cloud app version or mobile - The desired HybridAppPreference.
     * app version when both are available
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setHybridAppPreference (preference) {
        this._validateType(HybridAppPreference, preference);
        this.setParameter(CloudAppProperties.KEY_HYBRID_APP_PREFERENCE, preference);
        return this;
    }

    /**
     * Get the HybridAppPreference
     * @returns {HybridAppPreference} - the KEY_HYBRID_APP_PREFERENCE value
     */
    getHybridAppPreference () {
        return this.getObject(HybridAppPreference, CloudAppProperties.KEY_HYBRID_APP_PREFERENCE);
    }

    /**
     * Set the Endpoint
     * @param {String} endpoint - Specifies the endpoint which Core will attempt to connect to when this app is selected - The desired Endpoint.
     * @returns {CloudAppProperties} - The class instance for method chaining.
     */
    setEndpoint (endpoint) {
        this.setParameter(CloudAppProperties.KEY_ENDPOINT, endpoint);
        return this;
    }

    /**
     * Get the Endpoint
     * @returns {String} - the KEY_ENDPOINT value
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