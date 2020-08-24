import { _SubManagerBase } from '../_SubManagerBase.js';
import { SubscribeButton } from '../../rpc/messages/SubscribeButton';
import { UnsubscribeButton } from '../../rpc/messages/UnsubscribeButton';
import { OnButtonPress } from '../../rpc/messages/OnButtonPress';
import { OnButtonEvent } from '../../rpc/messages/OnButtonEvent';
import { FunctionID } from '../../rpc/enums/FunctionID';
import { _ArrayTools } from '../../util/_ArrayTools';

class _SubscribeButtonManagerBase extends _SubManagerBase {
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this.setRpcNotificationListeners();
        this._onButtonListeners = new Map();
        this._onButtonPressListener = null;
        this._onButtonEventListener = null;
    }

    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    dispose () {
        super.dispose();
        if (this._onButtonListeners !== null) {
            this._onButtonListeners.splice(0, this._onButtonListeners.length);
        }
        this._lifecycleManager.removeRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);
        this._lifecycleManager.removeRpcListener(FunctionID.onButtonEvent, this._onButtonEventListener);
    }

    _addButtonListener (buttonName, listener) {
        if (listener === null || listener === undefined || buttonName === null || buttonName === undefined) {
            // error, look into how the other managers handle this
            return;
        }

        if (this._onButtonListeners[buttonName] === null || this._onButtonListeners[buttonName] === undefined) {
            this._subscribeButtonRequest(buttonName, listener);
        }
    }

    _removeButtonListener (buttonName, listener) {
        if (listener === null || listener === undefined || buttonName === null || buttonName === undefined) {
            // error, look into how the other managers handle this            
            return;
        }

        if (this._onButtonListeners[buttonName] === null || this._onButtonListeners === undefined || !this._onButtonListeners[buttonName].includes(listener)) {
            return;
        }
        this._unsubscribeButtonRequest(buttonName, listener);
    }

    async _subscribeButtonRequest (buttonName, listener) {
        const subscribeButton = new SubscribeButton();
        const response = await this._lifecycleManager.sendRpcResolve(subscribeButton);
        if (response.getSuccess()) {
            this._onButtonListeners[buttonName].push(listener);
            return;
        }
        // error
    }

    async _unsubscribeButtonRequest (buttonName, listener) {
        const unsubscribeButton = new UnsubscribeButton();
        const response = await this._lifecycleManager.sendRpcResolve(unsubscribeButton);
        if (response.getSuccess()) {
            const listenerArray = this._onButtonListeners.get(buttonName);
            if (Array.isArray(listenerArray)) {
                this._onButtonListeners.set(buttonName, _ArrayTools.arrayRemove(listenerArray, listener));
            }
            return;
        }
        // error
    }

    setRpcNotificationListeners () {
        this._onButtonPressListener = function (onButtonPress) {
            if (onButtonPress instanceof OnButtonPress) {
                const listeners = this._onButtonListener[onButtonPress.getButtonName()];
                if (listeners !== null && listeners !== undefined && listeners.length > 0) {
                    for (const listener in listeners) {
                        listener(onButtonPress.getButtonName(), onButtonPress);
                    }
                }
            }
        };
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener);

        this._onButtonEventListener = function (onButtonEvent) {
            if (onButtonEvent instanceof OnButtonEvent) {
                const listeners = this._onButtonListener[onButtonEvent.getButtonName()];
                if (listeners !== null && listeners !== undefined && listeners.length > 0) {
                    for (const listener in listeners) {
                        listener(onButtonEvent.getButtonName(), onButtonEvent);
                    }
                }
            }
        };
        this._lifecycleManager.addRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener);
    }
}

export { _SubscribeButtonManagerBase };