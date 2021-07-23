const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('MenuReplaceUtilitiesTests', function () {
        let lastMenuId = SDL.manager.screen.menu._MenuManagerBase.MENU_CELL_ID_MIN;

        it('testRemoveMenuCellFromList', async function () {
            let menuCellToDelete;
            let cellRemoved;
            const actualMenuCellList = createMenuCellList();
            const expectedMenuCellList = createMenuCellList();

            // Delete cell c4
            menuCellToDelete = actualMenuCellList[3];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList.splice(3, 1);

            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(3, actualMenuCellList.length);

            // Delete cell c4 again - removal should fail and list should not change
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(!cellRemoved);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(3, actualMenuCellList.length);

            // Delete cell c3
            menuCellToDelete = actualMenuCellList[2];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList.splice(2, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(2, actualMenuCellList.length);

            // Delete cell c2-2-2
            menuCellToDelete = actualMenuCellList[1].getSubCells()[1].getSubCells()[1];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList[1].getSubCells()[1].getSubCells().splice(1, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(2, actualMenuCellList.length);
            Validator.assertEquals(1, actualMenuCellList[1].getSubCells()[1].getSubCells().length);

            // Delete cell c2-2-1
            menuCellToDelete = actualMenuCellList[1].getSubCells()[1].getSubCells()[0];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList[1].getSubCells()[1].getSubCells().splice(0, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(2, actualMenuCellList.length);
            Validator.assertEquals(0, actualMenuCellList[1].getSubCells()[1].getSubCells().length);

            // Delete cell c2-2
            menuCellToDelete = actualMenuCellList[1].getSubCells()[1];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList[1].getSubCells().splice(1, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(2, actualMenuCellList.length);
            Validator.assertEquals(1, actualMenuCellList[1].getSubCells().length);

            // Delete cell c2-1
            menuCellToDelete = actualMenuCellList[1].getSubCells()[0];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList[1].getSubCells().splice(0, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(2, actualMenuCellList.length);
            Validator.assertEquals(0, actualMenuCellList[1].getSubCells().length);

            // Delete cell c2
            menuCellToDelete = actualMenuCellList[1];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList.splice(1, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(1, actualMenuCellList.length);

            // Delete cell c1
            menuCellToDelete = actualMenuCellList[0];
            cellRemoved = SDL.manager.screen.menu._MenuReplaceUtilities.removeMenuCellFromList(actualMenuCellList, menuCellToDelete._getCellId());
            Validator.assertTrue(cellRemoved);
            expectedMenuCellList.splice(0, 1);
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(0, actualMenuCellList.length);
        });

        it('testAddMenuRequestWithCommandId', async function () {
            let menuCellToAdd;
            let cellAdded;
            const actualMenuCellList = createMenuCellList();
            const expectedMenuCellList = createMenuCellList();
            const newMenuList = createNewMenuList();

            // Add cell c5
            menuCellToAdd = newMenuList[0];
            cellAdded = SDL.manager.screen.menu._MenuReplaceUtilities.addMenuRequestWithCommandId(menuCellToAdd._getCellId(), 4, newMenuList, actualMenuCellList);
            Validator.assertTrue(cellAdded);
            expectedMenuCellList.splice(4, 0, cloneMenuCellAndRemoveSubCells(menuCellToAdd));
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(5, actualMenuCellList.length);
            Validator.assertEquals(0, actualMenuCellList[4].getSubCells().length);

            // Add cell c5-1
            menuCellToAdd = newMenuList[0].getSubCells()[0];
            cellAdded = SDL.manager.screen.menu._MenuReplaceUtilities.addMenuRequestWithCommandId(menuCellToAdd._getCellId(), 0, newMenuList, actualMenuCellList);
            Validator.assertTrue(cellAdded);
            expectedMenuCellList[4].getSubCells().splice(0, 0, cloneMenuCellAndRemoveSubCells(menuCellToAdd));
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(5, actualMenuCellList.length);
            Validator.assertEquals(1, actualMenuCellList[4].getSubCells().length);

            // Add cell c5-1-1
            menuCellToAdd = newMenuList[0].getSubCells()[0].getSubCells()[0];
            cellAdded = SDL.manager.screen.menu._MenuReplaceUtilities.addMenuRequestWithCommandId(menuCellToAdd._getCellId(), 0, newMenuList, actualMenuCellList);
            Validator.assertTrue(cellAdded);
            expectedMenuCellList[4].getSubCells()[0].getSubCells().splice(0, 0, cloneMenuCellAndRemoveSubCells(menuCellToAdd));
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(5, actualMenuCellList.length);
            Validator.assertEquals(1, actualMenuCellList[4].getSubCells().length);
            Validator.assertEquals(1, actualMenuCellList[4].getSubCells()[0].getSubCells().length);

            // Add cell c5-2
            menuCellToAdd = newMenuList[0].getSubCells()[1];
            cellAdded = SDL.manager.screen.menu._MenuReplaceUtilities.addMenuRequestWithCommandId(menuCellToAdd._getCellId(), 1, newMenuList, actualMenuCellList);
            Validator.assertTrue(cellAdded);
            expectedMenuCellList[4].getSubCells().splice(1, 0, cloneMenuCellAndRemoveSubCells(menuCellToAdd));
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(5, actualMenuCellList.length);
            Validator.assertEquals(2, actualMenuCellList[4].getSubCells().length);
            Validator.assertEquals(1, actualMenuCellList[4].getSubCells()[0].getSubCells().length);
            Validator.assertEquals(0, actualMenuCellList[4].getSubCells()[1].getSubCells().length);

            // Add cell c5-2-1
            menuCellToAdd = newMenuList[0].getSubCells()[1].getSubCells()[0];
            cellAdded = SDL.manager.screen.menu._MenuReplaceUtilities.addMenuRequestWithCommandId(menuCellToAdd._getCellId(), 0, newMenuList, actualMenuCellList);
            Validator.assertTrue(cellAdded);
            expectedMenuCellList[4].getSubCells()[1].getSubCells().splice(0, 0, cloneMenuCellAndRemoveSubCells(menuCellToAdd));
            Validator.assertTrue(!expectedMenuCellList.map((menuCell, index) => menuCell.equals(actualMenuCellList[index])).includes(false));
            Validator.assertEquals(5, actualMenuCellList.length);
            Validator.assertEquals(2, actualMenuCellList[4].getSubCells().length);
            Validator.assertEquals(1, actualMenuCellList[4].getSubCells()[0].getSubCells().length);
            Validator.assertEquals(1, actualMenuCellList[4].getSubCells()[1].getSubCells().length);
        });

        it('testShouldCellIncludeImage', async function () {
            let menuCell;
            let windowCapability;
            let fileManager;
            const shouldCellIncludeImage = SDL.manager.screen.menu._MenuReplaceUtilities.shouldCellIncludeImage;

            // Case 1
            menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK);
            windowCapability = createWindowCapability(true, true);
            fileManager = createMockFileManager(true);
            Validator.assertTrue(shouldCellIncludeImage(menuCell, fileManager, windowCapability, false));

            // Case 2 - Image are not supported
            menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK);
            windowCapability = createWindowCapability(false, false);
            fileManager = createMockFileManager(true);
            Validator.assertTrue(!shouldCellIncludeImage(menuCell, fileManager, windowCapability, false));

            // Case 3 - Artwork is null
            menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING);
            windowCapability = createWindowCapability(true, true);
            fileManager = createMockFileManager(true);
            Validator.assertTrue(!shouldCellIncludeImage(menuCell, fileManager, windowCapability, false));

            // Case 4 - Artwork has not been uploaded
            menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK);
            windowCapability = createWindowCapability(true, true);
            fileManager = createMockFileManager(false);
            Validator.assertTrue(!shouldCellIncludeImage(menuCell, fileManager, windowCapability, false));

            // Case 5 - Artwork is static icon
            menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK_STATIC);
            windowCapability = createWindowCapability(true, true);
            fileManager = createMockFileManager(false);
            Validator.assertTrue(shouldCellIncludeImage(menuCell, fileManager, windowCapability, false));
        });

        /**
         * Makes a fake file manager object with hasUploadedFile returning a specific boolean
         * @param {boolean} hasUploadedFile - The boolean to return when hasUploadedFile is invoked
         * @returns {Object} - A basic object with hasUploadedFile implemented
         */
        function createMockFileManager (hasUploadedFile) {
            return {
                hasUploadedFile: () => hasUploadedFile,
            };
        }

        /**
         * Makes a copy of the menu cell without sub cells
         * @param {MenuCell} menuCell - The menu cell to clone
         * @returns {MenuCell} - The trimmed menu cell clone
         */
        function cloneMenuCellAndRemoveSubCells (menuCell) {
            const clonedCell = menuCell.clone();
            if (clonedCell.getSubCells() !== null) {
                clonedCell.setSubCells([]);
            }
            return clonedCell;
        }

        /**
         * Creates list of menu cells
         * @returns {MenuCell[]} - A MenuCell array for testing
         */
        function createMenuCellList () {
            /*

            c1            c2            c3            c4
                         /  \                        /  \
                        /    \                      /    \
                     c2-1   c2-2                  c4-1  c4-2
                            /  \
                           /    \
                       c2-2-1   c2-2-2

            */
            const menuCell1 = new SDL.manager.screen.menu.MenuCell('c1');
            const menuCell21 = new SDL.manager.screen.menu.MenuCell('c2_1');
            const menuCell221 = new SDL.manager.screen.menu.MenuCell('c2_2_1');
            const menuCell222 = new SDL.manager.screen.menu.MenuCell('c2_2_2');
            const menuCell22 = new SDL.manager.screen.menu.MenuCell('c2_2')
                .setSubCells([menuCell221, menuCell222]);
            const menuCell2 = new SDL.manager.screen.menu.MenuCell('c2')
                .setSubCells([menuCell21, menuCell22]);
            const menuCell3 = new SDL.manager.screen.menu.MenuCell('c3');
            const menuCell41 = new SDL.manager.screen.menu.MenuCell('c4_1');
            const menuCell42 = new SDL.manager.screen.menu.MenuCell('c4_2');
            const menuCell4 = new SDL.manager.screen.menu.MenuCell('c4')
                .setSubCells([menuCell41, menuCell42]);

            const menuCellList = [menuCell1, menuCell2, menuCell3, menuCell4];
            updateIdsOnMenuCells(menuCellList, SDL.manager.screen.menu._MenuManagerBase.PARENT_ID_NOT_FOUND);
            return menuCellList;
        }

        /**
         * Creates list of menu cells
         * @returns {MenuCell[]} - A MenuCell array for testing
         */
        function createNewMenuList () {
            /*

                     c5
                    / \
                   /   \
                c5-1   c5-2
                /       /
               /       /
           c5-1-1   c5-2-1

             */
            const menuCell511 = new SDL.manager.screen.menu.MenuCell('c5_1_1');
            const menuCell51 = new SDL.manager.screen.menu.MenuCell('c5_1')
                .setSubCells([menuCell511]);
            const menuCell521 = new SDL.manager.screen.menu.MenuCell('c5_2_1');
            const menuCell52 = new SDL.manager.screen.menu.MenuCell('c5_2')
                .setSubCells([menuCell521]);
            const menuCell5 = new SDL.manager.screen.menu.MenuCell('c5')
                .setSubCells([menuCell51, menuCell52]);

            const newMenuList = [menuCell5];
            updateIdsOnMenuCells(newMenuList, SDL.manager.screen.menu._MenuManagerBase.PARENT_ID_NOT_FOUND);
            return newMenuList;
        }

        /**
         * Creates a window capability
         * @param {Boolean} supportsCmdIcon - Whether artwork is supported
         * @param {Boolean} supportsSubMenuIcon - Whether sub menu artwork is supported
         * @returns {WindowCapability} - A generated window capability
         */
        function createWindowCapability (supportsCmdIcon, supportsSubMenuIcon) {
            const supported = [];
            if (supportsCmdIcon) {
                supported.push(new SDL.rpc.structs.ImageField().setNameParam(SDL.rpc.enums.ImageFieldName.cmdIcon));
            }
            if (supportsSubMenuIcon) {
                supported.push(new SDL.rpc.structs.ImageField().setNameParam(SDL.rpc.enums.ImageFieldName.subMenuIcon));
            }
            return new SDL.rpc.structs.WindowCapability()
                .setImageFields(supported);
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