/*
* Copyright (c) 2020, Livio, Inc.
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

class FileManagerConfig {
    /**
     * Initializes an instance of the FileManagerConfig.
     * @class
     */
    constructor () {
        this._artworkRetryCount = 1;
        this._fileRetryCount = 1;
    }

    /**
     * Sets the artworkRetryCount
     * @param {Number} artworkRetryCount - The number of times that SdlArtwork should attempt to be reuploaded in the event of a failure.
     * @returns {FileManagerConfig} - The instance of FileManagerConfig for method chaining.
     */
    setArtworkRetryCount (artworkRetryCount) {
        this._artworkRetryCount = artworkRetryCount;
        return this;
    }

    /**
     * Gets the artworkRetryCount
     * @returns {Number} - The number of times that SdlArtwork should attempt to be reuploaded in the event of a failure.
     */
    getArtworkRetryCount () {
        return this._artworkRetryCount;
    }

    /**
     * Sets the fileRetryCount
     * @param {Number} fileRetryCount - The number of times that SdlFile should attempt to be reuploaded in the event of a failure.
     * @returns {FileManagerConfig} - The instance of FileManagerConfig for method chaining.
     */
    setFileRetryCount (fileRetryCount) {
        this._fileRetryCount = fileRetryCount;
        return this;
    }

    /**
     * Gets the FileRetryCount
     * @returns {Number} - The number of times that SdlFile should attempt to be reuploaded in the event of a failure.
     */
    getFileRetryCount () {
        return this._fileRetryCount;
    }
}

export { FileManagerConfig };