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

import { RpcNotification } from '../RpcNotification.js';
import { FunctionID } from '../enums/FunctionID.js';
import { HMILevel } from '../enums/HMILevel.js';
import { AudioStreamingState } from '../enums/AudioStreamingState.js';
import { VideoStreamingState } from '../enums/VideoStreamingState.js';
import { SystemContext } from '../enums/SystemContext.js';

class OnHmiStatus extends RpcNotification {

    /**
    * @constructor
    */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.ON_HMI_STATUS);
    }

    /**
    * @param {HMILevel} hmiLevel
    * @return {OnHmiStatus}
    */
    setHMILevel(hmiLevel) {
        this.validateType(HMILevel, hmiLevel);

        this.setParameter(OnHmiStatus.KEY_HMI_LEVEL, hmiLevel);
        return this;
    }

    /**
    * @return {HMILevel}
    */
    getHMILevel() {
        return this.getObject(HMILevel, OnHmiStatus.KEY_HMI_LEVEL);
    }

    /**
    * @param {AudioStreamingState} audioStreamingState
    * @return {OnHmiStatus}
    */
    setAudioStreamingState(audioStreamingState) {
        this.validateType(AudioStreamingState, audioStreamingState);

        this.setParameter(OnHmiStatus.KEY_AUDIO_STREAMING_STATE, audioStreamingState);
        return this;
    }

    /**
    * @return {AudioStreamingState}
    */
    getAudioStreamingState() {
        return this.getObject(AudioStreamingState, OnHmiStatus.KEY_AUDIO_STREAMING_STATE);
    }

    /**
    * @param {SystemContext} systemContext
    * @return {OnHmiStatus}
    */
    setSystemContext(systemContext) {
        this.validateType(SystemContext, systemContext);

        this.setParameter(OnHmiStatus.KEY_SYSTEM_CONTEXT, systemContext);
        return this;
    }

    /**
    * @return {SystemContext}
    */
    getSystemContext() {
        return this.getObject(SystemContext, OnHmiStatus.KEY_SYSTEM_CONTEXT);
    }

    /**
    * @param {VideoStreamingState} videoStreamingState
    * @return {OnHmiStatus}
    */
    setVideoStreamingState(videoStreamingState) {
        this.validateType(VideoStreamingState, videoStreamingState);

        this.setParameter(OnHmiStatus.KEY_VIDEO_STREAMING_STATE, videoStreamingState);
        return this;
    }

    /**
    * @return {VideoStreamingState}
    */
    getVideoStreamingState() {
        return this.getObject(VideoStreamingState, OnHmiStatus.KEY_VIDEO_STREAMING_STATE);
    }

    /**
    * @param {Number} windowID
    * @return {Show}
    */
    setWindowID(windowID) {
        this.setParameter(Show.KEY_WINDOW_ID, windowID);
        return this;
    }

    /**
    * @return {Number}
    */
    getWindowID() {
        return this.getParameter(Show.KEY_WINDOW_ID);
    }
}

OnHmiStatus.KEY_HMI_LEVEL = 'hmiLevel';
OnHmiStatus.KEY_AUDIO_STREAMING_STATE = 'audioStreamingState';
OnHmiStatus.KEY_SYSTEM_CONTEXT = 'systemContext';
OnHmiStatus.KEY_VIDEO_STREAMING_STATE = 'videoStreamingState';
OnHmiStatus.KEY_WINDOW_ID = 'windowID';

export { OnHmiStatus };
