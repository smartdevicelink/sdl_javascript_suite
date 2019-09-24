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

class Application {

    constructor(appConfig)
    {
        let defaultApp = {
            "hmiDisplayLanguageDesired": "EN-US",
            "isMediaApplication": false,
            "appHMIType": [
                "DEFAULT"
            ],
            "languageDesired": "EN-US",
            "syncMsgVersion": {
                "majorVersion": 5,
                "minorVersion": 1,
                "patchVersion": 0
            }
        };

        appConfig = Object.assign({},defaultApp,appConfig);

        if (!appConfig.appID || !appConfig.appName)
        {
            throw new Error(`Missing required fields`);
        }

        appConfig.fullAppID = appConfig.fullAppID || appConfig.appID;
        appConfig.ngnMediaScreenAppName = appConfig.ngnMediaScreenAppName || appConfig.appName;

        this._appConfig = {
            appID: appConfig.appID,
            appName: appConfig.appName,
            fullAppID: appConfig.fullAppID,
            hmiDisplayLanguageDesired: appConfig.hmiDisplayLanguageDesired,
            ngnMediaScreenAppName: appConfig.ngnMediaScreenAppName,
            isMediaApplication: appConfig.isMediaApplication,
            vrSynonyms: appConfig.vrSynonyms,
            languageDesired: appConfig.languageDesired,
            syncMsgVersion: appConfig.syncMsgVersion
        }
    }


    getRegisterAppInterfaceParams()
    {
        return {
            appID: this._appConfig.appID,
            appName: this._appConfig.appName,
            fullAppID: this._appConfig.fullAppID,
            hmiDisplayLanguageDesired: this._appConfig.hmiDisplayLanguageDesired,
            ngnMediaScreenAppName: this._appConfig.ngnMediaScreenAppName,
            isMediaApplication: this._appConfig.isMediaApplication,
            vrSynonyms: this._appConfig.vrSynonyms,
            languageDesired: this._appConfig.languageDesired,
            syncMsgVersion: this._appConfig.syncMsgVersion
        }
    }


}


export {Application}
