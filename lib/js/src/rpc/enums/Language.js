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
 * @typedef {Enum} Language
 * @property {Object} _MAP
 */
class Language extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * English - US
     * @return {String}
     */
    static get EN_US () {
        return Language._MAP.EN_US;
    }

    /**
     * Spanish - Mexico
     * @return {String}
     */
    static get ES_MX () {
        return Language._MAP.ES_MX;
    }

    /**
     * French - Canada
     * @return {String}
     */
    static get FR_CA () {
        return Language._MAP.FR_CA;
    }

    /**
     * German - Germany
     * @return {String}
     */
    static get DE_DE () {
        return Language._MAP.DE_DE;
    }

    /**
     * Spanish - Spain
     * @return {String}
     */
    static get ES_ES () {
        return Language._MAP.ES_ES;
    }

    /**
     * English - GB
     * @return {String}
     */
    static get EN_GB () {
        return Language._MAP.EN_GB;
    }

    /**
     * Russian - Russia
     * @return {String}
     */
    static get RU_RU () {
        return Language._MAP.RU_RU;
    }

    /**
     * Turkish - Turkey
     * @return {String}
     */
    static get TR_TR () {
        return Language._MAP.TR_TR;
    }

    /**
     * Polish - Poland
     * @return {String}
     */
    static get PL_PL () {
        return Language._MAP.PL_PL;
    }

    /**
     * French - France
     * @return {String}
     */
    static get FR_FR () {
        return Language._MAP.FR_FR;
    }

    /**
     * Italian - Italy
     * @return {String}
     */
    static get IT_IT () {
        return Language._MAP.IT_IT;
    }

    /**
     * Swedish - Sweden
     * @return {String}
     */
    static get SV_SE () {
        return Language._MAP.SV_SE;
    }

    /**
     * Portuguese - Portugal
     * @return {String}
     */
    static get PT_PT () {
        return Language._MAP.PT_PT;
    }

    /**
     * Dutch (Standard) - Netherlands
     * @return {String}
     */
    static get NL_NL () {
        return Language._MAP.NL_NL;
    }

    /**
     * English - Australia
     * @return {String}
     */
    static get EN_AU () {
        return Language._MAP.EN_AU;
    }

    /**
     * Mandarin - China
     * @return {String}
     */
    static get ZH_CN () {
        return Language._MAP.ZH_CN;
    }

    /**
     * Mandarin - Taiwan
     * @return {String}
     */
    static get ZH_TW () {
        return Language._MAP.ZH_TW;
    }

    /**
     * Japanese - Japan
     * @return {String}
     */
    static get JA_JP () {
        return Language._MAP.JA_JP;
    }

    /**
     * Arabic - Saudi Arabia
     * @return {String}
     */
    static get AR_SA () {
        return Language._MAP.AR_SA;
    }

    /**
     * Korean - South Korea
     * @return {String}
     */
    static get KO_KR () {
        return Language._MAP.KO_KR;
    }

    /**
     * Portuguese - Brazil
     * @return {String}
     */
    static get PT_BR () {
        return Language._MAP.PT_BR;
    }

    /**
     * Czech - Czech Republic
     * @return {String}
     */
    static get CS_CZ () {
        return Language._MAP.CS_CZ;
    }

    /**
     * Danish - Denmark
     * @return {String}
     */
    static get DA_DK () {
        return Language._MAP.DA_DK;
    }

    /**
     * Norwegian - Norway
     * @return {String}
     */
    static get NO_NO () {
        return Language._MAP.NO_NO;
    }

    /**
     * Dutch (Flemish) - Belgium
     * @return {String}
     */
    static get NL_BE () {
        return Language._MAP.NL_BE;
    }

    /**
     * Greek - Greece
     * @return {String}
     */
    static get EL_GR () {
        return Language._MAP.EL_GR;
    }

    /**
     * Hungarian - Hungary
     * @return {String}
     */
    static get HU_HU () {
        return Language._MAP.HU_HU;
    }

    /**
     * Finnish - Finland
     * @return {String}
     */
    static get FI_FI () {
        return Language._MAP.FI_FI;
    }

    /**
     * Slovak - Slovakia
     * @return {String}
     */
    static get SK_SK () {
        return Language._MAP.SK_SK;
    }

    /**
     * English - India
     * @return {String}
     */
    static get EN_IN () {
        return Language._MAP.EN_IN;
    }

    /**
     * Thai - Thailand
     * @return {String}
     */
    static get TH_TH () {
        return Language._MAP.TH_TH;
    }

    /**
     * English - Middle East
     * @return {String}
     */
    static get EN_SA () {
        return Language._MAP.EN_SA;
    }

    /**
     * Hebrew - Israel
     * @return {String}
     */
    static get HE_IL () {
        return Language._MAP.HE_IL;
    }

    /**
     * Romanian - Romania
     * @return {String}
     */
    static get RO_RO () {
        return Language._MAP.RO_RO;
    }

    /**
     * Ukrainian - Ukraine
     * @return {String}
     */
    static get UK_UA () {
        return Language._MAP.UK_UA;
    }

    /**
     * Indonesian - Indonesia
     * @return {String}
     */
    static get ID_ID () {
        return Language._MAP.ID_ID;
    }

    /**
     * Vietnamese - Vietnam
     * @return {String}
     */
    static get VI_VN () {
        return Language._MAP.VI_VN;
    }

    /**
     * Malay - Malaysia
     * @return {String}
     */
    static get MS_MY () {
        return Language._MAP.MS_MY;
    }

    /**
     * Hindi - India
     * @return {String}
     */
    static get HI_IN () {
        return Language._MAP.HI_IN;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return Language._valueForKey(key, Language._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return Language._keyForValue(value, Language._MAP);
    }
}

Language._MAP = Object.freeze({
    'EN_US': 'EN-US',
    'ES_MX': 'ES-MX',
    'FR_CA': 'FR-CA',
    'DE_DE': 'DE-DE',
    'ES_ES': 'ES-ES',
    'EN_GB': 'EN-GB',
    'RU_RU': 'RU-RU',
    'TR_TR': 'TR-TR',
    'PL_PL': 'PL-PL',
    'FR_FR': 'FR-FR',
    'IT_IT': 'IT-IT',
    'SV_SE': 'SV-SE',
    'PT_PT': 'PT-PT',
    'NL_NL': 'NL-NL',
    'EN_AU': 'EN-AU',
    'ZH_CN': 'ZH-CN',
    'ZH_TW': 'ZH-TW',
    'JA_JP': 'JA-JP',
    'AR_SA': 'AR-SA',
    'KO_KR': 'KO-KR',
    'PT_BR': 'PT-BR',
    'CS_CZ': 'CS-CZ',
    'DA_DK': 'DA-DK',
    'NO_NO': 'NO-NO',
    'NL_BE': 'NL-BE',
    'EL_GR': 'EL-GR',
    'HU_HU': 'HU-HU',
    'FI_FI': 'FI-FI',
    'SK_SK': 'SK-SK',
    'EN_IN': 'EN-IN',
    'TH_TH': 'TH-TH',
    'EN_SA': 'EN-SA',
    'HE_IL': 'HE-IL',
    'RO_RO': 'RO-RO',
    'UK_UA': 'UK-UA',
    'ID_ID': 'ID-ID',
    'VI_VN': 'VI-VN',
    'MS_MY': 'MS-MY',
    'HI_IN': 'HI-IN',
});

export { Language };