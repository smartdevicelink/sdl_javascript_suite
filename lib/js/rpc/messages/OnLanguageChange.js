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

import { RpcNotification } from '../RpcNotification.js';
import { Language } from '../enums/Language.js';
import { FunctionID } from '../enums/FunctionID.js';

class OnLanguageChange extends RpcNotification {

    static KEY_LANGUAGE = 'language';
    static KEY_HMI_DISPLAY_LANGUAGE = 'hmiDisplayLanguage';

    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.ON_LANGUAGE_CHANGE);
    }

    /**
    * @param {Language} langauge
    * @return {OnLanguageChange}
    */
    setLanguage(langauge) {
        this.validateType(Language, language);

        this.setParameter(KEY_LANGUAGE, language);
        return this;
    }

    /**
    * @return {Language}
    */
    getLanguage() {
        return this.getObject(Language, KEY_LANGUAGE);
    }

    /**
    * @param {Language} langauge
    * @return {OnLanguageChange}
    */
    setHMIDisplayLanguage(language) {
        this.validateType(Language, language);

        this.setParameter(KEY_HMI_DISPLAY_LANGUAGE, language);
        return this;
    }

    /**
    * @return {Language}
    */
    getHMIDisplayLanguage() {
        return this.getObject(Language, KEY_HMI_DISPLAY_LANGUAGE);
    }

}

export { OnLanguageChange };
