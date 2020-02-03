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
import { TouchCoord } from './TouchCoord.js';

class TouchEvent extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} id - A touch's unique identifier. The application can track the current touch events by id. If a
     *                      touch event has type begin, the id should be added to the set of touches. If a touch event
     *                      has type end, the id should be removed from the set of touches.
     * @return {TouchEvent}
     */
    setId (id) {
        this.setParameter(TouchEvent.KEY_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getId () {
        return this.getParameter(TouchEvent.KEY_ID);
    }

    /**
     * @param {Number[]} ts - The time that the touch was recorded. This number can the time since the beginning of the
     *                        session or something else as long as the units are in milliseconds. The timestamp is used
     *                        to determined the rate of change of position of a touch. The application also uses the
     *                        time to verify whether two touches, with different ids, are part of a single action by the
     *                        user. If there is only a single timestamp in this array, it is the same for every
     *                        coordinate in the coordinates array.
     * @return {TouchEvent}
     */
    setTs (ts) {
        this.setParameter(TouchEvent.KEY_TS, ts);
        return this;
    }

    /**
     * @return {Number[]}
     */
    getTs () {
        return this.getParameter(TouchEvent.KEY_TS);
    }

    /**
     * @param {TouchCoord[]} c
     * @return {TouchEvent}
     */
    setC (c) {
        this.validateType(TouchCoord, c, true);
        this.setParameter(TouchEvent.KEY_C, c);
        return this;
    }

    /**
     * @return {TouchCoord[]}
     */
    getC () {
        return this.getObject(TouchCoord, TouchEvent.KEY_C);
    }
}

TouchEvent.KEY_ID = 'id';
TouchEvent.KEY_TS = 'ts';
TouchEvent.KEY_C = 'c';

export { TouchEvent };