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
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
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

import { SoftButton } from '../../../rpc/structs/SoftButton';
import { SdlArtwork } from '../../file/filetypes/SdlArtwork';
import { SoftButtonState } from './SoftButtonState';

/**
 * SoftButtonObject define a button that can have multiple SoftButtonState values
 * The states of SoftButtonObject allow the developer to not have to manage multiple SoftButtons that have very similar functionality
 * For example, a repeat button in a music app can be thought of as one SoftButtonObject with three typical states: repeat off, repeat 1, and repeat on
 */

class SoftButtonObject {
    /**
     * Create a new instance of the SoftButtonObject with multiple states
     * @class
     * @param {String} name - a String value represents name of the object
     * @param {SoftButtonState|SoftButtonState[]} states - a list of SoftButtonState represents the SoftButtonState values for the object. States should be unique for every SoftButtonObject. A SoftButtonState instance cannot be reused for multiple SoftButtonObjects. A single state can also be passed in without putting it into an array.
     * @param {String} initialStateName - a String value represents the name for the initial state. Note: the initialStateName should match exactly the name of one of the states for the object.
     * @param {function} onEventListener - a listener that has a callback that will be triggered when a button event happens. The event can either be a ButtonPress or a ButtonEvent
     */
    constructor (name = null, states = [], initialStateName = null, onEventListener = null) {
        if (!Array.isArray(states)) {
            states = [states];
        }
        // Make sure there aren't two states with the same name
        if (this._hasTwoStatesOfSameName(states)) {
            throw new Error('Two states have the same name in states list for soft button object');
        }
        if (!states.map(state => state.getName()).includes(initialStateName)) {
            throw new Error('The initial state must match one of the state names');
        }

        this._name = name;
        this._states = states;
        this._currentStateName = initialStateName;
        this._buttonId = SoftButtonObject.SOFT_BUTTON_ID_NOT_SET_VALUE;
        this._onEventListener = onEventListener;
        this._updateListener = null;
    }

    /**
     * Transition the SoftButtonObject to a specific state
     * @param {String} newStateName - a String value represents the name fo the state that we want to transition the SoftButtonObject to
     * @returns {Boolean} - a boolean value that represents whether the transition succeeded or failed
     */
    transitionToStateByName (newStateName) {
        const newState = this._getStateByName(newStateName);
        if (newState === null) {
            console.error(`Attempted to transition to state: ${newStateName} on soft button object: ${this._name} but no state with that name was found`);
            return false;
        }
        this._currentStateName = newStateName;

        // Send a new Show RPC because the state has changed which means the actual SoftButton has changed
        if (typeof this._updateListener === 'function') {
            this._updateListener();
        } else {
            console.error(`_SoftButtonManager is not set for soft button object: ${this._name}. Update cannot be triggered`);
        }

        return true;
    }

    /**
     * Transition the SoftButtonObject to the next state
     */
    transitionToNextState () {
        const currentStateIndex = this._states.map(state => state.getName()).indexOf(this._currentStateName);
        const nextStateIndex = (currentStateIndex + 1) % this._states.length;
        this.transitionToStateByName(this._states[nextStateIndex].getName());
    }

    /**
     * Get the current state for the SoftButtonObject
     * @returns {SoftButtonState|null} - a SoftButtonState represents the current state
     */
    getCurrentState () {
        return this._getStateByName(this._currentStateName);
    }

    /**
     * Get the SoftButton object for the current state
     * @returns {SoftButton|null} - a SoftButton object that is associated with the current state
     */
    getCurrentStateSoftButton () {
        const currentState = this.getCurrentState();
        if (currentState === null || currentState.getSoftButton() === null) {
            return null;
        }

        const softButton = currentState.getSoftButton();
        softButton.setSoftButtonID(this._buttonId);
        return softButton;
    }

    /**
     * Find and get the SoftButtonState that has the provided name
     * @private
     * @param {String} stateName - a String value that represents the name of the state
     * @returns {SoftButtonState|null} - a SoftButtonState object that represents the state that has the provided name
     */
    _getStateByName (stateName) {
        if (stateName !== null && this._states !== null) {
            for (const state of this._states) {
                if (state.getName() === stateName) {
                    return state;
                }
            }
        }
        return null;
    }

    /**
     * Check if two SoftButtonStates have the same name
     * @private
     * @param {SoftButtonState[]} states - a list of SoftButtonState
     * @returns {Boolean} - a boolean value that represents whether we have two states with the same name
     */
    _hasTwoStatesOfSameName (states) {
        const nameSet = new Set();
        for (const state of states) {
            nameSet.add(state.getName());
        }
        // if any names were the same, then there would be less entries in the set than in the array
        return states.length !== nameSet.size;
    }

    /**
     * Set the _SoftButtonManager's update listener
     * @private
     * @param {function} updateListener - the _SoftButtonManager.UpdateListener object
     */
    _setUpdateListener (updateListener) {
        this._updateListener = updateListener;
    }

    /**
     * Get the name of the SoftButtonObject
     * @returns {String} - a String that represents the name of the SoftButtonObject
     */
    getName () {
        return this._name;
    }

    /**
     * Set the name of the SoftButtonObject
     * @param {String} name - a String that represents the name of the SoftButtonObject
     * @returns {SoftButtonObject} - A reference to this instance to support method chaining.
     */
    setName (name) {
        this._name = name;
        return this;
    }

    /**
     * Get the SoftButtonState list
     * @returns {SoftButtonState[]} - a list of the object's soft button states
     */
    getStates () {
        return this._states;
    }

    /**
     * Get the name of the current state
     * @returns {String|null} - a String that represents the name of the current state
     */
    getCurrentStateName () {
        return this._currentStateName;
    }

    /**
     * Get the id of the SoftButtonObject
     * @returns {Number} - an int value that represents the id of the SoftButtonObject
     */
    getButtonId () {
        return this._buttonId;
    }

    /**
     * Sets the id of the SoftButtonObject. Note: If the developer did not set buttonId, the manager will automatically assign an id before the SoftButtons are sent to the head unit. Please note that the manager may reuse ids from previous batch of SoftButtons that were already sent to the head unit
     * @private
     * @param {Number} buttonId - an int value that represents the id of the SoftButtonObject
     * @returns {SoftButtonObject} - A reference to this instance to support method chaining.
     */
    _setButtonId (buttonId) {
        if (buttonId < SoftButtonObject.SOFT_BUTTON_ID_MIN_VALUE) {
            console.error(`buttonId has to be equal to or more than ${SoftButtonObject.SOFT_BUTTON_ID_MIN_VALUE}`);
            return this;
        }
        if (buttonId > SoftButtonObject.SOFT_BUTTON_ID_MAX_VALUE) {
            console.error(`buttonId has to be equal to or less than ${SoftButtonObject.SOFT_BUTTON_ID_MAX_VALUE}`);
            return this;
        }
        this._buttonId = buttonId;
        return this;
    }

    /**
     * Get the event listener for the SoftButtonObject
     * @returns {function|null} - The event listener function.
     */
    getOnEventListener () {
        return this._onEventListener;
    }

    /**
     * Set the event listener for the SoftButtonObject
     * @param {function} onEventListener - a listener that has a callback that will be triggered when a button event or button press happens
     * @returns {SoftButtonObject} - A reference to this instance to support method chaining.
     */
    setOnEventListener (onEventListener) {
        this._onEventListener = onEventListener;
        return this;
    }

    /**
     * Creates a deep copy of the object
     * @returns {SoftButtonObject} deep copy of the object
     */
    clone () {
        const statesClone = this.getStates().map((state) => {
            const artwork = state.getArtwork();
            let artworkClone = null;
            if (artwork !== null && artwork !== undefined) {
                const jsonClone = JSON.parse(JSON.stringify(artwork));
                artworkClone = new SdlArtwork()
                    .setName(jsonClone._fileName)
                    .setFilePath(jsonClone._filePath)
                    .setFileData(jsonClone._fileData)
                    .setType(jsonClone._fileType)
                    .setPersistent(jsonClone._persistentFile)
                    .setStaticIcon(jsonClone._isStaticIcon)
                    .setTemplateImage(jsonClone._isTemplate)
                    .setOverwrite(jsonClone._overwrite);
            }
            const buttonState = new SoftButtonState(
                JSON.parse(JSON.stringify(state.getName())),
                JSON.parse(JSON.stringify(state.getSoftButton().getText())),
                artworkClone
            );

            buttonState._softButton.setSoftButtonID(state.getSoftButton().getSoftButtonID());

            buttonState.setHighlighted(JSON.parse(JSON.stringify(state.getHighlighted())));

            if (state.getSystemAction() !== null && state.getSystemAction() !== undefined) {
                buttonState.setSystemAction(JSON.parse(JSON.stringify(state.getSystemAction())));
            }

            return buttonState;
        });

        const artwork = this.getCurrentState().getArtwork();
        let artworkClone = null;
        if (artwork !== null && artwork !== undefined) {
            const jsonClone = JSON.parse(JSON.stringify(artwork));
            artworkClone = new SdlArtwork()
                .setName(jsonClone._fileName)
                .setFilePath(jsonClone._filePath)
                .setFileData(jsonClone._fileData)
                .setType(jsonClone._fileType)
                .setPersistent(jsonClone._persistentFile)
                .setStaticIcon(jsonClone._isStaticIcon)
                .setTemplateImage(jsonClone._isTemplate)
                .setOverwrite(jsonClone._overwrite);
        }

        const currentState = new SoftButtonState(
            JSON.parse(JSON.stringify(this.getCurrentStateName())),
            JSON.parse(JSON.stringify(this.getCurrentState().getSoftButton().getText())),
            artworkClone
        );
        currentState._softButton = new SoftButton(JSON.parse(JSON.stringify(this.getCurrentState().getSoftButton().getParameters())));
        currentState.setHighlighted(JSON.parse(JSON.stringify(this.getCurrentState().getHighlighted())));

        if (this.getCurrentState().getSystemAction() !== null && this.getCurrentState().getSystemAction() !== undefined) {
            currentState.setSystemAction(JSON.parse(JSON.stringify(this.getCurrentState().getSystemAction())));
        }
        const listenerClone = (this.getOnEventListener() !== undefined && this.getOnEventListener() !== null) ? this.getOnEventListener().bind({}) : null;
        const clone = new SoftButtonObject(
            JSON.parse(JSON.stringify(this.getName())),
            statesClone,
            currentState.getName(),
            listenerClone
        );
        if (this._updateListener !== null && this._updateListener !== undefined) {
            clone._setUpdateListener(this._updateListener.bind(clone));
        }

        clone._buttonId = JSON.parse(JSON.stringify(this.getButtonId()));
        return clone;
    }

    /**
     * Checks whether two SoftButtonObjects can be considered equivalent, but does NOT compare the listener objects
     * @param {SoftButtonObject} other - The object to compare
     * @returns {Boolean} - Whether the objects are the same or not
     */
    equals (other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (this === other) {
            return true;
        }
        if (!(other instanceof SoftButtonObject)) {
            return false;
        }
        if (this.getName() !== other.getName()) {
            return false;
        }
        const states = this.getStates();
        const otherStates = other.getStates();

        if ((states !== null && otherStates === null) || (states === null && otherStates !== null)) {
            return false;
        }
        if ((states !== null && otherStates !== null)) {
            if (states.length !== otherStates.length) {
                return false;
            }
            for (let index = 0; index < states.length; index++) {
                if (states[index] === null && otherStates[index] === null) {
                    continue;
                }
                if (states[index].getName() !== otherStates[index].getName()) {
                    return false;
                }
                if (states[index].getHighlighted() !== otherStates[index].getHighlighted()) {
                    return false;
                }
                if (states[index].getSystemAction() !== otherStates[index].getSystemAction()) {
                    return false;
                }
                if (states[index].getSoftButton().getType() !== otherStates[index].getSoftButton().getType()) {
                    return false;
                }
                if (states[index].getSoftButton().getText() !== otherStates[index].getSoftButton().getText()) {
                    return false;
                }
                if ((states[index].getSoftButton().getImage() === null && otherStates[index].getSoftButton().getImage() !== null) ||
                    (states[index].getSoftButton().getImage() !== null && otherStates[index].getSoftButton().getImage() === null)) {
                    return false;
                }
                if (states[index].getSoftButton().getImage() !== null && otherStates[index].getSoftButton().getImage() !== null) {
                    if (states[index].getSoftButton().getImage().getValueParam() !== otherStates[index].getSoftButton().getImage().getValueParam()) {
                        return false;
                    }
                    if (states[index].getSoftButton().getImage().getImageType() !== otherStates[index].getSoftButton().getImage().getImageType()) {
                        return false;
                    }
                    if (states[index].getSoftButton().getImage().getIsTemplate() !== otherStates[index].getSoftButton().getImage().getIsTemplate()) {
                        return false;
                    }
                }
                if (states[index].getSoftButton().getSoftButtonID() !== otherStates[index].getSoftButton().getSoftButtonID()) {
                    return false;
                }
                if ((states[index].getArtwork() === null && otherStates[index].getArtwork() !== null) ||
                    (states[index].getArtwork() !== null && otherStates[index].getArtwork() === null)) {
                    return false;
                }
                if (states[index].getArtwork() !== null && otherStates[index].getArtwork() !== null) {
                    // The SdlFile equals() method checks most but not all of the SdlArtwork fields
                    if (!states[index].getArtwork().equals(otherStates[index].getArtwork())) {
                        return false;
                    }
                    if (states[index].getArtwork().isTemplateImage() !== otherStates[index].getArtwork().isTemplateImage()) {
                        return false;
                    }
                }
            }
        }

        if (this.getCurrentStateName() !== other.getCurrentStateName()) {
            return false;
        }

        if (this.getButtonId() !== other.getButtonId()) {
            return false;
        }
        return true;
    }
}

SoftButtonObject.SOFT_BUTTON_ID_NOT_SET_VALUE = -1;
SoftButtonObject.SOFT_BUTTON_ID_MIN_VALUE = 0;
SoftButtonObject.SOFT_BUTTON_ID_MAX_VALUE = 65535;

export { SoftButtonObject };
