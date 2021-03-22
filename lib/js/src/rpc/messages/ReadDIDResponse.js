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

import { DIDResult } from '../structs/DIDResult.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcResponse } from '../RpcResponse.js';

class ReadDIDResponse extends RpcResponse {
    /**
     * Initializes an instance of ReadDIDResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.ReadDID);
    }

    /**
     * Set the DidResult
     * @param {DIDResult[]} result - Array of requested DID results (with data if available). - The desired DidResult.
     * {'array_min_size': 0, 'array_max_size': 1000}
     * @returns {ReadDIDResponse} - The class instance for method chaining.
     */
    setDidResult (result) {
        this._validateType(DIDResult, result, true);
        this.setParameter(ReadDIDResponse.KEY_DID_RESULT, result);
        return this;
    }

    /**
     * Get the DidResult
     * @returns {DIDResult[]} - the KEY_DID_RESULT value
     */
    getDidResult () {
        return this.getObject(DIDResult, ReadDIDResponse.KEY_DID_RESULT);
    }
}

ReadDIDResponse.KEY_DID_RESULT = 'didResult';

export { ReadDIDResponse };