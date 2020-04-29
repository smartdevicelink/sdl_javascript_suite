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
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ShortPressAvailable
     * @param {Boolean} available - The button supports a short press. Whenever the button is pressed short, - The desired ShortPressAvailable.
     * onButtonPressed( SHORT) will be invoked.
     * @returns {SoftButtonCapabilities} - The class instance for method chaining.
     */
    setShortPressAvailable (available) {
        this.setParameter(SoftButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the ShortPressAvailable
     * @returns {Boolean} - the KEY_SHORT_PRESS_AVAILABLE value
     */
    getShortPressAvailable () {
        return this.getParameter(SoftButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE);
    }

    /**
     * Set the LongPressAvailable
     * @param {Boolean} available - The button supports a LONG press. Whenever the button is pressed long, - The desired LongPressAvailable.
     * onButtonPressed( LONG) will be invoked.
     * @returns {SoftButtonCapabilities} - The class instance for method chaining.
     */
    setLongPressAvailable (available) {
        this.setParameter(SoftButtonCapabilities.KEY_LONG_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the LongPressAvailable
     * @returns {Boolean} - the KEY_LONG_PRESS_AVAILABLE value
     */
    getLongPressAvailable () {
        return this.getParameter(SoftButtonCapabilities.KEY_LONG_PRESS_AVAILABLE);
    }

    /**
     * Set the UpDownAvailable
     * @param {Boolean} available - The button supports "button down" and "button up". Whenever the button is pressed, - The desired UpDownAvailable.
     * onButtonEvent( DOWN) will be invoked. Whenever the button is released,
     * onButtonEvent( UP) will be invoked.
     * @returns {SoftButtonCapabilities} - The class instance for method chaining.
     */
    setUpDownAvailable (available) {
        this.setParameter(SoftButtonCapabilities.KEY_UP_DOWN_AVAILABLE, available);
        return this;
    }

    /**
     * Get the UpDownAvailable
     * @returns {Boolean} - the KEY_UP_DOWN_AVAILABLE value
     */
    getUpDownAvailable () {
        return this.getParameter(SoftButtonCapabilities.KEY_UP_DOWN_AVAILABLE);
    }

    /**
     * Set the ImageSupported
     * @param {Boolean} supported - The button supports referencing a static or dynamic image. - The desired ImageSupported.
     * @returns {SoftButtonCapabilities} - The class instance for method chaining.
     */
    setImageSupported (supported) {
        this.setParameter(SoftButtonCapabilities.KEY_IMAGE_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the ImageSupported
     * @returns {Boolean} - the KEY_IMAGE_SUPPORTED value
     */
    getImageSupported () {
        return this.getParameter(SoftButtonCapabilities.KEY_IMAGE_SUPPORTED);
    }

    /**
     * Set the TextSupported
     * @param {Boolean} supported - The button supports the use of text. If not included, the default value should be - The desired TextSupported.
     * considered true that the button will support text.
     * @returns {SoftButtonCapabilities} - The class instance for method chaining.
     */
    setTextSupported (supported) {
        this.setParameter(SoftButtonCapabilities.KEY_TEXT_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the TextSupported
     * @returns {Boolean} - the KEY_TEXT_SUPPORTED value
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