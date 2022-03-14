/* eslint-disable camelcase */
/*
* Copyright (c) 2022, SmartDeviceLink Consortium, Inc.
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

import { ImageFieldName } from '../enums/ImageFieldName.js';
import { RpcStruct } from '../RpcStruct.js';

class DynamicUpdateCapabilities extends RpcStruct {
    /**
     * Initializes an instance of DynamicUpdateCapabilities.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 7.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the SupportedDynamicImageFieldNames
     * @param {ImageFieldName[]} names - An array of ImageFieldName values for which the system supports sending OnFileUpdate notifications. If you send an Image struct for that image field with a name without having uploaded the image data using PutFile that matches that name, the system will request that you upload the data with PutFile at a later point when the HMI needs it. The HMI will then display the image in the appropriate field. If not sent, assume false. - The desired SupportedDynamicImageFieldNames.
     * {'array_min_size': 1}
     * @returns {DynamicUpdateCapabilities} - The class instance for method chaining.
     */
    setSupportedDynamicImageFieldNames (names) {
        this._validateType(ImageFieldName, names, true);
        this.setParameter(DynamicUpdateCapabilities.KEY_SUPPORTED_DYNAMIC_IMAGE_FIELD_NAMES, names);
        return this;
    }

    /**
     * Get the SupportedDynamicImageFieldNames
     * @returns {ImageFieldName[]} - the KEY_SUPPORTED_DYNAMIC_IMAGE_FIELD_NAMES value
     */
    getSupportedDynamicImageFieldNames () {
        return this.getObject(ImageFieldName, DynamicUpdateCapabilities.KEY_SUPPORTED_DYNAMIC_IMAGE_FIELD_NAMES);
    }

    /**
     * Set the SupportsDynamicSubMenus
     * @param {Boolean} menus - If true, the head unit supports dynamic sub-menus by sending OnUpdateSubMenu notifications. If true, you should not send AddCommands that attach to a parentID for an AddSubMenu until OnUpdateSubMenu is received with the menuID. At that point, you should send all AddCommands with a parentID that match the menuID. If not set, assume false. - The desired SupportsDynamicSubMenus.
     * @returns {DynamicUpdateCapabilities} - The class instance for method chaining.
     */
    setSupportsDynamicSubMenus (menus) {
        this.setParameter(DynamicUpdateCapabilities.KEY_SUPPORTS_DYNAMIC_SUB_MENUS, menus);
        return this;
    }

    /**
     * Get the SupportsDynamicSubMenus
     * @returns {Boolean} - the KEY_SUPPORTS_DYNAMIC_SUB_MENUS value
     */
    getSupportsDynamicSubMenus () {
        return this.getParameter(DynamicUpdateCapabilities.KEY_SUPPORTS_DYNAMIC_SUB_MENUS);
    }
}

DynamicUpdateCapabilities.KEY_SUPPORTED_DYNAMIC_IMAGE_FIELD_NAMES = 'supportedDynamicImageFieldNames';
DynamicUpdateCapabilities.KEY_SUPPORTS_DYNAMIC_SUB_MENUS = 'supportsDynamicSubMenus';

export { DynamicUpdateCapabilities };