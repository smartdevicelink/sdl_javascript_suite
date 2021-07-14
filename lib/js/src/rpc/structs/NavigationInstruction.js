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

import { DateTime } from './DateTime.js';
import { Direction } from '../enums/Direction.js';
import { Image } from './Image.js';
import { LocationDetails } from './LocationDetails.js';
import { NavigationAction } from '../enums/NavigationAction.js';
import { NavigationJunction } from '../enums/NavigationJunction.js';
import { RpcStruct } from '../RpcStruct.js';

class NavigationInstruction extends RpcStruct {
    /**
     * Initializes an instance of NavigationInstruction.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the LocationDetails
     * @param {LocationDetails} details - The desired LocationDetails.
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setLocationDetails (details) {
        this._validateType(LocationDetails, details);
        this.setParameter(NavigationInstruction.KEY_LOCATION_DETAILS, details);
        return this;
    }

    /**
     * Get the LocationDetails
     * @returns {LocationDetails} - the KEY_LOCATION_DETAILS value
     */
    getLocationDetails () {
        return this.getObject(LocationDetails, NavigationInstruction.KEY_LOCATION_DETAILS);
    }

    /**
     * Set the Action
     * @param {NavigationAction} action - The desired Action.
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setAction (action) {
        this._validateType(NavigationAction, action);
        this.setParameter(NavigationInstruction.KEY_ACTION, action);
        return this;
    }

    /**
     * Get the Action
     * @returns {NavigationAction} - the KEY_ACTION value
     */
    getAction () {
        return this.getObject(NavigationAction, NavigationInstruction.KEY_ACTION);
    }

    /**
     * Set the Eta
     * @param {DateTime} eta - The desired Eta.
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setEta (eta) {
        this._validateType(DateTime, eta);
        this.setParameter(NavigationInstruction.KEY_ETA, eta);
        return this;
    }

    /**
     * Get the Eta
     * @returns {DateTime} - the KEY_ETA value
     */
    getEta () {
        return this.getObject(DateTime, NavigationInstruction.KEY_ETA);
    }

    /**
     * Set the Bearing
     * @param {Number} bearing - The angle at which this instruction takes place. For example, 0 would mean straight, less than 45 is bearing right, greater than 135 is sharp right, between 45 and 135 is a regular right, and 180 is a U-Turn, etc. - The desired Bearing.
     * {'num_min_value': 0, 'num_max_value': 359}
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setBearing (bearing) {
        this.setParameter(NavigationInstruction.KEY_BEARING, bearing);
        return this;
    }

    /**
     * Get the Bearing
     * @returns {Number} - the KEY_BEARING value
     */
    getBearing () {
        return this.getParameter(NavigationInstruction.KEY_BEARING);
    }

    /**
     * Set the JunctionType
     * @param {NavigationJunction} type - The desired JunctionType.
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setJunctionType (type) {
        this._validateType(NavigationJunction, type);
        this.setParameter(NavigationInstruction.KEY_JUNCTION_TYPE, type);
        return this;
    }

    /**
     * Get the JunctionType
     * @returns {NavigationJunction} - the KEY_JUNCTION_TYPE value
     */
    getJunctionType () {
        return this.getObject(NavigationJunction, NavigationInstruction.KEY_JUNCTION_TYPE);
    }

    /**
     * Set the DrivingSide
     * @param {Direction} side - Used to infer which side of the road this instruction takes place. For a U-Turn (action=TURN, bearing=180) this will determine which direction the turn should take place. - The desired DrivingSide.
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setDrivingSide (side) {
        this._validateType(Direction, side);
        this.setParameter(NavigationInstruction.KEY_DRIVING_SIDE, side);
        return this;
    }

    /**
     * Get the DrivingSide
     * @returns {Direction} - the KEY_DRIVING_SIDE value
     */
    getDrivingSide () {
        return this.getObject(Direction, NavigationInstruction.KEY_DRIVING_SIDE);
    }

    /**
     * Set the Details
     * @param {String} details - This is a string representation of this instruction, used to display instructions to the users. This is not intended to be read aloud to the users, see the param prompt in NavigationServiceData for that. - The desired Details.
     * {'string_min_length': 1}
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setDetails (details) {
        this.setParameter(NavigationInstruction.KEY_DETAILS, details);
        return this;
    }

    /**
     * Get the Details
     * @returns {String} - the KEY_DETAILS value
     */
    getDetails () {
        return this.getParameter(NavigationInstruction.KEY_DETAILS);
    }

    /**
     * Set the Image
     * @param {Image} image - An image representation of this instruction. - The desired Image.
     * @returns {NavigationInstruction} - The class instance for method chaining.
     */
    setImage (image) {
        this._validateType(Image, image);
        this.setParameter(NavigationInstruction.KEY_IMAGE, image);
        return this;
    }

    /**
     * Get the Image
     * @returns {Image} - the KEY_IMAGE value
     */
    getImage () {
        return this.getObject(Image, NavigationInstruction.KEY_IMAGE);
    }
}

NavigationInstruction.KEY_LOCATION_DETAILS = 'locationDetails';
NavigationInstruction.KEY_ACTION = 'action';
NavigationInstruction.KEY_ETA = 'eta';
NavigationInstruction.KEY_BEARING = 'bearing';
NavigationInstruction.KEY_JUNCTION_TYPE = 'junctionType';
NavigationInstruction.KEY_DRIVING_SIDE = 'drivingSide';
NavigationInstruction.KEY_DETAILS = 'details';
NavigationInstruction.KEY_IMAGE = 'image';

export { NavigationInstruction };