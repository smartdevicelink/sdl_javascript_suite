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

import { SubManagerBase } from '../SubManagerBase.js';
import { PermissionFilter } from './PermissionFilter.js';
import { PermissionGroupType } from './enums/PermissionGroupType.js';
import { PermissionGroupStatus } from './enums/PermissionGroupStatus.js';
import { PermissionStatus } from './PermissionStatus.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { PredefinedWindows } from '../../rpc/enums/PredefinedWindows.js';

class PermissionManagerBase extends SubManagerBase {
    constructor (lifecycleManager) {
        super(lifecycleManager);
        this._currentHmiLevel = null;
        this._currentPermissionItems = {}; // a key:value store of FunctionId permissions
        this._encryptionRequiredRpcs = []; // an array of FunctionIDs which require encryption
        this._filters = [];

        this._onHMIStatusListener = (notification) => {
            if (notification.getWindowID() !== null && notification.getWindowID() !== PredefinedWindows.DEFAULT_WINDOW) {
                return;
            }
            const previousHmiLevel = this._currentHmiLevel;
            this._currentHmiLevel = notification.getHmiLevel();
            this._checkState();
            this._notifyListeners(this._currentPermissionItems, previousHmiLevel, this._currentPermissionItems, this._currentHmiLevel);
        };
        this._lifecycleManager.addRpcListener(FunctionID.OnHMIStatus, this._onHMIStatusListener);

        this._onPermissionsChangeListener = (notification) => {
            const permissionItems = notification.getPermissionItem();
            const previousPermissionItems = JSON.parse(JSON.stringify(this._currentPermissionItems));
            const requireEncryptionAppLevel = notification.getRequireEncryption();

            // clear the entire _encryptionRequiredRpcs array to be repopulated
            this._encryptionRequiredRpcs.splice(0, this._encryptionRequiredRpcs.length);

            this._currentPermissionItems = {};
            if (Array.isArray(permissionItems) && permissionItems.length > 0) {
                for (const permissionItem of permissionItems) {
                    const functionId = FunctionID.valueForKey(permissionItem.getRpcName());
                    if (functionId !== null) {
                        this._currentPermissionItems[functionId] = permissionItem;
                    }
                    if (permissionItem.getRequireEncryption()) {
                        if (requireEncryptionAppLevel === null || requireEncryptionAppLevel) {
                            const rpcName = permissionItem.getRpcName();
                            if (rpcName !== null) {
                                this._encryptionRequiredRpcs.push(rpcName);
                            }
                        }
                    }
                }
            }
            this._notifyListeners(previousPermissionItems, this._currentHmiLevel, this._currentPermissionItems, this._currentHmiLevel);
        };
        this._lifecycleManager.addRpcListener(FunctionID.OnPermissionsChange, this._onPermissionsChangeListener);
    }

    async start () {
        await super.start();
        this._checkState();
        return Promise.resolve(this.getState() === SubManagerBase.READY || this.getState() === SubManagerBase.LIMITED);
    }

    /**
     * Checks if an RPC requires encryption
     *
     * @param {Number} functionId - the RPC's FunctionID to check
     * @return {Boolean} - true if the given RPC requires encryption; false, otherwise
     */
    getRpcRequiresEncryption (functionId) {
        return this._encryptionRequiredRpcs.includes(functionId);
    }

    /**
     * Gets the encryption requirement
     * @return {Boolean} - true if encryption is required; false otherwise
     */
    getRequiresEncryption () {
        return this._encryptionRequiredRpcs.length > 0;
    }

    /**
     * Transition to READY state if the conditions are appropriate
     * @private
     */
    _checkState () {
        if (this.getState() === SubManagerBase.SETTING_UP && this._currentHmiLevel !== null) {
            this._transitionToState(SubManagerBase.READY);
        }
    }

    /**
     * Go over all developer's listeners and call them if needed because of HMI level change or permission items change
     * @private
     * @param {PermissionItem[]} previousPermissionItems
     * @param {HmiLevel} previousHmiLevel
     * @param {PermissionItem[]} currentPermissionItems
     * @param {HmiLevel} currentHMILevel
     * @return {PermissionManagerBase}
     */
    _notifyListeners (previousPermissionItems, previousHmiLevel, currentPermissionItems, currentHmiLevel) {
        for (const filter of this._filters) {
            let anyChange = false;
            let allWereAllowed = true;
            let allNowAllowed = true;
            for (const permissionElement of filter.getPermissionElements()) {
                if (anyChange && !allWereAllowed && !allNowAllowed) {
                    break;
                }

                const rpcWasAllowed = this._isRpcAllowed(permissionElement.getRpcId(), previousPermissionItems, previousHmiLevel);
                const rpcNowAllowed = this._isRpcAllowed(permissionElement.getRpcId(), currentPermissionItems, currentHmiLevel);

                if (rpcWasAllowed !== rpcNowAllowed) {
                    anyChange = true;
                }
                if (!rpcWasAllowed) {
                    allWereAllowed = false;
                }
                if (!rpcNowAllowed) {
                    allNowAllowed = false;
                }

                if (permissionElement.getParameters() !== null && permissionElement.getParameters().length > 0) {
                    for (const parameter of permissionElement.getParameters()) {
                        const parameterWasAllowed = this._isPermissionParameterAllowed(permissionElement.getRpcId(), parameter, previousPermissionItems, previousHmiLevel);
                        const parameterNowAllowed = this._isPermissionParameterAllowed(permissionElement.getRpcId(), parameter, currentPermissionItems, currentHmiLevel);

                        if (parameterWasAllowed !== parameterNowAllowed) {
                            anyChange = true;
                        }
                        if (!parameterWasAllowed) {
                            allWereAllowed = false;
                        }
                        if (!parameterNowAllowed) {
                            allNowAllowed = false;
                        }
                    }
                }
            }

            if (
                (filter.getGroupType() === PermissionGroupType.ALL_ALLOWED && anyChange && (allWereAllowed || allNowAllowed))
                || (filter.getGroupType() === PermissionGroupType.ANY && anyChange)
            ) {
                this._notifyListener(filter);
            }

            return this;
        }
    }

    /**
     * Determine if an individual RPC is allowed
     * @private
     * @param {Number} functionId - FunctionID value that represents the name of the RPC
     * @param {Object} permissionItems - key-val object containing HMI and parameter permissions for a specific RPC
     * @param {HmiLevel} hmiLevel - if the RPC is allowed at that HMI Level. Ex: None or Full
     * @return {Boolean} whether the RPC is allowed or not
     */
    _isRpcAllowed (functionId, permissionItems, hmiLevel) {
        const permissionItem = permissionItems[functionId];
        if (hmiLevel === null || permissionItem === undefined || permissionItem.getHmiPermissions() === null || permissionItem.getHmiPermissions().getAllowed() === null) {
            return false;
        } else if (permissionItem.getHmiPermissions().getUserDisallowed() !== null) {
            return permissionItem.getHmiPermissions().getAllowed().includes(hmiLevel) && !permissionItem.getHmiPermissions().getUserDisallowed().includes(hmiLevel);
        } else {
            return permissionItem.getHmiPermissions().getAllowed().includes(hmiLevel);
        }
    }

    /**
     * Determine if an individual RPC is allowed in the context of the current HMI level and permissions
     * @param {Number} functionId - FunctionID value that represents the ID of the RPC
     * @return {Boolean} whether the RPC is allowed or not
     */
    isRpcAllowed (functionId) {
        return this._isRpcAllowed(functionId, this._currentPermissionItems, this._currentHmiLevel);
    }

    /**
     * Determine if an individual permission parameter is allowed
     * @private
     * @param {FunctionID} functionId - The ID of the RPC
     * @param {String} parameter - A parameter for the RPC. Ex: "rpm" or "speed" for GetVehicleData
     * @param {Object} permissionItems - key-val object containing HMI and parameter permissions for a specific RPC
     * @param {HmiLevel} hmiLevel - The desired HMI Level. Ex: None or Full
     * @return {Boolean} boolean represents whether the permission parameter is allowed or not
     */
    _isPermissionParameterAllowed (functionId, parameter, permissionItems, hmiLevel) {
        const permissionItem = permissionItems[functionId];
        if (permissionItem === undefined || !this._isRpcAllowed(functionId, permissionItems, hmiLevel) || permissionItem.getParameterPermissions() === null || permissionItem.getParameterPermissions().getAllowed() === null) {
            return false;
        } else if (permissionItem.getParameterPermissions().getUserDisallowed() !== null) {
            return permissionItem.getParameterPermissions().getAllowed().includes(parameter) && !permissionItem.getParameterPermissions().getUserDisallowed().includes(parameter);
        } else {
            return permissionItem.getParameterPermissions().getAllowed().includes(parameter);
        }
    }

    /**
     * Determine if an individual permission parameter is allowed in the context of the current HMI level and permissions
     * @param {FunctionID} functionId - The ID of the RPC
     * @param {String} parameter - A parameter for the RPC. Ex: "rpm" or "speed" for GetVehicleData
     * @return {Boolean} boolean represents whether the permission parameter is allowed or not
     */
    isPermissionParameterAllowed (functionId, parameter) {
        return this._isPermissionParameterAllowed(functionId, parameter, this._currentPermissionItems, this._currentHmiLevel);
    }

    /**
     * Clean up everything after the manager is no longer needed
     * @return {PermissionManagerBase}
     */
    dispose () {
        super.dispose();

        // remove the HMI Status Listener
        this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._onHMIStatusListener);
        this._onHMIStatusListener = null;

        // remove Permission Changed listener
        this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._onPermissionsChangeListener);
        this._onPermissionsChangeListener = null;

        // remove developer's listeners
        this._filters.splice(0, this._filters.length);

        return this;
    }

    /**
     * Determine if a group of permissions is allowed for the current HMI level
     * @param {PermissionElement[]} permissionElements - An array of PermissionElement that represents the RPC names and their parameters
     * @return {Number} An integer value that gives an overall view whether the permissions are allowed or not
     */
    getGroupStatusOfPermissions (permissionElements) {
        if (this._currentHmiLevel === null) {
            return PermissionGroupStatus.UNKNOWN;
        }

        let hasAllowed = false;
        let hasDisallowed = false;

        for (const permissionElement of permissionElements) {
            if (hasAllowed && hasDisallowed) {
                return PermissionGroupStatus.MIXED;
            } else if (permissionElement === null) {
                continue;
            } else if (!this.isRpcAllowed(permissionElement.getRpcId())) {
                hasDisallowed = true;
            } else if (permissionElement.getParameters() === null || permissionElement.getParameters().length === 0) {
                hasAllowed = true;
            } else {
                for (const permissionParameter of permissionElement.getParameters()) {
                    if (this.isPermissionParameterAllowed(permissionElement.getRpcId(), permissionParameter)) {
                        hasAllowed = true;
                    } else {
                        hasDisallowed = true;
                    }
                }
            }
        }

        if (!hasAllowed && !hasDisallowed) {
            return PermissionGroupStatus.ALLOWED;
        } else if (hasAllowed && hasDisallowed) {
            return PermissionGroupStatus.MIXED;
        } else if (hasAllowed) {
            return PermissionGroupStatus.ALLOWED;
        } else {
            return PermissionGroupStatus.DISALLOWED;
        }
    }

    /**
     * Determine if a group of permissions is allowed for the current HMI level
     * @param {PermissionElement[]} permissionElements - An array of PermissionElement that represents the RPC names and their parameters
     * @return {Object} A key-value map with RPC Ids as keys and a PermissionStatus object (or null) as the value
     */
    getStatusOfPermissions (permissionElements) {
        const statusOfPermissions = {};
        for (const permissionElement of permissionElements) {
            if (permissionElement === null) {
                continue;
            }
            let allowedParameters = null;
            if (permissionElement.getParameters() !== null && permissionElement.getParameters().length > 0) {
                allowedParameters = {};
                for (const permissionParameter of permissionElement.getParameters()) {
                    allowedParameters[permissionParameter] = this.isPermissionParameterAllowed(permissionElement.getRpcId(), permissionParameter);
                }
            }
            const permissionStatus = new PermissionStatus(
                permissionElement.getRpcId(),
                this.isRpcAllowed(permissionElement.getRpcId()),
                allowedParameters
            );
            statusOfPermissions[permissionElement.getRpcId()] = permissionStatus;
        }
        return statusOfPermissions;
    }

    /**
     * Call the listener of a specific PermissionFilter
     * @private
     * @param {PermissionFilter} permissionFilter - The PermissionFilter to invoke
     * @return {PermissionManagerBase}
     */
    _notifyListener (permissionFilter) {
        const permissionGroupStatus = this.getGroupStatusOfPermissions(permissionFilter.getPermissionElements());
        const allowedPermissions = this.getStatusOfPermissions(permissionFilter.getPermissionElements());
        permissionFilter.onListener(allowedPermissions, permissionGroupStatus);
        return this;
    }

    /**
     * Add a listener to be called when there is permissions change
     * @param {PermissionElement[]} permissionElements - An array of PermissionElement that represents the RPC IDs and their parameters
     * @param {Number} groupType PermissionGroupType int value represents whether we need the listener to be called when there is any permissions change or only when all permission become allowed
     * @param {function} listener - A function to be invoked upon permission change: function(Object<FunctionID, PermissionStatus>, PermissionGroupStatus)
     * @return {String} A UUID for the Permission Filter listener. It can be used to remove the listener later.
     */
    addListener (permissionElements, groupType, listener) {
        const filter = new PermissionFilter(null, permissionElements, groupType, listener);
        this._filters.push(filter);
        return filter.getId();
    }

    /**
     * Removes specific listener
     * @param {String} filterUuid - The UUID of the listener to be removed
     * @return {PermissionManagerBase}
     */
    removeListener (filterUuid) {
        for (let index = 0; index < this._filters.length; index++) {
            if (this._filters[index].getId() === filterUuid) {
                this._filters.splice(index, 1);
                break;
            }
        }
        return this;
    }
}

export { PermissionManagerBase };