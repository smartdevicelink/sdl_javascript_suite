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
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';

/**
 * Creates a full screen overlay containing a large block of formatted text that can be scrolled with up to 8
 * SoftButtons defined
 */
class ScrollableMessage extends RpcRequest {
    /**
     * Initalizes an instance of ScrollableMessage.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.ScrollableMessage);
    }

    /**
     * @param {String} body - Body of text that can include newlines and tabs.
     * @return {ScrollableMessage}
     */
    setScrollableMessageBody (body) {
        this.setParameter(ScrollableMessage.KEY_SCROLLABLE_MESSAGE_BODY, body);
        return this;
    }

    /**
     * @return {String}
     */
    getScrollableMessageBody () {
        return this.getParameter(ScrollableMessage.KEY_SCROLLABLE_MESSAGE_BODY);
    }

    /**
     * @param {Number} timeout - App defined timeout. Indicates how long of a timeout from the last action (i.e.
     *                           scrolling message resets timeout).
     * @return {ScrollableMessage}
     */
    setTimeout (timeout) {
        this.setParameter(ScrollableMessage.KEY_TIMEOUT, timeout);
        return this;
    }

    /**
     * @return {Number}
     */
    getTimeout () {
        return this.getParameter(ScrollableMessage.KEY_TIMEOUT);
    }

    /**
     * @param {SoftButton[]} buttons - App defined SoftButtons. If omitted on supported displays, only the system
     *                                 defined "Close" SoftButton will be displayed.
     * @return {ScrollableMessage}
     */
    setSoftButtons (buttons) {
        this.validateType(SoftButton, buttons, true);
        this.setParameter(ScrollableMessage.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * @return {SoftButton[]}
     */
    getSoftButtons () {
        return this.getObject(SoftButton, ScrollableMessage.KEY_SOFT_BUTTONS);
    }

    /**
     * @param {Number} id - An ID for this specific ScrollableMessage to allow cancellation through the
     *                      `CancelInteraction` RPC.
     * @return {ScrollableMessage}
     */
    setCancelID (id) {
        this.setParameter(ScrollableMessage.KEY_CANCEL_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getCancelID () {
        return this.getParameter(ScrollableMessage.KEY_CANCEL_ID);
    }
}

ScrollableMessage.KEY_SCROLLABLE_MESSAGE_BODY = 'scrollableMessageBody';
ScrollableMessage.KEY_TIMEOUT = 'timeout';
ScrollableMessage.KEY_SOFT_BUTTONS = 'softButtons';
ScrollableMessage.KEY_CANCEL_ID = 'cancelID';

export { ScrollableMessage };