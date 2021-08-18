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

import { _Task } from '../_Task';
import { ListFiles } from '../../rpc/messages/ListFiles';
import { _FileManagerBase } from './_FileManagerBase';

class _ListFilesOperation extends _Task {
    /**
     * Initializes an instance of the _ListFilesOperation.
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {Function} completionListener - Listener to be called when the operation completes.
     */
    constructor (lifecycleManager, completionListener = null) {
        super('ListFilesOperation');
        this._lifecycleManager = lifecycleManager;
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
     * If the task is not canceled, starts to assemble the ListFiles RPC
     * @private
     * @returns {Promise} - This promise does not resolve to any value
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            return;
        }
        await this._listFiles();
    }

    /**
     * Sends the ListFiles RPC and returns data to the manager
     */
    async _listFiles () {
        const listFiles = new ListFiles();
        const response = await this._lifecycleManager.sendRpcResolve(listFiles);
        const success = response.getSuccess();
        let fileNames = [];
        if (response.getFilenames()) {
            fileNames = response.getFilenames();
        }

        const bytesAvailable = response.getSpaceAvailable() ? response.getSpaceAvailable() : _FileManagerBase.SPACE_AVAILABLE_MAX_VALUE;

        if (this._completionListener !== null) {
            const errorMessage = success ? null : `${response.getInfo()}: ${response.getResultCode()}`;
            this._completionListener(success, bytesAvailable, fileNames, errorMessage);
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

export { _ListFilesOperation };