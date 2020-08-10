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

import { AppCapabilityType } from '../enums/AppCapabilityType.js';
import { RpcStruct } from '../RpcStruct.js';
import { VideoStreamingCapability } from './VideoStreamingCapability.js';

class AppCapability extends RpcStruct {
    /**
     * Initalizes an instance of AppCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the AppCapabilityType
     * @param {AppCapabilityType} type - Used as a descriptor of what data to expect in this struct. The corresponding - The desired AppCapabilityType.
     * param to this enum should be included and the only other param included.
     * @returns {AppCapability} - The class instance for method chaining.
     */
    setAppCapabilityType (type) {
        this._validateType(AppCapabilityType, type);
        this.setParameter(AppCapability.KEY_APP_CAPABILITY_TYPE, type);
        return this;
    }

    /**
     * Get the AppCapabilityType
     * @returns {AppCapabilityType} - the KEY_APP_CAPABILITY_TYPE value
     */
    getAppCapabilityType () {
        return this.getObject(AppCapabilityType, AppCapability.KEY_APP_CAPABILITY_TYPE);
    }

    /**
     * Set the VideoStreamingCapability
     * @param {VideoStreamingCapability} capability - Describes supported capabilities for video streaming - The desired VideoStreamingCapability.
     * @returns {AppCapability} - The class instance for method chaining.
     */
    setVideoStreamingCapability (capability) {
        this._validateType(VideoStreamingCapability, capability);
        this.setParameter(AppCapability.KEY_VIDEO_STREAMING_CAPABILITY, capability);
        return this;
    }

    /**
     * Get the VideoStreamingCapability
     * @returns {VideoStreamingCapability} - the KEY_VIDEO_STREAMING_CAPABILITY value
     */
    getVideoStreamingCapability () {
        return this.getObject(VideoStreamingCapability, AppCapability.KEY_VIDEO_STREAMING_CAPABILITY);
    }
}

AppCapability.KEY_APP_CAPABILITY_TYPE = 'appCapabilityType';
AppCapability.KEY_VIDEO_STREAMING_CAPABILITY = 'videoStreamingCapability';

export { AppCapability };