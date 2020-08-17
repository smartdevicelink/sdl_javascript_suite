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
import { Image } from '../structs/Image.js';
import { MenuParams } from '../structs/MenuParams.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * Adds a command to the in application menu. Either menuParams or vrCommands must be provided.
 */
class AddCommand extends RpcRequest {
    /**
     * Initalizes an instance of AddCommand.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.AddCommand);
    }

    /**
     * Set the CmdID
     * @param {Number} id - unique ID of the command to add. - The desired CmdID.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {AddCommand} - The class instance for method chaining.
     */
    setCmdID (id) {
        this.setParameter(AddCommand.KEY_CMD_ID, id);
        return this;
    }

    /**
     * Get the CmdID
     * @returns {Number} - the KEY_CMD_ID value
     */
    getCmdID () {
        return this.getParameter(AddCommand.KEY_CMD_ID);
    }

    /**
     * Set the MenuParams
     * @param {MenuParams} params - Optional sub value containing menu parameters - The desired MenuParams.
     * @returns {AddCommand} - The class instance for method chaining.
     */
    setMenuParams (params) {
        this._validateType(MenuParams, params);
        this.setParameter(AddCommand.KEY_MENU_PARAMS, params);
        return this;
    }

    /**
     * Get the MenuParams
     * @returns {MenuParams} - the KEY_MENU_PARAMS value
     */
    getMenuParams () {
        return this.getObject(MenuParams, AddCommand.KEY_MENU_PARAMS);
    }

    /**
     * Set the VrCommands
     * @param {String[]} commands - An array of strings to be used as VR synonyms for this command. If this array is - The desired VrCommands.
     * provided, it may not be empty.
     * {'array_min_size': 1, 'array_max_size': 100, 'string_min_length': 1, 'string_max_length': 99}
     * @returns {AddCommand} - The class instance for method chaining.
     */
    setVrCommands (commands) {
        this.setParameter(AddCommand.KEY_VR_COMMANDS, commands);
        return this;
    }

    /**
     * Get the VrCommands
     * @returns {String[]} - the KEY_VR_COMMANDS value
     */
    getVrCommands () {
        return this.getParameter(AddCommand.KEY_VR_COMMANDS);
    }

    /**
     * Set the CmdIcon
     * @param {Image} icon - Image struct determining whether static or dynamic icon. If omitted on supported displays, - The desired CmdIcon.
     * no (or the default if applicable) icon shall be displayed.
     * @returns {AddCommand} - The class instance for method chaining.
     */
    setCmdIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(AddCommand.KEY_CMD_ICON, icon);
        return this;
    }

    /**
     * Get the CmdIcon
     * @returns {Image} - the KEY_CMD_ICON value
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