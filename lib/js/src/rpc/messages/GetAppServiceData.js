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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * This request asks the module for current data related to the specific service. It also includes an option to subscribe to that service for future updates
 */
class GetAppServiceData extends RpcRequest {
    /**
     * Initalizes an instance of GetAppServiceData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetAppServiceData);
    }

    /**
     * Set the ServiceType
     * @param {String} type - The type of service that is to be offered by this app. See AppServiceType for known enum equivalent types. Parameter is a string to allow for new service types to be used by apps on older versions of SDL Core. - The desired ServiceType.
     * {'string_min_length': 1}
     * @returns {GetAppServiceData} - The class instance for method chaining.
     */
    setServiceType (type) {
        this.setParameter(GetAppServiceData.KEY_SERVICE_TYPE, type);
        return this;
    }

    /**
     * Get the ServiceType
     * @returns {String} - the KEY_SERVICE_TYPE value
     */
    getServiceType () {
        return this.getParameter(GetAppServiceData.KEY_SERVICE_TYPE);
    }

    /**
     * Set the Subscribe
     * @param {Boolean} subscribe - If true, the consumer is requesting to subscribe to all future updates from the service publisher. If false, the consumer doesn't wish to subscribe and should be unsubscribed if it was previously subscribed. - The desired Subscribe.
     * @returns {GetAppServiceData} - The class instance for method chaining.
     */
    setSubscribe (subscribe) {
        this.setParameter(GetAppServiceData.KEY_SUBSCRIBE, subscribe);
        return this;
    }

    /**
     * Get the Subscribe
     * @returns {Boolean} - the KEY_SUBSCRIBE value
     */
    getSubscribe () {
        return this.getParameter(GetAppServiceData.KEY_SUBSCRIBE);
    }
}

GetAppServiceData.KEY_SERVICE_TYPE = 'serviceType';
GetAppServiceData.KEY_SUBSCRIBE = 'subscribe';

export { GetAppServiceData };