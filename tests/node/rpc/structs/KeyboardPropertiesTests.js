const SDL = require('../../../config.js').node;
const KeyboardProperties = SDL.rpc.structs.KeyboardProperties;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('KeyboardPropertiesTests', function () {
    before(function () {
        this.create = function () {
            return new KeyboardProperties()
                .setLanguage(Test.GENERAL_LANGUAGE)
                .setKeyboardLayout(Test.GENERAL_KEYBOARDLAYOUT)
                .setKeypressMode(Test.GENERAL_KEYPRESSMODE)
                .setLimitedCharacterList(Test.GENERAL_STRING_LIST)
                .setAutoCompleteText(Test.GENERAL_STRING)
                .setAutoCompleteList(Test.GENERAL_STRING_LIST)
                .setMaskInputCharacters(Test.GENERAL_KEYBOARDINPUTMASK)
                .setCustomizeKeys(Test.GENERAL_STRING_LIST);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [KeyboardProperties.KEY_LANGUAGE]: Test.GENERAL_LANGUAGE,
                [KeyboardProperties.KEY_KEYBOARD_LAYOUT]: Test.GENERAL_KEYBOARDLAYOUT,
                [KeyboardProperties.KEY_KEYPRESS_MODE]: Test.GENERAL_KEYPRESSMODE,
                [KeyboardProperties.KEY_LIMITED_CHARACTER_LIST]: Test.GENERAL_STRING_LIST,
                [KeyboardProperties.KEY_AUTO_COMPLETE_TEXT]: Test.GENERAL_STRING,
                [KeyboardProperties.KEY_AUTO_COMPLETE_LIST]: Test.GENERAL_STRING_LIST,
                [KeyboardProperties.KEY_MASK_INPUT_CHARACTERS]: Test.GENERAL_KEYBOARDINPUTMASK,
                [KeyboardProperties.KEY_CUSTOMIZE_KEYS]: Test.GENERAL_STRING_LIST,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_LANGUAGE, msg.getLanguage());
        Validator.assertEquals(Test.GENERAL_KEYBOARDLAYOUT, msg.getKeyboardLayout());
        Validator.assertEquals(Test.GENERAL_KEYPRESSMODE, msg.getKeypressMode());
        Validator.assertEquals(Test.GENERAL_STRING_LIST, msg.getLimitedCharacterList());
        Validator.assertEquals(Test.GENERAL_STRING, msg.getAutoCompleteText());
        Validator.assertEquals(Test.GENERAL_STRING_LIST, msg.getAutoCompleteList());
        Validator.assertEquals(Test.GENERAL_KEYBOARDINPUTMASK, msg.getMaskInputCharacters());
        Validator.assertEquals(Test.GENERAL_STRING_LIST, msg.getCustomizeKeys());

        // Invalid/Null Tests
        msg = new KeyboardProperties();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getLanguage());
        Validator.assertNullOrUndefined(msg.getKeyboardLayout());
        Validator.assertNullOrUndefined(msg.getKeypressMode());
        Validator.assertNullOrUndefined(msg.getLimitedCharacterList());
        Validator.assertNullOrUndefined(msg.getAutoCompleteText());
        Validator.assertNullOrUndefined(msg.getAutoCompleteList());
        Validator.assertNullOrUndefined(msg.getMaskInputCharacters());
        Validator.assertNullOrUndefined(msg.getCustomizeKeys());
        done();
    });
});