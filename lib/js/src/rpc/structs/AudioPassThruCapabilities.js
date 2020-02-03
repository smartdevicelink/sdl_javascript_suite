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
import { SamplingRate } from '../enums/SamplingRate.js';
import { BitsPerSample } from '../enums/BitsPerSample.js';
import { AudioType } from '../enums/AudioType.js';

/**
 * Describes different audio type configurations for PerformAudioPassThru. e.g. {8kHz,8-bit,PCM} The audio is recorded
 * in monaural.
 */
class AudioPassThruCapabilities extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {SamplingRate} rate - Describes different sampling options for PerformAudioPassThru.
     * @return {AudioPassThruCapabilities}
     */
    setSamplingRate (rate) {
        this.validateType(SamplingRate, rate);
        this.setParameter(AudioPassThruCapabilities.KEY_SAMPLING_RATE, rate);
        return this;
    }

    /**
     * @return {SamplingRate}
     */
    getSamplingRate () {
        return this.getObject(SamplingRate, AudioPassThruCapabilities.KEY_SAMPLING_RATE);
    }

    /**
     * @param {BitsPerSample} sample - Describes different quality options for PerformAudioPassThru.
     * @return {AudioPassThruCapabilities}
     */
    setBitsPerSample (sample) {
        this.validateType(BitsPerSample, sample);
        this.setParameter(AudioPassThruCapabilities.KEY_BITS_PER_SAMPLE, sample);
        return this;
    }

    /**
     * @return {BitsPerSample}
     */
    getBitsPerSample () {
        return this.getObject(BitsPerSample, AudioPassThruCapabilities.KEY_BITS_PER_SAMPLE);
    }

    /**
     * @param {AudioType} type - Describes different audio type options for PerformAudioPassThru.
     * @return {AudioPassThruCapabilities}
     */
    setAudioType (type) {
        this.validateType(AudioType, type);
        this.setParameter(AudioPassThruCapabilities.KEY_AUDIO_TYPE, type);
        return this;
    }

    /**
     * @return {AudioType}
     */
    getAudioType () {
        return this.getObject(AudioType, AudioPassThruCapabilities.KEY_AUDIO_TYPE);
    }
}

AudioPassThruCapabilities.KEY_SAMPLING_RATE = 'samplingRate';
AudioPassThruCapabilities.KEY_BITS_PER_SAMPLE = 'bitsPerSample';
AudioPassThruCapabilities.KEY_AUDIO_TYPE = 'audioType';

export { AudioPassThruCapabilities };