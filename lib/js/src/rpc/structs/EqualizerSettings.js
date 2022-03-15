/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

/**
 * Defines the each Equalizer channel settings.
 */
class EqualizerSettings extends RpcStruct {
    /**
     * Initializes an instance of EqualizerSettings.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ChannelId
     * @param {Number} id - The desired ChannelId.
     * {'num_min_value': 1, 'num_max_value': 100}
     * @returns {EqualizerSettings} - The class instance for method chaining.
     */
    setChannelId (id) {
        this.setParameter(EqualizerSettings.KEY_CHANNEL_ID, id);
        return this;
    }

    /**
     * Get the ChannelId
     * @returns {Number} - the KEY_CHANNEL_ID value
     */
    getChannelId () {
        return this.getParameter(EqualizerSettings.KEY_CHANNEL_ID);
    }

    /**
     * Set the ChannelName
     * @param {String} name - read-only channel / frequency name (e.i. "Treble, Midrange, Bass" or "125 Hz") - The desired ChannelName.
     * {'string_min_length': 1, 'string_max_length': 50}
     * @returns {EqualizerSettings} - The class instance for method chaining.
     */
    setChannelName (name) {
        this.setParameter(EqualizerSettings.KEY_CHANNEL_NAME, name);
        return this;
    }

    /**
     * Get the ChannelName
     * @returns {String} - the KEY_CHANNEL_NAME value
     */
    getChannelName () {
        return this.getParameter(EqualizerSettings.KEY_CHANNEL_NAME);
    }

    /**
     * Set the ChannelSetting
     * @param {Number} setting - Reflects the setting, from 0%-100%. - The desired ChannelSetting.
     * {'num_min_value': 0, 'num_max_value': 100}
     * @returns {EqualizerSettings} - The class instance for method chaining.
     */
    setChannelSetting (setting) {
        this.setParameter(EqualizerSettings.KEY_CHANNEL_SETTING, setting);
        return this;
    }

    /**
     * Get the ChannelSetting
     * @returns {Number} - the KEY_CHANNEL_SETTING value
     */
    getChannelSetting () {
        return this.getParameter(EqualizerSettings.KEY_CHANNEL_SETTING);
    }
}

EqualizerSettings.KEY_CHANNEL_ID = 'channelId';
EqualizerSettings.KEY_CHANNEL_NAME = 'channelName';
EqualizerSettings.KEY_CHANNEL_SETTING = 'channelSetting';

export { EqualizerSettings };