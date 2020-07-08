const SDL = require('./../../../../lib/js/dist/SDL.min.js');

const VehicleDataType = SDL.rpc.enums.VehicleDataType;
const Validator = require('./../../../Validator.js');

describe('VehicleDataTypeTests', function () {
    it('testValidEnums', function (done) {
        const example = 'VEHICLEDATA_WINDOWSTATUS';
        const enumVehicledataWindowstatus = VehicleDataType.valueForKey(example);

        Validator.assertNotNullUndefined(enumVehicledataWindowstatus, 'VEHICLEDATA_WINDOWSTATUS returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'nIGHT';
        const temp = VehicleDataType.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = VehicleDataType.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});