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
import { RequestType } from '../enums/RequestType.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * An asynchronous request from the system for specific data from the device or the cloud or response to a request from the device or cloud Binary data can be included in hybrid part of message for some requests (such as Authentication request responses)
 */
class OnSystemRequest extends RpcNotification {
    /**
     * Initalizes an instance of OnSystemRequest.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.OnSystemRequest);
    }

    /**
     * Set the RequestType
     * @param {RequestType} type - The type of system request. - The desired RequestType.
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setRequestType (type) {
        this._validateType(RequestType, type);
        this.setParameter(OnSystemRequest.KEY_REQUEST_TYPE, type);
        return this;
    }

    /**
     * Get the RequestType
     * @returns {RequestType} - the KEY_REQUEST_TYPE value
     */
    getRequestType () {
        return this.getObject(RequestType, OnSystemRequest.KEY_REQUEST_TYPE);
    }

    /**
     * Set the RequestSubType
     * @since SmartDeviceLink 5.0.0
     * @param {String} type - This parameter is filled for supporting OEM proprietary data exchanges. - The desired RequestSubType.
     * {'string_min_length': 1, 'string_max_length': 255}
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setRequestSubType (type) {
        this.setParameter(OnSystemRequest.KEY_REQUEST_SUB_TYPE, type);
        return this;
    }

    /**
     * Get the RequestSubType
     * @returns {String} - the KEY_REQUEST_SUB_TYPE value
     */
    getRequestSubType () {
        return this.getParameter(OnSystemRequest.KEY_REQUEST_SUB_TYPE);
    }

    /**
     * Set the Url
     * @since SmartDeviceLink 3.0.0
     * @param {String} url - Optional URL for HTTP requests. If blank, the binary data shall be forwarded to the app. If not blank, the binary data shall be forwarded to the url with a provided timeout in seconds. - The desired Url.
     * {'string_min_length': 1}
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setUrl (url) {
        this.setParameter(OnSystemRequest.KEY_URL, url);
        return this;
    }

    /**
     * Get the Url
     * @returns {String} - the KEY_URL value
     */
    getUrl () {
        return this.getParameter(OnSystemRequest.KEY_URL);
    }

    /**
     * Set the Timeout
     * @param {Number} timeout - Optional timeout for HTTP requests Required if a URL is provided - The desired Timeout.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setTimeout (timeout) {
        this.setParameter(OnSystemRequest.KEY_TIMEOUT, timeout);
        return this;
    }

    /**
     * Get the Timeout
     * @returns {Number} - the KEY_TIMEOUT value
     */
    getTimeout () {
        return this.getParameter(OnSystemRequest.KEY_TIMEOUT);
    }

    /**
     * Set the FileType
     * @param {FileType} type - Optional file type (meant for HTTP file requests). - The desired FileType.
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setFileType (type) {
        this._validateType(FileType, type);
        this.setParameter(OnSystemRequest.KEY_FILE_TYPE, type);
        return this;
    }

    /**
     * Get the FileType
     * @returns {FileType} - the KEY_FILE_TYPE value
     */
    getFileType () {
        return this.getObject(FileType, OnSystemRequest.KEY_FILE_TYPE);
    }

    /**
     * Set the Offset
     * @param {Number} offset - Optional offset in bytes for resuming partial data chunks - The desired Offset.
     * {'num_min_value': 0, 'num_max_value': 100000000000}
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setOffset (offset) {
        this.setParameter(OnSystemRequest.KEY_OFFSET, offset);
        return this;
    }

    /**
     * Get the Offset
     * @returns {Number} - the KEY_OFFSET value
     */
    getOffset () {
        return this.getParameter(OnSystemRequest.KEY_OFFSET);
    }

    /**
     * Set the Length
     * @param {Number} length - Optional length in bytes for resuming partial data chunks - The desired Length.
     * {'num_min_value': 0, 'num_max_value': 100000000000}
     * @returns {OnSystemRequest} - The class instance for method chaining.
     */
    setLength (length) {
        this.setParameter(OnSystemRequest.KEY_LENGTH, length);
        return this;
    }

    /**
     * Get the Length
     * @returns {Number} - the KEY_LENGTH value
     */
    getLength () {
        return this.getParameter(OnSystemRequest.KEY_LENGTH);
    }
}

OnSystemRequest.KEY_REQUEST_TYPE = 'requestType';
OnSystemRequest.KEY_REQUEST_SUB_TYPE = 'requestSubType';
OnSystemRequest.KEY_URL = 'url';
OnSystemRequest.KEY_TIMEOUT = 'timeout';
OnSystemRequest.KEY_FILE_TYPE = 'fileType';
OnSystemRequest.KEY_OFFSET = 'offset';
OnSystemRequest.KEY_LENGTH = 'length';

export { OnSystemRequest };