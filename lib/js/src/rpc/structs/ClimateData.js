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

import { RpcStruct } from '../RpcStruct.js';
import { Temperature } from './Temperature.js';

class ClimateData extends RpcStruct {
    /**
     * Initalizes an instance of ClimateData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ExternalTemperature
     * @param {Temperature} temperature - The external temperature in degrees celsius - The desired ExternalTemperature.
     * @returns {ClimateData} - The class instance for method chaining.
     */
    setExternalTemperature (temperature) {
        this._validateType(Temperature, temperature);
        this.setParameter(ClimateData.KEY_EXTERNAL_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the ExternalTemperature
     * @returns {Temperature} - the KEY_EXTERNAL_TEMPERATURE value
     */
    getExternalTemperature () {
        return this.getObject(Temperature, ClimateData.KEY_EXTERNAL_TEMPERATURE);
    }

    /**
     * Set the CabinTemperature
     * @param {Temperature} temperature - Internal ambient cabin temperature in degrees celsius - The desired CabinTemperature.
     * @returns {ClimateData} - The class instance for method chaining.
     */
    setCabinTemperature (temperature) {
        this._validateType(Temperature, temperature);
        this.setParameter(ClimateData.KEY_CABIN_TEMPERATURE, temperature);
        return this;
    }

    /**
     * Get the CabinTemperature
     * @returns {Temperature} - the KEY_CABIN_TEMPERATURE value
     */
    getCabinTemperature () {
        return this.getObject(Temperature, ClimateData.KEY_CABIN_TEMPERATURE);
    }

    /**
     * Set the AtmosphericPressure
     * @param {Number} pressure - Current atmospheric pressure in mBar - The desired AtmosphericPressure.
     * {'num_min_value': 0.0, 'num_max_value': 2000.0}
     * @returns {ClimateData} - The class instance for method chaining.
     */
    setAtmosphericPressure (pressure) {
        this.setParameter(ClimateData.KEY_ATMOSPHERIC_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the AtmosphericPressure
     * @returns {Number} - the KEY_ATMOSPHERIC_PRESSURE value
     */
    getAtmosphericPressure () {
        return this.getParameter(ClimateData.KEY_ATMOSPHERIC_PRESSURE);
    }
}

ClimateData.KEY_EXTERNAL_TEMPERATURE = 'externalTemperature';
ClimateData.KEY_CABIN_TEMPERATURE = 'cabinTemperature';
ClimateData.KEY_ATMOSPHERIC_PRESSURE = 'atmosphericPressure';

export { ClimateData };