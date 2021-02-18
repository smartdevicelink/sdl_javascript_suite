const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('ChoiceSetManagerTests', function () {
        const sdlManager = appClient._sdlManager;

        const csm = new SDL.manager.screen.choiceset._ChoiceSetManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('setup', function () {
            Validator.assertEquals(csm._getState(), SDL.manager._SubManagerBase.SETTING_UP);
            Validator.assertEquals(csm._currentSystemContext, SDL.rpc.enums.SystemContext.SYSCTXT_MAIN);
            Validator.assertEquals(csm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);
            Validator.assertEquals(SDL.manager.screen.choiceset._ChoiceSetManagerBase.CHOICE_CELL_ID_MIN, 1);
            Validator.assertEquals(csm._nextChoiceId, 1);
            Validator.assertTrue(!csm._isVrOptional);
            Validator.assertNotNullUndefined(csm._fileManager);
            Validator.assertNotNullUndefined(csm._preloadedChoices);
            Validator.assertNotNullUndefined(csm._pendingPreloadChoices);
            Validator.assertNotNullUndefined(csm._hmiListener);
            Validator.assertNotNullUndefined(csm._onDisplayCapabilityListener);
            Validator.assertNull(csm._pendingPresentOperation);
        });

        it('teardown', function () {
            csm.dispose();

            Validator.assertEquals(csm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);
            Validator.assertNull(csm._currentSystemContext);
            Validator.assertNull(csm._defaultMainWindowCapability);
            Validator.assertNull(csm._pendingPresentationSet);
            Validator.assertNull(csm._pendingPresentOperation);

            Validator.assertEquals(csm._taskQueue.length, 0);
            Validator.assertEquals(csm._nextChoiceId, 1);

            Validator.assertTrue(!csm._isVrOptional);

            Validator.assertEquals(csm._getState(), SDL.manager._SubManagerBase.SHUTDOWN);
        });

        it('testDefaultKeyboardConfiguration', function () {
            const properties = csm._defaultKeyboardConfiguration();
            Validator.assertEquals(properties.getLanguage(), SDL.rpc.enums.Language.EN_US);
            Validator.assertEquals(properties.getKeyboardLayout(), SDL.rpc.enums.KeyboardLayout.QWERTY);
            Validator.assertEquals(properties.getKeypressMode(), SDL.rpc.enums.KeypressMode.RESEND_CURRENT_ENTRY);
        });

        it('testSetupChoiceSet', function () {
            const choiceSetSelectionListener = new SDL.manager.screen.choiceset.ChoiceSetSelectionListener()
                .setOnChoiceSelected(() => {})
                .setOnError(() => {});

            // Cannot send choice set with empty or null choice list
            const choiceSet1 = new SDL.manager.screen.choiceset.ChoiceSet('test', [], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet1));

            // cells cant have duplicate text
            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('test');
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('test');
            const choiceSet2 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell1, cell2], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet2));

            // cells cannot mix and match VR / non-VR
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setVoiceCommands(['Test']);
            const cell4 = new SDL.manager.screen.choiceset.ChoiceCell('test2');
            const choiceSet3 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell3, cell4], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet3));

            // VR Commands must be unique
            const cell5 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setVoiceCommands(['Test']);
            const cell6 = new SDL.manager.screen.choiceset.ChoiceCell('test2')
                .setVoiceCommands(['Test']);
            const choiceSet4 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell5, cell6], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet4));

            // Passing Case
            const cell7 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setVoiceCommands(['Test']);
            const cell8 = new SDL.manager.screen.choiceset.ChoiceCell('test2')
                .setVoiceCommands(['Test2']);
            const choiceSet5 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell7, cell8], choiceSetSelectionListener);
            Validator.assertTrue(csm._setUpChoiceSet(choiceSet5));
        });

        it('testUpdateIdsOnChoices', function () {
            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('test');
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('test2');
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('test3');
            const cellSet = [cell1, cell2, cell3];
            // Cells are initially set to MAX_ID
            Validator.assertEquals(cell1._getChoiceId(), 2000000000);
            Validator.assertEquals(cell2._getChoiceId(), 2000000000);
            Validator.assertEquals(cell3._getChoiceId(), 2000000000);
            csm._updateIdsOnChoices(cellSet);
            // We are looking for unique IDs
            Validator.assertTrue(cell1._getChoiceId() !== 2000000000);
            Validator.assertTrue(cell2._getChoiceId() !== 2000000000);
            Validator.assertTrue(cell3._getChoiceId() !== 2000000000);
        });

        it('testKeepChoicesInBoth', function () {
            const cell1 = new SDL.manager.screen.choiceset.ChoiceCell('test');
            const cell2 = new SDL.manager.screen.choiceset.ChoiceCell('test2');
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('test3');
            const pendingPreloadSet = [cell1, cell2, cell3];

            const returnedChoices = csm._keepChoicesInBoth(pendingPreloadSet, [cell2]);

            Validator.assertEquals(returnedChoices.length, 1);
            for (const cell of returnedChoices) {
                Validator.assertEquals(cell.getText(), 'test2');
            }
        });

        it('testPresentingKeyboardShouldReturnCancelIDIfKeyboardCanBeSent', function () {
            const cancelId = csm.presentKeyboard('initial text', null, new SDL.manager.screen.choiceset.KeyboardListener());
            Validator.assertNotNull(cancelId);
        });

        it('testPresentingKeyboardShouldNotReturnCancelIDIfKeyboardCannotBeSent', function () {
            const oldState = csm._state;
            csm._state = SDL.manager._SubManagerBase.ERROR;
            const cancelId = csm.presentKeyboard('initial text', null, new SDL.manager.screen.choiceset.KeyboardListener());
            Validator.assertNull(cancelId);
            csm._state = oldState;
        });

        it('testDismissingExecutingKeyboard', function () {
            const testCancelId = 42;
            const testKeyboardOp = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager);
            testKeyboardOp._cancelId = testCancelId;

            const callback = sinon.fake(() => {});
            const stub = sinon.stub(testKeyboardOp, '_dismissKeyboard')
                .callsFake(callback);

            csm._currentlyPresentedKeyboardOperation = testKeyboardOp;
            csm.dismissKeyboard(testCancelId);
            Validator.assertEquals(callback.called, true);
            stub.restore();
        });

        it('testDismissingQueuedKeyboard', function () {
            const testCancelId = 42;

            // Currently executing operation
            const testKeyboardOp = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager);
            testKeyboardOp._cancelId = 96;
            csm._currentlyPresentedKeyboardOperation = testKeyboardOp;

            // Queued operations
            const testKeyboardOp2 = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager);
            testKeyboardOp2._cancelId = 42;
            csm._currentlyPresentedKeyboardOperation = testKeyboardOp2;

            const callback = sinon.fake(() => {});
            const stub = sinon.stub(testKeyboardOp, '_dismissKeyboard')
                .callsFake(callback);

            const callback2 = sinon.fake(() => {});
            const stub2 = sinon.stub(testKeyboardOp2, '_dismissKeyboard')
                .callsFake(callback2);

            // Queued operation should be canceled
            csm.dismissKeyboard(testCancelId);
            Validator.assertEquals(callback.called, false);
            Validator.assertEquals(callback2.called, true);
            stub.restore();
            stub2.restore();
        });

        it('testValidateCustomConfigurationCalls', function () {
            const processSpy = sinon.spy(csm, '_createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration');
            const newProperties = new SDL.rpc.structs.KeyboardProperties().setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC);
            const defaultProperties = csm._defaultKeyboardConfiguration();
            // Test setKeyboardConfiguration call
            csm.setKeyboardConfiguration(newProperties);
            Validator.assertEquals(processSpy.calledWith(newProperties), true);
            csm.setKeyboardConfiguration(defaultProperties);
            Validator.assertEquals(processSpy.calledWith(defaultProperties), true);
            // Test presentKeyboard call
            csm.presentKeyboard('qwerty', newProperties, null);
            Validator.assertEquals(processSpy.calledWith(newProperties), true);
            // restore state
            processSpy.restore();
        });

        it('testValidateCustomConfigurationPassBack', function () {
            const originCapability = csm._defaultMainWindowCapability;
            csm._defaultMainWindowCapability = new SDL.rpc.structs.WindowCapability().setKeyboardCapabilities(null);

            let newProperties = new SDL.rpc.structs.KeyboardProperties()
                .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC)
                .setMaskInputCharacters(SDL.rpc.enums.KeyboardInputMask.ENABLE_INPUT_KEY_MASK)
                .setCustomKeys(['1', '2', '3']);

            // should pass back if there are no keyboard capabilities
            Validator.assertEquals(
                csm._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(newProperties),
                newProperties
            );
            // should pass back if there is no passed keyboard configuration
            Validator.assertNull(csm._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(null));
            // should pass back if there is no layout to the passed keyboard configuration
            newProperties = new SDL.rpc.structs.KeyboardProperties()
                .setMaskInputCharacters(SDL.rpc.enums.KeyboardInputMask.ENABLE_INPUT_KEY_MASK)
                .setCustomKeys(['1', '2', '3']);
            csm._defaultMainWindowCapability = new SDL.rpc.structs.WindowCapability().setKeyboardCapabilities(
                new SDL.rpc.structs.KeyboardCapabilities()
            );
            Validator.assertEquals(
                csm._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(newProperties),
                newProperties
            );
            // restore state
            csm._defaultMainWindowCapability = originCapability;
        });

        it('testValidateCustomConfigurationCapabilityChecks', function () {
            const originCapability = csm._defaultMainWindowCapability;

            // should return null if no supported layout in capabilities
            const keyboardCapabilities = new SDL.rpc.structs.KeyboardCapabilities()
                .setSupportedKeyboards([]);

            csm._defaultMainWindowCapability = new SDL.rpc.structs.WindowCapability()
                .setKeyboardCapabilities(keyboardCapabilities);

            const newProperties = new SDL.rpc.structs.KeyboardProperties()
                .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC)
                .setMaskInputCharacters(SDL.rpc.enums.KeyboardInputMask.ENABLE_INPUT_KEY_MASK)
                .setCustomKeys(['1', '2', '3']);

            Validator.assertNull(csm._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(newProperties));

            // should shrink custom keys to 1 element
            keyboardCapabilities
                .setSupportedKeyboards([
                    new SDL.rpc.structs.KeyboardLayoutCapability()
                        .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC)
                        .setNumConfigurableKeys(1),
                ])
                .setMaskInputCharactersSupported(true);
            csm._defaultMainWindowCapability = new SDL.rpc.structs.WindowCapability()
                .setKeyboardCapabilities(keyboardCapabilities);
            let expectedProperties = new SDL.rpc.structs.KeyboardProperties()
                .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC)
                .setMaskInputCharacters(SDL.rpc.enums.KeyboardInputMask.ENABLE_INPUT_KEY_MASK)
                .setCustomKeys(['1']);
            Validator.assertEquals(csm._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(newProperties), expectedProperties);

            // should remove MaskInputCharacters if capabilities do not support it
            keyboardCapabilities
                .setSupportedKeyboards([
                    new SDL.rpc.structs.KeyboardLayoutCapability()
                        .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC)
                        .setNumConfigurableKeys(3),
                ])
                .setMaskInputCharactersSupported(false);
            csm._defaultMainWindowCapability = new SDL.rpc.structs.WindowCapability()
                .setKeyboardCapabilities(keyboardCapabilities);
            expectedProperties = new SDL.rpc.structs.KeyboardProperties()
                .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.NUMERIC)
                .setCustomKeys(['1', '2', '3']);
            // TODO: this fails due to https://github.com/smartdevicelink/sdl_javascript_suite/issues/385
            // Validator.assertEquals(csm._createValidKeyboardConfigurationBasedOnKeyboardCapabilitiesFromConfiguration(newProperties), expectedProperties);

            // restore state
            csm._defaultMainWindowCapability = originCapability;
        });
    });
};