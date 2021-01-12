/*
* Copyright (c) 2020, Livio, Inc.
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

import { SdlArtwork } from '../../file/filetypes/SdlArtwork';

class AlertView {
    /**
     * Initializes an instance of AlertView.
     * @class
     */
    constructor () {
        this._text = null;
        this._secondaryText = null;
        this._tertiaryText = null;
        this._timeout = null;
        this._audio = null;
        this._showWaitIndicator = false;
        this._softButtons = [];
        this._icon = null;
        this.canceledListener = null;
    }

    /**
     * Get the AlertText1
     * @returns {String} - the _text value
     */
    getText () {
        return this._text;
    }

    /**
     * Set the AlertText1
     * @param {String} text - The first line of the alert text field - The desired AlertText1.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {AlertView} - The class instance for method chaining.
     */
    setText (text) {
        this._text = text;
        return this;
    }

    /**
     * Get the AlertText2
     * @returns {String} - the _secondaryText value
     */
    getSecondaryText () {
        return this._secondaryText;
    }

    /**
     * Set the AlertText2
     * @param {String} secondaryText - The second line of the alert text field - The desired AlertText2.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {AlertView} - The class instance for method chaining.
     */
    setSecondaryText (secondaryText) {
        this._secondaryText = secondaryText;
        return this;
    }

    /**
     * Get the AlertText3
     * @returns {String} - the _tertiaryText value
     */
    getTertiaryText () {
        return this._tertiaryText;
    }

    /**
     * Set the AlertText3
     * @param {String} tertiaryText - The optional third line of the alert text field - The desired AlertText3.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {AlertView} - The class instance for method chaining.
     */
    setTertiaryText (tertiaryText) {
        this._tertiaryText = tertiaryText;
        return this;
    }

    /**
     * Set the Timeout
     * @param {Number} timeout - Timeout in milliseconds. Typical timeouts are 3-5 seconds. If omitted, timeout is set to 5s. - The desired Duration.
     * {'num_min_value': 3000, 'num_max_value': 10000}
     * @returns {AlertView} - The class instance for method chaining.
     */
    setTimeout (timeout) {
        this._timeout = timeout;
        return this;
    }

    /**
     * Get the ShowWaitIndicator
     * @returns {Boolean} - the _showWaitIndicator value
     */
    isShowWaitIndicator () {
        return this._showWaitIndicator;
    }

    /**
     * Set the ShowWaitIndicator
     * @param {Boolean} showWaitIndicator - If supported on the given platform, the alert GUI will include some sort of animation indicating that loading of a feature is progressing. e.g. a spinning wheel or hourglass, etc. - The desired ProgressIndicator.
     * @returns {AlertView} - The class instance for method chaining.
     */
    setShowWaitIndicator (showWaitIndicator) {
        this._showWaitIndicator = showWaitIndicator;
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButtonObject[]} - the _softButtons value
     */
    getSoftButtons () {
        return this._softButtons;
    }

    /**
     * Set the SoftButtons
     * @param {SoftButtonObject[]} softButtons - App defined SoftButtons. If omitted on supported displays, the displayed alert shall not have any SoftButtons. - The desired SoftButtons.
     * {'array_min_size': 0, 'array_max_size': 4}
     * @returns {AlertView} - The class instance for method chaining.
     */
    setSoftButtons (softButtons) {
        for (const softButtonObject of softButtons) {
            if (softButtonObject.getStates().length !== 1) {
                console.log('Attempting create a soft button for an Alert with more than one state. Only first state set will work.');
            }
        }
        this._softButtons = softButtons;
        return this;
    }

    /**
     * Get the Audio
     * @returns {AlertAudioData} audio - See AlertAudioData.
     */
    getAudio () {
        return this._audio;
    }

    /**
     * Set the Audio
     * @param {AlertAudioData} audio - See AlertAudioData.
     * @returns {AlertView} - The class instance for method chaining.
     */
    setAudio (audio) {
        this._audio = audio;
        return this;
    }

    /**
     * Get the AlertIcon
     * @returns {SdlArtwork} - the _icon value
     */
    getIcon () {
        return this._icon;
    }

    /**
     * Set the AlertIcon
     * @param {SdlArtwork} icon - Image struct determining whether static or dynamic icon. If omitted on supported displays, no (or the default if applicable) icon should be displayed.
     * @returns {AlertView} - The class instance for method chaining.
     */
    setIcon (icon) {
        this._icon = icon;
        return this;
    }

    /**
     * Get the Timeout
     * @returns {Number} - the _defaultTimeout value
     */
    getDefaultTimeout () {
        return AlertView._defaultTimeout;
    }

    /**
     * Set this to change the default timeout for all alerts.
     * If a timeout is not set on an individual alert object (or if it is set to 0.0),
     * then it will use this timeout instead. See `timeout` for more details.
     * If this is not set by you, it will default to 5 seconds. The minimum is 3 seconds,
     * the maximum is 10 seconds. If this is set below the minimum, it will be capped at 3 seconds.
     * If this is set above the maximum, it will be capped at 10 seconds.
     * @param {Number} defaultTimeout - Timeout in milliseconds. Typical timeouts are 3-5 seconds. If omitted, timeout is set to 5s.
     * @returns {AlertView} - A reference to this instance to support method chaining.
     */
    setDefaultTimeout (defaultTimeout) {
        if (defaultTimeout <= TIMEOUT_MIN) {
            AlertView._defaultTimeout = TIMEOUT_MIN;
            return;
        } else if (defaultTimeout >= TIMEOUT_MAX) {
            AlertView._defaultTimeout = TIMEOUT_MAX;
            return;
        }
        AlertView._defaultTimeout = defaultTimeout;
        return this;
    }

    /**
     * Cancels the alert. If the alert has not yet been sent to Core, it will not be sent.
     * If the alert is already presented on Core, the alert will be immediately dismissed.
     * Canceling an already presented alert will only work if connected to Core versions 6.0+.
     * On older versions of Core, the alert will not be dismissed.
     */
    cancel () {
        if (typeof this.canceledListener === 'function') {
            this.canceledListener();
        }
    }

    /**
     * Get the Timeout
     * @returns {Number} - the timeout value
     */
    getTimeout () {
        if (this._timeout === null || this._timeout === undefined) {
            this._timeout = this._defaultTimeout;
        } else if (this._timeout === this._defaultTimeout) {
            return this._defaultTimeout;
        } else if (this._timeout < TIMEOUT_MIN) {
            return TIMEOUT_MIN;
        } else if (this._timeout > TIMEOUT_MAX) {
            return TIMEOUT_MAX;
        }
        return this._timeout;
    }

    /**
     * Creates a deep copy of the object.
     * @returns {AlertView} - A deep clone of the object.
     */
    clone () {
        // Parse the larger object instead of the individual properties
        // Trying to stringify undefined values fails but if it's a property of the larger object, it is stripped from the object
        const jsonClone = JSON.parse(JSON.stringify(this));

        const clone = new AlertView()
            .setText(jsonClone._text)
            .setSecondaryText(jsonClone._secondaryText)
            .setTertiaryText(jsonClone._tertiaryText)
            .setTimeout(jsonClone._timeout)
            .setShowWaitIndicator(jsonClone._showWaitIndicator);

        if (this.getAudio() !== null && this.getAudio() !== undefined) {
            clone.setAudio(this.getAudio().clone());
        }

        if (this.getIcon() !== null && this.getIcon() !== undefined) {
            const iconClone = JSON.parse(JSON.stringify(this.getIcon()));
            clone.setIcon(
                new SdlArtwork()
                    .setName(iconClone._fileName)
                    .setFilePath(iconClone._filePath)
                    .setFileData(iconClone._fileData)
                    .setType(iconClone._fileType)
                    .setPersistent(iconClone._persistentFile)
                    .setStaticIcon(iconClone._isStaticIcon)
                    .setTemplateImage(iconClone._isTemplate)
                    .setOverwrite(iconClone._overwrite)
            );
        }

        if (Array.isArray(this.getSoftButtons())) {
            const softButtonsClone = this.getSoftButtons().map((softButton) => {
                return softButton.clone();
            });
            clone.setSoftButtons(softButtonsClone);
        }

        if (typeof this.canceledListener === 'function') {
            // Re-bind the context of the listener to make a clone of the method
            clone.canceledListener = this.canceledListener.bind(clone);
            console.log('method cloney', typeof clone.canceledListener === 'function', this.canceledListener === clone.canceledListener, this.canceledListener === this.canceledListener);
        }
        return clone;
    }
}

AlertView._defaultTimeout = 5;
const TIMEOUT_MIN = 3;
const TIMEOUT_MAX = 10;

export { AlertView };