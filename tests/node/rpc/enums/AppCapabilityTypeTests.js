const SDL = require('./../../../../dist/js/SDL.min.js');

const AppCapabilityType = SDL.rpc.enums.AppCapabilityType;
const Validator = require('./../../../Validator.js');

describe('AppCapabilityTypeTests', function () {
    it('testValidEnums', function (done) {
        const example = 'VIDEO_STREAMING';
        const enumVideoStreaming = AppCapabilityType.valueForKey(example);

        Validator.assertNotNull(enumVideoStreaming, 'VIDEO_STREAMING returned null');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'deFaUlt';
        const temp = AppCapabilityType.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = AppCapabilityType.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });
});
