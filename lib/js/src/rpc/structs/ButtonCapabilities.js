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
import { ModuleInfo } from './ModuleInfo';
import { ButtonName } from '../enums/ButtonName.js';

class ButtonCapabilities extends RpcStruct {

    constructor (parameters) {
        super(parameters);
    }

    /**
    * @param {ButtonName} name
    * @return {ButtonCapabilities}
    */
    setName (name) {
        this.validateType(ButtonName, name);

        this.setParameter(ButtonCapabilities.KEY_NAME, name);
        return this;
    }

    /**
    * @return {ButtonName}
    */
    getName () {
        return this.getObject(ButtonName, ButtonCapabilities.KEY_NAME);
    }

    /**
    * @param {ModuleInfo} moduleInfo
    * @return {ButtonCapabilities}
    */
    setModuleInfo (moduleInfo) {
        this.validateType(ModuleInfo, moduleInfo);

        this.setParameter(ButtonCapabilities.KEY_MODULE_INFO, moduleInfo);
        return this;
    }

    /**
    * @return {ModuleInfo}
    */
    getModuleInfo () {
        return this.getObject(ModuleInfo, ButtonCapabilities.KEY_MODULE_INFO);
    }

    /**
    * @param {Boolean} shortPressAvailable
    * @return {ButtonCapabilities}
    */
    setShortPressAvailable (shortPressAvailable) {

        this.setParameter(ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE, shortPressAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getShortPressAvailable () {
        return this.getParameter(ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE);
    }

    /**
    * @param {Boolean} longPressAvailable
    * @return {ButtonCapabilities}
    */
    setLongPressAvailable (longPressAvailable) {

        this.setParameter(ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE, longPressAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getLongPressAvailable () {
        return this.getParameter(ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE);
    }

    /**
    * @param {Boolean} upDownAvailable
    * @return {ButtonCapabilities}
    */
    setUpDownAvailable (upDownAvailable) {

        this.setParameter(ButtonCapabilities.KEY_UP_DOWN_AVAILABLE, upDownAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getUpDownAvailable () {
        return this.getParameter(ButtonCapabilities.KEY_UP_DOWN_AVAILABLE);
    }

}

ButtonCapabilities.KEY_NAME = 'name';
ButtonCapabilities.KEY_MODULE_INFO = 'moduleInfo';
ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE = 'shortPressAvailable';
ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE = 'longPressAvailable';
ButtonCapabilities.KEY_UP_DOWN_AVAILABLE = 'upDownAvailable';

export { ButtonCapabilities };
