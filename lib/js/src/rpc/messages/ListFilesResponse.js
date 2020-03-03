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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcResponse } from '../RpcResponse.js';

/**
 * Returns the current list of resident filenames for the registered app along with the current space available Not
 * supported on First generation SDL enabled vehicles.
 */
class ListFilesResponse extends RpcResponse {
    /**
     * Initalizes an instance of ListFilesResponse.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.ListFiles);
    }

    /**
     * @param {String[]} filenames - An array of all filenames resident on the module for the given registered app. If
     *                               omitted, then no files currently reside on the system.
     * @return {ListFilesResponse}
     */
    setFilenames (filenames) {
        this.setParameter(ListFilesResponse.KEY_FILENAMES, filenames);
        return this;
    }

    /**
     * @return {String[]}
     */
    getFilenames () {
        return this.getParameter(ListFilesResponse.KEY_FILENAMES);
    }

    /**
     * @param {Number} available - Provides the total local space available on the module for the registered app.
     * @return {ListFilesResponse}
     */
    setSpaceAvailable (available) {
        this.setParameter(ListFilesResponse.KEY_SPACE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Number}
     */
    getSpaceAvailable () {
        return this.getParameter(ListFilesResponse.KEY_SPACE_AVAILABLE);
    }
}

ListFilesResponse.KEY_FILENAMES = 'filenames';
ListFilesResponse.KEY_SPACE_AVAILABLE = 'spaceAvailable';

export { ListFilesResponse };