const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');

module.exports = function (appClient) {
    describe('ChoiceSetLayoutTests', function () {
        it('testValidEnums', function () {
            const choiceSetLayoutList = SDL.manager.screen.choiceset.enums.ChoiceSetLayout.valueForKey('CHOICE_SET_LAYOUT_LIST');
            const choiceSetLayoutTiles = SDL.manager.screen.choiceset.enums.ChoiceSetLayout.valueForKey('CHOICE_SET_LAYOUT_TILES');
            Validator.assertNotNull(choiceSetLayoutList);
            Validator.assertNotNull(choiceSetLayoutTiles);
        });

        it('testInvalidEnum', function () {
            const temp = SDL.manager.screen.choiceset.enums.ChoiceSetLayout.valueForKey('deFaUlt');
            Validator.assertNull(temp);
        });

        it('testNullEnum', function () {
            const temp = SDL.manager.screen.choiceset.enums.ChoiceSetLayout.valueForKey(null);
            Validator.assertNull(temp);
        });

        it('testListEnum', function () {
            const enumValueList = SDL.manager.screen.choiceset.enums.ChoiceSetLayout.values();
            const enumTestList = [
                SDL.manager.screen.choiceset.enums.ChoiceSetLayout.CHOICE_SET_LAYOUT_LIST,
                SDL.manager.screen.choiceset.enums.ChoiceSetLayout.CHOICE_SET_LAYOUT_TILES,
            ];

            Validator.assertTrue(JSON.stringify(enumValueList.sort()) === JSON.stringify(enumTestList.sort()));
        });
    });
};