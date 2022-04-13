/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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
     * Initializes an instance of NavigationServiceData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the TimeStamp
     * @param {DateTime} stamp - This is the timestamp of when the data was generated. This is to ensure any time or distance given in the data can accurately be adjusted if necessary. - The desired TimeStamp.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setTimeStamp (stamp) {
        this._validateType(DateTime, stamp);
        this.setParameter(NavigationServiceData.KEY_TIME_STAMP, stamp);
        return this;
    }

    /**
     * Get the TimeStamp
     * @returns {DateTime} - the KEY_TIME_STAMP value
     */
    getTimeStamp () {
        return this.getObject(DateTime, NavigationServiceData.KEY_TIME_STAMP);
    }

    /**
     * Set the Origin
     * @param {LocationDetails} origin - The desired Origin.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setOrigin (origin) {
        this._validateType(LocationDetails, origin);
        this.setParameter(NavigationServiceData.KEY_ORIGIN, origin);
        return this;
    }

    /**
     * Get the Origin
     * @returns {LocationDetails} - the KEY_ORIGIN value
     */
    getOrigin () {
        return this.getObject(LocationDetails, NavigationServiceData.KEY_ORIGIN);
    }

    /**
     * Set the Destination
     * @param {LocationDetails} destination - The desired Destination.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setDestination (destination) {
        this._validateType(LocationDetails, destination);
        this.setParameter(NavigationServiceData.KEY_DESTINATION, destination);
        return this;
    }

    /**
     * Get the Destination
     * @returns {LocationDetails} - the KEY_DESTINATION value
     */
    getDestination () {
        return this.getObject(LocationDetails, NavigationServiceData.KEY_DESTINATION);
    }

    /**
     * Set the DestinationETA
     * @param {DateTime} eta - The desired DestinationETA.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setDestinationETA (eta) {
        this._validateType(DateTime, eta);
        this.setParameter(NavigationServiceData.KEY_DESTINATION_ETA, eta);
        return this;
    }

    /**
     * Get the DestinationETA
     * @returns {DateTime} - the KEY_DESTINATION_ETA value
     */
    getDestinationETA () {
        return this.getObject(DateTime, NavigationServiceData.KEY_DESTINATION_ETA);
    }

    /**
     * Set the Instructions
     * @param {NavigationInstruction[]} instructions - This array should be ordered with all remaining instructions. The start of this array should always contain the next instruction. - The desired Instructions.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setInstructions (instructions) {
        this._validateType(NavigationInstruction, instructions, true);
        this.setParameter(NavigationServiceData.KEY_INSTRUCTIONS, instructions);
        return this;
    }

    /**
     * Get the Instructions
     * @returns {NavigationInstruction[]} - the KEY_INSTRUCTIONS value
     */
    getInstructions () {
        return this.getObject(NavigationInstruction, NavigationServiceData.KEY_INSTRUCTIONS);
    }

    /**
     * Set the NextInstructionETA
     * @param {DateTime} eta - The desired NextInstructionETA.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setNextInstructionETA (eta) {
        this._validateType(DateTime, eta);
        this.setParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_ETA, eta);
        return this;
    }

    /**
     * Get the NextInstructionETA
     * @returns {DateTime} - the KEY_NEXT_INSTRUCTION_ETA value
     */
    getNextInstructionETA () {
        return this.getObject(DateTime, NavigationServiceData.KEY_NEXT_INSTRUCTION_ETA);
    }

    /**
     * Set the NextInstructionDistance
     * @param {Number} distance - The distance to this instruction from current location. This should only be updated ever .1 unit of distance. For more accuracy the consumer can use the GPS location of itself and the next instruction. - The desired NextInstructionDistance.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setNextInstructionDistance (distance) {
        this.setParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE, distance);
        return this;
    }

    /**
     * Get the NextInstructionDistance
     * @returns {Number} - the KEY_NEXT_INSTRUCTION_DISTANCE value
     */
    getNextInstructionDistance () {
        return this.getParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE);
    }

    /**
     * Set the NextInstructionDistanceScale
     * @param {Number} scale - Distance till next maneuver (starting from) from previous maneuver. - The desired NextInstructionDistanceScale.
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setNextInstructionDistanceScale (scale) {
        this.setParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE_SCALE, scale);
        return this;
    }

    /**
     * Get the NextInstructionDistanceScale
     * @returns {Number} - the KEY_NEXT_INSTRUCTION_DISTANCE_SCALE value
     */
    getNextInstructionDistanceScale () {
        return this.getParameter(NavigationServiceData.KEY_NEXT_INSTRUCTION_DISTANCE_SCALE);
    }

    /**
     * Set the Prompt
     * @param {String} prompt - This is a prompt message that should be conveyed to the user through either display or voice (TTS). This param will change often as it should represent the following: approaching instruction, post instruction, alerts that affect the current navigation session, etc. - The desired Prompt.
     * {'string_min_length': 1}
     * @returns {NavigationServiceData} - The class instance for method chaining.
     */
    setPrompt (prompt) {
        this.setParameter(NavigationServiceData.KEY_PROMPT, prompt);
        return this;
    }

    /**
     * Get the Prompt
     * @returns {String} - the KEY_PROMPT value
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