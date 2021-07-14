const SDL = require('../../../config.js').node;
const ClimateData = SDL.rpc.structs.ClimateData;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('ClimateDataTests', function () {
    before(function () {
        this.create = function () {
            return new ClimateData()
                .setExternalTemperature(Test.GENERAL_TEMPERATURE)
                .setCabinTemperature(Test.GENERAL_TEMPERATURE)
                .setAtmosphericPressure(Test.GENERAL_NUMBER);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [ClimateData.KEY_EXTERNAL_TEMPERATURE]: Test.JSON_TEMPERATURE,
                [ClimateData.KEY_CABIN_TEMPERATURE]: Test.JSON_TEMPERATURE,
                [ClimateData.KEY_ATMOSPHERIC_PRESSURE]: Test.GENERAL_NUMBER,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_TEMPERATURE, msg.getExternalTemperature());
        Validator.assertEquals(Test.GENERAL_TEMPERATURE, msg.getCabinTemperature());
        Validator.assertEquals(Test.GENERAL_NUMBER, msg.getAtmosphericPressure());

        // Invalid/Null Tests
        msg = new ClimateData();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getExternalTemperature());
        Validator.assertNullOrUndefined(msg.getCabinTemperature());
        Validator.assertNullOrUndefined(msg.getAtmosphericPressure());
        done();
    });
});
