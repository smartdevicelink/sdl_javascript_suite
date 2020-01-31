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

import { VideoStreamingCapability } from './VideoStreamingCapability.js';
import { PhoneCapability } from './PhoneCapability.js';
import { DisplayCapability } from './DisplayCapability.js';
import { RemoteControlCapabilities } from './RemoteControlCapabilities.js';
import { SeatLocationCapability } from './SeatLocationCapability.js';
import { SystemCapabilityType } from '../enums/SystemCapabilityType.js';
import { AppServicesCapabilities } from './AppServicesCapabilities.js';
import { NavigationCapability } from './NavigationCapability.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * The systemCapabilityType identifies which data object exists in this struct. For example, if the SystemCapability
 * Type is NAVIGATION then a "navigationCapability" should exist
 */
class SystemCapability extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {SystemCapabilityType} type - Used as a descriptor of what data to expect in this struct. The
     *                                      corresponding param to this enum should be included and the only other param
     *                                      included.
     * @return {SystemCapability}
     */
    setSystemCapabilityType (type) {
        this.validateType(SystemCapabilityType, type);
        this.setParameter(SystemCapability.KEY_SYSTEM_CAPABILITY_TYPE, type);
        return this;
    }

    /**
     * @return {SystemCapabilityType}
     */
    getSystemCapabilityType () {
        return this.getObject(SystemCapabilityType, SystemCapability.KEY_SYSTEM_CAPABILITY_TYPE);
    }

    /**
     * @param {NavigationCapability} capability - Describes extended capabilities for onboard navigation system
     * @return {SystemCapability}
     */
    setNavigationCapability (capability) {
        this.validateType(NavigationCapability, capability);
        this.setParameter(SystemCapability.KEY_NAVIGATION_CAPABILITY, capability);
        return this;
    }

    /**
     * @return {NavigationCapability}
     */
    getNavigationCapability () {
        return this.getObject(NavigationCapability, SystemCapability.KEY_NAVIGATION_CAPABILITY);
    }

    /**
     * @param {PhoneCapability} capability - Describes extended capabilities of the module's phone feature
     * @return {SystemCapability}
     */
    setPhoneCapability (capability) {
        this.validateType(PhoneCapability, capability);
        this.setParameter(SystemCapability.KEY_PHONE_CAPABILITY, capability);
        return this;
    }

    /**
     * @return {PhoneCapability}
     */
    getPhoneCapability () {
        return this.getObject(PhoneCapability, SystemCapability.KEY_PHONE_CAPABILITY);
    }

    /**
     * @param {VideoStreamingCapability} capability - Describes extended capabilities of the module's phone feature
     * @return {SystemCapability}
     */
    setVideoStreamingCapability (capability) {
        this.validateType(VideoStreamingCapability, capability);
        this.setParameter(SystemCapability.KEY_VIDEO_STREAMING_CAPABILITY, capability);
        return this;
    }

    /**
     * @return {VideoStreamingCapability}
     */
    getVideoStreamingCapability () {
        return this.getObject(VideoStreamingCapability, SystemCapability.KEY_VIDEO_STREAMING_CAPABILITY);
    }

    /**
     * @param {RemoteControlCapabilities} capability - Describes extended capabilities of the module's phone feature
     * @return {SystemCapability}
     */
    setRemoteControlCapability (capability) {
        this.validateType(RemoteControlCapabilities, capability);
        this.setParameter(SystemCapability.KEY_REMOTE_CONTROL_CAPABILITY, capability);
        return this;
    }

    /**
     * @return {RemoteControlCapabilities}
     */
    getRemoteControlCapability () {
        return this.getObject(RemoteControlCapabilities, SystemCapability.KEY_REMOTE_CONTROL_CAPABILITY);
    }

    /**
     * @param {AppServicesCapabilities} capabilities - An array of currently available services. If this is an update to
     *                                                 the capability the affected services will include an update
     *                                                 reason in that item
     * @return {SystemCapability}
     */
    setAppServicesCapabilities (capabilities) {
        this.validateType(AppServicesCapabilities, capabilities);
        this.setParameter(SystemCapability.KEY_APP_SERVICES_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {AppServicesCapabilities}
     */
    getAppServicesCapabilities () {
        return this.getObject(AppServicesCapabilities, SystemCapability.KEY_APP_SERVICES_CAPABILITIES);
    }

    /**
     * @param {SeatLocationCapability} capability - Contains information about the locations of each seat
     * @return {SystemCapability}
     */
    setSeatLocationCapability (capability) {
        this.validateType(SeatLocationCapability, capability);
        this.setParameter(SystemCapability.KEY_SEAT_LOCATION_CAPABILITY, capability);
        return this;
    }

    /**
     * @return {SeatLocationCapability}
     */
    getSeatLocationCapability () {
        return this.getObject(SeatLocationCapability, SystemCapability.KEY_SEAT_LOCATION_CAPABILITY);
    }

    /**
     * @param {DisplayCapability[]} capabilities
     * @return {SystemCapability}
     */
    setDisplayCapabilities (capabilities) {
        this.validateType(DisplayCapability, capabilities, true);
        this.setParameter(SystemCapability.KEY_DISPLAY_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * @return {DisplayCapability[]}
     */
    getDisplayCapabilities () {
        return this.getObject(DisplayCapability, SystemCapability.KEY_DISPLAY_CAPABILITIES);
    }
}

SystemCapability.KEY_SYSTEM_CAPABILITY_TYPE = 'systemCapabilityType';
SystemCapability.KEY_NAVIGATION_CAPABILITY = 'navigationCapability';
SystemCapability.KEY_PHONE_CAPABILITY = 'phoneCapability';
SystemCapability.KEY_VIDEO_STREAMING_CAPABILITY = 'videoStreamingCapability';
SystemCapability.KEY_REMOTE_CONTROL_CAPABILITY = 'remoteControlCapability';
SystemCapability.KEY_APP_SERVICES_CAPABILITIES = 'appServicesCapabilities';
SystemCapability.KEY_SEAT_LOCATION_CAPABILITY = 'seatLocationCapability';
SystemCapability.KEY_DISPLAY_CAPABILITIES = 'displayCapabilities';

export { SystemCapability };