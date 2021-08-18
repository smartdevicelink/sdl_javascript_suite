const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('MenuReplaceOperationTests', function () {
        const sdlManager = appClient._sdlManager;
        const cloneMenuCellsList = SDL.manager.screen.menu._MenuReplaceUtilities.cloneMenuCellsList;

        const mm = new SDL.manager.screen.menu._MenuManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('testSuccess', function (done) {
            const windowCapability = createWindowCapability(true, true, []);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST);
            const menuCell11 = new SDL.manager.screen.menu.MenuCell('cell 1_1')
                .setIcon(Test.GENERAL_ARTWORK);
            const menuCell1 = new SDL.manager.screen.menu.MenuCell('cell 1')
                .setIcon(Test.GENERAL_ARTWORK)
                .setSubCells([menuCell11]);
            const menuCell2 = new SDL.manager.screen.menu.MenuCell('cell 2');

            const currentMenu = [];
            const updatedMenu = cloneMenuCellsList([menuCell1, menuCell2]);

            SDL.manager.screen.menu._MenuReplaceUtilities.updateIdsOnMenuCells(updatedMenu, SDL.manager.screen.menu._MenuManagerBase.PARENT_ID_NOT_FOUND);

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

            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(1)
                    .setPatchVersion(0));

            const operation = new SDL.manager.screen.menu._MenuReplaceOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                windowCapability, menuConfiguration, currentMenu, updatedMenu, true, new SDL.manager.screen.menu._MenuManagerCompletionListener()
                    .setOnComplete((success, currentMenuCells) => {
                        Validator.assertTrue(success);
                        Validator.assertEquals(currentMenuCells, updatedMenu);

                        Validator.assertEquals(callbackCount, 3);
                        rpcResolveStub.restore();
                        getVersionStub.restore();
                        done();
                    }));


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        it('testSwitchingCellsOrder', function (done) {
            const windowCapability = createWindowCapability(true, true, []);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST);

            const menuCell1 = new SDL.manager.screen.menu.MenuCell('A').setSecondaryText('SecondaryText');
            const menuCell2 = new SDL.manager.screen.menu.MenuCell('A');
            const menuCell3 = new SDL.manager.screen.menu.MenuCell('C');

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

            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(1)
                    .setPatchVersion(0));

            const operation = new SDL.manager.screen.menu._MenuReplaceOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                windowCapability, menuConfiguration, [], cloneMenuCellsList([menuCell1, menuCell2, menuCell3]), true, new SDL.manager.screen.menu._MenuManagerCompletionListener()
                    .setOnComplete((success, currentMenuCells1) => {
                        Validator.assertTrue(success);
                        Validator.assertEquals(currentMenuCells1.length, 3);

                        Validator.assertEquals(currentMenuCells1[0]._getUniqueTitle(), 'A');
                        Validator.assertEquals(currentMenuCells1[1]._getUniqueTitle(), 'A (2)');
                        Validator.assertEquals(currentMenuCells1[2]._getUniqueTitle(), 'C');

                        Validator.assertEquals(callbackCount, 3);

                        const operation2 = new SDL.manager.screen.menu._MenuReplaceOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                            windowCapability, menuConfiguration, currentMenuCells1, cloneMenuCellsList([menuCell2, menuCell1]), true, new SDL.manager.screen.menu._MenuManagerCompletionListener()
                                .setOnComplete((success, currentMenuCells2) => {
                                    Validator.assertTrue(success);
                                    Validator.assertEquals(currentMenuCells2.length, 2);

                                    Validator.assertEquals(currentMenuCells2[0]._getUniqueTitle(), 'A');
                                    Validator.assertEquals(currentMenuCells2[1]._getUniqueTitle(), 'A (2)');

                                    Validator.assertEquals(callbackCount, 4);

                                    rpcResolveStub.restore();
                                    getVersionStub.restore();
                                    done();
                                }));

                        mm._addTask(operation2);
                    }));


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        it('testResendingSameCellWithDifferentListener', function (done) {
            const windowCapability = createWindowCapability(true, true, []);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST);

            const listener1 = new SDL.manager.screen.menu.MenuSelectionListener();
            const listener2 = new SDL.manager.screen.menu.MenuSelectionListener();
            const menuCell1 = new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(listener1);
            const menuCell2 = new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(listener2);

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

            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(1)
                    .setPatchVersion(0));

            const operation = new SDL.manager.screen.menu._MenuReplaceOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                windowCapability, menuConfiguration, [], cloneMenuCellsList([menuCell1]), true, new SDL.manager.screen.menu._MenuManagerCompletionListener()
                    .setOnComplete((success, currentMenuCells1) => {
                        Validator.assertTrue(success);
                        Validator.assertEquals(currentMenuCells1.length, 1);

                        Validator.assertEquals(currentMenuCells1[0].getMenuSelectionListener(), listener1);

                        Validator.assertEquals(callbackCount, 1);

                        const operation2 = new SDL.manager.screen.menu._MenuReplaceOperation(sdlManager._lifecycleManager, sdlManager._fileManager,
                            windowCapability, menuConfiguration, currentMenuCells1, cloneMenuCellsList([menuCell2]), true, new SDL.manager.screen.menu._MenuManagerCompletionListener()
                                .setOnComplete((success, currentMenuCells2) => {
                                    Validator.assertTrue(success);
                                    Validator.assertEquals(currentMenuCells2.length, 1);

                                    Validator.assertEquals(currentMenuCells2[0].getMenuSelectionListener(), listener2);

                                    Validator.assertEquals(callbackCount, 1);

                                    rpcResolveStub.restore();
                                    getVersionStub.restore();
                                    done();
                                }));

                        mm._addTask(operation2);
                    }));


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        /**
         * Creates a window capability
         * @param {Boolean} supportsList - Whether lists are supported
         * @param {Boolean} supportsTile - Whether tiles are supported
         * @param {TextField[]} supportedTextFields - Which text fields are supported
         * @returns {WindowCapability} - A generated window capability
         */
        function createWindowCapability (supportsList, supportsTile, supportedTextFields) {
            const supported = [];
            if (supportsList) {
                supported.push(SDL.rpc.enums.MenuLayout.LIST);
            }
            if (supportsTile) {
                supported.push(SDL.rpc.enums.MenuLayout.TILES);
            }
            return new SDL.rpc.structs.WindowCapability()
                .setMenuLayoutsAvailable(supported)
                .setTextFields(supportedTextFields);
        }
    });
};