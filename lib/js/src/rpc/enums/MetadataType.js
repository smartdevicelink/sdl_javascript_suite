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

/**
 * @typedef {Enum} MetadataType
 * @property {Object} _MAP
 */
class MetadataType extends Enum {
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get mediaTitle () {
        return MetadataType._MAP.mediaTitle;
    }

    /**
     * @return {String}
     */
    static get mediaArtist () {
        return MetadataType._MAP.mediaArtist;
    }

    /**
     * @return {String}
     */
    static get mediaAlbum () {
        return MetadataType._MAP.mediaAlbum;
    }

    /**
     * @return {String}
     */
    static get mediaYear () {
        return MetadataType._MAP.mediaYear;
    }

    /**
     * @return {String}
     */
    static get mediaGenre () {
        return MetadataType._MAP.mediaGenre;
    }

    /**
     * @return {String}
     */
    static get mediaStation () {
        return MetadataType._MAP.mediaStation;
    }

    /**
     * @return {String}
     */
    static get rating () {
        return MetadataType._MAP.rating;
    }

    /**
     * @return {String}
     */
    static get currentTemperature () {
        return MetadataType._MAP.currentTemperature;
    }

    /**
     * @return {String}
     */
    static get maximumTemperature () {
        return MetadataType._MAP.maximumTemperature;
    }

    /**
     * @return {String}
     */
    static get minimumTemperature () {
        return MetadataType._MAP.minimumTemperature;
    }

    /**
     * @return {String}
     */
    static get weatherTerm () {
        return MetadataType._MAP.weatherTerm;
    }

    /**
     * @return {String}
     */
    static get humidity () {
        return MetadataType._MAP.humidity;
    }

    /**
    * Get the value for the given enum key
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return MetadataType._valueForKey(key, MetadataType._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return MetadataType._keyForValue(value, MetadataType._MAP);
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
