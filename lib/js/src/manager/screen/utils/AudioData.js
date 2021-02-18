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
import { SpeechCapabilities } from '../../../rpc/enums/SpeechCapabilities';
import { TTSChunk } from '../../../rpc/structs/TTSChunk';

class AudioData {
    /**
     * Initializes an instance of AudioData.
     * @class
     * @param {String} phoneticString - The string to be spoken in audio.
     * @param {SpeechCapabilities} phoneticType - A SpeechCapabilities enum.
     * @param {SdlFile} audioFile - An SdlFile instance referencing an audio file.
     */
    constructor (phoneticString = null, phoneticType = null, audioFile = null) {
        if (phoneticType !== null && !this.isValidPhoneticType(phoneticType)) {
            return;
        }
        this._audioData = [];
        if (audioFile !== null) {
            this._audioData.push(new TTSChunk().setText(audioFile.getName()).setType(SpeechCapabilities.FILE));

            this._audioFiles = new Map();
            this._audioFiles.set(audioFile.getName(), audioFile);
            return;
        }
        if (phoneticString !== null) {
            if (phoneticType === null) {
                phoneticType = SpeechCapabilities.SC_TEXT;
            }
            this._audioData.push(new TTSChunk().setText(phoneticString).setType(phoneticType));
        }
    }

    /**
     * Checks whether the phonetic type is valid.
     * @param {SpeechCapabilities} phoneticType - Validates the phoneticType provided.
     * @returns {Boolean} - Whether the phonetic type is valid.
     */
    isValidPhoneticType (phoneticType) {
        if (!(phoneticType === SpeechCapabilities.SAPI_PHONEMES || phoneticType === SpeechCapabilities.LHPLUS_PHONEMES
                || phoneticType === SpeechCapabilities.SC_TEXT || phoneticType === SpeechCapabilities.PRE_RECORDED)) {
            return false;
        }
        return true;
    }

    /**
     * Adds audio files to _audioFiles.
     * @param {SdlFile[]} audioFiles - A list of audio files referenced by SdlFile instances.
     */
    addAudioFiles (audioFiles) {
        if (this._audioFiles === null || this._audioFiles === undefined) {
            this._audioFiles = new Map();
        }
        audioFiles.forEach((audioFile) => {
            this._audioData.push(new TTSChunk().setText(audioFile.getName()).setType(SpeechCapabilities.FILE));
            this._audioFiles.set(audioFile.getName(), audioFile);
        });
    }

    /**
     * Create additional strings to be spoken by the system speech synthesizer.
     * @param {String[]} spokenString - The strings to be spoken by the system speech synthesizer.
     */
    addSpeechSynthesizerStrings (spokenString) {
        if (spokenString.length === 0) {
            return;
        }
        const newPrompts = [];
        for (const spoken of spokenString) {
            if (spoken.length === 0) {
                continue;
            }
            newPrompts.push(new TTSChunk().setText(spoken));
        }
        if (newPrompts.length === 0) {
            return;
        }
        if (this._audioData === null || this._audioData === undefined) {
            this._audioData = newPrompts;
            return;
        }
        this._audioData.push.apply(this._audioData, newPrompts);
    }

    /**
     * Create additional strings to be spoken by the system speech synthesizer using a phonetic string.
     * @param {String[]} phoneticString - The strings to be spoken by the system speech synthesizer
     * @param {SpeechCapabilities} phoneticType - Must be one of `SAPI_PHONEMES`, `LHPLUS_PHONEMES`, `TEXT`, or `PRE_RECORDED` or no object will be created
     */
    addPhoneticSpeechSynthesizerStrings (phoneticString, phoneticType) {
        if (!this.isValidPhoneticType(phoneticType) || phoneticString.length === 0) {
            return;
        }
        const newPrompts = [];
        for (const phonetic of phoneticString) {
            if (phonetic.length === 0) {
                continue;
            }
            newPrompts.push(new TTSChunk().setText(phonetic).setType(phoneticType));
        }
        if (newPrompts.length === 0) {
            return;
        }
        if (this._audioData === null || this._audioData === undefined) {
            this._audioData = newPrompts;
            return;
        }
        this._audioData.push.apply(this._audioData, newPrompts);
    }

    /**
     * Gets the audio files.
     * @returns {Map} - A HashMap of audio file names and SdlFile instances.
     */
    _getAudioFiles () {
        return this._audioFiles;
    }

    /**
     * Gets the audio data.
     * @returns {TTSChunk[]} - An array of TTSChunks.
     */
    getAudioData () {
        return this._audioData;
    }
}

export { AudioData };