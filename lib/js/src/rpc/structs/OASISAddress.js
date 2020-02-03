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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} name - Name of the country (localized)
     * @return {OASISAddress}
     */
    setCountryName (name) {
        this.setParameter(OASISAddress.KEY_COUNTRY_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getCountryName () {
        return this.getParameter(OASISAddress.KEY_COUNTRY_NAME);
    }

    /**
     * @param {String} code - Name of country (ISO 3166-2)
     * @return {OASISAddress}
     */
    setCountryCode (code) {
        this.setParameter(OASISAddress.KEY_COUNTRY_CODE, code);
        return this;
    }

    /**
     * @return {String}
     */
    getCountryCode () {
        return this.getParameter(OASISAddress.KEY_COUNTRY_CODE);
    }

    /**
     * @param {String} code - (PLZ, ZIP, PIN, CAP etc.)
     * @return {OASISAddress}
     */
    setPostalCode (code) {
        this.setParameter(OASISAddress.KEY_POSTAL_CODE, code);
        return this;
    }

    /**
     * @return {String}
     */
    getPostalCode () {
        return this.getParameter(OASISAddress.KEY_POSTAL_CODE);
    }

    /**
     * @param {String} area - Portion of country (e.g. state)
     * @return {OASISAddress}
     */
    setAdministrativeArea (area) {
        this.setParameter(OASISAddress.KEY_ADMINISTRATIVE_AREA, area);
        return this;
    }

    /**
     * @return {String}
     */
    getAdministrativeArea () {
        return this.getParameter(OASISAddress.KEY_ADMINISTRATIVE_AREA);
    }

    /**
     * @param {String} area - Portion of e.g. state (e.g. county)
     * @return {OASISAddress}
     */
    setSubAdministrativeArea (area) {
        this.setParameter(OASISAddress.KEY_SUB_ADMINISTRATIVE_AREA, area);
        return this;
    }

    /**
     * @return {String}
     */
    getSubAdministrativeArea () {
        return this.getParameter(OASISAddress.KEY_SUB_ADMINISTRATIVE_AREA);
    }

    /**
     * @param {String} locality - Hypernym for e.g. city/village
     * @return {OASISAddress}
     */
    setLocality (locality) {
        this.setParameter(OASISAddress.KEY_LOCALITY, locality);
        return this;
    }

    /**
     * @return {String}
     */
    getLocality () {
        return this.getParameter(OASISAddress.KEY_LOCALITY);
    }

    /**
     * @param {String} locality - Hypernym for e.g. district
     * @return {OASISAddress}
     */
    setSubLocality (locality) {
        this.setParameter(OASISAddress.KEY_SUB_LOCALITY, locality);
        return this;
    }

    /**
     * @return {String}
     */
    getSubLocality () {
        return this.getParameter(OASISAddress.KEY_SUB_LOCALITY);
    }

    /**
     * @param {String} thoroughfare - Hypernym for street, road etc.
     * @return {OASISAddress}
     */
    setThoroughfare (thoroughfare) {
        this.setParameter(OASISAddress.KEY_THOROUGHFARE, thoroughfare);
        return this;
    }

    /**
     * @return {String}
     */
    getThoroughfare () {
        return this.getParameter(OASISAddress.KEY_THOROUGHFARE);
    }

    /**
     * @param {String} thoroughfare - Portion of thoroughfare e.g. house number
     * @return {OASISAddress}
     */
    setSubThoroughfare (thoroughfare) {
        this.setParameter(OASISAddress.KEY_SUB_THOROUGHFARE, thoroughfare);
        return this;
    }

    /**
     * @return {String}
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