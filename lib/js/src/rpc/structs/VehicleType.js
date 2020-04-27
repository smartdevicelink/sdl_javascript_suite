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

class VehicleType extends RpcStruct {
    /**
     * Initalizes an instance of VehicleType.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Make
     * @param {String} make - Make of the vehicle, e.g. Ford - The desired Make.
     * @returns {VehicleType} - The class instance for method chaining.
     */
    setMake (make) {
        this.setParameter(VehicleType.KEY_MAKE, make);
        return this;
    }

    /**
     * Get the Make
     * @returns {String} - the KEY_MAKE value
     */
    getMake () {
        return this.getParameter(VehicleType.KEY_MAKE);
    }

    /**
     * Set the Model
     * @param {String} model - Model of the vehicle, e.g. Fiesta - The desired Model.
     * @returns {VehicleType} - The class instance for method chaining.
     */
    setModel (model) {
        this.setParameter(VehicleType.KEY_MODEL, model);
        return this;
    }

    /**
     * Get the Model
     * @returns {String} - the KEY_MODEL value
     */
    getModel () {
        return this.getParameter(VehicleType.KEY_MODEL);
    }

    /**
     * Set the ModelYear
     * @param {String} year - Model Year of the vehicle, e.g. 2013 - The desired ModelYear.
     * @returns {VehicleType} - The class instance for method chaining.
     */
    setModelYear (year) {
        this.setParameter(VehicleType.KEY_MODEL_YEAR, year);
        return this;
    }

    /**
     * Get the ModelYear
     * @returns {String} - the KEY_MODEL_YEAR value
     */
    getModelYear () {
        return this.getParameter(VehicleType.KEY_MODEL_YEAR);
    }

    /**
     * Set the Trim
     * @param {String} trim - Trim of the vehicle, e.g. SE - The desired Trim.
     * @returns {VehicleType} - The class instance for method chaining.
     */
    setTrim (trim) {
        this.setParameter(VehicleType.KEY_TRIM, trim);
        return this;
    }

    /**
     * Get the Trim
     * @returns {String} - the KEY_TRIM value
     */
    getTrim () {
        return this.getParameter(VehicleType.KEY_TRIM);
    }
}

VehicleType.KEY_MAKE = 'make';
VehicleType.KEY_MODEL = 'model';
VehicleType.KEY_MODEL_YEAR = 'modelYear';
VehicleType.KEY_TRIM = 'trim';

export { VehicleType };