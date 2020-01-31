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

import { RpcRequest } from '../RpcRequest.js';
import { FunctionID } from '../enums/FunctionID.js';
import { MenuLayout } from '../enums/MenuLayout.js';
import { Image } from '../structs/Image.js';

/**
 * Adds a sub menu to the in-application menu.
 */
class AddSubMenu extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.AddSubMenu);
    }

    /**
     * @param {Number} id - unique ID of the sub menu to add.
     * @return {AddSubMenu}
     */
    setMenuID (id) {
        this.setParameter(AddSubMenu.KEY_MENU_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getMenuID () {
        return this.getParameter(AddSubMenu.KEY_MENU_ID);
    }

    /**
     * @param {Number} position - Position within the items that are are at top level of the in application menu. 0 will
     *                            insert at the front. 1 will insert at the second position. If position is greater or
     *                            equal than the number of items on top level, the sub menu will be appended to the end.
     *                            Position of any submenu will always be located before the return and exit options If
     *                            this param was omitted the entry will be added at the end.
     * @return {AddSubMenu}
     */
    setPosition (position) {
        this.setParameter(AddSubMenu.KEY_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getPosition () {
        return this.getParameter(AddSubMenu.KEY_POSITION);
    }

    /**
     * @param {String} name - Text to show in the menu for this sub menu.
     * @return {AddSubMenu}
     */
    setMenuName (name) {
        this.setParameter(AddSubMenu.KEY_MENU_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getMenuName () {
        return this.getParameter(AddSubMenu.KEY_MENU_NAME);
    }

    /**
     * @param {Image} icon - The image field for AddSubMenu
     * @return {AddSubMenu}
     */
    setMenuIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(AddSubMenu.KEY_MENU_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getMenuIcon () {
        return this.getObject(Image, AddSubMenu.KEY_MENU_ICON);
    }

    /**
     * @param {MenuLayout} layout - Sets the layout of the submenu screen.
     * @return {AddSubMenu}
     */
    setMenuLayout (layout) {
        this.validateType(MenuLayout, layout);
        this.setParameter(AddSubMenu.KEY_MENU_LAYOUT, layout);
        return this;
    }

    /**
     * @return {MenuLayout}
     */
    getMenuLayout () {
        return this.getObject(MenuLayout, AddSubMenu.KEY_MENU_LAYOUT);
    }
}

AddSubMenu.KEY_MENU_ID = 'menuID';
AddSubMenu.KEY_POSITION = 'position';
AddSubMenu.KEY_MENU_NAME = 'menuName';
AddSubMenu.KEY_MENU_ICON = 'menuIcon';
AddSubMenu.KEY_MENU_LAYOUT = 'menuLayout';

export { AddSubMenu };