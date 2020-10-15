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

import { CharacterSet } from '../enums/CharacterSet.js';
import { RpcStruct } from '../RpcStruct.js';
import { TextFieldName } from '../enums/TextFieldName.js';

class TextField extends RpcStruct {
    /**
     * Initalizes an instance of TextField.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the NameParam
     * @param {TextFieldName} name - The name that identifies the field. See TextFieldName. - The desired NameParam.
     * @returns {TextField} - The class instance for method chaining.
     */
    setNameParam (name) {
        this._validateType(TextFieldName, name);
        this.setParameter(TextField.KEY_NAME, name);
        return this;
    }

    /**
     * Get the NameParam
     * @returns {TextFieldName} - the KEY_NAME value
     */
    getNameParam () {
        return this.getObject(TextFieldName, TextField.KEY_NAME);
    }

    /**
     * Set the CharacterSet
     * @param {CharacterSet} set - The set of characters that are supported by this text field. All text is sent in UTF-8 format, but not all systems may support all of the characters expressed by UTF-8. All systems will support at least ASCII, but they may support more, either the LATIN-1 character set, or the full UTF-8 character set. - The desired CharacterSet.
     * @returns {TextField} - The class instance for method chaining.
     */
    setCharacterSet (set) {
        this._validateType(CharacterSet, set);
        this.setParameter(TextField.KEY_CHARACTER_SET, set);
        return this;
    }

    /**
     * Get the CharacterSet
     * @returns {CharacterSet} - the KEY_CHARACTER_SET value
     */
    getCharacterSet () {
        return this.getObject(CharacterSet, TextField.KEY_CHARACTER_SET);
    }

    /**
     * Set the Width
     * @param {Number} width - The number of characters in one row of this field. - The desired Width.
     * {'num_min_value': 1, 'num_max_value': 500}
     * @returns {TextField} - The class instance for method chaining.
     */
    setWidth (width) {
        this.setParameter(TextField.KEY_WIDTH, width);
        return this;
    }

    /**
     * Get the Width
     * @returns {Number} - the KEY_WIDTH value
     */
    getWidth () {
        return this.getParameter(TextField.KEY_WIDTH);
    }

    /**
     * Set the Rows
     * @param {Number} rows - The number of rows of this field. - The desired Rows.
     * {'num_min_value': 1, 'num_max_value': 8}
     * @returns {TextField} - The class instance for method chaining.
     */
    setRows (rows) {
        this.setParameter(TextField.KEY_ROWS, rows);
        return this;
    }

    /**
     * Get the Rows
     * @returns {Number} - the KEY_ROWS value
     */
    getRows () {
        return this.getParameter(TextField.KEY_ROWS);
    }
}

TextField.KEY_NAME = 'name';
TextField.KEY_CHARACTER_SET = 'characterSet';
TextField.KEY_WIDTH = 'width';
TextField.KEY_ROWS = 'rows';

export { TextField };