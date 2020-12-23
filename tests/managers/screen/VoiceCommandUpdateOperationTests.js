const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('VoiceCommandUpdateOperationTests', function () {
        const sdlManager = appClient._sdlManager;
        const lifecycleManager = sdlManager._lifecycleManager;

        const voiceCommand1 = new SDL.manager.screen.utils.VoiceCommand(['Command 1'], () => {});
        const voiceCommand2 = new SDL.manager.screen.utils.VoiceCommand(['Command 2'], () => {});
        const voiceCommand3 = new SDL.manager.screen.utils.VoiceCommand(['Command 3'], () => {});
        const voiceCommand4 = new SDL.manager.screen.utils.VoiceCommand(['Command 4'], () => {});

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
         * Sends a response for the RPC.
         * @param {FunctionID} req - The request's FunctionID.
         * @returns {RpcResponse} - A successful response.
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
         * Sends a response for the RPC.
         * @param {FunctionID} req - The request's FunctionID.
         * @returns {RpcResponse} - A failed response.
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
    });
};