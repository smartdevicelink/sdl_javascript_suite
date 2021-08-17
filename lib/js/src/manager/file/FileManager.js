/*
* Copyright (c) 2020, Livio, Inc.
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

import { _FileManagerBase } from './_FileManagerBase.js';
import { PutFile } from '../../rpc/messages/PutFile.js';
import { _FileUtils } from './../../util/_FileUtils.js';

/**
 * FileManager handles the basic create, read, and delete operations
 * for files used by an app.
 */
class FileManager extends _FileManagerBase {
    /**
     * Initializes an instance of the FileManager.
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     */
    constructor (lifecycleManager, fileManagerConfig) {
        super(lifecycleManager, fileManagerConfig);
    }

    /**
     * Creates a PutFile request RPC from a file.
     * @private
     * @param {SdlFile} file - File used to create a put request.
     * @returns {Promise} - Resolves to PutFile
     */
    async _createPutFile (file) {
        const putFile = new PutFile();
        if (file.getName() === null || file.getName() === undefined) {
            throw new Error('You must specify a file name in the SdlFile');
        } else {
            putFile.setFileName(file.getName());
        }
        if (typeof file.getFilePath() === 'string') {
            const data = await _FileUtils.getFileData(file.getFilePath());

            if (data !== null) {
                putFile.setFileData(data);
            } else {
                throw new Error('File at path was empty');
            }
        } else if (file.getFileData() !== null && file.getFileData() !== undefined) {
            putFile.setFileData(file.getFileData());
        } else {
            throw new Error('The SdlFile to upload does not specify its resourceId, Uri, or file data');
        }
        if (file.getType() !== null && file.getType() !== undefined) {
            putFile.setFileType(file.getType());
        }

        // putfile crc introduced in 5.0.0
        if (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() >= 5) {
            // set the crc value if putfile data exists
            if (putFile.getFileData() !== null && putFile.getFileData() !== undefined) {
                // use the file data to generate a crc32 checksum from it
                putFile.setCrc(_FileUtils.createCrc(putFile.getFileData()));
            }
        }

        putFile.setPersistentFile(file.isPersistent());
        return putFile;
    }
}


export { FileManager };
