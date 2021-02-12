const SDL = require('../../../config.js').node;
const RoofStatus = SDL.rpc.structs.RoofStatus;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('RoofStatusTests', function () {
    before(function () {
        this.create = function () {
            return new RoofStatus()
                .setLocation(Test.GENERAL_GRID)
                .setStatus(Test.GENERAL_DOORSTATUSTYPE)
                .setState(Test.GENERAL_WINDOW_STATE);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [RoofStatus.KEY_LOCATION]: Test.JSON_GRID,
                [RoofStatus.KEY_STATUS]: Test.GENERAL_DOORSTATUSTYPE,
                [RoofStatus.KEY_STATE]: Test.JSON_WINDOW_STATE,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_GRID, msg.getLocation());
        Validator.assertEquals(Test.GENERAL_DOORSTATUSTYPE, msg.getStatus());
        Validator.assertEquals(Test.GENERAL_WINDOW_STATE, msg.getState());

        // Invalid/Null Tests
        msg = new RoofStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getLocation());
        Validator.assertNullOrUndefined(msg.getStatus());
        Validator.assertNullOrUndefined(msg.getState());
        done();
    });
});