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

/**
 * Contains the raw json data and bulk data for an RPC request/response along with the basic header info
 * rpc type, function id, and correlation id.
 *
 * This class can parse incoming data from sdl core and assemble a binary header to send to sdl core.
 *
 *
 *  @private {number} _rpcType - Request = 0, Response = 1, Notification = 2.
 *  @private {number} _functionId - Matches a function Id in the mobile api spec https://github.com/smartdevicelink/rpc_spec/blob/master/MOBILE_API.xml
 *  @private {number} _correlationId - For a request this id is provided and the matching response will have this same id.
 *  @private {number} _jsonSize - Size of json.
 *  @private {Uint8Array} _jsonData - Raw json data. This can be parsed using the JsonRpcMarshaller.
 *  @private {Uint8Array} _bulkData - Bulk data (optional). If something cannot be expressed as a json object it will be in the bulk data (eg PutFile/GetFile has the full file in bulk data.)
 */
class BinaryFrameHeader {
    /**
     *
     * @param {number} rpcType
     * @param {number} functionId
     * @param {number} correlationId
     * @param {number} jsonSize
     * @constructor
     */
    constructor (rpcType, functionId, correlationId, jsonSize) {
        this._rpcType = rpcType;
        this._functionId = functionId;
        this._correlationId = correlationId;
        this._jsonSize = jsonSize;
        this._bulkData = null;
        this._jsonData = null;
    }

    /**
     * Given a byte array with uint8 values, a BinaryFrameHeader instance is created.
     * @param {array} binaryFrameHeaderData - Byte array containing basic information on the frames type, length, and related ids.
     * @returns {BinaryFrameHeader}
     */
    static fromBinaryHeader (binaryFrameHeaderData) {
        const rpcType = binaryFrameHeaderData[0] >> 4;

        let functionId = (binaryFrameHeaderData[0] & 0x0F) << 24;
        functionId += (binaryFrameHeaderData[1] & 0xFF) << 16;
        functionId += (binaryFrameHeaderData[2] & 0xFF) << 8;
        functionId += binaryFrameHeaderData[3] & 0xFF;

        let correlationId = (binaryFrameHeaderData[4] & 0xFF) << 24;
        correlationId += (binaryFrameHeaderData[5] & 0xFF) << 16;
        correlationId += (binaryFrameHeaderData[6] & 0xFF) << 8;
        correlationId += binaryFrameHeaderData[7] & 0xFF;

        let jsonSize = (binaryFrameHeaderData[8] & 0xFF) << 24;
        jsonSize += (binaryFrameHeaderData[9] & 0xFF) << 16;
        jsonSize += (binaryFrameHeaderData[10] & 0xFF) << 8;
        jsonSize += binaryFrameHeaderData[11] & 0xFF;

        const binaryFrameHeader = new BinaryFrameHeader(rpcType, functionId, correlationId, jsonSize);

        const jsonDataStart = BinaryFrameHeader.HEADER_SIZE;
        const jsonDataEnd = BinaryFrameHeader.HEADER_SIZE + jsonSize;

        binaryFrameHeader.setJsonData(binaryFrameHeaderData.slice(jsonDataStart, jsonDataEnd));

        // any data after the JSON data is the bulk data (eg PutFile contains the file after the main json)
        if (binaryFrameHeaderData.length > jsonDataEnd) {
            const bulkData = binaryFrameHeaderData.slice(jsonDataEnd);
            binaryFrameHeader.setBulkData(bulkData);
        }
        return binaryFrameHeader;
    }


    /**
     * Assembles binary header data.
     * @returns {array}
     */
    assembleHeaderBytes () {
        const buffer = [];
        const functionId = this._functionId;
        const correlationId = this._correlationId;
        const rpcType = this._rpcType;

        buffer.push((functionId & 0x0F000000) >> 24) + (rpcType << 4);
        buffer.push((functionId & 0x00FF0000) >> 16);
        buffer.push((functionId & 0x0000FF00) >> 8);
        buffer.push(functionId & 0x000000FF);

        buffer.push((correlationId & 0xFF000000) >> 24);
        buffer.push((correlationId & 0x00FF0000) >> 16);
        buffer.push((correlationId & 0x0000FF00) >> 8);
        buffer.push(correlationId & 0x000000FF);

        const jsonSize = this._jsonSize;
        buffer.push((jsonSize & 0xFF000000) >> 24);
        buffer.push((jsonSize & 0x00FF0000) >> 16);
        buffer.push((jsonSize & 0x0000FF00) >> 8);
        buffer.push(jsonSize & 0x000000FF);

        return buffer;
    }

    /**
     * Sets the rpc type of the binary header.
     * @param {number} type
     * @returns {BinaryFrameHeader}
     */
    setRpcType (type) {
        this._rpcType = type;
        return this;
    }

    /**
     * Gets the rpc type of the binary header
     * @returns {number}
     */
    getRpcType () {
        return this._rpcType;
    }

    /**
     * Sets the function id of the binary header.
     * @param {number} id
     * @returns {BinaryFrameHeader}
     */
    setFunctionId (id) {
        this._functionId = id;
        return this;
    }

    /**
     * Gets the function Id of the binary header.
     * @returns {number}
     */
    getFunctionId () {
        return this._functionId;
    }

    /**
     * Sets the correlation Id of the binary header.
     * @param {number} id
     * @returns {BinaryFrameHeader}
     */
    setCorrelationId (id) {
        this._correlationId = id;
        return this;
    }

    /**
     * Gets the correlation Id of the binary header.
     */
    getCorrelationId () {
        return this._correlationId;
    }

    /**
     * Sets the json size of the binary header.
     * @param {number} size
     * @returns {BinaryFrameHeader}
     */
    setJsonSize (size) {
        this._jsonSize = size;
        return this;
    }

    /**
     * Gest the json size of the binary header.
     * @returns {number}
     */
    getJsonSize () {
        return this._jsonSize;
    }

    /**
     * Returns the json data as a byte array.
     * @returns {array} - Byte array of json data.
     */
    getJsonData () {
        return this._jsonData;
    }

    /**
     * Sets the json data of the binary header.
     * @param {array} data - Byte array of json data
     * @returns {BinaryFrameHeader}
     */
    setJsonData (data) {
        this._jsonData = data;
        return this;
    }

    /**
     * Sets the bulk data of the binary header.
     * Supported by protcol 2 and up.
     * @param {array} data - Byte array of bulk data
     */
    setBulkData (data) {
        this._bulkData = data;
        return this;
    }

    /**
     * Gets the bulk data of the binary header.
     * Supported by protcol 2 and up.
     * @returns {array} - Byte array of bulk data
     */
    getBulkData () {
        return this._bulkData;
    }
}

BinaryFrameHeader.HEADER_SIZE = 12;

export { BinaryFrameHeader };


