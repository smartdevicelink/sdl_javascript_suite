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
import { ChoiceSetLayout } from './enums/ChoiceSetLayout';

class _PresentChoiceSetOperation extends _Task {
    /**
     * Initializes an instance of _PresentChoiceSetOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {ChoiceSet} choiceSet - The choice set to present.
     * @param {InteractionMode} presentationMode
     * @param {KeyboardProperties} originalKeyboardProperties
     * @param {KeyboardListener} keyboardListener
     * @param {_ChoiceSetSelectionListener} choiceSetSelectionListener - A callback function for selection updates
     * @param {Number} cancelId
     */
    constructor (lifecycleManager = null, choiceSet, presentationMode = null, originalKeyboardProperties, keyboardListener = null, choiceSetSelectionListener, cancelId) {
        super('PresentChoiceSetOperation');
        this._lifecycleManager = lifecycleManager;
        this._choiceSet = choiceSet;
        this._choiceSet.setCanceledListener(() => {
            this._cancelInteraction();
        });
        this._presentationMode = presentationMode;
        this._originalKeyboardProperties = originalKeyboardProperties;
        this._keyboardListener = keyboardListener;
        this._choiceSetSelectionListener = choiceSetSelectionListener;
        this._cancelId = cancelId;
        // internal usage
        this._sdlMsgVersion = lifecycleManager.getSdlMsgVersion();
        this._keyboardProperties = originalKeyboardProperties;
        this._selectedCellRow = null;
        this._selectedCell = null;
        this._selectedTriggerSource = null;
        this._updatedKeyboardProperties = null;
        this._keyboardRpcListener = null;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise}
     */
    async onExecute (task) {
        this._addListeners();

        if (this.getState() === _Task.CANCELED) {
            await this._finishOperation();
            return;
        }

        // Check if we're using a keyboard (searchable) choice set and setup keyboard properties if we need to
        if (this._keyboardListener !== null && this._choiceSet.getCustomKeyboardConfiguration() !== null) {
            this._keyboardProperties = this._choiceSet.getCustomKeyboardConfiguration();
            this._updatedKeyboardProperties = true;
        }

        await this._updateKeyboardProperties();
        if (this.getState() === _Task.CANCELED) {
            await this._finishOperation();
            return;
        }

        await this._presentChoiceSet();

        await this._finishOperation();
    }

    /**
     * Send requests to update global properties
     * @returns {Promise} - Resolves to a Boolean as to whether the update is successful
     */
    async _updateKeyboardProperties () {
        if (this._keyboardProperties === null) {
            return false;
        }
        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: LifecycleManager is null');
            return false;
        }

        const setGlobalProperties = new SetGlobalProperties()
            .setKeyboardProperties(this._keyboardProperties);

        const response = await this._lifecycleManager.sendRpcResolve(setGlobalProperties);
        if (!response.getSuccess()) {
            console.error('PresentChoiceSetOperation: Error Setting keyboard properties');
            return false;
        }
        this._updatedKeyboardProperties = true;
        return true;
    }

    /**
     * Send a PerformInteraction request for the choiceset
     */
    async _presentChoiceSet () {
        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: LifecycleManager is null');
            return false;
        }

        const choiceIds = [];

        const performInteraction = new PerformInteraction()
            .setInitialText(this._choiceSet.getTitle())
            .setInteractionMode(this._presentationMode)
            .setInteractionChoiceSetIDList(choiceIds)
            .setInitialPrompt(this._choiceSet.getInitialPrompt())
            .setHelpPrompt(this._choiceSet.getHelpPrompt())
            .setTimeoutPrompt(this._choiceSet.getTimeoutPrompt())
            .setVrHelp(this._choiceSet.getVrHelpList())
            .setTimeout(this._choiceSet.getTimeout() * 1000)
            .setInteractionLayout(this._getLayoutMode())
            .setCancelID(this._cancelId);

        const response = await this._lifecycleManager.sendRpcResolve(performInteraction);
        if (!response.getSuccess()) {
            console.error(`PresentChoiceSetOperation: Presenting Choice set failed: ${response.getInfo()}`);
            if (typeof this._choiceSetSelectionListener === 'function') {
                this._choiceSetSelectionListener.onError(response.getInfo());
            }
            return;
        }

        this._setSelectedCellWithId(response.getChoiceID());
        this._selectedTriggerSource = response.getTriggerSource();

        if (typeof this._choiceSetSelectionListener === 'function' && this._selectedCell !== null && this._selectedTriggerSource !== null && this._selectedCellRow !== null) {
            this._choiceSetSelectionListener.onChoiceSelected(this._selectedCell, this._selectedTriggerSource, this._selectedCellRow);
        }
    }

    /**
     * Teardown method
     */
    async _finishOperation () {
        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: LifecycleManager is null');
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
                console.error(`PresentChoiceSetOperation: Failed to reset choice keyboard properties to original config ${response.getResultCode()}, ${response.getInfo()}`);
            }
        }

        this.onFinished();
    }

    /**
     * The choiceset is intended to be canceled. Handle it here
     */
    async _cancelInteraction () {
        if (this.getState() === _Task.FINISHED || this.getState() === _Task.CANCELED) {
            return;
        } else if (this.getState() === _Task.IN_PROGRESS) {
            if (this._sdlMsgVersion.getMajorVersion() < 6) {
                console.warn('PresentChoiceSetOperation: Canceling a presented choice set is not supported on this head unit');
                return;
            }
            if (this._lifecycleManager === null) {
                console.error('PresentChoiceSetOperation: LifecycleManager is null');
                return;
            }

            const cancelInteraction = new CancelInteraction()
                .setFunctionIDParam(FunctionID.PerformInteraction)
                .setCancelID(this._cancelId);

            const response = await this._lifecycleManager.sendRpcResolve(cancelInteraction);
            if (!response.getSuccess()) {
                console.error('Canceled the presented choice set unsuccessfully');
            }
        } else { // Canceling a choice set that has not yet been sent to Core
            this.switchStates(_Task.CANCELED);
        }
    }

    // HELPER METHODS

    /**
     * Chooses the correct layout mode to use
     * @returns {LayoutMode}
     */
    _getLayoutMode () {
        if (this._choiceSet.getLayout() === ChoiceSetLayout.CHOICE_SET_LAYOUT_LIST) {
            return this._keyboardListener !== null ? LayoutMode.LIST_WITH_SEARCH : LayoutMode.LIST_ONLY;
        } else if (this._choiceSet.getLayout() === ChoiceSetLayout.CHOICE_SET_LAYOUT_TILES) {
            return this._keyboardListener !== null ? LayoutMode.ICON_WITH_SEARCH : LayoutMode.ICON_ONLY;
        }
        return LayoutMode.LIST_ONLY; // default
    }

    /**
     * Given a cellId, finds the associated choice cell with the matching ID
     * @param {Number} cellId
     */
    _setSelectedCellWithId (cellId = null) {
        const choiceCells = this._choiceSet.getChoices();
        if (choiceCells !== null && cellId !== null) {
            for (let index = 0; index < choiceCells.length; index++) {
                if (choiceCells[index]._getChoiceId() === cellId) {
                    this._selectedCell = choiceCells[index];
                    this._selectedCellRow = index;
                    return;
                }
            }
        }
    }

    _addListeners () {
        this._keyboardRpcListener = (onKeyboardInput) => {
            if (this.getState() === _Task.CANCELED) {
                this._finishOperation();
                return;
            }
            if (this._keyboardListener === null) {
                console.error('PresentChoiceSetOperation: Received keyboard input but listener is null');
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
                    // the following line should exist based on the _PresentKeyboardOperation's _addListeners method using nearly the exact same logic
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
            }
        };

        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: Present Choice Set Keyboard Listener Not Added');
            return;
        }

        this._lifecycleManager.addRpcListener(FunctionID.OnKeyboardInput, this._keyboardRpcListener);
    }
}

export { _PresentChoiceSetOperation };