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

import { AppServiceRecord } from '../structs/AppServiceRecord.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcResponse } from '../RpcResponse.js';

/**
 * Response to the request to register a service offered by this app on the module
 */
class PublishAppServiceResponse extends RpcResponse {
    /**
     * Initializes an instance of PublishAppServiceResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.PublishAppService);
    }

    /**
     * Set the AppServiceRecord
     * @param {AppServiceRecord} record - If the request was successful, this object will be the current status of the service record for the published service. This will include the Core supplied service ID. - The desired AppServiceRecord.
     * @returns {PublishAppServiceResponse} - The class instance for method chaining.
     */
    setAppServiceRecord (record) {
        this._validateType(AppServiceRecord, record);
        this.setParameter(PublishAppServiceResponse.KEY_APP_SERVICE_RECORD, record);
        return this;
    }

    /**
     * Get the AppServiceRecord
     * @returns {AppServiceRecord} - the KEY_APP_SERVICE_RECORD value
     */
    getAppServiceRecord () {
        return this.getObject(AppServiceRecord, PublishAppServiceResponse.KEY_APP_SERVICE_RECORD);
    }
}

PublishAppServiceResponse.KEY_APP_SERVICE_RECORD = 'appServiceRecord';

export { PublishAppServiceResponse };