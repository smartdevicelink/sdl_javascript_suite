/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { ButtonCapabilities } from '../structs/ButtonCapabilities.js';
import { DisplayCapabilities } from '../structs/DisplayCapabilities.js';
import { FunctionID } from '../enums/FunctionID.js';
import { PresetBankCapabilities } from '../structs/PresetBankCapabilities.js';
import { RpcResponse } from '../RpcResponse.js';
import { SoftButtonCapabilities } from '../structs/SoftButtonCapabilities.js';

/**
 * This RPC is deprecated. Use Show RPC to change layout.
 * @deprecated
 */
class SetDisplayLayoutResponse extends RpcResponse {
    /**
     * Initializes an instance of SetDisplayLayoutResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     * @deprecated in SmartDeviceLink 6.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.SetDisplayLayout);
    }

    /**
     * Set the DisplayCapabilities
     * @param {DisplayCapabilities} capabilities - See DisplayCapabilities - The desired DisplayCapabilities.
     * @returns {SetDisplayLayoutResponse} - The class instance for method chaining.
     */
    setDisplayCapabilities (capabilities) {
        this._validateType(DisplayCapabilities, capabilities);
        this.setParameter(SetDisplayLayoutResponse.KEY_DISPLAY_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the DisplayCapabilities
     * @returns {DisplayCapabilities} - the KEY_DISPLAY_CAPABILITIES value
     */
    getDisplayCapabilities () {
        return this.getObject(DisplayCapabilities, SetDisplayLayoutResponse.KEY_DISPLAY_CAPABILITIES);
    }

    /**
     * Set the ButtonCapabilities
     * @param {ButtonCapabilities[]} capabilities - See ButtonCapabilities - The desired ButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {SetDisplayLayoutResponse} - The class instance for method chaining.
     */
    setButtonCapabilities (capabilities) {
        this._validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(SetDisplayLayoutResponse.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the ButtonCapabilities
     * @returns {ButtonCapabilities[]} - the KEY_BUTTON_CAPABILITIES value
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, SetDisplayLayoutResponse.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * Set the SoftButtonCapabilities
     * @param {SoftButtonCapabilities[]} capabilities - If returned, the platform supports on-screen SoftButtons; see SoftButtonCapabilities. - The desired SoftButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {SetDisplayLayoutResponse} - The class instance for method chaining.
     */
    setSoftButtonCapabilities (capabilities) {
        this._validateType(SoftButtonCapabilities, capabilities, true);
        this.setParameter(SetDisplayLayoutResponse.KEY_SOFT_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the SoftButtonCapabilities
     * @returns {SoftButtonCapabilities[]} - the KEY_SOFT_BUTTON_CAPABILITIES value
     */
    getSoftButtonCapabilities () {
        return this.getObject(SoftButtonCapabilities, SetDisplayLayoutResponse.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
     * Set the PresetBankCapabilities
     * @param {PresetBankCapabilities} capabilities - If returned, the platform supports custom on-screen Presets; see PresetBankCapabilities. - The desired PresetBankCapabilities.
     * @returns {SetDisplayLayoutResponse} - The class instance for method chaining.
     */
    setPresetBankCapabilities (capabilities) {
        this._validateType(PresetBankCapabilities, capabilities);
        this.setParameter(SetDisplayLayoutResponse.KEY_PRESET_BANK_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the PresetBankCapabilities
     * @returns {PresetBankCapabilities} - the KEY_PRESET_BANK_CAPABILITIES value
     */
    getPresetBankCapabilities () {
        return this.getObject(PresetBankCapabilities, SetDisplayLayoutResponse.KEY_PRESET_BANK_CAPABILITIES);
    }
}

SetDisplayLayoutResponse.KEY_DISPLAY_CAPABILITIES = 'displayCapabilities';
SetDisplayLayoutResponse.KEY_BUTTON_CAPABILITIES = 'buttonCapabilities';
SetDisplayLayoutResponse.KEY_SOFT_BUTTON_CAPABILITIES = 'softButtonCapabilities';
SetDisplayLayoutResponse.KEY_PRESET_BANK_CAPABILITIES = 'presetBankCapabilities';

export { SetDisplayLayoutResponse };