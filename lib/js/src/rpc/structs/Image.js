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

import { ImageType } from '../enums/ImageType.js';
import { RpcStruct } from '../RpcStruct.js';

class Image extends RpcStruct {
    /**
     * Initalizes an instance of Image.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ValueParam
     * @param {String} value - Either the static hex icon value or the binary image file name identifier (sent by PutFile). - The desired ValueParam.
     * {'string_min_length': 0, 'string_max_length': 65535}
     * @returns {Image} - The class instance for method chaining.
     */
    setValueParam (value) {
        this.setParameter(Image.KEY_VALUE, value);
        return this;
    }

    /**
     * Get the ValueParam
     * @returns {String} - the KEY_VALUE value
     */
    getValueParam () {
        return this.getParameter(Image.KEY_VALUE);
    }

    /**
     * Set the ImageType
     * @param {ImageType} type - Describes, whether it is a static or dynamic image. - The desired ImageType.
     * @returns {Image} - The class instance for method chaining.
     */
    setImageType (type) {
        this._validateType(ImageType, type);
        this.setParameter(Image.KEY_IMAGE_TYPE, type);
        return this;
    }

    /**
     * Get the ImageType
     * @returns {ImageType} - the KEY_IMAGE_TYPE value
     */
    getImageType () {
        return this.getObject(ImageType, Image.KEY_IMAGE_TYPE);
    }

    /**
     * Set the IsTemplate
     * @param {Boolean} template - If true, the image is a template image and can be recolored by the HMI - The desired IsTemplate.
     * @returns {Image} - The class instance for method chaining.
     */
    setIsTemplate (template) {
        this.setParameter(Image.KEY_IS_TEMPLATE, template);
        return this;
    }

    /**
     * Get the IsTemplate
     * @returns {Boolean} - the KEY_IS_TEMPLATE value
     */
    getIsTemplate () {
        return this.getParameter(Image.KEY_IS_TEMPLATE);
    }
}

Image.KEY_VALUE = 'value';
Image.KEY_IMAGE_TYPE = 'imageType';
Image.KEY_IS_TEMPLATE = 'isTemplate';

export { Image };