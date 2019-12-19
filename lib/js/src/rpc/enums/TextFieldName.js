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
 * @property {Object} _MAP
 */
class TextFieldName extends Enum {
    constructor () {
        super();
    }

    /**
    * @return {String}
    */
    static get mainField1 () {
        return TextFieldName._MAP.mainField1;
    }

    /**
    * @return {String}
    */
    static get mainField2 () {
        return TextFieldName._MAP.mainField2;
    }

    /**
    * @return {String}
    */
    static get mainField3 () {
        return TextFieldName._MAP.mainField3;
    }

    /**
    * @return {String}
    */
    static get mainField4 () {
        return TextFieldName._MAP.mainField4;
    }

    /**
    * @return {String}
    */
    static get statusBar () {
        return TextFieldName._MAP.statusBar;
    }


    /**
    * @return {String}
    */
    static get mediaClock () {
        return TextFieldName._MAP.mediaClock;
    }

    /**
    * @return {String}
    */
    static get mediaTrack () {
        return TextFieldName._MAP.mediaTrack;
    }

    /**
    * @return {String}
    */
    static get templateTitle () {
        return TextFieldName._MAP.templateTitle;
    }

    /**
    * @return {String}
    */
    static get alertText1 () {
        return TextFieldName._MAP.alertText1;
    }

    /**
    * @return {String}
    */
    static get alertText2 () {
        return TextFieldName._MAP.alertText2;
    }

    /**
    * @return {String}
    */
    static get alertText3 () {
        return TextFieldName._MAP.alertText3;
    }

    /**
    * @return {String}
    */
    static get scrollableMessageBody () {
        return TextFieldName._MAP.scrollableMessageBody;
    }


    /**
    * @return {String}
    */
    static get initialInteractionText () {
        return TextFieldName._MAP.initialInteractionText;
    }


    /**
    * @return {String}
    */
    static get navigationText1 () {
        return TextFieldName._MAP.navigationText1;
    }


    /**
    * @return {String}
    */
    static get navigationText2 () {
        return TextFieldName._MAP.navigationText2;
    }


    /**
    * @return {String}
    */
    static get ETA () {
        return TextFieldName._MAP.ETA;
    }


    /**
    * @return {String}
    */
    static get totalDistance () {
        return TextFieldName._MAP.totalDistance;
    }


    /**
    * @return {String}
    */
    static get audioPassThruDisplayText1 () {
        return TextFieldName._MAP.audioPassThruDisplayText1;
    }


    /**
    * @return {String}
    */
    static get audioPassThruDisplayText2 () {
        return TextFieldName._MAP.audioPassThruDisplayText2;
    }


    /**
    * @return {String}
    */
    static get sliderHeader () {
        return TextFieldName._MAP.sliderHeader;
    }


    /**
    * @return {String}
    */
    static get sliderFooter () {
        return TextFieldName._MAP.sliderFooter;
    }


    /**
    * @return {String}
    */
    static get menuName () {
        return TextFieldName._MAP.menuName;
    }


    /**
    * @return {String}
    */
    static get secondaryText () {
        return TextFieldName._MAP.secondaryText;
    }


    /**
    * @return {String}
    */
    static get tertiaryText () {
        return TextFieldName._MAP.tertiaryText;
    }


    /**
    * @return {String}
    */
    static get menuTitle () {
        return TextFieldName._MAP.menuTitle;
    }

    /**
    * @return {String}
    */
    static get locationName () {
        return TextFieldName._MAP.locationName;
    }

    /**
    * @return {String}
    */
    static get locationDescription () {
        return TextFieldName._MAP.locationDescription;
    }

    /**
    * @return {String}
    */
    static get addressLines () {
        return TextFieldName._MAP.addressLines;
    }

    /**
    * @return {String}
    */
    static get phoneNumber () {
        return TextFieldName._MAP.phoneNumber;
    }

    /**
    * Get the value for the given enum key
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return TextFieldName._valueForKey(key, TextFieldName._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return TextFieldName._keyForValue(value, TextFieldName._MAP);
    }
}

TextFieldName._MAP = Object.freeze({
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

});

export { TextFieldName };