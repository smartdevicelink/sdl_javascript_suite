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
import { RpcResponse } from '../RpcResponse.js';

class GetDTCsResponse extends RpcResponse {
    /**
     * Initalizes an instance of GetDTCsResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.GetDTCs);
    }

    /**
     * Set the EcuHeader
     * @param {Number} header - 2 byte ECU Header for DTC response (as defined in VHR_Layout_Specification_DTCs.pdf) - The desired EcuHeader.
     * {'num_min_value': 0, 'num_max_value': 65535}
     * @returns {GetDTCsResponse} - The class instance for method chaining.
     */
    setEcuHeader (header) {
        this.setParameter(GetDTCsResponse.KEY_ECU_HEADER, header);
        return this;
    }

    /**
     * Get the EcuHeader
     * @returns {Number} - the KEY_ECU_HEADER value
     */
    getEcuHeader () {
        return this.getParameter(GetDTCsResponse.KEY_ECU_HEADER);
    }

    /**
     * Set the Dtc
     * @param {String[]} dtc - Array of all reported DTCs on module (ecuHeader contains information if list is truncated). Each DTC is represented by 4 bytes (3 bytes of data and 1 byte status as defined in VHR_Layout_Specification_DTCs.pdf). - The desired Dtc.
     * {'array_min_size': 1, 'array_max_size': 15, 'string_min_length': 1, 'string_max_length': 10}
     * @returns {GetDTCsResponse} - The class instance for method chaining.
     */
    setDtc (dtc) {
        this.setParameter(GetDTCsResponse.KEY_DTC, dtc);
        return this;
    }

    /**
     * Get the Dtc
     * @returns {String[]} - the KEY_DTC value
     */
    getDtc () {
        return this.getParameter(GetDTCsResponse.KEY_DTC);
    }
}

GetDTCsResponse.KEY_ECU_HEADER = 'ecuHeader';
GetDTCsResponse.KEY_DTC = 'dtc';

export { GetDTCsResponse };