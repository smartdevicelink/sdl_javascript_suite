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

import { MassageCushionFirmness } from './MassageCushionFirmness.js';
import { MassageModeData } from './MassageModeData.js';
import { RpcStruct } from '../RpcStruct.js';
import { SeatMemoryAction } from './SeatMemoryAction.js';
import { SupportedSeat } from '../enums/SupportedSeat.js';

/**
 * Seat control data corresponds to "SEAT" ModuleType.
 */
class SeatControlData extends RpcStruct {
    /**
     * Initalizes an instance of SeatControlData.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {SupportedSeat} id - List possible seats that is a remote controllable seat.
     * @return {SeatControlData}
     */
    setId (id) {
        this.validateType(SupportedSeat, id);
        this.setParameter(SeatControlData.KEY_ID, id);
        return this;
    }

    /**
     * @return {SupportedSeat}
     */
    getId () {
        return this.getObject(SupportedSeat, SeatControlData.KEY_ID);
    }

    /**
     * @param {Boolean} enabled
     * @return {SeatControlData}
     */
    setHeatingEnabled (enabled) {
        this.setParameter(SeatControlData.KEY_HEATING_ENABLED, enabled);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHeatingEnabled () {
        return this.getParameter(SeatControlData.KEY_HEATING_ENABLED);
    }

    /**
     * @param {Boolean} enabled
     * @return {SeatControlData}
     */
    setCoolingEnabled (enabled) {
        this.setParameter(SeatControlData.KEY_COOLING_ENABLED, enabled);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getCoolingEnabled () {
        return this.getParameter(SeatControlData.KEY_COOLING_ENABLED);
    }

    /**
     * @param {Number} level
     * @return {SeatControlData}
     */
    setHeatingLevel (level) {
        this.setParameter(SeatControlData.KEY_HEATING_LEVEL, level);
        return this;
    }

    /**
     * @return {Number}
     */
    getHeatingLevel () {
        return this.getParameter(SeatControlData.KEY_HEATING_LEVEL);
    }

    /**
     * @param {Number} level
     * @return {SeatControlData}
     */
    setCoolingLevel (level) {
        this.setParameter(SeatControlData.KEY_COOLING_LEVEL, level);
        return this;
    }

    /**
     * @return {Number}
     */
    getCoolingLevel () {
        return this.getParameter(SeatControlData.KEY_COOLING_LEVEL);
    }

    /**
     * @param {Number} position
     * @return {SeatControlData}
     */
    setHorizontalPosition (position) {
        this.setParameter(SeatControlData.KEY_HORIZONTAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getHorizontalPosition () {
        return this.getParameter(SeatControlData.KEY_HORIZONTAL_POSITION);
    }

    /**
     * @param {Number} position
     * @return {SeatControlData}
     */
    setVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_VERTICAL_POSITION);
    }

    /**
     * @param {Number} position
     * @return {SeatControlData}
     */
    setFrontVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_FRONT_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getFrontVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_FRONT_VERTICAL_POSITION);
    }

    /**
     * @param {Number} position
     * @return {SeatControlData}
     */
    setBackVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_BACK_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getBackVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_BACK_VERTICAL_POSITION);
    }

    /**
     * @param {Number} angle
     * @return {SeatControlData}
     */
    setBackTiltAngle (angle) {
        this.setParameter(SeatControlData.KEY_BACK_TILT_ANGLE, angle);
        return this;
    }

    /**
     * @return {Number}
     */
    getBackTiltAngle () {
        return this.getParameter(SeatControlData.KEY_BACK_TILT_ANGLE);
    }

    /**
     * @param {Number} position
     * @return {SeatControlData}
     */
    setHeadSupportHorizontalPosition (position) {
        this.setParameter(SeatControlData.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getHeadSupportHorizontalPosition () {
        return this.getParameter(SeatControlData.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION);
    }

    /**
     * @param {Number} position
     * @return {SeatControlData}
     */
    setHeadSupportVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_HEAD_SUPPORT_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * @return {Number}
     */
    getHeadSupportVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_HEAD_SUPPORT_VERTICAL_POSITION);
    }

    /**
     * @param {Boolean} enabled
     * @return {SeatControlData}
     */
    setMassageEnabled (enabled) {
        this.setParameter(SeatControlData.KEY_MASSAGE_ENABLED, enabled);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getMassageEnabled () {
        return this.getParameter(SeatControlData.KEY_MASSAGE_ENABLED);
    }

    /**
     * @param {MassageModeData[]} mode - Specify the mode of a massage zone.
     * @return {SeatControlData}
     */
    setMassageMode (mode) {
        this.validateType(MassageModeData, mode, true);
        this.setParameter(SeatControlData.KEY_MASSAGE_MODE, mode);
        return this;
    }

    /**
     * @return {MassageModeData[]}
     */
    getMassageMode () {
        return this.getObject(MassageModeData, SeatControlData.KEY_MASSAGE_MODE);
    }

    /**
     * @param {MassageCushionFirmness[]} firmness - The intensity or firmness of a cushion.
     * @return {SeatControlData}
     */
    setMassageCushionFirmness (firmness) {
        this.validateType(MassageCushionFirmness, firmness, true);
        this.setParameter(SeatControlData.KEY_MASSAGE_CUSHION_FIRMNESS, firmness);
        return this;
    }

    /**
     * @return {MassageCushionFirmness[]}
     */
    getMassageCushionFirmness () {
        return this.getObject(MassageCushionFirmness, SeatControlData.KEY_MASSAGE_CUSHION_FIRMNESS);
    }

    /**
     * @param {SeatMemoryAction} memory
     * @return {SeatControlData}
     */
    setMemory (memory) {
        this.validateType(SeatMemoryAction, memory);
        this.setParameter(SeatControlData.KEY_MEMORY, memory);
        return this;
    }

    /**
     * @return {SeatMemoryAction}
     */
    getMemory () {
        return this.getObject(SeatMemoryAction, SeatControlData.KEY_MEMORY);
    }
}

SeatControlData.KEY_ID = 'id';
SeatControlData.KEY_HEATING_ENABLED = 'heatingEnabled';
SeatControlData.KEY_COOLING_ENABLED = 'coolingEnabled';
SeatControlData.KEY_HEATING_LEVEL = 'heatingLevel';
SeatControlData.KEY_COOLING_LEVEL = 'coolingLevel';
SeatControlData.KEY_HORIZONTAL_POSITION = 'horizontalPosition';
SeatControlData.KEY_VERTICAL_POSITION = 'verticalPosition';
SeatControlData.KEY_FRONT_VERTICAL_POSITION = 'frontVerticalPosition';
SeatControlData.KEY_BACK_VERTICAL_POSITION = 'backVerticalPosition';
SeatControlData.KEY_BACK_TILT_ANGLE = 'backTiltAngle';
SeatControlData.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION = 'headSupportHorizontalPosition';
SeatControlData.KEY_HEAD_SUPPORT_VERTICAL_POSITION = 'headSupportVerticalPosition';
SeatControlData.KEY_MASSAGE_ENABLED = 'massageEnabled';
SeatControlData.KEY_MASSAGE_MODE = 'massageMode';
SeatControlData.KEY_MASSAGE_CUSHION_FIRMNESS = 'massageCushionFirmness';
SeatControlData.KEY_MEMORY = 'memory';

export { SeatControlData };