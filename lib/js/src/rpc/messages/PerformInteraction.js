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
import { InteractionMode } from '../enums/InteractionMode.js';
import { LayoutMode } from '../enums/LayoutMode.js';
import { RpcRequest } from '../RpcRequest.js';
import { TTSChunk } from '../structs/TTSChunk.js';
import { VrHelpItem } from '../structs/VrHelpItem.js';

/**
 * Triggers an interaction (e.g. "Permit GPS?" - Yes, no, Always Allow).
 */
class PerformInteraction extends RpcRequest {
    /**
     * Initalizes an instance of PerformInteraction.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.PerformInteraction);
    }

    /**
     * Set the InitialText
     * @param {String} text - Text to be displayed first. - The desired InitialText.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setInitialText (text) {
        this.setParameter(PerformInteraction.KEY_INITIAL_TEXT, text);
        return this;
    }

    /**
     * Get the InitialText
     * @returns {String} - the KEY_INITIAL_TEXT value
     */
    getInitialText () {
        return this.getParameter(PerformInteraction.KEY_INITIAL_TEXT);
    }

    /**
     * Set the InitialPrompt
     * @param {TTSChunk[]} prompt - This is the initial prompt spoken to the user at the start of an interaction. An - The desired InitialPrompt.
     * array of text chunks of type TTSChunk. See TTSChunk. The array must have at least
     * one item.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setInitialPrompt (prompt) {
        this._validateType(TTSChunk, prompt, true);
        this.setParameter(PerformInteraction.KEY_INITIAL_PROMPT, prompt);
        return this;
    }

    /**
     * Get the InitialPrompt
     * @returns {TTSChunk[]} - the KEY_INITIAL_PROMPT value
     */
    getInitialPrompt () {
        return this.getObject(TTSChunk, PerformInteraction.KEY_INITIAL_PROMPT);
    }

    /**
     * Set the InteractionMode
     * @param {InteractionMode} mode - See InteractionMode. - The desired InteractionMode.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setInteractionMode (mode) {
        this._validateType(InteractionMode, mode);
        this.setParameter(PerformInteraction.KEY_INTERACTION_MODE, mode);
        return this;
    }

    /**
     * Get the InteractionMode
     * @returns {InteractionMode} - the KEY_INTERACTION_MODE value
     */
    getInteractionMode () {
        return this.getObject(InteractionMode, PerformInteraction.KEY_INTERACTION_MODE);
    }

    /**
     * Set the InteractionChoiceSetIDList
     * @param {Number[]} list - List of interaction choice set IDs to use with an interaction. - The desired InteractionChoiceSetIDList.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setInteractionChoiceSetIDList (list) {
        this.setParameter(PerformInteraction.KEY_INTERACTION_CHOICE_SET_IDLIST, list);
        return this;
    }

    /**
     * Get the InteractionChoiceSetIDList
     * @returns {Number[]} - the KEY_INTERACTION_CHOICE_SET_IDLIST value
     */
    getInteractionChoiceSetIDList () {
        return this.getParameter(PerformInteraction.KEY_INTERACTION_CHOICE_SET_IDLIST);
    }

    /**
     * Set the HelpPrompt
     * @param {TTSChunk[]} prompt - Help text. This is the spoken string when a user speaks "help" when the interaction - The desired HelpPrompt.
     * is occurring. An array of text chunks of type TTSChunk. See TTSChunk. The array must
     * have at least one item.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setHelpPrompt (prompt) {
        this._validateType(TTSChunk, prompt, true);
        this.setParameter(PerformInteraction.KEY_HELP_PROMPT, prompt);
        return this;
    }

    /**
     * Get the HelpPrompt
     * @returns {TTSChunk[]} - the KEY_HELP_PROMPT value
     */
    getHelpPrompt () {
        return this.getObject(TTSChunk, PerformInteraction.KEY_HELP_PROMPT);
    }

    /**
     * Set the TimeoutPrompt
     * @param {TTSChunk[]} prompt - Timeout text. This text is spoken when a VR interaction times out. An array of text - The desired TimeoutPrompt.
     * chunks of type TTSChunk. See TTSChunk. The array must have at least one item.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setTimeoutPrompt (prompt) {
        this._validateType(TTSChunk, prompt, true);
        this.setParameter(PerformInteraction.KEY_TIMEOUT_PROMPT, prompt);
        return this;
    }

    /**
     * Get the TimeoutPrompt
     * @returns {TTSChunk[]} - the KEY_TIMEOUT_PROMPT value
     */
    getTimeoutPrompt () {
        return this.getObject(TTSChunk, PerformInteraction.KEY_TIMEOUT_PROMPT);
    }

    /**
     * Set the Timeout
     * @param {Number} timeout - Timeout in milliseconds. If omitted a standard value of 10000 milliseconds is used. - The desired Timeout.
     * Applies only to the menu portion of the interaction. The VR timeout will be handled by
     * the platform.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setTimeout (timeout) {
        this.setParameter(PerformInteraction.KEY_TIMEOUT, timeout);
        return this;
    }

    /**
     * Get the Timeout
     * @returns {Number} - the KEY_TIMEOUT value
     */
    getTimeout () {
        return this.getParameter(PerformInteraction.KEY_TIMEOUT);
    }

    /**
     * Set the VrHelp
     * @param {VrHelpItem[]} help - Ability to send suggested VR Help Items to display on-screen during Perform - The desired VrHelp.
     * Interaction. If omitted on supported displays, the default generated list of
     * suggested choices shall be displayed.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setVrHelp (help) {
        this._validateType(VrHelpItem, help, true);
        this.setParameter(PerformInteraction.KEY_VR_HELP, help);
        return this;
    }

    /**
     * Get the VrHelp
     * @returns {VrHelpItem[]} - the KEY_VR_HELP value
     */
    getVrHelp () {
        return this.getObject(VrHelpItem, PerformInteraction.KEY_VR_HELP);
    }

    /**
     * Set the InteractionLayout
     * @param {LayoutMode} layout - See LayoutMode. - The desired InteractionLayout.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setInteractionLayout (layout) {
        this._validateType(LayoutMode, layout);
        this.setParameter(PerformInteraction.KEY_INTERACTION_LAYOUT, layout);
        return this;
    }

    /**
     * Get the InteractionLayout
     * @returns {LayoutMode} - the KEY_INTERACTION_LAYOUT value
     */
    getInteractionLayout () {
        return this.getObject(LayoutMode, PerformInteraction.KEY_INTERACTION_LAYOUT);
    }

    /**
     * Set the CancelID
     * @param {Number} id - An ID for this specific PerformInteraction to allow cancellation through the - The desired CancelID.
     * `CancelInteraction` RPC.
     * @returns {PerformInteraction} - The class instance for method chaining.
     */
    setCancelID (id) {
        this.setParameter(PerformInteraction.KEY_CANCEL_ID, id);
        return this;
    }

    /**
     * Get the CancelID
     * @returns {Number} - the KEY_CANCEL_ID value
     */
    getCancelID () {
        return this.getParameter(PerformInteraction.KEY_CANCEL_ID);
    }
}

PerformInteraction.KEY_INITIAL_TEXT = 'initialText';
PerformInteraction.KEY_INITIAL_PROMPT = 'initialPrompt';
PerformInteraction.KEY_INTERACTION_MODE = 'interactionMode';
PerformInteraction.KEY_INTERACTION_CHOICE_SET_IDLIST = 'interactionChoiceSetIDList';
PerformInteraction.KEY_HELP_PROMPT = 'helpPrompt';
PerformInteraction.KEY_TIMEOUT_PROMPT = 'timeoutPrompt';
PerformInteraction.KEY_TIMEOUT = 'timeout';
PerformInteraction.KEY_VR_HELP = 'vrHelp';
PerformInteraction.KEY_INTERACTION_LAYOUT = 'interactionLayout';
PerformInteraction.KEY_CANCEL_ID = 'cancelID';

export { PerformInteraction };