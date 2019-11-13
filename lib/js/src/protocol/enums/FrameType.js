/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} FrameType
 * @property {Object} MAP
 */
class FrameType extends Enum {

    /**
    * @constructor
    */
    constructor() {
        super();
    }

    /**
    * @return {Number}
    */
    static get CONTROL() {
        return FrameType.MAP.CONTROL;
    }

    /**
    * @return {Number}
    */
    static get FIRST() {
        return FrameType.MAP.FIRST;
    }

    /**
    * @return {Number}
    */
    static get CONSECUTIVE() {
        return FrameType.MAP.CONSECUTIVE;
    }

    /**
    * @return {Number}
    */
    static get SINGLE() {
        return FrameType.MAP.SINGLE;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {Number} value
    * @return {null|Number} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        for (let key in FrameType.MAP) {
            if (FrameType.MAP[key] === value) {
                return FrameType.MAP[key];
            }
        }

        return null;
    }
}

FrameType.MAP = Object.freeze({
  'CONTROL': 0x00,
  'FIRST': 0x02,
  'CONSECUTIVE': 0x03,
  'SINGLE': 0x01,
});

export { FrameType };
