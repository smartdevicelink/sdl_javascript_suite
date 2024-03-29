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

class VrHelpItem extends RpcStruct {
    /**
     * Initializes an instance of VrHelpItem.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 2.0.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Text
     * @param {String} text - Text to display for VR Help item - The desired Text.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {VrHelpItem} - The class instance for method chaining.
     */
    setText (text) {
        this.setParameter(VrHelpItem.KEY_TEXT, text);
        return this;
    }

    /**
     * Get the Text
     * @returns {String} - the KEY_TEXT value
     */
    getText () {
        return this.getParameter(VrHelpItem.KEY_TEXT);
    }

    /**
     * Set the Image
     * @param {Image} image - Image struct for VR Help item - The desired Image.
     * @returns {VrHelpItem} - The class instance for method chaining.
     */
    setImage (image) {
        this._validateType(Image, image);
        this.setParameter(VrHelpItem.KEY_IMAGE, image);
        return this;
    }

    /**
     * Get the Image
     * @returns {Image} - the KEY_IMAGE value
     */
    getImage () {
        return this.getObject(Image, VrHelpItem.KEY_IMAGE);
    }

    /**
     * Set the Position
     * @param {Number} position - Position to display item in VR Help list - The desired Position.
     * {'num_min_value': 1, 'num_max_value': 100}
     * @returns {VrHelpItem} - The class instance for method chaining.
     */
    setPosition (position) {
        this.setParameter(VrHelpItem.KEY_POSITION, position);
        return this;
    }

    /**
     * Get the Position
     * @returns {Number} - the KEY_POSITION value
     */
    getPosition () {
        return this.getParameter(VrHelpItem.KEY_POSITION);
    }
}

VrHelpItem.KEY_TEXT = 'text';
VrHelpItem.KEY_IMAGE = 'image';
VrHelpItem.KEY_POSITION = 'position';

export { VrHelpItem };