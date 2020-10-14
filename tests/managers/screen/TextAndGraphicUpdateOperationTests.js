const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('TextAndGraphicUpdateOperationTests', function () {
        const sdlManager = appClient._sdlManager;
        const textAndGraphicManager = sdlManager.getScreenManager()._textAndGraphicManager;
        const fileManager = sdlManager.getFileManager();
        const lifecycleManager = sdlManager._lifecycleManager;
        const blankScreenData = textAndGraphicManager._currentState();
        let testArtwork1;
        let testArtwork2;
        let listener;
        let textField1;
        let textField2;
        let textField3;
        let textField4;
        let mediaTrackField;
        let title;
        let blankArtwork;
        let textField1Type;
        let textField2Type;
        let textField3Type;
        let textField4Type;
        let textAlignment;
        let configuration;
        let currentScreenData;
        let currentScreenDataUpdatedListener;
        let defaultMainWindowCapability;
        let textsAndGraphicsState;
        let textAndGraphicUpdateOperation;
        let wasUploadArtworksCalled;

        beforeEach(function (done) {
            testArtwork1 = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFilePath(`${__dirname}/test_icon_1.png`);
            testArtwork2 = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo2', SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFilePath(`${__dirname}/test_icon_2.png`);
            listener = async function (success) {};
            wasUploadArtworksCalled = false;
            textField1 = 'It is';
            textField2 = 'Wednesday';
            textField3 = 'My';
            textField4 = 'Dudes';
            mediaTrackField = 'dudes';
            title = 'dudes';
            blankArtwork = new SDL.manager.file.filetypes.SdlArtwork('blankArtwork', SDL.rpc.enums.FileType.GRAPHIC_PNG);
            textField1Type = SDL.rpc.enums.MetadataType.MEDIA_TITLE;
            textField2Type = SDL.rpc.enums.MetadataType.MEDIA_TITLE;
            textField3Type = SDL.rpc.enums.MetadataType.MEDIA_TITLE;
            textField4Type = SDL.rpc.enums.MetadataType.MEDIA_TITLE;
            textAlignment = SDL.rpc.enums.TextAlignment.CENTERED;
            configuration = new SDL.rpc.structs.TemplateConfiguration().setTemplate(SDL.rpc.enums.PredefinedLayout.GRAPHIC_WITH_TEXT);
            currentScreenData = new SDL.manager.screen._TextAndGraphicState();
            currentScreenData.setTextField1('Old');
            currentScreenData.setTextField2('Text');
            currentScreenData.setTextField3('Not');
            currentScreenData.setTextField4('Important');
            currentScreenData.setPrimaryGraphic(testArtwork1);
            currentScreenData.setSecondaryGraphic(testArtwork2);
            currentScreenData.setTemplateConfiguration(configuration);
            currentScreenDataUpdatedListener = (asyncListener) => {
                asyncListener().then(() => {}).catch(() => {});
            };
            defaultMainWindowCapability = getWindowCapability(4);
            textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            done();
        });

        /**
         * Returns an empty WindowCapability
         * @returns {WindowCapability} - An empty WindowCapability struct
         */
        function getNullVarWindowCapability () {
            return new SDL.rpc.structs.WindowCapability();
        }

        /**
         * Builds a WindowCapability structs with a specified number of lines
         * @param {Number} numberOfMainFields - The number of lines for the WindowCapability to support
         * @returns {WindowCapability} - The desire window capability
         */
        function getWindowCapability (numberOfMainFields) {
            const mainField1 = new SDL.rpc.structs.TextField();
            mainField1.setNameParam(SDL.rpc.enums.TextFieldName.mainField1);
            const mainField2 = new SDL.rpc.structs.TextField();
            mainField2.setNameParam(SDL.rpc.enums.TextFieldName.mainField2);
            const mainField3 = new SDL.rpc.structs.TextField();
            mainField3.setNameParam(SDL.rpc.enums.TextFieldName.mainField3);
            const mainField4 = new SDL.rpc.structs.TextField();
            mainField4.setNameParam(SDL.rpc.enums.TextFieldName.mainField4);

            const textFieldList = [];

            textFieldList.push(mainField1);
            textFieldList.push(mainField2);
            textFieldList.push(mainField3);
            textFieldList.push(mainField4);

            const returnList = [];

            if (numberOfMainFields > 0) {
                for (let iterator = 0; iterator < numberOfMainFields; iterator++) {
                    returnList.push(textFieldList[iterator]);
                }
            }

            const windowCapability = new SDL.rpc.structs.WindowCapability();
            windowCapability.setTextFields(returnList);

            return windowCapability;
        }

        /**
         * Handle Show successes.
         * @returns {Promise} - A promise.
         */
        function onShowSuccess () {
            const responseSuccess = new SDL.rpc.messages.ShowResponse({
                functionName: SDL.rpc.enums.FunctionID.ShowResponse,
            })
                .setSuccess(true);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        /**
         * Handle Show successes.
         * @returns {Promise} - A promise.
         */
        function onShowSuccessCanceled () {
            textAndGraphicUpdateOperation.switchStates(SDL.manager._Task.CANCELED);
            const responseSuccess = new SDL.rpc.messages.ShowResponse({
                functionName: SDL.rpc.enums.FunctionID.ShowResponse,
            })
                .setSuccess(true);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        /**
         * Handle SetDisplayLayout successes.
         * @returns {Promise} - A promise.
         */
        function onSetDisplayLayoutSuccess () {
            const responseSuccess = new SDL.rpc.messages.SetDisplayLayoutResponse({
                functionName: SDL.rpc.enums.FunctionID.SetDisplayLayout,
            })
                .setSuccess(true);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        /**
         * Handle SetDisplayLayout successes.
         * @returns {Promise} - A promise.
         */
        function onSetDisplayLayoutCanceled () {
            textAndGraphicUpdateOperation.switchStates(SDL.manager._Task.CANCELED);
            const responseSuccess = new SDL.rpc.messages.SetDisplayLayoutResponse({
                functionName: SDL.rpc.enums.FunctionID.SetDisplayLayout,
            })
                .setSuccess(true);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        /**
         * Handle Show fails.
         * @returns {Promise} - A promise.
         */
        function onShowFail () {
            const responseFail = new SDL.rpc.messages.ShowResponse({
                functionName: SDL.rpc.enums.FunctionID.ShowResponse,
            })
                .setSuccess(false);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseFail);

            return new Promise((resolve, reject) => {
                resolve(responseFail);
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

        /**
         * Cancels a task and marks that the method was called.
         */
        function onImageUploadSuccessTaskCanceled () {
            wasUploadArtworksCalled = true;
            textAndGraphicUpdateOperation.switchStates(SDL.manager._Task.CANCELED);
        }

        it('testUploads', async function () {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            const fileStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onArtworkUploadSuccess);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField1(), textField1);
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField2(), textField2);
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField3(), textField3);
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField4(), textField4);
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextAlignment(), textAlignment);
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getPrimaryGraphic(), testArtwork1);
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getSecondaryGraphic(), testArtwork2);

            // Test The files to be updated are already uploaded, send the full show immediately
            const textField11 = 'It\'s not';
            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField11, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField1(), textField11);

            // Test: If there are no images to update, just send the text
            const textsAndGraphicsStateNullImages = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, blankArtwork, blankArtwork, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsStateNullImages, listener, currentScreenDataUpdatedListener);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField1(), textField1);

            fileStub.restore();
            stub.restore();
        });

        it('testCanceledRightAway', async function () {
            textAndGraphicUpdateOperation._currentScreenData = currentScreenData;
            textAndGraphicUpdateOperation.switchStates(SDL.manager._Task.CANCELED);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField1(), 'Old');
        });

        it('testTaskCanceledAfterImageUpload', async function () {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            const fileStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onImageUploadSuccessTaskCanceled);

            // Test Canceled after Image upload
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTextField1(), textField1);
            fileStub.restore();
            stub.restore();
        });

        it('testTaskCanceledAfterTextSent', async function () {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccessCanceled);
            const fileStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onImageUploadSuccessTaskCanceled);

            await textAndGraphicUpdateOperation._start();
            Validator.assertTrue(!wasUploadArtworksCalled);
            fileStub.restore();
            stub.restore();
        });

        it('testTaskCanceledAfterSetDisplayLayout', async function () {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onSetDisplayLayoutCanceled);
            const fileStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onImageUploadSuccessTaskCanceled);
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion(5, 0);
                });

            const configuration = new SDL.rpc.structs.TemplateConfiguration().setTemplate(SDL.rpc.enums.PredefinedLayout.DOUBLE_GRAPHIC_WITH_SOFTBUTTONS.toString());
            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, configuration);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            await textAndGraphicUpdateOperation._start();
            Validator.assertTrue(!wasUploadArtworksCalled);
            versionStub.restore();
            fileStub.restore();
            stub.restore();
        });

        it('testGetMainLines', function (done) {
            // We want to test that the looping works. By default, it will return 4 if display cap is null
            textAndGraphicUpdateOperation._defaultMainWindowCapability = getNullVarWindowCapability();

            // Null test
            Validator.assertEquals(0, SDL.manager._ManagerUtility.getMaxNumberOfMainFieldLines(textAndGraphicUpdateOperation._defaultMainWindowCapability));

            textAndGraphicUpdateOperation._defaultMainWindowCapability = getWindowCapability(3);
            Validator.assertEquals(SDL.manager._ManagerUtility.getMaxNumberOfMainFieldLines(textAndGraphicUpdateOperation._defaultMainWindowCapability), 3);
            done();
        });

        it('testAssemble1Line', function (done) {
            const inputShow = new SDL.rpc.messages.Show();

            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, null, null, null,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, SDL.rpc.enums.MetadataType.humidity, null, null, null, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(1), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            let assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');

            // test tags (just 1)
            let tags = assembledShow.getMetadataTags();
            let tagsList = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            Validator.assertEquals(tags.getMainField1(), tagsList);

            textsAndGraphicsState.setTextField2(textField2);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(1), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is - Wednesday');

            textsAndGraphicsState.setTextField3(textField3);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(1), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is - Wednesday - My');

            textsAndGraphicsState.setTextField4(textField4);
            textsAndGraphicsState.setTextField4Type(SDL.rpc.enums.MetadataType.currentTemperature);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(1), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is - Wednesday - My - Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList.push(SDL.rpc.enums.MetadataType.currentTemperature);
            Validator.assertEquals(tags.getMainField1(), tagsList);

            // For some obscurity, lets try setting just fields 2 and 4 for a 1 line display
            textsAndGraphicsState.setTextField1(null);
            textsAndGraphicsState.setTextField3(null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(1), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);


            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'Wednesday - Dudes');
            done();
        });

        it('testAssemble2Lines', function (done) {
            const inputShow = new SDL.rpc.messages.Show();
            defaultMainWindowCapability = getWindowCapability(2);

            // Force it to return display with support for only 2 lines of text
            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, null, null, null,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, SDL.rpc.enums.MetadataType.humidity, null, null, null, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            let assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');

            // test tags
            let tags = assembledShow.getMetadataTags();
            let tagsList = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            Validator.assertEquals(tags.getMainField1(), tagsList);

            textsAndGraphicsState.setTextField2(textField2);
            textsAndGraphicsState.setTextField2Type(SDL.rpc.enums.MetadataType.currentTemperature);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            let tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);

            textsAndGraphicsState.setTextField3(textField3);
            textsAndGraphicsState.setTextField3Type(SDL.rpc.enums.MetadataType.mediaAlbum);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(2), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is - Wednesday');
            Validator.assertEquals(assembledShow.getMainField2(), 'My');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);

            textsAndGraphicsState.setTextField4(textField4);
            textsAndGraphicsState.setTextField4Type(SDL.rpc.enums.MetadataType.mediaStation);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(2), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is - Wednesday');
            Validator.assertEquals(assembledShow.getMainField2(), 'My - Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.mediaStation);
            tagsList2.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);

            // For some obscurity, lets try setting just fields 2 and 4 for a 2 line display
            textsAndGraphicsState.setTextField1(null);
            textsAndGraphicsState.setTextField3(null);
            textsAndGraphicsState.setTextField1Type(null);
            textsAndGraphicsState.setTextField3Type(null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(2), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField2(), 'Dudes');

            // And 3 fields without setting 1
            textsAndGraphicsState.setTextField3(textField3);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, getWindowCapability(2), currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField2(), 'My - Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList2.push(SDL.rpc.enums.MetadataType.mediaStation);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            done();
        });

        it('testAssemble3Lines', function (done) {
            const inputShow = new SDL.rpc.messages.Show();

            // Force it to return display with support for only 3 lines of text
            defaultMainWindowCapability = getWindowCapability(3);
            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, null, null, null,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, SDL.rpc.enums.MetadataType.humidity, null, null, null, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            let assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), '');
            Validator.assertEquals(assembledShow.getMainField3(), '');

            // test tags
            let tags = assembledShow.getMetadataTags();
            let tagsList = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            Validator.assertEquals(tags.getMainField1(), tagsList);

            textsAndGraphicsState.setTextField2(textField2);
            textsAndGraphicsState.setTextField2Type(SDL.rpc.enums.MetadataType.currentTemperature);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), '');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            let tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);

            textsAndGraphicsState.setTextField3(textField3);
            textsAndGraphicsState.setTextField3Type(SDL.rpc.enums.MetadataType.mediaAlbum);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            let tagsList3 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            Validator.assertEquals(tags.getMainField3(), tagsList3);

            textsAndGraphicsState.setTextField4(textField4);
            textsAndGraphicsState.setTextField4Type(SDL.rpc.enums.MetadataType.mediaStation);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My - Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            tagsList3 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaStation);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            Validator.assertEquals(tags.getMainField3(), tagsList3);

            // Someone might not want to set the fields in order? We should handle that
            textsAndGraphicsState.setTextField1(null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);

            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My - Dudes');
            done();
        });

        it('testAssemble4Lines', function (done) {
            const inputShow = new SDL.rpc.messages.Show();

            defaultMainWindowCapability = getWindowCapability(4);
            const tx1 = new SDL.rpc.structs.TextField();
            const tx2 = new SDL.rpc.structs.TextField();
            const tx3 = new SDL.rpc.structs.TextField();
            const tx4 = new SDL.rpc.structs.TextField();
            const tx5 = new SDL.rpc.structs.TextField();
            const tx6 = new SDL.rpc.structs.TextField();

            tx1.setNameParam(SDL.rpc.enums.TextFieldName.mainField1);
            tx2.setNameParam(SDL.rpc.enums.TextFieldName.mainField2);
            tx3.setNameParam(SDL.rpc.enums.TextFieldName.mainField3);
            tx4.setNameParam(SDL.rpc.enums.TextFieldName.mainField4);
            tx5.setNameParam(SDL.rpc.enums.TextFieldName.mediaTrack);
            tx6.setNameParam(SDL.rpc.enums.TextFieldName.templateTitle);

            const textFieldNames = [tx1, tx2, tx3, tx4, tx5, tx6];
            defaultMainWindowCapability.setTextFields(textFieldNames);

            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, null, null, null,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, SDL.rpc.enums.MetadataType.humidity, null, null, null, null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            textsAndGraphicsState.setMediaTrackTextField('HI');
            textsAndGraphicsState.setTitle('bye');

            // Force it to return display with support for only 4 lines of text
            let assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);

            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), '');
            Validator.assertEquals(assembledShow.getMainField3(), '');
            Validator.assertEquals(assembledShow.getMainField4(), '');
            Validator.assertEquals(assembledShow.getMediaTrack(), 'HI');
            Validator.assertEquals(assembledShow.getTemplateTitle(), 'bye');

            // test tags
            let tags = assembledShow.getMetadataTags();
            let tagsList = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            Validator.assertEquals(tags.getMainField1(), tagsList);

            textsAndGraphicsState.setTextField2('Wednesday');
            textsAndGraphicsState.setTextField2Type(SDL.rpc.enums.MetadataType.currentTemperature);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);


            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), '');
            Validator.assertEquals(assembledShow.getMainField4(), '');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            let tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);

            textsAndGraphicsState.setTextField3('My');
            textsAndGraphicsState.setTextField3Type(SDL.rpc.enums.MetadataType.mediaAlbum);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My');
            Validator.assertEquals(assembledShow.getMainField4(), '');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            let tagsList3 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            Validator.assertEquals(tags.getMainField3(), tagsList3);

            textsAndGraphicsState.setTextField4('Dudes');
            textsAndGraphicsState.setTextField4Type(SDL.rpc.enums.MetadataType.mediaStation);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My');
            Validator.assertEquals(assembledShow.getMainField4(), 'Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            tagsList3 = [];
            let tagsList4 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            tagsList4.push(SDL.rpc.enums.MetadataType.mediaStation);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            Validator.assertEquals(tags.getMainField3(), tagsList3);
            Validator.assertEquals(tags.getMainField4(), tagsList4);

            // try just setting line 1 and 4
            textsAndGraphicsState.setTextField2(null);
            textsAndGraphicsState.setTextField3(null);
            textsAndGraphicsState.setTextField2Type(null);
            textsAndGraphicsState.setTextField3Type(null);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), '');
            Validator.assertEquals(assembledShow.getMainField3(), '');
            Validator.assertEquals(assembledShow.getMainField4(), 'Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList4 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList4.push(SDL.rpc.enums.MetadataType.mediaStation);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField4(), tagsList4);
            done();
        });

        it('testAssemble4LinesNullWindowCapability', function (done) {
            const inputShow = new SDL.rpc.messages.Show();
            defaultMainWindowCapability = getWindowCapability(4);

            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, null, null, null,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, SDL.rpc.enums.MetadataType.humidity, null, null, null, null);

            textsAndGraphicsState.setMediaTrackTextField('HI');
            textsAndGraphicsState.setTitle('bye');

            textsAndGraphicsState.setTextField1('It is');
            textsAndGraphicsState.setTextField1Type(SDL.rpc.enums.MetadataType.humidity);

            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, null, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            let assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);

            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), '');
            Validator.assertEquals(assembledShow.getMainField3(), '');
            Validator.assertEquals(assembledShow.getMainField4(), '');
            Validator.assertEquals(assembledShow.getMediaTrack(), 'HI');
            Validator.assertEquals(assembledShow.getTemplateTitle(), 'bye');

            // test tags
            let tags = assembledShow.getMetadataTags();
            let tagsList = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            Validator.assertEquals(tags.getMainField1(), tagsList);

            textsAndGraphicsState.setTextField2('Wednesday');
            textsAndGraphicsState.setTextField2Type(SDL.rpc.enums.MetadataType.currentTemperature);

            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, null, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), '');
            Validator.assertEquals(assembledShow.getMainField4(), '');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            let tagsList2 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);

            textsAndGraphicsState.setTextField3('My');
            textsAndGraphicsState.setTextField3Type(SDL.rpc.enums.MetadataType.mediaAlbum);

            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, null, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My');
            Validator.assertEquals(assembledShow.getMainField4(), '');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            let tagsList3 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            Validator.assertEquals(tags.getMainField3(), tagsList3);

            textsAndGraphicsState.setTextField4('Dudes');
            textsAndGraphicsState.setTextField4Type(SDL.rpc.enums.MetadataType.mediaStation);

            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, null, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), 'Wednesday');
            Validator.assertEquals(assembledShow.getMainField3(), 'My');
            Validator.assertEquals(assembledShow.getMainField4(), 'Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList2 = [];
            tagsList3 = [];
            let tagsList4 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList2.push(SDL.rpc.enums.MetadataType.currentTemperature);
            tagsList3.push(SDL.rpc.enums.MetadataType.mediaAlbum);
            tagsList4.push(SDL.rpc.enums.MetadataType.mediaStation);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField2(), tagsList2);
            Validator.assertEquals(tags.getMainField3(), tagsList3);
            Validator.assertEquals(tags.getMainField4(), tagsList4);

            // try just setting line 1 and 4
            textsAndGraphicsState.setTextField2(null);
            textsAndGraphicsState.setTextField3(null);
            textsAndGraphicsState.setTextField2Type(null);
            textsAndGraphicsState.setTextField3Type(null);

            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, null, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);

            assembledShow = textAndGraphicUpdateOperation._assembleShowText(inputShow);
            Validator.assertEquals(assembledShow.getMainField1(), 'It is');
            Validator.assertEquals(assembledShow.getMainField2(), '');
            Validator.assertEquals(assembledShow.getMainField3(), '');
            Validator.assertEquals(assembledShow.getMainField4(), 'Dudes');

            // test tags
            tags = assembledShow.getMetadataTags();
            tagsList = [];
            tagsList4 = [];
            tagsList.push(SDL.rpc.enums.MetadataType.humidity);
            tagsList4.push(SDL.rpc.enums.MetadataType.mediaStation);
            Validator.assertEquals(tags.getMainField1(), tagsList);
            Validator.assertEquals(tags.getMainField4(), tagsList4);
            done();
        });

        it('testExtractTextFromShow', function (done) {
            const mainShow = new SDL.rpc.messages.Show();
            mainShow.setMainField1('test');
            mainShow.setMainField3('Sauce');
            mainShow.setMainField4('');

            const newShow = textAndGraphicUpdateOperation._extractTextAndLayoutFromShow(mainShow);

            Validator.assertEquals(newShow.getMainField1(), 'test');
            Validator.assertEquals(newShow.getMainField3(), 'Sauce');
            Validator.assertEquals(newShow.getMainField4(), '');
            Validator.assertNull(newShow.getMainField2());
            done();
        });

        it('testCreateImageOnlyShowWithPrimaryArtwork', function (done) {
            // Test null
            let testShow = textAndGraphicUpdateOperation._createImageOnlyShowWithPrimaryArtwork(null, null);
            Validator.assertNull(testShow);

            // Test when artwork hasn't been uploaded
            let fileStub = sinon.stub(fileManager, 'hasUploadedFile')
                .callsFake(function () {
                    return false;
                });
            let textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, configuration);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            testShow = textAndGraphicUpdateOperation._createImageOnlyShowWithPrimaryArtwork(testArtwork1, testArtwork2);
            Validator.assertNull(testShow);
            fileStub.restore();

            // Test when artwork has been uploaded
            fileStub = sinon.stub(fileManager, 'hasUploadedFile')
                .callsFake(function () {
                    return true;
                });
            textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, configuration);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            testShow = textAndGraphicUpdateOperation._createImageOnlyShowWithPrimaryArtwork(testArtwork1, testArtwork2);
            Validator.assertEquals(testShow.getGraphic(), testArtwork1.getImageRPC());
            Validator.assertEquals(testShow.getSecondaryGraphic(), testArtwork2.getImageRPC());
            fileStub.restore();
            done();
        });

        it('testTemplateChange', async function () {
            let stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            const fileStub = sinon.stub(fileManager, 'hasUploadedFile')
                .callsFake(onArtworkUploadSuccess);
            let versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion(6, 0);
                });

            let textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, configuration);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTemplateConfiguration().getParameters(), configuration.getParameters());

            versionStub.restore();
            stub.restore();
            stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onSetDisplayLayoutSuccess);
            versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion(5, 0);
                });

            const configuration2 = new SDL.rpc.structs.TemplateConfiguration().setTemplate(SDL.rpc.enums.PredefinedLayout.DOUBLE_GRAPHIC_WITH_SOFTBUTTONS);
            textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, configuration2);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTemplateConfiguration().getParameters(), configuration2.getParameters());
            versionStub.restore();
            fileStub.restore();
            stub.restore();
        });

        it('testOnShowFail', async function () {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowFail);
            const fileStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(onImageUploadSuccessTaskCanceled);
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion(6, 0);
                });

            const textsAndGraphicsState = new SDL.manager.screen._TextAndGraphicState(textField1, textField2, textField3, textField4,
                mediaTrackField, title, testArtwork1, testArtwork2, textAlignment, textField1Type, textField2Type, textField3Type, textField4Type, configuration);
            textAndGraphicUpdateOperation = new SDL.manager.screen._TextAndGraphicUpdateOperation(lifecycleManager, fileManager, defaultMainWindowCapability, currentScreenData, textsAndGraphicsState, listener, currentScreenDataUpdatedListener);
            await textAndGraphicUpdateOperation._start();
            Validator.assertEquals(textAndGraphicUpdateOperation._getCurrentScreenData().getTemplateConfiguration().getParameters(), configuration.getParameters());

            // Verifies that uploadArtworks does not get called because a sendShow failed with text and layout change
            Validator.assertTrue(!wasUploadArtworksCalled);
            versionStub.restore();
            fileStub.restore();
            stub.restore();
        });

        textAndGraphicManager._currentScreenData = blankScreenData;
        textAndGraphicManager._resetFieldsToCurrentScreenData();
    });
};