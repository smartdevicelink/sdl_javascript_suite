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

import { AudioType } from '../enums/AudioType.js';
import { BitsPerSample } from '../enums/BitsPerSample.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';
import { SamplingRate } from '../enums/SamplingRate.js';
import { TTSChunk } from '../structs/TTSChunk.js';

/**
 * Starts audio pass thru session
 */
class PerformAudioPassThru extends RpcRequest {
    /**
     * Initalizes an instance of PerformAudioPassThru.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.PerformAudioPassThru);
    }

    /**
     * Set the InitialPrompt
     * @param {TTSChunk[]} prompt - The module will speak this prompt before opening the audio pass thru session. An array of text chunks of type TTSChunk. See TTSChunk. The array must have at least one item. If omitted, then no initial prompt is spoken. - The desired InitialPrompt.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setInitialPrompt (prompt) {
        this._validateType(TTSChunk, prompt, true);
        this.setParameter(PerformAudioPassThru.KEY_INITIAL_PROMPT, prompt);
        return this;
    }

    /**
     * Get the InitialPrompt
     * @returns {TTSChunk[]} - the KEY_INITIAL_PROMPT value
     */
    getInitialPrompt () {
        return this.getObject(TTSChunk, PerformAudioPassThru.KEY_INITIAL_PROMPT);
    }

    /**
     * Set the AudioPassThruDisplayText1
     * @param {String} text1 - First line of text displayed during audio capture. - The desired AudioPassThruDisplayText1.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setAudioPassThruDisplayText1 (text1) {
        this.setParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_1, text1);
        return this;
    }

    /**
     * Get the AudioPassThruDisplayText1
     * @returns {String} - the KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_1 value
     */
    getAudioPassThruDisplayText1 () {
        return this.getParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_1);
    }

    /**
     * Set the AudioPassThruDisplayText2
     * @param {String} text2 - Second line of text displayed during audio capture. - The desired AudioPassThruDisplayText2.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setAudioPassThruDisplayText2 (text2) {
        this.setParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_2, text2);
        return this;
    }

    /**
     * Get the AudioPassThruDisplayText2
     * @returns {String} - the KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_2 value
     */
    getAudioPassThruDisplayText2 () {
        return this.getParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_2);
    }

    /**
     * Set the SamplingRate
     * @param {SamplingRate} rate - This value shall be allowed at 8 kHz or 16 or 22 or 44 kHz. - The desired SamplingRate.
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setSamplingRate (rate) {
        this._validateType(SamplingRate, rate);
        this.setParameter(PerformAudioPassThru.KEY_SAMPLING_RATE, rate);
        return this;
    }

    /**
     * Get the SamplingRate
     * @returns {SamplingRate} - the KEY_SAMPLING_RATE value
     */
    getSamplingRate () {
        return this.getObject(SamplingRate, PerformAudioPassThru.KEY_SAMPLING_RATE);
    }

    /**
     * Set the MaxDuration
     * @param {Number} duration - The maximum duration of audio recording in milliseconds. - The desired MaxDuration.
     * {'num_min_value': 1, 'num_max_value': 1000000}
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setMaxDuration (duration) {
        this.setParameter(PerformAudioPassThru.KEY_MAX_DURATION, duration);
        return this;
    }

    /**
     * Get the MaxDuration
     * @returns {Number} - the KEY_MAX_DURATION value
     */
    getMaxDuration () {
        return this.getParameter(PerformAudioPassThru.KEY_MAX_DURATION);
    }

    /**
     * Set the BitsPerSample
     * @param {BitsPerSample} sample - Specifies the quality the audio is recorded. Currently 8 bit or 16 bit. - The desired BitsPerSample.
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setBitsPerSample (sample) {
        this._validateType(BitsPerSample, sample);
        this.setParameter(PerformAudioPassThru.KEY_BITS_PER_SAMPLE, sample);
        return this;
    }

    /**
     * Get the BitsPerSample
     * @returns {BitsPerSample} - the KEY_BITS_PER_SAMPLE value
     */
    getBitsPerSample () {
        return this.getObject(BitsPerSample, PerformAudioPassThru.KEY_BITS_PER_SAMPLE);
    }

    /**
     * Set the AudioType
     * @param {AudioType} type - Specifies the type of audio data being requested. - The desired AudioType.
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setAudioType (type) {
        this._validateType(AudioType, type);
        this.setParameter(PerformAudioPassThru.KEY_AUDIO_TYPE, type);
        return this;
    }

    /**
     * Get the AudioType
     * @returns {AudioType} - the KEY_AUDIO_TYPE value
     */
    getAudioType () {
        return this.getObject(AudioType, PerformAudioPassThru.KEY_AUDIO_TYPE);
    }

    /**
     * Set the MuteAudio
     * @param {Boolean} audio - Defines if the current audio source should be muted during the APT session. If not, the audio source will play without interruption. If omitted, the value is set to true. - The desired MuteAudio.
     * @returns {PerformAudioPassThru} - The class instance for method chaining.
     */
    setMuteAudio (audio) {
        this.setParameter(PerformAudioPassThru.KEY_MUTE_AUDIO, audio);
        return this;
    }

    /**
     * Get the MuteAudio
     * @returns {Boolean} - the KEY_MUTE_AUDIO value
     */
    getMuteAudio () {
        return this.getParameter(PerformAudioPassThru.KEY_MUTE_AUDIO);
    }
}

PerformAudioPassThru.KEY_INITIAL_PROMPT = 'initialPrompt';
PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_1 = 'audioPassThruDisplayText1';
PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_2 = 'audioPassThruDisplayText2';
PerformAudioPassThru.KEY_SAMPLING_RATE = 'samplingRate';
PerformAudioPassThru.KEY_MAX_DURATION = 'maxDuration';
PerformAudioPassThru.KEY_BITS_PER_SAMPLE = 'bitsPerSample';
PerformAudioPassThru.KEY_AUDIO_TYPE = 'audioType';
PerformAudioPassThru.KEY_MUTE_AUDIO = 'muteAudio';

export { PerformAudioPassThru };