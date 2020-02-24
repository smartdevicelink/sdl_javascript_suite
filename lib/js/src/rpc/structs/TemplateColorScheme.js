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

import { RGBColor } from './RGBColor.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * A color scheme for all display layout templates.
 */
class TemplateColorScheme extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {RGBColor} color - The primary "accent" color
     * @return {TemplateColorScheme}
     */
    setPrimaryColor (color) {
        this.validateType(RGBColor, color);
        this.setParameter(TemplateColorScheme.KEY_PRIMARY_COLOR, color);
        return this;
    }

    /**
     * @return {RGBColor}
     */
    getPrimaryColor () {
        return this.getObject(RGBColor, TemplateColorScheme.KEY_PRIMARY_COLOR);
    }

    /**
     * @param {RGBColor} color - The secondary "accent" color
     * @return {TemplateColorScheme}
     */
    setSecondaryColor (color) {
        this.validateType(RGBColor, color);
        this.setParameter(TemplateColorScheme.KEY_SECONDARY_COLOR, color);
        return this;
    }

    /**
     * @return {RGBColor}
     */
    getSecondaryColor () {
        return this.getObject(RGBColor, TemplateColorScheme.KEY_SECONDARY_COLOR);
    }

    /**
     * @param {RGBColor} color - The color of the background
     * @return {TemplateColorScheme}
     */
    setBackgroundColor (color) {
        this.validateType(RGBColor, color);
        this.setParameter(TemplateColorScheme.KEY_BACKGROUND_COLOR, color);
        return this;
    }

    /**
     * @return {RGBColor}
     */
    getBackgroundColor () {
        return this.getObject(RGBColor, TemplateColorScheme.KEY_BACKGROUND_COLOR);
    }
}

TemplateColorScheme.KEY_PRIMARY_COLOR = 'primaryColor';
TemplateColorScheme.KEY_SECONDARY_COLOR = 'secondaryColor';
TemplateColorScheme.KEY_BACKGROUND_COLOR = 'backgroundColor';

export { TemplateColorScheme };