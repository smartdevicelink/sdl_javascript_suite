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

import { Image } from './Image.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * A choice is an option given to the user, which can be selected either by menu, or through voice recognition system.
 */
class Choice extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} id
     * @return {Choice}
     */
    setChoiceID (id) {
        this.setParameter(Choice.KEY_CHOICE_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getChoiceID () {
        return this.getParameter(Choice.KEY_CHOICE_ID);
    }

    /**
     * @param {String} name
     * @return {Choice}
     */
    setMenuName (name) {
        this.setParameter(Choice.KEY_MENU_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getMenuName () {
        return this.getParameter(Choice.KEY_MENU_NAME);
    }

    /**
     * @param {String[]} commands
     * @return {Choice}
     */
    setVrCommands (commands) {
        this.setParameter(Choice.KEY_VR_COMMANDS, commands);
        return this;
    }

    /**
     * @return {String[]}
     */
    getVrCommands () {
        return this.getParameter(Choice.KEY_VR_COMMANDS);
    }

    /**
     * @param {Image} image
     * @return {Choice}
     */
    setImage (image) {
        this.validateType(Image, image);
        this.setParameter(Choice.KEY_IMAGE, image);
        return this;
    }

    /**
     * @return {Image}
     */
    getImage () {
        return this.getObject(Image, Choice.KEY_IMAGE);
    }

    /**
     * @param {String} text - Optional secondary text to display; e.g. address of POI in a search result entry
     * @return {Choice}
     */
    setSecondaryText (text) {
        this.setParameter(Choice.KEY_SECONDARY_TEXT, text);
        return this;
    }

    /**
     * @return {String}
     */
    getSecondaryText () {
        return this.getParameter(Choice.KEY_SECONDARY_TEXT);
    }

    /**
     * @param {String} text - Optional tertiary text to display; e.g. distance to POI for a search result entry
     * @return {Choice}
     */
    setTertiaryText (text) {
        this.setParameter(Choice.KEY_TERTIARY_TEXT, text);
        return this;
    }

    /**
     * @return {String}
     */
    getTertiaryText () {
        return this.getParameter(Choice.KEY_TERTIARY_TEXT);
    }

    /**
     * @param {Image} image - Optional secondary image struct for choice
     * @return {Choice}
     */
    setSecondaryImage (image) {
        this.validateType(Image, image);
        this.setParameter(Choice.KEY_SECONDARY_IMAGE, image);
        return this;
    }

    /**
     * @return {Image}
     */
    getSecondaryImage () {
        return this.getObject(Image, Choice.KEY_SECONDARY_IMAGE);
    }
}

Choice.KEY_CHOICE_ID = 'choiceID';
Choice.KEY_MENU_NAME = 'menuName';
Choice.KEY_VR_COMMANDS = 'vrCommands';
Choice.KEY_IMAGE = 'image';
Choice.KEY_SECONDARY_TEXT = 'secondaryText';
Choice.KEY_TERTIARY_TEXT = 'tertiaryText';
Choice.KEY_SECONDARY_IMAGE = 'secondaryImage';

export { Choice };