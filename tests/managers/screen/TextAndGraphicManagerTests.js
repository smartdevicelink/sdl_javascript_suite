const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = async function (appClient) {
    describe('TextAndGraphicManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const textAndGraphicManager = sdlManager.getScreenManager()._textAndGraphicManager;
        const lifecycleManager = sdlManager._lifecycleManager;
        const testArtwork1 = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath(`${__dirname}/test_icon_1.png`);
        const testArtwork2 = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo2', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath(`${__dirname}/test_icon_2.png`);
        const configuration1 = new SDL.rpc.structs.TemplateConfiguration().setTemplate(SDL.rpc.enums.PredefinedLayout.GRAPHIC_WITH_TEXT);
        const configuration2 = new SDL.rpc.structs.TemplateConfiguration().setTemplate(SDL.rpc.enums.PredefinedLayout.DOUBLE_GRAPHIC_WITH_SOFTBUTTONS);
        const blankScreenData = textAndGraphicManager._currentState();

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

        it('testInstantiation', function (done) {
            Validator.assertNull(textAndGraphicManager.getTextField1());
            Validator.assertNull(textAndGraphicManager.getTextField2());
            Validator.assertNull(textAndGraphicManager.getTextField3());
            Validator.assertNull(textAndGraphicManager.getTextField4());
            Validator.assertNull(textAndGraphicManager.getTitle());
            Validator.assertNull(textAndGraphicManager.getMediaTrackTextField());
            Validator.assertNull(textAndGraphicManager.getPrimaryGraphic());
            Validator.assertNull(textAndGraphicManager.getSecondaryGraphic());
            Validator.assertEquals(textAndGraphicManager.getTextAlignment(), null);
            Validator.assertNull(textAndGraphicManager.getTextField1Type());
            Validator.assertNull(textAndGraphicManager.getTextField2Type());
            Validator.assertNull(textAndGraphicManager.getTextField3Type());
            Validator.assertNull(textAndGraphicManager.getTextField4Type());
            Validator.assertNotNull(textAndGraphicManager._currentScreenData);
            Validator.assertNotNull(textAndGraphicManager._defaultMainWindowCapability);
            Validator.assertTrue(!textAndGraphicManager._isDirty);
            Validator.assertNotNull(textAndGraphicManager._getBlankArtwork());
            done();
        });

        it('testGetMainLines', function (done) {
            // We want to test that the looping works. By default, it will return 4 if display cap is null
            let defaultMainWindowCapability = getNullVarWindowCapability();

            // Null test
            Validator.assertEquals(0, SDL.manager._ManagerUtility.getMaxNumberOfMainFieldLines(defaultMainWindowCapability));

            defaultMainWindowCapability = getWindowCapability(3);
            Validator.assertEquals(SDL.manager._ManagerUtility.getMaxNumberOfMainFieldLines(defaultMainWindowCapability), 3);
            done();
        });

        it('testMediaTrackTextField', function (done) {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            const songTitle = 'Wild For The Night';
            textAndGraphicManager.setMediaTrackTextField(songTitle);
            Validator.assertEquals(textAndGraphicManager.getMediaTrackTextField(), songTitle);
            stub.restore();
            done();
        });

        it('testTemplateTitle', function (done) {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            const title = 'template title';
            textAndGraphicManager.setTitle(title);
            Validator.assertEquals(textAndGraphicManager.getTitle(), title);
            stub.restore();
            done();
        });

        it('testAlignment', function (done) {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            textAndGraphicManager.setTextAlignment(SDL.rpc.enums.TextAlignment.LEFT_ALIGNED);
            Validator.assertEquals(textAndGraphicManager.getTextAlignment(), SDL.rpc.enums.TextAlignment.LEFT_ALIGNED);
            stub.restore();
            done();
        });

        it('testSetPrimaryGraphic', function (done) {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            textAndGraphicManager.setPrimaryGraphic(testArtwork1);
            Validator.assertEquals(textAndGraphicManager.getPrimaryGraphic(), testArtwork1);
            stub.restore();
            done();
        });

        it('testSetSecondaryGraphic', function (done) {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            textAndGraphicManager.setSecondaryGraphic(testArtwork1);
            Validator.assertEquals(textAndGraphicManager.getSecondaryGraphic(), testArtwork1);
            stub.restore();
            done();
        });

        it('resetFieldsToCurrentScreenDataTest', function (done) {
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onShowSuccess);
            textAndGraphicManager.setTextField1('textField1');
            textAndGraphicManager.setTextField2('textField2');
            textAndGraphicManager.setTextField3('textField3');
            textAndGraphicManager.setTextField4('textField4');
            textAndGraphicManager.setMediaTrackTextField('mediaTrackTextField');
            textAndGraphicManager.setTitle('title');
            textAndGraphicManager.setPrimaryGraphic(testArtwork1);
            textAndGraphicManager.setSecondaryGraphic(testArtwork1);
            textAndGraphicManager.changeLayout(configuration1);
            const currentScreenData = textAndGraphicManager._currentState();

            Validator.assertEquals(currentScreenData.getTextField1(), textAndGraphicManager.getTextField1());
            Validator.assertEquals(currentScreenData.getTextField2(), textAndGraphicManager.getTextField2());
            Validator.assertEquals(currentScreenData.getTextField3(), textAndGraphicManager.getTextField3());
            Validator.assertEquals(currentScreenData.getTextField4(), textAndGraphicManager.getTextField4());
            Validator.assertEquals(currentScreenData.getTitle(), textAndGraphicManager.getTitle());
            Validator.assertEquals(currentScreenData.getMediaTrackTextField(), textAndGraphicManager.getMediaTrackTextField());
            Validator.assertEquals(currentScreenData.getPrimaryGraphic().getName(), textAndGraphicManager.getPrimaryGraphic().getName());
            Validator.assertEquals(currentScreenData.getSecondaryGraphic().getName(), textAndGraphicManager.getSecondaryGraphic().getName());
            Validator.assertEquals(currentScreenData.getTemplateConfiguration().getParameters(), textAndGraphicManager.getTemplateConfiguration().getParameters());

            textAndGraphicManager.setTextField1('BadData');
            textAndGraphicManager.setTextField2('BadData');
            textAndGraphicManager.setTextField3('BadData');
            textAndGraphicManager.setTextField4('BadData');
            textAndGraphicManager.setMediaTrackTextField('BadData');
            textAndGraphicManager.setTitle('BadData');
            textAndGraphicManager.setPrimaryGraphic(testArtwork2);
            textAndGraphicManager.setSecondaryGraphic(testArtwork2);
            textAndGraphicManager.changeLayout(configuration2);

            Validator.assertTrue(currentScreenData.getTextField1() !== textAndGraphicManager.getTextField1());
            Validator.assertTrue(currentScreenData.getTextField2() !== textAndGraphicManager.getTextField2());
            Validator.assertTrue(currentScreenData.getTextField3() !== textAndGraphicManager.getTextField3());
            Validator.assertTrue(currentScreenData.getTextField4() !== textAndGraphicManager.getTextField4());
            Validator.assertTrue(currentScreenData.getTitle() !== textAndGraphicManager.getTitle());
            Validator.assertTrue(currentScreenData.getMediaTrackTextField() !== textAndGraphicManager.getMediaTrackTextField());
            Validator.assertTrue(currentScreenData.getPrimaryGraphic().getName() !== textAndGraphicManager.getPrimaryGraphic().getName());
            Validator.assertTrue(currentScreenData.getSecondaryGraphic().getName() !== textAndGraphicManager.getSecondaryGraphic().getName());
            Validator.assertTrue(currentScreenData.getTemplateConfiguration().getParameters() !== textAndGraphicManager.getTemplateConfiguration().getParameters());

            textAndGraphicManager._currentScreenData = currentScreenData;
            textAndGraphicManager._resetFieldsToCurrentScreenData();

            Validator.assertTrue(textAndGraphicManager._currentScreenData.getTextField1() === textAndGraphicManager.getTextField1());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getTextField2() === textAndGraphicManager.getTextField2());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getTextField3() === textAndGraphicManager.getTextField3());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getTextField4() === textAndGraphicManager.getTextField4());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getTitle() === textAndGraphicManager.getTitle());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getMediaTrackTextField() === textAndGraphicManager.getMediaTrackTextField());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getPrimaryGraphic().getName() === textAndGraphicManager.getPrimaryGraphic().getName());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getSecondaryGraphic().getName() === textAndGraphicManager.getSecondaryGraphic().getName());
            Validator.assertTrue(textAndGraphicManager._currentScreenData.getTemplateConfiguration().getParameters() === textAndGraphicManager.getTemplateConfiguration().getParameters());

            // reset screen data for other tests
            textAndGraphicManager._currentScreenData = blankScreenData;
            textAndGraphicManager._resetFieldsToCurrentScreenData();
            stub.restore();
            done();
        });
    });
};