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

import { _SubManagerBase } from '../_SubManagerBase.js';
import { _SoftButtonManager } from './_SoftButtonManager.js';
import { _TextAndGraphicManager } from './_TextAndGraphicManager.js';
import { _VoiceCommandManager } from './_VoiceCommandManager.js';
import { _SubscribeButtonManager } from './_SubscribeButtonManager';

class _ScreenManagerBase extends _SubManagerBase {
    /**
     * Initalizes an instance of _ScreenManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {FileManager} fileManager - An instance of FileManager.
     */
    constructor (lifecycleManager, fileManager = null) {
        super(lifecycleManager);

        this._fileManager = fileManager;
        if (this._fileManager !== null) {
            this._softButtonManager = new _SoftButtonManager(lifecycleManager, this._fileManager);
            this._textAndGraphicManager = new _TextAndGraphicManager(lifecycleManager, this._fileManager, this._softButtonManager);
        }
        this._voiceCommandManager = new _VoiceCommandManager(lifecycleManager);
        this._subscribeButtonManager = new _SubscribeButtonManager(lifecycleManager);
    }

    /**
     * Start the manager.
     * @returns {Promise} - A promise.
     */
    async start () {
        await Promise.all([
            this._softButtonManager.start(),
            this._textAndGraphicManager.start(),
            this._voiceCommandManager.start(),
            this._subscribeButtonManager.start(),
        ]);
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Called when manager is being torn down
     */
    dispose () {
        this._softButtonManager.dispose();
        this._textAndGraphicManager.dispose();
        this._voiceCommandManager.dispose();
        this._subscribeButtonManager.dispose();
        super.dispose();
    }

    /**
     * Set the textField1 on the head unit screen. Sending an empty String "" will clear the field
     * @param {String} textField1 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField1 (textField1) {
        this._softButtonManager.setCurrentMainField1(textField1);
        this._textAndGraphicManager.setTextField1(textField1);
        return this;
    }

    /**
     * Get the current textField1 value
     * @returns {String} - value represents the current textField1 value
     */
    getTextField1 () {
        return this._textAndGraphicManager.getTextField1();
    }

    /**
     * Set the textField2 on the head unit screen. Sending an empty String "" will clear the field
     * @param {String} textField2 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField2 (textField2) {
        this._textAndGraphicManager.setTextField2(textField2);
        return this;
    }

    /**
     * Get the current textField2 value
     * @returns {String} - value represents the current textField2 value
     */
    getTextField2 () {
        return this._textAndGraphicManager.getTextField2();
    }

    /**
     * Set the textField3 on the head unit screen. Sending an empty String "" will clear the field
     * @param {String} textField3 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField3 (textField3) {
        this._textAndGraphicManager.setTextField3(textField3);
        return this;
    }

    /**
     * Get the current textField3 value
     * @returns {String} - value represents the current textField3 value
     */
    getTextField3 () {
        return this._textAndGraphicManager.getTextField3();
    }

    /**
     * Set the textField4 on the head unit screen. Sending an empty String "" will clear the field
     * @param {String} textField4 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField4 (textField4) {
        this._textAndGraphicManager.setTextField4(textField4);
        return this;
    }

    /**
     * Get the current textField4 value
     * @returns {String} - value represents the current textField4 value
     */
    getTextField4 () {
        return this._textAndGraphicManager.getTextField4();
    }

    /**
     * Set the mediaTrackTextField on the head unit screen
     * @param {String} mediaTrackTextField - value represents the mediaTrackTextField
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setMediaTrackTextField (mediaTrackTextField) {
        this._textAndGraphicManager.setMediaTrackTextField(mediaTrackTextField);
        return this;
    }

    /**
     * Get the current mediaTrackTextField value
     * @returns {String} - value represents the current mediaTrackTextField
     */
    getMediaTrackTextField () {
        return this._textAndGraphicManager.getMediaTrackTextField();
    }

    /**
     * Set the primaryGraphic on the head unit screen
     * @param {SdlArtwork} primaryGraphic - an SdlArtwork object represents the primaryGraphic
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setPrimaryGraphic (primaryGraphic) {
        if (primaryGraphic === null) {
            primaryGraphic = this._textAndGraphicManager._getBlankArtwork();
        }
        this._textAndGraphicManager.setPrimaryGraphic(primaryGraphic);
        return this;
    }

    /**
     * Get the current primaryGraphic value
     * @returns {SdlArtwork} - object represents the current primaryGraphic
     */
    getPrimaryGraphic () {
        return this._textAndGraphicManager.getPrimaryGraphic();
    }

    /**
     * Set the secondaryGraphic on the head unit screen
     * @param {SdlArtwork} secondaryGraphic - an SdlArtwork object represents the secondaryGraphic
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setSecondaryGraphic (secondaryGraphic) {
        if (secondaryGraphic === null) {
            secondaryGraphic = this._textAndGraphicManager._getBlankArtwork();
        }
        this._textAndGraphicManager.setSecondaryGraphic(secondaryGraphic);
        return this;
    }

    /**
     * Get the current secondaryGraphic value
     * @returns {SdlArtwork} - object represents the current secondaryGraphic
     */
    getSecondaryGraphic () {
        return this._textAndGraphicManager.getSecondaryGraphic();
    }

    /**
     * Set the alignment for the text fields
     * @param {TextAlignment} textAlignment - TextAlignment value represents the alignment for the text fields
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextAlignment (textAlignment) {
        this._textAndGraphicManager.setTextAlignment(textAlignment);
        return this;
    }

    /**
     * Get the alignment for the text fields
     * @returns {TextAlignment} - value represents the alignment for the text fields
     */
    getTextAlignment () {
        return this._textAndGraphicManager.getTextAlignment();
    }

    /**
     * Set the metadata type for the textField1
     * @param {MetadataType} textField1Type - a MetadataType value represents the metadata for textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField1Type (textField1Type) {
        this._textAndGraphicManager.setTextField1Type(textField1Type);
        return this;
    }

    /**
     * Get the metadata type for textField1
     * @returns {MetadataType} - value represents the metadata for textField1
     */
    getTextField1Type () {
        return this._textAndGraphicManager.getTextField1Type();
    }

    /**
     * Set the metadata type for the textField2
     * @param {MetadataType} textField2Type - a MetadataType value represents the metadata for textField2
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField2Type (textField2Type) {
        this._textAndGraphicManager.setTextField2Type(textField2Type);
        return this;
    }

    /**
     * Get the metadata type for textField2
     * @returns {MetadataType} - value represents the metadata for textField2
     */
    getTextField2Type () {
        return this._textAndGraphicManager.getTextField2Type();
    }

    /**
     * Set the metadata type for the textField3
     * @param {MetadataType} textField3Type - a MetadataType value represents the metadata for textField3
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField3Type (textField3Type) {
        this._textAndGraphicManager.setTextField3Type(textField3Type);
        return this;
    }

    /**
     * Get the metadata type for textField3
     * @returns {MetadataType} - value represents the metadata for textField3
     */
    getTextField3Type () {
        return this._textAndGraphicManager.getTextField3Type();
    }

    /**
     * Set the metadata type for the textField4
     * @param {MetadataType} textField4Type - a MetadataType value represents the metadata for textField4
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField4Type (textField4Type) {
        this._textAndGraphicManager.setTextField4Type(textField4Type);
        return this;
    }

    /**
     * Get the metadata type for textField4
     * @returns {MetadataType} - value represents the metadata for textField4
     */
    getTextField4Type () {
        return this._textAndGraphicManager.getTextField4Type();
    }

    /**
     * Sets the title of the new template that will be displayed.
     * Sending an empty String "" will clear the field
     * @param {String} title - the title of the new template that will be displayed. Maxlength: 100.
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTitle (title) {
        this._textAndGraphicManager.setTitle(title);
        return this;
    }

    /**
     * Gets the title of the new template that will be displayed
     * @returns {String} - String value that represents the title of the new template that will be displayed
     */
    getTitle () {
        return this._textAndGraphicManager.getTitle();
    }

    /**
     * Set softButtonObjects list and upload the images to the head unit
     * @param {SoftButtonObject[]} softButtonObjects - the list of the SoftButtonObject values that should be displayed on the head unit
     * @returns {Promise} - returns _ScreenManagerBase when finished
     */
    async setSoftButtonObjects (softButtonObjects) {
        await this._softButtonManager.setSoftButtonObjects(softButtonObjects);
        return this;
    }

    /**
     * Get the soft button objects list
     * @returns {SoftButtonObject[]} - An array of SoftButtonObject instances.
     */
    getSoftButtonObjects () {
        return this._softButtonManager.getSoftButtonObjects();
    }

    /**
     * Get the SoftButtonObject that has the provided name
     * @param {String} name - a String value that represents the name
     * @returns {SoftButtonObject} - A SoftButtonObject instance.
     */
    getSoftButtonObjectByName (name) {
        return this._softButtonManager.getSoftButtonObjectByName(name);
    }

    /**
     * Get the SoftButtonObject that has the provided buttonId
     * @private
     * @param {Number} buttonId - a int value that represents the id of the button
     * @returns {SoftButtonObject} - A SoftButtonObject instance.
     */
    _getSoftButtonObjectById (buttonId) {
        return this._softButtonManager._getSoftButtonObjectById(buttonId);
    }

    /**
     * Get the currently set voice commands
     * @returns {VoiceCommand[]} - a List of Voice Command objects
     */
    getVoiceCommands () {
        return this._voiceCommandManager.getVoiceCommands();
    }

    /**
     * Set voice commands
     * @param {VoiceCommand[]} voiceCommands - the voice commands to be sent to the head unit
     * @returns {Promise} - A promise.
     */
    async setVoiceCommands (voiceCommands) {
        return this._voiceCommandManager.setVoiceCommands(voiceCommands);
    }

    /**
     * Begin a multiple updates transaction. The updates will be applied when commit() is called. Note: if we don't use beginTransaction & commit, every update will be sent individually.
     */
    beginTransaction () {
        this._softButtonManager.setBatchUpdates(true);
        this._textAndGraphicManager.setBatchUpdates(true);
    }

    /**
     * Send the updates that were started after beginning the transaction
     * @returns {Promise} - Resolves to Boolean: whether the commit is a success
     */
    async commit () {
        this._softButtonManager.setBatchUpdates(false);
        this._textAndGraphicManager.setBatchUpdates(false);
        // order matters!
        const success1 = await this._softButtonManager.update();
        const success2 = await this._textAndGraphicManager.update();

        return success1 && success2;
    }

    /**
     * Removes a listener from the list of listeners and unsubscribes to the button if it was the last listener.
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - The listener to be removed
     * @returns {Promise} - returns _ScreenManagerBase when finished
     */
    async addButtonListener (buttonName, listener) {
        await this._subscribeButtonManager._addButtonListener(buttonName, listener);
        return this;
    }

    /**
     * Removes a listener from the list of listeners and unsubscribes to the button if it was the last listener.
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - The listener to be removed
     * @returns {Promise} - returns _ScreenManagerBase when finished
     */
    async removeButtonListener (buttonName, listener) {
        await this._subscribeButtonManager._removeButtonListener(buttonName, listener);
        return this;
    }
}

export { _ScreenManagerBase };