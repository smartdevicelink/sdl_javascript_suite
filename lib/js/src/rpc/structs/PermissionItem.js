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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - Name of the individual RPC in the policy table.
     * @return {PermissionItem}
     */
    setRpcName (name) {
        this.setParameter(PermissionItem.KEY_RPC_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getRpcName () {
        return this.getParameter(PermissionItem.KEY_RPC_NAME);
    }

    /**
     * @param {HMIPermissions} permissions
     * @return {PermissionItem}
     */
    setHmiPermissions (permissions) {
        this.validateType(HMIPermissions, permissions);
        this.setParameter(PermissionItem.KEY_HMI_PERMISSIONS, permissions);
        return this;
    }

    /**
     * @return {HMIPermissions}
     */
    getHmiPermissions () {
        return this.getObject(HMIPermissions, PermissionItem.KEY_HMI_PERMISSIONS);
    }

    /**
     * @param {ParameterPermissions} permissions
     * @return {PermissionItem}
     */
    setParameterPermissions (permissions) {
        this.validateType(ParameterPermissions, permissions);
        this.setParameter(PermissionItem.KEY_PARAMETER_PERMISSIONS, permissions);
        return this;
    }

    /**
     * @return {ParameterPermissions}
     */
    getParameterPermissions () {
        return this.getObject(ParameterPermissions, PermissionItem.KEY_PARAMETER_PERMISSIONS);
    }

    /**
     * @param {Boolean} encryption
     * @return {PermissionItem}
     */
    setRequireEncryption (encryption) {
        this.setParameter(PermissionItem.KEY_REQUIRE_ENCRYPTION, encryption);
        return this;
    }

    /**
     * @return {Boolean}
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