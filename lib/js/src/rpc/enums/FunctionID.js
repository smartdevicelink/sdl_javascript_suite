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

/**
 * @typedef {Enum} FunctionID
 * @property {Object} _MAP
 */
class FunctionID extends Enum {

    /**
     * @constructor 
     */
    constructor() {
        super();
    }

    /**
    * @return {Number}
    */
    static get REGISTER_APP_INTERFACE() {
        return FunctionID._MAP.RegisterAppInterface;
    }

    /**
    * @return {Number}
    */
    static get ADD_COMMAND() {
        return FunctionID._MAP.AddCommand;
    }

    /**
    * @return {Number}
    */
    static get SHOW() {
        return FunctionID._MAP.Show;
    }

    /**
    * @return {Number}
    */
    static get PUT_FILE() {
        return FunctionID._MAP.PutFile;
    }

    /**
    * @return {Number}
    */
    static get SET_APP_ICON() {
        return FunctionID._MAP.SetAppIcon;
    }

    /**
    * @return {Number}
    */
    static get ON_HMI_STATUS() {
        return FunctionID._MAP.OnHMIStatus;
    }

    /**
    * @return {Number}
    */
    static get ON_LANGUAGE_CHANGE() {
        return FunctionID._MAP.OnLanguageChange;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {Number} value
    * @return {null|Number} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return FunctionID.valueForStringInternal(value, FunctionID._MAP);
    }

    /**
    * Returns the key of the map with the corresponding value
    * @param {Number} value
    * @return {null|String} - Returns null if not found
    */
    static keyForValue(value) {
        return FunctionID.keyForValueInternal(value, FunctionID._MAP);
    }
}

FunctionID._MAP = Object.freeze({
    'RegisterAppInterface': 0x01,
    'AddCommand': 0x05,
    'Show': 0x0D,
    'PutFile': 0x20,
    'SetAppIcon': 0x23,
    'OnHMIStatus': 0x8000,
    'OnLanguageChange': 0x800A,
    //TODO this needs to be completely filled out still
});

export { FunctionID }