/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
import { RpcResponse } from '../RpcResponse.js';

class PerformAppServiceInteractionResponse extends RpcResponse {
    /**
     * Initializes an instance of PerformAppServiceInteractionResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.PerformAppServiceInteraction);
    }

    /**
     * Set the ServiceSpecificResult
     * @param {String} result - The service can provide specific result strings to the consumer through this param. - The desired ServiceSpecificResult.
     * {'string_min_length': 1}
     * @returns {PerformAppServiceInteractionResponse} - The class instance for method chaining.
     */
    setServiceSpecificResult (result) {
        this.setParameter(PerformAppServiceInteractionResponse.KEY_SERVICE_SPECIFIC_RESULT, result);
        return this;
    }

    /**
     * Get the ServiceSpecificResult
     * @returns {String} - the KEY_SERVICE_SPECIFIC_RESULT value
     */
    getServiceSpecificResult () {
        return this.getParameter(PerformAppServiceInteractionResponse.KEY_SERVICE_SPECIFIC_RESULT);
    }
}

PerformAppServiceInteractionResponse.KEY_SERVICE_SPECIFIC_RESULT = 'serviceSpecificResult';

export { PerformAppServiceInteractionResponse };