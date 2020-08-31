const SDL = require('../../../config.js').node;
const Image = SDL.rpc.structs.Image;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('ImageTests', function () {
    before(function () {
        this.create = function () {
            const msg = new Image();
            msg.setValueParam(Test.GENERAL_STRING);
            msg.setImageType(Test.GENERAL_IMAGETYPE);
            msg.setIsTemplate(Test.GENERAL_BOOLEAN);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[Image.KEY_VALUE] = Test.GENERAL_STRING;
            expectedParameters[Image.KEY_IMAGE_TYPE] = Test.GENERAL_IMAGETYPE;
            expectedParameters[Image.KEY_IS_TEMPLATE] = Test.GENERAL_BOOLEAN;

            return expectedParameters;
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_STRING, msg.getValueParam());
        Validator.assertEquals(Test.GENERAL_IMAGETYPE, msg.getImageType());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getIsTemplate());

        // Invalid/Null Tests
        msg = new Image();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getValueParam());
        Validator.assertNullOrUndefined(msg.getImageType());
        Validator.assertNullOrUndefined(msg.getIsTemplate());
        done();
    });
});