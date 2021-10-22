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

import { _Task } from '../../_Task';
import { _DynamicMenuUpdateAlgorithm } from './_DynamicMenuUpdateAlgorithm';
import { _MenuReplaceUtilities } from './_MenuReplaceUtilities';
import { _MenuCellState } from './enums/_MenuCellState';
import { _ManagerUtility } from '../../_ManagerUtility.js';
import { ImageFieldName } from '../../../rpc/enums/ImageFieldName.js';
import { TextFieldName } from '../../../rpc/enums/TextFieldName.js';
import { _MenuManagerBase } from './_MenuManagerBase';

class _MenuReplaceOperation extends _Task {
    /**
     * Initializes an instance of _MenuReplaceOperation
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {FileManager} fileManager - A FileManager instance.
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {MenuConfiguration} menuConfiguration - The menu configuration
     * @param {MenuCell[]} currentMenu - The old menu cell state
     * @param {MenuCell[]} updatedMenu - The new menu cell state
     * @param {Boolean} isDynamicMenuUpdateActive - Whether dynamic menu cell updating is enabled
     * @param {_MenuManagerCompletionListener} operationCompletionListener - A callback for getting the boolean result of the operation
     */
    constructor (lifecycleManager = null, fileManager = null, windowCapability, menuConfiguration = null, currentMenu = null, updatedMenu = null, isDynamicMenuUpdateActive, operationCompletionListener) {
        super('MenuReplaceOperation');
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._windowCapability = windowCapability;
        this._menuConfiguration = menuConfiguration;
        this._currentMenu = currentMenu === null ? [] : currentMenu;
        this._updatedMenu = updatedMenu === null ? [] : updatedMenu;
        this._isDynamicMenuUpdateActive = isDynamicMenuUpdateActive;
        this._operationCompletionListener = operationCompletionListener;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     */
    async onExecute (task) {
        await this._start();
    }

    /**
     * If the task is not canceled, starts to assemble the show
     * @private
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            this.onFinished();
            return;
        }

        const success = await this._updateMenuCells();
        if (this._operationCompletionListener && typeof this._operationCompletionListener.onComplete === 'function') {
            this._operationCompletionListener.onComplete(success, this._currentMenu);
        }
        console.log('MenuReplaceOperation - Finishing menu manager replace operation');
        this.onFinished();
    }

    /**
     * Updates the cell menu state
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _updateMenuCells () {
        _MenuReplaceUtilities.addIdsToMenuCells(this._updatedMenu, _MenuManagerBase.PARENT_ID_NOT_FOUND);

        // Strip the "current menu" and the new menu of properties that are not displayed on the head unit
        const updatedStrippedMenu = this._cellsWithRemovedPropertiesFromCells(this._updatedMenu, this._windowCapability);
        const currentStrippedMenu = this._cellsWithRemovedPropertiesFromCells(this._currentMenu, this._windowCapability);

        // Check if head unit supports cells with duplicate titles
        const rpcVersion = this._lifecycleManager.getSdlMsgVersion();
        const supportsMenuUniqueness = rpcVersion.getMajorVersion() > 7 || (rpcVersion.getMajorVersion() === 7 && rpcVersion.getMinorVersion() > 0);

        // Generate unique names and ensure that all menus we are tracking have them so that we can properly compare when using the dynamic algorithm
        this._generateUniqueNamesForCells(updatedStrippedMenu, supportsMenuUniqueness);
        this._applyUniqueNamesOnCells(updatedStrippedMenu, this._updatedMenu);

        let runScore;

        if (!this._isDynamicMenuUpdateActive) {
            console.log('MenuReplaceOperation - Dynamic menu update is not active. Forcing the deletion of all old cells and adding new ones');
            runScore = _DynamicMenuUpdateAlgorithm.compatibilityRunScoreWithOldMenuCells(currentStrippedMenu, updatedStrippedMenu);
        } else {
            console.log('MenuReplaceOperation - Dynamic menu update is active. Running the algorithm to find the best way to delete / add cells.');
            runScore = _DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(currentStrippedMenu, updatedStrippedMenu);
        }

        // If both old and new menu cells are empty, then nothing needs to be done.
        if (runScore.isEmpty()) {
            return true;
        }

        const deleteMenuStatus = runScore.getOldStatus();
        const addMenuStatus = runScore.getUpdatedStatus();

        // Drop the cells into buckets based on the run score
        const cellsToDelete = this._filterMenuCellsWithStatusList(this._currentMenu, deleteMenuStatus, _MenuCellState.DELETE);
        const cellsToAdd = this._filterMenuCellsWithStatusList(this._updatedMenu, addMenuStatus, _MenuCellState.ADD);

        // These arrays should ONLY contain KEEPS. These will be used for SubMenu compares
        const oldKeeps = this._filterMenuCellsWithStatusList(this._currentMenu, deleteMenuStatus, _MenuCellState.KEEP);
        const newKeeps = this._filterMenuCellsWithStatusList(this._updatedMenu, addMenuStatus, _MenuCellState.KEEP);

        // Old kept cells ids need to be moved to the new kept cells so that submenu changes have correct parent ids
        // This is needed for the onCommands to still work
        _MenuReplaceUtilities.transferCellIdsFromCells(oldKeeps, newKeeps);
        // Transfer new cells' handlers to the old cells, which are stored in the current menu
        _MenuReplaceUtilities.transferCellListenersFromCells(newKeeps, oldKeeps);

        // Upload the Artworks, then we will start updating the main menu
        const success = await this._uploadMenuArtworks();
        if (this.getState() === _Task.CANCELED || !success) {
            return false;
        }

        const success2 = await this._updateMenuWithCellsToDelete(cellsToDelete, cellsToAdd);
        if (this.getState() === _Task.CANCELED || !success2) {
            return false;
        }

        return await this._updateSubMenuWithOldKeptCells(oldKeeps, newKeeps, 0);
    }

    /**
     * Finds all artwork to upload
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _uploadMenuArtworks () {
        const artworksToBeUploaded = _MenuReplaceUtilities.findAllArtworksToBeUploadedFromCells(this._updatedMenu, this._fileManager, this._windowCapability);
        if (artworksToBeUploaded.length === 0) {
            return true;
        }
        if (this._fileManager === null) {
            return false;
        }

        const results = await this._fileManager.uploadArtworks(artworksToBeUploaded);
        if (results.includes(false)) {
            console.error(`MenuReplaceOperation - Error uploading menu artworks: ${results}`);
        } else {
            console.log('MenuReplaceOperation - Menu artwork upload completed, beginning upload of main menu');
        }
        return !results.includes(false);
    }

    /**
     * Takes the main menu cells to delete and add, and deletes the current menu cells, then adds the new menu cells in the correct locations
     * @param {MenuCell[]} deleteCells - The cells that need to be deleted
     * @param {MenuCell[]} addCells - The cells that need to be added
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _updateMenuWithCellsToDelete (deleteCells, addCells) {
        await this._sendDeleteMenuCells(deleteCells);
        const success = await this._sendAddMenuCells(addCells, this._updatedMenu);
        if (!success) {
            console.error('MenuReplaceOperation - Error sending current menu');
        }
        return success;
    }

    /**
     * Takes the submenu cells that are old keeps and new keeps and determines which cells need to be deleted or added
     * @param {MenuCell[]} oldKeptCells - The old kept cells
     * @param {MenuCell[]} newKeptCells - The new kept cells
     * @param {Number} index - The index of the main menu to use
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _updateSubMenuWithOldKeptCells (oldKeptCells = [], newKeptCells = [], index) {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }

        if (oldKeptCells.length === 0 || index >= oldKeptCells.length) {
            return true;
        }

        if (oldKeptCells[index] !== null
            && oldKeptCells[index] !== undefined
            && oldKeptCells[index].isSubMenuCell()
            && oldKeptCells[index].getSubCells().length !== 0
            && newKeptCells[index] !== null
            && newKeptCells[index] !== undefined
            && newKeptCells[index].getSubCells() !== null) {
            const tempScore = _DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(oldKeptCells[index].getSubCells(), newKeptCells[index].getSubCells());

            // If both old and new menu cells are empty, then nothing needs to be done.
            if (tempScore === null) {
                // After the first set of submenu cells were added and deleted we must find the next set of sub cells until we loop through all the elements
                return this._updateSubMenuWithOldKeptCells(oldKeptCells, newKeptCells, index + 1);
            }

            const deleteMenuStatus = tempScore.getOldStatus();
            const addMenuStatus = tempScore.getUpdatedStatus();

            const cellsToDelete = this._filterMenuCellsWithStatusList(oldKeptCells[index].getSubCells(), deleteMenuStatus, _MenuCellState.DELETE);
            const cellsToAdd = this._filterMenuCellsWithStatusList(newKeptCells[index].getSubCells(), addMenuStatus, _MenuCellState.ADD);

            // These arrays should ONLY contain KEEPS. These will be used for SubMenu compares
            const oldKeeps = this._filterMenuCellsWithStatusList(oldKeptCells[index].getSubCells(), deleteMenuStatus, _MenuCellState.KEEP);
            const newKeeps = this._filterMenuCellsWithStatusList(newKeptCells[index].getSubCells(), addMenuStatus, _MenuCellState.KEEP);

            _MenuReplaceUtilities.transferCellListenersFromCells(newKeeps, oldKeeps);

            await this._sendDeleteMenuCells(cellsToDelete);
            await this._sendAddMenuCells(cellsToAdd, newKeptCells[index].getSubCells());

            // After the first set of submenu cells were added and deleted we must find the next set of sub cells until we loop through all the elements
            return this._updateSubMenuWithOldKeptCells(oldKeptCells, newKeptCells, index + 1);
        } else {
            // After the first set of submenu cells were added and deleted we must find the next set of sub cells until we loop through all the elements
            return this._updateSubMenuWithOldKeptCells(oldKeptCells, newKeptCells, index + 1);
        }
    }

    /**
     * Send Delete RPCs for given menu cells
     * @param {MenuCell[]} deleteMenuCells - The cells that need to be deleted
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _sendDeleteMenuCells (deleteMenuCells = null) {
        if (deleteMenuCells === null || deleteMenuCells.length === 0) {
            return true;
        }

        const deleteMenuCommands = _MenuReplaceUtilities.deleteCommandsForCells(deleteMenuCells);
        const errorArray = [];

        const requestPromises = deleteMenuCommands.map(request => {
            return this._lifecycleManager.sendRpcResolve(request)
                .then(response => {
                    if (response.getSuccess()) {
                        // Find the id of the successful request and remove it from the current menu list wherever it may have been
                        const commandId = _MenuReplaceUtilities.commandIdForRpcRequest(request);
                        _MenuReplaceUtilities.removeCellFromList(this._currentMenu, commandId);
                    } else {
                        errorArray.push({
                            request,
                            error: response.getInfo(),
                        });
                    }
                    return response;
                });
        });

        const responses = await Promise.all(requestPromises);
        const allSucceeded = !responses.map(response => response.getSuccess()).includes(false);

        if (!allSucceeded) {
            console.warn('MenuReplaceOperation - Unable to delete all old menu commands:');
            console.log(JSON.stringify(errorArray, null, 4)); // print like this so that the inner _parameters object shows
        } else {
            console.log('MenuReplaceOperation - Finished deleting old menu');
        }
        return allSucceeded;
    }

    /**
     * Send Add RPCs for given new menu cells compared to old menu cells
     * @param {MenuCell[]} addMenuCells - The new menu cells we want displayed
     * @param {MenuCell[]} fullMenu - The full menu from which the addMenuCells come. This allows us to grab the positions from that menu for the new cells
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _sendAddMenuCells (addMenuCells = null, fullMenu) {
        if (addMenuCells === null || addMenuCells.length === 0) {
            console.log('MenuReplaceOperation - There are no cells to update');
            return true;
        }

        const defaultSubmenuLayout = this._menuConfiguration !== null ? this._menuConfiguration.getSubMenuLayout() : null;
        // RPCs for cells on the main menu level. They could be AddCommands or AddSubMenus depending on whether the cell has child cells or not.
        const mainMenuCommands = _MenuReplaceUtilities.mainMenuCommandsForCells(addMenuCells, this._fileManager, fullMenu, this._windowCapability, defaultSubmenuLayout);
        // RPCs for cells on the second menu level (one level deep). They could be AddCommands or AddSubMenus.
        const subMenuCommands = _MenuReplaceUtilities.subMenuCommandsForCells(addMenuCells, this._fileManager, this._windowCapability, defaultSubmenuLayout);
        // the main menu commands and submenu commands could be combined into one list to reduce line code waste
        const errorArrayMain = [];

        const mainMenuPromises = mainMenuCommands.map(request => {
            return this._lifecycleManager.sendRpcResolve(request)
                .then(response => {
                    if (response.getSuccess()) {
                        // Find the id of the successful request and add it from the current menu list wherever it needs to be
                        const commandId = _MenuReplaceUtilities.commandIdForRpcRequest(request);
                        const position = _MenuReplaceUtilities.positionForRpcRequest(request);
                        _MenuReplaceUtilities.addCellWithCellId(commandId, position, addMenuCells, this._currentMenu);
                    } else {
                        errorArrayMain.push({
                            request,
                            error: response.getInfo(),
                        });
                    }
                    return response;
                });
        });

        const mainMenuResponses = await Promise.all(mainMenuPromises);

        const allMainMenuSucceeded = !mainMenuResponses.map(response => response.getSuccess()).includes(false);

        if (!allMainMenuSucceeded) {
            console.warn('MenuReplaceOperation - Failed to send main menu commands:');
            console.log(JSON.stringify(errorArrayMain, null, 4)); // print like this so that the inner _parameters object shows
            return false;
        } else if (subMenuCommands.length === 0) {
            console.log('MenuReplaceOperation - Finished sending new cells');
            return true;
        }

        const errorArraySub = [];
        const subMenuPromises = subMenuCommands.map(request => {
            return this._lifecycleManager.sendRpcResolve(request)
                .then(response => {
                    if (response.getSuccess()) {
                        // Find the id of the successful request and add it from the current menu list wherever it needs to be
                        const commandId = _MenuReplaceUtilities.commandIdForRpcRequest(request);
                        const position = _MenuReplaceUtilities.positionForRpcRequest(request);
                        _MenuReplaceUtilities.addCellWithCellId(commandId, position, addMenuCells, this._currentMenu);
                    } else {
                        errorArraySub.push({
                            request,
                            error: response.getInfo(),
                        });
                    }
                    return response;
                });
        });

        const subMenuResponses = await Promise.all(subMenuPromises);
        const allSubMenuSucceeded = !subMenuResponses.map(response => response.getSuccess()).includes(false);

        if (!allSubMenuSucceeded) {
            console.warn('MenuReplaceOperation - Failed to send sub menu commands:');
            console.log(JSON.stringify(errorArraySub, null, 4)); // print like this so that the inner _parameters object shows
            return false;
        }

        console.log('MenuReplaceOperation - Finished sending new cells');
        return allSubMenuSucceeded;
    }

    /**
     * Filters menu cells for a certain cell state
     * @param {MenuCell[]} menuCells - The menu cells
     * @param {MenuCellState[]} statusList - The state of the menu cells
     * @param {MenuCellState} menuCellState - The cell state to use for searching
     * @returns {MenuCell[]} - All menu cells with a state matching the menuCellState
     */
    _filterMenuCellsWithStatusList (menuCells, statusList, menuCellState) {
        const filteredCells = [];
        statusList.forEach((cellState, index) => {
            if (cellState === menuCellState) {
                filteredCells.push(menuCells[index]);
            }
        });
        return filteredCells;
    }

    /**
     * Cleans unusable properties from menu cells depending on window capabilities
     * @param {MenuCell[]} cells - The cells to clean
     * @param {WindowCapability} windowCapability - The window capabilities
     * @returns {MenuCell[]|null} - The cleaned menu cells, or null if the cells dont exist
     */
    _cellsWithRemovedPropertiesFromCells (cells = null, windowCapability) {
        if (cells === null) {
            return null;
        }
        const removePropertiesClone = cells.map(cell => cell.clone());
        removePropertiesClone.forEach(cell => {
            // Strip away fields that cannot be used to determine uniqueness visually including fields not supported by the HMI
            cell.setVoiceCommands(null);

            // Don't check ImageFieldName.subMenuIcon because it was added in 7.0 when the feature was added in 5.0.
            // Just assume that if cmdIcon is not available, the submenu icon is not either.
            if (!_ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.cmdIcon)) {
                cell.setIcon(null);
            }
            // Check for subMenu fields supported
            if (cell.isSubMenuCell()) {
                if (!_ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuSubMenuSecondaryText)) {
                    cell.setSecondaryText(null);
                }
                if (!_ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuSubMenuTertiaryText)) {
                    cell.setTertiaryText(null);
                }
                if (!_ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.menuSubMenuSecondaryImage)) {
                    cell.setSecondaryArtwork(null);
                }
                cell.setSubCells(this._cellsWithRemovedPropertiesFromCells(cell.getSubCells(), windowCapability));
            } else {
                if (!_ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuCommandSecondaryText)) {
                    cell.setSecondaryText(null);
                }
                if (!_ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuCommandTertiaryText)) {
                    cell.setTertiaryText(null);
                }
                if (!_ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.menuCommandSecondaryImage)) {
                    cell.setSecondaryArtwork(null);
                }
            }
        });

        return removePropertiesClone;
    }

    /**
     * Gives unique titles to all menu cells, based on the stripped cells' titles
     * @param {MenuCell[]} menuCells - The cells whose titles are hashed
     * @param {Boolean} supportsMenuUniqueness - Whether title uniqueness is supported
     */
    _generateUniqueNamesForCells (menuCells = null, supportsMenuUniqueness) {
        // applyUniqueNamesOnCells
        if (menuCells === null) {
            return;
        }
        // Tracks how many of each cell primary text there are so that we can append numbers to make each unique as necessary
        const dict = []; // if uniqueness supported, stores whole cells. otherwise, stores titles
        const dictCounter = []; // matches dict's values. Stores the number of repeating values for each dict element

        menuCells.forEach((cell, index) => {
            const key = supportsMenuUniqueness ? cell : cell.getTitle();
            const keyIndex = supportsMenuUniqueness ? dict.findIndex(menuCell => menuCell.equals(cell)) : dict.indexOf(key);

            if (keyIndex === -1) {
                dict.push(key); // unique
                dictCounter.push(1);
                cell._setUniqueTitle(`${cell.getTitle()}`);
            } else { // found a duplicate
                dictCounter[keyIndex] += 1;
                cell._setUniqueTitle(`${cell.getTitle()} (${dictCounter[keyIndex]})`);
            }

            if (cell.isSubMenuCell() && cell.getSubCells().length !== 0) {
                this._generateUniqueNamesForCells(cell.getSubCells(), supportsMenuUniqueness);
            }
        });
    }

    /**
     * Transfers titles from one list of menu cells to another
     * @param {MenuCell[]} fromMenuCells - The cells whose titles are transferred
     * @param {MenuCell[]} toMenuCells - The cells which receive the titles
     */
    _applyUniqueNamesOnCells (fromMenuCells = [], toMenuCells = []) {
        if (fromMenuCells.length !== toMenuCells.length) {
            return;
        }

        for (let index = 0; index < fromMenuCells.length; index++) {
            toMenuCells[index]._setUniqueTitle(fromMenuCells[index]._getUniqueTitle());
            if (fromMenuCells[index].isSubMenuCell() && fromMenuCells[index].getSubCells().length !== 0) {
                this._applyUniqueNamesOnCells(fromMenuCells[index].getSubCells(), toMenuCells[index].getSubCells());
            }
        }
    }

    /**
     * Sets the menu configuration
     * @param {MenuConfiguration} menuConfiguration - The menu configuration
     */
    _setMenuConfiguration (menuConfiguration) {
        this._menuConfiguration = menuConfiguration;
    }

    /**
     * Sets the current menu
     * @param {MenuCell[]} currentMenu - The current menu
     */
    _setCurrentMenu (currentMenu) {
        this._currentMenu = currentMenu;
    }

    /**
     * Sets the window capability
     * @param {WindowCapability} windowCapability - The window capability
     */
    _setWindowCapability (windowCapability) {
        this._windowCapability = windowCapability;
    }
}

export { _MenuReplaceOperation };