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
import { ButtonPressMode } from '../enums/ButtonPressMode.js';
import { FunctionID } from '../enums/FunctionID.js';
import { ModuleType } from '../enums/ModuleType.js';
import { RpcRequest } from '../RpcRequest.js';

class ButtonPress extends RpcRequest {
    /**
     * Initalizes an instance of ButtonPress.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.ButtonPress);
    }

    /**
     * @param {ModuleType} type - The module where the button should be pressed
     * @return {ButtonPress}
     */
    setModuleType (type) {
        this.validateType(ModuleType, type);
        this.setParameter(ButtonPress.KEY_MODULE_TYPE, type);
        return this;
    }

    /**
     * @return {ModuleType}
     */
    getModuleType () {
        return this.getObject(ModuleType, ButtonPress.KEY_MODULE_TYPE);
    }

    /**
     * @param {String} id - Id of a module, published by System Capability.
     * @return {ButtonPress}
     */
    setModuleId (id) {
        this.setParameter(ButtonPress.KEY_MODULE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleId () {
        return this.getParameter(ButtonPress.KEY_MODULE_ID);
    }

    /**
     * @param {ButtonName} name - The name of supported RC climate or radio button.
     * @return {ButtonPress}
     */
    setButtonName (name) {
        this.validateType(ButtonName, name);
        this.setParameter(ButtonPress.KEY_BUTTON_NAME, name);
        return this;
    }

    /**
     * @return {ButtonName}
     */
    getButtonName () {
        return this.getObject(ButtonName, ButtonPress.KEY_BUTTON_NAME);
    }

    /**
     * @param {ButtonPressMode} mode - Indicates whether this is a LONG or SHORT button press event.
     * @return {ButtonPress}
     */
    setButtonPressMode (mode) {
        this.validateType(ButtonPressMode, mode);
        this.setParameter(ButtonPress.KEY_BUTTON_PRESS_MODE, mode);
        return this;
    }

    /**
     * @return {ButtonPressMode}
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