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

import { RpcStruct } from '../RpcStruct.js';

class MenuParams extends RpcStruct {
    /**
     * Initalizes an instance of MenuParams.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ParentID
     * @param {Number} id - unique ID of the sub menu, the command will be added to. If not provided, it will be provided to the top level of the in application menu. - The desired ParentID.
     * {'default_value': 0, 'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {MenuParams} - The class instance for method chaining.
     */
    setParentID (id) {
        this.setParameter(MenuParams.KEY_PARENT_ID, id);
        return this;
    }

    /**
     * Get the ParentID
     * @returns {Number} - the KEY_PARENT_ID value
     */
    getParentID () {
        return this.getParameter(MenuParams.KEY_PARENT_ID);
    }

    /**
     * Set the Position
     * @param {Number} position - Position within the items that are at top level of the in application menu. 0 will insert at the front. 1 will insert at the second position. if position is greater or equal than the number of items on top level, the sub menu will be appended to the end. If this param was omitted the entry will be added at the end. - The desired Position.
     * {'num_min_value': 0, 'num_max_value': 1000}
     * @returns {MenuParams} - The class instance for method chaining.
     */
    setPosition (position) {
        this.setParameter(MenuParams.KEY_POSITION, position);
        return this;
    }

    /**
     * Get the Position
     * @returns {Number} - the KEY_POSITION value
     */
    getPosition () {
        return this.getParameter(MenuParams.KEY_POSITION);
    }

    /**
     * Set the MenuName
     * @param {String} name - Text to show in the menu for this sub menu. - The desired MenuName.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {MenuParams} - The class instance for method chaining.
     */
    setMenuName (name) {
        this.setParameter(MenuParams.KEY_MENU_NAME, name);
        return this;
    }

    /**
     * Get the MenuName
     * @returns {String} - the KEY_MENU_NAME value
     */
    getMenuName () {
        return this.getParameter(MenuParams.KEY_MENU_NAME);
    }

    /**
     * Set the SecondaryText
     * @since SmartDeviceLink 7.1.0
     * @param {String} text - Optional secondary text to display - The desired SecondaryText.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {MenuParams} - The class instance for method chaining.
     */
    setSecondaryText (text) {
        this.setParameter(MenuParams.KEY_SECONDARY_TEXT, text);
        return this;
    }

    /**
     * Get the SecondaryText
     * @returns {String} - the KEY_SECONDARY_TEXT value
     */
    getSecondaryText () {
        return this.getParameter(MenuParams.KEY_SECONDARY_TEXT);
    }

    /**
     * Set the TertiaryText
     * @since SmartDeviceLink 7.1.0
     * @param {String} text - Optional tertiary text to display - The desired TertiaryText.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {MenuParams} - The class instance for method chaining.
     */
    setTertiaryText (text) {
        this.setParameter(MenuParams.KEY_TERTIARY_TEXT, text);
        return this;
    }

    /**
     * Get the TertiaryText
     * @returns {String} - the KEY_TERTIARY_TEXT value
     */
    getTertiaryText () {
        return this.getParameter(MenuParams.KEY_TERTIARY_TEXT);
    }
}

MenuParams.KEY_PARENT_ID = 'parentID';
MenuParams.KEY_POSITION = 'position';
MenuParams.KEY_MENU_NAME = 'menuName';
MenuParams.KEY_SECONDARY_TEXT = 'secondaryText';
MenuParams.KEY_TERTIARY_TEXT = 'tertiaryText';

export { MenuParams };