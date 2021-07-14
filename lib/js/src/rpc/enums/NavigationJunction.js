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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} NavigationJunction
 * @property {Object} _MAP
 */
class NavigationJunction extends Enum {
    /**
     * Constructor for NavigationJunction.
     * @class
     * @since SmartDeviceLink 5.1.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for REGULAR.
     * A junction that represents a standard intersection with a single road crossing another.
     * @returns {String} - The enum value.
     */
    static get REGULAR () {
        return NavigationJunction._MAP.REGULAR;
    }

    /**
     * Get the enum value for BIFURCATION.
     * A junction where the road splits off into two paths; a fork in the road.
     * @returns {String} - The enum value.
     */
    static get BIFURCATION () {
        return NavigationJunction._MAP.BIFURCATION;
    }

    /**
     * Get the enum value for MULTI_CARRIAGEWAY.
     * A junction that has multiple intersections and paths.
     * @returns {String} - The enum value.
     */
    static get MULTI_CARRIAGEWAY () {
        return NavigationJunction._MAP.MULTI_CARRIAGEWAY;
    }

    /**
     * Get the enum value for ROUNDABOUT.
     * A junction where traffic moves in a single direction around a central, non-traversable point to reach one of the connecting roads.
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT () {
        return NavigationJunction._MAP.ROUNDABOUT;
    }

    /**
     * Get the enum value for TRAVERSABLE_ROUNDABOUT.
     * Similar to a roundabout, however the center of the roundabout is fully traversable. Also known as a mini-roundabout.
     * @returns {String} - The enum value.
     */
    static get TRAVERSABLE_ROUNDABOUT () {
        return NavigationJunction._MAP.TRAVERSABLE_ROUNDABOUT;
    }

    /**
     * Get the enum value for JUGHANDLE.
     * A junction where lefts diverge to the right, then curve to the left, converting a left turn to a crossing maneuver.
     * @returns {String} - The enum value.
     */
    static get JUGHANDLE () {
        return NavigationJunction._MAP.JUGHANDLE;
    }

    /**
     * Get the enum value for ALL_WAY_YIELD.
     * Multiple way intersection that allows traffic to flow based on priority; most commonly right of way and first in, first out.
     * @returns {String} - The enum value.
     */
    static get ALL_WAY_YIELD () {
        return NavigationJunction._MAP.ALL_WAY_YIELD;
    }

    /**
     * Get the enum value for TURN_AROUND.
     * A junction designated for traffic turn arounds.
     * @returns {String} - The enum value.
     */
    static get TURN_AROUND () {
        return NavigationJunction._MAP.TURN_AROUND;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return NavigationJunction._valueForKey(key, NavigationJunction._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return NavigationJunction._keyForValue(value, NavigationJunction._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(NavigationJunction._MAP);
    }
}

NavigationJunction._MAP = Object.freeze({
    'REGULAR': 'REGULAR',
    'BIFURCATION': 'BIFURCATION',
    'MULTI_CARRIAGEWAY': 'MULTI_CARRIAGEWAY',
    'ROUNDABOUT': 'ROUNDABOUT',
    'TRAVERSABLE_ROUNDABOUT': 'TRAVERSABLE_ROUNDABOUT',
    'JUGHANDLE': 'JUGHANDLE',
    'ALL_WAY_YIELD': 'ALL_WAY_YIELD',
    'TURN_AROUND': 'TURN_AROUND',
});

export { NavigationJunction };