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
import { ModuleType } from '../enums/ModuleType.js';
import { RpcRequest } from '../RpcRequest.js';

class GetInteriorVehicleDataConsent extends RpcRequest {
    /**
     * Initializes an instance of GetInteriorVehicleDataConsent.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 6.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetInteriorVehicleDataConsent);
    }

    /**
     * Set the ModuleType
     * @param {ModuleType} type - The module type that the app requests to control. - The desired ModuleType.
     * @returns {GetInteriorVehicleDataConsent} - The class instance for method chaining.
     */
    setModuleType (type) {
        this._validateType(ModuleType, type);
        this.setParameter(GetInteriorVehicleDataConsent.KEY_MODULE_TYPE, type);
        return this;
    }

    /**
     * Get the ModuleType
     * @returns {ModuleType} - the KEY_MODULE_TYPE value
     */
    getModuleType () {
        return this.getObject(ModuleType, GetInteriorVehicleDataConsent.KEY_MODULE_TYPE);
    }

    /**
     * Set the ModuleIds
     * @param {String[]} ids - Ids of a module of same type, published by System Capability. - The desired ModuleIds.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {GetInteriorVehicleDataConsent} - The class instance for method chaining.
     */
    setModuleIds (ids) {
        this.setParameter(GetInteriorVehicleDataConsent.KEY_MODULE_IDS, ids);
        return this;
    }

    /**
     * Get the ModuleIds
     * @returns {String[]} - the KEY_MODULE_IDS value
     */
    getModuleIds () {
        return this.getParameter(GetInteriorVehicleDataConsent.KEY_MODULE_IDS);
    }
}

GetInteriorVehicleDataConsent.KEY_MODULE_TYPE = 'moduleType';
GetInteriorVehicleDataConsent.KEY_MODULE_IDS = 'moduleIds';

export { GetInteriorVehicleDataConsent };