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

import { TextAlignment } from '../enums/TextAlignment.js';
import { FunctionID } from '../enums/FunctionID.js';
import { SoftButton } from '../structs/SoftButton.js';
import { TemplateConfiguration } from '../structs/TemplateConfiguration.js';
import { MetadataTags } from '../structs/MetadataTags.js';
import { RpcRequest } from '../RpcRequest.js';
import { Image } from '../structs/Image.js';

/**
 * Updates the persistent display. Supported fields depend on display capabilities.
 */
class Show extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.Show);
    }

    /**
     * @param {String} field1 - The text that should be displayed in a single or upper display line. If this text is not
     *                          set, the text of mainField1 stays unchanged. If this text is empty "", the field will be
     *                          cleared.
     * @return {Show}
     */
    setMainField1 (field1) {
        this.setParameter(Show.KEY_MAIN_FIELD_1, field1);
        return this;
    }

    /**
     * @return {String}
     */
    getMainField1 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_1);
    }

    /**
     * @param {String} field2 - The text that should be displayed on the second display line. If this text is not set,
     *                          the text of mainField2 stays unchanged. If this text is empty "", the field will be
     *                          cleared.
     * @return {Show}
     */
    setMainField2 (field2) {
        this.setParameter(Show.KEY_MAIN_FIELD_2, field2);
        return this;
    }

    /**
     * @return {String}
     */
    getMainField2 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_2);
    }

    /**
     * @param {String} field3 - The text that should be displayed on the second "page" first display line. If this text
     *                          is not set, the text of mainField3 stays unchanged. If this text is empty "", the field
     *                          will be cleared.
     * @return {Show}
     */
    setMainField3 (field3) {
        this.setParameter(Show.KEY_MAIN_FIELD_3, field3);
        return this;
    }

    /**
     * @return {String}
     */
    getMainField3 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_3);
    }

    /**
     * @param {String} field4 - The text that should be displayed on the second "page" second display line. If this text
     *                          is not set, the text of mainField4 stays unchanged. If this text is empty "", the field
     *                          will be cleared.
     * @return {Show}
     */
    setMainField4 (field4) {
        this.setParameter(Show.KEY_MAIN_FIELD_4, field4);
        return this;
    }

    /**
     * @return {String}
     */
    getMainField4 () {
        return this.getParameter(Show.KEY_MAIN_FIELD_4);
    }

    /**
     * @param {TextAlignment} alignment - Specifies how mainField1 and mainField2 texts should be aligned on display. If
     *                                    omitted, texts will be centered.
     * @return {Show}
     */
    setAlignment (alignment) {
        this.validateType(TextAlignment, alignment);
        this.setParameter(Show.KEY_ALIGNMENT, alignment);
        return this;
    }

    /**
     * @return {TextAlignment}
     */
    getAlignment () {
        return this.getObject(TextAlignment, Show.KEY_ALIGNMENT);
    }

    /**
     * @param {String} bar - Requires investigation regarding the nav display capabilities. Potentially lower
     *                       lowerStatusBar, upperStatusBar, titleBar, etc.
     * @return {Show}
     */
    setStatusBar (bar) {
        this.setParameter(Show.KEY_STATUS_BAR, bar);
        return this;
    }

    /**
     * @return {String}
     */
    getStatusBar () {
        return this.getParameter(Show.KEY_STATUS_BAR);
    }

    /**
     * @param {String} clock - Text value for MediaClock field. Has to be properly formatted by Mobile App according to
     *                         the module's capabilities. If this text is set, any automatic media clock updates
     *                         previously set with SetMediaClockTimer will be stopped.
     * @return {Show}
     */
    setMediaClock (clock) {
        this.setParameter(Show.KEY_MEDIA_CLOCK, clock);
        return this;
    }

    /**
     * @return {String}
     */
    getMediaClock () {
        return this.getParameter(Show.KEY_MEDIA_CLOCK);
    }

    /**
     * @param {String} track - The text that should be displayed in the track field. If this text is not set, the text
     *                         of mediaTrack stays unchanged. If this text is empty "", the field will be cleared.
     * @return {Show}
     */
    setMediaTrack (track) {
        this.setParameter(Show.KEY_MEDIA_TRACK, track);
        return this;
    }

    /**
     * @return {String}
     */
    getMediaTrack () {
        return this.getParameter(Show.KEY_MEDIA_TRACK);
    }

    /**
     * @param {Image} graphic - Image struct determining whether static or dynamic image to display in app. If omitted
     *                          on supported displays, the displayed graphic shall not change.
     * @return {Show}
     */
    setGraphic (graphic) {
        this.validateType(Image, graphic);
        this.setParameter(Show.KEY_GRAPHIC, graphic);
        return this;
    }

    /**
     * @return {Image}
     */
    getGraphic () {
        return this.getObject(Image, Show.KEY_GRAPHIC);
    }

    /**
     * @param {Image} graphic - Image struct determining whether static or dynamic secondary image to display in app. If
     *                          omitted on supported displays, the displayed secondary graphic shall not change.
     * @return {Show}
     */
    setSecondaryGraphic (graphic) {
        this.validateType(Image, graphic);
        this.setParameter(Show.KEY_SECONDARY_GRAPHIC, graphic);
        return this;
    }

    /**
     * @return {Image}
     */
    getSecondaryGraphic () {
        return this.getObject(Image, Show.KEY_SECONDARY_GRAPHIC);
    }

    /**
     * @param {SoftButton[]} buttons - App defined SoftButtons. If omitted on supported displays, the currently
     *                                 displayed SoftButton values will not change.
     * @return {Show}
     */
    setSoftButtons (buttons) {
        this.validateType(SoftButton, buttons, true);
        this.setParameter(Show.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * @return {SoftButton[]}
     */
    getSoftButtons () {
        return this.getObject(SoftButton, Show.KEY_SOFT_BUTTONS);
    }

    /**
     * @param {String[]} presets - App labeled on-screen presets (i.e. on-screen media presets or dynamic search
     *                             suggestions). If omitted on supported displays, the presets will be shown as not
     *                             defined.
     * @return {Show}
     */
    setCustomPresets (presets) {
        this.setParameter(Show.KEY_CUSTOM_PRESETS, presets);
        return this;
    }

    /**
     * @return {String[]}
     */
    getCustomPresets () {
        return this.getParameter(Show.KEY_CUSTOM_PRESETS);
    }

    /**
     * @param {MetadataTags} tags - App defined metadata information. See MetadataStruct. Uses mainField1, mainField2,
     *                              mainField3, mainField4. If omitted on supported displays, the currently set metadata
     *                              tags will not change. If any text field contains no tags or the none tag, the
     *                              metadata tag for that textfield should be removed.
     * @return {Show}
     */
    setMetadataTags (tags) {
        this.validateType(MetadataTags, tags);
        this.setParameter(Show.KEY_METADATA_TAGS, tags);
        return this;
    }

    /**
     * @return {MetadataTags}
     */
    getMetadataTags () {
        return this.getObject(MetadataTags, Show.KEY_METADATA_TAGS);
    }

    /**
     * @param {String} title - The title of the new template that will be displayed. How this will be displayed is
     *                         dependent on the OEM design and implementation of the template.
     * @return {Show}
     */
    setTemplateTitle (title) {
        this.setParameter(Show.KEY_TEMPLATE_TITLE, title);
        return this;
    }

    /**
     * @return {String}
     */
    getTemplateTitle () {
        return this.getParameter(Show.KEY_TEMPLATE_TITLE);
    }

    /**
     * @param {Number} id - This is the unique ID assigned to the window that this RPC is intended. If this param is not
     *                      included, it will be assumed that this request is specifically for the main window on the
     *                      main display. See PredefinedWindows enum.
     * @return {Show}
     */
    setWindowID (id) {
        this.setParameter(Show.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getWindowID () {
        return this.getParameter(Show.KEY_WINDOW_ID);
    }

    /**
     * @param {TemplateConfiguration} configuration - Used to set an alternate template layout to a window.
     * @return {Show}
     */
    setTemplateConfiguration (configuration) {
        this.validateType(TemplateConfiguration, configuration);
        this.setParameter(Show.KEY_TEMPLATE_CONFIGURATION, configuration);
        return this;
    }

    /**
     * @return {TemplateConfiguration}
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