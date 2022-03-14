/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { LightName } from '../enums/LightName.js';
import { RpcStruct } from '../RpcStruct.js';

class LightCapabilities extends RpcStruct {
    /**
     * Initializes an instance of LightCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the NameParam
     * @param {LightName} name - Enumeration that describes possible values of light name. The mobile libraries and SDL Core use the name string when referencing these elements. - The desired NameParam.
     * @returns {LightCapabilities} - The class instance for method chaining.
     */
    setNameParam (name) {
        this._validateType(LightName, name);
        this.setParameter(LightCapabilities.KEY_NAME, name);
        return this;
    }

    /**
     * Get the NameParam
     * @returns {LightName} - the KEY_NAME value
     */
    getNameParam () {
        return this.getObject(LightName, LightCapabilities.KEY_NAME);
    }

    /**
     * Set the StatusAvailable
     * @param {Boolean} available - Indicates if the status (ON/OFF) can be set remotely. App shall not use read-only values (RAMP_UP/RAMP_DOWN/UNKNOWN/INVALID) in a setInteriorVehicleData request. - The desired StatusAvailable.
     * @returns {LightCapabilities} - The class instance for method chaining.
     */
    setStatusAvailable (available) {
        this.setParameter(LightCapabilities.KEY_STATUS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the StatusAvailable
     * @returns {Boolean} - the KEY_STATUS_AVAILABLE value
     */
    getStatusAvailable () {
        return this.getParameter(LightCapabilities.KEY_STATUS_AVAILABLE);
    }

    /**
     * Set the DensityAvailable
     * @param {Boolean} available - Indicates if the light's density can be set remotely (similar to a dimmer). - The desired DensityAvailable.
     * @returns {LightCapabilities} - The class instance for method chaining.
     */
    setDensityAvailable (available) {
        this.setParameter(LightCapabilities.KEY_DENSITY_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DensityAvailable
     * @returns {Boolean} - the KEY_DENSITY_AVAILABLE value
     */
    getDensityAvailable () {
        return this.getParameter(LightCapabilities.KEY_DENSITY_AVAILABLE);
    }

    /**
     * Set the RgbColorSpaceAvailable
     * @param {Boolean} available - Indicates if the light's color can be set remotely by using the sRGB color space. - The desired RgbColorSpaceAvailable.
     * @returns {LightCapabilities} - The class instance for method chaining.
     */
    setRgbColorSpaceAvailable (available) {
        this.setParameter(LightCapabilities.KEY_RGB_COLOR_SPACE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the RgbColorSpaceAvailable
     * @returns {Boolean} - the KEY_RGB_COLOR_SPACE_AVAILABLE value
     */
    getRgbColorSpaceAvailable () {
        return this.getParameter(LightCapabilities.KEY_RGB_COLOR_SPACE_AVAILABLE);
    }
}

LightCapabilities.KEY_NAME = 'name';
LightCapabilities.KEY_STATUS_AVAILABLE = 'statusAvailable';
LightCapabilities.KEY_DENSITY_AVAILABLE = 'densityAvailable';
LightCapabilities.KEY_RGB_COLOR_SPACE_AVAILABLE = 'rgbColorSpaceAvailable';

export { LightCapabilities };