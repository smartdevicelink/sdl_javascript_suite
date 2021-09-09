const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('PreloadPresentChoicesOperationTests', function () {
        const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('cell 1')
            ._setChoiceId(0);
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

        const preloadChoicesOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(appClient._sdlManager._lifecycleManager,
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

        /**
         * Creates a preload choices operation with no window capability
         * @returns {_PreloadChoicesOperation} - An operation
         */
        function setUpNullWindowCapability () {
            return new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(appClient._sdlManager._lifecycleManager,
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

            return new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(appClient._sdlManager._lifecycleManager,
                appClient._sdlManager._fileManager, null, emptyWindowCapability, true, [cell1, cell2]);
        }

        const sdlManager = appClient._sdlManager;
        // const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('Cell1')
        const testLoadedChoices = [cell1];
        const choiceSetSelectionListener = new SDL.manager.screen.choiceset.ChoiceSetSelectionListener();
        const keyboardListener = new SDL.manager.screen.choiceset.KeyboardListener();
        const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet('Test', [cell1], choiceSetSelectionListener);

        const csm = new SDL.manager.screen.choiceset._ChoiceSetManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('testGetLayoutMode', function () {
            // First we will check knowing our keyboard listener is NOT NULL
            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, getKeyBoardProperties(), keyboardListener, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            Validator.assertEquals(presentChoiceSetOperation._getLayoutMode(), SDL.rpc.enums.LayoutMode.LIST_WITH_SEARCH);
            presentChoiceSetOperation._keyboardListener = null;
            Validator.assertEquals(presentChoiceSetOperation._getLayoutMode(), SDL.rpc.enums.LayoutMode.LIST_ONLY);
        });

        it('testGetPerformInteraction', function () {
            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, getKeyBoardProperties(), keyboardListener, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            const pi = presentChoiceSetOperation._getPerformInteraction();

            Validator.assertEquals(pi.getInitialText(), 'Test');
            Validator.assertNull(pi.getHelpPrompt());
            Validator.assertNull(pi.getTimeoutPrompt());
            Validator.assertNull(pi.getVrHelp());
            Validator.assertEquals(pi.getTimeout(), 10000);
            Validator.assertEquals(pi.getCancelID(), Test.GENERAL_INTEGER);
            Validator.assertEquals(presentChoiceSetOperation._getLayoutMode(), SDL.rpc.enums.LayoutMode.LIST_WITH_SEARCH);
        });

        it('testSetSelectedCellWithId', function () {
            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, getKeyBoardProperties(), keyboardListener, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            Validator.assertNull(presentChoiceSetOperation._selectedCellRow);
            presentChoiceSetOperation._setSelectedCellWithId(0);
            Validator.assertEquals(presentChoiceSetOperation._selectedCellRow, 0);
        });

        it('testCancelingChoiceSetSuccessfullyIfThreadIsRunning', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), [], choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, null, null, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            csm._canRunTasks = true;
            csm._addTask(presentChoiceSetOperation);

            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.IN_PROGRESS);

            const cancelResponse = sinon.fake(cancelInteractionResponse(true));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CreateInteractionChoiceSet)).callsFake(req => new SDL.rpc.messages.CreateInteractionChoiceSetResponse({
                functionName: SDL.rpc.enums.FunctionID.CreateInteractionChoiceSet,
            }).setSuccess(true));
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            choiceSet.cancel();

            await sleep(100);

            // these won't be called if the present was never sent
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertTrue(presentChoiceSetOperation._currentState === SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState.FINISHING);
            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingChoiceSetUnsuccessfullyIfThreadIsRunning', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, null, null, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            csm._canRunTasks = true;
            csm._addTask(presentChoiceSetOperation);

            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.IN_PROGRESS);

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            choiceSet.cancel();
            await sleep(100);

            // these won't be called if the present was never sent
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertTrue(presentChoiceSetOperation._currentState === SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState.FINISHING);
            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingChoiceSetIfThreadHasFinished', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, null, null, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});
            await presentChoiceSetOperation._finishOperation();

            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.FINISHED);

            choiceSet.cancel();

            // these won't be called if the present was never sent
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertTrue(presentChoiceSetOperation._currentState === SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState.FINISHING);
            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingChoiceSetIfThreadHasNotYetRun', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, null, null, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.READY);

            choiceSet.cancel();
            await sleep(100);

            // these won't be called if the present was never sent
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertEquals(presentChoiceSetOperation._currentState, SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState.NOT_STARTED);
            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.CANCELED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingChoiceSetIfHeadUnitDoesNotSupportFeature', async function () {
            // Cancel Interaction is only supported on RPC specs v.6.0.0+
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(5)
                    .setMinorVersion(3)
                    .setPatchVersion(0));

            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, null, null, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            csm._canRunTasks = true;
            csm._addTask(presentChoiceSetOperation);

            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.IN_PROGRESS);

            const cancelResponse = sinon.fake(cancelInteractionResponse(true));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            choiceSet.cancel();

            await sleep(100);

            // these won't be called if the present was never sent
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertEquals(presentChoiceSetOperation._currentState, SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState.FINISHING);
            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingChoiceSetIfHeadUnitDoesNotSupportFeatureButThreadIsNotRunning', async function () {
            // Cancel Interaction is only supported on RPC specs v.6.0.0+
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(5)
                    .setMinorVersion(3)
                    .setPatchVersion(0));

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            const presentChoiceSetOperation = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                null, windowCapability, true, choiceSet.getChoices(), testLoadedChoices, choiceSet, SDL.rpc.enums.InteractionMode.MANUAL_ONLY, null, null, choiceSetSelectionListener, Test.GENERAL_INTEGER, (loadedCells, success) => {});

            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.READY);

            choiceSet.cancel();
            await sleep(100);

            // these won't be called if the present was never sent
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertEquals(presentChoiceSetOperation._currentState, SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._PreloadPresentChoicesOperationState.NOT_STARTED);
            Validator.assertEquals(presentChoiceSetOperation.getState(), SDL.manager._Task.CANCELED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testUniquenessForAvailableFields', function () {
            const windowCapability = new SDL.rpc.structs.WindowCapability();
            const secondaryText = new SDL.rpc.structs.TextField()
                .setNameParam(SDL.rpc.enums.TextFieldName.secondaryText);
            const tertiaryText = new SDL.rpc.structs.TextField()
                .setNameParam(SDL.rpc.enums.TextFieldName.tertiaryText);

            const textFields = [
                secondaryText,
                tertiaryText,
            ];
            windowCapability.setTextFields(textFields);

            const choiceImage = new SDL.rpc.structs.ImageField()
                .setNameParam(SDL.rpc.enums.ImageFieldName.choiceImage);
            const choiceSecondaryImage = new SDL.rpc.structs.ImageField()
                .setNameParam(SDL.rpc.enums.ImageFieldName.choiceSecondaryImage);

            const imageFieldList = [
                choiceImage,
                choiceSecondaryImage,
            ];
            windowCapability.setImageFields(imageFieldList);

            csm._defaultMainWindowCapability = windowCapability;

            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('Item 1')
                .setSecondaryText('null')
                .setTertiaryText('tertiaryText')
                .setVoiceCommands(null)
                .setArtwork(Test.GENERAL_ARTWORK)
                .setSecondaryArtwork(Test.GENERAL_ARTWORK);
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('Item 1')
                .setSecondaryText('null2')
                .setTertiaryText('tertiaryText2')
                .setVoiceCommands(null)
                .setArtwork(null)
                .setSecondaryArtwork(null);

            const choiceCellList = [
                cell1,
                cell2,
            ];

            const taskInstance = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation();
            taskInstance._defaultMainWindowCapability = windowCapability;

            let removedProperties = choiceCellList.map(cell => cell.clone());
            taskInstance._removeUnusedProperties(removedProperties);
            Validator.assertNotNullUndefined(removedProperties[0].getSecondaryText());

            taskInstance._defaultMainWindowCapability.setTextFields([]);
            taskInstance._defaultMainWindowCapability.setImageFields([]);

            removedProperties = choiceCellList.map(cell => cell.clone());
            taskInstance._removeUnusedProperties(removedProperties);
            Validator.assertNull(removedProperties[1].getSecondaryText());
            taskInstance._addUniqueNamesToCells(removedProperties, [], true);
            Validator.assertEquals(removedProperties[1]._getUniqueTextId(), 2);
        });

        it('testChoicesToBeUploaded', function () {
            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('Item 1')
                .setSecondaryText('null')
                .setTertiaryText('tertiaryText')
                .setVoiceCommands(null)
                .setArtwork(Test.GENERAL_ARTWORK)
                .setSecondaryArtwork(Test.GENERAL_ARTWORK);
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('Item 2')
                .setSecondaryText('null2')
                .setTertiaryText('tertiaryText2')
                .setVoiceCommands(null)
                .setArtwork(null)
                .setSecondaryArtwork(null);

            const choiceCellList = [
                cell1,
                cell2,
            ];

            const taskInstance = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation();
            taskInstance._loadedCells = choiceCellList;
            taskInstance._lifecycleManager = appClient._sdlManager._lifecycleManager;

            taskInstance._cellsToPreload = choiceCellList;
            taskInstance._removeLoadedCellsFromPreload();
            Validator.assertEquals(taskInstance._cellsToPreload, []);
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('Item 3')
                .setSecondaryText('null3')
                .setTertiaryText('tertiaryText3')
                .setVoiceCommands(null)
                .setArtwork(null)
                .setSecondaryArtwork(null);

            taskInstance._cellsToPreload = [cell1, cell2, cell3];
            taskInstance._removeLoadedCellsFromPreload();
            Validator.assertEquals(taskInstance._cellsToPreload, [cell3]);
        });

        it('testAddUniqueNamesToCells', function () {
            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('McDonalds')
                .setSecondaryText('1 mile away');
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('McDonalds')
                .setSecondaryText('2 miles away');
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('Starbucks')
                .setSecondaryText('3 miles away');
            const cell4 = new SDL.manager.screen.choiceset.ChoiceCell('McDonalds')
                .setSecondaryText('4 miles away');
            const cell5 = new SDL.manager.screen.choiceset.ChoiceCell('Starbucks')
                .setSecondaryText('5 miles away');
            const cell6 = new SDL.manager.screen.choiceset.ChoiceCell('Meijer')
                .setSecondaryText('6 miles away');

            const taskInstance = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation();
            taskInstance._defaultMainWindowCapability = new SDL.rpc.structs.WindowCapability();

            const removedProperties = [cell1, cell2, cell3, cell4, cell5, cell6].map(cell => cell.clone());
            taskInstance._removeUnusedProperties(removedProperties);
            Validator.assertNull(removedProperties[0].getSecondaryText());
            taskInstance._addUniqueNamesToCells(removedProperties, [], true);

            Validator.assertEquals(removedProperties[0]._getUniqueText(), 'McDonalds');
            Validator.assertEquals(removedProperties[1]._getUniqueText(), 'McDonalds (2)');
            Validator.assertEquals(removedProperties[2]._getUniqueText(), 'Starbucks');
            Validator.assertEquals(removedProperties[3]._getUniqueText(), 'McDonalds (3)');
            Validator.assertEquals(removedProperties[4]._getUniqueText(), 'Starbucks (2)');
            Validator.assertEquals(removedProperties[5]._getUniqueText(), 'Meijer');
        });

        it('testAssignIdsToCells', function () {
            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('test');
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('test2');
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('test3');
            const cellSet = [cell1, cell2, cell3];
            // Cells are initially set to MAX_ID
            Validator.assertEquals(cell1._getChoiceId(), 2000000000);
            Validator.assertEquals(cell2._getChoiceId(), 2000000000);
            Validator.assertEquals(cell3._getChoiceId(), 2000000000);
            const taskInstance = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation();
            taskInstance._assignIdsToCells(cellSet);
            // We are looking for unique IDs
            Validator.assertTrue(cell1._getChoiceId() !== 2000000000);
            Validator.assertTrue(cell2._getChoiceId() !== 2000000000);
            Validator.assertTrue(cell3._getChoiceId() !== 2000000000);
        });

        it('testDuplicateNonContiguousStrippedCells', function () {
            const loadedCell1 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Loaded 1');
            const loadedCell2 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Loaded 2');
            loadedCell2._setUniqueTextId(3);
            const loadedCell3 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Loaded 3');
            loadedCell3._setUniqueTextId(5);

            const cellToUpload1 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Unique 1');
            const cellToUpload2 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Unique 2');
            const cellToUpload3 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Unique 3');
            const cellToUpload4 = new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                .setSecondaryText('Unique 4');

            const taskInstance = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation();
            taskInstance._windowCapability = new SDL.rpc.structs.WindowCapability();
            taskInstance._loadedCells = [loadedCell1, loadedCell2, loadedCell3];
            taskInstance._cellsToPreload = [cellToUpload1, cellToUpload2, cellToUpload3, cellToUpload4];
            taskInstance._addUniqueNamesToCells(taskInstance._cellsToPreload, taskInstance._loadedCells, false);
            Validator.assertEquals(taskInstance._cellsToPreload[0]._getUniqueText(), 'Cell 2 (2)');
            Validator.assertEquals(taskInstance._cellsToPreload[1]._getUniqueText(), 'Cell 2 (4)');
            Validator.assertEquals(taskInstance._cellsToPreload[2]._getUniqueText(), 'Cell 2 (6)');
            Validator.assertEquals(taskInstance._cellsToPreload[3]._getUniqueText(), 'Cell 2 (7)');
        });

        /**
         * Responds to CancelInteraction requests
         * @param {Boolean} success - Whether to respond positively
         * @returns {CancelInteractionResponse} - Response
         */
        function cancelInteractionResponse (success) {
            return function (req) {
                Validator.assertEquals(req.getCancelID(), Test.GENERAL_INTEGER);
                Validator.assertEquals(req.getFunctionIDParam(), SDL.rpc.enums.FunctionID.PerformInteraction);

                return new SDL.rpc.messages.CancelInteractionResponse({
                    functionName: SDL.rpc.enums.FunctionID.CancelInteraction,
                })
                    .setSuccess(success);
            };
        }

        /**
         * Responds to PerformInteraction requests
         * @returns {PerformInteractionResponse} - Response
         */
        function performInteractionResponse () {
            return new SDL.rpc.messages.PerformInteractionResponse({
                functionName: SDL.rpc.enums.FunctionID.PerformInteraction,
            })
                .setSuccess(true);
        }

        /**
         * Pauses execution
         * @param {Number} timeout - How long in milliseconds to pause
         * @returns {Promise} - Does not resolve to any value
         */
        function sleep (timeout = 1000) {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }

        /**
         * Creates a KeyboardProperties RPC
         * @returns {KeyboardProperties} - A KeyboardProperties RPC
         */
        function getKeyBoardProperties () {
            return new SDL.rpc.structs.KeyboardProperties()
                .setLanguage(SDL.rpc.enums.Language.EN_US)
                .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.QWERTZ)
                .setKeypressMode(SDL.rpc.enums.KeypressMode.RESEND_CURRENT_ENTRY);
        }
    });
};