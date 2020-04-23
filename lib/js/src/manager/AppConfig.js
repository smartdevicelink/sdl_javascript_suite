/*
* Copyright (c) 2020, Livio, Inc.
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

import { Language } from '../rpc/enums/Language.js';
import { AppHMIType } from '../rpc/enums/AppHMIType.js';
import { Version } from '../util/Version.js';
import { LifecycleConfig } from './LifecycleConfig.js';

class AppConfig {
    /**
     * Stores information about an SDL application's configuration
     * @class
     */
    constructor () {
        this._lifecycleConfig = null;
    }

    /**
     * Set the LifecycleConfig instance.
     * @param {LifecycleConfig} lifecycleConfig - An instance of LifecycleConfig.
     * @returns {AppConfig} - A reference to this instance to support method chaining.
     */
    setLifecycleConfig (lifecycleConfig) {
        this._lifecycleConfig = lifecycleConfig;
        return this;
    }

    /**
     * Get the LifecycleConfig instance.
     * @returns {LifecycleConfig} - The LifecycleConfig.
     */
    getLifecycleConfig () {
        return this._lifecycleConfig;
    }
}

export { AppConfig };