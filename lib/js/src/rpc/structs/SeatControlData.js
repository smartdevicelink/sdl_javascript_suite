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
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Id
     * @param {SupportedSeat} id - List possible seats that is a remote controllable seat. - The desired Id.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setId (id) {
        this.validateType(SupportedSeat, id);
        this.setParameter(SeatControlData.KEY_ID, id);
        return this;
    }

    /**
     * Get the Id
     * @returns {SupportedSeat} - the KEY_ID value
     */
    getId () {
        return this.getObject(SupportedSeat, SeatControlData.KEY_ID);
    }

    /**
     * Set the HeatingEnabled
     * @param {Boolean} enabled - The desired HeatingEnabled.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setHeatingEnabled (enabled) {
        this.setParameter(SeatControlData.KEY_HEATING_ENABLED, enabled);
        return this;
    }

    /**
     * Get the HeatingEnabled
     * @returns {Boolean} - the KEY_HEATING_ENABLED value
     */
    getHeatingEnabled () {
        return this.getParameter(SeatControlData.KEY_HEATING_ENABLED);
    }

    /**
     * Set the CoolingEnabled
     * @param {Boolean} enabled - The desired CoolingEnabled.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setCoolingEnabled (enabled) {
        this.setParameter(SeatControlData.KEY_COOLING_ENABLED, enabled);
        return this;
    }

    /**
     * Get the CoolingEnabled
     * @returns {Boolean} - the KEY_COOLING_ENABLED value
     */
    getCoolingEnabled () {
        return this.getParameter(SeatControlData.KEY_COOLING_ENABLED);
    }

    /**
     * Set the HeatingLevel
     * @param {Number} level - The desired HeatingLevel.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setHeatingLevel (level) {
        this.setParameter(SeatControlData.KEY_HEATING_LEVEL, level);
        return this;
    }

    /**
     * Get the HeatingLevel
     * @returns {Number} - the KEY_HEATING_LEVEL value
     */
    getHeatingLevel () {
        return this.getParameter(SeatControlData.KEY_HEATING_LEVEL);
    }

    /**
     * Set the CoolingLevel
     * @param {Number} level - The desired CoolingLevel.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setCoolingLevel (level) {
        this.setParameter(SeatControlData.KEY_COOLING_LEVEL, level);
        return this;
    }

    /**
     * Get the CoolingLevel
     * @returns {Number} - the KEY_COOLING_LEVEL value
     */
    getCoolingLevel () {
        return this.getParameter(SeatControlData.KEY_COOLING_LEVEL);
    }

    /**
     * Set the HorizontalPosition
     * @param {Number} position - The desired HorizontalPosition.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setHorizontalPosition (position) {
        this.setParameter(SeatControlData.KEY_HORIZONTAL_POSITION, position);
        return this;
    }

    /**
     * Get the HorizontalPosition
     * @returns {Number} - the KEY_HORIZONTAL_POSITION value
     */
    getHorizontalPosition () {
        return this.getParameter(SeatControlData.KEY_HORIZONTAL_POSITION);
    }

    /**
     * Set the VerticalPosition
     * @param {Number} position - The desired VerticalPosition.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * Get the VerticalPosition
     * @returns {Number} - the KEY_VERTICAL_POSITION value
     */
    getVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_VERTICAL_POSITION);
    }

    /**
     * Set the FrontVerticalPosition
     * @param {Number} position - The desired FrontVerticalPosition.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setFrontVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_FRONT_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * Get the FrontVerticalPosition
     * @returns {Number} - the KEY_FRONT_VERTICAL_POSITION value
     */
    getFrontVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_FRONT_VERTICAL_POSITION);
    }

    /**
     * Set the BackVerticalPosition
     * @param {Number} position - The desired BackVerticalPosition.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setBackVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_BACK_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * Get the BackVerticalPosition
     * @returns {Number} - the KEY_BACK_VERTICAL_POSITION value
     */
    getBackVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_BACK_VERTICAL_POSITION);
    }

    /**
     * Set the BackTiltAngle
     * @param {Number} angle - The desired BackTiltAngle.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setBackTiltAngle (angle) {
        this.setParameter(SeatControlData.KEY_BACK_TILT_ANGLE, angle);
        return this;
    }

    /**
     * Get the BackTiltAngle
     * @returns {Number} - the KEY_BACK_TILT_ANGLE value
     */
    getBackTiltAngle () {
        return this.getParameter(SeatControlData.KEY_BACK_TILT_ANGLE);
    }

    /**
     * Set the HeadSupportHorizontalPosition
     * @param {Number} position - The desired HeadSupportHorizontalPosition.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setHeadSupportHorizontalPosition (position) {
        this.setParameter(SeatControlData.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION, position);
        return this;
    }

    /**
     * Get the HeadSupportHorizontalPosition
     * @returns {Number} - the KEY_HEAD_SUPPORT_HORIZONTAL_POSITION value
     */
    getHeadSupportHorizontalPosition () {
        return this.getParameter(SeatControlData.KEY_HEAD_SUPPORT_HORIZONTAL_POSITION);
    }

    /**
     * Set the HeadSupportVerticalPosition
     * @param {Number} position - The desired HeadSupportVerticalPosition.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setHeadSupportVerticalPosition (position) {
        this.setParameter(SeatControlData.KEY_HEAD_SUPPORT_VERTICAL_POSITION, position);
        return this;
    }

    /**
     * Get the HeadSupportVerticalPosition
     * @returns {Number} - the KEY_HEAD_SUPPORT_VERTICAL_POSITION value
     */
    getHeadSupportVerticalPosition () {
        return this.getParameter(SeatControlData.KEY_HEAD_SUPPORT_VERTICAL_POSITION);
    }

    /**
     * Set the MassageEnabled
     * @param {Boolean} enabled - The desired MassageEnabled.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setMassageEnabled (enabled) {
        this.setParameter(SeatControlData.KEY_MASSAGE_ENABLED, enabled);
        return this;
    }

    /**
     * Get the MassageEnabled
     * @returns {Boolean} - the KEY_MASSAGE_ENABLED value
     */
    getMassageEnabled () {
        return this.getParameter(SeatControlData.KEY_MASSAGE_ENABLED);
    }

    /**
     * Set the MassageMode
     * @param {MassageModeData[]} mode - Specify the mode of a massage zone. - The desired MassageMode.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setMassageMode (mode) {
        this.validateType(MassageModeData, mode, true);
        this.setParameter(SeatControlData.KEY_MASSAGE_MODE, mode);
        return this;
    }

    /**
     * Get the MassageMode
     * @returns {MassageModeData[]} - the KEY_MASSAGE_MODE value
     */
    getMassageMode () {
        return this.getObject(MassageModeData, SeatControlData.KEY_MASSAGE_MODE);
    }

    /**
     * Set the MassageCushionFirmness
     * @param {MassageCushionFirmness[]} firmness - The intensity or firmness of a cushion. - The desired MassageCushionFirmness.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setMassageCushionFirmness (firmness) {
        this.validateType(MassageCushionFirmness, firmness, true);
        this.setParameter(SeatControlData.KEY_MASSAGE_CUSHION_FIRMNESS, firmness);
        return this;
    }

    /**
     * Get the MassageCushionFirmness
     * @returns {MassageCushionFirmness[]} - the KEY_MASSAGE_CUSHION_FIRMNESS value
     */
    getMassageCushionFirmness () {
        return this.getObject(MassageCushionFirmness, SeatControlData.KEY_MASSAGE_CUSHION_FIRMNESS);
    }

    /**
     * Set the Memory
     * @param {SeatMemoryAction} memory - The desired Memory.
     * @returns {SeatControlData} - The class instance for method chaining.
     */
    setMemory (memory) {
        this.validateType(SeatMemoryAction, memory);
        this.setParameter(SeatControlData.KEY_MEMORY, memory);
        return this;
    }

    /**
     * Get the Memory
     * @returns {SeatMemoryAction} - the KEY_MEMORY value
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