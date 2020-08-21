const SDL = require('../../../config.js').node;

const AmbientLightStatus = SDL.rpc.enums.AmbientLightStatus;
const Validator = require('./../../../Validator.js');

describe('AmbientLightStatusTests', function () {
    it('testValidEnums', function (done) {
        let example = 'DAY';
        const enumDay = AmbientLightStatus.valueForKey(example);
        example = 'NIGHT';
        const enumNight = AmbientLightStatus.valueForKey(example);
        example = 'ALS_UNKNOWN';
        const enumUnknown = AmbientLightStatus.valueForKey(example);
        example = 'INVALID';
        const enumInvalid = AmbientLightStatus.valueForKey(example);
        example = 'TWILIGHT_1';
        const enumTwilight1 = AmbientLightStatus.valueForKey(example);
        example = 'TWILIGHT_2';
        const enumTwilight2 = AmbientLightStatus.valueForKey(example);
        example = 'TWILIGHT_3';
        const enumTwilight3 = AmbientLightStatus.valueForKey(example);
        example = 'TWILIGHT_4';
        const enumTwilight4 = AmbientLightStatus.valueForKey(example);

        Validator.assertNotNullUndefined(enumDay, 'DAY returned null.');
        Validator.assertNotNullUndefined(enumNight, 'NIGHT returned null.');
        Validator.assertNotNullUndefined(enumUnknown, 'UNKNOWN returned null.');
        Validator.assertNotNullUndefined(enumInvalid, 'INVALID returned null.');
        Validator.assertNotNullUndefined(enumTwilight1, 'TWILIGHT_1 returned null.');
        Validator.assertNotNullUndefined(enumTwilight2, 'TWILIGHT_2 returned null.');
        Validator.assertNotNullUndefined(enumTwilight3, 'TWILIGHT_3 returned null.');
        Validator.assertNotNullUndefined(enumTwilight4, 'TWILIGHT_4 returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'nIGHT';
        const temp = AmbientLightStatus.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = AmbientLightStatus.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});