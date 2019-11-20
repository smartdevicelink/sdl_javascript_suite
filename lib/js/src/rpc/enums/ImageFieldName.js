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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} ImageFieldName
 * @property {Object} _MAP
 */
class ImageFieldName extends Enum {

    constructor() {
        super();
    }

    /**
    * @return {String} 
    */
    static get SOFT_BUTTON_IMAGE() {
        return ImageFieldName._MAP.softButtonImage;
    }

    /**
    * @return {String} 
    */
    static get CHOICE_IMAGE() {
        return ImageFieldName._MAP.choiceImage;
    }

    /**
    * @return {String} 
    */
    static get CHOICE_SECONDARY_IMAGE() {
        return ImageFieldName._MAP.choiceSecondaryImage;
    }


    /**
    * @return {String} 
    */
    static get VR_HELP_ITEM() {
        return ImageFieldName._MAP.vrHelpItem;
    }


    /**
    * @return {String} 
    */
    static get TURN_ICON() {
        return ImageFieldName._MAP.turnIcon;
    }


    /**
    * @return {String} 
    */
    static get MENU_ICON() {
        return ImageFieldName._MAP.menuIcon;
    }

    /**
    * @return {String} 
    */
    static get CMD_ICON() {
        return ImageFieldName._MAP.cmdIcon;
    }

    /**
    * @return {String} 
    */
    static get APP_ICON() {
        return ImageFieldName._MAP.appIcon;
    }

    /**
    * @return {String} 
    */
    static get GRAPHIC() {
        return ImageFieldName._MAP.graphic;
    }

    /**
    * @return {String} 
    */
    static get SECONDARY_GRAPHIC() {
        return ImageFieldName._MAP.secondaryGraphic;
    }

    /**
    * @return {String} 
    */
    static get SHOW_CONSTANT_TBT_ICON() {
        return ImageFieldName._MAP.showConstantTBTIcon;
    }

    /**
    * @return {String} 
    */
    static get SHOW_CONSTANT_TBT_NEXT_TURN_ICON() {
        return ImageFieldName._MAP.showConstantTBTNextTurnIcon;
    }

    /**
    * @return {String} 
    */
    static get LOCATION_IMAGE() {
        return ImageFieldName._MAP.locationImage;
    }

    /**
    * @return {String} 
    */
    static get ALERT_ICON() {
        return ImageFieldName._MAP.alertIcon;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return ImageFieldName.valueForStringInternal(value, ImageFieldName._MAP);
    }
}

ImageFieldName._MAP = Object.freeze({
    'softButtonImage': 'softButtonImage',
    'choiceImage': 'choiceImage',
    'choiceSecondaryImage': 'choiceSecondaryImage',
    'vrHelpItem': 'vrHelpItem',
    'turnIcon': 'turnIcon',
    'menuIcon': 'menuIcon',
    'cmdIcon': 'cmdIcon',
    'appIcon': 'appIcon',
    'graphic': 'graphic',
    'secondaryGraphic': 'secondaryGraphic',
    'showConstantTBTIcon': 'showConstantTBTIcon',
    'showConstantTBTNextTurnIcon': 'showConstantTBTNextTurnIcon',
    'locationImage': 'locationImage',
    'alertIcon': 'alertIcon',

});

export { ImageFieldName };