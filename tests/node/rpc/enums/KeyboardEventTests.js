const SDL = require('../../../config.js').node;

const KeyboardEvent = SDL.rpc.enums.KeyboardEvent;
const Validator = require('./../../../Validator.js');

describe('KeyboardEventTests', function () {
    it('testValidEnums', function (done) {
        let example = 'KEYPRESS';
        const enumKeypress = KeyboardEvent.valueForKey(example);
        example = 'ENTRY_SUBMITTED';
        const enumEntrySubmitted = KeyboardEvent.valueForKey(example);
        example = 'ENTRY_VOICE';
        const enumEntryVoice = KeyboardEvent.valueForKey(example);
        example = 'ENTRY_CANCELLED';
        const enumEntryCancelled = KeyboardEvent.valueForKey(example);
        example = 'ENTRY_ABORTED';
        const enumEntryAborted = KeyboardEvent.valueForKey(example);
        example = 'INPUT_KEY_MASK_ENABLED';
        const enumInputKeyMaskEnabled = KeyboardEvent.valueForKey(example);
        example = 'INPUT_KEY_MASK_DISABLED';
        const enumInputKeyMaskDisabled = KeyboardEvent.valueForKey(example);

        Validator.assertNotNullUndefined(enumKeypress, 'KEYPRESS returned null.');
        Validator.assertNotNullUndefined(enumEntrySubmitted, 'ENTRY_SUBMITTED returned null.');
        Validator.assertNotNullUndefined(enumEntryVoice, 'ENTRY_VOICE returned null.');
        Validator.assertNotNullUndefined(enumEntryCancelled, 'ENTRY_CANCELLED returned null.');
        Validator.assertNotNullUndefined(enumEntryAborted, 'ENTRY_ABORTED returned null.');
        Validator.assertNotNullUndefined(enumInputKeyMaskEnabled, 'INPUT_KEY_MASK_ENABLED returned null.');
        Validator.assertNotNullUndefined(enumInputKeyMaskDisabled, 'INPUT_KEY_MASK_DISABLED returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'kEYPRESS';
        const temp = KeyboardEvent.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = KeyboardEvent.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});