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
import { _ManagerUtility } from '../../_ManagerUtility.js';
import { ImageFieldName } from '../../../rpc/enums/ImageFieldName.js';
import { TextFieldName } from '../../../rpc/enums/TextFieldName.js';
import { AddCommand } from '../../../rpc/messages/AddCommand.js';
import { AddSubMenu } from '../../../rpc/messages/AddSubMenu.js';
import { DeleteCommand } from '../../../rpc/messages/DeleteCommand.js';
import { DeleteSubMenu } from '../../../rpc/messages/DeleteSubMenu.js';
import { MenuParams } from '../../../rpc/structs/MenuParams.js';
import { _MenuManagerBase } from './_MenuManagerBase.js';


class _MenuReplaceUtilities {
    /**
     * Increments the menu ID and returns it
     * @returns {Number} - The next usable ID
     */
    static getNextMenuId () {
        _MenuReplaceUtilities._menuId += 1;
        return _MenuReplaceUtilities._menuId;
    }

    /**
     * Assign cell ids on an array of menu cells given a parent id (or no parent id)
     * @param {MenuCell[]} menuCells - The menu cell list to update
     * @param {Number} parentId - The parent id to assign if needed
     */
    static addIdsToMenuCells (menuCells, parentId) {
        for (const cell of menuCells) {
            cell._setCellId(_MenuReplaceUtilities.getNextMenuId());
            if (parentId !== _MenuManagerBase.PARENT_ID_NOT_FOUND) {
                cell._setParentCellId(parentId);
            }
            if (cell.isSubMenuCell() && cell.getSubCells().length !== 0) {
                _MenuReplaceUtilities.addIdsToMenuCells(cell.getSubCells(), cell._getCellId());
            }
        }
    }

    /**
     * Moves cells IDs from old to new menu cells
     * @param {MenuCell[]} fromCells - The old menu cells
     * @param {MenuCell[]} toCells - The new menu cells
     */
    static transferCellIdsFromCells (fromCells = null, toCells = null) {
        if (fromCells === null || toCells === null || fromCells.length === 0 || fromCells.length !== toCells.length) {
            return;
        }
        toCells.forEach((newCell, index) => {
            newCell._setCellId(fromCells[index]._getCellId());
            // Update parent ids
            if (!newCell.isSubMenuCell()) {
                return;
            }

            newCell.getSubCells().forEach(subCell => {
                subCell._setParentCellId(newCell._getCellId());
            });
        });
    }

    /**
     * Moves cell listeners from old to new menu cells
     * @param {MenuCell[]} fromCells - The old menu cells
     * @param {MenuCell[]} toCells - The new menu cells
     */
    static transferCellListenersFromCells (fromCells = null, toCells = null) {
        if (toCells === null || fromCells === null || fromCells.length === 0 || toCells.length !== fromCells.length) {
            return;
        }
        fromCells.forEach((oldCell, index) => {
            toCells[index].setMenuSelectionListener(oldCell.getMenuSelectionListener());
        });
    }

    /**
     * Finds artworks in menu cells that need uploading
     * @param {MenuCell[]} cells - The menu cell list
     * @param {FileManager} fileManager - Filemanager for checking artwork uploading
     * @param {WindowCapability} windowCapability - What the HMI is capable of
     * @param {SdlArtwork[]} uniqueArtworksToUpload - The currently found, unique artworks
     * @returns {SdlArtwork[]} - The found artworks
     */
    static findAllArtworksToBeUploadedFromCells (cells, fileManager = null, windowCapability, uniqueArtworksToUpload = []) {
        // Make sure we can use images in the menus
        if (!_ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.cmdIcon)) {
            return [];
        }

        cells.forEach(cell => {
            if (fileManager !== null) {
                if (fileManager.fileNeedsUpload(cell.getIcon())) {
                    artworkUniquenessCheck(cell.getIcon());
                }
                if (_ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.menuCommandSecondaryImage) && fileManager.fileNeedsUpload(cell.getSecondaryArtwork())) {
                    artworkUniquenessCheck(cell.getSecondaryArtwork());
                }
            }
            if (cell.isSubMenuCell() && cell.getSubCells().length !== 0) {
                // pass along the currently found unique artworks in recursive calls to prevent duplicate artworks from subcells
                uniqueArtworksToUpload = _MenuReplaceUtilities.findAllArtworksToBeUploadedFromCells(cell.getSubCells(), fileManager, windowCapability, uniqueArtworksToUpload);
            }
        });

        /**
         * Checks whether this artwork has been seen before within this menu
         * @param {SdlArtwork[]} incomingArtwork - The artwork to check
         */
        function artworkUniquenessCheck (incomingArtwork) {
            const isArtworkUnique = !uniqueArtworksToUpload.map((artwork = null) => {
                return artwork !== null && artwork.equals(incomingArtwork) && artwork.isTemplateImage() === incomingArtwork.isTemplateImage();
            }).includes(true);
            if (isArtworkUnique) {
                uniqueArtworksToUpload.push(incomingArtwork);
            }
        }

        return uniqueArtworksToUpload;
    }

    /**
     * If there is an icon and the icon has been uploaded, or if the icon is a static icon, it should include the primary image
     * @param {MenuCell} cell - The menu cell to check
     * @param {FileManager} fileManager - Filemanager for checking artwork uploading
     * @param {WindowCapability} windowCapability - What the HMI is capable of
     * @returns {Boolean} - Whether a cell should include the primary image
     */
    static shouldCellIncludePrimaryImageFromCell (cell, fileManager, windowCapability) {
        const supportsImage = cell.isSubMenuCell() ? _ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.subMenuIcon) : _ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.cmdIcon);
        return cell.getIcon() !== null && supportsImage && (fileManager.hasUploadedFile(cell.getIcon()) || cell.getIcon().isStaticIcon());
    }

    /**
     * If there is an icon and the icon has been uploaded, or if the icon is a static icon, it should include the secondary image
     * @param {MenuCell} cell - The menu cell to check
     * @param {FileManager} fileManager - Filemanager for checking artwork uploading
     * @param {WindowCapability} windowCapability - What the HMI is capable of
     * @returns {Boolean} - Whether a cell should include the secondary image
     */
    static shouldCellIncludeSecondaryImageFromCell (cell, fileManager, windowCapability) {
        const supportsImage = cell.isSubMenuCell() ? _ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.menuSubMenuSecondaryImage) : _ManagerUtility.hasImageFieldOfName(windowCapability, ImageFieldName.menuCommandSecondaryImage);
        return cell.getSecondaryArtwork() !== null && supportsImage && (fileManager.hasUploadedFile(cell.getSecondaryArtwork()) || cell.getSecondaryArtwork().isStaticIcon());
    }

    /**
     * Returns the command ID from a request
     * @param {RpcRequest} request - An RPC request
     * @returns {Number} - The command ID found in the RPC
     */
    static commandIdForRpcRequest (request) {
        let commandId = 0;
        if (request instanceof AddCommand) {
            commandId = request.getCmdID();
        } else if (request instanceof AddSubMenu) {
            commandId = request.getMenuID();
        } else if (request instanceof DeleteCommand) {
            commandId = request.getCmdID();
        } else if (request instanceof DeleteSubMenu) {
            commandId = request.getMenuID();
        }
        return commandId;
    }

    /**
     * Returns the menu position from a request
     * @param {RpcRequest} request - An RPC request
     * @returns {Number} - The position number from the request
     */
    static positionForRpcRequest (request) {
        let position = 0;
        if (request instanceof AddCommand) {
            position = request.getMenuParams().getPosition();
        } else if (request instanceof AddSubMenu) {
            position = request.getPosition();
        }
        return position;
    }

    /**
     * Creates DeleteCommands and DeleteSubMenu RPCs from a list of menu cells
     * @param {MenuCell[]} cells - The menu cells to delete
     * @returns {RpcRequest[]} - An array of DeleteCommands and DeleteSubMenu requests
     */
    static deleteCommandsForCells (cells) {
        return cells.map(cell => {
            if (cell.isSubMenuCell()) {
                return new DeleteSubMenu().setMenuID(cell._getCellId());
            } else {
                return new DeleteCommand().setCmdID(cell._getCellId());
            }
        });
    }

    /**
     * Takes all menu cells in the cells parameter that exist in the menu parameter and makes add requests for the cells' contents
     * @param {MenuCell[]} cells - The cells to analyze and add
     * @param {FileManager} fileManager - The file manager
     * @param {MenuCell[]} menu - The cells to compare with the cells parameter
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {MenuLayout} defaultSubmenuLayout - The default MenuLayout
     * @returns {RpcRequest[]} - An array of AddCommand and AddSubMenu requests
     */
    static mainMenuCommandsForCells (cells, fileManager, menu, windowCapability, defaultSubmenuLayout) {
        const commands = [];
        // We need the index to use it as a position
        for (let menuInteger = 0; menuInteger < menu.length; menuInteger++) {
            const mainCell = menu[menuInteger];
            for (let updateCellsIndex = 0; updateCellsIndex < cells.length; updateCellsIndex++) {
                const addCell = cells[updateCellsIndex];
                if (mainCell.equals(addCell)) {
                    if (addCell.isSubMenuCell()) {
                        commands.push(_MenuReplaceUtilities.subMenuCommandForMenuCell(addCell, fileManager, windowCapability, menuInteger, defaultSubmenuLayout));
                    } else {
                        commands.push(_MenuReplaceUtilities.commandForMenuCell(addCell, fileManager, windowCapability, menuInteger));
                    }
                    break;
                }
            }
        }
        return commands;
    }

    /**
     * Goes through menu cells and creates add commands that would create the structure of the menu cells
     * @param {MenuCell[]} cells - The cells to analyze and add
     * @param {FileManager} fileManager - The file manager
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {MenuLayout} defaultSubmenuLayout - The default MenuLayout
     * @returns {RpcRequest[]} - An array of AddCommand and AddSubMenu requests based on the cells
     */
    static subMenuCommandsForCells (cells, fileManager, windowCapability, defaultSubmenuLayout) {
        let commands = [];
        cells.forEach(cell => {
            if (cell.isSubMenuCell() && cell.getSubCells().length !== 0) {
                commands = commands.concat(_MenuReplaceUtilities.allCommandsForCells(cell.getSubCells(), fileManager, windowCapability, defaultSubmenuLayout));
            }
        });
        return commands;
    }

    /**
     * Goes through menu cells recursively and creates add commands that would create the structure of the menu cells
     * @param {MenuCell[]} cells - The cells to analyze and add
     * @param {FileManager} fileManager - The file manager
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {MenuLayout} defaultSubmenuLayout - The default MenuLayout
     * @returns {RpcRequest[]} - An array of AddCommand and AddSubMenu requests based on the cells
     */
    static allCommandsForCells (cells, fileManager, windowCapability, defaultSubmenuLayout) {
        let commands = [];

        for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
            const cell = cells[cellIndex];
            if (cell.isSubMenuCell()) {
                commands.push(_MenuReplaceUtilities.subMenuCommandForMenuCell(cell, fileManager, windowCapability, cellIndex, defaultSubmenuLayout));
                // recursively grab the commands for all the sub cells
                if (cell.getSubCells().length !== 0) {
                    commands = commands.concat(_MenuReplaceUtilities.allCommandsForCells(cell.getSubCells(), fileManager, windowCapability, defaultSubmenuLayout));
                }
            } else {
                commands.push(_MenuReplaceUtilities.commandForMenuCell(cell, fileManager, windowCapability, cellIndex));
            }
        }
        return commands;
    }

    /**
     * Creates an AddCommand based on the menu cell
     * @param {MenuCell} cell - The cell to use to make an AddCommand
     * @param {FileManager} fileManager - The file manager
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {Number} position - The position of the menu item
     * @returns {AddCommand} - The created AddCommand
     */
    static commandForMenuCell (cell, fileManager, windowCapability, position) {
        const command = new AddCommand().setCmdID(cell._getCellId());
        const params = new MenuParams().setMenuName(cell._getUniqueTitle());
        params.setSecondaryText(cell.getSecondaryText() !== null && cell.getSecondaryText().length !== 0 && _ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuCommandSecondaryText) ? cell.getSecondaryText() : null);
        params.setTertiaryText(cell.getTertiaryText() !== null && cell.getTertiaryText().length !== 0 && _ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuCommandTertiaryText) ? cell.getTertiaryText() : null);
        params.setParentID(cell._getParentCellId() !== _MenuManagerBase.PARENT_ID_NOT_FOUND ? cell._getParentCellId() : null);
        params.setPosition(position);

        command.setMenuParams(params);
        if (cell.getVoiceCommands() !== null && cell.getVoiceCommands().length !== 0) {
            command.setVrCommands(cell.getVoiceCommands());
        } else {
            command.setVrCommands(null);
        }

        // this line is made to be the same as in subMenuCommandForMenuCell
        const shouldCellIncludePrimaryImage = cell.getIcon() !== null && cell.getIcon().getImageRPC() !== null && _MenuReplaceUtilities.shouldCellIncludePrimaryImageFromCell(cell, fileManager, windowCapability);
        command.setCmdIcon(shouldCellIncludePrimaryImage ? cell.getIcon().getImageRPC() : null);

        const shouldCellIncludeSecondaryImage = cell.getSecondaryArtwork() !== null && cell.getSecondaryArtwork().getImageRPC() !== null && _MenuReplaceUtilities.shouldCellIncludeSecondaryImageFromCell(cell, fileManager, windowCapability);
        command.setSecondaryImage(shouldCellIncludeSecondaryImage ? cell.getSecondaryArtwork().getImageRPC() : null);

        return command;
    }

    /**
     * Creates an AddSubMenu based on the menu cell
     * @param {MenuCell} cell - The cell to use to make an AddSubMenu
     * @param {FileManager} fileManager - The file manager
     * @param {WindowCapability} windowCapability - The window capabilities
     * @param {Number} position - The position of the menu item
     * @param {MenuLayout} defaultSubmenuLayout - The default MenuLayout
     * @returns {AddSubMenu} - The created AddSubMenu
     */
    static subMenuCommandForMenuCell (cell, fileManager, windowCapability, position, defaultSubmenuLayout) {
        const shouldCellIncludePrimaryImage = cell.getIcon() !== null && cell.getIcon().getImageRPC() !== null && _MenuReplaceUtilities.shouldCellIncludePrimaryImageFromCell(cell, fileManager, windowCapability);
        const icon = shouldCellIncludePrimaryImage ? cell.getIcon().getImageRPC() : null;
        const shouldCellIncludeSecondaryImage = cell.getSecondaryArtwork() !== null && cell.getSecondaryArtwork().getImageRPC() !== null && _MenuReplaceUtilities.shouldCellIncludeSecondaryImageFromCell(cell, fileManager, windowCapability);
        const secondaryIcon = shouldCellIncludeSecondaryImage ? cell.getSecondaryArtwork().getImageRPC() : null;

        if (cell.getVoiceCommands() !== null) {
            console.warn('MenuManagerBase - Setting voice commands for submenu cells is not supported. The voice commands will not be set.');
        }

        let submenuLayout = null;
        const availableMenuLayouts = windowCapability !== null ? windowCapability.getMenuLayoutsAvailable() : null;
        if (cell.getSubMenuLayout() !== null && availableMenuLayouts !== null && availableMenuLayouts.includes(cell.getSubMenuLayout())) {
            submenuLayout = cell.getSubMenuLayout();
        } else {
            submenuLayout = defaultSubmenuLayout;
        }

        const rpc = new AddSubMenu()
            .setMenuID(cell._getCellId())
            .setMenuName(cell._getUniqueTitle())
            .setParentID(cell._getParentCellId() !== _MenuManagerBase.PARENT_ID_NOT_FOUND ? cell._getParentCellId() : null)
            .setSecondaryText(cell.getSecondaryText() !== null && cell.getSecondaryText().length !== 0 && _ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuSubMenuSecondaryText) ? cell.getSecondaryText() : null)
            .setTertiaryText(cell.getTertiaryText() !== null && cell.getTertiaryText().length !== 0 && _ManagerUtility.hasTextFieldOfName(windowCapability, TextFieldName.menuSubMenuTertiaryText) ? cell.getTertiaryText() : null)
            .setPosition(position)
            .setMenuIcon(icon)
            .setSecondaryImage(secondaryIcon);

        if (submenuLayout !== null) {
            rpc.setMenuLayout(submenuLayout);
        }
        return rpc;
    }

    /**
     * Recursively finds and removes a menu cell based on the command id
     * @param {MenuCell[]} menuCellList - The list of menu cells
     * @param {Number} commandId - The ID of the menu cell to remove
     * @returns {Boolean} - Whether the cell was found and removed
     */
    static removeCellFromList (menuCellList, commandId) {
        for (let index = 0; index < menuCellList.length; index++) {
            const menuCell = menuCellList[index];
            if (menuCell._getCellId() === commandId) {
                // If the cell id matches the command id, remove it from the list and return
                menuCellList.splice(index, 1);
                return true;
            } else if (menuCell.isSubMenuCell() && menuCell.getSubCells().length !== 0) {
                // If the menu cell has sub cells, we need to recurse and check the sub cells
                const newList = menuCell.getSubCells();
                const foundAndRemovedItem = _MenuReplaceUtilities.removeCellFromList(newList, commandId);
                if (foundAndRemovedItem) {
                    menuCell.setSubCells(newList);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Searches the newMenuList for a menu cell with matching cellId, and adds it to the mainMenuList
     * @param {Number} cellId - The ID of the menu cell to add to mainMenuList
     * @param {Number} position - The position of the menu item
     * @param {MenuCell[]} newMenuList - The list of menu cells to search through
     * @param {MenuCell[]} mainMenuList - Where the new menu cell gets added to
     * @returns {Boolean} - Whether the cell was found and added to mainMenuList
     */
    static addCellWithCellId (cellId, position, newMenuList, mainMenuList) {
        let addedCell = null;
        for (let index = 0; index < newMenuList.length; index++) {
            const cell = newMenuList[index];
            if (cell._getCellId() === cellId) {
                addedCell = cell;
                break;
            } else if (cell.isSubMenuCell() && cell.getSubCells().length !== 0) {
                const success = _MenuReplaceUtilities.addCellWithCellId(cellId, position, cell.getSubCells(), mainMenuList);
                if (success) {
                    return true;
                }
            }
        }
        if (addedCell !== null) {
            return _MenuReplaceUtilities.addMenuCell(addedCell, mainMenuList, position);
        }
        return false;
    }

    /**
     * Attempts to add cell to menuCellList
     * @param {MenuCell} cell - The cell to add to menuCellList
     * @param {MenuCell[]} menuCellList - Where the new menu cell gets added to
     * @param {Number} position - The position of the menu item
     * @returns {Boolean} - Whether the cell was added to menuCellList
     */
    static addMenuCell (cell, menuCellList, position) {
        if (cell._getParentCellId() === _MenuManagerBase.PARENT_ID_NOT_FOUND) {
            // The cell does not have a parent id, just insert it into the main menu
            _MenuReplaceUtilities.insertMenuCell(cell, menuCellList, position);
            return true;
        }
        // If the cell has a parent id, we need to find the cell with a matching cell id and insert it into its submenu
        for (let index = 0; index < menuCellList.length; index++) {
            const menuCell = menuCellList[index];
            if (menuCell._getCellId() === cell._getParentCellId()) {
                // If we found the correct submenu, insert it into that submenu
                if (menuCell.getSubCells() === null) {
                    menuCell.setSubCells([]);
                }
                _MenuReplaceUtilities.insertMenuCell(cell, menuCell.getSubCells(), position);
                return true;
            } else if (menuCell.isSubMenuCell() && menuCell.getSubCells().length !== 0) {
                // Check the sub cells of this cell to see if any of those have cell ids that match the parent cell id
                const newList = menuCell.getSubCells();
                const foundAndAddedItem = _MenuReplaceUtilities.addMenuCell(cell, newList, position);
                if (foundAndAddedItem) {
                    menuCell.setSubCells(newList);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Adds the cell to cellList
     * @param {MenuCell} cellToInsert - The cell to add to cellList
     * @param {MenuCell[]} cellList - Where the new menu cell gets added to
     * @param {Number} position - The position of the menu item
     */
    static insertMenuCell (cellToInsert, cellList, position) {
        if (cellToInsert.isSubMenuCell()) {
            // We should not add the subCells automatically when adding a parent cell
            cellToInsert = cellToInsert.clone();
            cellToInsert.setSubCells([]);
        }
        if (position > cellList.length) {
            cellList.push(cellToInsert);
        } else {
            cellList.splice(position, 0, cellToInsert);
        }
    }

    /**
     * Clones a passed in array of menu cells
     * @param {MenuCell[]} originalList - The cells to clone
     * @returns {MenuCell[]} - The cloned cells
     */
    static cloneMenuCellsList (originalList = null) {
        if (originalList === null) {
            return [];
        }
        return originalList.map(cell => cell.clone());
    }
}

_MenuReplaceUtilities._menuId = 0;

export { _MenuReplaceUtilities };
