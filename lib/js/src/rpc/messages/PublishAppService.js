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

import { AppServiceManifest } from '../structs/AppServiceManifest.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';

/**
 * Registers a service offered by this app on the module. Subsequent calls with the same service type will update the
 * manifest for that service.
 */
class PublishAppService extends RpcRequest {
    /**
     * Initalizes an instance of PublishAppService.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.PublishAppService);
    }

    /**
     * Set the AppServiceManifest
     * @param {AppServiceManifest} manifest - The manifest of the service that wishes to be published. If already - The desired AppServiceManifest.
     * published, the updated manifest for this service.
     * @returns {PublishAppService} - The class instance for method chaining.
     */
    setAppServiceManifest (manifest) {
        this._validateType(AppServiceManifest, manifest);
        this.setParameter(PublishAppService.KEY_APP_SERVICE_MANIFEST, manifest);
        return this;
    }

    /**
     * Get the AppServiceManifest
     * @returns {AppServiceManifest} - the KEY_APP_SERVICE_MANIFEST value
     */
    getAppServiceManifest () {
        return this.getObject(AppServiceManifest, PublishAppService.KEY_APP_SERVICE_MANIFEST);
    }
}

PublishAppService.KEY_APP_SERVICE_MANIFEST = 'appServiceManifest';

export { PublishAppService };