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

import { SubManagerBase } from '../SubManagerBase.js';
import { HMILevel } from '../../rpc/enums/HMILevel.js';
import { SystemCapabilityType } from '../../rpc/enums/SystemCapabilityType.js';
import { PredefinedWindows } from '../../rpc/enums/PredefinedWindows.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { Show } from '../../rpc/messages/Show.js';
import { MetadataTags } from '../../rpc/structs/MetadataTags.js';
import { TextFieldName } from '../../rpc/enums/TextFieldName.js';

class TextAndGraphicManagerBase extends SubManagerBase {
    /**
     * @param {LifecycleManager} lifecycleManager
     * @param {FileManager} fileManager
     * @param {SoftButtonManager} softButtonManager
    */
    constructor (lifecycleManager, fileManager = null, softButtonManager = null) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._softButtonManager = softButtonManager;
        this._taskQueue = []; // for handling concurrency (equivalent of isDirty)
        this._batchingUpdates = false; // whether to wait on sending the updates
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._isReady = false;
        this._hmiListener = null;
        this._onDisplayCapabilityListener = null;
        this._defaultMainWindowCapability = null;
        this._blankArtwork = null;
        this._isUpdateRunning = false;
        this._currentScreenData = new Show();
        this._queuedImageUpdate = false;

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

        this._addListeners();
        this._getBlankArtwork();
    }

    /**
     * After this method finishes, the manager is ready
     * @return {Promise}
    */
    async start () {
        this._transitionToState(SubManagerBase.READY);
        super.start();
    }

    /**
     * Teardown method
    */
    dispose () {
        // remove listeners
        this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.removeOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        this._taskQueue = [];
        this._batchingUpdates = false;
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._isReady = false;
        this._defaultMainWindowCapability = null;
        this._blankArtwork = null;
        this._isUpdateRunning = false;
        this._currentScreenData = new Show();
        this._queuedImageUpdate = false;

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
     * Listens for OnHMIStatus and display capability updates
     * @private
    */
    _addListeners () {
        // HMI UPDATES
        this._hmiListener = (onHmiStatus) => {
            if (onHmiStatus.getWindowID() !== null && onHmiStatus.getWindowID() !== PredefinedWindows.DEFAULT_WINDOW) {
                return;
            }
            const oldHmiLevel = this._currentHmiLevel;
            this._currentHmiLevel = onHmiStatus.getHmiLevel();
            // Auto-send an update if we were in NONE and now we are not
            if (oldHmiLevel === HMILevel.HMI_NONE && this._currentHmiLevel !== HMILevel.HMI_NONE) {
                this._isReady = true;
                this._update(false);
            }
        };

        // DISPLAYS
        this._onDisplayCapabilityListener = (capabilities) => {
            if (!Array.isArray(capabilities) || capabilities.length === 0) {
                return;
            }
            const displayCapability = capabilities[0];
            for (const windowCapability of displayCapability.getWindowCapabilities()) {
                let currentWindowId;
                if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                    currentWindowId = windowCapability.getWindowID();
                } else {
                    currentWindowId = PredefinedWindows.DEFAULT_WINDOW;
                }
                if (currentWindowId === PredefinedWindows.DEFAULT_WINDOW) {
                    this._defaultMainWindowCapability = windowCapability;
                }
            }
        };

        this._lifecycleManager.addRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        this._lifecycleManager.addOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
    }

    /**
     * Conditionally applies a Show update based on what has been set in the internal state
     * @private
     * @param {Boolean} - Whether it's known that there's a change that warrants an update
     * @return {Promise}
    */
    async _update (knownUpdate) {
        if (knownUpdate) {
            this._taskQueue.push(true);
        }
        // don't continue if the manager is in batch mode
        if (this._batchingUpdates) {
            return;
        }
        if (!this._isUpdateRunning) {
            this._isUpdateRunning = true;
            await this._sdlUpdate();
            this._isUpdateRunning = false;
        }
    }

    /**
     * Determines what needs to be done to send a valid Show method
     * @private
     * @return {Promise}
    */
    async _sdlUpdate () {
        // don't continue if there's nothing to do or if the manager didn't get the right HMI level yet
        if (!this._isReady || this._taskQueue.length === 0) {
            return;
        }
        // empty the queue out the safe way
        this._taskQueue.splice(0, this._taskQueue.length);

        // Updating Text and Graphics
        let fullShow = new Show();
        if (this._textAlignment !== null) {
            fullShow.setAlignment(this._textAlignment);
        }


        fullShow = this._assembleShowImages(this._assembleShowText(fullShow));

        if (!this._shouldUpdatePrimaryImage() && !this._shouldUpdateSecondaryImage()) {
            // No Images to send, only sending text
            await this._sendShow(this._extractTextFromShow(fullShow));
        } else if (!this._sdlArtworkNeedsUpload(this._primaryGraphic) &&
            (this._secondaryGraphic === this._blankArtwork || !this._sdlArtworkNeedsUpload(this._secondaryGraphic))) {
            // Images already uploaded, sending full update
            // The files to be updated are already uploaded, send the full show immediately
            await this._sendShow(fullShow);
        } else {
            // Images need to be uploaded, sending text and uploading images
            const success = await this._uploadImages();
            if (!success) {
                fullShow = this._extractTextFromShow(fullShow);
            }
            await this._sendShow(fullShow);
        }

        // run this method again for potential future tasks
        return this._sdlUpdate();
    }

    /**
     * Sends the Show RPC
     * @private
     * @param {Show} show
     * @return {Promise}
    */
    async _sendShow (show) {
        if (this._softButtonManager !== null) {
            this._softButtonManager.setCurrentMainField1(show.getMainField1());
        }

        const response = await this._lifecycleManager.sendRpcMessage(show);

        if (response.getSuccess()) {
            this._updateCurrentScreenDataState(show);
        }
    }

    /**
     * Uploads images that need to exist before sending a Show with images
     * @private
     * @return {Promise} - returns true if succeeded, and false if failed
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
     * @param {Show} show
     * @return {Show}
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
     * @param {Show} show
     * @return {Show}
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
     * @param {Show} show
     * @param {String[]} showFields
     * @return {Show}
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
     * @param {Show} show
     * @return {Show}
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
     * @param {Show} show
     * @return {Show}
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
     * @param {Show} show
     * @return {Show}
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
     * @param {Show} show
     * @return {Show}
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
     * @private
     * @param {Show} show
     * @return {Show}
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
     * @param {Show} show
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
     * @return {String[]}
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
     * @return {MetadataType[]}
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
     * @return {SdlArtwork}
    */
    _getBlankArtwork () {
        throw new Error('_getBlankArtwork method must be overridden');
    }

    /**
     * Checks whether the passed in artwork needs to be sent out
     * @private
     * @param {SdlArtwork} artwork
     * @return {Boolean}
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
     * @return {Boolean}
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
                const screenDataValue = this._currentScreenData.getGraphic().getValue();
                const secondaryGraphicValue = this._primaryGraphic.getName();
                return (`${screenDataValue}`).toLowerCase() === (`${secondaryGraphicValue}`).toLowerCase();
            }
        }
        return false;
    }

    /**
     * Checks whether the secondary image should be sent out
     * @private
     * @return {Boolean}
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
                const screenDataValue = this._currentScreenData.getGraphic().getValue();
                const secondaryGraphicValue = this._secondaryGraphic.getName();
                return (`${screenDataValue}`).toLowerCase() === (`${secondaryGraphicValue}`).toLowerCase();
            }
        }
        return false;
    }

    /**
     * Gets the number of show lines available on the head unit
     * @private
     * @return {Number}
    */
    _getNumberOfLines () {
        if (this._defaultMainWindowCapability === null) {
            return 4;
        }

        let linesFound = 0;
        const textFields = this._defaultMainWindowCapability.getTextFields();

        if (Array.isArray(textFields)) {
            for (const field of textFields) {
                const name = field.getName();
                if (name === TextFieldName.mainField1 || name === TextFieldName.mainField2 || name === TextFieldName.mainField3 || name === TextFieldName.mainField4) {
                    linesFound += 1;
                }
            }
        }

        return linesFound;
    }

    // SCREEN ITEM SETTERS AND GETTERS

    /**
     * @param {TextAlignment} textAlignment
     * @return {TextAndGraphicManagerBase}
    */
    setTextAlignment (textAlignment) {
        this._textAlignment = textAlignment;
        this._update(true);
        return this;
    }

    /**
     * @return {TextAlignment}
    */
    getTextAlignment () {
        return this._textAlignment;
    }

    /**
     * @param {String} mediaTrackTextField
     * @return {TextAndGraphicManagerBase}
    */
    setMediaTrackTextField (mediaTrackTextField) {
        this._mediaTrackTextField = mediaTrackTextField;
        this._update(true);
        return this;
    }

    /**
     * @return {String}
    */
    getMediaTrackTextField () {
        return this._mediaTrackTextField;
    }

    /**
     * @param {String} textField1
     * @return {TextAndGraphicManagerBase}
    */
    setTextField1 (textField1) {
        this._textField1 = textField1;
        this._update(true);
        return this;
    }

    /**
     * @return {String}
    */
    getTextField1 () {
        return this._textField1;
    }

    /**
     * @param {String} textField2
     * @return {TextAndGraphicManagerBase}
    */
    setTextField2 (textField2) {
        this._textField2 = textField2;
        this._update(true);
        return this;
    }

    /**
     * @return {String}
    */
    getTextField2 () {
        return this._textField2;
    }

    /**
     * @param {String} textField3
     * @return {TextAndGraphicManagerBase}
    */
    setTextField3 (textField3) {
        this._textField3 = textField3;
        this._update(true);
        return this;
    }

    /**
     * @return {String}
    */
    getTextField3 () {
        return this._textField3;
    }

    /**
     * @param {String} textField4
     * @return {TextAndGraphicManagerBase}
    */
    setTextField4 (textField4) {
        this._textField4 = textField4;
        this._update(true);
        return this;
    }

    /**
     * @return {String}
    */
    getTextField4 () {
        return this._textField4;
    }

    /**
     * @param {MetadataType} textField1Type
     * @return {TextAndGraphicManagerBase}
    */
    setTextField1Type (textField1Type) {
        this._textField1Type = textField1Type;
        this._update(true);
        return this;
    }

    /**
     * @return {MetadataType}
    */
    getTextField1Type () {
        return this._textField1Type;
    }

    /**
     * @param {MetadataType} textField2Type
     * @return {TextAndGraphicManagerBase}
    */
    setTextField2Type (textField2Type) {
        this._textField2Type = textField2Type;
        this._update(true);
        return this;
    }

    /**
     * @return {MetadataType}
    */
    getTextField2Type () {
        return this._textField2Type;
    }

    /**
     * @param {MetadataType} textField3Type
     * @return {TextAndGraphicManagerBase}
    */
    setTextField3Type (textField3Type) {
        this._textField3Type = textField3Type;
        this._update(true);
        return this;
    }

    /**
     * @return {MetadataType}
    */
    getTextField3Type () {
        return this._textField3Type;
    }

    /**
     * @param {MetadataType} textField4Type
     * @return {TextAndGraphicManagerBase}
    */
    setTextField4Type (textField4Type) {
        this._textField4Type = textField4Type;
        this._update(true);
        return this;
    }

    /**
     * @return {MetadataType}
    */
    getTextField4Type () {
        return this._textField4Type;
    }

    /**
     * @param {String} title
     * @return {TextAndGraphicManagerBase}
    */
    setTitle (title) {
        this._title = title;
        this._update(true);
        return this;
    }

    /**
     * @return {String}
    */
    getTitle () {
        return this._title;
    }

    /**
     * @param {SdlArtwork} primaryGraphic
     * @return {TextAndGraphicManagerBase}
    */
    setPrimaryGraphic (primaryGraphic) {
        this._primaryGraphic = primaryGraphic;
        this._update(true);
        return this;
    }

    /**
     * @return {SdlArtwork}
    */
    getPrimaryGraphic () {
        return this._primaryGraphic;
    }

    /**
     * @param {SdlArtwork} secondaryGraphic
     * @return {TextAndGraphicManagerBase}
    */
    setSecondaryGraphic (secondaryGraphic) {
        this._secondaryGraphic = secondaryGraphic;
        this._update(true);
        return this;
    }

    /**
     * @return {SdlArtwork}
    */
    getSecondaryGraphic () {
        return this._secondaryGraphic;
    }

    /**
     * @param {Boolean} batching
     * @return {TextAndGraphicManagerBase}
    */
    setBatchUpdates (batching) {
        this._batchingUpdates = batching;
        this._update(true);
        return this;
    }
}

export { TextAndGraphicManagerBase };
