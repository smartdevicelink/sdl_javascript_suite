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

import { SubManagerBase } from '../SubManagerBase.js';

class ChoiceSetManagerBase extends SubManagerBase {
    /**
     * Initializes an instance of ChoiceSetManagerBase.
     * @constructor
     * @param {LifecycleManager} lifecycleManager
     * @param {FileManager} fileManager
    */
    constructor (lifecycleManager, fileManager) {
        super(lifecycleManager);
    }

    /**
     * @return {Promise}
    */
    async start () {

    }

    dispose () {

    }

    _checkVoiceOptional () {

    }

    /**
     * Preload choices to improve performance while presenting a choice set at a later time
     * @param {ChoiceCell[]} choices - a list of ChoiceCell objects that will be part of a choice set later
     * @return {Promise}
    */
    async preloadChoices (choices) {

    }

    /**
     * Deletes choices that were sent previously
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects
    */
    deleteChoices (choices) {

    }

    /**
     * Presents a choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @param {InteractionMode} mode - The intended interaction mode
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
    */
    presentChoiceSet (choiceSet, mode, keyboardListener) {

    }

    /**
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     * @param {InteractionMode} mode - The intended interaction mode
    */
    _sendPresentOperation (keyboardListener, mode) {

    }

    /**
     * Presents a keyboard on the Head unit to capture user input
     * @param {String} initialText - The initial text that is used as a placeholder text. It might not work on some head units.
     * @param {KeyboardProperties} customKeyboardConfig - the custom keyboard configuration to be used when the keyboard is displayed
     * @param {KeyboardListener} listener - A keyboard listener to capture user input
     * @return {Number} - A unique id that can be used to cancel this keyboard. If `null`, no keyboard was created.
    */
    presentKeyboard (initialText, customKeyboardConfig, listener) {

    }

    /**
     * Cancels the keyboard-only interface if it is currently showing. If the keyboard has not yet been sent to Core, it will not be sent.
     * This will only dismiss an already presented keyboard if connected to head units running SDL 6.0+.
     * @param {Number} cancelID - The unique ID assigned to the keyboard, passed as the return value from `presentKeyboard`
    */
    dismissKeyboard (cancelID) {

    }

    /**
     * Set a custom keyboard configuration for this session. If set to null, it will reset to default keyboard configuration.
     * @param {KeyboardProperties} keyboardConfiguration - the custom keyboard configuration to be used when the keyboard is displayed
    */
    setKeyboardConfiguration (keyboardConfiguration) {

    }

    /**
     * @return {Set.<ChoiceCell>} A set of choice cells that have been preloaded to the head unit
    */
    getPreloadedChoices () {

    }

    /**
     * @param {ChoiceCell[]} choices
     * @return {Set.<ChoiceCell>}
    */
    _choicesToBeDeletedWithArray (choices) {

    }

    /**
     * @param {ChoiceCell[]} choices
     * @return {Set.<ChoiceCell>}
    */
    _choicesToBeRemovedFromPendingWithArray (choices) {

    }

    /**
     * @param {Set.<ChoiceCell>} choices
    */
    _updateIdsOnChoices (choices) {

    }

    /**
     * @param {ChoiceSet} choiceSet
    */
    _findIdsOnChoiceSet (choiceSet) {

    }

    /**
     * @param {Set.<ChoiceCell>} choices
    */
    _findIdsOnChoices (choices) {

    }

    /**
     * @param {ChoiceCell} cell
     * @param {Set.<ChoiceCell>} set
     * @return {ChoiceCell}
    */
    _findIfPresent (cell, set) {

    }

    _addListeners () {

    }

    /**
     * @param {ChoiceSet} choiceSet
    */
    _setUpChoiceSet () {

    }

    /**
     * @return {KeyboardProperties}
    */
    _defaultKeyboardConfiguration () {

    }
}

export { ChoiceSetManagerBase };
