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
 * @typedef {Enum} MetadataType
 * @property {Object} _MAP
 */
class MetadataType extends Enum {
    /**
     * Constructor for MetadataType.
     * @class
     * @since SmartDeviceLink 4.5.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for mediaTitle.
     * The data in this field contains the title of the currently playing audio track.
     * @returns {String} - The enum value.
     */
    static get mediaTitle () {
        return MetadataType._MAP.mediaTitle;
    }

    /**
     * Get the enum value for mediaArtist.
     * The data in this field contains the artist or creator of the currently playing audio track.
     * @returns {String} - The enum value.
     */
    static get mediaArtist () {
        return MetadataType._MAP.mediaArtist;
    }

    /**
     * Get the enum value for mediaAlbum.
     * The data in this field contains the album title of the currently playing audio track.
     * @returns {String} - The enum value.
     */
    static get mediaAlbum () {
        return MetadataType._MAP.mediaAlbum;
    }

    /**
     * Get the enum value for mediaYear.
     * The data in this field contains the creation year of the currently playing audio track.
     * @returns {String} - The enum value.
     */
    static get mediaYear () {
        return MetadataType._MAP.mediaYear;
    }

    /**
     * Get the enum value for mediaGenre.
     * The data in this field contains the genre of the currently playing audio track.
     * @returns {String} - The enum value.
     */
    static get mediaGenre () {
        return MetadataType._MAP.mediaGenre;
    }

    /**
     * Get the enum value for mediaStation.
     * The data in this field contains the name of the current source for the media.
     * @returns {String} - The enum value.
     */
    static get mediaStation () {
        return MetadataType._MAP.mediaStation;
    }

    /**
     * Get the enum value for rating.
     * The data in this field is a rating.
     * @returns {String} - The enum value.
     */
    static get rating () {
        return MetadataType._MAP.rating;
    }

    /**
     * Get the enum value for currentTemperature.
     * The data in this field is the current temperature.
     * @returns {String} - The enum value.
     */
    static get currentTemperature () {
        return MetadataType._MAP.currentTemperature;
    }

    /**
     * Get the enum value for maximumTemperature.
     * The data in this field is the maximum temperature for the day.
     * @returns {String} - The enum value.
     */
    static get maximumTemperature () {
        return MetadataType._MAP.maximumTemperature;
    }

    /**
     * Get the enum value for minimumTemperature.
     * The data in this field is the minimum temperature for the day.
     * @returns {String} - The enum value.
     */
    static get minimumTemperature () {
        return MetadataType._MAP.minimumTemperature;
    }

    /**
     * Get the enum value for weatherTerm.
     * The data in this field describes the current weather (ex. cloudy, clear, etc.).
     * @returns {String} - The enum value.
     */
    static get weatherTerm () {
        return MetadataType._MAP.weatherTerm;
    }

    /**
     * Get the enum value for humidity.
     * The data in this field describes the current humidity value.
     * @returns {String} - The enum value.
     */
    static get humidity () {
        return MetadataType._MAP.humidity;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return MetadataType._valueForKey(key, MetadataType._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return MetadataType._keyForValue(value, MetadataType._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(MetadataType._MAP);
    }
}

MetadataType._MAP = Object.freeze({
    'mediaTitle': 'mediaTitle',
    'mediaArtist': 'mediaArtist',
    'mediaAlbum': 'mediaAlbum',
    'mediaYear': 'mediaYear',
    'mediaGenre': 'mediaGenre',
    'mediaStation': 'mediaStation',
    'rating': 'rating',
    'currentTemperature': 'currentTemperature',
    'maximumTemperature': 'maximumTemperature',
    'minimumTemperature': 'minimumTemperature',
    'weatherTerm': 'weatherTerm',
    'humidity': 'humidity',
});

export { MetadataType };