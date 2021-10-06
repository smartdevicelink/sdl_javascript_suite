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
import { SingleTireStatus } from './SingleTireStatus.js';
import { WarningLightStatus } from '../enums/WarningLightStatus.js';

/**
 * The status and pressure of the tires.
 */
class TireStatus extends RpcStruct {
    /**
     * Initializes an instance of TireStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the PressureTelltale
     * @since SmartDeviceLink 2.0.0
     * @param {WarningLightStatus} telltale - Status of the Tire Pressure Telltale. See WarningLightStatus. - The desired PressureTelltale.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setPressureTelltale (telltale) {
        this._validateType(WarningLightStatus, telltale);
        this.setParameter(TireStatus.KEY_PRESSURE_TELLTALE, telltale);
        return this;
    }

    /**
     * Get the PressureTelltale
     * @returns {WarningLightStatus} - the KEY_PRESSURE_TELLTALE value
     */
    getPressureTelltale () {
        let warningLightStatus = this.getObject(WarningLightStatus, TireStatus.KEY_PRESSURE_TELLTALE);
        if (warningLightStatus === null) {
            warningLightStatus = WarningLightStatus.WLS_NOT_USED;
            this.setParameter(TireStatus.KEY_PRESSURE_TELLTALE, warningLightStatus);
            console.warn('TireStatus\'s pressureTelltale was null and will be set to WarningLightStatus.WLS_NOT_USED. In the future, this will change to be nullable.');
        }
        return warningLightStatus;
    }

    /**
     * Set the LeftFront
     * @since SmartDeviceLink 2.0.0
     * @param {SingleTireStatus} front - The status of the left front tire. - The desired LeftFront.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setLeftFront (front) {
        this._validateType(SingleTireStatus, front);
        this.setParameter(TireStatus.KEY_LEFT_FRONT, front);
        return this;
    }

    /**
     * Get the LeftFront
     * @returns {SingleTireStatus} - the KEY_LEFT_FRONT value
     */
    getLeftFront () {
        let tireStatus = this.getObject(SingleTireStatus, TireStatus.KEY_LEFT_FRONT);
        if (tireStatus === null) {
            tireStatus = new SingleTireStatus({
                status: 'UNKNOWN',
            });
            this.setParameter(TireStatus.KEY_LEFT_FRONT, tireStatus);
            console.warn('TireStatus\'s leftFront was null and will have its status set to UNKNOWN. In the future, this will change to be nullable.');
        }
        return tireStatus;
    }

    /**
     * Set the RightFront
     * @since SmartDeviceLink 2.0.0
     * @param {SingleTireStatus} front - The status of the right front tire. - The desired RightFront.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setRightFront (front) {
        this._validateType(SingleTireStatus, front);
        this.setParameter(TireStatus.KEY_RIGHT_FRONT, front);
        return this;
    }

    /**
     * Get the RightFront
     * @returns {SingleTireStatus} - the KEY_RIGHT_FRONT value
     */
    getRightFront () {
        let tireStatus = this.getObject(SingleTireStatus, TireStatus.KEY_RIGHT_FRONT);
        if (tireStatus === null) {
            tireStatus = new SingleTireStatus({
                status: 'UNKNOWN',
            });
            this.setParameter(TireStatus.KEY_RIGHT_FRONT, tireStatus);
            console.warn('TireStatus\'s rightFront was null and will have its status set to UNKNOWN. In the future, this will change to be nullable.');
        }
        return tireStatus;
    }

    /**
     * Set the LeftRear
     * @since SmartDeviceLink 2.0.0
     * @param {SingleTireStatus} rear - The status of the left rear tire. - The desired LeftRear.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setLeftRear (rear) {
        this._validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_LEFT_REAR, rear);
        return this;
    }

    /**
     * Get the LeftRear
     * @returns {SingleTireStatus} - the KEY_LEFT_REAR value
     */
    getLeftRear () {
        let tireStatus = this.getObject(SingleTireStatus, TireStatus.KEY_LEFT_REAR);
        if (tireStatus === null) {
            tireStatus = new SingleTireStatus({
                status: 'UNKNOWN',
            });
            this.setParameter(TireStatus.KEY_LEFT_REAR, tireStatus);
            console.warn('TireStatus\'s leftRear was null and will have its status set to UNKNOWN. In the future, this will change to be nullable.');
        }
        return tireStatus;
    }

    /**
     * Set the RightRear
     * @since SmartDeviceLink 2.0.0
     * @param {SingleTireStatus} rear - The status of the right rear tire. - The desired RightRear.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setRightRear (rear) {
        this._validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_RIGHT_REAR, rear);
        return this;
    }

    /**
     * Get the RightRear
     * @returns {SingleTireStatus} - the KEY_RIGHT_REAR value
     */
    getRightRear () {
        let tireStatus = this.getObject(SingleTireStatus, TireStatus.KEY_RIGHT_REAR);
        if (tireStatus === null) {
            tireStatus = new SingleTireStatus({
                status: 'UNKNOWN',
            });
            this.setParameter(TireStatus.KEY_RIGHT_REAR, tireStatus);
            console.warn('TireStatus\'s rightRear was null and will have its status set to UNKNOWN. In the future, this will change to be nullable.');
        }
        return tireStatus;
    }

    /**
     * Set the InnerLeftRear
     * @since SmartDeviceLink 2.0.0
     * @param {SingleTireStatus} rear - The status of the inner left rear. - The desired InnerLeftRear.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setInnerLeftRear (rear) {
        this._validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_INNER_LEFT_REAR, rear);
        return this;
    }

    /**
     * Get the InnerLeftRear
     * @returns {SingleTireStatus} - the KEY_INNER_LEFT_REAR value
     */
    getInnerLeftRear () {
        let tireStatus = this.getObject(SingleTireStatus, TireStatus.KEY_INNER_LEFT_REAR);
        if (tireStatus === null) {
            tireStatus = new SingleTireStatus({
                status: 'UNKNOWN',
            });
            this.setParameter(TireStatus.KEY_INNER_LEFT_REAR, tireStatus);
            console.warn('TireStatus\'s innerLeftRear was null and will have its status set to UNKNOWN. In the future, this will change to be nullable.');
        }
        return tireStatus;
    }

    /**
     * Set the InnerRightRear
     * @since SmartDeviceLink 2.0.0
     * @param {SingleTireStatus} rear - The status of the inner right rear. - The desired InnerRightRear.
     * @returns {TireStatus} - The class instance for method chaining.
     */
    setInnerRightRear (rear) {
        this._validateType(SingleTireStatus, rear);
        this.setParameter(TireStatus.KEY_INNER_RIGHT_REAR, rear);
        return this;
    }

    /**
     * Get the InnerRightRear
     * @returns {SingleTireStatus} - the KEY_INNER_RIGHT_REAR value
     */
    getInnerRightRear () {
        let tireStatus = this.getObject(SingleTireStatus, TireStatus.KEY_INNER_RIGHT_REAR);
        if (tireStatus === null) {
            tireStatus = new SingleTireStatus({
                status: 'UNKNOWN',
            });
            this.setParameter(TireStatus.KEY_INNER_RIGHT_REAR, tireStatus);
            console.warn('TireStatus\'s innerRightRear was null and will have its status set to UNKNOWN. In the future, this will change to be nullable.');
        }
        return tireStatus;
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