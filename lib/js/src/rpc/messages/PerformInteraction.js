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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.PerformInteraction);
    }

    /**
     * @param {String} text - Text to be displayed first.
     * @return {PerformInteraction}
     */
    setInitialText (text) {
        this.setParameter(PerformInteraction.KEY_INITIAL_TEXT, text);
        return this;
    }

    /**
     * @return {String}
     */
    getInitialText () {
        return this.getParameter(PerformInteraction.KEY_INITIAL_TEXT);
    }

    /**
     * @param {TTSChunk[]} prompt - This is the initial prompt spoken to the user at the start of an interaction. An
     *                              array of text chunks of type TTSChunk. See TTSChunk. The array must have at least
     *                              one item.
     * @return {PerformInteraction}
     */
    setInitialPrompt (prompt) {
        this.validateType(TTSChunk, prompt, true);
        this.setParameter(PerformInteraction.KEY_INITIAL_PROMPT, prompt);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getInitialPrompt () {
        return this.getObject(TTSChunk, PerformInteraction.KEY_INITIAL_PROMPT);
    }

    /**
     * @param {InteractionMode} mode - See InteractionMode.
     * @return {PerformInteraction}
     */
    setInteractionMode (mode) {
        this.validateType(InteractionMode, mode);
        this.setParameter(PerformInteraction.KEY_INTERACTION_MODE, mode);
        return this;
    }

    /**
     * @return {InteractionMode}
     */
    getInteractionMode () {
        return this.getObject(InteractionMode, PerformInteraction.KEY_INTERACTION_MODE);
    }

    /**
     * @param {Number[]} list - List of interaction choice set IDs to use with an interaction.
     * @return {PerformInteraction}
     */
    setInteractionChoiceSetIDList (list) {
        this.setParameter(PerformInteraction.KEY_INTERACTION_CHOICE_SET_IDLIST, list);
        return this;
    }

    /**
     * @return {Number[]}
     */
    getInteractionChoiceSetIDList () {
        return this.getParameter(PerformInteraction.KEY_INTERACTION_CHOICE_SET_IDLIST);
    }

    /**
     * @param {TTSChunk[]} prompt - Help text. This is the spoken string when a user speaks "help" when the interaction
     *                              is occurring. An array of text chunks of type TTSChunk. See TTSChunk. The array must
     *                              have at least one item.
     * @return {PerformInteraction}
     */
    setHelpPrompt (prompt) {
        this.validateType(TTSChunk, prompt, true);
        this.setParameter(PerformInteraction.KEY_HELP_PROMPT, prompt);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getHelpPrompt () {
        return this.getObject(TTSChunk, PerformInteraction.KEY_HELP_PROMPT);
    }

    /**
     * @param {TTSChunk[]} prompt - Timeout text. This text is spoken when a VR interaction times out. An array of text
     *                              chunks of type TTSChunk. See TTSChunk. The array must have at least one item.
     * @return {PerformInteraction}
     */
    setTimeoutPrompt (prompt) {
        this.validateType(TTSChunk, prompt, true);
        this.setParameter(PerformInteraction.KEY_TIMEOUT_PROMPT, prompt);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getTimeoutPrompt () {
        return this.getObject(TTSChunk, PerformInteraction.KEY_TIMEOUT_PROMPT);
    }

    /**
     * @param {Number} timeout - Timeout in milliseconds. If omitted a standard value of 10000 milliseconds is used.
     *                           Applies only to the menu portion of the interaction. The VR timeout will be handled by
     *                           the platform.
     * @return {PerformInteraction}
     */
    setTimeout (timeout) {
        this.setParameter(PerformInteraction.KEY_TIMEOUT, timeout);
        return this;
    }

    /**
     * @return {Number}
     */
    getTimeout () {
        return this.getParameter(PerformInteraction.KEY_TIMEOUT);
    }

    /**
     * @param {VrHelpItem[]} help - Ability to send suggested VR Help Items to display on-screen during Perform
     *                              Interaction. If omitted on supported displays, the default generated list of
     *                              suggested choices shall be displayed.
     * @return {PerformInteraction}
     */
    setVrHelp (help) {
        this.validateType(VrHelpItem, help, true);
        this.setParameter(PerformInteraction.KEY_VR_HELP, help);
        return this;
    }

    /**
     * @return {VrHelpItem[]}
     */
    getVrHelp () {
        return this.getObject(VrHelpItem, PerformInteraction.KEY_VR_HELP);
    }

    /**
     * @param {LayoutMode} layout - See LayoutMode.
     * @return {PerformInteraction}
     */
    setInteractionLayout (layout) {
        this.validateType(LayoutMode, layout);
        this.setParameter(PerformInteraction.KEY_INTERACTION_LAYOUT, layout);
        return this;
    }

    /**
     * @return {LayoutMode}
     */
    getInteractionLayout () {
        return this.getObject(LayoutMode, PerformInteraction.KEY_INTERACTION_LAYOUT);
    }

    /**
     * @param {Number} id - An ID for this specific PerformInteraction to allow cancellation through the
     *                      `CancelInteraction` RPC.
     * @return {PerformInteraction}
     */
    setCancelID (id) {
        this.setParameter(PerformInteraction.KEY_CANCEL_ID, id);
        return this;
    }

    /**
     * @return {Number}
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