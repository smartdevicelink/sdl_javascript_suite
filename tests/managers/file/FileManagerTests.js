const SDL = require('./../../../lib/js/dist/SDL.min.js');

// Mocking framework
const sinon = require('sinon');

const Validator = require('../../Validator');
const Test = require('../../Test');

module.exports = function (appClient) {
    const sdlManager = appClient._sdlManager;
    const validFile = new SDL.manager.file.filetypes.SdlFile();
    validFile.setName(Test.GENERAL_STRING);
    validFile.setFileData(Test.GENERAL_BYTE_ARRAY);
    validFile.setPersistent(false);
    describe('FileManagerTests', function () {
        const lifecycleManager = sdlManager._lifecycleManager;
        const fileManager = new SDL.manager.file.FileManager(lifecycleManager);
        function onListFilesSuccess (response) {
            console.log('onListFilesSuccess', response);
        }

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
        function onPutFileSuccess (response) {
            console.log('onPutFileSuccess', response);
        }
        it('testInitializationSuccess', function (done) {
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, function (response) {
                Validator.assertTrue(response.getSuccess());
                Validator.assertEquals(fileManager.getRemoteFileNames(), Test.GENERAL_STRING_LIST);
                Validator.assertEquals(fileManager.getBytesAvailable(), Test.GENERAL_INT);
            });
            const stub = sinon.stub(fileManager._lifecycleManager, 'sendRpcMessage')
                .callsFake(handleRpcStub);
            Validator.assertTrue(fileManager._lifecycleManager.sendRpcMessage.calledOnce);
            Validator.assertEquals(fileManager.getRemoteFileNames(), Test.GENERAL_STRING_LIST);
            Validator.assertEquals(fileManager.getBytesAvailable(), Test.GENERAL_INT);
            stub.restore();
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, onListFilesSuccess);
            done();
        });

        it('testFileUploadSuccess', function (done) {
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, onListFilesSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, onPutFileSuccess);
            fileManager.uploadFile(validFile);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, onPutFileSuccess);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, onListFilesSuccess);
            done();
        });
    });
};