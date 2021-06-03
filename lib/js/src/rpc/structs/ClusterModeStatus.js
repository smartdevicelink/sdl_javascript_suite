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

import { CarModeStatus } from '../enums/CarModeStatus.js';
import { PowerModeQualificationStatus } from '../enums/PowerModeQualificationStatus.js';
import { PowerModeStatus } from '../enums/PowerModeStatus.js';
import { RpcStruct } from '../RpcStruct.js';

class ClusterModeStatus extends RpcStruct {
    /**
     * Initializes an instance of ClusterModeStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the PowerModeActive
     * @param {Boolean} active - References signal "PowerMode_UB". - The desired PowerModeActive.
     * @returns {ClusterModeStatus} - The class instance for method chaining.
     */
    setPowerModeActive (active) {
        this.setParameter(ClusterModeStatus.KEY_POWER_MODE_ACTIVE, active);
        return this;
    }

    /**
     * Get the PowerModeActive
     * @returns {Boolean} - the KEY_POWER_MODE_ACTIVE value
     */
    getPowerModeActive () {
        return this.getParameter(ClusterModeStatus.KEY_POWER_MODE_ACTIVE);
    }

    /**
     * Set the PowerModeQualificationStatus
     * @param {PowerModeQualificationStatus} status - References signal "PowerModeQF". See PowerModeQualificationStatus. - The desired PowerModeQualificationStatus.
     * @returns {ClusterModeStatus} - The class instance for method chaining.
     */
    setPowerModeQualificationStatus (status) {
        this._validateType(PowerModeQualificationStatus, status);
        this.setParameter(ClusterModeStatus.KEY_POWER_MODE_QUALIFICATION_STATUS, status);
        return this;
    }

    /**
     * Get the PowerModeQualificationStatus
     * @returns {PowerModeQualificationStatus} - the KEY_POWER_MODE_QUALIFICATION_STATUS value
     */
    getPowerModeQualificationStatus () {
        return this.getObject(PowerModeQualificationStatus, ClusterModeStatus.KEY_POWER_MODE_QUALIFICATION_STATUS);
    }

    /**
     * Set the CarModeStatus
     * @param {CarModeStatus} status - References signal "CarMode". See CarMode. - The desired CarModeStatus.
     * @returns {ClusterModeStatus} - The class instance for method chaining.
     */
    setCarModeStatus (status) {
        this._validateType(CarModeStatus, status);
        this.setParameter(ClusterModeStatus.KEY_CAR_MODE_STATUS, status);
        return this;
    }

    /**
     * Get the CarModeStatus
     * @returns {CarModeStatus} - the KEY_CAR_MODE_STATUS value
     */
    getCarModeStatus () {
        return this.getObject(CarModeStatus, ClusterModeStatus.KEY_CAR_MODE_STATUS);
    }

    /**
     * Set the PowerModeStatus
     * @param {PowerModeStatus} status - References signal "PowerMode". See PowerMode. - The desired PowerModeStatus.
     * @returns {ClusterModeStatus} - The class instance for method chaining.
     */
    setPowerModeStatus (status) {
        this._validateType(PowerModeStatus, status);
        this.setParameter(ClusterModeStatus.KEY_POWER_MODE_STATUS, status);
        return this;
    }

    /**
     * Get the PowerModeStatus
     * @returns {PowerModeStatus} - the KEY_POWER_MODE_STATUS value
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