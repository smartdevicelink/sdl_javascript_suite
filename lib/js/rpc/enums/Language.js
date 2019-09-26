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

class Language extends Enum {

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
        return Language.MAP.EN_SA;
    }

    static get HE_IL() {
        return Language.MAP.HE_IL;
    }

    static get RO_RO() {
        return Language.MAP.RO_RO;
    }

    static get UK_UA() {
        return Language.MAP.UK_UA;
    }

    static get ID_ID() {
        return Language.MAP.ID_ID;
    }

    static get VI_VN() {
        return Language.MAP.VI_VN;
    }

    static get MS_MY() {
        return Language.MAP.MS_MY;
    }

    static get HI_IN() {
        return Language.MAP.HI_IN;
    }

    static get NL_BE() {
        return Language.MAP.NL_BE;
    }

    static get EL_GR() {
        return Language.MAP.EL_GR;
    }

    static get HU_HU() {
        return Language.MAP.HU_HU;
    }

    static get FI_FI() {
        return Language.MAP.FI_FI;
    }

    static get SK_SK() {
        return Language.MAP.SK_SK;
    }

    static get EN_US() {
        return Language.MAP.EN_US;
    }

    static get ES_MX() {
        return Language.MAP.ES_MX;
    }

    static get FR_CA() {
        return Language.MAP.FR_CA;
    }

    static get DE_DE() {
        return Language.MAP.DE_DE;
    }

    static get ES_ES() {
        return Language.MAP.ES_ES;
    }

    static get EN_GB() {
        return Language.MAP.EN_GB;
    }

    static get RU_RU() {
        return Language.MAP.RU_RU;
    }

    static get TR_TR() {
        return Language.MAP.TR_TR;
    }

    static get PL_PL() {
        return Language.MAP.PL_PL;
    }

    static get FR_FR() {
        return Language.MAP.FR_FR;
    }

    static get IT_IT() {
        return Language.MAP.IT_IT;
    }

    static get SV_SE() {
        return Language.MAP.SV_SE;
    }

    static get PT_PT() {
        return Language.MAP.PT_PT;
    }

    static get NL_NL() {
        return Language.MAP.NL_NL;
    }

    static get EN_AU() {
        return Language.MAP.EN_AU;
    }

    static get ZH_CN() {
        return Language.MAP.ZH_CN;
    }

    static get ZH_TW() {
        return Language.MAP.ZH_TW;
    }

    static get JA_JP() {
        return Language.MAP.JA_JP;
    }

    static get AR_SA() {
        return Language.MAP.AR_SA;
    }

    static get KO_KR() {
        return Language.MAP.KO_KR;
    }

    static get PT_BR() {
        return Language.MAP.PT_BR;
    }

    static get CS_CZ() {
        return Language.MAP.CS_CZ;
    }

    static get DA_DK() {
        return Language.MAP.DA_DK;
    }

    static get NO_NO() {
        return Language.MAP.NO_NO;
    }

    static get EN_IN() {
        return Language.MAP.EN_IN;
    }

    static get TH_TH() {
        return Language.MAP.TH_TH;
    }

    static valueForString(value) {
        for (let key in Language.MAP) {
            if (Language.MAP[key] === value) {
                return Language.MAP[key];
            }
        }

        return null;
    }
}

export { Language };