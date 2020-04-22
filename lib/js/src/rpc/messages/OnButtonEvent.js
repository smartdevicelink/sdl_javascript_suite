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

import { ButtonEventMode } from '../enums/ButtonEventMode.js';
import { ButtonName } from '../enums/ButtonName.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * Notifies application of UP/DOWN events for buttons to which the application is subscribed.
 */
class OnButtonEvent extends RpcNotification {
    /**
     * Initalizes an instance of OnButtonEvent.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnButtonEvent);
    }

    /**
     * Set the ButtonName
     * @param {ButtonName} name - Defines the hard (physical) and soft (touchscreen) buttons available from the module - The desired ButtonName.
     * @returns {OnButtonEvent} - The class instance for method chaining.
     */
    setButtonName (name) {
        this._validateType(ButtonName, name);
        this.setParameter(OnButtonEvent.KEY_BUTTON_NAME, name);
        return this;
    }

    /**
     * Get the ButtonName
     * @returns {ButtonName} - the KEY_BUTTON_NAME value
     */
    getButtonName () {
        return this.getObject(ButtonName, OnButtonEvent.KEY_BUTTON_NAME);
    }

    /**
     * Set the ButtonEventMode
     * @param {ButtonEventMode} mode - Indicates whether this is an UP or DOWN event. - The desired ButtonEventMode.
     * @returns {OnButtonEvent} - The class instance for method chaining.
     */
    setButtonEventMode (mode) {
        this._validateType(ButtonEventMode, mode);
        this.setParameter(OnButtonEvent.KEY_BUTTON_EVENT_MODE, mode);
        return this;
    }

    /**
     * Get the ButtonEventMode
     * @returns {ButtonEventMode} - the KEY_BUTTON_EVENT_MODE value
     */
    getButtonEventMode () {
        return this.getObject(ButtonEventMode, OnButtonEvent.KEY_BUTTON_EVENT_MODE);
    }

    /**
     * Set the CustomButtonID
     * @param {Number} id - If ButtonName is "CUSTOM_BUTTON", this references the integer ID passed by a custom button. - The desired CustomButtonID.
     * (e.g. softButton ID)
     * @returns {OnButtonEvent} - The class instance for method chaining.
     */
    setCustomButtonID (id) {
        this.setParameter(OnButtonEvent.KEY_CUSTOM_BUTTON_ID, id);
        return this;
    }

    /**
     * Get the CustomButtonID
     * @returns {Number} - the KEY_CUSTOM_BUTTON_ID value
     */
    getCustomButtonID () {
        return this.getParameter(OnButtonEvent.KEY_CUSTOM_BUTTON_ID);
    }
}

OnButtonEvent.KEY_BUTTON_NAME = 'buttonName';
OnButtonEvent.KEY_BUTTON_EVENT_MODE = 'buttonEventMode';
OnButtonEvent.KEY_CUSTOM_BUTTON_ID = 'customButtonID';

export { OnButtonEvent };