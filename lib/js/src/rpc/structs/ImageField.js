/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { FileType } from '../enums/FileType.js';
import { ImageFieldName } from '../enums/ImageFieldName.js';
import { ImageResolution } from './ImageResolution.js';
import { RpcStruct } from '../RpcStruct.js';

class ImageField extends RpcStruct {
    /**
     * Initializes an instance of ImageField.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the NameParam
     * @param {ImageFieldName} name - The name that identifies the field. See ImageFieldName. - The desired NameParam.
     * @returns {ImageField} - The class instance for method chaining.
     */
    setNameParam (name) {
        this._validateType(ImageFieldName, name);
        this.setParameter(ImageField.KEY_NAME, name);
        return this;
    }

    /**
     * Get the NameParam
     * @returns {ImageFieldName} - the KEY_NAME value
     */
    getNameParam () {
        return this.getObject(ImageFieldName, ImageField.KEY_NAME);
    }

    /**
     * Set the ImageTypeSupported
     * @param {FileType[]} supported - The image types that are supported in this field. See FileType. - The desired ImageTypeSupported.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {ImageField} - The class instance for method chaining.
     */
    setImageTypeSupported (supported) {
        this._validateType(FileType, supported, true);
        this.setParameter(ImageField.KEY_IMAGE_TYPE_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the ImageTypeSupported
     * @returns {FileType[]} - the KEY_IMAGE_TYPE_SUPPORTED value
     */
    getImageTypeSupported () {
        return this.getObject(FileType, ImageField.KEY_IMAGE_TYPE_SUPPORTED);
    }

    /**
     * Set the ImageResolution
     * @param {ImageResolution} resolution - The image resolution of this field. - The desired ImageResolution.
     * @returns {ImageField} - The class instance for method chaining.
     */
    setImageResolution (resolution) {
        this._validateType(ImageResolution, resolution);
        this.setParameter(ImageField.KEY_IMAGE_RESOLUTION, resolution);
        return this;
    }

    /**
     * Get the ImageResolution
     * @returns {ImageResolution} - the KEY_IMAGE_RESOLUTION value
     */
    getImageResolution () {
        return this.getObject(ImageResolution, ImageField.KEY_IMAGE_RESOLUTION);
    }
}

ImageField.KEY_NAME = 'name';
ImageField.KEY_IMAGE_TYPE_SUPPORTED = 'imageTypeSupported';
ImageField.KEY_IMAGE_RESOLUTION = 'imageResolution';

export { ImageField };