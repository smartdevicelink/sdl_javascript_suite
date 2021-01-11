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

import { _Task } from '../../_Task';
import { ImageFieldName } from '../../../rpc/enums/ImageFieldName.js';
import { TextFieldName } from '../../../rpc/enums/TextFieldName.js';
import { DisplayType } from '../../../rpc/enums/DisplayType.js';
import { Choice } from '../../../rpc/structs/Choice.js';
import { CreateInteractionChoiceSet } from '../../../rpc/messages/CreateInteractionChoiceSet.js';
import { _ManagerUtility } from '../../_ManagerUtility.js';

class _PreloadChoicesOperation extends _Task {
    /**
     * Initializes an instance of _PreloadChoicesOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {String} displayName
     * @param {WindowCapability} defaultMainWindowCapability
     * @param {Boolean} isVrOptional - Whether core doesn't require VR commands
     * @param {ChoiceCell[]} cellsToPreload - Upload these
     * @param {function} completionListener - A callback function for operation updates. Passes back true or false for successful operation.
     */
    constructor (lifecycleManager = null, fileManager = null, displayName = null, defaultMainWindowCapability = null, isVrOptional, cellsToPreload = [], completionListener = null) {
        super('PreloadChoicesOperation');
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._displayName = displayName;
        this._defaultMainWindowCapability = defaultMainWindowCapability;
        this._isVrOptional = isVrOptional;
        this._cellsToPreload = cellsToPreload;
        this._completionListener = completionListener;
        // internal usage
        this._isRunning = false;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise}
     */
    async onExecute (task) {
        this._isRunning = true;
        await this._preloadCellArtworks();
        await this._preloadCells();
        this._isRunning = false;
        this.onFinished();
    }

    /**
     * Remove the choices that match the ones in the choices parameter
     * @param {ChoiceCell[]} choices - The choices to remove
     */
    _removeChoicesFromUpload (choices) {
        choices.forEach(choice => {
            for (let index = 0; index < this._cellsToPreload.length; index++) {
                if (choice.equals(this._cellsToPreload[index])) {
                    this._cellsToPreload.splice(index, 1);
                }
            }
        });
    }

    /**
     * Upload all cell artworks first
     * @returns {Promise} - Returns a boolean of whether the artwork uploading is a success
     */
    async _preloadCellArtworks () {
        const artworksToUpload = this._artworksToUpload();

        if (artworksToUpload.length === 0 || this._fileManager === null) {
            return false;
        }

        const uploadResults = await this._fileManager.uploadArtworks(artworksToUpload);
        if (uploadResults.includes(false)) {
            console.error('PreloadChoicesOperation: Error uploading choice cell artworks');
        }

        return uploadResults.includes(false);
    }

    /**
     * Uploade all the cells
     * @returns {Promise}
     */
    async _preloadCells () {
        const cicsRpcs = [];

        for (let index = 0; index < this._cellsToPreload.length; index++) {
            const cics = this._choiceFromCell(this._cellsToPreload[index]);
            if (cics !== null) {
                cicsRpcs.push(cics);
            }
        }

        if (cicsRpcs.length === 0) {
            console.error('PreloadChoicesOperation: All Choice cells to send are null, so the choice set will not be shown');
            this._completionListener(true);
            return;
        }

        if (this._lifecycleManager === null) {
            console.error('PreloadChoicesOperation: The LifecycleManager is null');
            this._completionListener(false);
            return;
        }

        const cicsPromises = cicsRpcs.map(cics => {
            return this._lifecycleManager.sendRpcResolve(cics);
        });

        const responses = await Promise.all(cicsPromises);
        let allSucceeded = true;
        // go through all responses and inspect their statuses
        for (let index = 0; index < responses.length; index++) {
            const response = responses[index];
            if (!response.getSuccess()) {
                allSucceeded = false;
                console.error(`PreloadChoicesOperation: There was an error uploading a choice cell: ${response.getInfo()} | resultCode: ${response.getResultCode()}`);
            }
        }
        // report whether all succeeded
        this._completionListener(allSucceeded);
    }

    /**
     * Makes a CICS out of a ChoiceCell
     * @param {ChoiceCell} cell - The ChoiceCell to use
     * @returns {CreateInteractionChoiceSet|null}
     */
    _choiceFromCell (cell) {
        let vrCommands = cell.getVoiceCommands();

        if (cell.getVoiceCommands() === null) {
            vrCommands = this._isVrOptional ? null : [`${cell._getChoiceId()}`]; // stringified choice id
        }

        const menuName = this._shouldSendChoiceText() ? cell.getText() : null;
        if (menuName === null) {
            console.error('PreloadChoicesOperation: Could not convert Choice Cell to CreateInteractionChoiceSet. It will not be shown');
            return null;
        }

        const secondaryText = this._checkCapability('hasTextFieldOfName', TextFieldName.secondaryText) ? cell.getSecondaryText() : null;
        const tertiaryText = this._checkCapability('hasTextFieldOfName', TextFieldName.tertiaryText) ? cell.getTertiaryText() : null;
        const image = this._checkCapability('hasImageFieldOfName', TextFieldName.choiceImage) && cell.getArtwork() !== null ? cell.getArtwork().getImageRPC() : null;
        const secondaryImage = this._checkCapability('hasImageFieldOfName', TextFieldName.choiceSecondaryImage) && cell.getSecondaryArtwork() !== null ? cell.getSecondaryArtwork().getImageRPC() : null;

        const choice = new Choice()
            .setChoiceID(cell._getChoiceId())
            .setMenuName(menuName)
            .setVrCommands(vrCommands)
            .setSecondaryText(secondaryText)
            .setTertiaryText(tertiaryText);
        // Java has a setIgnoreAddingVRItems method for Choice which ignores custom logic in Choice.format(). JS doesn't have that logic

        if (this._fileManager !== null) {
            if (image !== null && (cell.getArtwork().isStaticIcon() || this._fileManager.hasUploadedFile(cell.getArtwork()))) {
                choice.setImage(image);
            }
            if (secondaryImage !== null && (cell.getSecondaryArtwork().isStaticIcon() || this._fileManager.hasUploadedFile(cell.getSecondaryArtwork()))) {
                choice.setSecondaryImage(secondaryImage);
            }
        }

        return new CreateInteractionChoiceSet()
            .setInteractionChoiceSetID(choice.getChoiceID())
            .setChoiceSet([choice]);
    }

    /**
     * A helper method for calling _ManagerUtility methods
     * @returns {Boolean}
     */
    _checkCapability (method, value) {
        return this._defaultMainWindowCapability === null || _ManagerUtility[method](this._defaultMainWindowCapability, value);
    }

    /**
     * Whether a cell's text should be included in a choice cell
     * @returns {Boolean}
     */
    _shouldSendChoiceText () {
        if (this._displayName !== null && this._displayName === DisplayType.GEN3_8_INCH) {
            return true;
        }
        return this._checkCapability('hasTextFieldOfName', TextFieldName.menuName);
    }

    /**
     * Find all the applicable artworks in cells
     * @returns {Artwork[]}
     */
    _artworksToUpload () {
        const artworksToUpload = [];
        
        if (this._fileManager === null) {
            return artworksToUpload;
        }

        for (let index = 0; index < this._cellsToPreload.length; index++) {
            const cell = this._cellsToPreload[index];
            const primaryArtwork = cell.getArtwork();
            const secondaryArtwork = cell.getSecondaryArtwork();

            if (this._checkCapability('hasImageFieldOfName', ImageFieldName.choiceImage) && this._fileManager.fileNeedsUpload(primaryArtwork)) {
                artworksToUpload.push(primaryArtwork);
            }
            if (this._checkCapability('hasImageFieldOfName', ImageFieldName.choiceSecondaryImage) && this._fileManager.fileNeedsUpload(secondaryArtwork)) {
                artworksToUpload.push(secondaryArtwork);
            }
        }
        return artworksToUpload;
    }
}

export { _PreloadChoicesOperation };