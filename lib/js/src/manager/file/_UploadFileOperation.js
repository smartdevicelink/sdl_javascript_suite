import { _ServiceType } from '../../protocol/enums/_ServiceType';
import { _SdlProtocolBase } from '../../protocol/_SdlProtocolBase';
import { PutFile } from '../../rpc/messages/PutFile';
import { _Task } from '../_Task';
import { _DispatchGroup } from './_DispatchGroup';
import { _FileManagerBase } from './_FileManagerBase';

class _UploadFileOperation extends _Task {
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
     * If the task is not canceled, starts to assemble the 
     * @private
     * @returns {Promise} - This promise does not resolve to any value
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            return;
        }

        let mtuSize = 0;
        if (this._lifecycleManager !== null) {
            mtuSize = this._lifecycleManager.getMtu(_ServiceType.RPC);
        }
        await this._sendFile(this._fileManager.getFile(), mtuSize, this._fileWrapper.getCompletionListener());
    }

    async _sendFile (file = null, mtuSize, completionListener) {
        let streamError = null;
        let bytesAvailable = _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE;
        let highestCorrelationId = -1;

        if (this.getState() === _Task.CANCELED) {
            const errorMessage = 'The file upload transaction was canceled before it could be completed.';
            completionListener.onComplete(false, bytesAvailable, null, errorMessage);
            this.onFinished();
            return;
        }

        if (file === null) {
            const errorMessage = 'The file manager was unable to send the file. This could be because the file does not exist at the specified file path or that passed data is invalid.';
            completionListener.onComplete(false, bytesAvailable, null, errorMessage);
            this.onFinished();
            return;
        }

        const fileSize = file.getFileData().length;

        const putFileGroup = new _DispatchGroup();
        putFileGroup.enter();
        putFileGroup.notify(() => {
            if (streamError !== null || this.getState() === _Task.CANCELED) {
                completionListener.onComplete(false, bytesAvailable, null, streamError);
            } else {
                completionListener.onComplete(true, bytesAvailable, null, null);
            }

            this.onFinished();
        });

        let currentOffset = 0;
        const maxBulkDataSize = this._getMaxBulkDataSize(mtuSize, file, fileSize);
        const numberOfPieces = ((fileSize - 1) / maxBulkDataSize) + 1;
        for (const i = 0; i < numberOfPieces; i++) {
            putFileGroup.enter();

            const putFileLength = this._getPutFileLength(currentOffset, fileSize, maxBulkDataSize);
            const putFileBulkDataSize = this._getDataSizeForOffset(currentOffset, fileSize, maxBulkDataSize);
            const putFileBulkData = this._getDataChunkWithSize(putFileBulkDataSize, currentOffset, file.getFileData());

            const putFile = new PutFile()
                .setFileName(file.getName())
                .setFileType(file.getType())
                .setPersistentFile(file.isPersistent())
                .setSystemFile(false)
                .setOffset(currentOffset)
                .setLength(putFileLength)
                .setBulkData(putFileBulkData);

            const response = await this._lifecycleManager.sendRpcResolve(putFile);
            if (this.getState() === _Task.CANCELED) {
                putFileGroup.leave();
                break;
            }

            if (!response.getSuccess() || this.getState() === _Task.CANCELED) {
                const streamError = `${response.getInfo()}: ${response.getResultCode()}`;
                putFileGroup.leave();
                this.switchStates(_Task.CANCELED);
                break;
            }

            if (response.getCorrelationId() > highestCorrelationId) {
                highestCorrelationId = response.getCorrelationId();

                bytesAvailable = response.getSpaceAvailable() !== null ? response.getSpaceAvailable() : _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE;
            }
            putFileGroup.leave();

            currentOffset += putFileBulkDataSize;
        }

        putFileGroup.leave();
    }


    // ???????
    async _createPutFile (file) {
        const putFile = new PutFile();
        if (file.getName() === null || file.getName() === undefined) {
            throw new Error('You must specify a file name in the SdlFile');
        } else {
            putFile.setFileName(file.getName);
        }
    }

    _getDataChunkWithSize (size, offset, fileData) {
        if (size < 0) {
            return null;
        }
        return fileData.slice(offset, offset + size);
    }

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

        if (putFile !== null && putFile.getStore() !== null) {
            maxJSONSize = putFile.getStore().toString().getBytes().length;
        }
        return maxJSONSize;
    }

    /**
     * Returns the max size of bulk data that we can load into each PutFile to guarantee that the
     * packet size do not exceed the max MTU size allowed by the SDL Core.
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