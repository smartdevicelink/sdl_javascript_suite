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
import { ModuleData } from '../structs/ModuleData.js';
import { RpcResponse } from '../RpcResponse.js';

class GetInteriorVehicleDataResponse extends RpcResponse {
    /**
     * Initalizes an instance of GetInteriorVehicleDataResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetInteriorVehicleData);
    }

    /**
     * Set the ModuleData
     * @param {ModuleData} data - The moduleType indicates which type of data should be changed and identifies which data object exists in this struct. For example, if the moduleType is CLIMATE then a "climateControlData" should exist - The desired ModuleData.
     * @returns {GetInteriorVehicleDataResponse} - The class instance for method chaining.
     */
    setModuleData (data) {
        this._validateType(ModuleData, data);
        this.setParameter(GetInteriorVehicleDataResponse.KEY_MODULE_DATA, data);
        return this;
    }

    /**
     * Get the ModuleData
     * @returns {ModuleData} - the KEY_MODULE_DATA value
     */
    getModuleData () {
        return this.getObject(ModuleData, GetInteriorVehicleDataResponse.KEY_MODULE_DATA);
    }

    /**
     * Set the IsSubscribed
     * @param {Boolean} subscribed - It is a conditional-mandatory parameter: must be returned in case "subscribe" parameter was present in the related request. if "true" - the "moduleType" from request is successfully subscribed and the head unit will send onInteriorVehicleData notifications for the moduleType. if "false" - the "moduleType" from request is either unsubscribed or failed to subscribe. - The desired IsSubscribed.
     * @returns {GetInteriorVehicleDataResponse} - The class instance for method chaining.
     */
    setIsSubscribed (subscribed) {
        this.setParameter(GetInteriorVehicleDataResponse.KEY_IS_SUBSCRIBED, subscribed);
        return this;
    }

    /**
     * Get the IsSubscribed
     * @returns {Boolean} - the KEY_IS_SUBSCRIBED value
     */
    getIsSubscribed () {
        return this.getParameter(GetInteriorVehicleDataResponse.KEY_IS_SUBSCRIBED);
    }
}

GetInteriorVehicleDataResponse.KEY_MODULE_DATA = 'moduleData';
GetInteriorVehicleDataResponse.KEY_IS_SUBSCRIBED = 'isSubscribed';

export { GetInteriorVehicleDataResponse };