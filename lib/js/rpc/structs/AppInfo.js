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

import { RpcStruct } from '../RpcStruct.js';

class AppInfo extends RpcStruct {

    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {String} appDisplayName
    * @return {AppInfo}
    */
    setAppDisplayName(appDisplayName) {
        this.setParameter(KEY_APP_DISPLAY_NAME, appDisplayName);
        return this;
    }

    /**
    * @return {String}
    */
    getAppDisplayName() {
        return this.getParameter(KEY_APP_DISPLAY_NAME);
    }


    /**
    * @param {String} appBundleID
    * @return {AppInfo}
    */
    setAppBundleID(appBundleID) {
        this.setParameter(KEY_APP_BUNDLE_ID, appBundleID);
        return this;
    }

    /**
    * @return {String}
    */
    getAppBundleID() {
        return this.getParameter(KEY_APP_BUNDLE_ID);
    }


    /**
    * @param {String} appVersion
    * @return {AppInfo}
    */
    setAppVersion(appVersion) {
        this.setParameter(KEY_APP_VERSION, appVersion);
        return this;
    }

    /**
    * @return {String}
    */
    getAppVersion() {
        return this.getParameter(KEY_APP_VERSION);
    }

    /**
    * @param {String} appIcon string of the app icon file name
    * @return {AppInfo}
    */
    setAppIcon(appIcon) {
        this.setParameter(KEY_APP_ICON, appIcon);
        return this;
    }

    /**
    * @return {String}
    */
    getAppIcon() {
        return this.getParameter(KEY_APP_ICON);
    }
}

AppInfo.KEY_APP_DISPLAY_NAME = 'appDisplayName';
AppInfo.KEY_APP_BUNDLE_ID = 'appBundleID';
AppInfo.KEY_APP_VERSION = 'appVersion';
AppInfo.KEY_APP_ICON = 'appIcon';

export { AppInfo };
