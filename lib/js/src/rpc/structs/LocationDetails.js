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

import { Coordinate } from './Coordinate.js';
import { Image } from './Image.js';
import { OASISAddress } from './OASISAddress.js';
import { RpcStruct } from '../RpcStruct.js';

class LocationDetails extends RpcStruct {
    /**
     * Initializes an instance of LocationDetails.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 4.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Coordinate
     * @param {Coordinate} coordinate - Latitude/Longitude of the location. - The desired Coordinate.
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setCoordinate (coordinate) {
        this._validateType(Coordinate, coordinate);
        this.setParameter(LocationDetails.KEY_COORDINATE, coordinate);
        return this;
    }

    /**
     * Get the Coordinate
     * @returns {Coordinate} - the KEY_COORDINATE value
     */
    getCoordinate () {
        return this.getObject(Coordinate, LocationDetails.KEY_COORDINATE);
    }

    /**
     * Set the LocationName
     * @param {String} name - Name of location. - The desired LocationName.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setLocationName (name) {
        this.setParameter(LocationDetails.KEY_LOCATION_NAME, name);
        return this;
    }

    /**
     * Get the LocationName
     * @returns {String} - the KEY_LOCATION_NAME value
     */
    getLocationName () {
        return this.getParameter(LocationDetails.KEY_LOCATION_NAME);
    }

    /**
     * Set the AddressLines
     * @param {String[]} lines - Location address for display purposes only - The desired AddressLines.
     * {'array_min_size': 0, 'array_max_size': 4, 'string_min_length': 1, 'string_max_length': 500}
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setAddressLines (lines) {
        this.setParameter(LocationDetails.KEY_ADDRESS_LINES, lines);
        return this;
    }

    /**
     * Get the AddressLines
     * @returns {String[]} - the KEY_ADDRESS_LINES value
     */
    getAddressLines () {
        return this.getParameter(LocationDetails.KEY_ADDRESS_LINES);
    }

    /**
     * Set the LocationDescription
     * @param {String} description - Description intended location / establishment (if applicable) - The desired LocationDescription.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setLocationDescription (description) {
        this.setParameter(LocationDetails.KEY_LOCATION_DESCRIPTION, description);
        return this;
    }

    /**
     * Get the LocationDescription
     * @returns {String} - the KEY_LOCATION_DESCRIPTION value
     */
    getLocationDescription () {
        return this.getParameter(LocationDetails.KEY_LOCATION_DESCRIPTION);
    }

    /**
     * Set the PhoneNumber
     * @param {String} number - Phone number of location / establishment. - The desired PhoneNumber.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setPhoneNumber (number) {
        this.setParameter(LocationDetails.KEY_PHONE_NUMBER, number);
        return this;
    }

    /**
     * Get the PhoneNumber
     * @returns {String} - the KEY_PHONE_NUMBER value
     */
    getPhoneNumber () {
        return this.getParameter(LocationDetails.KEY_PHONE_NUMBER);
    }

    /**
     * Set the LocationImage
     * @param {Image} image - Image / icon of intended location. - The desired LocationImage.
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setLocationImage (image) {
        this._validateType(Image, image);
        this.setParameter(LocationDetails.KEY_LOCATION_IMAGE, image);
        return this;
    }

    /**
     * Get the LocationImage
     * @returns {Image} - the KEY_LOCATION_IMAGE value
     */
    getLocationImage () {
        return this.getObject(Image, LocationDetails.KEY_LOCATION_IMAGE);
    }

    /**
     * Set the SearchAddress
     * @param {OASISAddress} address - Address to be used by navigation engines for search - The desired SearchAddress.
     * @returns {LocationDetails} - The class instance for method chaining.
     */
    setSearchAddress (address) {
        this._validateType(OASISAddress, address);
        this.setParameter(LocationDetails.KEY_SEARCH_ADDRESS, address);
        return this;
    }

    /**
     * Get the SearchAddress
     * @returns {OASISAddress} - the KEY_SEARCH_ADDRESS value
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