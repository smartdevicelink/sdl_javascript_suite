/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * This notification tells an app to update the AddSubMenu or its 'sub' AddCommand and AddSubMenus with the requested
 * data
 */
class OnUpdateSubMenu extends RpcNotification {
    /**
     * Initalizes an instance of OnUpdateSubMenu.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.OnUpdateSubMenu);
    }

    /**
     * Set the MenuID
     * @param {Number} id - This menuID must match a menuID in the current menu structure - The desired MenuID.
     * @returns {OnUpdateSubMenu} - The class instance for method chaining.
     */
    setMenuID (id) {
        this.setParameter(OnUpdateSubMenu.KEY_MENU_ID, id);
        return this;
    }

    /**
     * Get the MenuID
     * @returns {Number} - the KEY_MENU_ID value
     */
    getMenuID () {
        return this.getParameter(OnUpdateSubMenu.KEY_MENU_ID);
    }

    /**
     * Set the UpdateSubCells
     * @param {Boolean} cells - If not set, assume false. If true, the app should send AddCommands with parentIDs - The desired UpdateSubCells.
     * matching the menuID. These AddCommands will then be attached to the submenu and
     * displayed if the submenu is selected.
     * @returns {OnUpdateSubMenu} - The class instance for method chaining.
     */
    setUpdateSubCells (cells) {
        this.setParameter(OnUpdateSubMenu.KEY_UPDATE_SUB_CELLS, cells);
        return this;
    }

    /**
     * Get the UpdateSubCells
     * @returns {Boolean} - the KEY_UPDATE_SUB_CELLS value
     */
    getUpdateSubCells () {
        return this.getParameter(OnUpdateSubMenu.KEY_UPDATE_SUB_CELLS);
    }
}

OnUpdateSubMenu.KEY_MENU_ID = 'menuID';
OnUpdateSubMenu.KEY_UPDATE_SUB_CELLS = 'updateSubCells';

export { OnUpdateSubMenu };