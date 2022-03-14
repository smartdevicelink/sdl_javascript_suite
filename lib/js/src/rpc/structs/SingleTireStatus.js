/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { ComponentVolumeStatus } from '../enums/ComponentVolumeStatus.js';
import { RpcStruct } from '../RpcStruct.js';
import { TPMS } from '../enums/TPMS.js';

class SingleTireStatus extends RpcStruct {
    /**
     * Initializes an instance of SingleTireStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Status
     * @param {ComponentVolumeStatus} status - See ComponentVolumeStatus. - The desired Status.
     * @returns {SingleTireStatus} - The class instance for method chaining.
     */
    setStatus (status) {
        this._validateType(ComponentVolumeStatus, status);
        this.setParameter(SingleTireStatus.KEY_STATUS, status);
        return this;
    }

    /**
     * Get the Status
     * @returns {ComponentVolumeStatus} - the KEY_STATUS value
     */
    getStatus () {
        return this.getObject(ComponentVolumeStatus, SingleTireStatus.KEY_STATUS);
    }

    /**
     * Set the Tpms
     * @since SmartDeviceLink 5.0.0
     * @param {TPMS} tpms - The status of TPMS according to the particular tire. - The desired Tpms.
     * @returns {SingleTireStatus} - The class instance for method chaining.
     */
    setTpms (tpms) {
        this._validateType(TPMS, tpms);
        this.setParameter(SingleTireStatus.KEY_TPMS, tpms);
        return this;
    }

    /**
     * Get the Tpms
     * @returns {TPMS} - the KEY_TPMS value
     */
    getTpms () {
        return this.getObject(TPMS, SingleTireStatus.KEY_TPMS);
    }

    /**
     * Set the Pressure
     * @since SmartDeviceLink 5.0.0
     * @param {Number} pressure - The pressure value of the particular tire in kilo pascal. - The desired Pressure.
     * {'num_min_value': 0.0, 'num_max_value': 2000.0}
     * @returns {SingleTireStatus} - The class instance for method chaining.
     */
    setPressure (pressure) {
        this.setParameter(SingleTireStatus.KEY_PRESSURE, pressure);
        return this;
    }

    /**
     * Get the Pressure
     * @returns {Number} - the KEY_PRESSURE value
     */
    getPressure () {
        return this.getParameter(SingleTireStatus.KEY_PRESSURE);
    }
}

SingleTireStatus.KEY_STATUS = 'status';
SingleTireStatus.KEY_TPMS = 'tpms';
SingleTireStatus.KEY_PRESSURE = 'pressure';

export { SingleTireStatus };