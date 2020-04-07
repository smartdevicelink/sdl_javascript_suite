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
import { RpcNotification } from '../RpcNotification.js';
import { TouchEvent } from '../structs/TouchEvent.js';
import { TouchType } from '../enums/TouchType.js';

/**
 * Notifies about touch events on the screen's prescribed area
 */
class OnTouchEvent extends RpcNotification {
    /**
     * Initalizes an instance of OnTouchEvent.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnTouchEvent);
    }

    /**
     * Set the Type
     * @param {TouchType} type - The type of touch event. - The desired Type.
     * @returns {OnTouchEvent} - The class instance for method chaining.
     */
    setType (type) {
        this.validateType(TouchType, type);
        this.setParameter(OnTouchEvent.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {TouchType} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(TouchType, OnTouchEvent.KEY_TYPE);
    }

    /**
     * Set the Event
     * @param {TouchEvent[]} event - List of all individual touches involved in this event. - The desired Event.
     * @returns {OnTouchEvent} - The class instance for method chaining.
     */
    setEvent (event) {
        this.validateType(TouchEvent, event, true);
        this.setParameter(OnTouchEvent.KEY_EVENT, event);
        return this;
    }

    /**
     * Get the Event
     * @returns {TouchEvent[]} - the KEY_EVENT value
     */
    getEvent () {
        return this.getObject(TouchEvent, OnTouchEvent.KEY_EVENT);
    }
}

OnTouchEvent.KEY_TYPE = 'type';
OnTouchEvent.KEY_EVENT = 'event';

export { OnTouchEvent };