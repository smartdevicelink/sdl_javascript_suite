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
     * Initalizes an instance of SetDisplayLayoutResponse.
     * @constructor
     * @deprecated
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.SetDisplayLayout);
    }

    /**
     * @deprecated
     * @param {DisplayCapabilities} capabilities - See DisplayCapabilities
     * @return {SetDisplayLayoutResponse}
     */
    setDisplayCapabilities (capabilities) {
        this.validateType(DisplayCapabilities, capabilities);
        this.setParameter(SetDisplayLayoutResponse.KEY_DISPLAY_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @deprecated
     * @return {DisplayCapabilities}
     */
    getDisplayCapabilities () {
        return this.getObject(DisplayCapabilities, SetDisplayLayoutResponse.KEY_DISPLAY_CAPABILITIES);
    }

    /**
     * @deprecated
     * @param {ButtonCapabilities[]} capabilities - See ButtonCapabilities
     * @return {SetDisplayLayoutResponse}
     */
    setButtonCapabilities (capabilities) {
        this.validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(SetDisplayLayoutResponse.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @deprecated
     * @return {ButtonCapabilities[]}
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, SetDisplayLayoutResponse.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * @deprecated
     * @param {SoftButtonCapabilities[]} capabilities - If returned, the platform supports on-screen SoftButtons; see
     *                                                  SoftButtonCapabilities.
     * @return {SetDisplayLayoutResponse}
     */
    setSoftButtonCapabilities (capabilities) {
        this.validateType(SoftButtonCapabilities, capabilities, true);
        this.setParameter(SetDisplayLayoutResponse.KEY_SOFT_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @deprecated
     * @return {SoftButtonCapabilities[]}
     */
    getSoftButtonCapabilities () {
        return this.getObject(SoftButtonCapabilities, SetDisplayLayoutResponse.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
     * @deprecated
     * @param {PresetBankCapabilities} capabilities - If returned, the platform supports custom on-screen Presets; see
     *                                                PresetBankCapabilities.
     * @return {SetDisplayLayoutResponse}
     */
    setPresetBankCapabilities (capabilities) {
        this.validateType(PresetBankCapabilities, capabilities);
        this.setParameter(SetDisplayLayoutResponse.KEY_PRESET_BANK_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @deprecated
     * @return {PresetBankCapabilities}
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