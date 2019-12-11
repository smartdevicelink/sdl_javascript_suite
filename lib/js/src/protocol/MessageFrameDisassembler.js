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
import { FrameType } from './enums/FrameType.js';
import { SdlPacket } from './SdlPacket.js';
import { FunctionID } from './../rpc/enums/FunctionID.js'
import { JsonRpcMarshaller } from './../util/JsonRpcMarshaller.js';
import { BinaryFrameHeader } from './BinaryFrameHeader.js';


/**
 * Takes an rpc message and converts it into packets ready to send.
 */
class MessageFrameDisassembler {
    /**
      * 
      * @param {RpcRequest} rpcRequest - RPC message that will split into smaller sdl packets.
      * @param {Number} sessionId - sessionId for packets
      * @param {Number} messageId - messageId for packets.
      * @param {Number} mtu - max transport unit, used to determine packet size to send.
      * @param {Number} version - major version
      * @param {Boolean} isEncrypted - packet is encrypted
      * @param {cb} packetCallback - This function will be called when a packet is ready to send.
      * @constructor
      */
    constructor (rpcRequest, sessionId, messageId, mtu, version, isEncrypted, packetCallback) {
        this._rpcRequest = rpcRequest;
        this._sessionId = sessionId;
        this._messageId = messageId;
        this._isEncrypted = isEncrypted;

        if (!mtu) {
            throw 'MTU must be specified.';
        }
        this._mtu = mtu;

        if (!version) {
            throw 'Version must be specified.';
        }
        this._version = version;
        this._packetCallback = packetCallback;
    }

    /**
      * Immediately build rpc and respond to packetcallback with packets to send.
      * @param {RpcRequest} rpcMessage - RPC message that will split into smaller sdl packets.
      * @param {Number} sessionId - sessionId for packets
      * @param {Number} messageId - messageId for packets.
      * @param {Number} mtu - max transport unit, used to determine packet size to send.
      * @param {Number} version - major version
      * @param {Boolean} isEncrypted - packet is encrypted
      * @param {cb} packetCallback - This function will be called when a packet is ready to send.
      */
    static buildRPC (rpcRequest, sessionId, messageId, mtu, version, isEncrypted, cb) {
        const obj = new MessageFrameDisassembler(rpcRequest, sessionId, messageId, mtu, version, isEncrypted, cb);
        obj.doRequest();
        return obj;
    }


    /**
     * Constructs the main BinaryFrameHeader buffer.
     * @returns {Unit8Array}
     */
    _buildRPCMainBuffer () {
        const rpcBulkData = this._rpcRequest.getBulkData();
        const correlationId = this._rpcRequest.getCorrelationId();
        const rpcType =  this._rpcRequest.getRPCType();

        const functionName = this._rpcRequest.getFunctionName();
        const functionId = FunctionID.valueForString(functionName);
        if (!functionId) {
            throw new Error(`Failed to find function ${functionName}`);
        }

        const jsonBuffer = JsonRpcMarshaller.marshall(this._rpcRequest);
        const jsonSize = jsonBuffer.length;

        const bfh = new BinaryFrameHeader(rpcType, functionId, correlationId);
        bfh.setJsonData(jsonBuffer);
        bfh.setJsonSize(jsonSize);
        bfh.setBulkData(rpcBulkData);
        const headerSize = 12;
        const bulkData = bfh.getBulkData();
        let bulkDataSize = 0;
        if (bulkData) {
            bulkDataSize = bulkData.length;
        }
        const totalMessageSize = headerSize + jsonSize + bulkDataSize;
        const data = new Uint8Array(totalMessageSize);
        data.set(bfh.assembleHeaderBytes(), 0);
        data.set(jsonBuffer, headerSize);
        if (bulkData) {
            data.set(bulkData, headerSize + jsonSize);
        }
        return data;
    }


    /**
     * Start the RPC request and use callback to send
     * sdl packets of the appropriate size.
     */
    doRequest () {
        const version = this._version;
        const frameInfo = 0;
        const frameType = FrameType.SINGLE;

        const serviceType = SdlPacket.SERVICE_TYPE_RPC;
        const sessionId = this._sessionId;
        const messageId = this._messageId;
    
        const isEncrypted = this._isEncrypted;
        const mainBuffer = this._buildRPCMainBuffer();
        const mtu = this._mtu;

        const frameCount = Math.ceil(mainBuffer.length / mtu);

        if (frameCount <= 1) {
            const fullPacket = this._constructPacket(
                version,
                serviceType,
                frameInfo,
                sessionId,
                messageId,
                frameType,
                mainBuffer,
                isEncrypted
            );
            this._packetCallback(fullPacket);
        } else {
            const buffer = new ArrayBuffer(8); // Int32 has 8 bytes
            const view = new DataView(buffer);
            view.setUint32(0, mainBuffer.length, false);
            view.setUint32(4, frameCount, false);            
            const payload = new Uint8Array(buffer);

            const firstHeader = this._constructPacket(version, serviceType, frameInfo, sessionId, messageId, FrameType.FIRST, payload, isEncrypted);
            this._packetCallback(firstHeader);

            this._buildConsecutiveFrames(
                version,
                serviceType,
                sessionId,
                messageId,
                mainBuffer,
                mtu,
                isEncrypted
            );
        }
    }


    /**
     * Creates an sdl packet.
     * @param {Number} version 
     * @param {ServiceType} serviceType 
     * @param {Number} frameInfo 
     * @param {Number} sessionId 
     * @param {Number} messageId 
     * @param {Number} frameType 
     * @param {Unit8Array} payload 
     * @param {Boolean} isEncrypted 
     * @returns {SdlPacket}
     */
    _constructPacket (version, serviceType, frameInfo, sessionId, messageId, frameType, payload, isEncrypted) {
        const dataSize = payload.length;
        const offset = 0;
        const bytesToWrite = dataSize;
        const sdlPacket = new SdlPacket(version, isEncrypted, frameType, serviceType, frameInfo, sessionId, dataSize, messageId, payload, offset, bytesToWrite);
        return sdlPacket;
    }


    /**
     * Builds consecutive frames after the inital frame is sent for a multi-frame message.
     * @param {Number} version 
     * @param {ServiceType} serviceType 
     * @param {Number} sessionId 
     * @param {Number} messageId 
     * @param {Buffer} buffer 
     * @param {Number} length 
     * @param {Boolean} isEncrypted 
     */
    _buildConsecutiveFrames (version, serviceType, sessionId, messageId, buffer, length, isEncrypted) {
        let frameSequenceNumber;
        let count = 0;
        let offset = 0;

        while (frameSequenceNumber !== 0) {
            if (offset + length >= buffer.length) {
                frameSequenceNumber = 0; // last frame
            } else {
                frameSequenceNumber = (count % 255) + 1; // 1,2,3,...,255,1
            }

            const header = this._constructPacket(
                version,
                serviceType,
                frameSequenceNumber,
                sessionId,
                messageId,
                FrameType.CONSECUTIVE,
                buffer.slice(offset, offset + length),
                isEncrypted
            );
            this._packetCallback(header);
            count++;
            offset += length;
        }
    }
}



export { MessageFrameDisassembler };