const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const sinon = require('sinon');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('MenuShowOperationTests', function () {
        const sdlManager = appClient._sdlManager;

        const mm = new SDL.manager.screen.menu._MenuManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('testOpenMainMenu', async function () {
            const showAppResponse = sinon.fake(createShowAppMenuAnswer(true, null));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.ShowAppMenu)).callsFake(showAppResponse);

            const operation = new SDL.manager.screen.menu._MenuShowOperation(sdlManager._lifecycleManager, null);
            mm._canRunTasks = true;
            mm._addTask(operation);

            await sleep(500);

            Validator.assertEquals(showAppResponse.called, true);
            stub.restore();
        });

        it('testOpenSubMenu', async function () {
            const menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.TILES)
                ._setCellId(Test.GENERAL_INT);
            const showAppResponse = sinon.fake(createShowAppMenuAnswer(true, menuCell._getCellId()));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.ShowAppMenu)).callsFake(showAppResponse);

            const operation = new SDL.manager.screen.menu._MenuShowOperation(sdlManager._lifecycleManager, menuCell);
            mm._canRunTasks = true;
            mm._addTask(operation);

            await sleep(500);

            Validator.assertEquals(showAppResponse.called, true);
            stub.restore();
        });

        /**
         * Responds to ShowAppMenu requests
         * @param {Boolean} success - Whether to respond positively
         * @param {Number} menuIdToAssert - The menu ID to check against the request to ensure they match
         * @returns {ShowAppMenuResponse} - Response
         */
        function createShowAppMenuAnswer (success, menuIdToAssert) {
            return function (req) {
                Validator.assertEquals(req.getMenuID(), menuIdToAssert);
                return new SDL.rpc.messages.ShowAppMenuResponse({
                    functionName: SDL.rpc.enums.FunctionID.ShowAppMenuResponse,
                })
                    .setSuccess(success);
            };
        }

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