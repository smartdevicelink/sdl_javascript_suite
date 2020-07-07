/*
* Copyright (c) 2020, Livio, Inc.
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

import { TextField } from '../rpc/structs/TextField.js';
import { ImageField } from '../rpc/structs/ImageField.js';
import { TextFieldName } from '../rpc/enums/TextFieldName.js';
import { ImageFieldName } from '../rpc/enums/ImageFieldName.js';
import { CharacterSet } from '../rpc/enums/CharacterSet.js';
import { FileType } from '../rpc/enums/FileType.js';

class _ManagerUtility {
    /**
     * Check to see if WindowCapability has an ImageFieldName of a given name.
     * @private
     * @param {WindowCapability} windowCapability - Represents the capabilities of the desired window
     * @param {ImageFieldName} name - Representing a name of a given Image field that would be stored in WindowCapability
     * @return {Boolean} - True if the name exists in WindowCapability, otherwise false
     */
    static hasImageFieldOfName (windowCapability, name) {
        if (windowCapability === null || name === null) {
            return false;
        }
        if (windowCapability.getImageFields() !== null) {
            for (const field of windowCapability.getImageFields()) {
                if (field !== null && name === field.getName()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Check to see if WindowCapability has a textField of a given name.
     * @private
     * @param {WindowCapability} windowCapability - Represents the capabilities of the desired window
     * @param {TextFieldName} name - Representing a name of a given text field that would be stored in WindowCapability
     * @return {Boolean} - True if the name exists in WindowCapability, otherwise false
     */
    static hasTextFieldOfName (windowCapability, name) {
        if (windowCapability === null || name === null) {
            return false;
        }
        if (windowCapability.getTextFields() !== null) {
            for (const field of windowCapability.getTextFields()) {
                if (field !== null && name === field.getName()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Gets the number of show lines available on the head unit
     * @private
     * @param {WindowCapability} windowCapability - Represents the capabilities of the desired window
     * @returns {Number} - The number of lines.
     */
    static getMaxNumberOfMainFieldLines (windowCapability) {
        let highestFound = 0;
        if (windowCapability !== null && windowCapability.getTextFields() !== null) {
            for (const field of windowCapability.getTextFields()) {
                let fieldNumber = 0;
                switch (field.getNameParam()) {
                    case mainField1:
                        fieldNumber = 1;
                        break;
                    case mainField2:
                        fieldNumber = 2;
                        break;
                    case mainField3:
                        fieldNumber = 3;
                        break;
                    case mainField4:
                        fieldNumber = 4;
                        break;
                }
                if (fieldNumber > 0) {
                    highestFound = Math.max(highestFound, fieldNumber);
                    if (highestFound === 4) {
                        break;
                    }
                }
            }
        }
        return highestFound;
    }

    /**
     * Method to get a list of all available text fields
     * @private
     * @return {TextField[]} - A list of all available text fields with CID1SET Character Set
     */
    static getAllTextFields () {
        const allTextFields = [];
        for (const textFieldName in TextFieldName._MAP) {
            allTextFields.push(new TextField()
                .setNameParam(TextFieldName._MAP[textFieldName])
                .setCharacterSet(CharacterSet.CID1SET)
                .setWidth(500)
                .setRows(8));
        }
        return allTextFields;
    }

    /**
     * Method to get a list of all available text fields
     * @private
     * @return {ImageField[]} - A list of all available Image fields with GRAPHIC_BMP, GRAPHIC_JPEG, GRAPHIC_PNG File Types
     */
    static getAllImageFields () {
        const allImageFields = [];
        const allImageFileTypes = [FileType.GRAPHIC_BMP, FileType.GRAPHIC_JPEG, FileType.GRAPHIC_PNG];
        for (const imageFieldName in ImageFieldName._MAP) {
            allImageFields.push(new ImageField()
                .setNameParam(ImageFieldName._MAP[imageFieldName])
                .setImageTypeSupported(allImageFileTypes));
        }
        return allImageFields;
    }
}

export { _ManagerUtility };