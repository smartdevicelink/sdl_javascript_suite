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

import { RpcStruct } from '../RpcStruct.js';
import { SeekIndicatorType } from '../enums/SeekIndicatorType.js';

/**
 * The seek next / skip previous subscription buttons' content
 */
class SeekStreamingIndicator extends RpcStruct {
    /**
     * Initializes an instance of SeekStreamingIndicator.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Type
     * @param {SeekIndicatorType} type - The desired Type.
     * @returns {SeekStreamingIndicator} - The class instance for method chaining.
     */
    setType (type) {
        this._validateType(SeekIndicatorType, type);
        this.setParameter(SeekStreamingIndicator.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {SeekIndicatorType} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(SeekIndicatorType, SeekStreamingIndicator.KEY_TYPE);
    }

    /**
     * Set the SeekTime
     * @param {Number} time - If the type is TIME, this number of seconds may be present alongside the skip indicator. It will indicate the number of seconds that the currently playing media will skip forward or backward. - The desired SeekTime.
     * {'num_min_value': 1, 'num_max_value': 99}
     * @returns {SeekStreamingIndicator} - The class instance for method chaining.
     */
    setSeekTime (time) {
        this.setParameter(SeekStreamingIndicator.KEY_SEEK_TIME, time);
        return this;
    }

    /**
     * Get the SeekTime
     * @returns {Number} - the KEY_SEEK_TIME value
     */
    getSeekTime () {
        return this.getParameter(SeekStreamingIndicator.KEY_SEEK_TIME);
    }
}

SeekStreamingIndicator.KEY_TYPE = 'type';
SeekStreamingIndicator.KEY_SEEK_TIME = 'seekTime';

export { SeekStreamingIndicator };