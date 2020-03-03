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

import { RpcStruct } from '../RpcStruct.js';

/**
 * Contains detailed information about the registered application.
 */
class AppInfo extends RpcStruct {
    /**
     * Initalizes an instance of AppInfo.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - The name displayed for the mobile application on the mobile device (can differ from the
     *                        app name set in the initial RAI request).
     * @return {AppInfo}
     */
    setAppDisplayName (name) {
        this.setParameter(AppInfo.KEY_APP_DISPLAY_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getAppDisplayName () {
        return this.getParameter(AppInfo.KEY_APP_DISPLAY_NAME);
    }

    /**
     * @param {String} id - The AppBundleID of an iOS application or package name of the Android application. This
     *                      supports App Launch strategies for each platform.
     * @return {AppInfo}
     */
    setAppBundleID (id) {
        this.setParameter(AppInfo.KEY_APP_BUNDLE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getAppBundleID () {
        return this.getParameter(AppInfo.KEY_APP_BUNDLE_ID);
    }

    /**
     * @param {String} version - Represents the build version number of this particular mobile app.
     * @return {AppInfo}
     */
    setAppVersion (version) {
        this.setParameter(AppInfo.KEY_APP_VERSION, version);
        return this;
    }

    /**
     * @return {String}
     */
    getAppVersion () {
        return this.getParameter(AppInfo.KEY_APP_VERSION);
    }

    /**
     * @param {String} icon - A file reference to the icon utilized by this app (simplifies the process of setting an
     *                        app icon during app registration).
     * @return {AppInfo}
     */
    setAppIcon (icon) {
        this.setParameter(AppInfo.KEY_APP_ICON, icon);
        return this;
    }

    /**
     * @return {String}
     */
    getAppIcon () {
        return this.getParameter(AppInfo.KEY_APP_ICON);
    }
}

AppInfo.KEY_APP_DISPLAY_NAME = 'appDisplayName';
AppInfo.KEY_APP_BUNDLE_ID = 'appBundleID';
AppInfo.KEY_APP_VERSION = 'appVersion';
AppInfo.KEY_APP_ICON = 'appIcon';

export { AppInfo };