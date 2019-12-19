/*
* Copyright (c) 2019, Livio, Inc.
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

import { RpcStruct } from '../RpcStruct.js';
import { SamplingRate } from '../enums/SamplingRate.js';
import { BitsPerSample } from '../enums/BitsPerSample.js';
import { AudioType } from '../enums/AudioType.js';

class AudioPassThruCapabilities extends RpcStruct {
    constructor (parameters) {
        super(parameters);
    }

    /**
    * @param {SamplingRate} samplingRate
    * @return {AudioPassThruCapabilities}
    */
    setSamplingRate (samplingRate) {
        this.validateType(SamplingRate, samplingRate)

        this.setParameter(AudioPassThruCapabilities.KEY_SAMPLING_RATE, samplingRate);
        return this;
    }

    /**
    * @return {SamplingRate}
    */
    getSamplingRate () {
        return this.getObject(SamplingRate, AudioPassThruCapabilities.KEY_SAMPLING_RATE);
    }

    /**
    * @param {BitsPerSample} bitsPerSample
    * @return {AudioPassThruCapabilities}
    */
    setBitsPerSample (bitsPerSample) {
        this.validateType(BitsPerSample, bitsPerSample)

        this.setParameter(AudioPassThruCapabilities.KEY_BITS_PER_SAMPLE, bitsPerSample);
        return this;
    }

    /**
    * @return {BitsPerSample}
    */
    getBitsPerSample () {
        return this.getObject(BitsPerSample, AudioPassThruCapabilities.KEY_BITS_PER_SAMPLE);
    }

    /**
    * @param {AudioType} bitsPerSample
    * @return {AudioPassThruCapabilities}
    */
    setAudioType (audioType) {
        this.validateType(AudioType, audioType)

        this.setParameter(AudioPassThruCapabilities.KEY_AUDIO_TYPE, audioType);
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
