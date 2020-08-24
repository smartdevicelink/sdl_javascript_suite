import _SubManagerBase from '../_SubManagerBase.js';
import SubscribeButton from '../../rpc/messages/SubscribeButton';
import UnsubscribeButton from '../../rpc/messages/UnsubscribeButton';
import OnButtonPress from '../../rpc/messages/OnButtonPress';
import OnButtonEvent from '../../rpc/messages/OnButtonEvent';
import FunctionID from '../../rpc/enums/FunctionID';

class _SubscribeButtonMangerBase extends _SubManagerBase {
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this.setRpcNotificationListeners();
        this._onButtonListeners = {};
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
            this._onButtonListeners = null;
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
        const subscribeButton = new SubscribeButton().setRpcNotificationListeners(listener);
        const response = await this._lifecycleManager.sendRpcResolve(subscribeButton);
        if (response.getSuccess()) {
            this._onButtonListeners[buttonName] = listener;
            return;
        }
        // error
    }

    async _unsubscribeButtonRequest (buttonName, listener) {
        const unsubscribeButton = new UnsubscribeButton().setRpcNotificationListeners(listener);
        const response = await this._lifecycleManager.sendRpcResolve(unsubscribeButton);
        if (response.getSuccess()) {
            // this._onButtonListeners[buttonName] = listener;
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

export { _SubscribeButtonMangerBase };