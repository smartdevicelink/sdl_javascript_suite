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
    * @param { Number } id
    */
    set parentID(id) {
        return this.setParameter(KEY_PARENT_ID, id);
    }

    /**
    * @return { Number }
    */
    get parentID() {
        return this.getParameter(KEY_PARENT_ID);
    }

    /**
    * @param { Number } position
    */
    set position(position) {
        return this.setParameter(KEY_POSITION, position);
    }

    /**
    * @return { Number }
    */
    get position() {
        return this.getParameter(KEY_POSITION);
    }

    /**
    * @param { String } menuName
    */
    set menuName(menuName) {
        return this.setParameter(KEY_MENU_NAME, menuName);
    }

    /**
    * @param { String }
    */
    get menuName() {
        return this.getParameter(KEY_MENU_NAME);
    }

}

MenuParams.KEY_PARENT_ID = 'parentID';
MenuParams.KEY_POSITION = 'position';
MenuParams.KEY_MENU_NAME = 'menuName';

export { MenuParams };
