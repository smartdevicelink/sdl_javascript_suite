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
import { _DynamicMenuUpdateAlgorithm } from './_DynamicMenuUpdateAlgorithm';
import { _DynamicMenuUpdateRunScore } from './_DynamicMenuUpdateRunScore';
import { _MenuReplaceUtilities } from './_MenuReplaceUtilities';
import { _MenuCellState } from './enums/_MenuCellState';

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
    onExecute (task) {
        this._start();
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
        this.onFinished();
    }

    /**
     * Updates the cell menu state
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _updateMenuCells () {
        let runScore;

        if (this._isDynamicMenuUpdateActive) {
            console.log('MenuReplaceOperation - Dynamic menu update is active. Running the algorithm to find the best run score');
            runScore = _DynamicMenuUpdateAlgorithm.compareOldMenuCells(this._currentMenu, this._updatedMenu);
        } else {
            console.log('MenuReplaceOperation - Dynamic menu update is not active. Forcing the deletion of all old cells and adding new ones');
            runScore = new _DynamicMenuUpdateRunScore(_DynamicMenuUpdateAlgorithm.buildAllDeleteStatusesForMenu(this._currentMenu),
                _DynamicMenuUpdateAlgorithm.buildAllAddStatusesForMenu(this._updatedMenu),
                this._updatedMenu.length);
        }

        // If both old and new menu cells are empty, then nothing needs to be done.
        if (runScore === null) {
            return true;
        }

        const deleteMenuStatus = runScore.getOldStatus();
        const addMenuStatus = runScore.getUpdatedStatus();

        const cellsToDelete = this._filterMenuCellsWithStatusList(this._currentMenu, deleteMenuStatus, _MenuCellState.DELETE);
        const cellsToAdd = this._filterMenuCellsWithStatusList(this._updatedMenu, addMenuStatus, _MenuCellState.ADD);

        // These arrays should ONLY contain KEEPS. These will be used for SubMenu compares
        const oldKeeps = this._filterMenuCellsWithStatusList(this._currentMenu, deleteMenuStatus, _MenuCellState.KEEP);
        const newKeeps = this._filterMenuCellsWithStatusList(this._updatedMenu, addMenuStatus, _MenuCellState.KEEP);

        // Since we are creating a new Menu but keeping old cells we must first transfer the old cellIDs to the new menus kept cells.
        // This is needed for the onCommands to still work
        // We will transfer the ids for subCells later
        this._transferCellIdFromOldCells(oldKeeps, newKeeps);

        // Upload the Artworks
        const artworksToBeUploaded = _MenuReplaceUtilities.findAllArtworksToBeUploadedFromCells(this._updatedMenu, this._fileManager, this._windowCapability);
        if (artworksToBeUploaded.length !== 0 && this._fileManager !== null) {
            const results = await this._fileManager.uploadArtworks(artworksToBeUploaded);
            if (results.includes(false)) {
                console.error('MenuReplaceOperation - Error uploading menu artworks');
            } else {
                console.log('MenuReplaceOperation - Menu artworks uploaded');
            }
            await this._updateMenuWithCellsToDelete(cellsToDelete, cellsToAdd);
            return await this._updateSubMenuWithOldKeptCells(oldKeeps, newKeeps, 0);
        } else {
            // Cells have no artwork to load
            await this._updateMenuWithCellsToDelete(cellsToDelete, cellsToAdd);
            return await this._updateSubMenuWithOldKeptCells(oldKeeps, newKeeps, 0);
        }
    }

    /**
     * Takes the main menu cells to delete and add, and deletes the current menu cells, then adds the new menu cells in the correct locations
     * @param {MenuCell[]} deleteCells - The cells that need to be deleted
     * @param {MenuCell[]} addCells - The cells that need to be added
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _updateMenuWithCellsToDelete (deleteCells, addCells) {
        await this._sendDeleteCurrentMenu(deleteCells);
        const success = await this._sendNewMenuCells(addCells);
        if (!success) {
            console.error('MenuReplaceOperation - Error sending current menu');
        }
        return success;
    }

    /**
     * Send Delete RPCs for given menu cells
     * @param {MenuCell[]} deleteMenuCells - The cells that need to be deleted
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _sendDeleteCurrentMenu (deleteMenuCells = null) {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }

        if (deleteMenuCells === null || deleteMenuCells.length === 0) {
            return true;
        }

        const deleteMenuCommands = _MenuReplaceUtilities.deleteCommandsForCells(deleteMenuCells);

        const requestPromises = deleteMenuCommands.map(request => {
            return this._lifecycleManager.sendRpcResolve(request)
                .then(response => {
                    if (response.getSuccess()) {
                        // Find the id of the successful request and remove it from the current menu list wherever it may have been
                        const commandId = _MenuReplaceUtilities.commandIdForRpcRequest(request);
                        _MenuReplaceUtilities.removeMenuCellFromList(this._currentMenu, commandId);
                    }
                    return response;
                });
        });

        const responses = await Promise.all(requestPromises);
        const allSucceeded = !responses.map(response => response.getSuccess()).includes(false);

        if (!allSucceeded) {
            const errorInfos = responses.filter(response => !response.getSuccess()).map(response => response.getInfo());
            console.warn(`MenuReplaceOperation - Unable to delete all old menu commands: ${errorInfos}`);
        } else {
            console.log('MenuReplaceOperation - Finished deleting old menu');
        }
        return allSucceeded;
    }

    /**
     * Send Add RPCs for given new menu cells compared to old menu cells
     * @param {MenuCell[]} newMenuCells - The new menu cells we want displayed
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _sendNewMenuCells (newMenuCells = null) {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }

        if (newMenuCells === null || newMenuCells.length === 0) {
            console.log('MenuReplaceOperation - There are no cells to update');
            return true;
        }

        const defaultSubmenuLayout = this._menuConfiguration !== null ? this._menuConfiguration.getSubMenuLayout() : null;
        // RPCs for cells on the main menu level. They could be AddCommands or AddSubMenus depending on whether the cell has child cells or not.
        const mainMenuCommands = _MenuReplaceUtilities.mainMenuCommandsForCells(newMenuCells, this._fileManager, this._windowCapability, this._updatedMenu, defaultSubmenuLayout);
        // RPCs for cells on the second menu level (one level deep). They could be AddCommands or AddSubMenus.
        const subMenuCommands = _MenuReplaceUtilities.subMenuCommandsForCells(newMenuCells, this._fileManager, this._windowCapability, defaultSubmenuLayout);
        // the main menu commands and submenu commands could be combined into one list to reduce line code waste

        const mainMenuPromises = mainMenuCommands.map(request => {
            return this._lifecycleManager.sendRpcResolve(request)
                .then(response => {
                    if (response.getSuccess()) {
                        // Find the id of the successful request and add it from the current menu list wherever it needs to be
                        const commandId = _MenuReplaceUtilities.commandIdForRpcRequest(request);
                        const position = _MenuReplaceUtilities.positionForRpcRequest(request);
                        _MenuReplaceUtilities.addMenuRequestWithCommandId(commandId, position, newMenuCells, this._currentMenu);
                    }
                    return response;
                });
        });

        const mainMenuResponses = await Promise.all(mainMenuPromises);

        const allMainMenuSucceeded = !mainMenuResponses.map(response => response.getSuccess()).includes(false);

        if (!allMainMenuSucceeded) {
            const errorInfos = mainMenuResponses.filter(response => !response.getSuccess()).map(response => response.getInfo());
            console.warn(`MenuReplaceOperation - Failed to send main menu commands: ${errorInfos}`);
            return false;
        }

        if (this.getState() === _Task.CANCELED) {
            return false;
        }

        const subMenuPromises = subMenuCommands.map(request => {
            return this._lifecycleManager.sendRpcResolve(request)
                .then(response => {
                    if (response.getSuccess()) {
                        // Find the id of the successful request and add it from the current menu list wherever it needs to be
                        const commandId = _MenuReplaceUtilities.commandIdForRpcRequest(request);
                        const position = _MenuReplaceUtilities.positionForRpcRequest(request);
                        _MenuReplaceUtilities.addMenuRequestWithCommandId(commandId, position, newMenuCells, this._currentMenu);
                    }
                    return response;
                });
        });

        const subMenuResponses = await Promise.all(subMenuPromises);
        const allSubMenuSucceeded = !subMenuResponses.map(response => response.getSuccess()).includes(false);

        if (!allSubMenuSucceeded) {
            const errorInfos = subMenuResponses.filter(response => !response.getSuccess()).map(response => response.getInfo());
            console.warn(`MenuReplaceOperation - Failed to send sub menu commands: ${errorInfos}`);
            return false;
        }

        console.log('MenuReplaceOperation - Finished updating menu');
        return allSubMenuSucceeded;
    }

    /**
     * Takes the submenu cells that are old keeps and new keeps and determines which cells need to be deleted or added
     * @param {MenuCell[]} oldKeptCells - The old kept cells
     * @param {MenuCell[]} newKeptCells - The new kept cells
     * @param {Number} startIndex - The index of the main menu to use
     * @returns {Promise} - A promise resolving to a boolean as to whether the operation succeeded
     */
    async _updateSubMenuWithOldKeptCells (oldKeptCells = [], newKeptCells = [], startIndex) {
        if (this.getState() === _Task.CANCELED) {
            return false;
        }

        if (oldKeptCells.length === 0 || startIndex >= oldKeptCells.length) {
            return true;
        }

        if (oldKeptCells[startIndex] !== null
            && oldKeptCells[startIndex] !== undefined
            && _MenuReplaceUtilities.isSubMenuCell(oldKeptCells[startIndex])
            && oldKeptCells[startIndex].getSubCells().length !== 0
            && newKeptCells[startIndex] !== null
            && newKeptCells[startIndex] !== undefined
            && newKeptCells[startIndex].getSubCells() !== null) {
            const tempScore = _DynamicMenuUpdateAlgorithm.compareOldMenuCells(oldKeptCells[startIndex].getSubCells(), newKeptCells[startIndex].getSubCells());

            // If both old and new menu cells are empty, then nothing needs to be done.
            if (tempScore === null) {
                // After the first set of submenu cells were added and deleted we must find the next set of sub cells until we loop through all the elements
                return this._updateSubMenuWithOldKeptCells(oldKeptCells, newKeptCells, startIndex + 1);
            }

            const deleteMenuStatus = tempScore.getOldStatus();
            const addMenuStatus = tempScore.getUpdatedStatus();

            const cellsToDelete = this._filterMenuCellsWithStatusList(oldKeptCells[startIndex].getSubCells(), deleteMenuStatus, _MenuCellState.DELETE);
            const cellsToAdd = this._filterMenuCellsWithStatusList(newKeptCells[startIndex].getSubCells(), addMenuStatus, _MenuCellState.ADD);

            // These arrays should ONLY contain KEEPS. These will be used for SubMenu compares
            const oldKeeps = this._filterMenuCellsWithStatusList(oldKeptCells[startIndex].getSubCells(), deleteMenuStatus, _MenuCellState.KEEP);
            const newKeeps = this._filterMenuCellsWithStatusList(newKeptCells[startIndex].getSubCells(), addMenuStatus, _MenuCellState.KEEP);

            this._transferCellIdFromOldCells(oldKeeps, newKeeps);

            await this._sendDeleteCurrentMenu(cellsToDelete);
            await this._sendNewMenuCells(cellsToAdd);

            // After the first set of submenu cells were added and deleted we must find the next set of sub cells until we loop through all the elements
            return this._updateSubMenuWithOldKeptCells(oldKeptCells, newKeptCells, startIndex + 1);
        } else {
            // After the first set of submenu cells were added and deleted we must find the next set of sub cells until we loop through all the elements
            return this._updateSubMenuWithOldKeptCells(oldKeptCells, newKeptCells, startIndex + 1);
        }
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
     * Moves cells IDs from old to new menu cells
     * @param {MenuCell[]} oldCells - The old menu cells
     * @param {MenuCell[]} newCells - The new menu cells
     */
    _transferCellIdFromOldCells (oldCells = null, newCells = null) {
        if (oldCells === null || oldCells.length === 0 || newCells === null) {
            return;
        }
        newCells.forEach((newCell, index) => {
            newCell._setCellId(oldCells[index]._getCellId());
        });
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