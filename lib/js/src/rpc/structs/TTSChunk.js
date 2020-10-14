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

import { RpcStruct } from '../RpcStruct.js';
import { SpeechCapabilities } from '../enums/SpeechCapabilities.js';

/**
 * A TTS chunk, that consists of text/phonemes to speak or the name of a file to play, and a TTS type (like text or SAPI)
 */
class TTSChunk extends RpcStruct {
    /**
     * Initalizes an instance of TTSChunk.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Text
     * @param {String} text - The text or phonemes to speak, or the name of the audio file to play. May not be empty. - The desired Text.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {TTSChunk} - The class instance for method chaining.
     */
    setText (text) {
        this.setParameter(TTSChunk.KEY_TEXT, text);
        return this;
    }

    /**
     * Get the Text
     * @returns {String} - the KEY_TEXT value
     */
    getText () {
        return this.getParameter(TTSChunk.KEY_TEXT);
    }

    /**
     * Set the Type
     * @param {SpeechCapabilities} type - Describes whether the TTS chunk is plain text, a specific phoneme set, or an audio file. See SpeechCapabilities - The desired Type.
     * @returns {TTSChunk} - The class instance for method chaining.
     */
    setType (type) {
        this._validateType(SpeechCapabilities, type);
        this.setParameter(TTSChunk.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {SpeechCapabilities} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(SpeechCapabilities, TTSChunk.KEY_TYPE);
    }
}

TTSChunk.KEY_TEXT = 'text';
TTSChunk.KEY_TYPE = 'type';

export { TTSChunk };