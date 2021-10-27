/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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

import { ModuleInfo } from './ModuleInfo.js';
import { RpcStruct } from '../RpcStruct.js';

class AudioControlCapabilities extends RpcStruct {
    /**
     * Initializes an instance of AudioControlCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleName
     * @param {String} name - The short friendly name of the audio control module. It should not be used to identify a module by mobile application. - The desired ModuleName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setModuleName (name) {
        this.setParameter(AudioControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * Get the ModuleName
     * @returns {String} - the KEY_MODULE_NAME value
     */
    getModuleName () {
        return this.getParameter(AudioControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * Set the ModuleInfo
     * @since SmartDeviceLink 6.0.0
     * @param {ModuleInfo} info - Information about an RC module, including its id. - The desired ModuleInfo.
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setModuleInfo (info) {
        this._validateType(ModuleInfo, info);
        this.setParameter(AudioControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * Get the ModuleInfo
     * @returns {ModuleInfo} - the KEY_MODULE_INFO value
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, AudioControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * Set the SourceAvailable
     * @param {Boolean} available - Availability of the control of audio source. - The desired SourceAvailable.
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setSourceAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_SOURCE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the SourceAvailable
     * @returns {Boolean} - the KEY_SOURCE_AVAILABLE value
     */
    getSourceAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_SOURCE_AVAILABLE);
    }

    /**
     * Set the KeepContextAvailable
     * @param {Boolean} available - Availability of the keepContext parameter. - The desired KeepContextAvailable.
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setKeepContextAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_KEEP_CONTEXT_AVAILABLE, available);
        return this;
    }

    /**
     * Get the KeepContextAvailable
     * @returns {Boolean} - the KEY_KEEP_CONTEXT_AVAILABLE value
     */
    getKeepContextAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_KEEP_CONTEXT_AVAILABLE);
    }

    /**
     * Set the VolumeAvailable
     * @param {Boolean} available - Availability of the control of audio volume. - The desired VolumeAvailable.
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setVolumeAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_VOLUME_AVAILABLE, available);
        return this;
    }

    /**
     * Get the VolumeAvailable
     * @returns {Boolean} - the KEY_VOLUME_AVAILABLE value
     */
    getVolumeAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_VOLUME_AVAILABLE);
    }

    /**
     * Set the EqualizerAvailable
     * @param {Boolean} available - Availability of the control of Equalizer Settings. - The desired EqualizerAvailable.
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setEqualizerAvailable (available) {
        this.setParameter(AudioControlCapabilities.KEY_EQUALIZER_AVAILABLE, available);
        return this;
    }

    /**
     * Get the EqualizerAvailable
     * @returns {Boolean} - the KEY_EQUALIZER_AVAILABLE value
     */
    getEqualizerAvailable () {
        return this.getParameter(AudioControlCapabilities.KEY_EQUALIZER_AVAILABLE);
    }

    /**
     * Set the EqualizerMaxChannelId
     * @param {Number} id - Must be included if equalizerAvailable=true, and assume all IDs starting from 1 to this value are valid - The desired EqualizerMaxChannelId.
     * {'num_min_value': 1, 'num_max_value': 100}
     * @returns {AudioControlCapabilities} - The class instance for method chaining.
     */
    setEqualizerMaxChannelId (id) {
        this.setParameter(AudioControlCapabilities.KEY_EQUALIZER_MAX_CHANNEL_ID, id);
        return this;
    }

    /**
     * Get the EqualizerMaxChannelId
     * @returns {Number} - the KEY_EQUALIZER_MAX_CHANNEL_ID value
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