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
import { RpcNotification } from '../RpcNotification.js';

/**
 * Callback including encoded data of any SyncP packets that SYNC needs to send back to the mobile device. Legacy / v1
 * Protocol implementation; responds to EncodedSyncPData. *** DEPRECATED ***
 */
class OnEncodedSyncPData extends RpcNotification {
    /**
     * Initalizes an instance of OnEncodedSyncPData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnEncodedSyncPData);
    }

    /**
     * Set the Data
     * @param {String[]} data - Contains base64 encoded string of SyncP packets. - The desired Data.
     * @returns {OnEncodedSyncPData} - The class instance for method chaining.
     */
    setData (data) {
        this.setParameter(OnEncodedSyncPData.KEY_DATA, data);
        return this;
    }

    /**
     * Get the Data
     * @returns {String[]} - the KEY_DATA value
     */
    getData () {
        return this.getParameter(OnEncodedSyncPData.KEY_DATA);
    }

    /**
     * Set the URL
     * @param {String} url - If blank, the SyncP data shall be forwarded to the app. If not blank, the SyncP data shall - The desired URL.
     * be forwarded to the provided URL.
     * @returns {OnEncodedSyncPData} - The class instance for method chaining.
     */
    setURL (url) {
        this.setParameter(OnEncodedSyncPData.KEY_URL, url);
        return this;
    }

    /**
     * Get the URL
     * @returns {String} - the KEY_URL value
     */
    getURL () {
        return this.getParameter(OnEncodedSyncPData.KEY_URL);
    }

    /**
     * Set the Timeout
     * @param {Number} timeout - If blank, the SyncP data shall be forwarded to the app. If not blank, the SyncP data - The desired Timeout.
     * shall be forwarded with the provided timeout in seconds.
     * @returns {OnEncodedSyncPData} - The class instance for method chaining.
     */
    setTimeout (timeout) {
        this.setParameter(OnEncodedSyncPData.KEY_TIMEOUT, timeout);
        return this;
    }

    /**
     * Get the Timeout
     * @returns {Number} - the KEY_TIMEOUT value
     */
    getTimeout () {
        return this.getParameter(OnEncodedSyncPData.KEY_TIMEOUT);
    }
}

OnEncodedSyncPData.KEY_DATA = 'data';
OnEncodedSyncPData.KEY_URL = 'URL';
OnEncodedSyncPData.KEY_TIMEOUT = 'Timeout';

export { OnEncodedSyncPData };