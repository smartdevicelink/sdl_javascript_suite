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

import { RpcStruct } from '../RpcStruct.js';

class ParameterPermissions extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String[]} allowed - A set of all parameters that are permitted for this given RPC.
     * @return {ParameterPermissions}
     */
    setAllowed (allowed) {
        this.setParameter(ParameterPermissions.KEY_ALLOWED, allowed);
        return this;
    }

    /**
     * @return {String[]}
     */
    getAllowed () {
        return this.getParameter(ParameterPermissions.KEY_ALLOWED);
    }

    /**
     * @param {String[]} disallowed - A set of all parameters that are prohibited for this given RPC.
     * @return {ParameterPermissions}
     */
    setUserDisallowed (disallowed) {
        this.setParameter(ParameterPermissions.KEY_USER_DISALLOWED, disallowed);
        return this;
    }

    /**
     * @return {String[]}
     */
    getUserDisallowed () {
        return this.getParameter(ParameterPermissions.KEY_USER_DISALLOWED);
    }
}

ParameterPermissions.KEY_ALLOWED = 'allowed';
ParameterPermissions.KEY_USER_DISALLOWED = 'userDisallowed';

export { ParameterPermissions };