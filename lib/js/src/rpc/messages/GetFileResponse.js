/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { FileType } from '../enums/FileType.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcResponse } from '../RpcResponse.js';

/**
 * This response includes the data that is requested from the specific service
 */
class GetFileResponse extends RpcResponse {
    /**
     * Initalizes an instance of GetFileResponse.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.GetFile);
    }

    /**
     * @param {Number} offset - Optional offset in bytes for resuming partial data chunks
     * @return {GetFileResponse}
     */
    setOffset (offset) {
        this.setParameter(GetFileResponse.KEY_OFFSET, offset);
        return this;
    }

    /**
     * @return {Number}
     */
    getOffset () {
        return this.getParameter(GetFileResponse.KEY_OFFSET);
    }

    /**
     * @param {Number} length - Optional length in bytes for resuming partial data chunks if offset is set to 0, then
     *                          length is the total length of the file to be downloaded
     * @return {GetFileResponse}
     */
    setLength (length) {
        this.setParameter(GetFileResponse.KEY_LENGTH, length);
        return this;
    }

    /**
     * @return {Number}
     */
    getLength () {
        return this.getParameter(GetFileResponse.KEY_LENGTH);
    }

    /**
     * @param {FileType} type - File type that is being sent in response.
     * @return {GetFileResponse}
     */
    setFileType (type) {
        this.validateType(FileType, type);
        this.setParameter(GetFileResponse.KEY_FILE_TYPE, type);
        return this;
    }

    /**
     * @return {FileType}
     */
    getFileType () {
        return this.getObject(FileType, GetFileResponse.KEY_FILE_TYPE);
    }

    /**
     * @param {Number} crc - Additional CRC32 checksum to protect data integrity up to 512 Mbits
     * @return {GetFileResponse}
     */
    setCrc (crc) {
        this.setParameter(GetFileResponse.KEY_CRC, crc);
        return this;
    }

    /**
     * @return {Number}
     */
    getCrc () {
        return this.getParameter(GetFileResponse.KEY_CRC);
    }
}

GetFileResponse.KEY_OFFSET = 'offset';
GetFileResponse.KEY_LENGTH = 'length';
GetFileResponse.KEY_FILE_TYPE = 'fileType';
GetFileResponse.KEY_CRC = 'crc';

export { GetFileResponse };