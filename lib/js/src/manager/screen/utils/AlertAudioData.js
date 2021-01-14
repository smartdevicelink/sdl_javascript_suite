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

import { TTSChunk } from '../../../rpc/structs/TTSChunk';
import { SdlFile } from '../../file/filetypes/SdlFile';
import { AudioData } from './AudioData';

class AlertAudioData extends AudioData {
    /**
     * Initializes an instance of AlertAudioData.
     * @class
     * @param {String} phoneticString - The string to be spoken in audio.
     * @param {SpeechCapabilities} phoneticType - A SpeechCapabilities enum.
     * @param {SdlFile} audioFile - An SdlFile instance referencing an audio file.
     */
    constructor (phoneticString = null, phoneticType = null, audioFile = null) {
        super(phoneticString, phoneticType, audioFile);
        this._playTone = false;
    }

    /**
     * Get the PlayTone
     * @returns {Boolean} - the playTone value
     */
    isPlayTone () {
        return this._playTone;
    }

    /**
     * Set the PlayTone
     * @param {Boolean} playTone - Defines if tone should be played. Tone is played before TTS. If omitted or provided without ttsChunks, no tone is played.
     * @returns {AlertAudioData} - The class instance for method chaining.
     */
    setPlayTone (playTone) {
        this._playTone = playTone;
        return this;
    }

    /**
     * Creates a deep copy of the object.
     * @returns {AlertAudioData} - A deep clone of the AlertAudioData instance.
     */
    clone () {
        const clone = new AlertAudioData();
        clone.setPlayTone(JSON.parse(JSON.stringify(this.isPlayTone())));
        if (Array.isArray(this.getAudioData())) {
            clone._audioData = this.getAudioData().map((audioData, index) => {
                // clone the prompt so we don't modify the develop copy
                return new TTSChunk(JSON.parse(JSON.stringify(audioData.getParameters())));
            });
        }
        if (this.getAudioFiles() !== null && this.getAudioFiles() !== undefined) {
            const audioFilesClone = [];
            this.getAudioFiles().forEach((file, fileName) => {
                const audioClone = JSON.parse(JSON.stringify(file));
                const fileClone = new SdlFile()
                    .setName(audioClone._fileName)
                    .setFilePath(audioClone._filePath)
                    .setFileData(audioClone._fileData)
                    .setType(audioClone._fileType)
                    .setPersistent(audioClone._persistentFile)
                    .setStaticIcon(audioClone._isStaticIcon)
                    .setOverwrite(audioClone._overwrite);

                audioFilesClone.push(fileClone);
            });
            clone.addAudioFiles(audioFilesClone);
        }
        return clone;
    }
}

export { AlertAudioData };