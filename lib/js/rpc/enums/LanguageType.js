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

class LanguageType extends Enum {

    static MAP = Object.freeze({
        'EN_SA': 'EN-SA',
        'HE_IL': 'HE-IL',
        'RO_RO': 'RO-RO',
        'UK_UA': 'UK-UA',
        'ID_ID': 'ID-ID',
        'VI_VN': 'VI-VN',
        'MS_MY': 'MS-MY',
        'HI_IN': 'HI-IN',
        'NL_BE': 'NL-BE',
        'EL_GR': 'EL-GR',
        'HU_HU': 'HU-HU',
        'FI_FI': 'FI-FI',
        'SK_SK': 'SK-SK',
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
        'EN_IN': 'EN-IN',
        'TH_TH': 'TH-TH',
    });

    constructor() {
        super();
    }

    static get EN_SA() {
        return LanguageType.MAP.EN_SA;
    }

    static get HE_IL() {
        return LanguageType.MAP.HE_IL;
    }

    static get RO_RO() {
        return LanguageType.MAP.RO_RO;
    }

    static get UK_UA() {
        return LanguageType.MAP.UK_UA;
    }

    static get ID_ID() {
        return LanguageType.MAP.ID_ID;
    }

    static get VI_VN() {
        return LanguageType.MAP.VI_VN;
    }

    static get MS_MY() {
        return LanguageType.MAP.MS_MY;
    }

    static get HI_IN() {
        return LanguageType.MAP.HI_IN;
    }

    static get NL_BE() {
        return LanguageType.MAP.NL_BE;
    }

    static get EL_GR() {
        return LanguageType.MAP.EL_GR;
    }

    static get HU_HU() {
        return LanguageType.MAP.HU_HU;
    }

    static get FI_FI() {
        return LanguageType.MAP.FI_FI;
    }

    static get SK_SK() {
        return LanguageType.MAP.SK_SK;
    }

    static get EN_US() {
        return LanguageType.MAP.EN_US;
    }

    static get ES_MX() {
        return LanguageType.MAP.ES_MX;
    }

    static get FR_CA() {
        return LanguageType.MAP.FR_CA;
    }

    static get DE_DE() {
        return LanguageType.MAP.DE_DE;
    }

    static get ES_ES() {
        return LanguageType.MAP.ES_ES;
    }

    static get EN_GB() {
        return LanguageType.MAP.EN_GB;
    }

    static get RU_RU() {
        return LanguageType.MAP.RU_RU;
    }

    static get TR_TR() {
        return LanguageType.MAP.TR_TR;
    }

    static get PL_PL() {
        return LanguageType.MAP.PL_PL;
    }

    static get FR_FR() {
        return LanguageType.MAP.FR_FR;
    }

    static get IT_IT() {
        return LanguageType.MAP.IT_IT;
    }

    static get SV_SE() {
        return LanguageType.MAP.SV_SE;
    }

    static get PT_PT() {
        return LanguageType.MAP.PT_PT;
    }

    static get NL_NL() {
        return LanguageType.MAP.NL_NL;
    }

    static get EN_AU() {
        return LanguageType.MAP.EN_AU;
    }

    static get ZH_CN() {
        return LanguageType.MAP.ZH_CN;
    }

    static get ZH_TW() {
        return LanguageType.MAP.ZH_TW;
    }

    static get JA_JP() {
        return LanguageType.MAP.JA_JP;
    }

    static get AR_SA() {
        return LanguageType.MAP.AR_SA;
    }

    static get KO_KR() {
        return LanguageType.MAP.KO_KR;
    }

    static get PT_BR() {
        return LanguageType.MAP.PT_BR;
    }

    static get CS_CZ() {
        return LanguageType.MAP.CS_CZ;
    }

    static get DA_DK() {
        return LanguageType.MAP.DA_DK;
    }

    static get NO_NO() {
        return LanguageType.MAP.NO_NO;
    }

    static get EN_IN() {
        return LanguageType.MAP.EN_IN;
    }

    static get TH_TH() {
        return LanguageType.MAP.TH_TH;
    }

    static valueForString(value) {
        for (let key in LanguageType.MAP) {
            if (LanguageType.MAP[key] === value) {
                return LanguageType.MAP[key];
            }
        }

        return null;
    }
}

export { LanguageType };