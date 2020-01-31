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
import { PrimaryAudioSource } from '../enums/PrimaryAudioSource.js';
import { DeviceLevelStatus } from '../enums/DeviceLevelStatus.js';

class DeviceStatus extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Boolean} on - References signal "CPM_VoiceRec_STAT".
     * @return {DeviceStatus}
     */
    setVoiceRecOn (on) {
        this.setParameter(DeviceStatus.KEY_VOICE_REC_ON, on);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getVoiceRecOn () {
        return this.getParameter(DeviceStatus.KEY_VOICE_REC_ON);
    }

    /**
     * @param {Boolean} on - References signal "BT_ICON".
     * @return {DeviceStatus}
     */
    setBtIconOn (on) {
        this.setParameter(DeviceStatus.KEY_BT_ICON_ON, on);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getBtIconOn () {
        return this.getParameter(DeviceStatus.KEY_BT_ICON_ON);
    }

    /**
     * @param {Boolean} active - References signal "CPM_Call_Active_STAT".
     * @return {DeviceStatus}
     */
    setCallActive (active) {
        this.setParameter(DeviceStatus.KEY_CALL_ACTIVE, active);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCallActive () {
        return this.getParameter(DeviceStatus.KEY_CALL_ACTIVE);
    }

    /**
     * @param {Boolean} roaming - References signal "CPM_Phone_Roaming_STAT".
     * @return {DeviceStatus}
     */
    setPhoneRoaming (roaming) {
        this.setParameter(DeviceStatus.KEY_PHONE_ROAMING, roaming);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPhoneRoaming () {
        return this.getParameter(DeviceStatus.KEY_PHONE_ROAMING);
    }

    /**
     * @param {Boolean} available - References signal "CPM_TextMsg_AVAL".
     * @return {DeviceStatus}
     */
    setTextMsgAvailable (available) {
        this.setParameter(DeviceStatus.KEY_TEXT_MSG_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTextMsgAvailable () {
        return this.getParameter(DeviceStatus.KEY_TEXT_MSG_AVAILABLE);
    }

    /**
     * @param {DeviceLevelStatus} status - Device battery level status. References signal "CPM_Batt_Level_STAT". See
     *                                     DeviceLevelStatus.
     * @return {DeviceStatus}
     */
    setBattLevelStatus (status) {
        this.validateType(DeviceLevelStatus, status);
        this.setParameter(DeviceStatus.KEY_BATT_LEVEL_STATUS, status);
        return this;
    }

    /**
     * @return {DeviceLevelStatus}
     */
    getBattLevelStatus () {
        return this.getObject(DeviceLevelStatus, DeviceStatus.KEY_BATT_LEVEL_STATUS);
    }

    /**
     * @param {Boolean} muted - References signal "CPM_Stereo_Audio_Output".
     * @return {DeviceStatus}
     */
    setStereoAudioOutputMuted (muted) {
        this.setParameter(DeviceStatus.KEY_STEREO_AUDIO_OUTPUT_MUTED, muted);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getStereoAudioOutputMuted () {
        return this.getParameter(DeviceStatus.KEY_STEREO_AUDIO_OUTPUT_MUTED);
    }

    /**
     * @param {Boolean} muted - References signal "CPM_Mono_Audio_Output".
     * @return {DeviceStatus}
     */
    setMonoAudioOutputMuted (muted) {
        this.setParameter(DeviceStatus.KEY_MONO_AUDIO_OUTPUT_MUTED, muted);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMonoAudioOutputMuted () {
        return this.getParameter(DeviceStatus.KEY_MONO_AUDIO_OUTPUT_MUTED);
    }

    /**
     * @param {DeviceLevelStatus} status - Device signal level status. References signal "CPM_Signal_Strength_STAT". See
     *                                     DeviceLevelStatus.
     * @return {DeviceStatus}
     */
    setSignalLevelStatus (status) {
        this.validateType(DeviceLevelStatus, status);
        this.setParameter(DeviceStatus.KEY_SIGNAL_LEVEL_STATUS, status);
        return this;
    }

    /**
     * @return {DeviceLevelStatus}
     */
    getSignalLevelStatus () {
        return this.getObject(DeviceLevelStatus, DeviceStatus.KEY_SIGNAL_LEVEL_STATUS);
    }

    /**
     * @param {PrimaryAudioSource} source - References signal "CPM_Stereo_PAS_Source". See PrimaryAudioSource.
     * @return {DeviceStatus}
     */
    setPrimaryAudioSource (source) {
        this.validateType(PrimaryAudioSource, source);
        this.setParameter(DeviceStatus.KEY_PRIMARY_AUDIO_SOURCE, source);
        return this;
    }

    /**
     * @return {PrimaryAudioSource}
     */
    getPrimaryAudioSource () {
        return this.getObject(PrimaryAudioSource, DeviceStatus.KEY_PRIMARY_AUDIO_SOURCE);
    }

    /**
     * @param {Boolean} active - References signal "eCall_Event".
     * @return {DeviceStatus}
     */
    setECallEventActive (active) {
        this.setParameter(DeviceStatus.KEY_E_CALL_EVENT_ACTIVE, active);
        return this;
    }

    /**
     * @return {Boolean}
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