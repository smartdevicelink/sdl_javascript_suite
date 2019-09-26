/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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

import { Enum } from '../../util/Enum.js';

class FunctionID extends Enum {

    /**
    * @constructor
    */
    constructor() {
        super();
    }

    /**
     * @return { Number } 
     */
    static get REGISTER_APP_INTERFACE() {
        return FunctionID.MAP.RegisterAppInterface;
    }

    /**
     * @return { Number } 
     */
    static get ADD_COMMAND() {
        return FunctionID.MAP.AddCommand;
    }

    /**
     * @return { Number } 
     */
    static get ON_LANGUAGE_CHANGE() {
        return FunctionID.MAP.OnLanguageChange;
    }

    /**
     * @return { Number } 
     */
    static get GET_VEHICLE_DATA() {
        return FunctionID.MAP.GetVehicleData;
    }

    /**
     * @return { Number } 
     */
    static get ON_HMI_STATUS() {
        return FunctionID.MAP.OnHMIStatus;
    }

    /**
     * @return { Number } 
     */
    static get ON_PERMISSION_CHANGE() {
        return FunctionID.MAP.OnPermissionsChange;
    }

    /**
     * @return { Number } 
     */
    static get ON_SYSTEM_REQUEST() {
        return FunctionID.MAP.OnSystemRequest;
    }

    /**
     * @return { Number } 
     */
    static get ON_DRIVER_DISTRACTION() {
        return FunctionID.MAP.OnDriverDistraction;
    }

    /**
     * @return { Number } 
     */
    static get ON_HASH_CHANGE() {
        return FunctionID.MAP.OnHashChange;
    }

    /**
     * @return { Number } 
     */
    static get ALERT() {
        return FunctionID.MAP.Alert;
    }

    /**
     * @return { Number } 
     */
    static get PERFORM_INTERACTION() {
        return FunctionID.MAP.PerformInteraction;
    }

    /**
     * @return { Number } 
     */
    static get CREATE_INTERACTION_CHOICE_SET() {
        return FunctionID.MAP.CreateInteractionChoiceSet;
    }

    /**
     * @param { String } name - The string to search for in the map
     * @return { Number } - The corresponding value to the name
     */
    static getIdFromName(name) {
        return FunctionID.MAP[name];
    }

    /**
     * @param { Number } id - The number to search for in the map
     * @return { String } - The corresponding String property to the id
     */
    static getNameFromId(id) {
        for (let name in FunctionID.MAP) {
            if (FunctionID.MAP[name] === id) {
                return name;
            }
        }
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param { Number } value
    * @return { Number } - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return FunctionID.valueForStringInternal(value, FunctionID.MAP);
    }

    /**
    * Returns the key of the map with the corresponding value
    * @param { Number } value
    * @return { String } - Returns null if not found
    */
    static keyForValue(value) {
        return FunctionID.keyForValueInternal(value, FunctionID.MAP);
    }
}

FunctionID.MAP = Object.freeze({
    'RegisterAppInterface': 0x01,
    'AddCommand': 0x05,
    'OnLanguageChange': 0x800A,
    'GetVehicleData': 22,
    'OnHMIStatus': 32768,
    'OnPermissionsChange': 32776,
    'OnSystemRequest': 32781,
    'OnDriverDistraction': 32775,
    'OnHashChange': 32782,
    'Alert': 12,
    'PerformInteraction': 10,
    'CreateInteractionChoiceSet': 9,
});

export { FunctionID };
