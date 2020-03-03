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

import { ModuleInfo } from './ModuleInfo.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Contains information about a radio control module's capabilities.
 */
class RadioControlCapabilities extends RpcStruct {
    /**
     * Initalizes an instance of RadioControlCapabilities.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - The short friendly name of the climate control module. It should not be used to identify a
     *                        module by mobile application.
     * @return {RadioControlCapabilities}
     */
    setModuleName (name) {
        this.setParameter(RadioControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getModuleName () {
        return this.getParameter(RadioControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * @param {ModuleInfo} info - Information about a RC module, including its id.
     * @return {RadioControlCapabilities}
     */
    setModuleInfo (info) {
        this.validateType(ModuleInfo, info);
        this.setParameter(RadioControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * @return {ModuleInfo}
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, RadioControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable radio. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setRadioEnableAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RADIO_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRadioEnableAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RADIO_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of radio band. True: Available, False: Not Available,
     *                              Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setRadioBandAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RADIO_BAND_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRadioBandAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RADIO_BAND_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of radio frequency. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setRadioFrequencyAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RADIO_FREQUENCY_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRadioFrequencyAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RADIO_FREQUENCY_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of HD radio channel. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setHdChannelAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_HD_CHANNEL_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHdChannelAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_HD_CHANNEL_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the getting Radio Data System (RDS) data. True: Available, False:
     *                              Not Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setRdsDataAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RDS_DATA_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRdsDataAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RDS_DATA_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the getting the number of available HD channels. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setAvailableHDsAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_AVAILABLE_HDS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAvailableHDsAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_AVAILABLE_HDS_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the list of available HD sub-channel indexes. True: Available,
     *                              False: Not Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setAvailableHdChannelsAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_AVAILABLE_HD_CHANNELS_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getAvailableHdChannelsAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_AVAILABLE_HD_CHANNELS_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the getting the Radio state. True: Available, False: Not Available,
     *                              Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setStateAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_STATE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getStateAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_STATE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the getting the signal strength. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setSignalStrengthAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIGNAL_STRENGTH_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSignalStrengthAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIGNAL_STRENGTH_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the getting the signal Change Threshold. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setSignalChangeThresholdAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIGNAL_CHANGE_THRESHOLD_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSignalChangeThresholdAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIGNAL_CHANGE_THRESHOLD_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the getting HD radio Station Information Service (SIS) data. True:
     *                              Available, False: Not Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setSisDataAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIS_DATA_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSisDataAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIS_DATA_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of the control of enable/disable HD radio. True: Available, False: Not
     *                              Available, Not present: Not Available.
     * @return {RadioControlCapabilities}
     */
    setHdRadioEnableAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_HD_RADIO_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHdRadioEnableAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_HD_RADIO_ENABLE_AVAILABLE);
    }

    /**
     * @param {Boolean} available - Availability of sirius XM radio. True: Available, False: Not Available, Not present:
     *                              Not Available.
     * @return {RadioControlCapabilities}
     */
    setSiriusxmRadioAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIRIUSXM_RADIO_AVAILABLE, available);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getSiriusxmRadioAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIRIUSXM_RADIO_AVAILABLE);
    }
}

RadioControlCapabilities.KEY_MODULE_NAME = 'moduleName';
RadioControlCapabilities.KEY_MODULE_INFO = 'moduleInfo';
RadioControlCapabilities.KEY_RADIO_ENABLE_AVAILABLE = 'radioEnableAvailable';
RadioControlCapabilities.KEY_RADIO_BAND_AVAILABLE = 'radioBandAvailable';
RadioControlCapabilities.KEY_RADIO_FREQUENCY_AVAILABLE = 'radioFrequencyAvailable';
RadioControlCapabilities.KEY_HD_CHANNEL_AVAILABLE = 'hdChannelAvailable';
RadioControlCapabilities.KEY_RDS_DATA_AVAILABLE = 'rdsDataAvailable';
RadioControlCapabilities.KEY_AVAILABLE_HDS_AVAILABLE = 'availableHDsAvailable';
RadioControlCapabilities.KEY_AVAILABLE_HD_CHANNELS_AVAILABLE = 'availableHdChannelsAvailable';
RadioControlCapabilities.KEY_STATE_AVAILABLE = 'stateAvailable';
RadioControlCapabilities.KEY_SIGNAL_STRENGTH_AVAILABLE = 'signalStrengthAvailable';
RadioControlCapabilities.KEY_SIGNAL_CHANGE_THRESHOLD_AVAILABLE = 'signalChangeThresholdAvailable';
RadioControlCapabilities.KEY_SIS_DATA_AVAILABLE = 'sisDataAvailable';
RadioControlCapabilities.KEY_HD_RADIO_ENABLE_AVAILABLE = 'hdRadioEnableAvailable';
RadioControlCapabilities.KEY_SIRIUSXM_RADIO_AVAILABLE = 'siriusxmRadioAvailable';

export { RadioControlCapabilities };