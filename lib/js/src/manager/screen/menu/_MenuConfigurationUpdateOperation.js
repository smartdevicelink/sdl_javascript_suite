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

import { _Task } from '../../_Task';
import { SetGlobalProperties } from '../../../rpc/messages/SetGlobalProperties';

class _MenuConfigurationUpdateOperation extends _Task {
    /**
     * Initializes an instance of _MenuConfigurationUpdateOperation
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {MenuConfiguration} menuConfiguration - The menu configuration
     * @param {function} completionListener - A callback for getting the boolean result of the operation
     */
    constructor (lifecycleManager = null, windowCapability, menuConfiguration, completionListener) {
        super('MenuConfigurationUpdateOperation');
        this._lifecycleManager = lifecycleManager;
        this._availableMenuLayouts = windowCapability !== null ? windowCapability.getMenuLayoutsAvailable() : null;
        this._updatedMenuConfiguration = menuConfiguration;
        this._completionListener = completionListener;
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

        const success = await this._sendSetGlobalProperties();

        if (typeof this._completionListener === 'function') {
            this._completionListener(success);
        }
        this.onFinished();
    }

    /**
     * Send a show app menu using the id passed in
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _sendSetGlobalProperties () {
        if (this._lifecycleManager === null) {
            return false;
        }

        const sdlMsgVersion = this._lifecycleManager.getSdlMsgVersion();
        if (sdlMsgVersion === null) {
            console.error('MenuConfigurationUpdateOperation - SDL Message Version is null. Cannot set Menu Configuration');
            return false;
        }

        if (sdlMsgVersion.getMajorVersion() < 6) {
            const versionString = `${sdlMsgVersion.getMajorVersion()}.${sdlMsgVersion.getMinorVersion()}.${sdlMsgVersion.getPatchVersion()}`;
            console.warn(`MenuConfigurationUpdateOperation - Menu configurations are only supported on head units with RPC spec version 6.0.0 or later. Currently connected head unit RPC spec version is: ${versionString}`);
            return false;
        }

        if (this._updatedMenuConfiguration.getMenuLayout() === null) {
            console.log('MenuConfigurationUpdateOperation - Menu Layout is null, not sending setGlobalProperties');
            return false;
        }

        if (this._availableMenuLayouts === null) {
            console.warn('MenuConfigurationUpdateOperation - Could not set the main menu configuration. Which menu layouts can be used is not available');
            return false;
        } else if (!this._availableMenuLayouts.includes(this._updatedMenuConfiguration.getMenuLayout()) || !this._availableMenuLayouts.includes(this._updatedMenuConfiguration.getSubMenuLayout())) {
            console.error(`MenuConfigurationUpdateOperation - One or more of the set menu layouts are not available on this system. The menu configuration will not be set. Available menu layouts: ${this._availableMenuLayouts}, set menu layouts: ${this._updatedMenuConfiguration}`);
            return false;
        }

        const setGlobalProperties = new SetGlobalProperties()
            .setMenuLayout(this._updatedMenuConfiguration.getMenuLayout());

        const response = await this._lifecycleManager.sendRpcResolve(setGlobalProperties);
        if (response.getSuccess()) {
            const printedMenuConfig = `MenuLayout = ${this._updatedMenuConfiguration.getMenuLayout()} | SubMenuLayout = ${this._updatedMenuConfiguration.getSubMenuLayout()}`;
            console.log(`MenuShowOperation - Menu Configuration successfully set: ${printedMenuConfig}`);
        } else {
            console.error(`MenuShowOperation - Error. Result code: ${response.getResultCode()}. Info: ${response.getInfo()}`);
        }
    }
}

export { _MenuConfigurationUpdateOperation };