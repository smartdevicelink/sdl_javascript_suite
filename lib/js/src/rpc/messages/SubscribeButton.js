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

import { ButtonName } from '../enums/ButtonName.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * Subscribes to built-in HMI buttons. The application will be notified by the OnButtonEvent and OnButtonPress. To
 * unsubscribe the notifications, use unsubscribeButton.
 */
class SubscribeButton extends RpcRequest {
    /**
     * Initalizes an instance of SubscribeButton.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.SubscribeButton);
    }

    /**
     * @param {ButtonName} name - Name of the button to subscribe.
     * @return {SubscribeButton}
     */
    setButtonName (name) {
        this.validateType(ButtonName, name);
        this.setParameter(SubscribeButton.KEY_BUTTON_NAME, name);
        return this;
    }

    /**
     * @return {ButtonName}
     */
    getButtonName () {
        return this.getObject(ButtonName, SubscribeButton.KEY_BUTTON_NAME);
    }
}

SubscribeButton.KEY_BUTTON_NAME = 'buttonName';

export { SubscribeButton };