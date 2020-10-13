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

import { CapacityUnit } from '../enums/CapacityUnit.js';
import { ComponentVolumeStatus } from '../enums/ComponentVolumeStatus.js';
import { FuelType } from '../enums/FuelType.js';
import { RpcStruct } from '../RpcStruct.js';

class FuelRange extends RpcStruct {
    /**
     * Initalizes an instance of FuelRange.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Type
     * @param {FuelType} type - The desired Type.
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setType (type) {
        this._validateType(FuelType, type);
        this.setParameter(FuelRange.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {FuelType} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(FuelType, FuelRange.KEY_TYPE);
    }

    /**
     * Set the Range
     * @param {Number} range - The estimate range in KM the vehicle can travel based on fuel level and consumption. - The desired Range.
     * {'num_min_value': 0.0, 'num_max_value': 10000.0}
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setRange (range) {
        this.setParameter(FuelRange.KEY_RANGE, range);
        return this;
    }

    /**
     * Get the Range
     * @returns {Number} - the KEY_RANGE value
     */
    getRange () {
        return this.getParameter(FuelRange.KEY_RANGE);
    }

    /**
     * Set the Level
     * @param {Number} level - The relative remaining capacity of this fuel type (percentage). - The desired Level.
     * {'num_min_value': -6.0, 'num_max_value': 1000000.0}
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setLevel (level) {
        this.setParameter(FuelRange.KEY_LEVEL, level);
        return this;
    }

    /**
     * Get the Level
     * @returns {Number} - the KEY_LEVEL value
     */
    getLevel () {
        return this.getParameter(FuelRange.KEY_LEVEL);
    }

    /**
     * Set the LevelState
     * @param {ComponentVolumeStatus} state - The fuel level state - The desired LevelState.
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setLevelState (state) {
        this._validateType(ComponentVolumeStatus, state);
        this.setParameter(FuelRange.KEY_LEVEL_STATE, state);
        return this;
    }

    /**
     * Get the LevelState
     * @returns {ComponentVolumeStatus} - the KEY_LEVEL_STATE value
     */
    getLevelState () {
        return this.getObject(ComponentVolumeStatus, FuelRange.KEY_LEVEL_STATE);
    }

    /**
     * Set the Capacity
     * @param {Number} capacity - The absolute capacity of this fuel type. - The desired Capacity.
     * {'num_min_value': 0.0, 'num_max_value': 1000000.0}
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setCapacity (capacity) {
        this.setParameter(FuelRange.KEY_CAPACITY, capacity);
        return this;
    }

    /**
     * Get the Capacity
     * @returns {Number} - the KEY_CAPACITY value
     */
    getCapacity () {
        return this.getParameter(FuelRange.KEY_CAPACITY);
    }

    /**
     * Set the CapacityUnit
     * @param {CapacityUnit} unit - The unit of the capacity of this fuel type such as liters for gasoline or kWh for batteries. - The desired CapacityUnit.
     * @returns {FuelRange} - The class instance for method chaining.
     */
    setCapacityUnit (unit) {
        this._validateType(CapacityUnit, unit);
        this.setParameter(FuelRange.KEY_CAPACITY_UNIT, unit);
        return this;
    }

    /**
     * Get the CapacityUnit
     * @returns {CapacityUnit} - the KEY_CAPACITY_UNIT value
     */
    getCapacityUnit () {
        return this.getObject(CapacityUnit, FuelRange.KEY_CAPACITY_UNIT);
    }
}

FuelRange.KEY_TYPE = 'type';
FuelRange.KEY_RANGE = 'range';
FuelRange.KEY_LEVEL = 'level';
FuelRange.KEY_LEVEL_STATE = 'levelState';
FuelRange.KEY_CAPACITY = 'capacity';
FuelRange.KEY_CAPACITY_UNIT = 'capacityUnit';

export { FuelRange };