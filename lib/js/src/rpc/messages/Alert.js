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

import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';
import { TTSChunk } from '../structs/TTSChunk.js';

/**
 * Shows an alert which typically consists of text-to-speech message and text on the display. At least either
 * alertText1, alertText2 or TTSChunks need to be provided.
 */
class Alert extends RpcRequest {
    /**
     * Initalizes an instance of Alert.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.Alert);
    }

    /**
     * Set the AlertText1
     * @param {String} text1 - The first line of the alert text field - The desired AlertText1.
     * @returns {Alert} - The class instance for method chaining.
     */
    setAlertText1 (text1) {
        this.setParameter(Alert.KEY_ALERT_TEXT_1, text1);
        return this;
    }

    /**
     * Get the AlertText1
     * @returns {String} - the KEY_ALERT_TEXT_1 value
     */
    getAlertText1 () {
        return this.getParameter(Alert.KEY_ALERT_TEXT_1);
    }

    /**
     * Set the AlertText2
     * @param {String} text2 - The second line of the alert text field - The desired AlertText2.
     * @returns {Alert} - The class instance for method chaining.
     */
    setAlertText2 (text2) {
        this.setParameter(Alert.KEY_ALERT_TEXT_2, text2);
        return this;
    }

    /**
     * Get the AlertText2
     * @returns {String} - the KEY_ALERT_TEXT_2 value
     */
    getAlertText2 () {
        return this.getParameter(Alert.KEY_ALERT_TEXT_2);
    }

    /**
     * Set the AlertText3
     * @param {String} text3 - The optional third line of the alert text field - The desired AlertText3.
     * @returns {Alert} - The class instance for method chaining.
     */
    setAlertText3 (text3) {
        this.setParameter(Alert.KEY_ALERT_TEXT_3, text3);
        return this;
    }

    /**
     * Get the AlertText3
     * @returns {String} - the KEY_ALERT_TEXT_3 value
     */
    getAlertText3 () {
        return this.getParameter(Alert.KEY_ALERT_TEXT_3);
    }

    /**
     * Set the TtsChunks
     * @param {TTSChunk[]} chunks - An array of text chunks of type TTSChunk. See TTSChunk. The array must have at least - The desired TtsChunks.
     * one item.
     * @returns {Alert} - The class instance for method chaining.
     */
    setTtsChunks (chunks) {
        this._validateType(TTSChunk, chunks, true);
        this.setParameter(Alert.KEY_TTS_CHUNKS, chunks);
        return this;
    }

    /**
     * Get the TtsChunks
     * @returns {TTSChunk[]} - the KEY_TTS_CHUNKS value
     */
    getTtsChunks () {
        return this.getObject(TTSChunk, Alert.KEY_TTS_CHUNKS);
    }

    /**
     * Set the Duration
     * @param {Number} duration - Timeout in milliseconds. Typical timeouts are 3-5 seconds. If omitted, timeout is set - The desired Duration.
     * to 5s.
     * @returns {Alert} - The class instance for method chaining.
     */
    setDuration (duration) {
        this.setParameter(Alert.KEY_DURATION, duration);
        return this;
    }

    /**
     * Get the Duration
     * @returns {Number} - the KEY_DURATION value
     */
    getDuration () {
        return this.getParameter(Alert.KEY_DURATION);
    }

    /**
     * Set the PlayTone
     * @param {Boolean} tone - Defines if tone should be played. Tone is played before TTS. If omitted, no tone is - The desired PlayTone.
     * played.
     * @returns {Alert} - The class instance for method chaining.
     */
    setPlayTone (tone) {
        this.setParameter(Alert.KEY_PLAY_TONE, tone);
        return this;
    }

    /**
     * Get the PlayTone
     * @returns {Boolean} - the KEY_PLAY_TONE value
     */
    getPlayTone () {
        return this.getParameter(Alert.KEY_PLAY_TONE);
    }

    /**
     * Set the ProgressIndicator
     * @param {Boolean} indicator - If supported on the given platform, the alert GUI will include some sort of - The desired ProgressIndicator.
     * animation indicating that loading of a feature is progressing. e.g. a spinning wheel
     * or hourglass, etc.
     * @returns {Alert} - The class instance for method chaining.
     */
    setProgressIndicator (indicator) {
        this.setParameter(Alert.KEY_PROGRESS_INDICATOR, indicator);
        return this;
    }

    /**
     * Get the ProgressIndicator
     * @returns {Boolean} - the KEY_PROGRESS_INDICATOR value
     */
    getProgressIndicator () {
        return this.getParameter(Alert.KEY_PROGRESS_INDICATOR);
    }

    /**
     * Set the SoftButtons
     * @param {SoftButton[]} buttons - App defined SoftButtons. If omitted on supported displays, the displayed alert - The desired SoftButtons.
     * shall not have any SoftButtons.
     * @returns {Alert} - The class instance for method chaining.
     */
    setSoftButtons (buttons) {
        this._validateType(SoftButton, buttons, true);
        this.setParameter(Alert.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButton[]} - the KEY_SOFT_BUTTONS value
     */
    getSoftButtons () {
        return this.getObject(SoftButton, Alert.KEY_SOFT_BUTTONS);
    }

    /**
     * Set the AlertIcon
     * @param {Image} icon - Image struct determining whether static or dynamic icon. If omitted on supported displays, - The desired AlertIcon.
     * no (or the default if applicable) icon should be displayed.
     * @returns {Alert} - The class instance for method chaining.
     */
    setAlertIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(Alert.KEY_ALERT_ICON, icon);
        return this;
    }

    /**
     * Get the AlertIcon
     * @returns {Image} - the KEY_ALERT_ICON value
     */
    getAlertIcon () {
        return this.getObject(Image, Alert.KEY_ALERT_ICON);
    }

    /**
     * Set the CancelID
     * @param {Number} id - An ID for this specific alert to allow cancellation through the `CancelInteraction` RPC. - The desired CancelID.
     * @returns {Alert} - The class instance for method chaining.
     */
    setCancelID (id) {
        this.setParameter(Alert.KEY_CANCEL_ID, id);
        return this;
    }

    /**
     * Get the CancelID
     * @returns {Number} - the KEY_CANCEL_ID value
     */
    getCancelID () {
        return this.getParameter(Alert.KEY_CANCEL_ID);
    }
}

Alert.KEY_ALERT_TEXT_1 = 'alertText1';
Alert.KEY_ALERT_TEXT_2 = 'alertText2';
Alert.KEY_ALERT_TEXT_3 = 'alertText3';
Alert.KEY_TTS_CHUNKS = 'ttsChunks';
Alert.KEY_DURATION = 'duration';
Alert.KEY_PLAY_TONE = 'playTone';
Alert.KEY_PROGRESS_INDICATOR = 'progressIndicator';
Alert.KEY_SOFT_BUTTONS = 'softButtons';
Alert.KEY_ALERT_ICON = 'alertIcon';
Alert.KEY_CANCEL_ID = 'cancelID';

export { Alert };