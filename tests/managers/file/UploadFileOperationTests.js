const chai = require('chai');
chai.use(require('chai-as-promised'));
const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = function (appClient) {
    const sdlManager = appClient._sdlManager;
    const fileManager = sdlManager.getFileManager();
    describe('UploadFileOperationTests', function () {
        describe('when the file is already on the head unit', function () {
            describe('when not overwriting', function () {
                it('should not send the upload RPCs and finish the operation', async function () {
                    const stub = sinon.stub(fileManager, 'fileNeedsUpload')
                        .callsFake((file) => false);
                    const testFileName = 'TestSmallMemory';
                    const testFileData = 'test1234';
                    const testFile = new SDL.manager.file.filetypes.SdlFile(testFileName, SDL.rpc.enums.FileType.BINARY, testFileData, true);

                    const testFileWrapper = new SDL.manager.file._SdlFileWrapper(testFile, (success, bytesAvailable, fileNames, errorMessage) => {
                        Validator.assertTrue(!success);
                        Validator.assertNull(bytesAvailable);
                        Validator.assertNull(fileNames);
                        Validator.assertNotNullUndefined(errorMessage);
                        Validator.assertEquals(errorMessage, SDL.manager.file._UploadFileOperation.fileManagerCannotOverwriteError);
                    });
                    const operation = new SDL.manager.file._UploadFileOperation(sdlManager._lifecycleManager, sdlManager.getFileManager(), testFileWrapper);
                    await operation._start();
                    stub.restore();

                    Validator.assertEquals(operation.getState(), SDL.manager._Task.FINISHED);
                });
            });

            describe('when overwriting', function () {
                it('should send the upload RPCs', async function () {
                    const stub = sinon.stub(fileManager, 'fileNeedsUpload')
                        .callsFake((file) => true);
                    const putFileStub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
                    putFileStub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PutFile)).callsFake(() => {
                        const responseFailure = new SDL.rpc.messages.PutFileResponse({
                            functionName: SDL.rpc.enums.FunctionID.PutFile,
                        })
                            .setSuccess(true);
                        sdlManager._lifecycleManager._handleRpc(responseFailure);

                        return new Promise((resolve, reject) => {
                            resolve(responseFailure);
                        });
                    });
                    const testFileName = 'TestSmallMemory';
                    const testFileData = 'test1234';
                    const testFile = new SDL.manager.file.filetypes.SdlFile(testFileName, SDL.rpc.enums.FileType.BINARY, testFileData, true)
                        .setOverwrite(true);

                    const testFileWrapper = new SDL.manager.file._SdlFileWrapper(testFile, (success, bytesAvailable, fileNames, errorMessage) => {
                        Validator.assertTrue(success);
                        Validator.assertNotNullUndefined(bytesAvailable);
                        Validator.assertNull(fileNames);
                        Validator.assertNull(errorMessage);
                    });
                    const operation = new SDL.manager.file._UploadFileOperation(sdlManager._lifecycleManager, sdlManager.getFileManager(), testFileWrapper);
                    await operation._start();
                    putFileStub.restore();
                    stub.restore();

                    Validator.assertEquals(operation.getState(), SDL.manager._Task.FINISHED);
                });
            });
        });
    });
};