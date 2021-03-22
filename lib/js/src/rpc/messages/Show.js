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

import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { MetadataTags } from '../structs/MetadataTags.js';
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';
import { TemplateConfiguration } from '../structs/TemplateConfiguration.js';
import { TextAlignment } from '../enums/TextAlignment.js';

/**
 * Updates the persistent display. Supported fields depend on display capabilities.
 */
class Show extends RpcRequest {
    /**
     * Initializes an instance of Show.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.Show);
    }

    /**
     * Set the MainField1
     * @since SmartDeviceLink 1.0.0
     * @param {String} field1 - The text that should be displayed in a single or upper display line. If this text is not set, the text of mainField1 stays unchanged. If this text is empty "", the field will be cleared. - The desired MainField1.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setMainField1 (field1) {
        this.setParameter(Show.KEY_MAIN_FIELD_1, field1);
        return this;
    }

    /**
     * Get the MainField1
     * @returns {String} - the KEY_MAIN_FIELD_1 value
     */
    getMainField1 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_1);
    }

    /**
     * Set the MainField2
     * @since SmartDeviceLink 1.0.0
     * @param {String} field2 - The text that should be displayed on the second display line. If this text is not set, the text of mainField2 stays unchanged. If this text is empty "", the field will be cleared. - The desired MainField2.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setMainField2 (field2) {
        this.setParameter(Show.KEY_MAIN_FIELD_2, field2);
        return this;
    }

    /**
     * Get the MainField2
     * @returns {String} - the KEY_MAIN_FIELD_2 value
     */
    getMainField2 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_2);
    }

    /**
     * Set the MainField3
     * @since SmartDeviceLink 2.0.0
     * @param {String} field3 - The text that should be displayed on the second "page" first display line. If this text is not set, the text of mainField3 stays unchanged. If this text is empty "", the field will be cleared. - The desired MainField3.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setMainField3 (field3) {
        this.setParameter(Show.KEY_MAIN_FIELD_3, field3);
        return this;
    }

    /**
     * Get the MainField3
     * @returns {String} - the KEY_MAIN_FIELD_3 value
     */
    getMainField3 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_3);
    }

    /**
     * Set the MainField4
     * @since SmartDeviceLink 2.0.0
     * @param {String} field4 - The text that should be displayed on the second "page" second display line. If this text is not set, the text of mainField4 stays unchanged. If this text is empty "", the field will be cleared. - The desired MainField4.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setMainField4 (field4) {
        this.setParameter(Show.KEY_MAIN_FIELD_4, field4);
        return this;
    }

    /**
     * Get the MainField4
     * @returns {String} - the KEY_MAIN_FIELD_4 value
     */
    getMainField4 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_4);
    }

    /**
     * Set the Alignment
     * @since SmartDeviceLink 1.0.0
     * @param {TextAlignment} alignment - Specifies how mainField1 and mainField2 texts should be aligned on display. If omitted, texts will be centered. - The desired Alignment.
     * @returns {Show} - The class instance for method chaining.
     */
    setAlignment (alignment) {
        this._validateType(TextAlignment, alignment);
        this.setParameter(Show.KEY_ALIGNMENT, alignment);
        return this;
    }

    /**
     * Get the Alignment
     * @returns {TextAlignment} - the KEY_ALIGNMENT value
     */
    getAlignment () {
        return this.getObject(TextAlignment, Show.KEY_ALIGNMENT);
    }

    /**
     * Set the StatusBar
     * @since SmartDeviceLink 1.0.0
     * @param {String} bar - Requires investigation regarding the nav display capabilities. Potentially lower lowerStatusBar, upperStatusBar, titleBar, etc. - The desired StatusBar.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setStatusBar (bar) {
        this.setParameter(Show.KEY_STATUS_BAR, bar);
        return this;
    }

    /**
     * Get the StatusBar
     * @returns {String} - the KEY_STATUS_BAR value
     */
    getStatusBar () {
        return this.getParameter(Show.KEY_STATUS_BAR);
    }

    /**
     * Set the MediaClock
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @param {String} clock - Text value for MediaClock field. Has to be properly formatted by Mobile App according to the module's capabilities. If this text is set, any automatic media clock updates previously set with SetMediaClockTimer will be stopped. - The desired MediaClock.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setMediaClock (clock) {
        this.setParameter(Show.KEY_MEDIA_CLOCK, clock);
        return this;
    }

    /**
     * Get the MediaClock
     * @since SmartDeviceLink 1.0.0
     * @deprecated in SmartDeviceLink 7.1.0
     * @returns {String} - the KEY_MEDIA_CLOCK value
     */
    getMediaClock () {
        return this.getParameter(Show.KEY_MEDIA_CLOCK);
    }

    /**
     * Set the MediaTrack
     * @since SmartDeviceLink 1.0.0
     * @param {String} track - The text that should be displayed in the track field. If this text is not set, the text of mediaTrack stays unchanged. If this text is empty "", the field will be cleared. - The desired MediaTrack.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setMediaTrack (track) {
        this.setParameter(Show.KEY_MEDIA_TRACK, track);
        return this;
    }

    /**
     * Get the MediaTrack
     * @returns {String} - the KEY_MEDIA_TRACK value
     */
    getMediaTrack () {
        return this.getParameter(Show.KEY_MEDIA_TRACK);
    }

    /**
     * Set the Graphic
     * @since SmartDeviceLink 3.0.0
     * @param {Image} graphic - Image struct determining whether static or dynamic image to display in app. If omitted on supported displays, the displayed graphic shall not change. - The desired Graphic.
     * @returns {Show} - The class instance for method chaining.
     */
    setGraphic (graphic) {
        this._validateType(Image, graphic);
        this.setParameter(Show.KEY_GRAPHIC, graphic);
        return this;
    }

    /**
     * Get the Graphic
     * @returns {Image} - the KEY_GRAPHIC value
     */
    getGraphic () {
        return this.getObject(Image, Show.KEY_GRAPHIC);
    }

    /**
     * Set the SecondaryGraphic
     * @since SmartDeviceLink 3.0.0
     * @param {Image} graphic - Image struct determining whether static or dynamic secondary image to display in app. If omitted on supported displays, the displayed secondary graphic shall not change. - The desired SecondaryGraphic.
     * @returns {Show} - The class instance for method chaining.
     */
    setSecondaryGraphic (graphic) {
        this._validateType(Image, graphic);
        this.setParameter(Show.KEY_SECONDARY_GRAPHIC, graphic);
        return this;
    }

    /**
     * Get the SecondaryGraphic
     * @returns {Image} - the KEY_SECONDARY_GRAPHIC value
     */
    getSecondaryGraphic () {
        return this.getObject(Image, Show.KEY_SECONDARY_GRAPHIC);
    }

    /**
     * Set the SoftButtons
     * @since SmartDeviceLink 2.0.0
     * @param {SoftButton[]} buttons - App defined SoftButtons. If omitted on supported displays, the currently displayed SoftButton values will not change. - The desired SoftButtons.
     * {'array_min_size': 0, 'array_max_size': 8}
     * @returns {Show} - The class instance for method chaining.
     */
    setSoftButtons (buttons) {
        this._validateType(SoftButton, buttons, true);
        this.setParameter(Show.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButton[]} - the KEY_SOFT_BUTTONS value
     */
    getSoftButtons () {
        return this.getObject(SoftButton, Show.KEY_SOFT_BUTTONS);
    }

    /**
     * Set the CustomPresets
     * @since SmartDeviceLink 3.0.0
     * @param {String[]} presets - App labeled on-screen presets (i.e. on-screen media presets or dynamic search suggestions). If omitted on supported displays, the presets will be shown as not defined. - The desired CustomPresets.
     * {'array_min_size': 0, 'array_max_size': 10, 'string_min_length': 1, 'string_max_length': 500}
     * @returns {Show} - The class instance for method chaining.
     */
    setCustomPresets (presets) {
        this.setParameter(Show.KEY_CUSTOM_PRESETS, presets);
        return this;
    }

    /**
     * Get the CustomPresets
     * @returns {String[]} - the KEY_CUSTOM_PRESETS value
     */
    getCustomPresets () {
        return this.getParameter(Show.KEY_CUSTOM_PRESETS);
    }

    /**
     * Set the MetadataTags
     * @since SmartDeviceLink 4.5.0
     * @param {MetadataTags} tags - App defined metadata information. See MetadataStruct. Uses mainField1, mainField2, mainField3, mainField4. If omitted on supported displays, the currently set metadata tags will not change. If any text field contains no tags or the none tag, the metadata tag for that textfield should be removed. - The desired MetadataTags.
     * @returns {Show} - The class instance for method chaining.
     */
    setMetadataTags (tags) {
        this._validateType(MetadataTags, tags);
        this.setParameter(Show.KEY_METADATA_TAGS, tags);
        return this;
    }

    /**
     * Get the MetadataTags
     * @returns {MetadataTags} - the KEY_METADATA_TAGS value
     */
    getMetadataTags () {
        return this.getObject(MetadataTags, Show.KEY_METADATA_TAGS);
    }

    /**
     * Set the TemplateTitle
     * @since SmartDeviceLink 6.0.0
     * @param {String} title - The title of the new template that will be displayed. How this will be displayed is dependent on the OEM design and implementation of the template. - The desired TemplateTitle.
     * {'string_min_length': 0, 'string_max_length': 100}
     * @returns {Show} - The class instance for method chaining.
     */
    setTemplateTitle (title) {
        this.setParameter(Show.KEY_TEMPLATE_TITLE, title);
        return this;
    }

    /**
     * Get the TemplateTitle
     * @returns {String} - the KEY_TEMPLATE_TITLE value
     */
    getTemplateTitle () {
        return this.getParameter(Show.KEY_TEMPLATE_TITLE);
    }

    /**
     * Set the WindowID
     * @since SmartDeviceLink 6.0.0
     * @param {Number} id - This is the unique ID assigned to the window that this RPC is intended. If this param is not included, it will be assumed that this request is specifically for the main window on the main display. See PredefinedWindows enum. - The desired WindowID.
     * @returns {Show} - The class instance for method chaining.
     */
    setWindowID (id) {
        this.setParameter(Show.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * Get the WindowID
     * @returns {Number} - the KEY_WINDOW_ID value
     */
    getWindowID () {
        return this.getParameter(Show.KEY_WINDOW_ID);
    }

    /**
     * Set the TemplateConfiguration
     * @since SmartDeviceLink 6.0.0
     * @param {TemplateConfiguration} configuration - Used to set an alternate template layout to a window. - The desired TemplateConfiguration.
     * @returns {Show} - The class instance for method chaining.
     */
    setTemplateConfiguration (configuration) {
        this._validateType(TemplateConfiguration, configuration);
        this.setParameter(Show.KEY_TEMPLATE_CONFIGURATION, configuration);
        return this;
    }

    /**
     * Get the TemplateConfiguration
     * @returns {TemplateConfiguration} - the KEY_TEMPLATE_CONFIGURATION value
     */
    getTemplateConfiguration () {
        return this.getObject(TemplateConfiguration, Show.KEY_TEMPLATE_CONFIGURATION);
    }
}

Show.KEY_MAIN_FIELD_1 = 'mainField1';
Show.KEY_MAIN_FIELD_2 = 'mainField2';
Show.KEY_MAIN_FIELD_3 = 'mainField3';
Show.KEY_MAIN_FIELD_4 = 'mainField4';
Show.KEY_ALIGNMENT = 'alignment';
Show.KEY_STATUS_BAR = 'statusBar';
Show.KEY_MEDIA_CLOCK = 'mediaClock';
Show.KEY_MEDIA_TRACK = 'mediaTrack';
Show.KEY_GRAPHIC = 'graphic';
Show.KEY_SECONDARY_GRAPHIC = 'secondaryGraphic';
Show.KEY_SOFT_BUTTONS = 'softButtons';
Show.KEY_CUSTOM_PRESETS = 'customPresets';
Show.KEY_METADATA_TAGS = 'metadataTags';
Show.KEY_TEMPLATE_TITLE = 'templateTitle';
Show.KEY_WINDOW_ID = 'windowID';
Show.KEY_TEMPLATE_CONFIGURATION = 'templateConfiguration';

export { Show };