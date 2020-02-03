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
import { ModuleInfo } from './ModuleInfo.js';

class AudioControlCapabilities extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - The short friendly name of the light control module. It should not be used to identify a
     *                        module by mobile application.
     * @return {AudioControlCapabilities}
     */
    setModuleName (name) {
        this.setParameter(AudioControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleName () {
        return this.getParameter(AudioControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * @param {ModuleInfo} info - Information about a RC module, including its id.
     * @return {AudioControlCapabilities}
     */
    setModuleInfo (info) {
        this.validateType(ModuleInfo, info);
        this.setParameter(AudioControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * @return {ModuleInfo}
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, AudioControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * @param {Boolean} available - Availability of the control of audio source.
     * @return {AudioControlCapabilities}
     */
    setSourceAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_SOURCE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSourceAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_SOURCE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the keepContext parameter.
     * @return {AudioControlCapabilities}
     */
    setKeepContextAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_KEEP_CONTEXT_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getKeepContextAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_KEEP_CONTEXT_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of audio volume.
     * @return {AudioControlCapabilities}
     */
    setVolumeAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_VOLUME_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getVolumeAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_VOLUME_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of Equalizer Settings.
     * @return {AudioControlCapabilities}
     */
    setEqualizerAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_EQUALIZER_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getEqualizerAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_EQUALIZER_AVAILABLE);
    }

    /**
     * @param {Number} id - Must be included if equalizerAvailable=true, and assume all IDs starting from 1 to this
     *                      value are valid
     * @return {AudioControlCapabilities}
     */
    setEqualizerMaxChannelId (id) {
        this.setParameter(AudioControlCapabilities.KEY_EQUALIZER_MAX_CHANNEL_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getEqualizerMaxChannelId () {
        return this.getParameter(AudioControlCapabilities.KEY_EQUALIZER_MAX_CHANNEL_ID);
    }
}

AudioControlCapabilities.KEY_MODULE_NAME = 'moduleName';
AudioControlCapabilities.KEY_MODULE_INFO = 'moduleInfo';
AudioControlCapabilities.KEY_SOURCE_AVAILABLE = 'sourceAvailable';
AudioControlCapabilities.KEY_KEEP_CONTEXT_AVAILABLE = 'keepContextAvailable';
AudioControlCapabilities.KEY_VOLUME_AVAILABLE = 'volumeAvailable';
AudioControlCapabilities.KEY_EQUALIZER_AVAILABLE = 'equalizerAvailable';
AudioControlCapabilities.KEY_EQUALIZER_MAX_CHANNEL_ID = 'equalizerMaxChannelId';

export { AudioControlCapabilities };