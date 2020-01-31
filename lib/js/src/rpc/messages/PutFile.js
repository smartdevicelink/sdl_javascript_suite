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

import { RpcRequest } from '../RpcRequest.js';
import { FileType } from '../enums/FileType.js';
import { FunctionID } from '../enums/FunctionID.js';

/**
 * Used to push a binary data onto the module from a mobile device, such as icons and album art Not supported on first
 * generation of SDL enabled modules. Binary data is in binary part of hybrid msg.
 */
class PutFile extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.PutFile);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * @param {Uint8Array} fileData
     * @return {PutFile}
     */
    setFileData (fileData) {
        this.setBulkData(fileData);
        return this;
    }
    /**
     * @return {Uint8Array}
     */
    getFileData () {
        return this.getBulkData();
    }

    // ----------------- END -----------------------

    /**
     * @param {String} name - File reference name.
     * @return {PutFile}
     */
    setFileName (name) {
        this.setParameter(PutFile.KEY_FILE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getFileName () {
        return this.getParameter(PutFile.KEY_FILE_NAME);
    }

    /**
     * @param {FileType} type - Selected file type.
     * @return {PutFile}
     */
    setFileType (type) {
        this.validateType(FileType, type);
        this.setParameter(PutFile.KEY_FILE_TYPE, type);
        return this;
    }

    /**
     * @return {FileType}
     */
    getFileType () {
        return this.getObject(FileType, PutFile.KEY_FILE_TYPE);
    }

    /**
     * @param {Boolean} file - Indicates if the file is meant to persist between sessions / ignition cycles. If set to
     *                         TRUE, then the system will aim to persist this file through session / cycles. While files
     *                         with this designation will have priority over others, they are subject to deletion by the
     *                         system at any time. In the event of automatic deletion by the system, the app will
     *                         receive a rejection and have to resend the file. If omitted, the value will be set to
     *                         false.
     * @return {PutFile}
     */
    setPersistentFile (file) {
        this.setParameter(PutFile.KEY_PERSISTENT_FILE, file);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPersistentFile () {
        return this.getParameter(PutFile.KEY_PERSISTENT_FILE);
    }

    /**
     * @param {Boolean} file - Indicates if the file is meant to be passed thru core to elsewhere on the system. If set
     *                         to TRUE, then the system will instead pass the data thru as it arrives to a predetermined
     *                         area outside of core. If omitted, the value will be set to false.
     * @return {PutFile}
     */
    setSystemFile (file) {
        this.setParameter(PutFile.KEY_SYSTEM_FILE, file);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSystemFile () {
        return this.getParameter(PutFile.KEY_SYSTEM_FILE);
    }

    /**
     * @param {Number} offset - Optional offset in bytes for resuming partial data chunks
     * @return {PutFile}
     */
    setOffset (offset) {
        this.setParameter(PutFile.KEY_OFFSET, offset);
        return this;
    }

    /**
     * @return {Number}
     */
    getOffset () {
        return this.getParameter(PutFile.KEY_OFFSET);
    }

    /**
     * @param {Number} length - Optional length in bytes for resuming partial data chunks If offset is set to 0, then
     *                          length is the total length of the file to be downloaded
     * @return {PutFile}
     */
    setLength (length) {
        this.setParameter(PutFile.KEY_LENGTH, length);
        return this;
    }

    /**
     * @return {Number}
     */
    getLength () {
        return this.getParameter(PutFile.KEY_LENGTH);
    }

    /**
     * @param {Number} crc - Additional CRC32 checksum to protect data integrity up to 512 Mbits
     * @return {PutFile}
     */
    setCrc (crc) {
        this.setParameter(PutFile.KEY_CRC, crc);
        return this;
    }

    /**
     * @return {Number}
     */
    getCrc () {
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