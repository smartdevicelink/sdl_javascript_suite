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

import { FunctionID } from '../enums/FunctionID.js';
import { PermissionItem } from '../structs/PermissionItem.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * Provides update to app of which policy-table-enabled functions are available
 */
class OnPermissionsChange extends RpcNotification {
    /**
     * Initalizes an instance of OnPermissionsChange.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnPermissionsChange);
    }

    /**
     * Set the PermissionItem
     * @param {PermissionItem[]} item - Change in permissions for a given set of RPCs - The desired PermissionItem.
     * @returns {OnPermissionsChange} - The class instance for method chaining.
     */
    setPermissionItem (item) {
        this.validateType(PermissionItem, item, true);
        this.setParameter(OnPermissionsChange.KEY_PERMISSION_ITEM, item);
        return this;
    }

    /**
     * Get the PermissionItem
     * @returns {PermissionItem[]} - the KEY_PERMISSION_ITEM value
     */
    getPermissionItem () {
        return this.getObject(PermissionItem, OnPermissionsChange.KEY_PERMISSION_ITEM);
    }

    /**
     * Set the RequireEncryption
     * @param {Boolean} encryption - The desired RequireEncryption.
     * @returns {OnPermissionsChange} - The class instance for method chaining.
     */
    setRequireEncryption (encryption) {
        this.setParameter(OnPermissionsChange.KEY_REQUIRE_ENCRYPTION, encryption);
        return this;
    }

    /**
     * Get the RequireEncryption
     * @returns {Boolean} - the KEY_REQUIRE_ENCRYPTION value
     */
    getRequireEncryption () {
        return this.getParameter(OnPermissionsChange.KEY_REQUIRE_ENCRYPTION);
    }
}

OnPermissionsChange.KEY_PERMISSION_ITEM = 'permissionItem';
OnPermissionsChange.KEY_REQUIRE_ENCRYPTION = 'requireEncryption';

export { OnPermissionsChange };