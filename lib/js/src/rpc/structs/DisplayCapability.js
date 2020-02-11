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
import { WindowCapability } from './WindowCapability.js';
import { WindowTypeCapabilities } from './WindowTypeCapabilities.js';

class DisplayCapability extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name
     * @return {DisplayCapability}
     */
    setDisplayName (name) {
        this.setParameter(DisplayCapability.KEY_DISPLAY_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getDisplayName () {
        return this.getParameter(DisplayCapability.KEY_DISPLAY_NAME);
    }

    /**
     * @param {WindowTypeCapabilities[]} supported - Informs the application how many windows the app is allowed to
     *                                               create per type.
     * @return {DisplayCapability}
     */
    setWindowTypeSupported (supported) {
        this.validateType(WindowTypeCapabilities, supported, true);
        this.setParameter(DisplayCapability.KEY_WINDOW_TYPE_SUPPORTED, supported);
        return this;
    }

    /**
     * @return {WindowTypeCapabilities[]}
     */
    getWindowTypeSupported () {
        return this.getObject(WindowTypeCapabilities, DisplayCapability.KEY_WINDOW_TYPE_SUPPORTED);
    }

    /**
     * @param {WindowCapability[]} capabilities - Contains a list of capabilities of all windows related to the app.
     *                                            Once the app has registered the capabilities of all windows are
     *                                            provided. GetSystemCapability still allows requesting window
     *                                            capabilities of all windows. After registration, only windows with
     *                                            capabilities changed will be included. Following cases will cause only
     *                                            affected windows to be included: 1. App creates a new window. After
     *                                            the window is created, a system capability notification will be sent
     *                                            related only to the created window. 2. App sets a new layout to the
     *                                            window. The new layout changes window capabilties. The notification
     *                                            will reflect those changes to the single window.
     * @return {DisplayCapability}
     */
    setWindowCapabilities (capabilities) {
        this.validateType(WindowCapability, capabilities, true);
        this.setParameter(DisplayCapability.KEY_WINDOW_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {WindowCapability[]}
     */
    getWindowCapabilities () {
        return this.getObject(WindowCapability, DisplayCapability.KEY_WINDOW_CAPABILITIES);
    }
}

DisplayCapability.KEY_DISPLAY_NAME = 'displayName';
DisplayCapability.KEY_WINDOW_TYPE_SUPPORTED = 'windowTypeSupported';
DisplayCapability.KEY_WINDOW_CAPABILITIES = 'windowCapabilities';

export { DisplayCapability };