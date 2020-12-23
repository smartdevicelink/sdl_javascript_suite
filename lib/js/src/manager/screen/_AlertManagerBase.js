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

import { SystemCapabilityType } from '../../rpc/enums/SystemCapabilityType';
import { FunctionID } from '../../rpc/enums/FunctionID';
import { _SubManagerBase }  from '../_SubManagerBase';
import { PermissionElement } from '../permission/PermissionElement';
import { PermissionGroupType } from '../permission/enums/PermissionGroupType';
import { ButtonName } from '../../rpc/enums/ButtonName';
import { _ScreenManagerBase } from './_ScreenManagerBase';
import { _PresentAlertOperation } from './utils/_PresentAlertOperation';

class _AlertManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _AlertManagerBase.
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {PermissionManager} permissionManager - An instance of PermissionManager.
     */
    constructor (lifecycleManager = null, fileManager = null, permissionManager = null) {
        super(lifecycleManager);

        this._alertCancelIdMin = 1;
        this._alertCancelIdMax = 1000;

        this._onSpeechCapabilityListener = null;
        this._speechCapabilities = [];
        this._permissionListener = null;
        this._isAlertRpcAllowed = false;
        this._fileManager = fileManager;
        this._permissionManager = permissionManager;
        this._nextCancelId = this._alertCancelIdMin;
        this._softButtonObjects = [];

        this._addListeners();
        this._handleDisplayCapabilityUpdates();
        this._handleTaskQueue();
    }

    /**
     * Start the manager.
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Called when manager is being torn down
     */
    dispose () {
        this._speechCapabilities = null;
        this._isAlertRpcAllowed = false;
        this._softButtonObjects = null;

        this._handleTaskQueue();

        if (this._permissionManager !== null) {
            this._permissionManager.removeListener(this._permissionListener);
        }

        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener.bind(this));
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener.bind(this));

        super.dispose();
    }

    /**
     * Presents an AlertView in the window.
     * @param {AlertView} alert - An instance of AlertView to be displayed in the window.
     */
    async presentAlert (alert) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.log('AlertManager In Error State');
        }

        if (alert.getSoftButtons() !== null && alert.getSoftButtons !== undefined) {
            if (!_ScreenManagerBase._checkAndAssignButtonIds(alert.getSoftButtons(), _ScreenManagerBase._ManagerLocation.ALERT_MANAGER)) {
                console.log('Attempted to set soft button objects for Alert, but multiple buttons had the same id.');
                return;
            }

            let softButtonObjects;
            if (Array.isArray(alert.getSoftButtons())) {
                softButtonObjects = alert.getSoftButtons();
            } else {
                softButtonObjects = [];
            }

            if (this._softButtonObjects.length > 0) {
                for (const softButtonObject of softButtonObjects) {
                    if (this._softButtonObjects.includes(softButtonObject)) {
                        break;
                    }
                    this._softButtonObjects.push(softButtonObject);
                }
            } else {
                this._softButtonObjects = softButtonObjects;
            }
        }

        if (this._nextCancelId >= this._alertCancelIdMax) {
            this._nextCancelId = this._alertCancelIdMin;
        } else {
            this._nextCancelId++;
        }
        const operation = new _PresentAlertOperation(this._lifecycleManager, alert, this._defaultMainWindowCapability, this._speechCapabilities, this._fileManager, this._nextCancelId++, this._listener);
        this._addTask(operation);
    }

    /**
     * Get the soft button objects list
     * @returns {SoftButtonObject[]} - An array of SoftButtonObject instances.
     */
    _getSoftButtonsObjects () {
        return this._softButtonObjects;
    }

    /**
     * Get the SoftButtonObject that has the provided buttonId
     * @private
     * @param {Number} buttonId - a int value that represents the id of the button
     * @returns {SoftButtonObject} - A SoftButtonObject instance.
     */
    _getSoftButtonObjectById (buttonId) {
        for (const softButtonObject of this._softButtonObjects) {
            if (softButtonObject.getButtonID() === buttonId) {
                return softButtonObject;
            }
        }
        return null;
    }

    /**
     * Adds listeners for capabilities, permissions, and button events.
     */
    async _addListeners () {
        if (this._lifecycleManager.getSystemCapabilityManager() !== null) {
            this._speechCapabilities = await this._lifecycleManager.getSystemCapabilityManager().getSpeechCapabilities();
        }

        if (this._lifecycleManager.getSystemCapabilityManager() !== null) {
            this._displayCapabilities = await this._lifecycleManager.getSystemCapabilityManager().updateCapability(SystemCapabilityType.DISPLAYS).catch(info => {
                console.log('Display Capability cannot be retrieved');
                this._defaultMainWindowCapability = null;
            });
        }

        const alertPermissionElement = new PermissionElement(FunctionID.ALERT);
        this._permissionListener = this._permissionManager
            .addListener(
                [alertPermissionElement],
                PermissionGroupType.ANY,
                (allowedPermissions, permissionGroupStatus) => {
                    if (allowedPermissions[FunctionID.ALERT] !== null) {
                        this._isAlertRpcAllowed = allowedPermissions[FunctionID.ALERT].getIsRpcAllowed();
                    } else {
                        this._isAlertRpcAllowed = false;
                    }
                });
        this._onButtonPressListener = function (onButtonPress) {
            if (onButtonPress !== null && onButtonPress.getButtonName() === ButtonName.CUSTOM_BUTTON) {
                const buttonId = onButtonPress.getCustomButtonID();
                if (this.getSoftButtonObjects() !== null) {
                    for (const softButtonObject of this.getSoftButtonObjects()) {
                        if (softButtonObject.getButtonID() === buttonId && typeof softButtonObject.getOnEventListener() === 'function') {
                            softButtonObject.getOnEventListener()(this._getSoftButtonObjectById(buttonId), onButtonPress);
                            break;
                        }
                    }
                }
            }
        };

        this._lifecycleManager.addRpcListener(FunctionID.ON_BUTTON_PRESS, this._onButtonPressListener.bind(this));

        this._onButtonEventListener = function (onButtonEvent) {
            if (onButtonEvent !== null && onButtonEvent.getButtonName() === ButtonName.CUSTOM_BUTTON) {
                const buttonId = onButtonEvent.getCustomButtonID();
                if (this.getSoftButtonObjects() !== null) {
                    for (const softButtonObject of this.getSoftButtonObjects()) {
                        if (softButtonObject.getButtonID() === buttonId && typeof softButtonObject.getOnEventListener() === 'function') {
                            softButtonObject.getOnEventListener()(this._getSoftButtonObjectById(buttonId), onButtonEvent);
                            break;
                        }
                    }
                }
            }
        };

        this._lifecycleManager.addRpcListener(FunctionID.ON_BUTTON_EVENT, this._onButtonEventListener.bind(this));
    }
}

export { _AlertManagerBase };