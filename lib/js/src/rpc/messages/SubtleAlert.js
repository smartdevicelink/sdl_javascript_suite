/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';
import { TTSChunk } from '../structs/TTSChunk.js';

/**
 * Shows an alert which typically consists of text-to-speech message and text on the display. At least either alertText1, alertText2 or ttsChunks need to be provided.
 */
class SubtleAlert extends RpcRequest {
    /**
     * Initializes an instance of SubtleAlert.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.SubtleAlert);
    }

    /**
     * Set the AlertText1
     * @param {String} text1 - The first line of the alert text field - The desired AlertText1.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setAlertText1 (text1) {
        this.setParameter(SubtleAlert.KEY_ALERT_TEXT_1, text1);
        return this;
    }

    /**
     * Get the AlertText1
     * @returns {String} - the KEY_ALERT_TEXT_1 value
     */
    getAlertText1 () {
        return this.getParameter(SubtleAlert.KEY_ALERT_TEXT_1);
    }

    /**
     * Set the AlertText2
     * @param {String} text2 - The second line of the alert text field - The desired AlertText2.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setAlertText2 (text2) {
        this.setParameter(SubtleAlert.KEY_ALERT_TEXT_2, text2);
        return this;
    }

    /**
     * Get the AlertText2
     * @returns {String} - the KEY_ALERT_TEXT_2 value
     */
    getAlertText2 () {
        return this.getParameter(SubtleAlert.KEY_ALERT_TEXT_2);
    }

    /**
     * Set the AlertIcon
     * @param {Image} icon - Image to be displayed for the corresponding alert. See Image. If omitted on supported displays, no (or the default if applicable) icon should be displayed. - The desired AlertIcon.
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setAlertIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(SubtleAlert.KEY_ALERT_ICON, icon);
        return this;
    }

    /**
     * Get the AlertIcon
     * @returns {Image} - the KEY_ALERT_ICON value
     */
    getAlertIcon () {
        return this.getObject(Image, SubtleAlert.KEY_ALERT_ICON);
    }

    /**
     * Set the TtsChunks
     * @param {TTSChunk[]} chunks - An array of text chunks of type TTSChunk. See TTSChunk. The array must have at least one item. - The desired TtsChunks.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setTtsChunks (chunks) {
        this._validateType(TTSChunk, chunks, true);
        this.setParameter(SubtleAlert.KEY_TTS_CHUNKS, chunks);
        return this;
    }

    /**
     * Get the TtsChunks
     * @returns {TTSChunk[]} - the KEY_TTS_CHUNKS value
     */
    getTtsChunks () {
        return this.getObject(TTSChunk, SubtleAlert.KEY_TTS_CHUNKS);
    }

    /**
     * Set the Duration
     * @param {Number} duration - Timeout in milliseconds. Typical timeouts are 3-5 seconds. If omitted, timeout is set to 5s. - The desired Duration.
     * {'default_value': 5000, 'num_min_value': 3000, 'num_max_value': 10000}
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setDuration (duration) {
        this.setParameter(SubtleAlert.KEY_DURATION, duration);
        return this;
    }

    /**
     * Get the Duration
     * @returns {Number} - the KEY_DURATION value
     */
    getDuration () {
        return this.getParameter(SubtleAlert.KEY_DURATION);
    }

    /**
     * Set the SoftButtons
     * @param {SoftButton[]} buttons - App defined SoftButtons. If omitted on supported displays, the displayed alert shall not have any SoftButtons. - The desired SoftButtons.
     * {'array_min_size': 0, 'array_max_size': 2}
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setSoftButtons (buttons) {
        this._validateType(SoftButton, buttons, true);
        this.setParameter(SubtleAlert.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButton[]} - the KEY_SOFT_BUTTONS value
     */
    getSoftButtons () {
        return this.getObject(SoftButton, SubtleAlert.KEY_SOFT_BUTTONS);
    }

    /**
     * Set the CancelID
     * @param {Number} id - An ID for this specific alert to allow cancellation through the `CancelInteraction` RPC. - The desired CancelID.
     * @returns {SubtleAlert} - The class instance for method chaining.
     */
    setCancelID (id) {
        this.setParameter(SubtleAlert.KEY_CANCEL_ID, id);
        return this;
    }

    /**
     * Get the CancelID
     * @returns {Number} - the KEY_CANCEL_ID value
     */
    getCancelID () {
        return this.getParameter(SubtleAlert.KEY_CANCEL_ID);
    }
}

SubtleAlert.KEY_ALERT_TEXT_1 = 'alertText1';
SubtleAlert.KEY_ALERT_TEXT_2 = 'alertText2';
SubtleAlert.KEY_ALERT_ICON = 'alertIcon';
SubtleAlert.KEY_TTS_CHUNKS = 'ttsChunks';
SubtleAlert.KEY_DURATION = 'duration';
SubtleAlert.KEY_SOFT_BUTTONS = 'softButtons';
SubtleAlert.KEY_CANCEL_ID = 'cancelID';

export { SubtleAlert };