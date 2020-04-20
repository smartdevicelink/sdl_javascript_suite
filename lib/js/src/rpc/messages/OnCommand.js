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
import { RpcNotification } from '../RpcNotification.js';
import { TriggerSource } from '../enums/TriggerSource.js';

class OnCommand extends RpcNotification {
    /**
     * Initalizes an instance of OnCommand.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnCommand);
    }

    /**
     * Set the CmdID
     * @param {Number} id - Command ID, which is related to a specific menu entry - The desired CmdID.
     * @returns {OnCommand} - The class instance for method chaining.
     */
    setCmdID (id) {
        this.setParameter(OnCommand.KEY_CMD_ID, id);
        return this;
    }

    /**
     * Get the CmdID
     * @returns {Number} - the KEY_CMD_ID value
     */
    getCmdID () {
        return this.getParameter(OnCommand.KEY_CMD_ID);
    }

    /**
     * Set the TriggerSource
     * @param {TriggerSource} source - See TriggerSource - The desired TriggerSource.
     * @returns {OnCommand} - The class instance for method chaining.
     */
    setTriggerSource (source) {
        this.validateType(TriggerSource, source);
        this.setParameter(OnCommand.KEY_TRIGGER_SOURCE, source);
        return this;
    }

    /**
     * Get the TriggerSource
     * @returns {TriggerSource} - the KEY_TRIGGER_SOURCE value
     */
    getTriggerSource () {
        return this.getObject(TriggerSource, OnCommand.KEY_TRIGGER_SOURCE);
    }
}

OnCommand.KEY_CMD_ID = 'cmdID';
OnCommand.KEY_TRIGGER_SOURCE = 'triggerSource';

export { OnCommand };