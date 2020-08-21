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
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Navigation
     * @param {Boolean} navigation - Availability of build in Nav. True: Available, False: Not Available - The desired Navigation.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setNavigation (navigation) {
        this.setParameter(HMICapabilities.KEY_NAVIGATION, navigation);
        return this;
    }

    /**
     * Get the Navigation
     * @returns {Boolean} - the KEY_NAVIGATION value
     */
    getNavigation () {
        return this.getParameter(HMICapabilities.KEY_NAVIGATION);
    }

    /**
     * Set the PhoneCall
     * @param {Boolean} call - Availability of build in phone. True: Available, False: Not Available - The desired PhoneCall.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setPhoneCall (call) {
        this.setParameter(HMICapabilities.KEY_PHONE_CALL, call);
        return this;
    }

    /**
     * Get the PhoneCall
     * @returns {Boolean} - the KEY_PHONE_CALL value
     */
    getPhoneCall () {
        return this.getParameter(HMICapabilities.KEY_PHONE_CALL);
    }

    /**
     * Set the VideoStreaming
     * @param {Boolean} streaming - Availability of video streaming. - The desired VideoStreaming.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setVideoStreaming (streaming) {
        this.setParameter(HMICapabilities.KEY_VIDEO_STREAMING, streaming);
        return this;
    }

    /**
     * Get the VideoStreaming
     * @returns {Boolean} - the KEY_VIDEO_STREAMING value
     */
    getVideoStreaming () {
        return this.getParameter(HMICapabilities.KEY_VIDEO_STREAMING);
    }

    /**
     * Set the RemoteControl
     * @param {Boolean} control - Availability of remote control feature. True: Available, False: Not Available - The desired RemoteControl.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setRemoteControl (control) {
        this.setParameter(HMICapabilities.KEY_REMOTE_CONTROL, control);
        return this;
    }

    /**
     * Get the RemoteControl
     * @returns {Boolean} - the KEY_REMOTE_CONTROL value
     */
    getRemoteControl () {
        return this.getParameter(HMICapabilities.KEY_REMOTE_CONTROL);
    }

    /**
     * Set the AppServices
     * @param {Boolean} services - Availability of App Services functionality. True: Available, False: Not Available - The desired AppServices.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setAppServices (services) {
        this.setParameter(HMICapabilities.KEY_APP_SERVICES, services);
        return this;
    }

    /**
     * Get the AppServices
     * @returns {Boolean} - the KEY_APP_SERVICES value
     */
    getAppServices () {
        return this.getParameter(HMICapabilities.KEY_APP_SERVICES);
    }

    /**
     * Set the Displays
     * @param {Boolean} displays - Availability of displays capability. True: Available, False: Not Available - The desired Displays.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setDisplays (displays) {
        this.setParameter(HMICapabilities.KEY_DISPLAYS, displays);
        return this;
    }

    /**
     * Get the Displays
     * @returns {Boolean} - the KEY_DISPLAYS value
     */
    getDisplays () {
        return this.getParameter(HMICapabilities.KEY_DISPLAYS);
    }

    /**
     * Set the SeatLocation
     * @param {Boolean} location - Availability of seat location feature. True: Available, False: Not Available - The desired SeatLocation.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setSeatLocation (location) {
        this.setParameter(HMICapabilities.KEY_SEAT_LOCATION, location);
        return this;
    }

    /**
     * Get the SeatLocation
     * @returns {Boolean} - the KEY_SEAT_LOCATION value
     */
    getSeatLocation () {
        return this.getParameter(HMICapabilities.KEY_SEAT_LOCATION);
    }

    /**
     * Set the DriverDistraction
     * @param {Boolean} distraction - Availability of driver distraction capability. True: Available, False: Not Available - The desired DriverDistraction.
     * @returns {HMICapabilities} - The class instance for method chaining.
     */
    setDriverDistraction (distraction) {
        this.setParameter(HMICapabilities.KEY_DRIVER_DISTRACTION, distraction);
        return this;
    }

    /**
     * Get the DriverDistraction
     * @returns {Boolean} - the KEY_DRIVER_DISTRACTION value
     */
    getDriverDistraction () {
        return this.getParameter(HMICapabilities.KEY_DRIVER_DISTRACTION);
    }
}

HMICapabilities.KEY_NAVIGATION = 'navigation';
HMICapabilities.KEY_PHONE_CALL = 'phoneCall';
HMICapabilities.KEY_VIDEO_STREAMING = 'videoStreaming';
HMICapabilities.KEY_REMOTE_CONTROL = 'remoteControl';
HMICapabilities.KEY_APP_SERVICES = 'appServices';
HMICapabilities.KEY_DISPLAYS = 'displays';
HMICapabilities.KEY_SEAT_LOCATION = 'seatLocation';
HMICapabilities.KEY_DRIVER_DISTRACTION = 'driverDistraction';

export { HMICapabilities };