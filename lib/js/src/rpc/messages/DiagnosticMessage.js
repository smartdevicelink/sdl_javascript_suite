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
import { RpcRequest } from '../RpcRequest.js';

/**
 * Non periodic vehicle diagnostic request
 */
class DiagnosticMessage extends RpcRequest {
    /**
     * Initalizes an instance of DiagnosticMessage.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.DiagnosticMessage);
    }

    /**
     * @param {Number} id - Name of target ECU.
     * @return {DiagnosticMessage}
     */
    setTargetID (id) {
        this.setParameter(DiagnosticMessage.KEY_TARGET_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getTargetID () {
        return this.getParameter(DiagnosticMessage.KEY_TARGET_ID);
    }

    /**
     * @param {Number} length - Length of message (in bytes).
     * @return {DiagnosticMessage}
     */
    setMessageLength (length) {
        this.setParameter(DiagnosticMessage.KEY_MESSAGE_LENGTH, length);
        return this;
    }

    /**
     * @return {Number}
     */
    getMessageLength () {
        return this.getParameter(DiagnosticMessage.KEY_MESSAGE_LENGTH);
    }

    /**
     * @param {Number[]} data - Array of bytes comprising CAN message.
     * @return {DiagnosticMessage}
     */
    setMessageData (data) {
        this.setParameter(DiagnosticMessage.KEY_MESSAGE_DATA, data);
        return this;
    }

    /**
     * @return {Number[]}
     */
    getMessageData () {
        return this.getParameter(DiagnosticMessage.KEY_MESSAGE_DATA);
    }
}

DiagnosticMessage.KEY_TARGET_ID = 'targetID';
DiagnosticMessage.KEY_MESSAGE_LENGTH = 'messageLength';
DiagnosticMessage.KEY_MESSAGE_DATA = 'messageData';

export { DiagnosticMessage };