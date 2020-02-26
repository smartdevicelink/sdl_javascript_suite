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

import { SoftButton } from '../../../rpc/structs/SoftButton.js';
import { SoftButtonType } from '../../../rpc/enums/SoftButtonType.js';
import { SoftButtonObject } from './SoftButtonObject.js';

/**
 * Defines an individual state for SoftButtonObject
 * The states of SoftButtonObject allow the developer to not have to manage multiple SoftButtons that have very similar functionality
 * For example, a repeat button in a music app can be thought of as one SoftButtonObject with three typical states: repeat off, repeat 1, and repeat on
*/
class SoftButtonState {
    /**
     * Creates a new instance of SoftButtonState
     * Note: state names should be different for each SoftButtonObject
     * @param {String} name - a String value represents name of the state
     * @param {String} text - a String represents the text for the state
     * @param {SdlArtwork} artwork - an SdlArtwork represents the artwork for the state
    */
    constructor (name = null, text = null, artwork = null) {
        this._name = null;
        this._artwork = null;
        this._softButton = null;

        if (text === null && artwork === null) {
            console.error('Attempted to create an invalid soft button state: text and artwork are both null');
            return;
        }

        this._name = name;
        this._artwork = artwork;

        // Create a SoftButton and set its Type
        let type = null;

        if (artwork !== null && text !== null) {
            type = SoftButtonType.SBT_BOTH;
        } else if (artwork !== null) {
            type = SoftButtonType.SBT_IMAGE;
        } else {
            type = SoftButtonType.SBT_TEXT;
        }

        this._softButton = new SoftButton()
            .setType(type)
            .setSoftButtonID(SoftButtonObject.SOFT_BUTTON_ID_NOT_SET_VALUE);

        // Set the SoftButton's image
        if (artwork !== null) {
            this._softButton.setImage(artwork.getImageRPC());
        }

        // Set the SoftButton's text
        if (text !== null) {
            this._softButton.setText(text);
        }
    }

    /**
     * Get the state name
     * @return {String} - a String value represents the name of the state
    */
    getName () {
        return this._name;
    }

    /**
     * Set the state name
     * @param {String} - name a String value represents the name of the state
     * @return {SoftButtonState}
    */
    setName (name) {
        this._name = name;
        return this;
    }

    /**
     * Get whether or not the button should be highlighted on the UI
     * @return {Boolean} - boolean representing whether or not the button should be highlighted
    */
    getHighlighted () {
        return this.getSoftButton().getIsHighlighted();
    }

    /**
     * Set whether or not the button should be highlighted on the UI
     * @param {Boolean} - highlighted boolean representing whether or not the button should be highlighted
     * @return {SoftButtonState}
    */
    setHighlighted (highlighted) {
        this.getSoftButton().setIsHighlighted(highlighted);
        return this;
    }

    /**
     * Get whether selecting a SoftButton shall call a specific system action
     * @return {SystemAction} - SystemAction value representing whether selecting a SoftButton shall call a specific action
    */
    getSystemAction () {
        return this.getSoftButton().getSystemAction();
    }

    /**
     * Set whether selecting a SoftButton shall call a specific system action
     * @param {SystemAction} - systemAction SystemAction value representing whether selecting a SoftButton shall call a specific action
     * @return {SoftButtonState}
    */
    setSystemAction (systemAction) {
        this.getSoftButton().setSystemAction(systemAction);
        return this;
    }

    /**
     * Get the SoftButton for the state
     * @return {SoftButton} - a SoftButton object represents the SoftButton for the state
    */
    getSoftButton () {
        return this._softButton;
    }

    /**
     * Get the Artwork for the state
     * @return {SdlArtwork} - an SdlArtwork object represents the artwork for the state
    */
    getArtwork () {
        return this._artwork;
    }
}

export { SoftButtonState };
