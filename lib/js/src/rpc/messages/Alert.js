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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.Alert);
    }

    /**
     * @param {String} text1 - The first line of the alert text field
     * @return {Alert}
     */
    setAlertText1 (text1) {
        this.setParameter(Alert.KEY_ALERT_TEXT_1, text1);
        return this;
    }

    /**
     * @return {String}
     */
    getAlertText1 () {
        return this.getParameter(Alert.KEY_ALERT_TEXT_1);
    }

    /**
     * @param {String} text2 - The second line of the alert text field
     * @return {Alert}
     */
    setAlertText2 (text2) {
        this.setParameter(Alert.KEY_ALERT_TEXT_2, text2);
        return this;
    }

    /**
     * @return {String}
     */
    getAlertText2 () {
        return this.getParameter(Alert.KEY_ALERT_TEXT_2);
    }

    /**
     * @param {String} text3 - The optional third line of the alert text field
     * @return {Alert}
     */
    setAlertText3 (text3) {
        this.setParameter(Alert.KEY_ALERT_TEXT_3, text3);
        return this;
    }

    /**
     * @return {String}
     */
    getAlertText3 () {
        return this.getParameter(Alert.KEY_ALERT_TEXT_3);
    }

    /**
     * @param {TTSChunk[]} chunks - An array of text chunks of type TTSChunk. See TTSChunk. The array must have at least
     *                              one item.
     * @return {Alert}
     */
    setTtsChunks (chunks) {
        this.validateType(TTSChunk, chunks, true);
        this.setParameter(Alert.KEY_TTS_CHUNKS, chunks);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getTtsChunks () {
        return this.getObject(TTSChunk, Alert.KEY_TTS_CHUNKS);
    }

    /**
     * @param {Number} duration - Timeout in milliseconds. Typical timeouts are 3-5 seconds. If omitted, timeout is set
     *                            to 5s.
     * @return {Alert}
     */
    setDuration (duration) {
        this.setParameter(Alert.KEY_DURATION, duration);
        return this;
    }

    /**
     * @return {Number}
     */
    getDuration () {
        return this.getParameter(Alert.KEY_DURATION);
    }

    /**
     * @param {Boolean} tone - Defines if tone should be played. Tone is played before TTS. If omitted, no tone is
     *                         played.
     * @return {Alert}
     */
    setPlayTone (tone) {
        this.setParameter(Alert.KEY_PLAY_TONE, tone);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPlayTone () {
        return this.getParameter(Alert.KEY_PLAY_TONE);
    }

    /**
     * @param {Boolean} indicator - If supported on the given platform, the alert GUI will include some sort of
     *                              animation indicating that loading of a feature is progressing. e.g. a spinning wheel
     *                              or hourglass, etc.
     * @return {Alert}
     */
    setProgressIndicator (indicator) {
        this.setParameter(Alert.KEY_PROGRESS_INDICATOR, indicator);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getProgressIndicator () {
        return this.getParameter(Alert.KEY_PROGRESS_INDICATOR);
    }

    /**
     * @param {SoftButton[]} buttons - App defined SoftButtons. If omitted on supported displays, the displayed alert
     *                                 shall not have any SoftButtons.
     * @return {Alert}
     */
    setSoftButtons (buttons) {
        this.validateType(SoftButton, buttons, true);
        this.setParameter(Alert.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * @return {SoftButton[]}
     */
    getSoftButtons () {
        return this.getObject(SoftButton, Alert.KEY_SOFT_BUTTONS);
    }

    /**
     * @param {Image} icon - Image struct determining whether static or dynamic icon. If omitted on supported displays,
     *                       no (or the default if applicable) icon should be displayed.
     * @return {Alert}
     */
    setAlertIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(Alert.KEY_ALERT_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getAlertIcon () {
        return this.getObject(Image, Alert.KEY_ALERT_ICON);
    }

    /**
     * @param {Number} id - An ID for this specific alert to allow cancellation through the `CancelInteraction` RPC.
     * @return {Alert}
     */
    setCancelID (id) {
        this.setParameter(Alert.KEY_CANCEL_ID, id);
        return this;
    }

    /**
     * @return {Number}
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