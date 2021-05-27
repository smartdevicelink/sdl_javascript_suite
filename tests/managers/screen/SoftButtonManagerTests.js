const SDL = require('../../config.js').node;

const sinon = require('sinon');
const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('SoftButtonManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const fileManager = sdlManager.getFileManager();
        const lifecycleManager = sdlManager._lifecycleManager;

        const screenManager = appClient._sdlManager.getScreenManager();
        const softButtonManager = screenManager._softButtonManager;
        let fileManagerUploadArtworksListenerCalledCounter = 0;
        let internalInterfaceSendRpcListenerCalledCounter = 0;
        const softButtonObject1Id = 1000;
        const softButtonObject2Id = 2000;

        const softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, '1', true));
        const softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state2', 'o1s2', new SDL.manager.file.filetypes.SdlArtwork(SDL.manager.file.enums.StaticIconName.ALBUM, SDL.rpc.enums.FileType.GRAPHIC_PNG));
        const softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('object1', [softButtonState1, softButtonState2], softButtonState1.getName())
            ._setButtonId(softButtonObject1Id);

        const softButtonState3 = new SDL.manager.screen.utils.SoftButtonState('object2-state1', 'o2s1');
        const softButtonState4 = new SDL.manager.screen.utils.SoftButtonState('object2-state2', 'o2s2', new SDL.manager.file.filetypes.SdlArtwork('image3', SDL.rpc.enums.FileType.GRAPHIC_PNG, '3', true));
        const softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('object2', [softButtonState3, softButtonState4], softButtonState3.getName())
            ._setButtonId(softButtonObject2Id);

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

        const sbm = new SDL.manager.screen._SoftButtonManager(lifecycleManager, fileManager);

        it('testSoftButtonManagerUpdate', async function () {
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
            Validator.assertEquals(softButtonObjects, sbm.getSoftButtonObjects());
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