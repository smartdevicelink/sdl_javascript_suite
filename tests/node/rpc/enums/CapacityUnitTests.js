const SDL = require('./../../../../dist/js/SDL.min.js');

const CapacityUnit = SDL.rpc.enums.CapacityUnit;
const Validator = require('./../../../Validator.js');

describe('CapacityUnitTests', function () {
    it('testValidEnums', function (done) {
        let example = 'LITERS';
        const enumLiters = CapacityUnit.valueForKey(example);

        example = 'KILOWATTHOURS';
        const enumKilowatthours = CapacityUnit.valueForKey(example);
        example = 'KILOGRAMS';
        const enumKilograms = CapacityUnit.valueForKey(example);

        Validator.assertNotNullUndefined(enumLiters, 'LITERS returned null.');
        Validator.assertNotNullUndefined(enumKilowatthours, 'KILOWATTHOURS returned null.');
        Validator.assertNotNullUndefined(enumKilograms, 'KILOGRAMS returned null.');

        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'nIGHT';
        const temp = CapacityUnit.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = CapacityUnit.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});