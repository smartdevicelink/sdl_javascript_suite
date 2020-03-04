const SDL = require('./../../../../lib/js/dist/SDL.min.js');

const Validator = require('./../../../Validator');

const ImageResolution = SDL.rpc.structs.ImageResolution;
const VideoStreamingCapability = SDL.rpc.structs.VideoStreamingCapability;
const VideoStreamingFormat = SDL.rpc.structs.VideoStreamingFormat;
const VideoStreamingCodec = SDL.rpc.enums.VideoStreamingCodec;
const VideoStreamingProtocol = SDL.rpc.enums.VideoStreamingProtocol;
const VideoStreamingParameters = SDL.streaming.video.VideoStreamingParameters;

const params = new VideoStreamingParameters();
const capability = new VideoStreamingCapability();

describe('VideoStreamingParametersTest', function () {
    it('testUpdateScale_1_Resolution_800_354', function (done) {
        const preferredResolution = new ImageResolution();
        preferredResolution.setResolutionWidth(800);
        preferredResolution.setResolutionHeight(354);

        capability.setScale(1);
        capability.setPreferredResolution(preferredResolution);

        params.update(capability);

        const width = params.getResolution().getResolutionWidth();
        const height = params.getResolution().getResolutionHeight();

        Validator.assertEquals(width, 800);
        Validator.assertEquals(height, 354);
        done();
    });

    it('testUpdateScale_1_25_Resolution_1280_569', function (done) {
        const preferredResolution = new ImageResolution();
        preferredResolution.setResolutionWidth(1280);
        preferredResolution.setResolutionHeight(569);

        capability.setScale(1.25);
        capability.setPreferredResolution(preferredResolution);

        params.update(capability);

        const width = params.getResolution().getResolutionWidth();
        const height = params.getResolution().getResolutionHeight();

        Validator.assertEquals(width, 1024);
        Validator.assertEquals(height, 455);

        done();
    });

    it('testUpdateScale_1_5_Resolution_1280_569', function (done) {
        const preferredResolution = new ImageResolution();
        preferredResolution.setResolutionWidth(1280);
        preferredResolution.setResolutionHeight(569);

        capability.setScale(1.5);
        capability.setPreferredResolution(preferredResolution);

        params.update(capability);

        const width = params.getResolution().getResolutionWidth();
        const height = params.getResolution().getResolutionHeight();

        Validator.assertEquals(width, 853);
        Validator.assertEquals(height, 379);

        done();
    });

    it('testUpdateCapabilityFormat', function (done) {
        capability.setMaxBitrate(10000);

        const preferredResolution = new ImageResolution();
        preferredResolution.setResolutionWidth(800);
        preferredResolution.setResolutionHeight(600);
        capability.setPreferredResolution(preferredResolution);
        capability.setHapticSpatialDataSupported(false);

        let format = new VideoStreamingFormat(VideoStreamingProtocol.RAW, VideoStreamingCodec.H264);
        capability.setSupportedFormats([format]);

        params.setFormat(null);

        Validator.assertNull(params.getFormat());

        params.update(capability);

        Validator.assertEquals(params.getFormat(), format);

        format = new VideoStreamingFormat(VideoStreamingProtocol.RTP, VideoStreamingCodec.H264);
        capability.setSupportedFormats([format]);
        params.update(capability);
        Validator.assertEquals(params.getFormat(), format);

        done();
    });
});