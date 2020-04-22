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

import { FunctionID } from '../enums/FunctionID.js';
import { RpcRequest } from '../RpcRequest.js';
import { SoftButton } from '../structs/SoftButton.js';
import { TTSChunk } from '../structs/TTSChunk.js';

class AlertManeuver extends RpcRequest {
    /**
     * Initalizes an instance of AlertManeuver.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.AlertManeuver);
    }

    /**
     * Set the TtsChunks
     * @param {TTSChunk[]} chunks - An array of text chunks of type TTSChunk. See TTSChunk - The desired TtsChunks.
     * @returns {AlertManeuver} - The class instance for method chaining.
     */
    setTtsChunks (chunks) {
        this._validateType(TTSChunk, chunks, true);
        this.setParameter(AlertManeuver.KEY_TTS_CHUNKS, chunks);
        return this;
    }

    /**
     * Get the TtsChunks
     * @returns {TTSChunk[]} - the KEY_TTS_CHUNKS value
     */
    getTtsChunks () {
        return this.getObject(TTSChunk, AlertManeuver.KEY_TTS_CHUNKS);
    }

    /**
     * Set the SoftButtons
     * @param {SoftButton[]} buttons - If omitted on supported displays, only the system defined "Close" SoftButton - The desired SoftButtons.
     * shall be displayed.
     * @returns {AlertManeuver} - The class instance for method chaining.
     */
    setSoftButtons (buttons) {
        this._validateType(SoftButton, buttons, true);
        this.setParameter(AlertManeuver.KEY_SOFT_BUTTONS, buttons);
        return this;
    }

    /**
     * Get the SoftButtons
     * @returns {SoftButton[]} - the KEY_SOFT_BUTTONS value
     */
    getSoftButtons () {
        return this.getObject(SoftButton, AlertManeuver.KEY_SOFT_BUTTONS);
    }
}

AlertManeuver.KEY_TTS_CHUNKS = 'ttsChunks';
AlertManeuver.KEY_SOFT_BUTTONS = 'softButtons';

export { AlertManeuver };