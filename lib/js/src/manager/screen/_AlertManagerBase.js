import { SystemCapabilityType } from '../../rpc/enums/SystemCapabilityType';
import { FunctionID } from '../../rpc/enums/FunctionID';
import { _SubManagerBase }  from '../_SubManagerBase';
import { PermissionElement } from '../permission/PermissionElement';
import { PermissionGroupType } from '../permission/enums/PermissionGroupType';
import { ButtonName } from '../../rpc/enums/ButtonName';
import { _ScreenManagerBase } from './_ScreenManagerBase';
import { _PresentAlertOperation } from './_PresentAlertOperation';

class _AlertManagerBase extends _SubManagerBase {
    constructor (lifecycleManager = null, fileManager = null) {
        super(lifecycleManager);

        const alertCancelIdMin = 20000;

        this._defaultMainWindowCapability = null;
        this._onSpeechCapabilityListener = null;
        this._speechCapabilities = [];
        this._permissionListener = null;
        this._currentAlertPermissionStatus = false;
        this._fileManager = fileManager;
        this._nextCancelId = alertCancelIdMin;
        this._softButtonObjects = [];
    }

    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    dispose () {
        this._defaultMainWindowCapability = null;
        this._speechCapabilities = null;
        this._currentAlertPermissionStatus = false;
        this._softButtonObjects = null;

        this._handleTaskQueue();

        if (this._lifecycleManager.getSystemCapabilityManager() !== null) {
            this._lifecycleManager.getSystemCapabilityManager().removeOnSystemCapabilityListener(SystemCapabilityType.SPEECH, this._onSpeechCapabilityListener.bind(this));
        }

        if (this._lifecycleManager.getPermissionManager() !== null) {
            this._lifecycleManager.getPermissionManager().removeListener(this._permissionListener);
        }

        this._lifecycleManager.getSystemCapabilityManager().removeRpcListener(FunctionID.OnButtonPress, this._onButtonPressListener.bind(this));
        this._lifecycleManager.getSystemCapabilityManager().removeRpcListener(FunctionID.OnButtonEvent, this._onButtonEventListener.bind(this));

        super.dispose();
    }

    async presentAlert (alert) {
        if (this._getState() === _SubManagerBase.ERROR) {
            console.log('AlertManager In Error State');
        }

        if (alert.getSoftButtons() !== null) {
            if (!_ScreenManagerBase.checkAndAssignButtonIds(alert.getSoftButtons(), _ScreenManagerBase._ManagerLocation.ALERT_MANAGER)) {
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
                    // huhhh
                }
            } else {
                this._softButtonObjects = softButtonObjects;
            }
        }
        const operation = new _PresentAlertOperation(this._lifecycleManager, alert, this._defaultMainWindowCapability, this._speechCapabilities, this._fileManager, this._nextCancelId++, this._listener);
        this._addTask(operation);
    }

    _getSoftButtonsObjects () {
        return this._softButtonObjects;
    }

    _getSoftButtonObjectById (buttonId) {
        for (const softButtonObject of this._softButtonObjects) {
            if (softButtonObject.getButtonID() === buttonId) {
                return softButtonObject;
            }
        }
        return null;
    }

    async _addListeners () {
        if (this._lifecycleManager.getSystemCapabilityManager() !== null) {
            this._speechCapabilities = await this._lifecycleManager.getSystemCapabilityManager().updateCapability(SystemCapabilityType.SPEECH).catch(info => {});
        }

        if (this._lifecycleManager.getSystemCapabilityManager() !== null) {
            this._displayCapabilities = await this._lifecycleManager.getSystemCapabilityManager().updateCapability(SystemCapabilityType.DISPLAYS).catch(info => {
                console.log('Display Capability cannot be retrieved');
                this._defaultMainWindowCapability = null;
            });
        }

        const alertPermissionElement = new PermissionElement(FunctionID.ALERT);
        this._permissionListener = this._lifecycleManager.getPermissionManager()
            .addListener(
                [alertPermissionElement],
                PermissionGroupType.ANY,
                (allowedPermissions, permissionGroupStatus) => {
                    if (allowedPermissions[FunctionID.ALERT] !== null) {
                        this._currentAlertPermissionStatus = allowedPermissions[FunctionID.ALERT].getIsRpcAllowed();
                    } else {
                        this._currentAlertPermissionStatus = false;
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