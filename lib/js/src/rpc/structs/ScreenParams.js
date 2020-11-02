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

import { ImageResolution } from './ImageResolution.js';
import { RpcStruct } from '../RpcStruct.js';
import { TouchEventCapabilities } from './TouchEventCapabilities.js';

class ScreenParams extends RpcStruct {
    /**
     * Initalizes an instance of ScreenParams.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Resolution
     * @param {ImageResolution} resolution - The resolution of the prescribed screen area. - The desired Resolution.
     * @returns {ScreenParams} - The class instance for method chaining.
     */
    setResolution (resolution) {
        this._validateType(ImageResolution, resolution);
        this.setParameter(ScreenParams.KEY_RESOLUTION, resolution);
        return this;
    }

    /**
     * Get the Resolution
     * @returns {ImageResolution} - the KEY_RESOLUTION value
     */
    getResolution () {
        return this.getObject(ImageResolution, ScreenParams.KEY_RESOLUTION);
    }

    /**
     * Set the TouchEventAvailable
     * @param {TouchEventCapabilities} available - Types of screen touch events available in screen area. - The desired TouchEventAvailable.
     * @returns {ScreenParams} - The class instance for method chaining.
     */
    setTouchEventAvailable (available) {
        this._validateType(TouchEventCapabilities, available);
        this.setParameter(ScreenParams.KEY_TOUCH_EVENT_AVAILABLE, available);
        return this;
    }

    /**
     * Get the TouchEventAvailable
     * @returns {TouchEventCapabilities} - the KEY_TOUCH_EVENT_AVAILABLE value
     */
    getTouchEventAvailable () {
        return this.getObject(TouchEventCapabilities, ScreenParams.KEY_TOUCH_EVENT_AVAILABLE);
    }
}

ScreenParams.KEY_RESOLUTION = 'resolution';
ScreenParams.KEY_TOUCH_EVENT_AVAILABLE = 'touchEventAvailable';

export { ScreenParams };