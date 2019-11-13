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

import { RpcRequest } from '../RpcRequest.js';
import { Image } from '../structs/Image.js';
import { FunctionID } from '../enums/FunctionID.js';

class Show extends RpcRequest {

    /**
    * @constructor
    */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.SHOW);
    }


    /**
    * @param {String} mainField1
    * @return {Show}
    */
    setMainField1(mainField1) {
        this.setParameter(Show.KEY_MAIN_FIELD_1, mainField1);
        return this;
    }

    /**
    * @return {String}
    */
    getMainField1() {
        return this.getParameter(Show.KEY_MAIN_FIELD_1);
    }

    /**
    * @param {String} mainField2
    * @return {Show}
    */
    setMainField2(mainField2) {
        this.setParameter(Show.KEY_MAIN_FIELD_2, mainField2);
        return this;
    }

    /**
    * @return {String}
    */
    getMainField2() {
        return this.getParameter(Show.KEY_MAIN_FIELD_2);
    }

    /**
    * @param {String} mainField3
    * @return {Show}
    */
    setMainField3(mainField3) {
        this.setParameter(Show.KEY_MAIN_FIELD_3, mainField3);
        return this;
    }

    /**
    * @return {String}
    */
    getMainField3() {
        return this.getParameter(Show.KEY_MAIN_FIELD_3);
    }

    /**
    * @param {String} mainField4
    * @return {Show}
    */
    setMainField4(mainField4) {
        this.setParameter(Show.KEY_MAIN_FIELD_4, mainField4);
        return this;
    }

    /**
    * @return {String}
    */
    getMainField4() {
        return this.getParameter(Show.KEY_MAIN_FIELD_4);
    }

    /**
    * @param {TextAlignment} menuParams
    * @return {Show}
    */
    setAlignment(alignment) {
        this.validateType(TextAlignment, alignment);

        this.setParameter(Show.KEY_ALIGNMENT, alignment);
        return this;
    }

    /**
    * @return {TextAlignment}
    */
    getAlignment() {
        return this.getObject(TextAlignment, Show.KEY_ALIGNMENT);
    }

    /**
    * @param {String} statusBar
    * @return {Show}
    */
    setStatusBar(statusBar) {
        this.setParameter(Show.KEY_STATUS_BAR, statusBar);
        return this;
    }

    /**
    * @return {String}
    */
    getStatusBar() {
        return this.getParameter(Show.KEY_STATUS_BAR);
    }

    /**
    * @param {String} mediaClock
    * @return {Show}
    */
    setMediaClock(mediaClock) {
        this.setParameter(Show.KEY_MEDIA_CLOCK, mediaClock);
        return this;
    }

    /**
    * @return {String}
    */
    getMediaClock() {
        return this.getParameter(Show.KEY_MEDIA_CLOCK);
    }

    /**
    * @param {String} mediaTrack
    * @return {Show}
    */
    setMediaTrack(mediaTrack) {
        this.setParameter(Show.KEY_MEDIA_TRACK, mediaTrack);
        return this;
    }

    /**
    * @return {String}
    */
    getMediaTrack() {
        return this.getParameter(Show.KEY_MEDIA_TRACK);
    }

    /**
    * @param {Image} graphic
    * @return {Show}
    */
    setGraphic(graphic) {
        this.validateType(TextAlignment, graphic);

        this.setParameter(Show.KEY_GRAPHIC, graphic);
        return this;
    }

    /**
    * @return {Image}
    */
    getGraphic() {
        return this.getObject(Image, Show.KEY_GRAPHIC);
    }

    /**
    * @param {Image} secondaryGraphic
    * @return {Show}
    */
    setSecondaryGraphic(secondaryGraphic) {
        this.validateType(TextAlignment, secondaryGraphic);

        this.setParameter(Show.KEY_SECONDARY_GRAPHIC, secondaryGraphic);
        return this;
    }

    /**
    * @return {Image}
    */
    getSecondaryGraphic() {
        return this.getObject(Image, Show.KEY_SECONDARY_GRAPHIC);
    }

    /**
    * @param {Array<SoftButton>} softButtons
    * @return {Show}
    */
    setSoftButtons(softButtons) {
        //TODO make this work for arrays
        //this.validateType(SoftButton, softButtons);

        this.setParameter(Show.KEY_SOFT_BUTTONS, softButtons);
        return this;
    }

    /**
    * @return {Array<SoftButton>}
    */
    getSoftButtons() {
        return this.getObject(SoftButton, Show.KEY_SOFT_BUTTONS);
    }

    /**
    * @param {Array<String>} customPresets
    * @return {Show}
    */
    setCustomPresets(customPresets) {
        this.setParameter(Show.KEY_CUSTOM_PRESETS, customPresets);
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getCustomPresets() {
        return this.getParameter(Show.KEY_CUSTOM_PRESETS);
    }

    /**
    * @param {MetadataTags} metadataTags
    * @return {Show}
    */
    setMetadataTags(metadataTags) {
        this.validateType(MetadataTags, metadataTags);

        this.setParameter(Show.KEY_METADATA_TAGS, metadataTags);
        return this;
    }

    /**
    * @return {MetadataTags}
    */
    getMetadataTags() {
        return this.getObject(MetadataTags, Show.KEY_METADATA_TAGS);
    }

    /**
    * @param {String} templateTitle
    * @return {Show}
    */
    setTemplateTitle(templateTitle) {
        this.setParameter(Show.KEY_TEMPLATE_TITLE, templateTitle);
        return this;
    }

    /**
    * @return {String}
    */
    getTemplateTitle() {
        return this.getParameter(Show.KEY_TEMPLATE_TITLE);
    }

    /**
    * @param {Number} windowID
    * @return {Show}
    */
    setWindowID(windowID) {
        this.setParameter(Show.KEY_WINDOW_ID, windowID);
        return this;
    }

    /**
    * @return {Number}
    */
    getWindowID() {
        return this.getParameter(Show.KEY_WINDOW_ID);
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

export { Show };
