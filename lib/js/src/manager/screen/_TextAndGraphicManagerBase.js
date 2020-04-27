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
import { Show } from '../../rpc/messages/Show.js';
import { MetadataTags } from '../../rpc/structs/MetadataTags.js';
import { TextFieldName } from '../../rpc/enums/TextFieldName.js';

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
        this._currentScreenData = new Show();

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
        this._currentScreenData = new Show();

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
            this._addTask(this._sdlUpdate(resolve));
        });
    }

    /**
     * Determines what needs to be done to send a valid Show method
     * @private
     * @param {function} listener - A function to invoke when the update task is complete once it runs
     * @returns {function} - An async function that returns after this update is done
     */
    _sdlUpdate (listener) {
        return async (taskQueue) => {
            // can't empty the queue now. we need all tasks to run in case one of them is ran by commit()
            // taskQueue.splice(0, taskQueue.length);

            // Updating Text and Graphics
            let fullShow = new Show();
            if (this._textAlignment !== null) {
                fullShow.setAlignment(this._textAlignment);
            }

            fullShow = this._assembleShowImages(this._assembleShowText(fullShow));

            let updateSuccess = false;

            if (!this._shouldUpdatePrimaryImage() && !this._shouldUpdateSecondaryImage()) {
                // No Images to send, only sending text
                updateSuccess = await this._sendShow(this._extractTextFromShow(fullShow));
            } else if (!this._sdlArtworkNeedsUpload(this._primaryGraphic) &&
                (this._secondaryGraphic === this._blankArtwork || !this._sdlArtworkNeedsUpload(this._secondaryGraphic))) {
                // Images already uploaded, sending full update
                // The files to be updated are already uploaded, send the full show immediately
                updateSuccess = await this._sendShow(fullShow);
            } else {
                // Images need to be uploaded, sending text and uploading images
                const success = await this._uploadImages();
                if (!success) {
                    fullShow = this._extractTextFromShow(fullShow);
                }
                updateSuccess = await this._sendShow(fullShow);
            }
            listener(updateSuccess); // report show success status
        };
    }

    /**
     * Sends the Show RPC
     * @private
     * @param {Show} show - A Show RPC message.
     * @returns {Promise} - Resolves to a Boolean
     */
    async _sendShow (show) {
        if (this._softButtonManager !== null) {
            this._softButtonManager.setCurrentMainField1(show.getMainField1());
        }

        const response = await this._lifecycleManager.sendRpcMessage(show);

        if (response.getSuccess()) {
            this._updateCurrentScreenDataState(show);
        }
        return response.getSuccess();
    }

    /**
     * Uploads images that need to exist before sending a Show with images
     * @private
     * @returns {Promise} - returns true if succeeded, and false if failed
     */
    async _uploadImages () {
        const artworksToUpload = [];

        // add primary image
        if (this._shouldUpdatePrimaryImage() && !this._primaryGraphic.isStaticIcon()) {
            artworksToUpload.push(this._primaryGraphic);
        }

        // add secondary image
        if (this._shouldUpdateSecondaryImage() && !this._secondaryGraphic.isStaticIcon()) {
            artworksToUpload.push(this._secondaryGraphic);
        }

        if (artworksToUpload.length === 0 && (this._primaryGraphic.isStaticIcon() || this._secondaryGraphic.isStaticIcon())) {
            return true;
        }

        // use file manager to upload art
        if (this._fileManager !== null) {
            const results = await this._fileManager.uploadArtworks(artworksToUpload);
            if (results.includes(false)) {
                console.error('Error Uploading Artworks');
            }
            return !results.includes(false); // success if doesn't contain a false result
        }

        return false; // file manager is null
    }

    /**
     * Sets the Show's image information
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleShowImages (show) {
        if (this._shouldUpdatePrimaryImage()) {
            show.setGraphic(this._primaryGraphic.getImageRPC());
        }

        if (this._shouldUpdateSecondaryImage()) {
            show.setSecondaryGraphic(this._secondaryGraphic.getImageRPC());
        }

        return show;
    }

    /**
     * Sets the Show's text information
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleShowText (show) {
        show = this._setBlankTextFields(show);

        if (this._mediaTrackTextField !== null) {
            show.setMediaTrack(this._mediaTrackTextField);
        }

        if (this._title !== null) {
            show.setTemplateTitle(this._title);
        }

        const nonNullFields = this._findValidMainTextFields();
        if (nonNullFields.length === 0) {
            return show;
        }

        const numberOfLines = this._getNumberOfLines();

        switch (numberOfLines) {
            case 1: show = this._assembleOneLineShowText(show, nonNullFields);
                break;
            case 2: show = this._assembleTwoLineShowText(show);
                break;
            case 3: show = this._assembleThreeLineShowText(show);
                break;
            case 4: show = this._assembleFourLineShowText(show);
                break;
        }

        return show;
    }

    /**
     * Used for a head unit with one line available
     * @private
     * @param {Show} show - A Show RPC Message.
     * @param {String[]} showFields - An array of strings.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleOneLineShowText (show, showFields) {
        let showString1 = '';
        for (let index = 0; index < showFields.length; index++) {
            if (index > 0) {
                showString1 = `${showString1} - ${showFields[index]}`;
            } else {
                showString1 = showString1 + showFields[index];
            }
        }
        show.setMainField1(showString1);

        const tags = new MetadataTags();
        tags.setMainField1(this._findNonNullMetadataFields());

        show.setMetadataTags(tags);

        return show;
    }

    /**
     * Used for a head unit with two lines available
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleTwoLineShowText (show) {
        let tempString = '';
        const tags = new MetadataTags();

        if (this._textField1 !== null && this._textField1.length > 0) {
            tempString = tempString + this._textField1;
            if (this._textField1Type !== null) {
                tags.setMainField1([this._textField1Type]);
            }
        }

        if (this._textField2 !== null && this._textField2.length > 0) {
            if ((this._textField3 === null || !(this._textField3.length > 0)) && (this._textField4 === null || !(this._textField4.length > 0))) {
                // text does not exist in slots 3 or 4, put text2 in slot 2
                show.setMainField2(this._textField2);
                if (this._textField2Type !== null) {
                    tags.setMainField2([this._textField2Type]);
                }
            } else if (this._textField1 !== null && this._textField1.length > 0) {
                // If text 1 exists, put it in slot 1 formatted
                tempString = `${tempString} - ${this._textField2}`;
                if (this._textField2Type !== null) {
                    const typeList = [];
                    typeList.push(this._textField2Type);
                    if (this._textField1Type !== null) {
                        typeList.push(this._textField1Type);
                    }
                    tags.setMainField1(typeList);
                }
            } else {
                // If text 1 does not exist, put it in slot 1 unformatted
                tempString = tempString + this._textField2;
                if (this._textField2Type !== null) {
                    tags.setMainField1([this._textField2Type]);
                }
            }
        }

        // set mainfield 1
        show.setMainField1(tempString.toString());

        // new string
        tempString = '';

        if (this._textField3 !== null && this._textField3.length > 0) {
            // If text 3 exists, put it in slot 2
            tempString = tempString + this._textField3;
            if (this._textField3Type !== null) {
                const typeList = [];
                typeList.push(this._textField3Type);
                tags.setMainField2(typeList);
            }
        }

        if (this._textField4 !== null && this._textField4.length > 0) {
            if (this._textField3 !== null && this._textField3.length > 0) {
                // If text 3 exists, put it in slot 2 formatted
                tempString = `${tempString} - ${this._textField4}`;
                if (this._textField4Type !== null) {
                    const typeList = [];
                    typeList.push(this._textField4Type);
                    if (this._textField3Type !== null) {
                        typeList.push(this._textField3Type);
                    }
                    tags.setMainField2(typeList);
                }
            } else {
                // If text 3 does not exist, put it in slot 3 unformatted
                tempString = tempString + this._textField4;
                if (this._textField4Type !== null) {
                    tags.setMainField2([this._textField4Type]);
                }
            }
        }

        if (tempString.length > 0) {
            show.setMainField2(tempString);
        }

        show.setMetadataTags(tags);
        return show;
    }

    /**
     * Used for a head unit with three lines available
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleThreeLineShowText (show) {
        const tags = new MetadataTags();

        if (this._textField1 !== null && this._textField1.length > 0) {
            show.setMainField1(this._textField1);
            if (this._textField1Type !== null) {
                tags.setMainField1([this._textField1Type]);
            }
        }

        if (this._textField2 !== null && this._textField2.length > 0) {
            show.setMainField2(this._textField2);
            if (this._textField2Type !== null) {
                tags.setMainField2([this._textField2Type]);
            }
        }

        let tempString = '';

        if (this._textField3 !== null && this._textField3.length > 0) {
            tempString = tempString + this._textField3;
            if (this._textField3Type !== null) {
                tags.setMainField3([this._textField3Type]);
            }
        }

        if (this._textField4 !== null && this._textField4.length > 0) {
            if (this._textField3 !== null && this._textField3.length > 0) {
                // If text 3 exists, put it in slot 3 formatted
                tempString = `${tempString} - ${this._textField4}`;
                if (this._textField4Type !== null) {
                    const tags4 = [];
                    if (this._textField3Type !== null) {
                        tags4.push(this._textField3Type);
                    }
                    tags4.push(this._textField4Type);
                    tags.setMainField3(tags4);
                }
            } else {
                // If text 3 does not exist, put it in slot 3 formatted
                tempString = tempString + this._textField4;
                if (this._textField4Type !== null) {
                    tags.setMainField3([this._textField4Type]);
                }
            }
        }

        show.setMainField3(tempString);
        show.setMetadataTags(tags);
        return show;
    }

    /**
     * Used for a head unit with four lines available
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleFourLineShowText (show) {
        const tags = new MetadataTags();

        if (this._textField1 !== null && this._textField1.length > 0) {
            show.setMainField1(this._textField1);
            if (this._textField1Type !== null) {
                tags.setMainField1([this._textField1Type]);
            }
        }

        if (this._textField2 !== null && this._textField2.length > 0) {
            show.setMainField2(this._textField2);
            if (this._textField2Type !== null) {
                tags.setMainField2([this._textField2Type]);
            }
        }

        if (this._textField3 !== null && this._textField3.length > 0) {
            show.setMainField3(this._textField3);
            if (this._textField3Type !== null) {
                tags.setMainField3([this._textField3Type]);
            }
        }

        if (this._textField4 !== null && this._textField4.length > 0) {
            show.setMainField4(this._textField4);
            if (this._textField4Type !== null) {
                tags.setMainField4([this._textField4Type]);
            }
        }

        show.setMetadataTags(tags);
        return show;
    }

    /**
     * Gets only text information and puts it into a new Show
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - A new Show RPC Message.
     */
    _extractTextFromShow (show) {
        const newShow = new Show();
        newShow.setMainField1(show.getMainField1());
        newShow.setMainField2(show.getMainField2());
        newShow.setMainField3(show.getMainField3());
        newShow.setMainField4(show.getMainField4());
        newShow.setTemplateTitle(show.getTemplateTitle());

        return newShow;
    }

    /**
     * Clears out a Show's text fields
     *
     * @private
     * @param {Show} newShow - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _setBlankTextFields (newShow) {
        newShow.setMainField1('');
        newShow.setMainField2('');
        newShow.setMainField3('');
        newShow.setMainField4('');
        newShow.setMediaTrack('');
        newShow.setTemplateTitle('');

        return newShow;
    }

    /**
     * Updates the local state to match what was sent
     * @private
     * @param {Show} show - A Show RPC Message.
     */
    _updateCurrentScreenDataState (show = null) {
        if (show === null) {
            return;
        }

        // If the items are null, they were not updated, so we can't just set it directly
        if (show.getMainField1() !== null && show.getMainField1() !== undefined) {
            this._currentScreenData.setMainField1(show.getMainField1());
        }
        if (show.getMainField2() !== null && show.getMainField2() !== undefined) {
            this._currentScreenData.setMainField2(show.getMainField2());
        }
        if (show.getMainField3() !== null && show.getMainField3() !== undefined) {
            this._currentScreenData.setMainField3(show.getMainField3());
        }
        if (show.getMainField4() !== null && show.getMainField4() !== undefined) {
            this._currentScreenData.setMainField4(show.getMainField4());
        }
        if (show.getTemplateTitle() !== null && show.getTemplateTitle() !== undefined) {
            this._currentScreenData.setTemplateTitle(show.getTemplateTitle());
        }
        if (show.getMediaTrack() !== null && show.getMediaTrack() !== undefined) {
            this._currentScreenData.setMediaTrack(show.getMediaTrack());
        }
        if (show.getMetadataTags() !== null && show.getMetadataTags() !== undefined) {
            this._currentScreenData.setMetadataTags(show.getMetadataTags());
        }
        if (show.getAlignment() !== null && show.getAlignment() !== undefined) {
            this._currentScreenData.setAlignment(show.getAlignment());
        }
        if (show.getGraphic() !== null && show.getGraphic() !== undefined) {
            this._currentScreenData.setGraphic(show.getGraphic());
        }
        if (show.getSecondaryGraphic() !== null && show.getSecondaryGraphic() !== undefined) {
            this._currentScreenData.setSecondaryGraphic(show.getSecondaryGraphic());
        }
    }

    /**
     * Returns only valid main text fields
     * @private
     * @returns {String[]} - An array of strings representing the Show's textFields
     */
    _findValidMainTextFields () {
        const array = [];

        if (this._textField1 !== null && this._textField1.length > 0) {
            array.push(this._textField1);
        }

        if (this._textField2 !== null && this._textField2.length > 0) {
            array.push(this._textField2);
        }

        if (this._textField3 !== null && this._textField3.length > 0) {
            array.push(this._textField3);
        }

        if (this._textField4 !== null && this._textField4.length > 0) {
            array.push(this._textField4);
        }

        return array;
    }

    /**
     * Returns only non-null metadata fields
     * @private
     * @returns {MetadataType[]} - An array of MetadataType, each item representing a textField.
     */
    _findNonNullMetadataFields () {
        const array = [];

        if (this._textField1Type !== null) {
            array.push(this._textField1Type);
        }

        if (this._textField2Type !== null) {
            array.push(this._textField2Type);
        }

        if (this._textField3Type !== null) {
            array.push(this._textField3Type);
        }

        if (this._textField4Type !== null) {
            array.push(this._textField4Type);
        }

        return array;
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
     * Checks whether the passed in artwork needs to be sent out
     * @private
     * @param {SdlArtwork} artwork - An instance of SdlArtwork.
     * @returns {Boolean} - Whether or not the artwork needs to be uploaded.
     */
    _sdlArtworkNeedsUpload (artwork = null) {
        if (this._fileManager !== null) {
            return artwork !== null && !this._fileManager.hasUploadedFile(artwork) && !artwork.isStaticIcon();
        }
        return false;
    }

    /**
     * Checks whether the primary image should be sent out
     * @private
     * @returns {Boolean} - Whether or not the primary image needs to be uploaded.
     */
    _shouldUpdatePrimaryImage () {
        if (this._defaultMainWindowCapability === null || !Array.isArray(this._defaultMainWindowCapability.getImageTypeSupported())
            || this._defaultMainWindowCapability.getImageTypeSupported().length > 0) {
            // Cannot detect if there is a secondary image, so we'll just try to detect if there's a primary image and allow it if there is.
            if (this._currentScreenData.getGraphic() === null || this._currentScreenData.getGraphic() === undefined) {
                return this._primaryGraphic !== null;
            } else {
                if (this._primaryGraphic === null) {
                    return false;
                }
                const screenDataValue = this._currentScreenData.getGraphic().getValueParam();
                const secondaryGraphicValue = this._primaryGraphic.getName();
                return (`${screenDataValue}`).toLowerCase() === (`${secondaryGraphicValue}`).toLowerCase();
            }
        }
        return false;
    }

    /**
     * Checks whether the secondary image should be sent out
     * @private
     * @returns {Boolean} - Whether or not the secondary image needs to be uploaded.
     */
    _shouldUpdateSecondaryImage () {
        if (this._defaultMainWindowCapability === null || !Array.isArray(this._defaultMainWindowCapability.getImageTypeSupported())
            || this._defaultMainWindowCapability.getImageTypeSupported().length > 0) {
            // Cannot detect if there is a secondary image, so we'll just try to detect if there's a primary image and allow it if there is.
            if (this._currentScreenData.getGraphic() === null || this._currentScreenData.getGraphic() === undefined) {
                return this._secondaryGraphic !== null;
            } else {
                if (this._secondaryGraphic === null) {
                    return false;
                }
                const screenDataValue = this._currentScreenData.getGraphic().getValueParam();
                const secondaryGraphicValue = this._secondaryGraphic.getName();
                return (`${screenDataValue}`).toLowerCase() === (`${secondaryGraphicValue}`).toLowerCase();
            }
        }
        return false;
    }

    /**
     * Gets the number of show lines available on the head unit
     * @private
     * @returns {Number} - The number of lines.
     */
    _getNumberOfLines () {
        if (this._defaultMainWindowCapability === null) {
            return 4;
        }

        let linesFound = 0;
        const textFields = this._defaultMainWindowCapability.getTextFields();

        if (Array.isArray(textFields)) {
            for (const field of textFields) {
                const name = field.getNameParam();
                if (name === TextFieldName.mainField1 || name === TextFieldName.mainField2 || name === TextFieldName.mainField3 || name === TextFieldName.mainField4) {
                    linesFound += 1;
                }
            }
        }

        return linesFound;
    }

    // SCREEN ITEM SETTERS AND GETTERS

    /**
     * Set the text alignment.
     * @param {TextAlignment} textAlignment - A TextAlignment enum value.
     * @returns {_TextAndGraphicManagerBase} - A reference to this instance to support method chaining.
     */
    setTextAlignment (textAlignment) {
        this._textAlignment = textAlignment;
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
        this.update();
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
