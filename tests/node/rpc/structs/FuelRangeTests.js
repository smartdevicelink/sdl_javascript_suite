const SDL = require('../../../config.js').node;
const FuelRange = SDL.rpc.structs.FuelRange;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('FuelRangeTests', function () {
    before(function () {
        this.create = function () {
            const msg = new FuelRange();
            msg.setRange(Test.GENERAL_NUMBER);
            msg.setType(Test.GENERAL_FUEL_TYPE);
            msg.setCapacity(Test.GENERAL_NUMBER);
            msg.setCapacityUnit(Test.GENERAL_CAPACITY_UNIT);
            msg.setLevel(Test.GENERAL_NUMBER);
            msg.setLevelState(Test.GENERAL_COMPONENT_VOLUME_STATUS);

            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[FuelRange.KEY_RANGE] = Test.GENERAL_NUMBER;
            expectedParameters[FuelRange.KEY_TYPE] = Test.GENERAL_FUEL_TYPE;
            expectedParameters[FuelRange.KEY_CAPACITY] = Test.GENERAL_NUMBER;
            expectedParameters[FuelRange.KEY_CAPACITY_UNIT] = Test.GENERAL_CAPACITY_UNIT;
            expectedParameters[FuelRange.KEY_LEVEL] = Test.GENERAL_NUMBER;
            expectedParameters[FuelRange.KEY_LEVEL_STATE] = Test.GENERAL_COMPONENT_VOLUME_STATUS;

            return expectedParameters;
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_NUMBER, msg.getRange());
        Validator.assertEquals(Test.GENERAL_FUEL_TYPE, msg.getType());
        Validator.assertEquals(Test.GENERAL_NUMBER, msg.getCapacity());
        Validator.assertEquals(Test.GENERAL_CAPACITY_UNIT, msg.getCapacityUnit());
        Validator.assertEquals(Test.GENERAL_NUMBER, msg.getLevel());
        Validator.assertEquals(Test.GENERAL_COMPONENT_VOLUME_STATUS, msg.getLevelState());

        // Invalid/Null Tests
        msg = new FuelRange();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getRange());
        Validator.assertNullOrUndefined(msg.getType());
        Validator.assertNullOrUndefined(msg.getCapacity());
        Validator.assertNullOrUndefined(msg.getCapacityUnit());
        Validator.assertNullOrUndefined(msg.getLevel());
        Validator.assertNullOrUndefined(msg.getLevelState());
        done();
    });
});