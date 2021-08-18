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

import { DeleteFile } from '../../rpc/messages/DeleteFile';
import { _Task } from '../_Task';
import { _FileManagerBase } from './_FileManagerBase';

class _DeleteFileOperation extends _Task {
    /**
     * Initializes an instance of the _DeleteFileOperation.
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {String} fileName - Name of the file to be deleted.
     * @param {Function} completionListener - Listener called when the operation has completed.
     */
    constructor (lifecycleManager, fileName, completionListener) {
        super('DeleteFilesOperation');
        this._lifecycleManager = lifecycleManager;
        this._fileName = fileName;
        this._completionListener = completionListener;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     */
    async onExecute (task) {
        await this._start();
    }

    /**
     * If the task is not canceled, starts to assemble the DeleteFile RPC
     * @private
     * @returns {Promise} - This promise does not resolve to any value
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            return;
        }
        await this._deleteFile();
    }

    /**
     * Sends a DeleteFile RPC to the head unit
     */
    async _deleteFile () {
        const deleteFile = new DeleteFile()
            .setSdlFileName(this._fileName);

        const response = await this._lifecycleManager.sendRpcResolve(deleteFile);
        const success = response.getSuccess();

        const bytesAvailable = response.getSpaceAvailable() ? response.getSpaceAvailable() : _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE;

        if (typeof this._completionListener === 'function') {
            const errorMessage = success ? null : `${response.getInfo()}: ${response.getResultCode()}`;
            this._completionListener(success, bytesAvailable, null, errorMessage);
        }

        this.onFinished();
    }

    /**
     * Returns the name for the operation
     * @returns {String} - a unique identifier for this task
     */
    getName () {
        return `${super.getName()} - ${this.getId()}`;
    }
}

export { _DeleteFileOperation };