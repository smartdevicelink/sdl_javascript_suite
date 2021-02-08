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

import { KeyboardLayoutCapability } from './KeyboardLayoutCapability.js';
import { RpcStruct } from '../RpcStruct.js';

class KeyboardCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of KeyboardCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the MaskInputCharactersSupported
     * @since SmartDeviceLink 7.1.0
     * @param {Boolean} supported - Availability of capability to mask input characters using keyboard. True: Available, False: Not Available - The desired MaskInputCharactersSupported.
     * @returns {KeyboardCapabilities} - The class instance for method chaining.
     */
    setMaskInputCharactersSupported (supported) {
        this.setParameter(KeyboardCapabilities.KEY_MASK_INPUT_CHARACTERS_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the MaskInputCharactersSupported
     * @returns {Boolean} - the KEY_MASK_INPUT_CHARACTERS_SUPPORTED value
     */
    getMaskInputCharactersSupported () {
        return this.getParameter(KeyboardCapabilities.KEY_MASK_INPUT_CHARACTERS_SUPPORTED);
    }

    /**
     * Set the SupportedKeyboards
     * @param {KeyboardLayoutCapability[]} keyboards - Capabilities of supported keyboard layouts by HMI. - The desired SupportedKeyboards.
     * {'array_min_size': 1, 'array_max_size': 1000}
     * @returns {KeyboardCapabilities} - The class instance for method chaining.
     */
    setSupportedKeyboards (keyboards) {
        this._validateType(KeyboardLayoutCapability, keyboards, true);
        this.setParameter(KeyboardCapabilities.KEY_SUPPORTED_KEYBOARDS, keyboards);
        return this;
    }

    /**
     * Get the SupportedKeyboards
     * @returns {KeyboardLayoutCapability[]} - the KEY_SUPPORTED_KEYBOARDS value
     */
    getSupportedKeyboards () {
        return this.getObject(KeyboardLayoutCapability, KeyboardCapabilities.KEY_SUPPORTED_KEYBOARDS);
    }
}

KeyboardCapabilities.KEY_MASK_INPUT_CHARACTERS_SUPPORTED = 'maskInputCharactersSupported';
KeyboardCapabilities.KEY_SUPPORTED_KEYBOARDS = 'supportedKeyboards';

export { KeyboardCapabilities };