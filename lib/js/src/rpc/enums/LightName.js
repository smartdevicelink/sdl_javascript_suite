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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} LightName
 * @property {Object} _MAP
 */
class LightName extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {Number}
     */
    static get FRONT_LEFT_HIGH_BEAM () {
        return LightName._MAP.FRONT_LEFT_HIGH_BEAM;
    }

    /**
     * @return {Number}
     */
    static get FRONT_RIGHT_HIGH_BEAM () {
        return LightName._MAP.FRONT_RIGHT_HIGH_BEAM;
    }

    /**
     * @return {Number}
     */
    static get FRONT_LEFT_LOW_BEAM () {
        return LightName._MAP.FRONT_LEFT_LOW_BEAM;
    }

    /**
     * @return {Number}
     */
    static get FRONT_RIGHT_LOW_BEAM () {
        return LightName._MAP.FRONT_RIGHT_LOW_BEAM;
    }

    /**
     * @return {Number}
     */
    static get FRONT_LEFT_PARKING_LIGHT () {
        return LightName._MAP.FRONT_LEFT_PARKING_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_RIGHT_PARKING_LIGHT () {
        return LightName._MAP.FRONT_RIGHT_PARKING_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_LEFT_FOG_LIGHT () {
        return LightName._MAP.FRONT_LEFT_FOG_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_RIGHT_FOG_LIGHT () {
        return LightName._MAP.FRONT_RIGHT_FOG_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_LEFT_DAYTIME_RUNNING_LIGHT () {
        return LightName._MAP.FRONT_LEFT_DAYTIME_RUNNING_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_RIGHT_DAYTIME_RUNNING_LIGHT () {
        return LightName._MAP.FRONT_RIGHT_DAYTIME_RUNNING_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_LEFT_TURN_LIGHT () {
        return LightName._MAP.FRONT_LEFT_TURN_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get FRONT_RIGHT_TURN_LIGHT () {
        return LightName._MAP.FRONT_RIGHT_TURN_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_LEFT_FOG_LIGHT () {
        return LightName._MAP.REAR_LEFT_FOG_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_RIGHT_FOG_LIGHT () {
        return LightName._MAP.REAR_RIGHT_FOG_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_LEFT_TAIL_LIGHT () {
        return LightName._MAP.REAR_LEFT_TAIL_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_RIGHT_TAIL_LIGHT () {
        return LightName._MAP.REAR_RIGHT_TAIL_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_LEFT_BRAKE_LIGHT () {
        return LightName._MAP.REAR_LEFT_BRAKE_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_RIGHT_BRAKE_LIGHT () {
        return LightName._MAP.REAR_RIGHT_BRAKE_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_LEFT_TURN_LIGHT () {
        return LightName._MAP.REAR_LEFT_TURN_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_RIGHT_TURN_LIGHT () {
        return LightName._MAP.REAR_RIGHT_TURN_LIGHT;
    }

    /**
     * @return {Number}
     */
    static get REAR_REGISTRATION_PLATE_LIGHT () {
        return LightName._MAP.REAR_REGISTRATION_PLATE_LIGHT;
    }

    /**
     * Include all high beam lights: front_left and front_right.
     * @return {Number}
     */
    static get HIGH_BEAMS () {
        return LightName._MAP.HIGH_BEAMS;
    }

    /**
     * Include all low beam lights: front_left and front_right.
     * @return {Number}
     */
    static get LOW_BEAMS () {
        return LightName._MAP.LOW_BEAMS;
    }

    /**
     * Include all fog lights: front_left, front_right, rear_left and rear_right.
     * @return {Number}
     */
    static get FOG_LIGHTS () {
        return LightName._MAP.FOG_LIGHTS;
    }

    /**
     * Include all daytime running lights: front_left and front_right.
     * @return {Number}
     */
    static get RUNNING_LIGHTS () {
        return LightName._MAP.RUNNING_LIGHTS;
    }

    /**
     * Include all parking lights: front_left and front_right.
     * @return {Number}
     */
    static get PARKING_LIGHTS () {
        return LightName._MAP.PARKING_LIGHTS;
    }

    /**
     * Include all brake lights: rear_left and rear_right.
     * @return {Number}
     */
    static get BRAKE_LIGHTS () {
        return LightName._MAP.BRAKE_LIGHTS;
    }

    /**
     * @return {Number}
     */
    static get REAR_REVERSING_LIGHTS () {
        return LightName._MAP.REAR_REVERSING_LIGHTS;
    }

    /**
     * @return {Number}
     */
    static get SIDE_MARKER_LIGHTS () {
        return LightName._MAP.SIDE_MARKER_LIGHTS;
    }

    /**
     * Include all left turn signal lights: front_left, rear_left, left_side and mirror_mounted.
     * @return {Number}
     */
    static get LEFT_TURN_LIGHTS () {
        return LightName._MAP.LEFT_TURN_LIGHTS;
    }

    /**
     * Include all right turn signal lights: front_right, rear_right, right_side and mirror_mounted.
     * @return {Number}
     */
    static get RIGHT_TURN_LIGHTS () {
        return LightName._MAP.RIGHT_TURN_LIGHTS;
    }

    /**
     * Include all hazard lights: front_left, front_right, rear_left and rear_right.
     * @return {Number}
     */
    static get HAZARD_LIGHTS () {
        return LightName._MAP.HAZARD_LIGHTS;
    }

    /**
     * Cargo lamps illuminate the cargo area.
     * @return {Number}
     */
    static get REAR_CARGO_LIGHTS () {
        return LightName._MAP.REAR_CARGO_LIGHTS;
    }

    /**
     * Truck bed lamps light up the bed of the truck.
     * @return {Number}
     */
    static get REAR_TRUCK_BED_LIGHTS () {
        return LightName._MAP.REAR_TRUCK_BED_LIGHTS;
    }

    /**
     * Trailer lights are lamps mounted on a trailer hitch.
     * @return {Number}
     */
    static get REAR_TRAILER_LIGHTS () {
        return LightName._MAP.REAR_TRAILER_LIGHTS;
    }

    /**
     * It is the spotlights mounted on the left side of a vehicle.
     * @return {Number}
     */
    static get LEFT_SPOT_LIGHTS () {
        return LightName._MAP.LEFT_SPOT_LIGHTS;
    }

    /**
     * It is the spotlights mounted on the right side of a vehicle.
     * @return {Number}
     */
    static get RIGHT_SPOT_LIGHTS () {
        return LightName._MAP.RIGHT_SPOT_LIGHTS;
    }

    /**
     * Puddle lamps illuminate the ground beside the door as the customer is opening or approaching the door.
     * @return {Number}
     */
    static get LEFT_PUDDLE_LIGHTS () {
        return LightName._MAP.LEFT_PUDDLE_LIGHTS;
    }

    /**
     * Puddle lamps illuminate the ground beside the door as the customer is opening or approaching the door.
     * @return {Number}
     */
    static get RIGHT_PUDDLE_LIGHTS () {
        return LightName._MAP.RIGHT_PUDDLE_LIGHTS;
    }

    /**
     * @return {Number}
     */
    static get AMBIENT_LIGHTS () {
        return LightName._MAP.AMBIENT_LIGHTS;
    }

    /**
     * @return {Number}
     */
    static get OVERHEAD_LIGHTS () {
        return LightName._MAP.OVERHEAD_LIGHTS;
    }

    /**
     * @return {Number}
     */
    static get READING_LIGHTS () {
        return LightName._MAP.READING_LIGHTS;
    }

    /**
     * @return {Number}
     */
    static get TRUNK_LIGHTS () {
        return LightName._MAP.TRUNK_LIGHTS;
    }

    /**
     * Include exterior lights located in front of the vehicle. For example, fog lights and low beams.
     * @return {Number}
     */
    static get EXTERIOR_FRONT_LIGHTS () {
        return LightName._MAP.EXTERIOR_FRONT_LIGHTS;
    }

    /**
     * Include exterior lights located at the back of the vehicle. For example, license plate lights, reverse lights,
     * cargo lights, bed lights and trailer assist lights.
     * @return {Number}
     */
    static get EXTERIOR_REAR_LIGHTS () {
        return LightName._MAP.EXTERIOR_REAR_LIGHTS;
    }

    /**
     * Include exterior lights located at the left side of the vehicle. For example, left puddle lights and spot
     * lights.
     * @return {Number}
     */
    static get EXTERIOR_LEFT_LIGHTS () {
        return LightName._MAP.EXTERIOR_LEFT_LIGHTS;
    }

    /**
     * Include exterior lights located at the right side of the vehicle. For example, right puddle lights and spot
     * lights.
     * @return {Number}
     */
    static get EXTERIOR_RIGHT_LIGHTS () {
        return LightName._MAP.EXTERIOR_RIGHT_LIGHTS;
    }

    /**
     * Include all exterior lights around the vehicle.
     * @return {Number}
     */
    static get EXTERIOR_ALL_LIGHTS () {
        return LightName._MAP.EXTERIOR_ALL_LIGHTS;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return LightName._valueForKey(key, LightName._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return LightName._keyForValue(value, LightName._MAP);
    }
}

LightName._MAP = Object.freeze({
    'FRONT_LEFT_HIGH_BEAM': 0,
    'FRONT_RIGHT_HIGH_BEAM': 1,
    'FRONT_LEFT_LOW_BEAM': 2,
    'FRONT_RIGHT_LOW_BEAM': 3,
    'FRONT_LEFT_PARKING_LIGHT': 4,
    'FRONT_RIGHT_PARKING_LIGHT': 5,
    'FRONT_LEFT_FOG_LIGHT': 6,
    'FRONT_RIGHT_FOG_LIGHT': 7,
    'FRONT_LEFT_DAYTIME_RUNNING_LIGHT': 8,
    'FRONT_RIGHT_DAYTIME_RUNNING_LIGHT': 9,
    'FRONT_LEFT_TURN_LIGHT': 10,
    'FRONT_RIGHT_TURN_LIGHT': 11,
    'REAR_LEFT_FOG_LIGHT': 12,
    'REAR_RIGHT_FOG_LIGHT': 13,
    'REAR_LEFT_TAIL_LIGHT': 14,
    'REAR_RIGHT_TAIL_LIGHT': 15,
    'REAR_LEFT_BRAKE_LIGHT': 16,
    'REAR_RIGHT_BRAKE_LIGHT': 17,
    'REAR_LEFT_TURN_LIGHT': 18,
    'REAR_RIGHT_TURN_LIGHT': 19,
    'REAR_REGISTRATION_PLATE_LIGHT': 20,
    'HIGH_BEAMS': 501,
    'LOW_BEAMS': 502,
    'FOG_LIGHTS': 503,
    'RUNNING_LIGHTS': 504,
    'PARKING_LIGHTS': 505,
    'BRAKE_LIGHTS': 506,
    'REAR_REVERSING_LIGHTS': 507,
    'SIDE_MARKER_LIGHTS': 508,
    'LEFT_TURN_LIGHTS': 509,
    'RIGHT_TURN_LIGHTS': 510,
    'HAZARD_LIGHTS': 511,
    'REAR_CARGO_LIGHTS': 512,
    'REAR_TRUCK_BED_LIGHTS': 513,
    'REAR_TRAILER_LIGHTS': 514,
    'LEFT_SPOT_LIGHTS': 515,
    'RIGHT_SPOT_LIGHTS': 516,
    'LEFT_PUDDLE_LIGHTS': 517,
    'RIGHT_PUDDLE_LIGHTS': 518,
    'AMBIENT_LIGHTS': 801,
    'OVERHEAD_LIGHTS': 802,
    'READING_LIGHTS': 803,
    'TRUNK_LIGHTS': 804,
    'EXTERIOR_FRONT_LIGHTS': 901,
    'EXTERIOR_REAR_LIGHTS': 902,
    'EXTERIOR_LEFT_LIGHTS': 903,
    'EXTERIOR_RIGHT_LIGHTS': 904,
    'EXTERIOR_ALL_LIGHTS': 905,
});

export { LightName };