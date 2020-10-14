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

import { DateTime } from '../structs/DateTime.js';
import { DeliveryMode } from '../enums/DeliveryMode.js';
import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { OASISAddress } from '../structs/OASISAddress.js';
import { RpcRequest } from '../RpcRequest.js';

class SendLocation extends RpcRequest {
    /**
     * Initalizes an instance of SendLocation.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 3.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.SendLocation);
    }

    /**
     * Set the LongitudeDegrees
     * @param {Number} degrees - The desired LongitudeDegrees.
     * {'num_min_value': -180.0, 'num_max_value': 180.0}
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setLongitudeDegrees (degrees) {
        this.setParameter(SendLocation.KEY_LONGITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * Get the LongitudeDegrees
     * @returns {Number} - the KEY_LONGITUDE_DEGREES value
     */
    getLongitudeDegrees () {
        return this.getParameter(SendLocation.KEY_LONGITUDE_DEGREES);
    }

    /**
     * Set the LatitudeDegrees
     * @param {Number} degrees - The desired LatitudeDegrees.
     * {'num_min_value': -90.0, 'num_max_value': 90.0}
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setLatitudeDegrees (degrees) {
        this.setParameter(SendLocation.KEY_LATITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * Get the LatitudeDegrees
     * @returns {Number} - the KEY_LATITUDE_DEGREES value
     */
    getLatitudeDegrees () {
        return this.getParameter(SendLocation.KEY_LATITUDE_DEGREES);
    }

    /**
     * Set the LocationName
     * @param {String} name - Name / title of intended location - The desired LocationName.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setLocationName (name) {
        this.setParameter(SendLocation.KEY_LOCATION_NAME, name);
        return this;
    }

    /**
     * Get the LocationName
     * @returns {String} - the KEY_LOCATION_NAME value
     */
    getLocationName () {
        return this.getParameter(SendLocation.KEY_LOCATION_NAME);
    }

    /**
     * Set the LocationDescription
     * @param {String} description - Description intended location / establishment (if applicable) - The desired LocationDescription.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setLocationDescription (description) {
        this.setParameter(SendLocation.KEY_LOCATION_DESCRIPTION, description);
        return this;
    }

    /**
     * Get the LocationDescription
     * @returns {String} - the KEY_LOCATION_DESCRIPTION value
     */
    getLocationDescription () {
        return this.getParameter(SendLocation.KEY_LOCATION_DESCRIPTION);
    }

    /**
     * Set the AddressLines
     * @param {String[]} lines - Location address (if applicable) - The desired AddressLines.
     * {'array_min_size': 0, 'array_max_size': 4, 'string_min_length': 1, 'string_max_length': 500}
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setAddressLines (lines) {
        this.setParameter(SendLocation.KEY_ADDRESS_LINES, lines);
        return this;
    }

    /**
     * Get the AddressLines
     * @returns {String[]} - the KEY_ADDRESS_LINES value
     */
    getAddressLines () {
        return this.getParameter(SendLocation.KEY_ADDRESS_LINES);
    }

    /**
     * Set the PhoneNumber
     * @param {String} number - Phone number of intended location / establishment (if applicable) - The desired PhoneNumber.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setPhoneNumber (number) {
        this.setParameter(SendLocation.KEY_PHONE_NUMBER, number);
        return this;
    }

    /**
     * Get the PhoneNumber
     * @returns {String} - the KEY_PHONE_NUMBER value
     */
    getPhoneNumber () {
        return this.getParameter(SendLocation.KEY_PHONE_NUMBER);
    }

    /**
     * Set the LocationImage
     * @param {Image} image - Image / icon of intended location (if applicable and supported) - The desired LocationImage.
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setLocationImage (image) {
        this._validateType(Image, image);
        this.setParameter(SendLocation.KEY_LOCATION_IMAGE, image);
        return this;
    }

    /**
     * Get the LocationImage
     * @returns {Image} - the KEY_LOCATION_IMAGE value
     */
    getLocationImage () {
        return this.getObject(Image, SendLocation.KEY_LOCATION_IMAGE);
    }

    /**
     * Set the TimeStamp
     * @since SmartDeviceLink 4.1.0
     * @param {DateTime} stamp - timestamp in ISO 8601 format - The desired TimeStamp.
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setTimeStamp (stamp) {
        this._validateType(DateTime, stamp);
        this.setParameter(SendLocation.KEY_TIME_STAMP, stamp);
        return this;
    }

    /**
     * Get the TimeStamp
     * @returns {DateTime} - the KEY_TIME_STAMP value
     */
    getTimeStamp () {
        return this.getObject(DateTime, SendLocation.KEY_TIME_STAMP);
    }

    /**
     * Set the Address
     * @since SmartDeviceLink 4.1.0
     * @param {OASISAddress} address - Address to be used for setting destination - The desired Address.
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setAddress (address) {
        this._validateType(OASISAddress, address);
        this.setParameter(SendLocation.KEY_ADDRESS, address);
        return this;
    }

    /**
     * Get the Address
     * @returns {OASISAddress} - the KEY_ADDRESS value
     */
    getAddress () {
        return this.getObject(OASISAddress, SendLocation.KEY_ADDRESS);
    }

    /**
     * Set the DeliveryMode
     * @since SmartDeviceLink 4.1.0
     * @param {DeliveryMode} mode - Defines the mode of prompt for user - The desired DeliveryMode.
     * @returns {SendLocation} - The class instance for method chaining.
     */
    setDeliveryMode (mode) {
        this._validateType(DeliveryMode, mode);
        this.setParameter(SendLocation.KEY_DELIVERY_MODE, mode);
        return this;
    }

    /**
     * Get the DeliveryMode
     * @returns {DeliveryMode} - the KEY_DELIVERY_MODE value
     */
    getDeliveryMode () {
        return this.getObject(DeliveryMode, SendLocation.KEY_DELIVERY_MODE);
    }
}

SendLocation.KEY_LONGITUDE_DEGREES = 'longitudeDegrees';
SendLocation.KEY_LATITUDE_DEGREES = 'latitudeDegrees';
SendLocation.KEY_LOCATION_NAME = 'locationName';
SendLocation.KEY_LOCATION_DESCRIPTION = 'locationDescription';
SendLocation.KEY_ADDRESS_LINES = 'addressLines';
SendLocation.KEY_PHONE_NUMBER = 'phoneNumber';
SendLocation.KEY_LOCATION_IMAGE = 'locationImage';
SendLocation.KEY_TIME_STAMP = 'timeStamp';
SendLocation.KEY_ADDRESS = 'address';
SendLocation.KEY_DELIVERY_MODE = 'deliveryMode';

export { SendLocation };