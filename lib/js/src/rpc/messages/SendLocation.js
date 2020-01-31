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

import { FunctionID } from '../enums/FunctionID.js';
import { DeliveryMode } from '../enums/DeliveryMode.js';
import { DateTime } from '../structs/DateTime.js';
import { RpcRequest } from '../RpcRequest.js';
import { OASISAddress } from '../structs/OASISAddress.js';
import { Image } from '../structs/Image.js';

class SendLocation extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.SendLocation);
    }

    /**
     * @param {Number} degrees
     * @return {SendLocation}
     */
    setLongitudeDegrees (degrees) {
        this.setParameter(SendLocation.KEY_LONGITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * @return {Number}
     */
    getLongitudeDegrees () {
        return this.getParameter(SendLocation.KEY_LONGITUDE_DEGREES);
    }

    /**
     * @param {Number} degrees
     * @return {SendLocation}
     */
    setLatitudeDegrees (degrees) {
        this.setParameter(SendLocation.KEY_LATITUDE_DEGREES, degrees);
        return this;
    }

    /**
     * @return {Number}
     */
    getLatitudeDegrees () {
        return this.getParameter(SendLocation.KEY_LATITUDE_DEGREES);
    }

    /**
     * @param {String} name - Name / title of intended location
     * @return {SendLocation}
     */
    setLocationName (name) {
        this.setParameter(SendLocation.KEY_LOCATION_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getLocationName () {
        return this.getParameter(SendLocation.KEY_LOCATION_NAME);
    }

    /**
     * @param {String} description - Description intended location / establishment (if applicable)
     * @return {SendLocation}
     */
    setLocationDescription (description) {
        this.setParameter(SendLocation.KEY_LOCATION_DESCRIPTION, description);
        return this;
    }

    /**
     * @return {String}
     */
    getLocationDescription () {
        return this.getParameter(SendLocation.KEY_LOCATION_DESCRIPTION);
    }

    /**
     * @param {String[]} lines - Location address (if applicable)
     * @return {SendLocation}
     */
    setAddressLines (lines) {
        this.setParameter(SendLocation.KEY_ADDRESS_LINES, lines);
        return this;
    }

    /**
     * @return {String[]}
     */
    getAddressLines () {
        return this.getParameter(SendLocation.KEY_ADDRESS_LINES);
    }

    /**
     * @param {String} number - Phone number of intended location / establishment (if applicable)
     * @return {SendLocation}
     */
    setPhoneNumber (number) {
        this.setParameter(SendLocation.KEY_PHONE_NUMBER, number);
        return this;
    }

    /**
     * @return {String}
     */
    getPhoneNumber () {
        return this.getParameter(SendLocation.KEY_PHONE_NUMBER);
    }

    /**
     * @param {Image} image - Image / icon of intended location (if applicable and supported)
     * @return {SendLocation}
     */
    setLocationImage (image) {
        this.validateType(Image, image);
        this.setParameter(SendLocation.KEY_LOCATION_IMAGE, image);
        return this;
    }

    /**
     * @return {Image}
     */
    getLocationImage () {
        return this.getObject(Image, SendLocation.KEY_LOCATION_IMAGE);
    }

    /**
     * @param {DateTime} stamp - timestamp in ISO 8601 format
     * @return {SendLocation}
     */
    setTimeStamp (stamp) {
        this.validateType(DateTime, stamp);
        this.setParameter(SendLocation.KEY_TIME_STAMP, stamp);
        return this;
    }

    /**
     * @return {DateTime}
     */
    getTimeStamp () {
        return this.getObject(DateTime, SendLocation.KEY_TIME_STAMP);
    }

    /**
     * @param {OASISAddress} address - Address to be used for setting destination
     * @return {SendLocation}
     */
    setAddress (address) {
        this.validateType(OASISAddress, address);
        this.setParameter(SendLocation.KEY_ADDRESS, address);
        return this;
    }

    /**
     * @return {OASISAddress}
     */
    getAddress () {
        return this.getObject(OASISAddress, SendLocation.KEY_ADDRESS);
    }

    /**
     * @param {DeliveryMode} mode - Defines the mode of prompt for user
     * @return {SendLocation}
     */
    setDeliveryMode (mode) {
        this.validateType(DeliveryMode, mode);
        this.setParameter(SendLocation.KEY_DELIVERY_MODE, mode);
        return this;
    }

    /**
     * @return {DeliveryMode}
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