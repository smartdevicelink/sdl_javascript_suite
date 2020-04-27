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
import { ModuleType } from '../enums/ModuleType.js';
import { RpcRequest } from '../RpcRequest.js';

class GetInteriorVehicleData extends RpcRequest {
    /**
     * Initalizes an instance of GetInteriorVehicleData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetInteriorVehicleData);
    }

    /**
     * Set the ModuleType
     * @param {ModuleType} type - The type of a RC module to retrieve module data from the vehicle. In the future, this - The desired ModuleType.
     * should be the Identification of a module.
     * @returns {GetInteriorVehicleData} - The class instance for method chaining.
     */
    setModuleType (type) {
        this._validateType(ModuleType, type);
        this.setParameter(GetInteriorVehicleData.KEY_MODULE_TYPE, type);
        return this;
    }

    /**
     * Get the ModuleType
     * @returns {ModuleType} - the KEY_MODULE_TYPE value
     */
    getModuleType () {
        return this.getObject(ModuleType, GetInteriorVehicleData.KEY_MODULE_TYPE);
    }

    /**
     * Set the ModuleId
     * @param {String} id - Id of a module, published by System Capability. - The desired ModuleId.
     * @returns {GetInteriorVehicleData} - The class instance for method chaining.
     */
    setModuleId (id) {
        this.setParameter(GetInteriorVehicleData.KEY_MODULE_ID, id);
        return this;
    }

    /**
     * Get the ModuleId
     * @returns {String} - the KEY_MODULE_ID value
     */
    getModuleId () {
        return this.getParameter(GetInteriorVehicleData.KEY_MODULE_ID);
    }

    /**
     * Set the Subscribe
     * @param {Boolean} subscribe - If subscribe is true, the head unit will register OnInteriorVehicleData - The desired Subscribe.
     * notifications for the requested module (moduleId and moduleType). If subscribe is
     * false, the head unit will unregister OnInteriorVehicleData notifications for the
     * requested module (moduleId and moduleType). If subscribe is not included, the
     * subscription status of the app for the requested module (moduleId and moduleType)
     * will remain unchanged.
     * @returns {GetInteriorVehicleData} - The class instance for method chaining.
     */
    setSubscribe (subscribe) {
        this.setParameter(GetInteriorVehicleData.KEY_SUBSCRIBE, subscribe);
        return this;
    }

    /**
     * Get the Subscribe
     * @returns {Boolean} - the KEY_SUBSCRIBE value
     */
    getSubscribe () {
        return this.getParameter(GetInteriorVehicleData.KEY_SUBSCRIBE);
    }
}

GetInteriorVehicleData.KEY_MODULE_TYPE = 'moduleType';
GetInteriorVehicleData.KEY_MODULE_ID = 'moduleId';
GetInteriorVehicleData.KEY_SUBSCRIBE = 'subscribe';

export { GetInteriorVehicleData };