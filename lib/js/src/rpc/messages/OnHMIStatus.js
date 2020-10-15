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

import { AudioStreamingState } from '../enums/AudioStreamingState.js';
import { FunctionID } from '../enums/FunctionID.js';
import { HMILevel } from '../enums/HMILevel.js';
import { RpcNotification } from '../RpcNotification.js';
import { SystemContext } from '../enums/SystemContext.js';
import { VideoStreamingState } from '../enums/VideoStreamingState.js';

class OnHMIStatus extends RpcNotification {
    /**
     * Initalizes an instance of OnHMIStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.OnHMIStatus);
    }

    /**
     * Set the HmiLevel
     * @param {HMILevel} level - See HMILevel - The desired HmiLevel.
     * @returns {OnHMIStatus} - The class instance for method chaining.
     */
    setHmiLevel (level) {
        this._validateType(HMILevel, level);
        this.setParameter(OnHMIStatus.KEY_HMI_LEVEL, level);
        return this;
    }

    /**
     * Get the HmiLevel
     * @returns {HMILevel} - the KEY_HMI_LEVEL value
     */
    getHmiLevel () {
        return this.getObject(HMILevel, OnHMIStatus.KEY_HMI_LEVEL);
    }

    /**
     * Set the AudioStreamingState
     * @param {AudioStreamingState} state - See AudioStreamingState - The desired AudioStreamingState.
     * @returns {OnHMIStatus} - The class instance for method chaining.
     */
    setAudioStreamingState (state) {
        this._validateType(AudioStreamingState, state);
        this.setParameter(OnHMIStatus.KEY_AUDIO_STREAMING_STATE, state);
        return this;
    }

    /**
     * Get the AudioStreamingState
     * @returns {AudioStreamingState} - the KEY_AUDIO_STREAMING_STATE value
     */
    getAudioStreamingState () {
        return this.getObject(AudioStreamingState, OnHMIStatus.KEY_AUDIO_STREAMING_STATE);
    }

    /**
     * Set the SystemContext
     * @param {SystemContext} context - See SystemContext - The desired SystemContext.
     * @returns {OnHMIStatus} - The class instance for method chaining.
     */
    setSystemContext (context) {
        this._validateType(SystemContext, context);
        this.setParameter(OnHMIStatus.KEY_SYSTEM_CONTEXT, context);
        return this;
    }

    /**
     * Get the SystemContext
     * @returns {SystemContext} - the KEY_SYSTEM_CONTEXT value
     */
    getSystemContext () {
        return this.getObject(SystemContext, OnHMIStatus.KEY_SYSTEM_CONTEXT);
    }

    /**
     * Set the VideoStreamingState
     * @since SmartDeviceLink 5.0.0
     * @param {VideoStreamingState} state - See VideoStreamingState. If it is NOT_STREAMABLE, the app must stop streaming video to SDL Core(stop service). - The desired VideoStreamingState.
     * @returns {OnHMIStatus} - The class instance for method chaining.
     */
    setVideoStreamingState (state) {
        this._validateType(VideoStreamingState, state);
        this.setParameter(OnHMIStatus.KEY_VIDEO_STREAMING_STATE, state);
        return this;
    }

    /**
     * Get the VideoStreamingState
     * @returns {VideoStreamingState} - the KEY_VIDEO_STREAMING_STATE value
     */
    getVideoStreamingState () {
        return this.getObject(VideoStreamingState, OnHMIStatus.KEY_VIDEO_STREAMING_STATE);
    }

    /**
     * Set the WindowID
     * @since SmartDeviceLink 6.0.0
     * @param {Number} id - This is the unique ID assigned to the window that this RPC is intended. If this param is not included, it will be assumed that this request is specifically for the main window on the main display. See PredefinedWindows enum. - The desired WindowID.
     * @returns {OnHMIStatus} - The class instance for method chaining.
     */
    setWindowID (id) {
        this.setParameter(OnHMIStatus.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * Get the WindowID
     * @returns {Number} - the KEY_WINDOW_ID value
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