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
import { VehicleDataResultCode } from '../enums/VehicleDataResultCode.js';

/**
 * Individual requested DID result and data
 */
class DIDResult extends RpcStruct {
    /**
     * Initalizes an instance of DIDResult.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ResultCodeParam
     * @param {VehicleDataResultCode} code - Individual DID result code. - The desired ResultCodeParam.
     * @returns {DIDResult} - The class instance for method chaining.
     */
    setResultCodeParam (code) {
        this._validateType(VehicleDataResultCode, code);
        this.setParameter(DIDResult.KEY_RESULT_CODE_PARAM, code);
        return this;
    }

    /**
     * Get the ResultCodeParam
     * @returns {VehicleDataResultCode} - the KEY_RESULT_CODE_PARAM value
     */
    getResultCodeParam () {
        return this.getObject(VehicleDataResultCode, DIDResult.KEY_RESULT_CODE_PARAM);
    }

    /**
     * Set the DidLocation
     * @param {Number} location - Location of raw data from vehicle data DID - The desired DidLocation.
     * @returns {DIDResult} - The class instance for method chaining.
     */
    setDidLocation (location) {
        this.setParameter(DIDResult.KEY_DID_LOCATION, location);
        return this;
    }

    /**
     * Get the DidLocation
     * @returns {Number} - the KEY_DID_LOCATION value
     */
    getDidLocation () {
        return this.getParameter(DIDResult.KEY_DID_LOCATION);
    }

    /**
     * Set the Data
     * @param {String} data - Raw DID-based data returned for requested element. - The desired Data.
     * @returns {DIDResult} - The class instance for method chaining.
     */
    setData (data) {
        this.setParameter(DIDResult.KEY_DATA, data);
        return this;
    }

    /**
     * Get the Data
     * @returns {String} - the KEY_DATA value
     */
    getData () {
        return this.getParameter(DIDResult.KEY_DATA);
    }
}

DIDResult.KEY_RESULT_CODE_PARAM = 'resultCode';
DIDResult.KEY_DID_LOCATION = 'didLocation';
DIDResult.KEY_DATA = 'data';

export { DIDResult };