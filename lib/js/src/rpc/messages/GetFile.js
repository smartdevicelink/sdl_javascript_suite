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
import { RpcRequest } from '../RpcRequest.js';

/**
 * This request is sent to the module to retrieve a file
 */
class GetFile extends RpcRequest {
    /**
     * Initalizes an instance of GetFile.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetFile);
    }

    /**
     * Set the FileName
     * @param {String} name - File name that should be retrieved - The desired FileName.
     * {'string_min_length': 1, 'string_max_length': 255}
     * @returns {GetFile} - The class instance for method chaining.
     */
    setFileName (name) {
        this.setParameter(GetFile.KEY_FILE_NAME, name);
        return this;
    }

    /**
     * Get the FileName
     * @returns {String} - the KEY_FILE_NAME value
     */
    getFileName () {
        return this.getParameter(GetFile.KEY_FILE_NAME);
    }

    /**
     * Set the AppServiceId
     * @param {String} id - ID of the service that should have uploaded the requested file. - The desired AppServiceId.
     * {'string_min_length': 1}
     * @returns {GetFile} - The class instance for method chaining.
     */
    setAppServiceId (id) {
        this.setParameter(GetFile.KEY_APP_SERVICE_ID, id);
        return this;
    }

    /**
     * Get the AppServiceId
     * @returns {String} - the KEY_APP_SERVICE_ID value
     */
    getAppServiceId () {
        return this.getParameter(GetFile.KEY_APP_SERVICE_ID);
    }

    /**
     * Set the FileType
     * @param {FileType} type - Selected file type. - The desired FileType.
     * @returns {GetFile} - The class instance for method chaining.
     */
    setFileType (type) {
        this._validateType(FileType, type);
        this.setParameter(GetFile.KEY_FILE_TYPE, type);
        return this;
    }

    /**
     * Get the FileType
     * @returns {FileType} - the KEY_FILE_TYPE value
     */
    getFileType () {
        return this.getObject(FileType, GetFile.KEY_FILE_TYPE);
    }

    /**
     * Set the Offset
     * @param {Number} offset - Optional offset in bytes for resuming partial data chunks - The desired Offset.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {GetFile} - The class instance for method chaining.
     */
    setOffset (offset) {
        this.setParameter(GetFile.KEY_OFFSET, offset);
        return this;
    }

    /**
     * Get the Offset
     * @returns {Number} - the KEY_OFFSET value
     */
    getOffset () {
        return this.getParameter(GetFile.KEY_OFFSET);
    }

    /**
     * Set the Length
     * @param {Number} length - Optional length in bytes for resuming partial data chunks If offset is set to 0, then length is the total length of the file to be retrieved - The desired Length.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {GetFile} - The class instance for method chaining.
     */
    setLength (length) {
        this.setParameter(GetFile.KEY_LENGTH, length);
        return this;
    }

    /**
     * Get the Length
     * @returns {Number} - the KEY_LENGTH value
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