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

import { FunctionID } from '../enums/FunctionID.js';
import { TTSChunk } from '../structs/TTSChunk.js';
import { AudioType } from '../enums/AudioType.js';
import { BitsPerSample } from '../enums/BitsPerSample.js';
import { RpcRequest } from '../RpcRequest.js';
import { SamplingRate } from '../enums/SamplingRate.js';

/**
 * Starts audio pass thru session
 */
class PerformAudioPassThru extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.PerformAudioPassThru);
    }

    /**
     * @param {TTSChunk[]} prompt - The module will speak this prompt before opening the audio pass thru session. An
     *                              array of text chunks of type TTSChunk. See TTSChunk. The array must have at least
     *                              one item. If omitted, then no initial prompt is spoken.
     * @return {PerformAudioPassThru}
     */
    setInitialPrompt (prompt) {
        this.validateType(TTSChunk, prompt, true);
        this.setParameter(PerformAudioPassThru.KEY_INITIAL_PROMPT, prompt);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getInitialPrompt () {
        return this.getObject(TTSChunk, PerformAudioPassThru.KEY_INITIAL_PROMPT);
    }

    /**
     * @param {String} text1 - First line of text displayed during audio capture.
     * @return {PerformAudioPassThru}
     */
    setAudioPassThruDisplayText1 (text1) {
        this.setParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_1, text1);
        return this;
    }

    /**
     * @return {String}
     */
    getAudioPassThruDisplayText1 () {
        return this.getParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_1);
    }

    /**
     * @param {String} text2 - Second line of text displayed during audio capture.
     * @return {PerformAudioPassThru}
     */
    setAudioPassThruDisplayText2 (text2) {
        this.setParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_2, text2);
        return this;
    }

    /**
     * @return {String}
     */
    getAudioPassThruDisplayText2 () {
        return this.getParameter(PerformAudioPassThru.KEY_AUDIO_PASS_THRU_DISPLAY_TEXT_2);
    }

    /**
     * @param {SamplingRate} rate - This value shall be allowed at 8 kHz or 16 or 22 or 44 kHz.
     * @return {PerformAudioPassThru}
     */
    setSamplingRate (rate) {
        this.validateType(SamplingRate, rate);
        this.setParameter(PerformAudioPassThru.KEY_SAMPLING_RATE, rate);
        return this;
    }

    /**
     * @return {SamplingRate}
     */
    getSamplingRate () {
        return this.getObject(SamplingRate, PerformAudioPassThru.KEY_SAMPLING_RATE);
    }

    /**
     * @param {Number} duration - The maximum duration of audio recording in milliseconds.
     * @return {PerformAudioPassThru}
     */
    setMaxDuration (duration) {
        this.setParameter(PerformAudioPassThru.KEY_MAX_DURATION, duration);
        return this;
    }

    /**
     * @return {Number}
     */
    getMaxDuration () {
        return this.getParameter(PerformAudioPassThru.KEY_MAX_DURATION);
    }

    /**
     * @param {BitsPerSample} sample - Specifies the quality the audio is recorded. Currently 8 bit or 16 bit.
     * @return {PerformAudioPassThru}
     */
    setBitsPerSample (sample) {
        this.validateType(BitsPerSample, sample);
        this.setParameter(PerformAudioPassThru.KEY_BITS_PER_SAMPLE, sample);
        return this;
    }

    /**
     * @return {BitsPerSample}
     */
    getBitsPerSample () {
        return this.getObject(BitsPerSample, PerformAudioPassThru.KEY_BITS_PER_SAMPLE);
    }

    /**
     * @param {AudioType} type - Specifies the type of audio data being requested.
     * @return {PerformAudioPassThru}
     */
    setAudioType (type) {
        this.validateType(AudioType, type);
        this.setParameter(PerformAudioPassThru.KEY_AUDIO_TYPE, type);
        return this;
    }

    /**
     * @return {AudioType}
     */
    getAudioType () {
        return this.getObject(AudioType, PerformAudioPassThru.KEY_AUDIO_TYPE);
    }

    /**
     * @param {Boolean} audio - Defines if the current audio source should be muted during the APT session. If not, the
     *                          audio source will play without interruption. If omitted, the value is set to true.
     * @return {PerformAudioPassThru}
     */
    setMuteAudio (audio) {
        this.setParameter(PerformAudioPassThru.KEY_MUTE_AUDIO, audio);
        return this;
    }

    /**
     * @return {Boolean}
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