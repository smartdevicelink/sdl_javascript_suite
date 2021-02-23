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
import { SdlArtwork } from '../../file/filetypes/SdlArtwork.js';

class MenuCell {
    /**
     * Creates a new instance of MenuCell
     * @class
     * @param {String} title - The cell's text to be displayed
     */
    constructor (title = null) {
        this._title = null;
        this._icon = null;
        this._voiceCommands = null;
        this._subCells = null;
        this._menuSelectionListener = null;
        this._parentCellId = MenuCell.MAX_ID;
        this._cellId = MenuCell.MAX_ID;
        this._subMenuLayout = null;

        if (title === null) { // title is required
            console.error('Attempted to create an invalid MenuCell: title does not exist');
            return;
        }

        this._title = title;
    }

    /**
     * Gets the title of the menu cell
     * @returns {String} - The title of the cell object
     */
    getTitle () {
        return this._title;
    }

    /**
     * Sets the title of the menu cell
     * @param {String} title - The title of the cell object. Required
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    setTitle (title = null) {
        if (title === null) { // title is required
            console.error('Attempted to create an invalid MenuCell: title does not exist');
            return;
        }

        this._title = title;
        return this;
    }

    /**
     * Gets the icon of the menu cell
     * @returns {SdlArtwork} - The cell's icon to be displayed
     */
    getIcon () {
        return this._icon;
    }

    /**
     * Sets the icon of the menu cell
     * @param {SdlArtwork} icon - The cell's icon to be displayed
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    setIcon (icon) {
        this._icon = icon;
        return this;
    }

    /**
     * Gets the voice commands of the menu cell
     * @returns {String[]} - A list of Strings that will be used for voice commands
     */
    getVoiceCommands () {
        return this._voiceCommands;
    }

    /**
     * Sets the voice commands of the menu cell
     * @param {String[]} voiceCommands - A list of Strings that will be used for voice commands
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    setVoiceCommands (voiceCommands) {
        this._voiceCommands = voiceCommands;
        return this;
    }

    /**
     * Gets the sub cells of the menu cell
     * @returns {MenuCell[]} - The list of MenuCells that can be set as subCells
     */
    getSubCells () {
        return this._subCells;
    }

    /**
     * Sets the sub cells of the menu cell
     * @param {MenuCell[]} subCells - The list of MenuCells that can be set as subCells
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    setSubCells (subCells) {
        this._subCells = subCells;
        return this;
    }

    /**
     * Gets the menu listener of the menu cell
     * @returns {MenuSelectionListener} - The listener for when a menu item is selected
     */
    getMenuSelectionListener () {
        return this._menuSelectionListener;
    }

    /**
     * Sets the menu listener of the menu cell
     * @param {MenuSelectionListener} menuSelectionListener - The listener for when a menu item is selected
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    setMenuSelectionListener (menuSelectionListener) {
        this._menuSelectionListener = menuSelectionListener;
        return this;
    }

    /**
     * Gets the sub menu layout of the menu cell
     * @returns {MenuLayout} - The submenu's layout that the subCells will be shown in. If `null`, the default submenu
     * layout set via the screen manager's `MenuConfiguration` will be used.
     */
    getSubMenuLayout () {
        return this._subMenuLayout;
    }

    /**
     * Sets the sub menu layout of the menu cell
     * @param {MenuLayout} subMenuLayout - The submenu's layout that the subCells will be shown in. If `null`, the default submenu
     * layout set via the screen manager's `MenuConfiguration` will be used.
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    setSubMenuLayout (subMenuLayout) {
        this._subMenuLayout = subMenuLayout;
        return this;
    }

    // INTERNALLY USED METHODS

    /**
     * Gets the cell ID of the menu cell
     * @private
     * @returns {Number} - The cell ID
     */
    _getCellId () {
        return this._cellId;
    }

    /**
     * Sets the cell ID of the menu cell
     * @private
     * @param {Number} cellId - The cell ID
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    _setCellId (cellId) {
        this._cellId = cellId;
        return this;
    }

    /**
     * Gets the parent cell ID of the menu cell
     * @private
     * @returns {Number} - The parent cell's ID
     */
    _getParentCellId () {
        return this._parentCellId;
    }

    /**
     * Sets the parent cell ID of the menu cell
     * @private
     * @param {Number} parentCellId - The parent cell's ID
     * @returns {MenuCell} - A reference to this instance to support method chaining
     */
    _setParentCellId (parentCellId) {
        this._parentCellId = parentCellId;
        return this;
    }

    /**
     * Creates a deep copy of the object
     * @returns {MenuCell} - A deep copy of the object
     */
    clone () {
        const clonedParams = Object.assign({}, this); // shallow copy. copy all objects afterwards

        if (clonedParams._icon !== null) {
            clonedParams._icon = Object.assign(new SdlArtwork(), clonedParams._icon);
        }
        clonedParams._menuSelectionListener = this.getMenuSelectionListener();

        if (Array.isArray(this.getVoiceCommands())) {
            clonedParams._voiceCommands = this.getVoiceCommands().map(vc => vc);
        }

        if (Array.isArray(this.getSubCells())) {
            clonedParams._subCells = this.getSubCells().map(subcell => subcell.clone());
        }

        return Object.assign(new MenuCell(this.getTitle()), clonedParams);
    }

    /**
     * Checks whether two MenuCells can be considered equivalent, but does NOT compare the listener objects
     * @param {MenuCell} other - The object to compare
     * @returns {Boolean} - Whether the objects are the same or not
     */
    equals (other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (this === other) {
            return true;
        }
        if (!(other instanceof MenuCell)) {
            return false;
        }
        // main comparison check
        if (this.getTitle() !== other.getTitle()) {
            return false;
        }
        if (this.getIcon() === null && other.getIcon() !== null) {
            return false;
        }
        if (this.getIcon() !== null && !this.getIcon().equals(other.getIcon())) {
            return false;
        }

        const voiceCommands = this.getVoiceCommands();
        const otherVoiceCommands = other.getVoiceCommands();

        if ((voiceCommands !== null && otherVoiceCommands === null) || (voiceCommands === null && otherVoiceCommands !== null)) {
            return false;
        }
        if ((voiceCommands !== null && otherVoiceCommands !== null)) {
            // extra voice command check as long as they're both not null
            if (voiceCommands.length !== otherVoiceCommands.length) {
                return false;
            }
            for (let index = 0; index < voiceCommands.length; index++) {
                if (voiceCommands[index] !== otherVoiceCommands[index]) {
                    return false;
                }
            }
        }

        const subCells = this.getSubCells();
        const otherSubCells = other.getSubCells();

        if ((subCells !== null && otherSubCells === null) || (subCells === null && otherSubCells !== null)) {
            return false;
        }
        if ((subCells !== null && otherSubCells !== null)) {
            // extra voice command check as long as they're both not null
            if (subCells.length !== otherSubCells.length) {
                return false;
            }
            for (let index = 0; index < subCells.length; index++) {
                if (!subCells[index].equals(otherSubCells[index])) {
                    return false;
                }
            }
        }

        if (this.getIcon() !== null && !this.getIcon().equals(other.getIcon())) {
            return false;
        }

        if (this.getSubMenuLayout() !== other.getSubMenuLayout()) {
            return false;
        }

        return true;
    }
}

// MAX ID for cells - Reasoning is from Java library: cannot use Integer.MAX_INT as the value is too high.
MenuCell.MAX_ID = 2000000000;

export { MenuCell };
