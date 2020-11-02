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

import { DeviceLevelStatus } from '../enums/DeviceLevelStatus.js';
import { PrimaryAudioSource } from '../enums/PrimaryAudioSource.js';
import { RpcStruct } from '../RpcStruct.js';

class DeviceStatus extends RpcStruct {
    /**
     * Initalizes an instance of DeviceStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the VoiceRecOn
     * @param {Boolean} on - References signal "CPM_VoiceRec_STAT". - The desired VoiceRecOn.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setVoiceRecOn (on) {
        this.setParameter(DeviceStatus.KEY_VOICE_REC_ON, on);
        return this;
    }

    /**
     * Get the VoiceRecOn
     * @returns {Boolean} - the KEY_VOICE_REC_ON value
     */
    getVoiceRecOn () {
        return this.getParameter(DeviceStatus.KEY_VOICE_REC_ON);
    }

    /**
     * Set the BtIconOn
     * @param {Boolean} on - References signal "BT_ICON". - The desired BtIconOn.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setBtIconOn (on) {
        this.setParameter(DeviceStatus.KEY_BT_ICON_ON, on);
        return this;
    }

    /**
     * Get the BtIconOn
     * @returns {Boolean} - the KEY_BT_ICON_ON value
     */
    getBtIconOn () {
        return this.getParameter(DeviceStatus.KEY_BT_ICON_ON);
    }

    /**
     * Set the CallActive
     * @param {Boolean} active - References signal "CPM_Call_Active_STAT". - The desired CallActive.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setCallActive (active) {
        this.setParameter(DeviceStatus.KEY_CALL_ACTIVE, active);
        return this;
    }

    /**
     * Get the CallActive
     * @returns {Boolean} - the KEY_CALL_ACTIVE value
     */
    getCallActive () {
        return this.getParameter(DeviceStatus.KEY_CALL_ACTIVE);
    }

    /**
     * Set the PhoneRoaming
     * @param {Boolean} roaming - References signal "CPM_Phone_Roaming_STAT". - The desired PhoneRoaming.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setPhoneRoaming (roaming) {
        this.setParameter(DeviceStatus.KEY_PHONE_ROAMING, roaming);
        return this;
    }

    /**
     * Get the PhoneRoaming
     * @returns {Boolean} - the KEY_PHONE_ROAMING value
     */
    getPhoneRoaming () {
        return this.getParameter(DeviceStatus.KEY_PHONE_ROAMING);
    }

    /**
     * Set the TextMsgAvailable
     * @param {Boolean} available - References signal "CPM_TextMsg_AVAL". - The desired TextMsgAvailable.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setTextMsgAvailable (available) {
        this.setParameter(DeviceStatus.KEY_TEXT_MSG_AVAILABLE, available);
        return this;
    }

    /**
     * Get the TextMsgAvailable
     * @returns {Boolean} - the KEY_TEXT_MSG_AVAILABLE value
     */
    getTextMsgAvailable () {
        return this.getParameter(DeviceStatus.KEY_TEXT_MSG_AVAILABLE);
    }

    /**
     * Set the BattLevelStatus
     * @param {DeviceLevelStatus} status - Device battery level status. References signal "CPM_Batt_Level_STAT". See DeviceLevelStatus. - The desired BattLevelStatus.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setBattLevelStatus (status) {
        this._validateType(DeviceLevelStatus, status);
        this.setParameter(DeviceStatus.KEY_BATT_LEVEL_STATUS, status);
        return this;
    }

    /**
     * Get the BattLevelStatus
     * @returns {DeviceLevelStatus} - the KEY_BATT_LEVEL_STATUS value
     */
    getBattLevelStatus () {
        return this.getObject(DeviceLevelStatus, DeviceStatus.KEY_BATT_LEVEL_STATUS);
    }

    /**
     * Set the StereoAudioOutputMuted
     * @param {Boolean} muted - References signal "CPM_Stereo_Audio_Output". - The desired StereoAudioOutputMuted.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setStereoAudioOutputMuted (muted) {
        this.setParameter(DeviceStatus.KEY_STEREO_AUDIO_OUTPUT_MUTED, muted);
        return this;
    }

    /**
     * Get the StereoAudioOutputMuted
     * @returns {Boolean} - the KEY_STEREO_AUDIO_OUTPUT_MUTED value
     */
    getStereoAudioOutputMuted () {
        return this.getParameter(DeviceStatus.KEY_STEREO_AUDIO_OUTPUT_MUTED);
    }

    /**
     * Set the MonoAudioOutputMuted
     * @param {Boolean} muted - References signal "CPM_Mono_Audio_Output". - The desired MonoAudioOutputMuted.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setMonoAudioOutputMuted (muted) {
        this.setParameter(DeviceStatus.KEY_MONO_AUDIO_OUTPUT_MUTED, muted);
        return this;
    }

    /**
     * Get the MonoAudioOutputMuted
     * @returns {Boolean} - the KEY_MONO_AUDIO_OUTPUT_MUTED value
     */
    getMonoAudioOutputMuted () {
        return this.getParameter(DeviceStatus.KEY_MONO_AUDIO_OUTPUT_MUTED);
    }

    /**
     * Set the SignalLevelStatus
     * @param {DeviceLevelStatus} status - Device signal level status. References signal "CPM_Signal_Strength_STAT". See DeviceLevelStatus. - The desired SignalLevelStatus.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setSignalLevelStatus (status) {
        this._validateType(DeviceLevelStatus, status);
        this.setParameter(DeviceStatus.KEY_SIGNAL_LEVEL_STATUS, status);
        return this;
    }

    /**
     * Get the SignalLevelStatus
     * @returns {DeviceLevelStatus} - the KEY_SIGNAL_LEVEL_STATUS value
     */
    getSignalLevelStatus () {
        return this.getObject(DeviceLevelStatus, DeviceStatus.KEY_SIGNAL_LEVEL_STATUS);
    }

    /**
     * Set the PrimaryAudioSource
     * @param {PrimaryAudioSource} source - References signal "CPM_Stereo_PAS_Source". See PrimaryAudioSource. - The desired PrimaryAudioSource.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setPrimaryAudioSource (source) {
        this._validateType(PrimaryAudioSource, source);
        this.setParameter(DeviceStatus.KEY_PRIMARY_AUDIO_SOURCE, source);
        return this;
    }

    /**
     * Get the PrimaryAudioSource
     * @returns {PrimaryAudioSource} - the KEY_PRIMARY_AUDIO_SOURCE value
     */
    getPrimaryAudioSource () {
        return this.getObject(PrimaryAudioSource, DeviceStatus.KEY_PRIMARY_AUDIO_SOURCE);
    }

    /**
     * Set the ECallEventActive
     * @param {Boolean} active - References signal "eCall_Event". - The desired ECallEventActive.
     * @returns {DeviceStatus} - The class instance for method chaining.
     */
    setECallEventActive (active) {
        this.setParameter(DeviceStatus.KEY_E_CALL_EVENT_ACTIVE, active);
        return this;
    }

    /**
     * Get the ECallEventActive
     * @returns {Boolean} - the KEY_E_CALL_EVENT_ACTIVE value
     */
    getECallEventActive () {
        return this.getParameter(DeviceStatus.KEY_E_CALL_EVENT_ACTIVE);
    }
}

DeviceStatus.KEY_VOICE_REC_ON = 'voiceRecOn';
DeviceStatus.KEY_BT_ICON_ON = 'btIconOn';
DeviceStatus.KEY_CALL_ACTIVE = 'callActive';
DeviceStatus.KEY_PHONE_ROAMING = 'phoneRoaming';
DeviceStatus.KEY_TEXT_MSG_AVAILABLE = 'textMsgAvailable';
DeviceStatus.KEY_BATT_LEVEL_STATUS = 'battLevelStatus';
DeviceStatus.KEY_STEREO_AUDIO_OUTPUT_MUTED = 'stereoAudioOutputMuted';
DeviceStatus.KEY_MONO_AUDIO_OUTPUT_MUTED = 'monoAudioOutputMuted';
DeviceStatus.KEY_SIGNAL_LEVEL_STATUS = 'signalLevelStatus';
DeviceStatus.KEY_PRIMARY_AUDIO_SOURCE = 'primaryAudioSource';
DeviceStatus.KEY_E_CALL_EVENT_ACTIVE = 'eCallEventActive';

export { DeviceStatus };