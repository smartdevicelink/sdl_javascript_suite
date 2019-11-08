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

import { RpcRequest } from '../RpcRequest.js';
import { Image } from '../structs/Image.js';
import { MenuParams } from '../structs/MenuParams.js';
import { FunctionID } from '../enums/FunctionID.js';

class AddCommand extends RpcRequest {

    static KEY_CMD_ICON = 'cmdIcon';
    static KEY_MENU_PARAMS = 'menuParams';
    static KEY_CMD_ID = 'cmdID';
    static KEY_VR_COMMANDS = 'vrCommands';


    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.ADD_COMMAND);
    }

    /**
    * @param {Number} id
    * @return {AddCommand}
    */
    setCmdID(id) {
        this.setParameter(KEY_CMD_ID, id);
        return this;
    }

    /**
    * @return {Number}
    */
    getCmdID() {
        return this.getParameter(KEY_CMD_ID);
    }

    /**
    * @param {MenuParams} menuParams
    * @return {AddCommand}
    */
    setMenuParams(menuParams) {
        this.validateType(MenuParams, menuParams);

        this.setParameter(KEY_MENU_PARAMS, menuParams);
        return this;
    }

    /**
    * @return {Number}
    */
    getMenuParams() {
        return this.getObject(MenuParams, KEY_MENU_PARAMS);
    }

    /**
    * @param {Array<String>} vrCommands
    * @return {AddCommand}
    */
    setVrCommands(vrCommands) {
        this.setParameter(KEY_VR_COMMANDS, vrCommands);
        return this;
    }

    /**
    * @return {Array<String>}
    */
    getVrCommands() {
        return this.getParameter(KEY_VR_COMMANDS);
    }

    /**
    * @param {Image} icon
    * @return {AddCommand}
    */
    setCmdIcon(icon) {
        this.validateType(Image, icon);

        this.setParameter(KEY_CMD_ICON, icon);
        return this;
    }

    /**
    * @return {Image}
    */
    getCmdIcon() {
        return this.getObject(Image, KEY_CMD_ICON);
    }

}

export { AddCommand };
