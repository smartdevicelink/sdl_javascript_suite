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

import { _SubManagerBase } from '../_SubManagerBase.js';
import { SubscribeButton } from '../../rpc/messages/SubscribeButton';
import { UnsubscribeButton } from '../../rpc/messages/UnsubscribeButton';
import { OnButtonPress } from '../../rpc/messages/OnButtonPress';
import { OnButtonEvent } from '../../rpc/messages/OnButtonEvent';
import { FunctionID } from '../../rpc/enums/FunctionID';
import { _ArrayTools } from '../../util/_ArrayTools';

class _SubscribeButtonManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _SubscribeButtonManager.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     */
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this._setRpcNotificationListeners();
        this._onButtonListeners = new Map();
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
        if (this._onButtonListeners !== null) {
            this._onButtonListeners.clear();
        }
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener);
    }

    /**
     * Adds a listener to the list of listeners for a button and subscribes to the button if not already subscribed.
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - A function to invoke when a button notification occurs
     */
    async _addButtonListener (buttonName, listener) {
        if (listener === null || listener === undefined || buttonName === null || buttonName === undefined) {
            console.error('ButtonName and OnButtonListener cannot be null or undefined');
            return this;
        }

        if (this._onButtonListeners.get(buttonName) === null || this._onButtonListeners.get(buttonName) === undefined) {
            await this._subscribeButtonRequest(buttonName, listener);
            return;
        }

        if (this._onButtonListeners.get(buttonName).includes(listener)) {
            console.info(`Already subscribed to the button named ${buttonName}`);
            return;
        }

        this._onButtonListeners.get(buttonName).push(listener);
    }

    /**
     * Removes a listener from the list of listeners and unsubscribes to the button if it was the last listener.
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - The listener to be removed
     */
    async _removeButtonListener (buttonName, listener) {
        if (listener === null || listener === undefined || buttonName === null || buttonName === undefined) {
            console.error('ButtonName and OnButtonListener cannot be null or undefined');
            return;
        }

        const listenerArray = this._onButtonListeners.get(buttonName);
        if (listenerArray === null || listenerArray === undefined || !listenerArray.includes(listener)) {
            console.error(`Attempting to unsubscribe to the ${buttonName} button failed because it is not currently subscribed`);
            return;
        }

        if (this._onButtonListeners.get(buttonName).size() > 1) {
            this._onButtonListeners.set(buttonName, _ArrayTools.arrayRemove(listenerArray, listener));
            return;
        }
        await this._unsubscribeButtonRequest(buttonName, listener);
    }

    /**
     * Sends a SubscribeButton RPC and adds a listener to the list of listeners
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - A function to invoke when a button notification occurs
     */
    async _subscribeButtonRequest (buttonName, listener) {
        const subscribeButton = new SubscribeButton().setButtonName(buttonName);
        const response = await this._lifecycleManager.sendRpcResolve(subscribeButton);
        if (response.getSuccess()) {
            let listenerArray = this._onButtonListeners.get(buttonName);
            // If no array exists yet for this function id, create one
            if (!Array.isArray(listenerArray)) {
                listenerArray = [];
            }
            listenerArray.push(listener);
            this._onButtonListeners.set(buttonName, listenerArray);
        }
    }

    /**
     * Sends an UnsubscribeButton RPC and removes a listener from the list of listeners
     * @param {*} buttonName - Name of the button
     * @param {*} listener - The listener to be removed
     */
    async _unsubscribeButtonRequest (buttonName, listener) {
        const unsubscribeButton = new UnsubscribeButton().setButtonName(buttonName);
        const response = await this._lifecycleManager.sendRpcResolve(unsubscribeButton);
        if (response.getSuccess()) {
            const listenerArray = this._onButtonListeners.get(buttonName);
            if (Array.isArray(listenerArray)) {
                this._onButtonListeners.set(buttonName, _ArrayTools.arrayRemove(listenerArray, listener));
            }
        }
    }

    /**
     * Adds RPC listeners for OnButtonPress and OnButtonEvent that will call any listeners for those buttons
     */
    _setRpcNotificationListeners () {
        const _onButtonPressListener = function (onButtonPress) {
            if (onButtonPress instanceof OnButtonPress) {
                const listeners = this._onButtonListeners.get(onButtonPress.getButtonName());
                if (listeners !== null && listeners !== undefined && listeners.length > 0) {
                    for (const listener of listeners) {
                        listener(onButtonPress.getButtonName(), onButtonPress);
                    }
                }
            }
        };

        const _onButtonEventListener = function (onButtonEvent) {
            if (onButtonEvent instanceof OnButtonEvent) {
                const listeners = this._onButtonListeners.get(onButtonEvent.getButtonName());
                if (listeners !== null && listeners !== undefined && listeners.length > 0) {
                    for (const listener of listeners) {
                        listener(onButtonEvent.getButtonName(), onButtonEvent);
                    }
                }
            }
        };

        this._lifecycleManager.addRpcListener(FunctionID.OnButtonPress, _onButtonPressListener.bind(this));
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonEvent, _onButtonEventListener.bind(this));
    }
}

export { _SubscribeButtonManagerBase };