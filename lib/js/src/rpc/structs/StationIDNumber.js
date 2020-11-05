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

class StationIDNumber extends RpcStruct {
    /**
     * Initalizes an instance of StationIDNumber.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the CountryCode
     * @param {Number} code - Binary Representation of ITU Country Code. USA Code is 001. - The desired CountryCode.
     * {'num_min_value': 0, 'num_max_value': 999}
     * @returns {StationIDNumber} - The class instance for method chaining.
     */
    setCountryCode (code) {
        this.setParameter(StationIDNumber.KEY_COUNTRY_CODE, code);
        return this;
    }

    /**
     * Get the CountryCode
     * @returns {Number} - the KEY_COUNTRY_CODE value
     */
    getCountryCode () {
        return this.getParameter(StationIDNumber.KEY_COUNTRY_CODE);
    }

    /**
     * Set the FccFacilityId
     * @param {Number} id - Binary representation of unique facility ID assigned by the FCC; FCC controlled for U.S. territory - The desired FccFacilityId.
     * {'num_min_value': 0, 'num_max_value': 999999}
     * @returns {StationIDNumber} - The class instance for method chaining.
     */
    setFccFacilityId (id) {
        this.setParameter(StationIDNumber.KEY_FCC_FACILITY_ID, id);
        return this;
    }

    /**
     * Get the FccFacilityId
     * @returns {Number} - the KEY_FCC_FACILITY_ID value
     */
    getFccFacilityId () {
        return this.getParameter(StationIDNumber.KEY_FCC_FACILITY_ID);
    }
}

StationIDNumber.KEY_COUNTRY_CODE = 'countryCode';
StationIDNumber.KEY_FCC_FACILITY_ID = 'fccFacilityId';

export { StationIDNumber };