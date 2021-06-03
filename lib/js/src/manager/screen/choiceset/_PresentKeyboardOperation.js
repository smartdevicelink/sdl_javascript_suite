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
import { FunctionID } from '../../../rpc/enums/FunctionID.js';
import { KeyboardEvent } from '../../../rpc/enums/KeyboardEvent.js';
import { SetGlobalProperties } from '../../../rpc/messages/SetGlobalProperties.js';
import { PerformInteraction } from '../../../rpc/messages/PerformInteraction.js';
import { CancelInteraction } from '../../../rpc/messages/CancelInteraction.js';
import { LayoutMode } from '../../../rpc/enums/LayoutMode.js';
import { InteractionMode } from '../../../rpc/enums/InteractionMode.js';

class _PresentKeyboardOperation extends _Task {
    /**
     * Initializes an instance of _PresentKeyboardOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {KeyboardProperties} originalKeyboardProperties - The default keyboard properties
     * @param {String} initialText - The initial text of a PerformInteraction
     * @param {KeyboardProperties} customConfig - The custom keyboard properties
     * @param {KeyboardListener} keyboardListener - Received keyboard events
     * @param {Number} cancelId - The ID used to cancel the operation
     */
    constructor (lifecycleManager = null, originalKeyboardProperties, initialText, customConfig, keyboardListener = null, cancelId) {
        super('PresentKeyboardOperation');
        this._lifecycleManager = lifecycleManager;
        this._originalKeyboardProperties = originalKeyboardProperties;
        this._initialText = initialText;
        this._customConfig = customConfig;
        this._keyboardListener = keyboardListener;
        this._cancelId = cancelId;
        this._keyboardProperties = originalKeyboardProperties;
        // internal usage
        this._sdlMsgVersion = lifecycleManager.getSdlMsgVersion();
        this._updatedKeyboardProperties = null;
        this._keyboardRpcListener = null;
    }

    /**
     * Gets the cancel ID
     * @returns {Number} - The cancel ID
     */
    getCancelId () {
        return this._cancelId;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - Does not resolve to any value
     */
    async onExecute (task) {
        this._addListeners();

        if (this.getState() === _Task.CANCELED) {
            await this._finishOperation();
            return;
        }

        if (this._keyboardListener !== null) {
            this._keyboardProperties = this._customConfig;
            this._updatedKeyboardProperties = true;
        }

        await this._updateKeyboardProperties();
        if (this.getState() === _Task.CANCELED) {
            await this._finishOperation();
            return;
        }

        await this._presentKeyboard();

        await this._finishOperation();
    }

    /**
     * Send requests to update global properties
     * @returns {Promise} - Resolves to a Boolean as to whether the update is successful
     */
    async _updateKeyboardProperties () {
        if (this._keyboardProperties === null || this._keyboardProperties === undefined) {
            return false;
        }
        if (this._lifecycleManager === null) {
            console.error('PresentKeyboardOperation: LifecycleManager is null');
            return false;
        }

        const setGlobalProperties = new SetGlobalProperties()
            .setKeyboardProperties(this._keyboardProperties);

        const response = await this._lifecycleManager.sendRpcResolve(setGlobalProperties);
        if (!response.getSuccess()) {
            console.error('PresentKeyboardOperation: Error Setting keyboard properties');
            return false;
        }
        this._updatedKeyboardProperties = true;
        return true;
    }

    /**
     * Send a PerformInteraction request for the choiceset
     * @returns {Promise} - Does not resolve to any value
     */
    async _presentKeyboard () {
        if (this._lifecycleManager === null) {
            console.error('PresentKeyboardOperation: LifecycleManager is null');
            return false;
        }

        const performInteraction = this._getPerformInteraction();

        const response = await this._lifecycleManager.sendRpcResolve(performInteraction);
        if (!response.getSuccess()) {
            console.error(`PresentKeyboardOperation: Presenting keyboard failed: ${response.getInfo()}`);
            return;
        }
    }

    /**
     * Teardown method
     * @returns {Promise} - Does not resolve to any value
     */
    async _finishOperation () {
        if (this._lifecycleManager === null) {
            console.error('PresentKeyboardOperation: LifecycleManager is null');
            this.onFinished();
            return;
        }

        if (this._updateKeyboardProperties) {
            // We need to reset the keyboard properties
            const setGlobalProperties = new SetGlobalProperties()
                .setKeyboardProperties(this._originalKeyboardProperties);

            // detach the OnKeyboardInput listener at the end
            this._lifecycleManager.removeRpcListener(FunctionID.OnKeyboardInput, this._keyboardRpcListener);
            const response = await this._lifecycleManager.sendRpcResolve(setGlobalProperties);

            if (response.getSuccess()) {
                this._updatedKeyboardProperties = false;
            } else { // success
                console.error(`PresentKeyboardOperation: Failed to reset choice keyboard properties to original config ${response.getResultCode()}, ${response.getInfo()}`);
            }
        }

        this.onFinished();
    }

    /**
     * The keyboard is intended to be dismissed. Handle it here
     * @returns {Promise} - Does not resolve to any value
     */
    async _dismissKeyboard () {
        if (this.getState() === _Task.FINISHED || this.getState() === _Task.CANCELED) {
            return;
        } else if (this.getState() === _Task.IN_PROGRESS) {
            if (this._sdlMsgVersion.getMajorVersion() < 6) {
                console.warn('PresentKeyboardOperation: Canceling a keyboard is not supported on this head unit');
                return;
            }
            if (this._lifecycleManager === null) {
                console.error('PresentKeyboardOperation: LifecycleManager is null');
                return;
            }

            const cancelInteraction = new CancelInteraction()
                .setFunctionIDParam(FunctionID.PerformInteraction)
                .setCancelID(this._cancelId);

            const response = await this._lifecycleManager.sendRpcResolve(cancelInteraction);
            console.error(`Canceled the keyboard set ${response.getSuccess() ? 'successfully' : 'unsuccessfully'}`);
        } else { // Canceling a choice set that has not yet been sent to Core
            this.switchStates(_Task.CANCELED);
        }
    }

    // HELPER METHODS

    /**
     * Creates a PerformInteraction RPC
     * @returns {PerformInteraction} - The PerformInteraction RPC
     */
    _getPerformInteraction () {
        return new PerformInteraction()
            .setInitialText(this._initialText)
            .setInteractionMode(InteractionMode.MANUAL_ONLY)
            .setInteractionChoiceSetIDList([])
            .setInteractionLayout(LayoutMode.KEYBOARD)
            .setCancelID(this._cancelId);
    }

    _addListeners () {
        this._keyboardRpcListener = (onKeyboardInput) => {
            if (this.getState() === _Task.CANCELED) {
                this._finishOperation();
                return;
            }
            if (this._keyboardListener === null) {
                console.error('PresentKeyboardOperation: Received keyboard input but listener is null');
                return;
            }
            this._keyboardListener.onKeyboardDidSendEvent(onKeyboardInput.getEvent(), onKeyboardInput.getData());

            if (onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_VOICE || onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_SUBMITTED) {
                // submit voice or text
                this._keyboardListener.onUserDidSubmitInput(onKeyboardInput.getData(), onKeyboardInput.getEvent());
            } else if (onKeyboardInput.getEvent() === KeyboardEvent.KEYPRESS) {
                // notify of keypress
                this._keyboardListener.updateAutocompleteWithInput(onKeyboardInput.getData(), updatedAutoCompleteList => {
                    this._keyboardProperties.setAutoCompleteList(updatedAutoCompleteList !== null && updatedAutoCompleteList !== undefined ? updatedAutoCompleteList : []);
                    this._keyboardProperties.setAutoCompleteText(Array.isArray(updatedAutoCompleteList) && updatedAutoCompleteList.length > 0 ? updatedAutoCompleteList[0] : null);
                    this._updateKeyboardProperties();
                });
                this._keyboardListener.updateCharacterSetWithInput(onKeyboardInput.getData(), updatedCharacterSet => {
                    this._keyboardProperties.setLimitedCharacterList(updatedCharacterSet);
                    this._updateKeyboardProperties();
                });
            } else if (onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_ABORTED || onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_CANCELLED) {
                // notify of abort / cancelation
                this._keyboardListener.onKeyboardDidAbortWithReason(onKeyboardInput.getEvent());
            } else if (onKeyboardInput.getEvent() === KeyboardEvent.INPUT_KEY_MASK_ENABLED || onKeyboardInput.getEvent() === KeyboardEvent.INPUT_KEY_MASK_DISABLED) {
                this._keyboardListener.onKeyboardDidUpdateInputMask(onKeyboardInput.getEvent());
            }
        };

        if (this._lifecycleManager === null) {
            console.error('PresentKeyboardOperation: Present Choice Set Keyboard Listener Not Added');
            return;
        }

        this._lifecycleManager.addRpcListener(FunctionID.OnKeyboardInput, this._keyboardRpcListener);
    }
}

export { _PresentKeyboardOperation };
