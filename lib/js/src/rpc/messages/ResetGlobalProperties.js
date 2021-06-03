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
import { GlobalProperty } from '../enums/GlobalProperty.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * Allows resetting global properties.
 */
class ResetGlobalProperties extends RpcRequest {
    /**
     * Initializes an instance of ResetGlobalProperties.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.ResetGlobalProperties);
    }

    /**
     * Set the Properties
     * @param {GlobalProperty[]} properties - Contains the names of all global properties (like timeoutPrompt) that should be unset. Resetting means, that they have the same value as at start up (default) - The desired Properties.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {ResetGlobalProperties} - The class instance for method chaining.
     */
    setProperties (properties) {
        this._validateType(GlobalProperty, properties, true);
        this.setParameter(ResetGlobalProperties.KEY_PROPERTIES, properties);
        return this;
    }

    /**
     * Get the Properties
     * @returns {GlobalProperty[]} - the KEY_PROPERTIES value
     */
    getProperties () {
        return this.getObject(GlobalProperty, ResetGlobalProperties.KEY_PROPERTIES);
    }
}

ResetGlobalProperties.KEY_PROPERTIES = 'properties';

export { ResetGlobalProperties };