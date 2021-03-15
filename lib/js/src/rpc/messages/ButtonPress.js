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

import { ButtonName } from '../enums/ButtonName.js';
import { ButtonPressMode } from '../enums/ButtonPressMode.js';
import { FunctionID } from '../enums/FunctionID.js';
import { ModuleType } from '../enums/ModuleType.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * NOTE: Certain ButtonNames are tied to specific RC module types. See ButtonName
 */
class ButtonPress extends RpcRequest {
    /**
     * Initializes an instance of ButtonPress.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.5.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.ButtonPress);
    }

    /**
     * Set the ModuleType
     * @param {ModuleType} type - The module where the button should be pressed - The desired ModuleType.
     * @returns {ButtonPress} - The class instance for method chaining.
     */
    setModuleType (type) {
        this._validateType(ModuleType, type);
        this.setParameter(ButtonPress.KEY_MODULE_TYPE, type);
        return this;
    }

    /**
     * Get the ModuleType
     * @returns {ModuleType} - the KEY_MODULE_TYPE value
     */
    getModuleType () {
        return this.getObject(ModuleType, ButtonPress.KEY_MODULE_TYPE);
    }

    /**
     * Set the ModuleId
     * @since SmartDeviceLink 6.0.0
     * @param {String} id - Id of a module in the published ButtonCapabilities - The desired ModuleId.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {ButtonPress} - The class instance for method chaining.
     */
    setModuleId (id) {
        this.setParameter(ButtonPress.KEY_MODULE_ID, id);
        return this;
    }

    /**
     * Get the ModuleId
     * @returns {String} - the KEY_MODULE_ID value
     */
    getModuleId () {
        return this.getParameter(ButtonPress.KEY_MODULE_ID);
    }

    /**
     * Set the ButtonName
     * @param {ButtonName} name - The name of the supported RC button. - The desired ButtonName.
     * @returns {ButtonPress} - The class instance for method chaining.
     */
    setButtonName (name) {
        this._validateType(ButtonName, name);
        this.setParameter(ButtonPress.KEY_BUTTON_NAME, name);
        return this;
    }

    /**
     * Get the ButtonName
     * @returns {ButtonName} - the KEY_BUTTON_NAME value
     */
    getButtonName () {
        return this.getObject(ButtonName, ButtonPress.KEY_BUTTON_NAME);
    }

    /**
     * Set the ButtonPressMode
     * @param {ButtonPressMode} mode - Indicates whether this is a LONG or SHORT button press event. - The desired ButtonPressMode.
     * @returns {ButtonPress} - The class instance for method chaining.
     */
    setButtonPressMode (mode) {
        this._validateType(ButtonPressMode, mode);
        this.setParameter(ButtonPress.KEY_BUTTON_PRESS_MODE, mode);
        return this;
    }

    /**
     * Get the ButtonPressMode
     * @returns {ButtonPressMode} - the KEY_BUTTON_PRESS_MODE value
     */
    getButtonPressMode () {
        return this.getObject(ButtonPressMode, ButtonPress.KEY_BUTTON_PRESS_MODE);
    }
}

ButtonPress.KEY_MODULE_TYPE = 'moduleType';
ButtonPress.KEY_MODULE_ID = 'moduleId';
ButtonPress.KEY_BUTTON_NAME = 'buttonName';
ButtonPress.KEY_BUTTON_PRESS_MODE = 'buttonPressMode';

export { ButtonPress };