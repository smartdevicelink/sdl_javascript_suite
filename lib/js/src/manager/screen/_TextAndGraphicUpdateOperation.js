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

import { _Task } from '../_Task';
import { Show } from '../../rpc/messages/Show';
import { ImageFieldName } from '../../rpc/enums/ImageFieldName';
import { _ManagerUtility } from '../_ManagerUtility';
import { MetadataTags } from '../../rpc/structs/MetadataTags';
import { TextFieldName } from '../../rpc/enums/TextFieldName';
import { SetDisplayLayout } from '../../rpc/messages/SetDisplayLayout';
import { TemplateConfiguration } from '../../rpc/structs/TemplateConfiguration';

class _TextAndGraphicUpdateOperation extends _Task {
    /**
     * Initializes an instance of _TextAndGraphicUpdateOperation
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance
     * @param {FileManager} fileManager - A FileManager instance
     * @param {WindowCapability} currentCapabilities - The capabilities of the default main window
     * @param {_TextAndGraphicState} currentScreenData - The current state of the screen
     * @param {_TextAndGraphicState} newState - The updated state of the screen
     * @param {Function} listener - A method to be called when the task is completed
     * @param {Function} currentScreenDataUpdateListener - A method to update the current screen data
     */
    constructor (lifecycleManager, fileManager, currentCapabilities, currentScreenData, newState, listener, currentScreenDataUpdateListener) {
        super();
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._defaultMainWindowCapability = currentCapabilities;
        this._currentScreenData = currentScreenData;
        this._updatedState = newState;
        this._listener = listener;
        this._currentScreenDataUpdateListener = currentScreenDataUpdateListener;
        this._fullShow = null;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     */
    async onExecute (task) {
        await this._start();
    }
    /**
     * If the task is not canceled, starts to assemble the show
     * @private
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            this._finishOperation(false);
            return;
        }
        this._fullShow = new Show();
        if (this._updatedState.getTextAlignment() !== null && this._updatedState.getTextAlignment() !== undefined) {
            this._fullShow = this._fullShow.setAlignment(this._updatedState.getTextAlignment());
        }
        this._fullShow = this._assembleShowText(this._fullShow);
        this._fullShow = this._assembleShowImages(this._fullShow);
        this._fullShow = this._assembleLayout(this._fullShow);

        if (this._showRpcSupportsTemplateConfiguration()) {
            await this._updateGraphicsAndShow(this._fullShow);
        } else {
            if (this._shouldUpdateTemplateConfig()) {
                const success = await this._sendSetDisplayLayoutWithTemplateConfiguration(this._updatedState.getTemplateConfiguration());
                if (this.getState() === _Task.CANCELED || !success) {
                    // Task was canceled or SetDisplayLayout was not a success
                    this._finishOperation(false);
                    return;
                }
                await this._updateGraphicsAndShow(this._fullShow);
            } else {
                await this._updateGraphicsAndShow(this._fullShow);
            }
        }
    }

    /**
     * Sends a Show RPC with graphics.
     * @private
     * @param {Show} show - A Show RPC instance.
     */
    async _updateGraphicsAndShow (show) {
        if (!this._shouldUpdatePrimaryImage() && !this._shouldUpdateSecondaryImage()) {
            console.info('No images to send, sending text');
            const success = await this._sendShow(this._extractTextAndLayoutFromShow(show));
            this._finishOperation(success);
        } else if (this._fileManager !== null && this._fileManager !== undefined &&
            !this._fileManager.fileNeedsUpload(this._updatedState.getPrimaryGraphic()) &&
            !this._fileManager.fileNeedsUpload(this._updatedState.getSecondaryGraphic())) {
            console.info('Images already uploaded, sending full update');
            const success = await this._sendShow(show);
            this._finishOperation(success);
        } else {
            console.info('Images need to be uploaded, sending text and uploading images');
            const success = await this._sendShow(this._extractTextAndLayoutFromShow(show));
            if (this.getState() === _Task.CANCELED) {
                this._finishOperation(false);
                return;
            }
            await this._uploadImagesAndSendWhenDone();
            this._finishOperation(success);
        }
    }

    /**
     * Sends the Show RPC
     * @private
     * @param {Show} show - A Show RPC message.
     * @returns {Promise} - Resolves to a Boolean
     */
    async _sendShow (show) {
        if (this._lifecycleManager !== null) {
            const response = await this._lifecycleManager.sendRpcResolve(show);
            if (response.getSuccess()) {
                console.info('Text and Graphic update complete');
                this._updateCurrentScreenDataFromShow(show);
            } else {
                console.info('Text and Graphic Show failed');
                this._currentScreenDataUpdateListener(async () => {
                    throw this._updatedState; // send the errored state back to the manager
                });
            }
            return response.getSuccess();
        } else {
            console.info('LifecycleManager is null, Text and Graphic update failed');
            this._currentScreenDataUpdateListener(async () => {
                throw new Error('LifecycleManager is null, Text and Graphic update failed');
            });
            this._finishOperation(false);
            return;
        }
    }

    /**
     * Sends a SetDisplayLayout RPC with TemplateConfiguration.
     * @private
     * @param {TemplateConfiguration} configuration - The TemplateConfiguration.
     * @returns {Boolean} - True if successful, false if not
     */
    async _sendSetDisplayLayoutWithTemplateConfiguration (configuration) {
        const setLayout = new SetDisplayLayout().setDisplayLayout(configuration.getTemplate()).setDayColorScheme(configuration.getDayColorScheme()).setNightColorScheme(configuration.getNightColorScheme());
        if (this._lifecycleManager !== null) {
            const response = await this._lifecycleManager.sendRpcResolve(setLayout);
            if (response.getSuccess()) {
                console.info('Text and Graphic update complete');
                this._updateCurrentScreenDataFromSetDisplayLayout(setLayout);
            } else {
                console.info('Text and Graphic SetDisplayLayout failed');
                this._currentScreenDataUpdateListener(async () => {
                    throw new Error('Text and Graphic SetDisplayLayout failed');
                });
            }
            return response.getSuccess();
        } else {
            console.info('LifecycleManager is null, Text and Graphic update failed');
            this._currentScreenDataUpdateListener(async () => {
                throw new Error('LifecycleManager is null, Text and Graphic update failed');
            });
            this._finishOperation(false);
            return;
        }
    }

    /**
     * Attempts to upload images and sends a show when finished
     * @private
     * @returns {Boolean} - Whether the Show was successful
     */
    async _uploadImagesAndSendWhenDone () {
        let success = await this._uploadImages();
        const showWithGraphics = this._createImageOnlyShowWithPrimaryArtwork(this._updatedState.getPrimaryGraphic(), this._updatedState.getSecondaryGraphic());
        if (showWithGraphics !== null && showWithGraphics !== undefined) {
            console.info('Sending update with the successfully uploaded images');
            success = await this._sendShow(showWithGraphics);
            return success;
        } else {
            console.warn('All images failed to upload. No graphics to show, skipping update.');
            return false;
        }
    }

    /**
     * Uploads images that need to exist before sending a Show with images
     * @private
     * @returns {Promise} - returns true if succeeded, and false if failed
     */
    async _uploadImages () {
        const artworksToUpload = [];

        if (this._shouldUpdatePrimaryImage() && !this._updatedState.getPrimaryGraphic().isStaticIcon()) {
            artworksToUpload.push(this._updatedState.getPrimaryGraphic());
        }

        if (this._shouldUpdateSecondaryImage() && !this._updatedState.getSecondaryGraphic().isStaticIcon()) {
            artworksToUpload.push(this._updatedState.getSecondaryGraphic());
        }

        if (artworksToUpload.length === 0) {
            console.info('No artworks need an upload, sending them without upload instead');
            return true;
        }

        if (this._fileManager !== null && this._fileManager !== undefined) {
            const errors = await this._fileManager.uploadArtworks(artworksToUpload);
            if (this.getState() === _Task.CANCELED) {
                this._finishOperation(false);
                return;
            }
            if (errors.includes(false)) {
                console.error(`Text and graphic manager artwork failed to upload with error ${errors.toString()}`);
                return false;
            } else {
                return true;
            }
        }
    }

    /**
     * Sets the Show's image information
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleShowImages (show) {
        if (this._shouldUpdatePrimaryImage()) {
            show.setGraphic(this._updatedState.getPrimaryGraphic().getImageRPC());
        }
        if (this._shouldUpdateSecondaryImage()) {
            show.setSecondaryGraphic(this._updatedState.getSecondaryGraphic().getImageRPC());
        }

        return show;
    }

    /**
     * Creates a show from images that need to be uploaded
     * @private
     * @param {SdlArtwork} primaryArtwork - The primary graphic
     * @param {SdlArtwork} secondaryArtwork - The secondary graphic
     * @returns {Show|null} - A show containing images that need to be uploaded or null if there are none
     */
    _createImageOnlyShowWithPrimaryArtwork (primaryArtwork, secondaryArtwork) {
        const newShow = new Show();
        newShow.setGraphic(this._shouldRpcIncludeImage(primaryArtwork) ? primaryArtwork.getImageRPC() : null);
        newShow.setSecondaryGraphic(this._shouldRpcIncludeImage(secondaryArtwork) ? secondaryArtwork.getImageRPC() : null);
        if ((newShow.getGraphic() === null || newShow.getGraphic() === undefined) && (newShow.getSecondaryGraphic() === null || newShow.getSecondaryGraphic() === undefined)) {
            console.info('No graphics to upload');
            return null;
        }
        return newShow;
    }

    /**
     * Checks if an artwork has been uploaded
     * @private
     * @param {SdlArtwork} artwork - The graphic
     * @returns {Boolean} - Whether the artwork
     */
    _shouldRpcIncludeImage (artwork = null) {
        if (artwork !== null) {
            return artwork.isStaticIcon() || (this._fileManager !== null && this._fileManager !== undefined && this._fileManager.hasUploadedFile(artwork));
        }
        return false;
    }

    /**
     * Sets the Show's text information
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleShowText (show) {
        show = this._setBlankTextFields(show);

        if (this._updatedState.getMediaTrackTextField() !== null && this._updatedState.getMediaTrackTextField() !== undefined && this._shouldUpdateMediaTrackField()) {
            show.setMediaTrack(this._updatedState.getMediaTrackTextField());
        }

        if (this._updatedState.getTitle() !== null && this._updatedState.getTitle() !== undefined && this._shouldUpdateTitleField()) {
            show.setTemplateTitle(this._updatedState.getTitle());
        }

        const nonNullFields = this._findValidMainTextFields();
        if (nonNullFields.length === 0) {
            return show;
        }

        const numberOfLines = (this._defaultMainWindowCapability === null || this._defaultMainWindowCapability === undefined) || this._shouldUpdateTemplateConfig() ? 4 : _ManagerUtility.getMaxNumberOfMainFieldLines(this._defaultMainWindowCapability);
        switch (numberOfLines) {
            case 1:
                show = this._assembleOneLineShowText(show, nonNullFields);
                break;
            case 2:
                show = this._assembleTwoLineShowText(show);
                break;
            case 3:
                show = this._assembleThreeLineShowText(show);
                break;
            case 4:
                show = this._assembleFourLineShowText(show);
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

        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            tempString = tempString + this._updatedState.getTextField1();
            if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
                tags.setMainField1([this._updatedState.getTextField1Type()]);
            }
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            if ((this._updatedState.getTextField3() === null || this._updatedState.getTextField3() === undefined || !(this._updatedState.getTextField3().length > 0)) && (this._updatedState.getTextField4() === null || this._updatedState.getTextField4() === undefined || !(this._updatedState.getTextField4().length > 0))) {
                // text does not exist in slots 3 or 4, put text2 in slot 2
                show.setMainField2(this._updatedState.getTextField2());
                if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                    tags.setMainField2([this._updatedState.getTextField2Type()]);
                }
            } else if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
                // If text 1 exists, put it in slot 1 formatted
                tempString = `${tempString} - ${this._updatedState.getTextField2()}`;
                if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                    const typeList = [];
                    typeList.push(this._updatedState.getTextField2Type());
                    if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
                        typeList.push(this._updatedState.getTextField1Type());
                    }
                    tags.setMainField1(typeList);
                }
            } else {
                // If text 1 does not exist, put it in slot 1 unformatted
                tempString = tempString + this._updatedState.getTextField2();
                if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                    tags.setMainField1([this._updatedState.getTextField2Type()]);
                }
            }
        }

        // set mainField1
        show.setMainField1(tempString);

        // new stringBuilder object
        tempString = '';

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            // If text 3 exists, put it in slot 2
            tempString = tempString + this._updatedState.getTextField3();
            if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                const typeList = [];
                typeList.push(this._updatedState.getTextField3Type());
                tags.setMainField2(typeList);
            }
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
                // If text 3 exists, put it in slot 2 formatted
                tempString = `${tempString} - ${this._updatedState.getTextField4()}`;
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    const typeList = [];
                    typeList.push(this._updatedState.getTextField4Type());
                    if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                        typeList.push(this._updatedState.getTextField3Type());
                    }
                    tags.setMainField2(typeList);
                }
            } else {
                // If text 3 does not exist, put it in slot 3 unformatted
                tempString = tempString + this._updatedState.getTextField4();
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    tags.setMainField2([this._updatedState.getTextField4Type()]);
                }
            }
        }

        if (tempString.length > 0) {
            show.setMainField2(tempString.toString());
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

        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            show.setMainField1(this._updatedState.getTextField1());
            if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
                tags.setMainField1([this._updatedState.getTextField1Type()]);
            }
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            show.setMainField2(this._updatedState.getTextField2());
            if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                tags.setMainField2([this._updatedState.getTextField2Type()]);
            }
        }

        let tempString = '';

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            tempString = this._updatedState.getTextField3();
            if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                tags.setMainField3([this._updatedState.getTextField3Type()]);
            }
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
                // If text 3 exists, put it in slot 3 formatted
                tempString = `${tempString} - ${this._updatedState.getTextField4()}`;
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    const tags4 = [];
                    if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                        tags4.push(this._updatedState.getTextField3Type());
                    }
                    tags4.push(this._updatedState.getTextField4Type());
                    tags.setMainField3(tags4);
                }
            } else {
                // If text 3 does not exist, put it in slot 3 formatted
                tempString = tempString + this._updatedState.getTextField4();
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    tags.setMainField3([this._updatedState.getTextField4Type()]);
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
        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            show.setMainField1(this._updatedState.getTextField1());
            if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
                tags.setMainField1([this._updatedState.getTextField1Type()]);
            }
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            show.setMainField2(this._updatedState.getTextField2());
            if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                tags.setMainField2([this._updatedState.getTextField2Type()]);
            }
        }

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            show.setMainField3(this._updatedState.getTextField3());
            if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                tags.setMainField3([this._updatedState.getTextField3Type()]);
            }
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            show.setMainField4(this._updatedState.getTextField4());
            if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                tags.setMainField4([this._updatedState.getTextField4Type()]);
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
    _extractTextAndLayoutFromShow (show) {
        const newShow = new Show();
        newShow.setMainField1(show.getMainField1());
        newShow.setMainField2(show.getMainField2());
        newShow.setMainField3(show.getMainField3());
        newShow.setMainField4(show.getMainField4());
        newShow.setTemplateTitle(show.getTemplateTitle());
        newShow.setMetadataTags(show.getMetadataTags());
        if (show.getAlignment() !== null && show.getAlignment() !== undefined) {
            newShow.setAlignment(show.getAlignment());
        }

        if (this._showRpcSupportsTemplateConfiguration()) {
            newShow.setTemplateConfiguration(show.getTemplateConfiguration());
        }
        return newShow;
    }

    /**
     * Clears out a Show's text fields
     * @private
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _setBlankTextFields (show) {
        show.setMainField1('');
        show.setMainField2('');
        show.setMainField3('');
        show.setMainField4('');
        show.setMediaTrack('');
        show.setTemplateTitle('');
        return show;
    }

    /**
     * Sets the template configuration information
     * @param {Show} show - A Show RPC Message.
     * @returns {Show} - The modified Show RPC Message.
     */
    _assembleLayout (show) {
        if (!this._showRpcSupportsTemplateConfiguration() || !this._shouldUpdateTemplateConfig()) {
            return show;
        }
        show.setTemplateConfiguration(this._updatedState.getTemplateConfiguration());
        return show;
    }

    /**
     * Updates the local state to match what was sent
     * @param {SetDisplayLayout} setDisplayLayout - A SetDisplayLayout RPC Message.
     */
    _updateCurrentScreenDataFromSetDisplayLayout (setDisplayLayout) {
        this._currentScreenData.setTemplateConfiguration(new TemplateConfiguration().setTemplate(setDisplayLayout.getDisplayLayout()).setDayColorScheme(setDisplayLayout.getDayColorScheme()).setNightColorScheme(setDisplayLayout.getNightColorScheme()));
        if (typeof this._currentScreenDataUpdateListener === 'function') {
            this._currentScreenDataUpdateListener(async () => {
                return this._currentScreenData;
            });
        }
    }

    /**
     * Updates the local state to match what was sent
     * @private
     * @param {Show} show - A Show RPC Message.
     */
    _updateCurrentScreenDataFromShow (show) {
        if (show === null || show === undefined) {
            console.error('Can not updateCurrentScreenDataFromShow from null or undefined show');
            return;
        }

        // This is intentionally checking `mainField1` for every textField because the fields may be in different places based on the capabilities, then check it's own field in case that's the only field thats being used.
        if (show.getMainField1() !== null && show.getMainField1() !== undefined) {
            this._currentScreenData.setTextField1(this._updatedState.getTextField1());
        }
        if ((show.getMainField1() !== null && show.getMainField1() !== undefined) || (show.getMainField2() !== null && show.getMainField2() !== undefined)) {
            this._currentScreenData.setTextField2(this._updatedState.getTextField2());
        }
        if ((show.getMainField1() !== null && show.getMainField1() !== undefined) || (show.getMainField3() !== null && show.getMainField3() !== undefined)) {
            this._currentScreenData.setTextField3(this._updatedState.getTextField3());
        }
        if ((show.getMainField1() !== null && show.getMainField1() !== undefined) || (show.getMainField4() !== null && show.getMainField4() !== undefined)) {
            this._currentScreenData.setTextField4(this._updatedState.getTextField4());
        }
        if (show.getTemplateTitle() !== null && show.getTemplateTitle() !== undefined) {
            this._currentScreenData.setTitle(this._updatedState.getTitle());
        }
        if (show.getMediaTrack() !== null && show.getMediaTrack() !== undefined) {
            this._currentScreenData.setMediaTrackTextField(this._updatedState.getMediaTrackTextField());
        }

        // This is intentionally checking show.metadataTags.mainField1 because the tags may be in different places based on the capabilities, then check its own field in case that's the only field that's being used.
        if (show.getMetadataTags() !== null && show.getMetadataTags() !== undefined) {
            if (show.getMetadataTags().getMainField1() !== null && show.getMetadataTags().getMainField1() !== undefined) {
                this._currentScreenData.setTextField1Type(this._updatedState.getTextField1Type());
            }
            if ((show.getMetadataTags().getMainField1() !== null && show.getMetadataTags().getMainField1() !== undefined) || (show.getMetadataTags().getMainField2() !== null && show.getMetadataTags().getMainField2() !== undefined)) {
                this._currentScreenData.setTextField2Type(this._updatedState.getTextField2Type());
            }
            if ((show.getMetadataTags().getMainField1() !== null && show.getMetadataTags().getMainField1() !== undefined) || (show.getMetadataTags().getMainField3() !== null && show.getMetadataTags().getMainField3() !== undefined)) {
                this._currentScreenData.setTextField3Type(this._updatedState.getTextField3Type());
            }
            if ((show.getMetadataTags().getMainField1() !== null && show.getMetadataTags().getMainField1() !== undefined) || (show.getMetadataTags().getMainField4() !== null && show.getMetadataTags().getMainField4() !== undefined)) {
                this._currentScreenData.setTextField4Type(this._updatedState.getTextField4Type());
            }
        }

        if (show.getAlignment() !== null && show.getAlignment() !== undefined) {
            this._currentScreenData.setTextAlignment(this._updatedState.getTextAlignment());
        }
        if (show.getGraphic() !== null && show.getGraphic() !== undefined) {
            this._currentScreenData.setPrimaryGraphic(this._updatedState.getPrimaryGraphic());
        }
        if (show.getSecondaryGraphic() !== null && show.getSecondaryGraphic() !== undefined) {
            this._currentScreenData.setSecondaryGraphic(this._updatedState.getSecondaryGraphic());
        }
        if (typeof this._currentScreenDataUpdateListener === 'function') {
            this._currentScreenDataUpdateListener(async () => {
                return this._currentScreenData;
            });
        }
    }

    /**
     * Check to see if the template configuration is supported
     * @private
     * @returns {Boolean} - True if template configuration is supported, false if not
     */
    _showRpcSupportsTemplateConfiguration () {
        if (this._lifecycleManager === null || this._lifecycleManager.getSdlMsgVersion() === null) {
            return false;
        }
        return this._lifecycleManager.getSdlMsgVersion().getMajorVersion() >= 6;
    }

    /**
     * Returns only valid main text fields
     * @private
     * @returns {String[]} - An array of strings representing the Show's textFields
     */
    _findValidMainTextFields () {
        const array = [];

        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            array.push(this._updatedState.getTextField1());
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            array.push(this._updatedState.getTextField2());
        }

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            array.push(this._updatedState.getTextField3());
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            array.push(this._updatedState.getTextField4());
        }

        return array;
    }

    /**
     * Returns only non-null metadata fields
     * @private
     * @returns {MetadataType[]} - An array of MetadataType, each item representing a textField.
     */
    _findNonNullMetadataFields () {
        const metadataArray = [];

        if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
            metadataArray.push(this._updatedState.getTextField1Type());
        }

        if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
            metadataArray.push(this._updatedState.getTextField2Type());
        }

        if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
            metadataArray.push(this._updatedState.getTextField3Type());
        }

        if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
            metadataArray.push(this._updatedState.getTextField4Type());
        }

        return metadataArray;
    }

    /**
     * Checks whether the primary image should be sent out
     * @private
     * @returns {Boolean} - Whether or not the primary image needs to be uploaded.
     */
    _shouldUpdatePrimaryImage () { // If the template is updating, we don't yet know it's capabilities. Just assume the template supports the primary image.
        const templateSupportsPrimaryArtwork = this._templateSupportsImageField(ImageFieldName.graphic) || this._shouldUpdateTemplateConfig();
        const currentScreenDataPrimaryGraphicName = (this._currentScreenData !== null && this._currentScreenData !== undefined && this._currentScreenData.getPrimaryGraphic() !== null && this._currentScreenData.getPrimaryGraphic() !== undefined) ? this._currentScreenData.getPrimaryGraphic().getName() : null;
        const primaryGraphicName = (this._updatedState.getPrimaryGraphic() !== null && this._updatedState.getPrimaryGraphic() !== undefined) ? this._updatedState.getPrimaryGraphic().getName() : null;

        const graphicNameMatchesExisting = currentScreenDataPrimaryGraphicName === primaryGraphicName;
        const shouldOverwriteGraphic = this._updatedState.getPrimaryGraphic() !== null && this._updatedState.getPrimaryGraphic().getOverwrite();

        return templateSupportsPrimaryArtwork && (shouldOverwriteGraphic || !graphicNameMatchesExisting);
    }

    /**
     * Checks whether the secondary image should be sent out
     * @private
     * @returns {Boolean} - Whether or not the secondary image needs to be uploaded.
     */
    _shouldUpdateSecondaryImage () {
        // If the template is updating, we don't yet know it's capabilities. Just assume the template supports the secondary image.
        const templateSupportsSecondaryArtwork = this._templateSupportsImageField(ImageFieldName.secondaryGraphic) || this._shouldUpdateTemplateConfig();
        const currentScreenDataSecondaryGraphicName = (this._currentScreenData !== null && this._currentScreenData !== undefined && this._currentScreenData.getSecondaryGraphic() !== null && this._currentScreenData.getSecondaryGraphic() !== undefined) ? this._currentScreenData.getSecondaryGraphic().getName() : null;
        const secondaryGraphicName = (this._updatedState.getSecondaryGraphic() !== null && this._updatedState.getSecondaryGraphic() !== undefined) ? this._updatedState.getSecondaryGraphic().getName() : null;

        const graphicNameMatchesExisting = currentScreenDataSecondaryGraphicName === secondaryGraphicName;
        const shouldOverwriteGraphic = this._updatedState.getSecondaryGraphic() !== null && this._updatedState.getSecondaryGraphic().getOverwrite();

        // Cannot detect if there is a secondary image below v5.0, so we'll just try to detect if the primary image is allowed and allow the secondary image if it is.
        if (this._lifecycleManager !== null && this._lifecycleManager.getSdlMsgVersion().getMajorVersion() >= 5) {
            return templateSupportsSecondaryArtwork && (shouldOverwriteGraphic || !graphicNameMatchesExisting);
        } else {
            return this._templateSupportsImageField(ImageFieldName.graphic) && (shouldOverwriteGraphic || !graphicNameMatchesExisting);
        }
    }

    /**
     * Check to see if template supports the specified image field
     * @private
     * @param {ImageFieldName} name - The image field name to check
     * @returns {Boolean} - True if image field is supported, false if not
     */
    _templateSupportsImageField (name) {
        return this._defaultMainWindowCapability === null || this._defaultMainWindowCapability === undefined || _ManagerUtility.hasImageFieldOfName(this._defaultMainWindowCapability, name);
    }

    /**
     * Check to see if mediaTrackTextField should be updated
     * @private
     * @returns {Boolean} - True if mediaTrackTextField should be updated, false if not
     */
    _shouldUpdateMediaTrackField () {
        // If the template is updating, we don't yet know it's capabilities. Just assume the template supports the media text field.
        return this._templateSupportsTextField(TextFieldName.mediaTrack) || this._shouldUpdateTemplateConfig();
    }

    /**
     * Check to see if title should be updated
     * @private
     * @returns {Boolean} - True if title should be updated, false if not
     */
    _shouldUpdateTitleField () {
        return  this._templateSupportsTextField(TextFieldName.templateTitle) || this._shouldUpdateTemplateConfig();
    }

    /**
     * Check to see if the template config should be updated
     * @private
     * @returns {Boolean} - True if templateConfiguration should be updated, false if not
     */
    _shouldUpdateTemplateConfig () {
        if (this._updatedState.getTemplateConfiguration() === null || this._updatedState.getTemplateConfiguration() === undefined) {
            return false;
        } else if (this._currentScreenData.getTemplateConfiguration() === null || this._currentScreenData.getTemplateConfiguration() === undefined) {
            return true;
        }

        return this._updatedState.getTemplateConfiguration().getParameters() !== this._currentScreenData.getTemplateConfiguration().getParameters();
    }

    /**
     * Check to see if template supports the specified text field
     * @private
     * @param {TextFieldName} name - The text field name to check
     * @returns {Boolean} - True if text field is supported, false if not
     */
    _templateSupportsTextField (name) {
        return this._defaultMainWindowCapability === null || this._defaultMainWindowCapability === undefined || _ManagerUtility.hasTextFieldOfName(this._defaultMainWindowCapability, name);
    }

    /**
     * Return the current screen data
     * @private
     * @returns {_TextAndGraphicState} - The current screen data
     */
    _getCurrentScreenData () {
        return this._currentScreenData;
    }

    /**
     * Set the current screen data
     * @private
     * @param {_TextAndGraphicState} show - A _TextAndGraphicState of the current screen data
     */
    _setCurrentScreenData (show) {
        this._currentScreenData = show;
    }

    /**
     * Method to be called once the task has completed
     * @private
     * @param {Boolean} success - Whether the task was successful
     */
    _finishOperation (success) {
        console.info('Finishing text and graphic update operation');
        if (typeof this._listener === 'function') {
            this._listener(success);
        }
        this.onFinished();
    }

    /**
     * Applies changes to the _TextAndGraphicState with that of the error state
     * @private
     * @param {_TextAndGraphicState} errorState - The _TextAndGraphicState when the error occured
     */
    _updateTargetStateWithErrorState (errorState) {
        if (errorState.getTextField1() === this._updatedState.getTextField1()) {
            this._updatedState.setTextField1(this._currentScreenData.getTextField1());
        }
        if (errorState.getTextField2() === this._updatedState.getTextField2()) {
            this._updatedState.setTextField2(this._currentScreenData.getTextField2());
        }
        if (errorState.getTextField3() === this._updatedState.getTextField3()) {
            this._updatedState.setTextField3(this._currentScreenData.getTextField3());
        }
        if (errorState.getTextField4() === this._updatedState.getTextField4()) {
            this._updatedState.setTextField4(this._currentScreenData.getTextField4());
        }
        if (errorState.getMediaTrackTextField() === this._updatedState.getMediaTrackTextField()) {
            this._updatedState.setMediaTrackTextField(this._currentScreenData.getMediaTrackTextField());
        }
        if (errorState.getTitle() === this._updatedState.getTitle()) {
            this._updatedState.setTitle(this._currentScreenData.getTitle());
        }
        if ((errorState.getPrimaryGraphic() === null && this._updatedState.getPrimaryGraphic() === null)
            || (errorState.getPrimaryGraphic() !== null && errorState.getPrimaryGraphic().equals(this._updatedState.getPrimaryGraphic()))) { // for safe null check
            this._updatedState.setPrimaryGraphic(this._currentScreenData.getPrimaryGraphic());
        }
        if ((errorState.getSecondaryGraphic() === null && this._updatedState.getSecondaryGraphic() === null)
            || (errorState.getSecondaryGraphic() !== null && errorState.getSecondaryGraphic().equals(this._updatedState.getSecondaryGraphic()))) { // for safe null check
            this._updatedState.setSecondaryGraphic(this._currentScreenData.getSecondaryGraphic());
        }
        if (errorState.getTextAlignment() === this._updatedState.getTextAlignment()) {
            this._updatedState.setTextAlignment(this._currentScreenData.getTextAlignment());
        }
        if (errorState.getTextField1Type() === this._updatedState.getTextField1Type()) {
            this._updatedState.setTextField1Type(this._currentScreenData.getTextField1Type());
        }
        if (errorState.getTextField2Type() === this._updatedState.getTextField2Type()) {
            this._updatedState.setTextField2Type(this._currentScreenData.getTextField2Type());
        }
        if (errorState.getTextField3Type() === this._updatedState.getTextField3Type()) {
            this._updatedState.setTextField3Type(this._currentScreenData.getTextField3Type());
        }
        if (errorState.getTextField4Type() === this._updatedState.getTextField4Type()) {
            this._updatedState.setTextField4Type(this._currentScreenData.getTextField4Type());
        }
        if ((errorState.getTemplateConfiguration() === null && this._updatedState.getTemplateConfiguration() === null)
            || (errorState.getTemplateConfiguration() !== null && errorState.getTemplateConfiguration().getParameters() === this._updatedState.getTemplateConfiguration().getParameters())) { // for safe null check
            this._updatedState.setTemplateConfiguration(this._currentScreenData.getTemplateConfiguration());
        }
    }
}

export { _TextAndGraphicUpdateOperation };