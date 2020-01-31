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
import { MenuParams } from '../structs/MenuParams.js';
import { Image } from '../structs/Image.js';

/**
 * Adds a command to the in application menu. Either menuParams or vrCommands must be provided.
 */
class AddCommand extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.AddCommand);
    }

    /**
     * @param {Number} id - unique ID of the command to add.
     * @return {AddCommand}
     */
    setCmdID (id) {
        this.setParameter(AddCommand.KEY_CMD_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getCmdID () {
        return this.getParameter(AddCommand.KEY_CMD_ID);
    }

    /**
     * @param {MenuParams} params - Optional sub value containing menu parameters
     * @return {AddCommand}
     */
    setMenuParams (params) {
        this.validateType(MenuParams, params);
        this.setParameter(AddCommand.KEY_MENU_PARAMS, params);
        return this;
    }

    /**
     * @return {MenuParams}
     */
    getMenuParams () {
        return this.getObject(MenuParams, AddCommand.KEY_MENU_PARAMS);
    }

    /**
     * @param {String[]} commands - An array of strings to be used as VR synonyms for this command. If this array is
     *                              provided, it may not be empty.
     * @return {AddCommand}
     */
    setVrCommands (commands) {
        this.setParameter(AddCommand.KEY_VR_COMMANDS, commands);
        return this;
    }

    /**
     * @return {String[]}
     */
    getVrCommands () {
        return this.getParameter(AddCommand.KEY_VR_COMMANDS);
    }

    /**
     * @param {Image} icon - Image struct determining whether static or dynamic icon. If omitted on supported displays,
     *                       no (or the default if applicable) icon shall be displayed.
     * @return {AddCommand}
     */
    setCmdIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(AddCommand.KEY_CMD_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getCmdIcon () {
        return this.getObject(Image, AddCommand.KEY_CMD_ICON);
    }
}

AddCommand.KEY_CMD_ID = 'cmdID';
AddCommand.KEY_MENU_PARAMS = 'menuParams';
AddCommand.KEY_VR_COMMANDS = 'vrCommands';
AddCommand.KEY_CMD_ICON = 'cmdIcon';

export { AddCommand };