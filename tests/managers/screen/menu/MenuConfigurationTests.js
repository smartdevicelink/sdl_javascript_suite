const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('MenuConfigurationTests', function () {
        it('testSettersAndGetters', function () {
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(Test.GENERAL_MENU_LAYOUT)
                .setSubMenuLayout(Test.GENERAL_MENU_LAYOUT);

            Validator.assertEquals(menuConfiguration.getMenuLayout(), Test.GENERAL_MENU_LAYOUT);
            Validator.assertEquals(menuConfiguration.getSubMenuLayout(), Test.GENERAL_MENU_LAYOUT);
        });
    });
};