const SDL = require('./../../../../dist/js/SDL.min.js');

const TransmissionType = SDL.rpc.enums.TransmissionType;
const Validator = require('./../../../Validator.js');

describe('TransmissionTypeTests', function () {
    it('testValidEnums', function (done) {
        let example = 'MANUAL';
        const enumManual = TransmissionType.valueForKey(example);

        example = 'AUTOMATIC';
        const enumAutomatic = TransmissionType.valueForKey(example);
        example = 'SEMI_AUTOMATIC';
        const enumSemiAutomatic = TransmissionType.valueForKey(example);
        example = 'DUAL_CLUTCH';
        const enumDualClutch = TransmissionType.valueForKey(example);
        example = 'CONTINUOUSLY_VARIABLE';
        const enumContinuouslyVariable = TransmissionType.valueForKey(example);
        example = 'INFINITELY_VARIABLE';
        const enumInfinitelyVariable = TransmissionType.valueForKey(example);
        example = 'ELECTRIC_VARIABLE';
        const enumElectricVariable = TransmissionType.valueForKey(example);
        example = 'DIRECT_DRIVE';
        const enumDirectDrive = TransmissionType.valueForKey(example);

        Validator.assertNotNullUndefined(enumManual, 'MANUAL returned null.');
        Validator.assertNotNullUndefined(enumAutomatic, 'AUTOMATIC returned null.');
        Validator.assertNotNullUndefined(enumSemiAutomatic, 'SEMI_AUTOMATIC returned null.');
        Validator.assertNotNullUndefined(enumDualClutch, 'DUAL_CLUTCH returned null.');
        Validator.assertNotNullUndefined(enumContinuouslyVariable, 'CONTINUOUSLY_VARIABLE returned null.');
        Validator.assertNotNullUndefined(enumInfinitelyVariable, 'INFINITELY_VARIABLE returned null.');
        Validator.assertNotNullUndefined(enumElectricVariable, 'ELECTRIC_VARIABLE returned null.');
        Validator.assertNotNullUndefined(enumDirectDrive, 'DIRECT_DRIVE returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'nIGHT';
        const temp = TransmissionType.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = TransmissionType.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});