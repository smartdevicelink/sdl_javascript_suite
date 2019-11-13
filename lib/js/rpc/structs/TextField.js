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
import { TextFieldName } from '../enums/TextFieldName.js';
import { CharacterSet } from '../enums/CharacterSet.js';

class TextField extends RpcStruct {

    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {TextFieldName} textFieldName
    * @return {TextField}
    */
    setTextFieldName(textFieldName) {
        this.validateType(TextFieldName, textFieldName)

        this.setParameter(TextField.KEY_NAME, textFieldName);
        return this;
    }

    /**
    * @return {TextFieldName}
    */
    getTextFieldName() {
        return this.getObject(TextFieldName, TextField.KEY_NAME);
    }


    /**
    * @param {CharacterSet} textFieldName
    * @return {TextField}
    */
    setCharacterSet(characterSet) {
        this.validateType(CharacterSet, characterSet)

        this.setParameter(TextField.KEY_CHARACTER_SET, characterSet);
        return this;
    }

    /**
    * @return {CharacterSet}
    */
    getCharacterSet() {
        return this.getObject(CharacterSet, TextField.KEY_CHARACTER_SET);
    }

    /**
    * @param {Number} width
    * @return {TextField}
    */
    setWidth(width) {
        this.setParameter(TextField.KEY_CHARACTER_SET, width);
        return this;
    }

    /**
    * @return {Number}
    */
    getWidth() {
        return this.getParameter(TextField.KEY_WIDTH);
    }

    /**
    * @param {Number} rows
    * @return {TextField}
    */
    setRows(rows) {
        this.setParameter(TextField.KEY_ROWS, rows);
        return this;
    }

    /**
    * @return {Number}
    */
    getRows() {
        return this.getParameter(TextField.KEY_ROWS);
    }

}

TextField.KEY_NAME = 'name';
TextField.KEY_CHARACTER_SET = 'characterSet';
TextField.KEY_WIDTH = 'width';
TextField.KEY_ROWS = 'rows';

export { TextField };
