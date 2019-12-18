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
import { RGBColor } from './RGBColor.js';

class TemplateColorScheme extends RpcStruct {
    constructor(parameters) {
        super(parameters);
    }

    /**
    * @param {RGBColor} primaryColor
    * @return {TemplateColorScheme}
    */
    setPrimaryColor(primaryColor) {
        this.validateType(RGBColor, primaryColor);

        this.setParameter(TemplateColorScheme.KEY_PRIMARY_COLOR, primaryColor);
        return this;
    }

    /**
    * @return {RGBColor}
    */
    getPrimaryColor() {
        return this.getObject(RGBColor, TemplateColorScheme.KEY_PRIMARY_COLOR);
    }

    /**
    * @param {RGBColor} secondaryColor
    * @return {TemplateColorScheme}
    */
    setSecondaryColor(secondaryColor) {
        this.validateType(RGBColor, secondaryColor);

        this.setParameter(TemplateColorScheme.KEY_SECONDARY_COLOR, secondaryColor);
        return this;
    }

    /**
    * @return {RGBColor}
    */
    getSecondaryColor() {
        return this.getObject(RGBColor, TemplateColorScheme.KEY_SECONDARY_COLOR);
    }

    /**
    * @param {RGBColor} backgroundColor
    * @return {TemplateColorScheme}
    */
    setBackgroundColor(backgroundColor) {
        this.validateType(RGBColor, backgroundColor);

        this.setParameter(TemplateColorScheme.KEY_BACKGROUND_COLOR, backgroundColor);
        return this;
    }

    /**
    * @return {RGBColor}
    */
    getBackgroundColor() {
        return this.getObject(RGBColor, TemplateColorScheme.KEY_BACKGROUND_COLOR);
    }
}

TemplateColorScheme.KEY_PRIMARY_COLOR = 'primaryColor';
TemplateColorScheme.KEY_SECONDARY_COLOR = 'secondaryColor';
TemplateColorScheme.KEY_BACKGROUND_COLOR = 'backgroundColor';

export { TemplateColorScheme };
