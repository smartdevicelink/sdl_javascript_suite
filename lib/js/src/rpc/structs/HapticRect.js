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

import { Rectangle } from './Rectangle.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Defines haptic data for each user control object for video streaming application
 */
class HapticRect extends RpcStruct {
    /**
     * Initalizes an instance of HapticRect.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} id - A user control spatial identifier
     * @return {HapticRect}
     */
    setId (id) {
        this.setParameter(HapticRect.KEY_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getId () {
        return this.getParameter(HapticRect.KEY_ID);
    }

    /**
     * @param {Rectangle} rect - The position of the haptic rectangle to be highlighted. The center of this rectangle
     *                           will be "touched" when a press occurs.
     * @return {HapticRect}
     */
    setRect (rect) {
        this.validateType(Rectangle, rect);
        this.setParameter(HapticRect.KEY_RECT, rect);
        return this;
    }

    /**
     * @return {Rectangle}
     */
    getRect () {
        return this.getObject(Rectangle, HapticRect.KEY_RECT);
    }
}

HapticRect.KEY_ID = 'id';
HapticRect.KEY_RECT = 'rect';

export { HapticRect };