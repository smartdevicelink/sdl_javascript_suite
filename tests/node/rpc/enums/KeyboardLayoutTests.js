const SDL = require('../../../config.js').node;

const KeyboardLayout = SDL.rpc.enums.KeyboardLayout;
const Validator = require('./../../../Validator.js');

describe('KeyboardLayoutTests', function () {
    it('testValidEnums', function (done) {
        let example = 'QWERTY';
        const enumQwerty = KeyboardLayout.valueForKey(example);
        example = 'QWERTZ';
        const enumQwertz = KeyboardLayout.valueForKey(example);
        example = 'AZERTY';
        const enumAzerty = KeyboardLayout.valueForKey(example);
        example = 'NUMERIC';
        const enumNumeric = KeyboardLayout.valueForKey(example);

        Validator.assertNotNullUndefined(enumQwerty, 'QWERTY returned null.');
        Validator.assertNotNullUndefined(enumQwertz, 'QWERTZ returned null.');
        Validator.assertNotNullUndefined(enumAzerty, 'AZERTY returned null.');
        Validator.assertNotNullUndefined(enumNumeric, 'NUMERIC returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'qWERTY';
        const temp = KeyboardLayout.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = KeyboardLayout.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});