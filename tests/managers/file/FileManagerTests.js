const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const SDL = require('./../../../lib/node/dist/SDL.min.js');

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');
const Test = require('../../Test');

module.exports = function (appClient) {
    const sdlManager = appClient._sdlManager;
    const fileManager = sdlManager.getFileManager();
    const lifecycleManager = sdlManager._lifecycleManager;
    const validFile = new SDL.manager.file.filetypes.SdlFile();
    validFile.setName(Test.GENERAL_STRING);
    validFile.setFileData(new Array(50));
    validFile.setPersistent(false);

    describe('FileManagerTests', function () {
        /**
         * Handle ListFiles successes.
         * @returns {Promise} - A promise.
         */
        function onListFilesSuccess () {
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
         * Handle ListFiles failure.
         * @returns {Promise} - A promise.
         */
        function onListFilesFailure () {
            const responseFailure = new SDL.rpc.messages.ListFilesResponse({
                functionName: SDL.rpc.enums.FunctionID.ListFiles,
            })
                .setSuccess(false);
            sdlManager._lifecycleManager._handleRpc(responseFailure);

            return new Promise((resolve, reject) => {
                resolve(responseFailure);
            });
        }

        /**
         * Handle PutFile success.
         * @returns {Promise} - A promise.
         */
        function onPutFileSuccess () {
            const responseSuccess = new SDL.rpc.messages.PutFileResponse({
                functionName: SDL.rpc.enums.FunctionID.PutFiles,
            })
                .setSuccess(true)
                .setSpaceAvailable(Test.GENERAL_INT);
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        /**
         * Handle PutFile failure.
         * @returns {Promise} - A promise.
         */
        function onPutFileFailure () {
            const responseFailure = new SDL.rpc.messages.PutFileResponse({
                functionName: SDL.rpc.enums.FunctionID.PutFiles,
            })
                .setSuccess(false);
            sdlManager._lifecycleManager._handleRpc(responseFailure);

            return new Promise((resolve, reject) => {
                resolve(responseFailure);
            });
        }

        /**
         * Check for a failure in a file upload.
         * @param {FileManager} fileManager - the current fileManager
         * @param {SdlFile} sdlFile - the file to be uploaded.
         */
        async function checkForUploadFailure (fileManager, sdlFile) {
            await expect(fileManager.uploadFile(sdlFile)).to.be.rejected;
        }

        /**
         * Handle ListFiles with multiple files returned.
         * @returns {Promise} - A promise.
         */
        function onMultipleListFilesSuccess () {
            const fileNames = Test.GENERAL_STRING_LIST;
            fileNames.push('art1');
            fileNames.push('art2');
            const responseSuccess = new SDL.rpc.messages.ListFilesResponse({
                functionName: SDL.rpc.enums.FunctionID.ListFiles,
            })
                .setFilenames(fileNames)
                .setSpaceAvailable(Test.GENERAL_INT)
                .setSuccess(true);
            // _handleRpc triggers the listener
            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        let failEveryOtherRequest = true;
        /**
         * Handle multiple PutFile RPCs, succeeding in one and failing in the next.
         * @returns {Promise} - A promise.
         */
        function onMultiplePutFileSuccess () {
            const response = new SDL.rpc.messages.PutFileResponse({
                functionName: SDL.rpc.enums.FunctionID.PutFiles,
            })
                .setSpaceAvailable(Test.GENERAL_INT);
            if (failEveryOtherRequest) {
                failEveryOtherRequest = !failEveryOtherRequest;
                response.setSuccess(true);
                // _handleRpc triggers the listener
                sdlManager._lifecycleManager._handleRpc(response);

                return new Promise((resolve, reject) => {
                    resolve(response);
                });
            } else {
                failEveryOtherRequest = !failEveryOtherRequest;
                response.setSuccess(false);
                // _handleRpc triggers the listener
                sdlManager._lifecycleManager._handleRpc(response);

                return new Promise((resolve, reject) => {
                    resolve(response);
                });
            }
        }

        /**
         * Handle DeleteFile success.
         * @returns {Promise} - A promise.
         */
        function onDeleteFileSuccess () {
            const responseSuccess = new SDL.rpc.messages.DeleteFileResponse({
                functionName: SDL.rpc.enums.FunctionID.DeleteFile,
            })
                .setSuccess(true);

            sdlManager._lifecycleManager._handleRpc(responseSuccess);

            return new Promise((resolve, reject) => {
                resolve(responseSuccess);
            });
        }

        it('testInitializationSuccess', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            // add a listener to verify success
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);

            // "stubs" the sendRpcMessage so that any calls to it will instead go to onListFilesSuccess
            const stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();

            // remove the stub on sendRpcMessage
            stub.restore();

            Validator.assertEquals(fileManager.getRemoteFileNames(), Test.GENERAL_STRING_LIST);
            Validator.assertEquals(fileManager.getBytesAvailable(), Test.GENERAL_INT);

            // can't forget to remove the listener
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testInitializationFailure', async function () {
            const expectFailure = function (response) {
                Validator.assertTrue(!response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectFailure);
            const stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesFailure);

            await fileManager._retrieveRemoteFiles();
            stub.restore();

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectFailure);
        });

        it('testFileUploadFailure', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };
            const expectFailure = function (response) {
                Validator.assertTrue(!response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectFailure);

            let stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onPutFileFailure);
            await fileManager.uploadFile(validFile);
            stub.restore();

            Validator.assertTrue(!fileManager.getRemoteFileNames().includes(validFile.getName()));
            Validator.assertTrue(!fileManager.hasUploadedFile(validFile));

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectFailure);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testFileUploadSuccess', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);

            let stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onPutFileSuccess);
            await fileManager.uploadFile(validFile);
            stub.restore();

            Validator.assertTrue(fileManager.getRemoteFileNames().includes(validFile.getName()));
            Validator.assertTrue(fileManager.hasUploadedFile(validFile));
            Validator.assertEquals(fileManager.getBytesAvailable(), Test.GENERAL_INT);

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testInvalidSdlFileInput', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);

            const stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            let sdlFile = new SDL.manager.file.filetypes.SdlFile();
            // don't set name
            sdlFile.setFileData(Test.GENERAL_BYTE_ARRAY);
            checkForUploadFailure(fileManager, sdlFile);

            sdlFile = new SDL.manager.file.filetypes.SdlFile();
            sdlFile.setName(Test.GENERAL_STRING);
            // don't set data
            checkForUploadFailure(fileManager, sdlFile);

            sdlFile = new SDL.manager.file.filetypes.SdlFile();
            // invalid file path
            sdlFile.setFilePath('http://www.google.com');
            checkForUploadFailure(fileManager, sdlFile);

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testInvalidSdlArtworkInput', async function () {
            const sdlArtwork = new SDL.manager.file.filetypes.SdlArtwork();
            const FileType = SDL.rpc.enums.FileType;
            for (const fileType in  FileType) {
                let shouldError = true,
                    didError = false;
                if (fileType === FileType.GRAPHIC_BMP || fileType === FileType.GRAPHIC_PNG || fileType === FileType.GAPHIC_JPEG) {
                    shouldError = false;
                }
                try {
                    sdlArtwork.setType(fileType);
                } catch (illegalArgument) {
                    didError = true;
                }
                Validator.assertEquals(shouldError, didError);
            }
        });

        it('testMultipleFileUploadThenDeleteSuccess', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.DeleteFile, expectSuccess);

            let stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            const baseFileName = 'file';
            let fileNum = 0;
            const filesToUpload = [];
            let sdlFile = new SDL.manager.file.filetypes.SdlFile();
            sdlFile.setName(baseFileName + fileNum++);
            sdlFile.setFilePath('./test_icon_1.png');
            filesToUpload.push(sdlFile);

            sdlFile = new SDL.manager.file.filetypes.SdlFile();
            sdlFile.setName(baseFileName + fileNum++);
            sdlFile.setFileData(new Array(50));
            sdlFile.setPersistent(true);
            sdlFile.setType(SDL.rpc.enums.FileType.BINARY);
            filesToUpload.push(sdlFile);

            stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onPutFileSuccess);
            await fileManager.uploadFiles(filesToUpload);
            stub.restore();

            const uploadedFileNames = fileManager.getRemoteFileNames();
            Validator.assertTrue(uploadedFileNames.includes(filesToUpload[0].getName()));
            Validator.assertTrue(uploadedFileNames.includes(filesToUpload[1].getName()));

            stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onDeleteFileSuccess);
            await fileManager.deleteRemoteFilesWithNames(uploadedFileNames);
            stub.restore();

            Validator.assertTrue(!uploadedFileNames.includes(filesToUpload[0].getName()));
            Validator.assertTrue(!uploadedFileNames.includes(filesToUpload[1].getName()));

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.DeleteFile, expectSuccess);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testMultipleFileUploadPartialFailure', async function () {
            let firstFile = true;
            const expectSuccessThenFail = function (response) {
                if (firstFile) {
                    Validator.assertTrue(response.getSuccess());
                } else {
                    Validator.assertTrue(!response.getSuccess());
                }
                firstFile = !firstFile;
            };
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccessThenFail);

            let stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            const baseFileName = 'file';
            let fileNum = 0;
            const filesToUpload = [];
            let sdlFile = new SDL.manager.file.filetypes.SdlFile();
            sdlFile.setName(baseFileName + fileNum++);
            sdlFile.setFilePath('./test_icon_1.png');
            filesToUpload.push(sdlFile);

            sdlFile = new SDL.manager.file.filetypes.SdlFile();
            sdlFile.setName(baseFileName + fileNum++);
            sdlFile.setFileData(new Array(50));
            sdlFile.setPersistent(true);
            sdlFile.setType(SDL.rpc.enums.FileType.BINARY);
            filesToUpload.push(sdlFile);
            let uploadedFileNames = fileManager.getRemoteFileNames();

            stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onMultiplePutFileSuccess);
            await fileManager.uploadFiles(filesToUpload);
            stub.restore();

            uploadedFileNames = fileManager.getRemoteFileNames();
            Validator.assertTrue(!uploadedFileNames.includes(filesToUpload[0].getName()));
            Validator.assertTrue(uploadedFileNames.includes(filesToUpload[1].getName()));

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccessThenFail);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testMultipleArtworkUploadSuccess', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);

            let stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onMultipleListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            let fileNum = 1;
            const artworkToUpload = [];
            let sdlArtwork = new SDL.manager.file.filetypes.SdlArtwork()
                .setName(`art${fileNum++}`)
                .setFilePath('./test_icon_1.png')
                .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);
            artworkToUpload.push(sdlArtwork);

            sdlArtwork = new SDL.manager.file.filetypes.SdlArtwork()
                .setName(`art${fileNum++}`)
                .setFilePath('./test_icon_1.png')
                .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);
            artworkToUpload.push(sdlArtwork);

            stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onPutFileSuccess);
            await fileManager.uploadFiles(artworkToUpload);
            stub.restore();

            const uploadedFileNames = fileManager.getRemoteFileNames();
            for (const artwork of artworkToUpload) {
                Validator.assertTrue(uploadedFileNames.includes(artwork.getName()));
            }

            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testPersistentFileUploaded', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);

            const stub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(onListFilesSuccess);
            await fileManager._retrieveRemoteFiles();
            stub.restore();

            const file = new SDL.manager.file.filetypes.SdlFile();
            file.setName(Test.GENERAL_STRING_LIST[0]);
            file.setPersistent(true);
            Validator.assertTrue(fileManager.hasUploadedFile(file));
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });
    });
};