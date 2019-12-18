/*
* Copyright (c) 2019, Livio, Inc.
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

import { RpcStruct } from '../RpcStruct.js';

class MenuParams extends RpcStruct {
    /**
    * @constructor
    */
    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {Number} id
    * @return {MenuParams}
    */
    setParentID(id) {
        this.setParameter(MenuParams.KEY_PARENT_ID, id);
        return this;
    }

    /**
    * @return {Number}
    */
    getParentID() {
        return this.getParameter(MenuParams.KEY_PARENT_ID);
    }

    /**
    * @param {Number} position
    * @return {MenuParams}
    */
    setPosition(position) {
        this.setParameter(MenuParams.KEY_POSITION, position);
        return this;
    }

    /**
    * @return {Number}
    */
    getPosition() {
        return this.getParameter(MenuParams.KEY_POSITION);
    }

    /**
    * @param {String} menuName
    * @return {MenuParams}
    */
    setMenuName(menuName) {
        this.setParameter(MenuParams.KEY_MENU_NAME, menuName);
        return this;
    }

    /**
    * @param {String}
    */
    getMenuName() {
        return this.getParameter(MenuParams.KEY_MENU_NAME);
    }
}

MenuParams.KEY_PARENT_ID = 'parentID';
MenuParams.KEY_POSITION  = 'position';
MenuParams.KEY_MENU_NAME = 'menuName';

export { MenuParams };
