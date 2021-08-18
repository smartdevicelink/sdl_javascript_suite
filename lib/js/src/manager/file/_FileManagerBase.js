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

import { _SubManagerBase } from '../_SubManagerBase.js';
import { Version } from './../../util/Version.js';
import { _ListFilesOperation } from './_ListFilesOperation.js';
import { _DeleteFileOperation } from './_DeleteFileOperation.js';
import { _UploadFileOperation } from './_UploadFileOperation.js';
import { _ArrayTools } from '../../util/_ArrayTools.js';
import { _DispatchGroup } from './_DispatchGroup.js';
import { _Task } from '../_Task.js';
import { _SdlFileWrapper } from './_SdlFileWrapper.js';
import { SdlArtwork } from '../file/filetypes/SdlArtwork.js';

class _FileManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _FileManagerBase
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     */
    constructor (lifecycleManager, fileManagerConfig) {
        super(lifecycleManager);
        this._bytesAvailable = SPACE_AVAILABLE_MAX_VALUE;
        this._remoteFiles = [];
        this._uploadedEphemeralFileNames = [];

        this._failedFileUploadsCount = new Map();
        this._maxFileUploadAttempts = fileManagerConfig.getFileRetryCount();
        this._maxArtworkUploadAttempts = fileManagerConfig.getArtworkRetryCount();

        this._handleTaskQueue();
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

    dispose () {
        this._remoteFiles = [];
        this._bytesAvailable = 0;
        super.dispose();
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
        const operation = new _ListFilesOperation(this._lifecycleManager, (success, bytesAvailable, fileNames, errorMessage = null) => {
            if (errorMessage !== null || !success) {
                this._bytesAvailable = SPACE_AVAILABLE_MAX_VALUE;
                console.warn('ListFiles is disallowed. Certain file manager APIs may not work properly.');
                this._transitionToState(_SubManagerBase.READY);
                return;
            }
            this._bytesAvailable = bytesAvailable;
            if (Array.isArray(fileNames)) {
                this._remoteFiles = fileNames;
            }
            // on callback set manager to ready state
            this._transitionToState(_SubManagerBase.READY);
        });
        this._addTask(operation);
    }

    /**
     * Attempts to delete the desired file from core
     * @param {String} fileName - name of file to be deleted
     * @returns {Promise} - Resolves to Boolean - whether the operation was successful
     */
    async deleteRemoteFileWithName (fileName) {
        return new Promise((resolve) => {
            this._deleteRemoteFileWithNamePrivate(fileName, (success, bytesAvailable, fileNames, errorMessage) => {
                resolve(success);
            });
        });
    }

    _deleteRemoteFileWithNamePrivate (fileName, listener) {
        if (!this._remoteFiles.includes(fileName) && typeof listener === 'function') {
            const errorMessage = 'No such remote file is currently known';
            listener(false, this._bytesAvailable, this._remoteFiles, errorMessage);
            return;
        }

        const operation = new _DeleteFileOperation(this._lifecycleManager, fileName, (success, bytesAvailable, fileNames, errorMessage) => {
            if (success) {
                this._bytesAvailable = bytesAvailable;
                this._remoteFiles = _ArrayTools.arrayRemove(this._remoteFiles, fileName);
                this._uploadedEphemeralFileNames = _ArrayTools.arrayRemove(this._uploadedEphemeralFileNames, fileName);
            }
            listener(success, bytesAvailable, fileNames, errorMessage);
        });

        this._addTask(operation);
    }

    /**
     * Attempts to delete a list of files from core
     * @param {String[]} fileNames - list of file names to be deleted
     * @returns {Promise} - Resolves to Boolean[] - whether the operations were successful
     */
    async deleteRemoteFilesWithNames (fileNames) {
        return new Promise ((resolve) => {
            const failedDeletes = new Map();
            const deleteFilesGroup = new _DispatchGroup();
            deleteFilesGroup.notify(() => {
                if (failedDeletes.size > 0) {
                    resolve(failedDeletes);
                }
                resolve(null);
            });

            if (fileNames.length > 0) {
                deleteFilesGroup.enter();
                for (const fileName of fileNames) {
                    deleteFilesGroup.enter();
                    this._deleteRemoteFileWithNamePrivate(fileName, (success, bytesAvailable, fileNames, errorMessage) => {
                        if (!success) {
                            failedDeletes.set(fileName, errorMessage);
                        }
                        deleteFilesGroup.leave();
                    });
                }
                deleteFilesGroup.leave();
            }
            resolve(null);
        });
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
    async uploadFile (sdlFile = null) {
        return new Promise ((resolve) => {
            this._uploadFilePrivate(sdlFile, (success, bytesAvailable, fileNames, errorMessage) => {
                if (!success && errorMessage !== null) {
                    console.log(`_FileManagerBase: ${errorMessage}`);
                }
                resolve(success);
            });
        });
    }

    _uploadFilePrivate (file, listener = null) {
        if (file === null) {
            if (typeof listener === 'function') {
                listener(false, this._bytesAvailable, null, 'The file upload was canceled. The data for the file is missing.');
            }
            return;
        }

        if (file.getName() === null) {
            if (typeof listener === 'function') {
                listener(false, this._bytesAvailable, null, 'You must specify an file name in the SdlFile.');
            }
            return;
        }

        if (file.isStaticIcon()) {
            if (typeof listener === 'function') {
                listener(false, this._bytesAvailable, null, 'The file upload was canceled. The file is a static icon, which cannot be uploaded.');
            }
            return;
        }

        if (this._getState() === _Task.READY) {
            if (typeof listener === 'function') {
                listener(false, this._bytesAvailable, null, 'The file manager was unable to send this file. This could be because the file manager has not started, or the head unit does not support files.');
            }
            return;
        }

        const msgVersion = this._lifecycleManager.getSdlMsgVersion();
        const rpcVersion = new Version(msgVersion.getMajorVersion(), msgVersion.getMinorVersion(), msgVersion.getPatchVersion());
        if (!file.isPersistent() && !this.hasUploadedFile(file) && new Version(4, 0, 0).isNewerThan(rpcVersion) === 1) {
            file.setOverwrite(true);
        }

        if (!file.getOverwrite() && this._remoteFiles.includes(file.getName())) {
            const errorMessage = 'Cannot overwrite remote file. The remote file system already has a file of this name, and the file manager is set to not automatically overwrite files.';
            console.log(`FileManagerBase: ${errorMessage}`);
            if (typeof listener === 'function') {
                listener(true, this._bytesAvailable, null, errorMessage);
            }
            return;
        }

        this._sdlUploadFilePrivate(file, listener);
    }

    _sdlUploadFilePrivate (file, listener) {
        const fileName = file.getName();

        const fileWrapper = new _SdlFileWrapper(file, (success, bytesAvailable, fileNames, errorMessage) => {
            if (success) {
                this._bytesAvailable = bytesAvailable;
                this._remoteFiles.push(fileName);
                this._uploadedEphemeralFileNames.push(fileName);
            } else {
                this._incrementFailedUploadCountForFileName(fileName, this._failedFileUploadsCount);

                const maxUploadCount = (file instanceof SdlArtwork) ? this._maxArtworkUploadAttempts : this._maxFileUploadAttempts;
                if (this._canFileBeUploadedAgain(file, maxUploadCount, this._failedFileUploadsCount)) {
                    console.log(`FileManagerBase: Attempting to resend file with name ${file.getName()} after a failed upload attempt`);
                    this._sdlUploadFilePrivate(file, listener);
                    return;
                }
            }

            if (typeof listener === 'function') {
                listener(success, bytesAvailable, null, errorMessage);
            }
        });

        const operation = new _UploadFileOperation(this._lifecycleManager, this, fileWrapper);
        this._addTask(operation);
    }

    _canFileBeUploadedAgain (file = null, maxUploadCount, failedFileUploadsCount) {
        if (file === null) {
            console.log('FileManagerBase: File can not be uploaded because it is not a valid file.');
            return false;
        }

        if (this._getState() !== _SubManagerBase.READY) {
            console.log(`FileManagerBase: File named ${file.getName()} failed to upload. The file manager has shutdown so the file upload will not retry.`);
            return false;
        }

        if (this.hasUploadedFile(file)) {
            console.log(`FileManagerBase: File named ${file.getName()} has already been uploaded.`);
            return false;
        }

        const failedUploadCount = failedFileUploadsCount.get(file.getName());
        const canFileBeUploadedAgain = (failedUploadCount === undefined) || (failedUploadCount < maxUploadCount);
        if (!canFileBeUploadedAgain) {
            console.log(`FileManagerBase: File named ${file.getName()} failed to upload. Max number of upload attempts reached.`)
        }

        return canFileBeUploadedAgain;
    }

    _incrementFailedUploadCountForFileName (name, failedFileUploadsCount) {
        const currentFailedUploadCount = failedFileUploadsCount.get(name);
        const newFailedUploadCount = (currentFailedUploadCount !== undefined) ? currentFailedUploadCount + 1 : 1;
        failedFileUploadsCount.set(name, newFailedUploadCount);
        console.log(`FileManagerBase: File with name ${name} failed to upload ${newFailedUploadCount} times`);
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
