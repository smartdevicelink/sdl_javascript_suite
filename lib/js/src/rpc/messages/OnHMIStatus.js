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

import { SystemContext } from '../enums/SystemContext.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcNotification } from '../RpcNotification.js';
import { AudioStreamingState } from '../enums/AudioStreamingState.js';
import { HMILevel } from '../enums/HMILevel.js';
import { VideoStreamingState } from '../enums/VideoStreamingState.js';

class OnHMIStatus extends RpcNotification {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.OnHMIStatus);
    }

    /**
     * @param {HMILevel} level - See HMILevel
     * @return {OnHMIStatus}
     */
    setHmiLevel (level) {
        this.validateType(HMILevel, level);
        this.setParameter(OnHMIStatus.KEY_HMI_LEVEL, level);
        return this;
    }

    /**
     * @return {HMILevel}
     */
    getHmiLevel () {
        return this.getObject(HMILevel, OnHMIStatus.KEY_HMI_LEVEL);
    }

    /**
     * @param {AudioStreamingState} state - See AudioStreamingState
     * @return {OnHMIStatus}
     */
    setAudioStreamingState (state) {
        this.validateType(AudioStreamingState, state);
        this.setParameter(OnHMIStatus.KEY_AUDIO_STREAMING_STATE, state);
        return this;
    }

    /**
     * @return {AudioStreamingState}
     */
    getAudioStreamingState () {
        return this.getObject(AudioStreamingState, OnHMIStatus.KEY_AUDIO_STREAMING_STATE);
    }

    /**
     * @param {SystemContext} context - See SystemContext
     * @return {OnHMIStatus}
     */
    setSystemContext (context) {
        this.validateType(SystemContext, context);
        this.setParameter(OnHMIStatus.KEY_SYSTEM_CONTEXT, context);
        return this;
    }

    /**
     * @return {SystemContext}
     */
    getSystemContext () {
        return this.getObject(SystemContext, OnHMIStatus.KEY_SYSTEM_CONTEXT);
    }

    /**
     * @param {VideoStreamingState} state - See VideoStreamingState. If it is NOT_STREAMABLE, the app must stop
     *                                      streaming video to SDL Core(stop service).
     * @return {OnHMIStatus}
     */
    setVideoStreamingState (state) {
        this.validateType(VideoStreamingState, state);
        this.setParameter(OnHMIStatus.KEY_VIDEO_STREAMING_STATE, state);
        return this;
    }

    /**
     * @return {VideoStreamingState}
     */
    getVideoStreamingState () {
        return this.getObject(VideoStreamingState, OnHMIStatus.KEY_VIDEO_STREAMING_STATE);
    }

    /**
     * @param {Number} id - This is the unique ID assigned to the window that this RPC is intended. If this param is not
     *                      included, it will be assumed that this request is specifically for the main window on the
     *                      main display. See PredefinedWindows enum.
     * @return {OnHMIStatus}
     */
    setWindowID (id) {
        this.setParameter(OnHMIStatus.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getWindowID () {
        return this.getParameter(OnHMIStatus.KEY_WINDOW_ID);
    }
}

OnHMIStatus.KEY_HMI_LEVEL = 'hmiLevel';
OnHMIStatus.KEY_AUDIO_STREAMING_STATE = 'audioStreamingState';
OnHMIStatus.KEY_SYSTEM_CONTEXT = 'systemContext';
OnHMIStatus.KEY_VIDEO_STREAMING_STATE = 'videoStreamingState';
OnHMIStatus.KEY_WINDOW_ID = 'windowID';

export { OnHMIStatus };