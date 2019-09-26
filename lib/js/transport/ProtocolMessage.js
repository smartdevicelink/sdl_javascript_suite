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


import { RpcMessage } from '../rpc/RpcMessage';
import { SdlPacket } from '../protocol/SdlPacket';
import { FunctionID } from '../rpc/enums/FunctionID';

//TODO remove this package use.
const str2ab = require('string-to-arraybuffer');


class ProtocolMessage{



    //TODO is rpcmessage generic enough?

    /**
     * @constructor
     * @param {RpcMessage} message
     * @param sessionId
     * @param messageId
     * @param correlationId
     */
    constructor(message,sessionId,messageId,correlationId)
    {
        this._message = message;
        this._sessionId = sessionId;
        this._messageId = messageId;
        this._correlationId = correlationId;
        this._data;
    }

    /**
     * @return { UInt8Array }
     */
    getData()
    {
        if (!this._data)
        {
            this._buildData();
        }
        return this._data;
    }

    //TODO use SdlPacket.
    /**
     * @param { SdlPacket }
     * @return { UInt8Array }
     */
    _constructPacket(packetObj)
    {
        let { version, serviceType, frameInfo, sessionId, messageId, frameType, payload } = packetObj;

        let buffer = [];
        let dataSize = payload.length;

        let encryptionBit = 0;

        let result;

        buffer.push((version << 4) + encryptionBit + frameType);
        buffer.push(serviceType);
        buffer.push(frameInfo);
        buffer.push(sessionId);

        buffer.push(((dataSize & 0xFF000000) >> 24));
        buffer.push(((dataSize & 0x00FF0000) >> 16));
        buffer.push(((dataSize & 0x0000FF00) >> 8));
        buffer.push((dataSize & 0x000000FF));

        if (version === 5) {
            buffer.push(((messageId & 0xFF000000) >> 24));
            buffer.push(((messageId & 0x00FF0000) >> 16));
            buffer.push(((messageId & 0x0000FF00) >> 8));
            buffer.push((messageId & 0x000000FF));
            if (payload) {

                let buffer1 = new Uint8Array(buffer);
                let buffer2 = new Uint8Array(payload);
                result = new Uint8Array([...buffer1, ...buffer2]);
                //add payload to buffer;
                // buffer.push(self.payload[i])  # TODO there's got to be a better way
            }
        } else {
            throw new Error(`unsupported version ${version}`);
        }

        return result;
    }

    //TODO move to packet or something else.
    _buildRPCMainBuffer(params,function_id, rpc_type, correlation_id)
    {
        let json_object = JSON.stringify(params);
        let buffer = [];

        buffer.push(((function_id & 0x0F000000) >> 24) + (rpc_type << 4));
        buffer.push(((function_id & 0x00FF0000) >> 16));
        buffer.push(((function_id & 0x0000FF00) >> 8));
        buffer.push((function_id & 0x000000FF));

        if (!correlation_id)
        {
            throw new Error(`correlation_id is required`);
        }
        buffer.push(((correlation_id & 0xFF000000) >> 24));
        buffer.push(((correlation_id & 0x00FF0000) >> 16));
        buffer.push(((correlation_id & 0x0000FF00) >> 8));
        buffer.push((correlation_id & 0x000000FF));

        let json_size = json_object.length;

        buffer.push(((json_size & 0xFF000000) >> 24));
        buffer.push(((json_size & 0x00FF0000) >> 16));
        buffer.push(((json_size & 0x0000FF00) >> 8));
        buffer.push((json_size & 0x000000FF));

        let json_buffer = str2ab(json_object);

        let bufferStart = new Uint8Array(buffer);
        let bufferJson = new Uint8Array(json_buffer);


        let bufferFinal = new Uint8Array([...bufferStart, ...bufferJson]);

        //TODO handle put file.
        // if (bufferExtra)
        // {
        //     bufferFinal = new Uint8Array([...bufferFinal, ...bufferExtra]);
        // }

        return bufferFinal;
    }


    /**
     * Creates a UInt8Array into _data
     */
    _buildData()
    {
        //TODO part of enum or something.
        let version = 5;
        let frameInfo = 0;
        let frameType = 1;
        let serviceType = SdlPacket.SERVICE_TYPE_RPC;
        let rpcType =  this._message.getRPCType();
        let sessionId = this._sessionId;
        let messageId = this._messageId;

        let functionName = this._message.getFunctionName();
        let functionId = FunctionID.getIdFromName(functionName);

        if (!functionId)
        {
            console.log(`failed to find function ${functionName}`);
            throw new Error(`failed to find function ${functionName}`);
        }

        //json data buffer.
        //also need to add the rpc types etc.
        let mainBuffer = this._buildRPCMainBuffer(this._message.getParameters(), functionId, rpcType, this._correlationId);

        let fullPacket =
            this._constructPacket({
                                      version,
                                      serviceType,
                                      frameInfo,
                                      sessionId,
                                      messageId,
                                      frameType,
                                      payload: mainBuffer
                                  });

        this._data = fullPacket;
    }

    /**
     *
     * @param { RpcMessage } message
     * @param { Number } sessionId
     * @param { Number } messageId
     * @param { Number } correlationId
     * @returns { ProtocolMessage }
     */
    static buildRPC(message,sessionId,messageId,correlationId) {
        let obj = new ProtocolMessage(message,sessionId,messageId,correlationId);
        return obj;

    }


}


export { ProtocolMessage };
