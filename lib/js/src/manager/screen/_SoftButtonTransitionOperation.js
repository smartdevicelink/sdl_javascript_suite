/*
* Copyright (c) 2021, Livio, Inc.
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
import { Show } from '../../rpc/messages/Show.js';

class _SoftButtonTransitionOperation extends _Task {
    /**
     * Initializes an instance of _SoftButtonTransitionOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {SoftButtonObject[]} softButtonObjects - A list of soft button objects
     * @param {String} currentMainField1 - The main field value text shown on the head unit
     */
    constructor (lifecycleManager, softButtonObjects = null, currentMainField1 = null) {
        super('SoftButtonTransitionOperation');
        this._lifecycleManager = lifecycleManager;
        this._softButtonObjects = softButtonObjects;
        this._currentMainField1 = currentMainField1;
    }

    /**
     * Sets the main field text
     * @param {String} currentMainField1 - The main field value text shown on the head unit
     */
    setCurrentMainField1 (currentMainField1) {
        this._currentMainField1 = currentMainField1;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - This promise does not resolve to any value
     */
    async onExecute (task) {
        if (this.getState() === _Task.CANCELED) {
            this.onFinished();
            return;
        }
        await this._sendNewSoftButtons();
        this.onFinished();
    }

    /**
     * Sends a Show using the new soft button objects
     * @private
     * @returns {Promise} - Does not resolve to a value
     */
    async _sendNewSoftButtons () {
        const show = new Show()
            .setMainField1(this._currentMainField1)
            .setSoftButtons(this._currentStateSoftButtonsForObjects(this._softButtonObjects));

        const response = await this._lifecycleManager.sendRpcResolve(show);
        if (!response.getSuccess()) {
            console.error('Failed to transition soft button to new state');
        }
    }

    /**
     * Extracts soft button information from the array
     * @private
     * @param {SoftButtonObject[]} softButtonObjects - A list of soft button objects
     * @returns {SoftButton[]} - A list of soft buttons
     */
    _currentStateSoftButtonsForObjects (softButtonObjects) {
        return softButtonObjects.map(softButtonObject => softButtonObject.getCurrentStateSoftButton());
    }
}

export { _SoftButtonTransitionOperation };