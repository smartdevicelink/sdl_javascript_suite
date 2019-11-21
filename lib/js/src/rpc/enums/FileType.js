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
 * @typedef {Enum} FileType
 * @property {Object} _MAP
 */
class FileType extends Enum {

    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get GRAPHIC_BMP() {
        return FileType._MAP.GRAPHIC_BMP;
    }

    /**
     * @return {String} 
     */
    static get GRAPHIC_JPEG() {
        return FileType._MAP.GRAPHIC_JPEG;
    }

    /**
     * @return {String} 
     */
    static get GRAPHIC_PNG() {
        return FileType._MAP.GRAPHIC_PNG;
    }

    /**
     * @return {String} 
     */
    static get AUDIO_WAVE() {
        return FileType._MAP.AUDIO_WAVE;
    }

    /**
     * @return {String} 
     */
    static get AUDIO_AAC() {
        return FileType._MAP.AUDIO_AAC;
    }

    /**
     * @return {String} 
     */
    static get BINARY() {
        return FileType._MAP.BINARY;
    }

    /**
     * @return {String} 
     */
    static get JSON() {
        return FileType._MAP.JSON;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return FileType.valueForStringInternal(value, FileType._MAP);
    }
}

FileType._MAP = Object.freeze({
    'GRAPHIC_BMP': 'GRAPHIC_BMP',
    'GRAPHIC_JPEG': 'GRAPHIC_JPEG',
    'GRAPHIC_PNG': 'GRAPHIC_PNG',
    'AUDIO_WAVE': 'AUDIO_WAVE',
    'AUDIO_MP3': 'AUDIO_MP3',
    'AUDIO_AAC': 'AUDIO_AAC',
    'BINARY': 'BINARY',
    'JSON': 'JSON',

});

export { FileType };