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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';
import { SystemCapabilityType } from '../enums/SystemCapabilityType.js';

/**
 * Request for expanded information about a supported system/HMI capability
 */
class GetSystemCapability extends RpcRequest {
    /**
     * Initializes an instance of GetSystemCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.5.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetSystemCapability);
    }

    /**
     * Set the SystemCapabilityType
     * @param {SystemCapabilityType} type - The type of system capability to get more information on - The desired SystemCapabilityType.
     * @returns {GetSystemCapability} - The class instance for method chaining.
     */
    setSystemCapabilityType (type) {
        this._validateType(SystemCapabilityType, type);
        this.setParameter(GetSystemCapability.KEY_SYSTEM_CAPABILITY_TYPE, type);
        return this;
    }

    /**
     * Get the SystemCapabilityType
     * @returns {SystemCapabilityType} - the KEY_SYSTEM_CAPABILITY_TYPE value
     */
    getSystemCapabilityType () {
        return this.getObject(SystemCapabilityType, GetSystemCapability.KEY_SYSTEM_CAPABILITY_TYPE);
    }

    /**
     * Set the Subscribe
     * @since SmartDeviceLink 5.1.0
     * @param {Boolean} subscribe - Flag to subscribe to updates of the supplied service capability type. If true, the requester will be subscribed. If false, the requester will not be subscribed and be removed as a subscriber if it was previously subscribed. - The desired Subscribe.
     * @returns {GetSystemCapability} - The class instance for method chaining.
     */
    setSubscribe (subscribe) {
        this.setParameter(GetSystemCapability.KEY_SUBSCRIBE, subscribe);
        return this;
    }

    /**
     * Get the Subscribe
     * @returns {Boolean} - the KEY_SUBSCRIBE value
     */
    getSubscribe () {
        return this.getParameter(GetSystemCapability.KEY_SUBSCRIBE);
    }
}

GetSystemCapability.KEY_SYSTEM_CAPABILITY_TYPE = 'systemCapabilityType';
GetSystemCapability.KEY_SUBSCRIBE = 'subscribe';

export { GetSystemCapability };