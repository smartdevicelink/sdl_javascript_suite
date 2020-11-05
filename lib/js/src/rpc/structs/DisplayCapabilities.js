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

import { DisplayType } from '../enums/DisplayType.js';
import { ImageField } from './ImageField.js';
import { MediaClockFormat } from '../enums/MediaClockFormat.js';
import { RpcStruct } from '../RpcStruct.js';
import { ScreenParams } from './ScreenParams.js';
import { TextField } from './TextField.js';

/**
 * Contains information about the display capabilities. This struct is deprecated; please see the new SystemCapability DISPLAYS and corresponding struct DisplayCapability
 * @deprecated
 */
class DisplayCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of DisplayCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 6.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the DisplayType
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 5.0.0
     * @param {DisplayType} type - The type of the display. See DisplayType - The desired DisplayType.
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setDisplayType (type) {
        this._validateType(DisplayType, type);
        this.setParameter(DisplayCapabilities.KEY_DISPLAY_TYPE, type);
        return this;
    }

    /**
     * Get the DisplayType
     * @deprecated
     * @returns {DisplayType} - the KEY_DISPLAY_TYPE value
     */
    getDisplayType () {
        return this.getObject(DisplayType, DisplayCapabilities.KEY_DISPLAY_TYPE);
    }

    /**
     * Set the DisplayName
     * @since SmartDeviceLink 5.0.0
     * @param {String} name - The name of the display the app is connected to. - The desired DisplayName.
     * {'string_min_length': 1}
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setDisplayName (name) {
        this.setParameter(DisplayCapabilities.KEY_DISPLAY_NAME, name);
        return this;
    }

    /**
     * Get the DisplayName
     * @deprecated
     * @returns {String} - the KEY_DISPLAY_NAME value
     */
    getDisplayName () {
        return this.getParameter(DisplayCapabilities.KEY_DISPLAY_NAME);
    }

    /**
     * Set the TextFields
     * @param {TextField[]} fields - A set of all fields that support text data. See TextField - The desired TextFields.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setTextFields (fields) {
        this._validateType(TextField, fields, true);
        this.setParameter(DisplayCapabilities.KEY_TEXT_FIELDS, fields);
        return this;
    }

    /**
     * Get the TextFields
     * @deprecated
     * @returns {TextField[]} - the KEY_TEXT_FIELDS value
     */
    getTextFields () {
        return this.getObject(TextField, DisplayCapabilities.KEY_TEXT_FIELDS);
    }

    /**
     * Set the ImageFields
     * @param {ImageField[]} fields - A set of all fields that support images. See ImageField - The desired ImageFields.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setImageFields (fields) {
        this._validateType(ImageField, fields, true);
        this.setParameter(DisplayCapabilities.KEY_IMAGE_FIELDS, fields);
        return this;
    }

    /**
     * Get the ImageFields
     * @deprecated
     * @returns {ImageField[]} - the KEY_IMAGE_FIELDS value
     */
    getImageFields () {
        return this.getObject(ImageField, DisplayCapabilities.KEY_IMAGE_FIELDS);
    }

    /**
     * Set the MediaClockFormats
     * @param {MediaClockFormat[]} formats - A set of all supported formats of the media clock. See MediaClockFormat - The desired MediaClockFormats.
     * {'array_min_size': 0, 'array_max_size': 100}
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setMediaClockFormats (formats) {
        this._validateType(MediaClockFormat, formats, true);
        this.setParameter(DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS, formats);
        return this;
    }

    /**
     * Get the MediaClockFormats
     * @deprecated
     * @returns {MediaClockFormat[]} - the KEY_MEDIA_CLOCK_FORMATS value
     */
    getMediaClockFormats () {
        return this.getObject(MediaClockFormat, DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS);
    }

    /**
     * Set the GraphicSupported
     * @since SmartDeviceLink 2.0.0
     * @param {Boolean} supported - The display's persistent screen supports referencing a static or dynamic image. - The desired GraphicSupported.
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setGraphicSupported (supported) {
        this.setParameter(DisplayCapabilities.KEY_GRAPHIC_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the GraphicSupported
     * @deprecated
     * @returns {Boolean} - the KEY_GRAPHIC_SUPPORTED value
     */
    getGraphicSupported () {
        return this.getParameter(DisplayCapabilities.KEY_GRAPHIC_SUPPORTED);
    }

    /**
     * Set the TemplatesAvailable
     * @since SmartDeviceLink 3.0.0
     * @param {String[]} available - A set of all predefined persistent display templates available on headunit. To be referenced in SetDisplayLayout. - The desired TemplatesAvailable.
     * {'array_min_size': 0, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 100}
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setTemplatesAvailable (available) {
        this.setParameter(DisplayCapabilities.KEY_TEMPLATES_AVAILABLE, available);
        return this;
    }

    /**
     * Get the TemplatesAvailable
     * @deprecated
     * @returns {String[]} - the KEY_TEMPLATES_AVAILABLE value
     */
    getTemplatesAvailable () {
        return this.getParameter(DisplayCapabilities.KEY_TEMPLATES_AVAILABLE);
    }

    /**
     * Set the ScreenParams
     * @since SmartDeviceLink 3.0.0
     * @param {ScreenParams} params - A set of all parameters related to a prescribed screen area (e.g. for video / touch input). - The desired ScreenParams.
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setScreenParams (params) {
        this._validateType(ScreenParams, params);
        this.setParameter(DisplayCapabilities.KEY_SCREEN_PARAMS, params);
        return this;
    }

    /**
     * Get the ScreenParams
     * @deprecated
     * @returns {ScreenParams} - the KEY_SCREEN_PARAMS value
     */
    getScreenParams () {
        return this.getObject(ScreenParams, DisplayCapabilities.KEY_SCREEN_PARAMS);
    }

    /**
     * Set the NumCustomPresetsAvailable
     * @since SmartDeviceLink 3.0.0
     * @param {Number} available - The number of on-screen custom presets available (if any); otherwise omitted. - The desired NumCustomPresetsAvailable.
     * {'num_min_value': 1, 'num_max_value': 100}
     * @returns {DisplayCapabilities} - The class instance for method chaining.
     */
    setNumCustomPresetsAvailable (available) {
        this.setParameter(DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the NumCustomPresetsAvailable
     * @deprecated
     * @returns {Number} - the KEY_NUM_CUSTOM_PRESETS_AVAILABLE value
     */
    getNumCustomPresetsAvailable () {
        return this.getParameter(DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE);
    }
}

DisplayCapabilities.KEY_DISPLAY_TYPE = 'displayType';
DisplayCapabilities.KEY_DISPLAY_NAME = 'displayName';
DisplayCapabilities.KEY_TEXT_FIELDS = 'textFields';
DisplayCapabilities.KEY_IMAGE_FIELDS = 'imageFields';
DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS = 'mediaClockFormats';
DisplayCapabilities.KEY_GRAPHIC_SUPPORTED = 'graphicSupported';
DisplayCapabilities.KEY_TEMPLATES_AVAILABLE = 'templatesAvailable';
DisplayCapabilities.KEY_SCREEN_PARAMS = 'screenParams';
DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE = 'numCustomPresetsAvailable';

export { DisplayCapabilities };