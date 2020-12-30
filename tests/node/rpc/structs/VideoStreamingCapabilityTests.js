const SDL = require('../../../config.js').node;
const VideoStreamingCapability = SDL.rpc.structs.VideoStreamingCapability;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('VideoStreamingCapabilityTests', function () {
    before(function () {
        this.create = function () {
            return new VideoStreamingCapability()
                .setAdditionalVideoStreamingCapabilities([Test.GENERAL_VIDEO_STREAMING_CAPABILITY]);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [VideoStreamingCapability.KEY_ADDITIONAL_VIDEO_STREAMING_CAPABILITIES]: [Test.JSON_VIDEO_STREAMING_CAPABILITY],
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals([Test.GENERAL_VIDEO_STREAMING_CAPABILITY], msg.getAdditionalVideoStreamingCapabilities());

        // Invalid/Null Tests
        msg = new VideoStreamingCapability();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getAdditionalVideoStreamingCapabilities());
        done();
    });
});
