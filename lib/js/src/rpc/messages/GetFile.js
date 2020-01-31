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

import { RpcRequest } from '../RpcRequest.js';
import { FileType } from '../enums/FileType.js';
import { FunctionID } from '../enums/FunctionID.js';

/**
 * This request is sent to the module to retrieve a file
 */
class GetFile extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.GetFile);
    }

    /**
     * @param {String} name - File name that should be retrieved
     * @return {GetFile}
     */
    setFileName (name) {
        this.setParameter(GetFile.KEY_FILE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getFileName () {
        return this.getParameter(GetFile.KEY_FILE_NAME);
    }

    /**
     * @param {String} id - ID of the service that should have uploaded the requested file.
     * @return {GetFile}
     */
    setAppServiceId (id) {
        this.setParameter(GetFile.KEY_APP_SERVICE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getAppServiceId () {
        return this.getParameter(GetFile.KEY_APP_SERVICE_ID);
    }

    /**
     * @param {FileType} type - Selected file type.
     * @return {GetFile}
     */
    setFileType (type) {
        this.validateType(FileType, type);
        this.setParameter(GetFile.KEY_FILE_TYPE, type);
        return this;
    }

    /**
     * @return {FileType}
     */
    getFileType () {
        return this.getObject(FileType, GetFile.KEY_FILE_TYPE);
    }

    /**
     * @param {Number} offset - Optional offset in bytes for resuming partial data chunks
     * @return {GetFile}
     */
    setOffset (offset) {
        this.setParameter(GetFile.KEY_OFFSET, offset);
        return this;
    }

    /**
     * @return {Number}
     */
    getOffset () {
        return this.getParameter(GetFile.KEY_OFFSET);
    }

    /**
     * @param {Number} length - Optional length in bytes for resuming partial data chunks If offset is set to 0, then
     *                          length is the total length of the file to be retrieved
     * @return {GetFile}
     */
    setLength (length) {
        this.setParameter(GetFile.KEY_LENGTH, length);
        return this;
    }

    /**
     * @return {Number}
     */
    getLength () {
        return this.getParameter(GetFile.KEY_LENGTH);
    }
}

GetFile.KEY_FILE_NAME = 'fileName';
GetFile.KEY_APP_SERVICE_ID = 'appServiceId';
GetFile.KEY_FILE_TYPE = 'fileType';
GetFile.KEY_OFFSET = 'offset';
GetFile.KEY_LENGTH = 'length';

export { GetFile };