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

import { RpcRequest } from './../../rpc/RpcRequest.js';
import { BaseSubManager } from '../BaseSubManager.js';
import { RpcType } from './../../rpc/enums/RpcType';

class BaseFileManager extends BaseSubManager {
    /**
     * @param {Object} internalInterface - Class that implements sendRPC.
     */
    constructor (internalInterface) {
        super(internalInterface);
        this._bytesAvailable = SPACE_AVAILABLE_MAX_VALUE;
        this._remoteFiles = [];
        this._uploadedEphemeralFileNames = [];
    }

    /**
     * @param {Function} onComplete - Callback is called once the manager's state is READY, LIMITED, or ERROR
     */
    start (onComplete) {
        this._retrieveRemoteFiles();
        super.start(onComplete);
    }

    /**
	 * Returns a list of file names currently residing on core.
	 * @return Array<String> - List of remote file names
	 */
    getRemoteFileNames () {
        if (this.getState() !== BaseSubManager.READY) {
            // error and don't return list
            throw new Error('FileManager is not READY');
        }
        return this._remoteFiles;
    }

    /**
	 * Get the number of bytes still available for files for this app.
	 * @return Number - Number of bytes still available
	 */
    getBytesAvailable () {
        return this._bytesAvailable;
    }

    /**
     * Retrieve any persistent files on startup.
     * FileManager is ready once the initial ListFiles request is complete.
     */
    async _retrieveRemoteFiles () {
        this._remoteFiles = [];

        const rpcRequest = new RpcRequest(
            {
                functionName: 'ListFiles',
                parameters: {},
                rpcType: RpcType.REQUEST,
            }
        );

        const rpcResponse = await this._internalInterface.sendRPC(rpcRequest);
        if (rpcResponse.getSuccess()) {
            this._bytesAvailable = rpcResponse.getSpaceAvailable() ? rpcResponse.getSpaceAvailable() : SPACE_AVAILABLE_MAX_VALUE;
            const filenames = rpcResponse.getFilenames();
            if (Array.isArray(filenames)) {
                this._remoteFiles = filenames;
            }
            // on callback set manager to ready state
            return this._transitionToState(BaseSubManager.READY);
        } else {
            this._bytesAvailable = SPACE_AVAILABLE_MAX_VALUE;
            return this._transitionToState(BaseSubManager.READY);
        }
    }

    /**
	 * Attempts to delete the desired file from core, calls listener with indication of success/failure
	 * @param {String} fileName name of file to be deleted
	 * @param {CompletionListener} listener callback that is called on response from core
	 */
    async deleteRemoteFileWithName (fileName, onComplete = null) {
        const rpcRequest = new RpcRequest(
            {
                functionName: 'DeleteFile',
                parameters: {
                    syncFileName: fileName,
                },
                rpcType: RpcType.REQUEST,
            }
        );

        const rpcResponse = await this._internalInterface.sendRPC(rpcRequest);
        const isSuccess = rpcResponse.getSuccess();
        if (isSuccess) {
            this._bytesAvailable = rpcResponse.getSpaceAvailable() ? rpcResponse.getSpaceAvailable() : SPACE_AVAILABLE_MAX_VALUE;
            this._remoteFiles.splice(this._remoteFiles.indexOf(fileName), 1);
            this._uploadedEphemeralFileNames.splice(this._remoteFiles.indexOf(fileName), 1);
        }
        if (onComplete !== null) {
            onComplete(isSuccess);
        }
        return isSuccess;
    }


    /**
	 * Attempts to delete a list of files from core, calls onComplete with indication of success/failure.
	 * @param fileNames list of file names to be deleted
	 * @param onComplete callback that is called once core responds to all deletion requests
	 */
    async deleteRemoteFilesWithNames (fileNames, onComplete = null) {
        const results = [];

        if (fileNames.length > 0) {
            for (const filename of fileNames) {
                results.push(this.deleteRemoteFileWithName(filename));
            }
            for (const idx in results) {
                results[idx] = await Promise.resolve(results[idx]);
            }
        }

        if (onComplete !== null) {
            onComplete(results);
        }
        return results;
    }

    async uploadFile (file, onComplete = null) {
        if (file.isStaticIcon()) {
            // Static icons don't need to be uploaded
            onComplete(true);
            return;
        }
        const putFile = this.createPutFile(file);

        const putFileResponse = await this._internalInterface.sendRPC(putFile);
        if (putFileResponse.getSuccess()) {
            this._bytesAvailable = putFileResponse.getSpaceAvailable() !== null ? putFileResponse.getSpaceAvailable() : SPACE_AVAILABLE_MAX_VALUE;
            this._remoteFiles.push(file.getName());
            this._uploadedEphemeralFileNames.push(file.getName());
        }
        if (onComplete !== null) {
            onComplete(putFileResponse.getSuccess());
        }

        return putFileResponse.getSuccess();
    }

    /**
	 * Attempts to upload a list of SdlFiles to core
	 * @param files list of SdlFiles with file name and one of A) fileData, B) Uri, or C) resourceID set
	 * @param listener callback that is called once core responds to all upload requests
	 */
    async uploadFiles (files, onComplete = null) {
        const results = [];
        if (files.length > 0) {
            for (const file of files) {
                results.push(this.uploadFile(file));
            }
            for (const idx in results) {
                results[idx] = await Promise.resolve(results[idx]);
            }
        }

        if (onComplete !== null) {
            onComplete(results);
        }
        return results;
    }


    /**
	 * Attempts to upload SldArtwork to core
	 * @param sdlArtworks SdlArtwork with file name and one of A) fileData, B) Uri, or C) resourceID set
	 * @param listener callback that is called once core responds to all upload requests
	 */
    uploadArtwork (sdlArtwork, listener) {
        return this.uploadFile(sdlArtwork, listener);
    }


    /**
	 * Attempts to upload a list of SldArtwork to core
	 * @param sdlArtworks list of SdlArtworks with file name and one of A) fileData, B) Uri, or C) resourceID set
	 * @param listener callback that is called once core responds to all upload requests
	 */
    uploadArtworks (sdlArtworks, listener) {
        return this.uploadFiles(sdlArtworks, listener);
    }

    /**
	 * Check if an SdlFile has been uploaded to core
	 * @param {SdlFile} file SdlFile
	 * @return boolean that tells whether file has been uploaded to core (true) or not (false)
	 */
    hasUploadedFile (file) {
        const filename = file.getName();
        const isPersistent = file.isPersistent();
        const remoteFiles = this._remoteFiles;
        const ephemeralFiles = this._uploadedEphemeralFileNames;
        const isInRemoteFiles = remoteFiles.indexOf(filename) !== -1;
        const isInEphemeralFiles = ephemeralFiles.indexOf(filename) !== -1;

        if (isPersistent) {
            return isInRemoteFiles;
        } else { // if it is not persistent it must be listed in both remote and ephemeral files.
            return isInRemoteFiles && isInEphemeralFiles;
        }
    }
}

const SPACE_AVAILABLE_MAX_VALUE = BaseFileManager.SPACE_AVAILABLE_MAX_VALUE = 2000000000;

export { BaseFileManager };