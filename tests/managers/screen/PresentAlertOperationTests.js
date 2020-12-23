const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('PresentAlertOperationTests', function () {
        const sdlManager = appClient._sdlManager;
        const lifecycleManager = sdlManager._lifecycleManager;
        const fileManager = sdlManager.getFileManager();
        let presentAlertOperation,
            alertView,
            testAlertArtwork,
            testSoftButtonArtwork,
            testAudio,
            alertAudioData,
            alertSoftButtonState,
            alertSoftButtonObject,
            defaultMainWindowCapability,
            speechCapabilities,
            alertCompletionListener;
        /**
         * Gets the windowCapability
         * @param {Number} numberOfAlertFields - number of lines
         * @returns {WindowCapability} - the capability
         */
        function getWindowCapability (numberOfAlertFields) {
            const alertText1 = new SDL.rpc.structs.TextField();
            alertText1.setNameParam(SDL.rpc.enums.TextFieldName.alertText1);
            const alertText2 = new SDL.rpc.structs.TextField();
            alertText2.setNameParam(SDL.rpc.enums.TextFieldName.alertText2);
            const alertText3 = new SDL.rpc.structs.TextField();
            alertText3.setNameParam(SDL.rpc.enums.TextFieldName.alertText3);
            const mainField4 = new SDL.rpc.structs.TextField();
            mainField4.setNameParam(SDL.rpc.enums.TextFieldName.mainField4);

            const textFieldList = [];

            textFieldList.push(alertText1);
            textFieldList.push(alertText2);
            textFieldList.push(alertText3);

            const returnList = [];

            if (numberOfAlertFields > 0) {
                for (let index = 0; index < numberOfAlertFields; index++) {
                    returnList.push(textFieldList[index]);
                }
            }

            const windowCapability = new SDL.rpc.structs.WindowCapability();
            windowCapability.setTextFields(returnList);

            const imageField = new SDL.rpc.structs.ImageField();
            imageField.setNameParam(SDL.rpc.enums.ImageFieldName.alertIcon);
            const imageFieldList = [];
            imageFieldList.push(imageField);
            windowCapability.setImageFields(imageFieldList);

            windowCapability.setImageFields(imageFieldList);

            const softButtonCapabilities = new SDL.rpc.structs.SoftButtonCapabilities();
            softButtonCapabilities.setImageSupported(true);
            softButtonCapabilities.setShortPressAvailable(true);
            softButtonCapabilities.setLongPressAvailable(true);
            softButtonCapabilities.setUpDownAvailable(true);
            softButtonCapabilities.setTextSupported(true);

            windowCapability.setSoftButtonCapabilities([softButtonCapabilities]);
            return windowCapability;
        }

        /**
         * Handle Alert successes.
         * @returns {Promise} - A promise.
         */
        function onAlertSuccess () {
            const alertResponse = new SDL.rpc.messages.AlertResponse({
                functionName: SDL.rpc.enums.FunctionID.AlertResponse,
            })
                .setSuccess(true);

            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(alertResponse);

            return new Promise((resolve, reject) => {
                resolve(alertResponse);
            });
        }

        /**
         * Handle cancel alerts.
         * @returns {Promise} - A promise.
         */
        function onCancelAlert () {
            const cancelResponse = new SDL.rpc.messages.CancelInteractionResponse({
                functionName: SDL.rpc.enums.FunctionID.CancelInteractionResponse,
            })
                .setSuccess(true);

            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(cancelResponse);

            return new Promise((resolve, reject) => {
                resolve(cancelResponse);
            });
        }

        /**
         * Sends successes when an artwork would be uploaded.
         * @param {SdlArtwork} artworks - A list of artworks to be uploaded
         * @returns {Promise} - Resolves to an array of booleans
         */
        function onArtworkUploadSuccess (artworks) {
            const successes = [].fill(true, 0, artworks.length);
            return new Promise((resolve, reject) => {
                resolve(successes);
            });
        }

        beforeEach(function (done) {
            testAlertArtwork = new SDL.manager.file.filetypes.SdlArtwork();
            testAlertArtwork.setName('testArtwork1');
            testAlertArtwork.setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);

            testSoftButtonArtwork = new SDL.manager.file.filetypes.SdlArtwork();
            testSoftButtonArtwork.setName('testArtwork2');
            testSoftButtonArtwork.setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);

            testAudio = new SDL.manager.file.filetypes.SdlFile('TestAudioFile', SDL.rpc.enums.FileType.AUDIO_MP3, null, false);

            alertAudioData = new SDL.manager.screen.utils.AlertAudioData('Spoken Sting');
            alertAudioData.setPlayTone(true);
            alertAudioData.addAudioFiles([testAudio]);

            alertSoftButtonState = new SDL.manager.screen.utils.SoftButtonState('state1', 'State 1', testSoftButtonArtwork);
            const onEventListener = null;
            alertSoftButtonObject = new SDL.manager.screen.utils.SoftButtonObject('Soft button 1', [alertSoftButtonState], 'state1', onEventListener);

            alertView = new SDL.manager.screen.utils.AlertView();
            alertView.setText('test');
            alertView.setSecondaryText('secondaryText');
            alertView.setTertiaryText('tertiaryText');
            alertView.setAudio(alertAudioData);
            alertView.setIcon(testAlertArtwork);
            alertView.setDefaultTimeout(10);
            alertView.setTimeout(5);
            alertView.setSoftButtons([alertSoftButtonObject]);
            alertView.setShowWaitIndicator(true);

            defaultMainWindowCapability = getWindowCapability(3);
            speechCapabilities = [];
            speechCapabilities.push(SDL.rpc.enums.SpeechCapabilities.FILE);
            alertCompletionListener = async () => {};
            presentAlertOperation = new SDL.manager.screen.utils._PresentAlertOperation(lifecycleManager, alertView, defaultMainWindowCapability, speechCapabilities, fileManager, 1, alertCompletionListener);
            done();
        });

        it('testPresentAlertTruncatedText', function (done) {
            const stub = sinon.stub(fileManager, 'hasUploadedFile')
                .callsFake(function () {
                    return false;
                });
            const alertStub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onAlertSuccess);
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });
            let windowCapability = getWindowCapability(1);
            let presentAlertOperation = new SDL.manager.screen.utils._PresentAlertOperation(lifecycleManager, alertView, windowCapability, speechCapabilities, fileManager, 1, function () {});
            let alert = presentAlertOperation.createAlert();

            Validator.assertEquals(alert.getAlertText1(), `${alertView.getText()} - ${alertView.getSecondaryText()} - ${alertView.getTertiaryText()}`);

            windowCapability = getWindowCapability(2);

            presentAlertOperation = new SDL.manager.screen.utils._PresentAlertOperation(lifecycleManager, alertView, windowCapability, speechCapabilities, fileManager, 1, function () {});
            alert = presentAlertOperation.createAlert();
            Validator.assertEquals(alert.getAlertText1(), alertView.getText());
            Validator.assertEquals(alert.getAlertText2(), `${alertView.getSecondaryText()} - ${alertView.getTertiaryText()}`);
            versionStub.restore();
            alertStub.restore();
            stub.restore();
            done();
        });

        it('testPresentAlertHappyPath', async function () {
            const alertStub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onAlertSuccess);
            const artStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onArtworkUploadSuccess);
            const fileStub = sinon.stub(fileManager, 'uploadFiles')
                .callsFake(onArtworkUploadSuccess);
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            // Test Images need to be uploaded, sending text and uploading images
            await presentAlertOperation._start();

            // Verifies that uploadArtworks gets called only with the fist presentAlertOperation.onExecute call
            Validator.assertTrue(artStub.calledOnce);
            Validator.assertTrue(fileStub.calledOnce);
            Validator.assertTrue(alertStub.calledOnce);

            versionStub.restore();
            fileStub.restore();
            artStub.restore();
            alertStub.restore();
        });

        it('testPresentAlertNoAudioAndArtwork', async function () {
            const alertStub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onAlertSuccess);
            const artStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onArtworkUploadSuccess);
            const fileStub = sinon.stub(fileManager, 'uploadFiles')
                .callsFake(onArtworkUploadSuccess);
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            const alertView1 = new SDL.manager.screen.utils.AlertView()
                .setText('Hi');

            presentAlertOperation = new SDL.manager.screen.utils._PresentAlertOperation(lifecycleManager, alertView1, defaultMainWindowCapability, speechCapabilities, fileManager, 2, alertCompletionListener);

            // Test Images need to be uploaded, sending text and uploading images
            await presentAlertOperation._start();

            // Verifies that uploadArtworks gets called only with the fist presentAlertOperation.onExecute call
            Validator.assertTrue(artStub.notCalled);
            Validator.assertTrue(fileStub.notCalled);
            Validator.assertTrue(alertStub.calledOnce);

            versionStub.restore();
            fileStub.restore();
            artStub.restore();
            alertStub.restore();
        });

        it('testPresentAlertNoImages', async function () {
            const alertStub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onAlertSuccess);
            const artStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onArtworkUploadSuccess);
            const fileStub = sinon.stub(fileManager, 'uploadFiles')
                .callsFake(onArtworkUploadSuccess);
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });
            // Test Images need to be uploaded, sending text and uploading images
            await presentAlertOperation._start();

            // Verifies that uploadArtworks gets called only with the fist presentAlertOperation.onExecute call
            Validator.assertTrue(artStub.calledOnce);
            Validator.assertTrue(alertStub.calledOnce);

            versionStub.restore();
            fileStub.restore();
            artStub.restore();
            alertStub.restore();
        });

        it('testCancel', function (done) {
            const cancelStub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onCancelAlert);

            /**
             * Validates the success of the alert
             * @param {Boolean} success - whether the alert was successful
             * @param {Number} tryAgainTime - how long should be waited until another alert should be sent
             */
            function alertCompletionListener1 (success, tryAgainTime) {
                Validator.assertTrue(success);
            }
            presentAlertOperation = new SDL.manager.screen.utils._PresentAlertOperation(lifecycleManager, alertView, defaultMainWindowCapability, speechCapabilities, fileManager, 2, alertCompletionListener1);
            presentAlertOperation.cancelInteraction();

            Validator.assertTrue(cancelStub.calledOnce);
            cancelStub.restore();
            done();
        });

        it('testCancelOperation', async function () {
            const callback = sinon.fake(() => {});
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve').callsFake(callback);
            // Cancel right away
            presentAlertOperation.switchStates(SDL.manager._Task.CANCELED);
            await presentAlertOperation._start();
            Validator.assertTrue(callback.notCalled);
            stub.restore();
        });
    });
};