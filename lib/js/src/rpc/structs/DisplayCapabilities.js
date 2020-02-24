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
 * Contains information about the display capabilities. This struct is deprecated; please see the new SystemCapability
 * DISPLAYS and corresponding struct DisplayCapability
 * @deprecated
 */
class DisplayCapabilities extends RpcStruct {
    /**
     * @deprecated
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @deprecated
     * @param {DisplayType} type - The type of the display. See DisplayType
     * @return {DisplayCapabilities}
     */
    setDisplayType (type) {
        this.validateType(DisplayType, type);
        this.setParameter(DisplayCapabilities.KEY_DISPLAY_TYPE, type);
        return this;
    }

    /**
     * @deprecated
     * @return {DisplayType}
     */
    getDisplayType () {
        return this.getObject(DisplayType, DisplayCapabilities.KEY_DISPLAY_TYPE);
    }

    /**
     * @deprecated
     * @param {String} name - The name of the display the app is connected to.
     * @return {DisplayCapabilities}
     */
    setDisplayName (name) {
        this.setParameter(DisplayCapabilities.KEY_DISPLAY_NAME, name);
        return this;
    }

    /**
     * @deprecated
     * @return {String}
     */
    getDisplayName () {
        return this.getParameter(DisplayCapabilities.KEY_DISPLAY_NAME);
    }

    /**
     * @deprecated
     * @param {TextField[]} fields - A set of all fields that support text data. See TextField
     * @return {DisplayCapabilities}
     */
    setTextFields (fields) {
        this.validateType(TextField, fields, true);
        this.setParameter(DisplayCapabilities.KEY_TEXT_FIELDS, fields);
        return this;
    }

    /**
     * @deprecated
     * @return {TextField[]}
     */
    getTextFields () {
        return this.getObject(TextField, DisplayCapabilities.KEY_TEXT_FIELDS);
    }

    /**
     * @deprecated
     * @param {ImageField[]} fields - A set of all fields that support images. See ImageField
     * @return {DisplayCapabilities}
     */
    setImageFields (fields) {
        this.validateType(ImageField, fields, true);
        this.setParameter(DisplayCapabilities.KEY_IMAGE_FIELDS, fields);
        return this;
    }

    /**
     * @deprecated
     * @return {ImageField[]}
     */
    getImageFields () {
        return this.getObject(ImageField, DisplayCapabilities.KEY_IMAGE_FIELDS);
    }

    /**
     * @deprecated
     * @param {MediaClockFormat[]} formats - A set of all supported formats of the media clock. See MediaClockFormat
     * @return {DisplayCapabilities}
     */
    setMediaClockFormats (formats) {
        this.validateType(MediaClockFormat, formats, true);
        this.setParameter(DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS, formats);
        return this;
    }

    /**
     * @deprecated
     * @return {MediaClockFormat[]}
     */
    getMediaClockFormats () {
        return this.getObject(MediaClockFormat, DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS);
    }

    /**
     * @deprecated
     * @param {Boolean} supported - The display's persistent screen supports referencing a static or dynamic image.
     * @return {DisplayCapabilities}
     */
    setGraphicSupported (supported) {
        this.setParameter(DisplayCapabilities.KEY_GRAPHIC_SUPPORTED, supported);
        return this;
    }

    /**
     * @deprecated
     * @return {Boolean}
     */
    getGraphicSupported () {
        return this.getParameter(DisplayCapabilities.KEY_GRAPHIC_SUPPORTED);
    }

    /**
     * @deprecated
     * @param {String[]} available - A set of all predefined persistent display templates available on headunit. To be
     *                               referenced in SetDisplayLayout.
     * @return {DisplayCapabilities}
     */
    setTemplatesAvailable (available) {
        this.setParameter(DisplayCapabilities.KEY_TEMPLATES_AVAILABLE, available);
        return this;
    }

    /**
     * @deprecated
     * @return {String[]}
     */
    getTemplatesAvailable () {
        return this.getParameter(DisplayCapabilities.KEY_TEMPLATES_AVAILABLE);
    }

    /**
     * @deprecated
     * @param {ScreenParams} params - A set of all parameters related to a prescribed screen area (e.g. for video /
     *                                touch input).
     * @return {DisplayCapabilities}
     */
    setScreenParams (params) {
        this.validateType(ScreenParams, params);
        this.setParameter(DisplayCapabilities.KEY_SCREEN_PARAMS, params);
        return this;
    }

    /**
     * @deprecated
     * @return {ScreenParams}
     */
    getScreenParams () {
        return this.getObject(ScreenParams, DisplayCapabilities.KEY_SCREEN_PARAMS);
    }

    /**
     * @deprecated
     * @param {Number} available - The number of on-screen custom presets available (if any); otherwise omitted.
     * @return {DisplayCapabilities}
     */
    setNumCustomPresetsAvailable (available) {
        this.setParameter(DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE, available);
        return this;
    }

    /**
     * @deprecated
     * @return {Number}
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