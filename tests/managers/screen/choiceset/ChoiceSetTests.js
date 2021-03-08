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

        it('testReturnDefaultTimeoutForUnsetTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 6;
            choiceSet.setDefaultTimeout(testDefaultTimeout);

            Validator.assertEquals(choiceSet.getDefaultTimeout(), testDefaultTimeout);
            Validator.assertEquals(choiceSet.getTimeout(), testDefaultTimeout);
        });

        it('testReturnDefaultTimeoutForSetTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testTimeout = 7;
            const testDefaultTimeout = 9;
            choiceSet.setDefaultTimeout(testDefaultTimeout);
            choiceSet.setTimeout(testTimeout);

            Validator.assertEquals(choiceSet.getDefaultTimeout(), testDefaultTimeout);
            Validator.assertEquals(choiceSet.getTimeout(), testTimeout);
        });

        it('testReturnDefaultMaxTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 155;
            choiceSet.setDefaultTimeout(testDefaultTimeout);

            Validator.assertEquals(choiceSet.getDefaultTimeout(), 100);
            Validator.assertEquals(choiceSet.getTimeout(), 100);
        });

        it('testReturnDefaultMinTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = -3;
            choiceSet.setDefaultTimeout(testDefaultTimeout);

            Validator.assertEquals(choiceSet.getDefaultTimeout(), 5);
            Validator.assertEquals(choiceSet.getTimeout(), 5);
        });

        it('testReturnTimeoutUnset', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 7;
            choiceSet.setDefaultTimeout(testDefaultTimeout);

            Validator.assertEquals(choiceSet.getTimeout(), testDefaultTimeout);
        });

        it('testReturnTimeoutZero', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 7;
            choiceSet.setDefaultTimeout(testDefaultTimeout);
            choiceSet.setTimeout(0);

            Validator.assertEquals(choiceSet.getTimeout(), testDefaultTimeout);
        });

        it('testReturnTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 7;
            const testTimeout = 9;
            choiceSet.setDefaultTimeout(testDefaultTimeout);
            choiceSet.setTimeout(testTimeout);

            Validator.assertEquals(choiceSet.getTimeout(), testTimeout);
        });

        it('testReturnMaxTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 7;
            const testTimeout = 214;
            choiceSet.setDefaultTimeout(testDefaultTimeout);
            choiceSet.setTimeout(testTimeout);

            Validator.assertEquals(choiceSet.getTimeout(), 100);
        });

        it('testReturnMinTimeout', function () {
            const choiceSet = new SDL.manager.screen.choiceset.ChoiceSet(Test.GENERAL_STRING, choices, listener);
            const testDefaultTimeout = 7;
            const testTimeout = 2.25;
            choiceSet.setDefaultTimeout(testDefaultTimeout);
            choiceSet.setTimeout(testTimeout);

            Validator.assertEquals(choiceSet.getTimeout(), 5);
        });
    });
};
