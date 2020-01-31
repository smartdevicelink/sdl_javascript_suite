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
import { PowerModeStatus } from '../enums/PowerModeStatus.js';
import { CarModeStatus } from '../enums/CarModeStatus.js';
import { PowerModeQualificationStatus } from '../enums/PowerModeQualificationStatus.js';

class ClusterModeStatus extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Boolean} active - References signal "PowerMode_UB".
     * @return {ClusterModeStatus}
     */
    setPowerModeActive (active) {
        this.setParameter(ClusterModeStatus.KEY_POWER_MODE_ACTIVE, active);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getPowerModeActive () {
        return this.getParameter(ClusterModeStatus.KEY_POWER_MODE_ACTIVE);
    }

    /**
     * @param {PowerModeQualificationStatus} status - References signal "PowerModeQF". See PowerModeQualificationStatus.
     * @return {ClusterModeStatus}
     */
    setPowerModeQualificationStatus (status) {
        this.validateType(PowerModeQualificationStatus, status);
        this.setParameter(ClusterModeStatus.KEY_POWER_MODE_QUALIFICATION_STATUS, status);
        return this;
    }

    /**
     * @return {PowerModeQualificationStatus}
     */
    getPowerModeQualificationStatus () {
        return this.getObject(PowerModeQualificationStatus, ClusterModeStatus.KEY_POWER_MODE_QUALIFICATION_STATUS);
    }

    /**
     * @param {CarModeStatus} status - References signal "CarMode". See CarMode.
     * @return {ClusterModeStatus}
     */
    setCarModeStatus (status) {
        this.validateType(CarModeStatus, status);
        this.setParameter(ClusterModeStatus.KEY_CAR_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {CarModeStatus}
     */
    getCarModeStatus () {
        return this.getObject(CarModeStatus, ClusterModeStatus.KEY_CAR_MODE_STATUS);
    }

    /**
     * @param {PowerModeStatus} status - References signal "PowerMode". See PowerMode.
     * @return {ClusterModeStatus}
     */
    setPowerModeStatus (status) {
        this.validateType(PowerModeStatus, status);
        this.setParameter(ClusterModeStatus.KEY_POWER_MODE_STATUS, status);
        return this;
    }

    /**
     * @return {PowerModeStatus}
     */
    getPowerModeStatus () {
        return this.getObject(PowerModeStatus, ClusterModeStatus.KEY_POWER_MODE_STATUS);
    }
}

ClusterModeStatus.KEY_POWER_MODE_ACTIVE = 'powerModeActive';
ClusterModeStatus.KEY_POWER_MODE_QUALIFICATION_STATUS = 'powerModeQualificationStatus';
ClusterModeStatus.KEY_CAR_MODE_STATUS = 'carModeStatus';
ClusterModeStatus.KEY_POWER_MODE_STATUS = 'powerModeStatus';

export { ClusterModeStatus };