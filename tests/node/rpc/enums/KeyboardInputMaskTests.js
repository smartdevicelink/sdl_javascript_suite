const SDL = require('../../../config.js').node;

const KeyboardInputMask = SDL.rpc.enums.KeyboardInputMask;
const Validator = require('./../../../Validator.js');

describe('KeyboardInputMaskTests', function () {
    it('testValidEnums', function (done) {
        let example = 'ENABLE_INPUT_KEY_MASK';
        const enumEnableInputKeyMask = KeyboardInputMask.valueForKey(example);
        example = 'DISABLE_INPUT_KEY_MASK';
        const enumDisableInputKeyMask = KeyboardInputMask.valueForKey(example);
        example = 'USER_CHOICE_INPUT_KEY_MASK';
        const enumUserChoiceInputKeyMask = KeyboardInputMask.valueForKey(example);

        Validator.assertNotNullUndefined(enumEnableInputKeyMask, 'ENABLE_INPUT_KEY_MASK returned null.');
        Validator.assertNotNullUndefined(enumDisableInputKeyMask, 'DISABLE_INPUT_KEY_MASK returned null.');
        Validator.assertNotNullUndefined(enumUserChoiceInputKeyMask, 'USER_CHOICE_INPUT_KEY_MASK returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'eNABLE_INPUT_KEY_MASK';
        const temp = KeyboardInputMask.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = KeyboardInputMask.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});