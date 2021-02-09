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

class MenuConfiguration {
    /**
     * Creates a new instance of MenuConfiguration
     * @class
     */
    constructor () {
        this._mainMenuLayout = null;
        this._submenuLayout = null;
    }

    /**
     * Gets the main menu layout
     * @returns {MenuLayout} - Changes the default main menu layout.
     */
    getMenuLayout () {
        return this._mainMenuLayout;
    }

    /**
     * Sets the main menu layout
     * @param {MenuLayout} mainMenuLayout - Changes the default main menu layout.
     * @returns {MenuConfiguration} - A reference to this instance to support method chaining
     */
    setMenuLayout (mainMenuLayout) {
        this._mainMenuLayout = mainMenuLayout;
        return this;
    }

    /**
     * Gets the sub menu layout
     * @returns {MenuLayout} - Changes the default submenu layout. To change this for an individual submenu, set the
     * menuLayout property on the MenuCell constructor for creating a cell with sub-cells.
     */
    getSubMenuLayout () {
        return this._submenuLayout;
    }

    /**
     * Sets the sub menu layout
     * @param {MenuLayout} submenuLayout - Changes the default submenu layout. To change this for an individual submenu, set the
     * menuLayout property on the MenuCell constructor for creating a cell with sub-cells.
     * @returns {MenuConfiguration} - A reference to this instance to support method chaining
     */
    setSubMenuLayout (submenuLayout) {
        this._submenuLayout = submenuLayout;
        return this;
    }

    /**
     * Checks whether two MenuConfigurations can be considered equivalent
     * @param {MenuConfiguration} other - The object to compare
     * @returns {Boolean} - Whether the objects are the same or not
     */
    equals (other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (this === other) {
            return true;
        }
        if (!(other instanceof MenuConfiguration)) {
            return false;
        }
        // main comparison check
        if (this.getMenuLayout() !== other.getMenuLayout()) {
            return false;
        }
        if (this.getSubMenuLayout() !== other.getSubMenuLayout()) {
            return false;
        }

        return true;
    }
}

export { MenuConfiguration };
