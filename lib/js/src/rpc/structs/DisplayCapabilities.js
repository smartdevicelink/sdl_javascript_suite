/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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

import { RpcStruct } from '../RpcStruct.js';
import { TextField } from './TextField.js';
import { ImageField } from './ImageField.js';
import { ScreenParams } from './ScreenParams.js';
import { DisplayType } from '../enums/DisplayType.js';
import { MediaClockFormat } from '../enums/MediaClockFormat.js';

class DisplayCapabilities extends RpcStruct {

    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {DisplayType} displayType
    * @return {DisplayCapabilities}
    */
    setDisplayType(displayType) {
        this.validateType(DisplayType, displayType);

        this.setParameter(DisplayCapabilities.KEY_DISPLAY_TYPE, displayType);
        return this;
    }

    /**
    * @return {DisplayType}
    */
    getDisplayType() {
        return this.getObject(DisplayType, DisplayCapabilities.KEY_DISPLAY_TYPE);
    }


    /**
    * @param {String} displayName
    * @return {DisplayCapabilities}
    */
    setDisplayName(displayName) {

        this.setParameter(DisplayCapabilities.KEY_DISPLAY_NAME, displayName);
        return this;
    }

    /**
    * @return {String}
    */
    getDisplayType() {
        return this.getParameter(DisplayCapabilities.KEY_DISPLAY_NAME);
    }

    /**
    * @param {Array<TextField>} textFields
    * @return {DisplayCapabilities}
    */
    setTextFields(textFields) {
        //TODO make work with arrays
        //this.validateType(TextField, textFields);

        this.setParameter(DisplayCapabilities.KEY_TEXT_FIELDS, textFields);
        return this;
    }

    /**
    * @return {Array<TextField>}
    */
    getTextFields() {
        return this.getObject(TextField, DisplayCapabilities.KEY_TEXT_FIELDS);
    }


    /**
    * @param {Array<ImageField>} imageFields
    * @return {DisplayCapabilities}
    */
    setImageFields(imageFields) {
        //TODO make work with arrays
        //this.validateType(ImageField, imageFields);

        this.setParameter(DisplayCapabilities.KEY_IMAGE_FIELDS, imageFields);
        return this;
    }

    /**
    * @return {Array<ImageField>}
    */
    getImageFields() {
        return this.getObject(ImageField, DisplayCapabilities.KEY_IMAGE_FIELDS);
    }

    /**
    * @param {Array<MediaClockFormat>} mediaClockFormats
    * @return {DisplayCapabilities}
    */
    setMediaClockFormats(mediaClockFormats) {
        //TODO make work with arrays
        //this.validateType(ImageField, mediaClockFormats);

        this.setParameter(DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS, mediaClockFormats);
        return this;
    }

    /**
    * @return {Array<MediaClockFormat>}
    */
    getMediaClockFormats() {
        return this.getObject(MediaClockFormat, DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS);
    }


    /**
    * @param {Boolean} graphicSupported
    * @return {DisplayCapabilities}
    */
    setGraphicsSupported(graphicSupported) {

        this.setParameter(DisplayCapabilities.KEY_GRAPHICS_SUPPORTED, graphicSupported);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getGraphicsSupported() {
        return this.getParameter(DisplayCapabilities.KEY_GRAPHICS_SUPPORTED);
    }

    /**
    * @param {Array<String>} templatesAvailable
    * @return {DisplayCapabilities}
    */
    setTemplatesAvailable(templatesAvailable) {
        //TODO make work with arrays
        //this.validateType(String, templatesAvailable);

        this.setParameter(DisplayCapabilities.KEY_TEMPLATES_AVAILABLE, templatesAvailable);
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getTemplatesAvailable() {
        return this.getParameter(DisplayCapabilities.KEY_TEMPLATES_AVAILABLE);
    }

    /**
    * @param {ScreenParams} screenParams
    * @return {DisplayCapabilities}
    */
    setScreenParams(screenParams) {
        this.validateType(ScreenParams, screenParams);

        this.setParameter(DisplayCapabilities.KEY_SCREEN_PARAMS, screenParams);
        return this;
    }

    /**
    * @return {ScreenParams}
    */
    getScreenParams() {
        return this.getObject(ScreenParams, DisplayCapabilities.KEY_SCREEN_PARAMS);
    }
    /**
    * @param {Array<Number>} numCustomPresetsAvailable
    * @return {DisplayCapabilities}
    */
    setNumCustomPresetsAvailable(numCustomPresetsAvailable) {
        //TODO make work with arrays
        //this.validateType(Number, numCustomPresetsAvailable);

        this.setParameter(DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE, numCustomPresetsAvailable);
        return this;
    }

    /**
    * @return {Array<Number>}
    */
    getNumCustomPresetsAvailable() {
        return this.getParameter(DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE);
    }


}

DisplayCapabilities.KEY_DISPLAY_TYPE = 'displayType';
DisplayCapabilities.KEY_DISPLAY_NAME = 'displayName';
DisplayCapabilities.KEY_TEXT_FIELDS = 'textFields';
DisplayCapabilities.KEY_IMAGE_FIELDS = 'imageFields';
DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS = 'mediaClockFormats';
DisplayCapabilities.KEY_GRAPHICS_SUPPORTED = 'graphicSupported';
DisplayCapabilities.KEY_TEMPLATES_AVAILABLE = 'templatesAvailable';
DisplayCapabilities.KEY_SCREEN_PARAMS = 'screenParams';
DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE = 'numCustomPresetsAvailable';

export { DisplayCapabilities };
