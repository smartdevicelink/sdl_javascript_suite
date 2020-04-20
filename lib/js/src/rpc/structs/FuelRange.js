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

import { FuelType } from '../enums/FuelType.js';
import { RpcStruct } from '../RpcStruct.js';

class FuelRange extends RpcStruct {
    /**
     * Initalizes an instance of FuelRange.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Type
     * @param {FuelType} type - The desired Type.
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setType (type) {
        this.validateType(FuelType, type);
        this.setParameter(FuelRange.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {FuelType} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(FuelType, FuelRange.KEY_TYPE);
    }

    /**
     * Set the Range
     * @param {Number} range - The estimate range in KM the vehicle can travel based on fuel level and consumption. - The desired Range.
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setRange (range) {
        this.setParameter(FuelRange.KEY_RANGE, range);
        return this;
    }

    /**
     * Get the Range
     * @returns {Number} - the KEY_RANGE value
     */
    getRange () {
        return this.getParameter(FuelRange.KEY_RANGE);
    }
}

FuelRange.KEY_TYPE = 'type';
FuelRange.KEY_RANGE = 'range';

export { FuelRange };