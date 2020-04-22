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

import { Image } from './Image.js';
import { RpcStruct } from '../RpcStruct.js';

class Turn extends RpcStruct {
    /**
     * Initalizes an instance of Turn.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the NavigationText
     * @param {String} text - Individual turn text. Must provide at least text or icon for a given turn. - The desired NavigationText.
     * @returns {Turn} - The class instance for method chaining.
     */
    setNavigationText (text) {
        this.setParameter(Turn.KEY_NAVIGATION_TEXT, text);
        return this;
    }

    /**
     * Get the NavigationText
     * @returns {String} - the KEY_NAVIGATION_TEXT value
     */
    getNavigationText () {
        return this.getParameter(Turn.KEY_NAVIGATION_TEXT);
    }

    /**
     * Set the TurnIcon
     * @param {Image} icon - Individual turn icon. Must provide at least text or icon for a given turn. - The desired TurnIcon.
     * @returns {Turn} - The class instance for method chaining.
     */
    setTurnIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(Turn.KEY_TURN_ICON, icon);
        return this;
    }

    /**
     * Get the TurnIcon
     * @returns {Image} - the KEY_TURN_ICON value
     */
    getTurnIcon () {
        return this.getObject(Image, Turn.KEY_TURN_ICON);
    }
}

Turn.KEY_NAVIGATION_TEXT = 'navigationText';
Turn.KEY_TURN_ICON = 'turnIcon';

export { Turn };