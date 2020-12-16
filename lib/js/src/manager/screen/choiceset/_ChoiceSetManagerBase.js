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

import { _SubManagerBase } from '../../_SubManagerBase.js';
import { _Task } from '../../_Task.js';
import { FunctionID } from '../../../rpc/enums/FunctionID.js';

class _ChoiceSetManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _ChoiceSetManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance.
     * @param {FileManager} fileManager - A FileManager instance.
     */
    constructor (lifecycleManager, fileManager) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._handleDisplayCapabilityUpdates();
        this._handleTaskQueue();
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Teardown method
     */
    dispose () {
        super.dispose();
    }

    /**
     * Add a new task
     * @returns {Promise} - Resolves to Boolean: whether the update is successful
     */
    update () {
        return new Promise((resolve, reject) => {
            const task = new _Task();
            task.onExecute = () => {};
            this._addTask(task);
        });
    }
}

export { _ChoiceSetManagerBase };
