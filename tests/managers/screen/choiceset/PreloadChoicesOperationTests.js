const SDL = require('../../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('PreloadChoicesOperationTests', function () {
        const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('cell 1');
        const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('cell 2')
            .setArtwork(Test.GENERAL_ARTWORK);
        const imageField = new SDL.rpc.structs.ImageField()
            .setNameParam(SDL.rpc.enums.ImageFieldName.choiceImage)
            .setImageTypeSupported([
                SDL.rpc.enums.FileType.GRAPHIC_PNG,
                SDL.rpc.enums.FileType.GRAPHIC_JPEG,
            ]);
        const imageField2 = new SDL.rpc.structs.ImageField()
            .setNameParam(SDL.rpc.enums.ImageFieldName.choiceSecondaryImage);
        const textField = new SDL.rpc.structs.TextField()
            .setNameParam(SDL.rpc.enums.TextFieldName.menuName)
            .setCharacterSet(SDL.rpc.enums.CharacterSet.CID1SET)
            .setWidth(2)
            .setRows(2);
        const textField2 = new SDL.rpc.structs.TextField()
            .setNameParam(SDL.rpc.enums.TextFieldName.secondaryText);
        const textField3 = new SDL.rpc.structs.TextField()
            .setNameParam(SDL.rpc.enums.TextFieldName.tertiaryText);
        const windowCapability = new SDL.rpc.structs.WindowCapability()
            .setImageFields([imageField, imageField2])
            .setImageTypeSupported([SDL.rpc.enums.ImageType.STATIC, SDL.rpc.enums.ImageType.DYNAMIC])
            .setTextFields([textField, textField2, textField3]);

        const preloadChoicesOperation = new SDL.manager.screen.choiceset._PreloadChoicesOperation(appClient._sdlManager._lifecycleManager,
            appClient._sdlManager._fileManager, null, windowCapability, true, [cell1, cell2]);

        it('testArtworksToUpload', function () {
            const artworksToUpload = preloadChoicesOperation._artworksToUpload();
            Validator.assertNotNull(artworksToUpload);
            Validator.assertEquals(artworksToUpload.length, 1);
        });

        // Testing shouldSend method's with varying WindowCapability set.
        it('testCheckCapability', function () {
            let operation = setUpNullWindowCapability();

            Validator.assertTrue(operation._checkCapability('hasImageFieldOfName', SDL.rpc.enums.ImageFieldName.choiceImage));
            Validator.assertTrue(operation._checkCapability('hasImageFieldOfName', SDL.rpc.enums.ImageFieldName.choiceSecondaryImage));
            Validator.assertTrue(operation._checkCapability('hasTextFieldOfName', SDL.rpc.enums.TextFieldName.secondaryText));
            Validator.assertTrue(operation._checkCapability('hasTextFieldOfName', SDL.rpc.enums.TextFieldName.tertiaryText));
            Validator.assertTrue(operation._shouldSendChoiceText());

            Validator.assertTrue(preloadChoicesOperation._checkCapability('hasImageFieldOfName', SDL.rpc.enums.ImageFieldName.choiceImage));
            Validator.assertTrue(preloadChoicesOperation._checkCapability('hasImageFieldOfName', SDL.rpc.enums.ImageFieldName.choiceSecondaryImage));
            Validator.assertTrue(preloadChoicesOperation._checkCapability('hasTextFieldOfName', SDL.rpc.enums.TextFieldName.secondaryText));
            Validator.assertTrue(preloadChoicesOperation._checkCapability('hasTextFieldOfName', SDL.rpc.enums.TextFieldName.tertiaryText));
            Validator.assertTrue(preloadChoicesOperation._shouldSendChoiceText());

            operation = setUpEmptyWindowCapability();
            Validator.assertTrue(!operation._checkCapability('hasImageFieldOfName', SDL.rpc.enums.ImageFieldName.choiceImage));
            Validator.assertTrue(!operation._checkCapability('hasImageFieldOfName', SDL.rpc.enums.ImageFieldName.choiceSecondaryImage));
            Validator.assertTrue(!operation._checkCapability('hasTextFieldOfName', SDL.rpc.enums.TextFieldName.secondaryText));
            Validator.assertTrue(!operation._checkCapability('hasTextFieldOfName', SDL.rpc.enums.TextFieldName.tertiaryText));
            Validator.assertTrue(!operation._shouldSendChoiceText());
        });

        describe('when a bad response comes back', function () {
            it('should add the choiceID of the failed choice item to the failedChoiceUploadIDs array', async function () {
                const rpcStub = sinon.stub(appClient._sdlManager._lifecycleManager, 'sendRpcResolve')
                    .callsFake(function () {
                        const cicsResponse = new SDL.rpc.messages.CreateInteractionChoiceSetResponse({
                            functionName: SDL.rpc.enums.FunctionID.CreateInteractionChoiceSetResponse,
                        })
                            .setSuccess(false);

                        appClient._sdlManager._lifecycleManager._handleRpc(cicsResponse);

                        return new Promise((resolve, reject) => {
                            resolve(cicsResponse);
                        });
                    });
                appClient._sdlManager.getScreenManager()._choiceSetManagerBase._updateIdsOnChoices([cell1, cell2]);
                const operation = new SDL.manager.screen.choiceset._PreloadChoicesOperation(appClient._sdlManager._lifecycleManager,
                    appClient._sdlManager._fileManager, null, null, true, [cell1, cell2], (success, failedChoiceCells) => {});
                await operation._preloadCells();
                Validator.assertEquals(operation._failedChoiceCells.length, 2);
                Validator.assertEquals([cell1, cell2], operation._failedChoiceCells);

                rpcStub.restore();
            });
        });

        describe('when only good responses come back', function () {
            it('should leave the failedChoiceUploadIds empty', async function () {
                const rpcStub = sinon.stub(appClient._sdlManager._lifecycleManager, 'sendRpcResolve')
                    .callsFake(function () {
                        const cicsResponse = new SDL.rpc.messages.CreateInteractionChoiceSetResponse({
                            functionName: SDL.rpc.enums.FunctionID.CreateInteractionChoiceSetResponse,
                        })
                            .setSuccess(true);

                        appClient._sdlManager._lifecycleManager._handleRpc(cicsResponse);

                        return new Promise((resolve, reject) => {
                            resolve(cicsResponse);
                        });
                    });
                appClient._sdlManager.getScreenManager()._choiceSetManagerBase._updateIdsOnChoices([cell1, cell2]);
                const operation = new SDL.manager.screen.choiceset._PreloadChoicesOperation(appClient._sdlManager._lifecycleManager,
                    appClient._sdlManager._fileManager, null, null, true, [cell1, cell2], (success, failedChoiceCells) => {});
                await operation._preloadCells();
                Validator.assertEquals(operation._failedChoiceCells.length, 0);
                Validator.assertEquals([], operation._failedChoiceCells);

                rpcStub.restore();
            });
        });

        /**
         * Creates a preload choices operation with no window capability
         * @returns {_PreloadChoicesOperation} - An operation
         */
        function setUpNullWindowCapability () {
            return new SDL.manager.screen.choiceset._PreloadChoicesOperation(appClient._sdlManager._lifecycleManager,
                appClient._sdlManager._fileManager, null, null, true, [cell1, cell2]);
        }

        /**
         * Creates a preload choices operation with an empty window capability
         * @returns {_PreloadChoicesOperation} - An operation
         */
        function setUpEmptyWindowCapability () {
            const emptyImageField = new SDL.rpc.structs.ImageField()
                .setNameParam(SDL.rpc.enums.ImageFieldName.alertIcon);
            const emptyTextField = new SDL.rpc.structs.TextField()
                .setNameParam(SDL.rpc.enums.TextFieldName.mainField1);

            const emptyWindowCapability = new SDL.rpc.structs.WindowCapability()
                .setImageFields([emptyImageField])
                .setTextFields([emptyTextField]);

            return new SDL.manager.screen.choiceset._PreloadChoicesOperation(appClient._sdlManager._lifecycleManager,
                appClient._sdlManager._fileManager, null, emptyWindowCapability, true, [cell1, cell2]);
        }
    });
};