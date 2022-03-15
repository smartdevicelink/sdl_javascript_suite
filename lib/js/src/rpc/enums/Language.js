/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
     * Constructor for Language.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for EN_US.
     * English - US
     * @returns {String} - The enum value.
     */
    static get EN_US () {
        return Language._MAP.EN_US;
    }

    /**
     * Get the enum value for ES_MX.
     * Spanish - Mexico
     * @returns {String} - The enum value.
     */
    static get ES_MX () {
        return Language._MAP.ES_MX;
    }

    /**
     * Get the enum value for FR_CA.
     * French - Canada
     * @returns {String} - The enum value.
     */
    static get FR_CA () {
        return Language._MAP.FR_CA;
    }

    /**
     * Get the enum value for DE_DE.
     * @since SmartDeviceLink 2.0.0
     * German - Germany
     * @returns {String} - The enum value.
     */
    static get DE_DE () {
        return Language._MAP.DE_DE;
    }

    /**
     * Get the enum value for ES_ES.
     * @since SmartDeviceLink 2.0.0
     * Spanish - Spain
     * @returns {String} - The enum value.
     */
    static get ES_ES () {
        return Language._MAP.ES_ES;
    }

    /**
     * Get the enum value for EN_GB.
     * @since SmartDeviceLink 2.0.0
     * English - GB
     * @returns {String} - The enum value.
     */
    static get EN_GB () {
        return Language._MAP.EN_GB;
    }

    /**
     * Get the enum value for RU_RU.
     * @since SmartDeviceLink 2.0.0
     * Russian - Russia
     * @returns {String} - The enum value.
     */
    static get RU_RU () {
        return Language._MAP.RU_RU;
    }

    /**
     * Get the enum value for TR_TR.
     * @since SmartDeviceLink 2.0.0
     * Turkish - Turkey
     * @returns {String} - The enum value.
     */
    static get TR_TR () {
        return Language._MAP.TR_TR;
    }

    /**
     * Get the enum value for PL_PL.
     * @since SmartDeviceLink 2.0.0
     * Polish - Poland
     * @returns {String} - The enum value.
     */
    static get PL_PL () {
        return Language._MAP.PL_PL;
    }

    /**
     * Get the enum value for FR_FR.
     * @since SmartDeviceLink 2.0.0
     * French - France
     * @returns {String} - The enum value.
     */
    static get FR_FR () {
        return Language._MAP.FR_FR;
    }

    /**
     * Get the enum value for IT_IT.
     * @since SmartDeviceLink 2.0.0
     * Italian - Italy
     * @returns {String} - The enum value.
     */
    static get IT_IT () {
        return Language._MAP.IT_IT;
    }

    /**
     * Get the enum value for SV_SE.
     * @since SmartDeviceLink 2.0.0
     * Swedish - Sweden
     * @returns {String} - The enum value.
     */
    static get SV_SE () {
        return Language._MAP.SV_SE;
    }

    /**
     * Get the enum value for PT_PT.
     * @since SmartDeviceLink 2.0.0
     * Portuguese - Portugal
     * @returns {String} - The enum value.
     */
    static get PT_PT () {
        return Language._MAP.PT_PT;
    }

    /**
     * Get the enum value for NL_NL.
     * @since SmartDeviceLink 2.0.0
     * Dutch (Standard) - Netherlands
     * @returns {String} - The enum value.
     */
    static get NL_NL () {
        return Language._MAP.NL_NL;
    }

    /**
     * Get the enum value for EN_AU.
     * @since SmartDeviceLink 2.0.0
     * English - Australia
     * @returns {String} - The enum value.
     */
    static get EN_AU () {
        return Language._MAP.EN_AU;
    }

    /**
     * Get the enum value for ZH_CN.
     * @since SmartDeviceLink 2.0.0
     * Mandarin - China
     * @returns {String} - The enum value.
     */
    static get ZH_CN () {
        return Language._MAP.ZH_CN;
    }

    /**
     * Get the enum value for ZH_TW.
     * @since SmartDeviceLink 2.0.0
     * Mandarin - Taiwan
     * @returns {String} - The enum value.
     */
    static get ZH_TW () {
        return Language._MAP.ZH_TW;
    }

    /**
     * Get the enum value for JA_JP.
     * @since SmartDeviceLink 2.0.0
     * Japanese - Japan
     * @returns {String} - The enum value.
     */
    static get JA_JP () {
        return Language._MAP.JA_JP;
    }

    /**
     * Get the enum value for AR_SA.
     * @since SmartDeviceLink 2.0.0
     * Arabic - Saudi Arabia
     * @returns {String} - The enum value.
     */
    static get AR_SA () {
        return Language._MAP.AR_SA;
    }

    /**
     * Get the enum value for KO_KR.
     * @since SmartDeviceLink 2.0.0
     * Korean - South Korea
     * @returns {String} - The enum value.
     */
    static get KO_KR () {
        return Language._MAP.KO_KR;
    }

    /**
     * Get the enum value for PT_BR.
     * @since SmartDeviceLink 2.0.0
     * Portuguese - Brazil
     * @returns {String} - The enum value.
     */
    static get PT_BR () {
        return Language._MAP.PT_BR;
    }

    /**
     * Get the enum value for CS_CZ.
     * @since SmartDeviceLink 2.0.0
     * Czech - Czech Republic
     * @returns {String} - The enum value.
     */
    static get CS_CZ () {
        return Language._MAP.CS_CZ;
    }

    /**
     * Get the enum value for DA_DK.
     * @since SmartDeviceLink 2.0.0
     * Danish - Denmark
     * @returns {String} - The enum value.
     */
    static get DA_DK () {
        return Language._MAP.DA_DK;
    }

    /**
     * Get the enum value for NO_NO.
     * @since SmartDeviceLink 2.0.0
     * Norwegian - Norway
     * @returns {String} - The enum value.
     */
    static get NO_NO () {
        return Language._MAP.NO_NO;
    }

    /**
     * Get the enum value for NL_BE.
     * @since SmartDeviceLink 2.0.0
     * Dutch (Flemish) - Belgium
     * @returns {String} - The enum value.
     */
    static get NL_BE () {
        return Language._MAP.NL_BE;
    }

    /**
     * Get the enum value for EL_GR.
     * @since SmartDeviceLink 2.0.0
     * Greek - Greece
     * @returns {String} - The enum value.
     */
    static get EL_GR () {
        return Language._MAP.EL_GR;
    }

    /**
     * Get the enum value for HU_HU.
     * @since SmartDeviceLink 2.0.0
     * Hungarian - Hungary
     * @returns {String} - The enum value.
     */
    static get HU_HU () {
        return Language._MAP.HU_HU;
    }

    /**
     * Get the enum value for FI_FI.
     * @since SmartDeviceLink 2.0.0
     * Finnish - Finland
     * @returns {String} - The enum value.
     */
    static get FI_FI () {
        return Language._MAP.FI_FI;
    }

    /**
     * Get the enum value for SK_SK.
     * @since SmartDeviceLink 2.0.0
     * Slovak - Slovakia
     * @returns {String} - The enum value.
     */
    static get SK_SK () {
        return Language._MAP.SK_SK;
    }

    /**
     * Get the enum value for EN_IN.
     * @since SmartDeviceLink 4.5.0
     * English - India
     * @returns {String} - The enum value.
     */
    static get EN_IN () {
        return Language._MAP.EN_IN;
    }

    /**
     * Get the enum value for TH_TH.
     * @since SmartDeviceLink 4.5.0
     * Thai - Thailand
     * @returns {String} - The enum value.
     */
    static get TH_TH () {
        return Language._MAP.TH_TH;
    }

    /**
     * Get the enum value for EN_SA.
     * @since SmartDeviceLink 4.5.0
     * English - Middle East
     * @returns {String} - The enum value.
     */
    static get EN_SA () {
        return Language._MAP.EN_SA;
    }

    /**
     * Get the enum value for HE_IL.
     * @since SmartDeviceLink 4.5.0
     * Hebrew - Israel
     * @returns {String} - The enum value.
     */
    static get HE_IL () {
        return Language._MAP.HE_IL;
    }

    /**
     * Get the enum value for RO_RO.
     * @since SmartDeviceLink 4.5.0
     * Romanian - Romania
     * @returns {String} - The enum value.
     */
    static get RO_RO () {
        return Language._MAP.RO_RO;
    }

    /**
     * Get the enum value for UK_UA.
     * @since SmartDeviceLink 4.5.0
     * Ukrainian - Ukraine
     * @returns {String} - The enum value.
     */
    static get UK_UA () {
        return Language._MAP.UK_UA;
    }

    /**
     * Get the enum value for ID_ID.
     * @since SmartDeviceLink 4.5.0
     * Indonesian - Indonesia
     * @returns {String} - The enum value.
     */
    static get ID_ID () {
        return Language._MAP.ID_ID;
    }

    /**
     * Get the enum value for VI_VN.
     * @since SmartDeviceLink 4.5.0
     * Vietnamese - Vietnam
     * @returns {String} - The enum value.
     */
    static get VI_VN () {
        return Language._MAP.VI_VN;
    }

    /**
     * Get the enum value for MS_MY.
     * @since SmartDeviceLink 4.5.0
     * Malay - Malaysia
     * @returns {String} - The enum value.
     */
    static get MS_MY () {
        return Language._MAP.MS_MY;
    }

    /**
     * Get the enum value for HI_IN.
     * @since SmartDeviceLink 4.5.0
     * Hindi - India
     * @returns {String} - The enum value.
     */
    static get HI_IN () {
        return Language._MAP.HI_IN;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return Language._valueForKey(key, Language._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return Language._keyForValue(value, Language._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(Language._MAP);
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