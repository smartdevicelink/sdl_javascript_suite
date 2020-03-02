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

class AlertResponse extends RpcResponse {
    /**
     * Initalizes an instance of AlertResponse.
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.Alert);
    }

    /**
     * @param {Number} time - Amount of time (in seconds) that an app must wait before resending an alert. If provided,
     *                        another system event or overlay currently has a higher priority than this alert. An app
     *                        must not send an alert without waiting at least the amount of time dictated.
     * @return {AlertResponse}
     */
    setTryAgainTime (time) {
        this.setParameter(AlertResponse.KEY_TRY_AGAIN_TIME, time);
        return this;
    }

    /**
     * @return {Number}
     */
    getTryAgainTime () {
        return this.getParameter(AlertResponse.KEY_TRY_AGAIN_TIME);
    }
}

AlertResponse.KEY_TRY_AGAIN_TIME = 'tryAgainTime';

export { AlertResponse };