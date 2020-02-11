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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} integer - The integer part of the frequency ie for 101.7 this value should be 101
     * @return {RadioControlData}
     */
    setFrequencyInteger (integer) {
        this.setParameter(RadioControlData.KEY_FREQUENCY_INTEGER, integer);
        return this;
    }

    /**
     * @return {Number}
     */
    getFrequencyInteger () {
        return this.getParameter(RadioControlData.KEY_FREQUENCY_INTEGER);
    }

    /**
     * @param {Number} fraction - The fractional part of the frequency for 101.7 is 7
     * @return {RadioControlData}
     */
    setFrequencyFraction (fraction) {
        this.setParameter(RadioControlData.KEY_FREQUENCY_FRACTION, fraction);
        return this;
    }

    /**
     * @return {Number}
     */
    getFrequencyFraction () {
        return this.getParameter(RadioControlData.KEY_FREQUENCY_FRACTION);
    }

    /**
     * @param {RadioBand} band
     * @return {RadioControlData}
     */
    setBand (band) {
        this.validateType(RadioBand, band);
        this.setParameter(RadioControlData.KEY_BAND, band);
        return this;
    }

    /**
     * @return {RadioBand}
     */
    getBand () {
        return this.getObject(RadioBand, RadioControlData.KEY_BAND);
    }

    /**
     * @param {RdsData} data
     * @return {RadioControlData}
     */
    setRdsData (data) {
        this.validateType(RdsData, data);
        this.setParameter(RadioControlData.KEY_RDS_DATA, data);
        return this;
    }

    /**
     * @return {RdsData}
     */
    getRdsData () {
        return this.getObject(RdsData, RadioControlData.KEY_RDS_DATA);
    }

    /**
     * @param {Boolean} enable - True if the hd radio is on, false if the radio is off
     * @return {RadioControlData}
     */
    setHdRadioEnable (enable) {
        this.setParameter(RadioControlData.KEY_HD_RADIO_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHdRadioEnable () {
        return this.getParameter(RadioControlData.KEY_HD_RADIO_ENABLE);
    }

    /**
     * @param {Number} ds - Number of HD sub-channels if available
     * @return {RadioControlData}
     */
    setAvailableHDs (ds) {
        this.setParameter(RadioControlData.KEY_AVAILABLE_HDS, ds);
        return this;
    }

    /**
     * @return {Number}
     */
    getAvailableHDs () {
        return this.getParameter(RadioControlData.KEY_AVAILABLE_HDS);
    }

    /**
     * @param {Number[]} channels - The list of available HD sub-channel indexes. Empty list means no Hd channel is
     *                              available. Read-only.
     * @return {RadioControlData}
     */
    setAvailableHdChannels (channels) {
        this.setParameter(RadioControlData.KEY_AVAILABLE_HD_CHANNELS, channels);
        return this;
    }

    /**
     * @return {Number[]}
     */
    getAvailableHdChannels () {
        return this.getParameter(RadioControlData.KEY_AVAILABLE_HD_CHANNELS);
    }

    /**
     * @param {Number} channel - Current HD sub-channel if available
     * @return {RadioControlData}
     */
    setHdChannel (channel) {
        this.setParameter(RadioControlData.KEY_HD_CHANNEL, channel);
        return this;
    }

    /**
     * @return {Number}
     */
    getHdChannel () {
        return this.getParameter(RadioControlData.KEY_HD_CHANNEL);
    }

    /**
     * @param {Number} strength
     * @return {RadioControlData}
     */
    setSignalStrength (strength) {
        this.setParameter(RadioControlData.KEY_SIGNAL_STRENGTH, strength);
        return this;
    }

    /**
     * @return {Number}
     */
    getSignalStrength () {
        return this.getParameter(RadioControlData.KEY_SIGNAL_STRENGTH);
    }

    /**
     * @param {Number} threshold - If the signal strength falls below the set value for this parameter, the radio will
     *                             tune to an alternative frequency
     * @return {RadioControlData}
     */
    setSignalChangeThreshold (threshold) {
        this.setParameter(RadioControlData.KEY_SIGNAL_CHANGE_THRESHOLD, threshold);
        return this;
    }

    /**
     * @return {Number}
     */
    getSignalChangeThreshold () {
        return this.getParameter(RadioControlData.KEY_SIGNAL_CHANGE_THRESHOLD);
    }

    /**
     * @param {Boolean} enable - True if the radio is on, false if the radio is off. If set to false, no other data will
     *                           be included.
     * @return {RadioControlData}
     */
    setRadioEnable (enable) {
        this.setParameter(RadioControlData.KEY_RADIO_ENABLE, enable);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRadioEnable () {
        return this.getParameter(RadioControlData.KEY_RADIO_ENABLE);
    }

    /**
     * @param {RadioState} state
     * @return {RadioControlData}
     */
    setState (state) {
        this.validateType(RadioState, state);
        this.setParameter(RadioControlData.KEY_STATE, state);
        return this;
    }

    /**
     * @return {RadioState}
     */
    getState () {
        return this.getObject(RadioState, RadioControlData.KEY_STATE);
    }

    /**
     * @param {SisData} data - Read-only Station Information Service (SIS) data provides basic information about the
     *                         station such as call sign, as well as information not displayable to the consumer such as
     *                         the station identification number
     * @return {RadioControlData}
     */
    setSisData (data) {
        this.validateType(SisData, data);
        this.setParameter(RadioControlData.KEY_SIS_DATA, data);
        return this;
    }

    /**
     * @return {SisData}
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