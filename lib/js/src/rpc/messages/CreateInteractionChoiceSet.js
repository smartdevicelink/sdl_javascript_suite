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

import { Choice } from '../structs/Choice.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * creates interaction choice set to be used later by performInteraction
 */
class CreateInteractionChoiceSet extends RpcRequest {
    /**
     * Initalizes an instance of CreateInteractionChoiceSet.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 1.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.CreateInteractionChoiceSet);
    }

    /**
     * Set the InteractionChoiceSetID
     * @param {Number} id - Unique ID used for this interaction choice set. - The desired InteractionChoiceSetID.
     * {'num_min_value': 0, 'num_max_value': 2000000000}
     * @returns {CreateInteractionChoiceSet} - The class instance for method chaining.
     */
    setInteractionChoiceSetID (id) {
        this.setParameter(CreateInteractionChoiceSet.KEY_INTERACTION_CHOICE_SET_ID, id);
        return this;
    }

    /**
     * Get the InteractionChoiceSetID
     * @returns {Number} - the KEY_INTERACTION_CHOICE_SET_ID value
     */
    getInteractionChoiceSetID () {
        return this.getParameter(CreateInteractionChoiceSet.KEY_INTERACTION_CHOICE_SET_ID);
    }

    /**
     * Set the ChoiceSet
     * @param {Choice[]} set - A choice is an option given to the user, which can be selected either by menu, or through voice recognition system. - The desired ChoiceSet.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {CreateInteractionChoiceSet} - The class instance for method chaining.
     */
    setChoiceSet (set) {
        this._validateType(Choice, set, true);
        this.setParameter(CreateInteractionChoiceSet.KEY_CHOICE_SET, set);
        return this;
    }

    /**
     * Get the ChoiceSet
     * @returns {Choice[]} - the KEY_CHOICE_SET value
     */
    getChoiceSet () {
        return this.getObject(Choice, CreateInteractionChoiceSet.KEY_CHOICE_SET);
    }
}

CreateInteractionChoiceSet.KEY_INTERACTION_CHOICE_SET_ID = 'interactionChoiceSetID';
CreateInteractionChoiceSet.KEY_CHOICE_SET = 'choiceSet';

export { CreateInteractionChoiceSet };