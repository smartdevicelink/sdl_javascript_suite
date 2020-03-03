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

class StartTime extends RpcStruct {
    /**
     * Initalizes an instance of StartTime.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} hours - The hour of the media clock. Some radios only support a max of 19 hours. If out of range,
     *                         it will be rejected.
     * @return {StartTime}
     */
    setHours (hours) {
        this.setParameter(StartTime.KEY_HOURS, hours);
        return this;
    }

    /**
     * @return {Number}
     */
    getHours () {
        return this.getParameter(StartTime.KEY_HOURS);
    }

    /**
     * @param {Number} minutes
     * @return {StartTime}
     */
    setMinutes (minutes) {
        this.setParameter(StartTime.KEY_MINUTES, minutes);
        return this;
    }

    /**
     * @return {Number}
     */
    getMinutes () {
        return this.getParameter(StartTime.KEY_MINUTES);
    }

    /**
     * @param {Number} seconds
     * @return {StartTime}
     */
    setSeconds (seconds) {
        this.setParameter(StartTime.KEY_SECONDS, seconds);
        return this;
    }

    /**
     * @return {Number}
     */
    getSeconds () {
        return this.getParameter(StartTime.KEY_SECONDS);
    }
}

StartTime.KEY_HOURS = 'hours';
StartTime.KEY_MINUTES = 'minutes';
StartTime.KEY_SECONDS = 'seconds';

export { StartTime };