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
import { SoftButtonType } from '../enums/SoftButtonType.js';
import { SystemAction } from '../enums/SystemAction.js';
import { Image } from './Image.js';


class SoftButton extends RpcStruct {
    constructor (parameters) {
        super(parameters);
    }

    /**
    * @param {SoftButtonType} type
    * @return {SoftButton}
    */
    setType (type) {
        this.validateType(SoftButtonType, type);

        this.setParameter(SoftButton.KEY_TYPE, type);
        return this;
    }

    /**
    * @return {SoftButtonType}
    */
    getType () {
        return this.getObject(SoftButtonType, SoftButton.KEY_TYPE);
    }

    /**
    * @param {String} text
    * @return {SoftButton}
    */
    setText (text) {
        this.setParameter(SoftButton.KEY_TEXT, text);
        return this;
    }

    /**
    * @return {String}
    */
    getText () {
        return this.getParameter(SoftButton.KEY_TEXT);
    }

    /**
    * @param {Image} image
    * @return {SoftButton}
    */
    setImage (image) {
        this.validateType(Image, image);

        this.setParameter(SoftButton.KEY_IMAGE, image);
        return this;
    }

    /**
    * @return {Image}
    */
    getImage () {
        return this.getObject(Image, SoftButton.KEY_IMAGE);
    }

    /**
    * @param {Boolean} isHighlighted
    * @return {SoftButton}
    */
    setIsHighlighted (isHighlighted) {
        this.setParameter(SoftButton.KEY_IS_HIGHLIGHTED, isHighlighted);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getIsHighlighted () {
        return this.getParameter(SoftButton.KEY_IS_HIGHLIGHTED);
    }

    /**
    * @param {Number} softButtonID
    * @return {SoftButton}
    */
    setSoftButtonID (softButtonID) {
        this.setParameter(SoftButton.KEY_SOFT_BUTTON_ID, softButtonID);
        return this;
    }

    /**
    * @return {Number}
    */
    getSoftButtonID () {
        return this.getParameter(SoftButton.KEY_SOFT_BUTTON_ID);
    }


    /**
    * @param {SystemAction} systemAction
    * @return {SoftButton}
    */
    setSystemAction (systemAction) {
        this.validateType(SystemAction, systemAction);

        this.setParameter(SoftButton.KEY_SYSTEM_ACTION, systemAction);
        return this;
    }

    /**
    * @return {SystemAction}
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
