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

import { RpcStruct } from '../RpcStruct.js';
import { SeatMemoryActionType } from '../enums/SeatMemoryActionType.js';

class SeatMemoryAction extends RpcStruct {
    /**
     * Initalizes an instance of SeatMemoryAction.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} id
     * @return {SeatMemoryAction}
     */
    setId (id) {
        this.setParameter(SeatMemoryAction.KEY_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getId () {
        return this.getParameter(SeatMemoryAction.KEY_ID);
    }

    /**
     * @param {String} label
     * @return {SeatMemoryAction}
     */
    setLabel (label) {
        this.setParameter(SeatMemoryAction.KEY_LABEL, label);
        return this;
    }

    /**
     * @return {String}
     */
    getLabel () {
        return this.getParameter(SeatMemoryAction.KEY_LABEL);
    }

    /**
     * @param {SeatMemoryActionType} action
     * @return {SeatMemoryAction}
     */
    setAction (action) {
        this.validateType(SeatMemoryActionType, action);
        this.setParameter(SeatMemoryAction.KEY_ACTION, action);
        return this;
    }

    /**
     * @return {SeatMemoryActionType}
     */
    getAction () {
        return this.getObject(SeatMemoryActionType, SeatMemoryAction.KEY_ACTION);
    }
}

SeatMemoryAction.KEY_ID = 'id';
SeatMemoryAction.KEY_LABEL = 'label';
SeatMemoryAction.KEY_ACTION = 'action';

export { SeatMemoryAction };