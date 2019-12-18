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

import { RpcStruct } from './RpcStruct.js';
import { FunctionID } from './enums/FunctionID.js';

/**
 * @typedef {Object} RpcMessage
 * @property {RpcType} rpcType
 */
class RpcMessage extends RpcStruct {

    /*
    {
        "rpcType": "Request",
        "functionName": "RegisterAppInterface",
        "coorelationID": "320948",
        "isEncrypted": false,
        "parameters": {
            "appName": "Hello"
        },
        "bulkData": "...",
    }
    */

    /**
    * @constructor
    */
    constructor (store = {}) {
        super(store.parameters);
        this._isEncrypted = false;
        this._rpcType = store.rpcType;
        this._functionName = store.functionName;
        this._correlationID = store.correlationID;
        this.setBulkData(store.bulkData);
    }

    /**
    * @return {RpcType}
    */
    getRPCType () {
        return this._rpcType;
    }

    /**
    * @param {RpcType} type
    * @return {RpcMessage}
    */
    setRPCType (type) {
        this._rpcType = type;

        return this;
    }

    /**
    * @return {FunctionID} type
    */
    getFunctionName () {
        return this._functionName;
    }

    /**
    * @param {FunctionID} name
    * @return {RpcMessage}
    */
    setFunctionName (name) {
        if (typeof name !== 'string') {
            this._functionName = FunctionID.keyForValue(name);
        } else {
            this._functionName = name;
        }

        return this;
    }

    /**
    * @return {String} type
    */
    getCorrelationId () {
        return this._correlationID;
    }

    /**
    * @param {String} name
    * @return {RpcMessage}
    */
    setCorrelationId (id) {
        this._correlationID = id;

        return this;
    }

    /**
    * @return {Uint8Array} data
    */
    getBulkData () {
        return this._bulkData;
    }

    /**
    * @param {UInt8Array} data
    * @return {RpcMessage}
    */
    setBulkData (data = null) {
        if (data !== null) {
            this._bulkData = data.slice(0);
        } else {
            this._bulkData = null;
        }

        return this;
    }

    /**
    * @return {Boolean}
    */
    getIsEncrypted () {
        return this._isEncrypted;
    }

    /**
    * @param {Boolean} bool
    * @return {RpcMessage}
    */
    setIsEncrypted (bool) {
        this._isEncrypted = bool;

        return this;
    }

}

export { RpcMessage };
