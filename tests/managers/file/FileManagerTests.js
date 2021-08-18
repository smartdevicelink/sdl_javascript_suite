const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const SDL = require('../../config.js').node;

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
                functionName: SDL.rpc.enums.FunctionID.PutFile,
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
            const operation = new SDL.manager.file._UploadFileOperation(sdlManager._lifecycleManager, sdlManager.getFileManager(), new SDL.manager.file._SdlFileWrapper(sdlFile, (success, bytesAvailable, fileNames, errorMessage) => {
                Validator.assertTrue(!success);
            }));
            await operation.onExecute();
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

        /* it('testInitializationSuccess', function (done) {
            let stub;
            const expectSuccess = function (response) {
                Validator.assertEquals(fileManager.getRemoteFileNames(), Test.GENERAL_STRING_LIST);
                Validator.assertEquals(fileManager.getBytesAvailable(), Test.GENERAL_INT);

                // can't forget to remove the listener
                sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                Validator.assertTrue(response.getSuccess());

                // remove the stub on sendRpcResolve
                stub.restore();
                done();
            };

            // add a listener to verify success
            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);

            // "stubs" the sendRpcResolve so that any calls to it will instead go to onListFilesSuccess
            stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onListFilesSuccess);

            fileManager._retrieveRemoteFiles();
        });

        it('testInitializationFailure', async function () {
            const expectFailure = function (response) {
                Validator.assertTrue(!response.getSuccess());

                sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectFailure);
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectFailure);
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onListFilesFailure);

            await fileManager._retrieveRemoteFiles();
            stub.restore();
        });*/

        it('testFileUploadFailure', async function () {
            await new Promise (async resolve => {
                let stub;
                const expectSuccess = function (response) {
                    Validator.assertTrue(response.getSuccess());
                };
                const expectFailure = function (response) {
                    Validator.assertTrue(!response.getSuccess());

                    Validator.assertTrue(!fileManager.getRemoteFileNames().includes(validFile.getName()));
                    Validator.assertTrue(!fileManager.hasUploadedFile(validFile));

                    sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectFailure);
                    sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                    stub.restore();
                    resolve();
                };

                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectFailure);

                stub = sinon.stub(lifecycleManager, 'sendRpcResolve');
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.ListFiles))
                    .callsFake(onListFilesSuccess);
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PutFile))
                    .callsFake(onPutFileFailure);
                await fileManager._retrieveRemoteFiles();
                await fileManager.uploadFile(validFile);
            });
        });

        it('testFileUploadSuccess', async function () {
            await new Promise (async resolve => {
                let stub;
                const expectSuccess = function (response) {
                    Validator.assertTrue(response.getSuccess());
                };
                const expectPutFileSuccess = function (response) {
                    Validator.assertTrue(response.getSuccess());

                    Validator.assertEquals(response.getSpaceAvailable(), Test.GENERAL_INT);

                    sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectPutFileSuccess);
                    sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                    stub.restore();
                    resolve();
                };

                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectPutFileSuccess);

                stub = sinon.stub(lifecycleManager, 'sendRpcResolve');
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.ListFiles))
                    .callsFake(onListFilesSuccess);
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PutFile))
                    .callsFake(onPutFileSuccess);
                await fileManager._retrieveRemoteFiles();
                await fileManager.uploadFile(validFile);
            });
        });

        it('testNonPersistentFilesOnOlderVersions', async function () {
            const stub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(() => {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(4)
                        .setMinorVersion(3);
                });

            fileManager._remoteFiles.splice(0, fileManager._remoteFiles.length);
            fileManager._uploadedEphemeralFileNames.splice(0, fileManager._uploadedEphemeralFileNames.length);
            fileManager._remoteFiles.push(validFile.getName());
            const hasUploadedResult = fileManager.hasUploadedFile(validFile);
            stub.restore();

            Validator.assertTrue(!hasUploadedResult);
        });

        it('testNonPersistentFilesOnNewerVersions', async function () {
            const stub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(() => {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(5)
                        .setMinorVersion(0);
                });

            fileManager._remoteFiles.splice(0, fileManager._remoteFiles.length);
            fileManager._uploadedEphemeralFileNames.splice(0, fileManager._uploadedEphemeralFileNames.length);
            fileManager._remoteFiles.push(validFile.getName());
            const hasUploadedResult = fileManager.hasUploadedFile(validFile);
            stub.restore();

            Validator.assertTrue(hasUploadedResult);
        });

        it('testInvalidSdlFileInput', async function () {
            const expectSuccess = function (response) {
                Validator.assertTrue(response.getSuccess());
            };

            sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);

            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
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
            return new Promise (async resolve => {
                let stub;
                const expectSuccess = function (response) {
                    Validator.assertTrue(response.getSuccess());
                };

                const expectDeleteSuccess = function (response) {
                    Validator.assertTrue(response.getSuccess());
                };

                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);
                sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.DeleteFile, expectDeleteSuccess);

                stub = sinon.stub(lifecycleManager, 'sendRpcResolve');
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.ListFiles))
                    .callsFake(onListFilesSuccess);
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PutFile))
                    .callsFake(onPutFileSuccess);
                stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.DeleteFile))
                    .callsFake(onDeleteFileSuccess);
                await new Promise (async innerResolve => {
                    const listOperation = new SDL.manager.file._ListFilesOperation(sdlManager._lifecycleManager, (success, bytesAvailable, fileNames, errorMessage) => {
                        innerResolve();
                    });
                    await listOperation.onExecute();
                });

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

                await fileManager.uploadFiles(filesToUpload);
                
                const uploadedFileNames = fileManager.getRemoteFileNames();

                Validator.assertNull(await fileManager.deleteRemoteFilesWithNames([uploadedFileNames[0], uploadedFileNames[1]]));
                await new Promise (async innerResolve => {
                    const deleteOperation = new SDL.manager.file._DeleteFileOperation(sdlManager._lifecycleManager, uploadedFileNames[2], (success, bytesAvailable, fileNames, errorMessage) => {
                        Validator.assertTrue(success);
                        Validator.assertNull(errorMessage);
                        innerResolve();
                    });
                    // await deleteOperation.onExecute();
                    fileManager._addTask(deleteOperation);
                });

                sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.DeleteFile, expectDeleteSuccess);
                sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.PutFile, expectSuccess);
                sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
                stub.restore();
                resolve();
            });
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

            let stub = sinon.stub(lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.ListFiles))
                .callsFake(onListFilesSuccess);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PutFile))
                .callsFake(onMultiplePutFileSuccess);

            await new Promise (async resolve => {
                const listOperation = new SDL.manager.file._ListFilesOperation(sdlManager._lifecycleManager, (success, bytesAvailable, fileNames, errorMessage) => {
                    resolve();
                });
                await listOperation.onExecute();
            });

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

            await fileManager.uploadFiles(filesToUpload[0]);
            await new Promise (async resolve => {
                // this task will run after the previous
                const uploadOperation = new SDL.manager.file._UploadFileOperation(sdlManager._lifecycleManager, sdlManager._fileManager, new SDL.manager.file._SdlFileWrapper(filesToUpload[1], (success, bytesAvailable, fileNames, errorMessage) => {
                    resolve();
                }));
                sdlManager._fileManager._addTask(uploadOperation);
            });
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

            let stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onMultipleListFilesSuccess);
            await new Promise (async resolve => {
                const listOperation = new SDL.manager.file._ListFilesOperation(sdlManager._lifecycleManager, (success, bytesAvailable, fileNames, errorMessage) => {
                    resolve();
                });
                await listOperation.onExecute();
            });
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

            stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onPutFileSuccess);
            await fileManager.uploadFile(artworkToUpload[0]);
            await new Promise (async resolve => {
                // this task will run after the previous
                const uploadOperation = new SDL.manager.file._UploadFileOperation(sdlManager._lifecycleManager, sdlManager._fileManager, new SDL.manager.file._SdlFileWrapper(artworkToUpload[1], (success, bytesAvailable, fileNames, errorMessage) => {
                    Validator.assertTrue(success);
                    sdlManager._fileManager._remoteFiles.push(artworkToUpload[1].getName());
                    resolve();
                }));
                sdlManager._fileManager._addTask(uploadOperation);
            });
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

            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(onListFilesSuccess);
            await new Promise (async resolve => {
                const listOperation = new SDL.manager.file._ListFilesOperation(sdlManager._lifecycleManager, (success, bytesAvailable, fileNames, errorMessage) => {
                    sdlManager._fileManager._remoteFiles = fileNames;
                    resolve();
                });
                await listOperation.onExecute();
            });
            stub.restore();

            const file = new SDL.manager.file.filetypes.SdlFile();
            file.setName(Test.GENERAL_STRING_LIST[0]);
            file.setPersistent(true);
            Validator.assertTrue(fileManager.hasUploadedFile(file));
            sdlManager.removeRpcListener(SDL.rpc.enums.FunctionID.ListFiles, expectSuccess);
        });

        it('testCrcUndefinedVersion4', async function () {
            const stub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(() => {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(4)
                        .setMinorVersion(5);
                });

            const file = new SDL.manager.file.filetypes.SdlFile()
                .setName('hello')
                .setFilePath('./test_icon_1.png')
                .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setPersistent(true);

            const putFile = await fileManager._createPutFile(file);

            Validator.assertNull(putFile.getCrc());
            stub.restore();
        });

        it('testCrcAssignmentFilePath', async function () {
            const file = new SDL.manager.file.filetypes.SdlFile()
                .setName('hello')
                .setFilePath('./test_icon_1.png')
                .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setPersistent(true);

            const putFile = await fileManager._createPutFile(file);

            Validator.assertNotNullUndefined(putFile.getCrc());
        });

        it('testCorrectCrcValue', async function () {
            // set the file data to an input with an output that we expect to know
            const file1 = new SDL.manager.file.filetypes.SdlFile()
                .setName('hello')
                .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFileData(SDL.util._JsonRpcMarshaller._encode('abcde'))
                .setPersistent(true);

            const putFile1 = await fileManager._createPutFile(file1);
            Validator.assertEquals(putFile1.getCrc(), 2240272485);

            const file2 = new SDL.manager.file.filetypes.SdlFile()
                .setName('hello')
                .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFileData(SDL.util._JsonRpcMarshaller._encode('it is Wednesday my dudes'))
                .setPersistent(true);

            const putFile2 = await fileManager._createPutFile(file2);
            Validator.assertEquals(putFile2.getCrc(), 801050498);
        });
    });
};