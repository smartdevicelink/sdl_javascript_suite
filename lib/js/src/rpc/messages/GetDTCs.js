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
import { RpcRequest } from '../RpcRequest.js';

/**
 * Vehicle module diagnostic trouble code request.
 */
class GetDTCs extends RpcRequest {
    /**
     * Initalizes an instance of GetDTCs.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetDTCs);
    }

    /**
     * Set the EcuName
     * @param {Number} name - Name of ECU. - The desired EcuName.
     * {'num_min_value': 0, 'num_max_value': 65535}
     * @returns {GetDTCs} - The class instance for method chaining.
     */
    setEcuName (name) {
        this.setParameter(GetDTCs.KEY_ECU_NAME, name);
        return this;
    }

    /**
     * Get the EcuName
     * @returns {Number} - the KEY_ECU_NAME value
     */
    getEcuName () {
        return this.getParameter(GetDTCs.KEY_ECU_NAME);
    }

    /**
     * Set the DtcMask
     * @param {Number} mask - DTC Mask Byte to be sent in diagnostic request to module . - The desired DtcMask.
     * {'num_min_value': 0, 'num_max_value': 255}
     * @returns {GetDTCs} - The class instance for method chaining.
     */
    setDtcMask (mask) {
        this.setParameter(GetDTCs.KEY_DTC_MASK, mask);
        return this;
    }

    /**
     * Get the DtcMask
     * @returns {Number} - the KEY_DTC_MASK value
     */
    getDtcMask () {
        return this.getParameter(GetDTCs.KEY_DTC_MASK);
    }
}

GetDTCs.KEY_ECU_NAME = 'ecuName';
GetDTCs.KEY_DTC_MASK = 'dtcMask';

export { GetDTCs };