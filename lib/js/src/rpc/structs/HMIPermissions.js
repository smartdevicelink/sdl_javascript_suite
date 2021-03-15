/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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

import { HMILevel } from '../enums/HMILevel.js';
import { RpcStruct } from '../RpcStruct.js';

class HMIPermissions extends RpcStruct {
    /**
     * Initializes an instance of HMIPermissions.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Allowed
     * @param {HMILevel[]} allowed - A set of all HMI levels that are permitted for this given RPC. - The desired Allowed.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {HMIPermissions} - The class instance for method chaining.
     */
    setAllowed (allowed) {
        this._validateType(HMILevel, allowed, true);
        this.setParameter(HMIPermissions.KEY_ALLOWED, allowed);
        return this;
    }

    /**
     * Get the Allowed
     * @returns {HMILevel[]} - the KEY_ALLOWED value
     */
    getAllowed () {
        return this.getObject(HMILevel, HMIPermissions.KEY_ALLOWED);
    }

    /**
     * Set the UserDisallowed
     * @param {HMILevel[]} disallowed - A set of all HMI levels that are prohibited for this given RPC. - The desired UserDisallowed.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {HMIPermissions} - The class instance for method chaining.
     */
    setUserDisallowed (disallowed) {
        this._validateType(HMILevel, disallowed, true);
        this.setParameter(HMIPermissions.KEY_USER_DISALLOWED, disallowed);
        return this;
    }

    /**
     * Get the UserDisallowed
     * @returns {HMILevel[]} - the KEY_USER_DISALLOWED value
     */
    getUserDisallowed () {
        return this.getObject(HMILevel, HMIPermissions.KEY_USER_DISALLOWED);
    }
}

HMIPermissions.KEY_ALLOWED = 'allowed';
HMIPermissions.KEY_USER_DISALLOWED = 'userDisallowed';

export { HMIPermissions };