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
import { SingleTireStatus } from './SingleTireStatus.js';
import { WarningLightStatus } from '../enums/WarningLightStatus.js';

/**
 * The status and pressure of the tires.
 */
class TireStatus extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {WarningLightStatus} telltale - Status of the Tire Pressure Telltale. See WarningLightStatus.
     * @return {TireStatus}
     */
    setPressureTelltale (telltale) {
        this.validateType(WarningLightStatus, telltale);
        this.setParameter(TireStatus.KEY_PRESSURE_TELLTALE, telltale);
        return this;
    }

    /**
     * @return {WarningLightStatus}
     */
    getPressureTelltale () {
        return this.getObject(WarningLightStatus, TireStatus.KEY_PRESSURE_TELLTALE);
    }

    /**
     * @param {SingleTireStatus} front - The status of the left front tire.
     * @return {TireStatus}
     */
    setLeftFront (front) {
        this.validateType(SingleTireStatus, front);
        this.setParameter(TireStatus.KEY_LEFT_FRONT, front);
        return this;
    }

    /**
     * @return {SingleTireStatus}
     */
    getLeftFront () {
        return this.getObject(SingleTireStatus, TireStatus.KEY_LEFT_FRONT);
    }

    /**
     * @param {SingleTireStatus} front - The status of the right front tire.
     * @return {TireStatus}
     */
    setRightFront (front) {
        this.validateType(SingleTireStatus, front);
        this.setParameter(TireStatus.KEY_RIGHT_FRONT, front);
        return this;
    }

    /**
     * @return {SingleTireStatus}
     */
    getRightFront () {
        return this.getObject(SingleTireStatus, TireStatus.KEY_RIGHT_FRONT);
    }

    /**
     * @param {SingleTireStatus} rear - The status of the left rear tire.
     * @return {TireStatus}
     */
    setLeftRear (rear) {
        this.validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_LEFT_REAR, rear);
        return this;
    }

    /**
     * @return {SingleTireStatus}
     */
    getLeftRear () {
        return this.getObject(SingleTireStatus, TireStatus.KEY_LEFT_REAR);
    }

    /**
     * @param {SingleTireStatus} rear - The status of the right rear tire.
     * @return {TireStatus}
     */
    setRightRear (rear) {
        this.validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_RIGHT_REAR, rear);
        return this;
    }

    /**
     * @return {SingleTireStatus}
     */
    getRightRear () {
        return this.getObject(SingleTireStatus, TireStatus.KEY_RIGHT_REAR);
    }

    /**
     * @param {SingleTireStatus} rear - The status of the inner left rear.
     * @return {TireStatus}
     */
    setInnerLeftRear (rear) {
        this.validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_INNER_LEFT_REAR, rear);
        return this;
    }

    /**
     * @return {SingleTireStatus}
     */
    getInnerLeftRear () {
        return this.getObject(SingleTireStatus, TireStatus.KEY_INNER_LEFT_REAR);
    }

    /**
     * @param {SingleTireStatus} rear - The status of the inner right rear.
     * @return {TireStatus}
     */
    setInnerRightRear (rear) {
        this.validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_INNER_RIGHT_REAR, rear);
        return this;
    }

    /**
     * @return {SingleTireStatus}
     */
    getInnerRightRear () {
        return this.getObject(SingleTireStatus, TireStatus.KEY_INNER_RIGHT_REAR);
    }
}

TireStatus.KEY_PRESSURE_TELLTALE = 'pressureTelltale';
TireStatus.KEY_LEFT_FRONT = 'leftFront';
TireStatus.KEY_RIGHT_FRONT = 'rightFront';
TireStatus.KEY_LEFT_REAR = 'leftRear';
TireStatus.KEY_RIGHT_REAR = 'rightRear';
TireStatus.KEY_INNER_LEFT_REAR = 'innerLeftRear';
TireStatus.KEY_INNER_RIGHT_REAR = 'innerRightRear';

export { TireStatus };