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
 * Notification containing an updated hashID which can be used over connection cycles (i.e. loss of connection, ignition cycles, etc.). Sent after initial registration and subsequently after any change in the calculated hash of all persisted app data.
 */
class OnHashChange extends RpcNotification {
    /**
     * Initalizes an instance of OnHashChange.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.OnHashChange);
    }

    /**
     * Set the HashID
     * @param {String} id - Calculated hash ID to be referenced during RegisterAppInterface. - The desired HashID.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {OnHashChange} - The class instance for method chaining.
     */
    setHashID (id) {
        this.setParameter(OnHashChange.KEY_HASH_ID, id);
        return this;
    }

    /**
     * Get the HashID
     * @returns {String} - the KEY_HASH_ID value
     */
    getHashID () {
        return this.getParameter(OnHashChange.KEY_HASH_ID);
    }
}

OnHashChange.KEY_HASH_ID = 'hashID';

export { OnHashChange };