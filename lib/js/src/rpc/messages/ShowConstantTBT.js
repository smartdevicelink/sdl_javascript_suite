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

import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';

class ShowConstantTBT extends RpcRequest {
    /**
     * Initalizes an instance of ShowConstantTBT.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.ShowConstantTBT);
    }

    /**
     * Set the NavigationText1
     * @param {String} text1 - The desired NavigationText1.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setNavigationText1 (text1) {
        this.setParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_1, text1);
        return this;
    }

    /**
     * Get the NavigationText1
     * @returns {String} - the KEY_NAVIGATION_TEXT_1 value
     */
    getNavigationText1 () {
        return this.getParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_1);
    }

    /**
     * Set the NavigationText2
     * @param {String} text2 - The desired NavigationText2.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setNavigationText2 (text2) {
        this.setParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_2, text2);
        return this;
    }

    /**
     * Get the NavigationText2
     * @returns {String} - the KEY_NAVIGATION_TEXT_2 value
     */
    getNavigationText2 () {
        return this.getParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_2);
    }

    /**
     * Set the Eta
     * @param {String} eta - The desired Eta.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setEta (eta) {
        this.setParameter(ShowConstantTBT.KEY_ETA, eta);
        return this;
    }

    /**
     * Get the Eta
     * @returns {String} - the KEY_ETA value
     */
    getEta () {
        return this.getParameter(ShowConstantTBT.KEY_ETA);
    }

    /**
     * Set the TimeToDestination
     * @param {String} destination - The desired TimeToDestination.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setTimeToDestination (destination) {
        this.setParameter(ShowConstantTBT.KEY_TIME_TO_DESTINATION, destination);
        return this;
    }

    /**
     * Get the TimeToDestination
     * @returns {String} - the KEY_TIME_TO_DESTINATION value
     */
    getTimeToDestination () {
        return this.getParameter(ShowConstantTBT.KEY_TIME_TO_DESTINATION);
    }

    /**
     * Set the TotalDistance
     * @param {String} distance - The desired TotalDistance.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setTotalDistance (distance) {
        this.setParameter(ShowConstantTBT.KEY_TOTAL_DISTANCE, distance);
        return this;
    }

    /**
     * Get the TotalDistance
     * @returns {String} - the KEY_TOTAL_DISTANCE value
     */
    getTotalDistance () {
        return this.getParameter(ShowConstantTBT.KEY_TOTAL_DISTANCE);
    }

    /**
     * Set the TurnIcon
     * @param {Image} icon - The desired TurnIcon.
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setTurnIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(ShowConstantTBT.KEY_TURN_ICON, icon);
        return this;
    }

    /**
     * Get the TurnIcon
     * @returns {Image} - the KEY_TURN_ICON value
     */
    getTurnIcon () {
        return this.getObject(Image, ShowConstantTBT.KEY_TURN_ICON);
    }

    /**
     * Set the NextTurnIcon
     * @param {Image} icon - The desired NextTurnIcon.
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setNextTurnIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(ShowConstantTBT.KEY_NEXT_TURN_ICON, icon);
        return this;
    }

    /**
     * Get the NextTurnIcon
     * @returns {Image} - the KEY_NEXT_TURN_ICON value
     */
    getNextTurnIcon () {
        return this.getObject(Image, ShowConstantTBT.KEY_NEXT_TURN_ICON);
    }

    /**
     * Set the DistanceToManeuver
     * @param {Number} maneuver - Fraction of distance till next maneuver (starting from when AlertManeuver is triggered). Used to calculate progress bar. - The desired DistanceToManeuver.
     * {'num_min_value': 0.0, 'num_max_value': 1000000000.0}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setDistanceToManeuver (maneuver) {
        this.setParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER, maneuver);
        return this;
    }

    /**
     * Get the DistanceToManeuver
     * @returns {Number} - the KEY_DISTANCE_TO_MANEUVER value
     */
    getDistanceToManeuver () {
        return this.getParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER);
    }

    /**
     * Set the DistanceToManeuverScale
     * @param {Number} scale - Distance till next maneuver (starting from) from previous maneuver. Used to calculate progress bar. - The desired DistanceToManeuverScale.
     * {'num_min_value': 0.0, 'num_max_value': 1000000000.0}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setDistanceToManeuverScale (scale) {
        this.setParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER_SCALE, scale);
        return this;
    }

    /**
     * Get the DistanceToManeuverScale
     * @returns {Number} - the KEY_DISTANCE_TO_MANEUVER_SCALE value
     */
    getDistanceToManeuverScale () {
        return this.getParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER_SCALE);
    }

    /**
     * Set the ManeuverComplete
     * @param {Boolean} complete - If and when a maneuver has completed while an AlertManeuver is active, the app must send this value set to TRUE in order to clear the AlertManeuver overlay. If omitted the value will be assumed as FALSE. - The desired ManeuverComplete.
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setManeuverComplete (complete) {
        this.setParameter(ShowConstantTBT.KEY_MANEUVER_COMPLETE, complete);
        return this;
    }

    /**
     * Get the ManeuverComplete
     * @returns {Boolean} - the KEY_MANEUVER_COMPLETE value
     */
    getManeuverComplete () {
        return this.getParameter(ShowConstantTBT.KEY_MANEUVER_COMPLETE);
    }

    /**
     * Set the SoftButtons
     * @param {SoftButton[]} buttons - Three dynamic SoftButtons available (first SoftButton is fixed to "Turns"). If omitted on supported displays, the currently displayed SoftButton values will not change. - The desired SoftButtons.
     * {'array_min_size': 0, 'array_max_size': 3}
     * @returns {ShowConstantTBT} - The class instance for method chaining.
     */
    setSoftButtons (buttons) {
        this._validateType(SoftButton, buttons, true);
        this.setParameter(ShowConstantTBT.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButton[]} - the KEY_SOFT_BUTTONS value
     */
    getSoftButtons () {
        return this.getObject(SoftButton, ShowConstantTBT.KEY_SOFT_BUTTONS);
    }
}

ShowConstantTBT.KEY_NAVIGATION_TEXT_1 = 'navigationText1';
ShowConstantTBT.KEY_NAVIGATION_TEXT_2 = 'navigationText2';
ShowConstantTBT.KEY_ETA = 'eta';
ShowConstantTBT.KEY_TIME_TO_DESTINATION = 'timeToDestination';
ShowConstantTBT.KEY_TOTAL_DISTANCE = 'totalDistance';
ShowConstantTBT.KEY_TURN_ICON = 'turnIcon';
ShowConstantTBT.KEY_NEXT_TURN_ICON = 'nextTurnIcon';
ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER = 'distanceToManeuver';
ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER_SCALE = 'distanceToManeuverScale';
ShowConstantTBT.KEY_MANEUVER_COMPLETE = 'maneuverComplete';
ShowConstantTBT.KEY_SOFT_BUTTONS = 'softButtons';

export { ShowConstantTBT };