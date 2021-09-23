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

import { _Task } from '../../_Task';
import { ShowAppMenu } from '../../../rpc/messages/ShowAppMenu';

class _MenuShowOperation extends _Task {
    /**
     * Initializes an instance of _MenuShowOperation
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {MenuCell} menuCell - The menu to show
     */
    constructor (lifecycleManager, menuCell = null) {
        super('MenuShowOperation');
        this._lifecycleManager = lifecycleManager;
        this._submenuCell = menuCell;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     */
    onExecute (task) {
        this._start();
    }

    /**
     * If the task is not canceled, starts to assemble the show
     * @private
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            this.onFinished();
            return;
        }

        const menuId = this._submenuCell !== null ? this._submenuCell._getCellId() : null;
        await this._sendShowAppMenu(menuId);

        this.onFinished();
    }

    /**
     * Send a show app menu using the id passed in
     * @param {Number} id - The ID of the menu to use
     */
    async _sendShowAppMenu (id) {
        const showAppMenu = new ShowAppMenu()
            .setMenuID(id);

        if (this._lifecycleManager === null) {
            return;
        }

        const response = await this._lifecycleManager.sendRpcResolve(showAppMenu);

        if (response.getSuccess()) {
            console.log('MenuShowOperation - Successfully opened application menu');
        } else {
            console.error(`MenuShowOperation - Open menu request failed. Result code: ${response.getResultCode()}. Info: ${response.getInfo()}`);
        }
    }
}

export { _MenuShowOperation };