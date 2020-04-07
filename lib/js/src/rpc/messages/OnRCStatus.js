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
import { ModuleData } from '../structs/ModuleData.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * Issued by SDL to notify the application about remote control status change on SDL
 */
class OnRCStatus extends RpcNotification {
    /**
     * Initalizes an instance of OnRCStatus.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnRCStatus);
    }

    /**
     * Set the Allowed
     * @param {Boolean} allowed - If "true" - RC is allowed; if "false" - RC is disallowed. - The desired Allowed.
     * @returns {OnRCStatus} - The class instance for method chaining.
     */
    setAllowed (allowed) {
        this.setParameter(OnRCStatus.KEY_ALLOWED, allowed);
        return this;
    }

    /**
     * Get the Allowed
     * @returns {Boolean} - the KEY_ALLOWED value
     */
    getAllowed () {
        return this.getParameter(OnRCStatus.KEY_ALLOWED);
    }

    /**
     * Set the AllocatedModules
     * @param {ModuleData[]} modules - Contains a list (zero or more) of module types that are allocated to the - The desired AllocatedModules.
     * application.
     * @returns {OnRCStatus} - The class instance for method chaining.
     */
    setAllocatedModules (modules) {
        this.validateType(ModuleData, modules, true);
        this.setParameter(OnRCStatus.KEY_ALLOCATED_MODULES, modules);
        return this;
    }

    /**
     * Get the AllocatedModules
     * @returns {ModuleData[]} - the KEY_ALLOCATED_MODULES value
     */
    getAllocatedModules () {
        return this.getObject(ModuleData, OnRCStatus.KEY_ALLOCATED_MODULES);
    }

    /**
     * Set the FreeModules
     * @param {ModuleData[]} modules - Contains a list (zero or more) of module types that are free to access for the - The desired FreeModules.
     * application.
     * @returns {OnRCStatus} - The class instance for method chaining.
     */
    setFreeModules (modules) {
        this.validateType(ModuleData, modules, true);
        this.setParameter(OnRCStatus.KEY_FREE_MODULES, modules);
        return this;
    }

    /**
     * Get the FreeModules
     * @returns {ModuleData[]} - the KEY_FREE_MODULES value
     */
    getFreeModules () {
        return this.getObject(ModuleData, OnRCStatus.KEY_FREE_MODULES);
    }
}

OnRCStatus.KEY_ALLOWED = 'allowed';
OnRCStatus.KEY_ALLOCATED_MODULES = 'allocatedModules';
OnRCStatus.KEY_FREE_MODULES = 'freeModules';

export { OnRCStatus };