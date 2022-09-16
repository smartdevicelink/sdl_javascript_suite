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
import { _TextAndGraphicUpdateOperation } from './_TextAndGraphicUpdateOperation.js';
import { _TextAndGraphicState } from './_TextAndGraphicState.js';

class _TextAndGraphicManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _TextAndGraphicManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {_SoftButtonManager} softButtonManager - An instance of _SoftButtonManager.
     */
    constructor (lifecycleManager, fileManager = null, softButtonManager = null) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._softButtonManager = softButtonManager;
        this._batchingUpdates = false; // whether to wait on sending the updates
        this._blankArtwork = null;
        this._currentScreenData = new _TextAndGraphicState();

        this._primaryGraphic = null;
        this._secondaryGraphic = null;
        this._textAlignment = null;
        this._textField1 = null;
        this._textField2 = null;
        this._textField3 = null;
        this._textField4 = null;
        this._mediaTrackTextField = null;
        this._title = null;
        this._textField1Type = null;
        this._textField2Type = null;
        this._textField3Type = null;
        this._textField4Type = null;
        this._isDirty = false;
        this._updateOperation = null;
        this._currentOperationListener = null;
        this._templateConfiguration = null;

        this._handleDisplayCapabilityUpdates();
        this._handleTaskQueue();
        this._getBlankArtwork();
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Teardown method
     */
    dispose () {
        // remove listeners
        this._batchingUpdates = false;
        this._blankArtwork = null;
        this._currentScreenData = new _TextAndGraphicState();

        this._primaryGraphic = null;
        this._secondaryGraphic = null;
        this._textAlignment = null;
        this._textField1 = null;
        this._textField2 = null;
        this._textField3 = null;
        this._textField4 = null;
        this._mediaTrackTextField = null;
        this._title = null;
        this._textField1Type = null;
        this._textField2Type = null;
        this._textField3Type = null;
        this._textField4Type = null;
        this._isDirty = false;
        this._updateOperation = null;
        this._currentOperationListener = null;

        this._handleDisplayCapabilityUpdates();
        this._handleTaskQueue();
    }

    /**
     * Conditionally applies a Show update based on what has been set in the internal state
     * @returns {Promise} - Resolves to Boolean: whether the update is successful
     */
    async update () {
        return new Promise((resolve, reject) => {
            // don't continue if the manager is in batch mode
            if (this._batchingUpdates) {
                resolve(false);
            }
            if (this._isDirty) {
                this._sdlUpdate(true, resolve);
            } else {
                resolve(true);
            }
        });
    }

    /**
     * Determines what needs to be done to send a valid Show method
     * @private
     * @param {Boolean} supersedePreviousOperations - Whether this update should have priority over previous updates
     * @param {function} listener - A function to invoke when the update task is complete once it runs
     */
    _sdlUpdate (supersedePreviousOperations, listener) {
        this._currentOperationListener = listener;

        const currentScreenDataUpdateListener = (asyncListener) => {
            asyncListener().then((newScreenData) => {
                if (newScreenData !== null) {
                    this._currentScreenData = newScreenData;
                    this._updatePendingOperationsWithNewScreenData();
                }
            }).catch((errorState) => {
                this._updatePendingOperationsWithFailedScreenState(errorState);
            });
        };

        this._updateOperation = new _TextAndGraphicUpdateOperation(this._lifecycleManager, this._fileManager, this._defaultMainWindowCapability,
            this._currentScreenData, this._currentState(), this._currentOperationListener, currentScreenDataUpdateListener.bind(this));
        this._addTask(this._updateOperation);
    }

    /**
     * Resets all properties to the values of the currentScreenData
     * @private
     */
    _resetFieldsToCurrentScreenData () {
        this._textField1 = this._currentScreenData.getTextField1();
        this._textField2 = this._currentScreenData.getTextField2();
        this._textField3 = this._currentScreenData.getTextField3();
        this._textField4 = this._currentScreenData.getTextField4();
        this._mediaTrackTextField = this._currentScreenData.getMediaTrackTextField();
        this._title = this._currentScreenData.getTitle();
        this._textAlignment = this._currentScreenData.getTextAlignment();
        this._textField1Type = this._currentScreenData.getTextField1Type();
        this._textField2Type = this._currentScreenData.getTextField2Type();
        this._textField3Type = this._currentScreenData.getTextField3Type();
        this._textField4Type = this._currentScreenData.getTextField4Type();
        this._primaryGraphic = this._currentScreenData.getPrimaryGraphic();
        this._secondaryGraphic = this._currentScreenData.getSecondaryGraphic();
        this._templateConfiguration = this._currentScreenData.getTemplateConfiguration();
    }

    /**
     * Updates all pending tasks in the queue with the failed screen state
     * @param {_TextAndGraphicState} errorState - The _TextAndGraphicState when the error occured
     * @private
     */
    _updatePendingOperationsWithFailedScreenState (errorState) {
        for (const task of this._getTasks()) {
            if (!(task instanceof _TextAndGraphicUpdateOperation)) {
                continue;
            }
            if (errorState instanceof _TextAndGraphicState) { // check if a _TextAndGraphicState was passed in instead of an error object
                task._updateTargetStateWithErrorState(errorState);
            }
        }
    }

    /**
     * Updates all pending tasks in the queue with the current screen data
     */
    _updatePendingOperationsWithNewScreenData () {
        for (const task of this._getTasks()) {
            if (!(task instanceof _TextAndGraphicUpdateOperation)) {
                continue;
            }
            task._setCurrentScreenData(this._currentScreenData);
        }
        if (this._softButtonManager !== null && this._currentScreenData.getTextField1() !== null) {
            this._softButtonManager.setCurrentMainField1(this._currentScreenData.getTextField1());
        }
    }

    /**
     * Abstract method for getting blank artwork
     * @abstract
     * @private
     * @returns {SdlArtwork} - An instance of SdlArtwork.
     */
    _getBlankArtwork () {
        throw new Error('_getBlankArtwork method must be overridden');
    }

    /**
     * Gets the updated state of the manager
     * @private
     * @returns {_TextAndGraphicState} - The updated state of the manager
     */
    _currentState () {
        return new _TextAndGraphicState(this._textField1, this._textField2, this._textField3, this._textField4,
            this._mediaTrackTextField, this._title, this._primaryGraphic, this._secondaryGraphic, this._textAlignment,
            this._textField1Type, this._textField2Type, this._textField3Type, this._textField4Type, this._templateConfiguration);
    }

    // SCREEN ITEM SETTERS AND GETTERS

    /**
     * Set the text alignment.
     * @param {TextAlignment} textAlignment - A TextAlignment enum value.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextAlignment (textAlignment) {
        this._textAlignment = textAlignment;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get the text alignment.
     * @returns {TextAlignment} - A TextAlignment enum value.
     */
    getTextAlignment () {
        return this._textAlignment;
    }

    /**
     * Set the Media Track Next Field.
     * @param {String} mediaTrackTextField - A string to set the field to.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setMediaTrackTextField (mediaTrackTextField) {
        this._mediaTrackTextField = mediaTrackTextField;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get the Media Track Next Field.
     * @returns {String} - A string of the field's text.
     */
    getMediaTrackTextField () {
        return this._mediaTrackTextField;
    }

    /**
     * Set textField1.
     * @param {String} textField1 - A string to put in the field.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField1 (textField1) {
        this._textField1 = textField1;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField1.
     * @returns {String} - The field's contents.
     */
    getTextField1 () {
        return this._textField1;
    }

    /**
     * Set textField2.
     * @param {String} textField2 - The field's contents.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField2 (textField2) {
        this._textField2 = textField2;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField2.
     * @returns {String} - The field's contents.
     */
    getTextField2 () {
        return this._textField2;
    }

    /**
     * Set textField3.
     * @param {String} textField3 - The field's contents.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField3 (textField3) {
        this._textField3 = textField3;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField3.
     * @returns {String} - The field's contents.
     */
    getTextField3 () {
        return this._textField3;
    }

    /**
     * Set textField4.
     * @param {String} textField4 - The field's contents.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField4 (textField4) {
        this._textField4 = textField4;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField4.
     * @returns {String} - The field's contents.
     */
    getTextField4 () {
        return this._textField4;
    }

    /**
     * Set textField1's type.
     * @param {MetadataType} textField1Type - The field type.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField1Type (textField1Type) {
        this._textField1Type = textField1Type;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField1's type.
     * @returns {MetadataType} - The field type.
     */
    getTextField1Type () {
        return this._textField1Type;
    }

    /**
     * Set textField2's type.
     * @param {MetadataType} textField2Type - The field type.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField2Type (textField2Type) {
        this._textField2Type = textField2Type;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField2's type.
     * @returns {MetadataType} - The field type.
     */
    getTextField2Type () {
        return this._textField2Type;
    }

    /**
     * Set textField3's type.
     * @param {MetadataType} textField3Type - The field type.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField3Type (textField3Type) {
        this._textField3Type = textField3Type;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField3's type.
     * @returns {MetadataType} - The field type.
     */
    getTextField3Type () {
        return this._textField3Type;
    }

    /**
     * Set textField4's type.
     * @param {MetadataType} textField4Type - The field type.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField4Type (textField4Type) {
        this._textField4Type = textField4Type;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get textField4's type.
     * @returns {MetadataType} - The field type.
     */
    getTextField4Type () {
        return this._textField4Type;
    }

    /**
     * Set the title.
     * @param {String} title - The title.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTitle (title) {
        this._title = title;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get the title.
     * @returns {String} - The title.
     */
    getTitle () {
        return this._title;
    }

    /**
     * Set the primary graphic.
     * @param {SdlArtwork} primaryGraphic - An instance of SdlArtwork.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setPrimaryGraphic (primaryGraphic) {
        this._primaryGraphic = primaryGraphic;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get the primary graphic.
     * @returns {SdlArtwork} - An instance of SdlArtwork.
     */
    getPrimaryGraphic () {
        return this._primaryGraphic;
    }

    /**
     * Set the secondary graphic.
     * @param {SdlArtwork} secondaryGraphic - An instance of SdlArtwork.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setSecondaryGraphic (secondaryGraphic) {
        this._secondaryGraphic = secondaryGraphic;
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, null);
        } else {
            this._isDirty = true;
        }
        return this;
    }

    /**
     * Get the secondary graphic.
     * @returns {SdlArtwork} - An instance of SdlArtwork.
     */
    getSecondaryGraphic () {
        return this._secondaryGraphic;
    }

    /**
     * Change the templateConfiguration
     * @param {TemplateConfiguration} templateConfiguration - An instance of TemplateConfiguration.
     * @param {function} listener - A function to be called when the update has completed
     */
    changeLayout (templateConfiguration, listener) {
        this.setTemplateConfiguration(templateConfiguration);
        if (!this._batchingUpdates) {
            this._sdlUpdate(true, listener);
        } else {
            this._isDirty = true;
        }
    }

    /**
     * Get templateConfiguration
     * @returns {TemplateConfiguration} - An instance of TemplateConfiguration.
     */
    getTemplateConfiguration () {
        return this._templateConfiguration;
    }

    /**
     * Set templateConfiguration
     * @param {TemplateConfiguration} templateConfiguration - An instance of TemplateConfiguration.
     */
    setTemplateConfiguration (templateConfiguration) {
        // Don't do the `isBatchingUpdates` like elsewhere because the call is already handled in `changeLayout(TemplateConfiguration templateConfiguration) `
        this._templateConfiguration = templateConfiguration;
    }

    /**
     * Set whether or not to batch updates.
     * @param {Boolean} batching - Whether or not to batch updates.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setBatchUpdates (batching) {
        this._batchingUpdates = batching;
        return this;
    }
}

export { _TextAndGraphicManagerBase };
