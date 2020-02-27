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

import { BaseSubManager } from '../BaseSubManager.js';

class BaseSoftButtonManager extends BaseSubManager {
    /**
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

    /**
     * Get the SoftButtonObject that has the provided name
     * @param {String} name - a String value that represents the name
     * @return {SoftButtonObject} - a SoftButtonObject
    */
    _getSoftButtonObjectByName (name) {

    }

    /**
     * Get the SoftButtonObject that has the provided buttonId
     * @param {Number} buttonId - a int value that represents the id of the button
     * @return {SoftButtonObject} - a SoftButtonObject
    */
    getSoftButtonObjectById (buttonId) {

    }

    /**
     * Get the soft button objects list
     * @return {SoftButtonObject[]} - a List<SoftButtonObject>
    */
    _getSoftButtonObjects () {

    }

    /**
     * Set softButtonObjects list and upload the images to the head unit
     * @param {SoftButtonObject[]} list - the list of the SoftButtonObject values that should be displayed on the head unit
    */
    _setSoftButtonObjects (list) {

    }

    /**
     * Check if there is a collision in the ids provided by the developer and assign ids to the SoftButtonObjects that do not have ids
     * @param {SoftButtonObject[]} softButtonObjects - the list of the SoftButtonObject values that should be displayed on the head unit
     * @return {Boolean} - boolean representing whether the ids are unique or not
    */
    _checkAndAssignButtonIds (softButtonObjects) {

    }

    /**
     * Update the SoftButtonManger by sending a new Show RPC to reflect the changes
     * @return {Promise}
    */
    async _update () {

    }

    /**
     * @return {Boolean}
    */
    _softButtonImagesSupported () {

    }

    /**
     * Check if two SoftButtonObject have the same name
     * @param {SoftButtonObject} softButtonObjects - a list of SoftButton objects that will be iterated through
     * @return {Boolean}
    */
    _hasTwoSoftButtonObjectsOfSameName (softButtonObjects) {

    }

    /**
     * Get the current String associated with MainField1
     * @return {String} - the string that is currently used for MainField1
    */
    _getCurrentMainField1 () {

    }

    /**
     * Sets the String to be associated with MainField1
     * @param {String} currentMainField1 - the String that will be set to TextField1 on the current template
    */
    _setCurrentMainField1 (currentMainField1) {

    }

    /**
     * Sets the batchUpdates flag that represents whether the manager should wait until commit() is called to send the updated show RPC
     * @param {Boolean} - batchUpdates Set true if the manager should batch updates together, or false if it should send them as soon
     *                     as they happen
    */
    _setBatchUpdates (batchUpdates) {

    }

    /**
     * Check if the current state for any SoftButtonObject has images
     * @return {Boolean} - a boolean value
    */
    _currentStateHasImages () {

    }

    /**
     * Check if the current state for any SoftButtonObject has images that are not uploaded yet
     * @return {Boolean} - a boolean value
    */
    _allCurrentStateImagesAreUploaded () {

    }

    /**
     * Check if the current state for any SoftButtonObject has images that are not uploaded yet
     * @param {SdlArtwork} artwork
     * @return {Boolean} - a boolean value
    */
    _sdlArtworkNeedsUpload (artwork) {

    }

    /**
     * Returns text soft buttons representing the initial states of the button objects, or null if _any_ of the buttons' current states are image only buttons.
     * @return {SoftButton[]} - The text soft buttons
    */
    _createTextSoftButtonsForCurrentState () {

    }

    /**
     * Returns a list of the SoftButton for the SoftButtonObjects' current state
     * @return {SoftButton[]}
    */
    _createSoftButtonsForCurrentState () {

    }
}

export { BaseSoftButtonManager };
