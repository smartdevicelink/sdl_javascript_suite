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
import { DynamicUpdateCapabilities } from './DynamicUpdateCapabilities.js';
import { ImageField } from './ImageField.js';
import { ImageType } from '../enums/ImageType.js';
import { MenuLayout } from '../enums/MenuLayout.js';
import { RpcStruct } from '../RpcStruct.js';
import { SoftButtonCapabilities } from './SoftButtonCapabilities.js';
import { TextField } from './TextField.js';

class WindowCapability extends RpcStruct {
    /**
     * Initalizes an instance of WindowCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the WindowID
     * @param {Number} id - The specified ID of the window. This ID is either one used when sending the CreateWindow request, or one of the predefined window ID values from the enum PredefinedWindows. If ommited, value is assumed to be the main window on the main display. - The desired WindowID.
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setWindowID (id) {
        this.setParameter(WindowCapability.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * Get the WindowID
     * @returns {Number} - the KEY_WINDOW_ID value
     */
    getWindowID () {
        return this.getParameter(WindowCapability.KEY_WINDOW_ID);
    }

    /**
     * Set the TextFields
     * @param {TextField[]} fields - A set of all fields that support text data. See TextField - The desired TextFields.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setTextFields (fields) {
        this._validateType(TextField, fields, true);
        this.setParameter(WindowCapability.KEY_TEXT_FIELDS, fields);
        return this;
    }

    /**
     * Get the TextFields
     * @returns {TextField[]} - the KEY_TEXT_FIELDS value
     */
    getTextFields () {
        return this.getObject(TextField, WindowCapability.KEY_TEXT_FIELDS);
    }

    /**
     * Set the ImageFields
     * @param {ImageField[]} fields - A set of all fields that support images. See ImageField - The desired ImageFields.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setImageFields (fields) {
        this._validateType(ImageField, fields, true);
        this.setParameter(WindowCapability.KEY_IMAGE_FIELDS, fields);
        return this;
    }

    /**
     * Get the ImageFields
     * @returns {ImageField[]} - the KEY_IMAGE_FIELDS value
     */
    getImageFields () {
        return this.getObject(ImageField, WindowCapability.KEY_IMAGE_FIELDS);
    }

    /**
     * Set the ImageTypeSupported
     * @param {ImageType[]} supported - Provides information about image types supported by the system. - The desired ImageTypeSupported.
     * {'array_min_size': 0, 'array_max_size': 1000}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setImageTypeSupported (supported) {
        this._validateType(ImageType, supported, true);
        this.setParameter(WindowCapability.KEY_IMAGE_TYPE_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the ImageTypeSupported
     * @returns {ImageType[]} - the KEY_IMAGE_TYPE_SUPPORTED value
     */
    getImageTypeSupported () {
        return this.getObject(ImageType, WindowCapability.KEY_IMAGE_TYPE_SUPPORTED);
    }

    /**
     * Set the TemplatesAvailable
     * @param {String[]} available - A set of all window templates available on the head unit. - The desired TemplatesAvailable.
     * {'array_min_size': 0, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 100}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setTemplatesAvailable (available) {
        this.setParameter(WindowCapability.KEY_TEMPLATES_AVAILABLE, available);
        return this;
    }

    /**
     * Get the TemplatesAvailable
     * @returns {String[]} - the KEY_TEMPLATES_AVAILABLE value
     */
    getTemplatesAvailable () {
        return this.getParameter(WindowCapability.KEY_TEMPLATES_AVAILABLE);
    }

    /**
     * Set the NumCustomPresetsAvailable
     * @param {Number} available - The number of on-window custom presets available (if any); otherwise omitted. - The desired NumCustomPresetsAvailable.
     * {'num_min_value': 1, 'num_max_value': 100}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setNumCustomPresetsAvailable (available) {
        this.setParameter(WindowCapability.KEY_NUM_CUSTOM_PRESETS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the NumCustomPresetsAvailable
     * @returns {Number} - the KEY_NUM_CUSTOM_PRESETS_AVAILABLE value
     */
    getNumCustomPresetsAvailable () {
        return this.getParameter(WindowCapability.KEY_NUM_CUSTOM_PRESETS_AVAILABLE);
    }

    /**
     * Set the ButtonCapabilities
     * @param {ButtonCapabilities[]} capabilities - The number of buttons and the capabilities of each on-window button. - The desired ButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setButtonCapabilities (capabilities) {
        this._validateType(ButtonCapabilities, capabilities, true);
        this.setParameter(WindowCapability.KEY_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the ButtonCapabilities
     * @returns {ButtonCapabilities[]} - the KEY_BUTTON_CAPABILITIES value
     */
    getButtonCapabilities () {
        return this.getObject(ButtonCapabilities, WindowCapability.KEY_BUTTON_CAPABILITIES);
    }

    /**
     * Set the SoftButtonCapabilities
     * @param {SoftButtonCapabilities[]} capabilities - The number of soft buttons available on-window and the capabilities for each button. - The desired SoftButtonCapabilities.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setSoftButtonCapabilities (capabilities) {
        this._validateType(SoftButtonCapabilities, capabilities, true);
        this.setParameter(WindowCapability.KEY_SOFT_BUTTON_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the SoftButtonCapabilities
     * @returns {SoftButtonCapabilities[]} - the KEY_SOFT_BUTTON_CAPABILITIES value
     */
    getSoftButtonCapabilities () {
        return this.getObject(SoftButtonCapabilities, WindowCapability.KEY_SOFT_BUTTON_CAPABILITIES);
    }

    /**
     * Set the MenuLayoutsAvailable
     * @param {MenuLayout[]} available - An array of available menu layouts. If this parameter is not provided, only the `LIST` layout is assumed to be available - The desired MenuLayoutsAvailable.
     * {'array_min_size': 1, 'array_max_size': 1000}
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setMenuLayoutsAvailable (available) {
        this._validateType(MenuLayout, available, true);
        this.setParameter(WindowCapability.KEY_MENU_LAYOUTS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the MenuLayoutsAvailable
     * @returns {MenuLayout[]} - the KEY_MENU_LAYOUTS_AVAILABLE value
     */
    getMenuLayoutsAvailable () {
        return this.getObject(MenuLayout, WindowCapability.KEY_MENU_LAYOUTS_AVAILABLE);
    }

    /**
     * Set the DynamicUpdateCapabilities
     * @param {DynamicUpdateCapabilities} capabilities - Contains the head unit's capabilities for dynamic updating features declaring if the module will send dynamic update RPCs. - The desired DynamicUpdateCapabilities.
     * @returns {WindowCapability} - The class instance for method chaining.
     */
    setDynamicUpdateCapabilities (capabilities) {
        this._validateType(DynamicUpdateCapabilities, capabilities);
        this.setParameter(WindowCapability.KEY_DYNAMIC_UPDATE_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the DynamicUpdateCapabilities
     * @returns {DynamicUpdateCapabilities} - the KEY_DYNAMIC_UPDATE_CAPABILITIES value
     */
    getDynamicUpdateCapabilities () {
        return this.getObject(DynamicUpdateCapabilities, WindowCapability.KEY_DYNAMIC_UPDATE_CAPABILITIES);
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
WindowCapability.KEY_DYNAMIC_UPDATE_CAPABILITIES = 'dynamicUpdateCapabilities';

export { WindowCapability };