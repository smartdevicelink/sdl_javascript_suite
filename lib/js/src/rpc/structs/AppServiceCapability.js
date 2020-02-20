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

import { AppServiceRecord } from './AppServiceRecord.js';
import { RpcStruct } from '../RpcStruct.js';
import { ServiceUpdateReason } from '../enums/ServiceUpdateReason.js';

class AppServiceCapability extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {ServiceUpdateReason} reason - Only included in OnSystemCapabilityUpdated. Update reason for service
     *                                       record.
     * @return {AppServiceCapability}
     */
    setUpdateReason (reason) {
        this.validateType(ServiceUpdateReason, reason);
        this.setParameter(AppServiceCapability.KEY_UPDATE_REASON, reason);
        return this;
    }

    /**
     * @return {ServiceUpdateReason}
     */
    getUpdateReason () {
        return this.getObject(ServiceUpdateReason, AppServiceCapability.KEY_UPDATE_REASON);
    }

    /**
     * @param {AppServiceRecord} record - Service record for a specific app service provider
     * @return {AppServiceCapability}
     */
    setUpdatedAppServiceRecord (record) {
        this.validateType(AppServiceRecord, record);
        this.setParameter(AppServiceCapability.KEY_UPDATED_APP_SERVICE_RECORD, record);
        return this;
    }

    /**
     * @return {AppServiceRecord}
     */
    getUpdatedAppServiceRecord () {
        return this.getObject(AppServiceRecord, AppServiceCapability.KEY_UPDATED_APP_SERVICE_RECORD);
    }
}

AppServiceCapability.KEY_UPDATE_REASON = 'updateReason';
AppServiceCapability.KEY_UPDATED_APP_SERVICE_RECORD = 'updatedAppServiceRecord';

export { AppServiceCapability };