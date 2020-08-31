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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} ImageFieldName
 * @property {Object} _MAP
 */
class ImageFieldName extends Enum {
    /**
     * Constructor for ImageFieldName.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for softButtonImage.
     * The image field for SoftButton
     * @returns {String} - The enum value.
     */
    static get softButtonImage () {
        return ImageFieldName._MAP.softButtonImage;
    }

    /**
     * Get the enum value for choiceImage.
     * The first image field for Choice
     * @returns {String} - The enum value.
     */
    static get choiceImage () {
        return ImageFieldName._MAP.choiceImage;
    }

    /**
     * Get the enum value for choiceSecondaryImage.
     * The secondary image field for Choice
     * @returns {String} - The enum value.
     */
    static get choiceSecondaryImage () {
        return ImageFieldName._MAP.choiceSecondaryImage;
    }

    /**
     * Get the enum value for vrHelpItem.
     * The image field for vrHelpItem
     * @returns {String} - The enum value.
     */
    static get vrHelpItem () {
        return ImageFieldName._MAP.vrHelpItem;
    }

    /**
     * Get the enum value for turnIcon.
     * The image field for Turn
     * @returns {String} - The enum value.
     */
    static get turnIcon () {
        return ImageFieldName._MAP.turnIcon;
    }

    /**
     * Get the enum value for menuIcon.
     * The image field for the menu icon in SetGlobalProperties
     * @returns {String} - The enum value.
     */
    static get menuIcon () {
        return ImageFieldName._MAP.menuIcon;
    }

    /**
     * Get the enum value for cmdIcon.
     * The image field for AddCommand
     * @returns {String} - The enum value.
     */
    static get cmdIcon () {
        return ImageFieldName._MAP.cmdIcon;
    }

    /**
     * Get the enum value for appIcon.
     * The image field for the app icon (set by setAppIcon)
     * @returns {String} - The enum value.
     */
    static get appIcon () {
        return ImageFieldName._MAP.appIcon;
    }

    /**
     * Get the enum value for graphic.
     * The primary image field for Show
     * @returns {String} - The enum value.
     */
    static get graphic () {
        return ImageFieldName._MAP.graphic;
    }

    /**
     * Get the enum value for secondaryGraphic.
     * The secondary image field for Show
     * @returns {String} - The enum value.
     */
    static get secondaryGraphic () {
        return ImageFieldName._MAP.secondaryGraphic;
    }

    /**
     * Get the enum value for showConstantTBTIcon.
     * The primary image field for ShowConstantTBT
     * @returns {String} - The enum value.
     */
    static get showConstantTBTIcon () {
        return ImageFieldName._MAP.showConstantTBTIcon;
    }

    /**
     * Get the enum value for showConstantTBTNextTurnIcon.
     * The secondary image field for ShowConstantTBT
     * @returns {String} - The enum value.
     */
    static get showConstantTBTNextTurnIcon () {
        return ImageFieldName._MAP.showConstantTBTNextTurnIcon;
    }

    /**
     * Get the enum value for locationImage.
     * The optional image of a destination / location
     * @returns {String} - The enum value.
     */
    static get locationImage () {
        return ImageFieldName._MAP.locationImage;
    }

    /**
     * Get the enum value for alertIcon.
     * The image field for Alert
     * @returns {String} - The enum value.
     */
    static get alertIcon () {
        return ImageFieldName._MAP.alertIcon;
    }

    /**
     * Get the enum value for subMenuIcon.
     * The image field for AddSubMenu.menuIcon
     * @returns {String} - The enum value.
     */
    static get subMenuIcon () {
        return ImageFieldName._MAP.subMenuIcon;
    }

    /**
     * Get the enum value for subtleAlertIcon.
     * The image of the subtle alert; applies to `SubtleAlert` `alertIcon`
     * @returns {String} - The enum value.
     */
    static get subtleAlertIcon () {
        return ImageFieldName._MAP.subtleAlertIcon;
    }

    /**
     * Get the enum value for subMenuIcon.
     * The image field for AddSubMenu.menuIcon
     * @returns {String} - The enum value.
     */
    static get subMenuIcon () {
        return ImageFieldName._MAP.subMenuIcon;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return ImageFieldName._valueForKey(key, ImageFieldName._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return ImageFieldName._keyForValue(value, ImageFieldName._MAP);
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
    'subMenuIcon': 'subMenuIcon',
    'subtleAlertIcon': 'subtleAlertIcon',
    'subMenuIcon': 'subMenuIcon',
});

export { ImageFieldName };