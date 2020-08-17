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

class RGBColor extends RpcStruct {
    /**
     * Initalizes an instance of RGBColor.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Red
     * @param {Number} red - The desired Red.
     * {'num_min_value': 0, 'num_max_value': 255}
     * @returns {RGBColor} - The class instance for method chaining.
     */
    setRed (red) {
        this.setParameter(RGBColor.KEY_RED, red);
        return this;
    }

    /**
     * Get the Red
     * @returns {Number} - the KEY_RED value
     */
    getRed () {
        return this.getParameter(RGBColor.KEY_RED);
    }

    /**
     * Set the Green
     * @param {Number} green - The desired Green.
     * {'num_min_value': 0, 'num_max_value': 255}
     * @returns {RGBColor} - The class instance for method chaining.
     */
    setGreen (green) {
        this.setParameter(RGBColor.KEY_GREEN, green);
        return this;
    }

    /**
     * Get the Green
     * @returns {Number} - the KEY_GREEN value
     */
    getGreen () {
        return this.getParameter(RGBColor.KEY_GREEN);
    }

    /**
     * Set the Blue
     * @param {Number} blue - The desired Blue.
     * {'num_min_value': 0, 'num_max_value': 255}
     * @returns {RGBColor} - The class instance for method chaining.
     */
    setBlue (blue) {
        this.setParameter(RGBColor.KEY_BLUE, blue);
        return this;
    }

    /**
     * Get the Blue
     * @returns {Number} - the KEY_BLUE value
     */
    getBlue () {
        return this.getParameter(RGBColor.KEY_BLUE);
    }
}

RGBColor.KEY_RED = 'red';
RGBColor.KEY_GREEN = 'green';
RGBColor.KEY_BLUE = 'blue';

export { RGBColor };