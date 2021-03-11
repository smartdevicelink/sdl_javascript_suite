const SDL = require('../../../config.js').node;
const WindowCapability = SDL.rpc.structs.WindowCapability;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('WindowCapabilityTests', function () {
    before(function () {
        this.create = function () {
            return new WindowCapability()
                .setWindowID(Test.GENERAL_INTEGER)
                .setTextFields(Test.GENERAL_TEXTFIELD_LIST)
                .setImageFields(Test.GENERAL_IMAGEFIELD_LIST)
                .setImageTypeSupported(Test.GENERAL_IMAGETYPE_LIST)
                .setTemplatesAvailable(Test.GENERAL_STRING_LIST)
                .setNumCustomPresetsAvailable(Test.GENERAL_INTEGER)
                .setButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST)
                .setSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST)
                .setMenuLayoutsAvailable(Test.GENERAL_MENULAYOUT_LIST)
                .setDynamicUpdateCapabilities(Test.GENERAL_DYNAMICUPDATECAPABILITIES)
                .setKeyboardCapabilities(Test.GENERAL_KEYBOARDCAPABILITIES);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [WindowCapability.KEY_WINDOW_ID]: Test.GENERAL_INTEGER,
                [WindowCapability.KEY_TEXT_FIELDS]: Test.JSON_TEXTFIELD_LIST,
                [WindowCapability.KEY_IMAGE_FIELDS]: Test.JSON_GENERAL_IMAGEFIELD_LIST,
                [WindowCapability.KEY_IMAGE_TYPE_SUPPORTED]: Test.GENERAL_IMAGETYPE_LIST,
                [WindowCapability.KEY_TEMPLATES_AVAILABLE]: Test.GENERAL_STRING_LIST,
                [WindowCapability.KEY_NUM_CUSTOM_PRESETS_AVAILABLE]: Test.GENERAL_INTEGER,
                [WindowCapability.KEY_BUTTON_CAPABILITIES]: Test.JSON_GENERAL_BUTTON_CAPABILITIES_LIST,
                [WindowCapability.KEY_SOFT_BUTTON_CAPABILITIES]: Test.JSON_SOFTBUTTONCAPABILITIES_LIST,
                [WindowCapability.KEY_MENU_LAYOUTS_AVAILABLE]: Test.GENERAL_MENULAYOUT_LIST,
                [WindowCapability.KEY_DYNAMIC_UPDATE_CAPABILITIES]: Test.JSON_DYNAMICUPDATECAPABILITIES,
                [WindowCapability.KEY_KEYBOARD_CAPABILITIES]: Test.JSON_KEYBOARDCAPABILITIES,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_INTEGER, msg.getWindowID());
        Validator.assertEquals(Test.GENERAL_TEXTFIELD_LIST, msg.getTextFields());
        Validator.assertEquals(Test.GENERAL_IMAGEFIELD_LIST, msg.getImageFields());
        Validator.assertEquals(Test.GENERAL_IMAGETYPE_LIST, msg.getImageTypeSupported());
        Validator.assertEquals(Test.GENERAL_STRING_LIST, msg.getTemplatesAvailable());
        Validator.assertEquals(Test.GENERAL_INTEGER, msg.getNumCustomPresetsAvailable());
        Validator.assertEquals(Test.GENERAL_BUTTONCAPABILITIES_LIST, msg.getButtonCapabilities());
        Validator.assertEquals(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST, msg.getSoftButtonCapabilities());
        Validator.assertEquals(Test.GENERAL_MENULAYOUT_LIST, msg.getMenuLayoutsAvailable());
        Validator.assertEquals(Test.GENERAL_DYNAMICUPDATECAPABILITIES, msg.getDynamicUpdateCapabilities());
        Validator.assertEquals(Test.GENERAL_KEYBOARDCAPABILITIES, msg.getKeyboardCapabilities());

        // Invalid/Null Tests
        msg = new WindowCapability();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getWindowID());
        Validator.assertNullOrUndefined(msg.getTextFields());
        Validator.assertNullOrUndefined(msg.getImageFields());
        Validator.assertNullOrUndefined(msg.getImageTypeSupported());
        Validator.assertNullOrUndefined(msg.getTemplatesAvailable());
        Validator.assertNullOrUndefined(msg.getNumCustomPresetsAvailable());
        Validator.assertNullOrUndefined(msg.getButtonCapabilities());
        Validator.assertNullOrUndefined(msg.getSoftButtonCapabilities());
        Validator.assertNullOrUndefined(msg.getMenuLayoutsAvailable());
        Validator.assertNullOrUndefined(msg.getDynamicUpdateCapabilities());
        Validator.assertNullOrUndefined(msg.getKeyboardCapabilities());
        done();
    });
});