const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');

module.exports = function (appClient) {
    describe('CheckChoiceVROptionalOperationTests', function () {
        const checkChoiceVROptionalOperation = new SDL.manager.screen.choiceset._CheckChoiceVrOptionalOperation(appClient._sdlManager._lifecycleManager,
            new SDL.manager.screen.choiceset._CheckChoiceVrOptionalInterface());

        it('testCreateChoiceNoVR', function () {
            const cics = checkChoiceVROptionalOperation._createTestChoiceSet(false);
            Validator.assertNotNull(cics);
            // this set only has one choice
            const choice = cics.getChoiceSet()[0];
            Validator.assertNull(choice.getVrCommands());
        });

        it('testCreateChoiceWithVR', function () {
            const cics = checkChoiceVROptionalOperation._createTestChoiceSet(true);
            Validator.assertNotNull(cics);
            // this set only has one choice
            const choice = cics.getChoiceSet()[0];
            Validator.assertEquals(choice.getVrCommands()[0], 'Test VR');
        });

        it('testDeleteInteractionChoiceSet', function () {
            const dics = checkChoiceVROptionalOperation._deleteTestChoiceSet();
            Validator.assertNotNull(dics);
        });
    });
};