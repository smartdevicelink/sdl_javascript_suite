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

    /*
let testMap = {"rpcType":"Request", "functionName":"RAI"}
undefined
let stringed = JSON.stringify(testMap)
undefined
stringed
"{"rpcType":"Request","functionName":"RAI"}"
let array = new Uint8Array(stringed)
undefined
array
Uint8Array []buffer: (...)byteLength: (...)byteOffset: (...)length: (...)Symbol(Symbol.toStringTag): (...)__proto__: TypedArray
var enc = new TextEncoder(); // always utf-8

undefined
array = enc.encode(stringed)
Uint8Array(42) [123, 34, 114, 112, 99, 84, 121, 112, 101, 34, 58, 34, 82, 101, 113, 117, 101, 115, 116, 34, 44, 34, 102, 117, 110, 99, 116, 105, 111, 110, 78, 97, 109, 101, 34, 58, 34, 82, 65, 73, 34, 125]0: 1231: 342: 1143: 1124: 995: 846: 1217: 1128: 1019: 3410: 5811: 3412: 8213: 10114: 11315: 11716: 10117: 11518: 11619: 3420: 4421: 3422: 10223: 11724: 11025: 9926: 11627: 10528: 11129: 11030: 7831: 9732: 10933: 10134: 3435: 5836: 3437: 8238: 6539: 7340: 3441: 125buffer: (...)byteLength: (...)byteOffset: (...)length: (...)Symbol(Symbol.toStringTag): (...)__proto__: TypedArray
var enc = new TextDecoder("utf-8");

undefined
let step2 = enc.decode(array)
undefined
step2
"{"rpcType":"Request","functionName":"RAI"}"
let newJson = JSON.parse(step2)
undefined
newJson
{rpcType: "Request", functionName: "RAI"}



    */

    /**
     * 
     * @param {RpcMessage} rpcMessage 
     */
    static marshall(rpcMessage) {
        //Returns Uint8Array 
        let jsonBytes = null;
        try {

            let jsonObject = rpcMessage.getParameters();
            //TODO do we need to go through each param and do this?
            let stringVersion = JSON.stringify(jsonObject);
            let encoder = new TextEncoder();
            return encoder.encode(stringVersion);

        } catch (exception) {
            //TODO print exception
        }
        return null;
    }

}

export { JsonRpcMarshaller };