/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
     * Initializes an instance of RadioControlCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.5.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleName
     * @param {String} name - The short friendly name of the radio control module. It should not be used to identify a module by mobile application. - The desired ModuleName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setModuleName (name) {
        this.setParameter(RadioControlCapabilities.KEY_MODULE_NAME, name);
        return this;
    }

    /**
     * Get the ModuleName
     * @returns {String} - the KEY_MODULE_NAME value
     */
    getModuleName () {
        return this.getParameter(RadioControlCapabilities.KEY_MODULE_NAME);
    }

    /**
     * Set the ModuleInfo
     * @since SmartDeviceLink 6.0.0
     * @param {ModuleInfo} info - Information about an RC module, including its id. - The desired ModuleInfo.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setModuleInfo (info) {
        this._validateType(ModuleInfo, info);
        this.setParameter(RadioControlCapabilities.KEY_MODULE_INFO, info);
        return this;
    }

    /**
     * Get the ModuleInfo
     * @returns {ModuleInfo} - the KEY_MODULE_INFO value
     */
    getModuleInfo () {
        return this.getObject(ModuleInfo, RadioControlCapabilities.KEY_MODULE_INFO);
    }

    /**
     * Set the RadioEnableAvailable
     * @param {Boolean} available - Availability of the control of enable/disable radio. True: Available, False: Not Available, Not present: Not Available. - The desired RadioEnableAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setRadioEnableAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RADIO_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the RadioEnableAvailable
     * @returns {Boolean} - the KEY_RADIO_ENABLE_AVAILABLE value
     */
    getRadioEnableAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RADIO_ENABLE_AVAILABLE);
    }

    /**
     * Set the RadioBandAvailable
     * @param {Boolean} available - Availability of the control of radio band. True: Available, False: Not Available, Not present: Not Available. - The desired RadioBandAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setRadioBandAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RADIO_BAND_AVAILABLE, available);
        return this;
    }

    /**
     * Get the RadioBandAvailable
     * @returns {Boolean} - the KEY_RADIO_BAND_AVAILABLE value
     */
    getRadioBandAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RADIO_BAND_AVAILABLE);
    }

    /**
     * Set the RadioFrequencyAvailable
     * @param {Boolean} available - Availability of the control of radio frequency. True: Available, False: Not Available, Not present: Not Available. - The desired RadioFrequencyAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setRadioFrequencyAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RADIO_FREQUENCY_AVAILABLE, available);
        return this;
    }

    /**
     * Get the RadioFrequencyAvailable
     * @returns {Boolean} - the KEY_RADIO_FREQUENCY_AVAILABLE value
     */
    getRadioFrequencyAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RADIO_FREQUENCY_AVAILABLE);
    }

    /**
     * Set the HdChannelAvailable
     * @param {Boolean} available - Availability of the control of HD radio channel. True: Available, False: Not Available, Not present: Not Available. - The desired HdChannelAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setHdChannelAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_HD_CHANNEL_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HdChannelAvailable
     * @returns {Boolean} - the KEY_HD_CHANNEL_AVAILABLE value
     */
    getHdChannelAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_HD_CHANNEL_AVAILABLE);
    }

    /**
     * Set the RdsDataAvailable
     * @param {Boolean} available - Availability of the getting Radio Data System (RDS) data. True: Available, False: Not Available, Not present: Not Available. - The desired RdsDataAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setRdsDataAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_RDS_DATA_AVAILABLE, available);
        return this;
    }

    /**
     * Get the RdsDataAvailable
     * @returns {Boolean} - the KEY_RDS_DATA_AVAILABLE value
     */
    getRdsDataAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_RDS_DATA_AVAILABLE);
    }

    /**
     * Set the AvailableHDsAvailable
     * @since SmartDeviceLink 4.5.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @param {Boolean} available - Availability of the getting the number of available HD channels. True: Available, False: Not Available, Not present: Not Available. - The desired AvailableHDsAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setAvailableHDsAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_AVAILABLE_HDS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the AvailableHDsAvailable
     * @since SmartDeviceLink 4.5.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @returns {Boolean} - the KEY_AVAILABLE_HDS_AVAILABLE value
     */
    getAvailableHDsAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_AVAILABLE_HDS_AVAILABLE);
    }

    /**
     * Set the AvailableHdChannelsAvailable
     * @since SmartDeviceLink 6.0.0
     * @param {Boolean} available - Availability of the list of available HD sub-channel indexes. True: Available, False: Not Available, Not present: Not Available. - The desired AvailableHdChannelsAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setAvailableHdChannelsAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_AVAILABLE_HD_CHANNELS_AVAILABLE, available);
        return this;
    }

    /**
     * Get the AvailableHdChannelsAvailable
     * @returns {Boolean} - the KEY_AVAILABLE_HD_CHANNELS_AVAILABLE value
     */
    getAvailableHdChannelsAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_AVAILABLE_HD_CHANNELS_AVAILABLE);
    }

    /**
     * Set the StateAvailable
     * @param {Boolean} available - Availability of the getting the Radio state. True: Available, False: Not Available, Not present: Not Available. - The desired StateAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setStateAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_STATE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the StateAvailable
     * @returns {Boolean} - the KEY_STATE_AVAILABLE value
     */
    getStateAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_STATE_AVAILABLE);
    }

    /**
     * Set the SignalStrengthAvailable
     * @param {Boolean} available - Availability of the getting the signal strength. True: Available, False: Not Available, Not present: Not Available. - The desired SignalStrengthAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setSignalStrengthAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIGNAL_STRENGTH_AVAILABLE, available);
        return this;
    }

    /**
     * Get the SignalStrengthAvailable
     * @returns {Boolean} - the KEY_SIGNAL_STRENGTH_AVAILABLE value
     */
    getSignalStrengthAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIGNAL_STRENGTH_AVAILABLE);
    }

    /**
     * Set the SignalChangeThresholdAvailable
     * @param {Boolean} available - Availability of the getting the signal Change Threshold. True: Available, False: Not Available, Not present: Not Available. - The desired SignalChangeThresholdAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setSignalChangeThresholdAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIGNAL_CHANGE_THRESHOLD_AVAILABLE, available);
        return this;
    }

    /**
     * Get the SignalChangeThresholdAvailable
     * @returns {Boolean} - the KEY_SIGNAL_CHANGE_THRESHOLD_AVAILABLE value
     */
    getSignalChangeThresholdAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIGNAL_CHANGE_THRESHOLD_AVAILABLE);
    }

    /**
     * Set the SisDataAvailable
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} available - Availability of the getting HD radio Station Information Service (SIS) data. True: Available, False: Not Available, Not present: Not Available. - The desired SisDataAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setSisDataAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIS_DATA_AVAILABLE, available);
        return this;
    }

    /**
     * Get the SisDataAvailable
     * @returns {Boolean} - the KEY_SIS_DATA_AVAILABLE value
     */
    getSisDataAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_SIS_DATA_AVAILABLE);
    }

    /**
     * Set the HdRadioEnableAvailable
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} available - Availability of the control of enable/disable HD radio. True: Available, False: Not Available, Not present: Not Available. - The desired HdRadioEnableAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setHdRadioEnableAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_HD_RADIO_ENABLE_AVAILABLE, available);
        return this;
    }

    /**
     * Get the HdRadioEnableAvailable
     * @returns {Boolean} - the KEY_HD_RADIO_ENABLE_AVAILABLE value
     */
    getHdRadioEnableAvailable () {
        return this.getParameter(RadioControlCapabilities.KEY_HD_RADIO_ENABLE_AVAILABLE);
    }

    /**
     * Set the SiriusxmRadioAvailable
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} available - Availability of Sirius XM radio. True: Available, False: Not Available, Not present: Not Available. - The desired SiriusxmRadioAvailable.
     * @returns {RadioControlCapabilities} - The class instance for method chaining.
     */
    setSiriusxmRadioAvailable (available) {
        this.setParameter(RadioControlCapabilities.KEY_SIRIUSXM_RADIO_AVAILABLE, available);
        return this;
    }

    /**
     * Get the SiriusxmRadioAvailable
     * @returns {Boolean} - the KEY_SIRIUSXM_RADIO_AVAILABLE value
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