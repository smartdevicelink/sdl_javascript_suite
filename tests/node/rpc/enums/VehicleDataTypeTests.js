const SDL = require('./../../../../lib/js/dist/SDL.min.js');

const VehicleDataType = SDL.rpc.enums.VehicleDataType;
const Validator = require('./../../../Validator.js');

describe('VehicleDataTypeTests', function () {
    it('testValidEnums', function (done) {
        let example = 'VEHICLEDATA_GEARSTATUS';
        const enumVehicledataGearstatus = VehicleDataType.valueForKey(example);
        example = 'VEHICLEDATA_PRNDL';
        const enumVehicledataPrndl = VehicleDataType.valueForKey(example);

        Validator.assertNotNullUndefined(enumVehicledataGearstatus, 'VEHICLEDATA_GEARSTATUS returned null.');
        Validator.assertNotNullUndefined(enumVehicledataPrndl, 'VEHICLEDATA_PRNDL returned null.');
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