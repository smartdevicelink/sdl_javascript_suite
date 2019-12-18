/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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
import { Grid } from './Grid.js';

class ModuleInfo extends RpcStruct {

    constructor (parameters) {
        super(parameters);
    }

    /**
    * @param {String} moduleId
    * @return {ModuleInfo}
    */
    setModuleId (moduleId) {
        this.setParameter(ModuleInfo.KEY_MODULE_ID, moduleId);
        return this;
    }

    /**
    * @return {String}
    */
    getModuleId () {
        return this.getParameter(ModuleInfo.KEY_MODULE_ID);
    }


    /**
    * @param {Grid} location
    * @return {ModuleInfo}
    */
    setLocation (location) {
        this.validateType(Grid, location);

        this.setParameter(ModuleInfo.KEY_LOCATION, location);
        return this;
    }

    /**
    * @return {Grid}
    */
    getLocation () {
        return this.getObject(Grid, ModuleInfo.KEY_LOCATION);
    }

    /**
    * @param {Grid} serviceArea
    * @return {ModuleInfo}
    */
    setServiceArea (serviceArea) {
        this.validateType(Grid, serviceArea);

        this.setParameter(ModuleInfo.KEY_SERVICE_AREA, serviceArea);
        return this;
    }

    /**
    * @return {Grid}
    */
    getServiceArea () {
        return this.getObject(Grid, ModuleInfo.KEY_SERVICE_AREA);
    }

    /**
    * @param {Boolean} allowMultipleAccess
    * @return {ModuleInfo}
    */
    setAllowMultipleAccess (allowMultipleAccess) {
        this.setParameter(ModuleInfo.KEY_ALLOW_MULTIPLE_ACCESS, allowMultipleAccess);
        return this;
    }

    /**
    * @return {Boolean}
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
