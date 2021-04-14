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

import { AppServiceRecord } from './AppServiceRecord.js';
import { RpcStruct } from '../RpcStruct.js';
import { ServiceUpdateReason } from '../enums/ServiceUpdateReason.js';

class AppServiceCapability extends RpcStruct {
    /**
     * Initializes an instance of AppServiceCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the UpdateReason
     * @param {ServiceUpdateReason} reason - Only included in OnSystemCapabilityUpdated. Update reason for service record. - The desired UpdateReason.
     * @returns {AppServiceCapability} - The class instance for method chaining.
     */
    setUpdateReason (reason) {
        this._validateType(ServiceUpdateReason, reason);
        this.setParameter(AppServiceCapability.KEY_UPDATE_REASON, reason);
        return this;
    }

    /**
     * Get the UpdateReason
     * @returns {ServiceUpdateReason} - the KEY_UPDATE_REASON value
     */
    getUpdateReason () {
        return this.getObject(ServiceUpdateReason, AppServiceCapability.KEY_UPDATE_REASON);
    }

    /**
     * Set the UpdatedAppServiceRecord
     * @param {AppServiceRecord} record - Service record for a specific app service provider - The desired UpdatedAppServiceRecord.
     * @returns {AppServiceCapability} - The class instance for method chaining.
     */
    setUpdatedAppServiceRecord (record) {
        this._validateType(AppServiceRecord, record);
        this.setParameter(AppServiceCapability.KEY_UPDATED_APP_SERVICE_RECORD, record);
        return this;
    }

    /**
     * Get the UpdatedAppServiceRecord
     * @returns {AppServiceRecord} - the KEY_UPDATED_APP_SERVICE_RECORD value
     */
    getUpdatedAppServiceRecord () {
        return this.getObject(AppServiceRecord, AppServiceCapability.KEY_UPDATED_APP_SERVICE_RECORD);
    }
}

AppServiceCapability.KEY_UPDATE_REASON = 'updateReason';
AppServiceCapability.KEY_UPDATED_APP_SERVICE_RECORD = 'updatedAppServiceRecord';

export { AppServiceCapability };