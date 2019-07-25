/*
* Copyright (c) 2019, Livio, Inc.
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
import { ResultType } from './enums/ResultType.js';

class RpcResponse extends RpcMessage {


    static KEY_SUCCESS = 'success';
    static KEY_INFO = 'info';
    static KEY_RESULT_CODE = 'resultCode';


    constructor(store) {
        super(store);
        this.setRPCType(RpcType.RESPONSE);
    }

    getCorrelationID() {
        return this._correlationID;
    }

    setCorrelationID(id) {
        this._correlationID = id;

        return this;
    }

    getSuccess(){
        return this.getParameter(KEY_SUCCESS);
    }

    setSuccess(success){
        return this.setParameter(KEY_SUCCESS, success);
    }

    getInfo(){
        return this.getParameter(KEY_INFO);
    }

    setInfo(info){
        return this.setParameter(KEY_INFO, info);
    }

    getResultCode(){
        // TODO: evaluate accuracy
        return this.getObject(ResultType, KEY_RESULT_CODE);
    }

    setResultCode(resultCode){
        // TODO: evaluate new approach. This implementation will not work since the incoming result code is a string, not an instance of the ResultType class
        this.validateType(ResultType, resultCode);

        return this.setParameter(KEY_RESULT_CODE, resultCode);
    }
}

export { RpcResponse };