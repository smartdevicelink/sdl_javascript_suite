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
import { ModuleInfo } from './ModuleInfo.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Contains information about a button's capabilities.
 */
class ButtonCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of ButtonCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the NameParam
     * @param {ButtonName} name - The name of the button. See ButtonName. - The desired NameParam.
     * @returns {ButtonCapabilities} - The class instance for method chaining.
     */
    setNameParam (name) {
        this._validateType(ButtonName, name);
        this.setParameter(ButtonCapabilities.KEY_NAME, name);
        return this;
    }

    /**
     * Get the NameParam
     * @returns {ButtonName} - the KEY_NAME value
     */
    getNameParam () {
        return this.getObject(ButtonName, ButtonCapabilities.KEY_NAME);
    }

    /**
     * Set the ModuleInfo
     * @param {ModuleInfo} info - Information about a RC module, including its id. - The desired ModuleInfo.
     * @returns {ButtonCapabilities} - The class instance for method chaining.
     */
    setModuleInfo (info) {
        this._validateType(ModuleInfo, info);
        this.setParameter(ButtonCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * Get the ModuleInfo
     * @returns {ModuleInfo} - the KEY_MODULE_INFO value
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, ButtonCapabilities.KEY_MODULE_INFO);
    }

    /**
     * Set the ShortPressAvailable
     * @param {Boolean} available - The button supports a short press. Whenever the button is pressed short, onButtonPressed( SHORT) will be invoked. - The desired ShortPressAvailable.
     * @returns {ButtonCapabilities} - The class instance for method chaining.
     */
    setShortPressAvailable (available) {
        this.setParameter(ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the ShortPressAvailable
     * @returns {Boolean} - the KEY_SHORT_PRESS_AVAILABLE value
     */
    getShortPressAvailable () {
        return this.getParameter(ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE);
    }

    /**
     * Set the LongPressAvailable
     * @param {Boolean} available - The button supports a LONG press. Whenever the button is pressed long, onButtonPressed( LONG) will be invoked. - The desired LongPressAvailable.
     * @returns {ButtonCapabilities} - The class instance for method chaining.
     */
    setLongPressAvailable (available) {
        this.setParameter(ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the LongPressAvailable
     * @returns {Boolean} - the KEY_LONG_PRESS_AVAILABLE value
     */
    getLongPressAvailable () {
        return this.getParameter(ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE);
    }

    /**
     * Set the UpDownAvailable
     * @param {Boolean} available - The button supports "button down" and "button up". Whenever the button is pressed, onButtonEvent( DOWN) will be invoked. Whenever the button is released, onButtonEvent( UP) will be invoked. - The desired UpDownAvailable.
     * @returns {ButtonCapabilities} - The class instance for method chaining.
     */
    setUpDownAvailable (available) {
        this.setParameter(ButtonCapabilities.KEY_UP_DOWN_AVAILABLE, available);
        return this;
    }

    /**
     * Get the UpDownAvailable
     * @returns {Boolean} - the KEY_UP_DOWN_AVAILABLE value
     */
    getUpDownAvailable () {
        return this.getParameter(ButtonCapabilities.KEY_UP_DOWN_AVAILABLE);
    }
}

ButtonCapabilities.KEY_NAME = 'name';
ButtonCapabilities.KEY_MODULE_INFO = 'moduleInfo';
ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE = 'shortPressAvailable';
ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE = 'longPressAvailable';
ButtonCapabilities.KEY_UP_DOWN_AVAILABLE = 'upDownAvailable';

export { ButtonCapabilities };