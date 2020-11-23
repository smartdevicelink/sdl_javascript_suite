const SDL = require('../../../config.js').node;
const SeatOccupancy = SDL.rpc.structs.SeatOccupancy;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('SeatOccupancyTests', function () {
    before(function () {
        this.create = function () {
            return new SeatOccupancy()
                .setSeatsOccupied(Test.GENERAL_SEAT_STATUS_LIST)
                .setSeatsBelted(Test.GENERAL_SEAT_STATUS_LIST);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [SeatOccupancy.KEY_SEATS_OCCUPIED]: Test.JSON_SEATSTATUS_LIST,
                [SeatOccupancy.KEY_SEATS_BELTED]: Test.JSON_SEATSTATUS_LIST,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_SEAT_STATUS_LIST, msg.getSeatsOccupied());
        Validator.assertEquals(Test.GENERAL_SEAT_STATUS_LIST, msg.getSeatsBelted());

        // Invalid/Null Tests
        msg = new SeatOccupancy();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getSeatsOccupied());
        Validator.assertNullOrUndefined(msg.getSeatsBelted());
        done();
    });
});