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
 * @typedef {Enum} TextFieldName
 * @property {Object} MAP
 */
class TextFieldName extends Enum {

    constructor() {
        super();
    }

    /**
    * @return {String} 
    */
    static get MAIN_FIELD_1() {
        return TextFieldName.MAP.mainField1;
    }

    /**
    * @return {String} 
    */
    static get MAIN_FIELD_2() {
        return TextFieldName.MAP.mainField2;
    }

    /**
    * @return {String} 
    */
    static get MAIN_FIELD_3() {
        return TextFieldName.MAP.mainField3;
    }

    /**
    * @return {String} 
    */
    static get MAIN_FIELD_4() {
        return TextFieldName.MAP.mainField4;
    }

    /**
    * @return {String} 
    */
    static get STATUS_BAR() {
        return TextFieldName.MAP.statusBar;
    }


    /**
    * @return {String} 
    */
    static get MEDIA_CLOCK() {
        return TextFieldName.MAP.mediaClock;
    }

    /**
    * @return {String} 
    */
    static get MEDIA_TRACK() {
        return TextFieldName.MAP.mediaTrack;
    }

    /**
    * @return {String} 
    */
    static get TEMPLATE_TITLE() {
        return TextFieldName.MAP.templateTitle;
    }

    /**
    * @return {String} 
    */
    static get ALERT_TEXT_1() {
        return TextFieldName.MAP.alertText1;
    }

    /**
    * @return {String} 
    */
    static get ALERT_TEXT_2() {
        return TextFieldName.MAP.alertText2;
    }

    /**
    * @return {String} 
    */
    static get ALERT_TEXT_3() {
        return TextFieldName.MAP.alertText3;
    }

    /**
    * @return {String} 
    */
    static get SCROLLABLE_MESSAGE_BODY() {
        return TextFieldName.MAP.scrollableMessageBody;
    }


    /**
    * @return {String} 
    */
    static get INITIAL_INTERACTION_TEXT() {
        return TextFieldName.MAP.initialInteractionText;
    }


    /**
    * @return {String} 
    */
    static get NAVIGATION_TEXT_1() {
        return TextFieldName.MAP.navigationText1;
    }


    /**
    * @return {String} 
    */
    static get NAVIGATION_TEXT_2() {
        return TextFieldName.MAP.navigationText2;
    }


    /**
    * @return {String} 
    */
    static get ETA() {
        return TextFieldName.MAP.ETA;
    }


    /**
    * @return {String} 
    */
    static get TOTAL_DISTANCE() {
        return TextFieldName.MAP.totalDistance;
    }


    /**
    * @return {String} 
    */
    static get AUDIO_PASS_THRU_DISPLAY_TEXT_1() {
        return TextFieldName.MAP.audioPassThruDisplayText1;
    }


    /**
    * @return {String} 
    */
    static get AUDIO_PASS_THRU_DISPLAY_TEXT_2() {
        return TextFieldName.MAP.audioPassThruDisplayText2;
    }


    /**
    * @return {String} 
    */
    static get SLIDER_HEADER() {
        return TextFieldName.MAP.sliderHeader;
    }


    /**
    * @return {String} 
    */
    static get SLIDER_FOOTER() {
        return TextFieldName.MAP.sliderFooter;
    }


    /**
    * @return {String} 
    */
    static get MENU_NAME() {
        return TextFieldName.MAP.menuName;
    }


    /**
    * @return {String} 
    */
    static get SECONDARY_TEXT() {
        return TextFieldName.MAP.secondaryText;
    }


    /**
    * @return {String} 
    */
    static get TERTIARY_TEXT() {
        return TextFieldName.MAP.tertiaryText;
    }


    /**
    * @return {String} 
    */
    static get MENU_TITLE() {
        return TextFieldName.MAP.menuTitle;
    }

    /**
    * @return {String} 
    */
    static get LOCATION_NAME() {
        return TextFieldName.MAP.locationName;
    }

    /**
    * @return {String} 
    */
    static get LOCATION_DESCRIPTION() {
        return TextFieldName.MAP.locationDescription;
    }

    /**
    * @return {String} 
    */
    static get ADRESS_LINES() {
        return TextFieldName.MAP.addressLines;
    }

    /**
    * @return {String} 
    */
    static get PHONE_NUMBER() {
        return TextFieldName.MAP.phoneNumber;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return TextFieldName.valueForStringInternal(value, TextFieldName.MAP);
    }
}

TextFieldName.MAP = Object.freeze({
    'mainField1': 'mainField1',
    'mainField2': 'mainField2',
    'mainField3': 'mainField3',
    'mainField4': 'mainField4',
    'statusBar': 'statusBar',
    'mediaClock': 'mediaClock',
    'mediaTrack': 'mediaTrack',
    'templateTitle': 'templateTitle',
    'alertText1': 'alertText1',
    'alertText2': 'alertText2',
    'alertText3': 'alertText3',
    'scrollableMessageBody': 'scrollableMessageBody',
    'initialInteractionText': 'initialInteractionText',
    'navigationText1': 'navigationText1',
    'navigationText2': 'navigationText2',
    'ETA': 'ETA',
    'totalDistance': 'totalDistance',
    'audioPassThruDisplayText1': 'audioPassThruDisplayText1',
    'audioPassThruDisplayText2': 'audioPassThruDisplayText2',
    'sliderHeader': 'sliderHeader',
    'sliderFooter': 'sliderFooter',
    'menuName': 'menuName',
    'secondaryText': 'secondaryText',
    'tertiaryText': 'tertiaryText',
    'menuTitle': 'menuTitle',
    'locationName': 'locationName',
    'locationDescription': 'locationDescription',
    'addressLines': 'addressLines',
    'phoneNumber': 'phoneNumber',
    'scrollableMessageBody': 'scrollableMessageBody',

});

export { TextFieldName };