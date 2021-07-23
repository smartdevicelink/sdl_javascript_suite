const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('MenuCellTests', function () {
        const menuSelectionListener = new SDL.manager.screen.menu.MenuSelectionListener()
            .setOnTriggered(trigger => {});

        it('testSettersAndGetters', function () {
            const menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener)
                .setSubMenuLayout(Test.GENERAL_MENU_LAYOUT)
                .setSecondaryText(Test.GENERAL_STRING)
                .setTertiaryText(Test.GENERAL_STRING)
                .setSecondaryArtwork(Test.GENERAL_ARTWORK)
                ._setUniqueTitle(Test.GENERAL_STRING);

            Validator.assertEquals(menuCell.getTitle(), Test.GENERAL_STRING);
            Validator.assertEquals(menuCell.getIcon(), Test.GENERAL_ARTWORK);
            Validator.assertEquals(menuCell.getVoiceCommands(), Test.GENERAL_STRING_LIST);
            Validator.assertEquals(menuCell.getMenuSelectionListener(), menuSelectionListener);
            Validator.assertEquals(menuCell._getCellId(), Test.GENERAL_MENU_MAX_ID);
            Validator.assertEquals(menuCell._getParentCellId(), Test.GENERAL_MENU_MAX_ID);
            Validator.assertEquals(menuCell.getSubMenuLayout(), Test.GENERAL_MENU_LAYOUT);
            Validator.assertEquals(menuCell.getSecondaryText(), Test.GENERAL_STRING);
            Validator.assertEquals(menuCell.getTertiaryText(), Test.GENERAL_STRING);
            Validator.assertEquals(menuCell.getSecondaryArtwork(), Test.GENERAL_ARTWORK);
            Validator.assertEquals(menuCell._getUniqueTitle(), Test.GENERAL_STRING);
        });

        it('testConstructors', function () {
            const menuCell = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING);

            Validator.assertEquals(menuCell.getTitle(), Test.GENERAL_STRING);
        });

        it('testEquality', function () {
            const menuCell1 = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener);
            const menuCell11 = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener);
            menuCell1.setSubCells([menuCell11]);
            const menuCell2 = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener);
            const menuCell21 = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener);
            menuCell2.setSubCells([menuCell21]);

            // these are the same object, should be equal.
            Validator.assertTrue(menuCell1.equals(menuCell1));
            // Make sure these are marked as equals, even though they are different objects
            Validator.assertTrue(menuCell1.equals(menuCell2));

            const menuCell3 = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener);

            // these should be different
            Validator.assertTrue(!menuCell1.equals(menuCell3));

            menuCell11.setTitle('new title');

            // Make sure sub cells are compared
            Validator.assertTrue(!menuCell1.equals(menuCell2));
        });

        it('testClone', function () {
            let original = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setIcon(Test.GENERAL_ARTWORK)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setMenuSelectionListener(menuSelectionListener);
            let clone = original.clone();

            Validator.assertNotNull(clone);
            Validator.assertTrue(original !== clone);
            Validator.assertEquals(original.getTitle(), clone.getTitle());
            Validator.assertEquals(original._getCellId(), clone._getCellId());
            Validator.assertEquals(original._getParentCellId(), clone._getParentCellId());
            Validator.assertEquals(original._getUniqueTitle(), clone._getUniqueTitle());
            Validator.assertEquals(original.getSecondaryText(), clone.getSecondaryText());
            Validator.assertEquals(original.getTertiaryText(), clone.getTertiaryText());
            Validator.assertTrue(original.getIcon().equals(clone.getIcon()));

            if (original.getSecondaryArtwork() !== null) {
                Validator.assertTrue(original.getSecondaryArtwork().equals(clone.getSecondaryArtwork()));
            }

            // test subcells
            const subcells = [original.clone(), clone.clone()];

            original = new SDL.manager.screen.menu.MenuCell(Test.GENERAL_STRING)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setIcon(Test.GENERAL_ARTWORK)
                .setSubCells(subcells);
            clone = original.clone();

            Validator.assertNotNull(original.getSubCells());
            Validator.assertNotNull(clone.getSubCells());
            Validator.assertTrue(original.getSubCells() !== clone.getSubCells());

            const originalSubCells = original.getSubCells();
            const cloneSubCells = clone.getSubCells();

            Validator.assertTrue(originalSubCells.length === cloneSubCells.length);

            for (let index = 0; index < originalSubCells.length; index++) {
                Validator.assertNotNull(originalSubCells[index]);
                Validator.assertNotNull(cloneSubCells[index]);

                Validator.assertTrue(originalSubCells[index].equals(cloneSubCells[index]));
            }
        });
    });
};