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

import { Grid } from './Grid.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Information about a RC module
 */
class ModuleInfo extends RpcStruct {
    /**
     * Initalizes an instance of ModuleInfo.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the ModuleId
     * @param {String} id - uuid of a module. "moduleId + moduleType" uniquely identify a module. - The desired ModuleId.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {ModuleInfo} - The class instance for method chaining.
     */
    setModuleId (id) {
        this.setParameter(ModuleInfo.KEY_MODULE_ID, id);
        return this;
    }

    /**
     * Get the ModuleId
     * @returns {String} - the KEY_MODULE_ID value
     */
    getModuleId () {
        return this.getParameter(ModuleInfo.KEY_MODULE_ID);
    }

    /**
     * Set the Location
     * @param {Grid} location - Location of a module. - The desired Location.
     * @returns {ModuleInfo} - The class instance for method chaining.
     */
    setLocation (location) {
        this._validateType(Grid, location);
        this.setParameter(ModuleInfo.KEY_LOCATION, location);
        return this;
    }

    /**
     * Get the Location
     * @returns {Grid} - the KEY_LOCATION value
     */
    getLocation () {
        return this.getObject(Grid, ModuleInfo.KEY_LOCATION);
    }

    /**
     * Set the ServiceArea
     * @param {Grid} area - Service area of a module. - The desired ServiceArea.
     * @returns {ModuleInfo} - The class instance for method chaining.
     */
    setServiceArea (area) {
        this._validateType(Grid, area);
        this.setParameter(ModuleInfo.KEY_SERVICE_AREA, area);
        return this;
    }

    /**
     * Get the ServiceArea
     * @returns {Grid} - the KEY_SERVICE_AREA value
     */
    getServiceArea () {
        return this.getObject(Grid, ModuleInfo.KEY_SERVICE_AREA);
    }

    /**
     * Set the AllowMultipleAccess
     * @param {Boolean} access - allow multiple users/apps to access the module or not - The desired AllowMultipleAccess.
     * {'default_value': True}
     * @returns {ModuleInfo} - The class instance for method chaining.
     */
    setAllowMultipleAccess (access) {
        this.setParameter(ModuleInfo.KEY_ALLOW_MULTIPLE_ACCESS, access);
        return this;
    }

    /**
     * Get the AllowMultipleAccess
     * @returns {Boolean} - the KEY_ALLOW_MULTIPLE_ACCESS value
     */
    getAllowMultipleAccess () {
        return this.getParameter(ModuleInfo.KEY_ALLOW_MULTIPLE_ACCESS);
    }
}

ModuleInfo.KEY_MODULE_ID = 'moduleId';
ModuleInfo.KEY_LOCATION = 'location';
ModuleInfo.KEY_SERVICE_AREA = 'serviceArea';
ModuleInfo.KEY_ALLOW_MULTIPLE_ACCESS = 'allowMultipleAccess';

export { ModuleInfo };