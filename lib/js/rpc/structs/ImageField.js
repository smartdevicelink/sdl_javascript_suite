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
import { ImageResolution } from './ImageResolution.js';
import { FileType } from '../enums/FileType.js';
import { ImageFieldName } from '../enums/ImageFieldName.js';

class ImageField extends RpcStruct {

    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {ImageFieldName} imageFieldName
    * @return {ImageField}
    */
    setImageFieldName(imageFieldName) {
        this.validateType(ImageFieldName, imageFieldName)

        this.setParameter(KEY_NAME, imageFieldName);
        return this;
    }

    /**
    * @return {ImageFieldName}
    */
    getImageFieldName() {
        return this.getObject(ImageFieldName, KEY_NAME);
    }

    /**
    * @param {FileType} imageTypeSupported
    * @return {ImageField}
    */
    setImageTypeSupported(imageTypeSupported) {
        this.validateType(FileType, imageTypeSupported)

        this.setParameter(KEY_IMAGE_TYPE_SUPPORTED, imageTypeSupported);
        return this;
    }

    /**
    * @return {FileType}
    */
    getImageTypeSupported() {
        return this.getObject(FileType, KEY_IMAGE_TYPE_SUPPORTED);
    }

    /**
    * @param {ImageResolution} imageResolution
    * @return {ImageField}
    */
    setImageResolution(imageResolution) {
        this.validateType(ImageResolution, imageResolution)

        this.setParameter(KEY_IMAGE_RESOLUTION, imageResolution);
        return this;
    }

    /**
    * @return {ImageResolution}
    */
    getImageResolution() {
        return this.getObject(ImageResolution, KEY_IMAGE_RESOLUTION);
    }
}

ImageField.KEY_NAME = 'name';
ImageField.KEY_IMAGE_TYPE_SUPPORTED = 'imageTypeSupported';
ImageField.KEY_IMAGE_RESOLUTION = 'imageResolution';

export { ImageField };
