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

import { TTSChunk } from '../../rpc/structs/TTSChunk';
import { SdlFile } from '../file/filetypes/SdlFile';
import { AudioData } from './AudioData';

class AlertAudioData extends AudioData {
    constructor (phoneticString = null, phoneticType = null, audioFile = null) {
        super(phoneticString, phoneticType, audioFile);
        this.playTone = false;
    }

    /**
     * Get the PlayTone
     * @returns {Boolean} - the playTone value
     */
    isPlayTone () {
        return this.playTone;
    }

    /**
     * Set the PlayTone
     * @param {Boolean} playTone - Defines if tone should be played. Tone is played before TTS. If omitted or provided without ttsChunks, no tone is played.
     * @returns {AlertAudioData} - The class instance for method chaining.
     */
    setPlayTone (playTone) {
        this.playTone = playTone;
        return this;
    }

    clone () {
        const clone = new AlertAudioData();
        if (Array.isArray(this.getPrompts())) {
            clone._prompts = this.getPrompts().map((prompt, index) => {
                // clone the prompt so we don't modify the develop copy
                return new TTSChunk(JSON.parse(JSON.stringify(prompt.getParameters())));
            });
        }
        if (Array.isArray(this.getAudioFiles())) {
            const audioFilesClone = this.getAudioFiles().map((audioFile) => {
                return new SdlFile()
                    .setName(JSON.parse(JSON.stringify(audioFile.getName())))
                    .setFilePath(JSON.parse(JSON.stringify(audioFile.getFilePath())))
                    .setFileData(JSON.parse(JSON.stringify(audioFile.getFileData())))
                    .setType(JSON.parse(JSON.stringify(audioFile.getType())))
                    .setPersistent(JSON.parse(JSON.stringify(audioFile.isPersistent())))
                    .setStaticIcon(JSON.parse(JSON.stringify(audioFile.isStaticIcon())));
            });
            clone.addAudioFiles(audioFilesClone);
        }
        return clone;
    }
}

export { AlertAudioData };