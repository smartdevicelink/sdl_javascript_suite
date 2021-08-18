const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('MenuManagerTests', function () {
        const sdlManager = appClient._sdlManager;

        let cells = null;
        let mainCell1 = null;
        let mainCell4 = null;
        let getVersionStub = null;
        let rpcResolveStub = null;
        const mockMenuListenerA = new SDL.manager.screen.menu.MenuSelectionListener();
        const mockMenuListenerB = new SDL.manager.screen.menu.MenuSelectionListener();
        const mockMenuListenerC = new SDL.manager.screen.menu.MenuSelectionListener();
        const mockMenuListenerD = new SDL.manager.screen.menu.MenuSelectionListener();
        const mockMenuListenerE = new SDL.manager.screen.menu.MenuSelectionListener();
        const mockMenuListenerF = new SDL.manager.screen.menu.MenuSelectionListener();

        const mm = new SDL.manager.screen.menu._MenuManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        before('setup', function () {
            cells = createTestCells();

            getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(6)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            rpcResolveStub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            rpcResolveStub.callsFake(async req => {
                const functionValue = SDL.rpc.enums.FunctionID.valueForKey(req.getFunctionId());
                const responseName = `${req.getFunctionId()}Response`;

                return new SDL.rpc.messages[responseName]()
                    .setSuccess(true)
                    .setFunctionId(functionValue);
            });

            Validator.assertEquals(mm._getState(), SDL.manager._SubManagerBase.SETTING_UP);
            Validator.assertEquals(mm._currentSystemContext, SDL.rpc.enums.SystemContext.SYSCTXT_MAIN);
            Validator.assertEquals(mm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.ON_WITH_COMPAT_MODE);
            Validator.assertTrue(mm._menuCells.length === 0);
            Validator.assertTrue(mm._currentMenuCells.length === 0);
            Validator.assertNull(mm._menuConfiguration.getMenuLayout());
            Validator.assertNull(mm._menuConfiguration.getSubMenuLayout());
            Validator.assertNotNullUndefined(mm._hmiListener);
            Validator.assertNotNullUndefined(mm._commandListener);
            Validator.assertNotNullUndefined(mm._onDisplayCapabilityListener);
        });

        after('teardown', function () {
            getVersionStub.restore();
            rpcResolveStub.restore();
        });

        it('testStartMenuManager', async function () {
            await mm.start();
            Validator.assertEquals(mm._getState(), SDL.manager._SubManagerBase.READY);
        });

        it('testHmiNotReady', async function () {
            mm._setMenuCells(cells);
            Validator.assertEquals(mm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);
            Validator.assertTrue(mm._currentMenuCells.length === 0);
            // The Menu Manager should send new menu once HMI full occurs
            sendFakeCoreOnHmiFullNotifications();
            // Listener should be triggered - which sets new HMI level and should proceed to send our pending update
            Validator.assertEquals(mm._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_FULL);
            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);
            Validator.assertTrue(!mm._currentMenuCells.map((menuCell, index) => menuCell.equals(cells[index])).includes(false));
        });

        it('testUpdatingOldWay', async function () {
            // Force Menu Manager to use the old way of deleting / sending all
            mm._setDynamicMenuUpdatesMode(SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_OFF);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_OFF);
            // when we only send one command to update, we should only be returned one add command
            const newArray = [mainCell1, mainCell4];
            Validator.assertEquals(SDL.manager.screen.menu._MenuReplaceUtilities.allCommandsForCells(newArray, mm._fileManager, mm._windowCapability, SDL.rpc.enums.MenuLayout.LIST).length, 4);
            mm._currentHmiLevel = SDL.rpc.enums.HMILevel.HMI_FULL;
            mm._setMenuCells(newArray);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            mm._currentMenuCells.forEach(cell => {
                const callback = sinon.fake(() => {});
                const stub = sinon.stub(cell, 'getMenuSelectionListener')
                    .callsFake(callback);

                // grab 2 of our newly updated cells - 1 root and 1 sub cell, and make sure they can get triggered
                if (cell.getTitle().toLowerCase() === 'Test Cell 1'.toLowerCase()) {
                    // Fake onCommand - we want to make sure that we can pass back onCommand events to our root Menu Cell
                    const onCommand = new SDL.rpc.messages.OnCommand()
                        .setCmdID(cell._getCellId())
                        .setTriggerSource(SDL.rpc.enums.TriggerSource.TS_MENU); // these are menu commands
                    mm._commandListener(onCommand);

                    // verify the mock listener has only been hit once for a root cell
                    // cell.getMenuSelectionListener().onTriggered(SDL.rpc.enums.TriggerSource.TS_MENU);
                    Validator.assertEquals(callback.calledOnce, true);
                }

                if (cell.getTitle().toLowerCase() === 'SubCell 2'.toLowerCase()) {
                    // Fake onCommand - we want to make sure that we can pass back onCommand events to our sub Menu Cell
                    const onCommand2 = new SDL.rpc.messages.OnCommand()
                        .setCmdID(cell._getCellId())
                        .setTriggerSource(SDL.rpc.enums.TriggerSource.TS_MENU); // these are menu commands
                    mm._commandListener(onCommand2);

                    // verify the mock listener has only been hit once for a sub cell
                    // cell.getMenuSelectionListener().onTriggered(SDL.rpc.enums.TriggerSource.TS_MENU);
                    Validator.assertEquals(callback.calledOnce, true);
                }
                stub.restore();
            });
        });

        it('testAlgorithmTest1', async function () {
            // Force Menu Manager to use the new way
            mm._setDynamicMenuUpdatesMode(SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);

            // start fresh
            mm._currentMenuCells = [];
            mm._menuCells = [];

            sendFakeCoreOnHmiFullNotifications();

            // send new cells. They should set the old way
            const oldMenu = createDynamicMenu1();
            const newMenu = createDynamicMenu1New();
            mm._setMenuCells(oldMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 4);

            mm._setMenuCells(newMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // this happens in the menu manager but lets make sure its behaving
            const runScore = SDL.manager.screen.menu._DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(oldMenu, newMenu);

            const MenuCellState = SDL.manager.screen.menu.enums._MenuCellState;
            const oldMenuStatus = [MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP];
            const newMenuStatus = [MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.ADD];

            Validator.assertEquals(runScore.getScore(), 1);
            Validator.assertEquals(runScore.getOldStatus(), oldMenuStatus);
            Validator.assertEquals(runScore.getUpdatedStatus(), newMenuStatus);

            Validator.assertEquals(mm._currentMenuCells.length, 5);
            const oldKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getOldStatus(), MenuCellState.KEEP);
            const newKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getUpdatedStatus(), MenuCellState.KEEP);
            Validator.assertEquals(oldKeeps.length, 4);
            Validator.assertEquals(newKeeps.length, 4);
        });

        it('testAlgorithmTest2', async function () {
            // Force Menu Manager to use the new way
            mm._setDynamicMenuUpdatesMode(SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);

            // start fresh
            mm._currentMenuCells = [];
            mm._menuCells = [];

            sendFakeCoreOnHmiFullNotifications();

            // send new cells. They should set the old way
            const oldMenu = createDynamicMenu2();
            const newMenu = createDynamicMenu2New();
            mm._setMenuCells(oldMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 4);

            mm._setMenuCells(newMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // this happens in the menu manager but lets make sure its behaving
            const runScore = SDL.manager.screen.menu._DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(oldMenu, newMenu);

            const MenuCellState = SDL.manager.screen.menu.enums._MenuCellState;
            const oldMenuStatus = [MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.DELETE];
            const newMenuStatus = [MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP];

            Validator.assertEquals(runScore.getScore(), 0);
            Validator.assertEquals(runScore.getOldStatus(), oldMenuStatus);
            Validator.assertEquals(runScore.getUpdatedStatus(), newMenuStatus);

            Validator.assertEquals(mm._currentMenuCells.length, 3);
            const oldKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getOldStatus(), MenuCellState.KEEP);
            const newKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getUpdatedStatus(), MenuCellState.KEEP);
            Validator.assertEquals(oldKeeps.length, 3);
            Validator.assertEquals(newKeeps.length, 3);
        });

        it('testAlgorithmTest3', async function () {
            // Force Menu Manager to use the new way
            mm._setDynamicMenuUpdatesMode(SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);

            // start fresh
            mm._currentMenuCells = [];
            mm._menuCells = [];

            sendFakeCoreOnHmiFullNotifications();

            // send new cells. They should set the old way
            const oldMenu = createDynamicMenu3();
            const newMenu = createDynamicMenu3New();
            mm._setMenuCells(oldMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 3);

            mm._setMenuCells(newMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // this happens in the menu manager but lets make sure its behaving
            const runScore = SDL.manager.screen.menu._DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(oldMenu, newMenu);

            const MenuCellState = SDL.manager.screen.menu.enums._MenuCellState;
            const oldMenuStatus = [MenuCellState.DELETE, MenuCellState.DELETE, MenuCellState.DELETE];
            const newMenuStatus = [MenuCellState.ADD, MenuCellState.ADD, MenuCellState.ADD];

            Validator.assertEquals(runScore.getScore(), 3);
            Validator.assertEquals(runScore.getOldStatus(), oldMenuStatus);
            Validator.assertEquals(runScore.getUpdatedStatus(), newMenuStatus);

            Validator.assertEquals(mm._currentMenuCells.length, 3);
            const oldKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getOldStatus(), MenuCellState.KEEP);
            const newKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getUpdatedStatus(), MenuCellState.KEEP);
            Validator.assertEquals(oldKeeps.length, 0);
            Validator.assertEquals(newKeeps.length, 0);
        });

        it('testAlgorithmTest4', async function () {
            // Force Menu Manager to use the new way
            mm._setDynamicMenuUpdatesMode(SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);

            // start fresh
            mm._currentMenuCells = [];
            mm._menuCells = [];

            sendFakeCoreOnHmiFullNotifications();

            // send new cells. They should set the old way
            const oldMenu = createDynamicMenu4();
            const newMenu = createDynamicMenu4New();
            mm._setMenuCells(oldMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 4);

            mm._setMenuCells(newMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // this happens in the menu manager but lets make sure its behaving
            const runScore = SDL.manager.screen.menu._DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(oldMenu, newMenu);

            const MenuCellState = SDL.manager.screen.menu.enums._MenuCellState;
            const oldMenuStatus = [MenuCellState.KEEP, MenuCellState.DELETE, MenuCellState.KEEP, MenuCellState.DELETE];
            const newMenuStatus = [MenuCellState.ADD, MenuCellState.KEEP, MenuCellState.ADD, MenuCellState.KEEP];

            Validator.assertEquals(runScore.getScore(), 2);
            Validator.assertEquals(runScore.getOldStatus(), oldMenuStatus);
            Validator.assertEquals(runScore.getUpdatedStatus(), newMenuStatus);

            Validator.assertEquals(mm._currentMenuCells.length, 4);
            const oldKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getOldStatus(), MenuCellState.KEEP);
            const newKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getUpdatedStatus(), MenuCellState.KEEP);
            Validator.assertEquals(oldKeeps.length, 2);
            Validator.assertEquals(newKeeps.length, 2);
        });

        it('testAlgorithmTest5', async function () {
            // Force Menu Manager to use the new way
            mm._setDynamicMenuUpdatesMode(SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);
            Validator.assertEquals(mm._dynamicMenuUpdatesMode, SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.FORCE_ON);

            // start fresh
            mm._currentMenuCells = [];
            mm._menuCells = [];

            sendFakeCoreOnHmiFullNotifications();

            // send new cells. They should set the old way
            const oldMenu = createDynamicMenu5();
            const newMenu = createDynamicMenu5New();
            mm._setMenuCells(oldMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 4);

            mm._setMenuCells(newMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // this happens in the menu manager but lets make sure its behaving
            const runScore = SDL.manager.screen.menu._DynamicMenuUpdateAlgorithm.dynamicRunScoreOldMenuCells(oldMenu, newMenu);

            const MenuCellState = SDL.manager.screen.menu.enums._MenuCellState;
            const oldMenuStatus = [MenuCellState.DELETE, MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP];
            const newMenuStatus = [MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.KEEP, MenuCellState.ADD];

            Validator.assertEquals(runScore.getScore(), 1);
            Validator.assertEquals(runScore.getOldStatus(), oldMenuStatus);
            Validator.assertEquals(runScore.getUpdatedStatus(), newMenuStatus);

            Validator.assertEquals(mm._currentMenuCells.length, 4);
            const oldKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getOldStatus(), MenuCellState.KEEP);
            const newKeeps = filterMenuCellsWithStatusList(mm._currentMenuCells, runScore.getUpdatedStatus(), MenuCellState.KEEP);
            Validator.assertEquals(oldKeeps.length, 3);
            Validator.assertEquals(newKeeps.length, 3);
        });

        it('testClearingMenu', async function () {
            // Make sure we can send an empty menu with no issues
            // start fresh
            mm._currentMenuCells = [];
            mm._menuCells = [];

            sendFakeCoreOnHmiFullNotifications();

            // send new cells. They should set the old way
            const oldMenu = createDynamicMenu1();
            const newMenu = [];
            mm._setMenuCells(oldMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 4);

            mm._setMenuCells(newMenu);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            Validator.assertEquals(mm._currentMenuCells.length, 0);
        });

        it('testOpeningMainMenu', async function () {
            // call open Menu
            const callback = sinon.fake(() => {});
            const stub = sinon.stub(mm, '_openMenu')
                .callsFake(callback);
            mm._openMenu();
            Validator.assertEquals(callback.calledOnce, true);
            stub.restore();
        });

        it('testOpeningSubMenuNullCells', async function () {
            // call open Menu
            mm._currentMenuCells = null;
            Validator.assertEquals(mm._openSubMenu(new SDL.manager.screen.menu.MenuCell('hi')), false);
        });

        it('testOpeningSubMenu', async function () {
            // call open Menu
            const testCells = createTestCells();
            mm._setMenuCells(testCells);

            sendFakeCoreOnHmiFullNotifications();

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // Has to get success response to be true
            Validator.assertEquals(mm._openSubMenu(testCells[3]), true);
        });

        it('testSetMenuConfiguration', async function () {
            sendFakeCoreOnHmiFullNotifications();

            mm._windowCapability = new SDL.rpc.structs.WindowCapability()
                .setMenuLayoutsAvailable([SDL.rpc.enums.MenuLayout.LIST, SDL.rpc.enums.MenuLayout.TILES]);

            const menuConfigurationTest = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST);

            mm._setMenuConfiguration(menuConfigurationTest);

            // Sleep to give time to Taskmaster to run the operations
            await sleep(500);

            // Has to get success response to be true
            Validator.assertEquals(mm._menuConfiguration, menuConfigurationTest);
        });

        /**
         * Send HMI_FULL to menu manager hmi listener
         */
        function sendFakeCoreOnHmiFullNotifications () {
            mm._hmiListener(new SDL.rpc.messages.OnHMIStatus()
                .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL)
                .setSystemContext(SDL.rpc.enums.SystemContext.SYSCTXT_MAIN));
        }

        /**
         * Filters menu cells for a certain cell state
         * @param {MenuCell[]} menuCells - The menu cells
         * @param {MenuCellState[]} statusList - The state of the menu cells
         * @param {MenuCellState} menuCellState - The cell state to use for searching
         * @returns {MenuCell[]} - All menu cells with a state matching the menuCellState
         */
        function filterMenuCellsWithStatusList (menuCells, statusList, menuCellState) {
            const filteredCells = [];
            statusList.forEach((cellState, index) => {
                if (cellState === menuCellState) {
                    filteredCells.push(menuCells[index]);
                }
            });
            return filteredCells;
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
         * Creates test cells
         * @returns {MenuCell[]} - An array of menu cells to mess with
         */
        function createTestCells () {
            const livio = new SDL.manager.file.filetypes.SdlArtwork('livio', SDL.rpc.enums.FileType.GRAPHIC_PNG)
                .setFilePath(`${__dirname}/test_icon_1.png`)
                .setPersistent(false);

            const voice2 = ['Cell two'];
            mainCell1 = new SDL.manager.screen.menu.MenuCell('Test Cell 1')
                .setIcon(livio)
                .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener());

            const mainCell2 = new SDL.manager.screen.menu.MenuCell('Test Cell 2')
                .setIcon(livio)
                .setVoiceCommands(voice2)
                .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener());

            const mainCell3 = new SDL.manager.screen.menu.MenuCell('Test Cell 3')
                .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener());

            // submenu cells
            const subCell1 = new SDL.manager.screen.menu.MenuCell('SubCell 1')
                .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener());

            const subCell2 = new SDL.manager.screen.menu.MenuCell('SubCell 2')
                .setMenuSelectionListener(new SDL.manager.screen.menu.MenuSelectionListener());

            mainCell4 = new SDL.manager.screen.menu.MenuCell('Test Cell 4')
                .setIcon(livio)
                .setSubCells([subCell1, subCell2])
                ._setCellId(4);

            return [mainCell1, mainCell2, mainCell3, mainCell4];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu1 () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu1New () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
                new SDL.manager.screen.menu.MenuCell('E').setMenuSelectionListener(mockMenuListenerE),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu2 () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu2New () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu3 () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu3New () {
            return [
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
                new SDL.manager.screen.menu.MenuCell('E').setMenuSelectionListener(mockMenuListenerE),
                new SDL.manager.screen.menu.MenuCell('F').setMenuSelectionListener(mockMenuListenerF),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu4 () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu4New () {
            return [
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu5 () {
            return [
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
            ];
        }

        /**
         * Creates a list of menu cells for testing
         * @returns {MenuCell[]} - A list of menu cells
         */
        function createDynamicMenu5New () {
            return [
                new SDL.manager.screen.menu.MenuCell('B').setMenuSelectionListener(mockMenuListenerB),
                new SDL.manager.screen.menu.MenuCell('C').setMenuSelectionListener(mockMenuListenerC),
                new SDL.manager.screen.menu.MenuCell('D').setMenuSelectionListener(mockMenuListenerD),
                new SDL.manager.screen.menu.MenuCell('A').setMenuSelectionListener(mockMenuListenerA),
            ];
        }
    });
};