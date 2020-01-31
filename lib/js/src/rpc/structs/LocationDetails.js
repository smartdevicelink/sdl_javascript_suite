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

import { Coordinate } from './Coordinate.js';
import { Image } from './Image.js';
import { OASISAddress } from './OASISAddress.js';
import { RpcStruct } from '../RpcStruct.js';

class LocationDetails extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Coordinate} coordinate - Latitude/Longitude of the location.
     * @return {LocationDetails}
     */
    setCoordinate (coordinate) {
        this.validateType(Coordinate, coordinate);
        this.setParameter(LocationDetails.KEY_COORDINATE, coordinate);
        return this;
    }

    /**
     * @return {Coordinate}
     */
    getCoordinate () {
        return this.getObject(Coordinate, LocationDetails.KEY_COORDINATE);
    }

    /**
     * @param {String} name - Name of location.
     * @return {LocationDetails}
     */
    setLocationName (name) {
        this.setParameter(LocationDetails.KEY_LOCATION_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getLocationName () {
        return this.getParameter(LocationDetails.KEY_LOCATION_NAME);
    }

    /**
     * @param {String[]} lines - Location address for display purposes only
     * @return {LocationDetails}
     */
    setAddressLines (lines) {
        this.setParameter(LocationDetails.KEY_ADDRESS_LINES, lines);
        return this;
    }

    /**
     * @return {String[]}
     */
    getAddressLines () {
        return this.getParameter(LocationDetails.KEY_ADDRESS_LINES);
    }

    /**
     * @param {String} description - Description intended location / establishment (if applicable)
     * @return {LocationDetails}
     */
    setLocationDescription (description) {
        this.setParameter(LocationDetails.KEY_LOCATION_DESCRIPTION, description);
        return this;
    }

    /**
     * @return {String}
     */
    getLocationDescription () {
        return this.getParameter(LocationDetails.KEY_LOCATION_DESCRIPTION);
    }

    /**
     * @param {String} number - Phone number of location / establishment.
     * @return {LocationDetails}
     */
    setPhoneNumber (number) {
        this.setParameter(LocationDetails.KEY_PHONE_NUMBER, number);
        return this;
    }

    /**
     * @return {String}
     */
    getPhoneNumber () {
        return this.getParameter(LocationDetails.KEY_PHONE_NUMBER);
    }

    /**
     * @param {Image} image - Image / icon of intended location.
     * @return {LocationDetails}
     */
    setLocationImage (image) {
        this.validateType(Image, image);
        this.setParameter(LocationDetails.KEY_LOCATION_IMAGE, image);
        return this;
    }

    /**
     * @return {Image}
     */
    getLocationImage () {
        return this.getObject(Image, LocationDetails.KEY_LOCATION_IMAGE);
    }

    /**
     * @param {OASISAddress} address - Address to be used by navigation engines for search
     * @return {LocationDetails}
     */
    setSearchAddress (address) {
        this.validateType(OASISAddress, address);
        this.setParameter(LocationDetails.KEY_SEARCH_ADDRESS, address);
        return this;
    }

    /**
     * @return {OASISAddress}
     */
    getSearchAddress () {
        return this.getObject(OASISAddress, LocationDetails.KEY_SEARCH_ADDRESS);
    }
}

LocationDetails.KEY_COORDINATE = 'coordinate';
LocationDetails.KEY_LOCATION_NAME = 'locationName';
LocationDetails.KEY_ADDRESS_LINES = 'addressLines';
LocationDetails.KEY_LOCATION_DESCRIPTION = 'locationDescription';
LocationDetails.KEY_PHONE_NUMBER = 'phoneNumber';
LocationDetails.KEY_LOCATION_IMAGE = 'locationImage';
LocationDetails.KEY_SEARCH_ADDRESS = 'searchAddress';

export { LocationDetails };