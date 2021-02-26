const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('MenuReplaceOperationTests', function () {
        const sdlManager = appClient._sdlManager;

        let lastMenuId = SDL.manager.screen.menu._MenuManagerBase.MENU_CELL_ID_MIN;

        const mm = new SDL.manager.screen.menu._MenuManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('testSuccess', function (done) {
            const windowCapability = createWindowCapability(true, true);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST);
            const currentMenu = [];
            const menuCell11 = new SDL.manager.screen.menu.MenuCell('cell 1_1')
                .setIcon(Test.GENERAL_ARTWORK);
            const menuCell1 = new SDL.manager.screen.menu.MenuCell('cell 1')
                .setIcon(Test.GENERAL_ARTWORK)
                .setSubCells([menuCell11]);
            const menuCell2 = new SDL.manager.screen.menu.MenuCell('cell 2');

            const updatedMenu = [menuCell1, menuCell2];

            updateIdsOnMenuCells(updatedMenu, SDL.manager.screen.menu._MenuManagerBase.PARENT_ID_NOT_FOUND);

            let callbackCount = 0;

            const callback = sinon.fake(async req => {
                callbackCount++;
                const functionValue = SDL.rpc.enums.FunctionID.valueForKey(req.getFunctionId());
                const responseName = `${req.getFunctionId()}Response`;

                return new SDL.rpc.messages[responseName]()
                    .setSuccess(true)
                    .setFunctionId(functionValue);
            });
            const rpcResolveStub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            rpcResolveStub.callsFake(callback);

            const operation = new SDL.manager.screen.menu._MenuReplaceOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                windowCapability, menuConfiguration, currentMenu, updatedMenu, true, new SDL.manager.screen.menu._MenuManagerCompletionListener()
                    .setOnComplete((success, currentMenuCells) => {
                        Validator.assertTrue(success);
                        Validator.assertEquals(currentMenuCells, updatedMenu);

                        Validator.assertEquals(callbackCount, 3);
                        rpcResolveStub.restore();
                        done();
                    }));


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        /**
         * Creates a window capability
         * @param {Boolean} supportsList - Whether lists are supported
         * @param {Boolean} supportsTile - Whether tiles are supported
         * @returns {WindowCapability} - A generated window capability
         */
        function createWindowCapability (supportsList, supportsTile) {
            const supported = [];
            if (supportsList) {
                supported.push(SDL.rpc.enums.MenuLayout.LIST);
            }
            if (supportsTile) {
                supported.push(SDL.rpc.enums.MenuLayout.TILES);
            }
            return new SDL.rpc.structs.WindowCapability()
                .setMenuLayoutsAvailable(supported);
        }
        /**
         * Updates menu cells using the ID passed in
         * @param {MenuCell[]} menuCells - The menu cells to update
         * @param {Number} parentId - The ID to use
         */
        function updateIdsOnMenuCells (menuCells, parentId) {
            menuCells.forEach(cell => {
                cell._setCellId(lastMenuId++);
                if (parentId !== SDL.manager.screen.menu._MenuManagerBase.PARENT_ID_NOT_FOUND) {
                    cell._setParentCellId(parentId);
                }
                if (cell.getSubCells() !== null && cell.getSubCells().length !== 0) {
                    updateIdsOnMenuCells(cell.getSubCells(), cell._getCellId());
                }
            });
        }
    });
};