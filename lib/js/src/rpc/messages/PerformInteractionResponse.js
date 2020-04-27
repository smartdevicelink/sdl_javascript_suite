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
import { RpcResponse } from '../RpcResponse.js';
import { TriggerSource } from '../enums/TriggerSource.js';

class PerformInteractionResponse extends RpcResponse {
    /**
     * Initalizes an instance of PerformInteractionResponse.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.PerformInteraction);
    }

    /**
     * Set the ChoiceID
     * @param {Number} id - ID of the choice that was selected in response to PerformInteraction. Only is valid if - The desired ChoiceID.
     * general result is "success:true".
     * @returns {PerformInteractionResponse} - The class instance for method chaining.
     */
    setChoiceID (id) {
        this.setParameter(PerformInteractionResponse.KEY_CHOICE_ID, id);
        return this;
    }

    /**
     * Get the ChoiceID
     * @returns {Number} - the KEY_CHOICE_ID value
     */
    getChoiceID () {
        return this.getParameter(PerformInteractionResponse.KEY_CHOICE_ID);
    }

    /**
     * Set the ManualTextEntry
     * @param {String} entry - Manually entered text selection, e.g. through keyboard Can be returned in lieu of - The desired ManualTextEntry.
     * choiceID, depending on trigger source
     * @returns {PerformInteractionResponse} - The class instance for method chaining.
     */
    setManualTextEntry (entry) {
        this.setParameter(PerformInteractionResponse.KEY_MANUAL_TEXT_ENTRY, entry);
        return this;
    }

    /**
     * Get the ManualTextEntry
     * @returns {String} - the KEY_MANUAL_TEXT_ENTRY value
     */
    getManualTextEntry () {
        return this.getParameter(PerformInteractionResponse.KEY_MANUAL_TEXT_ENTRY);
    }

    /**
     * Set the TriggerSource
     * @param {TriggerSource} source - See TriggerSource Only is valid if resultCode is SUCCESS. - The desired TriggerSource.
     * @returns {PerformInteractionResponse} - The class instance for method chaining.
     */
    setTriggerSource (source) {
        this._validateType(TriggerSource, source);
        this.setParameter(PerformInteractionResponse.KEY_TRIGGER_SOURCE, source);
        return this;
    }

    /**
     * Get the TriggerSource
     * @returns {TriggerSource} - the KEY_TRIGGER_SOURCE value
     */
    getTriggerSource () {
        return this.getObject(TriggerSource, PerformInteractionResponse.KEY_TRIGGER_SOURCE);
    }
}

PerformInteractionResponse.KEY_CHOICE_ID = 'choiceID';
PerformInteractionResponse.KEY_MANUAL_TEXT_ENTRY = 'manualTextEntry';
PerformInteractionResponse.KEY_TRIGGER_SOURCE = 'triggerSource';

export { PerformInteractionResponse };