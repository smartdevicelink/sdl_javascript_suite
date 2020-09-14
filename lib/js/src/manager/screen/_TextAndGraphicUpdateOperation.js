import { _Task } from '../_Task';
import { Show } from '../../rpc/messages/Show';
import { ImageFieldName } from '../../rpc/enums/ImageFieldName';
import { _ManagerUtility } from '../_ManagerUtility';
import { MetadataTags } from '../../rpc/structs/MetadataTags';
import { TextFieldName } from '../../rpc/enums/TextFieldName';

class _TextAndGraphicUpdateOperation extends _Task {
    constructor (lifecycleManager, fileManager, currentCapabilities, currentScreenData, newState, listener, currentScreenDataUpdateListener) {
        super();
        this._lifecycleManager = lifecycleManager;
        this._fileManager = fileManager;
        this._defaultMainWindowCapability = currentCapabilities;
        this._currentScreenData = currentScreenData;
        this._updatedState = newState;
        this._listener = listener;
        this._currentScreenDataUpdateListener = currentScreenDataUpdateListener;
    }

    onExecute () {
        this._start();
    }

    async _start () {
        if (this.getState() === _Task.CANCELED) {
            this._finishOperation(false);
            return;
        }
        let fullShow = new Show().setAlignment(this._updatedState.getTextAlignment());
        fullShow = this._assembleShowText(fullShow);
        fullShow = this._assembleShowImages(fullShow);

        if (!this._shouldUpdatePrimaryImage() && !this._shouldUpdateSecondaryImage()) {
            console.info('No images to send, sending text');
            const response = await this._sendShow(this._extractTextFromShow(fullShow));
            this._finishOperation(response.getSuccess());
        } else if (!this._sdlArtworkNeedsUpload(this._updatedState.getPrimaryGraphic()) && !this._sdlArtworkNeedsUpload(this._updatedState.getSecondaryGraphic())) {
            console.info('Images already uploaded, sending full update');
            const response = await this._sendShow(fullShow);
            this._finishOperation(response.getSuccess());
        } else {
            console.info('Images need to be uploaded, sending text and uploading images');
            const response = await this._sendShow(this._extractTextFromShow(fullShow));
            if (this.getState() === _Task.CANCELED) {
                this._finishOperation(false);
                return;
            }
            await this._uploadImagesAndSendWhenDone();
            this._finishOperation(response.getSuccess());
        }
    }

    async _sendShow (show) {
        const response = await this._lifecycleManager.sendRpcResolve();
        console.info('Text and Graphic update complete');
        if (response.getSuccess()) {
            this._updateCurrentScreenDataFromShow(show);
        }
        return response.getSuccess();
    }

    async _uploadImagesAndSendWhenDone () {
        const success = await this._uploadImages();
        const showWithGraphics = this._createImageOnlyShowWithPrimaryArtwork(this._updatedState.getPrimaryGraphic(), this._updatedState.getSecondaryGraphic());
        if (showWithGraphics !== null && showWithGraphics !== undefined) {
            console.info('Sending update with the successfully uploaded images');
            await this._sendShow(showWithGraphics);
            return success;
        } else {
            console.warn('All images failed to upload. No graphics to show, skipping update.');
            return false;
        }
    }

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

    _assembleShowImages (show) {
        if (this._shouldUpdatePrimaryImage()) {
            show.setSecondaryGraphic(this._updatedState.getSecondaryGraphic().getImageRPC());
        }
        if (this._shouldUpdateSecondaryImage()) {
            show.setSecondaryGraphic(this._updatedState.getSecondaryGraphic().getImageRPC());
        }

        return show;
    }

    _createImageOnlyShowWithPrimaryArtwork (primaryArtwork, secondaryArtwork) {
        const newShow = new Show();
        newShow.setGraphic((primaryArtwork !== null && primaryArtwork !== undefined && !(this._sdlArtworkNeedsUpload(primaryArtwork))) ? primaryArtwork.getImageRPC() : null);
        newShow.setSecondaryGraphic((secondaryArtwork !== null && secondaryArtwork !== undefined && !(this._sdlArtworkNeedsUpload(secondaryArtwork))) ? secondaryArtwork.getImageRPC() : null);
        if ((newShow.getGraphic() === null || newShow.getGraphic() === undefined) && (newShow.getSecondaryGraphic() === null || newShow.getSecondaryGraphic() === undefined)) {
            console.info('No graphics to upload');
            return null;
        }
        return newShow;
    }

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

        const numberOfLines = (this._defaultMainWindowCapability !== null && this._defaultMainWindowCapability !== undefined) ? _ManagerUtility.getMaxNumberOfMainFieldLines(this._defaultMainWindowCapability) : 4;

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

    _assembleOneLineShowText (show, showFields) {
        const showString1 = '';
        for (let i = 0; i < showFields.size(); i++) {
            if (i > 0) {
                showString1.concat(' - ').concat(showFields[i]);
            } else {
                showString1.concat(showFields[i]);
            }
        }
        show.setMainField1(showString1.toString());
        const tags = new MetadataTags();
        tags.setMainField1(this._findNonNullMetadataFields());
        show.setMetadataTags(tags);

        return show;
    }

    _assembleTwoLineShowText (show) {
        let tempString = '';
        const tags = new MetadataTags();

        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            tempString.concat(this._updatedState.getTextField1());
            if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
                tags.setMainField1(this._updatedState.getTextField1Type());
            }
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            if ((this._updatedState.getTextField3() === null || this._updatedState.getTextField3() === undefined || !(this._updatedState.getTextField3().length > 0)) && (this._updatedState.getTextField4() === null || this._updatedState.getTextField4() === undefined || !(this._updatedState.getTextField4().length > 0))) {
                // text does not exist in slots 3 or 4, put text2 in slot 2
                show.setMainField2(this._updatedState.getTextField2());
                if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                    tags.setMainField2(this._updatedState.getTextField2Type());
                }
            } else if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
                // If text 1 exists, put it in slot 1 formatted
                tempString.concat(' - ').concat(this._updatedState.getTextField2());
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
                tempString.concat(this._updatedState.getTextField2());
                if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                    tags.setMainField1(this._updatedState.getTextField2Type());
                }
            }
        }

        // set mainField1
        show.setMainField1(tempString);

        // new stringBuilder object
        tempString = '';

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            // If text 3 exists, put it in slot 2
            tempString.concat(this._updatedState.getTextField3());
            if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                const typeList = [];
                typeList.push(this._updatedState.getTextField3Type());
                tags.setMainField2(typeList);
            }
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
                // If text 3 exists, put it in slot 2 formatted
                tempString.concat(' - ').concat(this._updatedState.getTextField4());
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    const typeList = [];
                    typeList.push(this._updatedState.getTextField4Type());
                    if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                        typeList.add(this._updatedState.getTextField3Type());
                    }
                    tags.setMainField2(typeList);
                }
            } else {
                // If text 3 does not exist, put it in slot 3 unformatted
                tempString.concat(this._updatedState.getTextField4());
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    tags.setMainField2(this._updatedState.getTextField4Type());
                }
            }
        }

        if (tempString.length > 0) {
            show.setMainField2(tempString.toString());
        }

        show.setMetadataTags(tags);
        return show;
    }

    _assembleThreeLineShowText (show) {
        const tags = new MetadataTags();

        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            show.setMainField1(this._updatedState.getTextField1());
            if (this._updatedState.getTextField1Type() !== null && this._updatedState.getTextField1Type() !== undefined) {
                tags.setMainField1(this._updatedState.getTextField1Type());
            }
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            show.setMainField2(this._updatedState.getTextField2());
            if (this._updatedState.getTextField2Type() !== null && this._updatedState.getTextField2Type() !== undefined) {
                tags.setMainField2(this._updatedState.getTextField2Type());
            }
        }

        const tempString = '';

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            tempString.append(this._updatedState.getTextField3());
            if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                tags.setMainField3(this._updatedState.getTextField3Type());
            }
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
                // If text 3 exists, put it in slot 3 formatted
                tempString.concat(' - ').concat(this._updatedState.getTextField4());
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
                tempString.concat(this._updatedState.getTextField4());
                if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                    tags.setMainField3(this._updatedState.getTextField4Type());
                }
            }
        }
        show.setMainField3(tempString);
        show.setMetadataTags(tags);
        return show;
    }

    _assembleFourLineShowText (show) {
        const tags = new MetadataTags();
        if (this._updatedState.getTextField1() !== null && this._updatedState.getTextField1() !== undefined && this._updatedState.getTextField1().length > 0) {
            show.setMainField1(this._updatedState.getTextField1());
            if (this._updatedState.getTextField1Type() !== null) {
                tags.setMainField1(this._updatedState.getTextField1Type());
            }
        }

        if (this._updatedState.getTextField2() !== null && this._updatedState.getTextField2() !== undefined && this._updatedState.getTextField2().length > 0) {
            show.setMainField2(this._updatedState.getTextField2());
            if (this._updatedState.getTextField2Type() !== null) {
                tags.setMainField2(this._updatedState.getTextField2Type());
            }
        }

        if (this._updatedState.getTextField3() !== null && this._updatedState.getTextField3() !== undefined && this._updatedState.getTextField3().length > 0) {
            show.setMainField3(this._updatedState.getTextField3());
            if (this._updatedState.getTextField3Type() !== null && this._updatedState.getTextField3Type() !== undefined) {
                tags.setMainField3(this._updatedState.getTextField3Type());
            }
        }

        if (this._updatedState.getTextField4() !== null && this._updatedState.getTextField4() !== undefined && this._updatedState.getTextField4().length > 0) {
            show.setMainField4(this._updatedState.getTextField4());
            if (this._updatedState.getTextField4Type() !== null && this._updatedState.getTextField4Type() !== undefined) {
                tags.setMainField4(this._updatedState.getTextField4Type());
            }
        }

        show.setMetadataTags(tags);

        return show;
    }

    _extractTextFromShow (show) {
        const newShow = new Show();
        newShow.setMainField1(show.getMainField1());
        newShow.setMainField2(show.getMainField2());
        newShow.setMainField3(show.getMainField3());
        newShow.setMainField4(show.getMainField4());
        newShow.setTemplateTitle(show.getTemplateTitle());
        newShow.setMetadataTags(show.getMetadataTags());
        newShow.setAlignment(show.getAlignment());

        return newShow;
    }

    _setBlankTextFields (show) {
        show.setMainField1('');
        show.setMainField2('');
        show.setMainField3('');
        show.setMainField4('');
        show.setMediaTrack('');
        show.setTemplateTitle('');
        return show;
    }

    _updateCurrentScreenDataFromShow (show) {
        if (show === null || show === undefined) {
            console.error('Can not updateCurrentScreenDataFromShow from null or undefined show');
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
        if (this._currentScreenDataUpdateListener !== null && this._currentScreenDataUpdateListener !== undefined) {
            this._currentScreenDataUpdateListener(this._currentScreenData);
        }
    }

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

    _sdlArtworkNeedsUpload (artwork) {
        if (this._fileManager !== null && this._fileManager !== undefined) {
            return artwork !== null && artwork !== undefined && !this._fileManager.hasUploadedFile(artwork) && !artwork.isStaticIcon();
        }
        return false;
    }

    _shouldUpdatePrimaryImage () {
        const templateSupportsPrimaryArtwork = this._templateSupportsImageField(ImageFieldName.graphic);
        const currentScreenDataPrimaryGraphicName = (this._currentScreenData !== null && this._currentScreenData !== undefined && this._currentScreenData.getGraphic() !== null && this._currentScreenData.getGraphic() !== undefined) ? this._currentScreenData.getGraphic().getValue() : null;
        const primaryGraphicName = (this._updatedState.getPrimaryGraphic() !== null && this._updatedState.getPrimaryGraphic() !== undefined) ? this._updatedState.getPrimaryGraphic().getName() : null;

        const graphicMatchesExisting = currentScreenDataPrimaryGraphicName === primaryGraphicName;

        return templateSupportsPrimaryArtwork && !graphicMatchesExisting;
    }

    _shouldUpdateSecondaryImage () {
        const templateSupportsSecondaryArtwork = this._templateSupportsImageField(ImageFieldName.secondaryGraphic);
        const currentScreenDataSecondaryGraphicName = (this._currentScreenData !== null && this._currentScreenData !== undefined && this._currentScreenData.getSecondaryGraphic() !== null && this._currentScreenData.getSecondaryGraphic() !== undefined) ? this._currentScreenData.getSecondaryGraphic().getValue() : null;
        const secondaryGraphicName = (this._updatedState.getSecondaryGraphic() !== null && this._updatedState.getSecondaryGraphic() !== undefined) ? this._updatedState.getSecondaryGraphic().getName() : null;

        const graphicMatchesExisting = currentScreenDataSecondaryGraphicName === secondaryGraphicName;

        // Cannot detect if there is a secondary image below v5.0, so we'll just try to detect if the primary image is allowed and allow the secondary image if it is.
        if (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() >= 5) {
            return templateSupportsSecondaryArtwork && !graphicMatchesExisting;
        } else {
            return this._templateSupportsImageField(ImageFieldName.graphic) && !graphicMatchesExisting;
        }
    }

    _templateSupportsImageField (name) {
        return this._defaultMainWindowCapability === null || this._defaultMainWindowCapability === undefined || _ManagerUtility.hasImageFieldOfName(this._defaultMainWindowCapability, name);
    }

    _shouldUpdateMediaTrackField () {
        return this._templateSupportsTextField(TextFieldName.mediaTrack);
    }

    _shouldUpdateTitleField () {
        return  this._templateSupportsTextField(TextFieldName.templateTitle);
    }

    _templateSupportsTextField (name) {
        return this._defaultMainWindowCapability === null || this._defaultMainWindowCapability === undefined || _ManagerUtility.hasTextFieldOfName(this._defaultMainWindowCapability, name);
    }

    _getCurrentScreenData () {
        return this._currentScreenData;
    }

    _setCurrentScreenData (show) {
        this._currentScreenData = show;
    }

    _finishOperation (success) {
        console.info('Finishing text and graphic update operation');
        if (this._listener !== null && this._listener !== null) {
            this._listener(success);
        }
        this._onFinished();
    }
}

export { _TextAndGraphicUpdateOperation };