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

import { FileType } from '../enums/FileType.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * Used to push a binary data onto the module from a mobile device, such as icons and album art Not supported on first
 * generation of SDL enabled modules. Binary data is in binary part of hybrid msg.
 */
class PutFile extends RpcRequest {
    /**
     * Initalizes an instance of PutFile.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.PutFile);
    }

    // ------ Not part of the RPC spec itself -----

    /**
     * Set the file data.
     * @param {Uint8Array} fileData - A byte array of the file contents.
     * @returns {PutFile} - The class instance to support method chaining.
     */
    setFileData (fileData) {
        this.setBulkData(fileData);
        return this;
    }
    /**
     * Get the file data.
     * @returns {Uint8Array} - A byte array of the file contents.
     */
    getFileData () {
        return this.getBulkData();
    }

    // ----------------- END -----------------------

    /**
     * Set the FileName
     * @param {String} name - File reference name. - The desired FileName.
     * {'string_min_length': 1, 'string_max_length': 255}
     * @returns {PutFile} - The class instance for method chaining.
     */
    setFileName (name) {
        this.setParameter(PutFile.KEY_FILE_NAME, name);
        return this;
    }

    /**
     * Get the FileName
     * @returns {String} - the KEY_FILE_NAME value
     */
    getFileName () {
        return this.getParameter(PutFile.KEY_FILE_NAME);
    }

    /**
     * Set the FileType
     * @param {FileType} type - Selected file type. - The desired FileType.
     * @returns {PutFile} - The class instance for method chaining.
     */
    setFileType (type) {
        this._validateType(FileType, type);
        this.setParameter(PutFile.KEY_FILE_TYPE, type);
        return this;
    }

    /**
     * Get the FileType
     * @returns {FileType} - the KEY_FILE_TYPE value
     */
    getFileType () {
        return this.getObject(FileType, PutFile.KEY_FILE_TYPE);
    }

    /**
     * Set the PersistentFile
     * @param {Boolean} file - Indicates if the file is meant to persist between sessions / ignition cycles. If set to - The desired PersistentFile.
     * TRUE, then the system will aim to persist this file through session / cycles. While files
     * with this designation will have priority over others, they are subject to deletion by the
     * system at any time. In the event of automatic deletion by the system, the app will
     * receive a rejection and have to resend the file. If omitted, the value will be set to
     * false.
     * @returns {PutFile} - The class instance for method chaining.
     */
    setPersistentFile (file) {
        this.setParameter(PutFile.KEY_PERSISTENT_FILE, file);
        return this;
    }

    /**
     * Get the PersistentFile
     * @returns {Boolean} - the KEY_PERSISTENT_FILE value
     */
    getPersistentFile () {
        return this.getParameter(PutFile.KEY_PERSISTENT_FILE);
    }

    /**
     * Set the SystemFile
     * @param {Boolean} file - Indicates if the file is meant to be passed thru core to elsewhere on the system. If set - The desired SystemFile.
     * to TRUE, then the system will instead pass the data thru as it arrives to a predetermined
     * area outside of core. If omitted, the value will be set to false.
     * @returns {PutFile} - The class instance for method chaining.
     */
    setSystemFile (file) {
        this.setParameter(PutFile.KEY_SYSTEM_FILE, file);
        return this;
    }

    /**
     * Get the SystemFile
     * @returns {Boolean} - the KEY_SYSTEM_FILE value
     */
    getSystemFile () {
        return this.getParameter(PutFile.KEY_SYSTEM_FILE);
    }

    /**
     * Set the Offset
     * @param {Number} offset - Optional offset in bytes for resuming partial data chunks - The desired Offset.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {PutFile} - The class instance for method chaining.
     */
    setOffset (offset) {
        this.setParameter(PutFile.KEY_OFFSET, offset);
        return this;
    }

    /**
     * Get the Offset
     * @returns {Number} - the KEY_OFFSET value
     */
    getOffset () {
        return this.getParameter(PutFile.KEY_OFFSET);
    }

    /**
     * Set the Length
     * @param {Number} length - Optional length in bytes for resuming partial data chunks If offset is set to 0, then - The desired Length.
     * length is the total length of the file to be downloaded
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {PutFile} - The class instance for method chaining.
     */
    setLength (length) {
        this.setParameter(PutFile.KEY_LENGTH, length);
        return this;
    }

    /**
     * Get the Length
     * @returns {Number} - the KEY_LENGTH value
     */
    getLength () {
        return this.getParameter(PutFile.KEY_LENGTH);
    }

    /**
     * Set the Crc
     * @param {Number} crc - Additional CRC32 checksum to protect data integrity up to 512 Mbits - The desired Crc.
     * {'num_min_value': 0, 'num_max_value': 4294967295}
     * @returns {PutFile} - The class instance for method chaining.
     */
    setCrc (crc) {
        this.setParameter(PutFile.KEY_CRC, crc);
        return this;
    }

    /**
     * Get the Crc
     * @returns {Number} - the KEY_CRC value
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