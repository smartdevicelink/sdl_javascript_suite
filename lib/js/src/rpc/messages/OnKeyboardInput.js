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

import { FunctionID } from '../enums/FunctionID.js';
import { KeyboardEvent } from '../enums/KeyboardEvent.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * On-screen keyboard event. Can be full string or individual keypresses depending on keyboard mode.
 */
class OnKeyboardInput extends RpcNotification {
    /**
     * Initalizes an instance of OnKeyboardInput.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnKeyboardInput);
    }

    /**
     * Set the Event
     * @param {KeyboardEvent} event - On-screen keyboard input data. - The desired Event.
     * @returns {OnKeyboardInput} - The class instance for method chaining.
     */
    setEvent (event) {
        this.validateType(KeyboardEvent, event);
        this.setParameter(OnKeyboardInput.KEY_EVENT, event);
        return this;
    }

    /**
     * Get the Event
     * @returns {KeyboardEvent} - the KEY_EVENT value
     */
    getEvent () {
        return this.getObject(KeyboardEvent, OnKeyboardInput.KEY_EVENT);
    }

    /**
     * Set the Data
     * @param {String} data - On-screen keyboard input data. For dynamic keypress events, this will be the current - The desired Data.
     * compounded string of entry text. For entry submission events, this will be the full text
     * entry (this will always return regardless of the mode). For entry cancelled and entry
     * aborted events, this data param will be omitted.
     * @returns {OnKeyboardInput} - The class instance for method chaining.
     */
    setData (data) {
        this.setParameter(OnKeyboardInput.KEY_DATA, data);
        return this;
    }

    /**
     * Get the Data
     * @returns {String} - the KEY_DATA value
     */
    getData () {
        return this.getParameter(OnKeyboardInput.KEY_DATA);
    }
}

OnKeyboardInput.KEY_EVENT = 'event';
OnKeyboardInput.KEY_DATA = 'data';

export { OnKeyboardInput };