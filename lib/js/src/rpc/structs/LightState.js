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
import { LightStatus } from '../enums/LightStatus.js';
import { LightName } from '../enums/LightName.js';
import { RGBColor } from './RGBColor.js';

class LightState extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {LightName} id - The name of a light or a group of lights.
     * @return {LightState}
     */
    setId (id) {
        this.validateType(LightName, id);
        this.setParameter(LightState.KEY_ID, id);
        return this;
    }

    /**
     * @return {LightName}
     */
    getId () {
        return this.getObject(LightName, LightState.KEY_ID);
    }

    /**
     * @param {LightStatus} status
     * @return {LightState}
     */
    setStatus (status) {
        this.validateType(LightStatus, status);
        this.setParameter(LightState.KEY_STATUS, status);
        return this;
    }

    /**
     * @return {LightStatus}
     */
    getStatus () {
        return this.getObject(LightStatus, LightState.KEY_STATUS);
    }

    /**
     * @param {Number} density
     * @return {LightState}
     */
    setDensity (density) {
        this.setParameter(LightState.KEY_DENSITY, density);
        return this;
    }

    /**
     * @return {Number}
     */
    getDensity () {
        return this.getParameter(LightState.KEY_DENSITY);
    }

    /**
     * @param {RGBColor} color
     * @return {LightState}
     */
    setColor (color) {
        this.validateType(RGBColor, color);
        this.setParameter(LightState.KEY_COLOR, color);
        return this;
    }

    /**
     * @return {RGBColor}
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