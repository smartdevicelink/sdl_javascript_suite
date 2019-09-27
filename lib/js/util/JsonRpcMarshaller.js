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

class JsonRpcMarshaller {

    constructor() {
    }

    /**
     * Takes an RPC message and converts it
     * into a byte array that can be added
     * as part of the SdlPacket.
     * @param {RpcMessage} rpcMessage
     * @returns {null|Uint8Array}
     */
    static marshall(rpcMessage) {
        let jsonBytes = null;
        try {
            let jsonObject = rpcMessage.getParameters();
            let stringVersion = JSON.stringify(jsonObject);
            jsonBytes = this._encode(stringVersion);
        } catch (e) {
            console.error('Failed to encode messages to JSON.', e);
        }
        return jsonBytes;
    }

    /**
     * Takes an RPC message and converts it
     * into a byte array that can be added
     * as part of the SdlPacket.
     * @param {Uint8Array} bytes
     * @returns {null|Object} Either a json object or null on error in parsing.
     */
    static unmarshall(bytes) {
        let ret = null;
        try {
            let jsonString = this._decode(bytes);
            ret = JSON.parse(jsonString);
        } catch (e) {
            console.error('Failed to parse JSON', e);
        }
        return ret;
    }

    /**
     * Transform a string into a Uint8Array.
     * @param {String} str String to transform.
     * @returns {Uint8Array}
     * @private
     */
    static _encode(str) {
        let array = new Uint8Array(str.length);
        for (let stringIndex = 0; stringIndex < str.length; stringIndex++) {
            array[stringIndex] = str.charCodeAt(stringIndex);
        }
        return array;
    }

    /**
     * Transform a Uint8Array into a string.
     * @param {Uint8Array} bytes Byte array to transform.
     * @returns {String}
     * @private
     */
    static _decode(bytes) {
        return Buffer.from(bytes).toString();
    }

}

export { JsonRpcMarshaller };
