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
 * @typedef {Enum} MediaClockFormat
 * @property {Object} _MAP
 */
class MediaClockFormat extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * minutesFieldWidth = 2;minutesFieldMax = 19;secondsFieldWidth = 2;secondsFieldMax = 99;maxHours = 19;maxMinutes
     * = 59;maxSeconds = 59; used for Type II and CID headunits
     * @return {String}
     */
    static get CLOCK1 () {
        return MediaClockFormat._MAP.CLOCK1;
    }

    /**
     * minutesFieldWidth = 3;minutesFieldMax = 199;secondsFieldWidth = 2;secondsFieldMax = 99;maxHours = 59;maxMinutes
     * = 59;maxSeconds = 59; used for Type V headunit
     * @return {String}
     */
    static get CLOCK2 () {
        return MediaClockFormat._MAP.CLOCK2;
    }

    /**
     * minutesFieldWidth = 2;minutesFieldMax = 59;secondsFieldWidth = 2;secondsFieldMax = 59;maxHours = 9;maxMinutes =
     * 59;maxSeconds = 59; used for GEN1.1 MFD3/4/5 headunits
     * @return {String}
     */
    static get CLOCK3 () {
        return MediaClockFormat._MAP.CLOCK3;
    }

    /**
     * 5 characters possible Format: 1|sp c :|sp c c 1|sp : digit "1" or space c : character out of following
     * character set: sp|0-9|[letters, see TypeII column in XLS. See :|sp : colon or space used for Type II headunit
     * @return {String}
     */
    static get CLOCKTEXT1 () {
        return MediaClockFormat._MAP.CLOCKTEXT1;
    }

    /**
     * 5 chars possible Format: 1|sp c :|sp c c 1|sp : digit "1" or space c : character out of following character
     * set: sp|0-9|[letters, see CID column in XLS. See :|sp : colon or space used for CID headunit NOTE: difference
     * between CLOCKTEXT1 and CLOCKTEXT2 is the supported character set
     * @return {String}
     */
    static get CLOCKTEXT2 () {
        return MediaClockFormat._MAP.CLOCKTEXT2;
    }

    /**
     * 6 chars possible Format: 1|sp c c :|sp c c 1|sp : digit "1" or space c : character out of following character
     * set: sp|0-9|[letters, see Type 5 column in XLS]. See :|sp : colon or space used for Type V headunit
     * @return {String}
     */
    static get CLOCKTEXT3 () {
        return MediaClockFormat._MAP.CLOCKTEXT3;
    }

    /**
     * 6 chars possible Format: c :|sp c c : c c :|sp : colon or space c : character out of following character set:
     * sp|0-9|[letters]. used for GEN1.1 MFD3/4/5 headunits
     * @return {String}
     */
    static get CLOCKTEXT4 () {
        return MediaClockFormat._MAP.CLOCKTEXT4;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return MediaClockFormat._valueForKey(key, MediaClockFormat._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return MediaClockFormat._keyForValue(value, MediaClockFormat._MAP);
    }
}

MediaClockFormat._MAP = Object.freeze({
    'CLOCK1': 'CLOCK1',
    'CLOCK2': 'CLOCK2',
    'CLOCK3': 'CLOCK3',
    'CLOCKTEXT1': 'CLOCKTEXT1',
    'CLOCKTEXT2': 'CLOCKTEXT2',
    'CLOCKTEXT3': 'CLOCKTEXT3',
    'CLOCKTEXT4': 'CLOCKTEXT4',
});

export { MediaClockFormat };