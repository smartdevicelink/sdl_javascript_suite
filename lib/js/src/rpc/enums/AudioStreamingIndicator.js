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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} AudioStreamingIndicator
 * @property {Object} _MAP
 */
class AudioStreamingIndicator extends Enum {
    /**
     * Constructor for AudioStreamingIndicator.
     * @class
     * @since SmartDeviceLink 5.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for PLAY_PAUSE.
     * Default playback indicator. By default the playback indicator should be PLAY_PAUSE when: - the media app is newly registered on the head unit (after RegisterAppInterface) - the media app was closed by the user (App enters HMI_NONE) - the app sends SetMediaClockTimer with audioStreamingIndicator not set to any value
     * @returns {String} - The enum value.
     */
    static get PLAY_PAUSE () {
        return AudioStreamingIndicator._MAP.PLAY_PAUSE;
    }

    /**
     * Get the enum value for PLAY.
     * Indicates that a button press of the Play/Pause button starts the audio playback.
     * @returns {String} - The enum value.
     */
    static get PLAY () {
        return AudioStreamingIndicator._MAP.PLAY;
    }

    /**
     * Get the enum value for PAUSE.
     * Indicates that a button press of the Play/Pause button pauses the current audio playback.
     * @returns {String} - The enum value.
     */
    static get PAUSE () {
        return AudioStreamingIndicator._MAP.PAUSE;
    }

    /**
     * Get the enum value for STOP.
     * Indicates that a button press of the Play/Pause button stops the current audio playback.
     * @returns {String} - The enum value.
     */
    static get STOP () {
        return AudioStreamingIndicator._MAP.STOP;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return AudioStreamingIndicator._valueForKey(key, AudioStreamingIndicator._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return AudioStreamingIndicator._keyForValue(value, AudioStreamingIndicator._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(AudioStreamingIndicator._MAP);
    }
}

AudioStreamingIndicator._MAP = Object.freeze({
    'PLAY_PAUSE': 'PLAY_PAUSE',
    'PLAY': 'PLAY',
    'PAUSE': 'PAUSE',
    'STOP': 'STOP',
});

export { AudioStreamingIndicator };