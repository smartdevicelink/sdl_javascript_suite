const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('ChoiceSetManagerTests', function () {
        const sdlManager = appClient._sdlManager;

        let testLoadedCells;
        let testCellsToLoad;
        const testTask = new SDL.manager.screen.choiceset._PreloadPresentChoicesOperation(sdlManager._lifecycleManager, sdlManager._fileManager);

        const csm = new SDL.manager.screen.choiceset._ChoiceSetManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        /**
         * Returns a list of choice cells
         * @param {Number} count - The number of cells desired
         * @returns {ChoiceCell[]} - list of choice cells
         */
        function cellsToUploadWithCount (count) {
            const cells = [];
            for (let index = 0; index < count; index++) {
                cells.push(new SDL.manager.screen.choiceset.ChoiceCell(`Cell ${index}`));
            }
            return cells;
        }

        /**
         * Returns a list of choice cells
         * @param {Number} start - The starting ID
         * @param {Number} end - The ending ID
         * @returns {ChoiceCell[]} - list of choice cells
         */
        function loadedCellsWithStartNum (start, end) {
            const cells = [];
            for (let index = start; index < end; index++) {
                const cell = new SDL.manager.screen.choiceset.ChoiceCell(`Cell ${index}`);
                cell._setChoiceId(index);
                cells.push(cell);
            }
            return cells;
        }

        it('setup', function () {
            Validator.assertEquals(csm._getState(), SDL.manager._SubManagerBase.SETTING_UP);
            Validator.assertEquals(csm._currentSystemContext, SDL.rpc.enums.SystemContext.SYSCTXT_MAIN);
            Validator.assertEquals(csm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);
            Validator.assertEquals(SDL.manager.screen.choiceset._ChoiceSetManagerBase.CHOICE_CELL_ID_MIN, 1);
            Validator.assertEquals(csm._nextChoiceId, 1);
            Validator.assertTrue(!csm._isVrOptional);
            Validator.assertNotNullUndefined(csm._fileManager);
            Validator.assertNotNullUndefined(csm._preloadedChoices);
            Validator.assertNotNullUndefined(csm._hmiListener);
            Validator.assertNotNullUndefined(csm._onDisplayCapabilityListener);
            Validator.assertNull(csm._pendingPresentOperation);
        });

        it('teardown', function () {
            csm.dispose();

            Validator.assertEquals(csm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);
            Validator.assertNull(csm._currentSystemContext);
            Validator.assertNull(csm._defaultMainWindowCapability);
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
            const stub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const choiceSetSelectionListener = new SDL.manager.screen.choiceset.ChoiceSetSelectionListener()
                .setOnChoiceSelected(() => {})
                .setOnError(() => {});

            // Cannot send choice set with empty or null choice list
            const choiceSet1 = new SDL.manager.screen.choiceset.ChoiceSet('test', [], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet1));

            // cells that have duplicate text will be allowed if there is another property to make them unique
            // because a unique name will be assigned and used
            const cell3 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setSecondaryText('text 1');
            const cell4 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setSecondaryText('text 2');
            const choiceSet3 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell3, cell4], choiceSetSelectionListener);
            Validator.assertTrue(csm._setUpChoiceSet(choiceSet3));

            // cells cannot mix and match VR / non-VR
            const cell5 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setVoiceCommands(['Test']);
            const cell6 = new SDL.manager.screen.choiceset.ChoiceCell('test2');
            const choiceSet4 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell5, cell6], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet4));

            // VR Commands must be unique
            const cell7 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setVoiceCommands(['Test']);
            const cell8 = new SDL.manager.screen.choiceset.ChoiceCell('test2')
                .setVoiceCommands(['Test']);
            const choiceSet5 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell7, cell8], choiceSetSelectionListener);
            Validator.assertTrue(!csm._setUpChoiceSet(choiceSet5));

            // Passing Case
            const cell9 = new SDL.manager.screen.choiceset.ChoiceCell('test')
                .setVoiceCommands(['Test']);
            const cell10 = new SDL.manager.screen.choiceset.ChoiceCell('test2')
                .setVoiceCommands(['Test2']);
            const choiceSet6 = new SDL.manager.screen.choiceset.ChoiceSet('test', [cell9, cell10], choiceSetSelectionListener);
            Validator.assertTrue(csm._setUpChoiceSet(choiceSet6));

            stub.restore();
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

        describe('assigning ids', function () {
            beforeEach(function (done) {
                SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs = false;
                SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 0;
                done();
            });

            describe('when there\'s no ids already set', function () {
                beforeEach(function () {
                    testLoadedCells = [];
                    testCellsToLoad = cellsToUploadWithCount(50);
                });
                it('should set ids starting at 0', function (done) {
                    testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                    Validator.assertEquals(testCellsToLoad.length, 50);
                    for (let index = 0; index < testCellsToLoad.length; index++) {
                        Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), index);
                    }
                    done();
                });
            });

            describe('when ids are already set', function () {
                describe('when not reaching the max value', function () {
                    beforeEach(function () {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 100;

                        testLoadedCells = [];
                        testCellsToLoad = cellsToUploadWithCount(50);
                    });

                    it('should set ids starting at the next id', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad.length, 50);
                        for (let index = 0; index < testCellsToLoad.length; index++) {
                            Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), index + 100);
                        }
                        Validator.assertTrue(!SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });

                describe('when reaching the max value', function () {
                    beforeEach(function () {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 65500;
                        testLoadedCells = loadedCellsWithStartNum(65498, 65499);
                        testCellsToLoad = cellsToUploadWithCount(35);
                    });

                    it('should set the hasReachedMaxID boolean and not loop back over yet', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad, 35);
                        for (let index = 0; index < testCellsToLoad.length; index++) {
                            Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), index + 65500);
                        }
                        Validator.assertTrue(!SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });
            });
        });

        describe('on subsequent loops of assigning ids', function () {
            beforeEach(function (done) {
                SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs = true;
                SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 0;
                done();
            });

            describe('when loaded cells is not full', function () {
                describe('when loaded cells are contiguous at the beginning', function () {
                    beforeEach(function (done) {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 99;

                        testLoadedCells = loadedCellsWithStartNum(0, 99);
                        testCellsToLoad = cellsToUploadWithCount(35);
                        done();
                    });

                    it('should assign ids after those', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad.length, 35);
                        for (let index = 0; index < testCellsToLoad.length; index++) {
                            Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), i + 100);
                        }
                        Validator.assertTrue(SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });

                describe('when those items are contiguous in the middle so that assigning cells overlap', function () {
                    beforeEach(function (done) {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 10;

                        testLoadedCells = loadedCellsWithStartNum(3, 10);
                        testCellsToLoad = cellsToUploadWithCount(13);
                        done();
                    });

                    it('should start assigning from the last used id', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad.length, 13);
                        for (let index = 0; index < testCellsToLoad.length; index++) {
                            Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), index + 11);
                        }
                        Validator.assertTrue(SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });

                describe('when there are items scattered and overlapping cells', function () {
                    beforeEach(function (done) {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 10;

                        testLoadedCells = loadedCellsWithStartNum(3, 10);
                        const secondLoadedCells = loadedCellsWithStartNum(50, 55);
                        testLoadedCells = testLoadedCells.concat(secondLoadedCells);

                        testCellsToLoad = cellsToUploadWithCount(10);
                        done();
                    });

                    it('should start from the last used id', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad.length, 10);
                        for (let index = 0; index < testCellsToLoad.length; index++) {
                            Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), index + 56);
                        }
                        Validator.assertTrue(SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });

                describe('when not enough open ids are available', function () {
                    beforeEach(function (done) {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 10;

                        testLoadedCells = loadedCellsWithStartNum(3, 10);
                        const secondLoadedCells = loadedCellsWithStartNum(12, 65533);
                        testLoadedCells = testLoadedCells.concat(secondLoadedCells);

                        testCellsToLoad = cellsToUploadWithCount(10);
                        done();
                    });

                    it('should assign what it can and the rest should be set to MAX', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad.length, 10);

                        Validator.assertEquals(testCellsToLoad[0]._getChoiceId(), 65534);
                        Validator.assertEquals(testCellsToLoad[1]._getChoiceId(), 65535);
                        Validator.assertEquals(testCellsToLoad[2]._getChoiceId(), 0);
                        Validator.assertEquals(testCellsToLoad[3]._getChoiceId(), 1);
                        Validator.assertEquals(testCellsToLoad[4]._getChoiceId(), 2);
                        Validator.assertEquals(testCellsToLoad[5]._getChoiceId(), 11);
                        Validator.assertEquals(testCellsToLoad[6]._getChoiceId(), 65535);
                        Validator.assertEquals(testCellsToLoad[7]._getChoiceId(), 65535);
                        Validator.assertEquals(testCellsToLoad[8]._getChoiceId(), 65535);
                        Validator.assertEquals(testCellsToLoad[9]._getChoiceId(), 65535);

                        Validator.assertTrue(SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });

                describe('when loadedCells is full', function () {
                    beforeEach(function (done) {
                        SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._choiceId = 65535;

                        testLoadedCells = loadedCellsWithStartNum(0, 65535);
                        testCellsToLoad = cellsToUploadWithCount(10);
                        done();
                    });

                    it('should set all IDs to MAX', function (done) {
                        testTask._assignIdsToCells(testCellsToLoad, testLoadedCells);
                        Validator.assertEquals(testCellsToLoad.length, 10);
                        for (let index = 0; index < testCellsToLoad.length; index++) {
                            Validator.assertEquals(testCellsToLoad[index]._getChoiceId(), 65535);
                        }
                        Validator.assertTrue(SDL.manager.screen.choiceset._PreloadPresentChoicesOperation._hasReachedMaxIDs);
                        done();
                    });
                });
            });
        });

        describe('making cells unique', function () {
            let enabledWindowCapability;
            let primaryTextOnlyCapability;

            beforeEach(function (done) {
                enabledWindowCapability = new SDL.rpc.structs.WindowCapability();
                enabledWindowCapability.setTextFields([
                    new SDL.rpc.structs.TextField().setNameParam(SDL.rpc.enums.TextFieldName.menuName),
                    new SDL.rpc.structs.TextField().setNameParam(SDL.rpc.enums.TextFieldName.secondaryText),
                    new SDL.rpc.structs.TextField().setNameParam(SDL.rpc.enums.TextFieldName.tertiaryText),
                ]);

                primaryTextOnlyCapability = new SDL.rpc.structs.WindowCapability();
                primaryTextOnlyCapability.setTextFields([
                    new SDL.rpc.structs.TextField().setNameParam(SDL.rpc.enums.TextFieldName.menuName),
                ]);

                testLoadedCells = [];
                done();
            });

            describe('at RPC v7.1', function () {
                beforeEach(function (done) {
                    appClient._sdlManager._lifecycleManager._rpcSpecVersion = new SDL.util.Version(7, 1, 0);
                    done();
                });

                describe('when cells are unique except when stripped', function () {
                    beforeEach(function (done) {
                        testCellsToLoad = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 1'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 3'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                                .setSecondaryText('Unique 1'),
                        ];
                        done();
                    });

                    describe('with full window capability', function () {
                        beforeEach(function (done) {
                            testTask._defaultMainWindowCapability = enabledWindowCapability;
                            testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                            done();
                        });

                        it('should not set unique titles', function (done) {
                            Validator.assertEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                            Validator.assertEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                            Validator.assertEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                            Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                            done();
                        });
                    });

                    describe('with primary text only capability', function () {
                        beforeEach(function (done) {
                            testTask._defaultMainWindowCapability = primaryTextOnlyCapability;
                            testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                            done();
                        });

                        it('should set unique titles', function (done) {
                            Validator.assertEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                            Validator.assertNotEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                            Validator.assertNotEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                            Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                            done();
                        });
                    });
                });

                describe('when cells are unique', function () {
                    beforeEach(function (done) {
                        testCellsToLoad = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 3'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 4'),
                        ];
                        testTask._defaultMainWindowCapability = enabledWindowCapability;
                        testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                        done();
                    });

                    it('should not set unique titles', function (done) {
                        Validator.assertEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                        Validator.assertEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                        Validator.assertEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                        Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                        done();
                    });
                });

                describe('when loaded cells match the cells when stripped', function () {
                    beforeEach(function (done) {
                        testLoadedCells = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 3'),
                        ];

                        testCellsToLoad = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                                .setSecondaryText('Unique'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 4')
                                .setSecondaryText('Unique'),
                        ];
                        done();
                    });

                    describe('with full window capability', function () {
                        beforeEach(function (done) {
                            testTask._defaultMainWindowCapability = enabledWindowCapability;
                            testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                            done();
                        });

                        it('should not make unique text', function (done) {
                            Validator.assertEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                            Validator.assertEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                            Validator.assertEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                            Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                            done();
                        });
                    });

                    describe('with primary text only capability', function () {
                        beforeEach(function (done) {
                            testTask._defaultMainWindowCapability = primaryTextOnlyCapability;
                            testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                            done();
                        });

                        it('should not make unique text', function (done) {
                            Validator.assertNotEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                            Validator.assertNotEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                            Validator.assertNotEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                            Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                            done();
                        });
                    });
                });
            });

            describe('below RPC v7.1', function () {
                beforeEach(function (done) {
                    appClient._sdlManager._lifecycleManager._rpcSpecVersion = new SDL.util.Version(7, 0, 0);
                    done();
                });

                describe('when cells are unique except when stripped', function () {
                    beforeEach(function (done) {
                        testCellsToLoad = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 1'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 3'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                                .setSecondaryText('Unique 1'),
                        ];

                        testTask._defaultMainWindowCapability = enabledWindowCapability;
                        testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                        done();
                    });

                    it('should not set unique titles except the first and last', function (done) {
                        Validator.assertEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                        Validator.assertNotEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                        Validator.assertNotEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                        Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                        done();
                    });
                });

                describe('when cells are unique', function () {
                    beforeEach(function (done) {
                        testCellsToLoad = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 3'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 4'),
                        ];
                        testTask._defaultMainWindowCapability = enabledWindowCapability;
                        testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                        done();
                    });

                    it('should not set unique titles', function (done) {
                        Validator.assertEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                        Validator.assertEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                        Validator.assertEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                        Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                        done();
                    });
                });

                describe('when loaded cells match the cells when stripped', function () {
                    beforeEach(function (done) {
                        testLoadedCells = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 3'),
                        ];

                        testCellsToLoad = [
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 2')
                                .setSecondaryText('Unique'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 1')
                                .setSecondaryText('Unique 2'),
                            new SDL.manager.screen.choiceset.ChoiceCell('Cell 4')
                                .setSecondaryText('Unique'),
                        ];
                        done();
                    });

                    describe('with full window capability', function () {
                        beforeEach(function (done) {
                            testTask._defaultMainWindowCapability = enabledWindowCapability;
                            testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                            done();
                        });

                        it('should make unique text', function (done) {
                            Validator.assertNotEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                            Validator.assertNotEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                            Validator.assertNotEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                            Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                            done();
                        });
                    });

                    describe('with primary text only capability', function () {
                        beforeEach(function (done) {
                            testTask._defaultMainWindowCapability = primaryTextOnlyCapability;
                            testTask._makeCellsToUploadUnique(testCellsToLoad.map(cell => cell.clone()), testLoadedCells.map(cell => cell.clone()));
                            done();
                        });

                        it('should not make unique text', function (done) {
                            Validator.assertNotEquals(testCellsToLoad[0]._getUniqueText(), testCellsToLoad[0].getText());
                            Validator.assertNotEquals(testCellsToLoad[1]._getUniqueText(), testCellsToLoad[1].getText());
                            Validator.assertNotEquals(testCellsToLoad[2]._getUniqueText(), testCellsToLoad[2].getText());
                            Validator.assertEquals(testCellsToLoad[3]._getUniqueText(), testCellsToLoad[3].getText());
                            done();
                        });
                    });
                });
            });
        });

        describe('updating a choice set based on loaded cells and cells to upload', function () {
            let testChoiceSet, basicChoiceCells;

            beforeEach(function (done) {
                basicChoiceCells = [
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 3'),
                ];

                testChoiceSet = new SDL.manager.screen.choiceset.ChoiceSet('', basicChoiceCells);
                testTask._choiceSet = testChoiceSet;
                testCellsToLoad = [
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 3'),
                ];
                for (let index = 0; index < testCellsToLoad.length; index++) {
                    testCellsToLoad[index]._setChoiceId(index);
                }

                testLoadedCells = [
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 1'),
                    new SDL.manager.screen.choiceset.ChoiceCell('Cell 2'),
                ];
                for (let index = 0; index < testLoadedCells.length; index++) {
                    testLoadedCells[index]._setChoiceId(index + 10);
                }
                done();
            });

            describe('when there are no loaded cells', function () {
                it('should have all cells the same as cells to upload', function (done) {
                    testTask._updateChoiceSet(testTask._choiceSet, [], testTask._choiceSet.getChoices());

                    for (let index = 0; index < testTask._choiceSet.getChoices().length; index++) {
                        Validator.assertEquals(testTask._choiceSet.getChoices()[index]._getChoiceId(), testCellsToLoad[index]._getChoiceId());
                    }
                    done();
                });
            });

            describe('when some loaded cells match', function () {
                it('should use the loaded cells when possible', function (done) {
                    testTask._updateChoiceSet(testTask._choiceSet, testLoadedCells, testTask._choiceSet.getChoices());
                    Validator.assertEquals(testTask._choiceSet.getChoices()[0]._getChoiceId(), testLoadedCells[0]._getChoiceId());
                    Validator.assertEquals(testTask._choiceSet.getChoices()[1]._getChoiceId(), testLoadedCells[1]._getChoiceId());
                });
            });
        });
    });
};
