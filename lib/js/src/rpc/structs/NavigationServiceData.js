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
import { LocationDetails } from './LocationDetails.js';
import { NavigationInstruction } from './NavigationInstruction.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * This data is related to what a navigation service would provide.
 */
class NavigationServiceData extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {DateTime} stamp - This is the timestamp of when the data was generated. This is to ensure any time or
     *                           distance given in the data can accurately be adjusted if necessary.
     * @return {NavigationServiceData}
     */
    setTimeStamp (stamp) {
        this.validateType(DateTime, stamp);
        this.setParameter(NavigationServiceData.KEY_TIME_STAMP, stamp);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getTimeStamp () {
        return this.getObject(DateTime, NavigationServiceData.KEY_TIME_STAMP);
    }

    /**
     * @param {LocationDetails} origin
     * @return {NavigationServiceData}
     */
    setOrigin (origin) {
        this.validateType(LocationDetails, origin);
        this.setParameter(NavigationServiceData.KEY_ORIGIN, origin);
        return this;
    }

    /**
     * @return {LocationDetails}
     */
    getOrigin () {
        return this.getObject(LocationDetails, NavigationServiceData.KEY_ORIGIN);
    }

    /**
     * @param {LocationDetails} destination
     * @return {NavigationServiceData}
     */
    setDestination (destination) {
        this.validateType(LocationDetails, destination);
        this.setParameter(NavigationServiceData.KEY_DESTINATION, destination);
        return this;
    }

    /**
     * @return {LocationDetails}
     */
    getDestination () {
        return this.getObject(LocationDetails, NavigationServiceData.KEY_DESTINATION);
    }

    /**
     * @param {DateTime} eta
     * @return {NavigationServiceData}
     */
    setDestinationETA (eta) {
        this.validateType(DateTime, eta);
        this.setParameter(NavigationServiceData.KEY_DESTINATION_ETA, eta);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getDestinationETA () {
        return this.getObject(DateTime, NavigationServiceData.KEY_DESTINATION_ETA);
    }

    /**
     * @param {NavigationInstruction[]} instructions - This array should be ordered with all remaining instructions. The
     *                                                 start of this array should always contain the next instruction.
     * @return {NavigationServiceData}
     */
    setInstructions (instructions) {
        this.validateType(NavigationInstruction, instructions, true);
        this.setParameter(NavigationServiceData.KEY_INSTRUCTIONS, instructions);
        return this;
    }

    /**
     * @return {NavigationInstruction[]}
     */
    getInstructions () {
        return this.getObject(NavigationInstruction, NavigationServiceData.KEY_INSTRUCTIONS);
    }

    /**
     * @param {DateTime} eta
     * @return {NavigationServiceData}
     */
    setNextInstructionETA (eta) {
        this.validateType(DateTime, eta);
        this.setParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_ETA, eta);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getNextInstructionETA () {
        return this.getObject(DateTime, NavigationServiceData.KEY_NEXT_INSTRUCTION_ETA);
    }

    /**
     * @param {Number} distance - The distance to this instruction from current location. This should only be updated
     *                            ever .1 unit of distance. For more accuracy the consumer can use the GPS location of
     *                            itself and the next instruction.
     * @return {NavigationServiceData}
     */
    setNextInstructionDistance (distance) {
        this.setParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE, distance);
        return this;
    }

    /**
     * @return {Number}
     */
    getNextInstructionDistance () {
        return this.getParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE);
    }

    /**
     * @param {Number} scale - Distance till next maneuver (starting from) from previous maneuver.
     * @return {NavigationServiceData}
     */
    setNextInstructionDistanceScale (scale) {
        this.setParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE_SCALE, scale);
        return this;
    }

    /**
     * @return {Number}
     */
    getNextInstructionDistanceScale () {
        return this.getParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE_SCALE);
    }

    /**
     * @param {String} prompt - This is a prompt message that should be conveyed to the user through either display or
     *                          voice (TTS). This param will change often as it should represent the following:
     *                          approaching instruction, post instruction, alerts that affect the current navigation
     *                          session, etc.
     * @return {NavigationServiceData}
     */
    setPrompt (prompt) {
        this.setParameter(NavigationServiceData.KEY_PROMPT, prompt);
        return this;
    }

    /**
     * @return {String}
     */
    getPrompt () {
        return this.getParameter(NavigationServiceData.KEY_PROMPT);
    }
}

NavigationServiceData.KEY_TIME_STAMP = 'timeStamp';
NavigationServiceData.KEY_ORIGIN = 'origin';
NavigationServiceData.KEY_DESTINATION = 'destination';
NavigationServiceData.KEY_DESTINATION_ETA = 'destinationETA';
NavigationServiceData.KEY_INSTRUCTIONS = 'instructions';
NavigationServiceData.KEY_NEXT_INSTRUCTION_ETA = 'nextInstructionETA';
NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE = 'nextInstructionDistance';
NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE_SCALE = 'nextInstructionDistanceScale';
NavigationServiceData.KEY_PROMPT = 'prompt';

export { NavigationServiceData };