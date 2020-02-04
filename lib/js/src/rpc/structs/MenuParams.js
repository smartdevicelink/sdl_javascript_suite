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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} id - unique ID of the sub menu, the command will be added to. If not provided, it will be
     *                      provided to the top level of the in application menu.
     * @return {MenuParams}
     */
    setParentID (id) {
        this.setParameter(MenuParams.KEY_PARENT_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getParentID () {
        return this.getParameter(MenuParams.KEY_PARENT_ID);
    }

    /**
     * @param {Number} position - Position within the items that are are at top level of the in application menu. 0 will
     *                            insert at the front. 1 will insert at the second position. if position is greater or
     *                            equal than the number of items on top level, the sub menu will be appended to the end.
     *                            If this param was omitted the entry will be added at the end.
     * @return {MenuParams}
     */
    setPosition (position) {
        this.setParameter(MenuParams.KEY_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getPosition () {
        return this.getParameter(MenuParams.KEY_POSITION);
    }

    /**
     * @param {String} name - Text to show in the menu for this sub menu.
     * @return {MenuParams}
     */
    setMenuName (name) {
        this.setParameter(MenuParams.KEY_MENU_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getMenuName () {
        return this.getParameter(MenuParams.KEY_MENU_NAME);
    }
}

MenuParams.KEY_PARENT_ID = 'parentID';
MenuParams.KEY_POSITION = 'position';
MenuParams.KEY_MENU_NAME = 'menuName';

export { MenuParams };