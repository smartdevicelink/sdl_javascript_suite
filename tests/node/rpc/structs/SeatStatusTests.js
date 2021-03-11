const SDL = require('../../../config.js').node;
const SeatStatus = SDL.rpc.structs.SeatStatus;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('SeatStatusTests', function () {
    before(function () {
        this.create = function () {
            return new SeatStatus()
                .setSeatLocation(Test.GENERAL_SEAT_LOCATION)
                .setConditionActive(Test.GENERAL_BOOLEAN);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [SeatStatus.KEY_SEAT_LOCATION]: Test.JSON_SEATLOCATION,
                [SeatStatus.KEY_CONDITION_ACTIVE]: Test.GENERAL_BOOLEAN,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_SEAT_LOCATION, msg.getSeatLocation());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getConditionActive());

        // Invalid/Null Tests
        msg = new SeatStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getSeatLocation());
        Validator.assertNullOrUndefined(msg.getConditionActive());
        done();
    });
});