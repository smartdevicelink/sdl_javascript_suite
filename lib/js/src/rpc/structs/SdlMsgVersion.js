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
 * Specifies the version number of the SmartDeviceLink protocol that is supported by the mobile application
 */
class SdlMsgVersion extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} version - The major version indicates versions that is not-compatible to previous versions.
     * @return {SdlMsgVersion}
     */
    setMajorVersion (version) {
        this.setParameter(SdlMsgVersion.KEY_MAJOR_VERSION, version);
        return this;
    }

    /**
     * @return {Number}
     */
    getMajorVersion () {
        return this.getParameter(SdlMsgVersion.KEY_MAJOR_VERSION);
    }

    /**
     * @param {Number} version - The minor version indicates a change to a previous version that should still allow to
     *                           be run on an older version (with limited functionality)
     * @return {SdlMsgVersion}
     */
    setMinorVersion (version) {
        this.setParameter(SdlMsgVersion.KEY_MINOR_VERSION, version);
        return this;
    }

    /**
     * @return {Number}
     */
    getMinorVersion () {
        return this.getParameter(SdlMsgVersion.KEY_MINOR_VERSION);
    }

    /**
     * @param {Number} version - The patch version indicates a fix to existing functionality in a previous version that
     *                           should still be able to be run on an older version
     * @return {SdlMsgVersion}
     */
    setPatchVersion (version) {
        this.setParameter(SdlMsgVersion.KEY_PATCH_VERSION, version);
        return this;
    }

    /**
     * @return {Number}
     */
    getPatchVersion () {
        return this.getParameter(SdlMsgVersion.KEY_PATCH_VERSION);
    }
}

SdlMsgVersion.KEY_MAJOR_VERSION = 'majorVersion';
SdlMsgVersion.KEY_MINOR_VERSION = 'minorVersion';
SdlMsgVersion.KEY_PATCH_VERSION = 'patchVersion';

export { SdlMsgVersion };