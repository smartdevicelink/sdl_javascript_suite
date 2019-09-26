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

    /**
    * @constructor
    */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.ADD_COMMAND);
    }

    /**
    * @param { Number } id
    */
    set cmdID(id) {
        return this.setParameter(KEY_CMD_ID, id);
    }

    /**
    * @return { Number }
    */
    get cmdID() {
        return this.getParameter(KEY_CMD_ID);
    }

    /**
    * @param { MenuParams } menuParams
    */
    set menuParams(menuParams) {
        this.validateType(MenuParams, menuParams);

        return this.setParameter(KEY_MENU_PARAMS, menuParams);
    }

    /**
    * @return { Number }
    */
    get menuParams() {
        return this.getObject(MenuParams, KEY_MENU_PARAMS);
    }

    /**
    * @param { Array<String> } vrCommands
    */
    set vrCommands(vrCommands) {
        return this.setParameter(KEY_VR_COMMANDS, vrCommands);
    }

    /**
    * @return { Array<String> }
    */
    get vrCommands() {
        return this.getParameter(KEY_VR_COMMANDS);
    }

    /**
    * @param { Image } icon
    */
    set cmdIcon(icon) {
        this.validateType(Image, icon);

        return this.setParameter(KEY_CMD_ICON, icon);
    }

    /**
    * @return { Image }
    */
    get cmdIcon() {
        return this.getObject(Image, KEY_CMD_ICON);
    }

}

AddCommand.KEY_CMD_ICON = 'cmdIcon';
AddCommand.KEY_MENU_PARAMS = 'menuParams';
AddCommand.KEY_CMD_ID = 'cmdID';
AddCommand.KEY_VR_COMMANDS = 'vrCommands';

export { AddCommand };
