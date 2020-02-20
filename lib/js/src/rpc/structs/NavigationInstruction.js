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

import { DateTime } from './DateTime.js';
import { Direction } from '../enums/Direction.js';
import { Image } from './Image.js';
import { LocationDetails } from './LocationDetails.js';
import { NavigationAction } from '../enums/NavigationAction.js';
import { NavigationJunction } from '../enums/NavigationJunction.js';
import { RpcStruct } from '../RpcStruct.js';

class NavigationInstruction extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {LocationDetails} details
     * @return {NavigationInstruction}
     */
    setLocationDetails (details) {
        this.validateType(LocationDetails, details);
        this.setParameter(NavigationInstruction.KEY_LOCATION_DETAILS, details);
        return this;
    }

    /**
     * @return {LocationDetails}
     */
    getLocationDetails () {
        return this.getObject(LocationDetails, NavigationInstruction.KEY_LOCATION_DETAILS);
    }

    /**
     * @param {NavigationAction} action
     * @return {NavigationInstruction}
     */
    setAction (action) {
        this.validateType(NavigationAction, action);
        this.setParameter(NavigationInstruction.KEY_ACTION, action);
        return this;
    }

    /**
     * @return {NavigationAction}
     */
    getAction () {
        return this.getObject(NavigationAction, NavigationInstruction.KEY_ACTION);
    }

    /**
     * @param {DateTime} eta
     * @return {NavigationInstruction}
     */
    setEta (eta) {
        this.validateType(DateTime, eta);
        this.setParameter(NavigationInstruction.KEY_ETA, eta);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getEta () {
        return this.getObject(DateTime, NavigationInstruction.KEY_ETA);
    }

    /**
     * @param {Number} bearing - The angle at which this instruction takes place. For example, 0 would mean straight,
     *                           less than 45 is bearing right, greater than 135 is sharp right, between 45 and 135 is a
     *                           regular right, and 180 is a U-Turn, etc.
     * @return {NavigationInstruction}
     */
    setBearing (bearing) {
        this.setParameter(NavigationInstruction.KEY_BEARING, bearing);
        return this;
    }

    /**
     * @return {Number}
     */
    getBearing () {
        return this.getParameter(NavigationInstruction.KEY_BEARING);
    }

    /**
     * @param {NavigationJunction} type
     * @return {NavigationInstruction}
     */
    setJunctionType (type) {
        this.validateType(NavigationJunction, type);
        this.setParameter(NavigationInstruction.KEY_JUNCTION_TYPE, type);
        return this;
    }

    /**
     * @return {NavigationJunction}
     */
    getJunctionType () {
        return this.getObject(NavigationJunction, NavigationInstruction.KEY_JUNCTION_TYPE);
    }

    /**
     * @param {Direction} side - Used to infer which side of the road this instruction takes place. For a U-Turn
     *                           (action=TURN, bearing=180) this will determine which direction the turn should take
     *                           place.
     * @return {NavigationInstruction}
     */
    setDrivingSide (side) {
        this.validateType(Direction, side);
        this.setParameter(NavigationInstruction.KEY_DRIVING_SIDE, side);
        return this;
    }

    /**
     * @return {Direction}
     */
    getDrivingSide () {
        return this.getObject(Direction, NavigationInstruction.KEY_DRIVING_SIDE);
    }

    /**
     * @param {String} details - This is a string representation of this instruction, used to display instructions to
     *                           the users. This is not intended to be read aloud to the users, see the param prompt in
     *                           NavigationServiceData for that.
     * @return {NavigationInstruction}
     */
    setDetails (details) {
        this.setParameter(NavigationInstruction.KEY_DETAILS, details);
        return this;
    }

    /**
     * @return {String}
     */
    getDetails () {
        return this.getParameter(NavigationInstruction.KEY_DETAILS);
    }

    /**
     * @param {Image} image - An image representation of this instruction.
     * @return {NavigationInstruction}
     */
    setImage (image) {
        this.validateType(Image, image);
        this.setParameter(NavigationInstruction.KEY_IMAGE, image);
        return this;
    }

    /**
     * @return {Image}
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