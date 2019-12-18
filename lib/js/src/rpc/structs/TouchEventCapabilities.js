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

class TouchEventCapabilities extends RpcStruct {
    constructor(parameters) {
        super(parameters);
    }


    /**
    * @param {Boolean} pressAvailable
    * @return {TouchEventCapabilities}
    */
    setPressAvailable(pressAvailable) {
        this.setParameter(TouchEventCapabilities.KEY_PRESS_AVAILABLE, pressAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getPressAvailable() {
        return this.getParameter(TouchEventCapabilities.KEY_PRESS_AVAILABLE);
    }

    /**
    * @param {Boolean} multiTouchAvailable
    * @return {TouchEventCapabilities}
    */
    setMultiTouchAvailable(multiTouchAvailable) {
        this.setParameter(TouchEventCapabilities.KEY_MULTI_TOUCH_AVAILABLE, multiTouchAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getMultiTouchAvailable() {
        return this.getParameter(TouchEventCapabilities.KEY_MULTI_TOUCH_AVAILABLE);
    }



    /**
    * @param {Boolean} doublePressAvailable
    * @return {TouchEventCapabilities}
    */
    setDoublePressAvailable(doublePressAvailable) {
        this.setParameter(TouchEventCapabilities.KEY_DOUBLE_PRESS_AVAILABLE, doublePressAvailable);
        return this;
    }

    /**
    * @return {Boolean}
    */
    getDoublePressAvailable() {
        return this.getParameter(TouchEventCapabilities.KEY_DOUBLE_PRESS_AVAILABLE);
    }
}

TouchEventCapabilities.KEY_PRESS_AVAILABLE = 'pressAvailable';
TouchEventCapabilities.KEY_MULTI_TOUCH_AVAILABLE = 'multiTouchAvailable';
TouchEventCapabilities.KEY_DOUBLE_PRESS_AVAILABLE = 'doublePressAvailable';

export { TouchEventCapabilities };
