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

import { EqualizerSettings } from './EqualizerSettings.js';
import { PrimaryAudioSource } from '../enums/PrimaryAudioSource.js';
import { RpcStruct } from '../RpcStruct.js';

class AudioControlData extends RpcStruct {
    /**
     * Initalizes an instance of AudioControlData.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {PrimaryAudioSource} source - In a getter response or a notification, it is the current primary audio
     *                                      source of the system. In a setter request, it is the target audio source
     *                                      that the system shall switch to. If the value is MOBILE_APP, the system
     *                                      shall switch to the mobile media app that issues the setter RPC.
     * @return {AudioControlData}
     */
    setSource (source) {
        this.validateType(PrimaryAudioSource, source);
        this.setParameter(AudioControlData.KEY_SOURCE, source);
        return this;
    }

    /**
     * @return {PrimaryAudioSource}
     */
    getSource () {
        return this.getObject(PrimaryAudioSource, AudioControlData.KEY_SOURCE);
    }

    /**
     * @param {Boolean} context - This parameter shall not be present in any getter responses or notifications. This
     *                            parameter is optional in a setter request. The default value is false if it is not
     *                            included. If it is false, the system not only changes the audio source but also brings
     *                            the default application or system UI associated with the audio source to foreground.
     *                            If it is true, the system only changes the audio source, but keeps the current
     *                            application in foreground.
     * @return {AudioControlData}
     */
    setKeepContext (context) {
        this.setParameter(AudioControlData.KEY_KEEP_CONTEXT, context);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getKeepContext () {
        return this.getParameter(AudioControlData.KEY_KEEP_CONTEXT);
    }

    /**
     * @param {Number} volume - Reflects the volume of audio, from 0%-100%.
     * @return {AudioControlData}
     */
    setVolume (volume) {
        this.setParameter(AudioControlData.KEY_VOLUME, volume);
        return this;
    }

    /**
     * @return {Number}
     */
    getVolume () {
        return this.getParameter(AudioControlData.KEY_VOLUME);
    }

    /**
     * @param {EqualizerSettings[]} settings - Defines the list of supported channels (band) and their current/desired
     *                                         settings on HMI
     * @return {AudioControlData}
     */
    setEqualizerSettings (settings) {
        this.validateType(EqualizerSettings, settings, true);
        this.setParameter(AudioControlData.KEY_EQUALIZER_SETTINGS, settings);
        return this;
    }

    /**
     * @return {EqualizerSettings[]}
     */
    getEqualizerSettings () {
        return this.getObject(EqualizerSettings, AudioControlData.KEY_EQUALIZER_SETTINGS);
    }
}

AudioControlData.KEY_SOURCE = 'source';
AudioControlData.KEY_KEEP_CONTEXT = 'keepContext';
AudioControlData.KEY_VOLUME = 'volume';
AudioControlData.KEY_EQUALIZER_SETTINGS = 'equalizerSettings';

export { AudioControlData };