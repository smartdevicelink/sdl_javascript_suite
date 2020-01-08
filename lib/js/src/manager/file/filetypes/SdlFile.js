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
     * @param fileName - a String value representing the name that will be used to store the file in the head unit
     * @param fileType - a FileType enum value representing the type of the file
     * @param data - a byte array representing the data of the file
     * @param persistentFile - a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     */
    constructor (fileName, fileType, data, persistentFile) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileData = data;
        this.persistentFile = persistentFile;
    }

    /**
     * Sets the name of the file
     * @param fileName - a String value representing the name that will be used to store the file in the head unit
     */
    setName (fileName) {
        this.fileName = fileName;
    }

    /**
     * Gets the name of the file
     * @return a String value representing the name that will be used to store the file in the head unit
     */
    getName () {
        return this.fileName;
    }

    /**
     * Sets the location of the file
     * @param filePath a String value representing the the location of the file
     */
    setFilePath (filePath) {
        this.filePath = filePath;
    }

    /**
     * Gets the location of the file
     * @return
     */
    getFilePath () {
        return this.filePath;
    }

    /**
     * Sets the byte array that represents the content of the file
     * @param data a byte array representing the data of the file
     */
    setFileData (data) {
        this.fileData = data;
    }

    /**
     * Gets the byte array that represents the content of the file
     * @return a byte array representing the data of the file
     */
    getFileData () {
        return this.fileData;
    }

    /**
     * Sets the type of the file
     * @param fileType a FileType enum value representing the type of the file
     */
    setType (fileType) {
        this.fileType = fileType;
    }

    /**
     * Gets the type of the file
     * @return a FileType enum value representing the type of the file
     */
    getType () {
        return this.fileType;
    }

    /**
     * Sets whether the file should persist between sessions / ignition cycles
     * @param persistentFile a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     */
    setPersistent (persistentFile) {
        this.persistentFile = persistentFile;
    }

    /**
     * Gets whether the file should persist between sessions / ignition cycles
     * @return a boolean value that indicates if the file is meant to persist between sessions / ignition cycles
     */
    isPersistent () {
        return this.persistentFile;
    }

    /**
     * Sets the the name of the static file. Static files comes pre-shipped with the head unit
     * @param staticIcon a StaticIconName enum value representing the name of a static file that comes pre-shipped with the head unit
     */
    setStaticIcon (staticIcon) {
        this._isStaticIcon = staticIcon;
    }

    /**
     * Gets the the name of the static file. Static files comes pre-shipped with the head unit
     * @return a StaticIconName enum value representing the name of a static file that comes pre-shipped with the head unit
     */
    isStaticIcon () {
        return this._isStaticIcon;
    }
}


export { SdlFile };
