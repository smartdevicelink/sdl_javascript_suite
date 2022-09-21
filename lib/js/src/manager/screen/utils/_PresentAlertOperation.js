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

import { _Task } from '../../_Task';
import { _ManagerUtility } from '../../_ManagerUtility';
import { ImageFieldName } from '../../../rpc/enums/ImageFieldName';
import { SpeechCapabilities } from '../../../rpc/enums/SpeechCapabilities';
import { Alert } from '../../../rpc/messages/Alert';
import { FunctionID } from '../../../rpc/enums/FunctionID';
import { CancelInteraction } from '../../../rpc/messages/CancelInteraction';
import { _DispatchGroup } from './_DispatchGroup';

class _PresentAlertOperation extends _Task {
    /**
     * Initializes an instance of _PresentAlertOperation.
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {AlertView} alertView - An instance of AlertView.
     * @param {WindowCapability} currentCapabilities - The capabilities of the default main window.
     * @param {SpeechCapabilities[]|null} speechCapabilities - An array of SpeechCapabilities enums or null.
     * @param {FileManager} fileManager - An instance of FileManager.
     * @param {Number} cancelId - The ID to be used during CancelInteraction.
     * @param {Function} listener - Callback function that is used when operation has finished.
     * @param {_AlertSoftButtonClearListener} alertSoftButtonClearListener - Callback function that is used when operation has finished to clear the soft buttons from the manager.
     */
    constructor (lifecycleManager, alertView, currentCapabilities, speechCapabilities, fileManager = null, cancelId, listener, alertSoftButtonClearListener) {
        super();
        this._lifecycleManager = lifecycleManager;
        this._alertView = alertView.clone();
        this._currentWindowCapability = currentCapabilities;
        this._speechCapabilities = speechCapabilities;
        this._fileManager = fileManager;
        this._cancelId = cancelId;
        this._listener = listener;
        this._isAlertPresented = false;
        this._alertSoftButtonClearListener = alertSoftButtonClearListener;
        this._uploadedImageNames = new Set(); // stores a set of image name strings

        this._alertView.canceledListener = () => {
            this.cancelAlert();
        };
        alertView.canceledListener = this._alertView.canceledListener;
    }

    /**
     * The method that causes the task to run.
     * @param {_Task} task - The task instance
     */
    async onExecute (task) {
        await this._start();
    }

    /**
     * If the task is not canceled, starts to assemble the alert
     * @private
     * @returns {Promise} - This promise does not resolve to any value
     */
    async _start () {
        if (this.getState() === _Task.CANCELED) {
            this._finishOperation(false);
            return;
        }

        if (!this.isValidAlertViewData(this._alertView)) {
            if (this._alertView.getAudio() !== null && this._alertView.getAudio() !== undefined &&
                this._alertView.getAudio().getAudioData().length > 0) {
                console.log('The module does not support the use of only audio file data in an alert. ' +
                'The alert has no data and can not be sent to the module. ' +
                        'The use of audio file data in an alert is only supported on modules supporting RPC Spec v5.0 or newer');
            } else {
                console.log('The alert data is invalid.' +
                ' At least either text, secondaryText or audio needs to be provided. ' +
                        'Make sure to set at least the text, secondaryText or audio properties on the AlertView');
            }
            this._finishOperation(false, null);
            return;
        }

        return new Promise ((resolve) => {
            const uploadFilesTask = new _DispatchGroup();

            // Enter DispatchGroup twice for two tasks needing to be completed, One for uploading images and one for uploading audio files
            uploadFilesTask.enter();
            uploadFilesTask.enter();

            // DispatchGroup notify when all tasks are done
            uploadFilesTask.notify(async () => {
                await this.presentAlert();
                resolve();
            });

            // DispatchGroup Task 1: uploading images
            this.uploadImages((success) => {
                uploadFilesTask.leave();
            });
            // DispatchGroup Task 2: uploading audio files
            this.uploadAudioFiles((success) => {
                uploadFilesTask.leave();
            });
        });
    }

    /**
     * Upload the _AlertView audio files to the module.
     * @param {Function} listener - listener called when all audio files have been uploaded
     */
    async uploadAudioFiles (listener) {
        if (!this.supportsAlertAudioFile()) {
            console.log('Module does not support audio files for alerts, skipping upload of audio files');
            listener(true);
            return;
        }
        if (this._alertView.getAudio() === null || this._alertView.getAudio() === undefined ||
            this._alertView.getAudio().getAudioData() === null || this._alertView.getAudio().getAudioData() === undefined ||
            this._alertView.getAudio().getAudioData().length === 0) {
            console.log('No audio files need to be uploaded for alert');
            listener(true);
            return;
        }

        const filesToBeUploaded = [];
        for (const ttsChunk of this._alertView.getAudio().getAudioData()) {
            if (ttsChunk.getType() !== SpeechCapabilities.FILE) {
                continue;
            }

            const audioFile = this._alertView.getAudio()._getAudioFiles().get(ttsChunk.getText());
            if (this._fileManager === null || !this._fileManager.fileNeedsUpload(audioFile)) {
                continue;
            }

            filesToBeUploaded.push(audioFile);
        }

        if (filesToBeUploaded.length === 0) {
            console.log('No audio files need to be uploaded for alert');
            listener(true);
            return;
        }

        console.log('Uploading audio files for alert');

        if (this._fileManager !== null || this._fileManager !== undefined) {
            const successes = await this._fileManager.uploadFiles(filesToBeUploaded);

            if (this.getState() === _Task.CANCELED) {
                this._finishOperation(false, null);
                return;
            }
            if (successes !== null && successes !== undefined && successes.includes(false)) {
                console.log('Error uploading alert audio files');
            } else {
                console.log('All alert audio files uploaded');
            }
            listener(true);
            return;
        }
    }

    /**
     * Upload the alert icon and soft button images.
     * @param {Function} listener - CompletionListener called when all images have been uploaded.
     */
    async uploadImages (listener) {
        const artworksToBeUploaded = [];

        if (this.supportsAlertIcon() && this._alertView.getIcon() !== null && this._alertView.getIcon() !== undefined) {
            if (this._fileManager.fileNeedsUpload(this._alertView.getIcon())) {
                // If the file is not uploaded, attempt to upload it
                artworksToBeUploaded.push(this._alertView.getIcon());
            } else if (this._fileManager.hasUploadedFile(this._alertView.getIcon()) || this._alertView.getIcon().isStaticIcon()) {
                // If the file is already uploaded, add it to the uploaded set so we can show it
                this._uploadedImageNames.add(this._alertView.getIcon().getName());
            }
        }

        if (this._alertView.getSoftButtons() !== null && this._alertView.getSoftButtons() !== undefined) {
            for (let index = 0; index < this._getSoftButtonCount(); index++) {
                const objectState = this._alertView.getSoftButtons()[index].getCurrentState();
                if (this.supportsSoftButtonImages()) {
                    if (objectState !== null && objectState !== undefined && this._fileManager !== null && this._fileManager.fileNeedsUpload(objectState.getArtwork())) {
                        artworksToBeUploaded.push(objectState.getArtwork());
                    } else if (this._fileManager.hasUploadedFile(objectState.getArtwork()) || objectState.getArtwork().isStaticIcon()) {
                        this._uploadedImageNames.add(objectState.getArtwork().getName());
                    }
                }
            }
        }

        if (artworksToBeUploaded.length === 0) {
            console.log('No Images to upload for alert');
            listener(true);
            return;
        }

        console.log('Uploading images for alert');

        if (this._fileManager !== null && this._fileManager !== undefined) {
            const successes = await this._fileManager.uploadArtworks(artworksToBeUploaded);
            if (this.getState() === _Task.CANCELED) {
                console.log('Operation canceled');
                this._finishOperation(false, null);
                listener(false);
                return;
            }

            if (successes !== null && successes !== undefined && successes.includes(false)) {
                console.log('AlertManager artwork failed to upload with error');
            } else {
                console.log('All alert images uploaded');
            }
            artworksToBeUploaded.forEach(artwork => {
                this._uploadedImageNames.add(artwork.getName());
            });
            listener(true);
            return;
        }
    }

    /**
     * Presents the Alert in the window.
     */
    async presentAlert () {
        if (this.getState() === _Task.CANCELED) {
            console.log('Operation canceled');
            this._finishOperation(false, null);
            return;
        }
        this._isAlertPresented = true;

        const alert = this.alertRpc();
        const response = await this._lifecycleManager.sendRpcResolve(alert);
        if (!response.getSuccess()) {
            console.log(`There was an error presenting the alert: ${response.getInfo()}`);
        } else {
            console.log('Alert finished presenting');
        }
        this._finishOperation(response.getSuccess(), response.getTryAgainTime());
    }

    /**
     * Sends a CancelInteraction to cancel the Alert.
     */
    async cancelAlert () {
        if (this.getState() === _Task.FINISHED) {
            console.log('This operation has already finished so it can not be canceled');
            return;
        } else if (this.getState() === _Task.CANCELED) {
            console.log('This operation has already been canceled. It will be finished at some point during the operation.');
            return;
        } else if (this.getState() === _Task.IN_PROGRESS) {
            if (this._lifecycleManager !== null && this._lifecycleManager.getSdlMsgVersion() !== null && this._lifecycleManager.getSdlMsgVersion().getMajorVersion() < 6) {
                console.log('Attempting to cancel this operation in-progress; if the alert is already presented on the module, it cannot be dismissed.');
                this.switchStates(_Task.CANCELED);
                return;
            } else if (!this._isAlertPresented) {
                console.log('Alert has not yet been sent to the module. Alert will not be shown.');
                this.switchStates(_Task.CANCELED);
                return;
            }
            console.log('Canceling the presented alert');

            const cancelInteraction = new CancelInteraction()
                .setFunctionIDParam(FunctionID.Alert)
                .setCancelID(this._cancelId);
            const response = await this._lifecycleManager.sendRpcResolve(cancelInteraction);
            if (!response.getSuccess()) {
                console.log(`Error canceling the presented alert: ${response.getInfo()}`);
                this.onFinished();
                return;
            }
            console.log('The presented alert was canceled successfully');
            this.onFinished();
        } else {
            console.log('Cancelling an alert that has not yet started');
            this.switchStates(_Task.CANCELED);
        }
    }

    /**
     * Creates an Alert from the _AlertView.
     * @returns {Alert} - The Alert created from the AlertView.
     */
    alertRpc () {
        let alert = new Alert();
        alert = this.assembleAlertText(alert);
        alert.setDuration(this._alertView.getTimeout() * 1000);

        if (this._alertView.getIcon() !== null && this._alertView.getIcon() !== undefined && this._uploadedImageNames.has(this._alertView.getIcon().getName())) {
            alert.setAlertIcon(this._alertView.getIcon().getImageRPC());
        }

        alert.setProgressIndicator(this._alertView.isShowWaitIndicator());
        alert.setCancelID(this._cancelId);

        if (this._alertView.getSoftButtons() !== null) {
            const softButtons = [];
            for (let index = 0; index < this._getSoftButtonCount(); index++) {
                softButtons.push(this._alertView.getSoftButtons()[index].getCurrentStateSoftButton());
            }
            alert.setSoftButtons(softButtons);
        }

        if (this._alertView.getAudio() !== null) {
            alert.setPlayTone(this._alertView.getAudio().isPlayTone());
            const chunks = this.getTTSChunksForAlert(this._alertView);
            if (chunks) {
                alert.setTtsChunks(chunks);
            }
        }
        return alert;
    }

    /**
     * Limits the number of SoftButtons that can be set in the AlertRPC to 4
     *
     * @returns {Number} The maximum number of soft buttons that can be sent to the module
     */
    _getSoftButtonCount () {
        return this._alertView.getSoftButtons().length <= 4 ? this._alertView.getSoftButtons().length : _PresentAlertOperation.SOFTBUTTON_COUNT;
    }

    /**
     * Pulls the TTSChunks from the AlertAudioData.
     * @param {AlertView} alertView - An AlertAudioData instance.
     * @returns {TTSChunk[]} - An array of TTSChunks.
     */
    getTTSChunksForAlert (alertView) {
        const alertAudioData = alertView.getAudio();
        const ttsChunks = [];

        for (const chunk of alertAudioData.getAudioData()) {
            if (chunk.getType() === SpeechCapabilities.FILE && !this.supportsAlertAudioFile()) {
                continue;
            }
            ttsChunks.push(chunk);
        }

        return ttsChunks.length > 0 ? ttsChunks : null;
    }

    /**
     * Assembles the text for the Alert.
     * @param {Alert} alert - An instance of Alert.
     * @returns {Alert} - An instance of Alert.
     */
    assembleAlertText (alert = null) {
        const nonNullFields = this.findNonNullTextFields();
        if (nonNullFields.length === 0) {
            return alert;
        }
        const numberOfLines = this._currentWindowCapability !== null ? _ManagerUtility.getMaxNumberOfAlertFieldLines(this._currentWindowCapability) : 3;
        switch (numberOfLines) {
            case 1:
                alert = this.assembleOneLineAlertText(alert, nonNullFields);
                break;
            case 2:
                alert = this.assembleTwoLineAlertText(alert, nonNullFields);
                break;
            case 3:
                alert = this.assembleThreeLineAlertText(alert, nonNullFields);
                break;
        }
        return alert;
    }

    /**
     * Pulls all non-empty text fields from the _AlertView.
     * @returns {String[]} - An array of non-empty text fields.
     */
    findNonNullTextFields () {
        const list = [];

        if (this._alertView.getText() !== null && this._alertView.getText() !== undefined && this._alertView.getText().length > 0) {
            list.push(this._alertView.getText());
        }

        if (this._alertView.getSecondaryText() !== null && this._alertView.getSecondaryText() !== undefined && this._alertView.getSecondaryText().length > 0) {
            list.push(this._alertView.getSecondaryText());
        }

        if (this._alertView.getTertiaryText() !== null && this._alertView.getTertiaryText() !== undefined && this._alertView.getTertiaryText().length > 0) {
            list.push(this._alertView.getTertiaryText());
        }

        return list;
    }

    /**
     * Sets the Alert's text information.
     * @param {Alert} alert - An Alert RPC.
     * @param {String[]} alertFields - The Alert text fields.
     * @returns {Alert} - The modified Alert.
     */
    assembleOneLineAlertText (alert, alertFields) {
        let alertString1 = '';
        for (let index = 0; index < alertFields.length; index++) {
            if (index > 0) {
                alertString1 += ` - ${alertFields[index]}`;
            } else {
                alertString1 += `${alertFields[index]}`;
            }
        }
        alert.setAlertText1(alertString1.toString());
        return alert;
    }

    /**
     * Sets the Alert's text information.
     * @param {Alert} alert - An Alert RPC.
     * @param {String[]} alertFields - The Alert text fields.
     * @returns {Alert} - The modified Alert.
     */
    assembleTwoLineAlertText (alert, alertFields) {
        if (alertFields.length <= 2) {
            alert.setAlertText1(alertFields.length > 0 ? alertFields[0] : null);
            alert.setAlertText2(alertFields.length > 1 ? alertFields[1] : null);
        } else {
            alert.setAlertText1(alertFields.length > 0 ? alertFields[0] : null);
            alert.setAlertText2(`${alertFields[1]} - ${alertFields[2]}`);
        }
        return alert;
    }

    /**
     * Sets the Alert's text information.
     * @param {Alert} alert - An Alert RPC.
     * @param {String[]} alertFields - The Alert text fields.
     * @returns {Alert} - The modified Alert.
     */
    assembleThreeLineAlertText (alert, alertFields) {
        alert.setAlertText1(alertFields.length > 0 ? alertFields[0] : null);
        alert.setAlertText2(alertFields.length > 1 ? alertFields[1] : null);
        alert.setAlertText3(alertFields.length > 2 ? alertFields[2] : null);
        return alert;
    }

    /**
     * Check to see if template supports soft button images.
     * @returns {Boolean} - True if soft button images are supported, false if not.
     */
    supportsSoftButtonImages () {
        if (this._currentWindowCapability === null
            || this._currentWindowCapability === undefined
            || this._currentWindowCapability.getSoftButtonCapabilities() === null
            || this._currentWindowCapability.getSoftButtonCapabilities() === undefined
            || this._currentWindowCapability.getSoftButtonCapabilities().length === 0) {
            return true; // return true if non-existant soft button capability
        }
        const softButtonCapabilities = this._currentWindowCapability.getSoftButtonCapabilities()[0];
        return softButtonCapabilities.getImageSupported();
    }

    /**
     * Check to see if template supports Alert audio files.
     * @returns {Boolean} - True if Alert audio files are supported, false if not.
     */
    supportsAlertAudioFile () {
        return (this._lifecycleManager !== null && this._lifecycleManager !== undefined
             && this._lifecycleManager.getSdlMsgVersion() !== null && this._lifecycleManager.getSdlMsgVersion() !== undefined
             && this._lifecycleManager.getSdlMsgVersion().getMajorVersion() >= 5
             && this._speechCapabilities !== null && this._speechCapabilities.includes(SpeechCapabilities.FILE));
    }

    /**
     * Check to see if template supports Alert icons.
     * @returns {Boolean} - True if Alert icons are supported, false if not.
     */
    supportsAlertIcon () {
        return _ManagerUtility.hasImageFieldOfName(this._currentWindowCapability, ImageFieldName.alertIcon);
    }

    /**
     * Checks the `AlertView` data to make sure it conforms to the RPC Spec, which says that at least either `alertText1`, `alertText2` or `TTSChunks` need to be provided.
     * @param {AlertView} alertView - Alert data that needs to be presented
     * @returns {Boolean} true if AlertView data conforms to RPC Spec
     */
    isValidAlertViewData (alertView) {
        if ((alertView.getText() !== null && alertView.getText() !== undefined && alertView.getText().length > 0)
            || (alertView.getSecondaryText() !== null && alertView.getSecondaryText() !== undefined && alertView.getSecondaryText().length > 0)
            || (alertView.getAudio() !== null && alertView.getAudio() !== undefined && this.getTTSChunksForAlert(this._alertView) !== null)) {
            return true;
        }
        return false;
    }

    /**
     * Method to be called once the task has completed.
     * @private
     * @param {Boolean} success - Whether the task was successful.
     * @param {Number} tryAgainTime - Try again time.
     */
    _finishOperation (success, tryAgainTime) {
        console.log('Finishing present alert operation');
        if (this._listener !== null && this._listener !== undefined) {
            this._listener.onComplete(success, tryAgainTime);
        }
        // If alertView has SoftButtons, we need to clear out their references in BaseAlertManager
        if (this._alertView.getSoftButtons() !== null) {
            this._alertSoftButtonClearListener.onButtonClear(this._alertView.getSoftButtons());
        }
        this.onFinished();
    }
}

_PresentAlertOperation.SOFTBUTTON_COUNT = 4;

export { _PresentAlertOperation };
