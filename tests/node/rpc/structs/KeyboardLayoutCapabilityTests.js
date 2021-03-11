const SDL = require('../../../config.js').node;
const KeyboardLayoutCapability = SDL.rpc.structs.KeyboardLayoutCapability;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('KeyboardLayoutCapabilityTests', function () {
    before(function () {
        this.create = function () {
            return new KeyboardLayoutCapability()
                .setKeyboardLayout(Test.GENERAL_KEYBOARDLAYOUT)
                .setNumConfigurableKeys(Test.GENERAL_INTEGER);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [KeyboardLayoutCapability.KEY_KEYBOARD_LAYOUT]: Test.GENERAL_KEYBOARDLAYOUT,
                [KeyboardLayoutCapability.KEY_NUM_CONFIGURABLE_KEYS]: Test.GENERAL_INTEGER,
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
        msg = new KeyboardLayoutCapability();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getKeyboardLayout());
        Validator.assertNullOrUndefined(msg.getNumConfigurableKeys());
        done();
    });
});