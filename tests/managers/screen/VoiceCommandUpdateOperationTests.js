const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('VoiceCommandUpdateOperationTests', function () {
        const sdlManager = appClient._sdlManager;
        const lifecycleManager = sdlManager._lifecycleManager;
        const voiceCommandManager = sdlManager.getScreenManager()._voiceCommandManager;

        const voiceCommand1 = new SDL.manager.screen.utils.VoiceCommand(['Command 1'], () => {});
        const voiceCommand2 = new SDL.manager.screen.utils.VoiceCommand(['Command 2'], () => {});
        const voiceCommand3 = new SDL.manager.screen.utils.VoiceCommand(['Command 3'], () => {});
        const voiceCommand4 = new SDL.manager.screen.utils.VoiceCommand(['Command 4'], () => {});
        const voiceCommand5 = new SDL.manager.screen.utils.VoiceCommand(['Command 1', 'Command 2', 'Command 3', 'Command 4'], () => {});

        let deleteList = [];
        let addList = [];

        let voiceCommandUpdateOperation = null;

        beforeEach(function (done) {
            voiceCommand1._setCommandId(1);
            voiceCommand2._setCommandId(2);
            voiceCommand3._setCommandId(3);
            voiceCommand4._setCommandId(4);
            deleteList = [voiceCommand1, voiceCommand2];
            addList = [voiceCommand3, voiceCommand4];

            voiceCommandUpdateOperation = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(lifecycleManager, deleteList, addList, () => {});
            done();
        });

        it('verifyCanceledTaskDoesNotSendAnyRPCs', async function () {
            const callback = sinon.fake(onDeleteOrAddCommandSuccess);
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(callback);

            voiceCommandUpdateOperation.switchStates(SDL.manager._Task.CANCELED);
            await voiceCommandUpdateOperation.onExecute();

            Validator.assertEquals(callback.called, false);
            stub.restore();
        });

        it('verifyErrorObjectIsSetCorrectly', async function () {
            const callback = sinon.fake(onDeleteOrAddCommandFails);
            const vcOperationCallback = sinon.fake((newVoiceCommands, errorArray) => {
                Validator.assertEquals(errorArray.length, 4);
                Validator.assertEquals(newVoiceCommands.length, 2);

                Validator.assertEquals(newVoiceCommands[0].getVoiceCommands()[0], voiceCommand1.getVoiceCommands()[0]);
                Validator.assertEquals(newVoiceCommands[1].getVoiceCommands()[0], voiceCommand2.getVoiceCommands()[0]);
            });
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(callback);

            voiceCommandUpdateOperation = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(lifecycleManager, deleteList, addList, vcOperationCallback);

            await voiceCommandUpdateOperation.onExecute();

            Validator.assertEquals(vcOperationCallback.called, true);
            stub.restore();
        });

        it('verifySuccessIsSetCorrectly', async function () {
            const callback = sinon.fake(onDeleteOrAddCommandSuccess);
            const vcOperationCallback = sinon.fake((newVoiceCommands, errorArray) => {
                Validator.assertEquals(errorArray.length, 0);
                Validator.assertEquals(newVoiceCommands.length, 2);

                Validator.assertEquals(newVoiceCommands[0].getVoiceCommands()[0], voiceCommand3.getVoiceCommands()[0]);
                Validator.assertEquals(newVoiceCommands[1].getVoiceCommands()[0], voiceCommand4.getVoiceCommands()[0]);
            });
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(callback);

            voiceCommandUpdateOperation = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(lifecycleManager, deleteList, addList, vcOperationCallback);

            await voiceCommandUpdateOperation.onExecute();

            Validator.assertEquals(vcOperationCallback.called, true);
            stub.restore();
        });

        it('verifySendingAnEmptyListWillClearVoiceCommands', async function () {
            const callback = sinon.fake(onDeleteOrAddCommandSuccess);
            const vcOperationCallback = sinon.fake((newVoiceCommands, errorArray) => {
                Validator.assertEquals(errorArray.length, 0);
                Validator.assertEquals(newVoiceCommands.length, 0);
            });
            const stub = sinon.stub(lifecycleManager, 'sendRpcResolve')
                .callsFake(callback);

            voiceCommandUpdateOperation = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(lifecycleManager, deleteList, [], vcOperationCallback);

            await voiceCommandUpdateOperation.onExecute();

            Validator.assertEquals(vcOperationCallback.called, true);
            stub.restore();
        });

        /**
         * Will always resolve successfully
         * @param {AddCommand|DeleteCommand} req - The RPC to send out as a request
         * @returns {AddCommandResponse|DeleteCommandResponse} - The rpc returned depends on the request
         */
        function onDeleteOrAddCommandSuccess (req) {
            const functionId = req.getFunctionId();

            if (SDL.rpc.enums.FunctionID[functionId] === SDL.rpc.enums.FunctionID.AddCommand) {
                return new SDL.rpc.messages.AddCommandResponse({
                    functionName: SDL.rpc.enums.FunctionID.AddCommand,
                })
                    .setSuccess(true);
            }
            if (SDL.rpc.enums.FunctionID[functionId] === SDL.rpc.enums.FunctionID.DeleteCommand) {
                return new SDL.rpc.messages.DeleteCommandResponse({
                    functionName: SDL.rpc.enums.FunctionID.DeleteCommand,
                })
                    .setSuccess(true);
            }
        }

        /**
         * Will always resolve unsuccessfully
         * @param {AddCommand|DeleteCommand} req - The RPC to send out as a request
         * @returns {AddCommandResponse|DeleteCommandResponse} - The rpc returned depends on the request
         */
        function onDeleteOrAddCommandFails (req) {
            const functionId = req.getFunctionId();

            if (SDL.rpc.enums.FunctionID[functionId] === SDL.rpc.enums.FunctionID.AddCommand) {
                return new SDL.rpc.messages.AddCommandResponse({
                    functionName: SDL.rpc.enums.FunctionID.AddCommand,
                })
                    .setSuccess(false);
            }
            if (SDL.rpc.enums.FunctionID[functionId] === SDL.rpc.enums.FunctionID.DeleteCommand) {
                return new SDL.rpc.messages.DeleteCommandResponse({
                    functionName: SDL.rpc.enums.FunctionID.DeleteCommand,
                })
                    .setSuccess(false);
            }
        }

        describe('when updating oldVoiceCommands', function () {
            let testOp;
            beforeEach(function () {
                testOp = new SDL.manager.screen.utils._VoiceCommandUpdateOperation();
                testOp._oldVoiceCommands = [voiceCommand5];
                testOp._currentVoiceCommands = Array.from([voiceCommand5]);
            });

            // should update both oldVoiceCommands and currentVoiceCommands
            it('should update both oldVoiceCommands and currentVoiceCommands', function (done) {
                Validator.assertEquals(testOp._oldVoiceCommands, [voiceCommand5]);
                Validator.assertEquals(testOp._currentVoiceCommands, testOp._oldVoiceCommands);
                done();
            });
        });

        describe('if it has pending voice commands identical to old voice commands', function () {
            let callbackCurrentVoiceCommands;
            let callbackError;
            beforeEach(async function () {
                const testOp = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(voiceCommandManager._lifecycleManager, [voiceCommand1, voiceCommand2], [voiceCommand1, voiceCommand2], (newCurrentVoiceCommands, errorArray) => {
                    callbackCurrentVoiceCommands = newCurrentVoiceCommands;
                    callbackError = errorArray;
                });
                await testOp.onExecute();
            });
            it('Should not delete or upload the voiceCommands', function (done) {
                Validator.assertEquals(callbackCurrentVoiceCommands.length, 2);
                console.log(callbackError);
                Validator.assertEquals(callbackError.length, 0);
                done();
            });
        });

        // going from voice commands [AB] to [A]
        describe('going from voice commands [AB] to [A]', function () {
            /**
             * Handle Delete successes.
             * @returns {Promise} - A promise.
             */
            function onDeleteSuccess () {
                const deleteOld1 = new SDL.rpc.messages.DeleteCommandResponse({
                    functionName: SDL.rpc.enums.FunctionID.DeleteCommandResponse,
                })
                    .setSuccess(true)
                    .setResultCode(SDL.rpc.enums.Result.SUCCESS);

                sdlManager._lifecycleManager._handleRpc(deleteOld1);

                return new Promise((resolve, reject) => {
                    resolve(deleteOld1);
                });
            }

            let stub;
            let callbackCurrentVoiceCommands;
            let callbackError;
            before(async () => {
                stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve')
                    .callsFake(onDeleteSuccess);
                const testOp = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(voiceCommandManager._lifecycleManager, [voiceCommand1, voiceCommand2], [voiceCommand1], (newCurrentVoiceCommands, errorArray) => {
                    callbackCurrentVoiceCommands = newCurrentVoiceCommands;
                    callbackError = errorArray;
                });
                await testOp.onExecute();
            });

            // and the delete succeeds
            describe('and the delete succeeds', function () {
                it('Should only delete voiceCommands thats not in common', function (done) {
                    Validator.assertEquals(callbackCurrentVoiceCommands.length, 1);
                    Validator.assertEquals(callbackError.length, 0);
                    done();
                });
            });

            after(() => {
                stub.restore();
            });
        });

        // going from voice commands [A] to [AB]
        describe('going from voice commands [A] to [AB]', function () {
            /**
             * Handle Add successes.
             * @returns {Promise} - A promise.
             */
            function onAddCommandSuccess () {
                const addNew1 = new SDL.rpc.messages.AddCommandResponse({
                    functionName: SDL.rpc.enums.FunctionID.AddCommandResponse,
                })
                    .setSuccess(true)
                    .setResultCode(SDL.rpc.enums.Result.SUCCESS);
                // _handleRpc triggers the listener
                sdlManager._lifecycleManager._handleRpc(addNew1);

                return new Promise((resolve, reject) => {
                    resolve(addNew1);
                });
            }

            let stub;
            let callbackCurrentVoiceCommands;
            let callbackError;

            beforeEach(async function () {
                stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve')
                    .callsFake(onAddCommandSuccess);
                const testOp = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(voiceCommandManager._lifecycleManager, [voiceCommand1], [voiceCommand1, voiceCommand2], (newCurrentVoiceCommands, errorArray) => {
                    callbackCurrentVoiceCommands = newCurrentVoiceCommands;
                    callbackError = errorArray;
                });
                await testOp.onExecute();
            });

            // and the add succeeds
            describe('and the add succeeds', function () {
                it('should only upload the voiceCommand thats not in common and not delete anything', function (done) {
                    Validator.assertEquals(callbackCurrentVoiceCommands.length, 2);
                    Validator.assertEquals(callbackError.length, 0);
                    done();
                });
            });

            after(() => {
                stub.restore();
            });
        });

        // going from voice commands [AB] to [CD]
        describe('going from voice commands [AB] to [CD]', function () {
            /**
             * Handle Add or Delete successes.
             * @param {RpcMessage} rpc - an AddCommand or DeleteCommand rpc
             * @returns {Promise} - A promise.
             */
            function onAddOrDeleteSuccess (rpc) {
                if (rpc instanceof SDL.rpc.messages.AddCommand) {
                    const addNew1 = new SDL.rpc.messages.AddCommandResponse({
                        functionName: SDL.rpc.enums.FunctionID.AddCommandResponse,
                    })
                        .setSuccess(true)
                        .setResultCode(SDL.rpc.enums.Result.SUCCESS);
                    // _handleRpc triggers the listener
                    sdlManager._lifecycleManager._handleRpc(addNew1);

                    return new Promise((resolve, reject) => {
                        resolve(addNew1);
                    });
                } else if (rpc instanceof SDL.rpc.messages.DeleteCommand) {
                    const deleteOld1 = new SDL.rpc.messages.DeleteCommandResponse({
                        functionName: SDL.rpc.enums.FunctionID.DeleteCommandResponse,
                    })
                        .setSuccess(true)
                        .setResultCode(SDL.rpc.enums.Result.SUCCESS);
                    // _handleRpc triggers the listener
                    sdlManager._lifecycleManager._handleRpc(deleteOld1);

                    return new Promise((resolve, reject) => {
                        resolve(deleteOld1);
                    });
                }
                return;
            }

            let stub;
            let callbackCurrentVoiceCommands;
            let callbackError;

            before(async () => {
                stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve')
                    .callsFake(onAddOrDeleteSuccess);
                const testOp = new SDL.manager.screen.utils._VoiceCommandUpdateOperation(voiceCommandManager._lifecycleManager, [voiceCommand1, voiceCommand2], [voiceCommand5], (newCurrentVoiceCommands, errorArray) => {
                    callbackCurrentVoiceCommands = newCurrentVoiceCommands;
                    callbackError = errorArray;
                });
                await testOp.onExecute();
            });

            // the delete and add commands succeeds
            describe('the delete and add commands succeeds', function () {
                it('should delete and upload the voiceCommands', function (done) {
                    Validator.assertEquals(callbackCurrentVoiceCommands[0].getVoiceCommands().length, 4);
                    Validator.assertEquals(callbackError.length, 0);
                    done();
                });
            });

            after(() => {
                stub.restore();
            });
        });
    });
};