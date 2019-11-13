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

import { BitConverter } from '../util/BitConverter.js';

class BinaryFrameHeader {

    /**
    * @constructor
    * @param {RpcType} rpcType - An RPC Enum  representing the type of RPC being described (Request, Response, Notification)
    * @param {FunctionID} functionId - A FunctionID Enum representing the RPC function that is being described
    * @param {Number} correlationId - A number representing an ID to correlate a request and response pair
    * @param {Number} jsonSize - A number representing the size of a JSON object
    */
    constructor(rpcType, functionId, correlationId, jsonSize) {
        this._rpcType = rpcType;
        this._functionId = functionId;
        this._correlationId = correlationId;
        this._jsonSize = jsonSize;

        // TODO
        this._jsonData = null;
        this._bulkData = null;

        return this;

    }

    /**
    * Takes in a byte array and transforms it to an instance of this class
    * @param {Uint8Array} binHeader
    * @return {BinaryFrameHeader} an instance of this class from parsing the supplied Uint8Array 
    */
    fromBinaryHeader(binHeader) {
        // TODO
    }

    /**
    * Uses the private members of this class to construct a byte array header
    * @return {Uint8Array} - A byte array
    */
    assembleHeaderBytes() {
        // TODO
    }

    /**
    * @param {RpcType} rpcType - An RPC Enum  representing the type of RPC being described (Request, Response, Notification)
    */
    setRPCType(type) {
        this._rpcType = type;
    }
    
    /**
    * @return {RpcType} rpcType - An RPC Enum  representing the type of RPC being described (Request, Response, Notification)
    */
    getRPCType() {
        return this._rpcType;
    }
    
    /**
    * @param {FunctionID} functionId - A FunctionID Enum representing the RPC function that is being described

    */
    setFunctionId(id) {
        this._functionId = id;
    }
    
    /**
    * @return {FunctionID} functionId - A FunctionID Enum representing the RPC function that is being described
    */
    getFunctionId() {
        return this._functionId;
    }
    
    /**
    * @param {Number} correlationId - A number representing an ID to correlate a request and response pair
    */
    setCorrelationId(id) {
        this._correlationId = id;
    }
    
    /**
    * @return {Number} correlationId - A number representing an ID to correlate a request and response pair

    */
    getCorrelationId() {
        return this._correlationId;
    }
    
    /**
    * @param {Number} size - A number representing the size of a JSON object
    */
    setJSONSize(size) {
        this._jsonSize = size;
    }
    
    /**
    * @return {Number} - A number representing the size of a JSON object
    */
    getJSONSize() {
        return _jsonSize;
    }

    /**
    * @param {Number} data - A byte array representing JSON data
    */
    setJSONData(data) {
        // TODO
    }
    
    /**
    * @return {Uint8Array} - A byte array representing JSON data
    */
    getJSONData() {
        return this._jsonData;
    }

    /**
    * @param {Uint8Array} data - A byte array representing bulk data
    */
    setBulkData(data) {
        this._bulkData = data;
    }

    /**
    * @return {Uint8Array} - A byte array representing bulk data
    */
    getBulkData() {
        return this._bulkData;
    }

}

export { BinaryFrameHeader };
