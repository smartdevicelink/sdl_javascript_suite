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

import { RpcRequest } from '../RpcRequest.js';
import { FileType } from '../enums/FileType.js';
import { FunctionID } from '../enums/FunctionID.js';

class PutFile extends RpcRequest {

    /**
    * @constructor
    */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.PUT_FILE);
    }


    /**
    * @param {String} fileName
    * @return {PutFile}
    */
    setFileName(fileName) {
        this.setParameter(PutFile.KEY_FILE_NAME, fileName);
        return this;
    }

    /**
    * @return {String}
    */
    getFileName() {
        return this.getParameter(PutFile.KEY_FILE_NAME);
    }

    /**
    * @param {FileType} fileType
    * @return {PutFile}
    */
    setFileType(fileType) {
        this.validateType(FileType, fileType);

        this.setParameter(PutFile.KEY_FILE_TYPE, fileType);
        return this;
    }

    /**
    * @return {FileType}
    */
    getFileType() {
        return this.getObject(FileType, PutFile.KEY_MENU_PARAMS);
    }

    /**
    * @param {Boolean} persistentFile
    * @return {PutFile}
    */
    setPersistentFile(persistentFile) {
        this.setParameter(PutFile.KEY_PERSISTENT_FILE, persistentFile);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getPersistentFile() {
        return this.getParameter(PutFile.KEY_PERSISTENT_FILE);
    }

    /**
    * @param {Boolean} systemFile
    * @return {PutFile}
    */
    setSystemFile(systemFile) {
        this.setParameter(PutFile.KEY_SYSTEM_FILE, systemFile);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getSystemFile() {
        return this.getParameter(PutFile.KEY_SYSTEM_FILE);
    }

    /**
    * @param {Number} offset
    * @return {PutFile}
    */
    setOffset(offset) {
        this.setParameter(PutFile.KEY_OFFSET, offset);
        return this;
    }

    /**
    * @return {Number}
    */
    getOffset() {
        return this.getParameter(PutFile.KEY_OFFSET);
    }

    /**
    * @param {Number} length
    * @return {PutFile}
    */
    setLength(length) {
        this.setParameter(PutFile.KEY_LENGTH, length);
        return this;
    }

    /**
    * @return {Number}
    */
    getLength() {
        return this.getParameter(PutFile.KEY_LENGTH);
    }

    /**
    * @param {Number} crc
    * @return {PutFile}
    */
    setCRC(crc) {
        this.setParameter(PutFile.KEY_CRC, crc);
        return this;
    }

    /**
    * @return {Number}
    */
    getCRC() {
        return this.getParameter(PutFile.KEY_CRC);
    }

}

PutFile.KEY_FILE_NAME = 'syncFileName';
PutFile.KEY_FILE_TYPE = 'fileType';
PutFile.KEY_PERSISTENT_FILE = 'persistentFile';
PutFile.KEY_SYSTEM_FILE = 'systemFile';
PutFile.KEY_OFFSET = 'offset';
PutFile.KEY_LENGTH = 'length';
PutFile.KEY_CRC = 'crc';

export { PutFile };
