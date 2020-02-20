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
import { RpcRequest } from '../RpcRequest.js';

class PerformAppServiceInteraction extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.PerformAppServiceInteraction);
    }

    /**
     * @param {String} uri - Fully qualified URI based on a predetermined scheme provided by the app service. SDL makes
     *                       no guarantee that this URI is correct.
     * @return {PerformAppServiceInteraction}
     */
    setServiceUri (uri) {
        this.setParameter(PerformAppServiceInteraction.KEY_SERVICE_URI, uri);
        return this;
    }

    /**
     * @return {String}
     */
    getServiceUri () {
        return this.getParameter(PerformAppServiceInteraction.KEY_SERVICE_URI);
    }

    /**
     * @param {String} id - The service ID that the app consumer wishes to send this URI.
     * @return {PerformAppServiceInteraction}
     */
    setServiceID (id) {
        this.setParameter(PerformAppServiceInteraction.KEY_SERVICE_ID, id);
        return this;
    }

    /**
     * @return {String}
     */
    getServiceID () {
        return this.getParameter(PerformAppServiceInteraction.KEY_SERVICE_ID);
    }

    /**
     * @param {String} app - This string is the appID of the app requesting the app service provider take the specific
     *                       action.
     * @return {PerformAppServiceInteraction}
     */
    setOriginApp (app) {
        this.setParameter(PerformAppServiceInteraction.KEY_ORIGIN_APP, app);
        return this;
    }

    /**
     * @return {String}
     */
    getOriginApp () {
        return this.getParameter(PerformAppServiceInteraction.KEY_ORIGIN_APP);
    }

    /**
     * @param {Boolean} active - This flag signals the requesting consumer would like this service to become the active
     *                           primary service of the destination's type.
     * @return {PerformAppServiceInteraction}
     */
    setRequestServiceActive (active) {
        this.setParameter(PerformAppServiceInteraction.KEY_REQUEST_SERVICE_ACTIVE, active);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getRequestServiceActive () {
        return this.getParameter(PerformAppServiceInteraction.KEY_REQUEST_SERVICE_ACTIVE);
    }
}

PerformAppServiceInteraction.KEY_SERVICE_URI = 'serviceUri';
PerformAppServiceInteraction.KEY_SERVICE_ID = 'serviceID';
PerformAppServiceInteraction.KEY_ORIGIN_APP = 'originApp';
PerformAppServiceInteraction.KEY_REQUEST_SERVICE_ACTIVE = 'requestServiceActive';

export { PerformAppServiceInteraction };