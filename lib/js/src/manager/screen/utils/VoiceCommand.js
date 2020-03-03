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

class VoiceCommand {
    /**
     * Initializes an instance of VoiceCommand.
     * NOTE: voiceCommands is poorly named. They are more like voice aliases, which map to a single voice command
     * @constructor
     * @param {String[]} voiceCommands
     * @param {function} voiceCommandSelectionListener
    */
    constructor (voiceCommands = [], voiceCommandSelectionListener = null) {
        // The strings the user can say to activate this voice command
        this._voiceCommands = voiceCommands;
        // The listener that will be called when the command is activated
        this._voiceCommandSelectionListener = voiceCommandSelectionListener;
        // Used Internally to identify the command
        this._commandId = null;
    }

    /**
     * The strings the user can say to activate this voice command
     * @param {String[]} voiceCommands - the list of commands to send to the head unit
     * @return {VoiceCommand}
    */
    setVoiceCommands (voiceCommands) {
        if (Array.isArray(voiceCommands)) {
            this._voiceCommands = voiceCommands;
        } else {
            console.error(new Error('setVoiceCommands argument is not an array'));
        }
        return this;
    }

    /**
     * The strings the user can say to activate this voice command
     * @return {String[]} - the List of voice commands
    */
    getVoiceCommands () {
        return this._voiceCommands;
    }

    /**
     * The listener that will be called when the command is activated
     * @param {function} voiceCommandSelectionListener - the listener for this object
     * @return {VoiceCommand}
    */
    setVoiceCommandSelectionListener (voiceCommandSelectionListener) {
        if (typeof voiceCommandSelectionListener === 'function') {
            this._voiceCommandSelectionListener = voiceCommandSelectionListener;
        } else {
            console.error(new Error('setVoiceCommandSelectionListener argument is not a function'));
        }
        return this;
    }

    /**
     * The listener that will be called when the command is activated
     * @return {function|null} - the listener for this object
    */
    getVoiceCommandSelectionListener () {
        return this._voiceCommandSelectionListener;
    }

    /**
     * the id used to identify the command
     * @param {Number} id - the id
     * @return {VoiceCommand}
    */
    setCommandId (id) {
        if (typeof id === 'number') {
            this._commandId = id;
        } else {
            console.error(new Error('setCommandId argument is not a number'));
        }
        return this;
    }

    /**
     * the id used to identify the command
     * @return {Number|null} - the id
    */
    getCommandId () {
        return this._commandId;
    }
}

export { VoiceCommand };
