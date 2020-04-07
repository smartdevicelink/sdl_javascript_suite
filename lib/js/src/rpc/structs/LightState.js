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

import { LightName } from '../enums/LightName.js';
import { LightStatus } from '../enums/LightStatus.js';
import { RGBColor } from './RGBColor.js';
import { RpcStruct } from '../RpcStruct.js';

class LightState extends RpcStruct {
    /**
     * Initalizes an instance of LightState.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Id
     * @param {LightName} id - The name of a light or a group of lights. - The desired Id.
     * @returns {LightState} - The class instance for method chaining.
     */
    setId (id) {
        this.validateType(LightName, id);
        this.setParameter(LightState.KEY_ID, id);
        return this;
    }

    /**
     * Get the Id
     * @returns {LightName} - the KEY_ID value
     */
    getId () {
        return this.getObject(LightName, LightState.KEY_ID);
    }

    /**
     * Set the Status
     * @param {LightStatus} status - The desired Status.
     * @returns {LightState} - The class instance for method chaining.
     */
    setStatus (status) {
        this.validateType(LightStatus, status);
        this.setParameter(LightState.KEY_STATUS, status);
        return this;
    }

    /**
     * Get the Status
     * @returns {LightStatus} - the KEY_STATUS value
     */
    getStatus () {
        return this.getObject(LightStatus, LightState.KEY_STATUS);
    }

    /**
     * Set the Density
     * @param {Number} density - The desired Density.
     * @returns {LightState} - The class instance for method chaining.
     */
    setDensity (density) {
        this.setParameter(LightState.KEY_DENSITY, density);
        return this;
    }

    /**
     * Get the Density
     * @returns {Number} - the KEY_DENSITY value
     */
    getDensity () {
        return this.getParameter(LightState.KEY_DENSITY);
    }

    /**
     * Set the Color
     * @param {RGBColor} color - The desired Color.
     * @returns {LightState} - The class instance for method chaining.
     */
    setColor (color) {
        this.validateType(RGBColor, color);
        this.setParameter(LightState.KEY_COLOR, color);
        return this;
    }

    /**
     * Get the Color
     * @returns {RGBColor} - the KEY_COLOR value
     */
    getColor () {
        return this.getObject(RGBColor, LightState.KEY_COLOR);
    }
}

LightState.KEY_ID = 'id';
LightState.KEY_STATUS = 'status';
LightState.KEY_DENSITY = 'density';
LightState.KEY_COLOR = 'color';

export { LightState };