import { _Task } from '../_Task';
import { _ManagerUtility } from '../_ManagerUtility';
import { ImageFieldName } from '../../rpc/enums/ImageFieldName';
import { SpeechCapabilities } from '../../rpc/enums/SpeechCapabilities';
import { TTSChunk } from '../../rpc/enums/TTSChunk';
import { Alert } from '../../rpc/messages/Alert';
import { FunctionID } from '../../rpc/enums/FunctionID';
import { CancelInteraction } from '../../rpc/messages/CancelInteraction';
import { _DispatchGroup } from './_DispatchGroup';

class _PresentAlertOperation extends _Task {
    constructor (lifecycleManager, alertView, currentCapabilities, speechCapabilities, fileManager, cancelId, listener) {
        super();
        this._lifecycleManager = lifecycleManager;
        this._alertView = alertView;
        this._defaultMainWindowCapability = currentCapabilities;
        this._speechCapabilities = speechCapabilities;
        this._fileManager = fileManager;
        this._cancelId = cancelId;
        this._listener = listener;
    }

    onExecute (task) {
        this._start();
    }

    async _start () {
        if (this.getState() === _Task.CANCELED) {
            this._finishOperation(false);
            return;
        }

        if (!this.isValidAlertViewData(this._alertView)) {
            if (this.alertView.getAudio() !== null && this.alertView.getAudio() !== undefined &&
                this._alertView.getAudio().getAudioFiles() !== null && this._alertView.getAudio().getAudioFiles() !== undefined &&
                this._alertView.getAudio().getAudioFiles().length > 0) {
                console.log('The module does not support the use of only audio file data in an alert. ' +
                'The alert has no data and can not be sent to the module. ' +
                        'The use of audio file data in an alert is only supported on modules supporting RPC Spec v5.0 or newer');
            } else {
                console.log('The alert data is invalid.' +
                ' At least either text, secondaryText or audio needs to be provided. ' +
                        'Make sure to set at least the text, secondaryText or audio properties on the AlertView');
            }
            this.finishOperation(false, null);
            return;
        }
        const uploadFilesTask = new _DispatchGroup();

        uploadFilesTask.enter();
        uploadFilesTask.enter();

        uploadFilesTask.notify(function () {
            this._presentAlert();
        });

        let success = await this.checkForImagesAndUpload();
        uploadFilesTask.leave();
        success = await this.uploadAudioFiles();
        uploadFilesTask.leave();
    }

    async uploadAudioFiles () {
        if (this._alertView.getAudio() === null || this._alertView.getAudio() === undefined) {
            console.log('No audio sent for alert');
            return true;
        }
        if (!this.supportsAlertAudioFile()) {
            console.log('Module does not support audio files for alerts');
            return true;
        }

        if (this._alertView.getAudio().getAudioFiles() === null || this._alertView.getAudio().getAudioFiles() === undefined || this._alertView.getAudio().getAudioFiles().length === 0) {
            console.log('No audio files to upload for alert');
            return true;
        }

        const filesToBeUploaded = [];
        for (const file of this._alertView.getAudio().getAudioFiles()) {
            if (!this.fileNeedsUpload(file)) {
                break;
            }
            filesToBeUploaded.push(file);
        }

        if (filesToBeUploaded.length === 0) {
            console.log('No audio files need to be uploaded for alert');
            return true;
        }

        console.log('Uploading audio files for alert');

        if (this._fileManager !== null || this._fileManager !== undefined) {
            const successes = await this._fileManager.uploadFiles(this._alertView.getAudio().getAudioFiles());

            if (this.getState() === _Task.CANCELED) {
                this.finishOperation(false, null);
                return;
            }
            if (successes !== null && successes !== undefined && !successes.includes(false)) {
                console.log(`Error uploading alert audio files:${successes.toString()}`);
            } else {
                console.log('All alert audio files uploaded');
            }
            return true;
        }
    }

    async checkForImagesAndUpload () {
        const artworksToBeUploaded = [];

        if (this.supportsAlertIcon() && this.artworkNeedsUploaded(this._alertView.getIcon())) {
            artworksToBeUploaded.push(this._alertView.getIcon());
        }

        if (this._alertView.getSoftButtons() !== null && this._alertView.getSoftButtons() !== undefined) {
            for (const object of this._alertView.getSoftButtons()) {
                if (this.supportsSoftButtonImages() && object.getCurrentState() !== null && object.getCurrentState() !== undefined && this.artworkNeedsUploaded(object.getCurrentState().getArtwork())) {
                    artworksToBeUploaded.push(object.getCurrentState().getArtwork());
                }
            }
        }

        return await this.uploadImages(artworksToBeUploaded);
    }

    async uploadImages (images) {
        if (images.length === 0) {
            console.log('No Images to upload for alert');
            return true;
        }

        console.log('Uploading images for alert');

        if (this._fileManager !== null && this._fileManager !== undefined) {
            const successes = await this._fileManager.uploadArtworks(images);
            if (this.getState() === _Task.CANCELED) {
                console.log('Operation canceled');
                this.finishOperation(false, null);
                return;
            }

            if (successes !== null && successes !== undefined && !successes.includes(false)) {
                console.log(`AlertManager artwork failed to upload with error: ${successes.toString()}`);
                return false;
            } else {
                console.log('All alert images uploaded');
                return true;
            }
        }
    }

    async presentAlert () {
        const alert = this.createAlert();
        const response = await this._lifecycleManager.sendRpcResolve(alert);
        if (this.getState() === _Task.CANCELED) {
            this.finishOperation(false, null);
            return;
        }
        if (!response.getSuccess()) {
            console.log(response.getInfo());
        }
        this.finishOperation(response.getSuccess(), response.getTryAgainTime());
    }

    async cancelAlert () {
        if (this.getState() === _Task.FINISHED) {
            console.logInfo('This operation has already finished so it can not be canceled');
            return;
        } else if (this.getState() === _Task.CANCELED) {
            console.log('This operation has already been canceled. It will be finished at some point during the operation.');
            return;
        } else if (this.getState() === _Task.IN_PROGRESS) {
            await this.cancelInteraction();
        } else {
            console.log('Cancelling an alert that has not yet been sent to Core');
            this.switchStates(_Task.CANCELED);
        }
    }

    async cancelInteraction () {
        if (this._lifecycleManager !== null && this._lifecycleManager !== undefined && this._lifecycleManager.getSdlMsgVersion() !== null && this._lifecycleManager.getSdlMsgVersion() !== undefined && this._lifecycleManager.getSdlMsgVersion().getMajorVersion() < 6) {
            console.log('Canceling an alert is not supported on this module');
        }
        console.log('Canceling the presented alert');

        const cancelInteraction = new CancelInteraction(FunctionID.ALERT, this._cancelId);
        const response = await this._lifecycleManager.sendRPC(cancelInteraction);
        if (!response.getSuccess()) {
            console.log(`Error canceling the presented alert: ${response.getInfo()}`);
            this.onFinished();
            return;
        }
        console.log('The presented alert was canceled successfully');
        this.onFinished();
    }

    createAlert () {
        let alert = new Alert();
        alert = this.assembleAlertText(alert);
        alert.setDuration(this._alertView.getTimeout() * 1000);
        if (this._alertView.getIcon() !== null && this.supportsAlertIcon()) {
            alert.setAlertIcon(this._alertView.getIcon().getImageRPC());
        }
        alert.setProgressIndicator(this._alertView.isShowWaitIndicator());
        alert.setCancelID(this._cancelId);
        if (this._alertView.getSoftButtons() !== null) {
            const softButtons = [];
            for (const button of this._alertView.getSoftButtons()) {
                softButtons.push(button.getCurrentStateSoftButton());
            }
            alert.setSoftButtons(softButtons);
        }

        if (this._alertView.getAudio() !== null) {
            const alertAudioData = this._alertView.getAudio();
            alert.setPlayTone(alertAudioData.isPlayTone());
            const ttsChunks = this.getTTSChunksForAlert(alertAudioData);

            if (ttsChunks.length > 0) {
                alert.setTtsChunks(ttsChunks);
            }
        }
        return alert;
    }

    getTTSChunksForAlert (alertAudioData) {
        const ttsChunks = [];

        if (this.supportsAlertAudioFile() && alertAudioData.getAudioFiles() !== null && alertAudioData.getAudioFiles() !== undefined && alertAudioData.getAudioFiles().size() > 0) {
            for (const i = 0; i < alertAudioData.getAudioFiles().size(); i++) {
                ttsChunks.push(new TTSChunk(alertAudioData.getAudioFiles().get(i).getName(), SpeechCapabilities.FILE));
            }
        }

        if (alertAudioData.getPrompts() !== null && alertAudioData.getPrompts() !== undefined && alertAudioData.getPrompts().length > 0) {
            ttsChunks.concat(alertAudioData.getPrompts());
        }
        return ttsChunks;
    }

    assembleAlertText (alert) {
        const nonNullFields = this.findValidMainTextFields();
        if (nonNullFields.length === 0) {
            return alert;
        }
        const numberOfLines = this._defaultMainWindowCapability === null ? 3 : _ManagerUtility.WindowCapabilityUtility.getMaxNumberOfAlertFieldLines(this._defaultMainWindowCapability);
        switch (numberOfLines) {
            case 1:
                alert = this.assembleOneLineAlertText(alert, nonNullFields);
                break;
            case 2:
                alert = this.assembleTwoLineAlertText(alert);
                break;
            case 3:
                alert = this.assembleThreeLineAlertText(alert);
                break;
        }
        return alert;
    }

    findValidMainTextFields () {
        const array = [];

        if (this._alertView.getText() !== null && this._alertView.getText() !== undefined && this._alertView.getText().length > 0) {
            array.push(this._alertView.getText());
        }

        if (this._alertView.getSecondaryText() !== null && this._alertView.getSecondaryText() !== undefined && this._alertView.getSecondaryText().length > 0) {
            array.push(this._alertView.getSecondaryText());
        }

        if (this._alertView.getTertiaryText() !== null && this._alertView.getTertiaryText() !== undefined && this._alertView.getTertiaryText().length > 0) {
            array.push(this._alertView.getTertiaryText());
        }

        return array;
    }

    assembleOneLineAlertText (alert, alertFields) {
        let alertString1 = '';
        for (const i = 0; i < alertFields.length; i++) {
            if (i > 0) {
                alertString1 += ` - ${alertFields[i]}`;
            } else {
                alertString1 += `${alertFields[i]}`;
            }
        }
        alert.setAlertText1(alertString1.toString());
        return alert;
    }

    assembleTwoLineAlertText (alert) {
        if (this._alertView.getText() !== null && this._alertView.getText() !== undefined && this._alertView.getText().length > 0) {
            alert.setAlertText1(this._alertView.getText());
        }
        if (this._alertView.getSecondaryText() !== null && this._alertView.getSecondaryText() !== undefined && this._alertView.getSecondaryText().length > 0) {
            if ((this._alertView.getTertiaryText() === null || !(this._alertView.getTertiaryText().length > 0))) {
                // TertiaryText does not exist
                alert.setAlertText2(this._alertView.getSecondaryText());
            } else {
                // Text 3 exists, put secondaryText and TertiaryText in AlertText2
                alert.setAlertText2(`${this._alertView.getSecondaryText()} - ${this._alertView.getTertiaryText()}`);
            }
        }
        return alert;
    }

    assembleThreeLineAlertText (alert) {
        if (this._alertView.getText() !== null && this._alertView.getText !== undefined && this._alertView.getText().length > 0) {
            alert.setAlertText1(this._alertView.getText());
        }

        if (this._alertView.getSecondaryText() !== null && this._alertView.getSecondaryText() !== undefined && this._alertView.getSecondaryText().length > 0) {
            alert.setAlertText2(this._alertView.getSecondaryText());
        }

        if (this._alertView.getTertiaryText() !== null && this._alertView.getTertiaryText() !== undefined && this._alertView.getTertiaryText().length > 0) {
            alert.setAlertText3(this._alertView.getTertiaryText());
        }

        return alert;
    }

    artworkNeedsUploaded (artwork) {
        if (artwork !== null && artwork !== undefined && !artwork.isStaticIcon()) {
            return artwork.getOverwrite() || !this._fileManager.hasUploadedFile(artwork);
        }
        return false;
    }

    fileNeedsUpload (file) {
        if (file !== null && file !== undefined) {
            return file.getOverwrite() || !this._fileManager.hasUploadedFile(file);
        }
        return false;
    }

    supportsSoftButtonImages () {
        const softButtonCapabilities = this._defaultMainWindowCapability.getSoftButtonCapabilities()[0];
        return softButtonCapabilities.getImageSupported();
    }

    supportsAlertAudioFile () {
        return (this._lifecycleManager !== null && this._lifecycleManager !== undefined
             && this._lifecycleManager.getSdlMsgVersion() !== null && this._lifecycleManager.getSdlMsgVersion() !== undefined
             && this._lifecycleManager.getSdlMsgVersion().getMajorVersion() >= 5
             && this._speechCapabilities !== null && this._speechCapabilities.includes(SpeechCapabilities.FILE));
    }

    supportsAlertIcon () {
        return _ManagerUtility.WindowCapabilityUtility.hasImageFieldOfName(this._defaultMainWindowCapability, ImageFieldName.alertIcon);
    }

    isValidAlertViewData (alertView) {
        if (alertView.getText() !== null && alertView.getText() !== undefined && alertView.getText().length > 0) {
            return true;
        }
        if (alertView.getSecondaryText() !== null && alertView.getSecondaryText() !== undefined && alertView.getSecondaryText().length > 0) {
            return true;
        }
        if (alertView.getAudio() !== null && alertView.getAudio() !== undefined && this._getTTSChunksForAlert(alertView.getAudio()).length > 0) {
            return true;
        }
        return false;
    }

    finishOperation (success, tryAgainTime) {
        console.log('Finishing present alert operation');
        if (this._listener !== null && this._listener !== undefined) {
            this._listener(success, tryAgainTime);
        }
        this.onFinished();
    }
}

export { _PresentAlertOperation };