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

class SoftButtonCapabilities extends RpcStruct {

    static KEY_SHORT_PRESS_AVAILABLE = 'shortPressAvailable';
    static KEY_LONG_PRESS_AVAILABLE = 'longPressAvailable';
    static KEY_UP_DOWN_AVAILABLE = 'upDownAvailable';
    static KEY_IMAGE_SUPPORTED = 'imageSupported';
    static KEY_TEXT_SUPPORTED = 'textSupported';

    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {Boolean} shortPressAvailable
    * @return {SoftButtonCapabilities}
    */
    setShortPressAvailable(shortPressAvailable) {

        this.setValue(KEY_SHORT_PRESS_AVAILABLE, shortPressAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getShortPressAvailable() {
        return this.getParameter(KEY_SHORT_PRESS_AVAILABLE);
    }

    /**
    * @param {Boolean} longPressAvailable
    * @return {SoftButtonCapabilities}
    */
    setLongPressAvailable(longPressAvailable) {

        this.setValue(KEY_LONG_PRESS_AVAILABLE, longPressAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getLongPressAvailable() {
        return this.getParameter(KEY_LONG_PRESS_AVAILABLE);
    }

    /**
    * @param {Boolean} upDownAvailable
    * @return {SoftButtonCapabilities}
    */
    setUpDownAvailable(upDownAvailable) {

        this.setValue(KEY_UP_DOWN_AVAILABLE, upDownAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getUpDownAvailable() {
        return this.getParameter(KEY_UP_DOWN_AVAILABLE);
    }

    /**
    * @param {Boolean} imageSupported
    * @return {SoftButtonCapabilities}
    */
    setImageSupported(imageSupported) {

        this.setValue(KEY_IMAGE_SUPPORTED, imageSupported);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getImageSupported() {
        return this.getParameter(KEY_IMAGE_SUPPORTED);
    }

    /**
    * @param {Boolean} textSupported
    * @return {SoftButtonCapabilities}
    */
    setTextSupported(textSupported) {

        this.setValue(KEY_TEXT_SUPPORTED, textSupported);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getTextSupported() {
        return this.getParameter(KEY_TEXT_SUPPORTED);
    }
}

export { SoftButtonCapabilities };
