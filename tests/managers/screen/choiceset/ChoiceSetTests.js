const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('ChoiceSetTests', function () {
        const defaultTimeout = 10;
        const listener = new SDL.manager.screen.choiceset.ChoiceSetSelectionListener();
        const layout = SDL.manager.screen.choiceset.enums.ChoiceSetLayout.CHOICE_SET_LAYOUT_LIST;
        const choices = [
            new SDL.manager.screen.choiceset.ChoiceCell(Test.GENERAL_STRING),
            new SDL.manager.screen.choiceset.ChoiceCell(Test.GENERAL_STRING),
        ];
        let canceledHandlerCalled = false;

        it('testSettersAndGetters', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            Validator.assertEquals(choiceSet.getTitle(), Test.GENERAL_STRING);
            Validator.assertEquals(choiceSet.getLayout(), layout);
            Validator.assertEquals(choiceSet.getTimeout(), defaultTimeout);
            Validator.assertEquals(choiceSet.getChoices(), choices);
            Validator.assertEquals(choiceSet.getChoiceSetSelectionListener(), listener);
        });

        it('testCancelingChoiceSet', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener)
                .setCanceledListener(() => {
                    canceledHandlerCalled = true;
                });
            choiceSet.cancel();
            Validator.assertTrue(canceledHandlerCalled);
        });
    });
};