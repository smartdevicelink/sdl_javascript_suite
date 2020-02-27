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

class BaseMenuManager extends BaseSubManager {
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
     * @param {DynamicMenuUpdatesMode} value
    */
    setDynamicUpdatesMode (value) {

    }

    /**
     * Creates and sends all associated Menu RPCs
     * @param {MenuCell[]} cells - the menu cells that are to be sent to the head unit, including their sub-cells.
    */
    setMenuCells (cells) {

    }

    /**
     * Returns current list of menu cells
     * @return {MenuCell[]} - a List of Currently set menu cells
    */
    getMenuCells () {

    }

    /**
     * @return {DynamicMenuUpdatesMode} - The currently set DynamicMenuUpdatesMode. It defaults to ON_WITH_COMPAT_MODE
    */
    getDynamicMenuUpdatesMode () {

    }

    /**
     * Opens the Main Menu
     * @return {Boolean}
    */
    openMenu () {

    }

    /**
     * Opens a subMenu. The cell you pass in must be constructed with {@link MenuCell(String,SdlArtwork,List)}
     * @param {MenuCell} cell - A <Strong>SubMenu</Strong> cell whose sub menu you wish to open
     * @return {Boolean}
    */
    openSubMenu (cell) {

    }

    /**
     * @param {Number} id
    */
    _sendOpenSubMenu (id) {

    }

    /**
     * This method is called via the screen manager to set the menuConfiguration.
     * This will be used when a menu item with sub-cells has a null value for menuConfiguration
     * @param {MenuConfiguration} menuConfiguration - The default menuConfiguration
    */
    setMenuConfiguration (menuConfiguration) {

    }

    /**
     * @return {MenuConfiguration}
    */
    getMenuConfiguration () {

    }

    _updateMenuAndDetermineBestUpdateMethod () {

    }

    /**
     * @param {DynamicMenuUpdatesMode} updateMode
     * @param {String} displayType
     * @return {Boolean}
    */
    _checkUpdateMode (updateMode, displayType) {

    }

    _deleteMenuWhenNewCellsEmpty () {

    }

    /**
     * @param {RunScore} bestRootScore
    */
    _dynamicallyUpdateRootMenu (bestRootScore) {

    }

    /**
     * @param {RPCRequest[]} deleteCommands
     * @param {MenuCell[]} updatedCells
    */
    _sendDynamicRootMenuRPCs (deleteCommands, updatedCells) {

    }

    _runSubMenuCompareAlgorithm () {

    }

    /**
     * @param {SubCellCommandList[]} commandLists
    */
    _createSubMenuDynamicCommands (commandLists) {

    }

    /**
     * @param {MenuCell[]} oldCells
     * @param {MenuCell[]} newCells
     * @return {RunScore}
    */
    _runMenuCompareAlgorithm (oldCells, newCells) {

    }

    /**
     * @param {MenuCell[]} oldCells
     * @param {MenuCell[]} newCells
     * @return {RunScore}
    */
    _compareOldAndNewLists (oldCells, newCells) {

    }

    /**
     * @param {Number} size
     * @param {Number[]} oldArray
    */
    _setDeleteStatus (size, oldArray) {

    }

    /**
     * @param {Number} size
     * @param {Number[]} newArray
    */
    _setAddStatus (size, newArray) {

    }

    /**
     * @param {MenuCell[]} cells
     * @return {SdlArtwork[]}
    */
    _findAllArtworksToBeUploadedFromCells (cells) {

    }

    /**
     * @return {Boolean}
    */
    _supportsImages () {

    }

    /**
     * @param {SdlArtwork} artwork
     * @return {Boolean}
    */
    _artworkNeedsUpload (artwork) {

    }

    /**
     * @param {MenuCell[]} dynamicCells
    */
    _updateIdsOnDynamicCells (dynamicCells) {

    }

    /**
     * @param {MenuCell[]} oldList
     * @param {MenuCell[]} dynamicCells
     * @param {Number} parentId
     * @return {MenuCell[]}
    */
    _updateIdsOnDynamicSubCells (oldList, dynamicCells, parentId) {

    }

    /**
     * @param {MenuCell[]} cells
     * @param {Number} parentId
    */
    _updateIdsOnMenuCells (cells, parentId) {

    }

    /**
     * @param {MenuCell[]} keeps
    */
    _transferIdsToKeptCells (keeps) {

    }

    /**
     * @param {MenuCell[]} old
     * @param {MenuCell[]} keeps
    */
    _transferIdsToKeptSubCells (old, keeps) {

    }

    /**
     * @param {MenuCell[]} cells
     * @return {RPCRequest[]}
    */
    _createDeleteRPCsForCells (cells) {

    }

    /**
     * @param {MenuCell[]} cellsToAdd
     * @param {Boolean} shouldHaveArtwork
     * @return {RPCRequest[]}
    */
    _mainMenuCommandsForCells (cellsToAdd, shouldHaveArtwork) {

    }

    /**
     * @param {MenuCell[]} cells
     * @param {Boolean} shouldHaveArtwork
     * @return {RPCRequest[]}
    */
    _subMenuCommandsForCells (cells, shouldHaveArtwork) {

    }

    /**
     * @param {MenuCell[]} cells
     * @param {Boolean} shouldHaveArtwork
     * @return {RPCRequest[]}
    */
    _allCommandsForCells (cells, shouldHaveArtwork) {

    }

    /**
     * @param {MenuCell[]} oldMenuCells
     * @param {MenuCell[]} cells
     * @param {Boolean} shouldHaveArtwork
     * @return {RPCRequest[]}
    */
    _createCommandsForDynamicSubCells (oldMenuCells, cells, shouldHaveArtwork) {

    }

    /**
     * @param {MenuCell} cell
     * @param {Boolean} shouldHaveArtwork
     * @param {Number} position
     * @return {AddCommand}
    */
    _commandForMenuCell (cell, shouldHaveArtwork, position) {

    }

    /**
     * @param {MenuCell} cell
     * @param {Boolean} shouldHaveArtwork
     * @param {Number} position
     * @return {AddSubMenu}
    */
    _subMenuCommandForMenuCell (cell, shouldHaveArtwork, position) {

    }

    /**
     * @param {MenuCell[]} cell
     * @param {OnCommand} command
     * @return {Boolean}
    */
    _callListenerForCells (cells, command) {

    }

    _addListeners () {

    }

    _createAndSendEntireMenu () {

    }

    /**
     * @param {MenuCell[]} menu
     * @return {Promise}
    */
    async _createAndSendMenuCellRPCs (menu) {

    }

    /**
     * @param {RPCRequest[]} commands
     * @return {Promise}
    */
    async _sendSubMenuCommandRPCs (commands) {

    }

    /**
     * @param {MenuCell[]} newMenu
     * @param {MenuCell[]} adds
     * @return {Promise}
    */
    async _createAndSendDynamicSubMenuRPCs (newMenu, adds) {

    }

    /**
     * @return {Promise}
    */
    async _deleteRootMenu () {

    }

    /**
     * @param {RPCRequest[]} deleteCommands
     * @return {Promise}
    */
    async _sendDeleteRPCs (deleteCommands) {

    }

    /**
     * @param {MenuCell[]} originalList
     * @return {MenuCell[]}
    */
    _cloneMenuCellsList (originalList) {

    }
}

export { BaseMenuManager };
