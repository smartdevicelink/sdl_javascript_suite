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

import { RpcStruct } from '../RpcStruct.js';

class TouchEventCapabilities extends RpcStruct {
    /**
     * Initializes an instance of TouchEventCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the PressAvailable
     * @param {Boolean} available - The desired PressAvailable.
     * @returns {TouchEventCapabilities} - The class instance for method chaining.
     */
    setPressAvailable (available) {
        this.setParameter(TouchEventCapabilities.KEY_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the PressAvailable
     * @returns {Boolean} - the KEY_PRESS_AVAILABLE value
     */
    getPressAvailable () {
        return this.getParameter(TouchEventCapabilities.KEY_PRESS_AVAILABLE);
    }

    /**
     * Set the MultiTouchAvailable
     * @param {Boolean} available - The desired MultiTouchAvailable.
     * @returns {TouchEventCapabilities} - The class instance for method chaining.
     */
    setMultiTouchAvailable (available) {
        this.setParameter(TouchEventCapabilities.KEY_MULTI_TOUCH_AVAILABLE, available);
        return this;
    }

    /**
     * Get the MultiTouchAvailable
     * @returns {Boolean} - the KEY_MULTI_TOUCH_AVAILABLE value
     */
    getMultiTouchAvailable () {
        return this.getParameter(TouchEventCapabilities.KEY_MULTI_TOUCH_AVAILABLE);
    }

    /**
     * Set the DoublePressAvailable
     * @param {Boolean} available - The desired DoublePressAvailable.
     * @returns {TouchEventCapabilities} - The class instance for method chaining.
     */
    setDoublePressAvailable (available) {
        this.setParameter(TouchEventCapabilities.KEY_DOUBLE_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the DoublePressAvailable
     * @returns {Boolean} - the KEY_DOUBLE_PRESS_AVAILABLE value
     */
    getDoublePressAvailable () {
        return this.getParameter(TouchEventCapabilities.KEY_DOUBLE_PRESS_AVAILABLE);
    }
}

TouchEventCapabilities.KEY_PRESS_AVAILABLE = 'pressAvailable';
TouchEventCapabilities.KEY_MULTI_TOUCH_AVAILABLE = 'multiTouchAvailable';
TouchEventCapabilities.KEY_DOUBLE_PRESS_AVAILABLE = 'doublePressAvailable';

export { TouchEventCapabilities };