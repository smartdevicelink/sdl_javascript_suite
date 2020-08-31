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

import { ECallConfirmationStatus } from '../enums/ECallConfirmationStatus.js';
import { RpcStruct } from '../RpcStruct.js';
import { VehicleDataNotificationStatus } from '../enums/VehicleDataNotificationStatus.js';

class ECallInfo extends RpcStruct {
    /**
     * Initalizes an instance of ECallInfo.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ECallNotificationStatus
     * @param {VehicleDataNotificationStatus} status - References signal "eCallNotification_4A". See VehicleDataNotificationStatus. - The desired ECallNotificationStatus.
     * @returns {ECallInfo} - The class instance for method chaining.
     */
    setECallNotificationStatus (status) {
        this._validateType(VehicleDataNotificationStatus, status);
        this.setParameter(ECallInfo.KEY_E_CALL_NOTIFICATION_STATUS, status);
        return this;
    }

    /**
     * Get the ECallNotificationStatus
     * @returns {VehicleDataNotificationStatus} - the KEY_E_CALL_NOTIFICATION_STATUS value
     */
    getECallNotificationStatus () {
        return this.getObject(VehicleDataNotificationStatus, ECallInfo.KEY_E_CALL_NOTIFICATION_STATUS);
    }

    /**
     * Set the AuxECallNotificationStatus
     * @param {VehicleDataNotificationStatus} status - References signal "eCallNotification". See VehicleDataNotificationStatus. - The desired AuxECallNotificationStatus.
     * @returns {ECallInfo} - The class instance for method chaining.
     */
    setAuxECallNotificationStatus (status) {
        this._validateType(VehicleDataNotificationStatus, status);
        this.setParameter(ECallInfo.KEY_AUX_ECALL_NOTIFICATION_STATUS, status);
        return this;
    }

    /**
     * Get the AuxECallNotificationStatus
     * @returns {VehicleDataNotificationStatus} - the KEY_AUX_ECALL_NOTIFICATION_STATUS value
     */
    getAuxECallNotificationStatus () {
        return this.getObject(VehicleDataNotificationStatus, ECallInfo.KEY_AUX_ECALL_NOTIFICATION_STATUS);
    }

    /**
     * Set the ECallConfirmationStatus
     * @param {ECallConfirmationStatus} status - References signal "eCallConfirmation". See ECallConfirmationStatus. - The desired ECallConfirmationStatus.
     * @returns {ECallInfo} - The class instance for method chaining.
     */
    setECallConfirmationStatus (status) {
        this._validateType(ECallConfirmationStatus, status);
        this.setParameter(ECallInfo.KEY_E_CALL_CONFIRMATION_STATUS, status);
        return this;
    }

    /**
     * Get the ECallConfirmationStatus
     * @returns {ECallConfirmationStatus} - the KEY_E_CALL_CONFIRMATION_STATUS value
     */
    getECallConfirmationStatus () {
        return this.getObject(ECallConfirmationStatus, ECallInfo.KEY_E_CALL_CONFIRMATION_STATUS);
    }
}

ECallInfo.KEY_E_CALL_NOTIFICATION_STATUS = 'eCallNotificationStatus';
ECallInfo.KEY_AUX_ECALL_NOTIFICATION_STATUS = 'auxECallNotificationStatus';
ECallInfo.KEY_E_CALL_CONFIRMATION_STATUS = 'eCallConfirmationStatus';

export { ECallInfo };