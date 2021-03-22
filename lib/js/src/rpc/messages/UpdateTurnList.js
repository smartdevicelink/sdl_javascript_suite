/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';
import { Turn } from '../structs/Turn.js';

class UpdateTurnList extends RpcRequest {
    /**
     * Initializes an instance of UpdateTurnList.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.UpdateTurnList);
    }

    /**
     * Set the TurnList
     * @param {Turn[]} list - The desired TurnList.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {UpdateTurnList} - The class instance for method chaining.
     */
    setTurnList (list) {
        this._validateType(Turn, list, true);
        this.setParameter(UpdateTurnList.KEY_TURN_LIST, list);
        return this;
    }

    /**
     * Get the TurnList
     * @returns {Turn[]} - the KEY_TURN_LIST value
     */
    getTurnList () {
        return this.getObject(Turn, UpdateTurnList.KEY_TURN_LIST);
    }

    /**
     * Set the SoftButtons
     * @param {SoftButton[]} buttons - If omitted on supported displays, app-defined SoftButton will be left blank. - The desired SoftButtons.
     * {'array_min_size': 0, 'array_max_size': 1}
     * @returns {UpdateTurnList} - The class instance for method chaining.
     */
    setSoftButtons (buttons) {
        this._validateType(SoftButton, buttons, true);
        this.setParameter(UpdateTurnList.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButton[]} - the KEY_SOFT_BUTTONS value
     */
    getSoftButtons () {
        return this.getObject(SoftButton, UpdateTurnList.KEY_SOFT_BUTTONS);
    }
}

UpdateTurnList.KEY_TURN_LIST = 'turnList';
UpdateTurnList.KEY_SOFT_BUTTONS = 'softButtons';

export { UpdateTurnList };