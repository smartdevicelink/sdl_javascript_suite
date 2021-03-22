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

/**
 * Non periodic vehicle diagnostic request
 */
class DiagnosticMessage extends RpcRequest {
    /**
     * Initializes an instance of DiagnosticMessage.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.DiagnosticMessage);
    }

    /**
     * Set the TargetID
     * @param {Number} id - Name of target ECU. - The desired TargetID.
     * {'num_min_value': 0, 'num_max_value': 65535}
     * @returns {DiagnosticMessage} - The class instance for method chaining.
     */
    setTargetID (id) {
        this.setParameter(DiagnosticMessage.KEY_TARGET_ID, id);
        return this;
    }

    /**
     * Get the TargetID
     * @returns {Number} - the KEY_TARGET_ID value
     */
    getTargetID () {
        return this.getParameter(DiagnosticMessage.KEY_TARGET_ID);
    }

    /**
     * Set the MessageLength
     * @param {Number} length - Length of message (in bytes). - The desired MessageLength.
     * {'num_min_value': 0, 'num_max_value': 65535}
     * @returns {DiagnosticMessage} - The class instance for method chaining.
     */
    setMessageLength (length) {
        this.setParameter(DiagnosticMessage.KEY_MESSAGE_LENGTH, length);
        return this;
    }

    /**
     * Get the MessageLength
     * @returns {Number} - the KEY_MESSAGE_LENGTH value
     */
    getMessageLength () {
        return this.getParameter(DiagnosticMessage.KEY_MESSAGE_LENGTH);
    }

    /**
     * Set the MessageData
     * @param {Number[]} data - Array of bytes comprising CAN message. - The desired MessageData.
     * {'array_min_size': 1, 'array_max_size': 65535, 'num_min_value': 0, 'num_max_value': 255}
     * @returns {DiagnosticMessage} - The class instance for method chaining.
     */
    setMessageData (data) {
        this.setParameter(DiagnosticMessage.KEY_MESSAGE_DATA, data);
        return this;
    }

    /**
     * Get the MessageData
     * @returns {Number[]} - the KEY_MESSAGE_DATA value
     */
    getMessageData () {
        return this.getParameter(DiagnosticMessage.KEY_MESSAGE_DATA);
    }
}

DiagnosticMessage.KEY_TARGET_ID = 'targetID';
DiagnosticMessage.KEY_MESSAGE_LENGTH = 'messageLength';
DiagnosticMessage.KEY_MESSAGE_DATA = 'messageData';

export { DiagnosticMessage };