const SDL = require('../../../config.js').node;
const ConfigurableKeyboards = SDL.rpc.structs.ConfigurableKeyboards;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('ConfigurableKeyboardsTests', function () {
    before(function () {
        this.create = function () {
            return new ConfigurableKeyboards()
                .setKeyboardLayout(Test.GENERAL_KEYBOARDLAYOUT)
                .setNumConfigurableKeys(Test.GENERAL_INTEGER);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [ConfigurableKeyboards.KEY_KEYBOARD_LAYOUT]: Test.GENERAL_KEYBOARDLAYOUT,
                [ConfigurableKeyboards.KEY_NUM_CONFIGURABLE_KEYS]: Test.GENERAL_INTEGER,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_KEYBOARDLAYOUT, msg.getKeyboardLayout());
        Validator.assertEquals(Test.GENERAL_INTEGER, msg.getNumConfigurableKeys());

        // Invalid/Null Tests
        msg = new ConfigurableKeyboards();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getKeyboardLayout());
        Validator.assertNullOrUndefined(msg.getNumConfigurableKeys());
        done();
    });
});