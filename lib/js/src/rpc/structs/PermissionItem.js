/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { HMIPermissions } from './HMIPermissions.js';
import { ParameterPermissions } from './ParameterPermissions.js';
import { RpcStruct } from '../RpcStruct.js';

class PermissionItem extends RpcStruct {
    /**
     * Initalizes an instance of PermissionItem.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the RpcName
     * @param {String} name - Name of the individual RPC in the policy table. - The desired RpcName.
     * @returns {PermissionItem} - The class instance for method chaining.
     */
    setRpcName (name) {
        this.setParameter(PermissionItem.KEY_RPC_NAME, name);
        return this;
    }

    /**
     * Get the RpcName
     * @returns {String} - the KEY_RPC_NAME value
     */
    getRpcName () {
        return this.getParameter(PermissionItem.KEY_RPC_NAME);
    }

    /**
     * Set the HmiPermissions
     * @param {HMIPermissions} permissions - The desired HmiPermissions.
     * @returns {PermissionItem} - The class instance for method chaining.
     */
    setHmiPermissions (permissions) {
        this._validateType(HMIPermissions, permissions);
        this.setParameter(PermissionItem.KEY_HMI_PERMISSIONS, permissions);
        return this;
    }

    /**
     * Get the HmiPermissions
     * @returns {HMIPermissions} - the KEY_HMI_PERMISSIONS value
     */
    getHmiPermissions () {
        return this.getObject(HMIPermissions, PermissionItem.KEY_HMI_PERMISSIONS);
    }

    /**
     * Set the ParameterPermissions
     * @param {ParameterPermissions} permissions - The desired ParameterPermissions.
     * @returns {PermissionItem} - The class instance for method chaining.
     */
    setParameterPermissions (permissions) {
        this._validateType(ParameterPermissions, permissions);
        this.setParameter(PermissionItem.KEY_PARAMETER_PERMISSIONS, permissions);
        return this;
    }

    /**
     * Get the ParameterPermissions
     * @returns {ParameterPermissions} - the KEY_PARAMETER_PERMISSIONS value
     */
    getParameterPermissions () {
        return this.getObject(ParameterPermissions, PermissionItem.KEY_PARAMETER_PERMISSIONS);
    }

    /**
     * Set the RequireEncryption
     * @param {Boolean} encryption - The desired RequireEncryption.
     * @returns {PermissionItem} - The class instance for method chaining.
     */
    setRequireEncryption (encryption) {
        this.setParameter(PermissionItem.KEY_REQUIRE_ENCRYPTION, encryption);
        return this;
    }

    /**
     * Get the RequireEncryption
     * @returns {Boolean} - the KEY_REQUIRE_ENCRYPTION value
     */
    getRequireEncryption () {
        return this.getParameter(PermissionItem.KEY_REQUIRE_ENCRYPTION);
    }
}

PermissionItem.KEY_RPC_NAME = 'rpcName';
PermissionItem.KEY_HMI_PERMISSIONS = 'hmiPermissions';
PermissionItem.KEY_PARAMETER_PERMISSIONS = 'parameterPermissions';
PermissionItem.KEY_REQUIRE_ENCRYPTION = 'requireEncryption';

export { PermissionItem };