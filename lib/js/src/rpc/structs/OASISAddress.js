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

import { RpcStruct } from '../RpcStruct.js';

class OASISAddress extends RpcStruct {
    /**
     * Initalizes an instance of OASISAddress.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the CountryName
     * @param {String} name - Name of the country (localized) - The desired CountryName.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setCountryName (name) {
        this.setParameter(OASISAddress.KEY_COUNTRY_NAME, name);
        return this;
    }

    /**
     * Get the CountryName
     * @returns {String} - the KEY_COUNTRY_NAME value
     */
    getCountryName () {
        return this.getParameter(OASISAddress.KEY_COUNTRY_NAME);
    }

    /**
     * Set the CountryCode
     * @param {String} code - Name of country (ISO 3166-2) - The desired CountryCode.
     * {'string_min_length': 0, 'string_max_length': 50}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setCountryCode (code) {
        this.setParameter(OASISAddress.KEY_COUNTRY_CODE, code);
        return this;
    }

    /**
     * Get the CountryCode
     * @returns {String} - the KEY_COUNTRY_CODE value
     */
    getCountryCode () {
        return this.getParameter(OASISAddress.KEY_COUNTRY_CODE);
    }

    /**
     * Set the PostalCode
     * @param {String} code - (PLZ, ZIP, PIN, CAP etc.) - The desired PostalCode.
     * {'string_min_length': 0, 'string_max_length': 16}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setPostalCode (code) {
        this.setParameter(OASISAddress.KEY_POSTAL_CODE, code);
        return this;
    }

    /**
     * Get the PostalCode
     * @returns {String} - the KEY_POSTAL_CODE value
     */
    getPostalCode () {
        return this.getParameter(OASISAddress.KEY_POSTAL_CODE);
    }

    /**
     * Set the AdministrativeArea
     * @param {String} area - Portion of country (e.g. state) - The desired AdministrativeArea.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setAdministrativeArea (area) {
        this.setParameter(OASISAddress.KEY_ADMINISTRATIVE_AREA, area);
        return this;
    }

    /**
     * Get the AdministrativeArea
     * @returns {String} - the KEY_ADMINISTRATIVE_AREA value
     */
    getAdministrativeArea () {
        return this.getParameter(OASISAddress.KEY_ADMINISTRATIVE_AREA);
    }

    /**
     * Set the SubAdministrativeArea
     * @param {String} area - Portion of e.g. state (e.g. county) - The desired SubAdministrativeArea.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setSubAdministrativeArea (area) {
        this.setParameter(OASISAddress.KEY_SUB_ADMINISTRATIVE_AREA, area);
        return this;
    }

    /**
     * Get the SubAdministrativeArea
     * @returns {String} - the KEY_SUB_ADMINISTRATIVE_AREA value
     */
    getSubAdministrativeArea () {
        return this.getParameter(OASISAddress.KEY_SUB_ADMINISTRATIVE_AREA);
    }

    /**
     * Set the Locality
     * @param {String} locality - Hypernym for e.g. city/village - The desired Locality.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setLocality (locality) {
        this.setParameter(OASISAddress.KEY_LOCALITY, locality);
        return this;
    }

    /**
     * Get the Locality
     * @returns {String} - the KEY_LOCALITY value
     */
    getLocality () {
        return this.getParameter(OASISAddress.KEY_LOCALITY);
    }

    /**
     * Set the SubLocality
     * @param {String} locality - Hypernym for e.g. district - The desired SubLocality.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setSubLocality (locality) {
        this.setParameter(OASISAddress.KEY_SUB_LOCALITY, locality);
        return this;
    }

    /**
     * Get the SubLocality
     * @returns {String} - the KEY_SUB_LOCALITY value
     */
    getSubLocality () {
        return this.getParameter(OASISAddress.KEY_SUB_LOCALITY);
    }

    /**
     * Set the Thoroughfare
     * @param {String} thoroughfare - Hypernym for street, road etc. - The desired Thoroughfare.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setThoroughfare (thoroughfare) {
        this.setParameter(OASISAddress.KEY_THOROUGHFARE, thoroughfare);
        return this;
    }

    /**
     * Get the Thoroughfare
     * @returns {String} - the KEY_THOROUGHFARE value
     */
    getThoroughfare () {
        return this.getParameter(OASISAddress.KEY_THOROUGHFARE);
    }

    /**
     * Set the SubThoroughfare
     * @param {String} thoroughfare - Portion of thoroughfare e.g. house number - The desired SubThoroughfare.
     * {'string_min_length': 0, 'string_max_length': 200}
     * @returns {OASISAddress} - The class instance for method chaining.
     */
    setSubThoroughfare (thoroughfare) {
        this.setParameter(OASISAddress.KEY_SUB_THOROUGHFARE, thoroughfare);
        return this;
    }

    /**
     * Get the SubThoroughfare
     * @returns {String} - the KEY_SUB_THOROUGHFARE value
     */
    getSubThoroughfare () {
        return this.getParameter(OASISAddress.KEY_SUB_THOROUGHFARE);
    }
}

OASISAddress.KEY_COUNTRY_NAME = 'countryName';
OASISAddress.KEY_COUNTRY_CODE = 'countryCode';
OASISAddress.KEY_POSTAL_CODE = 'postalCode';
OASISAddress.KEY_ADMINISTRATIVE_AREA = 'administrativeArea';
OASISAddress.KEY_SUB_ADMINISTRATIVE_AREA = 'subAdministrativeArea';
OASISAddress.KEY_LOCALITY = 'locality';
OASISAddress.KEY_SUB_LOCALITY = 'subLocality';
OASISAddress.KEY_THOROUGHFARE = 'thoroughfare';
OASISAddress.KEY_SUB_THOROUGHFARE = 'subThoroughfare';

export { OASISAddress };