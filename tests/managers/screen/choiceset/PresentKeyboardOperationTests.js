const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('PresentKeyboardOperationTests', function () {
        const sdlManager = appClient._sdlManager;
        const keyboardListener = new SDL.manager.screen.choiceset._KeyboardListener();

        const csm = new SDL.manager.screen.choiceset._ChoiceSetManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('testGetPerformInteraction', function () {
            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                getKeyBoardProperties(), 'Test', null, keyboardListener, Test.GENERAL_INTEGER);

            const pi = presentKeyboardOperation._getPerformInteraction();

            Validator.assertEquals(pi.getInitialText(), 'Test');
            Validator.assertNull(pi.getHelpPrompt());
            Validator.assertNull(pi.getTimeoutPrompt());
            Validator.assertNull(pi.getVrHelp());
            Validator.assertEquals(pi.getInteractionLayout(), SDL.rpc.enums.LayoutMode.KEYBOARD);
            Validator.assertEquals(pi.getCancelID(), Test.GENERAL_INTEGER);
        });

        it('testCancelingKeyboardSuccessfullyIfThreadIsRunning', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                null, 'Test', null, null, Test.GENERAL_INTEGER);

            csm._canRunTasks = true;
            csm._addTask(presentKeyboardOperation);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.IN_PROGRESS);

            const cancelResponse = sinon.fake(cancelInteractionResponse(true));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            await presentKeyboardOperation._dismissKeyboard();

            await sleep(100);

            Validator.assertEquals(cancelResponse.called, true);
            Validator.assertEquals(performResponse.called, true);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingKeyboardUnsuccessfullyIfThreadIsRunning', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                null, 'Test', null, null, Test.GENERAL_INTEGER);

            csm._canRunTasks = true;
            csm._addTask(presentKeyboardOperation);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.IN_PROGRESS);

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            await presentKeyboardOperation._dismissKeyboard();
            await sleep(100);

            Validator.assertEquals(cancelResponse.called, true);
            Validator.assertEquals(performResponse.called, true);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingKeyboardIfThreadHasFinished', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                null, 'Test', null, null, Test.GENERAL_INTEGER);
            await presentKeyboardOperation._finishOperation();

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.FINISHED);

            await presentKeyboardOperation._dismissKeyboard();
            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingKeyboardIfThreadHasNotYetRun', async function () {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                null, 'Test', null, null, Test.GENERAL_INTEGER);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.READY);

            await presentKeyboardOperation._dismissKeyboard();
            await sleep(100);

            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.CANCELED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingKeyboardIfHeadUnitDoesNotSupportFeature', async function () {
            // Cancel Interaction is only supported on RPC specs v.6.0.0+
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(5)
                    .setMinorVersion(3)
                    .setPatchVersion(0));

            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                null, 'Test', null, null, Test.GENERAL_INTEGER);

            csm._canRunTasks = true;
            csm._addTask(presentKeyboardOperation);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.IN_PROGRESS);

            const cancelResponse = sinon.fake(cancelInteractionResponse(true));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            await presentKeyboardOperation._dismissKeyboard();

            await sleep(100);

            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, true);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.FINISHED);
            stub.restore();
            getVersionStub.restore();
        });

        it('testCancelingKeyboardIfHeadUnitDoesNotSupportFeatureButThreadIsNotRunning', async function () {
            // Cancel Interaction is only supported on RPC specs v.6.0.0+
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(5)
                    .setMinorVersion(3)
                    .setPatchVersion(0));

            const cancelResponse = sinon.fake(cancelInteractionResponse(false));
            const performResponse = sinon.fake(performInteractionResponse);
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.CancelInteraction)).callsFake(cancelResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.PerformInteraction)).callsFake(performResponse);
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(req => new SDL.rpc.messages.SetGlobalPropertiesResponse({
                functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
            }).setSuccess(true));

            const presentKeyboardOperation = new SDL.manager.screen.choiceset._PresentKeyboardOperation(sdlManager._lifecycleManager,
                null, 'Test', null, null, Test.GENERAL_INTEGER);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.READY);

            await presentKeyboardOperation._dismissKeyboard();
            await sleep(100);

            Validator.assertEquals(cancelResponse.called, false);
            Validator.assertEquals(performResponse.called, false);

            Validator.assertEquals(presentKeyboardOperation.getState(), SDL.manager._Task.CANCELED);
            stub.restore();
            getVersionStub.restore();
        });

        /**
         * Responds to CancelInteraction requests
         * @param {Boolean} success - Whether to respond positively
         * @returns {CancelInteractionResponse} - Response
         */
        function cancelInteractionResponse (success) {
            return function (req) {
                Validator.assertEquals(req.getCancelID(), Test.GENERAL_INTEGER);
                Validator.assertEquals(req.getFunctionIDParam(), SDL.rpc.enums.FunctionID.PerformInteraction);

                return new SDL.rpc.messages.CancelInteractionResponse({
                    functionName: SDL.rpc.enums.FunctionID.CancelInteraction,
                })
                    .setSuccess(success);
            };
        }

        /**
         * Responds to PerformInteraction requests
         * @returns {PerformInteractionResponse} - Response
         */
        function performInteractionResponse () {
            return new SDL.rpc.messages.PerformInteractionResponse({
                functionName: SDL.rpc.enums.FunctionID.PerformInteraction,
            })
                .setSuccess(true);
        }

        /**
         * Pauses execution
         * @param {Number} timeout - How long in milliseconds to pause
         * @returns {Promise} - Does not resolve to any value
         */
        function sleep (timeout = 1000) {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }

        /**
         * Creates a KeyboardProperties RPC
         * @returns {KeyboardProperties} - A KeyboardProperties RPC
         */
        function getKeyBoardProperties () {
            return new SDL.rpc.structs.KeyboardProperties()
                .setLanguage(SDL.rpc.enums.Language.EN_US)
                .setKeyboardLayout(SDL.rpc.enums.KeyboardLayout.QWERTZ)
                .setKeypressMode(SDL.rpc.enums.KeypressMode.RESEND_CURRENT_ENTRY);
        }
    });
};