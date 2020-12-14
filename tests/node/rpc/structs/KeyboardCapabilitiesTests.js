const SDL = require('../../../config.js').node;
const KeyboardCapabilities = SDL.rpc.structs.KeyboardCapabilities;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('KeyboardCapabilitiesTests', function () {
    before(function () {
        this.create = function () {
            return new KeyboardCapabilities()
                .setMaskInputCharactersSupported(Test.GENERAL_BOOLEAN)
                .setSupportedKeyboardLayouts(Test.GENERAL_KEYBOARDLAYOUT_LIST)
                .setConfigurableKeys(Test.GENERAL_CONFIGURABLEKEYBOARDS_LIST);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [KeyboardCapabilities.KEY_MASK_INPUT_CHARACTERS_SUPPORTED]: Test.GENERAL_BOOLEAN,
                [KeyboardCapabilities.KEY_SUPPORTED_KEYBOARD_LAYOUTS]: Test.GENERAL_KEYBOARDLAYOUT_LIST,
                [KeyboardCapabilities.KEY_CONFIGURABLE_KEYS]: Test.JSON_CONFIGURABLEKEYBOARDS_LIST,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getMaskInputCharactersSupported());
        Validator.assertEquals(Test.GENERAL_KEYBOARDLAYOUT_LIST, msg.getSupportedKeyboardLayouts());
        Validator.assertEquals(Test.GENERAL_CONFIGURABLEKEYBOARDS_LIST, msg.getConfigurableKeys());

        // Invalid/Null Tests
        msg = new KeyboardCapabilities();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getMaskInputCharactersSupported());
        Validator.assertNullOrUndefined(msg.getSupportedKeyboardLayouts());
        Validator.assertNullOrUndefined(msg.getConfigurableKeys());
        done();
    });
});