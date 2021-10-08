/*
 * Copyright (c) 2019 Livio, Inc.
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

import { SdlFile } from './SdlFile';
import { FileType } from './../../../rpc/enums/FileType.js';
import { ImageType } from './../../../rpc/enums/ImageType.js';
import { Image } from './../../../rpc/structs/Image.js';

class SdlArtwork extends SdlFile {
    /**
     * Initializes an instance of SdlArtwork
     * @class
     * @param {String} fileName - a String value representing the name that will be used to store the file in the head unit
     * @param {FileType} fileType - a FileType enum value representing the type of the file
     * @param {String} data - a byte array representing the data of the file
     * @param {Boolean} persistentFile - a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     */
    constructor (fileName, fileType, data, persistentFile) {
        super(fileName, fileType, data, persistentFile);
        this._isTemplate = null;
        this._imageRPC = null;
    }

    /**
     * Sets whether this SdlArtwork is a template image whose coloring should be decided by the HMI
     * @param {Boolean} isTemplate - boolean that tells whether this SdlArtwork is a template image
     * @returns {SdlArtwork} - A reference to this instance to support method chaining.
     */
    setTemplateImage (isTemplate) {
        this._isTemplate = isTemplate;
        return this;
    }

    /**
     * Gets whether this SdlArtwork is a template image whose coloring should be decided by the HMI
     * @returns {Boolean} - tells whether this SdlArtwork is a template image
     */
    isTemplateImage () {
        return this._isTemplate;
    }

    /**
     * Sets the file type of the artwork.
     * @param {FileType} fileType - A FileType enum value.
     * @returns {SdlArtwork} - A reference to this instance to support method chaining.
     */
    setType (fileType) {
        if (fileType === undefined) {
            return this;
        }
        if (fileType === null || fileType === FileType.GRAPHIC_JPEG || fileType === FileType.GRAPHIC_PNG
                || fileType === FileType.GRAPHIC_BMP) {
            super.setType(fileType);
        } else {
            throw new Error('Only JPEG, PNG, and BMP image types are supported.');
        }
        return this;
    }

    /**
     * Gets the Image RPC representing this artwork. Generally for use internally, you should instead pass an artwork to a Screen Manager method
     * @returns {Image} - The Image RPC representing this artwork.
     */
    getImageRPC () {
        if (this._imageRPC === null) {
            this._imageRPC = this._createImageRPC();
        }
        return this._imageRPC;
    }

    /**
     * Creates a new Image RPC.
     * @private
     * @returns {Image} - The Image RPC representing this artwork.
     */
    _createImageRPC () {
        let image;
        if (this.isStaticIcon()) {
            image = new Image()
                .setValueParam(this.getName())
                .setImageType(ImageType.STATIC)
                .setIsTemplate(true);
        } else {
            image = new Image()
                .setValueParam(this.getName())
                .setImageType(ImageType.DYNAMIC)
                .setIsTemplate(this._isTemplate);
        }
        return image;
    }

    /**
     * Creates a deep copy of the object
     * @returns {ChoiceCell} - A deep copy of the object
     */
    clone () {
        const clonedParams = Object.assign({}, this); // shallow copy

        if (clonedParams._imageRPC !== null) {
            clonedParams._imageRPC = Object.assign(new Image(), clonedParams._imageRPC);
        }
        return Object.assign(new SdlArtwork(), clonedParams);
    }
}

export { SdlArtwork };