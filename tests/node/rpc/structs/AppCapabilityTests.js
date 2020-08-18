const SDL = require('./../../../../dist/js/SDL.min.js');
const AppCapability = SDL.rpc.structs.AppCapability;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('AppCapabilityTests', function () {
    before(function () {
        this.create = function () {
            return new AppCapability()
                .setAppCapabilityType(Test.GENERAL_APP_CAPABILITY_TYPE)
                .setVideoStreamingCapability(Test.GENERAL_VIDEO_STREAMING_CAPABILITY);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [AppCapability.KEY_APP_CAPABILITY_TYPE]: Test.GENERAL_APP_CAPABILITY_TYPE,
                [AppCapability.KEY_VIDEO_STREAMING_CAPABILITY]: Test.JSON_VIDEO_STREAMING_CAPABILITY,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_APP_CAPABILITY_TYPE, msg.getAppCapabilityType());
        Validator.assertEquals(Test.GENERAL_VIDEO_STREAMING_CAPABILITY, msg.getVideoStreamingCapability());

        // Invalid/Null Tests
        msg = new AppCapability();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getAppCapabilityType());
        Validator.assertNullOrUndefined(msg.getVideoStreamingCapability());
        done();
    });
});