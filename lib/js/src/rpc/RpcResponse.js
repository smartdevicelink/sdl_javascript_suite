/*
* Copyright (c) 2020, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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

import { RpcMessage } from './RpcMessage.js';
import { RpcType } from './enums/RpcType.js';
import { Result } from './enums/Result.js';

class RpcResponse extends RpcMessage {
    /**
     * Initializes an instance of RpcResponse.
     * @class
     * @param {Object} store - A config object containing attributes such as rpcType, functionName, correlationID, bulkData, and parameters.
     */
    constructor (store) {
        super(store);
        this.setMessageType(RpcType.RESPONSE);
    }

    /**
     * Get whether or not the RPC was successful.
     * @returns {Boolean} - Whether or not the RPC was successful.
     */
    getSuccess () {
        return this.getParameter(RpcResponse.KEY_SUCCESS);
    }

    /**
     * Set whether or not the RPC was successful.
     * @param {Boolean} success - Whether the RPC returned a successful operation
     * @returns {RpcResponse} - A reference of this class to support method chaining.
     */
    setSuccess (success) {
        this.setParameter(RpcResponse.KEY_SUCCESS, success);
        return this;
    }

    /**
     * Get extra information about the RPC result.
     * @returns {String} - An informative string of the RPC result.
     */
    getInfo () {
        return this.getParameter(RpcResponse.KEY_INFO);
    }

    /**
     * Set extra information about the RPC result.
     * @param {String} info - Extra information about the result
     * @returns {RpcResponse} - A reference of this class to support method chaining.
     */
    setInfo (info) {
        this.setParameter(RpcResponse.KEY_INFO, info);
        return this;
    }

    /**
     * Get the result enum value for the RPC result.
     * @returns {Result} - A Result enum value.
     */
    getResultCode () {
        return this.getObject(Result, RpcResponse.KEY_RESULT_CODE);
    }

    /**
     * Set the result enum value for the RPC result.
     * @param {Result} resultCode - A Result enum value.
     * @returns {RpcResponse} - A reference of this class to support method chaining.
     */
    setResultCode (resultCode) {
        this.validateType(Result, resultCode);

        this.setParameter(RpcResponse.KEY_RESULT_CODE, resultCode);
        return this;
    }
}

RpcResponse.KEY_SUCCESS     = 'success';
RpcResponse.KEY_INFO        = 'info';
RpcResponse.KEY_RESULT_CODE = 'resultCode';

export { RpcResponse };
