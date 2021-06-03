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

import { ListFiles } from './../../rpc/messages/ListFiles.js';
import { DeleteFile } from './../../rpc/messages/DeleteFile.js';
import { _SubManagerBase } from '../_SubManagerBase.js';
import { Version } from './../../util/Version.js';

class _FileManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _FileManagerBase
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     */
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this._bytesAvailable = SPACE_AVAILABLE_MAX_VALUE;
        this._remoteFiles = [];
        this._uploadedEphemeralFileNames = [];
    }

    /**
     * Start the manager.
     * @returns {Promise} - A promise.
     */
    start () {
        return this._retrieveRemoteFiles()
            .then(() => {
                return Promise.resolve(super.start());
            });
    }

    /**
     * Returns a list of file names currently residing on core.
     * @returns {Array<String>} - List of remote file names
     */
    getRemoteFileNames () {
        if (this._getState() !== _SubManagerBase.READY) {
            // error and don't return list
            throw new Error('FileManager is not READY');
        }
        return this._remoteFiles;
    }

    /**
     * Get the number of bytes still available for files for this app.
     * @returns {Number} - Number of bytes still available
     */
    getBytesAvailable () {
        return this._bytesAvailable;
    }

    /**
     * Retrieve any persistent files on startup. FileManager is ready once the initial ListFiles request is complete.
     * @private
     * @returns {Promise} - A promise.
     */
    async _retrieveRemoteFiles () {
        this._remoteFiles = [];

        const listFiles = new ListFiles();

        const rpcResponse = await this._lifecycleManager.sendRpcResolve(listFiles);
        if (rpcResponse.getSuccess()) {
            this._bytesAvailable = rpcResponse.getSpaceAvailable() ? rpcResponse.getSpaceAvailable() : SPACE_AVAILABLE_MAX_VALUE;
            const filenames = rpcResponse.getFilenames();
            if (Array.isArray(filenames)) {
                this._remoteFiles = filenames;
            }
            // on callback set manager to ready state
            return this._transitionToState(_SubManagerBase.READY);
        } else {
            this._bytesAvailable = SPACE_AVAILABLE_MAX_VALUE;
            return this._transitionToState(_SubManagerBase.READY);
        }
    }

    /**
     * Attempts to delete the desired file from core
     * @param {String} fileName - name of file to be deleted
     * @returns {Promise} - Resolves to Boolean - whether the operation was successful
     */
    async deleteRemoteFileWithName (fileName) {
        const deleteFile = new DeleteFile()
            .setSdlFileName(fileName);

        const rpcResponse = await this._lifecycleManager.sendRpcResolve(deleteFile);
        const isSuccess = rpcResponse.getSuccess();
        if (isSuccess) {
            this._bytesAvailable = rpcResponse.getSpaceAvailable() ? rpcResponse.getSpaceAvailable() : SPACE_AVAILABLE_MAX_VALUE;
            this._remoteFiles.splice(this._remoteFiles.indexOf(fileName), 1);
            this._uploadedEphemeralFileNames.splice(this._uploadedEphemeralFileNames.indexOf(fileName), 1);
        }
        return isSuccess;
    }

    /**
     * Attempts to delete a list of files from core
     * @param {String[]} fileNames - list of file names to be deleted
     * @returns {Promise} - Resolves to Boolean[] - whether the operations were successful
     */
    async deleteRemoteFilesWithNames (fileNames) {
        let results = [];

        if (fileNames.length > 0) {
            for (const filename of fileNames) {
                results.push(this.deleteRemoteFileWithName(filename));
            }
            results = await Promise.all(results);
        }

        return results;
    }

    /**
     * Creates and returns a PutFile request that would upload a given SdlFile
     * @private
     * @param {SdlFile} sdlFile - SdlFile with fileName and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Promise} - Resolves to PutFile - a valid PutFile request if SdlFile contained a fileName and sufficient data
     */
    async _createPutFile (sdlFile) {
        throw new Error('createPutFile method must be overridden');
    }


    /**
     * Uploads an SdlFile.
     * @param {SdlFile} sdlFile - SdlFile with file name and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Promise} - Resolves to Boolean - whether the operation was successful
     */
    async uploadFile (sdlFile) {
        if (sdlFile.isStaticIcon()) {
            // Static icons don't need to be uploaded
            return true;
        }
        const putFile = await this._createPutFile(sdlFile);

        const putFileResponse = await this._lifecycleManager.sendRpcResolve(putFile);
        if (putFileResponse.getSuccess()) {
            this._bytesAvailable = putFileResponse.getSpaceAvailable() !== null ? putFileResponse.getSpaceAvailable() : SPACE_AVAILABLE_MAX_VALUE;
            this._remoteFiles.push(sdlFile.getName());
            this._uploadedEphemeralFileNames.push(sdlFile.getName());
        }

        return putFileResponse.getSuccess();
    }

    /**
     * Attempts to upload a list of SdlFiles to core
     * @param {SdlFile[]} sdlFiles - list of SdlFiles with file name and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Promise} - Resolves to Boolean[] - whether the operations were successful
     */
    async uploadFiles (sdlFiles) {
        let results = [];
        if (sdlFiles.length > 0) {
            for (const file of sdlFiles) {
                results.push(this.uploadFile(file));
            }
            results = await Promise.all(results);
        }

        return results;
    }


    /**
     * Attempts to upload SdlArtwork to core
     * @param {SdlArtwork} sdlArtwork - SdlArtwork with file name and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Promise} - Resolves to Boolean - whether the operation was successful
     */
    async uploadArtwork (sdlArtwork) {
        return await this.uploadFile(sdlArtwork);
    }


    /**
     * Attempts to upload a list of SdlArtwork to core
     * @param {SdlArtwork} sdlArtworks - list of SdlArtworks with file name and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Promise} - Resolves to Boolean[] - whether the operations were successful
     */
    async uploadArtworks (sdlArtworks) {
        return await this.uploadFiles(sdlArtworks);
    }

    /**
     * Check if an SdlFile has been uploaded to core
     * @param {SdlFile} sdlFile - SdlFile with file name and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Boolean} - Whether file has been uploaded to core (true) or not (false)
     */
    hasUploadedFile (sdlFile) {
        // this method's logic is more related to the iOS library than the Java library
        // https://github.com/smartdevicelink/sdl_ios/issues/827 - Older versions of Core had a bug where list files would cache incorrectly.
        const rpcMsgVersion = this._lifecycleManager.getSdlMsgVersion();
        const rpcVersion = new Version()
            .setMajor(rpcMsgVersion.getMajorVersion())
            .setMinor(rpcMsgVersion.getMinorVersion())
            .setPatch(rpcMsgVersion.getPatchVersion());

        const filename = sdlFile.getName();
        const isPersistent = sdlFile.isPersistent();
        const remoteFiles = this._remoteFiles;
        const ephemeralFiles = this._uploadedEphemeralFileNames;
        const isInRemoteFiles = remoteFiles.indexOf(filename) !== -1;
        const isInEphemeralFiles = ephemeralFiles.indexOf(filename) !== -1;

        if (new Version(4, 4, 0).isNewerThan(rpcVersion) === 1) {
            if (isPersistent) {
                return isInRemoteFiles;
            } else { // if it is not persistent it must be listed in both remote and ephemeral files.
                return isInRemoteFiles && isInEphemeralFiles;
            }
        } else if (isInRemoteFiles) {
            // If not connected to a system where the bug presents itself, we can trust the `remoteFileNames`
            return true;
        }

        return false;
    }


    /**
     * Check if an SdlFile needs to be uploaded to Core or not.
     * It is different from hasUploadedFile() because it takes isStaticIcon and overwrite properties into consideration.
     * ie, if the file is static icon, the method always returns false.
     * If the file is dynamic, it returns true in one of these situations:
     * 1) the file has the overwrite property set to true
     * 2) the file hasn't been uploaded to Core before.
     *
     * @param {SdlFile} file - SdlFile with file name and one of A) fileData, B) Uri, or C) resourceID set
     * @returns {Boolean} - Whether file has been uploaded to core (true) or not (false)
     */
    fileNeedsUpload (file = null) {
        if (file !== null && !file.isStaticIcon()) {
            return file.getOverwrite() || !this.hasUploadedFile(file);
        }
        return false;
    }
}

const SPACE_AVAILABLE_MAX_VALUE = _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE = 2000000000;

export { _FileManagerBase };
