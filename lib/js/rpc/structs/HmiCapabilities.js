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

import { RpcStruct } from '../RpcStruct.js';


class HMICapabilities extends RpcStruct {

    static KEY_NAVIGATION = 'navigation';
    static KEY_PHONE_CALL = 'phoneCall';
    static KEY_VIDEO_STREAMING = 'videoStreaming';
    static KEY_REMOTE_CONTROL = 'remoteControl';
    static KEY_APP_SERVICES = 'appServices';
    static KEY_DISPLAYS = 'displays';
    static KEY_SEAT_LOCATION = 'seatLocation';

    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {Boolean} navigation
    * @return {HMICapabilities}
    */
    setNavigation(navigation) {

        this.setParameter(KEY_NAVIGATION, navigation);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getNavigation() {
        return this.getParameter(KEY_NAVIGATION);
    }

    /**
    * @param {Boolean} phoneCall
    * @return {HMICapabilities}
    */
    setPhoneCall(phoneCall) {

        this.setParameter(KEY_PHONE_CALL, phoneCall);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getPhoneCall() {
        return this.getParameter(KEY_PHONE_CALL);
    }

    /**
    * @param {Boolean} videoStreaming
    * @return {HMICapabilities}
    */
    setVideoStreaming(videoStreaming) {

        this.setParameter(KEY_VIDEO_STREAMING, videoStreaming);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getVideoStreaming() {
        return this.getParameter(KEY_VIDEO_STREAMING);
    }

    /**
    * @param {Boolean} remoteControl
    * @return {HMICapabilities}
    */
    setRemoteControl(remoteControl) {

        this.setParameter(KEY_REMOTE_CONTROL, remoteControl);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getRemoteControl() {
        return this.getParameter(KEY_REMOTE_CONTROL);
    }

    /**
    * @param {Boolean} appServices
    * @return {HMICapabilities}
    */
    setAppService(appServices) {

        this.setParameter(KEY_APP_SERVICES, appServices);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getAppService() {
        return this.getParameter(KEY_APP_SERVICES);
    }


    /**
    * @param {Boolean} displays
    * @return {HMICapabilities}
    */
    setDisplays(displays) {

        this.setParameter(KEY_DISPLAYS, displays);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getDisplays() {
        return this.getParameter(KEY_DISPLAYS);
    }


    /**
    * @param {Boolean} seatLocation
    * @return {HMICapabilities}
    */
    setSeatLocation(seatLocation) {

        this.setParameter(KEY_SEAT_LOCATION, seatLocation);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getSeatLocation() {
        return this.getParameter(KEY_SEAT_LOCATION);
    }
}

export { HMICapabilities };
