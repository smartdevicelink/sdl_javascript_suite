import { _ServiceType } from '../../protocol/enums/_ServiceType';
import { _SdlProtocolBase } from '../../protocol/_SdlProtocolBase';
import { PutFile } from '../../rpc/messages/PutFile';
import { _Task } from '../_Task';
import { _FileManagerBase } from './_FileManagerBase';
import { _FileUtils } from '../../util/_FileUtils';
import { Version } from '../../util/Version';

class _UploadFileOperation extends _Task {
    /**
     * Initializes an instance of the _UploadFileOperation.
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {_SdlFileWrapper} fileWrapper - An instance of _SdlFileWrapper.
     */
    constructor (lifecycleManager = null, fileManager = null, fileWrapper = null) {
        super('UploadFileOperation');
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._fileWrapper = fileWrapper;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     */
    async onExecute (task) {
        await this._start();
    }

    /**
     * If the task is not canceled, starts to send the PutFile
     * @private
     * @returns {Promise} - This promise does not resolve to any value
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            return;
        }

        const file = this._fileWrapper.getFile();
        const msgVersion = this._lifecycleManager.getSdlMsgVersion();
        const rpcVersion = new Version(msgVersion.getMajorVersion(), msgVersion.getMinorVersion(), msgVersion.getPatchVersion());
        if (!file.isPersistent() && !this._fileManager.hasUploadedFile(file) && new Version(4, 4, 0).isNewerThan(rpcVersion) === 1) {
            file.setOverwrite(true);
        }

        if (!this._fileManager.fileNeedsUpload(file)) {
            const errorMessage = this.fileManagerCannotOverwriteError;
            console.log(errorMessage);
            this._fileWrapper.getCompletionListener(false, null, null, errorMessage);
            return this.onFinished();
        }

        let mtuSize = 0;
        if (this._lifecycleManager !== null) {
            mtuSize = this._lifecycleManager.getMtu(_ServiceType.RPC);
        }
        await this._sendFile(file, mtuSize, this._fileWrapper.getCompletionListener());
    }

    /**
     * Builds and sends the PutFile RPC(s). Sends multiple if the file is larger than the mtu.
     * @param {SdlFile} file - The SdlFile to be uploaded
     * @param {Number} mtuSize - The maximum packet size.
     * @param {Function} completionListener - Listener to be called when the upload is complete.
     */
    async _sendFile (file = null, mtuSize, completionListener) {
        let streamError = null;
        let bytesAvailable = _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE;
        let highestCorrelationId = -1;

        if (file === null) {
            const errorMessage = 'The file manager was unable to send the file. This could be because the file does not exist at the specified file path or that passed data is invalid.';
            completionListener(false, bytesAvailable, null, errorMessage);
            return this.onFinished();
        }

        if (file.getName() === null || file.getName() === undefined) {
            const errorMessage = 'You must specify a file name in the SdlFile';
            completionListener(false, bytesAvailable, null, errorMessage);
            return this.onFinished();
        }

        let data;
        if (typeof file.getFilePath() === 'string') {
            data = await _FileUtils.getFileData(file.getFilePath());

            if (data === null) {
                const errorMessage = 'File at path was empty';
                completionListener(false, bytesAvailable, null, errorMessage);
                return this.onFinished();
            }
        } else if (file.getFileData() !== null && file.getFileData() !== undefined) {
            data = file.getFileData();
        } else {
            const errorMessage = 'The SdlFile to upload does not specify its file data.';
            completionListener(false, bytesAvailable, null, errorMessage);
            return this.onFinished();
        }
        const fileSize = data.length;

        const putFiles = [];

        let currentOffset = 0;
        const maxBulkDataSize = this._getMaxBulkDataSize(mtuSize, file, fileSize);
        const numberOfPieces = Math.floor(((fileSize - 1) / maxBulkDataSize) + 1);
        for (let index = 0; index < numberOfPieces; index++) {
            const putFileLength = this._getPutFileLength(currentOffset, fileSize, maxBulkDataSize);
            const putFileBulkDataSize = this._getDataSizeForOffset(currentOffset, fileSize, maxBulkDataSize);
            const putFileBulkData = this._getDataChunkWithSize(putFileBulkDataSize, currentOffset, data);

            const putFile = new PutFile()
                .setFileName(file.getName())
                .setPersistentFile(file.isPersistent())
                .setSystemFile(false)
                .setOffset(currentOffset)
                .setLength(putFileLength)
                .setBulkData(putFileBulkData);

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

            const responsePromise = this._lifecycleManager.sendRpcResolve(putFile);
            putFiles.push(responsePromise);

            currentOffset += putFileBulkDataSize;
        }

        const responses = await Promise.all(putFiles);
        let allSucceeded = true;
        for (let index = 0; index < responses.length; index++) {
            const response = responses[index];
            if (!response.getSuccess()) {
                allSucceeded = false;
                streamError = `${response.getInfo()}: ${response.getResultCode()}`;
                this.switchStates(_Task.CANCELED);
            }
            if (response.getCorrelationId() > highestCorrelationId) {
                highestCorrelationId = response.getCorrelationId();

                bytesAvailable = response.getSpaceAvailable() !== null ? response.getSpaceAvailable() : _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE;
            }
        }

        if (!allSucceeded || this.getState() === _Task.CANCELED) {
            completionListener(false, bytesAvailable, null, streamError);
        } else {
            completionListener(true, bytesAvailable, null, null);
        }

        this.onFinished();
    }

    /**
     * Gets the chunk of file data for the current PutFile
     * @param {Number} size - The size of the file data chunk to be sent in the packet
     * @param {Number} offset - The data offset
     * @param {Unit8Array} fileData - a Uint8Array representation of the file if one exists
     * @returns {Uint8Array} - The desired chunk of data
     */
    _getDataChunkWithSize (size, offset, fileData) {
        if (size < 0) {
            return null;
        }
        return fileData.slice(offset, offset + size);
    }

    /**
     * Gets the size of the file data that will be sent in the current PutFile
     * @param {Number} currentOffset - The current file data offset
     * @param {Number} fileSize - The size of the file data
     * @param {Number} maxBulkDataSize - the max size of bulk data that we can load into each PutFile
     * @returns {Number} - the size of the bulk data to be loaded into the next PutFile
     */
    _getDataSizeForOffset (currentOffset, fileSize, maxBulkDataSize) {
        let dataSize;
        const fileSizeRemaining = fileSize - currentOffset;
        if (fileSizeRemaining < maxBulkDataSize) {
            dataSize = fileSizeRemaining;
        } else {
            dataSize = maxBulkDataSize;
        }
        return dataSize;
    }

    /**
     * Gets the length of the file data
     * @param {Number} currentOffset - The current file data offset
     * @param {Number} fileSize - The size of the file data
     * @param {Number} maxBulkDataSize - the max size of bulk data that we can load into each PutFile
     * @returns {Number} - The length of the file data in the current PutFile
     */
    _getPutFileLength (currentOffset, fileSize, maxBulkDataSize) {
        let putFileLength;
        if (currentOffset === 0) {
            putFileLength = fileSize;
        } else if ((fileSize - currentOffset) < maxBulkDataSize) {
            putFileLength = fileSize - currentOffset;
        } else {
            putFileLength = maxBulkDataSize;
        }
        return putFileLength;
    }

    /**
     * Returns the max possible size for the JSON data in each of the PutFile pieces.
     *
     * @param {SdlFile} file - The file containing the data to be sent to the SDL Core
     * @param {Number} fileSize - The size of the file
     * @returns {Number} max possible size for the JSON data
     */
    _getMaxJSONSize (file, fileSize) {
        let maxJSONSize = 0;

        const putFile = new PutFile(file.getName(), file.getType())
            .setPersistentFile(file.isPersistent())
            .setSystemFile(false)
            .setOffset(fileSize)
            .setLength(fileSize);

        if (putFile !== null && putFile.getParameters() !== null) {
            maxJSONSize = JSON.stringify(putFile.getParameters()).length;
        }
        return maxJSONSize;
    }

    /**
     * Returns the max size of bulk data that we can load into each PutFile to guarantee that the
     * packet size does not exceed the max MTU size allowed by the SDL Core.
     *
     * @param {Number} mtuSize - The maximum packet size allowed
     * @param {SdlFile} file - The file containing the data to be sent to the SDL Core
     * @param {Number} fileSize - The size of the file
     * @returns {Number} max size of bulk data that we can load into each PutFile
     */
    _getMaxBulkDataSize (mtuSize, file, fileSize) {
        // Each RPC packet contains : frame header + payload (binary header + JSON data + bulk data)
        // To make sure that packets do not exceed MTU size, the bulk data size for each packet should not exceed:
        // mtuSize - (frameHeaderSize + binaryHeaderSize + maxJSONSize)

        const frameHeaderSize = _SdlProtocolBase.V2_HEADER_SIZE;
        const binaryHeaderSize = 12;
        const maxJSONSize = this._getMaxJSONSize(file, fileSize);
        return mtuSize - (frameHeaderSize + binaryHeaderSize + maxJSONSize);
    }
}

_UploadFileOperation.fileManagerCannotOverwriteError = 'Cannot overwrite remote file. The remote file system already has a file of this name, and the file manager is set to not automatically overwrite files.';

export { _UploadFileOperation };