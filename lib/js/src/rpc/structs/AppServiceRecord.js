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

import { AppServiceManifest } from './AppServiceManifest.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * This is the record of an app service publisher that the module has. It should contain the most up to date information including the service's active state
 */
class AppServiceRecord extends RpcStruct {
    /**
     * Initalizes an instance of AppServiceRecord.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ServiceID
     * @param {String} id - A unique ID tied to this specific service record. The ID is supplied by the module that services publish themselves. - The desired ServiceID.
     * {'string_min_length': 1}
     * @returns {AppServiceRecord} - The class instance for method chaining.
     */
    setServiceID (id) {
        this.setParameter(AppServiceRecord.KEY_SERVICE_ID, id);
        return this;
    }

    /**
     * Get the ServiceID
     * @returns {String} - the KEY_SERVICE_ID value
     */
    getServiceID () {
        return this.getParameter(AppServiceRecord.KEY_SERVICE_ID);
    }

    /**
     * Set the ServiceManifest
     * @param {AppServiceManifest} manifest - Manifest for the service that this record is for. - The desired ServiceManifest.
     * @returns {AppServiceRecord} - The class instance for method chaining.
     */
    setServiceManifest (manifest) {
        this._validateType(AppServiceManifest, manifest);
        this.setParameter(AppServiceRecord.KEY_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * Get the ServiceManifest
     * @returns {AppServiceManifest} - the KEY_SERVICE_MANIFEST value
     */
    getServiceManifest () {
        return this.getObject(AppServiceManifest, AppServiceRecord.KEY_SERVICE_MANIFEST);
    }

    /**
     * Set the ServicePublished
     * @param {Boolean} published - If true, the service is published and available. If false, the service has likely just been unpublished, and should be considered unavailable. - The desired ServicePublished.
     * @returns {AppServiceRecord} - The class instance for method chaining.
     */
    setServicePublished (published) {
        this.setParameter(AppServiceRecord.KEY_SERVICE_PUBLISHED, published);
        return this;
    }

    /**
     * Get the ServicePublished
     * @returns {Boolean} - the KEY_SERVICE_PUBLISHED value
     */
    getServicePublished () {
        return this.getParameter(AppServiceRecord.KEY_SERVICE_PUBLISHED);
    }

    /**
     * Set the ServiceActive
     * @param {Boolean} active - If true, the service is the active primary service of the supplied service type. It will receive all potential RPCs that are passed through to that service type. If false, it is not the primary service of the supplied type. See servicePublished for its availability. - The desired ServiceActive.
     * @returns {AppServiceRecord} - The class instance for method chaining.
     */
    setServiceActive (active) {
        this.setParameter(AppServiceRecord.KEY_SERVICE_ACTIVE, active);
        return this;
    }

    /**
     * Get the ServiceActive
     * @returns {Boolean} - the KEY_SERVICE_ACTIVE value
     */
    getServiceActive () {
        return this.getParameter(AppServiceRecord.KEY_SERVICE_ACTIVE);
    }
}

AppServiceRecord.KEY_SERVICE_ID = 'serviceID';
AppServiceRecord.KEY_SERVICE_MANIFEST = 'serviceManifest';
AppServiceRecord.KEY_SERVICE_PUBLISHED = 'servicePublished';
AppServiceRecord.KEY_SERVICE_ACTIVE = 'serviceActive';

export { AppServiceRecord };