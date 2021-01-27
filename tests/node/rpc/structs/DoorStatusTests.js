const SDL = require('../../../config.js').node;
const DoorStatus = SDL.rpc.structs.DoorStatus;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('DoorStatusTests', function () {
    before(function () {
        this.create = function () {
            return new DoorStatus()
                .setLocation(Test.GENERAL_GRID)
                .setStatus(Test.GENERAL_DOORSTATUSTYPE);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [DoorStatus.KEY_LOCATION]: Test.JSON_GRID,
                [DoorStatus.KEY_STATUS]: Test.GENERAL_DOORSTATUSTYPE,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_GRID, msg.getLocation());
        Validator.assertEquals(Test.GENERAL_DOORSTATUSTYPE, msg.getStatus());

        // Invalid/Null Tests
        msg = new DoorStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getLocation());
        Validator.assertNullOrUndefined(msg.getStatus());
        done();
    });
});