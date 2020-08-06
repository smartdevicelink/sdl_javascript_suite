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

import { RpcStruct } from '../RpcStruct.js';

class DriverDistractionCapability extends RpcStruct {
    /**
     * Initalizes an instance of DriverDistractionCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the MenuLength
     * @param {Number} length - The number of items allowed in a Choice Set or Command menu while the driver is - The desired MenuLength.
     * distracted
     * @returns {DriverDistractionCapability} - The class instance for method chaining.
     */
    setMenuLength (length) {
        this.setParameter(DriverDistractionCapability.KEY_MENU_LENGTH, length);
        return this;
    }

    /**
     * Get the MenuLength
     * @returns {Number} - the KEY_MENU_LENGTH value
     */
    getMenuLength () {
        return this.getParameter(DriverDistractionCapability.KEY_MENU_LENGTH);
    }

    /**
     * Set the SubMenuDepth
     * @param {Number} depth - The depth of submenus allowed when the driver is distracted. e.g. 3 == top level menu -> - The desired SubMenuDepth.
     * submenu -> submenu; 1 == top level menu only
     * @returns {DriverDistractionCapability} - The class instance for method chaining.
     */
    setSubMenuDepth (depth) {
        this.setParameter(DriverDistractionCapability.KEY_SUB_MENU_DEPTH, depth);
        return this;
    }

    /**
     * Get the SubMenuDepth
     * @returns {Number} - the KEY_SUB_MENU_DEPTH value
     */
    getSubMenuDepth () {
        return this.getParameter(DriverDistractionCapability.KEY_SUB_MENU_DEPTH);
    }
}

DriverDistractionCapability.KEY_MENU_LENGTH = 'menuLength';
DriverDistractionCapability.KEY_SUB_MENU_DEPTH = 'subMenuDepth';

export { DriverDistractionCapability };