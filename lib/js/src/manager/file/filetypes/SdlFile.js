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

/**
 * SdlFile represents a file ready to be uploaded to core.
 */
class SdlFile {
    /**
     * Creates a new instance of SdlFile
     * @class
     * @param {String} fileName - a String value representing the name that will be used to store the file in the head unit
     * @param {FileType} fileType - a FileType enum value representing the type of the file
     * @param {String} data - a byte array representing the data of the file
     * @param {Boolean} persistentFile - a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     */
    constructor (fileName, fileType, data, persistentFile) {
        this._fileName = fileName;
        this._fileType = fileType;
        this._fileData = data;
        this._persistentFile = persistentFile;
        this._filePath = null;
        this._isStaticIcon = null;
        this._overwrite = true; // default to true
    }

    /**
     * Sets the name of the file
     * @param {String} fileName - a String value representing the name that will be used to store the file in the head unit
     * @returns {SdlFile} - A reference to this instance to support method chaining.
     */
    setName (fileName) {
        this._fileName = fileName;
        return this;
    }

    /**
     * Gets the name of the file
     * @returns {String} - a String value representing the name that will be used to store the file in the head unit
     */
    getName () {
        return this._fileName;
    }

    /**
     * Sets the location of the file
     * @param {String} filePath - a String value representing the the location of the file
     * @returns {SdlFile} - A reference to this instance to support method chaining.
     */
    setFilePath (filePath) {
        this._filePath = filePath;
        return this;
    }

    /**
     * Gets the location of the file
     * @returns {String} - The path of the file.
     */
    getFilePath () {
        return this._filePath;
    }

    /**
     * Sets the byte array that represents the content of the file
     * @param {Uint8Array} data - a byte array representing the data of the file
     * @returns {SdlFile} - A reference to this instance to support method chaining.
     */
    setFileData (data) {
        this._fileData = data;
        return this;
    }

    /**
     * Gets the byte array that represents the content of the file
     * @returns {Uint8Array} - a byte array representing the data of the file
     */
    getFileData () {
        return this._fileData;
    }

    /**
     * Sets the type of the file
     * @param {FileType} fileType - a FileType enum value representing the type of the file
     * @returns {SdlFile} - A reference to this instance to support method chaining.
     */
    setType (fileType) {
        this._fileType = fileType;
        return this;
    }

    /**
     * Gets the type of the file
     * @returns {FileType} - a FileType enum value representing the type of the file
     */
    getType () {
        return this._fileType;
    }

    /**
     * Sets whether the file should persist between sessions / ignition cycles
     * @param {Boolean} persistentFile - a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     * @returns {SdlFile} - A reference to this instance to support method chaining.
     */
    setPersistent (persistentFile) {
        this._persistentFile = persistentFile;
        return this;
    }

    /**
     * Gets whether the file should persist between sessions / ignition cycles
     * @returns {Boolean} - a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     */
    isPersistent () {
        return this._persistentFile;
    }

    /**
     * Sets the the name of the static file. Static files comes pre-shipped with the head unit
     * @param {Boolean} staticIcon - a StaticIconName enum value representing the name of a static file that comes pre-shipped with the head unit
     * @returns {SdlFile} - A reference to this instance to support method chaining.
     */
    setStaticIcon (staticIcon) {
        this._isStaticIcon = staticIcon;
        return this;
    }

    /**
     * Gets the the name of the static file. Static files comes pre-shipped with the head unit
     * @returns {Boolean} - a StaticIconName enum value representing the name of a static file that comes pre-shipped with the head unit
     */
    isStaticIcon () {
        return this._isStaticIcon;
    }

    /**
     * Sets the overwrite property for an SdlFile
     * @param {Boolean} overwrite - A boolean value that indicates if the file can be overwritten
     * @returns {SdlFile} - A reference to this instance to support method chaining
     */
    setOverwrite (overwrite) {
        this._overwrite = overwrite;
        return this;
    }

    /**
     * Gets the overwrite property for an SdlFile
     * @returns {Boolean} - A boolean value that indicates if the file can be overwritten
     */
    getOverwrite () {
        return this._overwrite;
    }

    /**
     * Checks whether two SdlFiles can be considered equivalent
     * @param {SdlFile} other - The object to compare
     * @returns {Boolean} - Whether the objects are the same or not
     */
    equals (other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (this === other) {
            return true;
        }
        if (!(other instanceof SdlFile)) {
            return false;
        }

        // main comparison check
        if (this.getName() !== other.getName()) {
            return false;
        }
        if (this.getFilePath() !== other.getFilePath()) {
            return false;
        }
        if (this.getFileData() !== other.getFileData()) {
            return false;
        }
        if (this.getType() !== other.getType()) {
            return false;
        }
        if (this.isPersistent() !== other.isPersistent()) {
            return false;
        }
        if (this.isStaticIcon() !== other.isStaticIcon()) {
            return false;
        }
        return true;
    }
}


export { SdlFile };
