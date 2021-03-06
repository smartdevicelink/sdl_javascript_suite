const SDL = require('../../config.js').node;

// Mocking framework used so that some RPCs are not actually sent to Core, but the response mimicked
const sinon = require('sinon');

const Validator = require('../../Validator');
const Test = require('../../Test');

module.exports = function (appClient) {
    const sdlManager = appClient._sdlManager;
    describe('LifecycleManagerTests', function () {
        /**
         * Handle Rpc Stub.
         * @returns {Promise} - A promise.
         */
        function handleRpcStub () {
            const responseSuccess = new SDL.rpc.messages.ListFilesResponse({
                functionName: SDL.rpc.enums.FunctionID.ListFiles,
            })
                .setFilenames(Test.GENERAL_STRING_LIST)
                .setSpaceAvailable(Test.GENERAL_INT)
                .setSuccess(true);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        /**
         * Validate Rpc response.
         * @param {RpcResponse} response - An Rpc Response.
         */
        function validateRpcResponse (response) {
            Validator.assertTrue(response.getSuccess());
            Validator.assertEquals(response.getFunctionId(), 'ListFiles');
        }
        it('testRpcListener', function (done) {
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, validateRpcResponse);
            const stub = sinon.stub(sdlManager.getFileManager()._lifecycleManager, 'sendRpcResolve')
                .callsFake(handleRpcStub);
            sdlManager._lifecycleManager.sendRpcResolve(new SDL.rpc.messages.ListFiles());
            stub.restore();
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, validateRpcResponse);
            done();
        });
        it('testVersion', function (done) {
            const version = sdlManager._lifecycleManager.getSdlMsgVersion();
            Validator.assertNotNullUndefined(version.getMajorVersion());
            Validator.assertNotNullUndefined(version.getMinorVersion());
            Validator.assertNotNullUndefined(version.getPatchVersion());
            done();
        });

        it('testOnSystemInfoReceived', function (done) {
            const mockSystemInfo = {};
            const defaultResult = true;
            let actualResult = sdlManager._lifecycleManager.onSystemInfoReceived(mockSystemInfo);
            Validator.assertEquals(actualResult, defaultResult);

            const testResult = false;
            const testListener = function (mockSystemInfo) {
                return testResult;
            };
            sdlManager._lifecycleManager.setOnSystemInfoReceived(testListener);
            actualResult = sdlManager._lifecycleManager.onSystemInfoReceived(mockSystemInfo);
            Validator.assertEquals(actualResult, testResult);

            done();
        });

        it('testFixingIncorrectCapabilities', function (done) {
            let setDisplayLayoutResponse;

            const registerAppInterFaceCapabilities = new SDL.rpc.structs.DisplayCapabilities()
                .setImageFields([new SDL.rpc.structs.ImageField(SDL.rpc.enums.ImageFieldName.graphic, [SDL.rpc.enums.FileType.GRAPHIC_PNG])]);

            const setDisplayLayoutCapabilities = new SDL.rpc.structs.DisplayCapabilities()
                .setImageFields([]);

            sdlManager._lifecycleManager._initialMediaCapabilities = registerAppInterFaceCapabilities;


            // Test switching to MEDIA template - Capabilities in setDisplayLayoutResponse should be replaced with the ones from RAIR
            sdlManager._lifecycleManager._lastDisplayLayoutRequestTemplate = SDL.rpc.enums.PredefinedLayout.MEDIA;
            setDisplayLayoutResponse = new SDL.rpc.messages.SetDisplayLayoutResponse()
                .setDisplayCapabilities(setDisplayLayoutCapabilities);
            sdlManager._lifecycleManager.fixIncorrectDisplayCapabilities(setDisplayLayoutResponse);
            Validator.assertEquals(registerAppInterFaceCapabilities, setDisplayLayoutResponse.getDisplayCapabilities());

            // Test switching to non-MEDIA template - Capabilities in setDisplayLayoutResponse should not be altered
            sdlManager._lifecycleManager._lastDisplayLayoutRequestTemplate = SDL.rpc.enums.PredefinedLayout.TEXT_WITH_GRAPHIC;
            setDisplayLayoutResponse = new SDL.rpc.messages.SetDisplayLayoutResponse()
                .setDisplayCapabilities(setDisplayLayoutCapabilities);
            sdlManager._lifecycleManager.fixIncorrectDisplayCapabilities(setDisplayLayoutResponse);
            Validator.assertEquals(setDisplayLayoutCapabilities, setDisplayLayoutResponse.getDisplayCapabilities());
            done();
        });
    });
};