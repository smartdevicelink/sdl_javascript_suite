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

import { Image } from './Image.js';
import { RpcStruct } from '../RpcStruct.js';
import { SoftButtonType } from '../enums/SoftButtonType.js';
import { SystemAction } from '../enums/SystemAction.js';

class SoftButton extends RpcStruct {
    /**
     * Initializes an instance of SoftButton.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Type
     * @param {SoftButtonType} type - Describes, whether it is text, highlighted text, icon, or dynamic image. See softButtonType - The desired Type.
     * @returns {SoftButton} - The class instance for method chaining.
     */
    setType (type) {
        this._validateType(SoftButtonType, type);
        this.setParameter(SoftButton.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {SoftButtonType} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(SoftButtonType, SoftButton.KEY_TYPE);
    }

    /**
     * Set the Text
     * @param {String} text - Optional text to display (if defined as TEXT or BOTH) - The desired Text.
     * {'string_min_length': 0, 'string_max_length': 500}
     * @returns {SoftButton} - The class instance for method chaining.
     */
    setText (text) {
        this.setParameter(SoftButton.KEY_TEXT, text);
        return this;
    }

    /**
     * Get the Text
     * @returns {String} - the KEY_TEXT value
     */
    getText () {
        return this.getParameter(SoftButton.KEY_TEXT);
    }

    /**
     * Set the Image
     * @param {Image} image - Optional image struct for SoftButton (if defined as IMAGE or BOTH) - The desired Image.
     * @returns {SoftButton} - The class instance for method chaining.
     */
    setImage (image) {
        this._validateType(Image, image);
        this.setParameter(SoftButton.KEY_IMAGE, image);
        return this;
    }

    /**
     * Get the Image
     * @returns {Image} - the KEY_IMAGE value
     */
    getImage () {
        return this.getObject(Image, SoftButton.KEY_IMAGE);
    }

    /**
     * Set the IsHighlighted
     * @param {Boolean} highlighted - True, if highlighted False, if not highlighted - The desired IsHighlighted.
     * {'default_value': False}
     * @returns {SoftButton} - The class instance for method chaining.
     */
    setIsHighlighted (highlighted) {
        this.setParameter(SoftButton.KEY_IS_HIGHLIGHTED, highlighted);
        return this;
    }

    /**
     * Get the IsHighlighted
     * @returns {Boolean} - the KEY_IS_HIGHLIGHTED value
     */
    getIsHighlighted () {
        return this.getParameter(SoftButton.KEY_IS_HIGHLIGHTED);
    }

    /**
     * Set the SoftButtonID
     * @param {Number} id - Value which is returned via OnButtonPress / OnButtonEvent - The desired SoftButtonID.
     * {'num_min_value': 0, 'num_max_value': 65535}
     * @returns {SoftButton} - The class instance for method chaining.
     */
    setSoftButtonID (id) {
        this.setParameter(SoftButton.KEY_SOFT_BUTTON_ID, id);
        return this;
    }

    /**
     * Get the SoftButtonID
     * @returns {Number} - the KEY_SOFT_BUTTON_ID value
     */
    getSoftButtonID () {
        return this.getParameter(SoftButton.KEY_SOFT_BUTTON_ID);
    }

    /**
     * Set the SystemAction
     * @param {SystemAction} action - Parameter indicating whether selecting a SoftButton shall call a specific system action. This is intended to allow Notifications to bring the callee into full / focus; or in the case of persistent overlays, the overlay can persist when a SoftButton is pressed. - The desired SystemAction.
     * {'default_value': 'DEFAULT_ACTION'}
     * @returns {SoftButton} - The class instance for method chaining.
     */
    setSystemAction (action) {
        this._validateType(SystemAction, action);
        this.setParameter(SoftButton.KEY_SYSTEM_ACTION, action);
        return this;
    }

    /**
     * Get the SystemAction
     * @returns {SystemAction} - the KEY_SYSTEM_ACTION value
     */
    getSystemAction () {
        return this.getObject(SystemAction, SoftButton.KEY_SYSTEM_ACTION);
    }
}

SoftButton.KEY_TYPE = 'type';
SoftButton.KEY_TEXT = 'text';
SoftButton.KEY_IMAGE = 'image';
SoftButton.KEY_IS_HIGHLIGHTED = 'isHighlighted';
SoftButton.KEY_SOFT_BUTTON_ID = 'softButtonID';
SoftButton.KEY_SYSTEM_ACTION = 'systemAction';

export { SoftButton };