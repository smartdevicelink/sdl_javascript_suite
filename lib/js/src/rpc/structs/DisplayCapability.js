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
import { WindowCapability } from './WindowCapability.js';
import { WindowTypeCapabilities } from './WindowTypeCapabilities.js';

class DisplayCapability extends RpcStruct {
    /**
     * Initializes an instance of DisplayCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 6.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the DisplayName
     * @param {String} name - The desired DisplayName.
     * {'string_min_length': 1}
     * @returns {DisplayCapability} - The class instance for method chaining.
     */
    setDisplayName (name) {
        this.setParameter(DisplayCapability.KEY_DISPLAY_NAME, name);
        return this;
    }

    /**
     * Get the DisplayName
     * @returns {String} - the KEY_DISPLAY_NAME value
     */
    getDisplayName () {
        return this.getParameter(DisplayCapability.KEY_DISPLAY_NAME);
    }

    /**
     * Set the WindowTypeSupported
     * @param {WindowTypeCapabilities[]} supported - Informs the application how many windows the app is allowed to create per type. - The desired WindowTypeSupported.
     * {'array_min_size': 1}
     * @returns {DisplayCapability} - The class instance for method chaining.
     */
    setWindowTypeSupported (supported) {
        this._validateType(WindowTypeCapabilities, supported, true);
        this.setParameter(DisplayCapability.KEY_WINDOW_TYPE_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the WindowTypeSupported
     * @returns {WindowTypeCapabilities[]} - the KEY_WINDOW_TYPE_SUPPORTED value
     */
    getWindowTypeSupported () {
        return this.getObject(WindowTypeCapabilities, DisplayCapability.KEY_WINDOW_TYPE_SUPPORTED);
    }

    /**
     * Set the WindowCapabilities
     * @param {WindowCapability[]} capabilities - Contains a list of capabilities of all windows related to the app. Once the app has registered the capabilities of all windows are provided. GetSystemCapability still allows requesting window capabilities of all windows. After registration, only windows with capabilities changed will be included. Following cases will cause only affected windows to be included: 1. App creates a new window. After the window is created, a system capability notification will be sent related only to the created window. 2. App sets a new layout to the window. The new layout changes window capabilities. The notification will reflect those changes to the single window. - The desired WindowCapabilities.
     * {'array_min_size': 1, 'array_max_size': 1000}
     * @returns {DisplayCapability} - The class instance for method chaining.
     */
    setWindowCapabilities (capabilities) {
        this._validateType(WindowCapability, capabilities, true);
        this.setParameter(DisplayCapability.KEY_WINDOW_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the WindowCapabilities
     * @returns {WindowCapability[]} - the KEY_WINDOW_CAPABILITIES value
     */
    getWindowCapabilities () {
        return this.getObject(WindowCapability, DisplayCapability.KEY_WINDOW_CAPABILITIES);
    }
}

DisplayCapability.KEY_DISPLAY_NAME = 'displayName';
DisplayCapability.KEY_WINDOW_TYPE_SUPPORTED = 'windowTypeSupported';
DisplayCapability.KEY_WINDOW_CAPABILITIES = 'windowCapabilities';

export { DisplayCapability };