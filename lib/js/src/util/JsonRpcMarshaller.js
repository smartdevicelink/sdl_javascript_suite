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

import { TextEncoder } from './TextEncoder.js';
import { RpcStruct } from '../rpc/RpcStruct.js';

class JsonRpcMarshaller {
    /**
     * Takes an RPC message and converts it
     * into a byte array that can be added
     * as part of the SdlPacket.
     * @param {RpcStruct} rpcStruct - This param contains the json object to transform
     * based on the getParameters method. This can be an RpcStruct or something like RpcMessage
     * which extends RpcStruct.
     * @returns {null|Uint8Array} - Either the byte array or null on error.
     */
    static marshall (rpcStruct) {
        let jsonBytes = null;
        function paramify (rpcStruct) {
            if (rpcStruct instanceof RpcStruct) {
                const params = rpcStruct.getParameters();
                for (const key in params) {
                    if (Array.isArray(params[key])) { // could be an array of structs
                        for (let index = 0; index < params[key].length; index++) {
                            params[key][index] = paramify(params[key][index]);
                        }
                    } else { // not an array. handle normally
                        params[key] = paramify(params[key]);
                    }
                }
                return params;
            }
            return rpcStruct; // leave it alone
        }

        try {
            const jsonObject = paramify(rpcStruct);
            const stringVersion = JSON.stringify(jsonObject);
            jsonBytes = this._encode(stringVersion);
        } catch (error) {
            console.error('Failed to encode messages to JSON.', error);
        }
        return jsonBytes;
    }

    /**
     * Takes a byte array and transforms it into a json object.
     * @param {Uint8Array} bytes - Byte array containing the json string to convert.
     * @returns {null|Object} - Either a json object or null on error in parsing.
     */
    static unmarshall (bytes) {
        let ret = null;
        try {
            const jsonString = this._decode(bytes);
            ret = JSON.parse(jsonString);
        } catch (error) {
            console.error('Failed to parse JSON', error);
        }
        return ret;
    }

    /**
     * Transform a string into a byte array.
     * @param {String} str - String to transform.
     * @returns {Uint8Array}
     * @private
     */
    static _encode (str) {
        return new Uint8Array(TextEncoder.encode(str));
    }

    /**
     * Transform a byte array into a string.
     * @param {Uint8Array} bytes - Byte array to transform.
     * @returns {String}
     * @private
     */
    static _decode (bytes) {
        return Buffer.from(bytes).toString();
    }
}

export { JsonRpcMarshaller };