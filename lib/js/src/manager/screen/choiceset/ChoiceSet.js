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

import { ChoiceSetLayout } from './enums/ChoiceSetLayout.js';
import { VrHelpItem } from '../../../rpc/structs/VrHelpItem.js';

class ChoiceSet {
    /**
     * Create a new instance of ChoiceSet
     * Initialize with a title, choices, and listener. It will use the default timeout and layout, all other properties (such as prompts) will be null.
     * WARNING: If you display multiple cells with the same title with the only uniquing property between cells being different `vrCommands` or a feature
     * that is not displayed on the head unit (e.g. if the head unit doesn't display `secondaryArtwork` and that's the only uniquing property between two cells)
     * then the cells may appear to be the same to the user in `Manual` mode. This only applies to RPC connections >= 7.1.0.
     * WARNING: On < 7.1.0 connections, the title cell will be automatically modified among cells that have the same title when they are preloaded, so they will
     * always appear differently on-screen when they are displayed. Unique text will be created by appending " (2)", " (3)", etc.
     * @class
     * @param {String} title - The choice set's title
     * @param {ChoiceCell[]} choices - The choices to be displayed to the user for interaction
     * @param {ChoiceSetSelectionListener} listener - The choice set listener called after the user has interacted with your choice set
     */
    constructor (title = '', choices = [], listener = null) {
        this._title = title;
        this._choices = choices;
        this._choiceSetSelectionListener = listener;
        // defaults
        this._defaultLayout = ChoiceSetLayout.CHOICE_SET_LAYOUT_LIST;
        this._layout = this._defaultLayout;
        this._defaultTimeout = 10;
        this._TIMEOUT_DEFAULT = 0;
        this._TIMEOUT_MIN_CAP = 5;
        this._TIMEOUT_MAX_CAP = 100;
        this._timeout = this._TIMEOUT_DEFAULT;

        this._initialPrompt = null;
        this._timeoutPrompt = null;
        this._helpPrompt = null;
        this._vrHelpList = null;
        this._customKeyboardConfiguration = null;
        this._canceledListener = null;

        // things to do
        this._checkChoiceSetParameters();
    }

    /**
     * Cancels the choice set. If the choice set has not yet been sent to Core, it will not be sent.
     * If the choice set is already presented on Core, the choice set will be immediately dismissed.
     * Canceling an already presented choice set will only work if connected to Core versions 6.0+.
     * On older versions of Core, the choice set will not be dismissed.
     */
    cancel () {
        if (typeof this._canceledListener === 'function') {
            this._canceledListener();
        }
    }

    _checkChoiceSetParameters () {
        if (this.getTitle() !== null) {
            if (this.getTitle().length === 0 || this.getTitle().length > 500) {
                console.warn(`ChoiceSet: Attempted to create a choice set with a title of ${this.getTitle().length} length. Only 1 - 500 characters are supported.`);
            }
        }
        if (this.getChoices() !== null) {
            if (this.getChoices().length === 0 || this.getChoices().length > 100) {
                console.warn(`ChoiceSet: Attempted to create a choice set with ${this.getChoices().length} choices; Only 1 - 100 choices are valid`);
            }
        }
    }

    /**
     * Makes a deep copy of helpItems for the vrHelpList
     * @param {VrHelpItem[]} helpItems - The list of VrHelpItems to duplicate
     * @returns {VrHelpItem[]|null} - Returns a copy of helpItems, which could be null
     */
    _setUpHelpItems (helpItems = null) {
        if (helpItems === null) {
            return null;
        }
        let clonedHelpItems = [];
        if (Array.isArray(helpItems)) {
            clonedHelpItems = helpItems.map((helpItem, index) => {
                // clone the VrHelpItem so we don't modify the develop copy
                return new VrHelpItem(JSON.parse(JSON.stringify(helpItem._parameters)))
                    .setPosition(index + 1); // set help item positioning
            });
        }
        return clonedHelpItems;
    }

    // GETTERS AND SETTERS

    /**
     * Get the state title
     * @returns {String} - The title
     */
    getTitle () {
        return this._title;
    }

    /**
     * Set the state title
     * Maps to PerformInteraction.initialText. The title of the choice set, and/or the initial text on a keyboard prompt.
     * @param {String} title - The title
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setTitle (title) {
        this._title = title;
        this._checkChoiceSetParameters();
        return this;
    }

    /**
     * Get the state initialPrompt
     * @returns {TTSChunk[]|null} - The initialPrompt
     */
    getInitialPrompt () {
        return this._initialPrompt;
    }

    /**
     * Set the state initialPrompt
     * Maps to PerformInteraction.initialPrompt. The initial prompt spoken to the user at the start of an interaction.
     * @param {TTSChunk[]} initialPrompt - The initialPrompt
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setInitialPrompt (initialPrompt) {
        this._initialPrompt = initialPrompt;
        return this;
    }

    /**
     * Get the state timeoutPrompt
     * @returns {TTSChunk[]|null} - The timeoutPrompt
     */
    getTimeoutPrompt () {
        return this._timeoutPrompt;
    }

    /**
     * Set the state timeoutPrompt
     * Maps to PerformInteraction.timeoutPrompt. This text is spoken when a VR interaction times out.
     * If this set is presented in a manual (non-voice) only interaction, this will be ignored.
     * @param {TTSChunk[]} timeoutPrompt - The timeoutPrompt
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setTimeoutPrompt (timeoutPrompt) {
        this._timeoutPrompt = timeoutPrompt;
        return this;
    }

    /**
     * Get the state helpPrompt
     * @returns {TTSChunk[]|null} - The helpPrompt
     */
    getHelpPrompt () {
        return this._helpPrompt;
    }

    /**
     * Set the state helpPrompt
     * Maps to PerformInteraction.helpPrompt. This is the spoken string when a user speaks "help" when the interaction is occurring.
     * @param {TTSChunk[]} helpPrompt - The helpPrompt
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setHelpPrompt (helpPrompt) {
        this._helpPrompt = helpPrompt;
        return this;
    }

    /**
     * Get the state vrHelpList
     * @returns {VrHelpItem[]|null} - The vrHelpList
     */
    getVrHelpList () {
        return this._vrHelpList;
    }

    /**
     * Set the state vrHelpList
     * Maps to PerformInteraction.vrHelp. This is a list of help text presented to the user when
     * they are in a voice recognition interaction from your choice set of options. If this set is
     * presented in a touch only interaction, this will be ignored.
     * Note: That while VRHelpItem's position will be automatically set based on position in the
     * array, the image will need to uploaded by you before use using the FileManager.
     * @param {VrHelpItem[]} vrHelpList - The vrHelpList
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setVrHelpList (vrHelpList) {
        this._vrHelpList = this._setUpHelpItems(vrHelpList);
        return this;
    }

    /**
     * Get the state layout
     * @returns {ChoiceSetLayout} - The layout
     */
    getLayout () {
        return this._layout;
    }

    /**
     * Set the state layout
     * Maps to PerformInteraction.interactionLayout. Whether the presented choices are arranged as
     * @param {ChoiceSetLayout} layout - The layout
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setLayout (layout = null) {
        if (layout === null) {
            this._layout = this._defaultLayout;
        } else {
            this._layout = layout;
        }
        return this;
    }

    /**
     * Get the state timeout
     * @returns {Number} - The timeout of a touch interaction in seconds (Manual/touch only)
     */
    getTimeout () {
        if (this._timeout === this._TIMEOUT_DEFAULT) {
            return this.getDefaultTimeout();
        } else if (this._timeout < this._TIMEOUT_MIN_CAP) {
            return this._TIMEOUT_MIN_CAP;
        } else if (this._timeout > this._TIMEOUT_MAX_CAP) {
            return this._TIMEOUT_MAX_CAP;
        }
        return this._timeout;
    }

    /**
     * Set the state timeout
     * Maps to PerformInteraction.timeout. Timeout in seconds. Defaults to 0, which will use `defaultTimeout`. If this is set below the minimum, it will be capped at 5 seconds. Minimum 5 seconds, maximum 100 seconds. If this is set above the maximum, it will be capped at 100 seconds. Defaults to 0.
     * This applies only to a manual selection (not a voice selection, which has its timeout handled by the system).
     * @param {Number} timeout - The timeout of a touch interaction in seconds (Manual/touch only)
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setTimeout (timeout) {
        this._timeout = timeout;
        this._checkChoiceSetParameters();
        return this;
    }

    /**
     * Get the state default timeout
     * @returns {Number} - The default timeout
     */
    getDefaultTimeout () {
        if (this._defaultTimeout < this._TIMEOUT_MIN_CAP) {
            return this._TIMEOUT_MIN_CAP;
        } else if (this._defaultTimeout > this._TIMEOUT_MAX_CAP) {
            return this._TIMEOUT_MAX_CAP;
        }

        return this._defaultTimeout;
    }

    /**
     * Set the state default timeout
     * Set this to change the default timeout for all choice sets. If a timeout is not set on an individual choice set object
     * (or if it is set to 0.0), then it will use this timeout instead. See `timeout` for more details.
     * If this is not set by you, it will default to 10 seconds. The minimum is 5 seconds, the maximum is 100 seconds.
     * If this is set below the minimum, it will be capped at 5 seconds. If this is set above the maximum, it will be capped at 100 seconds.
     * @param {Number} defaultTimeout - The default timeout
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setDefaultTimeout (defaultTimeout) {
        this._defaultTimeout = defaultTimeout;
        return this;
    }

    /**
     * Get the state choices
     * @returns {ChoiceCell[]} - The choices
     */
    getChoices () {
        return this._choices;
    }

    /**
     * Set the state choices
     * The choices to be displayed to the user within this choice set. These choices could match
     * those already preloaded
     * This is limited to 100 items. If you attempt to set more than 100 items, the set will not
     * have any items (this array will be empty).
     * @param {ChoiceCell[]} choices - The choices
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setChoices (choices) {
        this._choices = choices;
        this._checkChoiceSetParameters();
        return this;
    }

    /**
     * Get the state choiceSetSelectionListener
     * @returns {ChoiceSetSelectionListener} - The choiceSetSelectionListener
     */
    getChoiceSetSelectionListener () {
        return this._choiceSetSelectionListener;
    }

    /**
     * Set the state choiceSetSelectionListener
     * The listener of this choice set, called when the user interacts with it
     * @param {ChoiceSetSelectionListener} choiceSetSelectionListener - The choiceSetSelectionListener
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setChoiceSetSelectionListener (choiceSetSelectionListener) {
        this._choiceSetSelectionListener = choiceSetSelectionListener;
        return this;
    }

    /**
     * Get the state customKeyboardConfiguration
     * @returns {KeyboardProperties} - The customKeyboardConfiguration
     */
    getCustomKeyboardConfiguration () {
        return this._customKeyboardConfiguration;
    }

    /**
     * Set the state customKeyboardConfiguration
     * Implement this in order to provide a custom keyboard configuration to just this keyboard.
     * To apply default settings to all keyboards, see ScreenManager.setKeyboardConfiguration
     * @param {KeyboardProperties} customKeyboardConfiguration - The customKeyboardConfiguration
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setCustomKeyboardConfiguration (customKeyboardConfiguration) {
        this._customKeyboardConfiguration = customKeyboardConfiguration;
        return this;
    }

    /**
     * Get the state canceledListener
     * @returns {function} - The canceledListener
     */
    getCanceledListener () {
        return this._canceledListener;
    }

    /**
     * Set the state canceledListener
     * Cancels the choice set. If the choice set has not yet been sent to Core, it will not be sent.
     * If the choice set is already presented on Core, the choice set will be immediately dismissed.
     * Canceling an already presented choice set will only work if connected to Core versions 6.0+.
     * On older versions of Core, the choice set will not be dismissed.
     * @param {function} canceledListener - The canceledListener
     * @returns {ChoiceSet} - A reference to this instance to support method chaining
     */
    setCanceledListener (canceledListener) {
        this._canceledListener = canceledListener;
        return this;
    }
}

export { ChoiceSet };
