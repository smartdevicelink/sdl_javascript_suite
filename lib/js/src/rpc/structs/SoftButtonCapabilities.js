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

/**
 * Contains information about a SoftButton's capabilities.
 */
class SoftButtonCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of SoftButtonCapabilities.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Boolean} available - The button supports a short press. Whenever the button is pressed short,
     *                              onButtonPressed( SHORT) will be invoked.
     * @return {SoftButtonCapabilities}
     */
    setShortPressAvailable (available) {
        this.setParameter(SoftButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getShortPressAvailable () {
        return this.getParameter(SoftButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE);
    }

    /**
     * @param {Boolean} available - The button supports a LONG press. Whenever the button is pressed long,
     *                              onButtonPressed( LONG) will be invoked.
     * @return {SoftButtonCapabilities}
     */
    setLongPressAvailable (available) {
        this.setParameter(SoftButtonCapabilities.KEY_LONG_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getLongPressAvailable () {
        return this.getParameter(SoftButtonCapabilities.KEY_LONG_PRESS_AVAILABLE);
    }

    /**
     * @param {Boolean} available - The button supports "button down" and "button up". Whenever the button is pressed,
     *                              onButtonEvent( DOWN) will be invoked. Whenever the button is released,
     *                              onButtonEvent( UP) will be invoked.
     * @return {SoftButtonCapabilities}
     */
    setUpDownAvailable (available) {
        this.setParameter(SoftButtonCapabilities.KEY_UP_DOWN_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getUpDownAvailable () {
        return this.getParameter(SoftButtonCapabilities.KEY_UP_DOWN_AVAILABLE);
    }

    /**
     * @param {Boolean} supported - The button supports referencing a static or dynamic image.
     * @return {SoftButtonCapabilities}
     */
    setImageSupported (supported) {
        this.setParameter(SoftButtonCapabilities.KEY_IMAGE_SUPPORTED, supported);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getImageSupported () {
        return this.getParameter(SoftButtonCapabilities.KEY_IMAGE_SUPPORTED);
    }

    /**
     * @param {Boolean} supported - The button supports the use of text. If not included, the default value should be
     *                              considered true that the button will support text.
     * @return {SoftButtonCapabilities}
     */
    setTextSupported (supported) {
        this.setParameter(SoftButtonCapabilities.KEY_TEXT_SUPPORTED, supported);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTextSupported () {
        return this.getParameter(SoftButtonCapabilities.KEY_TEXT_SUPPORTED);
    }
}

SoftButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE = 'shortPressAvailable';
SoftButtonCapabilities.KEY_LONG_PRESS_AVAILABLE = 'longPressAvailable';
SoftButtonCapabilities.KEY_UP_DOWN_AVAILABLE = 'upDownAvailable';
SoftButtonCapabilities.KEY_IMAGE_SUPPORTED = 'imageSupported';
SoftButtonCapabilities.KEY_TEXT_SUPPORTED = 'textSupported';

export { SoftButtonCapabilities };