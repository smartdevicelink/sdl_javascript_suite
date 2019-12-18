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

class SdlMsgVersion extends RpcStruct {
    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {Number} the major version of this object
    * @return {SdlMsgVersion}
    */
    setMajorVersion(value) {
        this.setParameter(SdlMsgVersion.KEY_MAJOR_VERSION, value);
        return this;
    }

    /**
    * @return {Number} the major version of this object
    */
    getMajorVersion() {
        return this.getParameter(SdlMsgVersion.KEY_MAJOR_VERSION);
    }

    /**
    * @param {Number} the minor version of this object
    * @return {SdlMsgVersion}
    */
    setMinorVersion(value) {
        this.setParameter(SdlMsgVersion.KEY_MINOR_VERSION, value);
        return this;
    }

    /**
    * @return {Number} the minor version of this object
    */
    getMinorVersion() {
        return this.getParameter(SdlMsgVersion.KEY_MINOR_VERSION);
    }

    /**
    * @param {Number} the patch version of this object
    * @return {SdlMsgVersion}
    */
    setPatchVersion(value) {
        this.setParameter(SdlMsgVersion.KEY_PATCH_VERSION, value);
        return this;
    }

    /**
    * @return {Number} the patch version of this objects
    */
    getPatchVersion() {
        return this.getParameter(SdlMsgVersion.KEY_PATCH_VERSION);
    }
}

SdlMsgVersion.KEY_MAJOR_VERSION = 'majorVersion';
SdlMsgVersion.KEY_MINOR_VERSION = 'minorVersion';
SdlMsgVersion.KEY_PATCH_VERSION = 'patchVersion';

export { SdlMsgVersion };
