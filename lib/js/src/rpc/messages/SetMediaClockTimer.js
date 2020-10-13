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

import { AudioStreamingIndicator } from '../enums/AudioStreamingIndicator.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';
import { StartTime } from '../structs/StartTime.js';
import { UpdateMode } from '../enums/UpdateMode.js';

/**
 * Sets the initial media clock value and automatic update method.
 */
class SetMediaClockTimer extends RpcRequest {
    /**
     * Initalizes an instance of SetMediaClockTimer.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.SetMediaClockTimer);
    }

    /**
     * Set the StartTime
     * @param {StartTime} time - See StartTime. startTime must be provided for "COUNTUP" and "COUNTDOWN". startTime will be ignored for "RESUME", and "CLEAR" startTime can be sent for "PAUSE", in which case it will update the paused startTime - The desired StartTime.
     * @returns {SetMediaClockTimer} - The class instance for method chaining.
     */
    setStartTime (time) {
        this._validateType(StartTime, time);
        this.setParameter(SetMediaClockTimer.KEY_START_TIME, time);
        return this;
    }

    /**
     * Get the StartTime
     * @returns {StartTime} - the KEY_START_TIME value
     */
    getStartTime () {
        return this.getObject(StartTime, SetMediaClockTimer.KEY_START_TIME);
    }

    /**
     * Set the EndTime
     * @param {StartTime} time - See StartTime. endTime can be provided for "COUNTUP" and "COUNTDOWN"; to be used to calculate any visual progress bar (if not provided, this feature is ignored) If endTime is greater then startTime for COUNTDOWN or less than startTime for COUNTUP, then the request will return an INVALID_DATA. endTime will be ignored for "RESUME", and "CLEAR" endTime can be sent for "PAUSE", in which case it will update the paused endTime - The desired EndTime.
     * @returns {SetMediaClockTimer} - The class instance for method chaining.
     */
    setEndTime (time) {
        this._validateType(StartTime, time);
        this.setParameter(SetMediaClockTimer.KEY_END_TIME, time);
        return this;
    }

    /**
     * Get the EndTime
     * @returns {StartTime} - the KEY_END_TIME value
     */
    getEndTime () {
        return this.getObject(StartTime, SetMediaClockTimer.KEY_END_TIME);
    }

    /**
     * Set the UpdateMode
     * @param {UpdateMode} mode - Enumeration to control the media clock. In case of pause, resume, or clear, the start time value is ignored and shall be left out. For resume, the time continues with the same value as it was when paused. - The desired UpdateMode.
     * @returns {SetMediaClockTimer} - The class instance for method chaining.
     */
    setUpdateMode (mode) {
        this._validateType(UpdateMode, mode);
        this.setParameter(SetMediaClockTimer.KEY_UPDATE_MODE, mode);
        return this;
    }

    /**
     * Get the UpdateMode
     * @returns {UpdateMode} - the KEY_UPDATE_MODE value
     */
    getUpdateMode () {
        return this.getObject(UpdateMode, SetMediaClockTimer.KEY_UPDATE_MODE);
    }

    /**
     * Set the AudioStreamingIndicator
     * @param {AudioStreamingIndicator} indicator - Enumeration for the indicator icon on a play/pause button. see AudioStreamingIndicator. - The desired AudioStreamingIndicator.
     * @returns {SetMediaClockTimer} - The class instance for method chaining.
     */
    setAudioStreamingIndicator (indicator) {
        this._validateType(AudioStreamingIndicator, indicator);
        this.setParameter(SetMediaClockTimer.KEY_AUDIO_STREAMING_INDICATOR, indicator);
        return this;
    }

    /**
     * Get the AudioStreamingIndicator
     * @returns {AudioStreamingIndicator} - the KEY_AUDIO_STREAMING_INDICATOR value
     */
    getAudioStreamingIndicator () {
        return this.getObject(AudioStreamingIndicator, SetMediaClockTimer.KEY_AUDIO_STREAMING_INDICATOR);
    }
}

SetMediaClockTimer.KEY_START_TIME = 'startTime';
SetMediaClockTimer.KEY_END_TIME = 'endTime';
SetMediaClockTimer.KEY_UPDATE_MODE = 'updateMode';
SetMediaClockTimer.KEY_AUDIO_STREAMING_INDICATOR = 'audioStreamingIndicator';

export { SetMediaClockTimer };