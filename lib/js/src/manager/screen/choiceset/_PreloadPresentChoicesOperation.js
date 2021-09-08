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
import { FunctionID } from '../../../rpc/enums/FunctionID.js';
import { KeyboardEvent } from '../../../rpc/enums/KeyboardEvent.js';
import { SetGlobalProperties } from '../../../rpc/messages/SetGlobalProperties.js';
import { PerformInteraction } from '../../../rpc/messages/PerformInteraction.js';
import { CancelInteraction } from '../../../rpc/messages/CancelInteraction.js';
import { LayoutMode } from '../../../rpc/enums/LayoutMode.js';
import { ChoiceSetLayout } from './enums/ChoiceSetLayout';
import { Choice } from '../../../rpc/structs/Choice.js';
import { CreateInteractionChoiceSet } from '../../../rpc/messages/CreateInteractionChoiceSet.js';
import { _ManagerUtility } from '../../_ManagerUtility.js';
import { ImageFieldName } from '../../../rpc/enums/ImageFieldName.js';
import { TextFieldName } from '../../../rpc/enums/TextFieldName.js';
import { DisplayType } from '../../../rpc/enums/DisplayType.js';
import { Enum } from '../../../util/Enum';
import { ChoiceCell } from './ChoiceCell';

class _PreloadPresentChoicesOperation extends _Task {
    /**
     * Initializes an instance of _PreloadPresentChoiceSetOperation
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {String} displayName - The display name
     * @param {WindowCapability} defaultMainWindowCapability - Returned from SystemCapabilityManager
     * @param {Boolean} isVrOptional - Whether core doesn't require VR commands
     * @param {ChoiceCell[]} cellsToPreload - Upload these
     * @param {ChoiceCell[]} loadedCells - Cells that have already been uploaded
     * @param {ChoiceSet} choiceSet - The choice set to present.
     * @param {InteractionMode} presentationMode - How the interaction is presented in the HMI
     * @param {KeyboardProperties} originalKeyboardProperties - The keyboard properties
     * @param {KeyboardListener} keyboardListener - For listening to keyboard events
     * @param {ChoiceSetSelectionListener} choiceSetSelectionListener - A callback function for selection updates
     * @param {Number} cancelId - The ID used to cancel the operation
     * @param {function} completionListener - A callback function for operation updates. Passes back true or false for successful operations.
     */
    constructor (lifecycleManager = null, fileManager = null, displayName = null,
        defaultMainWindowCapability = null, isVrOptional, cellsToPreload = [],
        loadedCells = [], choiceSet = null, presentationMode = null,
        originalKeyboardProperties, keyboardListener = null,
        choiceSetSelectionListener, cancelId, completionListener = null) {
        super('_PreloadPresentChoicesOperation');
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._displayName = displayName;
        this._defaultMainWindowCapability = defaultMainWindowCapability;
        this._isVrOptional = isVrOptional;
        this._cellsToPreload = cellsToPreload;
        this._loadedCells = loadedCells;
        this._completionListener = completionListener;
        this._currentState = _PreloadPresentChoicesOperationState.NOT_STARTED;
        this._choiceSet = choiceSet;

        if (choiceSet !== null) {
            this._choiceSet.setCanceledListener(() => {
                this._cancelInteraction();
            });
            this._presentationMode = presentationMode;
            this._originalKeyboardProperties = originalKeyboardProperties;
            this._keyboardListener = keyboardListener;
            this._choiceSetSelectionListener = choiceSetSelectionListener;
            this._cancelId = cancelId;

            this._sdlMsgVersion = lifecycleManager.getSdlMsgVersion();
            this._keyboardProperties = originalKeyboardProperties;
            this._selectedCellRow = null;
            this._selectedCell = null;
            this._selectedTriggerSource = null;
            this._updatedKeyboardProperties = null;
            this._keyboardRpcListener = null;
        }
        // internal usage
        this._isRunning = false;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     * @returns {Promise} - Does not resolve to any value
     */
    async onExecute (task) {
        if (this.getState() === _Task.CANCELED) {
            return;
        }
        this._isRunning = true;
        this._removeLoadedCellsFromPreload();
        this._assignIdsToCells(this._cellsToPreload);
        this._makeCellsToUploadUnique(this._cellsToPreload, this._loadedCells);
        if (this._choiceSet !== null) {
            this._updateChoiceSet(this._choiceSet, this._loadedCells, this._cellsToPreload);
        }
        const artworkSuccess = await this._preloadCellArtworks();
        if (!artworkSuccess) {
            await this._finishOperation(false);
            return;
        }
        const preloadSuccess = await this._preloadCells();
        if (!preloadSuccess) {
            await this._finishOperation(false);
            return;
        }
        if (this._choiceSet !== null) {
            await this._startPresent();
        }
        this._isRunning = false;

        await this._finishOperation();
    }

    /**
     * Updates the list of cells to be preloaded to not contain cells that have already been loaded
     */
    _removeLoadedCellsFromPreload () {
        const clonedLoadedCells = this._cloneChoiceCellList(this._loadedCells);
        this._cellsToPreload = this._cellsToPreload.filter((choice = null) => {
            if (choice === null) {
                return false;
            }
            const cellMatches = clonedLoadedCells.map((loadedCell) => {
                // the unique text is important for this comparison but it isn't checked by .equals()
                return choice.equals(loadedCell) && (choice._getUniqueTextId() === loadedCell._getUniqueTextId());
            });
            const cellIsLoaded = cellMatches.includes(true);
            if (cellIsLoaded) {
                // remove the first instance of this cell so we don't filter duplicates later
                clonedLoadedCells.splice(cellMatches.indexOf(true), 1);
            }
            return !cellIsLoaded;
        });
    }

    /**
     * Assign the next available choice IDs to the list of cells
     * @param {ChoiceCell[]} cells - A list of ChoiceCells
     */
    _assignIdsToCells (cells) {
        for (const cell of cells) {
            cell._setChoiceId(this._nextChoiceId());
        }
    }

    /**
     * Increments and returns the internal choice ID
     * @returns {Number} - The next available choice ID
     */
    _nextChoiceId () {
        if (_PreloadPresentChoicesOperation._choiceId === 65535) {
            _PreloadPresentChoicesOperation._choiceId = 0;
            _PreloadPresentChoicesOperation._hasReachedMaxIDs = true;
        }
        if (_PreloadPresentChoicesOperation._hasReachedMaxIDs) {
            // if we have the max amount of ids then return the maximum id
            // This should cause the request to fail due to a conflict with an existing choice id
            if (this._loadedCells.length === 65535) {
                return 65535;
            }

            // get the max used id and increment from there, if its the max possible then start looping
            const usedIds = this._loadedCells.map(cell => cell._getChoiceId());
            const maxId = Math.max(usedIds);
            if (maxId === 65535) {
                while (usedIds.includes(this._choiceId + 1)) {
                    ++this._choiceId;
                    if (_PreloadPresentChoicesOperation._choiceId > 65535) {
                        _PreloadPresentChoicesOperation._choiceId = 0;
                    }
                }
            } else {
                return maxId + 1;
            }
        }
        return ++_PreloadPresentChoicesOperation._choiceId;
    }

    /**
     * Makes all ChoiceCells unique before they are preloaded
     * @param {ChoiceCell[]} cellsToPreload - The ChoiceCells that will be preloaded by the current operation
     * @param {ChoiceCell[]} loadedCells - The ChoiceCells that have already been preloaded
     */
    _makeCellsToUploadUnique (cellsToPreload = [], loadedCells) {
        if (!Array.isArray(cellsToPreload) || cellsToPreload.length === 0) {
            return;
        }

        const strippedCellsToUpload = this._cloneChoiceCellList(cellsToPreload);
        const strippedLoadedCells = this._cloneChoiceCellList(loadedCells);

        const supportsChoiceUniqueness = this._lifecycleManager.getSdlMsgVersion() !== null && (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() < 7
            || (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() === 7 && this._lifecycleManager.getSdlMsgVersion().getMinorVersion() === 0));
        if (supportsChoiceUniqueness) {
            this._removeUnusedProperties(strippedCellsToUpload);
            this._removeUnusedProperties(strippedLoadedCells);
        }
        this._addUniqueNamesToCells(strippedCellsToUpload, strippedLoadedCells, supportsChoiceUniqueness);
        this._transferUniqueNamesFromCells(strippedCellsToUpload, cellsToPreload);
    }

    /**
     * Updates the current ChoiceSet to contain the cells that have either been preloaded or are going to be preloaded by the current operation
     * @param {ChoiceSet} choiceSet - The current ChoiceSet
     * @param {ChoiceCell[]} loadedCells - The ChoiceCells that have already been preloaded
     * @param {ChoiceCell[]} cellsToPreload - The ChoiceCells that will be preloaded by the current operation
     */
    _updateChoiceSet (choiceSet, loadedCells, cellsToPreload) {
        const choiceSetCells = [];
        const loadedCellsClone = this._cloneChoiceCellList(loadedCells);
        const cellsToPreloadClone = this._cloneChoiceCellList(cellsToPreload);

        for (const cell of choiceSet.getChoices()) {
            const loadedCellIndex = loadedCellsClone.findIndex((loadedCell) => {
                // the unique text is important for this comparison but it isn't checked by .equals()
                return cell.equals(loadedCell) && cell._getUniqueTextId() === loadedCell._getUniqueTextId();
            });
            const preloadCellIndex = cellsToPreloadClone.findIndex((cellToPreload) => {
                // the unique text is important for this comparison but it isn't checked by .equals()
                return cell.equals(cellToPreload) && cell._getUniqueTextId() === cellToPreload._getUniqueTextId();
            });
            if (loadedCellIndex >= 0) {
                choiceSetCells.push(loadedCellsClone[loadedCellIndex]);
                loadedCellsClone.splice(loadedCellIndex, 1);
                continue;
            }
            if (preloadCellIndex >= 0) {
                choiceSetCells.push(cellsToPreloadClone[preloadCellIndex]);
                cellsToPreloadClone.splice(preloadCellIndex, 1);
            }
        }
        this._choiceSet.setChoices(this._cloneChoiceCellList(choiceSetCells));
    }

    /**
     * Transfers the unique IDs from an array of ChoiceCells to another
     * @param {ChoiceCell[]} fromCells - An array of ChoiceCells
     * @param {ChoiceCell[]} toCells - An array of ChoiceCells
     */
    _transferUniqueNamesFromCells (fromCells, toCells) {
        for (let index = 0; index < fromCells.length; index++) {
            toCells[index]._setUniqueTextId(fromCells[index]._getUniqueTextId());
        }
    }

    /**
     * The method that presents the ChoiceSet after the choices have been preloaded
     */
    async _startPresent () {
        this._addListeners();

        if (this.getState() === _Task.CANCELED) {
            await this._finishOperation();
            return;
        }

        this._updateChoiceSetChoicesId();

        // Check if we're using a keyboard (searchable) choice set and setup keyboard properties if we need to
        if (this._keyboardListener !== null && this._choiceSet.getCustomKeyboardConfiguration() !== null) {
            this._keyboardProperties = this._choiceSet.getCustomKeyboardConfiguration();
            this._updatedKeyboardProperties = true;
        }

        const keyboardSuccess = await this._updateKeyboardProperties();
        if (!keyboardSuccess) {
            await this._finishOperation();
            return;
        }
        if (this.getState() === _Task.CANCELED) {
            await this._finishOperation();
            return;
        }

        await this._presentChoiceSet();
    }

    /**
     * Clones a list of choice cells
     * @param {ChoiceCell[]} originalList - A list of choice cells to be cloned
     * @returns {ChoiceCell[]|null} - The cloned cell list
     */
    _cloneChoiceCellList (originalList) {
        if (!Array.isArray(originalList)) {
            return null;
        }
        return originalList.map((choiceCell) => choiceCell.clone());
    }

    /**
     * Checks if 2 or more cells have the same text/title. In case this condition is true, this function will handle the presented issue by adding "(count)".
     * E.g. Choices param contains 2 cells with text/title "Address" will be handled by updating the uniqueText/uniqueTitle of the second cell to "Address (2)".
     * @param {ChoiceCell[]} cellsToUpload - A list of ChoiceCell objects to be uploaded
     * @param {ChoiceCell[]} loadedCells - A list of ChoiceCell objects that have already been uploaded
     * @param {Boolean} supportsChoiceUniqueness - Whether the connected head unit supports choice uniqueness
     */
    _addUniqueNamesToCells (cellsToUpload, loadedCells, supportsChoiceUniqueness) {
        // array of unique choice cells
        const cells = [];
        // array of the count of how many times each cell has been found
        const cellIdLists = [];
        loadedCells.forEach(loadedCell => {
            const cellKey = supportsChoiceUniqueness ? loadedCell : loadedCell.getText();
            const cellUniqueId = loadedCell._getUniqueTextId();
            const duplicateIndex = cells.findIndex(cell => {
                return (cell instanceof ChoiceCell && cell.equals(cellKey)) || (!(cellKey instanceof ChoiceCell) && cellKey === cell);
            });
            // find if a previous cell was a duplicate and update unique text of the current cell if so
            if (duplicateIndex >= 0) {
                cellIdLists[duplicateIndex].push(cellUniqueId);
            } else {
                cells.push(cellKey);
                cellIdLists.push([cellUniqueId]);
            }
        });

        for (const cellIdList of cellIdLists) {
            cellIdList.sort((id1, id2) => {
                return id1 - id2;
            });
        }

        for (const cell of cellsToUpload) {
            const cellKey = supportsChoiceUniqueness ? cell : cell.getText();
            const duplicateIndex = cells.findIndex(cell => {
                return (cellKey instanceof ChoiceCell && cellKey.equals(cell)) || (!(cellKey instanceof ChoiceCell) && cellKey === cell);
            });
            if (duplicateIndex >= 0) {
                const desiredIdList = cellIdLists[duplicateIndex];
                let lowestMissingUniqueId = desiredIdList[desiredIdList.length - 1] + 1;
                for (let index = 1; index < desiredIdList.length + 1; index++) {
                    if (index !== desiredIdList[index - 1]) {
                        lowestMissingUniqueId = index;
                        break;
                    }
                }
                cell._setUniqueTextId(lowestMissingUniqueId);
                cellIdLists[duplicateIndex].splice(lowestMissingUniqueId - 1, 0, lowestMissingUniqueId);
            } else {
                cells.push(cellKey);
                cellIdLists.push([cell._getUniqueTextId()]);
            }
        }
    }

    /**
     * Finds non-unique choice cells and updates their unique text accordingly
     * @param {ChoiceCell[]} strippedCells - Choice cells with their unsupported properties removed
     * @param {ChoiceCell[]} unstrippedCells - The original choice cells
     */
    _addUniqueNamesBasedOnStrippedCells (strippedCells, unstrippedCells) {
        if (!Array.isArray(strippedCells) || !Array.isArray(unstrippedCells) || strippedCells.length !== unstrippedCells.length) {
            return;
        }
        strippedCells.forEach((strippedCell, index) => {
        });
    }

    /**
     * Remove properties from ChoiceCells if they are not supported on the head unit
     * @param {ChoiceCell[]} choiceCells - The array of ChoiceCells to have its unused properties removed
     * @returns {ChoiceCell[]} - An array of ChoiceCells that has had its unsupported properties removed
     */
    _removeUnusedProperties (choiceCells) {
        const strippedCellsClone = this._cloneChoiceCellList(choiceCells);
        for (const cell of strippedCellsClone) {
            // Strip cell parameters that are not supported on head unit to support uniqueness.
            cell.setVoiceCommands(null);

            if (!this._hasTextFieldOfName(TextFieldName.secondaryText)) {
                cell.setSecondaryText(null);
            }
            if (!this._hasTextFieldOfName(TextFieldName.tertiaryText)) {
                cell.setTertiaryText(null);
            }
            if (!this._hasImageFieldOfName(ImageFieldName.choiceImage)) {
                cell.setArtwork(null);
            }
            if (!this._hasImageFieldOfName(ImageFieldName.choiceSecondaryImage)) {
                cell.setSecondaryArtwork(null);
            }
        }
        return strippedCellsClone;
    }

    /**
     * Check to see if WindowCapability has an ImageFieldName of a given name.
     * @private
     * @param {ImageFieldName} imageFieldName - Representing a name of a given Image field that would be stored in WindowCapability
     * @returns {Boolean} - True if the name exists in WindowCapability, otherwise false
     */
    _hasImageFieldOfName (imageFieldName) {
        return this._defaultMainWindowCapability === null || _ManagerUtility.hasImageFieldOfName(this._defaultMainWindowCapability, imageFieldName);
    }

    /**
     * Check to see if WindowCapability has a textField of a given name.
     * @private
     * @param {TextFieldName} textFieldName - Representing a name of a given text field that would be stored in WindowCapability
     * @returns {Boolean} - True if the name exists in WindowCapability, otherwise false
     */
    _hasTextFieldOfName (textFieldName) {
        return this._defaultMainWindowCapability === null || _ManagerUtility.hasTextFieldOfName(this._defaultMainWindowCapability, textFieldName);
    }

    /**
     * Upload all cell artworks first
     * @returns {Promise} - Returns a boolean of whether the artwork uploading is a success
     */
    async _preloadCellArtworks () {
        this._currentState = _PreloadPresentChoicesOperationState.UPLOADING_IMAGES;
        const artworksToUpload = this._artworksToUpload();

        if (artworksToUpload.length === 0) {
            return true;
        }

        if (this._fileManager === null) {
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
     * @returns {Promise} - Resolves to whether the preload was successful
     */
    async _preloadCells () {
        this._currentState = _PreloadPresentChoicesOperationState.UPLOADING_CHOICES;
        if (this._cellsToPreload.length === 0) {
            return true;
        }
        const cicsRpcs = [];

        for (let index = 0; index < this._cellsToPreload.length; index++) {
            const cics = this._choiceFromCell(this._cellsToPreload[index]);
            if (cics !== null) {
                cicsRpcs.push(cics);
            }
        }

        if (cicsRpcs.length === 0) {
            // Only log an error if this operation is preload-only
            if (this._choiceSet !== null) {
                console.error('PreloadChoicesOperation: All Choice cells to send are null, so the choice set will not be shown');
            }
            return true;
        }

        if (this._lifecycleManager === null) {
            console.error('PreloadChoicesOperation: The LifecycleManager is null');
            return false;
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
            } else {
                this._loadedCells.push(this._cellFromChoiceId(cicsRpcs[index].getInteractionChoiceSetID()));
            }
        }
        return allSucceeded;
    }

    /**
     * Makes a CICS out of a ChoiceCell
     * @param {ChoiceCell} cell - The ChoiceCell to use
     * @returns {CreateInteractionChoiceSet|null} - The CICS rpc, or null if the conversion fails
     */
    _choiceFromCell (cell) {
        let vrCommands = cell.getVoiceCommands();

        if (cell.getVoiceCommands() === null) {
            vrCommands = this._isVrOptional ? null : [`${cell._getChoiceId()}`]; // stringified choice id
        }

        const menuName = this._shouldSendChoiceText() ? cell._getUniqueText() : null;
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
     * @param {String} method - The string name of the _ManagerUtility method to invoke
     * @param {TextFieldName|ImageFieldName} value - The capability to check
     * @returns {Boolean} - Whether the capability is supported
     */
    _checkCapability (method, value) {
        return this._defaultMainWindowCapability === null || _ManagerUtility[method](this._defaultMainWindowCapability, value);
    }

    /**
     * Checks whether a cell's text should be included in a choice cell
     * @returns {Boolean} - Whether a cell's text should be included in a choice cell
     */
    _shouldSendChoiceText () {
        if (this._displayName !== null && this._displayName === DisplayType.GEN3_8_INCH) {
            return true;
        }
        return this._checkCapability('hasTextFieldOfName', TextFieldName.menuName);
    }

    /**
     * Find all the applicable artworks in cells
     * @returns {Artwork[]} - All the artworks to upload
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

    /**
     * Returns a ChoiceCell from the list of preloaded cells based on a given Choice ID
     * @param {Number} choiceId - The ID to be searched for
     * @returns {ChoiceCell|null} - The Choice with the given ID or null if one could not be found
     */
    _cellFromChoiceId (choiceId) {
        for (const cell of this._cellsToPreload) {
            if (cell._getChoiceId() === choiceId) {
                return cell;
            }
        }
        return null;
    }

    /**
     * Send requests to update global properties
     * @returns {Promise} - Resolves to a Boolean as to whether the update is successful
     */
    async _updateKeyboardProperties () {
        this._currentState = _PreloadPresentChoicesOperationState.UPDATING_KEYBOARD_PROPERTIES;
        if (this._keyboardProperties === null) {
            return true;
        }
        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: LifecycleManager is null');
            return false;
        }

        const setGlobalProperties = new SetGlobalProperties()
            .setKeyboardProperties(this._keyboardProperties);

        const response = await this._lifecycleManager.sendRpcResolve(setGlobalProperties);
        if (!response.getSuccess()) {
            console.error('PresentChoiceSetOperation: Error Setting keyboard properties');
            return false;
        }
        this._updatedKeyboardProperties = true;
        return true;
    }

    /**
     * Send a PerformInteraction request for the choiceset
     * @returns {Promise} - Does not resolve to any value
     */
    async _presentChoiceSet () {
        this._currentState = _PreloadPresentChoicesOperationState.PRESENTING_CHOICES;
        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: LifecycleManager is null');
            return;
        }

        const performInteraction = this._getPerformInteraction();

        const response = await this._lifecycleManager.sendRpcResolve(performInteraction);
        if (!response.getSuccess()) {
            console.error(`PresentChoiceSetOperation: Presenting Choice set failed: ${JSON.stringify(response)}`);
            if (this._choiceSetSelectionListener !== null) {
                this._choiceSetSelectionListener.onError(response.getInfo());
            }
            return;
        }

        this._setSelectedCellWithId(response.getChoiceID());
        this._selectedTriggerSource = response.getTriggerSource();

        if (this._choiceSetSelectionListener !== null && this._selectedCell !== null && this._selectedTriggerSource !== null && this._selectedCellRow !== null) {
            this._choiceSetSelectionListener.onChoiceSelected(this._selectedCell, this._selectedTriggerSource, this._selectedCellRow);
        }
    }

    /**
     * Teardown method
     * @param {Boolean} success - Whether cells were preloaded successfully
     * @returns {Promise} - Does not resolve to any value
     */
    async _finishOperation (success = true) {
        if (typeof this._completionListener === 'function') {
            this._completionListener(this._loadedCells, success);
        }

        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: LifecycleManager is null');
            this._currentState = _PreloadPresentChoicesOperationState.FINISHING;
            this.onFinished();
            return;
        }

        if (this._updatedKeyboardProperties) {
            this._currentState = _PreloadPresentChoicesOperationState.RESETTING_KEYBOARD_PROPERTIES;
            // We need to reset the keyboard properties
            const setGlobalProperties = new SetGlobalProperties()
                .setKeyboardProperties(this._originalKeyboardProperties);

            // detach the OnKeyboardInput listener at the end
            this._lifecycleManager.removeRpcListener(FunctionID.OnKeyboardInput, this._keyboardRpcListener);
            const response = await this._lifecycleManager.sendRpcResolve(setGlobalProperties);

            if (response.getSuccess()) {
                this._updatedKeyboardProperties = false;
            } else { // success
                console.error(`PresentChoiceSetOperation: Failed to reset choice keyboard properties to original config ${response.getResultCode()}, ${response.getInfo()}`);
            }
        }

        this._currentState = _PreloadPresentChoicesOperationState.FINISHING;
        this.onFinished();
    }

    /**
     * The choiceset is intended to be canceled. Handle it here
     */
    async _cancelInteraction () {
        if (this.getState() === _Task.FINISHED || this.getState() === _Task.CANCELED) {
            return;
        } else if (this.getState() === _Task.IN_PROGRESS) {
            if (this._currentState !== _PreloadPresentChoicesOperationState.PRESENTING_CHOICES) {
                console.log('PresentChoiceSetOperation: Canceling the operation before a present');
                this.switchStates(_Task.CANCELED);
                return;
            }
            if (this._sdlMsgVersion.getMajorVersion() < 6) {
                console.warn('PresentChoiceSetOperation: Canceling a presented choice set is not supported on this head unit');
                this.switchStates(_Task.CANCELED);
                return;
            }
            if (this._lifecycleManager === null) {
                console.error('PresentChoiceSetOperation: LifecycleManager is null');
                return;
            }

            const cancelInteraction = new CancelInteraction()
                .setFunctionIDParam(FunctionID.PerformInteraction)
                .setCancelID(this._cancelId);

            const response = await this._lifecycleManager.sendRpcResolve(cancelInteraction);
            if (!response.getSuccess()) {
                console.error('Canceled the presented choice set unsuccessfully');
            }
        } else { // Canceling a choice set that has not yet been sent to Core
            this.switchStates(_Task.CANCELED);
        }
    }

    // HELPER METHODS
    /**
     * Creates a PerformInteraction RPC
     * @returns {PerformInteraction} - The PerformInteraction RPC
     */
    _getPerformInteraction () {
        const pi = new PerformInteraction()
            .setInitialText(this._choiceSet.getTitle())
            .setInteractionMode(this._presentationMode)
            .setInteractionChoiceSetIDList(this._choiceSet.getChoices().map(choiceCell => choiceCell._getChoiceId()))
            .setTimeout(this._choiceSet.getTimeout() * 1000)
            .setInteractionLayout(this._getLayoutMode())
            .setCancelID(this._cancelId);

        if (Array.isArray(this._choiceSet.getInitialPrompt())) {
            pi.setInitialPrompt(this._choiceSet.getInitialPrompt());
        }
        if (Array.isArray(this._choiceSet.getHelpPrompt())) {
            pi.setHelpPrompt(this._choiceSet.getHelpPrompt());
        }
        if (Array.isArray(this._choiceSet.getTimeoutPrompt())) {
            pi.setTimeoutPrompt(this._choiceSet.getTimeoutPrompt());
        }
        if (Array.isArray(this._choiceSet.getVrHelpList())) {
            pi.setVrHelp(this._choiceSet.getVrHelpList());
        }
        return pi;
    }

    /**
     * Chooses the correct layout mode to use
     * @returns {LayoutMode} - The LayoutMode RPC
     */
    _getLayoutMode () {
        if (this._choiceSet.getLayout() === ChoiceSetLayout.CHOICE_SET_LAYOUT_LIST) {
            return this._keyboardListener !== null ? LayoutMode.LIST_WITH_SEARCH : LayoutMode.LIST_ONLY;
        } else if (this._choiceSet.getLayout() === ChoiceSetLayout.CHOICE_SET_LAYOUT_TILES) {
            return this._keyboardListener !== null ? LayoutMode.ICON_WITH_SEARCH : LayoutMode.ICON_ONLY;
        }
        return LayoutMode.LIST_ONLY; // default
    }

    /**
     * Given a cellId, finds the associated choice cell with the matching ID
     * @param {Number} cellId - The cell ID to search in choices
     */
    _setSelectedCellWithId (cellId = null) {
        const choiceCells = this._choiceSet.getChoices();
        if (choiceCells !== null && cellId !== null) {
            for (let index = 0; index < choiceCells.length; index++) {
                if (choiceCells[index]._getChoiceId() === cellId) {
                    this._selectedCell = choiceCells[index];
                    this._selectedCellRow = index;
                    return;
                }
            }
        }
    }

    _addListeners () {
        this._keyboardRpcListener = (onKeyboardInput) => {
            if (this.getState() === _Task.CANCELED) {
                this._finishOperation();
                return;
            }
            if (this._keyboardListener === null) {
                console.error('PresentChoiceSetOperation: Received keyboard input but listener is null');
                return;
            }
            this._keyboardListener.onKeyboardDidSendEvent(onKeyboardInput.getEvent(), onKeyboardInput.getData());

            if (onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_VOICE || onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_SUBMITTED) {
                // submit voice or text
                this._keyboardListener.onUserDidSubmitInput(onKeyboardInput.getData(), onKeyboardInput.getEvent());
            } else if (onKeyboardInput.getEvent() === KeyboardEvent.KEYPRESS) {
                // notify of keypress
                this._keyboardListener.updateAutocompleteWithInput(onKeyboardInput.getData(), updatedAutoCompleteList => {
                    this._keyboardProperties.setAutoCompleteList(updatedAutoCompleteList !== null && updatedAutoCompleteList !== undefined ? updatedAutoCompleteList : []);
                    // the following line should exist based on the _PresentKeyboardOperation's _addListeners method using nearly the exact same logic
                    this._keyboardProperties.setAutoCompleteText(Array.isArray(updatedAutoCompleteList) && updatedAutoCompleteList.length > 0 ? updatedAutoCompleteList[0] : null);
                    this._updateKeyboardProperties();
                });
                this._keyboardListener.updateCharacterSetWithInput(onKeyboardInput.getData(), updatedCharacterSet => {
                    this._keyboardProperties.setLimitedCharacterList(updatedCharacterSet);
                    this._updateKeyboardProperties();
                });
            } else if (onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_ABORTED || onKeyboardInput.getEvent() === KeyboardEvent.ENTRY_CANCELLED) {
                // notify of abort / cancelation
                this._keyboardListener.onKeyboardDidAbortWithReason(onKeyboardInput.getEvent());
            } else if (onKeyboardInput.getEvent() === KeyboardEvent.INPUT_KEY_MASK_ENABLED || onKeyboardInput.getEvent() === KeyboardEvent.INPUT_KEY_MASK_DISABLED) {
                this._keyboardListener.onKeyboardDidUpdateInputMask(onKeyboardInput.getEvent());
            }
        };

        if (this._lifecycleManager === null) {
            console.error('PresentChoiceSetOperation: Present Choice Set Keyboard Listener Not Added');
            return;
        }

        this._lifecycleManager.addRpcListener(FunctionID.OnKeyboardInput, this._keyboardRpcListener);
    }

    /**
     * Update the list of ChoiceCells with the IDs they were preloaded with
     */
    _updateChoiceSetChoicesId () {
        for (const cell of this._choiceSet.getChoices()) {
            const uploadCells = this._loadedCells.filter(loadedCell => {
                return loadedCell.equals(cell) && (cell._getUniqueText() === loadedCell._getUniqueText());
            });
            if (uploadCells.length === 0) {
                continue;
            }
            // There should only be one cell here since uniqueness is required
            cell._setChoiceId(uploadCells[0]._getChoiceId());
        }
    }

    setLoadedCells (loadedCells) {
        this._loadedCells = loadedCells;
    }
}

class _PreloadPresentChoicesOperationState extends Enum {
    /**
     * Initializes an instance of _PreloadPresentChoicesOperationState
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for NOT_STARTED.
     * @returns {String} - The enum value.
     */
    static get NOT_STARTED () {
        return _PreloadPresentChoicesOperationState._MAP.NOT_STARTED;
    }

    /**
     * Get the enum value for UPLOADING_IMAGES.
     * @returns {String} - The enum value.
     */
    static get UPLOADING_IMAGES () {
        return _PreloadPresentChoicesOperationState._MAP.UPLOADING_IMAGES;
    }

    /**
     * Get the enum value for UPLOADING_CHOICES.
     * @returns {String} - The enum value.
     */
    static get UPLOADING_CHOICES () {
        return _PreloadPresentChoicesOperationState._MAP.UPLOADING_CHOICES;
    }

    /**
     * Get the enum value for UPDATING_KEYBOARD_PROPERTIES.
     * @returns {String} - The enum value.
     */
    static get UPDATING_KEYBOARD_PROPERTIES () {
        return _PreloadPresentChoicesOperationState._MAP.UPDATING_KEYBOARD_PROPERTIES;
    }

    /**
     * Get the enum value for PRESENTING_CHOICES.
     * @returns {String} - The enum value.
     */
    static get PRESENTING_CHOICES () {
        return _PreloadPresentChoicesOperationState._MAP.PRESENTING_CHOICES;
    }

    /**
     * Get the enum value for CANCELLING_PRESENT_CHOICES.
     * @returns {String} - The enum value.
     */
    static get CANCELLING_PRESENT_CHOICES () {
        return _PreloadPresentChoicesOperationState._MAP.CANCELLING_PRESENT_CHOICES;
    }

    /**
     * Get the enum value for RESETTING_KEYBOARD_PROPERTIES.
     * @returns {String} - The enum value.
     */
    static get RESETTING_KEYBOARD_PROPERTIES () {
        return _PreloadPresentChoicesOperationState._MAP.RESETTING_KEYBOARD_PROPERTIES;
    }

    /**
     * Get the enum value for FINISHING.
     * @returns {String} - The enum value.
     */
    static get FINISHING () {
        return _PreloadPresentChoicesOperationState._MAP.FINISHING;
    }
}

_PreloadPresentChoicesOperationState._MAP = Object.freeze({
    'NOT_STARTED': 'NOT_STARTED',
    'UPLOADING_IMAGES': 'UPLOADING_IMAGES',
    'UPLOADING_CHOICES': 'UPLOADING_CHOICES',
    'UPDATING_KEYBOARD_PROPERTIES': 'UPDATING_KEYBOARD_PROPERTIES',
    'PRESENTING_CHOICES': 'PRESENTING_CHOICES',
    'CANCELLING_PRESENT_CHOICES': 'CANCELLING_PRESENT_CHOICES',
    'RESETTING_KEYBOARD_PROPERTIES': 'RESETTING_KEYBOARD_PROPERTIES',
    'FINISHING': 'FINISHING',
});

// reset these 2 if the operation is started with no loaded cells
_PreloadPresentChoicesOperation._hasReachedMaxIDs = false;
_PreloadPresentChoicesOperation._choiceId = 0;

_PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState = _PreloadPresentChoicesOperationState;

export { _PreloadPresentChoicesOperation };