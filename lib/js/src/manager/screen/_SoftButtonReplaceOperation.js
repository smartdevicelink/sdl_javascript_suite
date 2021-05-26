/*
* Copyright (c) 2021, Livio, Inc.
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

import { _Task } from '../_Task';
import { Show } from '../../rpc/messages/Show.js';
import { SoftButton } from '../../rpc/structs/SoftButton.js';
import { SoftButtonType } from '../../rpc/enums/SoftButtonType.js';

class _SoftButtonReplaceOperation extends _Task {
    /**
     * Initializes an instance of _SoftButtonReplaceOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {SoftButtonCapabilities} softButtonCapabilities - The soft button capabilities
     * @param {SoftButtonObject[]} softButtonObjects - A list of soft button objects
     * @param {String} currentMainField1 - The main field value text shown on the head unit
     */
    constructor (lifecycleManager, fileManager = null, softButtonCapabilities = null, softButtonObjects = null, currentMainField1 = null) {
        super('SoftButtonTransitionOperation');
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._softButtonCapabilities = softButtonCapabilities;
        this._softButtonObjects = softButtonObjects;
        this._currentMainField1 = currentMainField1;
    }

    /**
     * Sets the main field text
     * @param {String} currentMainField1 - The main field value text shown on the head unit
     */
    setCurrentMainField1 (currentMainField1) {
        this._currentMainField1 = currentMainField1;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - This promise does not resolve to any value
     */
    async onExecute (task) {
        if (this.getState() === _Task.CANCELED) {
            this.onFinished();
            return;
        }

        // Check the state of our images
        if (!this._supportsSoftButtonImages()) {
            // We don't support images at all
            console.warn('SoftButtonTransitionOperation - Soft button images are not supported. Attempting to send text-only soft buttons. If any button does not contain text, no buttons will be sent.');
            // Send text buttons if all the soft buttons have text
            const success = await this._sendCurrentStateTextOnlySoftButtons();
            if (!success) {
                console.error('SoftButtonTransitionOperation - Head unit does not support images and some of the soft buttons do not have text, so none of the buttons will be sent.');
            }
        } else if (this._currentStateHasImages() && !this._allCurrentStateImagesAreUploaded()) {
            // If there are images that aren't uploaded
            // Send text buttons if all the soft buttons have text
            await this._sendCurrentStateTextOnlySoftButtons();

            // Upload initial images
            await this._uploadInitialStateImages();

            // Send initial soft buttons w/ images
            await this._sendCurrentStateSoftButtons();

            // Upload other images
            await this._uploadOtherStateImages();
        } else {
            // All the images are already uploaded. Send initial soft buttons w/ images.
            await this._sendCurrentStateSoftButtons();

            await this._uploadOtherStateImages();
        }

        this.onFinished();
    }

    /**
     * Returns text soft buttons representing the current states of the button objects, or returns if any of the buttons' current states are image only buttons.
     * @private
     * @returns {Promise} - Resolves to whether the operation is successful
     */
    async _sendCurrentStateTextOnlySoftButtons () {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }

        console.log('SoftButtonTransitionOperation - Preparing to send text-only soft buttons');
        const textButtons = [];

        for (const softButtonObject of this._softButtonObjects) {
            const softButton = softButtonObject.getCurrentStateSoftButton();
            if (softButton.getText() === null || softButton.getText() === undefined) {
                console.warn('SoftButtonTransitionOperation - Attempted to create text buttons, but some buttons don\'t support text, so no text-only soft buttons will be sent');
                return false;
            }
            // We should create a new softButtonObject rather than modifying the original one
            const textOnlySoftButton = new SoftButton()
                .setType(SoftButtonType.SBT_TEXT)
                .setText(softButton.getText())
                .setIsHighlighted(softButton.getIsHighlighted())
                .setSoftButtonID(softButton.getSoftButtonID())
                .setSystemAction(softButton.getSystemAction());

            textButtons.push(textOnlySoftButton);
        }

        if (this._lifecycleManager === null) {
            console.error('SoftButtonTransitionOperation: LifecycleManager is null');
            return false;
        }

        const show = new Show()
            .setMainField1(this._currentMainField1)
            .setSoftButtons(textButtons);

        const response = await this._lifecycleManager.sendRpcResolve(show);
        if (response.getSuccess()) {
            console.log('SoftButtonTransitionOperation - Finished sending text only soft buttons');
        } else {
            console.warn('SoftButtonTransitionOperation - Failed to update soft buttons with text buttons');
        }
        return response.getSuccess();
    }

    /**
     * Uploads soft buttons representing the current states of the button objects
     * @private
     * @returns {Promise} - Resolves to whether the operation is successful
     */
    async _sendCurrentStateSoftButtons () {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }
        console.log('SoftButtonTransitionOperation - Preparing to send full soft buttons');
        const softButtons = [];

        for (const softButtonObject of this._softButtonObjects) {
            softButtons.push(softButtonObject.getCurrentStateSoftButton());
        }

        if (this._lifecycleManager === null) {
            console.error('SoftButtonTransitionOperation: LifecycleManager is null');
            return false;
        }

        const show = new Show()
            .setMainField1(this._currentMainField1)
            .setSoftButtons(softButtons);

        const response = await this._lifecycleManager.sendRpcResolve(show);
        if (response.getSuccess()) {
            console.log('SoftButtonTransitionOperation - Finished sending full soft buttons');
        } else {
            console.warn('SoftButtonTransitionOperation - Failed to update soft buttons');
        }
        return response.getSuccess();
    }

    /**
     * Upload all soft button images, the initial state images first, then the other states. We need to send updates when the initial state is ready.
     * @private
     * @returns {Promise} - Resolves to whether the operation is successful
     */
    async _uploadInitialStateImages () {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }
        const initialStatesToBeUploaded = [];

        for (const softButtonObject of this._softButtonObjects) {
            const softButtonState = softButtonObject.getCurrentState();
            if (softButtonState !== null && this._fileManager.fileNeedsUpload(softButtonState.getArtwork())) {
                initialStatesToBeUploaded.push(softButtonState.getArtwork());
            }
        }

        if (initialStatesToBeUploaded.length === 0) {
            console.log('SoftButtonTransitionOperation: No initial state artworks to upload');
            return false;
        }

        console.log('SoftButtonTransitionOperation: Uploading soft button initial artworks');
        if (this._fileManager === null) {
            return false;
        }

        const successes = await this._fileManager.uploadArtworks(initialStatesToBeUploaded);
        if (successes.includes(false)) {
            console.error('SoftButtonTransitionOperation: Error uploading soft button artworks');
        } else {
            console.log('SoftButtonTransitionOperation: Soft button initial state artworks uploaded');
        }

        return !successes.includes(false);
    }

    /**
     * Upload all soft button images, the initial state images first, then the other states. We need to send updates when the initial state is ready.
     * @private
     * @returns {Promise} - Resolves to whether the operation is successful
     */
    async _uploadOtherStateImages () {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }
        const otherStatesToBeUploaded = [];

        for (const softButtonObject of this._softButtonObjects) {
            for (const softButtonState of softButtonObject.getStates()) {
                if (softButtonState.getName() !== softButtonObject.getCurrentState().getName() && this._fileManager.fileNeedsUpload(softButtonState.getArtwork())) {
                    otherStatesToBeUploaded.push(softButtonState.getArtwork());
                }
            }
        }

        if (otherStatesToBeUploaded.length === 0) {
            console.log('SoftButtonTransitionOperation: No other state artworks to upload');
            return false;
        }

        console.log('SoftButtonTransitionOperation: Uploading soft button other state artworks');
        if (this._fileManager === null) {
            return false;
        }

        const successes = await this._fileManager.uploadArtworks(otherStatesToBeUploaded);
        if (successes.includes(false)) {
            console.error('SoftButtonTransitionOperation: Error uploading soft button artworks');
        } else {
            console.log('SoftButtonTransitionOperation: Soft button other state artworks uploaded');
        }

        return !successes.includes(false);
    }

    /**
     * Checks if soft button images are supported
     * @private
     * @returns {Boolean} - Whether soft button images are supported
     */
    _supportsSoftButtonImages () {
        return this._softButtonCapabilities.getImageSupported();
    }

    /**
     * Checks whether the soft button objects contain images
     * @private
     * @returns {Boolean} - Whether the soft button objects contain images
     */
    _currentStateHasImages () {
        for (const softButtonObject of this._softButtonObjects) {
            if (softButtonObject.getCurrentState().getArtwork() !== null && softButtonObject.getCurrentState().getArtwork() !== undefined) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks whether all soft button images are uploaded
     * @private
     * @returns {Boolean} - Whether all soft button images are uploaded
     */
    _allCurrentStateImagesAreUploaded () {
        for (const softButtonObject of this._softButtonObjects) {
            const artwork = softButtonObject.getCurrentState().getArtwork();
            if (this._fileManager.fileNeedsUpload(artwork) && this._supportsSoftButtonImages()) {
                return false;
            }
        }
        return true;
    }
}

export { _SoftButtonReplaceOperation };