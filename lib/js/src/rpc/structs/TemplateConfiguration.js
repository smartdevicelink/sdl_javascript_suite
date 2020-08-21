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
import { TemplateColorScheme } from './TemplateColorScheme.js';

class TemplateConfiguration extends RpcStruct {
    /**
     * Initalizes an instance of TemplateConfiguration.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the Template
     * @param {String} template - Predefined or dynamically created window template. Currently only predefined window template layouts are defined. - The desired Template.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {TemplateConfiguration} - The class instance for method chaining.
     */
    setTemplate (template) {
        this.setParameter(TemplateConfiguration.KEY_TEMPLATE, template);
        return this;
    }

    /**
     * Get the Template
     * @returns {String} - the KEY_TEMPLATE value
     */
    getTemplate () {
        return this.getParameter(TemplateConfiguration.KEY_TEMPLATE);
    }

    /**
     * Set the DayColorScheme
     * @param {TemplateColorScheme} scheme - A color scheme for all display layout templates. - The desired DayColorScheme.
     * @returns {TemplateConfiguration} - The class instance for method chaining.
     */
    setDayColorScheme (scheme) {
        this._validateType(TemplateColorScheme, scheme);
        this.setParameter(TemplateConfiguration.KEY_DAY_COLOR_SCHEME, scheme);
        return this;
    }

    /**
     * Get the DayColorScheme
     * @returns {TemplateColorScheme} - the KEY_DAY_COLOR_SCHEME value
     */
    getDayColorScheme () {
        return this.getObject(TemplateColorScheme, TemplateConfiguration.KEY_DAY_COLOR_SCHEME);
    }

    /**
     * Set the NightColorScheme
     * @param {TemplateColorScheme} scheme - A color scheme for all display layout templates. - The desired NightColorScheme.
     * @returns {TemplateConfiguration} - The class instance for method chaining.
     */
    setNightColorScheme (scheme) {
        this._validateType(TemplateColorScheme, scheme);
        this.setParameter(TemplateConfiguration.KEY_NIGHT_COLOR_SCHEME, scheme);
        return this;
    }

    /**
     * Get the NightColorScheme
     * @returns {TemplateColorScheme} - the KEY_NIGHT_COLOR_SCHEME value
     */
    getNightColorScheme () {
        return this.getObject(TemplateColorScheme, TemplateConfiguration.KEY_NIGHT_COLOR_SCHEME);
    }
}

TemplateConfiguration.KEY_TEMPLATE = 'template';
TemplateConfiguration.KEY_DAY_COLOR_SCHEME = 'dayColorScheme';
TemplateConfiguration.KEY_NIGHT_COLOR_SCHEME = 'nightColorScheme';

export { TemplateConfiguration };