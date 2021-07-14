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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * Allows encoded data in the form of SyncP packets to be sent to the SYNC module. Legacy / v1 Protocol implementation; use SyncPData instead. *** DEPRECATED ***
 * @deprecated
 */
class EncodedSyncPData extends RpcRequest {
    /**
     * Initializes an instance of EncodedSyncPData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.EncodedSyncPData);
    }

    /**
     * Set the Data
     * @param {String[]} data - Contains base64 encoded string of SyncP packets. - The desired Data.
     * {'array_min_size': 1, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 1000000}
     * @returns {EncodedSyncPData} - The class instance for method chaining.
     */
    setData (data) {
        this.setParameter(EncodedSyncPData.KEY_DATA, data);
        return this;
    }

    /**
     * Get the Data
     * @returns {String[]} - the KEY_DATA value
     */
    getData () {
        return this.getParameter(EncodedSyncPData.KEY_DATA);
    }
}

EncodedSyncPData.KEY_DATA = 'data';

export { EncodedSyncPData };