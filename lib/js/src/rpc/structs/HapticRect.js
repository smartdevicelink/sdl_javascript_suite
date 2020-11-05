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

import { Rectangle } from './Rectangle.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Defines haptic data for each user control object for video streaming application
 */
class HapticRect extends RpcStruct {
    /**
     * Initalizes an instance of HapticRect.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.5.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the IdParam
     * @param {Number} id - A user control spatial identifier - The desired IdParam.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {HapticRect} - The class instance for method chaining.
     */
    setIdParam (id) {
        this.setParameter(HapticRect.KEY_ID, id);
        return this;
    }

    /**
     * Get the IdParam
     * @returns {Number} - the KEY_ID value
     */
    getIdParam () {
        return this.getParameter(HapticRect.KEY_ID);
    }

    /**
     * Set the Rect
     * @param {Rectangle} rect - The position of the haptic rectangle to be highlighted. The center of this rectangle will be "touched" when a press occurs. - The desired Rect.
     * @returns {HapticRect} - The class instance for method chaining.
     */
    setRect (rect) {
        this._validateType(Rectangle, rect);
        this.setParameter(HapticRect.KEY_RECT, rect);
        return this;
    }

    /**
     * Get the Rect
     * @returns {Rectangle} - the KEY_RECT value
     */
    getRect () {
        return this.getObject(Rectangle, HapticRect.KEY_RECT);
    }
}

HapticRect.KEY_ID = 'id';
HapticRect.KEY_RECT = 'rect';

export { HapticRect };