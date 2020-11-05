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

import { RadioBand } from '../enums/RadioBand.js';
import { RadioState } from '../enums/RadioState.js';
import { RdsData } from './RdsData.js';
import { RpcStruct } from '../RpcStruct.js';
import { SisData } from './SisData.js';

class RadioControlData extends RpcStruct {
    /**
     * Initalizes an instance of RadioControlData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.5.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the FrequencyInteger
     * @param {Number} integer - The integer part of the frequency ie for 101.7 this value should be 101 - The desired FrequencyInteger.
     * {'num_min_value': 0, 'num_max_value': 1710}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setFrequencyInteger (integer) {
        this.setParameter(RadioControlData.KEY_FREQUENCY_INTEGER, integer);
        return this;
    }

    /**
     * Get the FrequencyInteger
     * @returns {Number} - the KEY_FREQUENCY_INTEGER value
     */
    getFrequencyInteger () {
        return this.getParameter(RadioControlData.KEY_FREQUENCY_INTEGER);
    }

    /**
     * Set the FrequencyFraction
     * @param {Number} fraction - The fractional part of the frequency for 101.7 is 7 - The desired FrequencyFraction.
     * {'num_min_value': 0, 'num_max_value': 9}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setFrequencyFraction (fraction) {
        this.setParameter(RadioControlData.KEY_FREQUENCY_FRACTION, fraction);
        return this;
    }

    /**
     * Get the FrequencyFraction
     * @returns {Number} - the KEY_FREQUENCY_FRACTION value
     */
    getFrequencyFraction () {
        return this.getParameter(RadioControlData.KEY_FREQUENCY_FRACTION);
    }

    /**
     * Set the Band
     * @param {RadioBand} band - The desired Band.
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setBand (band) {
        this._validateType(RadioBand, band);
        this.setParameter(RadioControlData.KEY_BAND, band);
        return this;
    }

    /**
     * Get the Band
     * @returns {RadioBand} - the KEY_BAND value
     */
    getBand () {
        return this.getObject(RadioBand, RadioControlData.KEY_BAND);
    }

    /**
     * Set the RdsData
     * @param {RdsData} data - The desired RdsData.
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setRdsData (data) {
        this._validateType(RdsData, data);
        this.setParameter(RadioControlData.KEY_RDS_DATA, data);
        return this;
    }

    /**
     * Get the RdsData
     * @returns {RdsData} - the KEY_RDS_DATA value
     */
    getRdsData () {
        return this.getObject(RdsData, RadioControlData.KEY_RDS_DATA);
    }

    /**
     * Set the HdRadioEnable
     * @since SmartDeviceLink 5.0.0
     * @param {Boolean} enable - True if the hd radio is on, false if the radio is off - The desired HdRadioEnable.
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setHdRadioEnable (enable) {
        this.setParameter(RadioControlData.KEY_HD_RADIO_ENABLE, enable);
        return this;
    }

    /**
     * Get the HdRadioEnable
     * @returns {Boolean} - the KEY_HD_RADIO_ENABLE value
     */
    getHdRadioEnable () {
        return this.getParameter(RadioControlData.KEY_HD_RADIO_ENABLE);
    }

    /**
     * Set the AvailableHDs
     * @since SmartDeviceLink 4.5.0
     * @deprecated in SmartDeviceLink 6.0.0
     * @param {Number} ds - Number of HD sub-channels if available - The desired AvailableHDs.
     * {'num_min_value': 1, 'num_max_value': 7}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setAvailableHDs (ds) {
        this.setParameter(RadioControlData.KEY_AVAILABLE_HDS, ds);
        return this;
    }

    /**
     * Get the AvailableHDs
     * @returns {Number} - the KEY_AVAILABLE_HDS value
     */
    getAvailableHDs () {
        return this.getParameter(RadioControlData.KEY_AVAILABLE_HDS);
    }

    /**
     * Set the AvailableHdChannels
     * @since SmartDeviceLink 6.0.0
     * @param {Number[]} channels - The list of available HD sub-channel indexes. Empty list means no Hd channel is available. Read-only. - The desired AvailableHdChannels.
     * {'array_min_size': 0, 'array_max_size': 8, 'num_min_value': 0, 'num_max_value': 7}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setAvailableHdChannels (channels) {
        this.setParameter(RadioControlData.KEY_AVAILABLE_HD_CHANNELS, channels);
        return this;
    }

    /**
     * Get the AvailableHdChannels
     * @returns {Number[]} - the KEY_AVAILABLE_HD_CHANNELS value
     */
    getAvailableHdChannels () {
        return this.getParameter(RadioControlData.KEY_AVAILABLE_HD_CHANNELS);
    }

    /**
     * Set the HdChannel
     * @since SmartDeviceLink 4.5.0
     * @param {Number} channel - Current HD sub-channel if available - The desired HdChannel.
     * {'num_min_value': 0, 'num_max_value': 7}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setHdChannel (channel) {
        this.setParameter(RadioControlData.KEY_HD_CHANNEL, channel);
        return this;
    }

    /**
     * Get the HdChannel
     * @returns {Number} - the KEY_HD_CHANNEL value
     */
    getHdChannel () {
        return this.getParameter(RadioControlData.KEY_HD_CHANNEL);
    }

    /**
     * Set the SignalStrength
     * @param {Number} strength - The desired SignalStrength.
     * {'num_min_value': 0, 'num_max_value': 100}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setSignalStrength (strength) {
        this.setParameter(RadioControlData.KEY_SIGNAL_STRENGTH, strength);
        return this;
    }

    /**
     * Get the SignalStrength
     * @returns {Number} - the KEY_SIGNAL_STRENGTH value
     */
    getSignalStrength () {
        return this.getParameter(RadioControlData.KEY_SIGNAL_STRENGTH);
    }

    /**
     * Set the SignalChangeThreshold
     * @param {Number} threshold - If the signal strength falls below the set value for this parameter, the radio will tune to an alternative frequency - The desired SignalChangeThreshold.
     * {'num_min_value': 0, 'num_max_value': 100}
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setSignalChangeThreshold (threshold) {
        this.setParameter(RadioControlData.KEY_SIGNAL_CHANGE_THRESHOLD, threshold);
        return this;
    }

    /**
     * Get the SignalChangeThreshold
     * @returns {Number} - the KEY_SIGNAL_CHANGE_THRESHOLD value
     */
    getSignalChangeThreshold () {
        return this.getParameter(RadioControlData.KEY_SIGNAL_CHANGE_THRESHOLD);
    }

    /**
     * Set the RadioEnable
     * @param {Boolean} enable - True if the radio is on, false if the radio is off. If set to false, no other data will be included. - The desired RadioEnable.
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setRadioEnable (enable) {
        this.setParameter(RadioControlData.KEY_RADIO_ENABLE, enable);
        return this;
    }

    /**
     * Get the RadioEnable
     * @returns {Boolean} - the KEY_RADIO_ENABLE value
     */
    getRadioEnable () {
        return this.getParameter(RadioControlData.KEY_RADIO_ENABLE);
    }

    /**
     * Set the State
     * @param {RadioState} state - The desired State.
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setState (state) {
        this._validateType(RadioState, state);
        this.setParameter(RadioControlData.KEY_STATE, state);
        return this;
    }

    /**
     * Get the State
     * @returns {RadioState} - the KEY_STATE value
     */
    getState () {
        return this.getObject(RadioState, RadioControlData.KEY_STATE);
    }

    /**
     * Set the SisData
     * @since SmartDeviceLink 5.0.0
     * @param {SisData} data - Read-only Station Information Service (SIS) data provides basic information about the station such as call sign, as well as information not displayable to the consumer such as the station identification number - The desired SisData.
     * @returns {RadioControlData} - The class instance for method chaining.
     */
    setSisData (data) {
        this._validateType(SisData, data);
        this.setParameter(RadioControlData.KEY_SIS_DATA, data);
        return this;
    }

    /**
     * Get the SisData
     * @returns {SisData} - the KEY_SIS_DATA value
     */
    getSisData () {
        return this.getObject(SisData, RadioControlData.KEY_SIS_DATA);
    }
}

RadioControlData.KEY_FREQUENCY_INTEGER = 'frequencyInteger';
RadioControlData.KEY_FREQUENCY_FRACTION = 'frequencyFraction';
RadioControlData.KEY_BAND = 'band';
RadioControlData.KEY_RDS_DATA = 'rdsData';
RadioControlData.KEY_HD_RADIO_ENABLE = 'hdRadioEnable';
RadioControlData.KEY_AVAILABLE_HDS = 'availableHDs';
RadioControlData.KEY_AVAILABLE_HD_CHANNELS = 'availableHdChannels';
RadioControlData.KEY_HD_CHANNEL = 'hdChannel';
RadioControlData.KEY_SIGNAL_STRENGTH = 'signalStrength';
RadioControlData.KEY_SIGNAL_CHANGE_THRESHOLD = 'signalChangeThreshold';
RadioControlData.KEY_RADIO_ENABLE = 'radioEnable';
RadioControlData.KEY_STATE = 'state';
RadioControlData.KEY_SIS_DATA = 'sisData';

export { RadioControlData };