const SDL = require('../../config.js').node;

const sinon = require('sinon');
const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('SoftButtonManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const fileManager = sdlManager.getFileManager();
        const lifecycleManager = sdlManager._lifecycleManager;

        const screenManager = appClient._sdlManager.getScreenManager();
        const sbm = screenManager._softButtonManager;
        sbm._isDynamicGraphicSupported = true;
        let fileManagerUploadArtworksListenerCalledCounter = 0;
        let internalInterfaceSendRpcListenerCalledCounter = 0;
        const softButtonObject1Id = 1000;
        const softButtonObject2Id = 2000;

        const softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true));
        const softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state2', 'o1s2', new SDL.manager.file.filetypes.SdlArtwork(SDL.manager.file.enums.StaticIconName.ALBUM));
        const softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('object1', [softButtonState1, softButtonState2], softButtonState1.getName())
            ._setButtonId(softButtonObject1Id);

        const softButtonState3 = new SDL.manager.screen.utils.SoftButtonState('object2-state1', 'o2s1');
        const softButtonState4 = new SDL.manager.screen.utils.SoftButtonState('object2-state2', 'o2s2', new SDL.manager.file.filetypes.SdlArtwork('image3', SDL.rpc.enums.FileType.GRAPHIC_PNG, '3', true));
        const softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('object2', [softButtonState3, softButtonState4], softButtonState3.getName())
            ._setButtonId(softButtonObject2Id);

        it('testSoftButtonManagerUpdate', async function () {
            const uploadArtworksStub = sinon.stub(fileManager, 'uploadArtworks')
                .callsFake(files => {
                    fileManagerUploadArtworksListenerCalledCounter++;
                    return Promise.resolve(files.map(file => true));
                });

            const sendShowStub = sinon.stub(lifecycleManager, 'sendRpcResolve');
            sendShowStub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.Show)).callsFake(show => {
                const responseSuccess = new SDL.rpc.messages.ShowResponse({
                    functionName: SDL.rpc.enums.FunctionID.Show,
                })
                    .setSuccess(true);
                lifecycleManager._handleRpc(responseSuccess);

                internalInterfaceSendRpcListenerCalledCounter++;
                return new Promise((resolve, reject) => {
                    resolve(responseSuccess);
                });
            });

            fileManagerUploadArtworksListenerCalledCounter = 0;
            internalInterfaceSendRpcListenerCalledCounter = 0;

            // Test batch update
            sbm.setBatchUpdates(true);
            const softButtonObjects = [softButtonObject1, softButtonObject2];
            sbm.setSoftButtonObjects(softButtonObjects);
            sbm.setBatchUpdates(false);

            // Test single update, setCurrentMainField1, and transitionToNextState
            sbm.setCurrentMainField1('It is Wednesday my dudes');
            softButtonObject1.transitionToNextState();

            await sleep();

            // Check that everything got called as expected
            // uploadArtworks called once for initial state artworks, and a second time for all the other artworks
            Validator.assertEquals(fileManagerUploadArtworksListenerCalledCounter, 2);
            // Three Shows: one from uploading initial button states, second for uploading all other states, and third from calling transitionToNextState
            Validator.assertEquals(internalInterfaceSendRpcListenerCalledCounter, 3);

            // Test getSoftButtonObjects
            Validator.assertEquals(softButtonObjects.length, sbm.getSoftButtonObjects().length);

            for (let index = 0; index < softButtonObjects.length; index++) {
                Validator.assertTrue(softButtonObjects[index].equals(sbm.getSoftButtonObjects()[index]));
            }

            uploadArtworksStub.restore();
            sendShowStub.restore();
        });

        it('testSoftButtonManagerGetSoftButtonObject', function () {
            sbm.setSoftButtonObjects([softButtonObject1, softButtonObject2]);

            // Test get by valid name
            Validator.assertTrue(softButtonObject2.equals(sbm.getSoftButtonObjectByName(softButtonObject2.getName())));

            // Test get by invalid name
            Validator.assertNull(sbm.getSoftButtonObjectByName('object300'));

            // Test get by valid id
            Validator.assertTrue(softButtonObject2.equals(sbm._getSoftButtonObjectById(softButtonObject2Id)));

            // Test get by invalid id
            Validator.assertNull(sbm._getSoftButtonObjectById(5555));
        });

        it('testSoftButtonState', function () {
            // Test SoftButtonState.getName()
            Validator.assertEquals('object1-state1', softButtonState1.getName());

            // Test SoftButtonState.getArtwork()
            const artworkExpectedValue = new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true);
            Validator.assertTrue(artworkExpectedValue.equals(softButtonState1.getArtwork()));

            const artworkExpectedValue2 = new SDL.manager.file.filetypes.SdlArtwork(SDL.manager.file.enums.StaticIconName.ALBUM);
            Validator.assertTrue(artworkExpectedValue2.equals(softButtonState2.getArtwork()));

            // Test SoftButtonState.getSoftButton()
            const softButtonExpectedValue = new SDL.rpc.structs.SoftButton()
                .setType(SDL.rpc.enums.SoftButtonType.SBT_BOTH)
                .setText('o1s1')
                .setImage(new SDL.rpc.structs.Image()
                    .setValueParam(artworkExpectedValue.getName())
                    .setImageType(SDL.rpc.enums.ImageType.DYNAMIC))
                .setSoftButtonID(softButtonObject1Id)
                .setSystemAction(SDL.rpc.enums.SystemAction.DEFAULT_ACTION);

            const actual = softButtonState1.getSoftButton();

            Validator.assertTrue(Validator.validateSoftButtonStruct(softButtonExpectedValue, actual));
        });

        it('testSoftButtonObject', function () {
            // Test SoftButtonObject.getName()
            softButtonObject1.transitionToStateByName('object1-state1');
            Validator.assertEquals('object1', softButtonObject1.getName());

            // Test SoftButtonObject.getCurrentState()
            Validator.assertEquals(softButtonState1, softButtonObject1.getCurrentState());

            // Test SoftButtonObject.getCurrentStateName()
            Validator.assertEquals(softButtonState1.getName(), softButtonObject1.getCurrentStateName());

            // Test SoftButtonObject.getButtonId()
            Validator.assertEquals(softButtonObject1Id, softButtonObject1.getButtonId());

            // Test SoftButtonObject.getCurrentStateSoftButton()
            const softButtonExpectedValue = new SDL.rpc.structs.SoftButton()
                .setType(SDL.rpc.enums.SoftButtonType.SBT_TEXT)
                .setSoftButtonID(softButtonObject2Id)
                .setText('o2s1')
                .setSystemAction(SDL.rpc.enums.SystemAction.DEFAULT_ACTION);

            Validator.assertTrue(Validator.validateSoftButtonStruct(softButtonExpectedValue, softButtonObject2.getCurrentStateSoftButton()));

            // Test SoftButtonObject.getStates()
            Validator.assertEquals([softButtonState1, softButtonState2], softButtonObject1.getStates());

            // Test SoftButtonObject.transitionToNextState()
            Validator.assertEquals(softButtonState1, softButtonObject1.getCurrentState());
            softButtonObject1.transitionToNextState();
            Validator.assertEquals(softButtonState2, softButtonObject1.getCurrentState());

            // Test SoftButtonObject.transitionToStateByName() - transitioning to a none existing state
            Validator.assertTrue(!softButtonObject1.transitionToStateByName('none existing name'));

            // Test SoftButtonObject.transitionToStateByName() - transitioning to an existing state
            Validator.assertTrue(softButtonObject1.transitionToStateByName('object1-state1'));
            Validator.assertEquals(softButtonState1, softButtonObject1.getCurrentState());
        });

        it('testSoftButtonObjectEquals', function () {
            let softButtonObject1;
            let softButtonObject2;

            // Case 1: object is null, assertFalse
            softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('test', [softButtonState1], softButtonState1.getName());
            softButtonObject2 = null;
            Validator.assertNotEquals(softButtonObject1, softButtonObject2);

            // Case 2 SoftButtonObjects are the same, assertTrue
            Validator.assertEquals(softButtonObject1, softButtonObject1);

            // Case 3: object is not an instance of SoftButtonObject assertFalse
            const artwork = new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true);
            Validator.assertNotEquals(softButtonObject1, artwork);

            // Case 4: SoftButtonObjectState List are not same size, assertFalse
            const softButtonStateList = [softButtonState1];
            const softButtonStateList2 = [softButtonState1, softButtonState2];

            softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('hi', softButtonStateList, softButtonState1.getName());
            softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('hi', softButtonStateList2, softButtonState1.getName());
            Validator.assertNotEquals(softButtonObject1, softButtonObject2);

            // Case 5: SoftButtonStates are not the same, assertFalse
            softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('test', softButtonState1, softButtonState1.getName());
            softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('test', softButtonState2, softButtonState2.getName());
            Validator.assertNotEquals(softButtonObject1, softButtonObject2);

            // Case 6: SoftButtonObject names are not same, assertFalse
            softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('test', softButtonState1, softButtonState1.getName());
            softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('test23123', softButtonState1, softButtonState1.getName());
            Validator.assertNotEquals(softButtonObject1, softButtonObject2);

            // Case 7: SoftButtonObject currentStateName not same, assertFalse
            softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('hi', softButtonStateList2, softButtonState1.getName());
            softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('hi', softButtonStateList2, softButtonState2.getName());
            Validator.assertNotEquals(softButtonObject1, softButtonObject2);
        });

        it('testSoftButtonStateEquals', function () {
            let softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true));
            let softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state2', 'o1s2', new SDL.manager.file.filetypes.SdlArtwork(SDL.manager.file.enums.StaticIconName.ALBUM));

            Validator.assertNotEquals(softButtonState1, softButtonState2);

            const artwork1 = new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true);
            const artwork2 = new SDL.manager.file.filetypes.SdlArtwork('image2', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true);

            // Case 1: object is null, assertFalse
            softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', artwork1);
            softButtonState2 = null;
            Validator.assertNotEquals(softButtonState1, softButtonState2);

            // Case 2 SoftButtonObjects are the same, assertTrue
            Validator.assertEquals(softButtonState1, softButtonState1);

            // Case 3: object is not an instance of SoftButtonState, assertFalse
            Validator.assertNotEquals(softButtonState1, artwork1);

            // Case 4: different artwork, assertFalse
            softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', artwork2);
            Validator.assertNotEquals(softButtonState1, softButtonState2);

            // Case 5: different name, assertFalse
            softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state1 different name', 'o1s1', artwork1);
            Validator.assertNotEquals(softButtonState1, softButtonState2);

            // Case 6 they are equal, assertTrue
            softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', artwork1);
            Validator.assertEquals(softButtonState1, softButtonState2);
        });

        it('testSoftButtonManagerGraphicNotSupported', function () {
            sbm._isDynamicGraphicSupported = false;
            fileManagerUploadArtworksListenerCalledCounter = 0;
            internalInterfaceSendRpcListenerCalledCounter = 0;
            const softButtonObjects = [softButtonObject1, softButtonObject2];
            sbm.setSoftButtonObjects(softButtonObjects);
            Validator.assertEquals(0, fileManagerUploadArtworksListenerCalledCounter);
        });

        it('testSoftButtonManagerDynamicImageNotSupportedNoText', function () {
            sbm._isDynamicGraphicSupported = false;
            fileManagerUploadArtworksListenerCalledCounter = 0;
            internalInterfaceSendRpcListenerCalledCounter = 0;

            const softButtonState = new SDL.manager.screen.utils.SoftButtonState('testState', null, new SDL.manager.file.filetypes.SdlArtwork('image', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true));
            const softButtonObject = new SDL.manager.screen.utils.SoftButtonObject('obj1', softButtonState, softButtonState.getName());
            sbm.setSoftButtonObjects([softButtonObject]);
            Validator.assertEquals(0, fileManagerUploadArtworksListenerCalledCounter);
        });

        /**
         * Pauses execution
         * @param {Number} timeout - How long in milliseconds to pause
         * @returns {Promise} - Does not resolve to any value
         */
        function sleep (timeout = 1000) {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }
    });
};