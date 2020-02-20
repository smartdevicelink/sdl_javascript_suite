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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.ShowConstantTBT);
    }

    /**
     * @param {String} text1
     * @return {ShowConstantTBT}
     */
    setNavigationText1 (text1) {
        this.setParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_1, text1);
        return this;
    }

    /**
     * @return {String}
     */
    getNavigationText1 () {
        return this.getParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_1);
    }

    /**
     * @param {String} text2
     * @return {ShowConstantTBT}
     */
    setNavigationText2 (text2) {
        this.setParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_2, text2);
        return this;
    }

    /**
     * @return {String}
     */
    getNavigationText2 () {
        return this.getParameter(ShowConstantTBT.KEY_NAVIGATION_TEXT_2);
    }

    /**
     * @param {String} eta
     * @return {ShowConstantTBT}
     */
    setEta (eta) {
        this.setParameter(ShowConstantTBT.KEY_ETA, eta);
        return this;
    }

    /**
     * @return {String}
     */
    getEta () {
        return this.getParameter(ShowConstantTBT.KEY_ETA);
    }

    /**
     * @param {String} destination
     * @return {ShowConstantTBT}
     */
    setTimeToDestination (destination) {
        this.setParameter(ShowConstantTBT.KEY_TIME_TO_DESTINATION, destination);
        return this;
    }

    /**
     * @return {String}
     */
    getTimeToDestination () {
        return this.getParameter(ShowConstantTBT.KEY_TIME_TO_DESTINATION);
    }

    /**
     * @param {String} distance
     * @return {ShowConstantTBT}
     */
    setTotalDistance (distance) {
        this.setParameter(ShowConstantTBT.KEY_TOTAL_DISTANCE, distance);
        return this;
    }

    /**
     * @return {String}
     */
    getTotalDistance () {
        return this.getParameter(ShowConstantTBT.KEY_TOTAL_DISTANCE);
    }

    /**
     * @param {Image} icon
     * @return {ShowConstantTBT}
     */
    setTurnIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(ShowConstantTBT.KEY_TURN_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getTurnIcon () {
        return this.getObject(Image, ShowConstantTBT.KEY_TURN_ICON);
    }

    /**
     * @param {Image} icon
     * @return {ShowConstantTBT}
     */
    setNextTurnIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(ShowConstantTBT.KEY_NEXT_TURN_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getNextTurnIcon () {
        return this.getObject(Image, ShowConstantTBT.KEY_NEXT_TURN_ICON);
    }

    /**
     * @param {Number} maneuver - Fraction of distance till next maneuver (starting from when AlertManeuver is
     *                            triggered). Used to calculate progress bar.
     * @return {ShowConstantTBT}
     */
    setDistanceToManeuver (maneuver) {
        this.setParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER, maneuver);
        return this;
    }

    /**
     * @return {Number}
     */
    getDistanceToManeuver () {
        return this.getParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER);
    }

    /**
     * @param {Number} scale - Distance till next maneuver (starting from) from previous maneuver. Used to calculate
     *                         progress bar.
     * @return {ShowConstantTBT}
     */
    setDistanceToManeuverScale (scale) {
        this.setParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER_SCALE, scale);
        return this;
    }

    /**
     * @return {Number}
     */
    getDistanceToManeuverScale () {
        return this.getParameter(ShowConstantTBT.KEY_DISTANCE_TO_MANEUVER_SCALE);
    }

    /**
     * @param {Boolean} complete - If and when a maneuver has completed while an AlertManeuver is active, the app must
     *                             send this value set to TRUE in order to clear the AlertManeuver overlay. If omitted
     *                             the value will be assumed as FALSE.
     * @return {ShowConstantTBT}
     */
    setManeuverComplete (complete) {
        this.setParameter(ShowConstantTBT.KEY_MANEUVER_COMPLETE, complete);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getManeuverComplete () {
        return this.getParameter(ShowConstantTBT.KEY_MANEUVER_COMPLETE);
    }

    /**
     * @param {SoftButton[]} buttons - Three dynamic SoftButtons available (first SoftButton is fixed to "Turns"). If
     *                                 omitted on supported displays, the currently displayed SoftButton values will not
     *                                 change.
     * @return {ShowConstantTBT}
     */
    setSoftButtons (buttons) {
        this.validateType(SoftButton, buttons, true);
        this.setParameter(ShowConstantTBT.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * @return {SoftButton[]}
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