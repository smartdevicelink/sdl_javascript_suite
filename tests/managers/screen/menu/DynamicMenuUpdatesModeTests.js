const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('DynamicMenuUpdatesModeTests', function () {

        it('testValidEnums', function () {
            let example = "FORCE_ON";
            const forceOn = SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.valueForKey(example);
            example = "FORCE_OFF";
            const forceOff = SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.valueForKey(example);
            example = "ON_WITH_COMPAT_MODE";
            const onWithCompatMode = SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.valueForKey(example);

            Validator.assertNotNull(forceOn, "FORCE_ON returned null");
            Validator.assertNotNull(forceOff, "FORCE_OFF returned null");
            Validator.assertNotNull(onWithCompatMode, "ON_WITH_COMPAT_MODE returned null");
        });

        it('testInvalidEnum', function () {
            let example = "deFaUlt";
            const temp = SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.valueForKey(example);

            Validator.assertNull(temp, "Result of valueForKey should be null");
        });

        it('testNullEnum', function () {
            let example = null;
            const temp = SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode.valueForKey(example);

            Validator.assertNull(temp, "Result of valueForKey should be null");
        });

        it('testListEnum', function () {
            const UpdatesMode = SDL.manager.screen.menu.enums.DynamicMenuUpdatesMode;

            const enumValueList = UpdatesMode.values();
            const enumTestList = [UpdatesMode.FORCE_ON, UpdatesMode.FORCE_OFF, UpdatesMode.ON_WITH_COMPAT_MODE]

            Validator.assertTrue(JSON.stringify(enumValueList.sort()) === JSON.stringify(enumTestList.sort()));
        });

    });
};