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
     * Initalizes an instance of SdlMsgVersion.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the MajorVersion
     * @param {Number} version - The major version indicates versions that is not-compatible to previous versions. - The desired MajorVersion.
     * @returns {SdlMsgVersion} - The class instance for method chaining.
     */
    setMajorVersion (version) {
        this.setParameter(SdlMsgVersion.KEY_MAJOR_VERSION, version);
        return this;
    }

    /**
     * Get the MajorVersion
     * @returns {Number} - the KEY_MAJOR_VERSION value
     */
    getMajorVersion () {
        return this.getParameter(SdlMsgVersion.KEY_MAJOR_VERSION);
    }

    /**
     * Set the MinorVersion
     * @param {Number} version - The minor version indicates a change to a previous version that should still allow to - The desired MinorVersion.
     * be run on an older version (with limited functionality)
     * @returns {SdlMsgVersion} - The class instance for method chaining.
     */
    setMinorVersion (version) {
        this.setParameter(SdlMsgVersion.KEY_MINOR_VERSION, version);
        return this;
    }

    /**
     * Get the MinorVersion
     * @returns {Number} - the KEY_MINOR_VERSION value
     */
    getMinorVersion () {
        return this.getParameter(SdlMsgVersion.KEY_MINOR_VERSION);
    }

    /**
     * Set the PatchVersion
     * @param {Number} version - The patch version indicates a fix to existing functionality in a previous version that - The desired PatchVersion.
     * should still be able to be run on an older version
     * @returns {SdlMsgVersion} - The class instance for method chaining.
     */
    setPatchVersion (version) {
        this.setParameter(SdlMsgVersion.KEY_PATCH_VERSION, version);
        return this;
    }

    /**
     * Get the PatchVersion
     * @returns {Number} - the KEY_PATCH_VERSION value
     */
    getPatchVersion () {
        return this.getParameter(SdlMsgVersion.KEY_PATCH_VERSION);
    }
}

SdlMsgVersion.KEY_MAJOR_VERSION = 'majorVersion';
SdlMsgVersion.KEY_MINOR_VERSION = 'minorVersion';
SdlMsgVersion.KEY_PATCH_VERSION = 'patchVersion';

export { SdlMsgVersion };