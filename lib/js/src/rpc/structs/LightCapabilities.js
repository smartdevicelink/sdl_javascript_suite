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
import { RpcStruct } from '../RpcStruct.js';

class LightCapabilities extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {LightName} name
     * @return {LightCapabilities}
     */
    setName (name) {
        this.validateType(LightName, name);
        this.setParameter(LightCapabilities.KEY_NAME, name);
        return this;
    }

    /**
     * @return {LightName}
     */
    getName () {
        return this.getObject(LightName, LightCapabilities.KEY_NAME);
    }

    /**
     * @param {Boolean} available - Indicates if the status (ON/OFF) can be set remotely. App shall not use read-only
     *                              values (RAMP_UP/RAMP_DOWN/UNKNOWN/INVALID) in a setInteriorVehicleData request.
     * @return {LightCapabilities}
     */
    setStatusAvailable (available) {
        this.setParameter(LightCapabilities.KEY_STATUS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getStatusAvailable () {
        return this.getParameter(LightCapabilities.KEY_STATUS_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Indicates if the light's density can be set remotely (similar to a dimmer).
     * @return {LightCapabilities}
     */
    setDensityAvailable (available) {
        this.setParameter(LightCapabilities.KEY_DENSITY_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDensityAvailable () {
        return this.getParameter(LightCapabilities.KEY_DENSITY_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Indicates if the light's color can be set remotely by using the sRGB color space.
     * @return {LightCapabilities}
     */
    setRgbColorSpaceAvailable (available) {
        this.setParameter(LightCapabilities.KEY_RGB_COLOR_SPACE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
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