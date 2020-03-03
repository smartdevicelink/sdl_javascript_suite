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

import { ButtonCapabilities } from './ButtonCapabilities.js';
import { ImageField } from './ImageField.js';
import { ImageType } from '../enums/ImageType.js';
import { MenuLayout } from '../enums/MenuLayout.js';
import { RpcStruct } from '../RpcStruct.js';
import { SoftButtonCapabilities } from './SoftButtonCapabilities.js';
import { TextField } from './TextField.js';

class WindowCapability extends RpcStruct {
    /**
     * Initalizes an instance of WindowCapability.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} id - The specified ID of the window. This ID is either one used when sending the CreateWindow
     *                      request, or one of the predefined window ID values from the enum PredefinedWindows. If
     *                      ommited, value is assumed to be the main window on the main display.
     * @return {WindowCapability}
     */
    setWindowID (id) {
        this.setParameter(WindowCapability.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getWindowID () {
        return this.getParameter(WindowCapability.KEY_WINDOW_ID);
    }

    /**
     * @param {TextField[]} fields - A set of all fields that support text data. See TextField
     * @return {WindowCapability}
     */
    setTextFields (fields) {
        this.validateType(TextField, fields, true);
        this.setParameter(WindowCapability.KEY_TEXT_FIELDS, fields);
        return this;
    }

    /**
     * @return {TextField[]}
     */
    getTextFields () {
        return this.getObject(TextField, WindowCapability.KEY_TEXT_FIELDS);
    }

    /**
     * @param {ImageField[]} fields - A set of all fields that support images. See ImageField
     * @return {WindowCapability}
     */
    setImageFields (fields) {
        this.validateType(ImageField, fields, true);
        this.setParameter(WindowCapability.KEY_IMAGE_FIELDS, fields);
        return this;
    }

    /**
     * @return {ImageField[]}
     */
    getImageFields () {
        return this.getObject(ImageField, WindowCapability.KEY_IMAGE_FIELDS);
    }

    /**
     * @param {ImageType[]} supported - Provides information about image types supported by the system.
     * @return {WindowCapability}
     */
    setImageTypeSupported (supported) {
        this.validateType(ImageType, supported, true);
        this.setParameter(WindowCapability.KEY_IMAGE_TYPE_SUPPORTED, supported);
        return this;
    }

    /**
     * @return {ImageType[]}
     */
    getImageTypeSupported () {
        return this.getObject(ImageType, WindowCapability.KEY_IMAGE_TYPE_SUPPORTED);
    }

    /**
     * @param {String[]} available - A set of all window templates available on the head unit.
     * @return {WindowCapability}
     */
    setTemplatesAvailable (available) {
        this.setParameter(WindowCapability.KEY_TEMPLATES_AVAILABLE, available);
        return this;
    }

    /**
     * @return {String[]}
     */
    getTemplatesAvailable () {
        return this.getParameter(WindowCapability.KEY_TEMPLATES_AVAILABLE);
    }

    /**
     * @param {Number} available - The number of on-window custom presets available (if any); otherwise omitted.
     * @return {WindowCapability}
     */
    setNumCustomPresetsAvailable (available) {
        this.setParameter(WindowCapability.KEY_NUM_CUSTOM_PRESETS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Number}
     */
    getNumCustomPresetsAvailable () {
        return this.getParameter(WindowCapability.KEY_NUM_CUSTOM_PRESETS_AVAILABLE);
    }

    /**
     * @param {ButtonCapabilities[]} capabilities - The number of buttons and the capabilities of each on-window button.
     * @return {WindowCapability}
     */
    setButtonCapabilities (capabilities) {
        this.validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(WindowCapability.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {ButtonCapabilities[]}
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, WindowCapability.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * @param {SoftButtonCapabilities[]} capabilities - The number of soft buttons available on-window and the
     *                                                  capabilities for each button.
     * @return {WindowCapability}
     */
    setSoftButtonCapabilities (capabilities) {
        this.validateType(SoftButtonCapabilities, capabilities, true);
        this.setParameter(WindowCapability.KEY_SOFT_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {SoftButtonCapabilities[]}
     */
    getSoftButtonCapabilities () {
        return this.getObject(SoftButtonCapabilities, WindowCapability.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
     * @param {MenuLayout[]} available - An array of available menu layouts. If this parameter is not provided, only the
     *                                   `LIST` layout is assumed to be available
     * @return {WindowCapability}
     */
    setMenuLayoutsAvailable (available) {
        this.validateType(MenuLayout, available, true);
        this.setParameter(WindowCapability.KEY_MENU_LAYOUTS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {MenuLayout[]}
     */
    getMenuLayoutsAvailable () {
        return this.getObject(MenuLayout, WindowCapability.KEY_MENU_LAYOUTS_AVAILABLE);
    }
}

WindowCapability.KEY_WINDOW_ID = 'windowID';
WindowCapability.KEY_TEXT_FIELDS = 'textFields';
WindowCapability.KEY_IMAGE_FIELDS = 'imageFields';
WindowCapability.KEY_IMAGE_TYPE_SUPPORTED = 'imageTypeSupported';
WindowCapability.KEY_TEMPLATES_AVAILABLE = 'templatesAvailable';
WindowCapability.KEY_NUM_CUSTOM_PRESETS_AVAILABLE = 'numCustomPresetsAvailable';
WindowCapability.KEY_BUTTON_CAPABILITIES = 'buttonCapabilities';
WindowCapability.KEY_SOFT_BUTTON_CAPABILITIES = 'softButtonCapabilities';
WindowCapability.KEY_MENU_LAYOUTS_AVAILABLE = 'menuLayoutsAvailable';

export { WindowCapability };