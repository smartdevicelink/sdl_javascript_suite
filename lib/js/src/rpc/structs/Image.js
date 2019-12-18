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
import { ImageType } from '../enums/ImageType.js';

class Image extends RpcStruct {

    /**
    * @constructor
    */
    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {String} value
    * @return {Image}
    */
    setValue (value) {
        this.setParameter(Image.KEY_VALUE, value);
        return this;
    }

    /**
    * @return {String}
    */
    getValue() {
        return this.getParameter(Image.KEY_VALUE);
    }

    /**
    * @param {ImageType} type
    * @return {Image}
    */
    setImageType(type) {
        this.validateType(ImageType, type);

        this.setParameter(Image.KEY_IMAGE_TYPE, type);
        return this;
    }

    /**
    * @return {ImageType}
    */
    getImageType() {
        return this.getObject(ImageType, Image.KEY_IMAGE_TYPE);
    }

    /**
    * @param {Boolean} isTemplate
    * @return {Image}
    */
    setIsTemplate(isTemplate) {
        this.setParameter(Image.KEY_IS_TEMPLATE, isTemplate);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getIsTemplate() {
        return this.getParameter(Image.KEY_IS_TEMPLATE);
    }

}

Image.KEY_VALUE = 'value';
Image.KEY_IMAGE_TYPE = 'imageType';
Image.KEY_IS_TEMPLATE = 'isTemplate';

export { Image };
