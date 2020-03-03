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

class HMICapabilities extends RpcStruct {
    /**
     * Initalizes an instance of HMICapabilities.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Boolean} navigation - Availability of build in Nav. True: Available, False: Not Available
     * @return {HMICapabilities}
     */
    setNavigation (navigation) {
        this.setParameter(HMICapabilities.KEY_NAVIGATION, navigation);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getNavigation () {
        return this.getParameter(HMICapabilities.KEY_NAVIGATION);
    }

    /**
     * @param {Boolean} call - Availability of build in phone. True: Available, False: Not Available
     * @return {HMICapabilities}
     */
    setPhoneCall (call) {
        this.setParameter(HMICapabilities.KEY_PHONE_CALL, call);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPhoneCall () {
        return this.getParameter(HMICapabilities.KEY_PHONE_CALL);
    }

    /**
     * @param {Boolean} streaming - Availability of video streaming.
     * @return {HMICapabilities}
     */
    setVideoStreaming (streaming) {
        this.setParameter(HMICapabilities.KEY_VIDEO_STREAMING, streaming);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getVideoStreaming () {
        return this.getParameter(HMICapabilities.KEY_VIDEO_STREAMING);
    }

    /**
     * @param {Boolean} control - Availability of remote control feature. True: Available, False: Not Available
     * @return {HMICapabilities}
     */
    setRemoteControl (control) {
        this.setParameter(HMICapabilities.KEY_REMOTE_CONTROL, control);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRemoteControl () {
        return this.getParameter(HMICapabilities.KEY_REMOTE_CONTROL);
    }

    /**
     * @param {Boolean} services - Availability of App Services functionality. True: Available, False: Not Available
     * @return {HMICapabilities}
     */
    setAppServices (services) {
        this.setParameter(HMICapabilities.KEY_APP_SERVICES, services);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAppServices () {
        return this.getParameter(HMICapabilities.KEY_APP_SERVICES);
    }

    /**
     * @param {Boolean} displays - Availability of displays capability. True: Available, False: Not Available
     * @return {HMICapabilities}
     */
    setDisplays (displays) {
        this.setParameter(HMICapabilities.KEY_DISPLAYS, displays);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getDisplays () {
        return this.getParameter(HMICapabilities.KEY_DISPLAYS);
    }

    /**
     * @param {Boolean} location - Availability of seat location feature. True: Available, False: Not Available
     * @return {HMICapabilities}
     */
    setSeatLocation (location) {
        this.setParameter(HMICapabilities.KEY_SEAT_LOCATION, location);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSeatLocation () {
        return this.getParameter(HMICapabilities.KEY_SEAT_LOCATION);
    }
}

HMICapabilities.KEY_NAVIGATION = 'navigation';
HMICapabilities.KEY_PHONE_CALL = 'phoneCall';
HMICapabilities.KEY_VIDEO_STREAMING = 'videoStreaming';
HMICapabilities.KEY_REMOTE_CONTROL = 'remoteControl';
HMICapabilities.KEY_APP_SERVICES = 'appServices';
HMICapabilities.KEY_DISPLAYS = 'displays';
HMICapabilities.KEY_SEAT_LOCATION = 'seatLocation';

export { HMICapabilities };