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

import { AppCapability } from '../structs/AppCapability.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * A notification to inform SDL Core that a specific app capability has changed.
 */
class OnAppCapabilityUpdated extends RpcNotification {
    /**
     * Initalizes an instance of OnAppCapabilityUpdated.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.OnAppCapabilityUpdated);
    }

    /**
     * Set the AppCapability
     * @param {AppCapability} capability - The app capability that has been updated - The desired AppCapability.
     * @returns {OnAppCapabilityUpdated} - The class instance for method chaining.
     */
    setAppCapability (capability) {
        this._validateType(AppCapability, capability);
        this.setParameter(OnAppCapabilityUpdated.KEY_APP_CAPABILITY, capability);
        return this;
    }

    /**
     * Get the AppCapability
     * @returns {AppCapability} - the KEY_APP_CAPABILITY value
     */
    getAppCapability () {
        return this.getObject(AppCapability, OnAppCapabilityUpdated.KEY_APP_CAPABILITY);
    }
}

OnAppCapabilityUpdated.KEY_APP_CAPABILITY = 'appCapability';

export { OnAppCapabilityUpdated };